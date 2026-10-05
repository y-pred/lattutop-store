-- Real product photos for the Coder collectible (replacing AI-generated
-- placeholder images), plus a lightweight variants column for the
-- Grey/Olive/Black "choose your coder" picker on the product page. No
-- separate SKUs/stock tracking — the chosen variant is just folded into
-- the order item's product_name at checkout (see app/api/checkout/route.js).

alter table public.products add column if not exists variants jsonb not null default '[]';

update public.products
set
  image = '/products/coder-collectible/group.jpg',
  image2 = '/products/coder-collectible/grey.jpg',
  images = ARRAY[
    '/products/coder-collectible/group.jpg',
    '/products/coder-collectible/grey.jpg',
    '/products/coder-collectible/olive.jpg',
    '/products/coder-collectible/black.jpg'
  ],
  variants = '[
    {"name": "Grey", "image": "/products/coder-collectible/grey.jpg"},
    {"name": "Olive", "image": "/products/coder-collectible/olive.jpg"},
    {"name": "Black", "image": "/products/coder-collectible/black.jpg"}
  ]'::jsonb
where id = 'coder-collectible';
