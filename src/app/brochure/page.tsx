"use client";

import { useState } from "react";
import { CoverPage } from "./pages/CoverPage";
import { VisionPage } from "./pages/VisionPage";
import { ProblemPage } from "./pages/ProblemPage";
import { SolutionPage } from "./pages/SolutionPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { DataPage } from "./pages/DataPage";
import { ROIPage } from "./pages/ROIPage";
import { BackCoverPage } from "./pages/BackCoverPage";

const pages = [
  { component: CoverPage, label: "Cover" },
  { component: VisionPage, label: "Vision" },
  { component: ProblemPage, label: "Problem" },
  { component: SolutionPage, label: "Solution" },
  { component: FeaturesPage, label: "Features" },
  { component: DataPage, label: "Data Engine" },
  { component: ROIPage, label: "ROI" },
  { component: BackCoverPage, label: "Back Cover" },
];

export default function BrochurePage() {
  const [currentPage, setCurrentPage] = useState(0);
  const CurrentPageComponent = pages[currentPage].component;

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center py-10 gap-6">
      {/* Page navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="px-4 py-2 rounded-lg bg-white/10 text-white/60 text-sm font-sans disabled:opacity-30 hover:bg-white/20 transition-colors"
        >
          ← Prev
        </button>
        <div className="flex gap-1.5">
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all ${
                i === currentPage
                  ? "bg-white text-[#134A32] font-medium"
                  : "bg-white/10 text-white/50 hover:bg-white/20"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
          disabled={currentPage === pages.length - 1}
          className="px-4 py-2 rounded-lg bg-white/10 text-white/60 text-sm font-sans disabled:opacity-30 hover:bg-white/20 transition-colors"
        >
          Next →
        </button>
      </div>

      {/* A4 page preview */}
      <div
        id="a4-page"
        className="bg-white shadow-2xl relative overflow-hidden"
        style={{
          width: 595,   // A4 at 72dpi (screen preview)
          height: 842,  // A4 at 72dpi
        }}
      >
        <CurrentPageComponent />
      </div>

      <p className="text-white/30 text-xs font-sans">
        Page {currentPage + 1} of {pages.length} · A4 Portrait (210×297mm)
      </p>
    </div>
  );
}
