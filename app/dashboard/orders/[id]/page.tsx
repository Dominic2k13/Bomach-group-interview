"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getOrderById } from "@/lib/orders";
import { formatPrice } from "@/lib/formatPrice";
import OrderStatusTimeline from "@/components/dashboard/OrderStatusTimeline";
import Badge from "@/components/ui/Badge";

interface Props {
  params: { id: string };
}

const STATUS_BADGE_MAP = {
  processing: { label: "Processing", variant: "warning" },
  confirmed: { label: "Confirmed", variant: "info" },
  shipped: { label: "Shipped", variant: "info" },
  out_for_delivery: { label: "Out for Delivery", variant: "warning" },
  delivered: { label: "Delivered", variant: "success" },
} as const;

export default function OrderDetailPage({ params }: Props) {
  const maybeOrder = getOrderById(params.id);
  if (!maybeOrder) notFound();
  const order = maybeOrder;

  const badge = STATUS_BADGE_MAP[order.status];

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 max-w-4xl mx-auto py-16">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        Back to orders
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-[#c9a84c] mb-2">
            Order
          </p>
          <h1 className="text-3xl font-light text-stone-900">{order.id}</h1>
          <p className="text-stone-400 text-xs mt-1">
            Placed{" "}
            {new Date(order.placedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <Badge label={badge.label} variant={badge.variant} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: tracking timeline */}
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-6">
            Tracking
          </p>
          <OrderStatusTimeline steps={order.statusSteps} />

          <div className="mt-8 p-4 bg-stone-50 border border-stone-200 text-sm space-y-1">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">
              Delivery Info
            </p>
            <p className="text-stone-900 font-medium">{order.deliveryEstimate.label}</p>
            <p className="text-stone-500 text-xs">{order.deliveryEstimate.zone}</p>
            <p className="text-stone-500 text-xs">
              Est. delivery: {order.estimatedDelivery}
            </p>
          </div>
        </div>

        {/* Right: items + address */}
        <div className="space-y-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">
              Items
            </p>
            <ul className="space-y-3">
              {order.items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex justify-between text-sm"
                >
                  <div>
                    <p className="text-stone-900">{item.product.name}</p>
                    <p className="text-xs text-stone-400">
                      {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-stone-900 font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-3">
              Ship to
            </p>
            <address className="not-italic text-sm text-stone-600 space-y-0.5">
              <p className="text-stone-900 font-medium">{order.address.fullName}</p>
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.state}
              </p>
              <p>{order.address.country}</p>
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}
