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
  // Homepage collectibles are picked explicitly (in this order) rather than
  // relying on created_at, which is unreliable when rows were seeded together.
  // Any remaining slots fall back to the default order.
  const FEATURED_COLLECTIBLE_IDS = ["kohli", "spidey-collectible", "rajni", "modi-ji"];
  const byId = new Map(collectibles.map((p) => [p.id, p]));
  const picked = FEATURED_COLLECTIBLE_IDS.map((id) => byId.get(id)).filter(Boolean);
  const rest = collectibles.filter((p) => !FEATURED_COLLECTIBLE_IDS.includes(p.id));
  return {
    kids: kids.slice(0, kidsLimit),
    collectibles: [...picked, ...rest].slice(0, collectiblesLimit),
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
