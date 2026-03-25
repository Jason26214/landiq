# 8. Market Analysis

## 8.1 Comparable Sales 「API-PAID / API-PARTIAL」

**Why it matters:** Evidence base for GRV and land price. "Comparable" = similar location, zoning, size, product, quality.

**Sources:** CoreLogic (paid, most comprehensive), Domain API (free tier), NSW VG sales data (free bulk), council DA records, agents.

**Cost:** $0-$299/month.

---

## 8.2 Supply/Demand 「API-PARTIAL」

**Key indicators:** Vacancy rates, stock on market, absorption rates, upcoming supply (DA-approved but unbuilt), demand drivers.

**Sources:** Domain/REA, SQM Research, ABS dwelling approvals, council DA trackers, market reports (JLL, CBRE, Knight Frank).

---

## 8.3 Days on Market 「API-PAID」

**Why it matters:** <30 days = strong demand. >90 days = oversupply/declining.

**API:** Domain API `suburbPerformanceStatistics`, CoreLogic suburb reports.

---

## 8.4 Rental Yields 「API-PAID」

**Why it matters:** Higher yields attract investor buyers (supporting off-the-plan sales).

**Formula:** Gross yield = annual rent ÷ purchase price.

---

## 8.5 Population Growth / Demographics 「API-PARTIAL」

**Why it matters:** Growth drives demand. Demographics determine product mix.

**Sources:** ABS Census (abs.gov.au), .id community profiles (profile.id.com.au), state population projections. ABS.Stat has data API.

---

## 8.6 Infrastructure Projects Nearby 「MANUAL」

**Why it matters:** New rail, motorway, hospital, school = property value uplift.

**Sources:** Infrastructure Australia, Infrastructure NSW/VIC, federal/state budget papers, council strategic plans.

---

## 8.7 Competing Developments 「API-PARTIAL」

**Why it matters:** Oversupply risk from simultaneous competing projects.

**Sources:** Council DA registers, Cordell/BCI (paid), Archistar/Landchecker DA tracking, physical observation.

**Cost:** $0 (manual) to $95-$595/month (subscription).
