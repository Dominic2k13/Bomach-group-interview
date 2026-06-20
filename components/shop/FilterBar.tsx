"use client";

import { cn } from "@/lib/utils";
import type { CategoryFilter, SortOption } from "@/types";

const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "tops", label: "Tops" },
  { value: "bottoms", label: "Bottoms" },
  { value: "outerwear", label: "Outerwear" },
  { value: "accessories", label: "Accessories" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

interface FilterBarProps {
  category: CategoryFilter;
  sort: SortOption;
  onCategoryChange: (c: CategoryFilter) => void;
  onSortChange: (s: SortOption) => void;
}

export default function FilterBar({
  category,
  sort,
  onCategoryChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-stone-200">
      {/* Category pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => onCategoryChange(c.value)}
            className={cn(
              "px-4 py-1.5 text-xs tracking-widest uppercase transition-colors",
              category === c.value
                ? "bg-stone-900 text-white"
                : "border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Sort select */}
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="text-xs tracking-widest uppercase border border-stone-200 px-3 py-2 text-stone-600 bg-white focus:outline-none focus:border-stone-900 cursor-pointer"
      >
        {SORT_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
