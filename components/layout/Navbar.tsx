"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

type NavLeaf = { href: string; label: string };
type NavGroup = { label: string; children: NavLeaf[] };
type NavItem = NavLeaf | NavGroup;

function isNavGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Vision" },
  { href: "/team", label: "Team" },
  {
    label: "Initiatives",
    children: [
      { href: "/initiatives/lms", label: "LMS for CLF" },
      { href: "/initiatives/clf-web", label: "CLF Web App" },
      { href: "/initiatives/newsletter", label: "Newsletter — Sutra" },
      { href: "/initiatives/workshops", label: "Workshops & Training" },
      { href: "/calendar", label: "Team Calendar" },
    ],
  },
  { href: "/partners", label: "Partners" },
  { href: "/resources", label: "Resources" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [initiativesOpen, setInitiativesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setInitiativesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b"
          : "bg-transparent"
      )}
      style={scrolled ? { borderBottomColor: "#BAD9F0", boxShadow: "0 4px 20px rgba(10,22,40,0.08)" } : undefined}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" aria-label="IBCB Home">
          <Logo light={!scrolled} className="hover:opacity-90 transition-opacity" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => {
            if (isNavGroup(link)) {
              return (
                <li key={link.label} className="relative">
                  <button
                    onClick={() => setInitiativesOpen(!initiativesOpen)}
                    onBlur={() => setTimeout(() => setInitiativesOpen(false), 150)}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 font-body text-sm font-medium transition-colors rounded-lg",
                      scrolled
                        ? "text-text-body hover:text-sky hover:bg-sky/5"
                        : "text-cream/90 hover:text-cream hover:bg-cream/10"
                    )}
                    aria-expanded={initiativesOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn("transition-transform duration-200", initiativesOpen && "rotate-180")}
                    />
                  </button>

                  <AnimatePresence>
                    {initiativesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-2xl shadow-xl overflow-hidden"
                        role="menu"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className={cn(
                              "block px-4 py-3 font-body text-sm font-medium transition-colors border-b border-border last:border-0",
                              isActive(child.href)
                                ? "text-sky bg-sky/5"
                                : "text-ink hover:text-sky hover:bg-sky/5"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 font-body text-sm font-medium transition-colors rounded-lg relative",
                    scrolled
                      ? isActive(link.href)
                        ? "text-sky"
                        : "text-text-body hover:text-sky hover:bg-sky/5"
                      : isActive(link.href)
                        ? "text-sky-lt"
                        : "text-cream/90 hover:text-cream hover:bg-cream/10"
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-sky rounded-full"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "md:hidden p-2 transition-colors",
            scrolled ? "text-ink hover:text-sky" : "text-cream hover:text-sky-lt"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile drawer — white */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="md:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto border-t border-border"
            aria-label="Mobile navigation menu"
          >
            <nav className="p-6">
              <ul className="space-y-1">
                {navLinks.map((link, i) => {
                  if (isNavGroup(link)) {
                    return (
                      <li key={link.label}>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <span className="block px-4 py-2 font-body text-xs tracking-widest uppercase text-sky font-semibold mt-4 mb-1">
                            {link.label}
                          </span>
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "block px-6 py-2.5 font-body text-base font-medium rounded-lg transition-colors",
                                isActive(child.href)
                                  ? "text-sky bg-sky/10"
                                  : "text-ink/80 hover:text-sky hover:bg-sky/5"
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      </li>
                    );
                  }
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-4 py-3 font-body text-lg font-medium rounded-xl transition-colors",
                          isActive(link.href)
                            ? "text-sky bg-sky/10"
                            : "text-ink hover:text-sky hover:bg-sky/5"
                        )}
                      >
                        {link.href === "/" ? (
                          <span className="flex items-center gap-2">{link.label}</span>
                        ) : link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
