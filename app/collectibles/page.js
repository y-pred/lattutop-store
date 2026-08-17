import ProductCard from "@/components/ProductCard";
import PaintStroke from "@/components/decor/PaintStroke";
import { getProductsBySection } from "@/lib/products-data";

export const metadata = { title: "Collectibles — lattuTop" };

export default async function CollectiblesPage() {
  const products = await getProductsBySection("collectible");

  return (
    <section className="lt-section lt-section-dark">
      <p className="lt-eyebrow lt-eyebrow-light">Collectibles · For the desk</p>
      <h2 className="lt-section-title lt-title-light">
        Wooden collectibles for people who like a little inspiration in view.
      </h2>
      <PaintStroke color="#D9A023" />
      <p className="lt-lede lt-lede-light">
        Hand-painted figures of the icons people look up to most — perfect for a desk, shelf, or gift box.
      </p>
      <div className="lt-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
