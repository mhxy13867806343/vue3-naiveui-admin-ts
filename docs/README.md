# Admin Dashboard 文档

## 目录结构

```
docs/
├── README.md              # 文档入口
├── getting-started.md     # 快速开始指南
├── architecture.md        # 架构说明
├── components.md          # 组件使用文档
└── api.md                 # API 接口文档

static/
├── screenshots/           # 项目截图
└── icons/                 # 图标资源
```

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite 8
- **UI 组件库**: Naive UI
- **状态管理**: Pinia
- **路由**: Vue Router
- **国际化**: vue-i18n
- **HTTP 请求**: Axios + Mock
- **图表**: ECharts / G2
- **代码规范**: ESLint + Prettier

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 代码格式化
pnpm format

# 代码检查
pnpm lint

# 构建分析
pnpm build:analyze
```
