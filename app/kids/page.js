import ProductCard from "@/components/ProductCard";
import PegDoll from "@/components/decor/PegDoll";
import PaintStroke from "@/components/decor/PaintStroke";
import { getProductsBySection } from "@/lib/products-data";

export const metadata = { title: "Kids Dolls — lattuTop" };

export default async function KidsPage() {
  const products = await getProductsBySection("kids");

  return (
    <section className="lt-section lt-kids-zone">
      <div className="lt-hero-mascots lt-mascots-inline">
        <PegDoll uid="kp-m1" body="#B23429" head="#D9A023" pattern="stripes" size={44} bob delay={0} />
        <PegDoll uid="kp-m2" body="#2C3A5C" head="#F3E9D2" pattern="dots" size={44} bob delay={0.2} />
        <PegDoll uid="kp-m3" body="#0E6B4F" head="#D9A023" pattern="dots" size={44} bob delay={0.4} />
        <PegDoll uid="kp-m4" body="#D9A023" head="#B23429" pattern="stripes" size={44} bob delay={0.6} />
      </div>
      <p className="lt-eyebrow">Kids Dolls · Ages 3–9</p>
      <h2 className="lt-section-title">Indian cultural dolls, each with a story card.</h2>
      <PaintStroke color="#B23429" />
      <p className="lt-lede">
        Hand-painted wooden peg dolls that introduce children to India's stories and mythology, one character at a
        time.
      </p>
      <div className="lt-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
