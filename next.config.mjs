/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lattutop.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  // Permanent redirects from the old Shopify store's URLs to the equivalent
  // pages on this site, so bookmarks, old links, and existing Google search
  // rankings survive the move off Shopify instead of 404ing.
  async redirects() {
    return [
      // Collection pages
      { source: "/collections/all", destination: "/", permanent: true },
      { source: "/collections/kids", destination: "/kids", permanent: true },
      { source: "/collections/collectible", destination: "/collectibles", permanent: true },

      // Kids products
      { source: "/products/buy-ganesha-wooden-peg-dolls-for-kids-online", destination: "/products/ganesha-combo", permanent: true },
      { source: "/products/krishna-radha-sudama-wooden-peg-dolls", destination: "/products/krishna-radha-sudama", permanent: true },
      { source: "/products/buy-ramayana-wooden-peg-dolls-for-kids-online", destination: "/products/ramayana-combo", permanent: true },
      { source: "/products/buy-multicolor-wooden-spinning-lattu-top-set-online", destination: "/products/lattu-spin-pack", permanent: true },
      { source: "/products/handmade-rakhi-set-pack-of-3", destination: "/products/rakhi-set-pack-3", permanent: true },
      { source: "/products/ganesha-wooden-peg-dolls-with-rakhi-set", destination: "/products/ganesha-rakhi-set", permanent: true },
      { source: "/products/krishna-radha-sudama-wooden-peg-dolls-with-rakhi-set", destination: "/products/krishna-radha-sudama-rakhi-set", permanent: true },
      { source: "/products/ramayana-wooden-peg-dolls-with-rakhi-set", destination: "/products/ramayana-rakhi-set", permanent: true },

      // Collectible products
      { source: "/products/buy-collectible-virat-kohli-online", destination: "/products/kohli", permanent: true },
      { source: "/products/buy-collectible-rajinikanth-online", destination: "/products/rajni", permanent: true },
      { source: "/products/buy-collectible-modi-ji-online", destination: "/products/modi-ji", permanent: true },
      { source: "/products/mbappe-wooden-collectible", destination: "/products/mbappe", permanent: true },
      { source: "/products/buy-salman-sallu-bhai-collectible-online", destination: "/products/sallu-bhai", permanent: true },
      { source: "/products/coder-wooden-collectible", destination: "/products/coder-collectible", permanent: true },
      { source: "/products/kalam-wooden-collectible", destination: "/products/kalam-collectible", permanent: true },
      { source: "/products/spidey-wooden-collectible", destination: "/products/spidey-collectible", permanent: true },
    ];
  },
};

export default nextConfig;
