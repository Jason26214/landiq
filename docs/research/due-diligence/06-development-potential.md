# 6. Development Potential

## 6.1 Maximum GFA Calculation 「API-PARTIAL」

**Formula:** Max GFA = Site Area × FSR. Actual achievable typically 5-15% less (architectural inefficiency, setbacks).

**API:** FSR (NSW L11) + site area (cadastre L8) = calculation trivial. Without FSR: needs setback data (DCP, not API).

**Cost:** $0 (calculation). Architect massing study: $5,000-$20,000.

---

## 6.2 Dwelling Yield Estimation 「API-PARTIAL」

**Methods:**
- **Apartments**: GFA ÷ avg apartment size. Saleable = GFA × efficiency (75-85%)
- **Townhouses**: Site ÷ min lot size per dwelling, or 6-7m wide lots × frontage
- **Subdivision**: Net developable (gross - 25-35% roads/open space) ÷ avg lot size

**API:** Basic yield from FSR/GFA is automatable. Detailed yield (mix, setbacks, parking, solar) requires design.

**Red flags:** Yield below breakeven at asking price, minimum apartment sizes (NSW ADG: 50sqm studio, 70sqm 2-bed, 90sqm 3-bed), parking consuming GFA.

**Cost:** $0-$500 (quick estimate). Architect test-fit: $5,000-$20,000.

---

## 6.3 Site Coverage 「MANUAL」

**Typical limits:** 40-60% residential, 80-100% commercial. VIC ResCode garden area 25-35%.

---

## 6.4 Setback Analysis 「MANUAL (highest-value automation target)」

**Why it matters:** Front, side, rear setbacks define building envelope. Upper floor setbacks reduce floor area. Combined with lot shape = actual footprint.

**Sources:** DCP (NSW), ResCode Clause 54/55 (VIC), ADG, DDO schedules. **Not API-accessible.** Once digitised → readily automatable.

**Red flags:** Large front setback on shallow lot, upper floor setbacks, side setbacks increasing with height.

---

## 6.5 Parking Requirements 「MANUAL / API-PARTIAL (VIC)」

**Why it matters:** Basement parking costs $40,000-$80,000/space. Typical: 1 per 1-bed, 1.5 per 2-bed, 2 per 3-bed + visitor.

VIC Clause 52.06 is standardised (partially automatable). NSW is DCP-dependent.

---

## 6.6-6.8 Open Space, Solar Access, Privacy 「MANUAL」

- **Open space**: 7-10% dedication for 20+ lot subdivisions
- **Solar access**: 2+ hours sun at winter solstice (ADG: 70% of apartments). Requires 3D modelling.
- **Privacy**: Minimum separation distances, screening requirements

**Red flags:** South-facing site (solar access extremely difficult), narrow lot between towers.

**Cost:** Included in architect test-fit ($5,000-$20,000).
