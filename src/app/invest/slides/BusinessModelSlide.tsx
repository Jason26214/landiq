"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../../pitch/shared/SlideLayout";
import { FadeIn } from "../../pitch/shared/FadeIn";
import { StaggerContainer, staggerItem } from "../../pitch/shared/StaggerContainer";
import { Check, Star } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$299",
    period: "/mo",
    annual: "$2,990/yr",
    features: [
      "1 user",
      "NSW + VIC data",
      "5 AI reports/mo",
      "Basic CRM",
    ],
    highlight: false,
  },
  {
    name: "Professional",
    price: "$699",
    period: "/mo",
    annual: "$6,990/yr",
    features: [
      "3 users",
      "National coverage",
      "Unlimited AI reports",
      "Full CRM + financial modelling",
    ],
    highlight: true,
  },
  {
    name: "Business",
    price: "$1,299",
    period: "/mo",
    annual: "$12,990/yr",
    features: [
      "10 users",
      "Priority support",
      "Project management",
      "API access + custom templates",
    ],
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    annual: "",
    features: [
      "Unlimited users",
      "SSO / SAML",
      "White-label",
      "Dedicated CSM + SLA",
    ],
    highlight: false,
  },
];

const addOns = [
  { label: "AI feasibility report", price: "$75/report" },
  { label: "Title search", price: "$45/search" },
  { label: "Training & cert.", price: "$990/person" },
  { label: "API calls", price: "$0.25/call" },
];

export function BusinessModelSlide() {
  return (
    <SlideLayout bg="bg-surface-100">
      <div className="w-full">
        <FadeIn>
          <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
            Business Model
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] text-primary-900 leading-[1.2]">
            B2B SaaS + transaction revenue
          </h2>
        </FadeIn>

        {/* Pricing tiers */}
        <StaggerContainer className="grid grid-cols-4 gap-4 mt-8" delay={0.4}>
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className={`rounded-xl p-5 flex flex-col ${
                t.highlight
                  ? "bg-primary-800 text-white ring-2 ring-accent"
                  : "bg-white border border-surface-300"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`font-sans text-xs uppercase tracking-[0.08em] font-medium ${
                    t.highlight ? "text-primary-200" : "text-surface-500"
                  }`}
                >
                  {t.name}
                </span>
                {t.highlight && (
                  <Star className="w-4 h-4 text-accent fill-accent" />
                )}
              </div>
              <div className="flex items-baseline gap-0.5">
                <span
                  className={`font-serif text-3xl ${
                    t.highlight ? "text-white" : "text-primary-900"
                  }`}
                >
                  {t.price}
                </span>
                <span
                  className={`font-sans text-sm ${
                    t.highlight ? "text-primary-300" : "text-surface-500"
                  }`}
                >
                  {t.period}
                </span>
              </div>
              {t.annual && (
                <p
                  className={`font-sans text-[10px] mt-1 ${
                    t.highlight ? "text-primary-300" : "text-surface-400"
                  }`}
                >
                  {t.annual} (save 2 months)
                </p>
              )}
              <div className="mt-4 space-y-2 flex-1">
                {t.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check
                      className={`w-3.5 h-3.5 shrink-0 ${
                        t.highlight ? "text-accent" : "text-success"
                      }`}
                      strokeWidth={2}
                    />
                    <span
                      className={`font-sans text-[12px] ${
                        t.highlight ? "text-primary-100" : "text-primary-900"
                      }`}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Add-on revenue */}
        <FadeIn delay={1}>
          <div className="mt-6 flex items-center gap-8">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-surface-500 shrink-0">
              Transaction Revenue
            </span>
            <div className="flex gap-3">
              {addOns.map((a) => (
                <div
                  key={a.label}
                  className="px-3 py-2 rounded-lg bg-white border border-surface-300"
                >
                  <p className="font-sans text-[11px] text-surface-500">
                    {a.label}
                  </p>
                  <p className="font-sans text-sm font-medium text-primary-900">
                    {a.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Key metric */}
        <FadeIn delay={1.2}>
          <div className="mt-5 flex gap-8">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-wider text-surface-500">
                Target ARPU
              </p>
              <p className="font-serif text-xl text-primary-900">$550/mo</p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-wider text-surface-500">
                Gross Margin
              </p>
              <p className="font-serif text-xl text-primary-900">90%</p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-wider text-surface-500">
                Customer ROI
              </p>
              <p className="font-serif text-xl text-accent">15-40x</p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-wider text-surface-500">
                vs Manual Cost
              </p>
              <p className="font-serif text-xl text-primary-900">$50-250K</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </SlideLayout>
  );
}
