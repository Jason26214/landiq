"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../../pitch/shared/SlideLayout";
import { FadeIn } from "../../pitch/shared/FadeIn";
import { AnimatedCounter } from "../../pitch/shared/AnimatedCounter";
import { TrendingUp } from "lucide-react";

const years = [
  {
    year: "Year 1",
    customers: "50",
    mrr: "$28K",
    arr: "$330K",
    team: "4",
    burn: "$50K/mo",
    profit: "-$270K",
    profitColor: "text-danger",
  },
  {
    year: "Year 2",
    customers: "200",
    mrr: "$110K",
    arr: "$1.32M",
    team: "7",
    burn: "$100K/mo",
    profit: "+$120K",
    profitColor: "text-success",
  },
  {
    year: "Year 3",
    customers: "500",
    mrr: "$275K",
    arr: "$3.3M",
    team: "12",
    burn: "$210K/mo",
    profit: "+$780K",
    profitColor: "text-success",
  },
  {
    year: "Year 4",
    customers: "1,200",
    mrr: "$660K",
    arr: "$7.9M",
    team: "20",
    burn: "—",
    profit: "+$2.9M",
    profitColor: "text-success",
  },
  {
    year: "Year 5",
    customers: "2,500",
    mrr: "$1.38M",
    arr: "$16.5M",
    team: "30",
    burn: "—",
    profit: "+$8.5M",
    profitColor: "text-success",
  },
];

const headers = [
  "Year",
  "Customers",
  "MRR",
  "ARR",
  "Team",
  "Burn Rate",
  "Net Profit",
];

export function FinancialSlide() {
  return (
    <SlideLayout bg="bg-white">
      <div className="w-full">
        <div className="grid grid-cols-12 gap-10 items-start">
          {/* Left header */}
          <div className="col-span-4">
            <FadeIn>
              <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
                Financial Projections
              </p>
              <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-primary-900 leading-[1.2]">
                Profitable by{" "}
                <span className="text-success">Year 2</span>
              </h2>
              <p className="font-body text-[15px] text-surface-500 mt-4 leading-relaxed">
                Lean 4-person team + AI tools delivers 5x the capital efficiency
                of competitors. Archistar needs 61 people for $6.7M revenue — we
                target the same with 12.
              </p>
            </FadeIn>

            {/* Key highlights */}
            <FadeIn delay={0.6}>
              <div className="mt-8 space-y-4">
                <div className="border-l-2 border-accent pl-4">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-surface-500">
                    Year 5 ARR
                  </p>
                  <p className="font-serif text-3xl text-primary-900">
                    <AnimatedCounter value={16.5} prefix="$" suffix="M" />
                  </p>
                </div>
                <div className="border-l-2 border-success pl-4">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-surface-500">
                    Year 5 Net Profit
                  </p>
                  <p className="font-serif text-3xl text-success">
                    <AnimatedCounter value={8.5} prefix="+$" suffix="M" />
                  </p>
                </div>
                <div className="border-l-2 border-primary-800 pl-4">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-surface-500">
                    Seed Burn Rate
                  </p>
                  <p className="font-serif text-2xl text-primary-900">
                    $50K<span className="text-lg text-surface-500">/mo</span>
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: table */}
          <div className="col-span-8">
            <FadeIn delay={0.3}>
              <div className="rounded-xl border border-surface-300 bg-white overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-7 px-5 py-3 bg-surface-200">
                  {headers.map((h) => (
                    <span
                      key={h}
                      className="font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-surface-500 text-center first:text-left"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Rows */}
                {years.map((y, i) => (
                  <motion.div
                    key={y.year}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`grid grid-cols-7 px-5 py-3.5 border-t border-surface-300 items-center ${
                      i >= 3 ? "bg-success/5" : ""
                    }`}
                  >
                    <span className="font-sans text-sm font-medium text-primary-900">
                      {y.year}
                    </span>
                    <span className="font-sans text-sm text-primary-900 text-center">
                      {y.customers}
                    </span>
                    <span className="font-sans text-sm text-primary-900 text-center">
                      {y.mrr}
                    </span>
                    <span className="font-sans text-sm font-medium text-primary-900 text-center">
                      {y.arr}
                    </span>
                    <span className="font-sans text-sm text-primary-900 text-center">
                      {y.team}
                    </span>
                    <span className="font-sans text-sm text-surface-500 text-center">
                      {y.burn}
                    </span>
                    <span
                      className={`font-sans text-sm font-medium text-center ${y.profitColor}`}
                    >
                      {y.profit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            {/* Efficiency callout */}
            <FadeIn delay={1}>
              <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-primary-50 rounded-xl border border-primary-200">
                <TrendingUp className="w-4 h-4 text-primary-600 shrink-0" />
                <p className="font-sans text-[12px] text-primary-800">
                  <span className="font-medium">Capital efficiency:</span>{" "}
                  $860K seed → $16.5M ARR in 5 years. Profitable Year 2.
                  Replaces $50-250K/project in consultant fees with $550/mo SaaS
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
