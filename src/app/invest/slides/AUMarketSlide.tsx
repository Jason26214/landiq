"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../../pitch/shared/SlideLayout";
import { FadeIn } from "../../pitch/shared/FadeIn";
import { AnimatedCounter } from "../../pitch/shared/AnimatedCounter";
import { StaggerContainer, staggerItem } from "../../pitch/shared/StaggerContainer";
import {
  Building2,
  MapPin,
  FileText,
  Users,
  DollarSign,
  Home,
} from "lucide-react";

const topStats = [
  {
    icon: Home,
    value: 12.3,
    suffix: "T",
    prefix: "$",
    label: "Residential property value",
    sub: "ABS, Dec 2025",
  },
  {
    icon: DollarSign,
    value: 165,
    suffix: "B",
    prefix: "$",
    label: "Annual building approvals",
    sub: "ABS, annualised 2024-25",
  },
  {
    icon: FileText,
    value: 537,
    suffix: "",
    label: "Local councils, each with own DCP",
    sub: "ALGA 2025",
  },
  {
    icon: Building2,
    value: 12600,
    suffix: "+",
    label: "Active land developers",
    sub: "IBISWorld 2025",
  },
];

const stakeholders = [
  { label: "Developers", count: "12,600", icon: Building2 },
  { label: "Architects", count: "15,000", icon: Home },
  { label: "Planners", count: "12,000+", icon: MapPin },
  { label: "Consultancies", count: "13,700", icon: Users },
  { label: "Councils (DCP)", count: "537", icon: FileText },
  { label: "Agents", count: "est. 120K", icon: Users },
];

export function AUMarketSlide() {
  return (
    <SlideLayout bg="bg-white">
      <div className="w-full">
        <FadeIn>
          <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
            Australian Market
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] text-primary-900 leading-[1.2] max-w-3xl">
            A $12.3 trillion property market with{" "}
            <span className="text-accent">zero integrated intelligence</span>
          </h2>
        </FadeIn>

        {/* Top stats row */}
        <StaggerContainer
          className="grid grid-cols-4 gap-0 mt-10"
          delay={0.4}
        >
          {topStats.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              className="border-t-2 border-primary-800 pt-5 pb-4 px-3"
            >
              <s.icon
                className="w-4 h-4 text-primary-600 mb-3"
                strokeWidth={1.5}
              />
              <div className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-primary-900 leading-none">
                <AnimatedCounter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </div>
              <p className="font-sans text-[13px] text-surface-500 mt-2">
                {s.label}
              </p>
              <p className="font-sans text-[10px] text-surface-400 mt-0.5">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Bottom: stakeholder ecosystem */}
        <FadeIn delay={0.9}>
          <div className="mt-8 flex items-center gap-6">
            <p className="font-sans text-xs uppercase tracking-[0.08em] text-surface-500 shrink-0">
              Addressable Users
            </p>
            <div className="flex gap-2 flex-wrap">
              {stakeholders.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.08 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-300 bg-surface-100"
                >
                  <s.icon className="w-3 h-3 text-primary-600" strokeWidth={1.5} />
                  <span className="font-sans text-xs text-primary-900 font-medium">
                    {s.count}
                  </span>
                  <span className="font-sans text-[10px] text-surface-500">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Insight callout */}
        <FadeIn delay={1.3}>
          <div className="mt-6 px-5 py-3 bg-accent-light rounded-xl border border-accent/20 inline-block">
            <p className="font-sans text-sm text-primary-900">
              Each project costs{" "}
              <span className="font-semibold text-accent">$50K-$250K+</span>{" "}
              in consultant fees before construction begins — yet developers
              still use spreadsheets and PDFs for feasibility
            </p>
          </div>
        </FadeIn>
      </div>
    </SlideLayout>
  );
}
