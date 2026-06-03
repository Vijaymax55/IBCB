"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.75l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export function Footer() {
  return (
    <footer style={{ background: "#06111F", color: "#E8E4DE" }} aria-label="Site footer">
      <div style={{ height: "1px", background: "rgba(184,134,11,0.4)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_220px] gap-8">

          {/* Col 1 — brand + social */}
          <div>
            <Logo variant="stacked" light className="mb-3" />
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(232,228,222,0.55)", lineHeight: 1.5, marginTop: "0.75rem", maxWidth: "10rem" }}>
              Building 34,000 community institutions for a Viksit Bharat.
            </p>
            <div className="flex items-center gap-2 mt-4">
              {[
                { icon: XIcon, label: "Twitter / X", href: "https://twitter.com" },
                { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com" },
                { icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "rgba(232,228,222,0.06)",
                    border: "1px solid rgba(232,228,222,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(232,228,222,0.5)",
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "#B8860B";
                    el.style.borderColor = "rgba(184,134,11,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "rgba(232,228,222,0.5)";
                    el.style.borderColor = "rgba(232,228,222,0.12)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — quick links */}
          <div>
            <h3 style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(184,134,11,0.8)", fontWeight: 600, marginBottom: "0.75rem" }}>
              Quick Links
            </h3>
            <ul className="space-y-1">
              {[
                { href: "/about", label: "Vision & Strategy" },
                { href: "/team", label: "Our Team" },
                { href: "/initiatives/lms", label: "LMS for CLF" },
                { href: "/initiatives/newsletter", label: "Sutra Newsletter" },
                { href: "/initiatives/workshops", label: "Workshops & Events" },
                { href: "/calendar", label: "Team Calendar" },
                { href: "/partners", label: "Partners" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(232,228,222,0.65)", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#B8860B"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(232,228,222,0.65)"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — about text */}
          <div>
            <h3 style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(184,134,11,0.8)", fontWeight: 600, marginBottom: "0.75rem" }}>
              About
            </h3>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(232,228,222,0.6)", lineHeight: 1.7 }}>
              <p>Institution Building &amp; Capacity Building</p>
              <p>Ministry of Rural Development, GoI</p>
              <p>DAY-NRLM · NMMU</p>
              <p style={{ marginTop: "0.5rem", color: "rgba(232,228,222,0.35)" }}>© {new Date().getFullYear()} All rights reserved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ borderTop: "1px solid rgba(184,134,11,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(232,228,222,0.35)", textAlign: "center" }}>
            © {new Date().getFullYear()} IBCB Model CLF Team · DAY-NRLM · Ministry of Rural Development · Government of India
          </p>
        </div>
      </div>
    </footer>
  );
}
