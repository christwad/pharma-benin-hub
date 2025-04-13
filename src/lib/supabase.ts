
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Récupération des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vérification des variables d'environnement requises
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please set the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
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
      signUp: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: null, error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }),
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
      })
    })
  } as unknown as ReturnType<typeof createClient<Database>>;
}

export { supabase };
