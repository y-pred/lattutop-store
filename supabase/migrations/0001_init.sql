-- lattuTop — initial schema
-- Run this in the Supabase SQL editor (or via `supabase db push` if you use the CLI).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------
-- PRODUCTS  (replaces the hardcoded kidsProducts/collectibles arrays)
-- ---------------------------------------------------------------
create table if not exists public.products (
  id text primary key,
  section text not null check (section in ('kids', 'collectible')),
  name text not null,
  subtitle text,
  price integer not null check (price >= 0),
  compare_at integer,
  image text,
  image2 text,
  story text,
  material text,
  suited_for text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Anyone (including logged-out shoppers) can read active products.
create policy "products are publicly readable"
  on public.products for select
  using (active = true);

-- No insert/update/delete policy for the public/anon role on purpose —
-- catalog changes go through the service-role seed script or Supabase Studio.

-- ---------------------------------------------------------------
-- ORDERS
-- ---------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  guest_email text,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'cod_confirmed', 'cancelled')),
  payment_method text not null check (payment_method in ('phonepe', 'cod')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed', 'not_required')),
  subtotal integer not null,
  shipping integer not null default 0,
  total integer not null,
  shipping_address jsonb not null,
  phonepe_merchant_order_id text unique,
  phonepe_order_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_phonepe_merchant_order_id_idx
  on public.orders (phonepe_merchant_order_id);

alter table public.orders enable row level security;

-- Signed-in users can see only their own orders (used by "My orders").
create policy "users read their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- No public insert/update policy: orders are always created and mutated
-- by trusted server code (the checkout API route and the PhonePe webhook),
-- both of which use the service-role client and therefore bypass RLS.
-- This is what stops a shopper from posting directly to Postgres and
-- creating a "paid" order for ₹1.

-- ---------------------------------------------------------------
-- ORDER ITEMS
-- ---------------------------------------------------------------
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text references public.products(id),
  product_name text not null,
  unit_price integer not null,
  qty integer not null check (qty > 0)
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

alter table public.order_items enable row level security;

create policy "users read items of their own orders"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and o.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------
-- B2B / BULK ENQUIRIES
-- ---------------------------------------------------------------
create table if not exists public.b2b_leads (
  id uuid primary key default gen_random_uuid(),
  org_name text not null,
  org_type text not null,
  contact_name text not null,
  phone text not null,
  email text not null,
  estimated_qty text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.b2b_leads enable row level security;
-- No public policies — the enquiry form posts through /api/b2b, which uses
-- the service-role client. Nobody can read leads with the anon key.

-- ---------------------------------------------------------------
-- updated_at trigger for orders
-- ---------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();
