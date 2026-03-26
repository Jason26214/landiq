"use client";

export function BackCoverPage() {
  return (
    <div className="w-full h-full bg-[#134A32] p-[42px] flex flex-col">
      {/* Topographic lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 600 850" preserveAspectRatio="xMidYMid slice">
        {[100, 200, 300, 400, 500, 600, 700].map((y, i) => (
          <path key={i} d={`M-50 ${y} Q200 ${y - 20 + i * 5} 400 ${y + 10} T650 ${y}`} fill="none" stroke="white" strokeWidth="0.6" />
        ))}
      </svg>

      <div className="relative z-10 h-full flex flex-col">
        {/* Top */}
        <div className="flex items-center justify-between mb-auto">
          <p className="font-sans text-[7px] uppercase tracking-[0.2em] text-white/30">
            LandIQ
          </p>
          <p className="font-sans text-[7px] text-white/30">08</p>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="font-serif text-[42px] text-white tracking-tight">
            LandIQ
          </h1>
          <div className="w-12 h-[1.5px] bg-[#C4952A] mt-4 mb-4 mx-auto" />
          <p className="font-serif text-[16px] text-white/70 leading-[1.5]">
            Ready to transform your
            <br />
            feasibility process?
          </p>

          <div className="mt-10 space-y-2">
            <div className="flex items-center justify-center gap-4">
              <span className="px-5 py-2 rounded-full border border-white/40 font-sans text-[9px] text-white uppercase tracking-[0.1em]">
                Book a Demo
              </span>
              <span className="px-5 py-2 rounded-full border border-white/20 font-sans text-[9px] text-white/60 uppercase tracking-[0.1em]">
                Contact Us
              </span>
            </div>
          </div>

          <div className="mt-10 space-y-1.5">
            <p className="font-sans text-[10px] text-white/60">
              hello@landiq.com.au
            </p>
            <p className="font-sans text-[10px] text-white/40">
              www.landiq.com.au
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/10 mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sans text-[7px] text-white/30 uppercase tracking-[0.1em]">
                Powered by verified government data
              </p>
              <div className="flex gap-3 mt-2">
                {["NSW ePlanning", "VIC OpenData", "G-NAF", "PostGIS"].map((s) => (
                  <span key={s} className="font-sans text-[6.5px] text-white/25 uppercase tracking-[0.05em]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="font-sans text-[6.5px] text-white/25">
                © 2026 LandIQ. All rights reserved.
              </p>
              <p className="font-sans text-[6.5px] text-white/20 mt-0.5">
                Confidential — For intended recipients only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
