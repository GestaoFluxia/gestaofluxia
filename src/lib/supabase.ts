import { createClient } from "@supabase/supabase-js";

// Só usado no servidor (route handlers / server components).
// A service role key ignora RLS de propósito: é o único jeito de acessar
// a tabela "membros", que não tem nenhuma policy pra anon/authenticated.
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados.");
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
