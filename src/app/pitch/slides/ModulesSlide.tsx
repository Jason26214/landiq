"use client";

import { motion } from "framer-motion";
import { MapPin, Cpu, Kanban, DollarSign, Settings } from "lucide-react";
import { SlideLayout } from "../shared/SlideLayout";
import { FadeIn } from "../shared/FadeIn";
import { StaggerContainer, staggerItem } from "../shared/StaggerContainer";

const modules = [
  {
    icon: MapPin,
    title: "Land Acquisition",
    desc: "Pipeline: Lead → Research → Feasibility → Negotiation → Acquired",
    phase: 1,
  },
  {
    icon: Cpu,
    title: "Feasibility Engine",
    desc: "AI-powered zoning, yield, risk analysis + auto-generated reports",
    phase: 1,
  },
  {
    icon: Kanban,
    title: "Project Management",
    desc: "Timeline, stages, contractors, consultants, approvals, documents",
    phase: 1,
  },
  {
    icon: DollarSign,
    title: "Property Sales",
    desc: "Unit inventory, pricing, buyer tracking, sales pipeline, contracts",
    phase: 2,
  },
  {
    icon: Settings,
    title: "Admin & Operations",
    desc: "Employee management, task workflows, document & financial tracking",
    phase: 2,
  },
];

export function ModulesSlide() {
  return (
    <SlideLayout bg="bg-white">
      <div className="w-full">
        <FadeIn>
          <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
            Platform
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-primary-900 leading-[1.2]">
            A complete operating system for property development
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-3 gap-5 mt-12"
          delay={0.4}
        >
          {modules.map((m) => (
            <motion.div
              key={m.title}
              variants={staggerItem}
              className={`p-6 rounded-xl border transition-shadow hover:shadow-md ${
                m.phase === 1
                  ? "border-primary-200 bg-white"
                  : "border-surface-300 bg-surface-100"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                  <m.icon className="w-5 h-5 text-primary-700" strokeWidth={1.5} />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium font-sans ${
                    m.phase === 1
                      ? "bg-success/10 text-success"
                      : "bg-accent-light text-accent"
                  }`}
                >
                  Phase {m.phase}
                </span>
              </div>
              <h3 className="font-sans text-lg font-medium text-primary-900 mb-2">
                {m.title}
              </h3>
              <p className="font-body text-sm text-surface-500 leading-relaxed">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </SlideLayout>
  );
}
