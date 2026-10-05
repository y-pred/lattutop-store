"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "lattutop-cart-v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");

  // Load persisted cart once on mount (client-only — this is just local
  // shopping-cart state, not sensitive data, so localStorage is fine here).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupt cart */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const flashToast = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(flashToast._t);
    flashToast._t = window.setTimeout(() => setToast(""), 2000);
  }, []);

  // `product` is the denormalized product snapshot (id, name, price, image)
  // so the drawer can render without re-fetching from Supabase. `variant` is
  // an optional { name, image } for products with a lightweight variant
  // picker — two different variants of the same product are kept as
  // separate cart lines, keyed by cartItemId (productId + variant name).
  const addToCart = useCallback(
    (product, qty = 1, variant = null) => {
      if (!product?.id) return;
      const cartItemId = variant?.name ? `${product.id}::${variant.name}` : product.id;
      setItems((prev) => {
        const existing = prev.find((i) => i.cartItemId === cartItemId);
        if (existing) {
          return prev.map((i) => (i.cartItemId === cartItemId ? { ...i, qty: i.qty + qty } : i));
        }
        return [
          ...prev,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            variant: variant?.name || null,
            price: product.price,
            image: variant?.image || product.image,
            qty,
          },
        ];
      });
      flashToast(`${product.name}${variant?.name ? ` (${variant.name})` : ""} added to cart`);
    },
    [flashToast]
  );

  const updateQty = useCallback((cartItemId, qty) => {
    setItems((prev) =>
      qty < 1
        ? prev.filter((i) => i.cartItemId !== cartItemId)
        : prev.map((i) => (i.cartItemId === cartItemId ? { ...i, qty } : i))
    );
  }, []);

  const removeItem = useCallback((cartItemId) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      toast,
      flashToast,
    }),
    [items, count, subtotal, addToCart, updateQty, removeItem, clearCart, cartOpen, toast, flashToast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
