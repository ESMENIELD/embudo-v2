import { createClient } from "@supabase/supabase-js";

function getRequiredEnvironmentVariable(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} no está configurada`);
  }

  return value;
}

export function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    getRequiredEnvironmentVariable("SUPABASE_URL");

  const supabaseSecretKey = getRequiredEnvironmentVariable(
    "SUPABASE_SECRET_KEY"
  );

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}