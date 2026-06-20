"use client";

import { useAuthStore } from "@/store/authStore";
import { getOrders } from "@/lib/orders";
import OrderList from "@/components/dashboard/OrderList";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const orders = getOrders();

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 max-w-3xl mx-auto py-16">
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-[#c9a84c] mb-2">
          Account
        </p>
        <h1 className="text-4xl font-light text-stone-900">
          Welcome back, {user?.name.split(" ")[0]}.
        </h1>
        <p className="text-stone-400 text-sm mt-2">{user?.email}</p>
      </div>

      <div>
        <p className="text-xs tracking-widest uppercase text-stone-500 mb-6 pb-3 border-b border-stone-200">
          Order History
        </p>
        <OrderList orders={orders} />
      </div>
    </div>
  );
}
