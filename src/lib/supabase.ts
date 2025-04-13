
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Récupération des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vérification des variables d'environnement requises
const isConfigMissing = !supabaseUrl || !supabaseAnonKey || 
  supabaseUrl === "https://your-real-supabase-url.supabase.co" || 
  supabaseAnonKey === "your-real-supabase-anon-key";

// Message d'erreur détaillé pour guider l'utilisateur
const configErrorMessage = `
  ===== ERREUR DE CONFIGURATION SUPABASE =====
  Les variables d'environnement Supabase ne sont pas correctement configurées.
  
  Pour résoudre ce problème :
  1. Cliquez sur le bouton vert Supabase en haut à droite de l'interface Lovable.
  2. Connectez votre projet à Supabase.
  3. Les variables d'environnement seront automatiquement configurées.
  
  Sans cette configuration, les fonctionnalités comme l'authentification, 
  la base de données et le stockage ne fonctionneront pas.
  =========================================
`;

// Afficher l'erreur de configuration dans la console
if (isConfigMissing) {
  console.error(configErrorMessage);
}

// Création d'un client Supabase
let supabase;

try {
  // Tente de créer un client Supabase valide
  supabase = createClient<Database>(
    supabaseUrl || 'https://placeholder-url.supabase.co',
    supabaseAnonKey || 'placeholder-key'
  );
  
  // Test de connexion pour vérifier si Supabase est correctement configuré
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event);
  });
  
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  
  // Crée un client factice avec des méthodes pour éviter les erreurs
  // et des messages clairs pour l'utilisateur
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ 
        error: { 
          message: 'Configuration Supabase manquante. Connectez votre projet à Supabase en cliquant sur le bouton vert en haut à droite.',
          status: 400
        },
        data: null 
      }),
      signInWithPassword: () => Promise.resolve({ 
        error: { 
          message: 'Configuration Supabase manquante. Connectez votre projet à Supabase en cliquant sur le bouton vert en haut à droite.',
          status: 400
        },
        data: null 
      }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ 
        data: { subscription: { unsubscribe: () => {} } }, 
        error: null 
      })
    },
    from: () => ({
      select: () => ({
        eq: () => Promise.resolve({ 
          data: [], 
          error: { 
            message: 'Configuration Supabase manquante. Connectez votre projet à Supabase en cliquant sur le bouton vert en haut à droite.',
            status: 400
          } 
        }),
        single: () => Promise.resolve({ 
          data: null, 
          error: { 
            message: 'Configuration Supabase manquante. Connectez votre projet à Supabase en cliquant sur le bouton vert en haut à droite.',
            status: 400
          } 
        })
      }),
      insert: () => Promise.resolve({
        data: null,
        error: { 
          message: 'Configuration Supabase manquante. Connectez votre projet à Supabase en cliquant sur le bouton vert en haut à droite.',
          status: 400
        }
      })
    })
  } as unknown as ReturnType<typeof createClient<Database>>;
}

// Exporter le client Supabase et l'état de configuration
export { supabase, isConfigMissing, configErrorMessage };
