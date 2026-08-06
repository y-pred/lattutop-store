"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { inr } from "@/lib/format";
import { useCart } from "@/components/cart-context";

export default function ProductCard({ product }) {
  const [hover, setHover] = useState(false);
  const { addToCart } = useCart();
  const isKids = product.section === "kids";
  const onSale = !!product.compare_at;
  const description = (isKids ? product.story : product.story || "").slice(0, 90);

  return (
    <div className="lt-card">
      <Link
        href={`/products/${product.id}`}
        className="lt-card-media"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {onSale && <span className="lt-badge">Sale</span>}
        <Image
          src={hover && product.image2 ? product.image2 : product.image}
          alt={product.name}
          width={533}
          height={533}
          unoptimized
        />
      </Link>
      <div className="lt-card-body">
        <p className="lt-eyebrow">{product.subtitle}</p>
        <Link href={`/products/${product.id}`} className="lt-card-title">
          {product.name}
        </Link>
        <p className="lt-card-desc">{description}…</p>

        {!isKids && product.suited_for?.length > 0 && (
          <div className="lt-tags">
            {product.suited_for.map((t) => (
              <span key={t} className="lt-tag">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="lt-card-foot">
          <span className="lt-price">
            {inr(product.price)}
            {onSale && <span className="lt-compare">{inr(product.compare_at)}</span>}
          </span>
          <Link href={`/products/${product.id}`} className="lt-link-btn">
            Details →
          </Link>
        </div>
        <button className="lt-btn lt-btn-primary lt-w-full" onClick={() => addToCart(product, 1)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
