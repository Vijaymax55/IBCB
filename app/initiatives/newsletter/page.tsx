"use client";

import { useState, useMemo } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FilterBar } from "@/components/ui/FilterBar";
import { NewsletterCard } from "@/components/sections/newsletter/NewsletterCard";
import { newsletters } from "@/data/newsletters";

export default function NewsletterPage() {
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");

  const months = [...new Set(newsletters.map((n) => n.month))];
  const years = [...new Set(newsletters.map((n) => String(n.year)))];
  const langs = [...new Set(newsletters.map((n) => n.language))];

  const filtered = useMemo(() => {
    return newsletters.filter((n) => {
      if (monthFilter && n.month !== monthFilter) return false;
      if (yearFilter && String(n.year) !== yearFilter) return false;
      if (langFilter && n.language !== langFilter) return false;
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
            Sutra — MCLF Newsletter
          </h1>
          <p className="font-body text-muted text-lg max-w-2xl leading-relaxed">
            Sutra is the quarterly voice of the Model CLF Team — documenting stories from the field, policy developments, team highlights, and insights from India&apos;s community institution transformation journey.
          </p>
        </div>
      </section>

      {/* Newsletter grid */}
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
            totalCount={newsletters.length}
            onClear={() => {
              setMonthFilter("");
              setYearFilter("");
              setLangFilter("");
            }}
          />

          {filtered.length === 0 ? (
            <div className="text-center py-20 font-body text-muted">No newsletters match the selected filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((newsletter) => (
                <NewsletterCard key={newsletter.id} newsletter={newsletter} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
