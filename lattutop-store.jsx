import React, { useState, useEffect } from "react";
import {
  ShoppingCart, X, Plus, Minus, User, ChevronRight, Check,
  Menu, ArrowLeft, Package, Sparkles, Building2, Star, Smartphone
} from "lucide-react";

/* ---------------------------------------------------------
   REAL CATALOG (pulled from lattutop.com)
--------------------------------------------------------- */

const kidsProducts = [
  {
    id: "ganesha-combo", section: "kids",
    name: "Ganesha Combo — Wooden Peg Dolls and Story Cards",
    subtitle: "3–9 years",
    price: 749, compareAt: 1550,
    image: "https://lattutop.com/cdn/shop/files/4_69f82713-0235-4cfa-a400-f970a4f23534.png?v=1692363442&width=533",
    image2: "https://lattutop.com/cdn/shop/files/9.png?v=1692363442&width=533",
    story: "Ganesha is known as the remover of obstacles, worshipped before any new beginning. Legend says his elephant head came from Shiva himself, after Parvati fashioned a guardian from clay — a reminder that even the most unusual beginnings can lead to something beloved.",
    material: "Hand-painted wood, cotton pouch, story cards included",
  },
  {
    id: "krishna-radha-sudama", section: "kids",
    name: "Krishna Radha Sudama Wooden Peg Dolls",
    subtitle: "3–9 years",
    price: 499, compareAt: 999,
    image: "https://lattutop.com/cdn/shop/files/18.png?v=1694854236&width=533",
    image2: "https://lattutop.com/cdn/shop/files/19.png?v=1694854236&width=533",
    story: "Sudama walked for days to visit his old friend Krishna, carrying nothing but a small bundle of flattened rice — all he had. Krishna welcomed him like a king, proving that true friendship never depends on what you're able to bring.",
    material: "Hand-painted wood, story cards included",
  },
  {
    id: "ramayana-combo", section: "kids",
    name: "Ramayana Dolls Combo — Wooden Peg Dolls & Story Cards",
    subtitle: "3–9 years",
    price: 899, compareAt: 1700,
    image: "https://lattutop.com/cdn/shop/files/5_a20ec986-6fcd-4b4c-91af-220c7005b160.png?v=1692363452&width=533",
    image2: "https://lattutop.com/cdn/shop/files/Untitleddesign_1.png?v=1692363452&width=533",
    story: "The Ramayana follows Prince Rama's journey through exile, loss, and the rescue of Sita — with loyal Hanuman by his side the entire way. It's one of India's oldest epics, still told to children as a story about courage and devotion.",
    material: "Hand-painted wood, cotton pouch, story cards included",
  },
  {
    id: "lattu-spin-pack", section: "kids",
    name: "Wooden Hand Spinning Lattu Toy — Pack of 5",
    subtitle: "3–9 years · Multicolour",
    price: 200,
    image: "https://lattutop.com/cdn/shop/files/ChatGPT_Image_Dec_12_2025_04_50_34_PM.png?v=1765538720&width=533",
    image2: "https://lattutop.com/cdn/shop/files/ChatGPT_Image_Dec_12_2025_04_54_43_PM.png?v=1765538720&width=533",
    story: "The lattu, or spinning top, is one of India's oldest playground games — spun by hand or with string, and raced by generations of kids on courtyards and streets long before screens existed.",
    material: "Hand-painted wood, pack of 5",
  },
];

const collectibles = [
  {
    id: "kohli", section: "collectible", name: "Kohli Wooden Collectible",
    subtitle: "Cricket Icon", price: 799, compareAt: 1399,
    image: "https://lattutop.com/cdn/shop/files/1.png?v=1686038755&width=533",
    image2: "https://lattutop.com/cdn/shop/files/2_ca163199-4723-4455-a363-32644552163a.png?v=1686038756&width=533",
    inspiration: "A tribute to focus, fitness, and leading from the front. For the desk of anyone chasing their own personal best.",
    suitedFor: ["Work Desk", "Gifting", "Fan Collection"],
    material: "Hand-painted wood",
  },
  {
    id: "kohli-rcb", section: "collectible", name: "Kohli RCB Edition Wooden Collectible",
    subtitle: "Cricket Icon · RCB Edition", price: 999,
    image: "https://lattutop.com/cdn/shop/files/eb6542957d713b6747a5fa6c4163cbc6ddb8a8c8b5309d575eee8cc69638dc15.png?v=1780314997&width=533",
    image2: "https://lattutop.com/cdn/shop/files/file_00000000e14871fab5cff736792e4b32.png?v=1780313970&width=533",
    inspiration: "A red-and-gold tribute for RCB's biggest fans — years of loyalty, finally on your shelf.",
    suitedFor: ["Work Desk", "Fan Collection", "Gifting"],
    material: "Hand-painted wood",
  },
  {
    id: "rajni", section: "collectible", name: "Rajni Wooden Collectible",
    subtitle: "Cinema Icon", price: 899, compareAt: 1399,
    image: "https://lattutop.com/cdn/shop/files/RajnikaanthFront.png?v=1692361102&width=533",
    image2: "https://lattutop.com/cdn/shop/files/RajnikaanthSide.png?v=1692361102&width=533",
    inspiration: "Style, swagger, and never explaining yourself — for the ones who walked in late and stole the show anyway.",
    suitedFor: ["Work Desk", "Fan Collection", "Gifting"],
    material: "Hand-painted wood",
  },
  {
    id: "modi-ji", section: "collectible", name: "Modi Ji Wooden Collectible",
    subtitle: "Leadership Icon", price: 799, compareAt: 1399,
    image: "https://lattutop.com/cdn/shop/files/ModiFront.png?v=1692361039&width=533",
    image2: "https://lattutop.com/cdn/shop/files/ModiJiSide.png?v=1692361055&width=533",
    inspiration: "A reminder that discipline and vision can move a billion people forward — for the office desk and boardroom shelf alike.",
    suitedFor: ["Office Desk", "Boardroom Gifting"],
    material: "Hand-painted wood",
  },
  {
    id: "mbappe", section: "collectible", name: "Mbappe Wooden Collectible",
    subtitle: "Football Icon", price: 1099,
    image: "https://lattutop.com/cdn/shop/files/ChatGPTImageJul7_2026_04_33_50PM.png?v=1783423041&width=533",
    inspiration: "For anyone who believes talent is built one practice session at a time — speed, skill, and the joy of the game.",
    suitedFor: ["Work Desk", "Fan Collection", "Gifting"],
    material: "Hand-painted wood",
  },
  {
    id: "sallu-bhai", section: "collectible", name: "Sallu Bhai Wooden Collectible",
    subtitle: "Cinema Icon", price: 999, compareAt: 1399,
    image: "https://lattutop.com/cdn/shop/files/SalmanFront.png?v=1692361139&width=533",
    image2: "https://lattutop.com/cdn/shop/files/SalmanSide.png?v=1692361139&width=533",
    inspiration: "Larger-than-life energy for the desk or the fan shelf — a nod to decades on the big screen.",
    suitedFor: ["Work Desk", "Fan Collection", "Gifting"],
    material: "Hand-painted wood",
  },
];

const allProducts = [...kidsProducts, ...collectibles];
const inr = (n) => "₹" + n.toLocaleString("en-IN");
const LOGO = "https://lattutop.com/cdn/shop/files/Capture-removebg-preview.png?v=1675926671";

const testimonials = [
  { name: "Shweta", text: "Glad to find wooden toys at this price point." },
  { name: "Komal", text: "I bought the Ganesha set for my little one, and he is so happy." },
  { name: "Nidhi", text: "Such an intuitive way to teach kids about our culture." },
  { name: "Esha", text: "Story time is her favourite now — she relates to the dolls so well." },
  { name: "Anjali", text: "My 6-year-old loves the Ramayana dolls and plays for hours." },
  { name: "Garima", text: "My son's new favourite story time companion, hands down." },
  { name: "Suchitra", text: "Her joy hearing the Ganesha tales made this purchase worth it." },
];

/* ---------------------------------------------------------
   PERSISTENT STORAGE HELPERS
--------------------------------------------------------- */

async function loadKey(key, fallback) {
  try {
    const res = await window.storage.get(key, false);
    return res ? JSON.parse(res.value) : fallback;
  } catch {
    return fallback;
  }
}
async function saveKey(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value), false);
  } catch {
    /* ignore write errors in demo */
  }
}

/* ---------------------------------------------------------
   SMALL PIECES
--------------------------------------------------------- */

function PaintStroke({ color = "#D9A023" }) {
  return (
    <svg className="lt-stroke" viewBox="0 0 220 20" preserveAspectRatio="none">
      <path d="M2 12 C 40 2, 80 18, 120 8 C 150 1, 190 14, 218 6" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Stars({ n = 5 }) {
  return (
    <div className="lt-stars">
      {Array.from({ length: n }).map((_, i) => <Star key={i} size={13} fill="#D9A023" stroke="#D9A023" />)}
    </div>
  );
}

/* Hand-painted peg-doll mascot, used decoratively (kept from the original concept) */
function PegDoll({ uid, body = "#2C3A5C", head = "#D9A023", pattern = "dots", patternColor = "#F3E9D2", size = 90, bob = false, delay = 0 }) {
  const clipId = `clip-${uid}`;
  return (
    <svg viewBox="0 0 120 172" width={size} height={(size * 172) / 120} className={"lt-doll-svg" + (bob ? " lt-doll-bob" : "")} style={bob ? { animationDelay: `${delay}s` } : undefined}>
      <defs>
        <clipPath id={clipId}><path d="M60 55 C30 55 22 92 20 162 L100 162 C98 92 90 55 60 55 Z" /></clipPath>
      </defs>
      <ellipse cx="60" cy="165" rx="34" ry="5" fill="#2C1B10" opacity="0.12" />
      <path d="M60 55 C30 55 22 92 20 162 L100 162 C98 92 90 55 60 55 Z" fill={body} />
      <g clipPath={`url(#${clipId})`}>
        {pattern === "dots" && Array.from({ length: 14 }).map((_, i) => (
          <circle key={i} cx={25 + (i % 5) * 18} cy={72 + Math.floor(i / 5) * 22} r="4" fill={patternColor} opacity="0.85" />
        ))}
        {pattern === "stripes" && Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x="8" y={64 + i * 14} width="104" height="6" fill={patternColor} opacity="0.85" />
        ))}
      </g>
      <circle cx="60" cy="30" r="26" fill={head} />
      <circle cx="51" cy="30" r="2.4" fill="#2C1B10" opacity="0.7" />
      <circle cx="69" cy="30" r="2.4" fill="#2C1B10" opacity="0.7" />
      <path d="M50 39 Q60 46 70 39" stroke="#2C1B10" strokeWidth="2" fill="none" opacity="0.55" strokeLinecap="round" />
    </svg>
  );
}

/* Little interactive lattu (spinning top) — a playful nod to the brand name */
function SpinningTop() {
  const [spinning, setSpinning] = useState(false);
  const spin = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 900);
  };
  return (
    <button className="lt-lattu-wrap" onClick={spin} aria-label="Spin the lattu">
      <svg viewBox="0 0 80 90" width="64" height="72" className={"lt-lattu" + (spinning ? " lt-spinning" : "")}>
        <path d="M40 4 L68 26 L60 60 L40 86 L20 60 L12 26 Z" fill="#D9A023" />
        <path d="M40 4 L68 26 L60 60 L40 40 Z" fill="#B23429" opacity="0.85" />
        <path d="M40 4 L12 26 L20 60 L40 40 Z" fill="#2C3A5C" opacity="0.85" />
        <circle cx="40" cy="8" r="5" fill="#F3E9D2" />
      </svg>
      <span>Give it a spin!</span>
    </button>
  );
}

function WaveDivider({ color = "#F3E9D2" }) {
  return (
    <svg className="lt-wave" viewBox="0 0 400 24" preserveAspectRatio="none">
      <path d="M0 12 Q 25 0, 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12 T 350 12 T 400 12 V24 H0 Z" fill={color} />
    </svg>
  );
}

/* ---------------------------------------------------------
   PRODUCT CARD
--------------------------------------------------------- */

function ProductCard({ product, onAdd, onView }) {
  const [hover, setHover] = useState(false);
  const isKids = product.section === "kids";
  const onSale = !!product.compareAt;

  return (
    <div className="lt-card">
      <div
        className="lt-card-media"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onView(product)}
      >
        {onSale && <span className="lt-badge">Sale</span>}
        <img src={hover && product.image2 ? product.image2 : product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="lt-card-body">
        <p className="lt-eyebrow">{product.subtitle}</p>
        <h3 className="lt-card-title" onClick={() => onView(product)}>{product.name}</h3>
        <p className="lt-card-desc">{(isKids ? product.story : product.inspiration).slice(0, 90)}…</p>

        {!isKids && (
          <div className="lt-tags">
            {product.suitedFor.map((t) => <span key={t} className="lt-tag">{t}</span>)}
          </div>
        )}

        <div className="lt-card-foot">
          <span className="lt-price">
            {inr(product.price)}
            {onSale && <span className="lt-compare">{inr(product.compareAt)}</span>}
          </span>
          <button className="lt-link-btn" onClick={() => onView(product)}>Details →</button>
        </div>
        <button className="lt-btn lt-btn-primary lt-w-full" onClick={() => onAdd(product, 1)}>Add to cart</button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   PRODUCT MODAL
--------------------------------------------------------- */

function ProductModal({ product, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(product.image);
  const isKids = product.section === "kids";
  const onSale = !!product.compareAt;

  return (
    <div className="lt-overlay" onClick={onClose}>
      <div className="lt-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lt-icon-btn lt-modal-close" onClick={onClose}><X size={18} /></button>
        <div className="lt-modal-grid">
          <div className="lt-modal-media">
            <img src={img} alt={product.name} />
            {product.image2 && (
              <div className="lt-thumb-row">
                <button className={img === product.image ? "lt-active" : ""} onClick={() => setImg(product.image)}>
                  <img src={product.image} alt="" />
                </button>
                <button className={img === product.image2 ? "lt-active" : ""} onClick={() => setImg(product.image2)}>
                  <img src={product.image2} alt="" />
                </button>
              </div>
            )}
          </div>
          <div className="lt-modal-info">
            <p className="lt-eyebrow">{product.subtitle}</p>
            <h2 className="lt-modal-title">{product.name}</h2>
            <p className="lt-story-text">{isKids ? product.story : product.inspiration}</p>
            <div className="lt-meta-row">
              <span><Package size={14} /> {product.material}</span>
            </div>
            {!isKids && (
              <div className="lt-tags">
                {product.suitedFor.map((t) => <span key={t} className="lt-tag">{t}</span>)}
              </div>
            )}
            <div className="lt-modal-buy">
              <span className="lt-price lt-price-lg">
                {inr(product.price)}
                {onSale && <span className="lt-compare">{inr(product.compareAt)}</span>}
              </span>
              <div className="lt-stepper">
                <button className="lt-icon-btn" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button>
                <span>{qty}</span>
                <button className="lt-icon-btn" onClick={() => setQty(qty + 1)}><Plus size={14} /></button>
              </div>
            </div>
            <button className="lt-btn lt-btn-primary lt-w-full" onClick={() => { onAdd(product, qty); onClose(); }}>
              Add {qty > 1 ? qty + " " : ""}to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   CART DRAWER
--------------------------------------------------------- */

function CartDrawer({ open, onClose, cart, updateQty, removeItem, onCheckout }) {
  const items = cart.map((c) => ({ ...c, product: allProducts.find((p) => p.id === c.id) })).filter((i) => i.product);
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div className={"lt-drawer-overlay" + (open ? " lt-open" : "")} onClick={onClose}>
      <div className={"lt-drawer" + (open ? " lt-open" : "")} onClick={(e) => e.stopPropagation()}>
        <div className="lt-drawer-head">
          <h3>Your Cart</h3>
          <button className="lt-icon-btn" onClick={onClose}><X size={18} /></button>
        </div>

        {items.length === 0 ? (
          <div className="lt-empty">
            <ShoppingCart size={40} strokeWidth={1.2} />
            <p>Your cart is empty. Browse Kids Dolls or Collectibles to get started.</p>
          </div>
        ) : (
          <>
            <div className="lt-drawer-items">
              {items.map((i) => (
                <div className="lt-cart-item" key={i.id}>
                  <img src={i.product.image} alt={i.product.name} />
                  <div className="lt-cart-item-info">
                    <p className="lt-cart-item-name">{i.product.name}</p>
                    <p className="lt-cart-item-price">{inr(i.product.price)}</p>
                    <div className="lt-stepper lt-stepper-sm">
                      <button className="lt-icon-btn" onClick={() => updateQty(i.id, i.qty - 1)}><Minus size={12} /></button>
                      <span>{i.qty}</span>
                      <button className="lt-icon-btn" onClick={() => updateQty(i.id, i.qty + 1)}><Plus size={12} /></button>
                    </div>
                  </div>
                  <button className="lt-remove" onClick={() => removeItem(i.id)}><X size={14} /></button>
                </div>
              ))}
            </div>
            <div className="lt-drawer-foot">
              <div className="lt-total-row"><span>Subtotal</span><span>{inr(total)}</span></div>
              <p className="lt-ship-note">Shipping & taxes calculated at checkout.</p>
              <button className="lt-btn lt-btn-primary lt-w-full" onClick={onCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   HEADER
--------------------------------------------------------- */

function Header({ page, setPage, cartCount, currentUser, onCartClick, onLoginClick, onLogout, onOrdersClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    { id: "home", label: "Home" },
    { id: "kids", label: "Kids Dolls" },
    { id: "collectibles", label: "Collectibles" },
    { id: "b2b", label: "Bulk & B2B" },
  ];
  return (
    <header className="lt-header">
      <div className="lt-header-inner">
        <button className="lt-logo" onClick={() => { setPage("home"); setMenuOpen(false); }}>
          <img src={LOGO} alt="lattuTop" />
        </button>

        <nav className={"lt-nav" + (menuOpen ? " lt-nav-open" : "")}>
          {nav.map((n) => (
            <button key={n.id} className={"lt-nav-link" + (page === n.id ? " lt-active" : "")}
              onClick={() => { setPage(n.id); setMenuOpen(false); }}>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="lt-header-actions">
          {currentUser ? (
            <div className="lt-account">
              <button className="lt-icon-btn"><User size={18} /></button>
              <div className="lt-account-menu">
                <p className="lt-account-name">Hi, {currentUser.name.split(" ")[0]}</p>
                <button onClick={onOrdersClick}>My orders</button>
                <button onClick={onLogout}>Sign out</button>
              </div>
            </div>
          ) : (
            <button className="lt-icon-btn" onClick={onLoginClick} title="Sign in"><User size={18} /></button>
          )}
          <button className="lt-icon-btn lt-cart-btn" onClick={onCartClick} title="Cart">
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="lt-cart-count">{cartCount}</span>}
          </button>
          <button className="lt-icon-btn lt-menu-btn" onClick={() => setMenuOpen(!menuOpen)}><Menu size={18} /></button>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------
   HOME
--------------------------------------------------------- */

function Home({ setPage, onView }) {
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
          <h1>Wooden peg dolls,<br />with a story to tell.</h1>
          <p className="lt-hero-copy">Handmade, hand-painted, 100% child-safe. Every doll comes with story cards that bring a little bit of Indian culture into playtime.</p>
          <div className="lt-hero-kids-actions">
            <button className="lt-btn lt-btn-candy" onClick={() => setPage("kids")}>Shop Kids Dolls <ChevronRight size={16} /></button>
            <SpinningTop />
          </div>
        </div>
        <div className="lt-hero-half lt-hero-collect">
          <p className="lt-eyebrow lt-eyebrow-light">For the workstation</p>
          <h1>Inspiration,<br />carved for your desk.</h1>
          <p className="lt-hero-copy">Hand-painted wooden collectibles of the icons people look up to — great for desks, shelves, and gifting.</p>
          <button className="lt-btn lt-btn-marigold" onClick={() => setPage("collectibles")}>Shop Collectibles <ChevronRight size={16} /></button>
        </div>
      </section>

      <section className="lt-strip">
        <div className="lt-strip-item"><Sparkles size={18} /><span>100% child-safe, handmade in India</span></div>
        <div className="lt-strip-item"><Package size={18} /><span>Inspired by Channapatna craft</span></div>
        <div className="lt-strip-item"><Building2 size={18} /><span>Bulk orders for schools & offices</span></div>
      </section>

      <section className="lt-section lt-kids-zone">
        <p className="lt-eyebrow">Our Toys</p>
        <h2 className="lt-section-title">Cultural stories, hand-painted in wood.</h2>
        <PaintStroke color="#B23429" />
        <div className="lt-grid lt-grid-preview">
          {kidsProducts.map((p) => <ProductCard key={p.id} product={p} onAdd={() => setPage("kids")} onView={onView} />)}
        </div>
        <button className="lt-link-btn lt-view-all" onClick={() => setPage("kids")}>View all Kids Dolls →</button>
      </section>

      <section className="lt-section lt-section-dark">
        <p className="lt-eyebrow lt-eyebrow-light">Our Collectibles</p>
        <h2 className="lt-section-title lt-title-light">Icons, hand-painted for your desk.</h2>
        <PaintStroke color="#D9A023" />
        <div className="lt-grid lt-grid-preview">
          {collectibles.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} onAdd={() => setPage("collectibles")} onView={onView} />)}
        </div>
        <button className="lt-link-btn lt-view-all lt-link-light" onClick={() => setPage("collectibles")}>View all Collectibles →</button>
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
          <span>Amazon</span><span>Flipkart</span><span>Meesho</span>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------
   CATEGORY PAGES
--------------------------------------------------------- */

function KidsSection({ onAdd, onView }) {
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
      <p className="lt-lede">Hand-painted wooden peg dolls that introduce children to India's stories and mythology, one character at a time.</p>
      <div className="lt-grid">
        {kidsProducts.map((p) => <ProductCard key={p.id} product={p} onAdd={onAdd} onView={onView} />)}
      </div>
    </section>
  );
}

function CollectiblesSection({ onAdd, onView }) {
  return (
    <section className="lt-section lt-section-dark">
      <p className="lt-eyebrow lt-eyebrow-light">Collectibles · For the desk</p>
      <h2 className="lt-section-title lt-title-light">Wooden collectibles for people who like a little inspiration in view.</h2>
      <PaintStroke color="#D9A023" />
      <p className="lt-lede lt-lede-light">Hand-painted figures of the icons people look up to most — perfect for a desk, shelf, or gift box.</p>
      <div className="lt-grid">
        {collectibles.map((p) => <ProductCard key={p.id} product={p} onAdd={onAdd} onView={onView} />)}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   AUTH
--------------------------------------------------------- */

function AuthPanel({ users, setUsers, setCurrentUser, onDone, onGuest }) {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (mode === "signup") {
      if (!form.name || !form.email || !form.password) { setError("Please fill in every field."); return; }
      if (users.some((u) => u.email === form.email)) { setError("An account with this email already exists."); return; }
      const newUser = { name: form.name, email: form.email, password: form.password };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      onDone && onDone();
    } else {
      const found = users.find((u) => u.email === form.email && u.password === form.password);
      if (!found) { setError("We couldn't find an account with that email and password."); return; }
      setCurrentUser(found);
      onDone && onDone();
    }
  };

  return (
    <div className="lt-auth">
      <div className="lt-auth-tabs">
        <button className={mode === "signin" ? "lt-active" : ""} onClick={() => setMode("signin")}>Sign in</button>
        <button className={mode === "signup" ? "lt-active" : ""} onClick={() => setMode("signup")}>Create account</button>
      </div>
      <form className="lt-form" onSubmit={submit}>
        {mode === "signup" && (
          <label>Full name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Anjali Rao" />
          </label>
        )}
        <label>Email
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
        </label>
        <label>Password
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
        </label>
        {error && <p className="lt-form-error">{error}</p>}
        <button className="lt-btn lt-btn-primary lt-w-full" type="submit">
          {mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>
      {onGuest && <button className="lt-link-btn lt-guest-link" onClick={onGuest}>Continue as guest →</button>}
    </div>
  );
}

function LoginModal({ onClose, users, setUsers, setCurrentUser }) {
  return (
    <div className="lt-overlay" onClick={onClose}>
      <div className="lt-modal lt-modal-narrow" onClick={(e) => e.stopPropagation()}>
        <button className="lt-icon-btn lt-modal-close" onClick={onClose}><X size={18} /></button>
        <p className="lt-eyebrow">Welcome</p>
        <h2 className="lt-modal-title">Your account</h2>
        <AuthPanel users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} onDone={onClose} />
      </div>
    </div>
  );
}

function OrdersModal({ onClose, orders }) {
  return (
    <div className="lt-overlay" onClick={onClose}>
      <div className="lt-modal lt-modal-narrow" onClick={(e) => e.stopPropagation()}>
        <button className="lt-icon-btn lt-modal-close" onClick={onClose}><X size={18} /></button>
        <p className="lt-eyebrow">Order history</p>
        <h2 className="lt-modal-title">My orders</h2>
        {orders.length === 0 ? (
          <p className="lt-story-text">No orders yet — your placed orders will show up here.</p>
        ) : (
          <div className="lt-orders-list">
            {orders.slice().reverse().map((o) => (
              <div className="lt-order-card" key={o.id}>
                <div className="lt-order-head">
                  <span>#{o.id}</span>
                  <span>{inr(o.total)}</span>
                </div>
                <p className="lt-order-items">{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</p>
                <p className="lt-order-pay">Paid via {o.payMethod}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   CHECKOUT
--------------------------------------------------------- */

function CheckoutModal({ cart, currentUser, users, setUsers, setCurrentUser, onClose, onComplete }) {
  const [step, setStep] = useState(currentUser ? "address" : "auth");
  const [address, setAddress] = useState({ name: currentUser?.name || "", phone: "", line1: "", city: "", state: "", pincode: "" });
  const [payMethod, setPayMethod] = useState("phonepe");
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");

  const items = cart.map((c) => ({ ...c, product: allProducts.find((p) => p.id === c.id) })).filter((i) => i.product);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  const addressValid = address.name && address.phone && address.line1 && address.city && address.pincode;
  const payLabels = { phonepe: "PhonePe (UPI / Card / Net Banking)", cod: "Cash on Delivery" };

  const pay = () => {
    setProcessing(true);
    setTimeout(() => {
      const id = "LT" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(id);
      setProcessing(false);
      setStep("success");
      onComplete({
        id, total,
        items: items.map((i) => ({ name: i.product.name, qty: i.qty })),
        payMethod: payLabels[payMethod],
        address,
      });
    }, 1400);
  };

  return (
    <div className="lt-overlay" onClick={step !== "success" ? onClose : undefined}>
      <div className="lt-modal lt-modal-checkout" onClick={(e) => e.stopPropagation()}>
        {step !== "success" && <button className="lt-icon-btn lt-modal-close" onClick={onClose}><X size={18} /></button>}

        {step === "auth" && (
          <>
            <p className="lt-eyebrow">Step 1 of 3</p>
            <h2 className="lt-modal-title">Sign in to check out</h2>
            <AuthPanel
              users={users} setUsers={setUsers} setCurrentUser={setCurrentUser}
              onDone={() => setStep("address")} onGuest={() => setStep("address")}
            />
          </>
        )}

        {step === "address" && (
          <>
            {currentUser && <button className="lt-back-link" onClick={onClose}><ArrowLeft size={14} /> Back to cart</button>}
            <p className="lt-eyebrow">Step 2 of 3</p>
            <h2 className="lt-modal-title">Shipping address</h2>
            <div className="lt-form">
              <label>Full name<input value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} /></label>
              <label>Phone number<input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} placeholder="10-digit mobile" /></label>
              <label>Address<input value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} placeholder="House no, street, area" /></label>
              <div className="lt-form-row">
                <label>City<input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} /></label>
                <label>State<input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} /></label>
                <label>Pincode<input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} /></label>
              </div>
            </div>
            <button className="lt-btn lt-btn-primary lt-w-full" disabled={!addressValid} onClick={() => setStep("payment")}>
              Continue to payment
            </button>
          </>
        )}

        {step === "payment" && (
          <>
            <button className="lt-back-link" onClick={() => setStep("address")}><ArrowLeft size={14} /> Address</button>
            <p className="lt-eyebrow">Step 3 of 3</p>
            <h2 className="lt-modal-title">Payment</h2>

            <div className="lt-order-summary">
              {items.map((i) => (
                <div className="lt-summary-row" key={i.id}><span>{i.product.name} × {i.qty}</span><span>{inr(i.product.price * i.qty)}</span></div>
              ))}
              <div className="lt-summary-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : inr(shipping)}</span></div>
              <div className="lt-summary-row lt-summary-total"><span>Total</span><span>{inr(total)}</span></div>
            </div>

            <div className="lt-pay-methods">
              <label className={"lt-pay-option" + (payMethod === "phonepe" ? " lt-active" : "")}>
                <input type="radio" name="pay" checked={payMethod === "phonepe"} onChange={() => setPayMethod("phonepe")} />
                <Smartphone size={16} /> PhonePe — UPI, Card, Net Banking
              </label>
              <label className={"lt-pay-option" + (payMethod === "cod" ? " lt-active" : "")}>
                <input type="radio" name="pay" checked={payMethod === "cod"} onChange={() => setPayMethod("cod")} />
                <Package size={16} /> Cash on Delivery
              </label>
            </div>

            <button className="lt-btn lt-btn-primary lt-w-full" onClick={pay} disabled={processing}>
              {processing ? "Processing payment…" : `Pay ${inr(total)}`}
            </button>
            <p className="lt-fineprint">This is a demo checkout — no real payment is taken. A live build connects to PhonePe's Payment Gateway API through a backend server.</p>
          </>
        )}

        {step === "success" && (
          <div className="lt-success">
            <div className="lt-success-icon"><Check size={26} /></div>
            <h2 className="lt-modal-title">Order placed!</h2>
            <p className="lt-story-text">Your order <strong>#{orderId}</strong> has been confirmed. A hand-painted parcel will be on its way soon.</p>
            <button className="lt-btn lt-btn-primary" onClick={onClose}>Continue shopping</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   B2B PAGE
--------------------------------------------------------- */

function SchoolScene() {
  return (
    <svg viewBox="0 0 260 170" className="lt-scene-svg">
      <rect x="0" y="0" width="260" height="170" rx="16" fill="#EAD9B0" />
      <rect x="18" y="20" width="90" height="60" rx="6" fill="#F3E9D2" stroke="#2C1B10" strokeOpacity="0.15" />
      <path d="M30 34 h66 M30 44 h66 M30 54 h40" stroke="#B23429" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <rect x="16" y="118" width="228" height="8" rx="4" fill="#8B5A2B" />
      <g transform="translate(140,50)"><PegDoll uid="scn-school-1" body="#B23429" head="#D9A023" pattern="stripes" size={54} /></g>
      <g transform="translate(190,58)"><PegDoll uid="scn-school-2" body="#2C3A5C" head="#F3E9D2" pattern="dots" size={46} /></g>
      <g transform="translate(90,64)"><PegDoll uid="scn-school-3" body="#0E6B4F" head="#D9A023" pattern="dots" size={44} /></g>
    </svg>
  );
}

function OfficeScene() {
  return (
    <svg viewBox="0 0 260 170" className="lt-scene-svg">
      <rect x="0" y="0" width="260" height="170" rx="16" fill="#DCE1E8" />
      <rect x="16" y="118" width="228" height="8" rx="4" fill="#2C3A5C" />
      <rect x="30" y="70" width="70" height="46" rx="4" fill="#2C1B10" opacity="0.85" />
      <rect x="34" y="74" width="62" height="34" rx="2" fill="#8FB4D9" />
      <path d="M180 118 L180 90 Q180 78 195 78 Q210 78 210 92" stroke="#0E6B4F" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="195" cy="76" rx="16" ry="10" fill="#0E6B4F" />
      <rect x="205" y="96" width="26" height="22" rx="3" fill="#B23429" />
      <path d="M205 100 h26" stroke="#F3E9D2" strokeWidth="3" />
      <g transform="translate(118,54)"><PegDoll uid="scn-office-1" body="#F3E9D2" head="#8B5A2B" pattern="stripes" size={58} /></g>
    </svg>
  );
}

function RestaurantScene() {
  return (
    <svg viewBox="0 0 260 170" className="lt-scene-svg">
      <rect x="0" y="0" width="260" height="170" rx="16" fill="#3A2416" />
      <rect x="16" y="60" width="228" height="8" rx="4" fill="#8B5A2B" />
      <rect x="16" y="112" width="228" height="8" rx="4" fill="#8B5A2B" />
      <circle cx="205" cy="40" r="10" fill="#D9A023" opacity="0.85" />
      <path d="M205 30 q3 -10 0 -16 q-3 6 0 16" fill="#D9A023" opacity="0.7" />
      <g transform="translate(28,20)"><PegDoll uid="scn-rest-1" body="#B23429" head="#D9A023" pattern="dots" size={40} /></g>
      <g transform="translate(80,10)"><PegDoll uid="scn-rest-2" body="#2C3A5C" head="#F3E9D2" pattern="stripes" size={46} /></g>
      <g transform="translate(140,72)"><PegDoll uid="scn-rest-3" body="#8B5A2B" head="#F3E9D2" pattern="dots" size={40} /></g>
      <g transform="translate(190,66)"><PegDoll uid="scn-rest-4" body="#D9A023" head="#B23429" pattern="stripes" size={44} /></g>
    </svg>
  );
}

function B2BPage() {
  const [form, setForm] = useState({ org: "", type: "School", contact: "", phone: "", email: "", qty: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.org || !form.contact || !form.phone || !form.email) return;
    setSubmitted(true);
  };

  return (
    <section className="lt-section">
      <p className="lt-eyebrow">Bulk & B2B</p>
      <h2 className="lt-section-title">Hand-painted, at scale — for schools, offices and restaurants.</h2>
      <PaintStroke color="#2C3A5C" />
      <p className="lt-lede">We supply bulk orders of Kids Dolls and Collectibles for classrooms, corporate gifting, hotel and restaurant decor, and festival hampers — with volume pricing and custom finishing on request.</p>

      <div className="lt-scene-grid">
        <div className="lt-scene-card">
          <SchoolScene />
          <h4>Schools</h4>
          <p>Kids Dolls and story cards for classrooms and preschools — a hands-on way to teach culture alongside the curriculum.</p>
        </div>
        <div className="lt-scene-card">
          <OfficeScene />
          <h4>Offices</h4>
          <p>A single polished Channapatna-style collectible, boxed for gifting — for clients, new joiners, or year-end employee gifts.</p>
        </div>
        <div className="lt-scene-card">
          <RestaurantScene />
          <h4>Restaurants</h4>
          <p>Collectibles arranged as shelf and mantle decor — warm, handmade accents for dining rooms and lobbies.</p>
        </div>
      </div>

      <div className="lt-b2b-grid">
        <div className="lt-b2b-info">
          <div className="lt-info-card"><h4>Volume pricing</h4><p>Tiered discounts starting at 25 units, with deeper pricing above 100 and 500 units.</p></div>
          <div className="lt-info-card"><h4>Customisation</h4><p>Logo tags, custom colourways, or a themed set built around your brand or curriculum.</p></div>
          <div className="lt-info-card"><h4>Who we work with</h4><p>Schools & preschools, corporate gifting teams, restaurants & hospitality decor, event organisers.</p></div>
          <div className="lt-info-card"><h4>Response time</h4><p>Our team replies within 2 business days with a quote and sample options.</p></div>
        </div>

        <div className="lt-b2b-form-wrap">
          {submitted ? (
            <div className="lt-success">
              <div className="lt-success-icon"><Check size={26} /></div>
              <h3 className="lt-modal-title">Enquiry received</h3>
              <p className="lt-story-text">Thank you, {form.contact.split(" ")[0]}. Our team will reach out to {form.email} within 2 business days with pricing and next steps.</p>
              <button className="lt-btn lt-btn-outline" onClick={() => { setSubmitted(false); setForm({ org: "", type: "School", contact: "", phone: "", email: "", qty: "", message: "" }); }}>
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form className="lt-form" onSubmit={submit}>
              <label>Organisation name<input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} placeholder="e.g. Sunrise Public School" /></label>
              <label>Organisation type
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option>School</option><option>Office</option><option>Restaurant / Hospitality</option><option>Event / Festival</option><option>Other</option>
                </select>
              </label>
              <div className="lt-form-row">
                <label>Contact person<input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></label>
                <label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
              </div>
              <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
              <label>Estimated quantity<input value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} placeholder="e.g. 100 units" /></label>
              <label>Tell us more<textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What are you looking for?" /></label>
              <button className="lt-btn lt-btn-primary lt-w-full" type="submit">Send enquiry</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   FOOTER
--------------------------------------------------------- */

function Footer({ setPage }) {
  return (
    <footer className="lt-footer">
      <div className="lt-footer-inner">
        <div className="lt-footer-brand">
          <img src={LOGO} alt="lattuTop" className="lt-footer-logo" />
          <p>Hand-painted wooden dolls and collectibles, made in India — inspired by Channapatna craft.</p>
        </div>
        <div className="lt-footer-col">
          <h5>Shop</h5>
          <button onClick={() => setPage("kids")}>Kids Dolls</button>
          <button onClick={() => setPage("collectibles")}>Collectibles</button>
          <button onClick={() => setPage("b2b")}>Bulk & B2B</button>
        </div>
        <div className="lt-footer-col">
          <h5>Info</h5>
          <p>Contact Us · Shipping & Delivery · Refund Policy · Privacy Policy</p>
        </div>
      </div>
      <p className="lt-footer-note">© 2026 lattuTop. Prototype storefront — not the live store.</p>
    </footer>
  );
}

/* ---------------------------------------------------------
   APP
--------------------------------------------------------- */

export default function App() {
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    (async () => {
      const [c, u, cu, o] = await Promise.all([
        loadKey("lattutop-cart", []),
        loadKey("lattutop-users", []),
        loadKey("lattutop-current-user", null),
        loadKey("lattutop-orders", []),
      ]);
      setCart(c); setUsers(u); setCurrentUser(cu); setOrders(o);
      setReady(true);
    })();
  }, []);

  useEffect(() => { if (ready) saveKey("lattutop-cart", cart); }, [cart, ready]);
  useEffect(() => { if (ready) saveKey("lattutop-users", users); }, [users, ready]);
  useEffect(() => { if (ready) saveKey("lattutop-current-user", currentUser); }, [currentUser, ready]);
  useEffect(() => { if (ready) saveKey("lattutop-orders", orders); }, [orders, ready]);

  const flashToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2000); };

  const addToCart = (product, qty = 1) => {
    if (!product || !product.id) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id: product.id, qty }];
    });
    flashToast(`${product.name} added to cart`);
  };

  const updateQty = (id, qty) => {
    setCart((prev) => (qty < 1 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))));
  };
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="lt-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        .lt-app{ --bg:#F3E9D2; --bg-soft:#EDE0C0; --cream:#FBF6EA; --ink:#2C1B10; --ink-soft:#5B4636;
          --marigold:#D9A023; --indigo:#2C3A5C; --sindoor:#B23429; --line: rgba(44,27,16,0.14);
          background:var(--bg); color:var(--ink); font-family:'Manrope',sans-serif; min-height:100vh;
          line-height:1.55; -webkit-font-smoothing:antialiased; }
        .lt-app *{ box-sizing:border-box; }
        .lt-app h1, .lt-app h2, .lt-app h3, .lt-app .lt-modal-title{ font-family:'Fraunces',serif; font-weight:600; letter-spacing:-0.01em; margin:0; }
        .lt-app button{ font-family:inherit; cursor:pointer; border:none; background:none; color:inherit; }
        .lt-app input, .lt-app select, .lt-app textarea{ font-family:inherit; }
        .lt-app img{ max-width:100%; display:block; }

        .lt-eyebrow{ font-family:'Space Mono',monospace; text-transform:uppercase; letter-spacing:0.12em; font-size:0.72rem; color:var(--sindoor); margin:0 0 8px; }
        .lt-eyebrow-light{ color:var(--marigold); }

        .lt-header{ position:sticky; top:0; z-index:40; background:var(--cream); border-bottom:1px solid var(--line); }
        .lt-header-inner{ max-width:1180px; margin:0 auto; padding:10px 24px; display:flex; align-items:center; gap:20px; }
        .lt-logo img{ height:42px; width:auto; }
        .lt-nav{ display:flex; gap:4px; margin-left:12px; flex:1; }
        .lt-nav-link{ padding:8px 12px; border-radius:8px; font-size:0.92rem; color:var(--ink-soft); }
        .lt-nav-link:hover{ background:var(--bg-soft); }
        .lt-nav-link.lt-active{ color:var(--ink); background:var(--bg-soft); font-weight:600; }
        .lt-header-actions{ display:flex; align-items:center; gap:6px; margin-left:auto; }
        .lt-icon-btn{ width:38px; height:38px; display:flex; align-items:center; justify-content:center; border-radius:10px; position:relative; }
        .lt-icon-btn:hover{ background:var(--bg-soft); }
        .lt-cart-count{ position:absolute; top:-4px; right:-4px; background:var(--sindoor); color:#fff; font-size:0.65rem; font-weight:700; width:18px; height:18px; border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .lt-menu-btn{ display:none; }
        .lt-account{ position:relative; }
        .lt-account-menu{ display:none; position:absolute; right:0; top:44px; background:var(--cream); border:1px solid var(--line); border-radius:10px; padding:10px; min-width:150px; box-shadow:0 8px 24px rgba(44,27,16,0.15); z-index:5; }
        .lt-account:hover .lt-account-menu{ display:block; }
        .lt-account-name{ font-size:0.85rem; font-weight:600; margin:0 0 6px; }
        .lt-account-menu button{ display:block; width:100%; text-align:left; font-size:0.85rem; padding:6px 4px; color:var(--ink-soft); }
        .lt-account-menu button:hover{ color:var(--sindoor); }

        .lt-hero{ display:grid; grid-template-columns:1fr 1fr; min-height:420px; }
        .lt-hero-half{ padding:56px 48px; display:flex; flex-direction:column; justify-content:center; }
        .lt-hero-kids{ background:linear-gradient(160deg,var(--sindoor),#8f2a20); color:var(--cream); }
        .lt-hero-collect{ background:linear-gradient(160deg,var(--indigo),#1c2740); color:var(--cream); }
        .lt-hero h1{ font-size:clamp(1.8rem,3vw,2.4rem); color:var(--cream); line-height:1.12; margin-bottom:14px; }
        .lt-hero-copy{ max-width:400px; opacity:0.88; margin-bottom:22px; }

        .lt-strip{ display:flex; justify-content:center; gap:48px; flex-wrap:wrap; padding:22px 24px; background:var(--bg-soft); font-size:0.85rem; font-weight:600; }
        .lt-strip-item{ display:flex; align-items:center; gap:8px; color:var(--ink-soft); }

        .lt-btn{ display:inline-flex; align-items:center; gap:6px; justify-content:center; padding:13px 22px; border-radius:10px; font-weight:700; font-size:0.92rem; transition:transform .15s ease; }
        .lt-btn:hover{ transform:translateY(-1px); }
        .lt-btn:disabled{ opacity:0.5; cursor:not-allowed; transform:none; }
        .lt-btn-primary{ background:var(--ink); color:var(--cream); }
        .lt-btn-cream{ background:var(--cream); color:var(--sindoor); }
        .lt-btn-marigold{ background:var(--marigold); color:var(--ink); }
        .lt-btn-outline{ background:transparent; border:1.5px solid var(--ink); color:var(--ink); }
        .lt-w-full{ width:100%; }
        .lt-link-btn{ font-weight:700; font-size:0.85rem; color:var(--sindoor); }
        .lt-link-light{ color:var(--marigold); }
        .lt-view-all{ display:block; margin-top:24px; text-align:center; }

        .lt-section{ max-width:1180px; margin:0 auto; padding:64px 24px; }
        .lt-section-dark{ max-width:none; background:var(--indigo); color:var(--cream); }
        .lt-section-dark > *{ max-width:1180px; margin-left:auto; margin-right:auto; }
        .lt-section-title{ font-size:clamp(1.4rem,2.4vw,2rem); max-width:720px; line-height:1.2; margin-bottom:14px; }
        .lt-title-light{ color:var(--cream); }
        .lt-lede{ max-width:640px; color:var(--ink-soft); margin-top:14px; }
        .lt-lede-light{ color:#D9CFC0; }
        .lt-stroke{ width:150px; height:16px; margin:4px 0 6px; display:block; }

        .lt-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:36px; }
        .lt-grid-preview{ grid-template-columns:repeat(4,1fr); }
        .lt-card{ background:var(--cream); border-radius:16px; border:1px solid var(--line); overflow:hidden; display:flex; flex-direction:column; transition:transform .15s ease, box-shadow .15s ease; }
        .lt-card:hover{ transform:translateY(-3px); box-shadow:0 12px 28px rgba(44,27,16,0.14); }
        .lt-card-media{ position:relative; background:var(--bg-soft); aspect-ratio:1/1; overflow:hidden; cursor:pointer; }
        .lt-card-media img{ width:100%; height:100%; object-fit:cover; }
        .lt-badge{ position:absolute; top:10px; left:10px; background:var(--sindoor); color:#fff; font-size:0.65rem; font-weight:700; padding:4px 8px; border-radius:100px; z-index:2; }
        .lt-card-body{ padding:16px 18px 18px; display:flex; flex-direction:column; gap:8px; flex:1; }
        .lt-card-title{ font-size:1rem; cursor:pointer; line-height:1.3; }
        .lt-card-desc{ font-size:0.84rem; color:var(--ink-soft); min-height:40px; }
        .lt-card-foot{ display:flex; align-items:center; justify-content:space-between; margin:4px 0 6px; }
        .lt-price{ font-family:'Space Mono',monospace; font-weight:700; display:flex; align-items:center; gap:8px; }
        .lt-compare{ font-weight:400; text-decoration:line-through; color:var(--ink-soft); font-size:0.82em; }
        .lt-price-lg{ font-size:1.3rem; }
        .lt-tags{ display:flex; flex-wrap:wrap; gap:6px; }
        .lt-tag{ font-size:0.68rem; text-transform:uppercase; letter-spacing:0.04em; background:var(--bg-soft); padding:4px 8px; border-radius:100px; color:var(--ink-soft); font-weight:700; }
        .lt-story-text{ font-size:0.9rem; color:var(--ink-soft); }

        .lt-testimonials{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:32px; }
        .lt-testimonial{ background:var(--cream); border:1px solid var(--line); border-radius:14px; padding:18px; }
        .lt-testimonial p{ font-size:0.9rem; margin:8px 0; color:var(--ink-soft); }
        .lt-testimonial span{ font-size:0.8rem; font-weight:700; }
        .lt-stars{ display:flex; gap:2px; }

        .lt-asseen{ text-align:center; padding:40px 24px 64px; }
        .lt-asseen-row{ display:flex; justify-content:center; gap:32px; margin-top:12px; font-family:'Fraunces',serif; font-weight:600; font-size:1.1rem; color:var(--ink-soft); flex-wrap:wrap; }

        .lt-overlay{ position:fixed; inset:0; background:rgba(20,12,7,0.55); display:flex; align-items:center; justify-content:center; z-index:60; padding:20px; }
        .lt-modal{ background:var(--cream); border-radius:20px; max-width:760px; width:100%; padding:32px; position:relative; max-height:88vh; overflow-y:auto; }
        .lt-modal-narrow{ max-width:420px; }
        .lt-modal-checkout{ max-width:480px; }
        .lt-modal-close{ position:absolute; top:16px; right:16px; }
        .lt-back-link{ display:flex; align-items:center; gap:6px; font-size:0.82rem; font-weight:600; color:var(--ink-soft); margin-bottom:14px; }
        .lt-modal-grid{ display:grid; grid-template-columns:240px 1fr; gap:28px; }
        .lt-modal-media img{ border-radius:14px; width:100%; aspect-ratio:1/1; object-fit:cover; background:var(--bg-soft); }
        .lt-thumb-row{ display:flex; gap:8px; margin-top:8px; }
        .lt-thumb-row button{ width:50px; height:50px; border-radius:8px; overflow:hidden; border:2px solid transparent; opacity:0.6; }
        .lt-thumb-row button.lt-active{ border-color:var(--indigo); opacity:1; }
        .lt-thumb-row img{ width:100%; height:100%; object-fit:cover; }
        .lt-modal-title{ font-size:1.4rem; margin-bottom:10px; }
        .lt-meta-row{ display:flex; gap:16px; font-size:0.78rem; color:var(--ink-soft); margin:10px 0; }
        .lt-meta-row span{ display:flex; align-items:center; gap:5px; }
        .lt-modal-buy{ display:flex; align-items:center; justify-content:space-between; margin:16px 0; }
        .lt-stepper{ display:flex; align-items:center; gap:10px; background:var(--bg-soft); border-radius:100px; padding:4px 10px; }
        .lt-stepper-sm{ padding:2px 8px; gap:8px; }
        .lt-stepper span{ min-width:16px; text-align:center; font-weight:700; font-size:0.85rem; }

        .lt-drawer-overlay{ position:fixed; inset:0; background:rgba(20,12,7,0); pointer-events:none; transition:background .2s ease; z-index:55; }
        .lt-drawer-overlay.lt-open{ background:rgba(20,12,7,0.5); pointer-events:auto; }
        .lt-drawer{ position:fixed; top:0; right:0; height:100%; width:400px; max-width:92vw; background:var(--cream); transform:translateX(100%); transition:transform .25s ease; display:flex; flex-direction:column; z-index:56; }
        .lt-drawer.lt-open{ transform:translateX(0); }
        .lt-drawer-head{ display:flex; align-items:center; justify-content:space-between; padding:20px 22px; border-bottom:1px solid var(--line); }
        .lt-drawer-items{ flex:1; overflow-y:auto; padding:14px 22px; display:flex; flex-direction:column; gap:14px; }
        .lt-cart-item{ display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--line); padding-bottom:14px; }
        .lt-cart-item img{ width:56px; height:56px; object-fit:cover; border-radius:8px; background:var(--bg-soft); flex-shrink:0; }
        .lt-cart-item-info{ flex:1; }
        .lt-cart-item-name{ font-weight:700; font-size:0.85rem; }
        .lt-cart-item-price{ font-family:'Space Mono',monospace; font-size:0.8rem; color:var(--ink-soft); margin:2px 0 6px; }
        .lt-remove{ color:var(--ink-soft); }
        .lt-drawer-foot{ padding:18px 22px 24px; border-top:1px solid var(--line); }
        .lt-total-row{ display:flex; justify-content:space-between; font-weight:700; margin-bottom:4px; }
        .lt-ship-note{ font-size:0.76rem; color:var(--ink-soft); margin:0 0 14px; }
        .lt-empty{ flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; padding:40px; text-align:center; color:var(--ink-soft); }

        .lt-form{ display:flex; flex-direction:column; gap:14px; margin:16px 0; }
        .lt-form-row{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
        .lt-form label{ display:flex; flex-direction:column; gap:6px; font-size:0.8rem; font-weight:700; color:var(--ink-soft); }
        .lt-form input, .lt-form select, .lt-form textarea{ border:1.5px solid var(--line); border-radius:9px; padding:11px 12px; font-size:0.92rem; color:var(--ink); background:var(--bg); }
        .lt-form input:focus, .lt-form select:focus, .lt-form textarea:focus{ outline:2px solid var(--indigo); outline-offset:1px; }
        .lt-form-error{ color:var(--sindoor); font-size:0.82rem; font-weight:600; margin:0; }

        .lt-auth-tabs{ display:flex; gap:4px; background:var(--bg-soft); border-radius:10px; padding:4px; margin-top:14px; }
        .lt-auth-tabs button{ flex:1; padding:9px; border-radius:8px; font-weight:700; font-size:0.85rem; color:var(--ink-soft); }
        .lt-auth-tabs button.lt-active{ background:var(--cream); color:var(--ink); }
        .lt-guest-link{ display:block; text-align:center; margin-top:6px; }

        .lt-order-summary{ background:var(--bg-soft); border-radius:12px; padding:14px 16px; margin:14px 0; }
        .lt-summary-row{ display:flex; justify-content:space-between; font-size:0.86rem; padding:5px 0; color:var(--ink-soft); }
        .lt-summary-total{ border-top:1px solid var(--line); margin-top:6px; padding-top:10px; font-weight:700; color:var(--ink); font-size:0.98rem; }
        .lt-pay-methods{ display:flex; flex-direction:column; gap:8px; margin-bottom:18px; }
        .lt-pay-option{ display:flex; align-items:center; gap:10px; border:1.5px solid var(--line); border-radius:10px; padding:12px 14px; font-weight:600; font-size:0.9rem; }
        .lt-pay-option.lt-active{ border-color:var(--indigo); background:var(--bg-soft); }
        .lt-fineprint{ font-size:0.72rem; color:var(--ink-soft); text-align:center; margin-top:10px; }
        .lt-success{ text-align:center; padding:14px 6px; display:flex; flex-direction:column; align-items:center; gap:10px; }
        .lt-success-icon{ width:52px; height:52px; border-radius:50%; background:#DDEBD9; color:#2E6B3E; display:flex; align-items:center; justify-content:center; }

        .lt-orders-list{ display:flex; flex-direction:column; gap:10px; margin-top:14px; }
        .lt-order-card{ border:1px solid var(--line); border-radius:12px; padding:12px 14px; }
        .lt-order-head{ display:flex; justify-content:space-between; font-weight:700; font-family:'Space Mono',monospace; font-size:0.85rem; }
        .lt-order-items{ font-size:0.82rem; color:var(--ink-soft); margin:6px 0 2px; }
        .lt-order-pay{ font-size:0.76rem; color:var(--ink-soft); }

        .lt-b2b-grid{ display:grid; grid-template-columns:1fr 1.2fr; gap:32px; margin-top:36px; }
        .lt-b2b-info{ display:grid; grid-template-columns:1fr 1fr; gap:14px; align-content:start; }
        .lt-info-card{ background:var(--cream); border:1px solid var(--line); border-radius:12px; padding:16px; }
        .lt-info-card h4{ font-family:'Fraunces',serif; font-size:1rem; margin-bottom:6px; }
        .lt-info-card p{ font-size:0.83rem; color:var(--ink-soft); margin:0; }
        .lt-b2b-form-wrap{ background:var(--cream); border:1px solid var(--line); border-radius:16px; padding:26px; }

        .lt-footer{ background:var(--indigo); color:#D9CFC0; padding:48px 24px 20px; }
        .lt-footer-inner{ max-width:1180px; margin:0 auto; display:grid; grid-template-columns:1.4fr 1fr 1fr; gap:40px; }
        .lt-footer-logo{ height:40px; filter:brightness(0) invert(1); margin-bottom:10px; }
        .lt-footer-brand p{ font-size:0.85rem; max-width:280px; }
        .lt-footer-col h5{ color:var(--cream); font-family:'Space Mono',monospace; font-size:0.75rem; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:12px; }
        .lt-footer-col button{ display:block; font-size:0.86rem; margin-bottom:8px; text-align:left; color:#D9CFC0; }
        .lt-footer-col p{ font-size:0.82rem; }
        .lt-footer-note{ text-align:center; font-size:0.72rem; opacity:0.6; margin-top:36px; }

        .lt-toast{ position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:var(--ink); color:var(--cream); padding:12px 20px; border-radius:100px; font-size:0.85rem; font-weight:600; z-index:80; box-shadow:0 8px 24px rgba(0,0,0,0.25); }

        /* Lively-but-simple kids styling */
        .lt-kids-zone{ background-color:#FBF3E4; border-radius:24px; }
        .lt-hero-mascots{ display:flex; gap:10px; margin-bottom:14px; }
        .lt-mascots-inline{ margin-bottom:6px; }
        .lt-doll-svg{ display:block; filter:drop-shadow(0 4px 6px rgba(44,27,16,0.18)); }
        .lt-doll-bob{ animation: lt-bob 2.6s ease-in-out infinite; }
        @keyframes lt-bob{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-7px); } }

        .lt-hero-kids-actions{ display:flex; align-items:center; gap:22px; flex-wrap:wrap; margin-top:4px; }
        .lt-btn-candy{ background:linear-gradient(135deg,#F0B93A,#E8562F); color:#2C1B10; box-shadow:0 6px 16px rgba(232,86,47,0.35); }
        .lt-btn-candy:hover{ transform:translateY(-2px) scale(1.03); }

        .lt-lattu-wrap{ display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--cream); font-size:0.72rem; font-weight:700; }
        .lt-lattu{ transform-origin:40px 50px; }
        .lt-lattu.lt-spinning{ animation: lt-spin 0.9s cubic-bezier(.2,.6,.3,1); }
        @keyframes lt-spin{ 0%{ transform:rotate(0deg) scale(1); } 60%{ transform:rotate(900deg) scale(0.94); } 100%{ transform:rotate(1080deg) scale(1); } }

        .lt-wave{ width:100%; height:20px; display:block; }

        .lt-kids-zone .lt-card{ border-top:4px solid transparent; }
        .lt-kids-zone .lt-card:nth-child(4n+1){ border-top-color:#B23429; }
        .lt-kids-zone .lt-card:nth-child(4n+2){ border-top-color:#0E6B4F; }
        .lt-kids-zone .lt-card:nth-child(4n+3){ border-top-color:#2C3A5C; }
        .lt-kids-zone .lt-card:nth-child(4n+4){ border-top-color:#D9A023; }
        .lt-kids-zone .lt-card:hover{ transform:translateY(-4px); box-shadow:0 12px 22px rgba(44,27,16,0.15); }

        /* B2B scene cards */
        .lt-scene-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:36px; }
        .lt-scene-card{ background:var(--cream); border:1px solid var(--line); border-radius:16px; padding:14px 16px 18px; }
        .lt-scene-svg{ width:100%; border-radius:12px; display:block; margin-bottom:12px; }
        .lt-scene-card h4{ font-family:'Fraunces',serif; font-size:1.05rem; margin-bottom:6px; }
        .lt-scene-card p{ font-size:0.84rem; color:var(--ink-soft); margin:0; }

        @media (max-width: 860px){
          .lt-hero{ grid-template-columns:1fr; }
          .lt-grid{ grid-template-columns:repeat(2,1fr); }
          .lt-testimonials{ grid-template-columns:1fr 1fr; }
          .lt-modal-grid{ grid-template-columns:1fr; }
          .lt-b2b-grid{ grid-template-columns:1fr; }
          .lt-scene-grid{ grid-template-columns:1fr; }
          .lt-footer-inner{ grid-template-columns:1fr; }
        }
        @media (max-width: 620px){
          .lt-nav{ position:absolute; top:100%; left:0; right:0; background:var(--cream); flex-direction:column; border-bottom:1px solid var(--line); padding:8px; display:none; }
          .lt-nav.lt-nav-open{ display:flex; }
          .lt-menu-btn{ display:flex; }
          .lt-grid{ grid-template-columns:1fr 1fr; gap:14px; }
          .lt-testimonials{ grid-template-columns:1fr; }
          .lt-hero-half{ padding:40px 24px; }
          .lt-form-row{ grid-template-columns:1fr; }
          .lt-b2b-info{ grid-template-columns:1fr; }
          .lt-drawer{ width:100%; }
        }
        @media (prefers-reduced-motion: reduce){
          .lt-app *{ transition:none !important; animation:none !important; }
        }
      `}</style>

      <Header
        page={page} setPage={setPage} cartCount={cartCount}
        currentUser={currentUser}
        onCartClick={() => setCartOpen(true)}
        onLoginClick={() => setShowLogin(true)}
        onOrdersClick={() => setOrdersOpen(true)}
        onLogout={() => setCurrentUser(null)}
      />

      {page === "home" && <Home setPage={setPage} onView={setSelectedProduct} />}
      {page === "kids" && <KidsSection onAdd={addToCart} onView={setSelectedProduct} />}
      {page === "collectibles" && <CollectiblesSection onAdd={addToCart} onView={setSelectedProduct} />}
      {page === "b2b" && <B2BPage />}

      <Footer setPage={setPage} />

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />
      )}

      <CartDrawer
        open={cartOpen} onClose={() => setCartOpen(false)} cart={cart}
        updateQty={updateQty} removeItem={removeItem}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      {checkoutOpen && (
        <CheckoutModal
          cart={cart} currentUser={currentUser} users={users}
          setUsers={setUsers} setCurrentUser={setCurrentUser}
          onClose={() => setCheckoutOpen(false)}
          onComplete={(order) => { setOrders((prev) => [...prev, order]); setCart([]); }}
        />
      )}

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />
      )}

      {ordersOpen && <OrdersModal onClose={() => setOrdersOpen(false)} orders={orders} />}

      {toast && <div className="lt-toast">{toast}</div>}
    </div>
  );
}
