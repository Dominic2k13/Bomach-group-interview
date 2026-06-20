import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/formatPrice";
import type { Order } from "@/types";

const STATUS_BADGE: Record<
  Order["status"],
  { label: string; variant: "default" | "success" | "warning" | "info" }
> = {
  processing: { label: "Processing", variant: "warning" },
  confirmed: { label: "Confirmed", variant: "info" },
  shipped: { label: "Shipped", variant: "info" },
  out_for_delivery: { label: "Out for Delivery", variant: "warning" },
  delivered: { label: "Delivered", variant: "success" },
};

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <p className="text-stone-400 text-sm py-12 text-center tracking-widest uppercase">
        No orders yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const badge = STATUS_BADGE[order.status];
        return (
          <Link
            key={order.id}
            href={`/dashboard/orders/${order.id}`}
            className="block border border-stone-200 p-5 hover:border-stone-400 transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-stone-900 group-hover:underline underline-offset-2">
                  {order.id}
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  {new Date(order.placedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <Badge label={badge.label} variant={badge.variant} />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-stone-500">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </p>
              <p className="text-sm font-medium text-stone-900">
                {formatPrice(order.subtotal)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
