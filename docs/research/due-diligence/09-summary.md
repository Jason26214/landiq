# 9. Summary: Automation & API Reference

## Fully Automatable via Free API (API-AUTO)

| Item | NSW Source | VIC Source |
|------|-----------|-----------|
| Zoning | ePlanning L19 | WFS plan_zone |
| FSR | ePlanning L11 | N/A |
| Height | ePlanning L14 | Zone defaults |
| Minimum lot size | ePlanning L22 | Zone defaults |
| Overlays | ePlanning various | WFS plan_overlay |
| Local heritage | ePlanning L16 | WFS plan_overlay (HO) |
| State heritage | ePlanning L221 | Victorian Heritage Database |
| Bushfire | ePlanning Hazard L229 | WFS bushfire_prone_area |
| Flood (partial) | ePlanning Hazard L230 | WFS plan_overlay (LSIO/SBO/FO) |
| Acid sulfate soils | ePlanning ASS layer | Limited |
| Cadastre | Spatial Services L8 | WFS parcel_view |
| Easement boundaries | Spatial Services L9 | WFS (limited) |
| Public transport | TfNSW GTFS | PTV GTFS |
| Stamp duty | Published formula | Published formula |
| Land tax | Published formula | Published formula |
| Holding costs | Published rates | Published rates |

## Partially Automatable (HYBRID / API-PARTIAL)

| Item | Gap |
|------|-----|
| SEPPs / state policies | Text-based interpretation |
| Draft amendments | No API, monitoring needed |
| CDC eligibility | Full standard check manual |
| Contamination risk | Site investigation manual |
| Biodiversity | Field survey manual |
| Flood (detailed) | Council flood study levels |
| Comparable sales | CoreLogic paid |
| Market data | Interpretation manual |
| Contributions | Council-specific |
| GFA/yield | Design-constrained |
| Construction costs | Site-specific factors |

## Manual Only

| Item | Reason |
|------|--------|
| DCP controls (setbacks, parking) | PDFs, council-specific |
| Full title review | Paid + legal interpretation |
| Covenants | Legal instrument analysis |
| Encroachments | Physical survey |
| Geotechnical | Boreholes required |
| Contamination Phase 2 | Soil sampling |
| Aboriginal heritage | Community consultation |
| All utilities capacity | Utility application |
| Traffic/access | Engineer assessment |
| Trees | Arborist inspection |
| Solar/shadow | 3D modelling |

---

## Key NSW ePlanning API Endpoints

```
Planning Controls:
https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning/Planning_Portal_Principal_Planning/MapServer
  Layer 11  — FSR
  Layer 14  — Height of Buildings
  Layer 16  — Heritage (Local)
  Layer 19  — Land Zoning
  Layer 22  — Lot Size
  Layer 221 — State Heritage Curtilage

Hazards:
https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning/Planning_Portal_Hazard/MapServer
  Layer 229 — Bushfire Prone Land
  Layer 230 — Flood Planning
  Layer 232 — Landslide Risk

Cadastre:
https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Land_Parcel_Property_Theme/FeatureServer
  Layer 8  — Lot (boundaries)
  Layer 9  — Easement
  Layer 12 — Property

All: No auth. Accept inSR=4326. Use /query with esriGeometryPoint.
```

## Key VIC WFS Endpoints

```
Base: https://opendata.maps.vic.gov.au/geoserver/wfs

Layers:
  open-data-platform:plan_zone          — Zoning
  open-data-platform:plan_overlay       — Overlays (HO, DDO, BMO, LSIO, SBO...)
  open-data-platform:parcel_view        — Cadastral parcels
  open-data-platform:bushfire_prone_area — Bushfire
  open-data-platform:vic_flood_history_public — Historical floods

All: No auth. CRS: EPSG:7844 (GDA2020). Use BBOX queries.
```

## Additional Government Data Sources

| Data | Source | URL | Cost |
|------|--------|-----|------|
| NSW Sales | Valuer General | valuation.property.nsw.gov.au | Free |
| NSW Contamination | EPA CLR | epa.nsw.gov.au | Free |
| VIC Contamination | EPA VIC | epa.vic.gov.au | Free |
| Aboriginal Heritage (NSW) | AHIMS | environment.nsw.gov.au | $0-$58 |
| EPBC Protected Matters | DCCEEW | dcceew.gov.au | Free |
| National Heritage | DCCEEW | dcceew.gov.au | Free |
| Mine Subsidence (NSW) | Subsidence Advisory | subsidenceadvisory.nsw.gov.au | Free |
| NBN Availability | NBN Co | nbnco.com.au | Free |
| Transport (NSW) | TfNSW GTFS | opendata.transport.nsw.gov.au | Free |
| Transport (VIC) | PTV GTFS | ptv.vic.gov.au | Free |
| Addresses | G-NAF | data.gov.au | Free |
| Geological Maps | Geoscience Australia | ga.gov.au | Free |

## Due Diligence Cost Summary

| Phase | Time | Cost |
|-------|------|------|
| Phase 1: Desktop (API + title) | 1-3 days | $70-$300 |
| Phase 2: Detailed (standard) | 6-12 weeks | $30k-$80k |
| Phase 2: Detailed (complex) | 3-6 months | $80k-$250k+ |
