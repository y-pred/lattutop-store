"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client. Only ever uses the public URL + anon key,
// which are safe to ship to the client (Row Level Security in Postgres is
// what actually protects the data — see supabase/migrations/0001_init.sql).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
