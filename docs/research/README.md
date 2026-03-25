# LandIQ 研究文档总览

## 研究文档清单

| 文档 | 内容 |
|------|------|
| [australian-land-data-sources.md](australian-land-data-sources.md) | 8州政府门户、GIS平台、商业API、zoning编码、地籍系统、环境数据源 |
| [due-diligence-process.md](due-diligence-process.md) | 开发商尽职调查9步流程、可行性报告结构、财务指标、规划体系、顾问角色 |
| [competitive-analysis.md](competitive-analysis.md) | 竞争对手分析（Landchecker、Archistar、CoreLogic、PropCode等） |
| [api-testing-nsw.md](api-testing-nsw.md) | NSW 开放API实测（zoning、FSR、height、bushfire、flood、heritage、cadastre） |
| [api-testing-vic-national.md](api-testing-vic-national.md) | VIC 开放API实测 + G-NAF、Domain API、NSW销售数据 |

---

## 核心发现：开放API能力评估

### 一、用户输入地址后，系统能自动查到什么？

以 NSW 和 VIC 为例，**全部免费、无需认证、响应 <300ms**：

#### NSW（ArcGIS REST API）

| 数据项 | 能查 | API 返回示例 | Layer |
|--------|:----:|-------------|-------|
| **Zoning 分区** | ✅ | `SP5 Metropolitan Centre, Sydney LEP 2012` | Principal Planning L19 |
| **FSR 容积率** | ✅ | `FSR: 8.0, Clause 4.4` | Principal Planning L11 |
| **建筑高度** | ✅ | `MAX_B_H: 24m` （部分区域由SEPP控制） | Principal Planning L14 |
| **最小地块面积** | ✅ | 通过 Layer 22 查询 | Principal Planning L22 |
| **Bushfire 丛林火** | ✅ | `Vegetation Category 2, v5b` 或空=安全 | Hazard L229 |
| **Flood 洪水** | ⚠️ | 部分council已数字化，覆盖不全 | Hazard L230 |
| **Heritage 遗产** | ✅ | `MLC Centre complex, Item I2287, Local` | Principal Planning L16 + L221 |
| **Landslide 滑坡** | ✅ | 有对应layer | Hazard L232 |
| **地块边界和面积** | ✅ | `Lot 1 DP598704, 10,328sqm` | Cadastre L8 |
| **Easement 地役权** | ✅ | 有对应layer | Cadastre L9 |

**关键端点：**
```
规划数据: mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning/Planning_Portal_Principal_Planning/MapServer
风险数据: mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning/Planning_Portal_Hazard/MapServer
地籍数据: portal.spatial.nsw.gov.au/server/rest/services/NSW_Land_Parcel_Property_Theme/FeatureServer
```

#### VIC（WFS GeoJSON API）

| 数据项 | 能查 | API 返回示例 | Layer |
|--------|:----:|-------------|-------|
| **Zoning 分区** | ✅ | `CCZ1 Capital City Zone Schedule 1` | plan_zone |
| **Overlays 叠加层** | ✅ | `HO541, SBO3, DDO40, DPO5, PAO5` | plan_overlay |
| **Bushfire 丛林火** | ✅ | BMO overlay + bushfire_prone_area | plan_overlay / bushfire_prone_area |
| **Flood 洪水** | ✅ | LSIO/SBO overlay + vic_flood_history | plan_overlay / vic_flood_history |
| **Heritage 遗产** | ✅ | HO overlay + heritage_inventory | plan_overlay / heritage_inventory |
| **地块边界** | ✅ | parcel_view (geometry + PFI) | parcel_view |

**关键端点：**
```
所有数据统一入口: opendata.maps.vic.gov.au/geoserver/wfs
命名空间: open-data-platform（不是 datavic）
查询方式: BBOX（不要用CQL INTERSECTS，有坐标轴顺序问题）
```

### 二、需要付费/注册的数据

| 数据 | 来源 | 费用 | 用途 |
|------|------|------|------|
| **地址转坐标** | G-NAF 批量下载 | 免费（CC BY 4.0） | 导入PostGIS，1590万地址 |
| **实时地址搜索** | PSMA Geocoder API | 付费 | 用户输入时地址补全 |
| **房产销售/估值** | Domain API | 免费层500次/天 | 周边可比销售价格 |
| **专业估值/AVM** | CoreLogic | $10k+/年 | 自动估值模型 |
| **高清航拍** | Nearmap | 付费 | 地块卫星图 |

### 三、查不到的（需要LLM解析）

| 数据 | 为什么查不到 | 解决方案 |
|------|-------------|---------|
| **DCP详细规则**（setbacks、parking rates、landscaping） | 各council以PDF形式发布，非结构化 | LLM提取PDF→结构化规则 |
| **Council审批态度** | 隐性知识，存在规划师脑中 | 众包数据库 / DA结果分析 |
| **详细施工成本** | 商业数据（Rawlinsons等） | 用户输入或API集成 |

---

## 竞争格局

### 竞品对比矩阵

| 能力 | Landchecker | Archistar | CoreLogic | PropCode | Feasly | **LandIQ** |
|------|:-----------:|:---------:|:---------:|:--------:|:------:|:----------:|
| Zoning/LEP | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| DCP详细规则 | ❌ | 部分 | ❌ | ✅(NSW) | ❌ | **✅ 目标** |
| 风险叠加(flood/fire/heritage) | ✅ | ✅ | ❌ | 部分 | ❌ | ✅ |
| 房产估值/销售 | ❌ | 合作 | ✅ | ❌ | ❌ | 集成 |
| 3D设计 | ❌ | ✅ | ❌ | ❌ | ❌ | Phase 2 |
| 产能估算(Yield) | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| 财务可行性 | ❌ | 基础 | ❌ | ❌ | ✅ | ✅ |
| 现金流建模 | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| 土地CRM/Pipeline | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ 独有** |
| 项目管理 | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ 独有** |
| AI报告生成 | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ 独有** |

### LandIQ 核心差异化

1. **唯一从规划数据→可行性分析→项目管理的端到端平台**
2. **土地CRM Pipeline** — 没有竞品提供
3. **AI自动生成可行性报告** — 从地址到报告一键完成
4. **DCP规则数字化** — PropCode已证明可行（NSW），LandIQ可用LLM扩展到多州

### 定价参考

| 竞品 | 月费 |
|------|------|
| Archistar | $79–$596 |
| CoreLogic | $169–$299 |
| Landchecker | ~$99–$350 |
| Feasly | $49–$149 |

---

## MVP 技术实现路径

### Phase 1: 核心数据层（用免费API）

```
用户输入地址
  → G-NAF 地址匹配（PostGIS）
  → 获取坐标 (lat/lng)
  → 并行查询（~200ms）:
      ├─ Zoning (NSW L19 / VIC plan_zone)
      ├─ FSR (NSW L11)
      ├─ Height (NSW L14)
      ├─ Bushfire (NSW L229 / VIC BMO)
      ├─ Flood (NSW L230 / VIC LSIO+SBO)
      ├─ Heritage (NSW L16+L221 / VIC HO)
      └─ Cadastre (NSW L8 / VIC parcel_view)
  → 生成 Site Intelligence Report
```

### Phase 2: AI分析层

```
Site Intelligence Data
  → LLM 分析规划控制
  → 自动估算 dwelling yield
  → 风险评分（综合 flood + fire + heritage + contamination）
  → 生成 Feasibility Report (PDF/Word)
```

### Phase 3: 业务层

```
  → Land Acquisition Pipeline (CRM)
  → Team Collaboration
  → Document Management
  → Project Management (post-acquisition)
```

---

## 关键技术实现注意

1. **NSW 用 ArcGIS REST `/query`**，不要用 `/identify`
2. **NSW 偶数 layer 是 group/parent**，查询会返回400，用奇数 child layer
3. **VIC 用 WFS BBOX 查询**，不要用 CQL INTERSECTS（坐标轴顺序问题）
4. **VIC 命名空间是 `open-data-platform`**，不是文档常见的 `datavic`
5. **所有端点接受 WGS84 (EPSG:4326)** 输入，NSW 用 `inSR=4326`，VIC BBOX 直接传 lat/lng
6. **Flood 数据覆盖不全**，需要补充 council 级别洪水研究数据
7. **G-NAF 建议批量导入 PostGIS**，免费且覆盖1590万地址
8. **并行查询可在 200-300ms 内完成所有规划数据获取**
