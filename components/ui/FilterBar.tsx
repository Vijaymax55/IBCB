"use client";

import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  filters: {
    id: string;
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  resultCount?: number;
  totalCount?: number;
  onClear?: () => void;
  className?: string;
}

export function FilterBar({ filters, resultCount, totalCount, onClear, className }: FilterBarProps) {
  const hasActiveFilters = filters.some((f) => f.value !== "");

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {filters.map((filter) => (
        <div key={filter.id} className="flex flex-col gap-1">
          <label htmlFor={filter.id} className="font-body text-xs text-muted font-medium">
            {filter.label}
          </label>
          <select
            id={filter.id}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="font-body text-sm bg-warm-white border border-border text-ink rounded-lg px-3 py-2 pr-8 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron hover:border-muted transition-colors min-w-32"
            aria-label={`Filter by ${filter.label}`}
          >
            <option value="">All {filter.label}s</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="flex items-end gap-3 ml-auto">
        {hasActiveFilters && onClear && (
          <button
            onClick={onClear}
            className="font-body text-sm text-saffron hover:text-saffron/80 underline-offset-2 hover:underline transition-colors self-end pb-2"
          >
            Clear Filters
          </button>
        )}
        {resultCount !== undefined && totalCount !== undefined && (
          <span className="font-body text-sm text-muted self-end pb-2">
            Showing{" "}
            <span className="font-semibold text-ink">{resultCount}</span> of{" "}
            <span className="font-semibold text-ink">{totalCount}</span>
          </span>
        )}
      </div>
    </div>
  );
}
