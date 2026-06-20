"use client";

import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="px-6 md:px-12 py-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs tracking-widest uppercase text-[#c9a84c] mb-4">
          Our Story
        </p>
        <h2 className="text-4xl md:text-5xl font-light leading-tight text-stone-900 mb-6">
          Dressed in
          <br />
          <span className="font-semibold">intention.</span>
        </h2>
        <p className="text-stone-500 leading-relaxed mb-4">
          Naira Threads was born in Lagos with a single conviction: that premium
          streetwear doesn&apos;t need to shout. The strongest pieces speak in
          proportion, weight, and texture.
        </p>
        <p className="text-stone-500 leading-relaxed">
          Every garment starts with a question — what does the person wearing
          this actually need? The answer shapes the cut, the fabric choice, the
          finishing. Nothing is arbitrary.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="grid grid-cols-2 gap-4"
      >
        {/* Placeholder brand imagery using colored blocks */}
        <div className="aspect-[3/4] bg-stone-200 col-span-2 rounded-sm" />
        <div className="aspect-square bg-stone-300 rounded-sm" />
        <div className="aspect-square bg-[#c9a84c]/20 rounded-sm flex items-center justify-center">
          <p className="text-xs tracking-widest uppercase text-[#c9a84c] font-semibold text-center leading-loose">
            Lagos<br/>Made<br/>Global
          </p>
        </div>
      </motion.div>
    </section>
  );
}
