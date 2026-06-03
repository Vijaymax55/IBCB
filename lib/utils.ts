import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}

export function getInitialsColor(initials: string): string {
  const palette = [
    "bg-navy text-cream",
    "bg-sage text-cream",
    "bg-saffron text-navy",
    "bg-ink text-cream",
  ];
  const index = initials.charCodeAt(0) % palette.length;
  return palette[index];
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

export function formatEventDate(dateStr: string): { day: string; month: string; year: string } {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleString("en-IN", { month: "short" }).toUpperCase(),
    year: d.getFullYear().toString(),
  };
}
