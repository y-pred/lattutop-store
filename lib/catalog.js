/* ---------------------------------------------------------
   STATIC CATALOG SOURCE DATA
   This is the single source of truth for seeding Supabase.
   Run `npm run seed:products` to upsert these into the
   `products` table. Once seeded, pages read from Supabase,
   not from this file.
--------------------------------------------------------- */

export const kidsProducts = [
  {
    id: "ganesha-combo",
    section: "kids",
    name: "Ganesha Combo — Wooden Peg Dolls and Story Cards",
    subtitle: "3–9 years",
    price: 749,
    compare_at: 1550,
    image: "https://lattutop.com/cdn/shop/files/4_69f82713-0235-4cfa-a400-f970a4f23534.png?v=1692363442&width=533",
    image2: "https://lattutop.com/cdn/shop/files/9.png?v=1692363442&width=533",
    story:
      "Ganesha is known as the remover of obstacles, worshipped before any new beginning. Legend says his elephant head came from Shiva himself, after Parvati fashioned a guardian from clay — a reminder that even the most unusual beginnings can lead to something beloved.",
    material: "Hand-painted wood, cotton pouch, story cards included",
    suited_for: [],
  },
  {
    id: "krishna-radha-sudama",
    section: "kids",
    name: "Krishna Radha Sudama Wooden Peg Dolls",
    subtitle: "3–9 years",
    price: 499,
    compare_at: 999,
    image: "https://lattutop.com/cdn/shop/files/18.png?v=1694854236&width=533",
    image2: "https://lattutop.com/cdn/shop/files/19.png?v=1694854236&width=533",
    story:
      "Sudama walked for days to visit his old friend Krishna, carrying nothing but a small bundle of flattened rice — all he had. Krishna welcomed him like a king, proving that true friendship never depends on what you're able to bring.",
    material: "Hand-painted wood, story cards included",
    suited_for: [],
  },
  {
    id: "ramayana-combo",
    section: "kids",
    name: "Ramayana Dolls Combo — Wooden Peg Dolls & Story Cards",
    subtitle: "3–9 years",
    price: 899,
    compare_at: 1700,
    image: "https://lattutop.com/cdn/shop/files/5_a20ec986-6fcd-4b4c-91af-220c7005b160.png?v=1692363452&width=533",
    image2: "https://lattutop.com/cdn/shop/files/Untitleddesign_1.png?v=1692363452&width=533",
    story:
      "The Ramayana follows Prince Rama's journey through exile, loss, and the rescue of Sita — with loyal Hanuman by his side the entire way. It's one of India's oldest epics, still told to children as a story about courage and devotion.",
    material: "Hand-painted wood, cotton pouch, story cards included",
    suited_for: [],
  },
  {
    id: "lattu-spin-pack",
    section: "kids",
    name: "Wooden Hand Spinning Lattu Toy — Pack of 5",
    subtitle: "3–9 years · Multicolour",
    price: 200,
    compare_at: null,
    image: "https://lattutop.com/cdn/shop/files/ChatGPT_Image_Dec_12_2025_04_50_34_PM.png?v=1765538720&width=533",
    image2: "https://lattutop.com/cdn/shop/files/ChatGPT_Image_Dec_12_2025_04_54_43_PM.png?v=1765538720&width=533",
    story:
      "The lattu, or spinning top, is one of India's oldest playground games — spun by hand or with string, and raced by generations of kids on courtyards and streets long before screens existed.",
    material: "Hand-painted wood, pack of 5",
    suited_for: [],
  },
];

export const collectibles = [
  {
    id: "kohli",
    section: "collectible",
    name: "Kohli Wooden Collectible",
    subtitle: "Cricket Icon",
    price: 799,
    compare_at: 1399,
    image: "https://lattutop.com/cdn/shop/files/1.png?v=1686038755&width=533",
    image2: "https://lattutop.com/cdn/shop/files/2_ca163199-4723-4455-a363-32644552163a.png?v=1686038756&width=533",
    story: "A tribute to focus, fitness, and leading from the front. For the desk of anyone chasing their own personal best.",
    material: "Hand-painted wood",
    suited_for: ["Work Desk", "Gifting", "Fan Collection"],
  },
  {
    id: "kohli-rcb",
    section: "collectible",
    name: "Kohli RCB Edition Wooden Collectible",
    subtitle: "Cricket Icon · RCB Edition",
    price: 999,
    compare_at: null,
    image: "https://lattutop.com/cdn/shop/files/eb6542957d713b6747a5fa6c4163cbc6ddb8a8c8b5309d575eee8cc69638dc15.png?v=1780314997&width=533",
    image2: "https://lattutop.com/cdn/shop/files/file_00000000e14871fab5cff736792e4b32.png?v=1780313970&width=533",
    story: "A red-and-gold tribute for RCB's biggest fans — years of loyalty, finally on your shelf.",
    material: "Hand-painted wood",
    suited_for: ["Work Desk", "Fan Collection", "Gifting"],
  },
  {
    id: "rajni",
    section: "collectible",
    name: "Rajni Wooden Collectible",
    subtitle: "Cinema Icon",
    price: 899,
    compare_at: 1399,
    image: "https://lattutop.com/cdn/shop/files/RajnikaanthFront.png?v=1692361102&width=533",
    image2: "https://lattutop.com/cdn/shop/files/RajnikaanthSide.png?v=1692361102&width=533",
    story: "Style, swagger, and never explaining yourself — for the ones who walked in late and stole the show anyway.",
    material: "Hand-painted wood",
    suited_for: ["Work Desk", "Fan Collection", "Gifting"],
  },
  {
    id: "modi-ji",
    section: "collectible",
    name: "Modi Ji Wooden Collectible",
    subtitle: "Leadership Icon",
    price: 799,
    compare_at: 1399,
    image: "https://lattutop.com/cdn/shop/files/ModiFront.png?v=1692361039&width=533",
    image2: "https://lattutop.com/cdn/shop/files/ModiJiSide.png?v=1692361055&width=533",
    story: "A reminder that discipline and vision can move a billion people forward — for the office desk and boardroom shelf alike.",
    material: "Hand-painted wood",
    suited_for: ["Office Desk", "Boardroom Gifting"],
  },
  {
    id: "mbappe",
    section: "collectible",
    name: "Mbappe Wooden Collectible",
    subtitle: "Football Icon",
    price: 1099,
    compare_at: null,
    image: "https://lattutop.com/cdn/shop/files/ChatGPTImageJul7_2026_04_33_50PM.png?v=1783423041&width=533",
    image2: null,
    story: "For anyone who believes talent is built one practice session at a time — speed, skill, and the joy of the game.",
    material: "Hand-painted wood",
    suited_for: ["Work Desk", "Fan Collection", "Gifting"],
  },
  {
    id: "sallu-bhai",
    section: "collectible",
    name: "Sallu Bhai Wooden Collectible",
    subtitle: "Cinema Icon",
    price: 999,
    compare_at: 1399,
    image: "https://lattutop.com/cdn/shop/files/SalmanFront.png?v=1692361139&width=533",
    image2: "https://lattutop.com/cdn/shop/files/SalmanSide.png?v=1692361139&width=533",
    story: "Larger-than-life energy for the desk or the fan shelf — a nod to decades on the big screen.",
    material: "Hand-painted wood",
    suited_for: ["Work Desk", "Fan Collection", "Gifting"],
  },
];

export const allCatalogProducts = [...kidsProducts, ...collectibles];

export const testimonials = [
  { name: "Shweta", text: "Glad to find wooden toys at this price point." },
  { name: "Komal", text: "I bought the Ganesha set for my little one, and he is so happy." },
  { name: "Nidhi", text: "Such an intuitive way to teach kids about our culture." },
  { name: "Esha", text: "Story time is her favourite now — she relates to the dolls so well." },
  { name: "Anjali", text: "My 6-year-old loves the Ramayana dolls and plays for hours." },
  { name: "Garima", text: "My son's new favourite story time companion, hands down." },
  { name: "Suchitra", text: "Her joy hearing the Ganesha tales made this purchase worth it." },
];

export const LOGO = "https://lattutop.com/cdn/shop/files/Capture-removebg-preview.png?v=1675926671";
