"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  label,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div
        className="font-mono text-4xl md:text-5xl font-bold text-navy tabular-nums"
        aria-label={`${prefix}${end.toLocaleString("en-IN")}${suffix}`}
      >
        {prefix}
        {count.toLocaleString("en-IN")}
        {suffix}
      </div>
      <div className="font-body text-sm text-muted mt-2 max-w-32 mx-auto leading-snug">{label}</div>
    </div>
  );
}
