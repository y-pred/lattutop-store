import { createClient } from "@/lib/supabase/server";

// Thin data-access layer so pages don't repeat Supabase query boilerplate.
// All reads rely on the "products are publicly readable" RLS policy
// (see supabase/migrations/0001_init.sql), so the plain anon-key server
// client is enough here — no service role needed for reads.

export async function getProductsBySection(section) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("section", section)
    .eq("active", true)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getFeaturedProducts({ kidsLimit = 4, collectiblesLimit = 4 } = {}) {
  const [kids, collectibles] = await Promise.all([
    getProductsBySection("kids"),
    getProductsBySection("collectible"),
  ]);
  return {
    kids: kids.slice(0, kidsLimit),
    collectibles: collectibles.slice(0, collectiblesLimit),
  };
}

export async function getProductById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}
