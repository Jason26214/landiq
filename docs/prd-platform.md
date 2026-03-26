# PRD: LandIQ Platform Development

**Status:** Planning
**Created:** 2026-03-25

---

## 1. Development Roadmap

| Phase | Timeline | 核心交付 | 依赖 |
|-------|----------|---------|------|
| **Phase 1** | Week 1-8 | Auth + 文档管理 + Admin | 无 |
| **Phase 2** | Week 9-16 | 数据引擎 + 地图 + 土地 Pipeline | Phase 1 |
| **Phase 3** | Week 17-24 | AI 可行性报告 + DCP 解析 | Phase 2 |
| **Phase 4** | Week 25-32 | Email Hub + Chrome Extension | Phase 1 |
| **Phase 5** | Week 33-40 | 项目管理 + 销售模块 | Phase 2 |
| **Phase 6** | Week 41-48 | 全国覆盖 + 企业功能 | Phase 3 |

**目标：2026 年内完成全部 6 个 Phase。**

---

## 2. 技术栈

| 层 | 技术 | 选型理由 |
|----|------|---------|
| **Monorepo** | Turborepo + pnpm workspaces | 简单快速，前后端共享类型 |
| **前端** | Next.js 15 + React 19 + Tailwind CSS 4 | 已有基础，App Router SSR |
| **UI 组件** | shadcn/ui (Radix + Tailwind) | 无锁定，完全可定制，match 设计系统 |
| **后端** | NestJS | 模块化架构，TypeScript，微服务友好 |
| **ORM** | TypeORM | NestJS 一级集成，PostgreSQL + PostGIS 原生支持 |
| **数据库** | PostgreSQL + PostGIS | 地理空间查询，行业标准 |
| **认证** | NextAuth v5 (前端) + Passport JWT (后端) | 免费，无供应商锁定，OAuth + 邮箱密码 |
| **文件存储** | AWS S3 (开发用 MinIO) | Pre-signed URL 直传，后端无状态 |
| **验证** | Zod | 前后端共享 schema，单一来源 |
| **表格** | @tanstack/react-table | 排序、分页、列控制 |
| **容器** | Docker Compose | 本地开发：PostgreSQL + MinIO |

---

## 3. Monorepo 结构

```
land-iq/
├── apps/
│   ├── web/                        # Next.js 前端
│   │   └── src/app/
│   │       ├── (auth)/             # 认证页面组
│   │       │   ├── login/
│   │       │   ├── register/
│   │       │   ├── forgot-password/
│   │       │   └── reset-password/
│   │       ├── (dashboard)/        # 用户页面组
│   │       │   ├── dashboard/
│   │       │   ├── documents/
│   │       │   └── settings/
│   │       └── (admin)/            # 管理后台组
│   │           └── admin/
│   │               ├── users/
│   │               ├── documents/
│   │               ├── organisations/
│   │               ├── audit-logs/
│   │               └── settings/
│   │
│   └── api/                        # NestJS 后端
│       └── src/
│           ├── auth/               # 认证模块
│           ├── users/              # 用户模块
│           ├── organisations/      # 组织模块
│           ├── documents/          # 文档模块
│           ├── storage/            # 存储抽象层
│           ├── admin/              # 管理模块
│           └── database/migrations/
│
├── packages/
│   └── shared/                     # 共享类型 + Zod schemas
│
├── pitch/                          # Pitch deck (独立部署)
├── docker-compose.yml              # PostgreSQL + MinIO
└── turbo.json
```

---

## 4. Phase 1 详细设计

### 4.1 数据库 Schema

#### organisations（多租户）
```sql
CREATE TABLE organisations (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                VARCHAR(255) NOT NULL,
    slug                VARCHAR(100) UNIQUE NOT NULL,
    logo_url            TEXT,
    settings            JSONB DEFAULT '{}',
    subscription_tier   VARCHAR(50) DEFAULT 'free',
    storage_limit_bytes BIGINT DEFAULT 5368709120,    -- 5GB
    storage_used_bytes  BIGINT DEFAULT 0,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);
```

#### users
```sql
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   TEXT,                              -- NULL for OAuth
    first_name      VARCHAR(100),
    last_name       VARCHAR(100),
    avatar_url      TEXT,
    phone           VARCHAR(30),
    email_verified  BOOLEAN DEFAULT FALSE,
    is_active       BOOLEAN DEFAULT TRUE,
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### organisation_members（多对多 + 角色）
```sql
CREATE TABLE organisation_members (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role            VARCHAR(50) NOT NULL DEFAULT 'member',
    -- roles: super_admin, org_admin, member, viewer
    invited_by      UUID REFERENCES users(id),
    joined_at       TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organisation_id, user_id)
);
```

#### folders（物化路径树）
```sql
CREATE TABLE folders (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    parent_id       UUID REFERENCES folders(id) ON DELETE CASCADE,
    path            TEXT NOT NULL,                     -- /root-id/parent-id/this-id
    depth           INT NOT NULL DEFAULT 0,
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### documents
```sql
CREATE TABLE documents (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id     UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
    folder_id           UUID REFERENCES folders(id) ON DELETE SET NULL,
    name                VARCHAR(500) NOT NULL,
    description         TEXT,
    file_key            TEXT NOT NULL,                 -- S3 object key
    file_size           BIGINT NOT NULL,
    mime_type           VARCHAR(255) NOT NULL,
    file_extension      VARCHAR(20),
    version             INT DEFAULT 1,
    parent_document_id  UUID REFERENCES documents(id), -- 版本链
    tags                TEXT[] DEFAULT '{}',
    metadata            JSONB DEFAULT '{}',
    uploaded_by         UUID REFERENCES users(id),
    is_archived         BOOLEAN DEFAULT FALSE,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);
```

#### audit_logs（只追加）
```sql
CREATE TABLE audit_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id UUID REFERENCES organisations(id),
    user_id         UUID REFERENCES users(id),
    action          VARCHAR(100) NOT NULL,
    entity_type     VARCHAR(50),
    entity_id       UUID,
    details         JSONB DEFAULT '{}',
    ip_address      INET,
    user_agent      TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 4.2 API 设计

所有路由前缀 `/api/v1`。Auth 路由公开，其余需 JWT。

#### 认证

| Method | Path | 说明 |
|--------|------|------|
| POST | `/auth/register` | 邮箱注册，自动创建用户+默认组织 |
| POST | `/auth/login` | 登录，返回 access + refresh token |
| POST | `/auth/refresh` | 刷新 access token |
| POST | `/auth/logout` | 注销 refresh token |
| POST | `/auth/forgot-password` | 发送重置邮件 |
| POST | `/auth/reset-password` | 重置密码 |
| GET | `/auth/me` | 当前用户信息 |
| PATCH | `/auth/me` | 更新个人资料 |

#### 文档

| Method | Path | 说明 |
|--------|------|------|
| GET | `/documents` | 文档列表（分页、按文件夹/标签/搜索过滤） |
| POST | `/documents/upload-url` | 获取 S3 预签名上传 URL |
| POST | `/documents` | 注册已上传文档（S3 上传完成后调用） |
| GET | `/documents/:id` | 文档详情 |
| GET | `/documents/:id/download-url` | 获取预签名下载 URL |
| PATCH | `/documents/:id` | 更新元数据（名称、描述、标签） |
| DELETE | `/documents/:id` | 归档文档（软删除） |
| POST | `/documents/:id/versions` | 上传新版本 |
| GET | `/documents/:id/versions` | 版本历史 |

#### 文件夹

| Method | Path | 说明 |
|--------|------|------|
| GET | `/folders` | 根文件夹列表 |
| POST | `/folders` | 创建文件夹 |
| GET | `/folders/:id` | 文件夹详情+子项 |
| PATCH | `/folders/:id` | 重命名/移动 |
| DELETE | `/folders/:id` | 删除文件夹 |

#### 管理后台

| Method | Path | 说明 |
|--------|------|------|
| GET | `/admin/dashboard` | 统计（用户数、文档数、存储使用量） |
| GET | `/admin/users` | 用户列表（分页、搜索） |
| GET | `/admin/users/:id` | 用户详情 |
| PATCH | `/admin/users/:id` | 更新角色/状态 |
| POST | `/admin/users/invite` | 邀请用户 |
| GET | `/admin/organisations` | 组织列表 |
| PATCH | `/admin/organisations/:id` | 更新组织设置 |
| GET | `/admin/audit-logs` | 审计日志（按操作/用户/时间过滤） |

---

### 4.3 前端页面

#### 认证页面（全屏居中，绿色渐变背景）

| 路由 | 页面 | 组件 |
|------|------|------|
| `/login` | 登录 | 邮箱密码表单、Google OAuth、忘记密码链接 |
| `/register` | 注册 | 姓名、邮箱、密码、组织名、Google OAuth |
| `/forgot-password` | 忘记密码 | 邮箱输入 |
| `/reset-password` | 重置密码 | 新密码输入（带 URL token） |

#### 用户页面（侧边栏 + Header 布局）

| 路由 | 页面 | 内容 |
|------|------|------|
| `/dashboard` | 仪表板 | 欢迎卡片、快速统计、最近文档、快捷操作 |
| `/documents` | 文档中心 | 文件夹树 + 文件列表（表格/网格切换）+ 搜索 + 上传 + 标签过滤 |
| `/documents/[id]` | 文档详情 | PDF/图片预览、元数据面板、版本历史、分享 |
| `/settings` | 个人设置 | 资料编辑、密码修改 |
| `/settings/organisation` | 组织设置 | 名称/Logo、成员列表、邀请、角色管理 |

#### 管理后台（侧边栏 + Header 布局，Admin 导航）

| 路由 | 页面 | 内容 |
|------|------|------|
| `/admin` | 管理仪表板 | 用户数、组织数、存储量、最近注册趋势图 |
| `/admin/users` | 用户管理 | 表格 + 搜索过滤 + 状态切换 + 角色 Badge + 邀请 |
| `/admin/users/[id]` | 用户详情 | 完整资料、组织成员关系、活动历史 |
| `/admin/organisations` | 组织管理 | 组织表格、存储使用进度条、成员数 |
| `/admin/documents` | 文档概览 | 全局文档统计、最大文件、按组织存储分布 |
| `/admin/audit-logs` | 审计日志 | 可过滤表格：操作、用户、实体、时间、IP |
| `/admin/settings` | 系统设置 | 最大上传大小、允许文件类型、默认存储限制 |

---

### 4.4 核心组件

| 组件 | 说明 |
|------|------|
| `AppShell` | 侧边栏 + Header + 主内容区 |
| `Sidebar` | 可折叠，分组导航，顶部组织切换器 |
| `Header` | 面包屑、全局搜索、通知铃铛、用户头像下拉 |
| `DataTable` | 基于 @tanstack/react-table：排序、分页、行选择、列控制 |
| `FileUploader` | 拖拽上传区 + 文件选择器 + 进度条 + 多文件 |
| `FolderTree` | 递归树 + 展开/折叠 + 右键菜单 + 拖拽移动 |
| `DocumentPreview` | PDF 内联预览 (react-pdf) + 图片查看器 + 下载回退 |
| `TagInput` | 自动完成多标签输入 |
| `Modal` / `Dialog` | 确认对话框、表单模态 |
| `Toast` | 成功/错误/信息通知 |
| `StatCard` | 数字 + 标签 + 趋势指标 |

---

### 4.5 关键架构决策

| 决策 | 方案 | 理由 |
|------|------|------|
| **多租户** | 行级隔离（organisation_id 外键） | 简单可靠，每个查询通过 `@CurrentOrganisation()` 装饰器注入 org_id |
| **文件上传** | Pre-signed URL 直传 S3 | 文件不经过后端服务器，无内存/带宽瓶颈 |
| **文件夹层级** | 物化路径（materialized path） | `LIKE 'path%'` 高效子树查询，避免递归 CTE |
| **文档删除** | 软删除（is_archived） | 支持回收站功能，防误删 |
| **审计日志** | 只追加表 | 合规审计 trail，企业客户必需 |
| **角色体系** | super_admin / org_admin / member / viewer | 四级足够，通过 RolesGuard 强制 |

---

## 5. Sprint 计划（Phase 1）

### Sprint 1（Week 1-2）：项目脚手架 + 后端认证

- [ ] Turborepo + pnpm workspaces 初始化
- [ ] NestJS 应用脚手架 + TypeORM + PostgreSQL
- [ ] Docker Compose：PostgreSQL + MinIO
- [ ] 数据库迁移：users, organisations, organisation_members, refresh_tokens
- [ ] Auth 模块：注册、登录、JWT、refresh token、bcrypt
- [ ] User 模块：CRUD
- [ ] Organisation 模块：注册时自动创建组织
- [ ] Guards：JwtAuthGuard, RolesGuard

### Sprint 2（Week 3-4）：前端认证 + App Shell

- [ ] Next.js 15 应用脚手架（App Router）
- [ ] NextAuth v5 配置（Credentials + Google）
- [ ] 认证页面：login, register, forgot-password, reset-password
- [ ] AppShell：侧边栏、Header、面包屑
- [ ] 中间件：保护 dashboard 路由
- [ ] 用户设置页面
- [ ] 设计系统：颜色 tokens、字体、间距实现为 Tailwind 主题

### Sprint 3（Week 5-6）：文档管理后端 + 存储

- [ ] Storage 抽象服务（S3 接口，MinIO/S3 provider）
- [ ] 数据库迁移：folders, documents, document_shares
- [ ] Folders 模块：CRUD、树操作、物化路径
- [ ] Documents 模块：预签名 URL、文档注册、元数据 CRUD
- [ ] 文档版本管理逻辑
- [ ] 文件类型验证、大小限制
- [ ] 组织存储配额追踪

### Sprint 4（Week 7-8）：文档管理前端 + Admin

- [ ] 文档中心页面：文件夹树、文件列表、搜索、过滤
- [ ] 文件上传组件：拖拽、进度、多文件
- [ ] 文档详情页面：预览、元数据、版本
- [ ] Admin 仪表板：统计卡片、最近活动
- [ ] Admin 用户管理：列表、详情、邀请、停用
- [ ] Admin 组织管理：列表、存储使用量
- [ ] 审计日志查看器
- [ ] 审计日志 NestJS 中间件

---

## 6. Phase 1 不包含（明确推迟）

| 功能 | 推迟到 |
|------|--------|
| 地图/地理空间功能 | Phase 2 |
| 政府 API 集成 | Phase 2 |
| 土地 CRM Pipeline | Phase 2 |
| AI/LLM 服务 | Phase 3 |
| AI 文档自动标签 | Phase 3（Phase 1 只有手动标签） |
| 文档内容全文搜索 | Phase 3（Phase 1 只按文件名/标签搜索） |
| Email Hub | Phase 4 |
| Chrome Extension | Phase 4 |
| 项目管理 | Phase 5 |
| 销售模块 | Phase 5 |
| SSO / SAML | Phase 6 |
| 双因素认证 | Phase 2-3 |
| Dark Mode | 未定 |
| WebSocket 实时协作 | 渐进式添加 |
