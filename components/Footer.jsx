import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="lt-footer">
      <div className="lt-footer-inner">
        <div className="lt-footer-brand">
          <Image
            src="/brand/lattutop-logo.png"
            alt="lattuTop"
            width={242}
            height={122}
            className="lt-footer-logo lt-footer-logo-img"
          />
          <p>Hand-painted wooden dolls and collectibles, made in India — inspired by Channapatna craft.</p>
        </div>
        <div className="lt-footer-col">
          <h5>Shop</h5>
          <Link href="/kids">Kids Dolls</Link>
          <Link href="/collectibles">Collectibles</Link>
          <Link href="/b2b">Bulk & B2B</Link>
        </div>
        <div className="lt-footer-col">
          <h5>Info</h5>
          <p>Contact Us · Shipping & Delivery · Refund Policy · Privacy Policy</p>
        </div>
      </div>
      <p className="lt-footer-note">© {new Date().getFullYear()} lattuTop.</p>
    </footer>
  );
}
