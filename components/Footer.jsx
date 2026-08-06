import Link from "next/link";
import Image from "next/image";
import { LOGO } from "@/lib/catalog";

export default function Footer() {
  return (
    <footer className="lt-footer">
      <div className="lt-footer-inner">
        <div className="lt-footer-brand">
          <Image src={LOGO} alt="lattuTop" width={140} height={40} className="lt-footer-logo" unoptimized />
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
