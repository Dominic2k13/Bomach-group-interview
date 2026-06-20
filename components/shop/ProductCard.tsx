"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.[0];

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="aspect-[3/4] bg-stone-100 mb-3 overflow-hidden relative">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
            <span className="text-[10px] tracking-widest uppercase text-stone-400">
              {product.category}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-stone-900 group-hover:underline underline-offset-2 transition-all">
          {product.name}
        </p>
        <p className="text-sm text-stone-500">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
