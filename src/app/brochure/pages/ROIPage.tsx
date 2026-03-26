"use client";

const costRows = [
  { item: "Desktop Planning Research", trad: "$3K – $8K", liq: "Automated", saved: "100%" },
  { item: "Town Planner (Initial)", trad: "$5K – $15K", liq: "AI-Generated", saved: "80%" },
  { item: "Constraint Screening", trad: "$2K – $5K", liq: "Automated", saved: "100%" },
  { item: "Yield & Feasibility Model", trad: "$5K – $20K", liq: "AI-Calculated", saved: "70%" },
  { item: "Document Management", trad: "$5K – $10K", liq: "Built-in", saved: "100%" },
  { item: "Comparable Sales Research", trad: "$2K – $5K", liq: "API-Integrated", saved: "90%" },
];

export function ROIPage() {
  return (
    <div className="w-full h-full bg-[#F5F6F3] p-[42px] flex flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-sans text-[7px] uppercase tracking-[0.2em] text-[#134A32]/50">
          LandIQ
        </p>
        <p className="font-sans text-[7px] text-[#85979B]">06</p>
      </div>

      <p className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#134A32] mb-2">
        Return on Investment
      </p>
      <div className="w-10 h-[1.5px] bg-[#C4952A] mb-6" />

      <h2 className="font-serif text-[22px] leading-[1.25] text-[#134A32]">
        Reduce due diligence costs by 80%
      </h2>

      {/* Big stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { value: "$100K+", label: "Traditional DD cost per site", color: "text-[#C04040]" },
          { value: "~80%", label: "Cost reduction with LandIQ", color: "text-[#2D8A4E]" },
          { value: "<1 hr", label: "vs 2–4 weeks traditional", color: "text-[#134A32]" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg p-4 border border-[#E9EAE5]">
            <p className={`font-serif text-[22px] ${s.color}`}>{s.value}</p>
            <p className="font-sans text-[7.5px] text-[#85979B] mt-1 uppercase tracking-[0.04em]">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Cost table */}
      <div className="mt-5 rounded-lg border border-[#E9EAE5] bg-white overflow-hidden flex-1">
        <div className="grid grid-cols-[1fr_100px_90px_50px] px-4 py-2 bg-[#F5F6F3]">
          <span className="font-sans text-[7px] font-semibold uppercase tracking-[0.08em] text-[#85979B]">
            Item
          </span>
          <span className="font-sans text-[7px] font-semibold uppercase tracking-[0.08em] text-[#85979B] text-center">
            Traditional
          </span>
          <span className="font-sans text-[7px] font-semibold uppercase tracking-[0.08em] text-[#134A32] text-center">
            LandIQ
          </span>
          <span className="font-sans text-[7px] font-semibold uppercase tracking-[0.08em] text-[#2D8A4E] text-center">
            Saved
          </span>
        </div>

        {costRows.map((row) => (
          <div
            key={row.item}
            className="grid grid-cols-[1fr_100px_90px_50px] px-4 py-2 border-t border-[#E9EAE5] items-center"
          >
            <span className="font-sans text-[8.5px] text-[#134A32]">{row.item}</span>
            <span className="font-sans text-[8.5px] text-[#85979B] text-center line-through decoration-[#C04040]/30">
              {row.trad}
            </span>
            <span className="font-sans text-[7.5px] text-[#134A32] text-center bg-[#E8F0EC] rounded-full px-2 py-0.5">
              {row.liq}
            </span>
            <span className="font-sans text-[9px] font-bold text-[#2D8A4E] text-center">
              {row.saved}
            </span>
          </div>
        ))}

        {/* Total */}
        <div className="grid grid-cols-[1fr_100px_90px_50px] px-4 py-2.5 bg-[#134A32] items-center">
          <span className="font-sans text-[9px] font-semibold text-white">Total Phase 1 Screening</span>
          <span className="font-sans text-[9px] text-white/60 text-center line-through">$22K – $63K</span>
          <span className="font-sans text-[8px] text-white text-center bg-white/15 rounded-full px-2 py-0.5">~$5K</span>
          <span className="font-sans text-[10px] font-bold text-[#C4952A] text-center">~80%</span>
        </div>
      </div>

      {/* Bottom insight */}
      <div className="mt-4 bg-[#FFF8E1] border border-[#C4952A]/20 rounded-lg p-3">
        <p className="font-sans text-[8.5px] text-[#134A32] leading-[1.6]">
          <span className="font-semibold">Example:</span> A developer evaluating 10 sites/year,
          abandoning 7 = <span className="font-bold text-[#C04040]">$700K+ wasted</span> in
          traditional DD. With LandIQ, the same screening costs under
          <span className="font-bold text-[#2D8A4E]"> $50K</span>.
        </p>
      </div>
    </div>
  );
}
