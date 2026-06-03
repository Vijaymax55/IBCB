import type { Metadata } from "next";
import { BarChart3, Database, ExternalLink } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "CLF Web Application",
  description: "Digital infrastructure strengthening IBCB strategies and enabling close monitoring of CLF progress across India.",
};

export default function CLFWebPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "#06111F" }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionLabel light>Initiatives</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4" style={{ color: "#E8E4DE" }}>
            CLF Web Application
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-ui)", color: "rgba(232,228,222,0.65)" }}>
            Digital infrastructure strengthening IBCB strategies and enabling close monitoring of CLF progress across India.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>About the Platform</SectionLabel>
          <h2 className="font-display text-3xl font-bold text-ink mb-4">What is CLF Web?</h2>
          <p className="font-body text-base text-text-body leading-relaxed max-w-3xl mb-12">
            CLF Web is a comprehensive digital platform developed under DAY-NRLM to capture, track, and analyse the institutional progress of Cluster Level Federations across India. It enables data-driven decision making at the CLF, district, state, and national level.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📊",
                title: "Analytical Dashboard",
                desc: "Real-time data visualisation of CLF progress indicators across 32 states",
              },
              {
                icon: "📝",
                title: "Data Entry Portal",
                desc: "Structured data capture for CLF governance, FM, HR, and livelihoods indicators",
              },
              {
                icon: "🗺️",
                title: "National Monitoring",
                desc: "State-wise and district-wise CLF performance tracking and benchmarking",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white border border-border rounded-2xl p-6"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-display text-xl font-bold text-ink mb-2">{f.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access */}
      <section className="py-16 px-4 bg-warm-grey">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Access the Platform</SectionLabel>
          <h2 className="font-display text-3xl font-bold text-ink mb-8">Open CLF Web</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">

            {/* Dashboard card */}
            <div
              className="rounded-2xl p-8 flex flex-col gap-4"
              style={{ background: "#06111F" }}
            >
              <BarChart3 size={36} style={{ color: "#B8860B" }} />
              <h3 className="font-display text-2xl font-bold" style={{ color: "#E8E4DE" }}>
                Analytical Dashboard
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(232,228,222,0.65)", lineHeight: 1.6 }}>
                Explore live CLF data, state-wise performance metrics, and programme progress indicators.
              </p>
              <a
                href="https://clf.lokos.in/#/analyticalDashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold rounded-full px-6 py-3 mt-auto transition-all"
                style={{ fontFamily: "var(--font-ui)", background: "#B8860B", color: "#06111F", width: "fit-content" }}
              >
                Open Dashboard <ExternalLink size={15} />
              </a>
            </div>

            {/* Portal card */}
            <div className="bg-white border border-border rounded-2xl p-8 flex flex-col gap-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <Database size={36} style={{ color: "#0A7C6E" }} />
              <h3 className="font-display text-2xl font-bold text-ink">Data Entry Portal</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                For authorised SRLM and field staff to enter and update CLF programme data.
              </p>
              <a
                href="https://clf.lokos.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold rounded-full px-6 py-3 mt-auto transition-all"
                style={{ fontFamily: "var(--font-ui)", background: "#0A7C6E", color: "white", width: "fit-content" }}
              >
                Access Portal <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded dashboard */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Live Data</SectionLabel>
          <h2 className="font-display text-3xl font-bold text-ink mb-2">Live Programme Dashboard</h2>
          <p className="font-body text-sm text-muted mb-8">Real-time CLF data across India</p>
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
            <iframe
              src="https://clf.lokos.in/#/analyticalDashboard"
              width="100%"
              height="700"
              style={{ border: "none", display: "block" }}
              title="CLF Analytical Dashboard"
            />
          </div>
          <p className="font-body text-xs text-muted mt-3">
            Data sourced from CLF Web portal. For access issues contact the IBCB MIS team.
          </p>
        </div>
      </section>
    </div>
  );
}
