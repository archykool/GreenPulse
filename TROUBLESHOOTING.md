# 故障排查指南

## 地图不显示的问题

### 1. 环境变量未加载
**症状**: 页面显示 "Mapbox Token Required" 或调试信息显示 "Token Missing"

**解决方案**:
1. 确保 `.env.local` 文件在项目根目录
2. **必须重启开发服务器** (Next.js 只在启动时读取环境变量)
   ```bash
   # 停止服务器 (Ctrl+C)
   # 然后重新启动
   npm run dev
   ```
3. 清除浏览器缓存 (Ctrl+Shift+R 或 Cmd+Shift+R)

### 2. 浏览器缓存问题
**症状**: 修改后刷新页面没有变化

**解决方案**:
- 硬刷新: `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac)
- 清除缓存: 打开开发者工具 (F12) → Application → Clear storage
- 使用无痕模式测试

### 3. 检查环境变量
在浏览器控制台运行:
```javascript
console.log('Token:', process.env.NEXT_PUBLIC_MAPBOX_TOKEN)
```

### 4. 验证 .env.local 文件
文件应该包含:
```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiYXJ0aWVuZW9zIiwiYSI6ImNtamFmdm5pdDA0djczZm9ocWhzc3U1aDkifQ.rkK0cZyfEdXzAblqXVuQQg
```

**注意**: 
- 不要有多余的空格
- 不要有引号
- 确保文件编码是 UTF-8

### 5. 检查服务器日志
查看终端输出，确认:
- 服务器是否成功启动
- 是否有编译错误
- 是否有端口冲突

### 6. 检查网络请求
打开浏览器开发者工具 → Network 标签:
- 查看是否有对 `api.mapbox.com` 的请求
- 检查请求状态码 (应该是 200)
- 如果有 401 错误，说明 token 无效

## 当前地图设置

- **位置**: 纽约市 (New York City)
- **坐标**: 经度 -73.935242, 纬度 40.730610
- **缩放级别**: 11

