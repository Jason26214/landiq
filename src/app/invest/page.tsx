"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "./slides";
import { Navigation } from "../pitch/components/Navigation";
import { useSlideNavigation } from "../pitch/hooks/useSlideNavigation";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 900;

const slideVariants = {
  enter: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? "-50%" : "50%",
    opacity: 0,
  }),
};

export default function InvestPage() {
  const { currentSlide, direction, totalSlides, next, prev, goTo } =
    useSlideNavigation({ totalSlides: slides.length });

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / DESIGN_WIDTH;
      const scaleY = window.innerHeight / DESIGN_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-black relative cursor-pointer select-none flex items-center justify-center"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("button") || target.closest("a")) return;

        const x = e.clientX;
        if (x > window.innerWidth * 0.3) next();
        else prev();
      }}
    >
      <div
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="relative overflow-hidden shrink-0"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>

        <Navigation
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onGoTo={goTo}
        />

        <div className="absolute bottom-8 left-8 z-50 font-sans text-xs text-white/30">
          {currentSlide + 1} / {totalSlides}
        </div>
      </div>
    </div>
  );
}
