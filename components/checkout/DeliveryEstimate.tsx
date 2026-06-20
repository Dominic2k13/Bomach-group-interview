import { Truck } from "lucide-react";
import type { DeliveryEstimate as DeliveryEstimateType } from "@/types";

interface DeliveryEstimateProps {
  estimate: DeliveryEstimateType;
}

export default function DeliveryEstimate({ estimate }: DeliveryEstimateProps) {
  return (
    <div className="flex items-start gap-3 p-4 bg-stone-50 border border-stone-200">
      <Truck size={18} className="text-[#c9a84c] mt-0.5 shrink-0" />
      <div>
        <p className="text-xs tracking-widest uppercase text-stone-500 mb-0.5">
          Estimated Delivery
        </p>
        <p className="text-sm font-semibold text-stone-900">{estimate.label}</p>
        <p className="text-xs text-stone-400 mt-0.5">{estimate.zone}</p>
      </div>
    </div>
  );
}
