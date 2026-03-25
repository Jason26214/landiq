# 2. Title & Legal

## 2.1 Certificate of Title 「API-PAID」

**Why it matters:** Confirms legal ownership, lot description (Lot/DP), and all registered interests (mortgages, easements, covenants, caveats).

**Where to find:**
- NSW: NSW LRS (nswlrs.com.au) — $16.80/title
- VIC: Landata (landata.vic.gov.au) — $33.80/title

**API:** Paid per-search. Free cadastral boundaries available via NSW Spatial Services L8 and VIC WFS `parcel_view`.

**Red flags:** Multiple owners, unregistered boundaries, old system/qualified title, strata when freehold expected.

**Cost:** $16.80-$33.80/title + solicitor $500-$2,000.

---

## 2.2 Easements 「API-PARTIAL」

**Why it matters:** Grant rights to third parties (utilities, neighbours). Restrict building within easement corridor. Can sterilise significant area.

**API:**
- NSW: Spatial Services L9 (easement boundaries, free) — spatial extent only, not type/beneficiary
- Full details require title search + plan review

**Red flags:** Wide easement (>3m) through centre, high-voltage lines, right of way that can't be relocated, multiple easements fragmenting buildable area.

**Cost:** Included in title search. Relocation: $5,000-$50,000+.

---

## 2.3 Restrictive Covenants 「MANUAL」

**Why it matters:** Private agreements on title restricting use/development. E.g. "single dwelling only", "brick only", "no subdivision". Require beneficiary consent to modify.

**No API.** Text-based legal instruments on title. LLM analysis of covenant text is a potential automation opportunity.

**Red flags:** Single dwelling covenant on multi-dwelling purchase, active neighbour as beneficiary, recent covenant (hard to argue obsolescence).

**Cost:** $16.80-$33.80 (search). Extinguishment: $5,000-$50,000+ (Supreme Court if contested).

---

## 2.4 Caveats 「API-PAID」

**Why it matters:** Notice that someone claims interest in the land. Prevents dealing without caveator consent. Must be resolved before settlement.

**Red flags:** Any caveat — must be removed. Prior purchase agreement/option. Creditor caveat (financial distress).

**Cost:** Included in title search. Solicitor for withdrawal: $1,000-$10,000+.

---

## 2.5 Native Title 「HYBRID」

**Why it matters:** Aboriginal/TSI rights in land. Most relevant for greenfield/broadacre, generally extinguished on urban freehold.

**Where to find:** National Native Title Tribunal (nntt.gov.au) — free searchable spatial database.

**Red flags:** Active claim, Crown land, no existing ILUA where required.

**Cost:** $0 (NNTT search). Legal advice: $1,000-$10,000. ILUA negotiation: $50,000-$500,000+.

---

## 2.6 Crown Land / Road Reservations 「API-PARTIAL」

**Why it matters:** Crown land cannot be normally purchased. Road reservations may require land dedication for widening.

**API:** Cadastral data shows road corridors. NSW Spatial Services L5 (Road Corridor), L6 (Road). Crown status needs title/tenure search.

**Red flags:** Road widening affecting frontage, Crown land within development footprint, PAO overlay (VIC).

**Cost:** $0-$50 (cadastral/title search).

---

## 2.7 Encroachments 「MANUAL」

**Why it matters:** Structures crossing boundary lines. Affects buildable area and creates legal disputes.

**How to find:** Detail/feature survey (definitive). Site inspection. Historical aerial imagery.

**Red flags:** Neighbour's substantial structure over boundary, disputed boundary location.

**Cost:** Included in detail survey ($3,000-$20,000). Legal resolution: $5,000-$50,000+.

---

## 2.8 Section 10.7 Planning Certificate 「MANUAL (ordering) / API-PARTIAL (contents)」

**Why it matters:** Definitive legal summary of ALL planning controls on a parcel. s10.7(2) basic ~$53, s10.7(5) comprehensive ~$153. Must always be obtained for serious acquisition.

**Key insight:** Most s10.7 information CAN be assembled from free APIs (zoning, FSR, height, heritage, bushfire, flood) — **core LandIQ automation opportunity**. But certificate includes council-specific items not in APIs.

**Red flags:** Contamination notice, land acquisition notation, discrepancies with API data.

**Cost:** $53-$153 per lot (NSW). ~$55 (VIC).

---

## 2.9 Contamination Notices on Title 「HYBRID」

**Why it matters:** "Significantly contaminated" land requires mandatory investigation and potentially remediation ($500k-$10M+).

**Where to find:** s10.7 certificate (mandatory disclosure), EPA CLR/Priority Sites Register (free public search).

**Red flags:** Listed on EPA register, former petrol station/dry cleaner/factory/landfill, neighbouring contaminated site.

**Cost:** $0 (EPA search). Phase 1 PSI: $5,000-$15,000. Remediation: $100k-$10M+.
