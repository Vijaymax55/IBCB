"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function VisionMission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-warm-white" aria-label="Vision and Mission">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionLabel className="justify-center">Our Direction</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Vision & Mission
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision 2047 */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-navy rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-saffron rounded-l-2xl" />
            <SectionLabel light className="mb-3">Vision 2047</SectionLabel>
            <blockquote className="font-display text-xl text-cream leading-relaxed font-medium italic">
              "By 2047, every Cluster Level Federation across India will be a community-led, community-governed organisation, financially sustainable and institutionally vibrant ensuring the socio-economic well-being of its members."
            </blockquote>
            <div className="mt-6 pt-6 border-t border-cream/10">
              <span className="font-body text-sm text-cream/50">Target: 34,000 Viksit CLFs · 21-Year Roadmap</span>
            </div>
          </motion.div>

          {/* Mission 2031 */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-warm-white border border-border rounded-2xl p-8 relative overflow-hidden shadow-sm"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-sage rounded-l-2xl" />
            <SectionLabel className="mb-3" light={false}>
              <span className="text-sage">Mission 2031</span>
            </SectionLabel>
            <blockquote className="font-display text-xl text-navy leading-relaxed font-medium italic">
              "By 2031, 500 CLFs will operate on their own cost, and the proof of concept for CLF functioning without Government support will be piloted at 5 CLFs."
            </blockquote>
            <div className="mt-6 pt-6 border-t border-border">
              <span className="font-body text-sm text-muted">Milestone: 500 Swavalambi · 5 Viksit CLFs</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
