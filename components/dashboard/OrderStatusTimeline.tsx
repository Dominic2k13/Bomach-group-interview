import { cn } from "@/lib/utils";
import type { OrderStatusStep } from "@/types";

interface OrderStatusTimelineProps {
  steps: OrderStatusStep[];
}

export default function OrderStatusTimeline({ steps }: OrderStatusTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical connecting line */}
      <div className="absolute left-3 top-4 bottom-4 w-px bg-stone-200" />

      <ol className="space-y-6">
        {steps.map((step, i) => {
          const isActive = step.completed && !steps[i + 1]?.completed;
          return (
            <li key={step.status} className="flex items-start gap-4 relative">
              {/* Dot */}
              <div
                className={cn(
                  "w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-colors",
                  step.completed
                    ? "bg-stone-900 border-stone-900"
                    : "bg-white border-stone-200",
                  isActive && "ring-4 ring-stone-200"
                )}
              >
                {step.completed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="pt-0.5">
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.completed ? "text-stone-900" : "text-stone-300"
                  )}
                >
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-xs text-stone-400 mt-0.5">
                    {new Date(step.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
