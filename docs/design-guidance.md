# LandIQ Design Guidance

Reference: [Orens Capital](https://www.orenscapital.com.au) — 机构级地产投资风格，专业、沉稳、高端。

---

## 1. Color Palette

基于 Orens Capital 的深绿色体系，调整为适合 SaaS 平台的配色：

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Primary** | Deep Forest Green | `#134A32` | 导航栏、主按钮、页脚、品牌标识、大标题 |
| **Primary Light** | Sage Green | `#2D7A5A` | Hover 状态、次要强调 |
| **Primary Dark** | Dark Green | `#0D3423` | 深色背景区块、Footer |
| **Secondary** | Off-White / Cream | `#E9EAE5` | 页面背景、卡片底色 |
| **Warm Neutral** | Sand / Beige | `#D5CFC5` | 特色区块背景（参考 Orens 的 Feature 区块） |
| **Surface** | White | `#FFFFFF` | 卡片、表单、模态框背景 |
| **Text Primary** | Charcoal | `#20282D` | 正文 |
| **Text Secondary** | Slate Gray | `#85979B` | 副标题、说明文字、标签 |
| **Accent** | Gold / Amber | `#C4952A` | 高亮数据、CTA 强调、状态标签 |
| **Success** | Green | `#2D8A4E` | 成功状态 |
| **Warning** | Amber | `#D4A62A` | 警告状态 |
| **Error** | Muted Red | `#C04040` | 错误状态 |

### Dark Mode 备注
暂不优先考虑 Dark Mode。优先确保 Light Mode 下的高端质感。

---

## 2. Typography

参考 Orens Capital 的衬线 + 窄体组合。Orens 使用 `elza-narrow`（标题）+ `kepler-std`（正文），
LandIQ 选用免费替代方案，保留相似的高端气质：

| Role | Font | Fallback | Weight | Size | Notes |
|------|------|----------|--------|------|-------|
| **Display / H1** | DM Serif Display | Georgia, serif | 400 (Regular) | 48~56px / 3~3.5rem | Landing 大标题，轻量衬线，参考 Orens 的优雅感 |
| **H2** | DM Serif Display | Georgia, serif | 400 | 36~40px / 2.25~2.5rem | 区块标题，如 "We specialise in..." |
| **H3** | Inter | system-ui, sans-serif | 500 (Medium) | 24px / 1.5rem | 卡片标题、模块标题 |
| **H4** | Inter | system-ui, sans-serif | 500 | 20px / 1.25rem | 子区块标题 |
| **Body** | Source Serif 4 | Georgia, serif | 400 (Regular) | 17px / 1.0625rem | 正文 — 参考 Orens 的 kepler-std 衬线正文风格 |
| **Body Small** | Inter | system-ui, sans-serif | 400 | 14px / 0.875rem | 表格、标签、UI 文字 |
| **Caption** | Inter | system-ui, sans-serif | 400 | 12px / 0.75rem | 辅助说明、时间戳 |
| **Data / Numbers** | DM Serif Display | Georgia, serif | 400 | 36~48px | 统计数字面板（参考 Orens 的 $70m+, 15% 样式） |
| **Vertical Label** | Inter | system-ui, sans-serif | 700 (Bold) | 28~36px | 竖排旋转文字标签（参考 Orens 特色元素） |

**字体搭配策略**: 衬线 (DM Serif Display / Source Serif 4) 用于面向客户的 Landing 页和展示型内容，
无衬线 (Inter) 用于 Dashboard 和功能性 UI，保持可读性和工具感。

**行高 (Line Height):**
- 标题: 1.2
- 正文: 1.6
- 紧凑 (表格/标签): 1.4

**字间距 (Letter Spacing):**
- 大标题: `-0.02em`（略紧）
- 正文: `0`
- 大写标签: `0.08em`（加宽）

---

## 3. Layout & Spacing

### Grid System
- **Max Width**: 1400px（与 Orens Capital 一致）
- **Columns**: 12 列 Grid
- **Gutter**: 24px
- **Page Padding**: 左右 `64px`（桌面），`24px`（移动端）

### Spacing Scale (8px base)
```
4px   — xs
8px   — sm
16px  — md
24px  — lg
32px  — xl
48px  — 2xl
64px  — 3xl
96px  — 4xl
```

### Section Spacing
- Landing 页面各区块间距: `96px ~ 120px`（大量留白，高端感）
- Dashboard 页面区块间距: `24px ~ 32px`（紧凑高效）

### Breakpoints
| Name | Width | Notes |
|------|-------|-------|
| Mobile | < 480px | 单列布局 |
| Tablet | 480px - 778px | 双列 |
| Desktop | 778px - 1024px | 侧边栏收起 |
| Wide | 1024px - 1400px | 完整布局 |
| Ultra | > 1400px | 内容居中，max-width 限制 |

---

## 4. Components

### Navigation (Landing)
参考 Orens Capital 截图：
- **透明导航**: Header 浮在 Hero 图片上，完全透明背景
- **左侧**: Logo（白色）
- **右侧**: "Investor Portal" 胶囊描边按钮 + 汉堡菜单图标（三横线）
- **滚动后**: 背景变白色 + 加阴影，Logo 和文字变深色
- **无传统导航链接**，全部收在汉堡菜单中（极简风）

### Navigation (Dashboard)
- 左侧固定侧边栏 (240px)，深绿色背景 `#134A32`，白色文字和图标
- Logo 左上角，主导航垂直排列

### Buttons
参考 Orens Capital — 以**描边胶囊按钮**为主（非实心），风格极简优雅：

| Variant | Style | Notes |
|---------|-------|-------|
| **Primary Outline** | `bg: transparent`, `border: 1.5px solid white`, `text: white`, `border-radius: 9999px`, `padding: 10px 28px` | Hero 区域主按钮（白色描边在深色背景上） |
| **Secondary Outline** | `bg: transparent`, `border: 1.5px solid #134A32`, `text: #134A32`, `border-radius: 9999px` | 浅色背景上的按钮，如 "View More", "Contact us" |
| **Primary Filled** | `bg: #134A32`, `text: white`, `border-radius: 9999px` | Dashboard 中的主要操作按钮 |
| **Ghost** | `bg: transparent`, `text: #134A32`, hover 时加浅绿底色 | 次要操作 |
| **Danger** | `bg: #C04040`, `text: white`, `border-radius: 9999px` | 删除等危险操作 |

按钮带箭头图标: 参考 Orens 的 `→` (右上箭头) 放在文字后面，如 "View More →"

Hover: 轻微加深 + `transition: all 0.2s ease`

### Cards
- `background: #FFFFFF`
- `border: 1px solid #E9EAE5`
- `border-radius: 12px`
- `box-shadow: 0 1px 3px rgba(0,0,0,0.06)`
- Hover: `box-shadow: 0 4px 12px rgba(0,0,0,0.1)`
- `padding: 24px`

### Stat Cards (Landing - 参考 Orens 截图)
参考 Orens 的 2x2 数据网格：
- **布局**: 2 列 x 2 行 Grid
- **每个卡片**: 顶部绿色细线 (`border-top: 2px solid #134A32`) 作为分隔
- **内容**: 线描图标 (顶部) → 大号数字 (DM Serif Display, 36~48px) → 小字描述
- **无圆角、无阴影** — 用线条分隔，保持简洁开放感
- 示例: "$70m+ deployed since 2023" / "15% average return"

### Data Cards (Dashboard)
- 左侧彩色竖条 (4px width) 表示类别
- 大号数字 (Inter, 32px, SemiBold)
- 底部趋势指标（绿色上升 / 红色下降）

### Tables
- 表头: `bg: #F5F6F3`, `font-weight: 500`, `text-transform: uppercase`, `font-size: 12px`, `letter-spacing: 0.08em`
- 行: 白色背景，hover 时 `bg: #F9FAF8`
- 分割线: `1px solid #E9EAE5`
- 无外边框，简洁开放

### Forms
- Input: `border: 1.5px solid #D1D5D0`, `border-radius: 8px`, `padding: 12px 16px`
- Focus: `border-color: #134A32`, `box-shadow: 0 0 0 3px rgba(19,74,50,0.1)`
- Label: `color: #134A32`, `font-weight: 500`, `font-size: 14px`, `margin-bottom: 6px`

### Status Badges
参考 Orens Capital 的基金状态标签：

| Status | Style |
|--------|-------|
| **Active / Open** | `bg: #E8F5E9`, `text: #2D7A3A`, `border-radius: 9999px` |
| **Pending / In Progress** | `bg: #FFF8E1`, `text: #C4952A`, `border-radius: 9999px` |
| **Completed / Closed** | `bg: #E3EAE5`, `text: #85979B`, `border-radius: 9999px` |
| **Alert / Risk** | `bg: #FDECEA`, `text: #C04040`, `border-radius: 9999px` |

---

## 5. Visual Effects

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
--shadow-md: 0 2px 8px rgba(0,0,0,0.08);
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
--shadow-xl: 0 16px 48px rgba(0,0,0,0.16);
```

### Transitions
- 所有交互元素: `transition: all 0.2s ease`
- 页面切换: `fade` 过渡，300ms
- 侧边栏展开/收起: `width 0.3s ease`

### Border Radius Scale
```
4px   — 小元素 (tags, tooltips)
8px   — 输入框、小卡片
12px  — 卡片、模态框
16px  — 大容器
9999px — 按钮、Badge（全圆角）
```

---

## 6. Photography & Image Strategy

参考 Orens Capital — 人物摄影是品牌信任感的核心。网站大量使用真实、温暖的人物照片，
而非抽象图形或纯文字，这是高端地产品牌的关键差异化元素。

### 图片类别与用途

| 类别 | 用途 | 风格要求 | 示例场景 |
|------|------|---------|---------|
| **Hero 全屏人物** | 首页轮播、模块封面 | 自然光、生活化、温暖色调、高清 | 家庭在社区散步、专业人士在工地讨论 |
| **团队/专业人物** | 关于我们、团队页 | 半正式、自然环境（非棚拍）、友好表情 | 开发商在项目现场、办公室协作场景 |
| **客户/用户场景** | 功能介绍、案例页 | 真实使用场景、自然互动 | 开发商看平板分析报告、团队围桌讨论地图 |
| **航拍地产** | Feature 区块、项目展示 | 俯瞰视角、绿化清晰、高品质 | 住宅社区全景、土地分割规划 |
| **生活方式** | Hero、品牌区块 | 温暖、正面、澳洲本地感 | 海滩家庭、公园遛狗、社区生活 |

### 摄影风格指南

**色调**: 暖色调为主 — 金色自然光、柔和阴影，避免冷色调或过度后期
**构图**: 留白充足（特别是用于文字叠加的区域），人物偏左或偏右放置
**人物**: 多样化（年龄、性别、文化背景），体现澳洲多元社区
**着装**: 商务休闲（Smart Casual）— 非西装革履，也非过于随意
**情绪**: 自信、专业、友好 — 微笑但不夸张，真实自然

### 图片技术要求

| 属性 | 要求 |
|------|------|
| **Hero 图片** | 最小 1920x1080px，推荐 2560x1440px，WebP 格式 |
| **内容图片** | 最小 1200x800px |
| **人物头像** | 400x400px，正方形裁切 |
| **格式** | WebP 优先，JPEG 降级，PNG 仅用于透明背景 |
| **文件大小** | Hero < 300KB，内容图 < 150KB（压缩后） |
| **懒加载** | 首屏外图片使用 `loading="lazy"` |

### 图片来源建议

**短期 (MVP / 开发阶段)**:
- **Unsplash** — 免费高质量，搜索: "australian family", "property development", "aerial suburb"
- **Pexels** — 免费，搜索: "real estate team", "business meeting outdoor"
- **Pixabay** — 补充素材

**长期 (上线后)**:
- 建议聘请专业摄影师拍摄品牌定制图片
- 拍摄真实的客户使用场景和团队工作照
- 获取澳洲本地的航拍地产照片（需无人机许可）

### 图片在各页面的分布

```
Landing 页:
├── Hero: 1 张全屏人物/生活场景 (或 3~5 张轮播)
├── Intro Section: 无图 (纯文字 + 数据)
├── Feature Section: 1 张航拍地产图
├── How It Works: 2~3 张使用场景小图
├── Testimonial: 2~3 张客户头像
└── CTA: 可选 1 张背景图

About 页:
├── Hero: 1 张团队合照或办公场景
├── Story: 2~3 张历史/里程碑图片
└── Team: 每人 1 张专业头像

功能介绍页:
├── 每个功能模块: 1 张产品截图 + 1 张使用场景人物图
└── 交替排列 (左图右文 / 右图左文)
```

---

## 7. Iconography

- **Icon Set**: Lucide Icons（轻量、一致、开源）
- **Size**: 20px（默认），16px（紧凑），24px（强调）
- **Stroke Width**: 1.5px
- **Color**: 跟随文字颜色，或使用 `#85979B`

---

## 7. Landing Page Structure

参考 Orens Capital 截图的精确布局：

```
┌──────────────────────────────────────────────────┐
│  Transparent Header                               │
│  [Logo]                    [Portal ↗] [☰ Menu]    │
├──────────────────────────────────────────────────┤
│                                                    │
│  HERO — 全屏生活方式/地产摄影                        │
│  无深色遮罩，照片本身明亮温暖                         │
│                                                    │
│  左下角文字叠加:                                     │
│    小字副标题 (如 "Now Open")                        │
│    大衬线标题 (DM Serif Display)                     │
│    ─── 细线分隔                                     │
│    [描边按钮1]  [描边按钮2]                           │
│                                                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  INTRO + STATS — 左右分栏 (5:7)                     │
│                                                    │
│  左侧:                     右侧:                   │
│  大衬线标题                 ┌──────┬──────┐         │
│  "We specialise in..."     │ Icon │ Icon │         │
│                            │$70m+ │ 15%  │         │
│  衬线正文段落               │______│______│         │
│                            │ Icon │ Icon │         │
│  [View More ↗]             │  0%  │20+Yrs│         │
│                            └──────┴──────┘         │
│                                                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  FEATURE — 沙色/米色背景 (#D5CFC5)                   │
│                                                    │
│  左文字    中央航拍图    右侧竖排旋转文字               │
│  描述段落   (地产项目)   "Developer    Proven         │
│                          Expertise   Strategy       │
│                                      Active         │
│                                      Management"    │
│  (文字竖排90°旋转，深绿色，粗体，极具辨识度)            │
│                                                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  CTA BAR — 白色背景，极简                            │
│  左: 绿色引导文字              右: [Contact us ↗]    │
│                               [↑ 回到顶部按钮]       │
│                                                    │
├──────────────────────────────────────────────────┤
│  Footer — 深绿色背景 #134A32                         │
│  公司信息 + 链接 + 社交媒体                           │
│  底部版权栏                                         │
└──────────────────────────────────────────────────┘
```

### 关键设计模式 (从截图提取)

**1. Hero 区无遮罩**: Orens 的 Hero 不使用深色半透明遮罩，而是直接在明亮照片上叠加白色文字。
照片本身选择色调偏暖、不过于杂乱的场景，确保文字可读。

**2. 描边按钮为主**: Landing 页几乎所有按钮都是透明底 + 细描边 + 圆角胶囊形，
不使用实心填充按钮，保持轻盈优雅的视觉感。

**3. 竖排旋转文字**: Feature 区块右侧使用 `writing-mode: vertical-rl` + `transform: rotate(180deg)`
的大号粗体文字，作为视觉装饰和内容标签。这是 Orens 网站最有辨识度的设计元素。

**4. 线条分隔而非卡片阴影**: Stats 区域使用细线 (border-top) 分隔卡片，
没有圆角、没有阴影，整体感觉开放、通透。

**5. 左右不对称布局**: 内容区域大量使用左文字 + 右视觉的不对称布局（约 5:7 或 4:8 比例），
避免居中对称的传统排版。

---

## 8. Dashboard Layout

```
┌─────────┬────────────────────────────┐
│         │  Top Bar (搜索 + 通知 + 头像)│
│  Side   ├────────────────────────────┤
│  bar    │                            │
│         │  Page Content              │
│  240px  │  (max-width: 1200px)       │
│         │                            │
│  Deep   │  Cards, Tables, Charts     │
│  Green  │                            │
│  #134A32│                            │
│         │                            │
└─────────┴────────────────────────────┘
```

---

## 9. Design Philosophy

**关键词**: 专业 (Professional) / 可信 (Trustworthy) / 简洁 (Clean) / 高效 (Efficient)

- 参考 Orens Capital 的"机构级奢华感"，但适配为 SaaS 产品的实用性
- 大量留白，不拥挤
- 色彩克制，以绿色为主调，配合中性色
- 数据优先 — Dashboard 页面突出数字和图表
- Landing 页保持高端质感，Dashboard 页偏向高效工具感

---

## 10. CSS Variables (Tailwind Config Reference)

```js
// tailwind.config.js colors 参考
colors: {
  primary: {
    50:  '#E8F0EC',
    100: '#C5D9CD',
    200: '#9EBFAE',
    300: '#77A58F',
    400: '#599278',
    500: '#3B7F61',
    600: '#2D7A5A',
    700: '#1E6647',
    800: '#134A32',  // primary
    900: '#0D3423',
  },
  sand: {
    100: '#E8E3DB',
    200: '#D5CFC5',  // feature section bg
    300: '#C2BBB0',
  },
  surface: {
    50:  '#FFFFFF',
    100: '#F9FAF8',
    200: '#F5F6F3',
    300: '#E9EAE5',
    400: '#D1D5D0',
    500: '#85979B',
  },
  accent: {
    DEFAULT: '#C4952A',
    light:   '#FFF8E1',
  },
  danger: {
    DEFAULT: '#C04040',
    light:   '#FDECEA',
  },
}
```
