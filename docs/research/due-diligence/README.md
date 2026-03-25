# Developer Due Diligence Checklist

Australian property developer 在购买土地前需要调查的完整清单，按类别拆分为独立文件。

*Version 1.0 -- March 2026 | Focus: NSW and VIC*

## Automation Key

| Tag | Meaning |
|-----|---------|
| **API-AUTO** | 可通过免费政府API全自动获取 |
| **API-PARTIAL** | 部分可自动化（API有数据但需解读或补充） |
| **API-PAID** | 可通过付费API自动化（CoreLogic, Domain等） |
| **MANUAL** | 需人工调查、顾问或实地勘查 |
| **HYBRID** | 初步筛查可自动化，详细评估需人工 |

## 文件清单

| # | 文件 | 内容 | 检查项数 |
|---|------|------|---------|
| 1 | [01-planning-zoning.md](01-planning-zoning.md) | 规划与分区 | 9 |
| 2 | [02-title-legal.md](02-title-legal.md) | 产权与法律 | 9 |
| 3 | [03-environmental-physical.md](03-environmental-physical.md) | 环境与物理条件 | 10 |
| 4 | [04-heritage.md](04-heritage.md) | 遗产保护 | 4 |
| 5 | [05-infrastructure.md](05-infrastructure.md) | 基础设施 | 8 |
| 6 | [06-development-potential.md](06-development-potential.md) | 开发潜力 | 8 |
| 7 | [07-financial.md](07-financial.md) | 财务分析 | 8 |
| 8 | [08-market.md](08-market.md) | 市场分析 | 7 |
| - | [09-summary.md](09-summary.md) | 汇总：自动化能力、成本、API端点 | - |

## 10分钟API快速筛查

用免费API并行查询，~300-500ms 完成所有规划数据获取：

1. **Zoning** → 用途是否许可？
2. **FSR** → 最大建筑面积？
3. **Height** → 最高能建多高？
4. **Lot Size** → 能分多少地块？
5. **Heritage** → 是否遗产保护？
6. **Bushfire** → 是否丛林火风险？
7. **Flood** → 是否洪泛区？
8. **Overlays** → 有哪些叠加约束？
9. **Cadastre** → 地块面积和形状？
10. **Transport** → 离公共交通多远？

## 尽调成本概览

| 阶段 | 时间 | 费用 |
|------|------|------|
| Phase 1: 桌面筛查 | 1-3天 | $70-$300 |
| Phase 2: 详细调查（标准地块） | 6-12周 | $30k-$80k |
| Phase 2: 详细调查（复杂地块） | 3-6月 | $80k-$250k+ |
