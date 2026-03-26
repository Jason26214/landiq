"use client";

const features = [
  {
    title: "AI Feasibility Reports",
    desc: "Institutional-grade reports generated in minutes. Site overview, planning analysis, development potential, risk assessment, and recommendations — all automated.",
    highlight: true,
  },
  {
    title: "Document Management",
    desc: "Centralised hub for all project documents. Version control, AI auto-tagging, full-text search, and team sharing.",
    highlight: false,
  },
  {
    title: "Chrome Extension",
    desc: "Browse REA, Domain, or Landchecker — get instant planning data overlay without leaving the page.",
    highlight: false,
  },
  {
    title: "Email Hub",
    desc: "Connect multiple email accounts. AI auto-links emails to land sites and categorises by project.",
    highlight: false,
  },
  {
    title: "Land CRM Pipeline",
    desc: "Manage every opportunity from Lead through Research, Feasibility, Negotiation to Acquired.",
    highlight: false,
  },
  {
    title: "Project Management",
    desc: "Post-acquisition tracking: timelines, stages, contractors, consultants, approvals, and milestones.",
    highlight: false,
  },
];

export function FeaturesPage() {
  return (
    <div className="w-full h-full bg-white p-[42px] flex flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-sans text-[7px] uppercase tracking-[0.2em] text-[#134A32]/50">
          LandIQ
        </p>
        <p className="font-sans text-[7px] text-[#85979B]">04</p>
      </div>

      <p className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#134A32] mb-2">
        Platform Features
      </p>
      <div className="w-10 h-[1.5px] bg-[#C4952A] mb-6" />

      <h2 className="font-serif text-[24px] leading-[1.25] text-[#134A32] max-w-[380px]">
        A complete operating system for property development
      </h2>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-4 mt-8 flex-1">
        {features.map((f) => (
          <div
            key={f.title}
            className={`rounded-lg p-4 ${
              f.highlight
                ? "bg-[#134A32] col-span-2"
                : "bg-[#F5F6F3] border border-[#E9EAE5]"
            }`}
          >
            <h3
              className={`font-sans text-[11px] font-semibold mb-1.5 ${
                f.highlight ? "text-white" : "text-[#134A32]"
              }`}
            >
              {f.title}
            </h3>
            <p
              className={`font-body text-[9px] leading-[1.65] ${
                f.highlight ? "text-white/60" : "text-[#85979B]"
              }`}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
