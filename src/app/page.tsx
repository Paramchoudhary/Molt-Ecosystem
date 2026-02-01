"use client";

import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { moltbookProjects, MoltbookProject, getStats } from "@/lib/data";
import Sidebar from "@/components/Sidebar";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import CompareView from "@/components/CompareView";
import CategoryFilter from "@/components/CategoryFilter";

export default function Home() {
  const [activeView, setActiveView] = useState<"discover" | "compare">("discover");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());
  const [modalProject, setModalProject] = useState<MoltbookProject | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [engagementFilter, setEngagementFilter] = useState<string | null>(null);
  const [openSourceFilter, setOpenSourceFilter] = useState<boolean | null>(null);

  const stats = getStats();

  const filteredProjects = useMemo(() => {
    return moltbookProjects.filter((project) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.features.some((f) => f.toLowerCase().includes(searchLower)) ||
          project.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && project.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (statusFilter && project.status !== statusFilter) {
        return false;
      }

      // Engagement filter
      if (engagementFilter && project.popularity_metrics.engagement_level !== engagementFilter) {
        return false;
      }

      // Open source filter
      if (openSourceFilter !== null && project.open_source !== openSourceFilter) {
        return false;
      }

      return true;
    });
  }, [search, selectedCategory, statusFilter, engagementFilter, openSourceFilter]);

  const toggleProjectSelection = (name: string) => {
    setSelectedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const selectedProjectsList = moltbookProjects.filter((p) =>
    selectedProjects.has(p.name)
  );

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setStatusFilter(null);
    setEngagementFilter(null);
    setOpenSourceFilter(null);
  };

  const hasActiveFilters = search || selectedCategory || statusFilter || engagementFilter || openSourceFilter !== null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        compareCount={selectedProjects.size}
      />

      {/* Main Content - Responsive margin */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        {/* Header */}
        <header className="sticky top-16 lg:top-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#222]">
          <div className="px-4 lg:px-8 py-4 lg:py-6">
            {/* Title Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 lg:mb-6">
              <div>
                <h1 className="font-mono text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {activeView === "discover" ? "EXPLORE PROJECTS" : "COMPARE PROJECTS"}
                </h1>
                <p className="text-gray-400 font-mono text-xs lg:text-sm mt-1">
                  {activeView === "discover"
                    ? `${filteredProjects.length} projects in the molt Ecosystem`
                    : `${selectedProjects.size} projects selected for comparison`}
                </p>
              </div>

              {/* Stats Pills - Hidden on mobile, visible on larger screens */}
              {activeView === "discover" && (
                <div className="hidden md:flex items-center gap-3 lg:gap-4">
                  <div className="flex items-center gap-2 px-2 lg:px-3 py-1 lg:py-1.5 bg-[#1a1a1a] border border-[#333]">
                    <span className="w-2 h-2 bg-[#00FF00] rounded-full" />
                    <span className="font-mono text-xs text-gray-400">
                      {stats.byStatus["Live"] || 0} Live
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2 lg:px-3 py-1 lg:py-1.5 bg-[#1a1a1a] border border-[#333]">
                    <span className="w-2 h-2 bg-[#FF69B4]" />
                    <span className="font-mono text-xs text-gray-400">
                      {stats.openSource} Open Source
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Search and Filters */}
            {activeView === "discover" && (
              <div className="space-y-3 lg:space-y-4">
                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
                  <div className="relative flex-1 sm:max-w-xl">
                    <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 w-4 lg:w-5 h-4 lg:h-5 text-gray-500" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search projects..."
                      className="w-full bg-[#1a1a1a] border border-[#333] px-10 lg:px-12 py-2.5 lg:py-3 font-mono text-sm text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none transition-colors"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 lg:py-3 border font-mono text-sm transition-colors ${
                      showFilters || hasActiveFilters
                        ? "bg-[#00FF00] border-[#00FF00] text-black"
                        : "border-[#333] text-gray-400 hover:border-[#00FF00] hover:text-[#00FF00]"
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Filters</span>
                    {hasActiveFilters && (
                      <span className="ml-1 px-1.5 py-0.5 bg-black/20 text-xs">
                        {[selectedCategory, statusFilter, engagementFilter, openSourceFilter !== null].filter(Boolean).length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Category Filter - Scrollable on mobile */}
                <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 pb-2">
                  <CategoryFilter
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="p-3 lg:p-4 bg-[#1a1a1a] border border-[#333] space-y-3 lg:space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                        Advanced Filters
                      </span>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-xs font-mono text-[#00FF00] hover:underline"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Status Filter */}
                      <div>
                        <label className="block text-gray-500 font-mono text-xs uppercase mb-2">
                          Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["Live", "Beta", "In Development"].map((status) => (
                            <button
                              key={status}
                              onClick={() =>
                                setStatusFilter(statusFilter === status ? null : status)
                              }
                              className={`px-2 lg:px-3 py-1 lg:py-1.5 border font-mono text-xs transition-colors ${
                                statusFilter === status
                                  ? "bg-[#00FF00] border-[#00FF00] text-black"
                                  : "border-[#444] text-gray-400 hover:border-[#00FF00]"
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Engagement Filter */}
                      <div>
                        <label className="block text-gray-500 font-mono text-xs uppercase mb-2">
                          Engagement
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["High", "Medium", "Low", "Emerging"].map((level) => (
                            <button
                              key={level}
                              onClick={() =>
                                setEngagementFilter(engagementFilter === level ? null : level)
                              }
                              className={`px-2 lg:px-3 py-1 lg:py-1.5 border font-mono text-xs transition-colors ${
                                engagementFilter === level
                                  ? "bg-[#00CED1] border-[#00CED1] text-black"
                                  : "border-[#444] text-gray-400 hover:border-[#00CED1]"
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Open Source Filter */}
                      <div>
                        <label className="block text-gray-500 font-mono text-xs uppercase mb-2">
                          Source
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              setOpenSourceFilter(openSourceFilter === true ? null : true)
                            }
                            className={`px-2 lg:px-3 py-1 lg:py-1.5 border font-mono text-xs transition-colors ${
                              openSourceFilter === true
                                ? "bg-[#FF69B4] border-[#FF69B4] text-black"
                                : "border-[#444] text-gray-400 hover:border-[#FF69B4]"
                            }`}
                          >
                            Open Source
                          </button>
                          <button
                            onClick={() =>
                              setOpenSourceFilter(openSourceFilter === false ? null : false)
                            }
                            className={`px-2 lg:px-3 py-1 lg:py-1.5 border font-mono text-xs transition-colors ${
                              openSourceFilter === false
                                ? "bg-[#808080] border-[#808080] text-black"
                                : "border-[#444] text-gray-400 hover:border-[#808080]"
                            }`}
                          >
                            Closed Source
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="px-4 lg:px-8 py-6 lg:py-8">
          {activeView === "discover" ? (
            <>
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.name}
                      project={project}
                      isSelected={selectedProjects.has(project.name)}
                      onToggleSelect={() => toggleProjectSelection(project.name)}
                      onClick={() => setModalProject(project)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 lg:py-20">
                  <div className="text-5xl lg:text-6xl mb-4">🔍</div>
                  <h2 className="font-mono text-xl lg:text-2xl font-bold text-white mb-2 text-center">
                    No Projects Found
                  </h2>
                  <p className="text-gray-400 font-mono text-sm mb-6 text-center">
                    Try adjusting your search or filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-[#00FF00] text-black font-mono font-bold uppercase text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          ) : (
            <CompareView
              projects={selectedProjectsList}
              onRemove={(name) => toggleProjectSelection(name)}
              onClearAll={() => setSelectedProjects(new Set())}
            />
          )}
        </div>

        {/* Compare FAB - Shows when projects are selected in discover view */}
        {activeView === "discover" && selectedProjects.size > 0 && (
          <div className="fixed bottom-4 lg:bottom-8 right-4 lg:right-8 z-40">
            <button
              onClick={() => setActiveView("compare")}
              className="flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-3 lg:py-4 bg-[#00FF00] text-black font-mono font-bold uppercase text-xs lg:text-sm shadow-lg shadow-[#00FF00]/20 hover:shadow-[#00FF00]/40 transition-shadow"
            >
              <span className="hidden sm:inline">Compare</span> {selectedProjects.size} Projects
              <span className="w-5 lg:w-6 h-5 lg:h-6 bg-black text-[#00FF00] flex items-center justify-center text-xs">
                →
              </span>
            </button>
          </div>
        )}
      </main>

      {/* Project Modal */}
      {modalProject && (
        <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </div>
  );
}
