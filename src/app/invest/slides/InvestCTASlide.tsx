"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../../pitch/shared/FadeIn";
import { Mail, Globe, MapPin } from "lucide-react";

export function InvestCTASlide() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary-900" />

      {/* Topographic lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {[80, 160, 240, 320, 400, 480, 560].map((y, i) => (
          <path
            key={i}
            d={`M-100 ${y} Q250 ${y - 30 + i * 6} 500 ${y + 15} T1100 ${y - 8 + i * 4}`}
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-16">
        <FadeIn>
          <p className="font-sans text-sm uppercase tracking-[0.15em] text-accent mb-6">
            Investment Opportunity
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] text-white leading-[1.15]">
            Join us in building Australia&apos;s
            <br />
            property intelligence platform
          </h2>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-10 grid grid-cols-3 gap-6">
            <div className="border-t border-accent/40 pt-4">
              <p className="font-serif text-3xl text-accent">$860K</p>
              <p className="font-sans text-xs text-primary-300 mt-1">
                Seed Round
              </p>
            </div>
            <div className="border-t border-accent/40 pt-4">
              <p className="font-serif text-3xl text-white">$4M</p>
              <p className="font-sans text-xs text-primary-300 mt-1">
                Pre-money Valuation
              </p>
            </div>
            <div className="border-t border-accent/40 pt-4">
              <p className="font-serif text-3xl text-accent">5-7x</p>
              <p className="font-sans text-xs text-primary-300 mt-1">
                Target Return (18mo)
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="mt-12 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-primary-300">
              <Globe className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-sans text-sm">landiq.au</span>
            </div>
            <div className="flex items-center gap-2 text-primary-300">
              <Mail className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-sans text-sm">invest@landiq.au</span>
            </div>
            <div className="flex items-center gap-2 text-primary-300">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-sans text-sm">Sydney, Australia</span>
            </div>
          </div>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <p className="font-sans text-xs text-primary-500">
            Confidential &middot; For qualified investors only &middot; March
            2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}
