import { createClient } from "@supabase/supabase-js";

// Server-only. Needs SUPABASE_SERVICE_ROLE_KEY (never use a NEXT_PUBLIC_ name for it).
export const supabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
};
