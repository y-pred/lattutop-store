import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

export const metadata = {
  title: "lattuTop — Wooden Peg Dolls & Collectibles",
  description:
    "Hand-painted wooden peg dolls and collectibles, made in India — inspired by Channapatna craft.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="lt-app">
            <Header />
            {children}
            <Footer />
            <CartDrawer />
            <Toast />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
