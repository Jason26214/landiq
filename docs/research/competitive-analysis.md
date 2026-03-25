# Australian PropTech Competitive Analysis
## Land Feasibility & Planning Data Platforms

*Research date: March 2026*

---

## Executive Summary

The Australian PropTech market for land feasibility and planning data is fragmented. No single platform provides an end-to-end solution covering planning controls extraction, feasibility modelling, and development management. The biggest unsolved problem remains **DCP (Development Control Plan) digitisation** -- the detailed, council-specific design rules (setbacks, parking, landscaping, acoustic requirements) that ultimately determine what can actually be built on a site. Most platforms handle LEP/zoning data reasonably well but fall short on granular DCP controls. This represents LandIQ's primary competitive opportunity.

---

## 1. Landchecker (landchecker.com.au)

### What They Provide
- Zoning and overlay mapping with direct links to planning ordinances
- Lot boundaries, land size, site dimensions
- High-resolution aerial imagery (Aerometrex, updated quarterly in metro areas, 6x resolution vs satellite)
- Current and historical aerial imagery
- Pending, approved, and rejected DAs/permits
- DA/permit alerts
- Title, plan, instrument, and company document searches (brokered from state registries)
- Premium Property Reports (consolidated PDF with company branding)
- Site Finder tool (search by criteria)
- Site Consolidation Tool (assess amalgamation of adjacent lots)
- Flood, bushfire, heritage overlay identification
- Contamination and environmental constraint flags

### Data Sources
- **Government planning portals**: Zoning, overlays, and constraint layers sourced from state GIS/WFS endpoints (NSW, VIC primarily)
- **Aerometrex**: High-resolution aerial imagery partnership
- **State land registries**: Title and plan document brokerage (NSW LRS, Landata VIC)
- **Council DA tracking systems**: Permit/DA data aggregated from council portals
- **Cadastral data**: State spatial services (NSW SIX, Vicmap)

### Pricing Model
| Plan | Cost | Key Inclusions |
|------|------|----------------|
| Starter | Free | Basic property report, planning zones/overlays, national coverage |
| Standard | ~$99-149/mo (est.) | Land size, boundaries, aerial imagery, 10 premium reports/mo, DA alerts, Site Finder |
| Advanced | ~$200-350/mo (est.) | 4 members, unlimited reports, branded covers, 1000 DA alerts, site consolidation, discounted docs |
| Enterprise | Custom | API/data access, unlimited tools, SAML SSO, premium support |

Annual billing offers a 16% discount (equivalent to 2 months free). Per-member pricing scales with team size.

### Limitations
- **Geographic coverage**: Originally VIC and NSW only; expanding to QLD but not yet national for all features
- **No feasibility engine**: Shows planning data but does not calculate yield, GFA, or financial feasibility
- **No DCP detail**: Shows zoning/overlays but does not extract specific DCP controls (setbacks, parking rates, design requirements)
- **No 3D design**: No design or massing capability
- **No API for most tiers**: API access restricted to Enterprise
- **Document costs extra**: Title searches and planning certificates are pay-per-document on top of subscription

### User Complaints
- Coverage gaps outside VIC/NSW
- Data can lag behind actual council updates
- No integrated feasibility or yield calculation
- Expensive when document searches are factored in
- Limited analytical capability -- essentially a data viewer, not an analysis tool

---

## 2. Archistar (archistar.ai)

### What They Provide
- AI-powered site analysis across all 8 Australian states/territories
- **Generative 3D design**: Input a site, get compliant 3D building designs with area schedules and yield calculations
- Planning rules database: zoning, FSR, height limits, permitted uses from 25,000+ sources
- Risk due diligence overlays: flood, bushfire, heritage, contamination, electrical infrastructure proximity
- Property listings integration (Domain, CoreLogic)
- Development application/permit data (Cordell)
- Nearmap high-resolution aerial imagery
- 1m contour data (Professional tier+)
- Title search and contamination report purchasing
- Site finding with planning control filters
- CAD export (DXF) for designs
- **AI PreCheck**: Automated building permit compliance checking (partnership with International Code Council)
- Feasibility tools with basic yield and cost metrics

### Data Sources
- **Government sources (direct)**: Planning, zoning, and permitted use data collected directly from federal, state, and local government documents, then standardised and catalogued
- **CoreLogic**: Property valuations, sales history, ownership data
- **Domain**: Property listings (sale and rent)
- **Cordell Projects**: Development application and permit data
- **Nearmap**: High-resolution aerial imagery and AI-derived datasets
- **State GIS endpoints**: Cadastral, flood, bushfire, heritage layers
- **25,000+ planning rule sources**: Manually researched and consolidated, with AI assistance for extraction

### Pricing Model
| Plan | Monthly | Annual (per mo) | Users | Coverage |
|------|---------|-----------------|-------|----------|
| Free | $0 | $0 | 1 | Limited, sites <2,000sqm |
| Basic | $95 | $79.17 | 1 paid + unlimited free | 1 state, <2,000sqm |
| Professional | $345 | $287.50 | 1 paid + unlimited free | 1 state, unlimited site size |
| National | $595 | $495.83 | 1 paid + unlimited free | All states, unlimited |

Title searches and contamination reports are pay-per-use on all tiers. Annual billing = 2 months free.

### Limitations
- **DCP controls are incomplete**: While Archistar covers LEP-level controls (zoning, FSR, height, permitted uses) well, detailed DCP-level controls (specific setback rules, parking rates, landscaping requirements, acoustic controls) are not comprehensively digitised across all councils
- **Generative design is indicative, not DA-ready**: 3D designs are concept-level massing studies, not architectural drawings; still require architect refinement
- **Financial feasibility is basic**: Provides yield metrics but lacks the sophisticated cashflow modelling, GST margin scheme, and Australian finance structures that developers need
- **Learning curve**: Menus are hidden or require training to sequence correctly; workflows take time to learn
- **File format limitations**: Cannot import many common file formats
- **Planning rule accuracy varies by council**: Some councils have more complete rule digitisation than others
- **No project management or CRM**: Purely an analysis and design tool; no pipeline tracking
- **Price barrier**: National coverage at ~$500/mo is significant for smaller developers

### User Complaints
- Planning rules not always up-to-date with latest council amendments
- Designs don't always reflect real-world DCP constraints accurately
- Cannot replace professional town planner advice
- Limited import/export format support
- Learning curve for non-technical users
- Expensive for occasional use

---

## 3. CoreLogic RP Data (cotality.com / corelogic.com.au)

*Note: CoreLogic rebranded to Cotality in 2025.*

### What They Provide
- **Australia's largest property database**: 98% market coverage, 10M+ property records
- Automated Valuation Models (IntelliVal AVM)
- Sales history (30+ years) and ownership data
- Rental valuations and yield data
- Comparable sales and Comparative Market Analysis (CMA) tools
- Suburb and market trend analytics (prices, turnover, demographics)
- Building consent history
- Digital property reports with interactive mapping
- RP Proposals (branded pre-listing kits)
- Mobile app (iOS/Android)
- CRM integrations (AgentBox, Vault RE, Rex, etc.)
- Commercial property API
- 7,000+ verified data sources, 1M+ new data points added monthly

### Data Sources
- **State land registries**: Title, ownership, transaction records
- **Valuer General offices**: Sales data (all states)
- **Real estate agents and portals**: Listing and sales result data
- **Council and government**: Building consent, DA data
- **ABS**: Demographics, census data
- **Own valuation models**: Proprietary AVMs built on decades of transaction data
- **7,000+ data sources** aggregated nationally

### Pricing Model
| Package | Monthly (annual billing) | Key Features |
|---------|--------------------------|--------------|
| Lite | $169/mo | Single state, 500 exports/mo |
| Base | $189/mo | Multi-state, 2,000 exports, 1 CRM |
| Premium | $229/mo | National, 10,000 exports, 3 CRMs, marketing contacts |
| Pro | $299/mo | 50,000 exports, RP Proposals included |

Monthly (non-annual) pricing is higher (e.g., Lite at $219/mo). All annual plans require 12-month minimum. Enterprise/API pricing is custom and significantly higher.

### Limitations
- **No planning/zoning data**: CoreLogic is a property valuation and sales platform, NOT a planning platform. No zoning, FSR, height limits, overlays, or planning controls
- **No feasibility engine**: No yield calculation, development cost modelling, or cashflow analysis
- **No design capability**: No 3D massing or site design tools
- **No constraint mapping**: No flood, bushfire, heritage, or contamination overlays
- **Enterprise API is expensive**: Developer/API access requires enterprise agreement; pricing is opaque and typically $10,000+/year
- **Focused on agents, not developers**: Primary user base is real estate agents and valuers, not property developers
- **Walled garden**: Data cannot easily be exported or integrated with other tools
- **New developments lag**: Very new properties may take time to appear

### User Complaints
- Expensive for what you get, especially for occasional users
- AVM accuracy varies significantly by location and property type
- Interface feels dated
- Lock-in with annual contracts
- API access is prohibitively expensive for startups
- Data exports are limited and controlled

---

## 4. Pricefinder (pricefinder.com.au)

*Owned by Domain Group*

### What They Provide
- Property reports with sales history and ownership
- Price estimates for 90%+ of Australian residential properties (powered by Domain Insight AVMs)
- Comparable sales analysis
- On-market and off-market transaction data
- Suburb performance reports and demographics
- Comparative Market Analysis (CMA) tools
- Current and historical listing data
- Rental data
- Interactive mapping

### Data Sources
- **Domain/Allhomes listings portals**: Listing data fed directly and daily
- **State Valuer General offices**: Sales transaction records
- **State land registries**: Title and ownership data
- **Domain Insight**: Proprietary AVM (automated valuation model)
- **ABS**: Demographics and census data

### Pricing Model
- Subscription-based, estimated ~$100-200/month depending on tier
- Primarily targeted at real estate agents and valuers
- Often bundled through Domain Group partnerships with agencies
- Individual subscriptions available

### Limitations
- **No planning data**: Like CoreLogic, Pricefinder is purely a sales/valuation platform with no zoning, planning controls, or constraint data
- **No feasibility tools**: No yield, cost, or financial modelling
- **No developer features**: Built for agents and valuers, not developers
- **Search can be unreliable**: Users report the search function sometimes fails to find the right property, requiring scrolling through hundreds of addresses
- **Overlap with CoreLogic**: Very similar product to RP Data; choice often comes down to which platform the user's agency provides
- **Domain ecosystem lock-in**: Best data comes from Domain listings; less comprehensive for off-market or REA-exclusive listings

### User Complaints
- Search functionality issues (can't find properties reliably)
- AVM estimates can be significantly off in thin markets
- Less comprehensive than CoreLogic for some data types
- Limited analytical tools beyond basic reports

---

## 5. PropCode (propcode.com.au)

*Emerging competitor -- most directly relevant to LandIQ's planning data ambitions*

### What They Provide
- **DCP digitisation**: The only platform that has systematically converted DCP rules to machine-readable "rules as code"
- Rapid Planning Reports (RPR): Analyses DA rules from LEPs, DCPs, and SEPPs with clickable rule citations
- PropCode CDC: Instant eligibility analysis for Complying Development pathways
- PropCode Library: Free viewer for NSW LEPs, DCPs, and SEPPs in one integrated tool
- Pass/fail evaluations for individual planning rules linked to property spatial data
- Coverage of NSW housing reforms (Low and Mid Rise, Transit-Oriented Development, Housing SEPP)

### Data Sources
- **Council websites**: DCPs gathered from hundreds of council websites across NSW
- **NSW Planning Portal**: LEPs and SEPPs
- **AI-assisted extraction with expert review**: 1,000+ rules converted to software rules using AI with human verification
- **State spatial data**: Property data linked to rules via spatial data for automated pass/fail evaluation

### Pricing Model
- Single property analysis available
- Starter Plan: Monthly subscription for professionals (DA and/or CDC reports)
- Business Plan: Team subscriptions with unlimited CDC summaries
- Bulk Datasets: Custom planning analysis datasets ordered by suburb or LGA
- PropCode Library: Free

### Limitations
- **NSW only**: Currently limited to New South Wales; no VIC, QLD, or other states
- **No financial feasibility**: Planning rules analysis only, no yield or cost modelling
- **No property/sales data**: No valuations, sales history, or market data
- **No design tools**: No 3D massing or design generation
- **No constraint mapping**: No flood, bushfire, contamination overlays (beyond what's in LEP/DCP rules)
- **Early stage**: Still building out council coverage within NSW
- **Rules maintenance burden**: DCPs change frequently; keeping 1,000+ digitised rules current is a significant ongoing challenge

### Why This Matters for LandIQ
PropCode is the closest competitor to what LandIQ aims to do with DCP data. They have proven the approach works (AI-assisted extraction with expert review, rules as code) but are limited to NSW and planning analysis only. LandIQ's opportunity is to combine this capability with feasibility modelling, property data, and project management.

---

## 6. Giraffe (giraffe.build)

### What They Provide
- Browser-based 3D design and massing platform
- Draw 2D shapes on maps, extrude to 3D buildings
- Instant metrics: FSR, yield, approximate build cost as you design
- Shadow analysis and solar access calculations
- Carbon footprint measurement
- Stakeholder collaboration spaces
- Import/export: DXF, OBJ, STL, GLTF/GLB, PDF (IFC coming)
- Financial and environmental analytics alongside design

### Data Sources
- Base mapping (satellite/aerial imagery)
- Integration with planning data from partners (partnership with Landchecker)
- User-input design parameters

### Pricing Model
- Free tier available
- Paid plans from USD $250/month (annual billing)

### Limitations
- **Design tool, not a data platform**: Limited built-in planning data; relies on user knowledge or partner integrations
- **No automated planning rules**: User must know and apply planning controls manually
- **No property/sales data**: No valuations, comparable sales, or market data
- **No DCP extraction**: No automated planning document parsing
- **Financial metrics are basic**: Rough estimates, not detailed feasibility modelling
- **USD pricing**: Australian users pay in USD, adding currency risk

---

## 7. UrbanFootprint (urbanfootprint.com)

*Acquired by LightBox (US) in June 2025*

### What They Provide
- Location intelligence for urban planning and mobility decisions
- Parcel-level urban, environmental, and transportation data
- Demographics, land use, environmental hazards, infrastructure, social equity indicators
- Scenario analysis for planning and policy-making
- Zoning impact assessment on sustainability and equity
- Stakeholder engagement tools

### Data Sources
- Census and demographic data
- Environmental hazard databases
- Transportation and infrastructure datasets
- Land use and zoning databases
- Nationally modelled data layers

### Pricing Model
- Enterprise SaaS (government and institutional clients)
- Custom pricing

### Limitations
- **US-focused**: Primarily a US platform; Australian data coverage is minimal
- **Government/institutional focus**: Not designed for individual property developers
- **No Australian planning rules**: No LEP, DCP, or state planning scheme data
- **No property sales/valuation data**: Not a property data platform
- **Acquired by LightBox**: Future direction uncertain; may pivot further from Australian market
- **Not a competitor for LandIQ's core use case**: More relevant to government planners than property developers

---

## 8. Other Notable Platforms

### HtAG (htag.com.au)
- Property data analytics for investors and agents
- 5,000+ suburbs, 150+ metrics per suburb
- AI Copilot, GeoDex heatmaps, StreetLens heatmaps
- Developer API coming soon (Snowflake integration)
- Primarily investor-focused, not developer/planning focused

### Feasly (feasly.com.au)
- Purpose-built feasibility modelling software for Australian developers
- GST Margin Scheme calculations, Australian finance structures
- Cashflow modelling, sensitivity analysis, professional reports
- Pro: $149/mo, Lite: $49/mo
- **Financial feasibility only** -- no planning data, no site analysis, no design tools
- Complementary to planning data platforms rather than competitive

### Feastudy / Estate Master (devfeas.com.au)
- Legacy Excel-based feasibility software
- Industry standard for larger developers
- Expensive (~$5,850+/year)
- No cloud, no collaboration, no planning data integration

### Nearmap (nearmap.com)
- High-resolution aerial imagery and AI-derived datasets
- Tile API available for integration
- Not a planning or feasibility platform; a data source used by other platforms

---

## Comparative Matrix

| Capability | Landchecker | Archistar | CoreLogic | Pricefinder | PropCode | Giraffe | Feasly |
|------------|:-----------:|:---------:|:---------:|:-----------:|:--------:|:-------:|:------:|
| Zoning/LEP data | Yes | Yes | No | No | Yes | No | No |
| DCP detailed controls | No | Partial | No | No | **Yes** | No | No |
| Planning overlays (flood/fire/heritage) | Yes | Yes | No | No | Partial | No | No |
| Property valuations/sales | No | Via partners | **Yes** | **Yes** | No | No | No |
| 3D design/massing | No | **Yes** | No | No | No | **Yes** | No |
| Yield calculation | No | Yes | No | No | No | Basic | No |
| Financial feasibility | No | Basic | No | No | No | Basic | **Yes** |
| Cashflow modelling | No | No | No | No | No | No | **Yes** |
| DA/permit tracking | Yes | Yes | No | No | No | No | No |
| Title searches | Yes | Yes | No | No | No | No | No |
| Aerial imagery | Yes | Yes | No | No | No | Basic | No |
| National coverage | Partial | Yes | Yes | Yes | NSW only | Yes | N/A |
| API access | Enterprise | Enterprise | Enterprise | No | Bulk data | No | No |
| CRM/pipeline management | No | No | No | No | No | No | No |
| Project management | No | No | No | No | No | No | No |

---

## The DCP Problem: Who Has Cracked It?

### Current State
The DCP/detailed planning controls problem remains largely unsolved at scale:

1. **PropCode** is the furthest along, having converted 1,000+ DCP rules to machine-readable code for NSW councils. Their approach: AI-assisted extraction with expert review, creating "rules as code" linked to spatial property data for automated pass/fail evaluation. But they are NSW-only and still expanding council coverage.

2. **Archistar** covers LEP-level controls nationally (zoning, FSR, height, permitted uses from 25,000+ sources) but DCP-level granularity (specific setback formulas, parking rate tables, landscaping percentages, acoustic requirements) is incomplete and varies significantly by council.

3. **Landchecker** shows planning zone and overlay information but does not extract or interpret DCP rules.

4. **No platform** comprehensively covers DCPs across multiple states.

### Why DCPs Are Hard
- **Not standardised**: Each of NSW's 128 councils has its own DCP. Victoria and Queensland have similar council-level detail in their planning schemes
- **PDF-based**: Most DCPs exist as large PDF documents (often 200-500+ pages), not structured data
- **Context-dependent**: Rules vary by zone, site size, frontage, proximity to features, and other variables
- **Frequently amended**: Councils regularly update DCPs; keeping digitised rules current is a maintenance burden
- **Cross-referencing required**: A single development may need to comply with LEP + DCP + SEPP + state codes simultaneously
- **Nuanced language**: DCP rules use qualitative language ("must be sympathetic to the streetscape") alongside quantitative controls

### North Sydney Council Initiative (September 2025)
Notably, North Sydney Council restructured their entire DCP 2025 specifically to enable integration into AI platforms for development assessment. This signals government recognition that DCP digitisation is coming and councils are beginning to prepare their documents for machine readability.

---

## Key Gaps That LandIQ Could Fill

### 1. Integrated Planning-to-Feasibility Pipeline
**Gap**: No single platform takes a user from address input through planning analysis, yield estimation, and financial feasibility in one workflow.
- Archistar does planning + basic design but weak on financial feasibility
- Feasly does financial feasibility but has zero planning data
- CoreLogic/Pricefinder do valuations but no planning
- **Opportunity**: LandIQ can be the first platform to connect planning rules extraction directly to a sophisticated feasibility engine

### 2. Comprehensive DCP Digitisation
**Gap**: PropCode has proven the approach for NSW but no one covers multiple states. Archistar's DCP coverage is shallow.
- **Opportunity**: Use LLM-powered extraction (similar to PropCode's approach but leveraging more advanced AI) to systematically digitise DCPs across NSW, VIC, and QLD. Start with highest-activity councils

### 3. Land Acquisition CRM + Planning Intelligence
**Gap**: No platform combines a developer-focused CRM/pipeline with planning data.
- Developers currently use Excel/email to track opportunities and separately log into Landchecker/Archistar for planning info
- **Opportunity**: LandIQ's Land Acquisition module with integrated planning data is genuinely unique

### 4. Project Management Post-Acquisition
**Gap**: No planning data platform extends into post-acquisition project management.
- After a developer buys land, they switch to generic project management tools
- **Opportunity**: LandIQ's unified lifecycle approach (acquisition -> feasibility -> project management -> sales) has no direct competitor

### 5. Council Intelligence Database
**Gap**: No platform captures institutional knowledge about council attitudes, processing times, common conditions, and assessment officer tendencies.
- This is currently trapped in the heads of experienced town planners
- **Opportunity**: Build a crowd-sourced or AI-aggregated council intelligence layer

### 6. Automated Constraint Screening with Risk Scoring
**Gap**: Archistar and Landchecker show constraint overlays but don't synthesise them into a single risk score or automated go/no-go recommendation.
- **Opportunity**: AI-powered risk scoring that weights constraints by severity and generates a plain-English risk summary

### 7. Comparable Sales Integrated with Yield Analysis
**Gap**: CoreLogic/Pricefinder have sales data. Archistar has yield tools. Nobody connects comparable end-product sales back into yield-driven feasibility automatically.
- **Opportunity**: "What would 12 townhouses sell for on this site?" answered in one step, not three platforms

---

## Recommended Competitive Positioning for LandIQ

### Primary Differentiator
**"The only platform that connects planning rules to feasibility to project management in one system."**

### Build vs. Integrate Strategy
| Data Type | Recommendation |
|-----------|---------------|
| Zoning/LEP data | Build (government WFS/API endpoints are open) |
| DCP controls | Build (LLM extraction -- core IP) |
| Constraint overlays | Build (government open data) |
| Property valuations | Integrate (CoreLogic or Domain API) |
| Aerial imagery | Integrate (Nearmap or Aerometrex) |
| Sales/listings data | Integrate (Domain API free tier, CoreLogic enterprise) |
| Cadastral/boundaries | Build (state open data + Geoscape) |
| Feasibility engine | Build (core IP, Australian-specific) |
| CRM/pipeline | Build (core product) |
| Project management | Build (core product) |

### Priority Data Moats
1. **DCP rules-as-code database** -- hardest to replicate, highest value
2. **Council intelligence** -- crowd-sourced/AI-aggregated institutional knowledge
3. **Integrated feasibility models** -- planning controls feeding directly into financial models
4. **Historical DA outcome data** -- learn from what gets approved/refused by each council

---

## Sources

- [Landchecker](https://landchecker.com.au/)
- [Landchecker Pricing](https://landchecker.com.au/pricing/subscriptions/)
- [Archistar](https://www.archistar.ai/)
- [Archistar Pricing](https://www.archistar.ai/pricing/)
- [Archistar Data & API](https://www.archistar.ai/data/)
- [CoreLogic / Cotality RP Data](https://www.cotality.com/software-solutions/rp-data)
- [Pricefinder](https://www.pricefinder.com.au/)
- [PropCode](https://propcode.com.au/)
- [Giraffe](https://www.giraffe.build/)
- [UrbanFootprint](https://urbanfootprint.com/)
- [Feasly](https://www.feasly.com.au/)
- [Feasly Platform Comparison Guide](https://www.feasly.com.au/feasibility-software-comparison)
- [Feasly Australian PropTech Guide 2026](https://www.feasly.com.au/guides/property-development-apps-digital-tools-australia)
- [HtAG](https://www.htag.com.au/)
- [Archistar Capterra Reviews](https://www.capterra.com.au/software/213621/archistar)
- [North Sydney DCP 2025 Digitisation](https://yoursay.northsydney.nsw.gov.au/draft-dcp-2025)
- [LightBox acquires UrbanFootprint](https://www.lightboxre.com/news/lightbox-acquires-urbanfootprint-expanding-market-leading-location-intelligence-with-climate-infrastructure-demographic-data/)
