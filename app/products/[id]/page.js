import { notFound } from "next/navigation";
import { Package, Check, Truck, Sparkles } from "lucide-react";
import { getProductById } from "@/lib/products-data";
import { inr } from "@/lib/format";
import ProductGallery from "@/components/ProductGallery";
import AddToCartForm from "@/components/AddToCartForm";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  return { title: product ? `${product.name} — lattuTop` : "Product — lattuTop" };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const onSale = !!product.compare_at;

  return (
    <section className="lt-section">
      <div className="lt-modal-grid">
        <ProductGallery product={product} />
        <div className="lt-modal-info">
          <p className="lt-eyebrow">{product.subtitle}</p>
          <h1 className="lt-modal-title">{product.name}</h1>
          <p className="lt-story-text">{product.story}</p>
          {product.material && (
            <ul className="lt-spec-list">
              {product.material
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .map((spec) => (
                  <li key={spec}>
                    <Package size={12} /> {spec}
                  </li>
                ))}
            </ul>
          )}
          {product.suited_for?.length > 0 && (
            <div className="lt-tags">
              {product.suited_for.map((t) => (
                <span key={t} className="lt-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
          <p className="lt-price lt-price-lg">
            <span className="lt-price-current">{inr(product.price)}</span>
            {onSale && <span className="lt-compare">{inr(product.compare_at)}</span>}
          </p>
          <AddToCartForm product={product} />

          {product.features?.length > 0 && (
            <div className="lt-detail-block">
              <h4>
                <Sparkles size={15} /> Key Features
              </h4>
              <ul className="lt-detail-list">
                {product.features.map((f) => (
                  <li key={f}>
                    <Check size={13} /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.package_contents?.length > 0 && (
            <div className="lt-detail-block">
              <h4>
                <Package size={15} /> Package Contents
              </h4>
              <ul className="lt-detail-list">
                {product.package_contents.map((c) => (
                  <li key={c}>
                    <Check size={13} /> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="lt-detail-block">
            <h4>
              <Truck size={15} /> Shipping & Returns
            </h4>
            <p className="lt-story-text lt-story-text-sm">
              Ships within 2–4 business days across India. Delivery typically takes 4–8 business days depending on
              location. If your order arrives damaged or defective, reach out within 48 hours of delivery and we'll
              sort out a replacement or refund.
            </p>
            <h4 className="lt-detail-subhead">Care Instructions</h4>
            <p className="lt-story-text lt-story-text-sm">
              Wipe gently with a soft, dry cloth. Avoid direct sunlight, water, and harsh chemicals to keep the
              hand-painted finish looking its best.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
