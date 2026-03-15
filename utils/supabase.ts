import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.toString() || "";
const supabaseKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.toString() || "";

export const supabase = createClient(supabaseUrl, supabaseKey);
