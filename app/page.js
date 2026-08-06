import Link from "next/link";
import { Building2, ChevronRight, Package, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import PegDoll from "@/components/decor/PegDoll";
import PaintStroke from "@/components/decor/PaintStroke";
import SpinningTop from "@/components/decor/SpinningTop";
import Stars from "@/components/decor/Stars";
import { getFeaturedProducts } from "@/lib/products-data";
import { testimonials } from "@/lib/catalog";

export default async function HomePage() {
  const { kids, collectibles } = await getFeaturedProducts();

  return (
    <>
      <section className="lt-hero">
        <div className="lt-hero-half lt-hero-kids">
          <div className="lt-hero-mascots">
            <PegDoll uid="hero-m1" body="#2C3A5C" head="#D9A023" pattern="dots" size={54} bob delay={0} />
            <PegDoll uid="hero-m2" body="#D9A023" head="#B23429" pattern="stripes" size={54} bob delay={0.3} />
            <PegDoll uid="hero-m3" body="#0E6B4F" head="#F3E9D2" pattern="dots" size={54} bob delay={0.6} />
          </div>
          <p className="lt-eyebrow lt-eyebrow-light">For little hands</p>
          <h1>
            Wooden peg dolls,
            <br />
            with a story to tell.
          </h1>
          <p className="lt-hero-copy">
            Handmade, hand-painted, 100% child-safe. Every doll comes with story cards that bring a little bit of
            Indian culture into playtime.
          </p>
          <div className="lt-hero-kids-actions">
            <Link href="/kids" className="lt-btn lt-btn-candy">
              Shop Kids Dolls <ChevronRight size={16} />
            </Link>
            <SpinningTop />
          </div>
        </div>
        <div className="lt-hero-half lt-hero-collect">
          <p className="lt-eyebrow lt-eyebrow-light">For the workstation</p>
          <h1>
            Inspiration,
            <br />
            carved for your desk.
          </h1>
          <p className="lt-hero-copy">
            Hand-painted wooden collectibles of the icons people look up to — great for desks, shelves, and
            gifting.
          </p>
          <Link href="/collectibles" className="lt-btn lt-btn-marigold">
            Shop Collectibles <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      <section className="lt-strip">
        <div className="lt-strip-item">
          <Sparkles size={18} />
          <span>100% child-safe, handmade in India</span>
        </div>
        <div className="lt-strip-item">
          <Package size={18} />
          <span>Inspired by Channapatna craft</span>
        </div>
        <div className="lt-strip-item">
          <Building2 size={18} />
          <span>Bulk orders for schools & offices</span>
        </div>
      </section>

      <section className="lt-section lt-kids-zone">
        <p className="lt-eyebrow">Our Toys</p>
        <h2 className="lt-section-title">Cultural stories, hand-painted in wood.</h2>
        <PaintStroke color="#B23429" />
        <div className="lt-grid lt-grid-preview">
          {kids.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Link href="/kids" className="lt-link-btn lt-view-all">
          View all Kids Dolls →
        </Link>
      </section>

      <section className="lt-section lt-section-dark">
        <p className="lt-eyebrow lt-eyebrow-light">Our Collectibles</p>
        <h2 className="lt-section-title lt-title-light">Icons, hand-painted for your desk.</h2>
        <PaintStroke color="#D9A023" />
        <div className="lt-grid lt-grid-preview">
          {collectibles.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Link href="/collectibles" className="lt-link-btn lt-view-all lt-link-light">
          View all Collectibles →
        </Link>
      </section>

      <section className="lt-section">
        <p className="lt-eyebrow">What our customers say</p>
        <h2 className="lt-section-title">Loved by parents, gifted by fans.</h2>
        <PaintStroke color="#2C3A5C" />
        <div className="lt-testimonials">
          {testimonials.map((t) => (
            <div className="lt-testimonial" key={t.name}>
              <Stars />
              <p>"{t.text}"</p>
              <span>— {t.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lt-asseen">
        <p className="lt-eyebrow">We're also on</p>
        <div className="lt-asseen-row">
          <span>Amazon</span>
          <span>Flipkart</span>
          <span>Meesho</span>
        </div>
      </section>
    </>
  );
}
