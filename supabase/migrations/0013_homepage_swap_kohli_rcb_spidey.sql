-- Homepage shows the 4 oldest-created collectibles (see getFeaturedProducts
-- in lib/products-data.js, ordered by created_at ascending). Swap the
-- created_at timestamps of kohli-rcb and spidey-collectible so Spiderman
-- takes the RCB Kohli doll's slot on the homepage, without touching any
-- other ordering or needing a schema change.

do $$
declare
  t_kohli_rcb timestamptz;
  t_spidey timestamptz;
begin
  select created_at into t_kohli_rcb from public.products where id = 'kohli-rcb';
  select created_at into t_spidey from public.products where id = 'spidey-collectible';

  update public.products set created_at = t_spidey where id = 'kohli-rcb';
  update public.products set created_at = t_kohli_rcb where id = 'spidey-collectible';
end $$;
