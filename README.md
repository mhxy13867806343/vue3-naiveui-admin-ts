[English](./README.en.md) | 中文

# Vue3 Naive UI Admin TS

基于 Vue 3 + TypeScript + Vite 8 + Naive UI 的后台管理系统模板。

## 🚀 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5+ | 渐进式 JavaScript 框架 |
| TypeScript | 5.8+ | 类型安全 |
| Vite | 8.0+ | 下一代前端构建工具 |
| Naive UI | 2.41+ | Vue 3 组件库 |
| Pinia | 3.0+ | 状态管理 |
| Vue Router | 4.5+ | 路由管理 |
| vue-i18n | 11+ | 国际化（中文/英文） |
| Axios | 1.9+ | HTTP 请求 |
| Tailwind CSS | 4.2+ | 原子化 CSS |
| ECharts | 6.0+ | 数据可视化图表 |
| MockJS | 1.1+ | Mock 数据模拟 |

## ✨ 功能特性

- 🔐 **动态路由 & 权限控制** — 基于角色的动态路由注册，v-permission 指令
- 🌍 **国际化** — 中英文切换，右上角语言切换器
- 📱 **多种登录方式** — 账号密码 / 手机号 / 邮箱，5 套登录模板可切换
- 📝 **注册页面** — 账号 / 手机号 / 邮箱注册，5 套注册模板
- 🎨 **Naive UI** — 按需导入，自动注册组件
- 📦 **自动导入** — unplugin-auto-import + unplugin-vue-components
- 🗂 **Mock 数据** — MockJS 模拟接口，环境变量控制开关
- 🔧 **工具库** — dayjs / lodash-es 封装，通用验证规则
- 📊 **图表组件** — ECharts 封装，折线图 / 柱状图 / 饼图 / 雷达图
- 🧩 **第三方组件** — 富文本编辑器 / 拖拽列表封装
- 🏗 **构建优化** — gzip + brotli 压缩，分包策略，terser 压缩
- 📐 **代码规范** — ESLint + Prettier
- 📋 **CRUD 管理** — 用户 / 菜单 / 部门 / 文章 / 分类 / 标签完整增删改查

## � 截图

<!-- 在此添加项目截图 -->
> 截图待补充

## �📦 快速开始

```bash
# 克隆项目
git clone https://github.com/mhxy13867806343/vue3-naiveui-admin-ts.git
cd vue3-naiveui-admin-ts

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 🔑 测试账号

| 角色 | 用户名 | 密码 | 权限 |
|------|--------|------|------|
| 管理员 | admin | admin123 | 全部权限 |
| 普通用户 | user | user123 | 基础权限 |

## 📁 目录结构

```
src/
├── api/                    # HTTP 请求 & Mock
│   ├── http.ts             # Axios 封装
│   └── mock/               # Mock 数据
├── assets/                 # 静态资源
├── composables/            # Vue 3 Composable Hooks
│   ├── useLoading.ts       # 加载状态
│   ├── usePermission.ts    # 权限判断
│   ├── usePagination.ts    # 分页逻辑
│   └── useSmsCountdown.ts  # 短信倒计时
├── components/             # 公共组件
│   └── third-party/        # 第三方组件封装
├── directives/             # 自定义指令
│   └── permission.ts       # v-permission
├── layouts/                # 布局组件
│   ├── AdminLayout.vue     # 后台布局
│   ├── Sidebar.vue         # 侧边栏
│   └── Header.vue          # 顶部栏
├── locales/                # 国际化语言包
├── router/                 # 路由配置
│   ├── index.ts            # 静态路由
│   ├── dynamic-routes.ts   # 动态路由表
│   ├── dynamic-router.ts   # 动态注册逻辑
│   └── guard.ts            # 路由守卫
├── stores/                 # Pinia 状态管理
│   ├── auth.ts             # 认证状态
│   └── permission.ts       # 权限状态
├── styles/                 # 全局样式
├── types/                  # TypeScript 类型定义
├── utils/                  # 工具函数
│   ├── env.ts              # 环境变量
│   ├── validators.ts       # 通用验证正则
│   ├── form-rules.ts       # 表单验证规则工厂
│   ├── dayjs.ts            # dayjs 封装
│   └── lodash.ts           # lodash-es 封装
├── views/                  # 页面
│   ├── login/              # 登录页（5套模板）
│   ├── register/           # 注册页（5套模板）
│   ├── dashboard/          # 仪表盘
│   ├── system/             # 系统管理（用户/菜单/部门）
│   ├── content/            # 内容管理（文章/分类/标签）
│   ├── permission/         # 权限管理
│   └── error/              # 错误页面（401/403/404/500）
├── App.vue                 # 根组件
└── main.ts                 # 入口文件
```

## 🛠 可用命令

```bash
pnpm dev            # 启动开发服务器 (localhost:3100)
pnpm build          # 构建生产版本
pnpm build:analyze  # 构建并分析包体积
pnpm preview        # 预览生产构建
pnpm lint           # ESLint 检查
pnpm format         # Prettier 格式化
```

## 🌐 环境变量

| 变量 | 说明 | 开发默认值 | 生产默认值 |
|------|------|-----------|-----------|
| VITE_APP_TITLE | 应用标题 | Admin Dashboard | Admin Dashboard |
| VITE_APP_API_BASE_URL | API 基础地址 | http://localhost:3000/api | /api |
| VITE_APP_MOCK_ENABLED | 是否启用 Mock | true | false |

## 📄 License

MIT
