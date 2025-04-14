
// Configuration utilities
export const isConfigMissing = false; // Nous n'utilisons plus Supabase, donc il n'y a pas de configuration manquante

// Autres fonctions de configuration qui pourraient être nécessaires
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
