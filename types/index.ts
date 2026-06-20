export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: "tops" | "bottoms" | "outerwear" | "accessories";
  description: string;
  images: string[];
  sizes: string[];
  featured: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface DeliveryEstimate {
  minDays: number;
  maxDays: number;
  label: string;
  zone: string;
}

export type OrderStatus =
  | "processing"
  | "confirmed"
  | "shipped"
  | "out_for_delivery"
  | "delivered";

export interface OrderStatusStep {
  status: OrderStatus;
  label: string;
  date: string | null;
  completed: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  subtotal: number;
  deliveryEstimate: DeliveryEstimate;
  status: OrderStatus;
  placedAt: string;
  estimatedDelivery: string;
  statusSteps: OrderStatusStep[];
}

export type SortOption = "price-asc" | "price-desc" | "newest";
export type CategoryFilter = Product["category"] | "all";
