"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems)();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-4 md:py-5 transition-colors duration-300",
          isHome && !menuOpen ? "bg-transparent" : "bg-[#f5f3ef] border-b border-stone-200"
        )}
      >
        {/* Left nav — desktop only */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/shop"
            className={cn(
              "text-xs tracking-widest uppercase font-medium transition-colors",
              isHome ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-stone-900"
            )}
          >
            Shop
          </Link>
          <Link
            href="/shop?category=outerwear"
            className={cn(
              "text-xs tracking-widest uppercase font-medium transition-colors",
              isHome ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-stone-900"
            )}
          >
            Outerwear
          </Link>
        </nav>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={20} className="text-stone-900" />
          ) : (
            <Menu
              size={20}
              className={isHome ? "text-white" : "text-stone-900"}
            />
          )}
        </button>

        {/* Logo — centered */}
        <Link
          href="/"
          className={cn(
            "text-xs md:text-sm font-semibold tracking-[0.3em] uppercase absolute left-1/2 -translate-x-1/2",
            isHome && !menuOpen ? "text-white" : "text-stone-900"
          )}
          onClick={() => setMenuOpen(false)}
        >
          Naira Threads
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-4 ml-auto">
          <Link
            href="/dashboard"
            className={cn(
              "transition-colors",
              isHome && !menuOpen ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-stone-900"
            )}
            aria-label="Account"
          >
            <User size={18} />
          </Link>
          <Link
            href="/cart"
            className={cn(
              "relative transition-colors",
              isHome && !menuOpen ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-stone-900"
            )}
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#c9a84c] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#f5f3ef] flex flex-col pt-20 px-8 md:hidden">
          <nav className="flex flex-col gap-6 mt-6">
            {[
              { href: "/shop", label: "Shop" },
              { href: "/shop?category=tops", label: "Tops" },
              { href: "/shop?category=bottoms", label: "Bottoms" },
              { href: "/shop?category=outerwear", label: "Outerwear" },
              { href: "/shop?category=accessories", label: "Accessories" },
              { href: "/dashboard", label: "Account" },
              { href: "/cart", label: "Cart" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-light text-stone-900 hover:text-[#c9a84c] transition-colors tracking-wide"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pb-12">
            <p className="text-xs tracking-widest uppercase text-stone-400">
              Lagos · Abuja · London
            </p>
          </div>
        </div>
      )}
    </>
  );
}
