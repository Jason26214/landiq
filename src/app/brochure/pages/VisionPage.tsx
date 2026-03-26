"use client";

export function VisionPage() {
  return (
    <div className="w-full h-full bg-white p-[42px] flex flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-sans text-[7px] uppercase tracking-[0.2em] text-[#134A32]/50">
          LandIQ
        </p>
        <p className="font-sans text-[7px] text-[#85979B]">01</p>
      </div>

      {/* Section label */}
      <p className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#134A32] mb-2">
        Our Vision
      </p>
      <div className="w-10 h-[1.5px] bg-[#C4952A] mb-6" />

      {/* Main quote */}
      <h2 className="font-serif text-[28px] leading-[1.25] text-[#134A32] max-w-[420px]">
        Transforming how Australia&apos;s property developers evaluate land
      </h2>

      <p className="font-body text-[10.5px] text-[#85979B] leading-[1.7] mt-6 max-w-[400px]">
        In an industry where a single land acquisition can represent a
        $10–$100 million decision, the due diligence process remains
        stubbornly manual. Developers spend weeks gathering fragmented
        data from dozens of government portals, consultants, and databases
        — only to abandon 70–80% of sites they investigate.
      </p>

      <p className="font-body text-[10.5px] text-[#85979B] leading-[1.7] mt-4 max-w-[400px]">
        LandIQ was built to change this. By connecting directly to
        government open data APIs and leveraging AI, we compress the
        entire desktop feasibility process from weeks to minutes —
        giving developers the confidence to move faster and the
        intelligence to move smarter.
      </p>

      {/* Pull quote */}
      <div className="mt-auto pt-8 border-t border-[#E9EAE5]">
        <div className="flex gap-6">
          <div className="w-[1.5px] bg-[#C4952A] shrink-0" />
          <div>
            <p className="font-serif text-[14px] text-[#134A32] leading-[1.5] italic">
              &ldquo;Every week of delay is a week a competitor
              can move first. Speed is the new competitive advantage
              in land acquisition.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#E9EAE5]">
        {[
          { value: "$100K+", label: "Wasted per abandoned site" },
          { value: "2–4 wks", label: "Traditional DD timeline" },
          { value: "70–80%", label: "Sites abandoned after DD" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="font-serif text-[20px] text-[#134A32]">{stat.value}</p>
            <p className="font-sans text-[7.5px] text-[#85979B] mt-1 uppercase tracking-[0.05em]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
