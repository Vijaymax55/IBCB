import Link from "next/link";
import { Download, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Newsletter } from "@/types";

interface NewsletterCardProps {
  newsletter: Newsletter;
}

export function NewsletterCard({ newsletter }: NewsletterCardProps) {
  return (
    <article className="group bg-warm-white border border-border rounded-2xl overflow-hidden hover:shadow-md hover:scale-[1.015] transition-all duration-200">
      {/* Cover */}
      <div
        className={`h-40 flex items-center justify-center bg-gradient-to-br ${newsletter.coverGradient.replace("from-navy", "from-[#0D1B2A]").replace("to-navy", "to-[#0D1B2A]").replace("from-sage", "from-[#2D6A4F]").replace("to-sage", "to-[#2D6A4F]").replace("from-saffron", "from-[#D4770A]").replace("to-saffron", "to-[#D4770A]")}`}
        aria-hidden="true"
      >
        <div className="text-center">
          <span className="font-mono text-6xl font-bold text-white/20">
            {String(newsletter.edition).padStart(2, "0")}
          </span>
          <p className="font-body text-xs text-white/50 uppercase tracking-widest mt-1">Sutra</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-bold text-navy leading-tight">{newsletter.title}</h3>
          <Badge variant={newsletter.language === "English" ? "navy" : "sage"}>
            {newsletter.language}
          </Badge>
        </div>
        <p className="font-body text-sm text-muted mb-4">
          {newsletter.month} {newsletter.year} · {newsletter.pages.length} pages
        </p>

        <div className="flex gap-2">
          <Link
            href={`/initiatives/newsletter/${newsletter.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-navy text-cream text-sm font-body font-semibold py-2.5 rounded-xl hover:bg-ink transition-colors"
            aria-label={`Read ${newsletter.title} online`}
          >
            <BookOpen size={14} /> Read Online
          </Link>
          <a
            href={newsletter.pdfLink}
            download
            className="flex-1 flex items-center justify-center gap-1.5 bg-cream border border-border text-ink text-sm font-body font-semibold py-2.5 rounded-xl hover:bg-border transition-colors"
            aria-label={`Download ${newsletter.title} as PDF`}
          >
            <Download size={14} /> Download
          </a>
        </div>
      </div>
    </article>
  );
}
