"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Filter, ChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export interface JobFiltersState {
  category: string | null;
  job_type: string | null;
  fylke: string | null;
  region: string | null;
}

interface JobFiltersProps {
  filters: JobFiltersState;
  availableFylker: string[];
  availableRegions: string[];
  onFilterChange?: (filters: JobFiltersState) => void;
}

const categories = [
  { value: "Dekk", label: "Dekk" },
  { value: "Maskin", label: "Maskin" },
  { value: "Catering", label: "Catering" },
  { value: "Teknisk", label: "Teknisk" },
  { value: "Annet", label: "Annet" },
];

const jobTypes = [
  { value: "Fast", label: "Fast stilling" },
  { value: "Vikariat", label: "Vikariat" },
  { value: "Sesong", label: "Sesong" },
  { value: "Prosjekt", label: "Prosjekt" },
];

interface FilterSelectProps {
  label: string;
  value: string | null;
  options: { value: string; label: string }[];
  onChange: (value: string | null) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        className={cn(
          "appearance-none w-full px-4 py-2.5 pr-10 rounded-xl border text-sm font-medium",
          "bg-white border-slate-200 text-navy-900",
          "hover:border-gold-400/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20",
          "transition-all duration-200 cursor-pointer",
          value && "border-gold-400 bg-gold-50"
        )}
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );
}

export default function JobFilters({
  filters,
  availableFylker,
  availableRegions,
  onFilterChange,
}: JobFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = useCallback(
    (key: keyof JobFiltersState, value: string | null) => {
      const newFilters = { ...filters, [key]: value };

      // Update URL params
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      router.push(`/stillinger?${params.toString()}`, { scroll: false });
      onFilterChange?.(newFilters);
    },
    [filters, router, searchParams, onFilterChange]
  );

  const clearAllFilters = useCallback(() => {
    router.push("/stillinger", { scroll: false });
    onFilterChange?.({
      category: null,
      job_type: null,
      fylke: null,
      region: null,
    });
  }, [router, onFilterChange]);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const fylkeOptions = availableFylker.map((f) => ({ value: f, label: f }));
  const regionOptions = availableRegions.map((r) => ({ value: r, label: r }));

  return (
    <div className="space-y-4">
      {/* Filter row */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 text-slate-600 mr-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filtrer:</span>
        </div>

        <FilterSelect
          label="Kategori"
          value={filters.category}
          options={categories}
          onChange={(v) => updateFilters("category", v)}
        />

        <FilterSelect
          label="Ansettelse"
          value={filters.job_type}
          options={jobTypes}
          onChange={(v) => updateFilters("job_type", v)}
        />

        {fylkeOptions.length > 0 && (
          <FilterSelect
            label="Fylke"
            value={filters.fylke}
            options={fylkeOptions}
            onChange={(v) => updateFilters("fylke", v)}
          />
        )}

        {regionOptions.length > 0 && (
          <FilterSelect
            label="Region"
            value={filters.region}
            options={regionOptions}
            onChange={(v) => updateFilters("region", v)}
          />
        )}
      </div>

      {/* Active filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 animate-fade-in">
          <span className="text-sm text-slate-500">Aktive filter:</span>

          {filters.category && (
            <Badge variant="primary" size="sm" className="flex items-center gap-1">
              {categories.find((c) => c.value === filters.category)?.label}
              <button
                aria-label="Fjern kategori-filter"
                onClick={() => updateFilters("category", null)}
                className="ml-1 hover:text-navy-900"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {filters.job_type && (
            <Badge variant="primary" size="sm" className="flex items-center gap-1">
              {jobTypes.find((j) => j.value === filters.job_type)?.label}
              <button
                aria-label="Fjern ansettelsestype-filter"
                onClick={() => updateFilters("job_type", null)}
                className="ml-1 hover:text-navy-900"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {filters.fylke && (
            <Badge variant="primary" size="sm" className="flex items-center gap-1">
              {filters.fylke}
              <button
                aria-label="Fjern fylke-filter"
                onClick={() => updateFilters("fylke", null)}
                className="ml-1 hover:text-navy-900"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {filters.region && (
            <Badge variant="primary" size="sm" className="flex items-center gap-1">
              {filters.region}
              <button
                aria-label="Fjern region-filter"
                onClick={() => updateFilters("region", null)}
                className="ml-1 hover:text-navy-900"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          <button
            onClick={clearAllFilters}
            className="text-sm text-gold-600 hover:text-gold-700 font-medium ml-2"
          >
            Fjern alle
          </button>
        </div>
      )}
    </div>
  );
}


