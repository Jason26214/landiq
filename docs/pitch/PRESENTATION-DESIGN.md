# P3 Proposal Presentation — 设计文档

## 一、Tech Stack Slide 设计

### 位置

插入 Roadmap (slide 16) 和 CTA (slide 17) 之间，成为 slide 17，CTA 顺延为 slide 18。

理由：Roadmap 讲 "什么时候做什么"，紧接着 Tech Stack 讲 "用什么技术来做"，逻辑连贯。CTA 永远放最后。

### 做几页

**1 页**。老板说得很随意 ("加上技术栈")，内容不多，1 页足够。19 页总共 15 分钟节奏也刚好。

### 布局方案

采用与现有 slide 一致的 **左文字 + 右视觉** 12 列 grid 布局 (col-span-5 / col-span-7)。

**左侧 (col-span-5):**
- Section label: "Technology"
- Heading: "Enterprise-grade architecture built for scale"
- Body: "Turborepo monorepo with 4 purpose-built applications, shared type system, and automated CI/CD pipeline."

**右侧 (col-span-7): 架构图 + 技术标签**

```
┌──────────────────────────────────────────────┐
│  Monorepo (Turborepo + pnpm)                 │
│                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │ Web      │ │ Portal   │ │ Console  │     │
│  │ Next.js  │ │ Vite +   │ │ Vite +   │     │
│  │ 15       │ │ React 19 │ │ React 19 │     │
│  │ SSR/SEO  │ │ SPA      │ │ SPA      │     │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘     │
│       │             │             │           │
│       └─────────────┼─────────────┘           │
│                     │                         │
│              ┌──────▼──────┐                  │
│              │ API         │                  │
│              │ NestJS 11   │                  │
│              │ REST /api/v1│                  │
│              └──────┬──────┘                  │
│                     │                         │
│   ┌─────────────────┼─────────────────┐      │
│   │                 │                 │      │
│   ▼                 ▼                 ▼      │
│ PostgreSQL      Redis +            S3        │
│ + PostGIS       BullMQ          (MinIO)      │
│ + pgvector                                   │
└──────────────────────────────────────────────┘

Deploy: AWS EC2 + S3 + CloudFront │ CI/CD: GitHub Actions
```

右侧用卡片式布局渲染这个架构图（不用 ASCII，用 React 组件 + Tailwind），底部一行 deploy 信息用 badge 展示。

### 视觉风格

- bg: `bg-white` (Light slide，与 DataEngineSlide 同风格)
- 架构图中的 App 卡片: `border border-surface-300 rounded-lg` + stagger 动画入场
- 底部 deploy badge: `bg-primary-50 text-primary-800 rounded-full` (与 Roadmap 底部栏同风格)
- 数据库/基础设施用小 icon (Lucide: Database, Server, HardDrive, Cloud) + 标签

### 文案清单 (所有英文，澳式英语)

| 元素 | 文案 |
|------|------|
| Section label | Technology |
| Heading | Enterprise-grade architecture built for scale |
| Body | Turborepo monorepo with 4 purpose-built applications, shared type system, and automated CI/CD pipeline. |
| Web 卡片 | **Marketing Website** · Next.js 15 · SSR / SEO |
| Portal 卡片 | **Enterprise Portal** · React 19 + Vite · SPA |
| Console 卡片 | **Admin Console** · React 19 + Vite · SPA |
| API 卡片 | **REST API** · NestJS 11 · TypeScript |
| Shared 标签 | Shared Types (Zod) |
| DB 标签 | PostgreSQL + PostGIS + pgvector |
| Cache 标签 | Redis + BullMQ |
| Storage 标签 | AWS S3 / MinIO |
| Deploy badge | AWS Sydney · EC2 + S3 + CloudFront · Docker Compose |
| CI/CD badge | GitHub Actions · Lint → Type-check → Test → Build → Deploy |

---

## 二、演讲分工 (15 分钟 / 4 人)

### 分配原则
- 组长 Hal 开场收尾，掌控节奏
- 每人 3-4 分钟，4-5 页
- 每个人讲的内容是一个完整的 "章节"，不会中途换人

### 建议方案

| 演讲者 | Slides | 主题 | 预估时长 |
|--------|--------|------|----------|
| **Hal** (组长) | 0-3 (Cover → Solution Hero) | 开场 + 痛点 + 市场 + 方案总览 | ~3 min |
| **Skylar** | 4-8 (How It Works → Report Showcase) | 核心产品: 流程 + 数据引擎 + AI 报告 + Demo + 报告展示 | ~4 min |
| **Edward** | 9-13 (Document Mgmt → Competitive) | 辅助功能 + 竞争优势: 文档/插件/邮件/模块/对比 | ~3.5 min |
| **Jason** | 14-18 (Pricing → Tech Stack → CTA) | 商业价值 + 技术栈 + 路线图 + 收尾 | ~4 min |

> Jason 负责 Tech Stack slide 比较自然 — 自己做的 slide 自己讲。
> Hal 开场定调并介绍项目背景，Jason 收尾呼应 CTA。

### 交接点设计
- Hal → Skylar: "Now let me hand over to Skylar to walk you through how LandIQ actually works."
- Skylar → Edward: "I'll pass it to Edward to cover the supporting features and how we compare to competitors."
- Edward → Jason: "Jason will take us through the business case, our technology, and what's next."
- Jason → 结束: "Thank you — we're happy to take any questions."

---

## 三、演讲稿大纲 (每页关键点)

> 最终演讲稿需要写完整的逐字稿，这里先列每页要讲的核心信息，供确认方向。

### Hal (slides 0-3)

**Slide 0 - Cover** (~15s)
- 自我介绍 + 团队介绍
- "Today we're presenting LandIQ — an AI-powered platform for Australian property developers."

**Slide 1 - Problem** (~50s)
- 澳洲开发商目前还在手动做可行性分析
- 4 个痛点逐一点出：数据碎片 / 手工报告 / 没有统一系统 / DCP 法规黑箱
- "This process costs developers over $100K per site and takes weeks."

**Slide 2 - Market** (~40s)
- 10,000+ 活跃开发商，每个 site 8 小时筛选，$250K+ DD 成本
- "This is a multi-billion dollar industry still running on spreadsheets."

**Slide 3 - Solution Hero** (~25s)
- LandIQ 一句话总结: "Address in, feasibility out."
- "One platform that automates the entire desktop feasibility process."
- 引出交给 Skylar

### Skylar (slides 4-8)

**Slide 4 - How It Works** (~40s)
- 三步流程：输入地址 → AI 查询 30+ 数据源 → 出报告
- 简洁，不需要深入技术

**Slide 5 - Data Engine** (~50s)
- NSW ePlanning + VIC OpenData 实时查询
- 强调速度 (<300ms) 和免费
- 点出数据类型：Zoning, FSR, Height, Bushfire, Flood, Heritage

**Slide 6 - AI Report** (~40s)
- AI 生成机构级报告，不是简单的数据汇总
- DCP PDF 解析、风险检测、收益计算
- "From an address to a professional feasibility report in minutes."

**Slide 7 - Demo** (~45s)
- 指向地图交互演示
- 点击一个地块，展示实时返回的规划数据
- "This is live data from government APIs — not a mockup."

**Slide 8 - Report Showcase** (~50s)
- 完整报告 6 个章节
- 关键数据：82,628 sqm GFA, 480 apartments, 28.8% margin, 24.2% IRR
- AI 推荐: PROCEED

### Edward (slides 9-13)

**Slide 9 - Document Mgmt** (~35s)
- Before/After 对比
- 核心: 集中、可搜索、版本控制、AI 自动标签

**Slide 10 - Chrome Extension** (~30s)
- 浏览 REA/Domain/Landchecker 时一键获取规划数据
- Phase 1 功能

**Slide 11 - Email Hub** (~30s)
- 多邮箱聚合，AI 自动关联到项目
- 不再翻收件箱找邮件

**Slide 12 - Modules** (~30s)
- 5 大模块概览：拿地 / 可行性 / 项目管理 / 销售 / 运营
- Phase 1 vs Phase 2 路线

**Slide 13 - Competitive** (~40s)
- 对比 Landchecker / Archistar / CoreLogic / Feasly
- "LandIQ is the only end-to-end platform — from planning data to feasibility to project management."

### Jason (slides 14-18)

**Slide 14 - Pricing (Cost Savings)** (~50s)
- $100K+ 沉没成本 headline
- 逐项对比传统 vs LandIQ，~80% 节省
- "If a developer evaluates 10 sites and abandons 7, that's $700K wasted."

**Slide 15 - Time Savings** (~45s)
- 2-4 weeks → <1 hour
- 逐项对比时间
- "Speed is competitive advantage — first mover on the best sites wins."

**Slide 16 - Roadmap** (~35s)
- 2026 五个里程碑
- 强调 AI-accelerated development，9 个月完成全平台

**Slide 17 - Tech Stack** (~40s) ⭐ NEW
- Monorepo 4 个 app 各自的职责和技术
- 后端 NestJS + PostgreSQL + PostGIS
- AWS 部署: EC2 + S3 + CloudFront
- GitHub Actions CI/CD
- "Enterprise-grade architecture — built to scale from day one."

**Slide 18 - CTA** (~15s)
- "Ready to transform your feasibility process? Thank you — happy to take questions."

---

## 四、待确认项

1. **Tech Stack 做 1 页还是 2 页？** (本文档建议 1 页)
2. **演讲分工是否同意上述方案？** (需要跟 Hal, Skylar, Edward 确认)
3. **演讲稿最终是逐字稿还是要点提示？** (Confluence 上传格式)
4. **是否需要在 PPT 上加页码标注 presenter 名字？** (方便现场交接)
