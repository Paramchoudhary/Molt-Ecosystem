"use client";

import { Plus, Check, ExternalLink, Github } from "lucide-react";
import { MoltbookProject, getFaviconUrl } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";

interface ProjectCardProps {
  project: MoltbookProject;
  isSelected: boolean;
  onToggleSelect: () => void;
  onClick: () => void;
}

export default function ProjectCard({
  project,
  isSelected,
  onToggleSelect,
  onClick,
}: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const faviconUrl = getFaviconUrl(project.url);
  const githubFavicon = project.github !== "N/A" ? getFaviconUrl(project.github) : null;
  
  const statusColors: Record<string, string> = {
    Live: "#00FF00",
    Beta: "#FFD93D",
    "In Development": "#FF69B4",
  };

  const engagementColors: Record<string, string> = {
    High: "#00FF00",
    Medium: "#00CED1",
    Low: "#808080",
    Emerging: "#FFD93D",
  };

  return (
    <div
      className="group relative bg-[#1a1a1a] border border-[#333] hover:border-[#00FF00] transition-all cursor-pointer overflow-hidden"
      style={{
        boxShadow: isSelected ? `0 0 20px ${project.color}40` : "none",
      }}
    >
      {/* Card Header with Color Bar */}
      <div
        className="h-2 w-full"
        style={{ backgroundColor: project.color || "#00FF00" }}
      />

      {/* Main Card Content */}
      <div className="p-5" onClick={onClick}>
        {/* Top Row: Logo & Add Button */}
        <div className="flex items-start justify-between mb-4">
          {/* Project Icon/Logo */}
          <div
            className="w-12 h-12 flex items-center justify-center text-xl font-bold"
            style={{
              backgroundColor: `${project.color}20`,
              color: project.color,
              border: `2px solid ${project.color}40`,
            }}
          >
            {faviconUrl && !imgError ? (
              <Image
                src={faviconUrl}
                alt={project.name}
                width={32}
                height={32}
                className="object-contain"
                onError={() => setImgError(true)}
                unoptimized
              />
            ) : (
              project.name.charAt(0).toUpperCase()
            )}
          </div>

          {/* Add to Compare Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect();
            }}
            className={`w-8 h-8 flex items-center justify-center border transition-all ${
              isSelected
                ? "bg-[#00FF00] border-[#00FF00] text-black"
                : "border-[#444] text-gray-400 hover:border-[#00FF00] hover:text-[#00FF00]"
            }`}
          >
            {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>

        {/* Project Name */}
        <h3 className="font-mono font-bold text-lg text-white mb-2 group-hover:text-[#00FF00] transition-colors">
          {project.name}
        </h3>

        {/* Category Badge */}
        <div
          className="inline-block px-2 py-1 text-xs font-mono uppercase tracking-wider mb-3"
          style={{
            backgroundColor: `${project.color}20`,
            color: project.color,
            border: `1px solid ${project.color}40`,
          }}
        >
          {project.category}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm font-mono leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-xs font-mono">
          {/* Status */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: statusColors[project.status] }}
            />
            <span className="text-gray-400">{project.status}</span>
          </div>

          {/* Engagement */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2"
              style={{ backgroundColor: engagementColors[project.popularity_metrics.engagement_level] }}
            />
            <span className="text-gray-400">{project.popularity_metrics.engagement_level}</span>
          </div>

          {/* Features count */}
          <div className="text-gray-500">
            {project.features.length} features
          </div>
        </div>
      </div>

      {/* Card Footer with Links */}
      <div className="border-t border-[#333] px-5 py-3 flex items-center gap-3">
        {project.url !== "N/A" && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#00FF00] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Website
          </a>
        )}
        {project.github !== "N/A" && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#FF69B4] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
        )}
        {project.open_source && (
          <span className="ml-auto text-xs font-mono text-[#00FF00] uppercase">
            Open Source
          </span>
        )}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: `2px solid ${project.color}`,
            boxShadow: `inset 0 0 20px ${project.color}20`,
          }}
        />
      )}
    </div>
  );
}
