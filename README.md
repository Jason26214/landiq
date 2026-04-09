# LandIQ

An AI-powered property development platform that helps Australian real estate developers manage land acquisition, feasibility analysis, project development, and property sales in a unified system.

**Live Pitch Deck:** [https://jason26214.github.io/landiq/pitch](https://jason26214.github.io/landiq/pitch)

## Problem

Australian property developers face significant challenges during the land acquisition process:

- **Complex due diligence** — Zoning, planning overlays, council regulations, environmental constraints, flood risk, transport access, and more
- **Fragmented information** — Data scattered across council portals, GIS systems, PDFs, Excel spreadsheets, and consultant reports
- **Manual reporting** — Feasibility reports still written by hand in Word + Excel, taking 2–4 weeks per site
- **High sunk costs** — Each abandoned site costs $100K+ in wasted due diligence investigations
- **No unified system** — Land opportunities, reports, and decisions managed through email and shared folders

## Solution

LandIQ is a **Property Development Operating System** that consolidates the entire development lifecycle into one platform, powered by AI to automate analysis and report generation.

### Core Modules

| Module | Description |
|--------|-------------|
| **Land Acquisition** | Land CRM with pipeline management (Lead → Research → Feasibility → Negotiation → Acquired) |
| **Feasibility Engine** | AI-powered analysis of zoning, density, development potential, and planning risks with auto-generated reports |
| **Document Management** | Centralised hub for all feasibility reports, consultant documents, contracts — searchable, version-controlled, AI-tagged |
| **Chrome Extension** | One-click site intelligence overlay on REA, Domain, and Landchecker listings |
| **Email Hub** | Multi-account email aggregation with AI auto-linking to land sites and auto-tagging |
| **Project Management** | Post-acquisition project tracking — timelines, stages, contractors, consultants, approvals |
| **Property Sales** | Unit inventory, pricing, buyer tracking, sales pipeline, contract management (Phase 2) |

### AI Capabilities

- **Feasibility Report Generation** — Input an address, get a full report (site overview, planning analysis, development potential, risks, recommendations) in minutes instead of weeks
- **Planning Document Interpretation** — Automatically parse council PDFs, zoning rules, and planning overlays via LLM
- **Risk Detection** — Flag flood zones, environmental restrictions, heritage overlays, and planning conflicts
- **DCP Rules Extraction** — Digitise council-specific design controls (setbacks, parking, landscaping) from PDF documents

### Value Proposition

| Metric | Traditional | With LandIQ |
|--------|------------|-------------|
| Desktop feasibility time | 2–4 weeks | Under 1 hour |
| Desktop feasibility cost | $22K–$63K per site | ~$5K per site |
| Cost reduction | — | ~80% |
| Sites screened per month | 2–3 | 10+ |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, Tailwind CSS 4, Framer Motion |
| Maps | Leaflet + CartoDB dark tiles (free, no API key) |
| AI Services | Python, LLM, Document parsing |
| Database | PostgreSQL (with PostGIS for geospatial) |
| Data Sources | NSW ePlanning ArcGIS REST, VIC OpenData WFS, G-NAF (all free, no auth) |
| DevOps | Docker, CI/CD, GitHub Pages (pitch deck) |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Generate pitch deck PDF
node scripts/generate-pdf.mjs
```

**Pitch deck:** [http://localhost:3000/landiq/pitch](http://localhost:3000/landiq/pitch)

## Project Structure

```
land-iq/
├── src/app/
│   ├── page.tsx                    # Home page
│   ├── globals.css                 # Design system (colors, fonts)
│   ├── layout.tsx                  # Root layout with fonts
│   └── pitch/                      # Online pitch deck (18 slides)
│       ├── page.tsx                # Fixed 1440x900 viewport with scale
│       ├── components/Navigation   # Dot navigator
│       ├── hooks/                  # Keyboard/touch/swipe navigation
│       ├── shared/                 # AnimatedCounter, FadeIn, StaggerContainer
│       └── slides/                 # All slide components
├── public/images/                  # Photography assets (Unsplash)
├── assets/images/                  # Source images
├── scripts/generate-pdf.mjs       # Puppeteer PDF generator
├── docs/
│   ├── design-guidance.md          # Full design system (Orens Capital-inspired)
│   ├── prd-pitch-deck.md           # Pitch deck PRD
│   └── research/                   # Domain research
│       ├── README.md               # Research summary + API capability matrix
│       ├── api-testing-nsw.md      # Verified NSW API endpoints
│       ├── api-testing-vic-national.md  # Verified VIC + national APIs
│       ├── competitive-analysis.md # Landchecker, Archistar, CoreLogic, PropCode
│       ├── due-diligence/          # 8-category developer checklist (split files)
│       └── ...
└── CLAUDE.md                       # AI assistant context
```

## Pitch Deck (18 slides)

| # | Slide | Description |
|---|-------|-------------|
| 0 | Cover | Deep green + topographic animation |
| 1 | Problem | 4 pain points with side image |
| 2 | Market | Stats with animated counters |
| 3 | Solution Hero | Deep green + vertical rotated text |
| 4 | How It Works | 3-step flow with connector animation |
| 5 | Data Engine | API matrix with SVG checkmark animations |
| 6 | AI Report | Capabilities + report sections animation |
| 7 | Live Demo | Interactive map (Leaflet) + data panel |
| 8 | Report Showcase | Feasibility report mockup + key metrics |
| 9 | Document Management | Before/After + document browser mockup |
| 10 | Chrome Extension | Browser mockup with extension overlay |
| 11 | Email Hub | Unified inbox mockup + connected accounts |
| 12 | Modules | 5 platform modules with phase badges |
| 13 | Competitive | Comparison table vs Landchecker/Archistar/CoreLogic |
| 14 | Cost Savings | $100K+ sunk cost → 80% reduction |
| 15 | Time Savings | 2-4 weeks → under 1 hour |
| 16 | Roadmap | 2026 full delivery timeline |
| 17 | CTA | Contact + book demo |

## Design System

Based on [Orens Capital](https://www.orenscapital.com.au) — institutional property investment aesthetic.

- **Primary:** Deep Forest Green `#134A32`
- **Accent:** Gold `#C4952A`
- **Fonts:** DM Serif Display (headings) + Source Serif 4 (body) + Inter (UI)
- **Style:** Outline capsule buttons, line-separated stat cards, generous whitespace, warm photography
- **PPT Mode:** Fixed 1440×900 viewport with `transform: scale` — no responsive breakpoints

## Roadmap 2026

| Phase | Timeline | Deliverables |
|-------|----------|-------------|
| Core Platform | Apr–May | NSW+VIC data engine, site intelligence, land pipeline, interactive map |
| AI Reports & Docs | Jun–Jul | AI feasibility reports, DCP parsing, document management, email hub |
| Integrations | Aug–Sep | Chrome extension, Domain API, team collaboration, project management |
| National Scale | Oct–Nov | QLD+SA+WA expansion, sales module, advanced risk AI |
| Full Platform | Dec | All states, API marketplace, enterprise deployment |

## Team

| Role | Members |
|------|---------|
| **Mentor** | Winston |
| **Team Lead** | Hal |
| **BA** | David |
| **Dev** | Cathy (DevOps), Edward, Icey, Jason, Raymond, Sharon, Shawn, Skylar, Stella, Vanni, Zoey |

## License

Proprietary — All rights reserved.
