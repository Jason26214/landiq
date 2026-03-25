"use client";

import { motion } from "framer-motion";
import { FileText, Brain, ShieldAlert, BarChart3 } from "lucide-react";
import { SlideLayout } from "../shared/SlideLayout";
import { FadeIn } from "../shared/FadeIn";

const sections = [
  "Site Overview",
  "Planning Analysis",
  "Development Potential",
  "Risk Assessment",
  "Recommendations",
];

const capabilities = [
  { icon: FileText, text: "DCP PDF parsing via LLM → structured rules" },
  { icon: ShieldAlert, text: "Auto-detect flood, bushfire, heritage, contamination" },
  { icon: BarChart3, text: "GFA, dwelling yield & density calculation" },
  { icon: Brain, text: "Comparable sales analysis & market positioning" },
];

export function AIReportSlide() {
  return (
    <SlideLayout bg="bg-surface-100">
      <div className="grid grid-cols-12 gap-16 w-full items-center">
        {/* Left: Report mockup */}
        <div className="col-span-5">
          <FadeIn>
            <div className="bg-white rounded-xl border border-surface-300 shadow-lg overflow-hidden">
              <div className="bg-primary-800 px-6 py-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-white" strokeWidth={1.5} />
                <span className="font-sans text-sm text-white font-medium">
                  Feasibility Report
                </span>
              </div>
              <div className="p-6 space-y-0">
                {sections.map((section, i) => (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.2 }}
                    className="flex items-center gap-3 py-3 border-b border-surface-300 last:border-0"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.2, type: "spring" }}
                      className="w-5 h-5 rounded-full bg-success flex items-center justify-center"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path
                          d="M2.5 6 L5 8.5 L9.5 3.5"
                          fill="none"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                    <span className="font-sans text-[15px] text-primary-900">
                      {section}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="px-6 pb-5 flex gap-3">
                <span className="px-4 py-2 rounded-full bg-primary-800 text-white font-sans text-xs">
                  Export PDF
                </span>
                <span className="px-4 py-2 rounded-full border border-primary-800 text-primary-800 font-sans text-xs">
                  Export Word
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right: capabilities */}
        <div className="col-span-7">
          <FadeIn delay={0.3}>
            <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
              AI Report Engine
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] text-primary-900 leading-[1.2]">
              From address to institutional-grade report in minutes
            </h2>
          </FadeIn>

          <div className="mt-10 space-y-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                  <cap.icon className="w-5 h-5 text-primary-700" strokeWidth={1.5} />
                </div>
                <p className="font-body text-[16px] text-surface-500 leading-relaxed">
                  {cap.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
