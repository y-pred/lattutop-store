# lattuTop — Next.js store

This replaces the single-file `lattutop-store.jsx` prototype (kept in the repo root for
reference) with a real Next.js App Router project: routed pages instead of page-state,
Supabase Postgres for products/accounts/orders, and a server-only PhonePe integration.

## Stack

- **Next.js 14** (App Router), plain JavaScript (no TypeScript)
- **Supabase**: Postgres database + Auth (email/password) for accounts
- **PhonePe Standard Checkout** via the `pg-sdk-node` backend SDK, called only from
  server routes — the client secret never reaches the browser

## Project structure

```
app/                     routes (App Router) — one folder per URL
  page.js                  /
  kids/page.js              /kids
  collectibles/page.js      /collectibles
  products/[id]/page.js     /products/:id  (product detail)
  b2b/page.js                /b2b
  account/page.js            /account (sign in / sign up)
  account/orders/page.js      /account/orders
  checkout/page.js            /checkout
  checkout/complete/page.js   /checkout/complete?order=...
  api/checkout/route.js       POST — creates the order, starts PhonePe payment
  api/phonepe/callback/route.js  POST — PhonePe webhook (server-to-server)
  api/b2b/route.js            POST — bulk enquiry form
components/              UI components (client components where interactive)
lib/                      Supabase clients, PhonePe client, data helpers, catalog seed data
supabase/migrations/      SQL schema (run this in your Supabase project)
scripts/seed-products.mjs  Loads the catalog into the products table
```

## 1. Install dependencies

```
npm install
```

> Note: PhonePe's own docs are inconsistent about the npm package name — some pages say
> `pg-sdk-node`, others `@phonepe-pg/pg-sdk-node`. This project uses `pg-sdk-node`. If
> `npm install` can't find it, swap the dependency name in `package.json` (and the import
> in `lib/phonepe.js`) to `@phonepe-pg/pg-sdk-node` — the API is the same either way.

## 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In **Settings → API**, copy the Project URL, `anon` public key, and `service_role`
   secret key.
3. In the Supabase SQL editor, run `supabase/migrations/0001_init.sql`. This creates
   `products`, `orders`, `order_items`, and `b2b_leads`, with Row Level Security enabled
   (shoppers can only ever read their own orders; all writes go through the server using
   the service-role key).
4. Copy `.env.example` to `.env.local` and fill in the three Supabase values.
5. Seed the catalog: `npm run seed:products`. Re-run any time you edit `lib/catalog.js`.
6. By default Supabase requires email confirmation for new sign-ups. For local testing
   you can turn this off in **Authentication → Providers → Email → Confirm email**.

## 3. Register with PhonePe & configure the gateway

If you haven't already, register as a PhonePe Business/PG merchant at
https://business.phonepe.com/pg/register. PhonePe will review your business (KYC,
bank details, etc.) before giving you live credentials — this step happens on their
side and can't be automated.

Once you have a merchant account:

1. From the PhonePe Business Dashboard, grab your **Client ID**, **Client Secret**, and
   **Client Version** (start in the **SANDBOX/UAT** environment for testing).
2. In the dashboard's webhook settings, register the callback URL:
   `https://yourdomain.com/api/phonepe/callback` (use an ngrok/tunnel URL while testing
   locally, since PhonePe needs to reach it from the internet).
3. Also in the webhook settings, choose a **username and password** for callback
   authentication — PhonePe signs each webhook call using these, and `pg-sdk-node`
   verifies the signature with them. Anyone can call your callback URL, but only
   requests signed with these credentials pass `validateCallback()`.
4. Fill in `.env.local`:
   - `PHONEPE_CLIENT_ID`, `PHONEPE_CLIENT_SECRET`, `PHONEPE_CLIENT_VERSION`
   - `PHONEPE_ENV=sandbox` (switch to `production` only once PhonePe has approved you
     for production and you're using production credentials)
   - `PHONEPE_WEBHOOK_USERNAME` / `PHONEPE_WEBHOOK_PASSWORD` — the same values you set
     in step 3
   - `NEXT_PUBLIC_SITE_URL` — your deployed URL (or `http://localhost:3000` in dev)

**Why this matters:** `PHONEPE_CLIENT_SECRET` and the webhook credentials only ever
live in `lib/phonepe.js` and the two route handlers under `app/api/`, all of which run
on the server. They are never sent to the browser and never appear in any client
component. Payment status (`orders.status`) is only ever flipped to `paid` by the
webhook handler after `validateCallback()` succeeds — not by the browser redirect,
which a user could otherwise fake by just visiting the return URL.

## 4. Run locally

```
npm run dev
```

Visit `http://localhost:3000`. To test PhonePe end-to-end locally you'll need a tunnel
(e.g. `ngrok http 3000`) so PhonePe's sandbox can call your webhook — set
`NEXT_PUBLIC_SITE_URL` to the tunnel URL while testing.

## 5. Go live checklist

- Run through PhonePe's UAT checklist and get production approval.
- Swap `PHONEPE_ENV` to `production` and use your production Client ID/Secret.
- Update the webhook URL in the PhonePe dashboard to your production domain.
- Turn Supabase email confirmation back on if you disabled it for testing.
- Consider adding refund handling (`PG_REFUND_COMPLETED` / `PG_REFUND_FAILED` in the
  webhook route currently just logs — extend it once you need refunds).
