import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "horizontal" | "stacked";
  className?: string;
  light?: boolean;
}

export function Logo({ variant = "horizontal", className, light = false }: LogoProps) {
  const textColor = light ? "text-cream" : "text-navy";
  const subtitleColor = light ? "text-cream/60" : "text-muted";
  const ruleColor = light ? "bg-saffron/70" : "bg-saffron";

  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center gap-1", className)}>
        <span className={cn("font-display font-bold text-4xl tracking-wide", textColor)}>
          IBCB
        </span>
        <div className={cn("h-px w-12", ruleColor)} />
        <span className={cn("font-body text-xs tracking-widest uppercase", subtitleColor)}>
          Model CLF Team · DAY-NRLM
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className={cn("font-display font-bold text-2xl tracking-wide", textColor)}>
        IBCB
      </span>
      <div className="flex flex-col justify-center">
        <div className={cn("h-px w-full mb-0.5", ruleColor)} />
        <span className={cn("font-body text-[10px] tracking-widest uppercase leading-tight", subtitleColor)}>
          Model CLF Team · DAY-NRLM
        </span>
      </div>
    </div>
  );
}
