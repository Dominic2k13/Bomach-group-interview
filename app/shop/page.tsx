"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { filterAndSortProducts } from "@/lib/products";
import FilterBar from "@/components/shop/FilterBar";
import ProductGrid from "@/components/shop/ProductGrid";
import type { CategoryFilter, SortOption } from "@/types";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as CategoryFilter) || "all";

  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [sort, setSort] = useState<SortOption>("newest");

  // Sync URL param changes (e.g. nav links with ?category=outerwear)
  useEffect(() => {
    const param = searchParams.get("category") as CategoryFilter | null;
    if (param) setCategory(param);
  }, [searchParams]);

  const products = filterAndSortProducts(category, sort);

  return (
    <>
      <FilterBar
        category={category}
        sort={sort}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />
      <ProductGrid products={products} />
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen pt-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="pt-12 pb-4">
        <p className="text-xs tracking-widest uppercase text-[#c9a84c] mb-2">Collection</p>
        <h1 className="text-4xl font-light text-stone-900">Shop</h1>
      </div>
      <Suspense fallback={null}>
        <ShopContent />
      </Suspense>
    </div>
  );
}
