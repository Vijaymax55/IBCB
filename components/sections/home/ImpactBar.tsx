"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { end: 34000, label: "CLFs Across India" },
  { end: 10169, label: "Model CLFs (Current)" },
  { end: 32, label: "States & UTs" },
  { end: 2047, label: "Vision Year" },
];

function Counter({ end, duration = 2200 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animFrame: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) animFrame = requestAnimationFrame(animate);
      else setCount(end);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, end, duration]);

  return (
    <span
      ref={ref}
      className="tabular-nums"
      style={{ fontFamily: "var(--font-ui)", fontSize: "3rem", fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}
    >
      {count.toLocaleString("en-IN")}
    </span>
  );
}

export function ImpactBar() {
  return (
    <section style={{ background: "#0A1628", borderTop: "3px solid #0EA5E9" }} className="py-14" aria-label="Impact statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative px-6 py-4">
              {i > 0 && (
                <div
                  className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
              )}
              {/* Sky blue accent bar */}
              <div className="w-8 h-0.5 mb-3" style={{ background: "#0EA5E9" }} />
              <Counter end={stat.end} />
              <div
                className="text-sm mt-2 leading-snug"
                style={{ fontFamily: "var(--font-ui)", color: "#E8E4DE" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
