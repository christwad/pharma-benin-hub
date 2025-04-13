
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Récupération des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Création d'un client Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});

// Pour la compatibilité avec les imports existants
export const isConfigMissing = false;
export const configErrorMessage = '';
