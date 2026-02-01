"use client";

import { X, ExternalLink, Github, Check, Minus } from "lucide-react";
import { MoltbookProject, getFaviconUrl } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";

interface CompareViewProps {
  projects: MoltbookProject[];
  onRemove: (name: string) => void;
  onClearAll: () => void;
}

export default function CompareView({ projects, onRemove, onClearAll }: CompareViewProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">⚖️</div>
        <h2 className="font-mono text-2xl font-bold text-white mb-2">No Projects Selected</h2>
        <p className="text-gray-400 font-mono text-sm">
          Click the + button on project cards to add them to comparison
        </p>
      </div>
    );
  }

  // Get all unique features
  const allFeatures = [...new Set(projects.flatMap((p) => p.features))].sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-mono text-2xl font-bold text-white">
            Compare {projects.length} Projects
          </h2>
          <p className="text-gray-400 font-mono text-sm mt-1">
            Side-by-side comparison of selected projects
          </p>
        </div>
        <button
          onClick={onClearAll}
          className="px-4 py-2 border border-[#444] text-gray-400 font-mono text-sm uppercase tracking-wider hover:border-red-500 hover:text-red-500 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono">
          {/* Header Row with Project Cards */}
          <thead>
            <tr>
              <th className="p-4 text-left text-gray-400 text-xs uppercase tracking-wider border-b border-[#333] sticky left-0 bg-[#0d0d0d] z-10 min-w-[150px]">
                Feature
              </th>
              {projects.map((project) => (
                <ProjectHeader
                  key={project.name}
                  project={project}
                  onRemove={() => onRemove(project.name)}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Basic Info Rows */}
            <CompareRow label="Category" projects={projects} getValue={(p) => p.category} />
            <CompareRow label="Status" projects={projects} getValue={(p) => p.status} />
            <CompareRow
              label="Engagement"
              projects={projects}
              getValue={(p) => p.popularity_metrics.engagement_level}
            />
            <CompareRow
              label="Open Source"
              projects={projects}
              getValue={(p) => (p.open_source ? "Yes" : "No")}
              isBoolean
            />
            <CompareRow label="Launch" projects={projects} getValue={(p) => p.launch_approx} />
            <CompareRow
              label="Features Count"
              projects={projects}
              getValue={(p) => String(p.features.length)}
            />

            {/* Divider */}
            <tr>
              <td
                colSpan={projects.length + 1}
                className="py-4 text-center text-gray-500 text-xs uppercase tracking-widest border-b border-[#333]"
              >
                Feature Comparison
              </td>
            </tr>

            {/* Feature Rows */}
            {allFeatures.map((feature) => (
              <FeatureRow key={feature} feature={feature} projects={projects} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProjectHeader({
  project,
  onRemove,
}: {
  project: MoltbookProject;
  onRemove: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const faviconUrl = getFaviconUrl(project.url);

  return (
    <th
      className="p-4 border-b border-[#333] min-w-[200px]"
      style={{ borderTop: `3px solid ${project.color}` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center text-sm font-bold"
            style={{
              backgroundColor: `${project.color}20`,
              color: project.color,
            }}
          >
            {faviconUrl && !imgError ? (
              <Image
                src={faviconUrl}
                alt={project.name}
                width={24}
                height={24}
                className="object-contain"
                onError={() => setImgError(true)}
                unoptimized
              />
            ) : (
              project.name.charAt(0)
            )}
          </div>
          <div className="text-left">
            <div className="font-bold text-white text-sm">{project.name}</div>
            <div className="text-xs text-gray-400 font-normal">{project.category}</div>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 mt-3">
        {project.url !== "N/A" && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-[#00FF00] flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" /> Visit
          </a>
        )}
        {project.github !== "N/A" && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-[#FF69B4] flex items-center gap-1"
          >
            <Github className="w-3 h-3" /> GitHub
          </a>
        )}
      </div>
    </th>
  );
}

function CompareRow({
  label,
  projects,
  getValue,
  isBoolean,
}: {
  label: string;
  projects: MoltbookProject[];
  getValue: (p: MoltbookProject) => string;
  isBoolean?: boolean;
}) {
  return (
    <tr className="border-b border-[#222] hover:bg-[#1a1a1a]">
      <td className="p-4 text-gray-400 text-sm sticky left-0 bg-[#0d0d0d] z-10">
        {label}
      </td>
      {projects.map((project) => {
        const value = getValue(project);
        return (
          <td key={project.name} className="p-4 text-center">
            {isBoolean ? (
              value === "Yes" ? (
                <Check className="w-5 h-5 text-[#00FF00] mx-auto" />
              ) : (
                <Minus className="w-5 h-5 text-gray-500 mx-auto" />
              )
            ) : (
              <span
                className="text-sm"
                style={{
                  color:
                    value === "Live" || value === "High" || value === "Yes"
                      ? "#00FF00"
                      : value === "In Development" || value === "Emerging"
                      ? "#FFD93D"
                      : "#fff",
                }}
              >
                {value}
              </span>
            )}
          </td>
        );
      })}
    </tr>
  );
}

function FeatureRow({
  feature,
  projects,
}: {
  feature: string;
  projects: MoltbookProject[];
}) {
  return (
    <tr className="border-b border-[#222] hover:bg-[#1a1a1a]">
      <td className="p-4 text-gray-400 text-sm sticky left-0 bg-[#0d0d0d] z-10">
        {feature}
      </td>
      {projects.map((project) => {
        const hasFeature = project.features.includes(feature);
        return (
          <td key={project.name} className="p-4 text-center">
            {hasFeature ? (
              <Check className="w-5 h-5 text-[#00FF00] mx-auto" />
            ) : (
              <Minus className="w-5 h-5 text-gray-600 mx-auto" />
            )}
          </td>
        );
      })}
    </tr>
  );
}
