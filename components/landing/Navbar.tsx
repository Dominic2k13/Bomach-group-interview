"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems)();

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-colors duration-300",
        isHome ? "bg-transparent" : "bg-[#f5f3ef] border-b border-stone-200"
      )}
    >
      {/* Left nav */}
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

      {/* Logo */}
      <Link
        href="/"
        className={cn(
          "text-sm font-semibold tracking-[0.3em] uppercase absolute left-1/2 -translate-x-1/2",
          isHome ? "text-white" : "text-stone-900"
        )}
      >
        Naira Threads
      </Link>

      {/* Right actions */}
      <div className="flex items-center gap-5 ml-auto">
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors",
            isHome ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-stone-900"
          )}
          aria-label="Account"
        >
          <User size={18} />
        </Link>
        <Link
          href="/cart"
          className={cn(
            "relative transition-colors",
            isHome ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-stone-900"
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
  );
}
