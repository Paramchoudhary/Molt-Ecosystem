"use client";

import { LayoutGrid, GitCompare, Search, Plus, Send, Menu, X } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  activeView: "discover" | "compare";
  onViewChange: (view: "discover" | "compare") => void;
  compareCount: number;
}

export default function Sidebar({ activeView, onViewChange, compareCount }: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] border-b border-[#222] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00FF00] flex items-center justify-center font-bold text-black text-xs rounded">
              molt
            </div>
            <span className="font-mono font-bold text-sm tracking-tight">molt Ecosystem</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:bg-[#1a1a1a]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar - Desktop always visible, Mobile slides in */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-[#0d0d0d] border-r border-[#222] flex flex-col z-50
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-[#222]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#00FF00] flex items-center justify-center font-bold text-black text-sm rounded">
              molt
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-xl tracking-tight leading-tight">molt</span>
              <span className="font-mono text-xs text-gray-400 tracking-wider uppercase">Ecosystem</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => {
              onViewChange("discover");
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-none font-mono text-sm uppercase tracking-wider transition-all ${
              activeView === "discover"
                ? "bg-[#1a1a1a] text-white border-l-4 border-[#00FF00]"
                : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            Discover
          </button>

          <button
            onClick={() => {
              onViewChange("compare");
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-none font-mono text-sm uppercase tracking-wider transition-all relative ${
              activeView === "compare"
                ? "bg-[#1a1a1a] text-white border-l-4 border-[#00FF00]"
                : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
            }`}
          >
            <GitCompare className="w-5 h-5" />
            Compare
            {compareCount > 0 && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#00FF00] text-black text-xs font-bold px-2 py-0.5">
                {compareCount}
              </span>
            )}
          </button>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-none font-mono text-sm uppercase tracking-wider text-[#00FF00] hover:bg-[#1a1a1a] transition-all"
          >
            <Search className="w-5 h-5" />
            Find Project
          </button>

          {/* List your Agent Button */}
          <a
            href="https://x.com/messages/compose?recipient_id=Param_eth"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-none font-mono text-sm uppercase tracking-wider bg-[#FF69B4] text-black font-bold hover:bg-[#FF85C1] transition-all mt-4"
          >
            <Plus className="w-5 h-5" />
            List your Agent
          </a>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#222]">
          <a
            href="https://x.com/Param_eth"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-500 font-mono uppercase tracking-wider hover:text-[#1DA1F2] transition-colors"
          >
            <Send className="w-3 h-3" />
            @Param_eth
          </a>
          <div className="text-xs text-gray-600 font-mono mt-2">
            molt Ecosystem © 2026
          </div>
        </div>
      </aside>
    </>
  );
}
