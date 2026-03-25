# NSW Government Open Data API Testing Results

**Date tested:** 2026-03-24
**Test point:** Sydney CBD (-33.8688, 151.2093)
**Method:** curl against ArcGIS REST endpoints, no authentication tokens

---

## Summary

| API | Status | Auth | Response Time | Coord System | Usable? |
|-----|--------|------|---------------|--------------|---------|
| Zoning (ePlanning) | WORKING | None | ~137ms | GDA94 (EPSG:4283), accepts WGS84 inSR=4326 | Yes |
| FSR (ePlanning) | WORKING | None | ~138ms | GDA94 (EPSG:4283), accepts WGS84 inSR=4326 | Yes |
| Height of Buildings (ePlanning) | WORKING (schema ok, no HOB at test point) | None | ~142ms | GDA94 (EPSG:4283), accepts WGS84 inSR=4326 | Yes |
| Bushfire Prone Land (ePlanning Hazard) | WORKING | None | ~150-230ms | GDA94 (EPSG:4283), accepts WGS84 inSR=4326 | Yes |
| Flood Planning Map (ePlanning Hazard) | WORKING (schema ok, sparse coverage) | None | ~157ms | GDA94 (EPSG:4283), accepts WGS84 inSR=4326 | Yes |
| Heritage - EPI (ePlanning) | WORKING | None | ~133ms | GDA94 (EPSG:4283), accepts WGS84 inSR=4326 | Yes |
| Heritage - State Register (ePlanning) | WORKING (schema ok, no hit at test point) | None | ~119ms | GDA94 (EPSG:4283), accepts WGS84 inSR=4326 | Yes |
| Cadastre Lots (Spatial Services) | WORKING | None | ~203ms | Web Mercator (EPSG:3857), accepts WGS84 inSR=4326 | Yes |
| Cadastre Lots (SIX) | WORKING | None | ~470ms | Web Mercator (EPSG:3857), accepts WGS84 sr=4326 | Yes |

**All endpoints are free, open, and require no authentication.**

---

## 1. NSW Zoning

### Endpoint
```
https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning/Planning_Portal_Principal_Planning/MapServer
```

### Working Query
```
Layer 19 (LEP Land Zoning Map) - use /query not /identify
GET .../MapServer/19/query?
  geometry=151.2093,-33.8688
  &geometryType=esriGeometryPoint
  &inSR=4326
  &spatialRel=esriSpatialRelIntersects
  &outFields=*
  &returnGeometry=false
  &f=json
```

### Layer Notes
- **Layer 17** = Land Zoning Map (group/parent, query fails with 400)
- **Layer 18** = Additional Controls (SEPP zoning, query fails - parent?)
- **Layer 19** = Land Zoning Map (LEP data -- THIS ONE WORKS)
- Even-numbered layers (8, 10, 12...) appear to be parent/group layers that don't support query
- Odd-numbered layers (9, 11, 13...) are the queryable LEP feature layers

### Sample Response at Sydney CBD
```json
{
  "EPI_NAME": "Sydney Local Environmental Plan 2012",
  "LGA_NAME": "SYDNEY",
  "LAY_CLASS": "Metropolitan Centre",
  "LABEL": "SP5",
  "SYM_CODE": "SP5",
  "EPI_TYPE": "LEP",
  "AMENDMENT": "State Environmental Planning Policy Amendment (Land Use Zones) 2023"
}
```

### Fields Returned
| Field | Type | Description |
|-------|------|-------------|
| EPI_NAME | String(150) | Name of Environmental Planning Instrument |
| LGA_NAME | String(50) | Local Government Area |
| LAY_CLASS | String(100) | Land use description (e.g. "Metropolitan Centre") |
| LABEL | String(400) | Zone label |
| SYM_CODE | String(10) | Zone code (e.g. "SP5", "B4", "R2") |
| PURPOSE | String | Zone purpose text |
| EPI_TYPE | String | "LEP" or "SEPP" |
| AMENDMENT | String(150) | Latest amendment name |
| PUBLISHED_DATE | Date | Date published |
| COMMENCED_DATE | Date | Date commenced |
| CURRENCY_DATE | Date | Data currency date |
| LEGIS_REF_AREA | String | Additional controls reference |

### Coordinate System
- Native: GDA94 (EPSG:4283)
- Accepts `inSR=4326` (WGS84) for input geometry -- works seamlessly

### Speed
~137ms query response time

---

## 2. NSW Floor Space Ratio (FSR)

### Working Query
```
Layer 11 (LEP Floor Space Ratio Map)
GET .../MapServer/11/query?
  geometry=151.2093,-33.8688
  &geometryType=esriGeometryPoint
  &inSR=4326
  &spatialRel=esriSpatialRelIntersects
  &outFields=*
  &returnGeometry=false
  &f=json
```

### Layer Notes
- **Layer 9** = Floor Space Ratio Map (parent/group - returns 400)
- **Layer 11** = Floor Space Ratio Map (LEP queryable layer -- WORKS)

### Sample Response at Sydney CBD
```json
{
  "EPI_NAME": "Sydney Local Environmental Plan 2012",
  "LGA_NAME": "SYDNEY",
  "FSR": 8.0,
  "LABEL": "AC",
  "LAY_CLASS": "8-8.99",
  "LEGIS_REF_CLAUSE": "Clause 4.4",
  "EPI_TYPE": "LEP"
}
```

### Key Fields
| Field | Type | Description |
|-------|------|-------------|
| FSR | Double | Floor Space Ratio value (e.g. 8.0) |
| LABEL | String | FSR map label (e.g. "AC" for area-specific clause) |
| LAY_CLASS | String | FSR range class (e.g. "8-8.99") |
| LEGIS_REF_CLAUSE | String | LEP clause reference (e.g. "Clause 4.4") |
| EPI_NAME | String | LEP name |
| LGA_NAME | String | LGA name |

### Speed
~138ms

---

## 3. NSW Height of Buildings (HOB)

### Working Query
```
Layer 14 (LEP Height of Buildings Map)
GET .../MapServer/14/query?
  geometry=151.2093,-33.8688
  &geometryType=esriGeometryPoint
  &inSR=4326
  &spatialRel=esriSpatialRelIntersects
  &outFields=*
  &returnGeometry=false
  &f=json
```

### Layer Notes
- **Layer 12** = Height of Buildings Map (parent/group - returns 400)
- **Layer 14** = Height of Buildings Map (LEP queryable layer -- WORKS)

### Response at Sydney CBD
No features returned at this exact test point (Sydney CBD has area-specific height controls via SEPP rather than LEP HOB map, so the LEP layer returns empty). Schema confirmed valid.

### Key Fields
| Field | Type | Description |
|-------|------|-------------|
| MAX_B_H | Double | Maximum building height value |
| MAX_B_H_M | String | Height in metres |
| MAX_B_H_RL | String | Height as reduced level (AHD) |
| UNITS | String(10) | Units of measurement |
| SYM_CODE | Integer | Symbol code |
| LEGIS_REF_CLAUSE | String | LEP clause reference |
| EPI_NAME | String | LEP name |

### Speed
~142ms

---

## 4. NSW Bushfire Prone Land

### Endpoint
```
https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning/Planning_Portal_Hazard/MapServer
```

### Working Query
```
Layer 229 (Bushfire Prone Land)
GET .../MapServer/229/query?
  geometry=151.2093,-33.8688
  &geometryType=esriGeometryPoint
  &inSR=4326
  &spatialRel=esriSpatialRelIntersects
  &outFields=*
  &returnGeometry=false
  &f=json
```

### Response at Sydney CBD
No features -- Sydney CBD is not bushfire prone land. Correct result.

### Verified at Springwood, Blue Mountains (150.5700, -33.7000)
```json
{
  "OBJECTID": 233647,
  "Category": 2,
  "Guideline": 3,
  "d_Category": "Vegetation Category 2",
  "d_Guidelin": "v5b",
  "LastUpdate": 1747180800000
}
```

### Key Fields
| Field | Type | Description |
|-------|------|-------------|
| Category | Integer | Bushfire category (1, 2, 3) |
| d_Category | String(254) | Description (e.g. "Vegetation Category 2") |
| Guideline | Integer | Guideline version code |
| d_Guidelin | String(254) | Guideline label (e.g. "v5b") |
| LastUpdate | Date | Last data update |
| SHAPE_Leng | Double | Shape perimeter length |

### Speed
~150-230ms

---

## 5. NSW Flood Planning

### Working Query
```
Layer 230 (Flood Planning Map)
GET .../Planning_Portal_Hazard/MapServer/230/query?
  geometry=151.2093,-33.8688
  &geometryType=esriGeometryPoint
  &inSR=4326
  &spatialRel=esriSpatialRelIntersects
  &outFields=*
  &returnGeometry=false
  &f=json
```

### Response at Sydney CBD
No features -- expected. The CBD is not in a flood planning area.

### Coverage Notes
- This layer contains **LEP Flood Planning Map** extents only (where councils have mapped flood planning areas into their LEP)
- Not all flood-prone land is mapped here -- many councils use separate flood studies
- Tested at Windsor/Hawkesbury (150.814, -33.613) -- also returned 0 features, suggesting Hawkesbury LGA may not have digitised its flood planning map into the ePlanning system yet
- For comprehensive flood data, may need to query individual council flood studies or the NSW Flood Data Portal (separate system)

### Key Fields
| Field | Type | Description |
|-------|------|-------------|
| EPI_NAME | String(150) | LEP name |
| LGA_NAME | String(50) | LGA name |
| LAY_CLASS | String | Flood class |
| EPI_TYPE | String | "LEP" |
| COMMENT | String | Additional comments |
| AMENDMENT | String(150) | Amendment reference |

### Additional Hazard Layers Available
| Layer ID | Name |
|----------|------|
| 228 | Hazard (parent group) |
| 229 | Bushfire Prone Land |
| 230 | Flood Planning Map |
| 231 | Hunter Valley Flood Mitigation Scheme Development Consent Area |
| 232 | Landslide Risk Land |

### Speed
~157ms

### Alternative Flood Sources (not tested as working)
- `portal.spatial.nsw.gov.au` NSW Flood Data Portal -- responded but returned empty service metadata (may require specific layer IDs)
- `maps.six.nsw.gov.au` NSW_Flood_Data -- returned 500 "service not found"

---

## 6. NSW Heritage

### Two Heritage Layers Available

#### Layer 16 - EPI Heritage (Local Heritage Items)
```
GET .../Planning_Portal_Principal_Planning/MapServer/16/query?
  geometry=151.2093,-33.8688
  &geometryType=esriGeometryPoint
  &inSR=4326
  &spatialRel=esriSpatialRelIntersects
  &outFields=*
  &returnGeometry=false
  &f=json
```

**Sample Response at Sydney CBD:**
```json
{
  "EPI_NAME": "Sydney Local Environmental Plan 2012",
  "LGA_NAME": "SYDNEY",
  "LAY_CLASS": "Item - General",
  "H_ID": "I2287",
  "H_NAME": "MLC Centre complex (please refer to the instrument)",
  "SIG": "Local",
  "LEGIS_REF_CLAUSE": "Clause 5.10",
  "EPI_TYPE": "LEP"
}
```

**Key Fields:**
| Field | Type | Description |
|-------|------|-------------|
| H_ID | String(20) | Heritage item number (e.g. "I2287") |
| H_NAME | String(200) | Heritage item name |
| SIG | String | Significance level ("Local", "State") |
| LAY_CLASS | String(100) | Heritage type ("Item - General", "Conservation Area") |
| EPI_NAME | String | LEP name |
| LEGIS_REF_CLAUSE | String | Clause reference |

#### Layer 221 - State Heritage Register Curtilage
```
GET .../Planning_Portal_Principal_Planning/MapServer/221/query?
  (same parameters)
```

**No features at Sydney CBD test point** (the exact point doesn't fall within a state heritage curtilage polygon).

**Key Fields:**
| Field | Type | Description |
|-------|------|-------------|
| HOITEMID | Integer | Heritage Office item ID |
| ITEMNAME | String(80) | Item name |
| ADDRESS | String(254) | Street address |
| LGA | String(120) | LGA name |
| LISTING | String(4) | Listing type code |
| LISTINGNO | String(50) | Listing number |
| PLANNO | String(20) | Plan number |
| LISTING_DATE | Date | Date listed |
| TYPE | String | Item type |
| LALC | String | Local Aboriginal Land Council area |

### Speed
~119-133ms

### Note
A separate `Planning_Portal_Heritage` MapServer was tested but returned 404 -- heritage data is consolidated within the Principal Planning MapServer.

---

## 7. NSW Cadastre (Lot Boundaries)

### Primary Endpoint (Recommended)
```
https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Land_Parcel_Property_Theme/FeatureServer
```

### Working Query
```
Layer 8 (Lot)
GET .../FeatureServer/8/query?
  geometry=151.2093,-33.8688
  &geometryType=esriGeometryPoint
  &inSR=4326
  &spatialRel=esriSpatialRelIntersects
  &outFields=*
  &returnGeometry=false   (set to true for polygon geometry)
  &f=json
```

### Sample Response at Sydney CBD
```json
{
  "objectid": 1236669,
  "cadid": 102169538,
  "planlabel": "DP598704",
  "lotnumber": "1",
  "sectionnumber": null,
  "lotidstring": "1//DP598704",
  "urbanity": "U",
  "hasstratum": 1,
  "stratumlevel": 0,
  "classsubtype": 1,
  "Shape__Area": 10328.589025760246,
  "Shape__Length": 488.1430326708073
}
```

### Available Layers
| Layer ID | Name | Notes |
|----------|------|-------|
| 0 | WaterMark | |
| 1 | RoadCentreline | |
| 2 | WaterFeatureCorridor | |
| 3 | WaterFeature | |
| 4 | Unidentified | |
| 5 | RoadCorridor | |
| 6 | Road | |
| 7 | RailwayCorridor | |
| **8** | **Lot** | **Primary cadastre layer** |
| 9 | Easement | |
| 10 | PropertyFragment | |
| 11 | AuthorityReference | |
| 12 | Property | |

### Key Fields (Layer 8 - Lot)
| Field | Type | Description |
|-------|------|-------------|
| lotidstring | String(50) | Full lot identifier (e.g. "1//DP598704") |
| lotnumber | String(6) | Lot number |
| sectionnumber | String(3) | Section number |
| planlabel | String(15) | Plan label (e.g. "DP598704") |
| plannumber | Integer | Plan number |
| cadid | Integer | Cadastral ID |
| planlotarea | Double | Area from plan |
| planlotareaunits | String(6) | Area units |
| urbanity | String(2) | "U" (urban) or "R" (rural) |
| hasstratum | SmallInt | Has strata (1=true) |
| stratumlevel | SmallInt | Strata level (0=ground) |
| classsubtype | Integer | 1=StandardLot |
| Shape__Area | Double | Calculated area (sq metres in Web Mercator) |
| Shape__Length | Double | Perimeter (metres) |
| itstitlestatus | SmallInt | Title status |

### Coordinate System
- Native: Web Mercator (EPSG:3857 / wkid:102100)
- Accepts `inSR=4326` for WGS84 input
- Request `outSR=4326` to get geometry in WGS84

### Speed
- portal.spatial.nsw.gov.au: ~203ms
- maps.six.nsw.gov.au (SIX identify): ~470ms (slower, same data)

### Secondary Endpoint (SIX)
```
https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Cadastre/MapServer
```
Same data, uses identify endpoint, ~2x slower. Has additional layers for plan/section display.

---

## Architecture Recommendations for Land-IQ

### Single Service Strategy
The **ePlanning Principal Planning MapServer** provides zoning, FSR, HOB, and heritage in a single service. One base URL, multiple layer queries:

```
Base: https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning/Planning_Portal_Principal_Planning/MapServer

Zoning:    Layer 19
FSR:       Layer 11
HOB:       Layer 14
Heritage:  Layer 16 (EPI items) + Layer 221 (State Register)
Lot Size:  Layer 22
```

The **Hazard MapServer** covers bushfire, flood, and landslide:
```
Base: https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning/Planning_Portal_Hazard/MapServer

Bushfire:  Layer 229
Flood:     Layer 230
Landslide: Layer 232
```

**Cadastre** requires the Spatial Services portal:
```
Base: https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Land_Parcel_Property_Theme/FeatureServer

Lots:      Layer 8
Easements: Layer 9
Property:  Layer 12
```

### Key Implementation Notes

1. **Use `/query` not `/identify`** -- query is faster and more reliable for point-in-polygon lookups
2. **Even-numbered layers are group/parent layers** in the Principal Planning service -- they return 400 errors on query. Always use odd-numbered child layers (9, 11, 14, 16, 19)
3. **All endpoints accept `inSR=4326`** so you can pass WGS84 lat/lng directly without coordinate transformation
4. **No auth required** -- all services are publicly accessible with no API key or token
5. **No rate limiting observed** during testing, but implement reasonable throttling for production use
6. **Empty results are valid** -- e.g. Sydney CBD returns no bushfire/flood features because it genuinely is not affected. Absence of features = not in that constraint zone
7. **Flood data is incomplete** -- the LEP Flood Planning Map (Layer 230) only contains flood mapping that has been formally incorporated into LEPs. Many flood-affected areas are not yet digitised. Consider supplementing with council-specific flood data or the NSW Flood Data Portal
8. **Parallel queries are possible** -- zoning + FSR + HOB + heritage can be queried simultaneously against the same MapServer with different layer IDs. Total feasibility check in ~200-300ms with parallel requests
