# PRD: LandIQ Online Pitch Deck

**Status:** Implemented
**Last updated:** 2026-03-25

## 1. Overview

Browser-based full-screen presentation for pitching LandIQ to stakeholders (property developers, investors). Fixed 1440×900 viewport with scale-to-fit — behaves like PowerPoint, not a responsive website.

**Route:** `/landiq/pitch` (basePath: `/landiq`)
**Design:** Orens Capital-inspired institutional style (deep green `#134A32`, DM Serif Display, capsule buttons)
**Tech:** Next.js 15 + React 19 + Framer Motion + Leaflet

## 2. Slides (18 pages)

| # | Component | Type | Key Features |
|---|-----------|------|-------------|
| 0 | CoverSlide | Dark | Background photo + topographic lines animation + Ken Burns |
| 1 | ProblemSlide | Light | 4 pain-point cards (stagger) + right-side photo panel |
| 2 | MarketSlide | Sand | Animated counters (10,000+, 8hrs, $250K+, 12 weeks) + vertical rotated text |
| 3 | SolutionHeroSlide | Dark | Pure green + gold accent line + dual capsule buttons + vertical label |
| 4 | HowItWorksSlide | Light | 3-step cards + SVG connector drawing + code snippets |
| 5 | DataEngineSlide | Light | NSW/VIC API matrix + SVG checkmark path animations + speed badges |
| 6 | AIReportSlide | Light | Report mockup (sections expand) + capability list + export buttons |
| 7 | DemoSlide | Dark | Leaflet map (CartoDB dark tiles, green tint) + 3 clickable parcels + data panel |
| 8 | ReportShowcaseSlide | Light | Full report preview (6 sections) + key financial metrics + AI recommendation |
| 9 | DocumentMgmtSlide | Light | Before→After comparison + document browser mockup + AI auto-tagging |
| 10 | ChromeExtSlide | Light | 3-step interactive demo + browser mockup + extension overlay animation |
| 11 | EmailHubSlide | Light | 3 connected accounts + unified inbox mockup + 5 contextual emails |
| 12 | ModulesSlide | Light | 5 module cards with Phase 1/2 badges (stagger) |
| 13 | CompetitiveSlide | Light | Comparison dots table vs Landchecker/Archistar/CoreLogic/Feasly |
| 14 | PricingSlide (Cost) | Light | $100K+ sunk cost headline + 6-row cost comparison table + ~80% savings |
| 15 | TimeSavingsSlide | Light | 2-4 weeks → <1 hour + 6-row timeline comparison + progress bars |
| 16 | RoadmapSlide | Light | 5-node 2026 timeline + progress fill + topographic background |
| 17 | CTASlide | Dark | Background photo + "Book a Demo" + contact info |

## 3. Navigation

- **Right-side dots:** Absolute positioned, auto-hide after 3s idle, click to jump
- **Keyboard:** `→` `↓` `Space` `Enter` = next, `←` `↑` = prev, `Esc` = exit fullscreen
- **Touch:** Swipe left/right
- **Click:** Right 70% of screen = next, left 30% = prev (excludes buttons/links)
- **Counter:** Bottom-left "X / 18" in white/30

## 4. Viewport Strategy

**Fixed design resolution:** 1440 × 900px (never changes)

```tsx
const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 900;
const scale = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
// Applied via transform: scale(${scale}) on the slide container
```

- No responsive breakpoints — content layout is identical on all screens
- Black letterbox bars on screens with different aspect ratios
- Behaves exactly like PowerPoint/Keynote

## 5. Animation System

| Type | Implementation | Timing |
|------|---------------|--------|
| Slide transitions | Framer Motion `AnimatePresence` horizontal slide + parallax | 500ms ease |
| Element entrance | `FadeIn` component (opacity + translateY) | 600ms per element |
| Stagger groups | `StaggerContainer` + `staggerItem` variants | 150ms stagger |
| Number counters | `AnimatedCounter` (requestAnimationFrame + easeOut) | 1.5s |
| SVG checkmarks | `motion.path` with `pathLength` animation | 350ms per check |
| Ken Burns | Background `scale 1.05→1` on images | 15-20s continuous |
| Map flyTo | Leaflet `flyTo` on parcel selection | 1.2s |

## 6. Data Sources (Demo Slide)

3 hardcoded parcels with real API data:
- 42 Bridge Street, Sydney NSW 2000 (SP5, FSR 8:1, Heritage I2287)
- 15 Campbell Street, Parramatta NSW 2150 (B4, FSR 6:1, Flood Planning)
- 88 Collins Street, Melbourne VIC 3000 (CCZ1, HO541, SBO3)

Map: Leaflet + CartoDB dark_nolabels tiles + CSS `hue-rotate(100deg) saturate(0.4) brightness(0.6)` for green tint.

## 7. Images

Source: `assets/images/` (Unsplash, free commercial use)
Served from: `public/images/` (copied at build)
Path prefix: `/landiq/images/` (due to basePath)

| Slide | Image | Source |
|-------|-------|--------|
| Cover (0) | hero-family-beach.jpg | hero/ |
| Problem (1) | team-tablet-review.jpg | team/ |
| CTA (17) | lifestyle-community-walk.jpg | lifestyle/ |

## 8. PDF Generation

```bash
node scripts/generate-pdf.mjs
```

- Uses Puppeteer to capture each slide at 1440×900
- Hides Next.js dev overlay before capture
- Outputs `LandIQ-Pitch-Deck.pdf` (18 pages, ~5MB)
- Requires dev server running at `localhost:3000`

## 9. File Structure

```
src/app/pitch/
├── page.tsx                    # Fixed viewport container + scale logic
├── layout.tsx                  # Empty layout (no app shell)
├── components/Navigation.tsx   # Dot navigator
├── hooks/useSlideNavigation.ts # Keyboard/touch/click/swipe
├── shared/
│   ├── AnimatedCounter.tsx
│   ├── FadeIn.tsx
│   ├── SlideLayout.tsx
│   └── StaggerContainer.tsx
└── slides/
    ├── index.ts                # Slide registry (ordered array)
    ├── CoverSlide.tsx
    ├── ProblemSlide.tsx
    ├── MarketSlide.tsx
    ├── SolutionHeroSlide.tsx
    ├── HowItWorksSlide.tsx
    ├── DataEngineSlide.tsx
    ├── AIReportSlide.tsx
    ├── DemoSlide.tsx
    ├── ReportShowcaseSlide.tsx
    ├── DocumentMgmtSlide.tsx
    ├── ChromeExtSlide.tsx
    ├── EmailHubSlide.tsx
    ├── ModulesSlide.tsx
    ├── CompetitiveSlide.tsx
    ├── PricingSlide.tsx
    ├── TimeSavingsSlide.tsx
    ├── RoadmapSlide.tsx
    ├── TeamSlide.tsx          # Hidden (commented out in index.ts)
    └── CTASlide.tsx
```

## 10. Deployment

- **GitHub Pages:** Static export via `output: 'export'` + `basePath: '/landiq'`
- **Build:** `npm run build` → `out/` directory
- **URL:** `https://australiaitgroup.github.io/landiq/pitch`
