"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Quote } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { governmentLeaders } from "@/data/team";
import type { GovernmentLeader } from "@/types";
import { cn } from "@/lib/utils";

function LeaderCard({
  leader,
  onClick,
  isAnchor,
}: {
  leader: GovernmentLeader;
  onClick: () => void;
  isAnchor: boolean;
}) {
  const initials = leader.name
    .split(" ")
    .filter((w) => w.length > 2)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "—";

  return (
    <button
      onClick={onClick}
      className={cn(
        "group bg-warm-white border rounded-xl p-5 text-left hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer w-full max-w-xs",
        isAnchor ? "border-saffron/40 shadow-sm ring-1 ring-saffron/20" : "border-border"
      )}
      aria-label={`View details for ${leader.name}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0",
            isAnchor ? "bg-saffron text-navy" : "bg-navy text-cream"
          )}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <p className="font-display text-base font-bold text-navy leading-tight">{leader.name}</p>
          <p className="font-body text-xs text-muted leading-snug">{leader.designation}</p>
        </div>
      </div>
      {isAnchor && (
        <div className="mt-3 inline-flex items-center gap-1 font-body text-xs font-semibold text-saffron">
          IBCB Anchor
        </div>
      )}
    </button>
  );
}

export function LeadershipHierarchy() {
  const [selected, setSelected] = useState<GovernmentLeader | null>(null);

  const tier1 = governmentLeaders.filter((l) => l.tier === 1);
  const tier2 = governmentLeaders.filter((l) => l.tier === 2);
  const tier3 = governmentLeaders.filter((l) => l.tier === 3);
  const tier4 = governmentLeaders.filter((l) => l.tier === 4);

  return (
    <section className="py-20 bg-cream" aria-label="Programme Leadership">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel>Leadership</SectionLabel>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-12">
          Programme Leadership
        </h2>

        {/* Org chart */}
        <div className="flex flex-col items-center gap-0">
          {[tier1, tier2, tier3, tier4].map((tier, ti) => (
            <div key={ti} className="flex flex-col items-center w-full">
              {ti > 0 && (
                <div className="w-px h-8 bg-saffron/40" aria-hidden="true" />
              )}
              <div className="flex flex-wrap justify-center gap-4">
                {tier.map((leader) => (
                  <LeaderCard
                    key={leader.id}
                    leader={leader}
                    onClick={() => setSelected(leader)}
                    isAnchor={leader.tier === 4}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50"
              onClick={() => setSelected(null)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-warm-white shadow-2xl z-50 overflow-y-auto"
              role="dialog"
              aria-label={`Profile: ${selected.name}`}
            >
              <div className="p-8">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 p-2 rounded-lg hover:bg-cream transition-colors"
                  aria-label="Close profile"
                >
                  <X size={18} className="text-muted" />
                </button>

                <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center font-display font-bold text-2xl text-cream mb-6">
                  {/* TODO: Replace with actual photo */}
                  {selected.name.split(" ").filter(w => w.length > 2).map(w => w[0]).slice(0, 2).join("").toUpperCase() || "—"}
                </div>

                <h2 className="font-display text-2xl font-bold text-navy">{selected.name}</h2>
                <p className="font-body text-sm text-muted mt-1 mb-6">{selected.designation}</p>
                <div className="h-px bg-border mb-6" />

                {selected.keyMessage && (
                  <div className="relative">
                    <Quote size={32} className="text-saffron/20 absolute -top-2 -left-2" />
                    <blockquote className="font-display text-lg text-navy italic leading-relaxed pl-6">
                      "{selected.keyMessage}"
                    </blockquote>
                    <p className="font-body text-xs text-muted mt-3 pl-6">— Key Message for the Team</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
