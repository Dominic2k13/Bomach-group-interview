import productsData from "@/data/products.json";
import type { Product, CategoryFilter, SortOption } from "@/types";

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function filterAndSortProducts(
  category: CategoryFilter,
  sort: SortOption
): Product[] {
  let result = category === "all" ? products : products.filter((p) => p.category === category);

  if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
  // "newest" keeps insertion order (mock data order)

  return result;
}
