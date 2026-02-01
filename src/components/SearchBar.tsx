"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brutal-gray" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="SEARCH PROJECTS..."
        className="brutal-input w-full pl-12 pr-12 py-4 text-sm uppercase tracking-wider"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-brutal-gray hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
