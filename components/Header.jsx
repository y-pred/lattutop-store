"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/kids", label: "Kids Dolls" },
  { href: "/collectibles", label: "Collectibles" },
  { href: "/b2b", label: "Bulk & B2B" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  // Click-to-toggle instead of CSS :hover — the gap between the icon and
  // the dropdown was a dead zone that dropped the hover state before the
  // cursor ever reached "My orders" / "Sign out". Click also works on
  // touch devices, which hover never did.
  useEffect(() => {
    if (!accountMenuOpen) return;
    const closeOnOutsideClick = (e) => {
      if (!e.target.closest(".lt-account")) setAccountMenuOpen(false);
    };
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [accountMenuOpen]);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setAccountMenuOpen(false);
    router.refresh();
  };

  const firstName = user?.user_metadata?.name?.split(" ")[0] || user?.email?.split("@")[0];

  return (
    <header className="lt-header">
      <div className="lt-header-inner">
        <Link href="/" className="lt-logo" onClick={() => setMenuOpen(false)} aria-label="lattuTop home">
          <Image src="/brand/lattutop-logo.png" alt="lattuTop" width={242} height={122} className="lt-logo-img" priority />
        </Link>

        <nav className={"lt-nav" + (menuOpen ? " lt-nav-open" : "")}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={"lt-nav-link" + (pathname === n.href ? " lt-active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="lt-header-actions">
          {user ? (
            <div className="lt-account">
              <button
                className="lt-icon-btn"
                onClick={() => setAccountMenuOpen((open) => !open)}
                aria-expanded={accountMenuOpen}
              >
                <User size={18} />
              </button>
              {accountMenuOpen && (
                <div className="lt-account-menu">
                  <p className="lt-account-name">Hi, {firstName}</p>
                  <Link href="/account/orders" onClick={() => setAccountMenuOpen(false)}>
                    My orders
                  </Link>
                  <button onClick={signOut}>Sign out</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/account" className="lt-icon-btn" title="Sign in">
              <User size={18} />
            </Link>
          )}
          <button className="lt-icon-btn lt-cart-btn" onClick={openCart} title="Cart">
            <ShoppingCart size={18} />
            {count > 0 && <span className="lt-cart-count">{count}</span>}
          </button>
          <button className="lt-icon-btn lt-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
