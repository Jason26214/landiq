"use client";

const steps = [
  {
    num: "1",
    title: "Enter an Address",
    desc: "Type any Australian property address or lot number into the platform.",
  },
  {
    num: "2",
    title: "AI Queries 30+ Sources",
    desc: "Real-time data from NSW ePlanning, VIC OpenData, G-NAF, and more — in under 300ms.",
  },
  {
    num: "3",
    title: "Get Your Report",
    desc: "AI-generated feasibility report with zoning, risk analysis, yield estimation, and recommendations.",
  },
];

export function SolutionPage() {
  return (
    <div className="w-full h-full bg-[#134A32] p-[42px] flex flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-sans text-[7px] uppercase tracking-[0.2em] text-white/40">
          LandIQ
        </p>
        <p className="font-sans text-[7px] text-white/40">03</p>
      </div>

      <p className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#C4952A] mb-2">
        The Solution
      </p>
      <div className="w-10 h-[1.5px] bg-[#C4952A] mb-6" />

      <h2 className="font-serif text-[28px] leading-[1.2] text-white max-w-[380px]">
        One platform.
        <br />
        Address in, feasibility out.
      </h2>

      <p className="font-body text-[10.5px] text-white/60 leading-[1.7] mt-5 max-w-[380px]">
        LandIQ connects directly to government open data APIs to deliver
        comprehensive planning intelligence for any site in Australia —
        instantly, automatically, and at a fraction of traditional cost.
      </p>

      {/* 3-step flow */}
      <div className="mt-10 flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full border-[1.5px] border-[#C4952A] flex items-center justify-center">
                  <span className="font-serif text-[14px] text-[#C4952A]">
                    {step.num}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-[1px] h-6 bg-white/20 mt-2" />
                )}
              </div>
              <div className="pt-1">
                <h3 className="font-sans text-[12px] font-semibold text-white mb-1">
                  {step.title}
                </h3>
                <p className="font-body text-[9.5px] text-white/50 leading-[1.6] max-w-[340px]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom badges */}
      <div className="flex gap-3 mt-6 pt-5 border-t border-white/10">
        {["NSW ePlanning", "VIC OpenData", "G-NAF", "30+ APIs"].map((badge) => (
          <span
            key={badge}
            className="px-3 py-1.5 rounded-full border border-white/20 font-sans text-[7.5px] text-white/50 uppercase tracking-[0.08em]"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
