# 1. Planning & Zoning

## 1.1 Zoning Classification and Permitted Uses 「API-AUTO」

**Why it matters:** Zoning determines what can/cannot be built. Prohibited use = deal breaker unless rezoning is pursued.

**Where to find:**
- **NSW**: ePlanning Spatial Viewer / LEP on legislation.nsw.gov.au / s10.7 certificate
- **VIC**: VicPlan / Planning Schemes Online

**API:**
- **NSW**: ePlanning Layer 19 → `SYM_CODE` (R3), `LAY_CLASS` (Medium Density Residential), `EPI_NAME`, `LGA_NAME`. ~137ms
  ```
  GET .../Planning_Portal_Principal_Planning/MapServer/19/query?geometry={lng},{lat}&geometryType=esriGeometryPoint&inSR=4326&outFields=*&returnGeometry=false&f=json
  ```
- **VIC**: WFS `open-data-platform:plan_zone` → `zone_code`, `zone_description`, `lga`

**Red flags:**
- Proposed use prohibited in zone (absolute deal breaker)
- Restrictive zone (SP1, RE1, E1) with no rezoning pathway
- Zone under review — uncertainty

**Cost:** $0 (API). s10.7 certificate: $53-$153 (NSW). VIC planning report: ~$55.

---

## 1.2 Floor Space Ratio (FSR) 「API-AUTO (NSW)」

**Why it matters:** FSR = Total GFA ÷ Site Area. The single most important number for development yield on apartment sites. FSR 2:1 on 1,000sqm = max 2,000sqm GFA.

**API:**
- **NSW**: ePlanning Layer 11 → `FSR` (numeric, e.g. 2.5), `LABEL`, `LEGIS_REF_CLAUSE`. ~138ms
- **VIC**: No direct FSR layer. DDO/ACZ schedules may specify — requires text parsing (MANUAL)

**Red flags:**
- FSR lower than expected for the zone
- "AC" labels indicating area-specific clause modifications
- No FSR mapped (low-density — yield governed by lot size + setbacks)
- Draft LEP amendment proposing FSR reduction

**Cost:** $0 (API). Town planner for bonus provisions: $500-$2,000.

---

## 1.3 Building Height Limits 「API-AUTO (NSW) / API-PARTIAL (VIC)」

**Why it matters:** Max height (metres/storeys) constrains building envelope. Combined with FSR and setbacks determines achievable yield.

**API:**
- **NSW**: ePlanning Layer 14 → `MAX_B_H`, `UNITS`, `LEGIS_REF_CLAUSE`. Note: some areas (Sydney CBD) controlled by SEPP, LEP layer may return empty.
- **VIC**: Zone-based defaults inferrable (NRZ=9m, GRZ=11m). DDO-specific heights require text parsing.

**Red flags:**
- Height limit inconsistent with FSR (can't achieve full FSR)
- Transitional height controls near heritage / low-density
- Solar access planes reducing effective height

**Cost:** $0 (API). Town planner analysis: $500-$2,000.

---

## 1.4 Minimum Lot Size 「API-AUTO (NSW) / API-PARTIAL (VIC)」

**Why it matters:** For subdivisions — determines max number of lots. 5,000sqm site with 450sqm minimum ≠ 700sqm minimum.

**API:**
- **NSW**: ePlanning Layer 22 → minimum lot size value
- **VIC**: Zone-based defaults inferrable. Schedule-specific overrides require text parsing.

**Red flags:**
- Larger than expected minimum
- Different minimums for dual occupancy vs subdivision
- No mapped minimum (subdivision may be prohibited)

**Cost:** $0 (API).

---

## 1.5 Planning Overlays 「API-AUTO」

**Why it matters:** Additional controls on top of zoning. Can compound constraints — e.g. HO + DDO + SBO = severely constrained.

**API:**
- **NSW**: Various ePlanning layers (Heritage L16, Flood L230, Bushfire L229, etc.)
- **VIC**: WFS `plan_overlay` → `scheme_code` (HO, DDO, BMO, LSIO), `zone_code` (HO541), `zone_description`

**Red flags:**
- Multiple stacking overlays
- BMO (bushfire) — triggers BAL, APZ up to 100m+
- ESO (environmental) — vegetation retention
- PAO (public acquisition) — government intends to acquire
- SLO (landscape) — strict design controls

**Cost:** $0 (API). Interpretation: $500-$3,000 (town planner).

---

## 1.6 SEPPs / State Policies 「API-PARTIAL」

**Why it matters:** State instruments override or supplement local controls. Can dramatically change permissible development.

Key SEPPs (NSW): Housing SEPP 2021, Low/Mid-Rise Housing reforms, TOD SEPP
Key VIC provisions: Clause 52.06 (parking), Clause 58 (apartment design)

**API:** Some SEPPs have spatial layers (EPI_TYPE: "SEPP"). Most are text-based requiring interpretation.

**Red flags:**
- SEPP may increase OR decrease development potential
- Transitional provisions for new SEPPs
- State policy direction signalling future tightening

**Cost:** $500-$3,000 (town planner analysis).

---

## 1.7 DCP Controls 「MANUAL (highest-value automation opportunity)」

**Why it matters:** Granular design rules that shape what's actually built: setbacks, parking rates, landscaping, building separation, acoustic, solar access. A site allowing 20 apartments by FSR may only yield 14 after DCP constraints.

**Data sources:** Council website PDFs. Each of NSW's 128 councils has its own DCP. VIC: ResCode (Clause 54/55/56) + Clause 58 + DDO schedules.

**No API available.** PropCode has digitised 1,000+ rules for some NSW councils. LLM extraction from PDFs is the most promising path.

**Red flags:**
- Large front setback on shallow lot
- High parking rate with no basement option
- 30%+ deep soil/landscaping requirement
- Heritage character mandating specific materials

**Cost:** $2,000-$10,000 (town planner DCP analysis).

---

## 1.8 Draft Amendments / Rezonings 「API-PARTIAL」

**Why it matters:** Planning controls change. Draft rezoning can dramatically increase OR destroy feasibility.

**Where to find:** NSW Planning Portal planning proposals tracker. VIC DELWP amendment tracking. Council websites.

**Red flags:**
- Draft amendment reducing height/FSR/density
- Heritage listing proposal
- Road widening / public acquisition proposal
- Competing developer rezoning nearby

**Cost:** $0-$500 (portal search + planner review).

---

## 1.9 Complying Development Eligibility 「HYBRID」

**Why it matters:** Fast-track approval (10-20 days via private certifier vs 3-12 months DA process). Saves time and planning risk. Requires site to be free of certain constraints.

**API:** Constraint screening (flood, heritage, bushfire) is API-automatable for eligibility indication. Full check needs DCP/SEPP standard compliance.

**Red flags:**
- Heritage, flood, bushfire, contamination = likely ineligible
- CDC may produce smaller/less profitable outcome than DA

**Cost:** $0 (automated screening) to $500-$2,000 (planner/certifier).
