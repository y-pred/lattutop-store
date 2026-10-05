-- Rename the Coder collectible's variant labels.
-- Run this AFTER 0010_coder_collectible_variants.sql (needs the variants
-- column to already exist). If you haven't run 0010 yet, run that first —
-- this one alone won't do anything useful without it.
update public.products
set variants = '[
  {"name": "Boy (grey Tee)", "image": "/products/coder-collectible/grey.jpg"},
  {"name": "Girl", "image": "/products/coder-collectible/olive.jpg"},
  {"name": "Boy (black tee)", "image": "/products/coder-collectible/black.jpg"}
]'::jsonb
where id = 'coder-collectible';
