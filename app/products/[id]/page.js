import { notFound } from "next/navigation";
import { Package } from "lucide-react";
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
          <div className="lt-meta-row">
            <span>
              <Package size={14} /> {product.material}
            </span>
          </div>
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
        </div>
      </div>
    </section>
  );
}
