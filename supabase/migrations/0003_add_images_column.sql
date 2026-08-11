-- Adds a proper multi-image gallery column to products.
-- image / image2 stay as-is (used for the card grid's hover-swap), while
-- `images` holds the full ordered list shown on the product detail page.
alter table public.products add column if not exists images text[] not null default '{}';
