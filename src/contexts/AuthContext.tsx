
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Tables } from '@/types/supabase';
import { useToast } from '@/components/ui/use-toast';
import authService, { AuthResponse } from '@/services/auth';

type User = {
  id: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  profile: Tables<'profiles'> | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userDetails: { full_name: string; phone_number: string; role: 'client' | 'pharmacist' | 'admin' }) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Récupérer la session initiale
    const getInitialSession = async () => {
      setLoading(true);

      // Vérifier si un token existe
      const storedToken = localStorage.getItem("authToken");
      
      if (storedToken) {
        setToken(storedToken);
        try {
          // Récupérer les infos utilisateur avec le token
          const userData = await authService.getProfile();
          setUser(userData.user);
          setProfile(userData.profile || null);
        } catch (error) {
          console.error("Erreur de récupération du profil:", error);
          localStorage.removeItem("authToken");
          setToken(null);
          setUser(null);
          setProfile(null);
        }
      }

      setLoading(false);
    };

    getInitialSession();
  }, []);

  // Récupérer le profil de l'utilisateur
  const refreshProfile = async () => {
    if (!user) return;

    try {
      const userData = await authService.getProfile();
      setProfile(userData.profile || null);
    } catch (error: any) {
      console.error('Erreur lors de la récupération du profil:', error);
      toast({
        title: 'Erreur de profil',
        description: "Impossible de récupérer votre profil. Veuillez réessayer.",
        variant: 'destructive',
      });
    }
  };

  // Connexion
  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      
      setUser(response.user);
      setToken(response.token);
      setProfile(response.profile || null);
      
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Inscription
  const signUp = async (
    email: string, 
    password: string, 
    userDetails: { full_name: string; phone_number: string; role: 'client' | 'pharmacist' | 'admin' }
  ) => {
    try {
      const response = await authService.register({
        email,
        password,
        full_name: userDetails.full_name,
        phone_number: userDetails.phone_number,
        role: userDetails.role
      });
      
      // Si l'inscription avec auto-login
      if (response.token) {
        setUser(response.user);
        setToken(response.token);
        setProfile(response.profile || null);
      }
      
      return { error: null };
    } catch (error) {
      console.error('Erreur inattendue lors de l\'inscription:', error);
      return { error };
    }
  };

  // Déconnexion
  const signOut = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
    setProfile(null);
  };

  const value = {
    user,
    token,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
