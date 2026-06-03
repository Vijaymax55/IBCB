import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function SectionLabel({ children, className, light = false }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-4", className)}>
      <div className={cn("h-px w-8", light ? "bg-saffron/60" : "bg-saffron")} />
      <span
        className={cn(
          "font-body text-xs font-semibold tracking-[0.15em] uppercase",
          light ? "text-saffron/80" : "text-saffron"
        )}
      >
        {children}
      </span>
    </div>
  );
}
