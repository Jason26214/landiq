# VIC & National Open Data API Testing Results

**Date tested:** 2026-03-24
**Test point:** Melbourne CBD -- lat -37.8136, lng 144.9631

---

## 1. VIC Planning/Zoning GIS (WFS)

| Item | Detail |
|------|--------|
| **Endpoint** | `https://opendata.maps.vic.gov.au/geoserver/wfs` |
| **Protocol** | OGC WFS 2.0.0 (also supports WMS) |
| **Layer name** | `open-data-platform:plan_zone` |
| **Namespace** | `open-data-platform` (NOT `datavic`) |
| **Auth required** | None -- fully open, no API key |
| **Status** | WORKING -- HTTP 200, returns GeoJSON |
| **Query method** | BBOX parameter works reliably. CQL_FILTER with `INTERSECTS(geom, POINT(...))` returns empty results due to CRS axis-order issues. Use BBOX instead. |
| **Output format** | `outputFormat=application/json` returns GeoJSON FeatureCollection |
| **Geometry field** | `geom` (MultiSurface / MultiPolygon) |
| **CRS** | EPSG:7844 (GDA2020) |
| **Total zones in dataset** | 51,384 features |

### Data returned for Melbourne CBD (bbox -37.815,144.960,-37.812,144.966)

| zone_code | zone_description | LGA |
|-----------|-----------------|-----|
| CCZ1 | Capital City Zone - Schedule 1 | Melbourne |
| CCZ2 | Capital City Zone - Schedule 2 | Melbourne |
| TRZ2 | Transport Zone 2 - Principal Road Network | Melbourne |

### Key fields

`pfi`, `scheme_code`, `lga_code`, `lga`, `zone_num`, `zone_status`, `zone_code`, `zone_description`, `gaz_begin_date`, `pfi_created`, `ufi`, `ufi_created`, `geom`

### Working curl example

```bash
curl "https://opendata.maps.vic.gov.au/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=open-data-platform:plan_zone&outputFormat=application/json&count=5&propertyName=pfi,zone_code,zone_description,lga&bbox=-37.815,144.960,-37.812,144.966"
```

---

## 2. VIC Planning Overlays (WFS)

| Item | Detail |
|------|--------|
| **Endpoint** | `https://opendata.maps.vic.gov.au/geoserver/wfs` |
| **Layer name** | `open-data-platform:plan_overlay` |
| **Auth required** | None |
| **Status** | WORKING -- HTTP 200, returns GeoJSON |
| **Query method** | BBOX parameter. Filter by `zone_code` or `scheme_code` via CQL_FILTER for specific overlay types. |
| **Total overlays in CBD area** | 570 features in bbox (-37.82,144.95 to -37.81,144.97) |

### Overlay types found in Melbourne CBD

| scheme_code | Example zone_code | Description |
|-------------|-------------------|-------------|
| DDO | DDO40, DDO56 | Design and Development Overlay |
| DPO | DPO5 | Development Plan Overlay |
| HO | HO541, HO611 | Heritage Overlay |
| PAO | PAO5 | Public Acquisition Overlay |
| SBO | SBO3 | Special Building Overlay |

### Key fields

Same schema as plan_zone: `pfi`, `scheme_code`, `lga_code`, `lga`, `zone_num`, `zone_status`, `zone_code`, `zone_description`, `gaz_begin_date`, `pfi_created`, `ufi`, `ufi_created`, `geom`

### Bushfire (BMO), Flood (LSIO), Heritage (HO)

- **BMO (Bushfire Management Overlay):** Not present at Melbourne CBD (expected -- urban area). Query with `CQL_FILTER=zone_code LIKE 'BMO%'` for regional areas.
- **LSIO (Land Subject to Inundation Overlay):** Not present at test point. Available in dataset via same CQL filter.
- **SBO (Special Building Overlay):** FOUND at CBD -- SBO3 (flood-related overlay for Melbourne).
- **HO (Heritage Overlay):** FOUND at CBD -- HO541, HO611 among others.

### Additional overlay/hazard layers

| Layer | Description |
|-------|-------------|
| `open-data-platform:bushfire_prone_area` | Bushfire prone areas (separate from BMO planning overlay) |
| `open-data-platform:vic_flood_history_public` | Historical flood extent data |

### Working curl example

```bash
# All overlays in a bbox
curl "https://opendata.maps.vic.gov.au/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=open-data-platform:plan_overlay&outputFormat=application/json&count=10&propertyName=zone_code,zone_description,scheme_code&bbox=-37.82,144.95,-37.81,144.97"

# Filter for Heritage Overlay only
curl "https://opendata.maps.vic.gov.au/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=open-data-platform:plan_overlay&outputFormat=application/json&count=10&CQL_FILTER=scheme_code='HO'%20AND%20BBOX(geom,-37.82,144.95,-37.81,144.97)"
```

---

## 3. VIC Cadastre (WFS)

| Item | Detail |
|------|--------|
| **Endpoint** | `https://opendata.maps.vic.gov.au/geoserver/wfs` |
| **Layer names** | `open-data-platform:parcel_view` (geometry + status), `open-data-platform:parcel_property` (parcel-property linkage, no geometry), `open-data-platform:v_parcel_mp` (alternative) |
| **Auth required** | None |
| **Status** | WORKING -- HTTP 200, returns GeoJSON |
| **Query method** | BBOX parameter |
| **Features at CBD** | 112 parcels in small bbox (-37.815,144.962 to -37.813,144.965) |

### parcel_view fields

`ufi`, `pfi`, `centroid_pfi`, `status`, `z_level`, `horiz_pos_uncertainty`, `task_id`, `pfi_created`, `ufi_old`, `ufi_created`, `geom`

### parcel_property fields (join table -- no geometry)

`ufi`, `parcel_pfi`, `property_pfi`, `ufi_created`

### Sample parcel data

| pfi | status | bbox |
|-----|--------|------|
| 216004642 | A (Active) | -37.813 to -37.812, 144.962 to 144.965 |
| 206067489 | A | -37.813 to -37.812, 144.963 to 144.963 |

### Working curl example

```bash
curl "https://opendata.maps.vic.gov.au/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=open-data-platform:parcel_view&outputFormat=application/json&count=5&bbox=-37.815,144.962,-37.813,144.965"
```

### Limitation

- Parcel data provides geometry and PFI identifiers but NOT lot/plan numbers, addresses, or property dimensions in this layer.
- The `parcel_property` layer links parcel_pfi to property_pfi but has no geometry (cannot BBOX query it).
- For full lot/plan/address data, the VICMAP Address or Property layers may need to be accessed separately, or use the `v_parcel_mp` layer.

---

## 4. G-NAF Geocoding

| Item | Detail |
|------|--------|
| **Data source** | data.gov.au -- Geocoded National Address File |
| **Dataset ID** | `geocoded-national-address-file-g-naf` |
| **Auth required** | None for bulk download; API key required for PSMA live geocoder |
| **Status** | AVAILABLE as bulk download (CC BY 4.0 license) |
| **Format** | ZIP archives (PSV pipe-separated files), available in GDA94 and GDA2020 |
| **Current release** | February 2026 |
| **Coverage** | 15.9 million geocoded Australian addresses |
| **Update frequency** | Quarterly |

### Bulk download (free, no auth)

```bash
# Check available resources
curl "https://data.gov.au/data/api/3/action/package_show?id=geocoded-national-address-file-g-naf"
```

Available downloads:
- G-NAF GDA94 (ZIP)
- G-NAF GDA2020 (ZIP)
- G-NAF Core (simplified table format, from Aug 2022)
- Release report (PDF)

### PSMA Live Geocoder API

| Item | Detail |
|------|--------|
| **Endpoint** | `https://api.psma.com.au/v2/addresses/geocoder` |
| **Auth** | API key REQUIRED (returns HTTP 401 without it) |
| **Response** | `{"messages": ["The API Key has not been supplied."]}` |
| **Provider** | Geoscape Australia (formerly PSMA) |

### gnafld.net (Linked Data API)

| Item | Detail |
|------|--------|
| **Endpoint** | `https://gnafld.net/gnaf/address/` |
| **Status** | NOT RESPONDING (HTTP 000 / connection failed) |
| **Notes** | This endpoint appears to be decommissioned |

### Recommendation for Land-IQ

For geocoding, two options:
1. **Bulk import G-NAF** into PostGIS (free, quarterly updates, ~2GB compressed). Best for address lookup/validation at scale.
2. **PSMA Geocoder API** for real-time geocoding (requires paid API key from Geoscape).

---

## 5. Domain API

| Item | Detail |
|------|--------|
| **Base URL** | `https://api.domain.com.au/` |
| **Auth required** | YES -- OAuth2 / API key required for ALL endpoints |
| **Status** | RESPONDING but returns 401 Unauthorized without credentials |

### Endpoints tested

| Endpoint | HTTP Status | Response |
|----------|-------------|----------|
| `/v1/properties/_suggest` | 401 | `{"title": "Not Authorized", "detail": "Unable to verify credentials"}` |
| `/v1/suburbPerformanceStatistics` | 401 | Same auth error |
| `/v1/listings/residential/_search` | 404 | Route not found (likely POST with auth needed) |

### Authentication model

- Register at https://developer.domain.com.au/
- Free tier: limited to ~500 calls/day for basic property data
- Paid tiers: for listings search, price estimates, suburb stats
- Auth via `X-Api-Key` header or OAuth2 Bearer token

### Available endpoints (per docs)

- `GET /v1/properties/{id}` -- property details
- `POST /v1/listings/residential/_search` -- search listings
- `GET /v1/suburbPerformanceStatistics` -- median prices, days on market
- `GET /v1/salesResults/{city}` -- auction results
- `GET /v1/addressLocators` -- address autocomplete

### Relevance to land feasibility

- Suburb median prices and sales history
- Active listings for comparable analysis
- Property details (beds, baths, land size)
- Requires paid subscription for meaningful volume

---

## 6. NSW Valuer General Sales Data

| Item | Detail |
|------|--------|
| **Portal** | `https://valuation.property.nsw.gov.au/` (Valuer General NSW Valuation Portal) |
| **data.nsw.gov.au** | Dataset exists as a web map viewer, not bulk API |
| **Auth required** | No auth for web viewer; bulk data requires email request |
| **Status** | Web portal RESPONDING (HTTP 200) |

### Available data

The NSW VG provides:
- Land values (past 5 years where available)
- Property sales from 2001 onwards
- Valuing year for council rates
- Property number, address, zoning
- Area and boundaries (non-strata)
- Dealing number, sale date/contract date

### Access methods

1. **Web map viewer** (no auth): https://portal.spatial.nsw.gov.au/portal/apps/webappviewer/index.html?id=2536c8e4882140eb957e90090cb0ef97
2. **Bulk land values**: Request via email to VG (from 2017 onwards). Available at https://www.valuergeneral.nsw.gov.au/land_value_summaries/lv.php
3. **NSW Property Web Service (ArcGIS)**: `https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Property/MapServer`

### NSW Property Sales data format (bulk)

The historical bulk download format (`.dat` files) uses semicolon-delimited records with the following structure:

```
Record Type B (Sale Property):
district_code; property_id; sale_counter; download_date; property_name;
property_unit_number; property_house_number; property_street_name;
property_suburb; property_post_code; area; area_type; contract_date;
settlement_date; purchase_price; zone_code; nature_of_property;
primary_purpose; strata_lot_number; comp_code; sale_code;
interest_of_sale; dealing_number

Record Type C (Sale Property Legal Description):
district_code; property_id; sale_counter; download_date;
property_legal_description
```

### Working curl (NSW Property MapServer)

```bash
curl "https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Property/MapServer?f=json"
```

---

## Summary: Viability for Land Feasibility Platform

| Data Source | Status | Auth | Free | Spatial Query | Verdict |
|-------------|--------|------|------|---------------|---------|
| VIC Planning Zones | WORKING | None | Yes | WFS BBOX | USE -- primary zoning data |
| VIC Planning Overlays | WORKING | None | Yes | WFS BBOX | USE -- BMO/LSIO/SBO/HO/DDO |
| VIC Cadastre (parcels) | WORKING | None | Yes | WFS BBOX | USE -- parcel boundaries |
| VIC Heritage Inventory | WORKING | None | Yes | WFS BBOX | USE -- heritage site details |
| VIC Bushfire Prone Area | WORKING | None | Yes | WFS BBOX | USE -- bushfire risk layer |
| VIC Flood History | WORKING | None | Yes | WFS BBOX | USE -- flood risk layer |
| G-NAF (bulk) | AVAILABLE | None | Yes | Local PostGIS | USE -- address geocoding |
| G-NAF (PSMA API) | LOCKED | API key | No | REST | SKIP unless budget allows |
| Domain API | LOCKED | API key | Limited | REST | EVALUATE -- free tier may suffice |
| NSW VG Sales | PARTIAL | Email req | Yes | ArcGIS REST | USE -- NSW property MapServer |

### Key technical findings

1. **VIC GeoServer namespace** is `open-data-platform`, not `datavic` as often documented elsewhere.
2. **Geometry field** is `geom` across all layers.
3. **BBOX queries work reliably**; CQL_FILTER INTERSECTS with POINT geometry returns empty results (likely CRS axis-order mismatch between WGS84 and EPSG:7844).
4. **CRS is EPSG:7844** (GDA2020) -- coordinates are effectively identical to WGS84/EPSG:4326 for practical purposes but the axis order in WFS 2.0.0 may differ.
5. **All VIC data is fully open** -- no API keys, no rate limiting observed, no authentication.
6. **Domain API requires registration** even for basic queries. No anonymous access at all.
7. **G-NAF bulk download is free** under CC BY 4.0, updated quarterly, and is the recommended approach for address geocoding rather than the paid PSMA API.
8. **NSW sales data** is accessible via ArcGIS REST service for spatial queries; bulk historical data requires email request to VG office.
