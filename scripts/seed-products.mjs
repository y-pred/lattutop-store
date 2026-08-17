// One-time / re-runnable script that upserts the catalog into Supabase.
// Usage:  npm run seed:products
// Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
// (the service role key is required because it bypasses the read-only RLS
// policy on `products` — never use this key in browser code).

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { allCatalogProducts } from "../lib/catalog.js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Add them to .env.local first (see .env.example)."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

const rows = allCatalogProducts.map((p) => ({
  id: p.id,
  section: p.section,
  name: p.name,
  subtitle: p.subtitle,
  price: p.price,
  compare_at: p.compare_at ?? null,
  image: p.image,
  image2: p.image2 ?? null,
  images: p.images ?? [],
  story: p.story,
  material: p.material,
  suited_for: p.suited_for ?? [],
  active: true,
}));

const { data, error } = await supabase.from("products").upsert(rows, { onConflict: "id" }).select("id");

if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}

console.log(`Seeded ${data.length} products.`);
