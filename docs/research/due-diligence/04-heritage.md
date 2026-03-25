# 4. Heritage

## 4.1 Local Heritage Items 「API-AUTO」

**Why it matters:** Heritage-listed buildings/places require heritage impact assessment and council approval. Demolition generally prohibited. Development nearby must be "sympathetic".

**API:**
- **NSW**: ePlanning L16 → `H_ID`, `H_NAME`, `SIG` (Local/State), `LAY_CLASS` (Item/Conservation Area). ~133ms
- **VIC**: WFS `plan_overlay` filter `scheme_code='HO'` → overlay schedule number

**Red flags:** Site IS a heritage item, within Heritage Conservation Area, adjacent to heritage item, State significance (Heritage Council referral).

**Cost:** $0 (API). Heritage impact statement: $5,000-$20,000. Heritage architect: $10,000-$50,000+.

---

## 4.2 State Heritage Register 「API-AUTO (NSW) / HYBRID」

**Why it matters:** Highest state-level protection. Heritage Council must approve all works (Section 60 application in NSW). Can refuse.

**API:**
- **NSW**: ePlanning L221 → `ITEMNAME`, `ADDRESS`, `LGA`, `LISTING_DATE`
- **VIC**: Victorian Heritage Database (web-searchable, no confirmed API)

**Red flags:** Site IS a State Heritage item (extremely constrained), within curtilage, CMP requires retention conflicting with proposal.

**Cost:** $0 (API/database). Heritage assessment for state heritage: $10,000-$30,000.

---

## 4.3 Aboriginal Heritage (AHIMS) 「HYBRID」

**Why it matters:** Offence to harm Aboriginal objects/places, even if unregistered. AHIMS search reveals known sites. VIC requires CHMP for certain activities.

**Where to find:**
- NSW: AHIMS search (environment.nsw.gov.au) — $0 basic / $58 extensive
- VIC: Aboriginal Victoria, VAHR, cultural heritage sensitivity mapping

**Red flags:** Known Aboriginal sites on/near site, high sensitivity area (waterways, elevated land, sandstone overhangs), discovery during construction = stop-work.

**Cost:** AHIMS: $0-$58. Due diligence assessment: $5,000-$15,000. CHMP (VIC): $20,000-$80,000.

---

## 4.4 Archaeological Significance 「MANUAL」

**Why it matters:** Sites with potential archaeological deposits may require investigation before development. Both Aboriginal and historical (European).

**Red flags:** Known deposits, early colonial settlement area, heritage consultant recommends excavation.

**Cost:** Desktop assessment: $3,000-$10,000. Excavation: $20,000-$100,000. Salvage: $50,000-$500,000+.
