"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/SlideLayout";
import { FadeIn } from "../shared/FadeIn";

const data = [
  { type: "Zoning", nsw: true, vic: true, speed: "137ms" },
  { type: "FSR / Density", nsw: true, vic: false, speed: "138ms" },
  { type: "Height Limits", nsw: true, vic: true, speed: "142ms" },
  { type: "Bushfire Risk", nsw: true, vic: true, speed: "150ms" },
  { type: "Flood Risk", nsw: true, vic: true, speed: "157ms" },
  { type: "Heritage", nsw: true, vic: true, speed: "133ms" },
  { type: "Cadastre / Lot", nsw: true, vic: true, speed: "203ms" },
  { type: "Easements", nsw: true, vic: false, speed: "210ms" },
];

function CheckSVG({ delay }: { delay: number }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <motion.path
        d="M4 10 L8 14 L16 6"
        fill="none"
        stroke="#2D8A4E"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: delay + 0.1, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

export function DataEngineSlide() {
  return (
    <SlideLayout bg="bg-white">
      <div className="grid grid-cols-12 gap-16 w-full items-center">
        <div className="col-span-5">
          <FadeIn>
            <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
              Data Engine
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] text-primary-900 leading-[1.2]">
              Real-time government data.
              <br />
              Zero manual research.
            </h2>
            <p className="font-body text-[16px] text-surface-500 mt-6 leading-relaxed">
              LandIQ queries NSW ePlanning ArcGIS REST and VIC OpenData WFS
              endpoints in parallel — delivering comprehensive planning controls
              for any parcel in under 300 milliseconds.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-accent-light px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-accent rounded-full" />
              <span className="font-sans text-sm font-medium text-accent">
                All endpoints free & open — no API key required
              </span>
            </div>
          </FadeIn>
        </div>

        <div className="col-span-7">
          <div className="rounded-xl border border-surface-300 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_80px_80px_90px] px-6 py-3 bg-surface-200">
              <span className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-surface-500">
                Data Type
              </span>
              <span className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-surface-500 text-center">
                NSW
              </span>
              <span className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-surface-500 text-center">
                VIC
              </span>
              <span className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-surface-500 text-center">
                Speed
              </span>
            </div>

            {/* Rows */}
            {data.map((row, i) => (
              <motion.div
                key={row.type}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="grid grid-cols-[1fr_80px_80px_90px] px-6 py-3.5 border-t border-surface-300 items-center"
              >
                <span className="font-sans text-[15px] text-primary-900">
                  {row.type}
                </span>
                <div className="flex justify-center">
                  {row.nsw && <CheckSVG delay={0.7 + i * 0.1} />}
                </div>
                <div className="flex justify-center">
                  {row.vic ? (
                    <CheckSVG delay={0.8 + i * 0.1} />
                  ) : (
                    <span className="text-surface-400 text-sm">—</span>
                  )}
                </div>
                <div className="flex justify-center">
                  <span className="font-sans text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full">
                    {row.speed}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
