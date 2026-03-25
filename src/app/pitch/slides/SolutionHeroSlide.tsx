"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../shared/FadeIn";

export function SolutionHeroSlide() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-primary-800">
      {/* Animated topographic lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.g
          animate={{ x: [0, -40, 0], y: [0, 15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[60, 130, 200, 270, 340, 410, 480, 550, 620].map((y, i) => (
            <path
              key={i}
              d={`M-100 ${y} Q200 ${y - 35 + i * 7} 500 ${y + 25} Q800 ${y - 15 + i * 5} 1300 ${y + 10}`}
              fill="none"
              stroke="white"
              strokeWidth="1.2"
            />
          ))}
        </motion.g>
      </svg>

      {/* Decorative vertical lines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ delay: 0.5 }}
        className="absolute right-24 top-0 bottom-0 flex gap-8"
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-[1px] h-full bg-white" />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-20">
        <div className="max-w-3xl">
          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[2px] bg-accent mb-10"
          />

          <FadeIn delay={0.3}>
            <p className="font-sans text-sm uppercase tracking-[0.15em] text-primary-300 mb-6">
              The Solution
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <h1 className="font-serif text-[clamp(3.5rem,7vw,6rem)] text-white leading-[1.02] tracking-tight">
              LandIQ
            </h1>
          </FadeIn>

          <FadeIn delay={0.7}>
            <p className="font-serif text-[clamp(1.4rem,3vw,2.2rem)] text-primary-200 mt-6 leading-[1.3]">
              One platform.
              <br />
              Address in, feasibility out.
            </p>
          </FadeIn>

          <FadeIn delay={0.9}>
            <p className="font-body text-[17px] text-primary-400 mt-6 max-w-xl leading-relaxed">
              Automate the entire desktop feasibility process — from government
              data retrieval to AI-generated reports — in minutes, not weeks.
            </p>
          </FadeIn>

          <FadeIn delay={1.1}>
            <div className="flex gap-4 mt-10">
              <button className="rounded-full border-[1.5px] border-white px-8 py-3.5 text-white font-sans text-sm tracking-wide hover:bg-white/10 transition-all duration-200">
                See How It Works →
              </button>
              <button className="rounded-full border-[1.5px] border-white/30 px-8 py-3.5 text-white/60 font-sans text-sm tracking-wide hover:border-white/50 hover:text-white/80 transition-all duration-200">
                View Data Engine
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom right decorative element — Orens-style vertical rotated text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ delay: 1.3 }}
        className="absolute right-12 bottom-12"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        <span className="font-sans text-[22px] font-bold text-white tracking-[0.12em] uppercase">
          Intelligence · Automation · Precision
        </span>
      </motion.div>
    </div>
  );
}
