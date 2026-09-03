"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { inr } from "@/lib/format";
import { useCart } from "@/components/cart-context";

export default function CartDrawer() {
  const { items, subtotal, cartOpen, closeCart, updateQty, removeItem } = useCart();
  const router = useRouter();

  const checkout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className={"lt-drawer-overlay" + (cartOpen ? " lt-open" : "")} onClick={closeCart}>
      <div className={"lt-drawer" + (cartOpen ? " lt-open" : "")} onClick={(e) => e.stopPropagation()}>
        <div className="lt-drawer-head">
          <h3>Your Cart</h3>
          <button className="lt-icon-btn" onClick={closeCart}>
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="lt-empty">
            <ShoppingCart size={40} strokeWidth={1.2} />
            <p>Your cart is empty. Browse Kids Dolls or Collectibles to get started.</p>
          </div>
        ) : (
          <>
            <div className="lt-drawer-items">
              {items.map((i) => (
                <div className="lt-cart-item" key={i.id}>
                  <Image src={i.image} alt={i.name} width={56} height={56} unoptimized />
                  <div className="lt-cart-item-info">
                    <p className="lt-cart-item-name">{i.name}</p>
                    <p className="lt-cart-item-price">{inr(i.price)}</p>
                    <div className="lt-stepper lt-stepper-sm">
                      <button className="lt-icon-btn" onClick={() => updateQty(i.id, i.qty - 1)}>
                        <Minus size={12} />
                      </button>
                      <span>{i.qty}</span>
                      <button className="lt-icon-btn" onClick={() => updateQty(i.id, i.qty + 1)}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button className="lt-remove" onClick={() => removeItem(i.id)}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="lt-drawer-foot">
              <div className="lt-total-row">
                <span>Subtotal</span>
                <span>{inr(subtotal)}</span>
              </div>
              <p className="lt-ship-note">Free shipping, taxes included.</p>
              <button className="lt-btn lt-btn-primary lt-w-full" onClick={checkout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
