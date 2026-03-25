"use client";

import { motion } from "framer-motion";
import { Layers, FileText, Inbox, Lock } from "lucide-react";
import { SlideLayout } from "../shared/SlideLayout";
import { FadeIn } from "../shared/FadeIn";
import { StaggerContainer, staggerItem } from "../shared/StaggerContainer";

const problems = [
  {
    icon: Layers,
    title: "Fragmented Data",
    desc: "Information scattered across council portals, GIS systems, PDFs, and Excel spreadsheets",
  },
  {
    icon: FileText,
    title: "Manual Reports",
    desc: "Feasibility reports written by hand in Word + Excel — slow, expensive, error-prone",
  },
  {
    icon: Inbox,
    title: "No Unified System",
    desc: "Land opportunities managed through email chains and shared folders",
  },
  {
    icon: Lock,
    title: "DCP Black Box",
    desc: "Council-specific design rules buried in hundreds of pages of unstructured PDFs",
  },
];

export function ProblemSlide() {
  return (
    <div className="absolute inset-0 flex overflow-hidden bg-surface-300">
      {/* Content area */}
      <div className="flex-1 flex items-center px-16">
        <div className="max-w-[700px]">
          <FadeIn>
            <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
              The Problem
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-primary-900 leading-[1.15]">
              Australian developers are still doing feasibility by hand
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 gap-6 mt-12" delay={0.4}>
            {problems.map((p) => (
              <motion.div
                key={p.title}
                variants={staggerItem}
                className="border-t-2 border-primary-800 pt-6"
              >
                <p.icon className="w-6 h-6 text-primary-600 mb-4" strokeWidth={1.5} />
                <h3 className="font-sans text-lg font-medium text-primary-900 mb-2">
                  {p.title}
                </h3>
                <p className="font-body text-[15px] text-surface-500 leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* Right image panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-[380px] relative hidden lg:block"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/landiq/images/team/team-tablet-review.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-300 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}
