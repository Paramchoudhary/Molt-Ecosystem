"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, Trash2, CheckCircle, Clock, ExternalLink, Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";

interface AgentSubmission {
  id: string;
  name: string;
  url: string;
  github: string;
  description: string;
  category: string;
  status: string;
  open_source: boolean;
  engagement_level: string;
  key_indicators: string;
  features: string[];
  launch_approx: string;
  submitter_twitter: string;
  submitter_email: string;
  submitted_at: string;
  reviewed: boolean;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<AgentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/submit-agent");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setSubmissions(data.submissions);
    } catch (err) {
      setError("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const generateDataEntry = (sub: AgentSubmission) => {
    const entry = `{
  name: "${sub.name}",
  url: "${sub.url || "N/A"}",
  description: "${sub.description.replace(/"/g, '\\"')}",
  category: "${sub.category}",
  status: "${sub.status}",
  open_source: ${sub.open_source},
  github_url: ${sub.github ? `"${sub.github}"` : "null"},
  popularity_metrics: {
    engagement_level: "${sub.engagement_level}",
    key_indicators: "${sub.key_indicators.replace(/"/g, '\\"')}"
  },
  features: [${sub.features.map(f => `"${f.replace(/"/g, '\\"')}"`).join(", ")}],
  launch_date_approx: "${sub.launch_approx || "TBD"}",
  color: "#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()}"
},`;
    return entry;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-mono text-2xl lg:text-3xl font-bold text-white">
              Admin: Agent Submissions
            </h1>
            <p className="text-gray-400 font-mono text-sm mt-1">
              Review and manage submitted agents
            </p>
          </div>
          <button
            onClick={fetchSubmissions}
            className="flex items-center gap-2 px-4 py-2 border border-[#333] text-gray-400 font-mono text-sm hover:border-[#00FF00] hover:text-[#00FF00] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-8 h-8 text-[#00FF00] animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 font-mono">{error}</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-20 border border-[#333] bg-[#0d0d0d]">
          <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h2 className="font-mono text-xl font-bold text-white mb-2">No Submissions Yet</h2>
          <p className="text-gray-400 font-mono text-sm">
            Submissions will appear here when users submit their agents.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-gray-400 font-mono text-sm">
            {submissions.length} submission{submissions.length !== 1 ? "s" : ""}
          </div>
          
          {submissions.map((submission) => (
            <div key={submission.id} className="border border-[#333] bg-[#0d0d0d] p-6">
              {/* Submission Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-mono text-xl font-bold text-white mb-1">
                    {submission.name}
                  </h2>
                  <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                    <span className="px-2 py-1 bg-[#1a1a1a] border border-[#333]">
                      {submission.category}
                    </span>
                    <span className={`px-2 py-1 ${
                      submission.status === "Live" ? "bg-green-500/10 text-green-500 border border-green-500/50" :
                      submission.status === "Beta" ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/50" :
                      "bg-blue-500/10 text-blue-500 border border-blue-500/50"
                    }`}>
                      {submission.status}
                    </span>
                    {submission.open_source && (
                      <span className="px-2 py-1 bg-pink-500/10 text-pink-500 border border-pink-500/50">
                        Open Source
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {submission.reviewed ? (
                    <span className="flex items-center gap-1 text-[#00FF00] font-mono text-xs">
                      <CheckCircle className="w-4 h-4" />
                      Reviewed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-500 font-mono text-xs">
                      <Clock className="w-4 h-4" />
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 font-mono text-sm mb-4">{submission.description}</p>

              {/* Links */}
              <div className="flex flex-wrap gap-3 mb-4">
                {submission.url && (
                  <a
                    href={submission.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#00CED1] font-mono text-sm hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Website
                  </a>
                )}
                {submission.github && (
                  <a
                    href={submission.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 font-mono text-sm hover:underline"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>

              {/* Features */}
              {submission.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-gray-500 font-mono text-xs uppercase mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {submission.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-[#1a1a1a] border border-[#333] text-gray-300 font-mono text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Indicators */}
              {submission.key_indicators && (
                <div className="mb-4">
                  <h4 className="text-gray-500 font-mono text-xs uppercase mb-2">Key Indicators</h4>
                  <p className="text-gray-400 font-mono text-sm">{submission.key_indicators}</p>
                </div>
              )}

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-[#333]">
                {submission.submitter_twitter && (
                  <a
                    href={`https://x.com/${submission.submitter_twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#1DA1F2] font-mono text-sm hover:underline"
                  >
                    <Twitter className="w-4 h-4" />
                    {submission.submitter_twitter}
                  </a>
                )}
                {submission.submitter_email && (
                  <a
                    href={`mailto:${submission.submitter_email}`}
                    className="flex items-center gap-2 text-gray-400 font-mono text-sm hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    {submission.submitter_email}
                  </a>
                )}
                <span className="text-gray-500 font-mono text-xs ml-auto">
                  Submitted: {formatDate(submission.submitted_at)}
                </span>
              </div>

              {/* Copy Data Entry Button */}
              <div className="mt-4 pt-4 border-t border-[#333]">
                <button
                  onClick={() => copyToClipboard(generateDataEntry(submission))}
                  className="px-4 py-2 bg-[#00FF00] text-black font-mono font-bold text-sm uppercase hover:bg-[#00DD00] transition-colors"
                >
                  Copy as Data Entry
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
