"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../../pitch/shared/SlideLayout";
import { FadeIn } from "../../pitch/shared/FadeIn";
import { StaggerContainer, staggerItem } from "../../pitch/shared/StaggerContainer";
import {
  User,
  Code,
  Megaphone,
  Cpu,
  Bot,
  Paintbrush,
  Server,
  TestTube,
  Zap,
} from "lucide-react";

const team = [
  {
    role: "CEO / Co-founder",
    focus: "Strategy, fundraising, sales, product",
    icon: User,
  },
  {
    role: "CTO / Co-founder",
    focus: "Architecture, full-stack, AI/LLM, GIS",
    icon: Code,
  },
  {
    role: "Full-stack Engineer",
    focus: "Frontend, API integration, DevOps",
    icon: Cpu,
  },
  {
    role: "Growth / Product",
    focus: "Design, content, onboarding, analytics",
    icon: Megaphone,
  },
];

const aiTools = [
  { name: "Claude Code", replaces: "2-3 engineers", icon: Bot },
  { name: "v0 / Figma AI", replaces: "1 designer", icon: Paintbrush },
  { name: "Vercel / Railway", replaces: "1 DevOps", icon: Server },
  { name: "AI Testing", replaces: "1 QA", icon: TestTube },
];

const scaling = [
  { trigger: "$20K MRR", add: "+1 Engineer", total: "5" },
  { trigger: "$50K MRR", add: "+1 Sales, +1 CS", total: "7" },
  { trigger: "Series A", add: "+3 Eng/Data", total: "10" },
  { trigger: "$200K MRR", add: "Scale as needed", total: "15-20" },
];

export function LeanTeamSlide() {
  return (
    <SlideLayout bg="bg-sand-200">
      <div className="w-full">
        <FadeIn>
          <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
            Team
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] text-primary-900 leading-[1.2]">
            4 humans + AI ={" "}
            <span className="text-accent">10-person output</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-12 gap-8 mt-8">
          {/* Left: Core team */}
          <div className="col-span-5">
            <StaggerContainer className="space-y-3" delay={0.4}>
              {team.map((t) => (
                <motion.div
                  key={t.role}
                  variants={staggerItem}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-surface-300"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center shrink-0">
                    <t.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-primary-900">
                      {t.role}
                    </p>
                    <p className="font-sans text-[11px] text-surface-500">
                      {t.focus}
                    </p>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>

            <FadeIn delay={0.9}>
              <p className="font-sans text-[11px] text-surface-500 mt-4 px-1">
                Total salary: $480K/yr &middot; Burn rate: $50K/mo &middot; 18-month
                runway on $860K
              </p>
            </FadeIn>
          </div>

          {/* Right: AI multiplier + scaling */}
          <div className="col-span-7 space-y-6">
            {/* AI tools */}
            <FadeIn delay={0.5}>
              <div className="rounded-xl bg-primary-800 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-accent" />
                  <p className="font-sans text-xs uppercase tracking-[0.08em] text-primary-200">
                    AI Force Multiplier
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {aiTools.map((a, i) => (
                    <motion.div
                      key={a.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-primary-700/50"
                    >
                      <a.icon
                        className="w-4 h-4 text-accent shrink-0"
                        strokeWidth={1.5}
                      />
                      <div>
                        <p className="font-sans text-[12px] text-white font-medium">
                          {a.name}
                        </p>
                        <p className="font-sans text-[10px] text-primary-300">
                          Replaces {a.replaces}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Scaling roadmap */}
            <FadeIn delay={0.9}>
              <div className="rounded-xl border border-surface-300 bg-white p-5">
                <p className="font-sans text-xs uppercase tracking-[0.08em] text-surface-500 mb-3">
                  Milestone-based Scaling (not time-based)
                </p>
                <div className="space-y-2">
                  {scaling.map((s, i) => (
                    <motion.div
                      key={s.trigger}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + i * 0.08 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="font-sans text-[11px] font-medium text-accent bg-accent-light px-2 py-0.5 rounded-full w-[90px] text-center shrink-0">
                        {s.trigger}
                      </span>
                      <span className="font-sans text-[12px] text-primary-900 flex-1">
                        {s.add}
                      </span>
                      <span className="font-sans text-[11px] text-surface-500">
                        → {s.total} people
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
