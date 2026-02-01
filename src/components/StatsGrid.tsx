"use client";

import { getStats } from "@/lib/data";

export default function StatsGrid() {
  const stats = getStats();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {/* Total Projects */}
      <div className="brutal-card p-6">
        <div className="text-brutal-gray text-xs uppercase tracking-wider mb-2">
          Total Projects
        </div>
        <div className="text-5xl font-bold text-brutal-accent">{stats.total}</div>
      </div>

      {/* Live Projects */}
      <div className="brutal-card p-6">
        <div className="text-brutal-gray text-xs uppercase tracking-wider mb-2">
          Live
        </div>
        <div className="text-5xl font-bold text-brutal-cyan">
          {stats.byStatus["Live"] || 0}
        </div>
      </div>

      {/* Open Source */}
      <div className="brutal-card p-6">
        <div className="text-brutal-gray text-xs uppercase tracking-wider mb-2">
          Open Source
        </div>
        <div className="text-5xl font-bold text-brutal-magenta">
          {stats.openSource}
        </div>
        <div className="text-brutal-gray text-xs mt-1">
          {stats.openSourcePercent}% of total
        </div>
      </div>

      {/* High Engagement */}
      <div className="brutal-card p-6">
        <div className="text-brutal-gray text-xs uppercase tracking-wider mb-2">
          High Engagement
        </div>
        <div className="text-5xl font-bold text-brutal-yellow">
          {stats.byEngagement["High"] || 0}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="brutal-card p-6 col-span-2 md:col-span-4">
        <div className="text-brutal-gray text-xs uppercase tracking-wider mb-4">
          By Category
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {Object.entries(stats.byCategory).map(([category, count]) => (
            <div key={category} className="border-2 border-brutal-gray p-3">
              <div className="text-2xl font-bold text-white">{count}</div>
              <div className="text-xs text-brutal-gray uppercase truncate">
                {category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Distribution */}
      <div className="brutal-card p-6 col-span-2">
        <div className="text-brutal-gray text-xs uppercase tracking-wider mb-4">
          Engagement Levels
        </div>
        <div className="space-y-3">
          {["High", "Medium", "Low", "Emerging"].map((level) => {
            const count = stats.byEngagement[level] || 0;
            const percentage = Math.round((count / stats.total) * 100);
            const colors: Record<string, string> = {
              High: "bg-brutal-accent",
              Medium: "bg-brutal-cyan",
              Low: "bg-brutal-gray",
              Emerging: "bg-brutal-yellow",
            };
            return (
              <div key={level} className="flex items-center gap-3">
                <div className="w-20 text-xs uppercase text-brutal-gray">
                  {level}
                </div>
                <div className="flex-1 h-6 border-2 border-white bg-brutal-dark-gray">
                  <div
                    className={`h-full ${colors[level]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-8 text-right font-bold">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Distribution */}
      <div className="brutal-card p-6 col-span-2">
        <div className="text-brutal-gray text-xs uppercase tracking-wider mb-4">
          Project Status
        </div>
        <div className="space-y-3">
          {["Live", "Beta", "In Development"].map((status) => {
            const count = stats.byStatus[status] || 0;
            const percentage = Math.round((count / stats.total) * 100);
            const colors: Record<string, string> = {
              Live: "bg-brutal-accent",
              Beta: "bg-brutal-yellow",
              "In Development": "bg-brutal-magenta",
            };
            return (
              <div key={status} className="flex items-center gap-3">
                <div className="w-28 text-xs uppercase text-brutal-gray">
                  {status}
                </div>
                <div className="flex-1 h-6 border-2 border-white bg-brutal-dark-gray">
                  <div
                    className={`h-full ${colors[status]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-8 text-right font-bold">{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
