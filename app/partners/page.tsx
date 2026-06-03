import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, CheckCircle } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { partners } from "@/data/partners";

export const metadata: Metadata = {
  title: "Partners",
  description: "Technical partners supporting the IBCB Model CLF initiative — PRADAN and TRIF.",
};

export default function PartnersPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-warm-grey py-20 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Collaboration</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mt-2 mb-4">
            Our Technical Partners
          </h1>
          <p className="font-body text-muted text-lg max-w-2xl">
            IBCB works with leading civil society organisations and institutions to deliver technical support, field expertise, and capacity building across India's CLF ecosystem.
          </p>
        </div>
      </section>

      {/* Partner cards */}
      <section className="py-16 px-4 bg-sage-lt">
        <div className="max-w-5xl mx-auto space-y-8">
          {partners.map((partner) => (
            <article
              key={partner.id}
              id={partner.id}
              className="bg-warm-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-0">
                {/* Logo panel */}
                <div className="flex-shrink-0 w-full md:w-48 bg-sage-lt flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border">
                  <div className="w-32 h-20 bg-white rounded-xl border border-border flex items-center justify-center p-3 shadow-sm">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={112}
                      height={60}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-navy">{partner.name}</h2>
                      <p className="font-body text-sm text-muted">{partner.fullName}</p>
                    </div>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-body text-sm font-semibold px-4 py-2 bg-cream border border-border rounded-full text-ink hover:border-saffron hover:text-saffron transition-colors"
                      aria-label={`Visit ${partner.name} website`}
                    >
                      Visit Website <ExternalLink size={13} />
                    </a>
                  </div>

                  <p className="font-body text-sm text-muted mt-1 mb-4 italic">{partner.role}</p>
                  <p className="font-body text-base text-ink leading-relaxed mb-6">{partner.description}</p>

                  <div>
                    <h3 className="font-body text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                      Key Collaboration Areas
                    </h3>
                    <ul className="space-y-2">
                      {partner.collaborationAreas.map((area) => (
                        <li key={area} className="flex items-start gap-2.5 font-body text-sm text-ink">
                          <CheckCircle size={15} className="text-sage flex-shrink-0 mt-0.5" />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
