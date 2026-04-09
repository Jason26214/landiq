"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseSlideNavigationOptions {
  totalSlides: number;
}

export function useSlideNavigation({ totalSlides }: UseSlideNavigationOptions) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const touchStartX = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSlides) return;
      setDirection(index > currentSlide ? "forward" : "backward");
      setCurrentSlide(index);
    },
    [currentSlide, totalSlides]
  );

  // Read URL hash on mount (client-only) to jump to a specific slide
  // Hash uses 1-based numbering to match the on-screen counter (e.g. #1 = first slide)
  useEffect(() => {
    const hash = parseInt(window.location.hash.replace("#", ""), 10);
    if (hash >= 1 && hash <= totalSlides) {
      setCurrentSlide(hash - 1);
    }
  }, [totalSlides]);

  const next = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection("forward");
      setCurrentSlide((s) => s + 1);
    }
  }, [currentSlide, totalSlides]);

  const prev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection("backward");
      setCurrentSlide((s) => s - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Escape") {
        document.exitFullscreen?.().catch(() => {});
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [next, prev]);

  return { currentSlide, direction, totalSlides, next, prev, goTo };
}
