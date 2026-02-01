"use client";

import { X, ExternalLink, Github, Calendar, Tag, Zap, Star, Code } from "lucide-react";
import { MoltbookProject, getFaviconUrl } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";

interface ProjectModalProps {
  project: MoltbookProject;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgError, setImgError] = useState(false);
  const faviconUrl = getFaviconUrl(project.url);

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative bg-[#0d0d0d] border border-[#333] w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto rounded-t-lg sm:rounded-none"
        style={{ borderTop: `4px solid ${project.color}` }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0d0d0d] border-b border-[#333] p-4 sm:p-6 flex items-start justify-between z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Project Icon */}
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-bold flex-shrink-0"
              style={{
                backgroundColor: `${project.color}20`,
                color: project.color,
                border: `2px solid ${project.color}`,
              }}
            >
              {faviconUrl && !imgError ? (
                <Image
                  src={faviconUrl}
                  alt={project.name}
                  width={40}
                  height={40}
                  className="object-contain w-6 h-6 sm:w-10 sm:h-10"
                  onError={() => setImgError(true)}
                  unoptimized
                />
              ) : (
                project.name.charAt(0).toUpperCase()
              )}
            </div>

            <div className="min-w-0">
              <h2 className="font-mono text-lg sm:text-2xl font-bold text-white truncate">{project.name}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-2">
                <span
                  className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono uppercase"
                  style={{
                    backgroundColor: `${project.color}20`,
                    color: project.color,
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  {project.category}
                </span>
                <span
                  className="flex items-center gap-1 text-[10px] sm:text-xs font-mono"
                  style={{ color: statusColors[project.status] }}
                >
                  <span
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{ backgroundColor: statusColors[project.status] }}
                  />
                  {project.status}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#444] text-gray-400 hover:border-white hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-300 font-mono text-sm sm:text-base leading-relaxed">{project.description}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <StatCard
              icon={<Zap className="w-3 h-3 sm:w-4 sm:h-4" />}
              label="Engagement"
              value={project.popularity_metrics.engagement_level}
              color={engagementColors[project.popularity_metrics.engagement_level]}
            />
            <StatCard
              icon={<Calendar className="w-3 h-3 sm:w-4 sm:h-4" />}
              label="Launch"
              value={project.launch_approx}
              color="#fff"
            />
            <StatCard
              icon={<Tag className="w-3 h-3 sm:w-4 sm:h-4" />}
              label="Features"
              value={String(project.features.length)}
              color={project.color || "#00FF00"}
            />
            <StatCard
              icon={<Code className="w-3 h-3 sm:w-4 sm:h-4" />}
              label="Source"
              value={project.open_source ? "Open" : "Closed"}
              color={project.open_source ? "#00FF00" : "#808080"}
            />
          </div>

          {/* Key Indicators */}
          <div className="border border-[#333] p-3 sm:p-4 bg-[#1a1a1a]">
            <div className="flex items-center gap-2 text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4" />
              Key Indicators
            </div>
            <p className="text-gray-300 font-mono text-xs sm:text-sm leading-relaxed">
              {project.popularity_metrics.key_indicators}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4">
              Features ({project.features.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 sm:p-3 bg-[#1a1a1a] border border-[#333]"
                >
                  <span style={{ color: project.color }}>→</span>
                  <span className="text-xs sm:text-sm font-mono text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-[#333]">
            {project.url !== "N/A" && !project.url.includes("N/A") && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-[#00FF00] text-black font-mono font-bold uppercase text-xs sm:text-sm hover:bg-[#00DD00] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </a>
            )}
            {project.github !== "N/A" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-[#444] text-white font-mono font-bold uppercase text-xs sm:text-sm hover:border-[#FF69B4] hover:text-[#FF69B4] transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="border border-[#333] p-2 sm:p-3 bg-[#1a1a1a]">
      <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">
        {icon}
        {label}
      </div>
      <div className="font-mono font-bold text-sm sm:text-lg truncate" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
