"use client";

import { useCart } from "@/components/cart-context";

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return <div className="lt-toast">{toast}</div>;
}
