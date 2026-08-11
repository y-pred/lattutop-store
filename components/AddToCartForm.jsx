"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/components/cart-context";

export default function AddToCartForm({ product }) {
  const [qty, setQty] = useState(1);
  const { addToCart, openCart } = useCart();

  return (
    <div>
      <div className="lt-modal-buy">
        <div className="lt-stepper">
          <button className="lt-icon-btn" onClick={() => setQty(Math.max(1, qty - 1))}>
            <Minus size={14} />
          </button>
          <span>{qty}</span>
          <button className="lt-icon-btn" onClick={() => setQty(qty + 1)}>
            <Plus size={14} />
          </button>
        </div>
      </div>
      <button
        className="lt-btn lt-btn-primary lt-w-full"
        onClick={() => {
          addToCart(product, qty);
          openCart();
        }}
      >
        Add {qty > 1 ? qty + " " : ""}to cart
      </button>
    </div>
  );
}
