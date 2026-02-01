"use client";

import { useState, useMemo } from "react";
import {
  ExternalLink,
  Github,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import { MoltbookProject } from "@/lib/data";
import ProjectModal from "./ProjectModal";

type SortField =
  | "name"
  | "category"
  | "status"
  | "engagement"
  | "launch"
  | "features";
type SortDirection = "asc" | "desc";

interface BrutalistTableProps {
  projects: MoltbookProject[];
}

export default function BrutalistTable({ projects }: BrutalistTableProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedProject, setSelectedProject] =
    useState<MoltbookProject | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const engagementOrder = { High: 0, Medium: 1, Low: 2, Emerging: 3 };
  const statusOrder = { Live: 0, Beta: 1, "In Development": 2 };

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        case "status":
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        case "engagement":
          comparison =
            engagementOrder[a.popularity_metrics.engagement_level] -
            engagementOrder[b.popularity_metrics.engagement_level];
          break;
        case "features":
          comparison = a.features.length - b.features.length;
          break;
        case "launch":
          comparison = a.launch_approx.localeCompare(b.launch_approx);
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [projects, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-brutal-gray" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 text-brutal-accent" />
    ) : (
      <ChevronDown className="w-4 h-4 text-brutal-accent" />
    );
  };

  const engagementColors: Record<string, string> = {
    High: "text-brutal-accent border-brutal-accent",
    Medium: "text-brutal-cyan border-brutal-cyan",
    Low: "text-brutal-gray border-brutal-gray",
    Emerging: "text-brutal-yellow border-brutal-yellow",
  };

  const statusColors: Record<string, string> = {
    Live: "text-brutal-accent border-brutal-accent",
    Beta: "text-brutal-yellow border-brutal-yellow",
    "In Development": "text-brutal-magenta border-brutal-magenta",
  };

  return (
    <>
      <div className="overflow-x-auto brutal-border">
        <table className="brutal-table">
          <thead>
            <tr>
              <th
                className="cursor-pointer hover:bg-brutal-dark-gray"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-2">
                  Project <SortIcon field="name" />
                </div>
              </th>
              <th
                className="cursor-pointer hover:bg-brutal-dark-gray"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center gap-2">
                  Category <SortIcon field="category" />
                </div>
              </th>
              <th
                className="cursor-pointer hover:bg-brutal-dark-gray"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-2">
                  Status <SortIcon field="status" />
                </div>
              </th>
              <th
                className="cursor-pointer hover:bg-brutal-dark-gray"
                onClick={() => handleSort("engagement")}
              >
                <div className="flex items-center gap-2">
                  Popularity <SortIcon field="engagement" />
                </div>
              </th>
              <th
                className="cursor-pointer hover:bg-brutal-dark-gray"
                onClick={() => handleSort("features")}
              >
                <div className="flex items-center gap-2">
                  Features <SortIcon field="features" />
                </div>
              </th>
              <th
                className="cursor-pointer hover:bg-brutal-dark-gray"
                onClick={() => handleSort("launch")}
              >
                <div className="flex items-center gap-2">
                  Launch <SortIcon field="launch" />
                </div>
              </th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project) => (
              <tr
                key={project.name}
                className="cursor-pointer hover:bg-brutal-dark-gray"
                onClick={() => setSelectedProject(project)}
              >
                <td className="font-bold">
                  <div className="flex items-center gap-2">
                    {project.open_source && (
                      <span className="text-brutal-magenta" title="Open Source">
                        ◆
                      </span>
                    )}
                    {project.name}
                  </div>
                </td>
                <td>
                  <span className="brutal-badge text-white border-white">
                    {project.category}
                  </span>
                </td>
                <td>
                  <span
                    className={`brutal-badge ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`brutal-badge ${
                      engagementColors[project.popularity_metrics.engagement_level]
                    }`}
                  >
                    {project.popularity_metrics.engagement_level}
                  </span>
                </td>
                <td>
                  <span className="text-brutal-gray">
                    {project.features.length}
                  </span>
                </td>
                <td className="text-sm text-brutal-gray">
                  {project.launch_approx}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    {project.url !== "N/A" && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-brutal-gray hover:border-brutal-accent hover:text-brutal-accent"
                        title="Visit Website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.github !== "N/A" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-brutal-gray hover:border-brutal-magenta hover:text-brutal-magenta"
                        title="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.url === "N/A" && project.github === "N/A" && (
                      <span className="text-brutal-gray text-xs">—</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results count */}
      <div className="mt-4 text-brutal-gray text-sm uppercase tracking-wider">
        Showing {sortedProjects.length} project
        {sortedProjects.length !== 1 ? "s" : ""}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
