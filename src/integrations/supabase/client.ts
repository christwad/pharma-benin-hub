// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ovqajtbssnsigqtwxkbz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92cWFqdGJzc25zaWdxdHd4a2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Mjg0MDksImV4cCI6MjA2MDEwNDQwOX0.7lbAJvLjtWk6jeVKqe1uql7R41LZ9ZifDpV90E0Ou-8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);