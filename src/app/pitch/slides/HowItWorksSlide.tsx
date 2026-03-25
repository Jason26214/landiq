"use client";

import { motion } from "framer-motion";
import { Search, Zap, FileCheck } from "lucide-react";
import { SlideLayout } from "../shared/SlideLayout";
import { FadeIn } from "../shared/FadeIn";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Enter an Address",
    desc: "Type any Australian property address or lot number",
    detail: "42 Bridge Street, Sydney NSW 2000",
  },
  {
    icon: Zap,
    num: "02",
    title: "AI Queries 30+ Sources",
    desc: "Real-time data from NSW ePlanning, VIC OpenData, G-NAF, and more",
    detail: "Zoning · FSR · Height · Fire · Flood · Heritage",
  },
  {
    icon: FileCheck,
    num: "03",
    title: "Get Feasibility Report",
    desc: "AI-generated analysis with risk scoring and development recommendations",
    detail: "PDF · Word · Interactive Dashboard",
  },
];

export function HowItWorksSlide() {
  return (
    <SlideLayout bg="bg-white">
      <div className="w-full">
        <FadeIn>
          <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
            How It Works
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-primary-900 leading-[1.2]">
            Three steps to automated feasibility
          </h2>
        </FadeIn>

        <div className="flex items-start gap-6 mt-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.25 }}
              className="flex-1 relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <motion.div
                  className="absolute top-10 right-0 translate-x-1/2 w-full h-[2px]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 + i * 0.25 }}
                  style={{ transformOrigin: "left", background: "linear-gradient(to right, #134A32, #2D7A5A)" }}
                />
              )}

              <div className="relative bg-surface-100 rounded-2xl p-8 border border-surface-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="font-sans text-xs text-surface-500 tracking-wider uppercase">
                    Step {step.num}
                  </span>
                </div>

                <h3 className="font-sans text-xl font-medium text-primary-900 mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-[15px] text-surface-500 leading-relaxed">
                  {step.desc}
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + i * 0.3 }}
                  className="mt-4 px-3 py-2 bg-primary-50 rounded-lg"
                >
                  <code className="font-sans text-xs text-primary-700">
                    {step.detail}
                  </code>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
