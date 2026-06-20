"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";

export default function FeaturedCollection() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="px-6 md:px-12 py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-xs tracking-widest uppercase text-[#c9a84c] mb-2">
              New Season
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900">
              Featured Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:block text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors underline underline-offset-4"
          >
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/shop"
            className="text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors underline underline-offset-4"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
