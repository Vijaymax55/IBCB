import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Team Activity Calendar",
  description: "Live view of IBCB team engagements, field visits, workshops, and key milestones.",
};

export default function CalendarPage() {
  return (
    <div>
      {/* Hero strip */}
      <section
        style={{ background: "#06111F" }}
        className="py-12 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <SectionLabel light>Team Activities</SectionLabel>
          <h1
            className="font-display text-3xl md:text-4xl font-bold mt-2 mb-3"
            style={{ color: "#E8E4DE" }}
          >
            Team Activity Calendar
          </h1>
          <p
            className="text-base max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-ui)", color: "rgba(232,228,222,0.65)" }}
          >
            Live view of IBCB team engagements, field visits, workshops, and key milestones — all in Indian Standard Time.
          </p>
        </div>
      </section>

      {/* Calendar embed */}
      <section className="py-10 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-white">
            {/*
              Replace CALENDAR_ID_HERE with your Google Calendar ID.
              See CALENDAR_SETUP.md for full instructions.
              If Calendar ID contains @, URL-encode it as %40.
              Example: vijaymax5555%40gmail.com
            */}
            <iframe
              src="https://calendar.google.com/calendar/embed?src=CALENDAR_ID_HERE&ctz=Asia%2FKolkata&mode=MONTH&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&bgcolor=%23F9F7F4&color=%23B8860B"
              style={{ border: 0 }}
              width="100%"
              height="700"
              frameBorder={0}
              scrolling="no"
              title="IBCB Team Calendar"
            />
          </div>

          {/* Instruction banner */}
          <div
            className="mt-6 px-5 py-4 rounded-xl text-sm leading-relaxed"
            style={{
              border: "1px solid rgba(184,134,11,0.4)",
              background: "rgba(184,134,11,0.06)",
              fontFamily: "var(--font-ui)",
              color: "#B8860B",
            }}
          >
            📅 This calendar shows all IBCB team activities in IST. Navigate using the arrows to view past or future months. For queries contact the IBCB team.
          </div>
        </div>
      </section>
    </div>
  );
}
