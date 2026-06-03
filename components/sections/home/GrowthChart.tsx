"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { clfGrowthData, clfTiers } from "@/data/clfGrowth";
import { cn } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-warm-white border border-border rounded-xl p-4 shadow-lg font-body text-sm">
        <p className="font-semibold text-navy mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-ink">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted">{entry.name}:</span>
            <span className="font-semibold">{entry.value.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function GrowthChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-24 bg-cream" aria-label="CLF Growth Trajectory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionLabel>Institutional Growth Trajectory</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-3">
            The 21-Year Roadmap
          </h2>
          <p className="font-body text-muted max-w-xl">
            From 10,169 Model CLFs today to 34,000 fully Viksit CLFs by 2047 — a phased transformation of India&apos;s community institution landscape.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 mb-12">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-warm-white rounded-2xl border border-border p-6 shadow-sm"
          >
            <h3 className="font-body text-sm font-semibold text-muted uppercase tracking-wider mb-6">
              Growth Projection
            </h3>
            <div className="overflow-x-auto">
              <div className="min-w-[320px]">
                <ResponsiveContainer width="100%" height={340}>
                  <AreaChart data={clfGrowthData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                    <defs>
                      <linearGradient id="modelGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0D1B2A" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#0D1B2A" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="swavalambiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="viksitGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4770A" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#D4770A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2DDD6" vertical={false} />
                    <XAxis
                      dataKey="year"
                      tick={{ fontFamily: "Outfit", fontSize: 12, fill: "#8A8070" }}
                      axisLine={{ stroke: "#E2DDD6" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontFamily: "JetBrains Mono", fontSize: 10, fill: "#8A8070" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => v >= 1000 ? `${v / 1000}k` : v}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontFamily: "Outfit", fontSize: 12, paddingTop: 16 }}
                    />
                    <Area type="monotone" dataKey="modelCLF" name="Adarsh CLF" stroke="#0D1B2A" strokeWidth={2} fill="url(#modelGrad)" />
                    <Area type="monotone" dataKey="swavalambiCLF" name="Swavalambi CLF" stroke="#2D6A4F" strokeWidth={2} fill="url(#swavalambiGrad)" />
                    <Area type="monotone" dataKey="viksitCLF" name="Viksit CLF" stroke="#D4770A" strokeWidth={2.5} fill="url(#viksitGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-warm-white rounded-2xl border border-border overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px]" aria-label="CLF Growth Data Table">
                <thead>
                  <tr className="bg-navy text-cream">
                    <th className="font-body text-xs tracking-wider uppercase text-left px-6 py-4">Year</th>
                    <th className="font-body text-xs tracking-wider uppercase text-right px-6 py-4">Adarsh CLF</th>
                    <th className="font-body text-xs tracking-wider uppercase text-right px-6 py-4">Swavalambi CLF</th>
                    <th className="font-body text-xs tracking-wider uppercase text-right px-6 py-4">Viksit CLF</th>
                  </tr>
                </thead>
                <tbody>
                  {clfGrowthData.map((row, i) => (
                    <tr
                      key={row.year}
                      className={cn(
                        "border-b border-border last:border-0 transition-colors",
                        i % 2 === 0 ? "bg-warm-white" : "bg-cream/40",
                        i === clfGrowthData.length - 1 && "font-semibold text-navy"
                      )}
                    >
                      <td className="font-mono text-sm px-6 py-4 font-semibold text-navy">{row.year}</td>
                      <td className="font-mono text-sm px-6 py-4 text-right text-ink">{row.modelCLF.toLocaleString("en-IN")}</td>
                      <td className="font-mono text-sm px-6 py-4 text-right text-sage">{row.swavalambiCLF.toLocaleString("en-IN")}</td>
                      <td className="font-mono text-sm px-6 py-4 text-right text-saffron">{row.viksitCLF.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* CLF Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-body text-sm font-semibold text-muted uppercase tracking-wider mb-4">
            CLF Tier Progression
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {clfTiers.map((tier, i) => (
              <motion.button
                key={tier.id}
                onClick={() => setExpandedTier(expandedTier === tier.id ? null : tier.id)}
                className={cn(
                  "text-left bg-warm-white border border-border rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer w-full",
                  expandedTier === tier.id && "ring-2 ring-saffron/30 shadow-md"
                )}
                aria-expanded={expandedTier === tier.id}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  {i > 0 && (
                    <div className="text-muted/40 text-xs mr-1 font-body">→</div>
                  )}
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: tier.color }}
                  />
                  <span className="font-body text-xs font-semibold tracking-wider uppercase text-muted">
                    Tier {i + 1}
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold text-navy mb-1">{tier.name}</h4>
                <p className="font-body text-xs text-muted leading-snug mb-2">{tier.description}</p>
                <div className="font-mono text-xs font-semibold" style={{ color: tier.color }}>
                  {tier.target}
                </div>
                {expandedTier === tier.id && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-border space-y-1.5"
                  >
                    {tier.criteria.map((c) => (
                      <li key={c} className="flex items-start gap-2 font-body text-xs text-ink">
                        <div className="w-1 h-1 rounded-full bg-saffron mt-1.5 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
