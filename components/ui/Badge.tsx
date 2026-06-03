import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "sage" | "saffron" | "navy" | "muted" | "upcoming" | "completed" | "ongoing";
  className?: string;
}

export function Badge({ children, variant = "sage", className }: BadgeProps) {
  const variants = {
    sage: "bg-sage/10 text-sage border border-sage/20",
    saffron: "bg-saffron/10 text-saffron border border-saffron/20",
    navy: "bg-navy/10 text-navy border border-navy/20",
    muted: "bg-muted/10 text-muted border border-muted/20",
    upcoming: "bg-saffron/10 text-saffron border border-saffron/30 font-semibold tracking-wider",
    completed: "bg-sage/10 text-sage border border-sage/30 font-semibold tracking-wider",
    ongoing: "bg-navy/10 text-navy border border-navy/30 font-semibold tracking-wider",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
