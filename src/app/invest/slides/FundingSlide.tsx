"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../../pitch/shared/SlideLayout";
import { FadeIn } from "../../pitch/shared/FadeIn";
import { AnimatedCounter } from "../../pitch/shared/AnimatedCounter";
import { StaggerContainer, staggerItem } from "../../pitch/shared/StaggerContainer";
import { Rocket, TrendingUp, Flag, DollarSign } from "lucide-react";

const rounds = [
  {
    round: "Pre-Seed",
    time: "Done",
    amount: "$65K",
    valuation: "—",
    milestone: "Pitch deck + prototype",
    status: "done",
  },
  {
    round: "Seed",
    time: "2026 Q2",
    amount: "$860K",
    valuation: "$4M pre",
    milestone: "MVP + 50 customers + $15K MRR",
    status: "current",
  },
  {
    round: "Series A",
    time: "2027 H2",
    amount: "$3-5M",
    valuation: "$20-30M",
    milestone: "200+ customers + $110K MRR",
    status: "future",
  },
  {
    round: "Series B",
    time: "2029",
    amount: "$10-20M",
    valuation: "$60-100M",
    milestone: "500+ customers + NZ expansion",
    status: "future",
  },
  {
    round: "IPO",
    time: "2031-32",
    amount: "ASX",
    valuation: "$500M-1B",
    milestone: "2,500+ customers + $16.5M ARR",
    status: "future",
  },
];

const seedUse = [
  { label: "Team (4 people)", pct: 56, amount: "$480K", color: "bg-primary-800" },
  { label: "AI + Infrastructure", pct: 11, amount: "$96K", color: "bg-primary-600" },
  { label: "Marketing", pct: 9, amount: "$80K", color: "bg-accent" },
  { label: "Operations", pct: 7, amount: "$60K", color: "bg-surface-400" },
  { label: "Reserve (20%)", pct: 17, amount: "$144K", color: "bg-primary-300" },
];

export function FundingSlide() {
  return (
    <SlideLayout bg="bg-surface-100">
      <div className="w-full">
        <div className="grid grid-cols-12 gap-10">
          {/* Left: Ask + use of funds */}
          <div className="col-span-5">
            <FadeIn>
              <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
                The Ask
              </p>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-primary-900 leading-[1.1]">
                <AnimatedCounter value={860} prefix="$" suffix="K" />
              </h2>
              <p className="font-sans text-sm text-surface-500 mt-1">
                Seed round &middot; $4M pre-money &middot; ~18% dilution
              </p>
            </FadeIn>

            {/* Use of funds */}
            <FadeIn delay={0.4}>
              <div className="mt-8">
                <p className="font-sans text-xs uppercase tracking-[0.08em] text-surface-500 mb-4">
                  Use of Funds (18-month runway)
                </p>
                {/* Stacked bar */}
                <div className="flex h-6 rounded-full overflow-hidden mb-4">
                  {seedUse.map((s) => (
                    <motion.div
                      key={s.label}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className={`${s.color} first:rounded-l-full last:rounded-r-full`}
                    />
                  ))}
                </div>
                <div className="space-y-2">
                  {seedUse.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${s.color} shrink-0`}
                      />
                      <span className="font-sans text-[12px] text-primary-900 flex-1">
                        {s.label}
                      </span>
                      <span className="font-sans text-[11px] text-surface-500">
                        {s.pct}%
                      </span>
                      <span className="font-sans text-[11px] font-medium text-primary-900 w-[52px] text-right">
                        {s.amount}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Investor return */}
            <FadeIn delay={1}>
              <div className="mt-6 px-4 py-3 bg-accent-light rounded-xl border border-accent/20">
                <p className="font-sans text-[12px] text-primary-900">
                  <span className="font-semibold text-accent">
                    Investor return:
                  </span>{" "}
                  $860K → $20-30M valuation at Series A = 5-7x in 18 months
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right: Funding timeline */}
          <div className="col-span-7">
            <FadeIn delay={0.3}>
              <p className="font-sans text-xs uppercase tracking-[0.08em] text-surface-500 mb-4">
                Funding Roadmap to IPO
              </p>
            </FadeIn>

            <StaggerContainer className="space-y-0" delay={0.4}>
              {rounds.map((r, i) => (
                <motion.div
                  key={r.round}
                  variants={staggerItem}
                  className="flex items-stretch gap-4"
                >
                  {/* Timeline line */}
                  <div className="flex flex-col items-center w-6 shrink-0">
                    <div
                      className={`w-4 h-4 rounded-full shrink-0 ${
                        r.status === "done"
                          ? "bg-success"
                          : r.status === "current"
                          ? "bg-accent ring-4 ring-accent/20"
                          : "bg-surface-300"
                      }`}
                    />
                    {i < rounds.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 ${
                          r.status === "done" ? "bg-success/40" : "bg-surface-300"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 pb-5 ${
                      r.status === "current"
                        ? "bg-white rounded-xl p-4 mb-2 border-2 border-accent/30"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-sans text-sm font-medium ${
                          r.status === "current"
                            ? "text-accent"
                            : "text-primary-900"
                        }`}
                      >
                        {r.round}
                      </span>
                      <span className="font-sans text-[10px] text-surface-500 bg-surface-200 px-2 py-0.5 rounded-full">
                        {r.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5">
                      <span
                        className={`font-serif text-lg ${
                          r.status === "current"
                            ? "text-primary-900"
                            : "text-primary-800"
                        }`}
                      >
                        {r.amount}
                      </span>
                      {r.valuation !== "—" && (
                        <span className="font-sans text-[11px] text-surface-500">
                          @ {r.valuation}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-[11px] text-surface-500 mt-1">
                      {r.milestone}
                    </p>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>

            {/* Exit paths */}
            <FadeIn delay={1.2}>
              <div className="mt-2 flex gap-3">
                {[
                  { path: "Strategic M&A", buyer: "CoreLogic, Domain, REA" },
                  { path: "ASX IPO", buyer: "$500M-$1B target" },
                ].map((e) => (
                  <div
                    key={e.path}
                    className="px-3 py-2 rounded-lg bg-white border border-surface-300 flex-1"
                  >
                    <p className="font-sans text-[10px] uppercase tracking-wider text-surface-500">
                      Exit Path
                    </p>
                    <p className="font-sans text-[12px] font-medium text-primary-900">
                      {e.path}
                    </p>
                    <p className="font-sans text-[10px] text-surface-400">
                      {e.buyer}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
