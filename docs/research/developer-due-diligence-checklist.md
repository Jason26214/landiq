# Australian Property Developer Due Diligence Checklist

## Complete Reference for Land Acquisition Assessment

*Version 1.0 -- March 2026*
*Focus: NSW and VIC, with national applicability notes*

This document is a comprehensive checklist of everything an Australian property developer needs to investigate before purchasing land for development. Each item includes what it is, where to find it, whether it can be automated, red flags, and typical investigation costs.

---

## Automation Key

Throughout this document, each item is tagged with an automation status:

| Tag | Meaning |
|-----|---------|
| **API-AUTO** | Can be fully automated via free government API (NSW ePlanning ArcGIS REST or VIC opendata WFS) |
| **API-PARTIAL** | Partially automatable (some data available via API, but interpretation or additional sources needed) |
| **API-PAID** | Automatable via paid/commercial API (CoreLogic, Domain, Geoscape, etc.) |
| **MANUAL** | Requires manual investigation, consultant engagement, or physical inspection |
| **HYBRID** | Initial screening automatable, but detailed assessment requires manual/consultant work |

---

## 1. Planning & Zoning

### 1.1 Zoning Classification and Permitted Uses

**What it is and why it matters:**
The zoning of land determines what can and cannot be built on it. In NSW, zones are defined in the Local Environmental Plan (LEP) using standardised codes (R2 Low Density Residential, B4 Mixed Use, IN1 General Industrial, etc.). In Victoria, zones are defined in the local planning scheme using the Victoria Planning Provisions framework (GRZ General Residential Zone, C1Z Commercial 1 Zone, IN1Z Industrial 1 Zone, etc.). Each zone has a table of permitted uses (with consent), prohibited uses, and objectives. If a proposed use is prohibited in the zone, the project is dead unless a rezoning is pursued.

**Where to find it:**
- **NSW**: NSW ePlanning Spatial Viewer (planningportal.nsw.gov.au/spatialviewer). The gazetted LEP text is on legislation.nsw.gov.au. The s10.7 planning certificate (ordered from council) is the definitive legal document.
- **VIC**: VicPlan (mapshare.vic.gov.au/vicplan). Full planning scheme text at planning-schemes.app.planning.vic.gov.au. A Planning Property Report from council is the equivalent definitive document.
- **National**: Each state has its own planning portal (QLD Planning Portal, PlanSA, PlanWA, iPlan Tasmania, etc.)

**Automation status: API-AUTO**
- **NSW**: ePlanning ArcGIS REST -- Layer 19 on the Principal Planning MapServer. Returns `SYM_CODE` (zone code, e.g. "R3"), `LAY_CLASS` (description, e.g. "Medium Density Residential"), `EPI_NAME` (LEP name), `LGA_NAME`. Query with a point coordinate, no auth required, ~137ms response time.
  ```
  GET https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning/Planning_Portal_Principal_Planning/MapServer/19/query?geometry={lng},{lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=false&f=json
  ```
- **VIC**: OpenData WFS -- layer `open-data-platform:plan_zone`. Returns `zone_code`, `zone_description`, `lga`. Query via BBOX, no auth required.
  ```
  GET https://opendata.maps.vic.gov.au/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=open-data-platform:plan_zone&outputFormat=application/json&bbox={lat1},{lng1},{lat2},{lng2}
  ```

**Red flags / deal breakers:**
- Proposed use is prohibited in the zone (absolute deal breaker unless rezoning is viable)
- Land is zoned for a restrictive purpose (SP1 Special Activities, RE1 Public Recreation, E1 National Parks) with no realistic rezoning pathway
- Zone recently changed or under review -- uncertainty about future permissibility
- Deferred matter / unzoned land -- rare but indicates unresolved planning status

**Typical cost to investigate:** $0 (free via portal or API). s10.7 certificate: $53 standard / $153 urgent (NSW council fees). VIC planning property report: ~$55.

---

### 1.2 Floor Space Ratio (FSR) / Floor Area Ratio (FAR)

**What it is and why it matters:**
FSR is the ratio of total gross floor area (GFA) permitted to site area. It is the single most important number for determining development yield on apartment and mixed-use sites. An FSR of 2:1 on a 1,000 sqm site means a maximum of 2,000 sqm GFA. FSR directly drives revenue potential and therefore land value. Not all zones or councils use FSR -- it is most common in urban areas and for medium-to-high density zones in NSW. Victoria uses building height, setbacks, and site coverage rather than FSR for most residential zones (ResCode), though some specific controls apply via DDO or ACZ schedules.

**Where to find it:**
- **NSW**: LEP Floor Space Ratio Map (ePlanning or council LEP maps). The LEP clause (typically Clause 4.4) sets the FSR. Some sites have additional FSR available via bonuses (design excellence, affordable housing, community infrastructure).
- **VIC**: Not typically expressed as FSR in residential zones. For activity centres, DDO or ACZ schedules may specify FAR or equivalent. Check the relevant schedule in the planning scheme.

**Automation status: API-AUTO (NSW)**
- **NSW**: ePlanning ArcGIS REST -- Layer 11 on Principal Planning MapServer. Returns `FSR` (numeric value, e.g. 2.5), `LABEL`, `LEGIS_REF_CLAUSE`. ~138ms response.
- **VIC**: No direct FSR layer. Would need to extract from DDO/ACZ schedule text (MANUAL or LLM-extractable from planning scheme PDFs).

**Red flags / deal breakers:**
- FSR lower than expected for the zone (e.g. R4 zone with FSR 1.5:1 -- height and density potential may be constrained)
- "AC" or other special labels indicating area-specific clauses that modify the mapped FSR
- No FSR mapped (common in low-density residential -- yield is then governed by lot size, height, and setbacks)
- Draft LEP amendment proposing FSR reduction

**Typical cost to investigate:** $0 (free via API/portal). Interpretation of bonus provisions may require town planner ($500-$2,000 for a quick opinion).

---

### 1.3 Building Height Limits

**What it is and why it matters:**
Maximum building height (HOB) is expressed in metres and/or storeys. It constrains the vertical extent of development and, combined with FSR and setbacks, determines the building envelope. In NSW, HOB is mapped in the LEP. In VIC, height limits are set via DDO schedules, zone schedules (e.g. NRZ has a mandatory 9m/2-storey limit), or ResCode defaults.

**Where to find it:**
- **NSW**: LEP Height of Buildings Map (ePlanning). LEP Clause 4.3. Some SEPPs override LEP heights (e.g. Housing SEPP, TOD SEPP).
- **VIC**: Zone provisions (e.g. NRZ 9m mandatory, GRZ 11m default), DDO schedules (specific height controls per precinct). Check VicPlan overlays and the relevant planning scheme clauses.

**Automation status: API-AUTO (NSW) / API-PARTIAL (VIC)**
- **NSW**: ePlanning ArcGIS REST -- Layer 14 on Principal Planning MapServer. Returns `MAX_B_H` (height value), `UNITS`, `LEGIS_REF_CLAUSE`. Note: some areas (e.g. Sydney CBD) have height controlled by SEPP rather than LEP, so the LEP layer may return empty.
- **VIC**: Zone-based defaults can be inferred from the zone code (retrieved via API). DDO-specific heights require parsing the DDO schedule text.

**Red flags / deal breakers:**
- Height limit inconsistent with FSR (e.g. FSR allows 10 storeys of floor area but height limit only permits 6 storeys -- cannot achieve full FSR)
- Height limit in metres only, not storeys (floor-to-floor requirements may reduce achievable storeys)
- Transitional height controls near heritage or low-density areas (may require stepping down)
- Solar access planes that effectively reduce achievable height on parts of the site

**Typical cost to investigate:** $0 (free via API/portal). Town planner analysis of bonus height or SEPP override provisions: $500-$2,000.

---

### 1.4 Minimum Lot Size

**What it is and why it matters:**
For subdivision projects, the minimum lot size determines the maximum number of lots that can be created. Set in the LEP (NSW) or zone/schedule provisions (VIC). Critical for land subdivision feasibility -- a 5,000 sqm site with a 450 sqm minimum lot size has very different yield potential than one with a 700 sqm minimum.

**Where to find it:**
- **NSW**: LEP Lot Size Map (ePlanning). LEP Clause 4.1.
- **VIC**: Zone provisions (e.g. NRZ Schedule may specify minimum lot sizes of 500-800 sqm, GRZ default 300 sqm for dual occupancy). Also check Clause 56 (subdivision) requirements.

**Automation status: API-AUTO (NSW) / API-PARTIAL (VIC)**
- **NSW**: ePlanning ArcGIS REST -- Layer 22 on Principal Planning MapServer. Returns minimum lot size value.
- **VIC**: Default minimum lot sizes can be inferred from zone code. Schedule-specific overrides require text parsing.

**Red flags / deal breakers:**
- Minimum lot size larger than expected (e.g. R2 zone with 700 sqm minimum instead of 450 sqm)
- "Minimum lot size for dual occupancy" differs from subdivision minimum
- No mapped minimum lot size (may mean subdivision is not permitted or is controlled by other means)

**Typical cost to investigate:** $0 (free via API/portal).

---

### 1.5 Planning Overlays

**What it is and why it matters:**
Overlays are additional planning controls that apply to specific land parcels, on top of the underlying zone. They modify what is permitted, require additional assessments, or impose design requirements. Common overlays include heritage (HO), flood (LSIO/SBO/FO in VIC; Flood Planning clause in NSW), bushfire (BMO in VIC; Bushfire Prone Land in NSW), environmental significance (ESO, VPO), design and development (DDO), and development plan (DPO). Multiple overlays can apply simultaneously to the same parcel, compounding constraints.

**Where to find it:**
- **NSW**: ePlanning Spatial Viewer. Overlays in NSW are not technically called "overlays" -- they are additional LEP maps (Heritage Map, Flood Planning Map, Acid Sulfate Soils Map, etc.) and SEPP provisions.
- **VIC**: VicPlan overlay layer. Full list of overlays in the relevant planning scheme. Victoria has a formal overlay system with 30+ overlay types.

**Automation status: API-AUTO**
- **NSW**: Various layers on ePlanning MapServer (Heritage Layer 16, Flood Layer 230, Bushfire Layer 229, etc.)
- **VIC**: `open-data-platform:plan_overlay` WFS layer. Returns `scheme_code` (HO, DDO, BMO, LSIO, etc.), `zone_code` (specific schedule, e.g. HO541), `zone_description`. Filterable by overlay type using CQL_FILTER.

**Red flags / deal breakers:**
- Multiple overlays stacking (e.g. HO + DDO + SBO = severely constrained site)
- BMO (Bushfire Management Overlay) -- triggers BAL assessment, APZ requirements, potentially 100m+ setbacks from vegetation
- ESO (Environmental Significance Overlay) -- may prevent removal of vegetation, limit site coverage
- PAO (Public Acquisition Overlay) -- government intends to acquire all or part of the site
- SLO (Significant Landscape Overlay) -- strict design controls, height limits, vegetation retention

**Typical cost to investigate:** $0 (free via API/portal). Interpretation of overlay implications: $500-$3,000 (town planner).

---

### 1.6 SEPPs / State Policies

**What it is and why it matters:**
State Environmental Planning Policies (SEPPs) in NSW, and State Planning Policy Framework provisions in VIC, are state-level planning instruments that override or supplement local controls. They can dramatically change what is permissible on a site. Key examples:
- **NSW Housing SEPP 2021**: Enables additional housing types (boarding houses, co-living, build-to-rent, seniors housing) with modified standards
- **NSW Low and Mid-Rise Housing reforms (2024-25)**: Allow medium density housing (terraces, manor houses, apartments up to 6 storeys) near transport in previously low-density zones
- **NSW Transport Oriented Development (TOD) SEPP**: Increased density within walking distance of train stations
- **VIC Clause 52.06 (Car Parking)**: State-wide parking rates
- **VIC Clause 58 (Apartment Design)**: State-wide apartment design standards

**Where to find it:**
- **NSW**: legislation.nsw.gov.au for SEPP text. NSW Planning Portal for spatial application maps where relevant.
- **VIC**: planning-schemes.app.planning.vic.gov.au for State Planning Policy Framework and particular provisions.
- **Both**: Town planner advice is practically essential for understanding SEPP/state policy interactions with local controls.

**Automation status: API-PARTIAL**
- Some SEPPs have spatial mapping layers available via ePlanning (e.g. SEPP zoning appears as `EPI_TYPE: "SEPP"` in the zoning layer).
- Most SEPP provisions are text-based and require interpretation against site-specific conditions.
- PropCode (propcode.com.au) has begun digitising SEPP rules for NSW as machine-readable code.

**Red flags / deal breakers:**
- SEPP provisions that override LEP controls may increase OR decrease development potential -- must check both directions
- SEPP (Resilience and Hazards) may impose additional constraints for coastal, flood, or bushfire-affected land
- Transitional provisions -- new SEPPs often have savings/transitional clauses affecting in-progress applications
- State policy direction signalling future constraint tightening (e.g. increased tree canopy requirements)

**Typical cost to investigate:** $500-$3,000 (town planner analysis). SEPP text is free to access.

---

### 1.7 DCP Controls (Setbacks, Parking, Landscaping, Design)

**What it is and why it matters:**
Development Control Plans (NSW) and the detailed clauses/schedules within planning schemes (VIC) contain the granular design rules that shape what can actually be built. These include:
- **Setbacks**: Minimum distances from front, side, and rear boundaries (e.g. 6m front, 3m side, 6m rear)
- **Car parking rates**: Spaces per dwelling by type (e.g. 1 space per 1-bed apartment, 2 per 3-bed, 1 visitor per 5 dwellings)
- **Landscaping / deep soil**: Minimum percentage of site as landscaped area or deep soil (e.g. 30% deep soil for sites >1,500 sqm under NSW Apartment Design Guide)
- **Building separation**: Minimum distances between buildings on the same site (habitable room to habitable room, etc.)
- **Design quality**: Materials, articulation, roof forms, streetscape character requirements
- **Acoustic**: Noise attenuation requirements near roads, rail, commercial/industrial zones
- **Solar access**: Hours of sunlight to living rooms and private open space (typically 2-3 hours at winter solstice)

In Victoria, equivalent controls are in ResCode (Clauses 54, 55, 56 for residential), Clause 58 (apartments), and DDO/ACZ schedules for specific precincts.

These controls directly determine the buildable envelope and dwelling yield. A site that appears to allow 20 apartments based on FSR may only yield 14 once setbacks, parking, and landscaping requirements are applied.

**Where to find it:**
- **NSW**: Council website (DCP documents, typically large PDFs). Some councils have interactive DCP viewers. The DCP is non-statutory (a guide) but councils treat it as mandatory in practice.
- **VIC**: Planning scheme text online (clauses 54, 55, 56, 58, and relevant schedules). ResCode is statutory in Victoria.

**Automation status: MANUAL (highest-value automation opportunity)**
- DCPs are overwhelmingly in PDF format. No government API provides DCP controls.
- PropCode has digitised 1,000+ DCP rules for some NSW councils as "rules as code."
- Archistar has partial DCP coverage but inconsistent across councils.
- LLM-powered extraction from DCP PDFs is the most promising automation path.
- Each of NSW's 128 councils has its own DCP. Victoria has 79 municipalities, each with detailed schedule variations.

**Red flags / deal breakers:**
- Front setback requirement greater than expected (reduces buildable depth significantly)
- High parking rate in an area with no realistic basement option (e.g. high water table + 2 spaces per dwelling)
- Deep soil / landscaping requirement that consumes 30%+ of the site
- Building separation requirements that effectively prevent a second building on the site
- Acoustic requirements near rail/road requiring expensive glazing and mechanical ventilation
- Heritage character requirements mandating specific materials, colours, roof forms

**Typical cost to investigate:** $2,000-$10,000 (town planner DCP analysis). DCP documents are free to download.

---

### 1.8 Draft Amendments / Rezonings in Progress

**What it is and why it matters:**
Planning controls change over time through planning proposals (NSW) and planning scheme amendments (VIC). A draft rezoning or amendment can dramatically increase or decrease development potential. It also creates uncertainty during assessment. Key scenarios:
- Upzoning (increased height/FSR/density) -- may increase land value but also attracts more competition
- Downzoning (reduced controls) -- can destroy feasibility if purchased at current-control pricing
- Heritage listing proposals -- may constrain or prevent demolition and new development
- Infrastructure designations -- road widening, public open space dedication

**Where to find it:**
- **NSW**: NSW Planning Portal "Planning Proposals" tracker (planningportal.nsw.gov.au). LEP tracking on council websites. DPHI (Department of Planning, Housing and Infrastructure) gateway determinations.
- **VIC**: DELWP (now DTP) amendment tracking (planning.vic.gov.au/amendments). Council websites for locally initiated amendments. Government gazette for approved amendments.
- **Both**: Pre-DA meeting with council planners is the best way to learn about upcoming changes.

**Automation status: API-PARTIAL**
- NSW Planning Portal has a searchable planning proposals database (web-based, no public API confirmed).
- VIC amendment register is web-searchable but no public API.
- Monitoring could be partially automated via web scraping of council/state planning proposal pages.

**Red flags / deal breakers:**
- Draft amendment proposing reduced height, FSR, or density on the site
- Heritage listing proposal for the site or adjacent properties
- Road widening or public acquisition proposal affecting the site
- Planning proposal by a competing developer for a nearby site that may saturate the market
- Long-stalled rezoning (Gateway determination expired or lapsed)

**Typical cost to investigate:** $0-$500 (free to search portals; town planner review of implications $500-$2,000).

---

### 1.9 Complying Development Eligibility

**What it is and why it matters:**
Complying Development (NSW) is a fast-track approval pathway where development that meets all predetermined standards can be approved by a private certifier within 10-20 days, bypassing the council DA process entirely. This can save 3-12 months of approval time and significantly reduce planning risk. In VIC, the equivalent is a building permit for certain developments that are "as of right" under the zone, or VicSmart for minor applications (10-day turnaround).

Eligibility depends on the site not being affected by certain constraints (heritage, flood, bushfire, contaminated land, etc.) and the proposal meeting all numerical standards in the relevant SEPP (typically the State Environmental Planning Policy (Exempt and Complying Development Codes) 2008 -- the "Codes SEPP" -- or the Housing SEPP for certain housing types).

**Where to find it:**
- **NSW**: Check the Codes SEPP / Housing SEPP exclusion criteria against site constraints. PropCode offers automated CDC (Complying Development Certificate) eligibility checking for NSW.
- **VIC**: Check zone provisions for "as of right" uses (no permit required). Check VicSmart eligibility criteria in Clause 71.06.

**Automation status: HYBRID**
- Site constraint screening (flood, heritage, bushfire, contamination) is API-automatable and provides a strong indication of eligibility/ineligibility.
- Full eligibility requires checking the proposal against detailed numerical standards, which is partially automatable if DCP/SEPP rules are digitised.
- PropCode offers the most advanced automated CDC eligibility analysis for NSW.

**Red flags / deal breakers:**
- Site affected by heritage, flood, bushfire, or contamination -- likely ineligible for complying development
- Council with history of challenging private certifier approvals
- Complying development standards may produce a significantly smaller/less profitable outcome than a DA pathway

**Typical cost to investigate:** $500-$2,000 (town planner or certifier preliminary assessment). $0 if using automated screening against constraint layers.

---

## 2. Title & Legal

### 2.1 Certificate of Title

**What it is and why it matters:**
The Certificate of Title (now typically a digital record) confirms legal ownership, lot description (Lot/DP in NSW, Lot/Plan in VIC), and all registered interests (mortgages, easements, covenants, caveats). It is the fundamental legal document establishing what you are buying and what encumbrances exist. In the Torrens Title system used across Australia, the register is conclusive evidence of ownership.

**Where to find it:**
- **NSW**: NSW Land Registry Services (nswlrs.com.au). Title search online for $16.80 per title. Lot identifier format: Lot X DP XXXXXX (e.g. Lot 1 DP 598704).
- **VIC**: Landata (landata.vic.gov.au). Title search for $33.80. Lot identifier format: Lot X on Plan XXXXXX (LP, PS, TP, CP plan types).
- **QLD**: Titles Queensland (titlesqld.com.au). ~$25 per title.
- **Other states**: Each state has its own land titles office.

**Automation status: API-PAID**
- NSW LRS and Landata offer electronic search portals but not free public APIs. Title searches are pay-per-search.
- Landchecker and Archistar offer brokered title searches through their platforms (additional per-document fee).
- Cadastral lot boundaries (not full title) are available free via NSW Spatial Services ArcGIS REST (Layer 8 on NSW_Land_Parcel_Property_Theme FeatureServer) and VIC parcel_view WFS layer.

**Red flags / deal breakers:**
- Multiple owners (complex negotiation, one holdout can kill the deal)
- Unregistered or uncertain boundaries (requires survey)
- Old system title or qualified title (additional legal risk)
- Current mortgage to a party that may not consent to sale conditions
- Strata title when freehold expected (different development rights)

**Typical cost to investigate:** $16.80-$33.80 per title search (NSW/VIC). Solicitor review: $500-$2,000.

---

### 2.2 Easements and Their Impact

**What it is and why it matters:**
Easements grant rights over the land to a third party -- typically utilities (electricity, water, sewer, drainage) or neighbouring properties (right of way, access). Easements are registered on title and shown on the plan (DP/SP). They restrict what can be built within the easement corridor. A 3m sewer easement through the middle of a site may sterilise a significant building footprint. Easements can sometimes be relocated or extinguished, but this requires the consent of the beneficiary (e.g. Sydney Water, Ausgrid, the neighbouring owner) and can be expensive and time-consuming.

**Where to find it:**
- **NSW**: Registered on the Certificate of Title. Shown on the deposited plan (DP) available from NSW LRS. Also visible on the Spatial Services cadastre layer (Layer 9 "Easement" on NSW_Land_Parcel_Property_Theme FeatureServer).
- **VIC**: Registered on title. Shown on the plan of subdivision. Easement spatial data available via Vicmap.
- **Physical**: Detail/feature survey will pick up physical evidence of easements (pits, pipes, poles).

**Automation status: API-PARTIAL**
- **NSW**: Easement boundaries are available free via NSW Spatial Services ArcGIS REST (Layer 9). However, this shows spatial extent only -- the type, beneficiary, and conditions require reading the registered instrument from the title.
- **VIC**: Easement parcels available via WFS but with limited attribute data.
- Full easement details (type, width, beneficiary, conditions, registered dealing number) require a title search and plan review.

**Red flags / deal breakers:**
- Wide easement (>3m) through the centre of the site
- Easement for high-voltage electricity (cannot build over or near, large setback requirements)
- Right of way benefiting a neighbour that cannot be relocated
- Multiple easements that fragment the buildable area
- Drainage easement that limits basement depth or requires expensive engineering
- Easement beneficiary (e.g. major utility) unlikely to consent to relocation

**Typical cost to investigate:** $16.80 (title search) + $16.80 (plan copy) in NSW. Surveyor to locate: included in detail survey ($3,000-$20,000). Solicitor to advise on easement implications: $500-$3,000. Easement relocation or extinguishment: $5,000-$50,000+.

---

### 2.3 Restrictive Covenants

**What it is and why it matters:**
Restrictive covenants are private agreements registered on title that restrict how the land can be used or developed. Common covenants include: single dwelling only, minimum building setbacks, no commercial use, specific building materials (e.g. brick only), minimum dwelling size, no further subdivision. Unlike zoning (which can be changed by government), covenants are private contractual obligations that require the consent of the beneficiary (often a neighbouring landowner or original subdivider) to modify or extinguish. In NSW, covenants can also be extinguished by order of the Supreme Court under s89 of the Conveyancing Act 1919 if they are obsolete or unreasonably restrict use.

**Where to find it:**
- **NSW**: Registered on the Certificate of Title as a "restriction on the use of land" or "restrictive covenant" with a dealing number. The actual covenant text is in the registered instrument (available from NSW LRS for $16.80).
- **VIC**: Registered on title. Can also be found via the Section 32 vendor statement.

**Automation status: MANUAL**
- Covenants are text-based legal instruments registered on title. No API provides covenant interpretation.
- Title search reveals the existence of covenants (dealing numbers), but the text must be obtained and read.
- LLM analysis of covenant instrument text is a potential automation opportunity.

**Red flags / deal breakers:**
- "Single dwelling only" covenant on a site being purchased for multi-dwelling development (requires extinguishment before development -- uncertain, costly, time-consuming)
- Covenant beneficiary is an active neighbour likely to oppose extinguishment
- Covenant restricting building materials or style in a way incompatible with the proposed development
- Multiple beneficiaries (all must consent to modification)
- Recent covenant (harder to argue obsolescence)

**Typical cost to investigate:** $16.80-$33.80 (title/instrument search). Solicitor review: $500-$3,000. Covenant extinguishment application: $5,000-$50,000+ (Supreme Court if contested).

---

### 2.4 Caveats

**What it is and why it matters:**
A caveat is a notice on title that someone claims an interest in the land. It prevents the registered proprietor from dealing with the land (selling, mortgaging, subdividing) without the caveator's consent or a court order. Caveats may indicate disputes, unpaid debts, unregistered agreements, or prior contractual rights (e.g. an existing option to purchase). A caveat must be resolved before settlement can occur.

**Where to find it:**
- **NSW**: Certificate of Title (NSW LRS title search)
- **VIC**: Certificate of Title (Landata title search)

**Automation status: API-PAID**
- Visible on title search results. No free API; requires paid title search.

**Red flags / deal breakers:**
- Any caveat on a site you intend to purchase (must be removed or dealt with before settlement)
- Caveat from a third party claiming a prior purchase agreement or option
- Caveat from a creditor (indicates financial distress of the current owner)
- Multiple caveats (complex disputes)

**Typical cost to investigate:** Included in title search ($16.80-$33.80). Solicitor to advise and negotiate caveat withdrawal: $1,000-$10,000+.

---

### 2.5 Native Title

**What it is and why it matters:**
Native title recognises the rights and interests of Aboriginal and Torres Strait Islander peoples in land and waters according to their traditional laws and customs. Under the Native Title Act 1993 (Cth), native title may exist over land that has not been previously extinguished by certain acts (e.g. freehold grant, public works). Native title is most relevant for greenfield and broadacre land, particularly in regional and remote areas. It is generally extinguished on freehold land in urban areas but may still apply to Crown land, pastoral leases, and some unallocated land.

**Where to find it:**
- **National**: National Native Title Tribunal (nntt.gov.au). Searchable register of native title claims, determinations, and Indigenous Land Use Agreements (ILUAs).
- **State**: State-specific registries and Aboriginal Land Councils.

**Automation status: HYBRID**
- The NNTT maintains a searchable spatial database of native title claims and determinations. The National Native Title Register and Register of Native Title Claims are publicly searchable.
- Detailed assessment requires legal advice.

**Red flags / deal breakers:**
- Active native title claim over or adjacent to the site
- Site is Crown land or has uncertain tenure history
- No existing ILUA for the area where one is required
- Site within a native title determination area with conditions on future use

**Typical cost to investigate:** $0 (NNTT search is free). Legal advice: $1,000-$10,000. ILUA negotiation (if required): $50,000-$500,000+.

---

### 2.6 Crown Land / Road Reservations

**What it is and why it matters:**
Crown land is land owned by the state government. It may adjoin or be included within a development site (e.g. unformed road reserves, laneways, Crown land parcels between private lots). Road reservations may indicate future road widening that will require land dedication. Crown land cannot be purchased through normal channels -- it requires application to the relevant state authority. Unformed road reserves can sometimes be closed and purchased (road closure application to council), adding to the developable area.

**Where to find it:**
- **NSW**: Crown land status via NSW Spatial Services / Crown Lands. Road reservations via council and RMS/TfNSW.
- **VIC**: Crown land via DELWP. Road reservations via VicRoads/DoT and council.
- **Both**: Title search will show if a lot is Crown land. Road reserves are shown on deposited plans and cadastral maps.

**Automation status: API-PARTIAL**
- Cadastral data (free APIs) shows lot boundaries, road corridors, and Crown road reserves.
- NSW Spatial Services FeatureServer includes Road Corridor (Layer 5) and Road (Layer 6) layers.
- Crown land status requires title/tenure search.

**Red flags / deal breakers:**
- Road widening reservation affecting the site frontage (reduces developable area, triggers compulsory acquisition provisions)
- Crown land within the assumed development footprint
- Unresolved Crown land claim or pending gazettal
- PAO (Public Acquisition Overlay) in VIC indicating government acquisition intent

**Typical cost to investigate:** $0-$50 (cadastral/title search). Road widening inquiry to council/TfNSW: free. Solicitor advice on Crown land implications: $500-$3,000.

---

### 2.7 Encroachments

**What it is and why it matters:**
An encroachment occurs when a structure (building, fence, retaining wall, driveway, tree) from one property extends onto an adjacent property. Encroachments can affect buildable area, create legal disputes, and complicate development. A neighbour's garage built 500mm over the boundary may need to be removed or formalised before development can proceed. Conversely, if structures on the subject site encroach onto neighbouring land, this must be resolved.

**Where to find it:**
- **Physical**: Detail/feature survey is the definitive method. The surveyor marks actual boundary positions relative to existing structures.
- **Visual**: Site inspection may reveal obvious encroachments.
- **Historical**: Aerial photography (Nearmap, SIX Maps, Google Earth historical imagery).

**Automation status: MANUAL**
- Encroachments are physical conditions that require survey and inspection.
- High-resolution aerial imagery (Nearmap API) can sometimes indicate encroachments but is not definitive.

**Red flags / deal breakers:**
- Neighbour's substantial structure (wall, building) encroaching onto the site
- Subject site's structure encroaching onto neighbour's land (must be resolved)
- Disputed boundary location (requires re-survey and potentially Land and Environment Court proceedings in NSW, VCAT in VIC)
- Retaining wall encroachment with significant level difference

**Typical cost to investigate:** Included in detail/feature survey ($3,000-$20,000). Surveyor boundary mark-out: $1,500-$5,000. Legal resolution: $5,000-$50,000+.

---

### 2.8 Section 10.7 Planning Certificate (NSW) or Equivalent

**What it is and why it matters:**
The s10.7 planning certificate (formerly s149 certificate) is the definitive legal document summarising all planning controls affecting a parcel of land in NSW. It is issued by the local council and includes: zoning, permitted/prohibited uses, heritage listing, flood affectation, bushfire prone land, contamination notices, road widening, land acquisition, contributions plans, and other matters prescribed by the EP&A Regulation. There are two types:
- **s10.7(2)**: Basic certificate listing prescribed matters only (~$53)
- **s10.7(5)**: Comprehensive certificate including council's additional advice on any matter affecting the land (e.g. draft LEPs, known contamination, planned infrastructure). ~$153. This is the one developers should always order.

In VIC, the equivalent is a combination of the Planning Property Report (from council or VicPlan) and a Property Information Certificate.

**Where to find it:**
- **NSW**: Order from the relevant local council via the NSW Planning Portal or directly from council. Turnaround: 1-5 business days (standard), 1-2 days (urgent).
- **VIC**: Planning Property Report from council. Also available via VicPlan online tool (less comprehensive).
- **QLD**: Planning and Development Certificate from council.

**Automation status: MANUAL (ordering) / API-PARTIAL (contents)**
- The certificate must be ordered from council (not automatable via free API).
- Most of the information contained in a s10.7 certificate CAN be assembled from free APIs (zoning, FSR, height, heritage, bushfire, flood layers) -- this is a key automation opportunity.
- However, the certificate includes council-specific items (contributions plans, draft amendments, special drainage areas, etc.) that are not available via API.
- The s10.7(5) is legally authoritative in a way that API data is not -- it should always be obtained for any serious acquisition.

**Red flags / deal breakers:**
- Contamination notice on the certificate (triggers mandatory investigation)
- Land acquisition or road widening notation
- Discrepancy between certificate and what was assumed from spatial data
- Council advice (s10.7(5)) flagging significant issues not visible in standard data

**Typical cost to investigate:** $53 (basic s10.7(2)) to $153 (comprehensive s10.7(5)) per lot in NSW. VIC equivalent: ~$55. Multi-lot sites require a certificate per lot or per parcel.

---

### 2.9 Contamination Notices on Title

**What it is and why it matters:**
In NSW, if land is declared "significantly contaminated" under the Contaminated Land Management Act 1997, a notice is placed on the s10.7 certificate and may be recorded in the EPA's Contaminated Land Record (CLR). In VIC, the EPA maintains a Priority Sites Register. A contamination notice triggers mandatory investigation and potentially remediation before residential development can occur. This can cost $500,000 to $10,000,000+ and take years.

**Where to find it:**
- **NSW**: s10.7 planning certificate (mandatory disclosure). EPA Contaminated Land Record (epa.nsw.gov.au -- publicly searchable). EPA POEO licence register.
- **VIC**: EPA Priority Sites Register (epa.vic.gov.au). Section 32 vendor statement. Environmental audit overlay on VicPlan.
- **National**: Phase 1 Preliminary Site Investigation (PSI) by environmental consultant reviews all registers plus historical uses.

**Automation status: HYBRID**
- EPA contaminated land registers are publicly searchable online (NSW CLR, VIC Priority Sites Register).
- s10.7 certificate will disclose any notices (must be ordered from council).
- Historical contamination risk from previous land uses (petrol stations, dry cleaners, factories, orchards) requires historical aerial photo review and database searches -- partially automatable.

**Red flags / deal breakers:**
- Land listed on EPA Contaminated Land Record or Priority Sites Register (mandatory investigation)
- Previous use as petrol station, service station, dry cleaner, factory, tannery, landfill, chemical storage, market garden (high contamination probability)
- Contamination notice on s10.7 certificate
- Neighbouring contaminated site (potential for contaminant migration)
- Asbestos-containing materials on existing buildings (common in pre-1990 structures)

**Typical cost to investigate:** $0 (EPA register search is free). Phase 1 PSI: $5,000-$15,000. Phase 2 DSI (if triggered): $15,000-$100,000+. Remediation: $100,000-$10,000,000+.

---

## 3. Environmental & Physical

### 3.1 Flood Risk (1% AEP, PMF)

**What it is and why it matters:**
Flood risk is assessed against two key levels:
- **1% AEP (Annual Exceedance Probability)**: The flood level with a 1% chance of occurring in any given year (formerly called "1 in 100 year" flood). This is the standard planning level in most jurisdictions. The "flood planning level" is typically the 1% AEP level plus a freeboard (usually 0.5m).
- **PMF (Probable Maximum Flood)**: The theoretical worst-case flood. Land between the 1% AEP and PMF is in the "flood planning area" and subject to controls, but development is generally permissible with conditions.

Flood affectation can: require raised floor levels (increasing construction cost), restrict basement parking, limit density, require flood-compatible materials below flood level, trigger referral to state agencies, or in severe cases prohibit development entirely.

**Where to find it:**
- **NSW**: Council flood studies (each council commissions its own). NSW Flood Data Portal (flooddata.ses.nsw.gov.au). ePlanning Flood Planning Map (Layer 230 -- but coverage is incomplete as not all councils have digitised their flood mapping into the LEP system). s10.7 certificate will note flood affectation.
- **VIC**: Melbourne Water flood mapping (for Melbourne metro). VicPlan overlays: LSIO (Land Subject to Inundation Overlay), SBO (Special Building Overlay), FO (Floodway Overlay). Available via WFS `plan_overlay` layer.
- **Both**: Detailed site-specific flood assessment by a hydraulic engineer if the site is in or near a flood-prone area.

**Automation status: API-PARTIAL**
- **NSW**: ePlanning Hazard MapServer Layer 230 (free, no auth) -- but coverage is incomplete. Many flood-affected areas are not yet in this layer.
- **VIC**: `plan_overlay` WFS with `scheme_code` filter for LSIO, SBO, FO (free, no auth). Also `open-data-platform:vic_flood_history_public` for historical flood extents.
- Detailed flood levels (1% AEP depth, velocity, PMF extent) require council flood studies -- not available via API.

**Red flags / deal breakers:**
- Site in the floodway (FO overlay in VIC) -- development generally prohibited
- High-hazard flood area (deep water + high velocity) -- may prohibit residential
- 1% AEP flood level above practical floor level raising (e.g. 2m+ above natural ground)
- No flood study available (council may require the developer to commission one: $50,000-$200,000+)
- Climate change projections increasing future flood levels
- Flood-affected access road (development may be refused if safe evacuation cannot be demonstrated)
- Flash flood catchment (rapid rise, limited warning time)

**Typical cost to investigate:** $0 (portal/API initial screening). Flood certificate from council: $50-$200. Detailed flood assessment by hydraulic engineer: $5,000-$30,000. Developer-funded flood study: $50,000-$200,000+.

---

### 3.2 Bushfire Prone Land (BAL Ratings, APZ Requirements)

**What it is and why it matters:**
Land mapped as "bushfire prone" triggers mandatory assessment under AS 3959 (Construction of buildings in bushfire-prone areas) and relevant state policy (NSW: Planning for Bush Fire Protection 2019; VIC: Clause 13.02, BMO provisions). The BAL (Bushfire Attack Level) rating system ranges from BAL-LOW to BAL-FLO (Flame Zone):
- **BAL-LOW**: No additional construction requirements
- **BAL-12.5 to BAL-29**: Progressively more expensive construction (ember protection, non-combustible materials, specific glazing)
- **BAL-40**: Significant construction upgrades, limited window openings
- **BAL-FLO (Flame Zone)**: Extreme construction requirements, some development may be prohibited

APZ (Asset Protection Zone) is a buffer of managed vegetation between the development and the bushfire hazard. APZ requirements can consume 10-100m+ of the site, significantly reducing developable area. In NSW, the Rural Fire Service (RFS) is a mandatory referral authority and can impose conditions or object.

**Where to find it:**
- **NSW**: RFS Bushfire Prone Land Map (rfs.nsw.gov.au). ePlanning Hazard MapServer Layer 229 (free API). s10.7 certificate.
- **VIC**: VicPlan BMO overlay. `plan_overlay` WFS layer. Also `open-data-platform:bushfire_prone_area` WFS layer for broader bushfire prone land mapping.
- **Both**: BAL assessment by a bushfire consultant (required for any development on bushfire prone land).

**Automation status: API-AUTO (initial screening) / HYBRID (full assessment)**
- **NSW**: ePlanning Layer 229 returns bushfire vegetation category (1, 2, 3) and guideline version. No auth, ~150-230ms.
- **VIC**: `plan_overlay` WFS for BMO overlay; `bushfire_prone_area` WFS for broader mapping.
- Full BAL assessment requires a site-specific analysis by a bushfire consultant considering vegetation type, slope, and distance.

**Red flags / deal breakers:**
- BAL-40 or BAL-FLO assessment (extreme construction cost, potential prohibition)
- Large APZ requirement that consumes most of the site
- Vegetation Category 1 on steep upslope (highest risk scenario)
- RFS objection history in the locality
- Access road through bushfire-prone area with limited escape routes
- Site requires APZ on neighbouring land (neighbour consent needed)

**Typical cost to investigate:** $0 (initial screening via API). BAL assessment by bushfire consultant: $2,000-$10,000. Bushfire protection plan: $5,000-$15,000. Additional construction cost for BAL compliance: 5-30% above standard construction.

---

### 3.3 Contaminated Land (Phase 1 PSI, Phase 2 DSI)

**What it is and why it matters:**
Contaminated land is land where substances are present at concentrations above background levels that pose, or are likely to pose, an immediate or long-term risk to human health or the environment. The investigation process follows a staged approach:
- **Phase 1 PSI (Preliminary Site Investigation)**: Desktop study + site walkover. Reviews historical aerial photographs, EPA registers, previous reports, geological maps, and interviews. Identifies potential contamination sources and recommends whether Phase 2 is required.
- **Phase 2 DSI (Detailed Site Investigation)**: Intrusive investigation with soil sampling, groundwater monitoring wells, and laboratory analysis. Determines the nature and extent of contamination and whether remediation is required.
- **RAP (Remediation Action Plan)**: If contamination is confirmed, a plan is prepared for remediation.
- **Site Audit**: For residential development on previously contaminated land, a Site Auditor (accredited by the EPA) must sign off that the land is suitable for the intended use.

SEPP (Resilience and Hazards) 2021, Chapter 4 (NSW) requires contamination assessment for any change of use to a more sensitive use (e.g. industrial to residential).

**Where to find it:**
- **NSW EPA CLR**: epa.nsw.gov.au/your-environment/contaminated-land (free public search)
- **VIC EPA Priority Sites Register**: epa.vic.gov.au (free public search)
- **s10.7 certificate**: Will note any contamination orders or declarations
- **Historical aerial photos**: NSW Spatial Services historical imagery, State Library collections
- **Council records**: Previous DA files, building records for the site
- **SafeWork NSW / WorkSafe VIC**: Asbestos and hazardous materials registers

**Automation status: HYBRID**
- EPA register searches are free and web-searchable (partially automatable via web scraping).
- Historical land use risk assessment can be partially automated using historical aerial imagery and land use data.
- Physical investigation (sampling, laboratory analysis) is inherently manual.

**Red flags / deal breakers:**
- Site on EPA Contaminated Land Record or Priority Sites Register
- Former petrol station, dry cleaner, factory, tannery, landfill, market garden, orchard (pesticides), railway yard, hospital/laboratory
- Fill of unknown origin (very common in former low-lying areas)
- Visible contamination indicators (staining, odours, stressed vegetation, waste material)
- Underground storage tanks (USTs) present or suspected
- Asbestos in soil or existing buildings
- Groundwater contamination (can migrate from off-site sources)
- Remediation cost exceeding site value (not uncommon for heavily contaminated sites)

**Typical cost to investigate:** Phase 1 PSI: $5,000-$15,000. Phase 2 DSI: $15,000-$100,000+. Remediation: $100,000-$10,000,000+. Site Audit: $15,000-$50,000.

---

### 3.4 Acid Sulfate Soils

**What it is and why it matters:**
Acid sulfate soils (ASS) contain iron sulfides that, when exposed to air through excavation or lowering of the water table, produce sulfuric acid. This acid can corrode concrete and steel, damage infrastructure, kill vegetation, and pollute waterways. ASS are common in coastal and estuarine areas, floodplains, and low-lying land (generally below 5m AHD). NSW LEPs classify ASS into Classes 1-5 based on probability, with Class 1 being the highest risk. Any works disturbing the soil in ASS areas require an ASS Management Plan.

**Where to find it:**
- **NSW**: LEP Acid Sulfate Soils Map (ePlanning Spatial Viewer). LEP Clause 6.1. s10.7 certificate.
- **VIC**: Planning scheme overlays and state-level mapping. Victorian Coastal Acid Sulfate Soils Strategy.
- **Both**: Geotechnical investigation will identify ASS if present.

**Automation status: API-AUTO (NSW)**
- **NSW**: ePlanning ArcGIS REST includes an Acid Sulfate Soils layer in the Principal Planning MapServer. Returns ASS class (1-5).
- **VIC**: ASS mapping is available through state environmental datasets but less systematically integrated into the planning overlay system.

**Red flags / deal breakers:**
- Class 1 or 2 ASS requiring extensive management during excavation
- Site requiring deep excavation (basement) in ASS area (significantly increased excavation and disposal costs)
- Proximity to sensitive waterways (strict EPA requirements for runoff management)
- Large volume of ASS material requiring off-site treatment and disposal

**Typical cost to investigate:** $0 (initial screening via API/portal). ASS assessment (part of geotechnical investigation): $3,000-$10,000. ASS Management Plan: $5,000-$15,000. Treatment/neutralisation during construction: $20-$60 per tonne of affected material.

---

### 3.5 Biodiversity / Threatened Species

**What it is and why it matters:**
The presence of threatened species, endangered ecological communities, or significant biodiversity values can severely constrain or prevent development. In NSW, the Biodiversity Conservation Act 2016 and Biodiversity Offsets Scheme (BOS) apply. If native vegetation clearing exceeds certain thresholds (varies by region -- can be as low as 0.25 ha on certain land), a Biodiversity Development Assessment Report (BDAR) is required, and biodiversity offsets must be purchased (credits at market rates -- often $50,000-$500,000+ depending on the species/community). Federally, the EPBC Act 1999 protects matters of national environmental significance.

**Where to find it:**
- **Federal**: EPBC Act Protected Matters Search Tool (dcceew.gov.au) -- free online search that identifies potential threatened species, ecological communities, and other MNES within a defined area.
- **NSW**: BioNet (Biodiversity Information System) -- records of threatened species sightings. Biodiversity Values Map (identifies land with high biodiversity value where the BOS is triggered).
- **VIC**: Victorian Biodiversity Atlas. NatureKit mapping tool. ESO and VPO overlays on VicPlan.
- **Both**: Ecological assessment by an ecologist is required for sites with potential biodiversity values.

**Automation status: HYBRID**
- EPBC Protected Matters Search Tool is web-based (automatable via web scraping or potentially API).
- NSW Biodiversity Values Map is available as a spatial layer.
- VIC ESO/VPO overlays available via WFS.
- Actual species presence requires field survey by a qualified ecologist.

**Red flags / deal breakers:**
- Site contains or is adjacent to an endangered ecological community
- Threatened species records on or near the site
- Large biodiversity offset credit requirement (can cost $50,000-$500,000+ and take months to procure)
- Site mapped on the NSW Biodiversity Values Map
- Koala habitat (increasingly strict protections in NSW and QLD)
- Remnant vegetation with hollow-bearing trees (habitat for threatened fauna)
- EPBC Act referral required (adds 4-12+ months to the approval timeline)

**Typical cost to investigate:** $0 (initial database searches). Ecological assessment: $3,000-$30,000. BDAR (if required): $10,000-$50,000+. Biodiversity offset credits: $50,000-$500,000+.

---

### 3.6 Riparian Corridors / Waterways

**What it is and why it matters:**
Riparian corridors are the vegetated areas along waterways (creeks, rivers, lakes, wetlands). Most jurisdictions require setbacks from waterways to protect water quality, aquatic habitat, and bank stability. In NSW, guidelines from the former Office of Water (now NRAR) recommend riparian corridors of 10m (for minor first-order streams) to 40m+ (for major waterways) from the top of bank on each side. This land is effectively undevelopable. In VIC, Melbourne Water requires setbacks and may hold a drainage easement.

**Where to find it:**
- **NSW**: Riparian lands and waterways are mapped in LEPs and DWE (Department of Water and Energy) mapping. Council DCPs often specify required riparian setbacks. NRAR (Natural Resources Access Regulator) guidelines.
- **VIC**: Melbourne Water referral requirements. Council planning schemes. Waterway and floodplain overlays (LSIO, FO).
- **Both**: Cadastral mapping shows waterway corridors. Detail survey identifies top of bank.

**Automation status: API-PARTIAL**
- Waterway corridors visible in cadastral data (free APIs).
- NSW Water Feature layers available on NSW Spatial Services FeatureServer (Layers 2, 3).
- Specific riparian setback requirements are in DCPs/planning schemes (not API-accessible).

**Red flags / deal breakers:**
- Major waterway through or adjacent to the site requiring 40m+ riparian corridor
- Riparian corridor consuming more than 20% of the site
- Requirement to revegetate the riparian corridor at developer's expense
- NRAR or Melbourne Water objection to development within the riparian zone
- Stormwater management requirements for development near waterways (bio-retention, WSUD)

**Typical cost to investigate:** $0 (initial screening via cadastral/aerial). Riparian assessment: $3,000-$10,000. NRAR referral/consultation: $0 (but can add months to timeline).

---

### 3.7 Trees (Significant Trees, TPZ)

**What it is and why it matters:**
Existing trees on a development site can significantly constrain the building footprint. Many councils protect trees above a certain size (typically >5m height or >300mm trunk diameter) through Tree Preservation Orders (TPOs) or planning scheme controls. The Tree Protection Zone (TPZ) is a circular area around the tree trunk (radius = 12 x trunk diameter at breast height, per AS 4970) within which excavation, construction, and compaction are restricted. A single large tree with a 6m TPZ can sterilise a significant portion of a small site. Some trees are classified as "significant" or "heritage" and effectively cannot be removed under any circumstances.

**Where to find it:**
- **NSW**: Council TPO/tree preservation provisions (in DCP or standalone policy). Some councils have significant tree registers. DA required for removal of protected trees.
- **VIC**: Planning scheme clause 52.17 (Native vegetation) and local tree controls. Some councils have significant tree registers. VPO (Vegetation Protection Overlay) on VicPlan.
- **Both**: Arborist report identifies all trees, their condition, significance, and TPZ.

**Automation status: MANUAL**
- No API provides individual tree data (though some councils maintain significant tree registers).
- VIC VPO overlay available via WFS (identifies areas, not individual trees).
- Aerial imagery (Nearmap) can indicate tree canopy extent but not species, size, or significance.
- Arborist site inspection is required for any detailed assessment.

**Red flags / deal breakers:**
- Large, healthy trees in the centre of the site with TPZs that overlap the proposed building footprint
- Significant or heritage-listed trees that cannot be removed
- Multiple mature trees requiring extensive redesign to retain
- Trees with Endangered Ecological Community status (cannot be removed)
- Council with very strict tree preservation culture (e.g. Ku-ring-gai, Willoughby in Sydney)
- Tree bond/replacement requirements ($5,000-$50,000+ per tree removed)

**Typical cost to investigate:** Arborist report: $2,000-$8,000. Tree removal permits (if granted): $200-$500 per tree. Tree bonds: $5,000-$50,000+ per significant tree. Replacement planting requirements: $1,000-$10,000.

---

### 3.8 Geotechnical Conditions (Soil, Rock, Water Table)

**What it is and why it matters:**
Geotechnical conditions directly affect construction method, foundation design, excavation cost, and buildability. Key factors:
- **Soil type and bearing capacity**: Determines foundation requirements (strip footings vs. piers vs. piles vs. raft)
- **Rock**: Shallow rock can make excavation extremely expensive ($200-$500/m3 for rock breaking/hammering vs $20-$50/m3 for soil)
- **Water table**: High water table affects basement feasibility, requires dewatering during construction, and may require waterproof tanking
- **Soil reactivity**: Highly reactive clay soils (Class H, E, P per AS 2870) require more expensive foundation systems
- **Fill**: Uncontrolled or contaminated fill requires removal or treatment
- **Slope stability**: Steep sites may require retaining walls, piling, or engineered slopes

**Where to find it:**
- **Preliminary**: Geological maps (Geoscience Australia, state geological surveys). Previous geotechnical reports for nearby sites (sometimes available from council DA files).
- **Definitive**: Geotechnical investigation by a geotech engineer (boreholes, test pits, laboratory testing).
- **NSW**: Geoscience Australia maps (ga.gov.au). NSW Soil and Land Information System (SALIS).
- **VIC**: Geological Survey of Victoria. GeoVic online mapping.

**Automation status: HYBRID**
- Geological mapping available via Geoscience Australia WMS/WFS (broad scale only).
- Soil landscape mapping available for some areas.
- Actual site conditions require physical investigation (boreholes).

**Red flags / deal breakers:**
- Shallow sandstone or basalt rock requiring expensive excavation for basement
- High water table (within 2m of surface) preventing basement or requiring dewatering
- Highly reactive clay (Class P or E) requiring piled or waffle raft foundations
- Uncontrolled fill of unknown depth and composition
- Steep site (>15% grade) requiring significant retaining structures
- Former mine workings or tunnels beneath the site
- Salinity issues (salt-affected soils corrode concrete and steel)

**Typical cost to investigate:** Desktop geological review: $500-$1,500. Geotechnical investigation (boreholes + lab testing): $3,000-$15,000 (more for large sites). Additional testing (groundwater, contamination): $5,000-$20,000.

---

### 3.9 Mine Subsidence

**What it is and why it matters:**
In areas with historical or active underground mining (primarily coal, but also other minerals), the ground can subside as mine workings collapse. This can damage buildings, infrastructure, and services. In NSW, the Subsidence Advisory NSW manages mine subsidence districts. Development in these districts requires approval from Subsidence Advisory NSW, and specific engineering measures may be required. In VIC, mine subsidence is managed through the Earth Resources Regulator.

**Where to find it:**
- **NSW**: Subsidence Advisory NSW (subsidenceadvisory.nsw.gov.au). Mine Subsidence District maps. s10.7 certificate will note if land is within a mine subsidence district.
- **VIC**: Earth Resources Regulator. GeoVic mapping shows historical mine workings.
- **Both**: Geotechnical investigation can identify evidence of mining.

**Automation status: API-PARTIAL**
- Mine Subsidence District boundaries may be available as spatial data from Subsidence Advisory NSW.
- Historical mining data available through state geological surveys.
- Detailed subsidence risk assessment requires specialist engineering.

**Red flags / deal breakers:**
- Site within a declared Mine Subsidence District
- Active longwall mining beneath or near the site
- Historical shaft or adit locations on or near the site
- Evidence of previous subsidence events in the area
- Subsidence Advisory NSW imposing significant conditions or restrictions on development

**Typical cost to investigate:** $0 (initial register/map check). Mine subsidence assessment: $3,000-$10,000. Structural engineering for subsidence-resistant design: $5,000-$20,000 additional.

---

### 3.10 Coastal Erosion / Hazards

**What it is and why it matters:**
Coastal land is subject to erosion (recession of the shoreline over time), coastal inundation (flooding from sea level rise and storm surge), and geotechnical instability (cliff collapse). Under SEPP (Resilience and Hazards) 2021, Chapter 2 (NSW), and similar state policies, development on coastal land must consider hazard lines that project erosion and inundation over 50-100 year timeframes. Land seaward of the hazard line may be undevelopable.

**Where to find it:**
- **NSW**: Coastal Management Maps (via council or NSW Planning Portal). SEPP (Resilience and Hazards) 2021, Chapter 2. Council Coastal Zone Management Plans / Coastal Management Programs. s10.7 certificate.
- **VIC**: Coastal hazard assessments. Future Coasts program. LSIO overlay for coastal inundation.
- **National**: CoastAdapt (National Climate Change Adaptation Research Facility) for sea level rise projections.

**Automation status: API-PARTIAL**
- Coastal hazard mapping may be available through state planning portals.
- VIC LSIO overlay available via WFS for coastal inundation areas.
- Detailed coastal hazard assessment requires specialist consultant.

**Red flags / deal breakers:**
- Site within a coastal erosion hazard zone (may sterilise all or most of the land)
- Projected sea level rise inundating the site within a 100-year planning horizon
- Active cliff erosion at or near the site
- No coastal management program in place for the area (council may refuse development)
- Insurance unavailability for coastal hazard properties

**Typical cost to investigate:** $0 (initial screening via portal/maps). Coastal hazard assessment: $10,000-$50,000. Geotechnical investigation for cliff stability: $5,000-$20,000.

---

## 4. Heritage

### 4.1 Local Heritage Items (LEP / Planning Scheme)

**What it is and why it matters:**
Local heritage items are buildings, structures, places, trees, or areas listed in the LEP (NSW) or Heritage Overlay (VIC) as having heritage significance. Development of heritage items or within heritage conservation areas requires heritage impact assessment and council/heritage adviser approval. Demolition of a heritage item is generally prohibited (or requires extraordinary justification). Even development near a heritage item may be constrained by requirements to be "sympathetic" to the heritage character. Heritage listing can significantly reduce development potential or increase design/approval costs.

**Where to find it:**
- **NSW**: LEP Heritage Map and Schedule 5 (ePlanning or council website). s10.7 certificate.
- **VIC**: Heritage Overlay (HO) on VicPlan. Planning scheme Schedule to the Heritage Overlay.
- **Both**: Heritage inventory entries (detailed significance statements) from council or state heritage databases.

**Automation status: API-AUTO**
- **NSW**: ePlanning ArcGIS REST Layer 16 (EPI Heritage). Returns `H_ID` (heritage item number), `H_NAME` (item name), `SIG` (significance level -- "Local" or "State"), `LAY_CLASS` (type -- "Item - General" or "Conservation Area"). Free, no auth, ~133ms.
- **VIC**: `plan_overlay` WFS with `scheme_code='HO'` filter. Returns Heritage Overlay schedule number.

**Red flags / deal breakers:**
- Site IS a heritage item (demolition likely prohibited; adaptive reuse or retention required)
- Site within a Heritage Conservation Area (new development must be "sympathetic" -- restricts height, materials, form)
- Adjacent to a heritage item (development may be refused if it adversely affects the heritage significance or setting)
- Heritage item of State significance (Heritage Council is a referral/consent authority -- adds months)
- Heritage significance statement indicates high archaeological potential

**Typical cost to investigate:** $0 (initial screening via API). Heritage impact statement (if required): $5,000-$20,000. Heritage architect (design for heritage context): $10,000-$50,000+.

---

### 4.2 State Heritage Register

**What it is and why it matters:**
Items on the State Heritage Register have the highest level of state-level heritage protection. In NSW, the Heritage Council of NSW must approve works to state heritage items (including alterations, additions, and demolition) under a Section 60 application. In VIC, Heritage Victoria administers the Heritage Register, and a permit is required for works. State heritage listing adds a significant layer of regulatory approval, cost, and delay. The Heritage Council can and does refuse applications.

**Where to find it:**
- **NSW**: NSW State Heritage Register (environment.nsw.gov.au/topics/heritage). ePlanning ArcGIS REST Layer 221 (State Heritage Register Curtilage). Heritage NSW website has a searchable database.
- **VIC**: Victorian Heritage Database (vhd.heritagecouncil.vic.gov.au). Heritage Register administered by Heritage Victoria.
- **National**: Australian Heritage Database (dcceew.gov.au) for items on the National Heritage List and Commonwealth Heritage List.

**Automation status: API-AUTO (NSW spatial) / HYBRID (detailed information)**
- **NSW**: ePlanning Layer 221 returns state heritage curtilage polygons with `ITEMNAME`, `ADDRESS`, `LGA`, `LISTING_DATE`. Free, no auth.
- **VIC**: Victorian Heritage Database is web-searchable but no confirmed public API.
- Full heritage significance assessments and conservation management plans require manual access.

**Red flags / deal breakers:**
- Site IS a State Heritage Register item (extremely constrained; Heritage Council approval required for any works)
- Site within the curtilage of a state heritage item
- Heritage Council known to be protective of the item or precinct
- Conservation Management Plan requires retention of specific elements that conflict with the proposed development
- State heritage listing process underway (interim protection may apply)

**Typical cost to investigate:** $0 (initial screening via API/database). Heritage impact assessment for state heritage: $10,000-$30,000. Section 60 application (NSW): council-equivalent fees. Heritage architect: $20,000-$100,000+.

---

### 4.3 Aboriginal Heritage (AHIMS Search)

**What it is and why it matters:**
Aboriginal heritage is protected under the National Parks and Wildlife Act 1974 (NSW) and the Aboriginal Heritage Act 2006 (VIC). It is an offence to harm or desecrate an Aboriginal object or place, even if it is not registered or known. In NSW, an AHIMS (Aboriginal Heritage Information Management System) search reveals known Aboriginal sites and declared Aboriginal Places within and near the site. In VIC, the Aboriginal Heritage Regulations 2018 require a Cultural Heritage Management Plan (CHMP) for certain activities in areas of cultural heritage sensitivity. The duty of care applies to all land, not just registered sites.

**Where to find it:**
- **NSW**: AHIMS search via Heritage NSW (environment.nsw.gov.au/topics/aboriginal-cultural-heritage/search-for-aboriginal-sites). Online or by application. Turnaround: immediate online for basic search; detailed searches 10-20 days.
- **VIC**: Aboriginal Victoria (av.vic.gov.au). Victorian Aboriginal Heritage Register (VAHR). Cultural Heritage Sensitivity mapping.
- **National**: Registered Aboriginal sites databases in each state/territory.
- **Both**: Aboriginal heritage assessment by a heritage consultant, often in conjunction with the relevant Local Aboriginal Land Council (LALC) or Registered Aboriginal Party (RAP).

**Automation status: HYBRID**
- **NSW**: AHIMS basic search is available online (fee-based, $0 for basic, $58 for extensive search). Results show registered sites within a search area.
- **VIC**: Cultural Heritage Sensitivity areas are mapped and may be available as spatial data.
- Detailed assessment requires consultation with Aboriginal communities and potentially archaeological survey.

**Red flags / deal breakers:**
- Known Aboriginal sites on or near the site (AHIMS/VAHR records)
- Site in an area of high cultural heritage sensitivity (near waterways, elevated land with views, sandstone overhangs, middens)
- Previous archaeological finds in the locality
- Requirement for a CHMP (VIC) or Aboriginal Cultural Heritage Assessment Report (NSW) -- adds 3-12+ months and $20,000-$100,000+
- Local Aboriginal Land Council objection to the development
- Discovery of Aboriginal objects during construction (stop-work requirement)

**Typical cost to investigate:** AHIMS basic search (NSW): $0 online / $58 extensive. Aboriginal heritage due diligence assessment: $5,000-$15,000. CHMP (VIC): $20,000-$80,000. Full Aboriginal Cultural Heritage Assessment (NSW): $20,000-$100,000+.

---

### 4.4 Archaeological Significance

**What it is and why it matters:**
Archaeological significance relates to both Aboriginal and historical (European/post-contact) archaeology. Sites with potential archaeological deposits (e.g. former buildings, wells, cesspits, middens, occupation deposits) may require archaeological investigation before development. In NSW, an Archaeological Assessment is required under the Heritage Act 1977 if the site is likely to contain relics. In VIC, an Archaeological Management Plan may be required under the Heritage Act 2017.

**Where to find it:**
- **NSW**: Heritage NSW archaeological site register. Heritage impact assessment. Council heritage provisions.
- **VIC**: Heritage Victoria archaeological site register. Planning scheme heritage provisions.
- **Both**: Desktop assessment by a heritage consultant reviewing historical records, maps, and previous investigations.

**Automation status: MANUAL**
- Archaeological assessment is fundamentally a specialist desktop and field investigation.
- Heritage registers provide some indication, but archaeological potential is often unrecognised until investigated.

**Red flags / deal breakers:**
- Site has known archaeological deposits
- Site is in an area of high archaeological sensitivity (e.g. early colonial settlement area, convict site)
- Heritage consultant recommends archaeological excavation before development
- Discovery of relics during construction (stop-work, excavation cost: $50,000-$500,000+)
- Aboriginal archaeological site requiring salvage excavation

**Typical cost to investigate:** Archaeological desktop assessment: $3,000-$10,000. Archaeological test excavation: $20,000-$100,000. Salvage excavation (if required): $50,000-$500,000+.

---

## 5. Infrastructure

### 5.1 Water Supply Availability and Capacity

**What it is and why it matters:**
Adequate water supply (potable/drinking water and fire-fighting water) is essential for development. In urban areas, water is provided by the relevant water utility. Developers need to confirm that existing water mains have sufficient capacity for the proposed development. Larger developments may require water main extensions, amplifications, or new connections, at the developer's cost. In greenfield areas, water infrastructure may not yet exist.

**Where to find it:**
- **Sydney metro**: Sydney Water "Tap in" system (sydneywater.com.au). Section 73 certificate application for subdivision/development. Feasibility/Servicing advice available online.
- **Melbourne metro**: Melbourne Water (wholesale) + retail water corporations (Yarra Valley Water, South East Water, City West Water). Contact the relevant retailer for capacity advice.
- **Regional NSW**: Various county councils and local water utilities.
- **Regional VIC**: Various regional water corporations.

**Automation status: MANUAL**
- Sydney Water's "Tap in" system is web-based but requires registration and project-specific application.
- No free public API for water capacity information.
- General infrastructure availability can be inferred from zoning (urban zones generally have water supply).

**Red flags / deal breakers:**
- No existing water main within feasible connection distance
- Water main capacity insufficient for the proposed development (amplification required at developer cost)
- Water pressure issues (elevated sites may require booster pumps)
- Greenfield site requiring new water infrastructure (headworks charges: $10,000-$50,000+ per lot)
- Water authority moratorium on new connections (rare but possible in drought conditions)

**Typical cost to investigate:** Feasibility/servicing advice from water authority: $0-$500. Section 73 application (Sydney Water): ~$1,000-$5,000. Headworks/developer charges: $5,000-$50,000+ per lot/dwelling.

---

### 5.2 Sewer Availability and Capacity

**What it is and why it matters:**
Sewer (wastewater) infrastructure is critical. Most urban development connects to the reticulated sewer system. Sewer capacity is often the binding infrastructure constraint for large developments, as sewer mains have limited spare capacity and amplification is expensive. Where reticulated sewer is unavailable (rural, some peri-urban areas), on-site wastewater treatment (septic, AWTS) may be required, with minimum land area requirements and setback from boundaries and waterways.

**Where to find it:**
- **Sydney**: Sydney Water "Tap in" system. Sewer mains location via Sydney Water dial-before-you-dig or plan search.
- **Melbourne**: Melbourne Water (trunk sewers) + retail water corps (local sewers).
- **Both**: Utility plan searches (sewer plan showing pipe locations, sizes, depths, and invert levels).

**Automation status: MANUAL**
- As per water supply -- utility capacity assessment requires direct application to the water/sewer authority.
- Sewer main locations are available via dial-before-you-dig (DBYD) but not as a free spatial API.

**Red flags / deal breakers:**
- No reticulated sewer available (on-site treatment may not be feasible for higher-density development)
- Sewer main at capacity (amplification cost borne by developer: $50,000-$500,000+)
- Sewer main traversing the site (easement restricts building)
- Low-lying site requiring pump station for sewer connection (ongoing maintenance cost)
- Sewer surcharge risk (existing system backs up in heavy rain)

**Typical cost to investigate:** Plan search: $30-$100. Feasibility/servicing advice: $0-$500. Developer charges: $5,000-$50,000+ per lot/dwelling. Sewer main extension/amplification: $50,000-$500,000+.

---

### 5.3 Electricity Supply and Capacity

**What it is and why it matters:**
Electricity supply capacity determines whether the local network can support the proposed development. Small developments (houses, small apartments) typically connect to existing low-voltage (LV) network. Larger developments may require transformer upgrades, new substation installation, or high-voltage (HV) feeder extension -- all at the developer's cost. Electricity supply charges can be one of the largest infrastructure costs for greenfield developments.

**Where to find it:**
- **NSW**: Ausgrid (inner Sydney), Endeavour Energy (western Sydney), Essential Energy (regional NSW). Application for connection via the relevant distributor.
- **VIC**: AusNet Services, CitiPower, Powercor, Jemena, United Energy. Application via the relevant distributor.
- **Both**: Contact the electricity distributor for a connection offer/supply estimate.

**Automation status: MANUAL**
- No free public API for electricity capacity.
- Connection applications are made through distributor-specific online portals.

**Red flags / deal breakers:**
- No existing high-voltage supply near the site (new substation required: $500,000-$2,000,000+)
- Transformer capacity at limit (upgrade required at developer cost)
- High-voltage overhead lines traversing the site (easement, EMF setbacks, visual impact)
- Site requiring embedded network (complex regulatory requirements)
- Greenfield site with no existing electricity infrastructure

**Typical cost to investigate:** Connection inquiry: $0-$500. Supply design and connection offer: $1,000-$10,000. Electricity supply charges: $5,000-$100,000+ per lot/dwelling (greenfield). Substation construction: $500,000-$2,000,000+.

---

### 5.4 Gas Availability

**What it is and why it matters:**
Natural gas availability affects dwelling design (gas vs. all-electric) and construction cost. Many new developments are now moving to all-electric design for sustainability reasons and to avoid gas connection costs. However, some projects (particularly those replacing existing gas-connected dwellings) may need to consider gas supply. In VIC, gas is widely available in metropolitan areas. In NSW, coverage varies.

**Where to find it:**
- **NSW**: Jemena (Sydney metro), other distributors in regional areas.
- **VIC**: Australian Gas Networks, Multinet Gas, AusNet Services.
- **Both**: Check gas distribution network maps or contact the distributor.

**Automation status: MANUAL**

**Red flags / deal breakers:**
- Generally not a deal breaker as all-electric is increasingly standard.
- Some councils or precincts may require gas connection.
- Gas easement across the site restricting building.

**Typical cost to investigate:** $0 (gas network check online or phone). Gas connection (if required): $2,000-$10,000 per dwelling.

---

### 5.5 Telecommunications (NBN)

**What it is and why it matters:**
All new developments must be connected to the NBN (National Broadband Network) or equivalent telecommunications infrastructure. Developers of new estates (greenfield) and MDUs (multi-dwelling units) must enter into an agreement with NBN Co for the installation of fibre infrastructure. NBN Co typically provides this at no cost for developments of 100+ lots, but smaller developments may incur charges.

**Where to find it:**
- **NBN Co**: nbnco.com.au/develop-or-plan-with-the-nbn -- developer portal for new developments.
- **Address check**: nbnco.com.au/connect-home-or-business/check-your-address (shows existing NBN availability and technology type).

**Automation status: HYBRID**
- NBN address check is web-based and could potentially be scraped.
- Developer agreements are handled through NBN Co's new development portal.

**Red flags / deal breakers:**
- Generally not a deal breaker in urban areas.
- Remote/regional areas may have limited NBN technology (satellite only).
- Very large greenfield developments may need early engagement with NBN Co for network planning.

**Typical cost to investigate:** $0 (address check). NBN new development application: $0-$5,000 (depending on size). Conduit installation (developer's scope): $1,000-$5,000 per lot.

---

### 5.6 Stormwater Drainage

**What it is and why it matters:**
Stormwater management is a critical development requirement. Development increases impervious surfaces (roofs, driveways, paving), increasing stormwater runoff. Councils and water authorities require developments to manage stormwater so that post-development flows do not exceed pre-development flows (quantity control) and that stormwater quality meets targets (quality control via WSUD -- Water Sensitive Urban Design measures such as rainwater tanks, bio-retention basins, swales, and rain gardens).

**Where to find it:**
- **NSW**: Council DCP stormwater requirements. Sydney Water requirements for subdivision. Council drainage plans.
- **VIC**: Melbourne Water development requirements. Council planning scheme and drainage requirements. WSUD guidelines.
- **Both**: Civil engineer stormwater design. Council pre-DA advice.

**Automation status: MANUAL**
- Stormwater requirements are council and site-specific.
- Some drainage infrastructure data available via utility plan searches and DBYD.

**Red flags / deal breakers:**
- No existing stormwater infrastructure for the site to connect to
- Site is a natural drainage depression (receives overland flow from surrounding properties)
- Council requiring on-site detention (OSD) that consumes significant site area
- Stormwater quality targets requiring extensive bio-retention areas
- Overland flow path through the site (cannot be obstructed, limits building footprint)

**Typical cost to investigate:** Council drainage plan search: $50-$200. Stormwater concept design: $3,000-$10,000. Detailed stormwater design: $5,000-$30,000.

---

### 5.7 Road Access and Capacity

**What it is and why it matters:**
Adequate road access is essential. Development must have legal access from a public road. Larger developments may require traffic impact assessment demonstrating that the road network can accommodate additional traffic, and may need to fund intersection upgrades, road widening, or new road construction. Developments exceeding certain traffic generation thresholds (typically 50-100 peak-hour vehicle trips) trigger referral to the state road authority (TfNSW in NSW, DoT in VIC).

**Where to find it:**
- **NSW**: Council road and traffic requirements (DCP). TfNSW for state/classified roads. RMS (now TfNSW) traffic data portal.
- **VIC**: Council and DoT requirements. VicRoads traffic data.
- **Both**: Traffic impact assessment by a traffic engineer.

**Automation status: MANUAL**
- Road network and classification data available via state road authority datasets.
- Traffic volume data available from some state portals.
- Site-specific access feasibility requires traffic engineer assessment.

**Red flags / deal breakers:**
- No legal road access to the site (landlocked parcel)
- Access from a classified/arterial road (state authority approval required, may be refused)
- Intersection at or near capacity (upgrade required at developer cost: $100,000-$2,000,000+)
- Poor sight distance at the access point
- Narrow road unable to accommodate additional traffic
- State road authority imposing road widening / land dedication requirement

**Typical cost to investigate:** $0 (initial assessment from aerial/maps). Traffic impact assessment: $5,000-$25,000. Intersection upgrade: $100,000-$2,000,000+.

---

### 5.8 Public Transport Proximity

**What it is and why it matters:**
Proximity to public transport affects: planning controls (many councils and SEPPs allow increased density near rail stations and high-frequency bus routes), car parking rates (reduced parking requirements near public transport), market appeal and sale prices, and eligibility for specific planning pathways (NSW TOD SEPP applies within 400m-1,200m of specified rail stations). Transport-oriented development is a major policy direction in all Australian capitals.

**Where to find it:**
- **NSW**: Transport for NSW open data (opendata.transport.nsw.gov.au) -- GTFS data for all public transport routes and stops.
- **VIC**: PTV open data (ptv.vic.gov.au/footer/data-and-reporting/datasets/) -- GTFS data.
- **Both**: Google Maps, TripPlanner, or PTV Journey Planner for quick proximity checks.

**Automation status: API-AUTO**
- GTFS (General Transit Feed Specification) data is freely available for all Australian states.
- Bus stop, train station, tram stop, and ferry wharf locations with route data.
- Distance calculation from a site to nearest stop/station is trivially automatable.

**Red flags / deal breakers:**
- Generally not a deal breaker (but proximity is a significant value driver).
- Site far from public transport may face higher parking requirements and lower market appeal.
- Conversely, proximity to rail may trigger acoustic requirements (noise attenuation).

**Typical cost to investigate:** $0 (free open data).

---

## 6. Development Potential

### 6.1 Maximum GFA Calculation

**What it is and why it matters:**
The maximum Gross Floor Area (GFA) is the primary measure of development potential. For sites governed by FSR: Maximum GFA = Site Area x FSR. For sites without FSR (common in low-density zones and Victoria), GFA is derived from the building envelope (height x setbacks x site coverage) minus non-habitable areas. The actual achievable GFA is typically 5-15% less than the theoretical maximum due to architectural inefficiency, setback irregularities, and other constraints.

**Where to find it:**
- Calculated from planning controls (FSR, height, setbacks, site coverage).
- Town planner or architect analysis.

**Automation status: API-PARTIAL**
- FSR (NSW) and site area are API-retrievable. The multiplication is trivial.
- For sites without FSR, calculating the building envelope requires setback data (DCP -- not API-accessible) and height data (API-accessible).
- Archistar offers automated yield estimation through their platform.

**Red flags / deal breakers:**
- Achievable GFA significantly less than expected (due to setbacks, solar access, or design constraints eating into the theoretical maximum)
- GFA bonus provisions not applicable (design excellence, affordable housing, community infrastructure bonuses have qualifying criteria)

**Typical cost to investigate:** $0 (if FSR is known, calculation is simple). Town planner yield analysis: $2,000-$5,000. Architect test-fit/massing study: $5,000-$20,000.

---

### 6.2 Dwelling Yield Estimation

**What it is and why it matters:**
Dwelling yield is the number of dwellings (apartments, townhouses, or lots) achievable on the site. This is the key input to revenue estimation.

**Estimation methods:**
- **Apartments**: GFA / average apartment size (typically 65-85 sqm for a mix). Adjust for efficiency (saleable area = 75-85% of GFA due to common areas, lobbies, plant rooms, stairs, lifts).
- **Townhouses**: Site area / minimum lot size per dwelling, or number of 6-7m wide lots fitting the frontage.
- **Subdivision (lots)**: Net developable area (gross - roads/open space, typically 65-75%) / average lot size.

**Where to find it:**
- Calculated from planning controls and site dimensions.
- Architect test-fit study for detailed yield.

**Automation status: API-PARTIAL**
- Basic yield estimation from FSR/GFA is automatable.
- Detailed yield (accounting for apartment mix, setbacks, parking, solar access, building separation) requires design -- not fully automatable.

**Red flags / deal breakers:**
- Yield significantly below the number needed to make the project feasible at the asking land price
- Minimum apartment sizes (NSW ADG: 50 sqm studio, 50 sqm 1-bed, 70 sqm 2-bed, 90 sqm 3-bed) reducing the number achievable within the GFA
- Parking requirement consuming ground floor or basement area that could otherwise be GFA

**Typical cost to investigate:** $0-$500 (quick estimate). Architect test-fit: $5,000-$20,000.

---

### 6.3 Site Coverage Analysis

**What it is and why it matters:**
Site coverage is the percentage of the site occupied by the building footprint at ground level. It determines how much of the site can be built on (vs. setbacks, landscaping, driveways, open space). Typical limits: 40-60% for residential, 80-100% for commercial. In VIC, ResCode (Clause 55) specifies garden area requirements (25-35% of the site) which effectively limit site coverage.

**Where to find it:**
- **NSW**: DCP site coverage controls (council-specific).
- **VIC**: ResCode garden area requirement (Clause 55.03-4). DDO schedule provisions.

**Automation status: MANUAL (DCP-dependent)**

**Red flags / deal breakers:**
- Low site coverage limit (e.g. 40%) combined with large setbacks leaving a very small building footprint
- Deep soil zone requirement (e.g. 25% of site with minimum 6m dimension) further constraining the footprint

**Typical cost to investigate:** Included in planning analysis ($2,000-$10,000).

---

### 6.4 Setback Analysis

**What it is and why it matters:**
Setback requirements determine the minimum distance between the building and each boundary (front, side, rear). Combined with the lot shape and dimensions, setbacks define the "building envelope" or maximum footprint. Setbacks vary by zone, building height, and DCP/code. Upper floor setbacks (articulation zones) may require the building to step back above certain heights.

**Where to find it:**
- **NSW**: DCP setback controls. SEPP standards for complying development. ADG (Apartment Design Guide) for apartments.
- **VIC**: ResCode (Clause 54/55) for houses/dual occupancy. Clause 58 for apartments. DDO schedules.

**Automation status: MANUAL (highest-value automation target)**
- Setback rules are in DCPs/planning scheme text -- not available via API.
- Once digitised, setback analysis combined with lot geometry is readily automatable.

**Red flags / deal breakers:**
- Large front setback (e.g. 9m) on a shallow lot leaving minimal building depth
- Upper floor setbacks significantly reducing achievable floor area on upper levels
- Side setback requirements increasing with building height (e.g. 1m per 3m of height above 7m)
- Setback to rear neighbour's habitable room windows (9m in some DCPs)

**Typical cost to investigate:** Included in planning analysis ($2,000-$10,000).

---

### 6.5 Parking Requirements

**What it is and why it matters:**
Car parking is one of the most significant cost items in higher-density development. Basement parking costs $40,000-$80,000 per space to construct. Parking rates vary by dwelling type, size, and location. Typical rates: 1 space per 1-bed apartment, 1.5 per 2-bed, 2 per 3-bed, plus 1 visitor space per 5-10 dwellings. Some councils and SEPPs allow reduced or zero parking near public transport.

**Where to find it:**
- **NSW**: DCP parking rates. SEPP (Transport and Infrastructure) 2021.
- **VIC**: Clause 52.06 (state-wide parking rates). Can be varied by Parking Overlay or DDO schedule.

**Automation status: MANUAL (DCP-dependent) / API-PARTIAL (VIC Clause 52.06 is standardised)**

**Red flags / deal breakers:**
- High parking rate on a site where basement is not feasible (high water table, rock, contamination)
- Minimum parking exceeding what can physically fit on the site
- No dispensation for reduced parking near public transport
- Visitor parking and bicycle parking consuming ground floor area

**Typical cost to investigate:** Included in planning analysis. Traffic engineer parking assessment: $3,000-$10,000.

---

### 6.6-6.8 Open Space, Solar Access, Privacy

**What they are and why they matter:**
- **Open space**: Larger subdivisions (typically 20+ lots in NSW) must dedicate land for public open space (7-10% of site area) or pay a cash contribution equivalent.
- **Solar access**: Minimum sunlight to living rooms and private open space (typically 2+ hours between 9am-3pm at winter solstice). In NSW, the ADG requires 70% of apartments to receive 2+ hours of direct sun. Solar access to neighbouring properties must also be maintained.
- **Privacy**: Minimum separation distances between habitable room windows. Screening requirements for elevated private open space overlooking neighbours.

**Where to find it:**
- DCP, ResCode, ADG, Clause 58 provisions.
- Architect design and shadow analysis.

**Automation status: MANUAL**
- Solar access analysis requires 3D modelling (Archistar offers automated shadow analysis).
- Privacy and open space requirements are in planning text.

**Red flags / deal breakers:**
- South-facing site (achieving solar access targets is extremely difficult, particularly for apartments)
- Narrow lot with towers on both sides (overshadowing eliminates solar access)
- Open space dedication consuming a high percentage of a smaller site
- Privacy requirements forcing building separation that reduces yield

**Typical cost to investigate:** Included in architect test-fit and planning analysis ($5,000-$20,000).

---

## 7. Financial

### 7.1 Land Value / Purchase Price

**What it is and why it matters:**
The purchase price is the single largest cost in most development projects (typically 20-40% of total development cost). The key question is whether the asking price is justified by the development potential. Residual Land Value (RLV) analysis works backwards from expected revenue minus all costs minus target profit to determine the maximum justifiable land price.

**Where to find it:**
- Sales agents, REA, Domain listings for asking prices.
- CoreLogic / Pricefinder for comparable land sales.
- NSW Valuer General for land values (for rating purposes) and past sales.
- Independent valuation (sworn valuer).

**Automation status: API-PAID**
- CoreLogic API (enterprise agreement, ~$10,000+/year).
- Domain API (free tier ~500 calls/day for basic data; paid for detailed).
- NSW Valuer General portal (web-based, some ArcGIS REST access).

**Red flags / deal breakers:**
- Asking price exceeds RLV (project not feasible at this price)
- Price based on potential rezoning that has not yet occurred
- Vendor expectations inflated by recent comparable sales that may not be repeatable
- Land tax liability for overseas or absentee owners affecting hold strategy

**Typical cost to investigate:** $0-$200 (online research). Independent valuation: $3,000-$10,000. CoreLogic subscription: $169-$299/month.

---

### 7.2 Stamp Duty

**What it is and why it matters:**
Stamp duty (transfer duty) is a state government tax payable on the purchase of land. It is a significant upfront cost (typically 4-5.5% of purchase price for properties above $1M). It is a sunk cost that cannot be recovered and must be factored into the feasibility.

**Where to find it:**
- **NSW**: Revenue NSW calculator (revenue.nsw.gov.au). Rates: scaled from 1.25% to 5.5% based on property value. Premium rate (7%) for properties above $3.3M (residential). Foreign buyer surcharge: additional 8%.
- **VIC**: State Revenue Office calculator (sro.vic.gov.au). Rates: scaled from 1.4% to 6.5%. Foreign buyer surcharge: additional 8%.
- **Both**: Solicitor will calculate as part of conveyancing.

**Automation status: API-AUTO (calculation)**
- Stamp duty calculators are publicly available and the calculation formula is well-documented. Easily automatable.
- State rates change with each budget, so formulas need annual updating.

**Red flags / deal breakers:**
- Foreign buyer surcharge (8% in NSW and VIC) significantly increasing acquisition cost for non-resident purchasers.
- Stamp duty on aggregate value of multiple lots purchased together (not individual lot values).
- Put-and-call options and other structures used to defer or minimise stamp duty -- must be correctly structured to avoid reassessment.

**Typical cost to investigate:** $0 (free online calculators). Stamp duty amount: 4-7%+ of purchase price.

---

### 7.3 Development Contributions (s7.11, s7.12, Infrastructure Charges)

**What it is and why it matters:**
Development contributions are mandatory charges levied by councils to fund local infrastructure (roads, open space, community facilities, drainage). In NSW, there are two main mechanisms:
- **s7.11 contributions**: Based on a specific contributions plan linking development to required infrastructure. Charged per lot or per dwelling. Typically $20,000-$50,000 per dwelling in Sydney (can be $80,000+ in some greenfield areas).
- **s7.12 levies**: A flat percentage of proposed construction cost (up to 1% for works >$200,000). Used as an alternative to s7.11.

In VIC, infrastructure contributions plans (ICPs) and development contributions plans (DCPs -- confusingly, the same acronym as the NSW design control document) levy charges per dwelling or per hectare. Greenfield growth area levies can be $50,000-$100,000+ per lot.

In QLD, infrastructure charges are levied under the Planning Act 2016, with rates set by the infrastructure charges resolution.

**Where to find it:**
- **NSW**: Council s7.11/s7.12 contributions plan (on council website). s10.7 certificate identifies the applicable contributions plan.
- **VIC**: Council infrastructure contributions plan / development contributions plan. Planning scheme schedule.
- **Both**: Council planning staff can advise on applicable rates.

**Automation status: HYBRID**
- Contributions plans are publicly available documents (PDF, often with rate schedules).
- Rates can be extracted and applied programmatically once digitised.
- Some variation based on development type and size requires interpretation.

**Red flags / deal breakers:**
- Very high contribution rates (>$50,000 per dwelling) that undermine feasibility
- Contributions plan under review (rates may increase before DA is determined)
- Special infrastructure contributions (SICs) in designated growth areas (additional state-level levy)
- Works-in-kind agreements possible but require council negotiation

**Typical cost to investigate:** $0 (contributions plans are free to download). The contributions themselves: $20,000-$100,000+ per dwelling/lot.

---

### 7.4 Headworks Charges (Water, Sewer, Electricity)

**What it is and why it matters:**
Headworks (or developer) charges are levied by utility providers to fund the augmentation of trunk infrastructure (water treatment plants, sewage treatment plants, trunk mains, substations) needed to service new development. These are in addition to the direct connection costs. Greenfield development attracts the highest headworks charges as new trunk infrastructure must be extended.

**Where to find it:**
- **Water/Sewer**: Sydney Water developer charges schedule. Melbourne Water / retail water corp developer charges. Published rate schedules on utility websites.
- **Electricity**: Distributor connection charges (Ausgrid, Endeavour, etc.).
- **Both**: Request specific charges from each utility as part of feasibility.

**Automation status: HYBRID**
- Published charge schedules can be digitised.
- Specific charges depend on development size, location, and infrastructure capacity.

**Red flags / deal breakers:**
- Headworks charges exceeding budget (common in greenfield: $30,000-$80,000+ per lot for water + sewer + electricity combined)
- Requirement to fund trunk infrastructure upgrade (cost sharing with utility, but developer may front the full cost)
- Electricity supply charge for new substation ($500,000-$2,000,000+)

**Typical cost to investigate:** $0 (published schedules). Actual charges: $5,000-$80,000+ per lot/dwelling.

---

### 7.5 Holding Costs (Rates, Land Tax, Insurance, Interest)

**What it is and why it matters:**
Holding costs accrue from the date of land settlement until the last dwelling is sold/settled. They include:
- **Council rates**: Quarterly rates based on land value ($2,000-$20,000+ per year depending on land value and LGA)
- **Land tax**: Annual state tax on land value above the threshold (NSW: $100 + 1.6% of land value above $1,075,000; VIC: similar scaled rates). Foreign owner surcharges apply.
- **Insurance**: Public liability, building insurance during construction.
- **Land finance interest**: Interest on the land acquisition loan (typically 6-10% pa).

Holding costs are time-dependent -- every month of delay (planning, construction, sales) increases total cost. A $5M land purchase with 8% finance costs $400,000/year in interest alone.

**Where to find it:**
- Council rates: Council website or rates notice.
- Land tax: Revenue NSW / SRO VIC calculators.
- Insurance: Insurance broker quotes.
- Finance: Bank/lender terms.

**Automation status: API-AUTO (rates, land tax calculable from published formulas)**

**Red flags / deal breakers:**
- Extended project timeline (holding costs can consume the entire profit margin on a marginal project)
- Land tax surcharges for foreign owners (2-4% additional)
- Rising interest rates increasing finance costs beyond budget

**Typical cost to investigate:** $0 (calculable from public information).

---

### 7.6 Construction Cost Estimates

**What it is and why it matters:**
Construction costs typically represent 40-60% of total development cost. Per-square-metre benchmarks (as at March 2026):
- **Houses**: $2,000-$3,500/sqm
- **Townhouses**: $2,500-$4,000/sqm
- **Apartments (walk-up, 3-4 storey)**: $3,000-$4,500/sqm
- **Apartments (mid-rise, 5-8 storey)**: $3,500-$5,500/sqm
- **Apartments (high-rise, 9+ storey)**: $4,500-$7,000+/sqm
- **Civil works (subdivision)**: $50,000-$150,000+ per lot
- **Basement parking**: $40,000-$80,000 per space

Costs vary significantly by location, quality, market conditions, and construction complexity.

**Where to find it:**
- Quantity surveyor (QS) estimate for project-specific costing.
- Published cost guides: Rawlinsons, Rider Levett Bucknall (RLB) construction cost guide.
- Builder pricing (competitive tender).
- Historical project cost data.

**Automation status: API-PARTIAL**
- Benchmark cost rates can be maintained in a database and applied to estimated GFA.
- Detailed cost estimation requires QS or builder input.

**Red flags / deal breakers:**
- Construction costs exceeding benchmark (site-specific factors like rock, contamination, heritage, bushfire construction)
- Construction cost escalation outpacing revenue growth
- Builder availability and market conditions affecting pricing
- GST implications (margin scheme vs standard GST depending on land purchase structure)

**Typical cost to investigate:** $0 (benchmark estimates). QS estimate: $3,000-$20,000. Builder pricing: requires architectural documentation.

---

### 7.7 Gross Realisable Value (GRV) and Comparable Sales

**What it is and why it matters:**
GRV is the total expected sales revenue from the completed development. It is derived from comparable sales analysis -- what similar completed products (apartments, townhouses, lots) have sold for in the same or comparable locations. GRV estimation is the most critical input to feasibility because all other costs are subtracted from it to determine profit. Overestimating GRV is the most common cause of development failure.

**Where to find it:**
- **Comparable sales**: CoreLogic RP Data, Pricefinder, Domain, REA. NSW Valuer General sales data. Recent settlement data from state land registries.
- **Current listings**: Domain, REA, agent quotes.
- **Independent valuation**: For finance purposes, a sworn valuation on an "as if complete" basis.

**Automation status: API-PAID**
- CoreLogic API for comparable sales (enterprise pricing).
- Domain API for listings and suburb statistics (free tier available).
- NSW Valuer General sales data (bulk CSV, free).

**Red flags / deal breakers:**
- Limited comparable sales evidence (thin market, unique product type)
- GRV assumptions based on peak-market sales that may not be repeatable
- Comparable sales from a different micro-market or product quality
- Declining market trend (falling prices between feasibility and completion)
- Off-the-plan discount required (typically 5-15% below completed product value)

**Typical cost to investigate:** $0-$299/month (property data subscription). Independent valuation: $5,000-$15,000.

---

### 7.8 Development Margin Calculation

**What it is and why it matters:**
The development margin (profit as a percentage of total development cost) is the key metric for the go/no-go decision. Industry benchmarks:
- **Residential (standard risk)**: 15-20% margin on total development cost
- **High-risk projects** (rezoning, complex approvals): 20-25%+
- **Low-risk projects** (complying development, strong market): 12-15%

Formula: Development Margin = (GRV - Total Development Cost) / Total Development Cost x 100

Related metrics:
- **Residual Land Value (RLV)** = GRV - all costs except land - target profit. This is the maximum you should pay for the land.
- **Return on Equity (ROE)** = Profit / Equity invested x 100. Target: 25-40%+.
- **IRR** = Discount rate at which NPV of all cashflows = 0. Target: 20-30%+.

**Where to find it:**
- Calculated in the feasibility model.
- Feasibility software: Feasly, Estate Master, or purpose-built spreadsheet.

**Automation status: API-PARTIAL (calculation is straightforward; inputs require multiple data sources)**

**Red flags / deal breakers:**
- Margin below 15% on cost (insufficient buffer for cost overruns, delays, or market movements)
- Project only viable at the very top of the market range
- Sensitivity analysis shows margin turning negative with 5-10% adverse movement in costs or revenue
- Peak debt exceeds available funding
- Project timeline exceeds 3-4 years (increased exposure to market and cost risk)

**Typical cost to investigate:** $0-$5,000 (feasibility modelling). Feasibility software: $49-$500/month.

---

## 8. Market

### 8.1 Comparable Sales in the Area

**What it is and why it matters:**
Recent sales of similar properties (both land and completed product) in the local area provide the evidence base for GRV estimation and land price assessment. "Comparable" means similar in: location, zoning, size, product type, quality, age, and market conditions.

**Where to find it:**
- CoreLogic RP Data / Pricefinder (most comprehensive).
- Domain / REA (free listing data, some sales results).
- NSW Valuer General property sales data (free, all NSW sales).
- Council DA records (see what's been approved nearby).
- Real estate agents in the area.

**Automation status: API-PAID / API-PARTIAL**
- CoreLogic (paid enterprise API).
- Domain API (free tier for limited access).
- NSW VG sales data (free bulk download, some ArcGIS REST access).

**Typical cost to investigate:** $0-$299/month (subscription-based).

---

### 8.2 Current Supply/Demand

**What it is and why it matters:**
Understanding the current balance between supply and demand in the target market helps assess whether the completed product will sell and at what price. Key indicators: vacancy rates, stock on market, absorption rates (monthly sales vs new listings), upcoming supply (DA-approved but not yet built projects), and demand drivers (population growth, employment, infrastructure investment).

**Where to find it:**
- Domain/REA for stock on market and days on market.
- SQM Research for vacancy rates and stock levels.
- ABS for population growth and dwelling approvals.
- Council DA tracking systems for approved future supply.
- BIS Oxford Economics, JLL, CBRE, Knight Frank market reports.

**Automation status: API-PARTIAL**
- Domain API provides suburb statistics.
- ABS data accessible via data.gov.au.
- DA tracking requires council-specific web scraping.

---

### 8.3 Days on Market

**What it is and why it matters:**
Average days on market (DOM) is an indicator of market velocity. Low DOM (<30 days) suggests strong demand. High DOM (>90 days) suggests oversupply or declining market. DOM for the specific product type (apartments, townhouses, lots) and price range matters more than the suburb average.

**Where to find it:**
- Domain API: `suburbPerformanceStatistics` endpoint.
- CoreLogic: suburb performance reports.
- REA: suburb profile data.

**Automation status: API-PAID**

---

### 8.4 Rental Yields

**What it is and why it matters:**
Rental yield indicates investor demand and affects off-the-plan sales (investors are a significant buyer segment for apartments). Gross yield = annual rent / purchase price. Markets with higher yields attract more investor buyers, supporting off-the-plan sales. Low yields may indicate capital growth market (owner-occupier driven) or overpricing.

**Where to find it:**
- Domain / CoreLogic for rental data and yield calculations.
- SQM Research for rental vacancy rates.

**Automation status: API-PAID**

---

### 8.5 Population Growth and Demographic Trends

**What it is and why it matters:**
Population growth drives housing demand. Understanding the demographic profile (age, household size, income, household type) helps determine the right product mix. Areas with growing young professional populations suit apartments; family-growth areas suit houses and townhouses.

**Where to find it:**
- ABS Census data (abs.gov.au) -- updated every 5 years, with intercensal estimates.
- .id (informed decisions) -- community profile data by LGA (profile.id.com.au).
- State government population projections.

**Automation status: API-PARTIAL**
- ABS and .id data are web-accessible and some have APIs.
- ABS.Stat has a data API.

---

### 8.6 Infrastructure Projects Nearby

**What it is and why it matters:**
Major infrastructure investment (new rail lines, motorways, hospitals, schools, shopping centres) drives property value uplift. Understanding planned and committed infrastructure helps assess future market conditions. The NSW and VIC governments publish infrastructure pipelines.

**Where to find it:**
- Infrastructure Australia priority list.
- NSW: Infrastructure NSW (insw.com), Greater Cities Commission.
- VIC: Infrastructure Victoria (infrastructurevictoria.com.au).
- Federal/state budget papers for committed projects.
- Council strategic plans.

**Automation status: MANUAL**

---

### 8.7 Competing Developments

**What it is and why it matters:**
Knowing what other developers are doing in the area is critical. Too many competing projects releasing simultaneously can saturate the market, extend sales periods, and force price discounts. Conversely, limited competition may indicate strong pricing power.

**Where to find it:**
- Council DA tracking systems (check recent approvals for similar scale developments).
- Cordell / BCI databases (construction project databases, subscription).
- Archistar / Landchecker (DA tracking features).
- Physical observation (site signs, construction activity).
- Agent conversations.

**Automation status: API-PARTIAL**
- Some councils publish DA registers online.
- Cordell/BCI are paid services.
- Archistar and Landchecker offer DA tracking.

**Typical cost to investigate:** $0 (manual research). DA tracking subscription: included in Archistar/Landchecker ($95-$595/month).

---

## Summary: Automation Capability by Category

### Fully Automatable via Free API (API-AUTO)

| Item | NSW Source | VIC Source |
|------|-----------|-----------|
| Zoning classification | ePlanning Layer 19 | WFS plan_zone |
| FSR | ePlanning Layer 11 | N/A (not mapped as FSR) |
| Building height limits | ePlanning Layer 14 | Zone-based defaults |
| Minimum lot size | ePlanning Layer 22 | Zone-based defaults |
| Planning overlays | ePlanning various layers | WFS plan_overlay |
| Local heritage items | ePlanning Layer 16 | WFS plan_overlay (HO) |
| State heritage register | ePlanning Layer 221 | Victorian Heritage Database |
| Bushfire prone land | ePlanning Hazard Layer 229 | WFS bushfire_prone_area |
| Flood planning (partial) | ePlanning Hazard Layer 230 | WFS plan_overlay (LSIO/SBO/FO) |
| Acid sulfate soils | ePlanning ASS layer | Limited |
| Cadastre / lot boundaries | Spatial Services FeatureServer Layer 8 | WFS parcel_view |
| Easement boundaries | Spatial Services FeatureServer Layer 9 | WFS (limited) |
| Public transport proximity | TfNSW GTFS open data | PTV GTFS open data |
| Stamp duty calculation | Published formula | Published formula |
| Land tax calculation | Published formula | Published formula |
| Holding cost estimation | Published rates/formulas | Published rates/formulas |

### Partially Automatable (HYBRID / API-PARTIAL)

| Item | Status | Gap |
|------|--------|-----|
| SEPP/state policies | Spatial layers partial; text interpretation manual | Text-based policy application |
| Draft amendments | Web-searchable; no API | Requires monitoring and interpretation |
| Complying development eligibility | Constraint screening automatable | Full standard compliance check manual |
| Contamination risk | EPA registers web-searchable; historical use reviewable | Site investigation inherently manual |
| Biodiversity | Database searches automatable | Field survey manual |
| Flood (detailed) | Overlay screening automatable | Flood levels/depths from council studies |
| Comparable sales | Domain API (limited free); VG data (free) | CoreLogic (paid) for comprehensive data |
| Market data | Domain/ABS APIs | Interpretation manual |
| Development contributions | Published schedules digitisable | Council-specific calculation |
| GFA/yield estimation | FSR x area automatable | Design-constrained yield manual |
| Construction cost benchmarks | Maintainable database | Site-specific factors manual |

### Requires Manual Investigation (MANUAL)

| Item | Why |
|------|-----|
| DCP controls (setbacks, parking, landscaping) | PDF-based, council-specific, context-dependent |
| Title review (full) | Paid title search + legal interpretation |
| Restrictive covenants | Legal instrument analysis |
| Encroachments | Physical survey required |
| Geotechnical conditions | Boreholes and lab testing |
| Contamination (Phase 2) | Soil/groundwater sampling |
| Aboriginal heritage | Community consultation + field survey |
| Archaeological significance | Specialist assessment |
| Infrastructure capacity (all utilities) | Utility-specific application |
| Traffic/access assessment | Traffic engineer |
| Tree assessment | Arborist site inspection |
| Acoustic assessment | Specialist measurement |
| Solar access / overshadowing | 3D shadow modelling |
| Council pre-DA advice | Meeting with council planners |

---

## Due Diligence Cost Summary

### Phase 1: Desktop Screening (1-3 days)

| Item | Cost |
|------|------|
| API/portal planning data retrieval | $0 |
| Title search (per lot) | $17-$34 |
| s10.7 certificate (NSW) | $53-$153 |
| EPA contamination register search | $0 |
| AHIMS basic search (NSW) | $0-$58 |
| Preliminary feasibility estimate | $0 (internal) |
| **Total Phase 1** | **$70-$300** |

### Phase 2: Detailed Due Diligence (6-12 weeks)

| Item | Cost Range |
|------|------------|
| Town planner planning analysis | $5,000-$15,000 |
| Solicitor title and legal review | $3,000-$10,000 |
| Detail/feature survey | $3,000-$20,000 |
| Geotechnical investigation | $3,000-$15,000 |
| Phase 1 contamination (PSI) | $5,000-$15,000 |
| Ecological assessment (if required) | $3,000-$30,000 |
| Bushfire assessment (if required) | $2,000-$10,000 |
| Flood assessment (if required) | $5,000-$30,000 |
| Heritage assessment (if required) | $5,000-$20,000 |
| Traffic assessment (if required) | $5,000-$25,000 |
| Arborist report | $2,000-$8,000 |
| Acoustic assessment (if required) | $3,000-$15,000 |
| Architect test-fit / massing study | $5,000-$20,000 |
| Independent valuation | $3,000-$10,000 |
| **Total Phase 2 (standard site)** | **$30,000-$80,000** |
| **Total Phase 2 (complex site)** | **$80,000-$250,000+** |

---

## Quick Reference: The 10-Minute API Screen

Using the free NSW ePlanning and VIC OpenData APIs, a developer can screen a site in under 10 minutes with parallel API queries:

1. **Zoning** -- Is the proposed use permitted? (API-AUTO)
2. **FSR** -- What is the maximum GFA? (API-AUTO, NSW)
3. **Height** -- How tall can we build? (API-AUTO, NSW)
4. **Lot size** -- How many lots can we subdivide? (API-AUTO, NSW)
5. **Heritage** -- Is the site or adjacent properties heritage listed? (API-AUTO)
6. **Bushfire** -- Is the site bushfire prone? (API-AUTO)
7. **Flood** -- Is the site in a flood planning area? (API-AUTO, partial coverage)
8. **Overlays (VIC)** -- What overlays apply? (API-AUTO)
9. **Cadastre** -- What is the lot size and shape? (API-AUTO)
10. **Public transport** -- How far to the nearest station/stop? (API-AUTO)

Combined response time for all parallel queries: ~300-500ms.

This automated screen eliminates the need for manual portal searching and instantly identifies the major constraints and opportunities. It does not replace detailed due diligence but dramatically accelerates the initial go/no-go decision.

---

## Appendix A: Key NSW ePlanning API Endpoints

```
Base (Planning Controls):
https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning/Planning_Portal_Principal_Planning/MapServer

  Layer 11  -- Floor Space Ratio
  Layer 14  -- Height of Buildings
  Layer 16  -- Heritage (EPI/Local)
  Layer 19  -- Land Zoning
  Layer 22  -- Lot Size
  Layer 221 -- State Heritage Register Curtilage

Base (Hazards):
https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning/Planning_Portal_Hazard/MapServer

  Layer 229 -- Bushfire Prone Land
  Layer 230 -- Flood Planning Map
  Layer 232 -- Landslide Risk Land

Base (Cadastre):
https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Land_Parcel_Property_Theme/FeatureServer

  Layer 8  -- Lot (cadastral boundaries)
  Layer 9  -- Easement
  Layer 12 -- Property

All endpoints: No authentication required. Accept inSR=4326 (WGS84). Use /query with esriGeometryPoint.
```

## Appendix B: Key VIC OpenData WFS Endpoints

```
Base: https://opendata.maps.vic.gov.au/geoserver/wfs

Layers:
  open-data-platform:plan_zone          -- Zoning
  open-data-platform:plan_overlay       -- Planning overlays (HO, DDO, BMO, LSIO, SBO, etc.)
  open-data-platform:parcel_view        -- Cadastral parcels
  open-data-platform:bushfire_prone_area -- Bushfire prone areas
  open-data-platform:vic_flood_history_public -- Historical flood extents

All endpoints: No authentication required. CRS: EPSG:7844 (GDA2020). Use BBOX queries for spatial lookup.
```

## Appendix C: Additional Government Data Sources

| Data Type | Source | URL | Cost |
|-----------|--------|-----|------|
| NSW Property Sales | Valuer General NSW | valuation.property.nsw.gov.au | Free |
| NSW Contaminated Land | EPA NSW CLR | epa.nsw.gov.au | Free |
| VIC Contaminated Sites | EPA VIC | epa.vic.gov.au | Free |
| Aboriginal Heritage (NSW) | AHIMS | environment.nsw.gov.au | $0-$58 |
| EPBC Protected Matters | DCCEEW | dcceew.gov.au | Free |
| National Heritage Database | DCCEEW | dcceew.gov.au | Free |
| Mine Subsidence (NSW) | Subsidence Advisory NSW | subsidenceadvisory.nsw.gov.au | Free |
| NBN Availability | NBN Co | nbnco.com.au | Free |
| Transport (NSW GTFS) | TfNSW | opendata.transport.nsw.gov.au | Free |
| Transport (VIC GTFS) | PTV | ptv.vic.gov.au | Free |
| Addresses (G-NAF) | data.gov.au | data.gov.au (bulk download) | Free |
| Geological Maps | Geoscience Australia | ga.gov.au | Free |
