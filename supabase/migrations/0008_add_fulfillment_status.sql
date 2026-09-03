-- Track fulfillment (shipping) separately from payment status, so "My orders"
-- can show a real answer to "has this actually shipped/arrived" instead of
-- just the payment state. Update this column by hand in the Supabase table
-- editor as orders ship and get delivered:
--   processing -> shipped -> delivered   (or -> cancelled)

alter table public.orders
  add column if not exists fulfillment_status text not null default 'processing'
  check (fulfillment_status in ('processing', 'shipped', 'delivered', 'cancelled'));
