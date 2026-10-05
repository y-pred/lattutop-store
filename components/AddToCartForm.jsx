"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/components/cart-context";

export default function AddToCartForm({ product }) {
  const [qty, setQty] = useState(1);
  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);
  const { addToCart, openCart } = useCart();

  return (
    <div>
      {variants.length > 0 && (
        <div className="lt-variant-picker">
          <p className="lt-variant-label">Choose your coder:</p>
          <div className="lt-variant-swatches">
            {variants.map((v) => (
              <button
                key={v.name}
                type="button"
                className={"lt-variant-swatch" + (selectedVariant?.name === v.name ? " lt-active" : "")}
                onClick={() => setSelectedVariant(v)}
              >
                {v.image && <Image src={v.image} alt={v.name} width={48} height={48} unoptimized />}
                <span>{v.name}</span>
                {selectedVariant?.name === v.name && (
                  <span className="lt-variant-check">
                    <Check size={11} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
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
          addToCart(product, qty, selectedVariant);
          openCart();
        }}
      >
        Add {qty > 1 ? qty + " " : ""}to cart
      </button>
    </div>
  );
}
