"use client";

import { X } from "lucide-react";
import { getCategories, getEngagementLevels } from "@/lib/data";

interface Filters {
  category: string | null;
  status: string | null;
  openSource: boolean | null;
  engagement: string | null;
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const categories = getCategories();
  const engagementLevels = getEngagementLevels();
  const statuses = ["Live", "Beta", "In Development"];

  const activeFilters = Object.entries(filters).filter(
    ([, value]) => value !== null
  );

  const clearFilter = (key: keyof Filters) => {
    onFilterChange({ ...filters, [key]: null });
  };

  const clearAll = () => {
    onFilterChange({
      category: null,
      status: null,
      openSource: null,
      engagement: null,
    });
  };

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-brutal-gray text-xs uppercase self-center mr-2">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  category: filters.category === cat ? null : cat,
                })
              }
              className={`brutal-badge transition-none ${
                filters.category === cat
                  ? "bg-brutal-accent text-black border-brutal-accent"
                  : "text-white border-white hover:border-brutal-accent hover:text-brutal-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Status Filters */}
        <span className="text-brutal-gray text-xs uppercase self-center mr-2">
          Status:
        </span>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() =>
              onFilterChange({
                ...filters,
                status: filters.status === status ? null : status,
              })
            }
            className={`brutal-badge transition-none ${
              filters.status === status
                ? "bg-brutal-cyan text-black border-brutal-cyan"
                : "text-white border-white hover:border-brutal-cyan hover:text-brutal-cyan"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Engagement Filters */}
        <span className="text-brutal-gray text-xs uppercase self-center mr-2">
          Popularity:
        </span>
        {engagementLevels.map((level) => (
          <button
            key={level}
            onClick={() =>
              onFilterChange({
                ...filters,
                engagement: filters.engagement === level ? null : level,
              })
            }
            className={`brutal-badge transition-none ${
              filters.engagement === level
                ? "bg-brutal-yellow text-black border-brutal-yellow"
                : "text-white border-white hover:border-brutal-yellow hover:text-brutal-yellow"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {/* Open Source Toggle */}
        <span className="text-brutal-gray text-xs uppercase mr-2">
          Source:
        </span>
        <button
          onClick={() =>
            onFilterChange({
              ...filters,
              openSource: filters.openSource === true ? null : true,
            })
          }
          className={`brutal-badge transition-none ${
            filters.openSource === true
              ? "bg-brutal-magenta text-black border-brutal-magenta"
              : "text-white border-white hover:border-brutal-magenta hover:text-brutal-magenta"
          }`}
        >
          Open Source
        </button>
        <button
          onClick={() =>
            onFilterChange({
              ...filters,
              openSource: filters.openSource === false ? null : false,
            })
          }
          className={`brutal-badge transition-none ${
            filters.openSource === false
              ? "bg-brutal-magenta text-black border-brutal-magenta"
              : "text-white border-white hover:border-brutal-magenta hover:text-brutal-magenta"
          }`}
        >
          Closed Source
        </button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-brutal-dark-gray">
          <span className="text-brutal-gray text-xs uppercase">Active:</span>
          {activeFilters.map(([key, value]) => (
            <button
              key={key}
              onClick={() => clearFilter(key as keyof Filters)}
              className="brutal-badge bg-brutal-dark-gray text-white border-white flex items-center gap-2 group"
            >
              <span>
                {key === "openSource"
                  ? value
                    ? "Open Source"
                    : "Closed Source"
                  : String(value)}
              </span>
              <X className="w-3 h-3 group-hover:text-brutal-accent" />
            </button>
          ))}
          <button
            onClick={clearAll}
            className="text-brutal-accent text-xs uppercase hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
