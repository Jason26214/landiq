"use client";

export function CoverPage() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-primary-800">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/landiq/images/aerial/aerial-suburb-01.jpg')" }}
      />

      {/* Topographic lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 600 850" preserveAspectRatio="xMidYMid slice">
        {[100, 180, 260, 340, 420, 500, 580, 660, 740].map((y, i) => (
          <path key={i} d={`M-50 ${y} Q150 ${y - 25 + i * 6} 300 ${y + 15} T650 ${y - 5}`} fill="none" stroke="white" strokeWidth="0.8" />
        ))}
      </svg>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-[42px]">
        {/* Top: small logo mark */}
        <div>
          <div className="w-[2px] h-10 bg-[#C4952A] mb-4" />
          <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-white/50">
            Property Development Platform
          </p>
        </div>

        {/* Center: main title */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-serif text-[52px] leading-[1.0] text-white tracking-tight">
            LandIQ
          </h1>
          <div className="w-16 h-[2px] bg-[#C4952A] mt-5 mb-5" />
          <p className="font-serif text-[18px] text-white/80 leading-[1.4] max-w-[320px]">
            The AI-Powered Property
            <br />
            Development Operating System
          </p>
          <p className="font-body text-[11px] text-white/50 mt-4 max-w-[280px] leading-[1.6]">
            Automate land feasibility analysis. Reduce due diligence costs by 80%.
            From weeks to minutes.
          </p>
        </div>

        {/* Bottom */}
        <div className="flex items-end justify-between">
          <div>
            <p className="font-sans text-[7px] uppercase tracking-[0.15em] text-white/40">
              www.landiq.com.au
            </p>
          </div>
          <div className="text-right">
            <p className="font-sans text-[7px] uppercase tracking-[0.15em] text-white/40">
              Confidential
            </p>
            <p className="font-sans text-[7px] text-white/30">
              March 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
