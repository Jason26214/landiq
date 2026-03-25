# LandIQ

An AI-powered property development platform that helps Australian real estate developers manage land acquisition, feasibility analysis, project development, and property sales in a unified system.

## Problem

Australian property developers face significant challenges during the land acquisition process:

- **Complex due diligence** — Zoning, planning overlays, council regulations, environmental constraints, flood risk, transport access, and more
- **Fragmented information** — Data scattered across council portals, GIS systems, PDFs, Excel spreadsheets, and consultant reports
- **Manual reporting** — Feasibility reports still written by hand in Word + Excel, slow and error-prone
- **No unified system** — Land opportunities, reports, and decisions managed through email and shared folders

## Solution

LandIQ is a **Property Development Operating System** that consolidates the entire development lifecycle into one platform, powered by AI to automate analysis and report generation.

### Core Modules

| Module | Description |
|--------|-------------|
| **Land Acquisition** | Land CRM with pipeline management (Lead → Research → Feasibility → Negotiation → Acquired) |
| **Feasibility Engine** | AI-powered analysis of zoning, density, development potential, and planning risks with auto-generated reports |
| **Project Management** | Post-acquisition project tracking — timelines, stages, contractors, consultants, approvals |
| **Property Sales** | Unit inventory, pricing, buyer tracking, sales pipeline, contract management |
| **Admin & Operations** | Employee management, task workflows, document management, financial tracking |

### AI Capabilities

- **Feasibility Report Generation** — Input an address, get a full report (site overview, planning analysis, development potential, risks, recommendations)
- **Planning Document Interpretation** — Automatically parse council PDFs, zoning rules, and planning overlays
- **Risk Detection** — Flag flood zones, environmental restrictions, heritage overlays, and planning conflicts
- **Project Summaries** — Auto-generate progress reports and sales performance reports

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React, Map visualization |
| Backend | NestJS, Microservices, API Gateway |
| AI Services | Python, LLM, Document parsing |
| Database | PostgreSQL (with PostGIS for geospatial) |
| DevOps | Docker, CI/CD, Cloud deployment |

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd land-iq

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
land-iq/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── packages/
│   └── shared/       # Shared types and utilities
├── services/
│   └── ai/           # Python AI services
└── docker/           # Docker configuration
```

## MVP Scope (Phase 1)

1. Land Acquisition Module
2. Feasibility Analysis Engine
3. Development Project Management

Phase 2 will add Property Sales and Admin modules.

## Target Users

- Property Developers
- Land Acquisition Teams
- Property Investment Firms
- Planning Consultants

## License

Proprietary — All rights reserved.
