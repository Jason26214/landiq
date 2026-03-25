"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../shared/FadeIn";

export function CTASlide() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/landiq/images/lifestyle/lifestyle-community-walk.jpg')" }}
      />
      {/* Dark green overlay */}
      <div className="absolute inset-0 bg-primary-900/85" />

      {/* Animated topographic lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.g
          animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[120, 200, 280, 360, 440].map((y, i) => (
            <path
              key={i}
              d={`M-100 ${y} Q300 ${y - 30 + i * 6} 600 ${y + 20} T1100 ${y - 5}`}
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </motion.g>
      </svg>

      <div className="relative text-center z-10">
        <FadeIn>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] text-white leading-[1.15] max-w-3xl mx-auto">
            Ready to transform your feasibility process?
          </h2>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex gap-4 justify-center mt-10">
            <button className="rounded-full border-[1.5px] border-white px-8 py-3.5 text-white font-sans text-sm tracking-wide hover:bg-white/15 transition-all duration-200">
              Book a Demo →
            </button>
            <button className="rounded-full border-[1.5px] border-white/40 px-8 py-3.5 text-white/80 font-sans text-sm tracking-wide hover:border-white/70 hover:text-white transition-all duration-200">
              Contact Us →
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="mt-12 space-y-2">
            <p className="font-sans text-sm text-primary-300">
              hello@landiq.com.au
            </p>
            <p className="font-sans text-sm text-primary-400">
              www.landiq.com.au
            </p>
          </div>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <span className="font-serif text-2xl text-white">LandIQ</span>
        </motion.div>
      </div>
    </div>
  );
}
