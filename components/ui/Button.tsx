import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild: _asChild, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
      primary: "bg-saffron text-navy hover:bg-saffron/90 rounded-full shadow-sm hover:shadow-md active:scale-[0.98]",
      secondary: "bg-navy text-cream hover:bg-ink rounded-full shadow-sm hover:shadow-md active:scale-[0.98]",
      outline: "border border-cream text-cream hover:bg-cream/10 rounded-full",
      ghost: "text-saffron hover:text-saffron/80 underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-2.5",
      lg: "text-base px-8 py-3.5",
    };

    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
