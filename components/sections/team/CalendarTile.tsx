"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, X, ExternalLink } from "lucide-react";

// TODO: Replace CALENDAR_SRC with your actual Google Calendar embed URL
const CALENDAR_SRC = "https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=Asia/Kolkata&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&mode=MONTH";

export function CalendarTile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="my-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-navy rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center flex-shrink-0">
              <CalendarDays size={22} className="text-saffron" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-cream">Team Activity Calendar</h3>
              <p className="font-body text-sm text-cream/60 mt-1">
                See live team engagements, field visits, meetings, and training schedules.
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-saffron text-navy font-body text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-saffron/90 transition-colors"
            aria-label="Open team calendar"
          >
            View Calendar <ExternalLink size={14} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/70 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-4 md:inset-8 bg-warm-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
              role="dialog"
              aria-label="Google Calendar"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="font-display text-xl font-bold text-navy">Team Activity Calendar</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-cream transition-colors"
                  aria-label="Close calendar"
                >
                  <X size={18} className="text-muted" />
                </button>
              </div>
              <div className="flex-1 p-4">
                <iframe
                  src={CALENDAR_SRC}
                  title="IBCB Team Calendar"
                  className="w-full h-full rounded-lg border border-border"
                  frameBorder="0"
                  scrolling="no"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
