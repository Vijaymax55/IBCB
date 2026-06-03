"use client";

import { useState, useMemo } from "react";
import { Search, Download, Eye, FileText, FileSpreadsheet, Presentation } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { resources, resourceCategories, type Resource } from "@/data/resources";

const FILE_ICONS: Record<Resource["fileType"], { icon: React.ReactNode; color: string }> = {
  pdf:  { icon: <FileText size={28} />,          color: "#E53E3E" },
  doc:  { icon: <FileText size={28} />,          color: "#3182CE" },
  ppt:  { icon: <Presentation size={28} />,      color: "#DD6B20" },
  xlsx: { icon: <FileSpreadsheet size={28} />,   color: "#38A169" },
};

function ResourceCard({ resource }: { resource: Resource }) {
  const fi = FILE_ICONS[resource.fileType];
  const fileExists = false; // files are placeholders — disable download until uploaded

  return (
    <div
      className="group bg-white border border-border rounded-2xl p-6 relative overflow-hidden flex flex-col gap-3 transition-all duration-300"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        borderLeft: "3px solid transparent",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
        el.style.borderLeftColor = "#B8860B";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "";
        el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
        el.style.borderLeftColor = "transparent";
      }}
    >
      {/* Official badge */}
      {resource.isOfficial && (
        <div
          className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
          style={{ background: "rgba(184,134,11,0.12)", color: "#B8860B", fontFamily: "var(--font-ui)", border: "1px solid rgba(184,134,11,0.3)" }}
        >
          Official Advisory
        </div>
      )}

      {/* File type icon + category */}
      <div className="flex items-center gap-3">
        <div style={{ color: fi.color }}>{fi.icon}</div>
        <span
          className="px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "#E0F5F2", color: "#0A7C6E", fontFamily: "var(--font-ui)" }}
        >
          {resource.category}
        </span>
      </div>

      <h3 className="font-display text-lg font-bold text-ink leading-snug">{resource.title}</h3>
      <p className="font-body text-sm text-muted leading-relaxed line-clamp-2 flex-1">{resource.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {resource.tags.map((t) => (
          <span key={t} className="px-2 py-0.5 bg-warm-grey rounded text-xs text-muted font-body border border-border">
            {t}
          </span>
        ))}
      </div>

      {/* Date + actions */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="font-body text-xs text-muted">
          {new Date(resource.uploadDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
        </span>
        <div className="flex gap-2">
          <a
            href={fileExists ? `/resources/${resource.fileName}` : "#"}
            target={fileExists ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{ fontFamily: "var(--font-ui)", background: fileExists ? "#06111F" : "#F2EDE7", color: fileExists ? "#E8E4DE" : "#64748B", cursor: fileExists ? "pointer" : "not-allowed" }}
            title={fileExists ? "View" : "File not yet uploaded"}
          >
            <Eye size={12} /> View
          </a>
          <a
            href={fileExists ? `/resources/${resource.fileName}` : "#"}
            download={fileExists}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{ fontFamily: "var(--font-ui)", background: fileExists ? "#B8860B" : "#F2EDE7", color: fileExists ? "#06111F" : "#64748B", cursor: fileExists ? "pointer" : "not-allowed" }}
            title={fileExists ? "Download" : "File not yet uploaded"}
          >
            <Download size={12} /> Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCat = category === "All" || r.category === category;
      return matchesQuery && matchesCat;
    });
  }, [query, category]);

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "#06111F" }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionLabel light>Knowledge Base</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4" style={{ color: "#E8E4DE" }}>
            Resources &amp; Advisories
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-ui)", color: "rgba(232,228,222,0.65)" }}>
            Official documents, approved advisories, and knowledge products from the IBCB Model CLF Team.
          </p>
        </div>
      </section>

      {/* Upload instructions banner */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div
          className="px-5 py-4 rounded-xl text-sm"
          style={{ border: "1px solid rgba(184,134,11,0.35)", background: "rgba(184,134,11,0.06)", fontFamily: "var(--font-ui)", color: "#B8860B" }}
        >
          📁 To add a resource: place the file in <code className="font-mono text-xs">/public/resources/</code> folder, add an entry to <code className="font-mono text-xs">data/resources.ts</code>, then rebuild.
        </div>
      </div>

      {/* Filters (sticky) */}
      <div className="sticky top-16 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search resources…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-cream border border-border rounded-xl text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 flex-nowrap">
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
                style={{
                  fontFamily: "var(--font-ui)",
                  background: category === cat ? "#B8860B" : "transparent",
                  color: category === cat ? "white" : "#64748B",
                  border: `1px solid ${category === cat ? "#B8860B" : "#E3DDD6"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-muted whitespace-nowrap" style={{ fontFamily: "var(--font-ui)" }}>
            {filtered.length} of {resources.length} resources
          </span>
        </div>
      </div>

      {/* Resource grid */}
      <section className="py-12 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted font-body">No resources match your search.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((r) => <ResourceCard key={r.id} resource={r} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
