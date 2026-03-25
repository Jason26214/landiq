# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LandIQ is an AI-powered property development platform for Australian real estate developers. It automates land feasibility analysis by querying government open data APIs, generates feasibility reports via LLM, and provides a unified system for the entire development lifecycle (acquisition → feasibility → project management → sales).

**Status:** Pre-code research phase. No application code exists yet. The `docs/research/` directory contains extensive domain research, API testing results, and competitive analysis.

## Planned Tech Stack

- **Frontend:** Next.js + React, map visualization (Mapbox/Leaflet), dashboard UI
- **Backend:** NestJS microservices, API gateway
- **AI Services:** Python, LLM for report generation and document parsing
- **Database:** PostgreSQL with PostGIS for geospatial queries
- **DevOps:** Docker, CI/CD

## Planned Project Structure

```
apps/web/        — Next.js frontend
apps/api/        — NestJS backend
packages/shared/ — Shared types and utilities
services/ai/     — Python AI services
docker/          — Docker configuration
```

## Key Domain Context

The platform integrates with Australian government open data APIs to retrieve planning controls for any land parcel by coordinates:

**NSW (ArcGIS REST, no auth, ~130-230ms):**
- Zoning: `Planning_Portal_Principal_Planning/MapServer` Layer 19
- FSR: Layer 11, Height: Layer 14, Heritage: Layer 16 + 221, Lot Size: Layer 22
- Bushfire: `Planning_Portal_Hazard/MapServer` Layer 229
- Flood: Layer 230 (incomplete coverage)
- Cadastre: `portal.spatial.nsw.gov.au` FeatureServer Layer 8
- Use `/query` not `/identify`. Even-numbered layers are groups (return 400) — always use odd child layers.

**VIC (WFS GeoJSON, no auth):**
- All via `opendata.maps.vic.gov.au/geoserver/wfs`
- Namespace: `open-data-platform` (NOT `datavic`)
- Zoning: `plan_zone`, Overlays: `plan_overlay`, Cadastre: `parcel_view`
- Use BBOX queries (CQL INTERSECTS has axis-order issues with EPSG:7844)

**Address geocoding:** G-NAF bulk download (free, 15.9M addresses, import to PostGIS). Real-time geocoding via PSMA API (paid).

## Design System

Reference: `docs/design-guidance.md` — based on Orens Capital's institutional property investment aesthetic.

- **Primary:** Deep Forest Green `#134A32`
- **Fonts:** DM Serif Display (display/headings) + Source Serif 4 (body) + Inter (UI/dashboard)
- **Icons:** Lucide Icons, 1.5px stroke
- **Components:** Outline capsule buttons, line-separated stat cards, asymmetric layouts
- **Landing:** Elegant serif typography, warm photography, generous whitespace
- **Dashboard:** Efficient sans-serif UI, left sidebar (240px, deep green), data-forward cards

## Research Documents

All research is in `docs/research/`:
- `README.md` — consolidated findings summary with API capability matrix
- `api-testing-nsw.md` / `api-testing-vic-national.md` — verified API endpoints with working curl examples
- `competitive-analysis.md` — Landchecker, Archistar, CoreLogic, PropCode, Feasly analysis
- `due-diligence/` — 8-category checklist (planning, title, environmental, heritage, infrastructure, development potential, financial, market)

## MVP Scope (Phase 1)

Three modules: Land Acquisition CRM, Feasibility Analysis Engine, Development Project Management. Phase 2 adds Property Sales and Admin.
