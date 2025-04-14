
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import authService from "@/services/auth";

interface User {
  id: string;
  email: string;
  role: string;
}

interface UserProfile {
  full_name: string;
  phone_number: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null; // Propriété profile correctement définie dans l'interface
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signUp: (email: string, password: string, userData: object) => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUserSession = async () => {
      setLoading(true);
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getProfile();
          setUser(userData.user);
          setProfile(userData.profile || null);
        }
      } catch (err: any) {
        console.error("Erreur lors de la récupération du profil:", err);
        // Si l'API renvoie une erreur, on efface le token
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      setProfile(response.profile || null);
      return {};
    } catch (err: any) {
      console.error("Erreur de connexion:", err);
      setError(err.message || "Erreur de connexion");
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register({
        email,
        password,
        full_name: userData.full_name || "",
        phone_number: userData.phone_number || "",
        role: userData.role || "client",
      });
      // Si auto-connexion après inscription
      if (response.user) {
        setUser(response.user);
        setProfile(response.profile || null);
      }
      return {};
    } catch (err: any) {
      console.error("Erreur d'inscription:", err);
      setError(err.message || "Erreur d'inscription");
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
      setUser(null);
      setProfile(null);
    } catch (err: any) {
      console.error("Erreur de déconnexion:", err);
    }
  };

  const value = {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé avec un AuthProvider");
  }
  return context;
};
