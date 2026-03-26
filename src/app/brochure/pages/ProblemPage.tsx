"use client";

const problems = [
  {
    num: "01",
    title: "Fragmented Data",
    desc: "Planning data scattered across council portals, GIS systems, government databases, PDF reports, and Excel spreadsheets. Each site requires searching 20+ different sources.",
  },
  {
    num: "02",
    title: "Manual Reports",
    desc: "Feasibility reports still compiled by hand in Word and Excel. A single report takes 2–4 weeks and costs $20K–$60K in consultant fees.",
  },
  {
    num: "03",
    title: "High Sunk Costs",
    desc: "Developers spend $100K+ investigating each site. With 70–80% of sites abandoned, hundreds of thousands are wasted annually on dead-end acquisitions.",
  },
  {
    num: "04",
    title: "No Unified Platform",
    desc: "Land opportunities, consultant reports, emails, and decisions managed across disconnected tools — email, shared drives, personal folders.",
  },
];

export function ProblemPage() {
  return (
    <div className="w-full h-full bg-[#E9EAE5] p-[42px] flex flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-sans text-[7px] uppercase tracking-[0.2em] text-[#134A32]/50">
          LandIQ
        </p>
        <p className="font-sans text-[7px] text-[#85979B]">02</p>
      </div>

      <p className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#134A32] mb-2">
        The Problem
      </p>
      <div className="w-10 h-[1.5px] bg-[#C4952A] mb-6" />

      <h2 className="font-serif text-[24px] leading-[1.25] text-[#134A32] max-w-[380px]">
        The land acquisition process is broken
      </h2>

      <p className="font-body text-[10px] text-[#85979B] leading-[1.7] mt-4 max-w-[380px]">
        Australian property developers face a costly, time-consuming due
        diligence process that hasn&apos;t fundamentally changed in decades.
      </p>

      {/* Problem cards */}
      <div className="grid grid-cols-2 gap-5 mt-8 flex-1">
        {problems.map((p) => (
          <div key={p.num} className="bg-white rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-sans text-[9px] font-bold text-[#C4952A]">
                {p.num}
              </span>
              <div className="flex-1 h-[1px] bg-[#E9EAE5]" />
            </div>
            <h3 className="font-sans text-[12px] font-semibold text-[#134A32] mb-2">
              {p.title}
            </h3>
            <p className="font-body text-[9px] text-[#85979B] leading-[1.65]">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom accent */}
      <div className="mt-6 pt-4 border-t border-[#D1D5D0]">
        <p className="font-body text-[9px] text-[#85979B] italic">
          &ldquo;We were spending more time gathering data than analysing it.&rdquo;
          — Land Acquisition Manager, Sydney-based developer
        </p>
      </div>
    </div>
  );
}
