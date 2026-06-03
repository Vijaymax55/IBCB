import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, MapPin, Target } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { teamMembers } from "@/data/team";
import { cn } from "@/lib/utils";

const avatarColors = [
  "bg-navy text-cream",
  "bg-sage text-cream",
  "bg-saffron text-navy",
  "bg-ink text-cream",
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teamMembers
    .filter((m) => m.slug !== "fm-anchor")
    .map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) return { title: "Team Member Not Found" };
  return {
    title: `${member.name} — ${member.shortRole}`,
    description: `${member.name} is the ${member.thematic} anchor on the IBCB Team, anchoring ${member.states.join(", ")}.`,
  };
}

export default async function TeamProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) notFound();

  const avatarColor = avatarColors[member.avatarInitials.charCodeAt(0) % avatarColors.length];

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-body text-sm text-cream/50">
              <li><Link href="/" className="hover:text-cream transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/team" className="hover:text-cream transition-colors">Team</Link></li>
              <li>/</li>
              <li className="text-cream">{member.name}</li>
            </ol>
          </nav>
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 font-body text-sm text-saffron hover:text-saffron/80 mb-8"
          >
            <ChevronLeft size={16} /> Back to Team
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div
              className={cn("w-28 h-28 rounded-full flex items-center justify-center font-display font-bold text-3xl flex-shrink-0", avatarColor)}
              aria-hidden="true"
            >
              {member.avatarInitials}
            </div>
            <div>
              <SectionLabel light>{member.shortRole}</SectionLabel>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mt-2">{member.name}</h1>
              <p className="font-body text-cream/60 text-lg mt-2">{member.thematic}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {member.states.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 font-body text-xs font-medium px-3 py-1 rounded-full bg-sage/20 text-sage border border-sage/30">
                    <MapPin size={10} /> {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2">
            {member.pendingProfile && (
              <div
                className="mb-6 px-5 py-4 rounded-xl text-sm leading-relaxed"
                style={{ border: "1px solid rgba(184,134,11,0.4)", background: "rgba(184,134,11,0.06)", fontFamily: "var(--font-ui)", color: "#B8860B" }}
              >
                This position is currently being filled. Full profile details will be updated shortly.
              </div>
            )}
            <SectionLabel>Responsibilities</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-navy mb-6">Thematic Responsibilities</h2>
            <ul className="space-y-4">
              {member.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-base text-ink leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-saffron mt-2.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key deliverables */}
            <div className="bg-sage/5 border border-sage/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Target size={16} className="text-sage" />
                <h3 className="font-body text-sm font-semibold text-sage uppercase tracking-wider">Key Deliverables</h3>
              </div>
              <p className="font-body text-sm text-ink leading-relaxed">{member.keyDeliverables}</p>
            </div>

            {/* States */}
            <div className="bg-warm-white border border-border rounded-2xl p-6">
              <h3 className="font-body text-sm font-semibold text-muted uppercase tracking-wider mb-3">States Anchored</h3>
              <div className="flex flex-wrap gap-2">
                {member.states.map((s) => (
                  <Badge key={s} variant={s === "Awaited" ? "muted" : "sage"}>{s}</Badge>
                ))}
              </div>
            </div>

            {/* Quote placeholder */}
            <div className="bg-navy rounded-2xl p-6">
              {/* TODO: Replace with actual quote from team member */}
              <p className="font-display text-base text-cream/80 italic leading-relaxed">
                "Every CLF we strengthen today is a proof point for what communities can achieve when given the right support and trust."
              </p>
              <p className="font-body text-xs text-cream/40 mt-3">— {member.name}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
