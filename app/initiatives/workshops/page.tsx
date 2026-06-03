"use client";

import { useState, useMemo } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FilterBar } from "@/components/ui/FilterBar";
import { EventCard } from "@/components/sections/workshops/EventCard";
import { workshops } from "@/data/workshops";

export default function WorkshopsPage() {
  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const types = [...new Set(workshops.map((w) => w.type))];
  const years = [...new Set(workshops.map((w) => new Date(w.date).getFullYear().toString()))];
  const statuses = [...new Set(workshops.map((w) => w.status))];

  const filtered = useMemo(() => {
    return workshops.filter((w) => {
      if (yearFilter && new Date(w.date).getFullYear().toString() !== yearFilter) return false;
      if (typeFilter && w.type !== typeFilter) return false;
      if (statusFilter && w.status !== statusFilter) return false;
      return true;
    });
  }, [yearFilter, typeFilter, statusFilter]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm-grey py-20 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Initiatives</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mt-2 mb-4">
            Workshops & Training
          </h1>
          <p className="font-body text-muted text-lg max-w-2xl leading-relaxed">
            National orientations, zonal workshops, Master SRP training events, and quarterly reviews driving CLF capacity building across India.
          </p>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <FilterBar
            className="mb-8"
            filters={[
              {
                id: "year",
                label: "Year",
                value: yearFilter,
                onChange: setYearFilter,
                options: years.map((y) => ({ value: y, label: y })),
              },
              {
                id: "type",
                label: "Type",
                value: typeFilter,
                onChange: setTypeFilter,
                options: types.map((t) => ({ value: t, label: t })),
              },
              {
                id: "status",
                label: "Status",
                value: statusFilter,
                onChange: setStatusFilter,
                options: statuses.map((s) => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) })),
              },
            ]}
            resultCount={filtered.length}
            totalCount={workshops.length}
            onClear={() => {
              setYearFilter("");
              setTypeFilter("");
              setStatusFilter("");
            }}
          />

          {filtered.length === 0 ? (
            <div className="text-center py-20 font-body text-muted">No events match the selected filters.</div>
          ) : (
            <div className="space-y-4">
              {filtered
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((workshop) => (
                  <EventCard key={workshop.id} workshop={workshop} />
                ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
