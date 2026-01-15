# CBG 数据集成指南

## 数据格式要求

后端提供的 CBG 数据需要符合以下 GeoJSON 格式：

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "cbgId": "string",              // 必需：CBG 唯一标识
        "name": "string",                // 可选：区域名称
        "plantingIntensity": 0-100,      // 必需：植树强度
        "speciesDiversity": 0-100,       // 必需：物种多样性
        "maintenanceBudget": 0-100,      // 必需：维护预算
        "greeningScore": 0-100          // 可选：绿化分数（会自动计算）
      },
      "geometry": {
        "type": "Polygon" | "MultiPolygon",
        "coordinates": [[[lng, lat], ...]]  // 坐标数组
      }
    }
  ]
}
```

## 集成方式

### 方式 1: Next.js API Route（推荐）

1. **创建 API 路由** (`app/api/cbg/route.ts`)
   - 已创建占位文件，替换为你的后端 API 调用

2. **修改 MapInitializer**
   - 取消注释 API 调用代码
   - 确保 API 返回正确的格式

### 方式 2: 直接调用后端 API

修改 `components/map/MapInitializer.tsx`:

```typescript
const data = await fetchCbgData('https://your-backend.com/api/cbg')
setCbgData(data)
```

### 方式 3: 静态 JSON 文件

1. 将 CBG 数据保存为 JSON 文件（如 `public/data/cbg.json`）
2. 使用 `loadCbgDataFromFile` 函数加载

## 性能优化建议

如果 CBG 区块数量很大（>1000），建议：

1. **使用 Vector Tiles**（最佳性能）
   - 将数据转换为 Mapbox Vector Tiles
   - 使用 `react-map-gl` 的 `VectorTileSource`

2. **数据分片加载**
   - 根据地图视野范围动态加载
   - 使用 `map.on('moveend')` 事件

3. **简化几何**
   - 使用简化算法减少坐标点数量
   - 工具：`turf.simplify()` 或 `mapshaper`

4. **聚合显示**
   - 低缩放级别时显示聚合区域
   - 高缩放级别时显示详细边界

## 示例：完整的 CBG 数据

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "cbgId": "360610001001",
        "name": "Manhattan CBG 1",
        "plantingIntensity": 65,
        "speciesDiversity": 70,
        "maintenanceBudget": 55,
        "greeningScore": 63
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-74.02, 40.72],
          [-74.01, 40.72],
          [-74.01, 40.71],
          [-74.02, 40.71],
          [-74.02, 40.72]
        ]]
      }
    }
  ]
}
```

## 当前状态

- ✅ 数据加载框架已就绪
- ✅ 支持 API 和静态文件两种方式
- ✅ 错误处理和回退机制
- ⚠️ 使用 Mock 数据（5 个示例区域）
- 🔄 等待后端提供真实数据

## 下一步

1. 后端提供 CBG GeoJSON 数据
2. 更新 API 路由或数据加载逻辑
3. 测试数据加载和渲染性能
4. 根据数据量决定是否需要性能优化

