import { createClient } from "@supabase/supabase-js";

/**
 * Cliente com service_role — NUNCA expor no browser.
 * Usar apenas em API routes / server actions.
 */
export function createAdminClient() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!url || !key) {
    throw new Error("Supabase admin env vars not set");
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
