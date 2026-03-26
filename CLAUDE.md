# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LandIQ is an AI-powered property development platform for Australian real estate developers. It automates land feasibility analysis by querying government open data APIs, generates feasibility reports via LLM, and provides a unified system for the entire development lifecycle.

**Live:** https://australiaitgroup.github.io/landiq/pitch

## Commands

```bash
npm run dev          # Dev server (pitch deck at /landiq/pitch)
npm run build        # Static export to out/ (with basePath /landiq)
node scripts/generate-pdf.mjs  # Generate pitch deck PDF (requires dev server running)
```

## Architecture

**Current state:** Online pitch deck (18 slides) — the platform itself is not yet built.

### Pitch Deck (`src/app/pitch/`)
- **Fixed 1440×900 viewport** with `transform: scale` — NOT responsive, behaves like PowerPoint
- All slides in `slides/` directory, registered in `slides/index.ts`
- Navigation: keyboard (arrows/space), click (right 70% = next), touch swipe, dot navigator
- Shared animation components: `FadeIn`, `StaggerContainer`, `AnimatedCounter`
- Interactive map demo: Leaflet + CartoDB dark tiles (no API key needed)
- PDF generation via Puppeteer (`scripts/generate-pdf.mjs`)

### Config Notes
- `basePath: '/landiq'` in `next.config.ts` — all URLs prefixed with `/landiq/`
- `output: 'export'` for static GitHub Pages deployment
- Image paths must use `/landiq/images/...` prefix
- `images.unoptimized: true` required for static export

## Key Domain Context

The platform integrates with Australian government open data APIs (all free, no auth):

**NSW (ArcGIS REST, ~130-230ms):**
- Planning: `mapprod3.environment.nsw.gov.au/.../Planning_Portal_Principal_Planning/MapServer`
  - Zoning L19, FSR L11, Height L14, Heritage L16+L221, Lot Size L22
- Hazards: `.../Planning_Portal_Hazard/MapServer` — Bushfire L229, Flood L230
- Cadastre: `portal.spatial.nsw.gov.au` FeatureServer L8
- Use `/query` not `/identify`. Even layers are groups (400 error) — use odd child layers.

**VIC (WFS GeoJSON):**
- All via `opendata.maps.vic.gov.au/geoserver/wfs`, namespace `open-data-platform`
- Use BBOX queries (CQL INTERSECTS has axis-order issues)

## Design System

Reference: `docs/design-guidance.md` — Orens Capital-inspired institutional style.

- **Primary:** `#134A32` (Deep Forest Green)
- **Accent:** `#C4952A` (Gold)
- **Fonts:** DM Serif Display (display) + Source Serif 4 (body) + Inter (UI)
- **Style:** Capsule outline buttons, line-separated stat cards, generous whitespace

## Research Documents

All in `docs/research/`:
- `README.md` — API capability matrix and consolidated findings
- `api-testing-nsw.md` / `api-testing-vic-national.md` — verified endpoints
- `competitive-analysis.md` — Landchecker, Archistar, CoreLogic, PropCode, Feasly
- `due-diligence/` — 8-category developer checklist
