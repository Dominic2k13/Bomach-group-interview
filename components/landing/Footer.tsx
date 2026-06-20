import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="text-white text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Naira Threads
          </p>
          <p className="text-sm leading-relaxed max-w-xs">
            Modern, minimal premium streetwear. Designed in Nigeria, built for
            everywhere.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/shop?category=tops" className="hover:text-white transition-colors">Tops</Link></li>
            <li><Link href="/shop?category=bottoms" className="hover:text-white transition-colors">Bottoms</Link></li>
            <li><Link href="/shop?category=outerwear" className="hover:text-white transition-colors">Outerwear</Link></li>
            <li><Link href="/shop?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">Account</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition-colors">Order History</Link></li>
            <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} Naira Threads. All rights reserved.</p>
        <p>Lagos · Abuja · London</p>
      </div>
    </footer>
  );
}
