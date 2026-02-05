"use client";

import { ArrowLeft, ExternalLink, FileSpreadsheet } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-mono text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
        <div>
          <h1 className="font-mono text-2xl lg:text-3xl font-bold text-white">
            Admin: Agent Submissions
          </h1>
          <p className="text-gray-400 font-mono text-sm mt-1">
            View and manage submitted agents
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl">
        <div className="border border-[#333] bg-[#0d0d0d] p-8 text-center">
          <FileSpreadsheet className="w-16 h-16 text-[#00FF00] mx-auto mb-6" />
          
          <h2 className="font-mono text-2xl font-bold text-white mb-4">
            Submissions in Google Sheets
          </h2>
          
          <p className="text-gray-400 font-mono text-sm mb-6 leading-relaxed">
            All agent submissions are automatically saved to your Google Sheet. 
            Open the spreadsheet to review, approve, and manage submissions.
          </p>

          <div className="space-y-4">
            <a
              href="https://sheets.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00FF00] text-black font-mono font-bold uppercase text-sm hover:bg-[#00DD00] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open Google Sheets
            </a>
            
            <p className="text-gray-500 font-mono text-xs">
              Look for &quot;Molt Ecosystem Submissions&quot; spreadsheet
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 border border-[#333] bg-[#0d0d0d] p-6">
          <h3 className="font-mono text-lg font-bold text-white mb-4">
            How to Add Approved Agents
          </h3>
          
          <ol className="space-y-3 text-gray-400 font-mono text-sm">
            <li className="flex gap-3">
              <span className="text-[#00FF00] font-bold">1.</span>
              <span>Open your Google Sheet and review submissions</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#00FF00] font-bold">2.</span>
              <span>For approved agents, copy the data to <code className="text-[#00CED1]">src/lib/data.ts</code></span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#00FF00] font-bold">3.</span>
              <span>Add a unique color and format as a MoltbookProject object</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#00FF00] font-bold">4.</span>
              <span>Commit and deploy the updated code</span>
            </li>
          </ol>
        </div>

        {/* Data Entry Template */}
        <div className="mt-8 border border-[#333] bg-[#0d0d0d] p-6">
          <h3 className="font-mono text-lg font-bold text-white mb-4">
            Data Entry Template
          </h3>
          
          <pre className="bg-[#1a1a1a] p-4 overflow-x-auto text-xs text-gray-300 font-mono">
{`{
  name: "Project Name",
  url: "https://example.com",
  description: "Project description here",
  category: "Category",
  status: "Live",
  open_source: false,
  github_url: null,
  popularity_metrics: {
    engagement_level: "Emerging",
    key_indicators: "Key metrics here"
  },
  features: ["Feature 1", "Feature 2"],
  launch_date_approx: "February 2026",
  color: "#FF6B6B"
},`}
          </pre>
        </div>
      </div>
    </div>
  );
}
