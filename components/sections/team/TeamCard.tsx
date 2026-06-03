"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { TeamMember } from "@/types";
import { cn } from "@/lib/utils";

const avatarColors = [
  "bg-navy text-cream",
  "bg-sage text-cream",
  "bg-saffron text-navy",
  "bg-ink text-cream",
  "bg-muted/30 text-ink",
];

function getAvatarColor(initials: string): string {
  return avatarColors[initials.charCodeAt(0) % avatarColors.length];
}

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export function TeamCard({ member, index = 0 }: TeamCardProps) {
  const isTBA = member.slug === "tba-finance";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group bg-warm-white border border-border rounded-2xl p-6 hover:shadow-md hover:scale-[1.015] transition-all duration-200 relative overflow-hidden flex flex-col"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-saffron/0 group-hover:bg-saffron rounded-l-2xl transition-all duration-300" />

      {/* Avatar + Name */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-lg flex-shrink-0",
            getAvatarColor(member.avatarInitials)
          )}
          aria-hidden="true"
        >
          {isTBA ? "?" : member.avatarInitials}
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-navy leading-tight">{member.name}</h3>
          <p className="font-body text-xs text-muted">{member.shortRole}</p>
        </div>
      </div>

      {/* Thematic */}
      <p className="font-body text-sm text-ink leading-snug mb-3">{member.thematic}</p>

      {/* State badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {member.states.map((s) => (
          <Badge key={s} variant={s === "Awaited" ? "muted" : "sage"}>
            {s}
          </Badge>
        ))}
      </div>

      {/* Preview responsibilities */}
      <p className="font-body text-xs text-muted leading-relaxed line-clamp-2 flex-1 mb-5">
        {member.responsibilities[0]}
      </p>

      {/* CTA */}
      {!isTBA && (
        <Link
          href={`/team/${member.slug}`}
          className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-saffron hover:gap-2.5 transition-all mt-auto"
          aria-label={`View profile of ${member.name}`}
        >
          View Profile <ArrowRight size={14} />
        </Link>
      )}
    </motion.div>
  );
}
