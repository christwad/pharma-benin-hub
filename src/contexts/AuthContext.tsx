
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase, isConfigMissing, configErrorMessage } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { Tables } from '@/types/supabase';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Tables<'profiles'> | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userDetails: { full_name: string; phone_number: string; role: 'client' | 'pharmacist' | 'admin' }) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  isSupabaseConfigured: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Récupérer la session initiale
    const getInitialSession = async () => {
      setLoading(true);

      // Vérifier si la configuration Supabase est manquante
      if (isConfigMissing) {
        console.warn("Supabase n'est pas configuré. L'authentification ne fonctionnera pas correctement.");
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await refreshProfile();
      }

      setLoading(false);
    };

    getInitialSession();

    // Configurer l'écouteur d'événements pour les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN' && session?.user) {
          await refreshProfile();
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Récupérer le profil de l'utilisateur
  const refreshProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
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
      // Vérifier si Supabase est configuré
      if (isConfigMissing) {
        return { 
          error: { 
            message: 'Configuration Supabase manquante. Veuillez connecter votre projet à Supabase via le bouton vert en haut à droite.' 
          } 
        };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

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
      // Vérifier si Supabase est configuré
      if (isConfigMissing) {
        return { 
          error: { 
            message: 'Configuration Supabase manquante. Veuillez connecter votre projet à Supabase via le bouton vert en haut à droite.' 
          } 
        };
      }

      // 1. Créer l'utilisateur dans Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      // 2. Créer le profil utilisateur
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: userDetails.full_name,
            phone_number: userDetails.phone_number,
            role: userDetails.role,
          });

        if (profileError) {
          console.error('Erreur lors de la création du profil:', profileError);
          return { error: profileError };
        }
      }

      return { error: null };
    } catch (error) {
      console.error('Erreur inattendue lors de l\'inscription:', error);
      return { error };
    }
  };

  // Déconnexion
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
    isSupabaseConfigured: !isConfigMissing,
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
