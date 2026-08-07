"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { createClient } from "@/lib/supabase/client";
import LattuLogo from "@/components/decor/LattuLogo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/kids", label: "Kids Dolls" },
  { href: "/collectibles", label: "Collectibles" },
  { href: "/b2b", label: "Bulk & B2B" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  const firstName = user?.user_metadata?.name?.split(" ")[0] || user?.email?.split("@")[0];

  return (
    <header className="lt-header">
      <div className="lt-header-inner">
        <Link href="/" className="lt-logo" onClick={() => setMenuOpen(false)} aria-label="lattuTop home">
          <LattuLogo size={38} />
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
              <button className="lt-icon-btn">
                <User size={18} />
              </button>
              <div className="lt-account-menu">
                <p className="lt-account-name">Hi, {firstName}</p>
                <Link href="/account/orders">My orders</Link>
                <button onClick={signOut}>Sign out</button>
              </div>
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
