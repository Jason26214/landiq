# Australian Land & Property Data Sources

## 1. Government Planning Portals by State

### New South Wales (NSW)
- **NSW Planning Portal** — https://www.planningportal.nsw.gov.au/
  - DA lodgement, planning certificates (s10.7), LEPs, DCPs
- **ePlanning Spatial Viewer** — https://www.planningportal.nsw.gov.au/spatialviewer/
  - Interactive map: zoning, lot boundaries, heritage, flood, acid sulfate soils, LEP/SEPP layers
- **NSW Legislation** — https://legislation.nsw.gov.au/
  - Authoritative source for all gazetted LEPs

### Victoria (VIC)
- **VicPlan** — https://mapshare.vic.gov.au/vicplan/
  - Official planning map: zones, overlays (heritage, environmental, bushfire, flood), links to planning scheme
- **Planning Schemes Online** — https://planning-schemes.app.planning.vic.gov.au/
  - Full text of every Victorian planning scheme

### Queensland (QLD)
- **QLD Planning Portal** — https://planning.statedevelopment.qld.gov.au/
  - DA lodgement, planning scheme search, mapping
- **QLD Globe** — https://qldglobe.information.qld.gov.au/
  - Cadastre, zoning, imagery, flood, vegetation, tenure layers
- **SPP Interactive Mapping** — https://spp.dsdip.esriaustraliaonline.com.au/geoviewer/map/planmaking
  - State Planning Policy layers: flood, bushfire, coastal hazard, agricultural land

### South Australia (SA)
- **PlanSA** — https://plan.sa.gov.au/
  - Single Planning and Design Code (replaced individual council plans), interactive mapping, DA lodgement
- **SA Location Browser (SAPPA)** — https://location.sa.gov.au/viewer/

### Western Australia (WA)
- **PlanWA** — https://www.wa.gov.au/service/planning/planning-application/lodging-a-development-application
- **WA Map Viewer (Landgate/SLIP)** — https://map-viewer-plus.app.landgate.wa.gov.au/
- **DPLH Planning Scheme Maps** — https://www.wa.gov.au/government/document-collections/local-planning-schemes

### Tasmania (TAS)
- **iPlan Tasmania** — https://iplan.tas.gov.au/
  - Tasmanian Planning Scheme viewer: zones, overlays
- **LIST Map** — https://maps.thelist.tas.gov.au/listmap/app/list/map
  - Cadastral, zoning, natural hazards, land tenure, imagery, contours. WMS/WFS available.

### Northern Territory (NT)
- **NT Planning Scheme** — https://nt.gov.au/property/building-and-development/planning-scheme-and-maps
- **NR Maps** — https://nrmaps.nt.gov.au/nrmaps.html

### Australian Capital Territory (ACT)
- **ACTmapi** — https://actmapi-actgov.opendata.arcgis.com/
- **Territory Plan Online** — https://www.planning.act.gov.au/planning-our-city/territory-plan

---

## 2. GIS and Mapping Platforms

### National Platforms

| Platform | URL | Notes |
|---|---|---|
| NationalMap | https://nationalmap.gov.au/ | Federal open data spatial viewer (TerriaJS) |
| Geoscience Australia | https://www.ga.gov.au/ | Elevation, geological maps, hazards. WMS/WFS |
| data.gov.au | https://data.gov.au/ | National open data portal |
| Geoscape (PSMA) | https://geoscape.com.au/ | G-NAF, cadastre, buildings, land parcels. Commercial license |
| G-NAF | https://data.gov.au/data/dataset/geocoded-national-address-file-g-naf | Open data. Every Australian address with coordinates. Updated quarterly |

### State GIS Platforms

| State | Platform | URL |
|---|---|---|
| NSW | Spatial Services / SEED | https://portal.spatial.nsw.gov.au/ / https://www.seed.nsw.gov.au/ |
| VIC | DataVic / Vicmap | https://www.data.vic.gov.au/ |
| QLD | QSpatial | https://qldspatial.information.qld.gov.au/ |
| SA | Location SA | https://data.sa.gov.au/ / https://location.sa.gov.au/ |
| WA | Landgate SLIP | https://www.landgate.wa.gov.au/slip/ |
| TAS | LIST | https://www.thelist.tas.gov.au/ |
| NT | NR Maps | https://nrmaps.nt.gov.au/ |
| ACT | ACTmapi | https://actmapi-actgov.opendata.arcgis.com/ |

### Common Protocols
All state GIS systems publish data via:
- **WMS** (Web Map Service) — raster tiles
- **WFS** (Web Feature Service) — vector features, queryable
- **WMTS** (Web Map Tile Service) — cached base map tiles
- **ArcGIS REST** — many states use Esri, returning JSON with spatial query support

---

## 3. Property Data APIs

### Commercial APIs

| Provider | URL | Offers |
|---|---|---|
| **CoreLogic** | https://www.corelogic.com.au/ | Valuations, sales history, ownership, demographics, risk data. Enterprise API only |
| **Domain** | https://developer.domain.com.au/ | Public REST API, free tier (~500 calls/day). Listings, sales results, suburb profiles |
| **PropTrack** | https://www.proptrack.com.au/ | AVMs, price estimates, market analytics. Commercial agreement required |
| **Pricefinder** | https://www.pricefinder.com.au/ | Property reports, sales history, comparables |
| **Landchecker** | https://www.landchecker.com.au/ | Aggregated planning data, zoning, overlays. SaaS product, no public API |
| **Nearmap** | https://www.nearmap.com/ | High-res aerial imagery, AI-derived datasets. Tile API available |

### Domain API (Most Accessible)
```
Base URL: https://api.domain.com.au/v1/
Auth: OAuth2 or API key
Key Endpoints:
  GET /listings/residential/_search
  GET /properties/{propertyId}
  GET /salesResults/{city}
  GET /suburbPerformanceStatistics
  GET /addressLocators
  GET /demographics
Rate: Free tier ~500 calls/day
Docs: https://developer.domain.com.au/docs/latest
```

### Government / Open APIs

| Source | URL | Notes |
|---|---|---|
| NSW Valuer General Sales Data | https://www.valuergeneral.nsw.gov.au/services/sales-data.htm | Bulk CSV, free, all NSW property sales |
| Geoscape APIs | https://geoscape.com.au/data/ | Geocoding, address verification, buildings, cadastre |
| G-NAF Linked Data API | https://gnafld.net/ | Address querying, fuzzy matching |

---

## 4. Zoning Data Structure

### NSW Zoning (Standard Instrument LEP)

| Code | Zone | Use |
|---|---|---|
| R1 | General Residential | Low-to-medium density |
| R2 | Low Density Residential | Detached houses |
| R3 | Medium Density Residential | Townhouses, apartments |
| R4 | High Density Residential | Apartments, towers |
| R5 | Large Lot Residential | Rural-residential |
| B1 | Neighbourhood Centre | Small shops |
| B2 | Local Centre | Larger retail |
| B3 | Commercial Core | CBDs |
| B4 | Mixed Use | Residential + commercial |
| IN1 | General Industrial | Factories, warehousing |
| IN2 | Light Industrial | Light manufacturing |
| SP1/SP2 | Special Activities / Infrastructure | Hospitals, roads |
| RE1/RE2 | Public / Private Recreation | Parks, golf courses |
| RU1-RU5 | Rural zones | Farming to villages |
| E1-E4 | Environmental zones | Conservation |

> Note: NSW is transitioning to new zone codes (Employment Zones reform)

### Victoria Zoning (VPP)
- Residential: GRZ, NRZ, RGZ, LDRZ, TZ
- Commercial: C1Z, C2Z, C3Z, ACZ
- Industrial: IN1Z, IN2Z, IN3Z
- Rural: FZ, RAZ, RLZ, GWZ
- Overlays modify permissions: HO, ESO, SLO, BMO, LSIO/SBO/FO, DDO, DPO

### Queensland
- No standardised zone names — each council defines its own
- Common patterns: Low/Medium/High Density Residential, Neighbourhood/District/Major Centre

### SA (Planning and Design Code)
- Standardised zones: General Neighbourhood, Suburban Neighbourhood, Housing Diversity Neighbourhood, etc.

### WA
- R-Codes define density (R20, R40, R80 = dwellings per hectare)
- Zones: Residential, Commercial, Mixed Use, Centre, Industrial, Rural

---

## 5. Land Title & Cadastral Systems

| State | Registry | URL | Format |
|---|---|---|---|
| NSW | NSW LRS | https://www.nswlrs.com.au/ | Lot/DP (e.g., "Lot 1 DP 123456") |
| VIC | Landata | https://www.landata.vic.gov.au/ | Lot/Plan (LP, PS, TP, CP) |
| QLD | Titles Queensland | https://www.titlesqld.com.au/ | Lot/Plan (RP, SP, BUP) |
| SA | Land Services SA | https://www.landservices.com.au/ | CT Volume/Folio |
| WA | Landgate | https://www.landgate.wa.gov.au/ | Lot on Plan/Diagram |
| TAS | Land Tasmania (LIST) | https://www.thelist.tas.gov.au/ | PID, Volume/Folio |
| NT | Land Titles Office NT | https://nt.gov.au/property/land-title-registration | Lot/Plan or Section/Hundred |
| ACT | ACT Land Titles | https://www.accesscanberra.act.gov.au/ | Block/Section/District |

### Cadastral Boundaries (Free/Open)
- NSW: `https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Cadastre/MapServer`
- VIC: Vicmap Property via DataVic
- TAS: LIST WFS
- National: Geoscape aggregated dataset (commercial)

---

## 6. Environmental & Constraint Data

### Flood Mapping

| State | Source | URL |
|---|---|---|
| NSW | NSW Flood Data Portal | https://flooddata.ses.nsw.gov.au/ |
| VIC | Melbourne Water / VicPlan overlays (LSIO, SBO, FO) | https://www.melbournewater.com.au/ |
| QLD | Floodcheck | https://floodcheck.information.qld.gov.au/ |
| SA | PlanSA overlays | https://plan.sa.gov.au/ |
| WA | DWER flood mapping | https://www.water.wa.gov.au/ |

### Bushfire Risk

| State | Source | URL |
|---|---|---|
| NSW | RFS Bush Fire Prone Land Map | https://www.rfs.nsw.gov.au/ |
| VIC | BMO overlay on VicPlan | DataVic download |
| QLD | SPP Bushfire Hazard mapping | SPP IMS |
| WA | DFES Map | https://www.dfes.wa.gov.au/ |

### Contaminated Land

| State | Source | URL |
|---|---|---|
| NSW | EPA CLR | https://www.epa.nsw.gov.au/your-environment/contaminated-land |
| VIC | EPA Priority Sites | https://www.epa.vic.gov.au/ |
| QLD | EMR / CLR | https://www.qld.gov.au/environment/management/environmental/contaminated-land |
| SA | EPA Site Contamination Index | https://www.epa.sa.gov.au/ |
| WA | DWER Database | https://www.der.wa.gov.au/your-environment/contaminated-sites |

### Heritage

| Scope | Source | URL |
|---|---|---|
| National | Australian Heritage Database | https://www.dcceew.gov.au/parks-heritage/heritage/heritage-lists |
| NSW | State Heritage Register | https://www.environment.nsw.gov.au/topics/heritage |
| VIC | Victorian Heritage Database | https://vhd.heritagecouncil.vic.gov.au/ |
| QLD | Queensland Heritage Register | https://apps.des.qld.gov.au/heritage-register/ |

### Other Environmental
- **Biodiversity**: EPBC Protected Matters Search Tool — https://www.dcceew.gov.au/environment/epbc/protected-matters-search-tool
- **Acid Sulfate Soils**: Mapped in LEPs/planning schemes
- **Mine Subsidence (NSW)**: https://www.subsidenceadvisory.nsw.gov.au/

---

## 7. Infrastructure Data

### Water & Sewer

| Region | Utility | URL |
|---|---|---|
| Sydney | Sydney Water ("Tap in" for plan searches) | https://www.sydneywater.com.au/ |
| Melbourne | Melbourne Water + retail corps | https://www.melbournewater.com.au/ |
| Brisbane | Urban Utilities | https://urbanutilities.com.au/ |
| SA | SA Water | https://www.sawater.com.au/ |
| WA | Water Corporation | https://www.watercorporation.com.au/ |
| TAS | TasWater | https://www.taswater.com.au/ |

### Electricity

| Region | Providers |
|---|---|
| NSW | Ausgrid, Endeavour Energy, Essential Energy |
| VIC | AusNet, CitiPower, Powercor, Jemena, United Energy |
| QLD | Energex, Ergon |
| SA | SA Power Networks |
| WA | Western Power |

### Transport (Open Data / GTFS)
- **Transport for NSW** — https://opendata.transport.nsw.gov.au/
- **PTV VIC** — https://www.ptv.vic.gov.au/footer/data-and-reporting/datasets/
- **TransLink QLD** — https://translink.com.au/about-translink/open-data

### Telecommunications
- **NBN Co** — https://www.nbnco.com.au/connect-home-or-business/check-your-address

---

## 8. Platform Building Strategy

### Recommended Data Integration Priority

1. **Free/Open data first**: G-NAF (addresses), state cadastral WFS (lot boundaries), state planning portals (zoning)
2. **OGC WFS endpoints**: All states publish zoning/cadastral data via WFS — build per-state adapters
3. **Domain API**: Most accessible commercial API with free tier — listings, sales, suburb stats
4. **CoreLogic**: Industry standard for valuations/sales history — enterprise agreement needed
5. **Geoscape**: National normalised view of addresses, cadastre, buildings — commercial license
6. **Environmental/constraint data**: No single national source — integrate per-state (flood, bushfire, heritage, contamination)
7. **DCP/detailed planning controls**: Mostly PDFs — hardest to digitise, consider LLM extraction
