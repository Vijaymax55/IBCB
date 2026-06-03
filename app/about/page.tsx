"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrowthChart } from "@/components/sections/home/GrowthChart";
import { IndiaMap } from "@/components/sections/about/IndiaMap";
import { clfTiers } from "@/data/clfGrowth";
import { cn } from "@/lib/utils";

const sections = [
  { id: "vision", label: "Vision 2047" },
  { id: "mission", label: "Mission" },
  { id: "reach", label: "Our Reach" },
  { id: "growth", label: "Growth Trajectory" },
  { id: "tiers", label: "CLF Tier Criteria" },
  { id: "objectives", label: "5-Year Objectives" },
  { id: "milestones", label: "Key Milestones" },
  { id: "monitoring", label: "Monitoring & Review" },
];

const objectives = [
  {
    title: "Objective 1: Institutional Strengthening",
    problem: "Many CLFs lack functional governance structures, regular meetings, and decision-making capacity.",
    solution: "Deploy standardized governance framework, visioning module, and sub-committee strengthening across all 10,191 MCLFs.",
    target: "10,191 MCLFs with functional governance, approved AAP & BDP",
  },
  {
    title: "Objective 2: Financial Sustainability",
    problem: "CLFs remain financially dependent on government grants; statutory compliance is weak.",
    solution: "Drive 30,000 CLF registrations, 22,000 statutory audits, and pilot 500 Swavalambi CLFs that operate on own cost.",
    target: "500 Swavalambi CLFs, 5 Viksit CLFs by 2031",
  },
  {
    title: "Objective 3: Livelihood Integration",
    problem: "CLF potential as an economic engine remains underutilised; livelihood sub-committees are dormant.",
    solution: "Implement Enterprise Development Planning tool in 10,000 MCLFs; develop SRP cadre for livelihood CB.",
    target: "10,000 MCLFs with active livelihood planning; 3,000 SRP pool",
  },
  {
    title: "Objective 4: Technology & Learning",
    problem: "Limited digital literacy and poor platform usability hinders CLF capacity building at scale.",
    solution: "Launch LMS V2 with mobile-first design, 'Pucho Didi' chatbot, multi-language support, and CLF Web 2.0.",
    target: "10,000 MCLFs on LMS; CLF Web 2.0 live across all states",
  },
];

const milestones = [
  { date: "June 2026", milestone: "CLF Web 2.0 national orientation complete" },
  { date: "June 2026", milestone: "CBO-HR Master SRP training — national level" },
  { date: "July 2026", milestone: "All MCLFs with approved AAP & BDP" },
  { date: "September 2026", milestone: "Master SRP Income Tax certification (CBDT)" },
  { date: "December 2026", milestone: "3 core staff deployed in all MCLFs across 27 States/UTs" },
  { date: "March 2027", milestone: "LMS V2 launch with full course suite" },
  { date: "March 2027", milestone: "500 Swavalambi CLF pilots identified" },
  { date: "March 2031", milestone: "500 Swavalambi CLFs operational; 5 Viksit CLFs" },
];

const monitoringFrequency = [
  { frequency: "Monthly", activity: "Team leads internal review; state updates on CLF Web 2.0 indicators", responsibility: "IBCB Core Team" },
  { frequency: "Quarterly", activity: "National review with all SRLMs; MCLF progress dashboard review", responsibility: "NMMU + NMM" },
  { frequency: "Half-Yearly", activity: "Zonal workshops; deep-dive state reviews; LMS adoption review", responsibility: "IBCB + NMMU" },
  { frequency: "Annual", activity: "National MCLF Convention; CLF grading update; strategy recalibration", responsibility: "MoRD + NMM + IBCB" },
];

function AccordionItem({ tier }: { tier: typeof clfTiers[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-cream/50 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
          <span className="font-display text-lg font-bold text-navy">{tier.name}</span>
          <span className="font-body text-sm text-muted">{tier.label}</span>
        </div>
        <ChevronDown size={16} className={cn("text-muted transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-5 pb-5 border-t border-border"
        >
          <p className="font-body text-sm text-muted mt-4 mb-4">{tier.description}</p>
          <div className="font-mono text-sm font-semibold mb-4" style={{ color: tier.color }}>Target: {tier.target}</div>
          <ul className="space-y-2">
            {tier.criteria.map((c) => (
              <li key={c} className="flex items-start gap-2.5 font-body text-sm text-ink">
                <div className="w-1.5 h-1.5 rounded-full bg-saffron mt-1.5 flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("vision");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm-grey py-20 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Strategy</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mt-2 mb-4">
            Vision & Strategy
          </h1>
          <p className="font-body text-muted text-lg max-w-2xl">
            The complete IBCB institutional framework — from Vision 2047 to the 5-year action agenda, tier criteria, and monitoring architecture.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
          {/* Sticky sidebar TOC */}
          <aside className="hidden lg:block" aria-label="Page navigation">
            <div className="sticky top-24">
              <h3 className="font-body text-xs font-semibold text-muted uppercase tracking-wider mb-3">Contents</h3>
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={cn(
                        "block px-3 py-2 rounded-lg font-body text-sm transition-colors",
                        activeSection === s.id
                          ? "bg-saffron/10 text-saffron font-semibold"
                          : "text-muted hover:text-ink hover:bg-cream"
                      )}
                      aria-current={activeSection === s.id ? "location" : undefined}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="max-w-3xl space-y-16">
            {/* Vision */}
            <section id="vision">
              <SectionLabel>Vision 2047</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-navy mb-6">The Long View</h2>
              <div className="bg-navy rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-saffron rounded-l-2xl" />
                <blockquote className="font-display text-xl text-cream leading-relaxed italic">
                  "By 2047, every Cluster Level Federation across India will be a community-led, community-governed organisation, financially sustainable and institutionally vibrant ensuring the socio-economic well-being of its members."
                </blockquote>
                <div className="mt-6 pt-6 border-t border-cream/10 font-body text-sm text-cream/50">
                  Target: 34,000 CLFs · All Viksit · Zero Government Dependency
                </div>
              </div>
            </section>

            {/* Mission */}
            <section id="mission">
              <SectionLabel>Mission</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-navy mb-6">Milestones on the Way</h2>
              <div className="space-y-4">
                <div className="bg-warm-white border-l-4 border-sage rounded-r-2xl p-6 border border-border">
                  <div className="font-body text-xs font-semibold text-sage uppercase tracking-wider mb-2">Mission 2031</div>
                  <blockquote className="font-display text-lg text-navy italic leading-relaxed">
                    "By 2031, 500 CLFs will operate on their own cost, and the proof of concept for CLF functioning without Government support will be piloted at 5 CLFs."
                  </blockquote>
                </div>
                <div className="bg-warm-white border-l-4 border-saffron rounded-r-2xl p-6 border border-border">
                  <div className="font-body text-xs font-semibold text-saffron uppercase tracking-wider mb-2">Mission 2047</div>
                  <blockquote className="font-display text-lg text-navy italic leading-relaxed">
                    "By 2047, 34,000 CLFs will be Viksit — fully self-governing, financially independent, and acting as resource institutions for their communities."
                  </blockquote>
                </div>
              </div>
            </section>

            {/* Our Reach — full-width India Map */}
            <section id="reach" className="-mx-4 sm:-mx-6 lg:-mx-8">
              <div
                className="px-4 sm:px-6 lg:px-8 py-12 rounded-2xl"
                style={{ background: "#0E2237" }}
              >
                <div className="mb-2">
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(184,134,11,0.8)", fontWeight: 600 }}>Our Reach</span>
                </div>
                <h2
                  className="font-display text-3xl font-bold mb-2"
                  style={{ color: "#E8E4DE" }}
                >
                  32 States. 34,000 CLFs. One Mission.
                </h2>
                <p
                  className="text-sm mb-8"
                  style={{ fontFamily: "var(--font-ui)", color: "rgba(232,228,222,0.55)" }}
                >
                  Hover any state to explore CLF data
                </p>
                <IndiaMap />
              </div>
            </section>

            {/* Growth chart */}
            <section id="growth" className="-mx-4 sm:-mx-6 lg:mx-0">
              <GrowthChart />
            </section>

            {/* Tier criteria */}
            <section id="tiers">
              <SectionLabel>CLF Tier Definitions</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-navy mb-6">The Four Tiers</h2>
              <div className="space-y-3">
                {clfTiers.map((tier) => (
                  <AccordionItem key={tier.id} tier={tier} />
                ))}
              </div>
            </section>

            {/* Objectives */}
            <section id="objectives">
              <SectionLabel>Five-Year Objectives</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-navy mb-6">2026–2031 Agenda</h2>
              <div className="space-y-5">
                {objectives.map((obj, i) => (
                  <div key={i} className="bg-warm-white border border-border rounded-2xl p-6">
                    <h3 className="font-display text-xl font-bold text-navy mb-4">{obj.title}</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-body text-xs font-semibold text-muted uppercase tracking-wider">Problem</span>
                        <p className="font-body text-sm text-muted mt-1 leading-relaxed">{obj.problem}</p>
                      </div>
                      <div>
                        <span className="font-body text-xs font-semibold text-sage uppercase tracking-wider">Solution</span>
                        <p className="font-body text-sm text-ink mt-1 leading-relaxed">{obj.solution}</p>
                      </div>
                      <div className="pt-3 border-t border-border">
                        <span className="font-body text-xs font-semibold text-saffron uppercase tracking-wider">Target</span>
                        <p className="font-mono text-sm text-navy font-semibold mt-1">{obj.target}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Milestones */}
            <section id="milestones">
              <SectionLabel>Key Milestones</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-navy mb-6">2-Year Timeline</h2>
              <div className="relative pl-6 border-l-2 border-border space-y-6">
                {milestones.map((m, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-saffron border-2 border-cream" />
                    <div className="font-mono text-xs font-semibold text-saffron mb-1">{m.date}</div>
                    <p className="font-body text-sm text-ink">{m.milestone}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Monitoring */}
            <section id="monitoring">
              <SectionLabel>Monitoring & Review</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-navy mb-6">Review Architecture</h2>
              <div className="bg-warm-white border border-border rounded-2xl overflow-hidden">
                <table className="w-full" aria-label="Monitoring frequency table">
                  <thead>
                    <tr className="bg-navy text-cream">
                      <th className="font-body text-xs tracking-wider uppercase text-left px-5 py-4">Frequency</th>
                      <th className="font-body text-xs tracking-wider uppercase text-left px-5 py-4">Activity</th>
                      <th className="font-body text-xs tracking-wider uppercase text-left px-5 py-4">Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monitoringFrequency.map((row, i) => (
                      <tr key={i} className={cn("border-b border-border last:border-0", i % 2 === 0 ? "bg-warm-white" : "bg-cream/40")}>
                        <td className="font-body text-sm px-5 py-4 font-semibold text-navy">{row.frequency}</td>
                        <td className="font-body text-sm px-5 py-4 text-ink leading-snug">{row.activity}</td>
                        <td className="font-body text-sm px-5 py-4 text-muted">{row.responsibility}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
