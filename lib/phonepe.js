import "server-only"; // Build fails if this file is ever imported from a "use client" component.

import { StandardCheckoutClient, Env } from "@phonepe-pg/pg-sdk-node";

let cachedClient = null;

function resolveEnv() {
  return process.env.PHONEPE_ENV === "production" ? Env.PRODUCTION : Env.SANDBOX;
}

// StandardCheckoutClient must only be instantiated once per process
// (the SDK throws if you call getInstance() with different credentials
// after the first call), so we cache it on the module.
export function getPhonePeClient() {
  if (cachedClient) return cachedClient;

  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const clientVersion = Number(process.env.PHONEPE_CLIENT_VERSION || 1);

  if (!clientId || !clientSecret) {
    throw new Error(
      "PhonePe is not configured. Set PHONEPE_CLIENT_ID and PHONEPE_CLIENT_SECRET in your server environment (.env.local), never in client code."
    );
  }

  cachedClient = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, resolveEnv());
  return cachedClient;
}
