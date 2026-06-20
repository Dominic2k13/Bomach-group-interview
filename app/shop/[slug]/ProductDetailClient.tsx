"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/formatPrice";
import { useCartStore } from "@/store/cartStore";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart() {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
        {/* Image placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-[3/4] bg-stone-100 relative flex items-center justify-center"
        >
          <span className="text-xs tracking-widest uppercase text-stone-400">
            {product.category}
          </span>
        </motion.div>

        {/* Product info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center space-y-6"
        >
          <div>
            <p className="text-xs tracking-widest uppercase text-[#c9a84c] mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-light text-stone-900 mb-2">{product.name}</h1>
            <p className="text-xl text-stone-700">{formatPrice(product.price)}</p>
          </div>

          <p className="text-sm text-stone-500 leading-relaxed">{product.description}</p>

          {/* Size selector */}
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-3">
              Select Size
              {selectedSize && (
                <span className="ml-2 text-stone-900 font-semibold">— {selectedSize}</span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "w-12 h-12 text-xs font-medium border transition-colors",
                    selectedSize === size
                      ? "bg-stone-900 text-white border-stone-900"
                      : "border-stone-200 text-stone-600 hover:border-stone-900"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className="w-full"
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </Button>

          {!selectedSize && (
            <p className="text-xs text-stone-400 text-center">Please select a size</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
