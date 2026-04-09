"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronRight, Shield, Flame, Droplets, Landmark, Building2, Ruler } from "lucide-react";

const parcels = [
  {
    id: 1,
    address: "42 Bridge Street, Sydney NSW 2000",
    zone: "SP5 — Metropolitan Centre",
    fsr: "8:1",
    height: "No LEP limit (SEPP controlled)",
    bushfire: "Not Affected",
    heritage: "MLC Centre Complex (Local I2287)",
    flood: "Not Affected",
    lot: "Lot 1 DP598704 · 10,328 sqm",
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    id: 2,
    address: "15 Campbell Street, Parramatta NSW 2150",
    zone: "B4 — Mixed Use",
    fsr: "6:1",
    height: "80m (Clause 4.3)",
    bushfire: "Not Affected",
    heritage: "None",
    flood: "Flood Planning Area",
    lot: "Lot 2 DP120045 · 2,450 sqm",
    lat: -33.8151,
    lng: 151.0011,
  },
  {
    id: 3,
    address: "88 Collins Street, Melbourne VIC 3000",
    zone: "CCZ1 — Capital City Zone",
    fsr: "Per DDO Schedule",
    height: "Per DDO40",
    bushfire: "Not Affected",
    heritage: "HO541 (Heritage Overlay)",
    flood: "SBO3 (Special Building Overlay)",
    lot: "PFI 216004642 · Active",
    lat: -37.8136,
    lng: 144.9731,
  },
];

const riskIcon = (label: string) => {
  switch (label) {
    case "Zoning": return Building2;
    case "FSR": return Ruler;
    case "Height Limit": return Building2;
    case "Bushfire": return Flame;
    case "Heritage": return Landmark;
    case "Flood": return Droplets;
    default: return Shield;
  }
};

const riskStatus = (val: string) => {
  if (val.includes("Not Affected") || val === "None")
    return { color: "text-success", bg: "bg-success/10", status: "clear" };
  if (val.includes("Flood") || val.includes("SBO"))
    return { color: "text-danger", bg: "bg-danger-light", status: "risk" };
  return { color: "text-primary-900", bg: "bg-surface-100", status: "info" };
};

export function DemoSlide() {
  const [selected, setSelected] = useState(0);
  const parcel = parcels[selected];
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const L = await import("leaflet");

      // Clear stale Leaflet state on the DOM element (React Strict Mode re-mount)
      const container = mapRef.current!;
      if ((container as any)._leaflet_id) {
        (container as any)._leaflet_id = null;
      }

      const map = L.map(container, {
        center: [-33.8688, 151.2093],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
      });

      // CartoDB dark monochrome tiles - custom tinted to match primary green
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 }
      ).addTo(map);

      // Add a subtle green tint overlay via CSS filter on the tile layer
      const tilePane = map.getPane("tilePane");
      if (tilePane) {
        tilePane.style.filter = "hue-rotate(100deg) saturate(0.4) brightness(0.6)";
      }

      // Add parcel markers
      parcels.forEach((p, i) => {
        const marker = L.circleMarker([p.lat, p.lng], {
          radius: i === 0 ? 10 : 7,
          fillColor: i === 0 ? "#C4952A" : "#2D7A5A",
          fillOpacity: i === 0 ? 0.9 : 0.6,
          color: i === 0 ? "#C4952A" : "#2D7A5A",
          weight: 2,
          opacity: 0.8,
        }).addTo(map);

        marker.on("click", () => {
          setSelected(i);
        });

        // Pulse animation ring for active marker
        if (i === 0) {
          L.circleMarker([p.lat, p.lng], {
            radius: 18,
            fillColor: "#C4952A",
            fillOpacity: 0.15,
            color: "#C4952A",
            weight: 1,
            opacity: 0.3,
          }).addTo(map);
        }

        markersRef.current.push(marker);
      });

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map when parcel changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const p = parcels[selected];
    map.flyTo([p.lat, p.lng], 13, { duration: 1.2 });

    // Update marker styles
    markersRef.current.forEach((marker, i) => {
      marker.setStyle({
        radius: i === selected ? 10 : 7,
        fillColor: i === selected ? "#C4952A" : "#2D7A5A",
        fillOpacity: i === selected ? 0.9 : 0.5,
        color: i === selected ? "#C4952A" : "#2D7A5A",
        weight: i === selected ? 2.5 : 1.5,
      });
    });
  }, [selected]);

  return (
    <div className="absolute inset-0 bg-primary-900 flex overflow-hidden">
      {/* Left: address list */}
      <div className="w-[320px] bg-primary-800/95 backdrop-blur-sm border-r border-primary-700/50 flex flex-col z-20">
        <div className="p-6 border-b border-primary-700/50">
          <p className="font-sans text-xs uppercase tracking-[0.08em] text-primary-300 mb-2">
            Live Demo
          </p>
          <h3 className="font-serif text-xl text-white">Site Intelligence</h3>
          <p className="font-sans text-xs text-primary-400 mt-1">
            Click a site to explore planning data
          </p>
        </div>
        <div className="flex-1 overflow-auto">
          {parcels.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-6 py-4 border-b border-primary-700/30 transition-all duration-200 ${
                i === selected
                  ? "bg-primary-700/80 border-l-2 border-l-accent"
                  : "hover:bg-primary-700/40 border-l-2 border-l-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    i === selected ? "bg-accent" : "bg-primary-500"
                  }`}
                />
                <span className="font-sans text-sm text-white truncate">
                  {p.address}
                </span>
              </div>
              <span className="font-sans text-xs text-primary-400 ml-5 mt-1 block">
                {p.zone.split("—")[0].trim()}
              </span>
            </button>
          ))}
        </div>

        {/* Mini stats at bottom */}
        <div className="p-4 border-t border-primary-700/50 bg-primary-900/50">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <span className="font-serif text-lg text-accent">30+</span>
              <p className="font-sans text-[10px] text-primary-400 uppercase tracking-wider">Data Sources</p>
            </div>
            <div className="text-center">
              <span className="font-serif text-lg text-accent">&lt;300ms</span>
              <p className="font-sans text-[10px] text-primary-400 uppercase tracking-wider">Response</p>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Leaflet map */}
      <div className="flex-1 relative z-10">
        <div ref={mapRef} className="absolute inset-0" />

        {/* Map overlay gradient edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-primary-900/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-primary-900/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-primary-900/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-primary-900/30 to-transparent z-10 pointer-events-none" />

        {/* Active location label on map */}
        <motion.div
          key={parcel.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-primary-800/90 backdrop-blur-sm px-5 py-2.5 rounded-full border border-primary-600/30"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
            <span className="font-sans text-xs text-white font-medium">
              {parcel.address}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Right: data panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={parcel.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-[360px] bg-white flex flex-col z-20"
        >
          <div className="p-6 border-b border-surface-300">
            <div className="flex items-center justify-between">
              <p className="font-sans text-xs uppercase tracking-[0.08em] text-surface-500">
                Site Report
              </p>
              <span className="px-2.5 py-1 rounded-full bg-success/10 text-success font-sans text-[10px] font-medium uppercase tracking-wider">
                Live Data
              </span>
            </div>
            <h3 className="font-sans text-[15px] font-medium text-primary-900 mt-2">
              {parcel.address}
            </h3>
            <p className="font-sans text-xs text-surface-500 mt-1">
              {parcel.lot}
            </p>
          </div>

          <div className="flex-1 p-5 space-y-4 overflow-auto">
            {[
              { label: "Zoning", value: parcel.zone },
              { label: "FSR", value: parcel.fsr },
              { label: "Height Limit", value: parcel.height },
              { label: "Bushfire", value: parcel.bushfire },
              { label: "Heritage", value: parcel.heritage },
              { label: "Flood", value: parcel.flood },
            ].map((row, i) => {
              const status = riskStatus(row.value);
              const Icon = riskIcon(row.label);
              return (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className={`flex items-start gap-3 p-3 rounded-lg ${status.bg}`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${status.color}`} strokeWidth={1.5} />
                  <div className="min-w-0">
                    <p className="font-sans text-[11px] uppercase tracking-[0.06em] text-surface-500">
                      {row.label}
                    </p>
                    <p className={`font-sans text-sm font-medium mt-0.5 ${status.color}`}>
                      {row.value}
                    </p>
                  </div>
                  {status.status === "clear" && (
                    <ChevronRight className="w-3.5 h-3.5 text-success ml-auto mt-1 shrink-0" />
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="p-5 border-t border-surface-300">
            <button className="w-full py-3 rounded-full bg-primary-800 text-white font-sans text-sm hover:bg-primary-700 transition-colors">
              Generate Full Report →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
