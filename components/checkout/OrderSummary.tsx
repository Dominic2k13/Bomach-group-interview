import { formatPrice } from "@/lib/formatPrice";
import type { CartItem } from "@/types";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
}

export default function OrderSummary({ items, subtotal }: OrderSummaryProps) {
  return (
    <div className="bg-stone-50 border border-stone-200 p-6 space-y-4">
      <p className="text-xs tracking-widest uppercase text-stone-500 pb-2 border-b border-stone-200">
        Order Summary
      </p>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={`${item.product.id}-${item.size}`} className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-stone-900 truncate">{item.product.name}</p>
              <p className="text-xs text-stone-400">
                Size: {item.size} · Qty: {item.quantity}
              </p>
            </div>
            <p className="text-sm text-stone-900 shrink-0">
              {formatPrice(item.product.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-stone-900">
          Total
        </p>
        <p className="text-sm font-semibold text-stone-900">{formatPrice(subtotal)}</p>
      </div>
    </div>
  );
}
