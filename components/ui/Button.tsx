import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-stone-900 text-white hover:bg-stone-700": variant === "primary",
            "border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white":
              variant === "outline",
            "text-stone-900 hover:underline underline-offset-4": variant === "ghost",
          },
          {
            "px-4 py-2 text-xs": size === "sm",
            "px-6 py-3 text-xs": size === "md",
            "px-8 py-4 text-sm": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
