"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Pause, Play, Square } from "lucide-react";
import { useSpeech } from "@/lib/useSpeech";
import type { Newsletter } from "@/types";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { value: "hi-IN", label: "Hindi" },
  { value: "en-IN", label: "English" },
  { value: "te-IN", label: "Telugu" },
  { value: "ta-IN", label: "Tamil" },
  { value: "kn-IN", label: "Kannada" },
];

const SPEEDS = [
  { value: 0.7, label: "Slow" },
  { value: 0.9, label: "Normal" },
  { value: 1.2, label: "Fast" },
];

interface NewsletterReaderProps {
  newsletter: Newsletter;
}

export function NewsletterReader({ newsletter }: NewsletterReaderProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ttsLang, setTtsLang] = useState("hi-IN");
  const [ttsSpeed, setTtsSpeed] = useState(0.9);
  const { speak, pause, resume, stop, speaking, paused } = useSpeech();

  const totalPages = newsletter.pages.length;
  const currentContent = newsletter.pages[page];

  function goToPage(newPage: number) {
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
    if (speaking) stop();
  }

  function handleListen() {
    if (!speaking) {
      speak(currentContent, ttsLang, ttsSpeed);
    } else if (paused) {
      resume();
    } else {
      pause();
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block" aria-label="Table of contents">
            <div className="sticky top-24">
              <h3 className="font-body text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                Pages
              </h3>
              <ul className="space-y-1">
                {newsletter.pages.map((_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => goToPage(i)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg font-body text-sm transition-colors",
                        i === page
                          ? "bg-navy text-cream font-semibold"
                          : "text-muted hover:text-ink hover:bg-cream"
                      )}
                      aria-label={`Go to page ${i + 1}`}
                      aria-current={i === page ? "page" : undefined}
                    >
                      Page {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Reading pane */}
          <main>
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-navy">{newsletter.title}</h1>
              <p className="font-body text-sm text-muted mt-1">
                {newsletter.month} {newsletter.year} · {newsletter.language}
              </p>
            </div>

            {/* Page content */}
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={page}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-warm-white border border-border rounded-2xl p-8 md:p-10 shadow-sm"
                  aria-label={`Page ${page + 1} of ${totalPages}`}
                >
                  <p className="font-body text-xs text-muted font-semibold uppercase tracking-wider mb-6">
                    Page {page + 1} of {totalPages}
                  </p>
                  <div className="font-display text-lg md:text-xl text-ink leading-[1.9] max-w-[65ch]">
                    {currentContent}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className="flex items-center gap-2 px-4 py-2.5 font-body text-sm font-medium text-ink bg-warm-white border border-border rounded-xl hover:bg-cream disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <span className="font-mono text-sm text-muted">
                {page + 1} / {totalPages}
              </span>

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages - 1}
                className="flex items-center gap-2 px-4 py-2.5 font-body text-sm font-medium text-ink bg-warm-white border border-border rounded-xl hover:bg-cream disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>

            {/* TTS Controls */}
            <div className="mt-8 bg-navy rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Waveform */}
                  <div className="flex items-end gap-0.5 h-5 w-8" aria-hidden="true">
                    {speaking && !paused ? (
                      <>
                        <div className="wave-bar" />
                        <div className="wave-bar" />
                        <div className="wave-bar" />
                      </>
                    ) : (
                      <Volume2 size={16} className="text-saffron/50" />
                    )}
                  </div>

                  <button
                    onClick={handleListen}
                    className="flex items-center gap-2 bg-saffron text-navy font-body text-sm font-semibold px-4 py-2 rounded-full hover:bg-saffron/90 transition-colors"
                    aria-label={speaking ? (paused ? "Resume listening" : "Pause listening") : "Listen to this page"}
                  >
                    {speaking ? (
                      paused ? (
                        <><Play size={14} /> Resume</>
                      ) : (
                        <><Pause size={14} /> Pause</>
                      )
                    ) : (
                      <><Volume2 size={14} /> Listen</>
                    )}
                  </button>

                  {speaking && (
                    <button
                      onClick={stop}
                      className="flex items-center gap-1.5 text-cream/70 hover:text-cream text-sm font-body transition-colors"
                      aria-label="Stop listening"
                    >
                      <Square size={14} /> Stop
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Language */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="tts-lang" className="font-body text-xs text-cream/60">
                      Language:
                    </label>
                    <select
                      id="tts-lang"
                      value={ttsLang}
                      onChange={(e) => setTtsLang(e.target.value)}
                      className="font-body text-xs bg-cream/10 text-cream border border-cream/20 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-saffron"
                    >
                      {LANGUAGES.map((l) => (
                        <option key={l.value} value={l.value} className="text-navy bg-cream">
                          {l.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Speed */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-body text-xs text-cream/60">Speed:</span>
                    {SPEEDS.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setTtsSpeed(s.value)}
                        className={cn(
                          "font-body text-xs px-2 py-0.5 rounded-full transition-colors",
                          ttsSpeed === s.value
                            ? "bg-saffron text-navy font-semibold"
                            : "text-cream/60 hover:text-cream"
                        )}
                        aria-label={`Set reading speed to ${s.label}`}
                        aria-pressed={ttsSpeed === s.value}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
