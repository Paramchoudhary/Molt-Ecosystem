"use client";

import { useState } from "react";
import { X, Send, Plus, Trash2, CheckCircle, Loader2 } from "lucide-react";

interface ListAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "Token Launchpad",
  "Aggregator",
  "Social/Forum",
  "Social Media",
  "Gaming",
  "Visualization",
  "Developer Tools",
  "Messaging",
  "Virtual World",
  "Forum / Knowledge Base",
  "Marketplace",
  "Other",
];

const STATUSES = ["Live", "Beta", "In Development"];
const ENGAGEMENT_LEVELS = ["High", "Medium", "Low", "Emerging"];

export default function ListAgentModal({ isOpen, onClose }: ListAgentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    github: "",
    description: "",
    category: "",
    status: "Live",
    open_source: false,
    engagement_level: "Emerging",
    key_indicators: "",
    features: [""],
    launch_approx: "",
    submitter_twitter: "",
    submitter_email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, features: newFeatures }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submit-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          features: formData.features.filter((f) => f.trim() !== ""),
          submitted_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to submit. Please try again or DM @Param_eth on X.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      url: "",
      github: "",
      description: "",
      category: "",
      status: "Live",
      open_source: false,
      engagement_level: "Emerging",
      key_indicators: "",
      features: [""],
      launch_approx: "",
      submitter_twitter: "",
      submitter_email: "",
    });
    setIsSubmitted(false);
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#0d0d0d] border border-[#333] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0d0d0d] border-b border-[#333] p-4 sm:p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="font-mono text-xl sm:text-2xl font-bold text-white">
              {isSubmitted ? "Submission Received!" : "List Your Agent"}
            </h2>
            <p className="text-gray-400 font-mono text-xs sm:text-sm mt-1">
              {isSubmitted
                ? "We'll review and add your project soon."
                : "Submit your project to the molt Ecosystem"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#444] text-gray-400 hover:border-white hover:text-white transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
              <h3 className="font-mono text-xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-400 font-mono text-sm mb-6">
                Your project has been submitted for review. We&apos;ll add it to the directory soon.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    resetForm();
                  }}
                  className="px-6 py-3 border border-[#444] text-white font-mono font-bold uppercase text-sm hover:border-[#00FF00] hover:text-[#00FF00] transition-colors"
                >
                  Submit Another
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#00FF00] text-black font-mono font-bold uppercase text-sm hover:bg-[#00DD00] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Name */}
              <div>
                <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., MoltX"
                  className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none"
                />
              </div>

              {/* URL and GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Brief description of your project..."
                  className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none resize-none"
                />
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 font-mono text-sm text-white focus:border-[#00FF00] focus:outline-none"
                  >
                    <option value="">Select category...</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 font-mono text-sm text-white focus:border-[#00FF00] focus:outline-none"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Engagement and Launch Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                    Engagement Level
                  </label>
                  <select
                    name="engagement_level"
                    value={formData.engagement_level}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 font-mono text-sm text-white focus:border-[#00FF00] focus:outline-none"
                  >
                    {ENGAGEMENT_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                    Launch Date
                  </label>
                  <input
                    type="text"
                    name="launch_approx"
                    value={formData.launch_approx}
                    onChange={handleChange}
                    placeholder="e.g., February 2026"
                    className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none"
                  />
                </div>
              </div>

              {/* Open Source Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="open_source"
                  id="open_source"
                  checked={formData.open_source}
                  onChange={handleChange}
                  className="w-5 h-5 bg-[#1a1a1a] border-2 border-[#333] checked:bg-[#00FF00] checked:border-[#00FF00] focus:outline-none cursor-pointer"
                />
                <label
                  htmlFor="open_source"
                  className="text-gray-300 font-mono text-sm cursor-pointer"
                >
                  This project is open source
                </label>
              </div>

              {/* Key Indicators */}
              <div>
                <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                  Key Indicators / Traction
                </label>
                <textarea
                  name="key_indicators"
                  value={formData.key_indicators}
                  onChange={handleChange}
                  rows={2}
                  placeholder="e.g., 1000+ users, featured on HN, 50 agents registered..."
                  className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none resize-none"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                  Features
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                        className="flex-1 bg-[#1a1a1a] border border-[#333] px-4 py-2 font-mono text-sm text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="px-3 border border-[#333] text-gray-400 hover:border-red-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-2 text-[#00FF00] font-mono text-sm hover:underline"
                  >
                    <Plus className="w-4 h-4" /> Add Feature
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t border-[#333] pt-6">
                <h3 className="text-gray-300 font-mono text-sm font-bold mb-4">
                  Your Contact Info (Optional)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                      X/Twitter Handle
                    </label>
                    <input
                      type="text"
                      name="submitter_twitter"
                      value={formData.submitter_twitter}
                      onChange={handleChange}
                      placeholder="@username"
                      className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-mono text-xs uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="submitter_email"
                      value={formData.submitter_email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500 text-red-500 font-mono text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-[#444] text-gray-400 font-mono font-bold uppercase text-sm hover:border-white hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#00FF00] text-black font-mono font-bold uppercase text-sm hover:bg-[#00DD00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
