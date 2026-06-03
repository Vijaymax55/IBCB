"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Play } from "lucide-react";
import { motion } from "framer-motion";
import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { FilterBar } from "@/components/ui/FilterBar";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  "CBO-HR": "sage",
  "Internal Control": "saffron",
  "Governance": "navy",
  "CMTC": "sage",
  "SRP": "muted",
  "KMC": "saffron",
  "Compliance": "navy",
  "Livelihoods": "sage",
  "Finance": "saffron",
  "LMS": "muted",
};

function CourseCard({ course, index }: { course: (typeof courses)[0]; index: number }) {
  const colorVariant = (CATEGORY_COLORS[course.category] || "muted") as "sage" | "saffron" | "navy" | "muted";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-warm-white border border-border rounded-2xl p-6 hover:shadow-md hover:scale-[1.015] transition-all duration-200 relative overflow-hidden flex flex-col"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-saffron/0 group-hover:bg-saffron rounded-l-2xl transition-all duration-300" />

      <div className="flex items-start justify-between gap-2 mb-3">
        <Badge variant={colorVariant}>{course.category}</Badge>
        {course.avCount > 0 && (
          <div className="flex items-center gap-1 font-body text-xs text-muted">
            <Play size={10} />
            {course.avCount} modules
          </div>
        )}
      </div>

      <h3 className="font-display text-xl font-bold text-navy leading-tight mb-2">{course.title}</h3>
      <p className="font-body text-sm text-muted leading-relaxed flex-1 mb-4">{course.description}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="font-body text-xs text-muted bg-cream px-2.5 py-1 rounded-full border border-border">
          {course.language}
        </span>
        <span className="font-body text-xs text-muted bg-cream px-2.5 py-1 rounded-full border border-border">
          {course.month} {course.year}
        </span>
      </div>

      <a
        href={course.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-body text-sm font-semibold text-saffron hover:text-saffron/80 transition-colors mt-auto"
        aria-label={`Access course: ${course.title}`}
      >
        Access Course <ExternalLink size={13} />
      </a>
    </motion.article>
  );
}

export default function LMSPage() {
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");

  const months = [...new Set(courses.map((c) => c.month))];
  const years = [...new Set(courses.map((c) => String(c.year)))];
  const langs = [...new Set(courses.map((c) => c.language))];

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (monthFilter && c.month !== monthFilter) return false;
      if (yearFilter && String(c.year) !== yearFilter) return false;
      if (langFilter && c.language !== langFilter) return false;
      return true;
    });
  }, [monthFilter, yearFilter, langFilter]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm-grey py-20 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Initiatives</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mt-2 mb-4">
            LMS for CLF
          </h1>
          <p className="font-body text-muted text-lg max-w-2xl leading-relaxed">
            The Learning Management System for Cluster Level Federations — a mobile-first, multi-language digital learning platform with certified courses on governance, compliance, livelihoods, and more. LMS V2 includes the 'Pucho Didi' chatbot and an All India Ranking system.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="font-mono text-ink">
              <span className="text-2xl font-bold text-saffron">{courses.length}</span>
              <span className="font-body text-sm text-muted ml-2">Courses</span>
            </div>
            <div className="w-px bg-border" />
            <div className="font-mono text-ink">
              <span className="text-2xl font-bold text-saffron">{courses.reduce((sum, c) => sum + c.avCount, 0)}</span>
              <span className="font-body text-sm text-muted ml-2">AV Modules</span>
            </div>
            <div className="w-px bg-border" />
            <div className="font-mono text-ink">
              <span className="text-2xl font-bold text-saffron">{langs.length}</span>
              <span className="font-body text-sm text-muted ml-2">Languages</span>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <FilterBar
            className="mb-8"
            filters={[
              {
                id: "month",
                label: "Month",
                value: monthFilter,
                onChange: setMonthFilter,
                options: months.map((m) => ({ value: m, label: m })),
              },
              {
                id: "year",
                label: "Year",
                value: yearFilter,
                onChange: setYearFilter,
                options: years.map((y) => ({ value: y, label: y })),
              },
              {
                id: "lang",
                label: "Language",
                value: langFilter,
                onChange: setLangFilter,
                options: langs.map((l) => ({ value: l, label: l })),
              },
            ]}
            resultCount={filtered.length}
            totalCount={courses.length}
            onClear={() => {
              setMonthFilter("");
              setYearFilter("");
              setLangFilter("");
            }}
          />

          {filtered.length === 0 ? (
            <div className="text-center py-20 font-body text-muted">No courses match the selected filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
