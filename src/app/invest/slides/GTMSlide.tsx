"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../../pitch/shared/SlideLayout";
import { FadeIn } from "../../pitch/shared/FadeIn";
import { StaggerContainer, staggerItem } from "../../pitch/shared/StaggerContainer";
import {
  Target,
  Megaphone,
  Users,
  ArrowRight,
  Globe,
} from "lucide-react";

const phases = [
  {
    icon: Target,
    phase: "Phase 1",
    name: "Hunter",
    period: "Month 1-6",
    strategy: "Founder-led direct sales to top 100 Sydney/Melbourne developers",
    goal: "20 paying customers",
    color: "bg-primary-800",
    textColor: "text-white",
    iconColor: "text-accent",
  },
  {
    icon: Megaphone,
    phase: "Phase 2",
    name: "Farmer",
    period: "Month 7-18",
    strategy: "Self-serve signup + content marketing + freemium conversion",
    goal: "250 paying customers",
    color: "bg-white",
    textColor: "text-primary-900",
    iconColor: "text-primary-600",
  },
  {
    icon: Globe,
    phase: "Phase 3",
    name: "Ecosystem",
    period: "Month 19+",
    strategy: "Partner channels, planning firm white-label, API marketplace, NZ/UK",
    goal: "1,000+ customers",
    color: "bg-surface-100",
    textColor: "text-primary-900",
    iconColor: "text-primary-600",
  },
];

const channels = [
  { channel: "Founder direct sales", cac: "$1,500", share: "40%", bar: "w-[40%]" },
  { channel: "Product-led growth (PLG)", cac: "$500", share: "25%", bar: "w-[25%]" },
  { channel: "Content / SEO", cac: "$800", share: "20%", bar: "w-[20%]" },
  { channel: "Industry events", cac: "$5,000", share: "10%", bar: "w-[10%]" },
  { channel: "Partner referrals", cac: "$2,000", share: "5%", bar: "w-[5%]" },
];

const funnel = [
  { stage: "Free signup", count: "1,000", rate: "" },
  { stage: "Active user", count: "400", rate: "40%" },
  { stage: "Starter ($149)", count: "120", rate: "12%" },
  { stage: "Professional ($349)", count: "36", rate: "30% upgrade" },
];

export function GTMSlide() {
  return (
    <SlideLayout bg="bg-white">
      <div className="w-full">
        <FadeIn>
          <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
            Go-to-Market
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-primary-900 leading-[1.2]">
            Three-phase market entry
          </h2>
        </FadeIn>

        {/* Three phases */}
        <StaggerContainer className="grid grid-cols-3 gap-4 mt-7" delay={0.3}>
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              variants={staggerItem}
              className={`rounded-xl p-5 ${p.color} ${
                i === 0 ? "border-0" : "border border-surface-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <p.icon className={`w-4 h-4 ${p.iconColor}`} strokeWidth={1.5} />
                <span
                  className={`font-sans text-[10px] uppercase tracking-[0.08em] ${
                    i === 0 ? "text-primary-300" : "text-surface-500"
                  }`}
                >
                  {p.phase} &middot; {p.period}
                </span>
              </div>
              <h3
                className={`font-serif text-xl ${p.textColor} mb-2`}
              >
                {p.name}
              </h3>
              <p
                className={`font-sans text-[12px] leading-relaxed ${
                  i === 0 ? "text-primary-200" : "text-surface-500"
                }`}
              >
                {p.strategy}
              </p>
              <div className="mt-4 pt-3 border-t border-white/10">
                <span
                  className={`font-sans text-xs font-medium ${
                    i === 0 ? "text-accent" : "text-primary-800"
                  }`}
                >
                  Target: {p.goal}
                </span>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <div className="grid grid-cols-12 gap-8 mt-6">
          {/* Acquisition channels */}
          <div className="col-span-7">
            <FadeIn delay={0.8}>
              <p className="font-sans text-xs uppercase tracking-[0.08em] text-surface-500 mb-3">
                Acquisition Channels (Year 1)
              </p>
              <div className="space-y-2">
                {channels.map((c, i) => (
                  <motion.div
                    key={c.channel}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <span className="font-sans text-[11px] text-primary-900 w-[140px] shrink-0">
                      {c.channel}
                    </span>
                    <div className="flex-1 h-5 bg-surface-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-primary-600 rounded-full ${c.bar}`}
                      />
                    </div>
                    <span className="font-sans text-[11px] text-surface-500 w-[32px] text-right">
                      {c.share}
                    </span>
                    <span className="font-sans text-[10px] text-surface-400 w-[50px] text-right">
                      CAC {c.cac}
                    </span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Conversion funnel */}
          <div className="col-span-5">
            <FadeIn delay={1}>
              <p className="font-sans text-xs uppercase tracking-[0.08em] text-surface-500 mb-3">
                Freemium Funnel
              </p>
              <div className="space-y-1">
                {funnel.map((f, i) => (
                  <motion.div
                    key={f.stage}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="h-8 bg-primary-800 rounded-lg flex items-center px-3"
                      style={{
                        width: `${Math.max(30, 100 - i * 22)}%`,
                        opacity: 1 - i * 0.15,
                      }}
                    >
                      <span className="font-sans text-[11px] text-white truncate">
                        {f.stage}
                      </span>
                    </div>
                    <span className="font-sans text-[12px] font-medium text-primary-900 shrink-0">
                      {f.count}
                    </span>
                    {f.rate && (
                      <span className="font-sans text-[10px] text-surface-400 shrink-0">
                        {f.rate}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
