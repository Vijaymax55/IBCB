"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as d3geo from "d3-geo";

const stateData: Record<string, {
  totalCLF: number;
  adarshCLF: number;
  swavalambiCLF: number;
  viksitCLF: number;
  anchor?: string;
}> = {
  "Uttar Pradesh":     { totalCLF: 3200, adarshCLF: 980,  swavalambiCLF: 45, viksitCLF: 0, anchor: "Mehmood Hasan" },
  "Madhya Pradesh":    { totalCLF: 2100, adarshCLF: 650,  swavalambiCLF: 28, viksitCLF: 0, anchor: "Anshuman Singh" },
  "Bihar":             { totalCLF: 1800, adarshCLF: 540,  swavalambiCLF: 20, viksitCLF: 0, anchor: "Prerna" },
  "Rajasthan":         { totalCLF: 1600, adarshCLF: 480,  swavalambiCLF: 15, viksitCLF: 0 },
  "Maharashtra":       { totalCLF: 1400, adarshCLF: 420,  swavalambiCLF: 18, viksitCLF: 0, anchor: "Shubholaxmi Roy" },
  "West Bengal":       { totalCLF: 1200, adarshCLF: 360,  swavalambiCLF: 12, viksitCLF: 0, anchor: "Shubholaxmi Roy" },
  "Jharkhand":         { totalCLF: 1100, adarshCLF: 330,  swavalambiCLF: 22, viksitCLF: 0, anchor: "Anita Kumari" },
  "Odisha":            { totalCLF: 980,  adarshCLF: 294,  swavalambiCLF: 16, viksitCLF: 0, anchor: "Prerna" },
  "Andhra Pradesh":    { totalCLF: 920,  adarshCLF: 276,  swavalambiCLF: 14, viksitCLF: 0, anchor: "Pankaj Suyal" },
  "Telangana":         { totalCLF: 750,  adarshCLF: 225,  swavalambiCLF: 10, viksitCLF: 0, anchor: "Mehmood Hasan" },
  "Karnataka":         { totalCLF: 700,  adarshCLF: 210,  swavalambiCLF: 8,  viksitCLF: 0, anchor: "Prerna" },
  "Gujarat":           { totalCLF: 650,  adarshCLF: 195,  swavalambiCLF: 7,  viksitCLF: 0, anchor: "Pankaj Suyal" },
  "Tamil Nadu":        { totalCLF: 600,  adarshCLF: 180,  swavalambiCLF: 6,  viksitCLF: 0, anchor: "Anshuman Singh" },
  "Kerala":            { totalCLF: 480,  adarshCLF: 144,  swavalambiCLF: 5,  viksitCLF: 0, anchor: "Mehmood Hasan" },
  "Assam":             { totalCLF: 420,  adarshCLF: 126,  swavalambiCLF: 4,  viksitCLF: 0, anchor: "Anita Kumari" },
  "Chhattisgarh":      { totalCLF: 380,  adarshCLF: 114,  swavalambiCLF: 8,  viksitCLF: 0, anchor: "Anita Kumari" },
  "Himachal Pradesh":  { totalCLF: 180,  adarshCLF: 54,   swavalambiCLF: 2,  viksitCLF: 0, anchor: "Anita Kumari" },
  "Uttarakhand":       { totalCLF: 160,  adarshCLF: 48,   swavalambiCLF: 2,  viksitCLF: 0, anchor: "Mehmood Hasan" },
  "Punjab":            { totalCLF: 140,  adarshCLF: 42,   swavalambiCLF: 1,  viksitCLF: 0, anchor: "Pankaj Suyal" },
  "Haryana":           { totalCLF: 130,  adarshCLF: 39,   swavalambiCLF: 1,  viksitCLF: 0, anchor: "Pankaj Suyal" },
  "Tripura":           { totalCLF: 90,   adarshCLF: 27,   swavalambiCLF: 1,  viksitCLF: 0, anchor: "Anita Kumari" },
  "Meghalaya":         { totalCLF: 70,   adarshCLF: 21,   swavalambiCLF: 0,  viksitCLF: 0, anchor: "Prerna" },
  "Manipur":           { totalCLF: 60,   adarshCLF: 18,   swavalambiCLF: 0,  viksitCLF: 0, anchor: "Prerna" },
  "Nagaland":          { totalCLF: 50,   adarshCLF: 15,   swavalambiCLF: 0,  viksitCLF: 0, anchor: "Aman Raj" },
  "Mizoram":           { totalCLF: 40,   adarshCLF: 12,   swavalambiCLF: 0,  viksitCLF: 0, anchor: "Shubholaxmi Roy" },
  "Sikkim":            { totalCLF: 30,   adarshCLF: 9,    swavalambiCLF: 0,  viksitCLF: 0, anchor: "Shubholaxmi Roy" },
  "Goa":               { totalCLF: 20,   adarshCLF: 6,    swavalambiCLF: 0,  viksitCLF: 0, anchor: "Vijay Prakash" },
  "Arunachal Pradesh": { totalCLF: 18,   adarshCLF: 5,    swavalambiCLF: 0,  viksitCLF: 0, anchor: "Prabhuranjan" },
  "Jammu and Kashmir": { totalCLF: 85,   adarshCLF: 25,   swavalambiCLF: 0,  viksitCLF: 0, anchor: "Anshuman Singh" },
  "Puducherry":        { totalCLF: 15,   adarshCLF: 4,    swavalambiCLF: 0,  viksitCLF: 0, anchor: "Anshuman Singh" },
};

const anchoredStates = new Set(Object.keys(stateData));

/* Major Indian cities [lon, lat] for pulse rings */
const cities: [number, number][] = [
  [77.2, 28.6],  // Delhi
  [72.8, 19.1],  // Mumbai
  [88.4, 22.6],  // Kolkata
  [80.3, 13.1],  // Chennai
  [78.5, 17.4],  // Hyderabad
  [80.9, 26.8],  // Lucknow
  [77.4, 23.3],  // Bhopal
  [85.1, 25.6],  // Patna
];

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  stateName: string;
  data: typeof stateData[string] | null;
}

interface PathItem { id: string; name: string; d: string }

const W = 500;
const H = 560;

export function IndiaMap() {
  const [paths, setPaths] = useState<PathItem[]>([]);
  const [cityPoints, setCityPoints] = useState<{ cx: number; cy: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ cx: number; cy: number }[]>([]);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, stateName: "", data: null,
  });
  const [loading, setLoading] = useState(true);

  /* stable sparkle metadata */
  const sparkleMeta = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      dur: (1.5 + ((i * 0.047) % 2.5)).toFixed(2),
      begin: ((i * 0.097) % 5).toFixed(2),
    })),
  []);

  useEffect(() => {
    const projection = d3geo.geoMercator()
      .center([82, 22])
      .scale(W * 1.2)
      .translate([W / 2, H / 2]);

    const pathGen = d3geo.geoPath().projection(projection);

    fetch("https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson")
      .then((r) => r.json())
      .then((geojson: { type: string; features: any[] }) => {
        const built: PathItem[] = geojson.features.map((feat: any) => {
          const name: string = feat.properties?.NAME_1 || feat.properties?.name || "";
          return { id: name, name, d: pathGen(feat) || "" };
        }).filter((p: PathItem) => p.d);

        setPaths(built);

        /* city SVG coords */
        const cps = cities.map(([lon, lat]) => {
          const pt = projection([lon, lat]);
          return pt ? { cx: Math.round(pt[0]), cy: Math.round(pt[1]) } : null;
        }).filter(Boolean) as { cx: number; cy: number }[];
        setCityPoints(cps);

        /* random sparkle scatter within India bounds */
        const pts: { cx: number; cy: number }[] = [];
        let attempts = 0;
        while (pts.length < 50 && attempts < 500) {
          attempts++;
          const lon = 68 + Math.random() * 29;
          const lat = 8  + Math.random() * 29;
          const pt = projection([lon, lat]);
          if (pt && pt[0] > 20 && pt[0] < W - 20 && pt[1] > 20 && pt[1] < H - 20) {
            pts.push({ cx: Math.round(pt[0]), cy: Math.round(pt[1]) });
          }
        }
        setSparkles(pts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tooltip.visible) return;
    setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  const handleEnter = (e: React.MouseEvent, name: string) => {
    setHoveredState(name);
    setTooltip({ visible: true, x: e.clientX, y: e.clientY, stateName: name, data: stateData[name] ?? null });
  };

  const handleLeave = () => {
    setHoveredState(null);
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="relative w-full" onMouseMove={handleMouseMove}>
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="text-sm" style={{ fontFamily: "var(--font-ui)", color: "rgba(232,228,222,0.4)" }}>Loading map…</div>
        </div>
      )}

      {!loading && (
        <>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            style={{ display: "block", maxHeight: 560 }}
            aria-label="Interactive India map — hover a state to see CLF data"
          >
            <defs>
              <filter id="sparkGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* State paths */}
            {paths.map(({ id, name, d }) => {
              const anchored = anchoredStates.has(name);
              const hovered = hoveredState === name;
              return (
                <path
                  key={id}
                  d={d}
                  fill={hovered ? (anchored ? "#D4A017" : "#0A7C6E") : anchored ? "#1A3A2A" : "#162D45"}
                  stroke={anchored ? "#0A7C6E" : "#1E4060"}
                  strokeWidth={anchored ? "0.8" : "0.5"}
                  style={{ cursor: "pointer", transition: "fill 200ms ease" }}
                  onMouseEnter={(e) => handleEnter(e, name)}
                  onMouseLeave={handleLeave}
                />
              );
            })}

            {/* Sparkle dots */}
            {sparkles.map((s, i) => (
              <circle key={i} cx={s.cx} cy={s.cy} r="1.5" fill="#D4A017" filter="url(#sparkGlow)">
                <animate attributeName="opacity" values="0;1;0"
                  dur={`${sparkleMeta[i].dur}s`} begin={`${sparkleMeta[i].begin}s`} repeatCount="indefinite" />
                <animate attributeName="r" values="1;2.5;1"
                  dur={`${sparkleMeta[i].dur}s`} begin={`${sparkleMeta[i].begin}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* City pulse rings */}
            {cityPoints.map((p, i) => (
              <g key={i} style={{ pointerEvents: "none" }}>
                <circle cx={p.cx} cy={p.cy} r="3" fill="#D4A017">
                  <animate attributeName="opacity" values="1;0.4;1" dur="3s" begin={`${i * 0.38}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={p.cx} cy={p.cy} r="3" fill="none" stroke="#D4A017" strokeWidth="1.5">
                  <animate attributeName="r" values="3;14;3" dur="3s" begin={`${i * 0.38}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" begin={`${i * 0.38}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-5 mt-4 justify-center">
            {[
              { bg: "#1A3A2A", border: "#0A7C6E", label: "States with IBCB Anchors" },
              { bg: "#162D45", border: "#1E4060", label: "Other programme states" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: item.bg, border: `1.5px solid ${item.border}` }} />
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "rgba(232,228,222,0.55)" }}>{item.label}</span>
              </div>
            ))}
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "rgba(232,228,222,0.4)" }}>
              ✦ Hover any state for CLF data
            </span>
          </div>
        </>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            key="tt"
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: Math.min(tooltip.x + 16, (typeof window !== "undefined" ? window.innerWidth - 270 : 900)),
              top: Math.max(tooltip.y - 10, 8),
              zIndex: 9999,
              background: "#06111F",
              border: "1px solid rgba(212,160,23,0.4)",
              borderRadius: 14,
              padding: "16px 20px",
              minWidth: 240,
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              pointerEvents: "none",
            }}
          >
            <div style={{ fontFamily: "var(--font-display)", color: "white", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
              {tooltip.stateName}
            </div>

            {tooltip.data?.anchor && (
              <div style={{ fontFamily: "var(--font-ui)", color: "#D4A017", fontSize: "0.7rem", marginBottom: 10 }}>
                ⚡ Anchor: {tooltip.data.anchor}
              </div>
            )}

            {tooltip.data ? (
              <>
                <div style={{ height: 1, background: "rgba(212,160,23,0.2)", marginBottom: 10 }} />
                {([
                  ["Total CLFs",      tooltip.data.totalCLF,      "white"],
                  ["Adarsh CLFs",     tooltip.data.adarshCLF,     "#D4A017"],
                  ["Swavalambi CLFs", tooltip.data.swavalambiCLF, "#0A7C6E"],
                  ["Viksit CLFs",     tooltip.data.viksitCLF,     "#4CAF50"],
                ] as [string, number, string][]).map(([label, val, color]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontFamily: "var(--font-ui)", color: "#64748B", fontSize: 13 }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-ui)", color, fontSize: 15, fontWeight: 700 }}>
                      {val.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
                <div style={{ marginTop: 10 }}>
                  <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${Math.round((tooltip.data.adarshCLF / Math.max(tooltip.data.totalCLF, 1)) * 100)}%`,
                      background: "linear-gradient(90deg,#B8860B,#F0B429)",
                      borderRadius: 3,
                    }} />
                  </div>
                  <div style={{ fontFamily: "var(--font-ui)", color: "#64748B", fontSize: "0.65rem", marginTop: 3 }}>
                    {Math.round((tooltip.data.adarshCLF / Math.max(tooltip.data.totalCLF, 1)) * 100)}% Adarsh CLFs
                  </div>
                </div>
              </>
            ) : (
              <div style={{ fontFamily: "var(--font-ui)", color: "#64748B", fontSize: 13, fontStyle: "italic" }}>
                Programme data coming soon
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
