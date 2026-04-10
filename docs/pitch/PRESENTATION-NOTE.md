# P3 Proposal Presentation - 现状笔记

## 基本信息

- **演讲时间**: 总共 15 分钟
- **演讲人数**: 4 人 (组长 Hal + 组员 Skylar, Edward, Jason)
- **PPT 来源**: 老板制作, fork 到 Jason26214/landiq
- **线上网址**: https://jason26214.github.io/landiq/pitch
- **代码仓库**: `Jason26214/landiq` (fork 自 `australiaitgroup/landiq`)
- **本地路径**: `D:\Codes\p3\LandIQ\landiq`
- **开发预览**: `npm run dev` -> `http://localhost:3000/landiq/pitch`

## PPT 内容 (20 页, 编号从 1 开始)

| # | Slide | 内容 | 预估时长 |
|---|-------|------|----------|
| 1 | Cover | LandIQ 标题 + "Land Feasibility. Automated." | 20s |
| 2 | Team | 14 人团队名单 (Mentor/Lead/BA/DevOps/Dev) | 25s |
| 3 | Problem | 4 个痛点卡片: 数据碎片化/手工报告/无统一系统/DCP 黑箱 | 50s |
| 4 | Market | 4 个数据: 10,000+ 开发商 / 8hrs 筛选 / $250K+ DD / 12 weeks | 40s |
| 5 | Solution Hero | "Address in, feasibility out" 核心 slogan | 25s |
| 6 | How It Works | 3 步流程: 输入地址 -> AI 查询 30+ 数据源 -> 出可行性报告 | 40s |
| 7 | Data Engine | NSW/VIC 政府 API 数据矩阵, 8 项数据类型, 响应时间 | 50s |
| 8 | AI Report | AI 报告生成能力, DCP 解析/风险检测/收益计算/可比销售 | 40s |
| 9 | Demo | 交互式 Leaflet 地图, 3 个真实地块, 实时规划数据 | 45s |
| 10 | Report Showcase | 完整可行性报告展示, 6 个章节 + 财务指标 | 50s |
| 11 | Document Mgmt | Before->After 对比 + 文档浏览器 mockup | 35s |
| 12 | Chrome Ext | Chrome 插件 3 步演示, 浏览器 mockup | 30s |
| 13 | Email Hub | 3 个邮箱账户 + 统一收件箱 + AI 自动标签 | 30s |
| 14 | Modules | 5 大模块: 拿地/可行性/项目管理/销售/运营 | 30s |
| 15 | Tech Stack | Monorepo 4 App + API + 基础设施 + AWS 部署 | 40s |
| 16 | Competitive | 对比矩阵: LandIQ vs Landchecker/Archistar/CoreLogic/Feasly | 40s |
| 17 | Pricing (Cost) | $100K+ 沉没成本 + 6 项成本对比表 + ~80% 节省 | 50s |
| 18 | Time Savings | 2-4 weeks -> <1 hour + 6 项时间对比表 | 45s |
| 19 | Roadmap | 2026 年 5 个里程碑: 4-5月 -> 12月 | 35s |
| 20 | CTA | "Book a Demo" + 联系方式 | 15s |

**预估总时长: ~12-13 分钟 (加自然停顿约 15 分钟)**

## 缺少的内容: 技术栈 (Tech Stack)

老板原话 (transcript ~20:07):
> "因为这个 PPT 已经有了, 只是在后面加上技术栈, 有多少个 app, 然后技术栈是什么, 然后云端怎么部署"

### 需要覆盖的内容 (基于老板的 docs)

**1. 项目架构 - Monorepo (4 个 App)**
| App | 技术 | 用途 |
|-----|------|------|
| `apps/web` | Next.js 15 (SSR) | 营销官网 - Landing, pricing, SEO |
| `apps/portal` | Vite + React 19 (SPA) | 企业用户 Portal - auth, documents, org settings |
| `apps/console` | Vite + React 19 (SPA) | 平台管理控制台 - super_admin |
| `apps/api` | NestJS 11 | REST API - 统一后端, `/api/v1` |
| `packages/shared` | TypeScript | 共享 Zod schemas + types + constants |

**2. 核心技术栈**
- Frontend: React 19, Next.js 15, Vite, Tailwind CSS 4, Framer Motion
- Backend: NestJS 11, TypeORM, PostgreSQL + PostGIS + pgvector
- AI: LLM (Claude), RAG, Document Intelligence
- Storage: MinIO/S3, Redis + BullMQ
- Infra: Docker Compose, Turborepo + pnpm workspaces

**3. 云端部署 (AWS)**
- Marketing website (`apps/web`): EC2 (Docker + Nginx)
- Portal & Console: S3 + CloudFront (static SPA)
- API: EC2 (Docker)
- Database: RDS PostgreSQL (or EC2 self-hosted)
- Storage: S3
- CI/CD: GitHub Actions

## 重要约束

1. **不能超出老板限定的 scope** - 老板控制欲强, 所有内容必须基于他写的 docs
2. **技术栈信息来源**: `docs/prd-technical.md`, `docs/deployment.md`, `docs/prd-phase1.md`
3. **PPT 直接在 `landiq` 仓库改** - 老板说 "你就可以直接在那个 git 上给里面直接改就好了"
4. **TeamSlide 已存在但被注释掉** - `slides/index.ts` 中 `TeamSlide` 被 commented out
5. **甲方项目, 保密** - 不能做 LinkedIn 推广, 甲方还没签 NDA

## 下一步 TODO

- [ ] 确定技术栈做几页 (建议 1-2 页: 架构总览 + 部署方案)
- [ ] 跟组长确认分工: 谁讲哪些 slide
- [ ] 编写技术栈 slide 代码 (在 `landiq` 仓库中)
- [ ] 每人准备演讲稿 (老板说 "让每个人准备一下稿子")
- [ ] 现有 18 页 + 技术栈 1-2 页 = ~12-13 分钟, 加上演讲留白够 15 分钟

## 文件结构参考

```
landiq/src/app/pitch/slides/
  - 现有 18 个 slide 文件
  - TeamSlide.tsx 存在但被注释掉
  - 需要新增: TechStackSlide.tsx (和/或 DeploymentSlide.tsx)
  - 在 index.ts 中注册新 slide
```

## 技术栈 PPT 开发方式

```bash
cd D:\Codes\p3\LandIQ\landiq
npm install        # 如果还没装依赖
npm run dev        # 启动开发服务器
# 浏览器打开 http://localhost:3000/landiq/pitch
# 热更新, 改代码保存即可看效果
```
