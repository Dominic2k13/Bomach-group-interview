"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { getDeliveryEstimate, getEstimatedDeliveryDate } from "@/lib/delivery";
import { addOrder, generateOrderId } from "@/lib/orders";
import AddressForm from "@/components/checkout/AddressForm";
import DeliveryEstimate from "@/components/checkout/DeliveryEstimate";
import OrderSummary from "@/components/checkout/OrderSummary";
import Button from "@/components/ui/Button";
import type { Address, DeliveryEstimate as DeliveryEstimateType, OrderStatus, OrderStatusStep } from "@/types";

const EMPTY_ADDRESS: Address = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
};

const INITIAL_STEPS: OrderStatusStep[] = [
  { status: "processing", label: "Order Placed", date: new Date().toISOString().split("T")[0], completed: true },
  { status: "confirmed", label: "Confirmed", date: null, completed: false },
  { status: "shipped", label: "Shipped", date: null, completed: false },
  { status: "out_for_delivery", label: "Out for Delivery", date: null, completed: false },
  { status: "delivered", label: "Delivered", date: null, completed: false },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const total = subtotal();

  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);
  const [estimate, setEstimate] = useState<DeliveryEstimateType | null>(null);
  const [placing, setPlacing] = useState(false);

  // Recalculate delivery estimate whenever country or state changes
  useEffect(() => {
    if (address.country) {
      setEstimate(getDeliveryEstimate(address.country, address.state));
    } else {
      setEstimate(null);
    }
  }, [address.country, address.state]);

  // Redirect to cart if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-stone-400 text-sm tracking-widest uppercase">
          Your cart is empty.{" "}
          <a href="/shop" className="underline text-stone-600">
            Shop now
          </a>
        </p>
      </div>
    );
  }

  function isAddressComplete(): boolean {
    return (
      !!address.fullName &&
      !!address.street &&
      !!address.city &&
      !!address.country &&
      !!address.state
    );
  }

  function handlePlaceOrder() {
    if (!estimate || !isAddressComplete()) return;
    setPlacing(true);

    const orderId = generateOrderId();
    addOrder({
      id: orderId,
      items: [...items],
      address,
      subtotal: total,
      deliveryEstimate: estimate,
      status: "processing" as OrderStatus,
      placedAt: new Date().toISOString(),
      estimatedDelivery: getEstimatedDeliveryDate(estimate),
      statusSteps: INITIAL_STEPS,
    });

    clearCart();
    router.push(`/dashboard/orders/${orderId}`);
  }

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 max-w-5xl mx-auto py-16">
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-[#c9a84c] mb-2">Checkout</p>
        <h1 className="text-4xl font-light text-stone-900">Shipping Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: address form */}
        <div className="space-y-8">
          <AddressForm value={address} onChange={setAddress} />

          {estimate && (
            <DeliveryEstimate estimate={estimate} />
          )}

          <Button
            size="lg"
            className="w-full"
            disabled={!isAddressComplete() || !estimate || placing}
            onClick={handlePlaceOrder}
          >
            {placing ? "Placing Order…" : "Place Order"}
          </Button>

          <p className="text-xs text-stone-400 text-center">
            No real payment is processed — this is a demo checkout.
          </p>
        </div>

        {/* Right: order summary */}
        <div>
          <OrderSummary items={items} subtotal={total} />
        </div>
      </div>
    </div>
  );
}
