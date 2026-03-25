# 7. Financial

## 7.1 Land Value / Purchase Price 「API-PAID」

**Why it matters:** Typically 20-40% of total development cost. RLV analysis determines max justifiable price.

**API:** CoreLogic (~$10k+/year), Domain API (free tier 500/day), NSW Valuer General (free bulk data).

**Red flags:** Price exceeds RLV, based on potential rezoning not yet occurred, vendor expectations inflated.

**Cost:** $0-$299/month (subscription). Valuation: $3,000-$10,000.

---

## 7.2 Stamp Duty 「API-AUTO (calculable)」

**Why it matters:** 4-5.5% of purchase price. Sunk cost. Foreign buyer surcharge: +8% (NSW/VIC).

**Formula:** Published by Revenue NSW / SRO VIC. Easily automatable. Updated annually.

---

## 7.3 Development Contributions 「HYBRID」

**Why it matters:**
- NSW s7.11: typically $20,000-$50,000/dwelling in Sydney (up to $80k+ greenfield)
- NSW s7.12: flat % of construction cost (up to 1%)
- VIC ICP/DCP: $50,000-$100,000+/lot in greenfield growth areas

**Where to find:** Council contributions plan (PDF). s10.7 certificate identifies applicable plan.

**Red flags:** >$50k/dwelling, plan under review (rates may increase), SICs in growth areas.

---

## 7.4 Headworks Charges 「HYBRID」

**Why it matters:** Utility charges for trunk infrastructure. Greenfield: $30k-$80k+/lot combined (water + sewer + electricity).

**Red flags:** Charges exceeding budget, new substation requirement ($500k-$2M+).

---

## 7.5 Holding Costs 「API-AUTO (calculable)」

**Components:** Council rates ($2k-$20k+/year), land tax (1.6%+ above threshold), insurance, land finance interest (6-10% pa).

**Key insight:** Time-dependent. $5M purchase at 8% = $400k/year interest. Every month of delay increases cost.

**Red flags:** Extended timeline consuming profit, foreign owner surcharges (2-4%), rising interest rates.

---

## 7.6 Construction Cost Estimates 「API-PARTIAL」

**Benchmarks (March 2026):**
| Type | $/sqm |
|------|-------|
| Houses | $2,000-$3,500 |
| Townhouses | $2,500-$4,000 |
| Walk-up apartments (3-4 storey) | $3,000-$4,500 |
| Mid-rise apartments (5-8 storey) | $3,500-$5,500 |
| High-rise apartments (9+) | $4,500-$7,000+ |
| Civil works (subdivision) | $50,000-$150,000+/lot |
| Basement parking | $40,000-$80,000/space |

**Cost:** QS estimate: $3,000-$20,000.

---

## 7.7 GRV and Comparable Sales 「API-PAID」

**Why it matters:** GRV = total expected revenue. Overestimating GRV is #1 cause of development failure.

**API:** CoreLogic (enterprise), Domain API (free tier limited), NSW VG sales (free bulk CSV).

**Red flags:** Limited comparables, peak-market assumptions, declining trend, off-the-plan discount (5-15%).

---

## 7.8 Development Margin 「API-PARTIAL」

**Formula:** Margin = (GRV - TDC) / TDC × 100

**Industry benchmarks:**
| Risk | Target Margin |
|------|--------------|
| Standard residential | 15-20% on cost |
| High-risk (rezoning, complex) | 20-25%+ |
| Low-risk (CDC, strong market) | 12-15% |

**Related:** RLV = GRV - all costs - target profit. ROE target: 25-40%+. IRR target: 20-30%+.

**Red flags:** <15% margin, only viable at market peak, negative at 5-10% adverse movement.
