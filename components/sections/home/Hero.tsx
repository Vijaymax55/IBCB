"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

const tiers = [
  {
    id: "clf",
    name: "CLF",
    r: 140,
    stroke: "#94A3B8",
    fill: "rgba(148,163,184,0.08)",
    labelColor: "#CBD5E1",
    dotColor: "#0EA5E9",
    dots: 14,
    dotR: 3,
    dotOpacity: 0.25,
    rotateSpeed: 60,
    rotateDir: 1,
    desc: "Base community institution representing 2,000–3,000 households across 10–15 Village Organisations.",
    target: "34,000",
    targetLabel: "34,000 CLFs across India",
    labelAngle: -55,
    labelOffset: 22,
  },
  {
    id: "adarsh",
    name: "Adarsh CLF",
    r: 110,
    stroke: "#0EA5E9",
    fill: "rgba(14,165,233,0.10)",
    labelColor: "#38BDF8",
    dotColor: "#0EA5E9",
    dots: 10,
    dotR: 2.5,
    dotOpacity: 0.35,
    rotateSpeed: 45,
    rotateDir: -1,
    desc: "Meets all governance, compliance & institutional functioning standards across all sub-committees.",
    target: "10,169 → 34,000",
    targetLabel: "10,169 (2026) → 34,000 (2036)",
    labelAngle: 10,
    labelOffset: 20,
  },
  {
    id: "swavalambi",
    name: "Swavalambi CLF",
    r: 80,
    stroke: "#0D9488",
    fill: "rgba(13,148,136,0.12)",
    labelColor: "#2DD4BF",
    dotColor: "#0EA5E9",
    dots: 7,
    dotR: 2.5,
    dotOpacity: 0.5,
    rotateSpeed: 30,
    rotateDir: 1,
    desc: "Operates entirely on its own cost with 3+ independent revenue streams and community-paid audit model.",
    target: "500 → 34,000",
    targetLabel: "500 (2031) → 34,000 (2047)",
    labelAngle: 50,
    labelOffset: 18,
  },
  {
    id: "viksit",
    name: "Viksit CLF",
    r: 55,
    stroke: "#C8961A",
    fill: "rgba(200,150,26,0.20)",
    labelColor: "#F0B429",
    dotColor: "#F0B429",
    dots: 5,
    dotR: 2.5,
    dotOpacity: 0.8,
    rotateSpeed: 0,
    rotateDir: 1,
    desc: "Fully self-governing, financially independent — zero govt dependency. Acts as a resource institution for neighbouring CLFs.",
    target: "5 → 340",
    targetLabel: "5 (2031) → 340 (2047)",
    labelAngle: 0,
    labelOffset: 0,
  },
] as const;

type TierId = typeof tiers[number]["id"];

const particles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  top: `${8 + Math.floor(((i * 7) % 84))}%`,
  left: `${5 + Math.floor(((i * 13) % 90))}%`,
  size: 2 + (i % 4),
  delay: parseFloat((i * 0.35).toFixed(1)),
  color: i % 2 === 0 ? "rgba(14,165,233,0.4)" : "rgba(200,150,26,0.3)",
}));

export function Hero() {
  const [activeTier, setActiveTier] = useState<TierId | null>(null);
  const activeData = activeTier ? tiers.find((t) => t.id === activeTier)! : null;

  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden flex items-center animate-gradient"
      style={{
        background: "linear-gradient(135deg, #0A1628 0%, #0D2545 25%, #0A3A6B 50%, #0C4A8A 65%, #0D5C9E 80%, #0A7CB8 100%)",
        backgroundSize: "400% 400%",
      }}
      aria-label="Hero section"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Sky glow top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-100px",
          right: "-100px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(14,165,233,0.25) 0%, rgba(14,165,233,0.08) 40%, transparent 70%)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Gold glow bottom-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-50px",
          left: "-50px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(200,150,26,0.15) 0%, transparent 60%)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none animate-float"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-px w-8" style={{ background: "#0EA5E9" }} />
            <span style={{ fontFamily: "var(--font-ui)", color: "#38BDF8", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
              DAY-NRLM · IBCB Initiative
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display font-bold leading-[1.1] mb-2"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", color: "#FFFFFF" }}
          >
            Building Community Institutions for a
          </motion.h1>

          {/* Shimmer "Viksit Bharat" — gold-to-sky shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
            className="mb-6"
          >
            <span
              className="font-display font-bold italic block"
              style={{
                fontSize: "clamp(2.4rem, 5.4vw, 4.3rem)",
                lineHeight: 1.05,
                background: "linear-gradient(90deg, #F0B429, #38BDF8, #F0B429, #0EA5E9)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              Viksit Bharat
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="text-lg leading-relaxed mb-8 max-w-lg"
            style={{ fontFamily: "var(--font-body)", color: "rgba(203,213,225,0.9)" }}
          >
            A 21-year institution-building roadmap (2026–2047) for 34,000 Cluster Level Federations across India — community-led, community-governed, financially sustainable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 font-semibold text-base px-8 py-4 rounded-full active:scale-[0.98] transition-all duration-200"
              style={{
                fontFamily: "var(--font-ui)",
                background: "linear-gradient(135deg, #C8961A, #F0B429)",
                color: "#0A1628",
                boxShadow: "0 8px 24px rgba(200,150,26,0.4)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.filter = "brightness(1.1)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.filter = "";
                el.style.transform = "";
              }}
            >
              Explore Our Vision
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center justify-center gap-2 font-medium text-base px-8 py-4 rounded-full transition-all duration-200"
              style={{
                fontFamily: "var(--font-ui)",
                border: "2px solid rgba(14,165,233,0.6)",
                color: "#38BDF8",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(14,165,233,0.15)";
                el.style.borderColor = "#38BDF8";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.borderColor = "rgba(14,165,233,0.6)";
              }}
            >
              Meet the Team <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Right — CLF tier rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:flex flex-col items-center gap-5"
        >
          <div className="relative w-[340px] h-[340px]">
            <svg
              viewBox="0 0 340 340"
              className="w-full h-full overflow-visible"
              aria-label="CLF tier progression — hover each ring to explore"
            >
              <defs>
                <filter id="centerGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F0B429" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </radialGradient>
              </defs>

              {tiers.map((tier) => {
                const isActive = activeTier === tier.id;
                const isDimmed = activeTier !== null && !isActive;
                const cx = 170;
                const cy = 170;

                return (
                  <g key={tier.id}>
                    {/* Rotating group for the ring + dots */}
                    {tier.rotateSpeed > 0 ? (
                      <g
                        style={{
                          transformOrigin: `${cx}px ${cy}px`,
                          animation: `${tier.rotateDir === 1 ? "rotate-cw" : "rotate-ccw"} ${tier.rotateSpeed}s linear infinite`,
                        }}
                      >
                        <circle
                          cx={cx} cy={cy} r={tier.r}
                          fill={tier.fill}
                          fillOpacity={isActive ? 2 : isDimmed ? 0.3 : 1}
                          stroke={tier.stroke}
                          strokeOpacity={isActive ? 1 : isDimmed ? 0.2 : 0.7}
                          strokeWidth={isActive ? 3 : 1.5}
                          style={{ transition: "fill-opacity 0.22s, stroke-opacity 0.22s, stroke-width 0.22s" }}
                        />
                        {Array.from({ length: tier.dots }).map((_, j) => {
                          const angle = (j / tier.dots) * Math.PI * 2 - Math.PI / 2;
                          const x = cx + tier.r * Math.cos(angle);
                          const y = cy + tier.r * Math.sin(angle);
                          return (
                            <circle
                              key={j}
                              cx={x} cy={y}
                              r={isActive ? tier.dotR + 1.5 : tier.dotR}
                              fill={tier.dotColor}
                              opacity={isActive ? Math.min(tier.dotOpacity * 2, 1) : isDimmed ? tier.dotOpacity * 0.2 : tier.dotOpacity}
                              style={{ transition: "all 0.22s", filter: `drop-shadow(0 0 3px ${tier.dotColor})` }}
                            />
                          );
                        })}
                      </g>
                    ) : (
                      /* Static inner ring (Viksit) */
                      <g style={{ animation: "pulse-ring 3s ease-in-out infinite", transformOrigin: `${cx}px ${cy}px` }}>
                        <circle
                          cx={cx} cy={cy} r={tier.r}
                          fill={tier.fill}
                          fillOpacity={isActive ? 2 : isDimmed ? 0.3 : 1}
                          stroke={tier.stroke}
                          strokeOpacity={isActive ? 1 : isDimmed ? 0.2 : 0.85}
                          strokeWidth={isActive ? 3 : 2}
                          style={{ transition: "fill-opacity 0.22s, stroke-opacity 0.22s, stroke-width 0.22s" }}
                        />
                        {Array.from({ length: tier.dots }).map((_, j) => {
                          const angle = (j / tier.dots) * Math.PI * 2 - Math.PI / 2;
                          const x = cx + tier.r * Math.cos(angle);
                          const y = cy + tier.r * Math.sin(angle);
                          return (
                            <circle
                              key={j}
                              cx={x} cy={y}
                              r={isActive ? tier.dotR + 1.5 : tier.dotR}
                              fill={tier.dotColor}
                              opacity={isActive ? 1 : isDimmed ? 0.2 : tier.dotOpacity}
                              style={{ transition: "all 0.22s", filter: `drop-shadow(0 0 4px ${tier.dotColor})` }}
                            />
                          );
                        })}
                      </g>
                    )}

                    {/* Invisible hit area */}
                    <circle
                      cx={cx} cy={cy} r={tier.r}
                      fill="transparent"
                      stroke="transparent"
                      strokeWidth={24}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setActiveTier(tier.id)}
                      onMouseLeave={() => setActiveTier(null)}
                      role="button"
                      aria-label={tier.name}
                    />
                  </g>
                );
              })}

              {/* Center dot with glow */}
              <circle
                cx="170" cy="170" r="7"
                fill="url(#centerGrad)"
                style={{
                  filter: "drop-shadow(0 0 12px rgba(200,150,26,0.8)) drop-shadow(0 0 24px rgba(14,165,233,0.4))",
                  pointerEvents: "none",
                }}
              />

              {/* Labels — shown when no tier active */}
              {activeTier === null && (
                <>
                  {/* CLF — top */}
                  <g style={{ pointerEvents: "none" }}>
                    <line x1="170" y1="30" x2="220" y2="16" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" />
                    <text x="225" y="13" textAnchor="start" fill="#CBD5E1" fontSize="14" fontFamily="Space Grotesk" fontWeight="600" letterSpacing="0.05em">CLF</text>
                    <text x="225" y="26" textAnchor="start" fill="#CBD5E1" fontSize="11" fontFamily="Space Grotesk" opacity="0.8">34,000</text>
                  </g>
                  {/* Adarsh CLF — right */}
                  <g style={{ pointerEvents: "none" }}>
                    <line x1="280" y1="170" x2="296" y2="155" stroke="#0EA5E9" strokeWidth="0.8" strokeOpacity="0.6" />
                    <text x="300" y="152" textAnchor="start" fill="#38BDF8" fontSize="14" fontFamily="Space Grotesk" fontWeight="600" letterSpacing="0.05em">Adarsh CLF</text>
                    <text x="300" y="165" textAnchor="start" fill="#38BDF8" fontSize="11" fontFamily="Space Grotesk" opacity="0.8">10,169 → 34,000</text>
                  </g>
                  {/* Swavalambi CLF — bottom-right */}
                  <g style={{ pointerEvents: "none" }}>
                    <line x1="227" y1="238" x2="245" y2="255" stroke="#0D9488" strokeWidth="0.8" strokeOpacity="0.6" />
                    <text x="248" y="256" textAnchor="start" fill="#2DD4BF" fontSize="14" fontFamily="Space Grotesk" fontWeight="600" letterSpacing="0.05em">Swavalambi CLF</text>
                    <text x="248" y="270" textAnchor="start" fill="#2DD4BF" fontSize="11" fontFamily="Space Grotesk" opacity="0.8">500 → 34,000</text>
                  </g>
                  {/* Viksit CLF — center label */}
                  <g style={{ pointerEvents: "none" }}>
                    <text x="170" y="200" textAnchor="middle" fill="#F0B429" fontSize="14" fontFamily="Space Grotesk" fontWeight="700" letterSpacing="0.05em">VIKSIT CLF</text>
                    <text x="170" y="214" textAnchor="middle" fill="#F0B429" fontSize="11" fontFamily="Space Grotesk" opacity="0.8">5 → 340</text>
                  </g>
                </>
              )}
            </svg>
          </div>

          {/* Info panel */}
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{ minHeight: 96, border: "1px solid rgba(14,165,233,0.15)", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}
          >
            <AnimatePresence mode="wait">
              {activeData ? (
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="p-5"
                  style={{ borderLeft: `3px solid ${activeData.stroke}` }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: activeData.stroke }} />
                    <span className="font-display font-bold text-base" style={{ color: "#FFFFFF" }}>{activeData.name}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ fontFamily: "var(--font-body)", color: "rgba(203,213,225,0.7)" }}>{activeData.desc}</p>
                  <div className="font-mono text-xs font-semibold" style={{ color: activeData.labelColor, fontFamily: "var(--font-ui)" }}>
                    {activeData.targetLabel}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center h-24"
                >
                  <p className="text-xs tracking-wide" style={{ fontFamily: "var(--font-body)", color: "rgba(203,213,225,0.3)" }}>Hover a ring to explore CLF tiers</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ChevronDown size={20} style={{ color: "rgba(203,213,225,0.35)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
