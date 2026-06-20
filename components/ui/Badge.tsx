import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "info";
  className?: string;
}

export default function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase",
        {
          "bg-stone-100 text-stone-600": variant === "default",
          "bg-emerald-50 text-emerald-700": variant === "success",
          "bg-amber-50 text-amber-700": variant === "warning",
          "bg-sky-50 text-sky-700": variant === "info",
        },
        className
      )}
    >
      {label}
    </span>
  );
}
