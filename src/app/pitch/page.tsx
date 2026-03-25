"use client";

import { AnimatePresence, motion } from "framer-motion";
import { slides } from "./slides";
import { Navigation } from "./components/Navigation";
import { useSlideNavigation } from "./hooks/useSlideNavigation";

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

export default function PitchPage() {
  const { currentSlide, direction, totalSlides, next, prev, goTo } =
    useSlideNavigation({ totalSlides: slides.length });

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-primary-900 relative cursor-pointer select-none"
      onClick={(e) => {
        // Don't navigate on button/link clicks
        const target = e.target as HTMLElement;
        if (target.closest("button") || target.closest("a")) return;

        const x = e.clientX;
        if (x > window.innerWidth * 0.3) next();
        else prev();
      }}
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

      {/* Slide counter */}
      <div className="fixed bottom-8 left-8 z-50 font-sans text-xs text-white/30">
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
}
