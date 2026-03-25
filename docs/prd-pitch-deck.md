# PRD: LandIQ Online Pitch Deck

## 1. 概述

构建一个浏览器端全屏在线演示文稿，用于向甲方（房地产开发商、投资机构、规划顾问）展示 LandIQ 产品。

**访问路径:** `/pitch`
**设计风格:** 沿用 LandIQ 设计体系（深绿 `#134A32`、DM Serif Display、Orens Capital 机构级风格）
**技术栈:** Next.js + React + Framer Motion + Mapbox GL

---

## 2. 核心交互

### 全屏模式
- 页面 100vw × 100vh，`overflow: hidden`
- 无导航栏、无 footer、无侧边栏 — 独立 layout
- 首次点击触发 Fullscreen API（优雅降级为 100vh）

### 导航系统
- **右下角圆点导航器**: 每个圆点对应一个 slide，当前 slide 圆点填充绿色 `#134A32`，其余描边
- 鼠标静止 3 秒后圆点自动隐藏，移动鼠标恢复
- 点击圆点跳转到对应 slide
- **键盘**: `→` `↓` `Space` `Enter` = 下一页, `←` `↑` = 上一页, `Esc` = 退出全屏
- **触摸**: 左右滑动切换
- **快捷跳转**: 按 `G` 后输入数字跳转到指定 slide

### Slide 切换动画
- 默认: 水平滑动 + 轻微视差（背景移动慢于前景），600ms ease-out
- 使用 Framer Motion `AnimatePresence` + `mode="wait"`

---

## 3. Slide 内容设计（14 页）

### Slide 0 — Cover（封面）

```
┌─────────────────────────────────────┐
│         全屏深绿背景 #134A32          │
│                                     │
│     缓慢漂浮的等高线动画背景           │
│                                     │
│          [LandIQ Logo]              │
│                                     │
│   "The AI-Powered Property          │
│    Development Operating System"    │
│    (DM Serif Display, 白色)         │
│                                     │
│    Land Feasibility. Automated.     │
│    (Source Serif 4, 浅绿)            │
│                                     │
│     ▸ Press Space to begin          │
│                           ● ○ ○ …  │
└─────────────────────────────────────┘
```

**动画:** Logo 淡入 → 标题从下方滑入 → 副标题延迟淡入 → 等高线缓慢持续漂移

---

### Slide 1 — The Problem（痛点）

**标题:** "Australian developers are still doing feasibility by hand"

**布局:** 4 张痛点卡片从下方依次弹入（stagger 150ms）

| 卡片 | Icon | 标题 | 描述 |
|------|------|------|------|
| 1 | `Layers` | Fragmented Data | 信息分散在 council portals, GIS, PDFs, Excel |
| 2 | `FileText` | Manual Reports | 可行性报告手写 Word + Excel，耗时易错 |
| 3 | `Inbox` | No Unified System | 机会管理靠邮件和共享文件夹 |
| 4 | `Lock` | DCP Black Box | Council 设计规则埋在非结构化 PDF 中 |

**样式:** Orens 线条分隔 stat card（`border-top: 2px solid #134A32`，无阴影无圆角）
**背景:** Off-white `#E9EAE5`

---

### Slide 2 — Market Context（市场背景）

**标题:** "A multi-billion dollar industry running on spreadsheets"

**布局:** Orens 风格左右分栏（5:7）

左侧：
- 大衬线标题 + 正文段落
- 描边按钮 "Learn More →"

右侧：2×2 数据网格，数字使用 AnimatedCounter 从 0 滚动到目标值
| 数据 | 值 | 描述 |
|------|-----|------|
| 开发商数量 | 10,000+ | Active developers in Australia |
| 人工调查时间 | 4-8 hrs | Per site desktop screening |
| 尽调费用 | $30K-$250K | Per acquisition due diligence |
| 决策延迟 | 6-12 weeks | Standard DD timeline |

**动画:** 数字 countUp 1.5s, 卡片 stagger 入场
**背景:** Sand `#D5CFC5` + 右侧竖排旋转文字 "Property / Development / Intelligence"

---

### Slide 3 — The Solution（解决方案 Hero）

```
┌─────────────────────────────────────┐
│                                     │
│   全屏暖色调航拍澳洲郊区照片           │
│   无深色遮罩（参考 Orens Hero）        │
│                                     │
│   左下角白色文字:                      │
│   ─── 细线                           │
│   LandIQ                            │
│   "One platform.                    │
│    Address in, feasibility out."    │
│                                     │
│   [○ See How It Works →]            │
│                                     │
└─────────────────────────────────────┘
```

**动画:** 照片从略微放大缩至正常（Ken Burns 效果） + 文字从左侧滑入

---

### Slide 4 — How It Works（工作流程）

**三步流程，水平排列，SVG 虚线连接器自动绘制：**

```
  ① Enter Address    →→→    ② AI Queries APIs    →→→    ③ Get Report
  ┌──────────┐              ┌──────────┐               ┌──────────┐
  │  🔍       │    -----→   │  ⚡ 30+   │    -----→    │  📄       │
  │ 地址搜索框 │              │ 数据节点   │               │ 报告展开   │
  │ 动画输入   │              │ 逐个点亮   │               │ 章节展开   │
  └──────────┘              └──────────┘               └──────────┘
```

**动画:**
1. Step 1: 地址输入框打字动画 "42 Bridge Street, Sydney NSW"
2. 虚线连接器从左向右 stroke-dashoffset 绘制
3. Step 2: 数据节点网络图，节点逐个从灰变绿（NSW ePlanning, VIC WFS, G-NAF...）
4. Step 3: 报告文档展开，章节标题逐行出现

---

### Slide 5 — Data Engine（数据引擎）

**标题:** "Real-time government data. Zero manual research."

**布局:** 左文字 + 右侧动画数据矩阵

右侧表格逐行动画入场，每行带 SVG 勾选动画：

| 数据类型 | NSW | VIC | 速度 |
|---------|:---:|:---:|------|
| Zoning | ✓ | ✓ | <150ms |
| FSR | ✓ | — | <140ms |
| Height Limits | ✓ | ✓ | <145ms |
| Bushfire Risk | ✓ | ✓ | <230ms |
| Flood Risk | ✓ | ✓ | <160ms |
| Heritage | ✓ | ✓ | <135ms |
| Cadastre | ✓ | ✓ | <205ms |

**特色:** "<300ms" 用 accent gold `#C4952A` badge 强调
**动画:** 勾选标记用 SVG path 绘制动画逐个出现

---

### Slide 6 — AI Report Generation（AI 报告）

**标题:** "From address to institutional-grade report in minutes"

**左侧:** 报告 mockup，章节逐个展开动画
```
┌────────────────────┐
│ 📄 Feasibility Report │
│ ─────────────────── │
│ ✓ Site Overview      │  ← 第 1 个展开
│ ✓ Planning Analysis  │  ← 第 2 个
│ ✓ Dev Potential      │  ← 第 3 个
│ ✓ Risk Assessment    │  ← 第 4 个
│ ✓ Recommendations    │  ← 第 5 个
│                      │
│ [Export PDF] [Word]  │
└────────────────────┘
```

**右侧:** AI 能力列表
- DCP PDF 解析 → 结构化规则
- 风险自动识别（flood, bushfire, heritage, contamination）
- 产能估算（GFA, dwelling yield）
- 可比销售分析

---

### Slide 7 — Live Demo（交互演示） ⭐ 重点 Slide

**全屏交互式地图**，展示核心产品体验：

```
┌─────────────────────────────────────┐
│ 🔍 Search: [42 Bridge St, Sydney ] │
│                                     │
│      ┌─────────────────┐           │
│      │                 │  ┌──────┐ │
│      │    Mapbox 地图    │  │ Side │ │
│      │  显示地块边界     │  │ Panel│ │
│      │  Zoning 颜色     │  │      │ │
│      │  点击地块查看     │  │Zoning│ │
│      │                 │  │FSR   │ │
│      │                 │  │Height│ │
│      └─────────────────┘  │Fire  │ │
│                           │Flood │ │
│                           └──────┘ │
└─────────────────────────────────────┘
```

**实现:**
- Mapbox GL 地图，预加载 Sydney CBD / Parramatta 区域
- 5-10 个预置地块，硬编码规划数据（从实际 API 测试结果获取）
- 点击地块 → 右侧面板滑入显示 zoning、FSR、height、constraints
- 地块边界用 GeoJSON polygon 高亮
- **不需要后端** — 数据全部硬编码用于演示

---

### Slide 8 — Five Core Modules（五大模块）

**标题:** "A complete operating system for property development"

**五张模块卡片，stagger 入场：**

| 模块 | Icon | 状态 | 描述 |
|------|------|------|------|
| Land Acquisition | `MapPin` | Phase 1 ✓ | Pipeline: Lead → Research → Feasibility → Negotiation → Acquired |
| Feasibility Engine | `Cpu` | Phase 1 ✓ | AI-powered zoning, yield, risk analysis + report generation |
| Project Management | `Kanban` | Phase 1 ✓ | Timeline, stages, contractors, approvals, documents |
| Property Sales | `DollarSign` | Phase 2 | Unit inventory, pricing, buyer tracking, contracts |
| Admin & Operations | `Settings` | Phase 2 | Employee, task, document, financial management |

**样式:** Phase 1 = 绿色 badge `#2D8A4E`, Phase 2 = 金色 badge `#C4952A`

---

### Slide 9 — Competitive Advantage（竞争优势）

**标题:** "Why LandIQ vs. the alternatives"

**对比表逐行动画入场：**

| Capability | LandIQ | Landchecker | Archistar | CoreLogic |
|------------|:------:|:-----------:|:---------:|:---------:|
| Planning Data | ● | ● | ● | ○ |
| DCP Rules AI | ● | ○ | ◐ | ○ |
| Risk Overlays | ● | ● | ● | ○ |
| Feasibility Engine | ● | ○ | ◐ | ○ |
| AI Report Gen | ● | ○ | ○ | ○ |
| Land CRM | ● | ○ | ○ | ○ |
| Project Mgmt | ● | ○ | ○ | ○ |

● = Full ◐ = Partial ○ = None

**高亮框:** "The only platform connecting planning rules → feasibility → project management"

---

### Slide 10 — Pricing（定价）

**三张定价卡片浮入：**

| Starter | Professional | Enterprise |
|---------|-------------|-----------|
| $XX/mo | $XX/mo | Custom |
| 1 user | 5 users | Unlimited |
| NSW only | NSW + VIC | National |
| 10 reports/mo | Unlimited | Unlimited |
| | API access | Private deployment |
| [Start Free Trial] | [Get Started] | [Contact Us] |

Enterprise 卡片带金色 accent 边框，略微放大

---

### Slide 11 — Roadmap（路线图）

**水平时间线，节点从左向右脉冲出现：**

```
──●──────────●──────────●──────────●──────────●──
  Q2 2026    Q3 2026    Q4 2026    Q1 2027    2027+
  MVP        AI Report   QLD+SA    National    API
  NSW+VIC    Engine v2   Expansion  Coverage   Marketplace
```

**背景:** 极淡的等高线地形纹理

---

### Slide 12 — Team（团队）

**标题:** "Built by developers, for developers"

- 团队成员卡片（照片 + 姓名 + 职位）
- 底部信任标识: NSW ePlanning, VIC Open Data, G-NAF, PostgreSQL/PostGIS logos
- 暖色调专业照片风格

---

### Slide 13 — Call to Action（行动号召）

```
┌─────────────────────────────────────┐
│         全屏深绿背景 #134A32          │
│                                     │
│   "Ready to transform your          │
│    feasibility process?"            │
│   (DM Serif Display, 48px, 白色)    │
│                                     │
│   [○ Book a Demo →]                 │
│   [○ Contact Us →]                  │
│                                     │
│   hello@landiq.com.au               │
│   www.landiq.com.au                 │
│                                     │
│        [QR Code]                    │
│                           ● ○ ○ …  │
└─────────────────────────────────────┘
```

---

## 4. 动画规范

### Slide 间切换
| 类型 | 效果 | 时长 |
|------|------|------|
| 默认 | 水平滑动 + 视差 | 600ms ease-out |
| 深色→深色 (Cover↔CTA) | 淡入淡出 | 400ms |

### Slide 内动画
| 类型 | 效果 | 说明 |
|------|------|------|
| 元素入场 | `opacity 0→1` + `translateY 30→0` | stagger 100-150ms |
| 数字滚动 | countUp 从 0 到目标 | 1.5s, easeOut |
| SVG 勾选 | stroke-dashoffset 绘制 | 300ms per checkmark |
| 连接线绘制 | stroke-dashoffset | 800ms |
| Timeline 脉冲 | scale 1→1.2→1 + glow | 400ms per node, stagger |
| Ken Burns | scale 1.05→1 | 15s, 持续 |
| 卡片 hover | scale 1.02 + shadow elevation | 200ms |

### 性能规则
- 只使用 `transform` 和 `opacity` (GPU 合成)
- 遵守 `prefers-reduced-motion`
- 预加载相邻 slide 图片（current ± 1）

---

## 5. 技术架构

### 文件结构

```
app/pitch/
├── page.tsx                    ← 入口，100vh 全屏壳
├── layout.tsx                  ← 空 layout（无 app shell）
├── components/
│   ├── PitchDeck.tsx           ← 核心容器，管理 slide 状态
│   ├── SlideRenderer.tsx       ← AnimatePresence 切换
│   ├── Navigation.tsx          ← 右下角圆点导航
│   └── slides/
│       ├── index.ts            ← Slide 注册表
│       ├── CoverSlide.tsx
│       ├── ProblemSlide.tsx
│       ├── MarketSlide.tsx
│       ├── SolutionHeroSlide.tsx
│       ├── HowItWorksSlide.tsx
│       ├── DataEngineSlide.tsx
│       ├── AIReportSlide.tsx
│       ├── DemoSlide.tsx       ← 含 Mapbox 懒加载
│       ├── ModulesSlide.tsx
│       ├── CompetitiveSlide.tsx
│       ├── PricingSlide.tsx
│       ├── RoadmapSlide.tsx
│       ├── TeamSlide.tsx
│       └── CTASlide.tsx
├── shared/
│   ├── AnimatedCounter.tsx     ← 数字滚动组件
│   ├── StaggerContainer.tsx    ← Framer Motion stagger wrapper
│   ├── SlideLayout.tsx         ← 基础 slide 布局
│   ├── StatCard.tsx            ← Orens 风格数据卡片
│   ├── ComparisonTable.tsx     ← 动画对比表
│   ├── CapsuleButton.tsx       ← 描边胶囊按钮
│   └── VerticalLabel.tsx       ← 竖排旋转文字
├── hooks/
│   ├── useSlideNavigation.ts   ← 键盘/点击/滑动/圆点导航
│   └── useSlideAnimation.ts    ← 动画方向和 variants
└── data/
    ├── slideContent.ts         ← 所有文案（支持中英文切换 ?lang=zh）
    └── demoData.ts             ← 地图演示硬编码地块数据
```

### 依赖

| 包 | 用途 |
|----|------|
| `framer-motion` | 所有动画和 slide 切换 |
| `mapbox-gl` / `react-map-gl` | Slide 7 交互地图（懒加载） |
| `lucide-react` | 图标 |
| `next/font` | DM Serif Display, Source Serif 4, Inter |
| `next/image` | 图片优化 |

### 导航 Hook 设计

```typescript
interface UseSlideNavigation {
  currentSlide: number
  totalSlides: number
  direction: 'forward' | 'backward'
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

// 监听事件:
// ArrowRight / ArrowDown / Space / Enter → next()
// ArrowLeft / ArrowUp → prev()
// Escape → exitFullscreen()
// Touch swipe left/right
// G + number → goTo(n)
```

### Presenter 模式

URL 参数 `?notes=true` 显示底部演讲者备注栏（仅 presenter 屏幕可见，投影不显示）

### 多语言支持

`slideContent.ts` 支持 `?lang=en` / `?lang=zh` 切换，所有文案集中管理。

---

## 6. 响应式策略

| 场景 | 处理 |
|------|------|
| 16:9 投影仪 (1080p/4K) | **主设计目标** |
| 16:10 笔记本 (MacBook) | vh 单位自适应 |
| 超宽屏 (21:9) | 内容 max-width 1400px 居中 |
| iPad / 平板 | 多列→堆叠，触摸滑动 |
| 手机 | 单列，缩小字体，减少动画 |

**字体缩放:** `clamp(2rem, 4vw, 3.5rem)` 用于标题

---

## 7. 实施计划

| 阶段 | 内容 | 时间 |
|------|------|------|
| **Phase 1: 基础框架** | 路由、layout、PitchDeck 容器、导航 hook、slide 切换动画、Cover + CTA slide | 2-3 天 |
| **Phase 2: 内容 Slides** | 14 个 slide 组件 + 共享动画组件 + slideContent.ts 文案 | 3-4 天 |
| **Phase 3: 交互 + 打磨** | Mapbox 地图演示、presenter notes、响应式调试、性能优化、跨浏览器测试 | 2-3 天 |
| **总计** | | **7-10 天** |

---

## 8. 素材需求

| 类型 | 数量 | 规格 | 来源 |
|------|------|------|------|
| Hero 航拍照片 | 1-2 张 | 2560×1440, WebP, <300KB | Unsplash "australian suburb aerial" |
| 团队照片 | 3-5 张 | 400×400, 正方形 | 自行拍摄或占位 |
| LandIQ Logo | 1 | SVG, 白色 + 深色版本 | 设计 |
| 等高线背景 | 1 | SVG pattern, 可动画 | 生成 |
| 地图演示数据 | 5-10 地块 | GeoJSON + 规划属性 | 从 API 测试结果提取 |
