"use client";

import { ReactNode } from "react";

interface SlideLayoutProps {
  children: ReactNode;
  className?: string;
  bg?: string;
}

export function SlideLayout({
  children,
  className = "",
  bg = "bg-white",
}: SlideLayoutProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center overflow-hidden ${bg} ${className}`}
    >
      <div className="relative w-full h-full max-w-[1400px] mx-auto px-16 flex items-center">
        {children}
      </div>
    </div>
  );
}
