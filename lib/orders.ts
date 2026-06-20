import ordersData from "@/data/orders.json";
import type { Order } from "@/types";

// Cast once — the JSON shape matches Order exactly
const seedOrders = ordersData as Order[];

// Runtime store: starts with seed data, accepts new orders added during the session
let orderStore: Order[] = [...seedOrders];

export function getOrders(): Order[] {
  return orderStore;
}

export function getOrderById(id: string): Order | undefined {
  return orderStore.find((o) => o.id === id);
}

export function addOrder(order: Order): void {
  orderStore = [order, ...orderStore];
}

export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const num = String(orderStore.length + 1).padStart(3, "0");
  return `NT-${year}-${num}`;
}
