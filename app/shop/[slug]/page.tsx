import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: { slug: string };
}

// Server component — exports generateStaticParams, passes data to client
export default function ProductDetailPage({ params }: Props) {
  const maybeProduct = getProductBySlug(params.slug);
  if (!maybeProduct) notFound();

  return <ProductDetailClient product={maybeProduct} />;
}

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}
