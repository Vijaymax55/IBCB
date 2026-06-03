"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LeadershipHierarchy } from "@/components/sections/team/LeadershipHierarchy";
import { TeamCard } from "@/components/sections/team/TeamCard";
import { teamMembers } from "@/data/team";

export default function TeamPage() {
  const [query, setQuery] = useState("");

  const filtered = teamMembers.filter((m) => {
    const q = query.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.thematic.toLowerCase().includes(q) ||
      m.states.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      {/* Page hero */}
      <section className="bg-warm-grey py-20 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>The IBCB Team</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mt-2 mb-4">
            Meet the Team
          </h1>
          <p className="font-body text-muted text-lg max-w-xl">
            10 thematic anchors driving institution building across 32 states and Union Territories of India.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <LeadershipHierarchy />

      {/* Team grid */}
      <section className="py-16 bg-cream px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <SectionLabel>The Team</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-navy">IBCB Core Team</h2>
              <p className="font-body text-muted mt-1">Thematic anchors for all 28 states and UTs</p>
            </div>
            {/* Search */}
            <div className="relative max-w-xs w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="search"
                placeholder="Search by name, theme, or state…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 font-body text-sm bg-warm-white border border-border rounded-xl text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                aria-label="Search team members"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted font-body">
              No team members match your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((member, i) => (
                <TeamCard key={member.slug} member={member} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
