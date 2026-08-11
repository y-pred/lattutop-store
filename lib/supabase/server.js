import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseJsClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Server-side Supabase client for use in Server Components, Route Handlers,
// and Server Actions. Reads/writes the user's auth session via cookies.
// Still uses the anon key — auth + RLS determine what the signed-in user
// can see, this is NOT the admin client.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — safe to ignore because
            // middleware.js refreshes the session on every request.
          }
        },
      },
    }
  );
}

// Admin client with the SERVICE ROLE key. This bypasses Row Level Security,
// so it must NEVER be imported into client components and must NEVER have
// its key exposed with a NEXT_PUBLIC_ prefix. Use only in trusted server
// code (route handlers, scripts) — e.g. recomputing order totals, webhooks.
// This is a plain supabase-js client (not createServerClient) because it's
// not tied to any browser session/cookies — it always acts with full
// service-role privileges regardless of who is making the request.
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set. Add it to your server environment (.env.local).");
  }
  return createSupabaseJsClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
