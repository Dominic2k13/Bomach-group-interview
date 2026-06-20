"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/formatPrice";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();
  const total = subtotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Your cart</p>
        <h1 className="text-3xl font-light text-stone-900 mb-6">It&apos;s empty in here.</h1>
        <Link href="/shop">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 max-w-5xl mx-auto py-16">
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-[#c9a84c] mb-2">Your Cart</p>
        <h1 className="text-4xl font-light text-stone-900">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Line items */}
        <div className="md:col-span-2 space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={`${item.product.id}-${item.size}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-5 pb-6 border-b border-stone-100"
            >
              {/* Image placeholder */}
              <div className="w-20 h-24 bg-stone-100 shrink-0 flex items-center justify-center">
                <span className="text-[9px] text-stone-400 tracking-widest uppercase">
                  {item.product.category}
                </span>
              </div>

              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-stone-900">{item.product.name}</p>
                <p className="text-xs text-stone-400">Size: {item.size}</p>
                <p className="text-sm text-stone-700">{formatPrice(item.product.price)}</p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center border border-stone-200 hover:border-stone-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center border border-stone-200 hover:border-stone-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="ml-2 text-stone-300 hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="text-sm font-medium text-stone-900 shrink-0">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-stone-50 border border-stone-200 p-6 space-y-4">
            <p className="text-xs tracking-widest uppercase text-stone-500">Summary</p>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Subtotal</span>
              <span className="font-medium text-stone-900">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Delivery</span>
              <span className="text-stone-400">Calculated at checkout</span>
            </div>
            <div className="pt-3 border-t border-stone-200 flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Link href="/checkout" className="block">
            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </Link>

          <Link href="/shop" className="block text-center">
            <Button variant="ghost" size="sm">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
