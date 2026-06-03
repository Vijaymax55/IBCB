"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, BookOpen, Newspaper, CalendarDays, BarChart3 } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { courses } from "@/data/courses";
import { newsletters } from "@/data/newsletters";
import { workshops } from "@/data/workshops";

export function InitiativesPreviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featuredCourses = courses.slice(0, 3);
  const latestNewsletter = newsletters[newsletters.length - 1];
  const upcomingWorkshop = workshops.find((w) => w.status === "upcoming");

  const cards = [
    {
      id: "lms",
      icon: <BookOpen size={22} />,
      title: "LMS for CLF",
      description: "Digital learning platform for Cluster Level Federations — courses on governance, compliance, livelihoods, and more.",
      href: "/initiatives/lms",
      preview: (
        <ul className="space-y-1.5 mt-3">
          {featuredCourses.map((c) => (
            <li key={c.id} className="flex items-center gap-2 font-body text-xs text-muted">
              <div className="w-1 h-1 rounded-full bg-saffron flex-shrink-0" />
              {c.title}
            </li>
          ))}
          <li className="font-body text-xs text-saffron font-medium">+ {courses.length - 3} more courses</li>
        </ul>
      ),
      cta: `Explore ${courses.length} Courses`,
    },
    {
      id: "newsletter",
      icon: <Newspaper size={22} />,
      title: "Newsletter — Sutra",
      description: "MCLF's quarterly newsletter covering stories from the field, policy updates, and team highlights.",
      href: "/initiatives/newsletter",
      preview: latestNewsletter ? (
        <div className="mt-3 bg-cream rounded-lg p-3 border border-border">
          <p className="font-body text-xs text-muted font-semibold uppercase tracking-wider mb-0.5">Latest Edition</p>
          <p className="font-display text-base text-navy font-bold">{latestNewsletter.title}</p>
          <p className="font-body text-xs text-muted">{latestNewsletter.month} {latestNewsletter.year} · {latestNewsletter.language}</p>
        </div>
      ) : null,
      cta: "Read Latest Edition",
    },
    {
      id: "workshops",
      icon: <CalendarDays size={22} />,
      title: "Workshops & Training",
      description: "National orientations, zonal workshops, and Master SRP training events driving CLF capacity across India.",
      href: "/initiatives/workshops",
      preview: upcomingWorkshop ? (
        <div className="mt-3 bg-cream rounded-lg p-3 border border-border">
          <span className="font-body text-xs font-semibold text-saffron uppercase tracking-wider">Upcoming</span>
          <p className="font-display text-base text-navy font-bold mt-0.5">{upcomingWorkshop.title}</p>
          <p className="font-body text-xs text-muted">{upcomingWorkshop.location} · {new Date(upcomingWorkshop.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
        </div>
      ) : null,
      cta: "View All Events",
    },
    {
      id: "clf-web",
      icon: <BarChart3 size={22} />,
      title: "CLF Web Application",
      description: "Digital monitoring platform tracking CLF progress across 34,000 institutions with live dashboards.",
      href: "/initiatives/clf-web",
      preview: (
        <div className="mt-3 bg-cream rounded-lg p-3 border border-border">
          <span className="font-body text-xs font-semibold text-saffron uppercase tracking-wider">Live</span>
          <p className="font-display text-base text-navy font-bold mt-0.5">Analytical Dashboard</p>
          <p className="font-body text-xs text-muted">Real-time CLF data · 32 States</p>
        </div>
      ),
      cta: "Open Dashboard",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-warm-white" aria-label="Key Initiatives">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionLabel>Key Initiatives</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            What We&apos;re Building
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={card.href}
                className="group block h-full bg-cream border border-border rounded-2xl p-6 hover:shadow-lg hover:scale-[1.015] transition-all duration-200 relative overflow-hidden"
                aria-label={`Explore ${card.title}`}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-saffron/0 group-hover:bg-saffron rounded-l-2xl transition-all duration-300" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy group-hover:bg-saffron/10 group-hover:text-saffron transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy">{card.title}</h3>
                </div>
                <p className="font-body text-sm text-muted leading-relaxed">{card.description}</p>
                {card.preview}
                <div className="flex items-center gap-2 mt-5 font-body text-sm font-semibold text-saffron group-hover:gap-3 transition-all">
                  {card.cta} <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
