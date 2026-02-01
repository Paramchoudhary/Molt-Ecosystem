"use client";

import { getCategories, getStats } from "@/lib/data";

interface CategoryFilterProps {
  selected: string | null;
  onChange: (category: string | null) => void;
}

const categoryIcons: Record<string, string> = {
  "Token Launchpad": "🚀",
  "Aggregator": "📊",
  "Social/Forum": "💬",
  "Social Media": "📱",
  "Gaming": "🎮",
  "Visualization": "🎨",
  "Developer Tools": "🔧",
  "Messaging": "💌",
  "Virtual World": "🌐",
  "Forum / Knowledge Base": "📚",
  "Marketplace": "🛒",
  "Other": "📁",
};

const categoryColors: Record<string, string> = {
  "Token Launchpad": "#00FF00",
  "Aggregator": "#FFD93D",
  "Social/Forum": "#6BCB77",
  "Social Media": "#1DA1F2",
  "Gaming": "#FF8C00",
  "Visualization": "#FF69B4",
  "Developer Tools": "#00CED1",
  "Messaging": "#7B68EE",
  "Virtual World": "#20B2AA",
  "Forum / Knowledge Base": "#F48024",
  "Marketplace": "#DC143C",
  "Other": "#808080",
};

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const categories = getCategories();
  const stats = getStats();

  return (
    <div className="flex gap-2 min-w-max">
      {/* All button */}
      <button
        onClick={() => onChange(null)}
        className={`px-3 lg:px-4 py-1.5 lg:py-2 font-mono text-xs lg:text-sm uppercase tracking-wider border transition-all whitespace-nowrap ${
          selected === null
            ? "bg-[#00FF00] border-[#00FF00] text-black"
            : "border-[#444] text-gray-400 hover:border-[#00FF00] hover:text-[#00FF00]"
        }`}
      >
        All ({stats.total})
      </button>

      {/* Category buttons */}
      {categories.map((category) => {
        const count = stats.byCategory[category] || 0;
        const color = categoryColors[category] || "#00FF00";
        const icon = categoryIcons[category] || "📁";
        const isSelected = selected === category;

        return (
          <button
            key={category}
            onClick={() => onChange(isSelected ? null : category)}
            className={`px-3 lg:px-4 py-1.5 lg:py-2 font-mono text-xs lg:text-sm tracking-wider border transition-all flex items-center gap-1.5 lg:gap-2 whitespace-nowrap ${
              isSelected
                ? "text-black"
                : "text-gray-400 hover:text-white"
            }`}
            style={{
              backgroundColor: isSelected ? color : "transparent",
              borderColor: isSelected ? color : "#444",
            }}
          >
            <span>{icon}</span>
            <span className="hidden sm:inline">{category}</span>
            <span
              className={`text-xs ${isSelected ? "text-black/60" : "text-gray-500"}`}
            >
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
}
