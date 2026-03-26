"use client";

const dataItems = [
  { type: "Zoning", nsw: true, vic: true, speed: "137ms" },
  { type: "FSR / Density", nsw: true, vic: false, speed: "138ms" },
  { type: "Height Limits", nsw: true, vic: true, speed: "142ms" },
  { type: "Bushfire Risk", nsw: true, vic: true, speed: "150ms" },
  { type: "Flood Risk", nsw: true, vic: true, speed: "157ms" },
  { type: "Heritage", nsw: true, vic: true, speed: "133ms" },
  { type: "Cadastre / Lot", nsw: true, vic: true, speed: "203ms" },
  { type: "Easements", nsw: true, vic: false, speed: "210ms" },
];

export function DataPage() {
  return (
    <div className="w-full h-full bg-white p-[42px] flex flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-sans text-[7px] uppercase tracking-[0.2em] text-[#134A32]/50">
          LandIQ
        </p>
        <p className="font-sans text-[7px] text-[#85979B]">05</p>
      </div>

      <p className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#134A32] mb-2">
        Data Engine
      </p>
      <div className="w-10 h-[1.5px] bg-[#C4952A] mb-6" />

      <h2 className="font-serif text-[24px] leading-[1.25] text-[#134A32] max-w-[400px]">
        Real-time government data. Zero manual research.
      </h2>

      <p className="font-body text-[10px] text-[#85979B] leading-[1.7] mt-4 max-w-[400px]">
        LandIQ queries NSW ePlanning ArcGIS REST and VIC OpenData WFS
        endpoints in parallel — delivering comprehensive planning controls
        for any parcel in under 300 milliseconds. All endpoints are free,
        open, and require no API key.
      </p>

      {/* Data table */}
      <div className="mt-6 rounded-lg border border-[#E9EAE5] overflow-hidden flex-1">
        {/* Header */}
        <div className="grid grid-cols-[1fr_60px_60px_70px] px-4 py-2 bg-[#F5F6F3]">
          <span className="font-sans text-[7px] font-semibold uppercase tracking-[0.1em] text-[#85979B]">
            Data Type
          </span>
          <span className="font-sans text-[7px] font-semibold uppercase tracking-[0.1em] text-[#85979B] text-center">
            NSW
          </span>
          <span className="font-sans text-[7px] font-semibold uppercase tracking-[0.1em] text-[#85979B] text-center">
            VIC
          </span>
          <span className="font-sans text-[7px] font-semibold uppercase tracking-[0.1em] text-[#85979B] text-center">
            Speed
          </span>
        </div>

        {dataItems.map((row) => (
          <div
            key={row.type}
            className="grid grid-cols-[1fr_60px_60px_70px] px-4 py-2.5 border-t border-[#E9EAE5] items-center"
          >
            <span className="font-sans text-[9.5px] text-[#134A32]">{row.type}</span>
            <div className="flex justify-center">
              {row.nsw && <span className="text-[#2D8A4E] text-[10px]">✓</span>}
            </div>
            <div className="flex justify-center">
              {row.vic ? (
                <span className="text-[#2D8A4E] text-[10px]">✓</span>
              ) : (
                <span className="text-[#D1D5D0] text-[10px]">—</span>
              )}
            </div>
            <div className="flex justify-center">
              <span className="font-sans text-[7.5px] bg-[#E8F0EC] text-[#134A32] px-2 py-0.5 rounded-full">
                {row.speed}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-4 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C4952A]" />
        <p className="font-sans text-[8px] text-[#85979B]">
          All endpoints verified and tested. Free, open access — no API key required.
          Expanding to QLD, SA, WA in 2026.
        </p>
      </div>
    </div>
  );
}
