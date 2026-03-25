# 3. Environmental & Physical

## 3.1 Flood Risk 「API-PARTIAL」

**Why it matters:** 1% AEP (Annual Exceedance Probability) is standard planning level. Flood planning level = 1% AEP + 0.5m freeboard. Can require raised floors, restrict basements, limit density, or prohibit development.

**API:**
- **NSW**: ePlanning Hazard L230 (free, no auth) — but **coverage incomplete** (depends on council digitisation)
- **VIC**: WFS `plan_overlay` filter LSIO/SBO/FO (free). `vic_flood_history_public` for historical extents.
- Detailed flood levels (depth, velocity, PMF) require council flood studies — not via API.

**Red flags:** Site in floodway (FO = prohibited), high-hazard area, 1% AEP >2m above ground, no flood study available (developer may need to fund $50k-$200k+), flood-affected access road.

**Cost:** $0 (API screening). Flood certificate: $50-$200. Hydraulic assessment: $5,000-$30,000.

---

## 3.2 Bushfire Prone Land 「API-AUTO (screening) / HYBRID (full)」

**Why it matters:** BAL ratings (LOW to FLO/Flame Zone). APZ setbacks 10-100m+ from vegetation. Construction cost increase 5-30%.

**API:**
- **NSW**: ePlanning Hazard L229 → vegetation category (1,2,3), guideline version. ~150-230ms
- **VIC**: WFS `plan_overlay` (BMO) + `bushfire_prone_area`
- Full BAL assessment requires site-specific analysis by consultant.

**Red flags:** BAL-40/FLO (extreme cost, potential prohibition), APZ consuming most of site, Category 1 on steep upslope, RFS objection history.

**Cost:** $0 (API). BAL assessment: $2,000-$10,000. BAL construction premium: 5-30%.

---

## 3.3 Contaminated Land 「HYBRID」

**Why it matters:** Staged investigation: Phase 1 PSI (desktop) → Phase 2 DSI (sampling) → RAP (remediation plan) → Site Audit. Remediation can cost $100k-$10M+.

**Where to find:** EPA CLR/Priority Sites (free search), s10.7 certificate, historical aerials, council records.

**Red flags:** On EPA register, former petrol station/dry cleaner/factory/tannery/landfill/orchard, fill of unknown origin, underground storage tanks, asbestos.

**Cost:** Phase 1 PSI: $5,000-$15,000. Phase 2 DSI: $15,000-$100,000+. Remediation: $100k-$10M+.

---

## 3.4 Acid Sulfate Soils 「API-AUTO (NSW)」

**Why it matters:** Iron sulfides when exposed to air produce sulfuric acid. Common in coastal/estuarine/low-lying areas (<5m AHD). Classes 1-5.

**API:** NSW ePlanning ASS layer → returns ASS class. VIC limited.

**Red flags:** Class 1-2 with deep excavation planned, proximity to sensitive waterways.

**Cost:** $0 (API). ASS management plan: $5,000-$15,000. Treatment: $20-$60/tonne.

---

## 3.5 Biodiversity / Threatened Species 「HYBRID」

**Why it matters:** Biodiversity offsets can cost $50,000-$500,000+. EPBC referral adds 4-12+ months.

**Where to find:** EPBC Protected Matters Search Tool (free), NSW BioNet/Biodiversity Values Map, VIC ESO/VPO overlays.

**Red flags:** Endangered ecological community, koala habitat, BDAR required, large offset credit requirement.

**Cost:** $0 (database search). Ecological assessment: $3,000-$30,000. Offsets: $50,000-$500,000+.

---

## 3.6 Riparian Corridors / Waterways 「API-PARTIAL」

**Why it matters:** Setbacks from waterways 10m-40m+ per side. Land effectively undevelopable.

**API:** NSW Water Feature layers (L2, L3). Specific setback requirements in DCPs (not API).

**Red flags:** Major waterway requiring 40m+ corridor, consuming >20% of site.

**Cost:** $0 (screening). Riparian assessment: $3,000-$10,000.

---

## 3.7 Trees 「MANUAL」

**Why it matters:** TPZ = 12 × trunk diameter. Single large tree with 6m TPZ sterilises significant area. Heritage/significant trees cannot be removed.

**How to find:** Arborist report. VIC VPO overlay via WFS. Aerial imagery (Nearmap).

**Red flags:** Large trees in centre of site, heritage-listed trees, strict council tree preservation (e.g. Ku-ring-gai, Willoughby).

**Cost:** Arborist: $2,000-$8,000. Tree bonds: $5,000-$50,000+ per tree.

---

## 3.8 Geotechnical Conditions 「HYBRID」

**Why it matters:** Affects foundation design, excavation cost, basement feasibility. Rock excavation: $200-$500/m³ vs soil $20-$50/m³.

**API:** Geoscience Australia WMS/WFS (broad scale). Actual conditions require boreholes.

**Red flags:** Shallow rock, high water table (<2m), reactive clay (Class P/E), uncontrolled fill, steep site (>15%).

**Cost:** Desktop review: $500-$1,500. Geotech investigation: $3,000-$15,000.

---

## 3.9 Mine Subsidence 「API-PARTIAL」

**Why it matters:** Historical/active underground mining → ground subsidence. NSW: Subsidence Advisory manages mine subsidence districts.

**Red flags:** Within mine subsidence district, active longwall mining beneath site.

**Cost:** $0 (register check). Subsidence assessment: $3,000-$10,000.

---

## 3.10 Coastal Erosion / Hazards 「API-PARTIAL」

**Why it matters:** Erosion, inundation (sea level rise + storm surge), cliff collapse. Land seaward of hazard line may be undevelopable.

**API:** VIC LSIO overlay for coastal inundation. NSW coastal management maps via planning portal.

**Red flags:** Within coastal erosion hazard zone, projected sea level rise inundating site, active cliff erosion, insurance unavailability.

**Cost:** $0 (screening). Coastal hazard assessment: $10,000-$50,000.
