
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Récupération des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vérification des variables d'environnement requises
if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === "https://your-real-supabase-url.supabase.co" || 
    supabaseAnonKey === "your-real-supabase-anon-key") {
  console.error(`
    ===== ERREUR DE CONFIGURATION SUPABASE =====
    Les variables d'environnement Supabase ne sont pas correctement configurées.
    
    Pour résoudre ce problème :
    1. Cliquez sur le bouton vert Supabase en haut à droite de l'interface.
    2. Connectez votre projet à Supabase.
    3. Les variables d'environnement seront automatiquement configurées.
    
    Sans cette configuration, les fonctionnalités comme l'authentification, 
    la base de données et le stockage ne fonctionneront pas.
    =========================================
  `);
}

// Création d'un client Supabase factice si les variables sont manquantes
// Ceci permet à l'application de se charger mais avec une fonctionnalité limitée
let supabase;

try {
  // Tente de créer un client Supabase valide
  supabase = createClient<Database>(
    supabaseUrl || 'https://placeholder-url.supabase.co',
    supabaseAnonKey || 'placeholder-key'
  );
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  // Crée un client factice avec des méthodes pour éviter les erreurs
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ 
        error: { message: 'Supabase non configuré. Cliquez sur le bouton Supabase en haut à droite pour connecter votre projet.' },
        data: null 
      }),
      signInWithPassword: () => Promise.resolve({ 
        error: { message: 'Supabase non configuré. Cliquez sur le bouton Supabase en haut à droite pour connecter votre projet.' },
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
          error: { message: 'Supabase non configuré. Cliquez sur le bouton Supabase en haut à droite pour connecter votre projet.' } 
        }),
        single: () => Promise.resolve({ 
          data: null, 
          error: { message: 'Supabase non configuré. Cliquez sur le bouton Supabase en haut à droite pour connecter votre projet.' } 
        })
      }),
      insert: () => Promise.resolve({
        data: null,
        error: { message: 'Supabase non configuré. Cliquez sur le bouton Supabase en haut à droite pour connecter votre projet.' }
      })
    })
  } as unknown as ReturnType<typeof createClient<Database>>;
}

export { supabase };
