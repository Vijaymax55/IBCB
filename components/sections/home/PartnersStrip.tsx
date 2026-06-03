"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { partners } from "@/data/partners";

export function PartnersStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-sage-lt" aria-label="Technical Partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <SectionLabel className="justify-center">Our Technical Partners</SectionLabel>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-ink">
            In Partnership For Community Transformation
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-250"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-start gap-5">
                {/* Partner logo */}
                <div className="flex-shrink-0 w-24 h-16 bg-white border border-border rounded-xl flex items-center justify-center p-2 shadow-sm">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={88}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-bold text-ink">{partner.name}</h3>
                  <p className="font-body text-sm text-muted mb-1">{partner.fullName}</p>
                  <p className="font-body text-sm text-text-body leading-relaxed line-clamp-2">{partner.description}</p>
                  <div className="mt-4">
                    <Link
                      href={`/partners#${partner.id}`}
                      className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-saffron hover:text-saffron-lt transition-colors"
                      aria-label={`Learn more about ${partner.name}`}
                    >
                      Learn More <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
