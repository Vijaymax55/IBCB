"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, User, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Workshop } from "@/types";
import { formatEventDate } from "@/lib/utils";

interface EventCardProps {
  workshop: Workshop;
}

export function EventCard({ workshop }: EventCardProps) {
  const [expanded, setExpanded] = useState(false);
  const date = formatEventDate(workshop.date);

  const statusVariant: Record<string, "upcoming" | "completed" | "ongoing"> = {
    upcoming: "upcoming",
    completed: "completed",
    ongoing: "ongoing",
  };

  return (
    <article className="bg-warm-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="flex gap-0">
        {/* Date block */}
        <div
          className="flex-shrink-0 w-20 bg-navy flex flex-col items-center justify-center p-4 text-center"
          aria-hidden="true"
        >
          <span className="font-mono text-3xl font-bold text-cream leading-none">{date.day}</span>
          <span className="font-body text-xs text-saffron font-semibold tracking-wider mt-1">{date.month}</span>
          <span className="font-body text-xs text-cream/50 mt-0.5">{date.year}</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h3 className="font-display text-lg font-bold text-navy leading-tight">{workshop.title}</h3>
            <Badge variant={statusVariant[workshop.status]}>
              {workshop.status.toUpperCase()}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-3 mb-3">
            <Badge variant="muted">{workshop.type}</Badge>
            <div className="flex items-center gap-1 font-body text-xs text-muted">
              <MapPin size={12} />
              {workshop.location}
            </div>
            <div className="flex items-center gap-1 font-body text-xs text-muted">
              <User size={12} />
              {workshop.responsibility}
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 font-body text-sm font-medium text-saffron hover:text-saffron/80 transition-colors"
            aria-expanded={expanded}
            aria-label={`${expanded ? "Collapse" : "Expand"} details for ${workshop.title}`}
          >
            View Details
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="font-body text-sm text-muted leading-relaxed mt-3 pt-3 border-t border-border">
                  {workshop.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}
