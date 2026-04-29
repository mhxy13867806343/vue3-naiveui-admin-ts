# 实现计划：Admin Dashboard 后台管理系统

## 概述

基于 Vue 3 + TypeScript + Vite 8 技术栈，按照模块依赖关系从底层基础设施到上层业务功能逐步实现。先搭建项目骨架和核心模块（路由、状态管理、HTTP 层），再实现布局和页面，最后集成第三方组件和工具库。

## 任务

- [x] 1. 项目初始化与工程配置
  - [x] 1.1 使用 Vite 8 初始化 Vue 3 + TypeScript 项目
    - 创建 `vite.config.ts`，配置 `@` 路径别名映射到 `src` 目录
    - 创建 `tsconfig.json`，启用严格模式 TypeScript 类型检查
    - 创建 `index.html` 入口文件，包含应用挂载点 `<div id="app">`
    - 安装核心依赖：vue、vue-router、pinia、naive-ui、vue-i18n、axios
    - _需求: 1.1, 1.2, 1.3, 1.4, 2.3_

  - [x] 1.2 创建环境变量配置文件
    - 创建 `.env` 通用环境变量文件，定义 `VITE_APP_TITLE`、`VITE_APP_API_BASE_URL`、`VITE_APP_MOCK_ENABLED`
    - 创建 `.env.development` 开发环境变量文件
    - 创建 `.env.production` 生产环境变量文件
    - 创建 `src/env.d.ts` 类型声明文件，为自定义环境变量提供 TypeScript 类型定义
    - _需求: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.9_

  - [x] 1.3 创建环境变量工具模块
    - 创建 `src/utils/env.ts`，封装 `getEnvValue`、`isDevMode`、`isProdMode`、`isMockEnabled`、`getAppTitle`、`getApiBaseUrl` 方法
    - 提供类型安全的 `import.meta.env` 访问
    - _需求: 19.8_

  - [x] 1.4 创建全局类型定义
    - 创建 `src/types/index.ts`，定义 `UserInfo`、`LoginRequest`、`LoginResponse`、`Permission`、`RolePermission`、`RouteMeta`、`MenuItem`、`PaginationParams`、`PaginatedResponse`、`MockResponse` 等全局类型
    - _需求: 1.4_

- [x] 2. 公共样式与工具库集成
  - [x] 2.1 创建公共样式文件
    - 创建 `src/styles/variables.css`，定义 CSS 变量（颜色、字体、间距等设计令牌）
    - 创建 `src/styles/utilities.css`，提供布局类（flex 居中、栅格）、间距类（margin、padding）、文本类（对齐、截断、省略）
    - 创建 `src/styles/global.css`，作为全局样式入口引入 variables 和 utilities
    - _需求: 16.7, 16.8, 16.9_

  - [x] 2.2 封装 dayjs 工具模块
    - 创建 `src/utils/dayjs.ts`，集成 dayjs 并预配置中文语言包和 relativeTime、customParseFormat 插件
    - 导出 `formatDate` 和 `fromNow` 方法
    - _需求: 16.2, 16.3, 16.4_

  - [x] 2.3 封装 lodash-es 工具模块
    - 创建 `src/utils/lodash.ts`，按需导出 `debounce`、`throttle`、`cloneDeep`、`merge`、`isEmpty`、`get`
    - _需求: 16.5, 16.6_

  - [x] 2.4 创建工具库使用示例
    - 在 `src/utils/examples` 目录下创建 dayjs 和 lodash 的使用示例文件
    - _需求: 16.10_

- [x] 3. 国际化模块
  - [x] 3.1 创建中英文语言包
    - 创建 `src/locales/zh-CN.ts` 中文语言包，覆盖所有页面静态文本（菜单项、按钮文字、提示信息、表单标签、错误页面文本）
    - 创建 `src/locales/en-US.ts` 英文语言包，键集合与中文语言包完全一致
    - _需求: 9.2, 9.8_

  - [x] 3.2 创建 i18n 实例配置
    - 创建 `src/locales/index.ts`，使用 Composition API 模式创建 i18n 实例
    - 设置默认语言为 zh-CN，从 localStorage 恢复用户语言偏好
    - _需求: 9.1, 9.3, 9.7_

  - [ ]* 3.3 编写语言包键值完整性属性测试
    - **Property 3: 语言包键值完整性**
    - 验证 zh-CN 和 en-US 语言包的键集合完全一致
    - **验证需求: 9.8**

- [x] 4. HTTP 请求层与 Mock 服务
  - [x] 4.1 创建 Axios 实例与拦截器
    - 创建 `src/api/http.ts`，基于 Axios 创建请求实例，从 `VITE_APP_API_BASE_URL` 读取基础 URL
    - 实现请求拦截器：自动附加 token 到 Authorization 字段
    - 实现响应拦截器：401 → logout + 重定向 /401，网络错误 → 统一提示
    - 封装 `get`、`post`、`put`、`del` 方法
    - _需求: 10.1, 10.2, 10.3, 10.4, 10.7, 19.7_

  - [ ]* 4.2 编写请求拦截器 Token 附加属性测试
    - **Property 12: 请求拦截器 Token 附加**
    - 使用 fast-check 生成随机 token 字符串，验证拦截器正确附加/不附加 Authorization 字段
    - **验证需求: 10.2**

  - [x] 4.3 创建 Mock 服务
    - 创建 `src/api/mock/index.ts` Mock 服务入口，支持通过 `VITE_APP_MOCK_ENABLED` 配置开关
    - 创建 `src/api/mock/auth.ts` 登录 Mock 数据
    - 创建 `src/api/mock/user.ts` 用户信息和权限 Mock 数据
    - _需求: 10.5, 10.6_

- [x] 5. 状态管理（Pinia Stores）
  - [x] 5.1 实现 Auth Store
    - 创建 `src/stores/auth.ts`，管理 token、username 状态
    - 实现 `login` 方法（调用 API、保存 token 到 localStorage）
    - 实现 `logout` 方法（清除认证信息、导航到登录页）
    - 实现 `isAuthenticated` getter
    - 应用初始化时从 localStorage 恢复 token
    - _需求: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 5.2 编写 Token 持久化往返属性测试
    - **Property 1: Token 持久化往返（Round-Trip）**
    - 使用 fast-check 生成随机非空字符串作为 token，验证 localStorage 往返一致性
    - **验证需求: 6.4, 6.5**

  - [x] 5.3 实现 Permission Store
    - 创建 `src/stores/permission.ts`，管理 role、permissions、dynamicRoutesRegistered 状态
    - 实现 `loadPermissions` 方法（调用 API 加载权限列表）
    - 实现 `hasPermission`、`hasRole` 方法
    - 实现 `clearPermissions` 方法
    - _需求: 11.1, 11.2, 11.7, 11.8_

  - [ ]* 5.4 编写 usePermission 权限与角色判断属性测试
    - **Property 8: usePermission 权限与角色判断**
    - 使用 fast-check 生成随机权限字符串和权限列表，验证 hasPermission 和 hasRole 的正确性
    - **验证需求: 15.5, 15.6**

- [x] 6. 检查点 - 确保核心模块测试通过
  - 确保所有测试通过，如有问题请向用户确认。

- [x] 7. 路由系统
  - [x] 7.1 创建静态路由配置
    - 创建 `src/router/index.ts`，定义静态路由（/login、/401、/403、/404、/500）
    - 配置 `/:pathMatch(.*)*` 通配路由重定向到 /404
    - _需求: 4.1, 4.2, 4.4, 4.6, 4.7, 4.8, 4.9, 4.10_

  - [x] 7.2 创建动态路由配置表
    - 创建 `src/router/dynamic-routes.ts`，定义所有动态路由（/dashboard、/permission-management 等）
    - 每条路由配置 `meta` 字段，包含 `permissions` 和 `roles` 属性
    - 使用动态导入实现路由组件懒加载
    - _需求: 4.3, 4.5, 18.1, 18.4, 18.8_

  - [x] 7.3 实现动态路由注册/移除逻辑
    - 创建 `src/router/dynamic-router.ts`，实现 `generateRoutes`、`registerDynamicRoutes`、`resetRoutes` 方法
    - `generateRoutes` 根据权限列表筛选有权限的路由
    - `registerDynamicRoutes` 使用 `addRoute` 逐一注册路由
    - `resetRoutes` 移除所有动态路由，恢复静态路由状态
    - _需求: 11.3, 11.9, 18.2, 18.3, 18.6, 18.7_

  - [ ]* 7.4 编写动态路由权限过滤属性测试
    - **Property 4: 动态路由权限过滤**
    - 使用 fast-check 生成随机权限列表和路由配置，验证 generateRoutes 的过滤正确性
    - **验证需求: 11.3, 18.2**

  - [ ]* 7.5 编写 resetRoutes 恢复静态路由状态属性测试
    - **Property 11: resetRoutes 恢复静态路由状态**
    - 使用 fast-check 生成随机动态路由集合，验证 resetRoutes 后仅保留静态路由
    - **验证需求: 18.6**

  - [x] 7.6 实现路由守卫
    - 创建 `src/router/guard.ts`，实现 beforeEach 守卫逻辑
    - 白名单路由直接放行；无 token → /login；有 token + /login → /dashboard
    - 有 token + 动态路由未注册 → 加载权限 + 注册动态路由 + 重新导航
    - 有 token + 已注册 → 检查权限 → 放行或 /403
    - _需求: 7.1, 7.2, 7.3, 11.5, 14.6, 18.5_

  - [ ]* 7.7 编写未认证用户路由守卫拦截属性测试
    - **Property 5: 未认证用户路由守卫拦截**
    - 使用 fast-check 生成随机受保护路由路径，验证无 token 时重定向到 /login
    - **验证需求: 7.1**

  - [ ]* 7.8 编写无权限用户路由守卫拦截属性测试
    - **Property 6: 无权限用户路由守卫拦截**
    - 使用 fast-check 生成随机权限不匹配的路由，验证重定向到 /403
    - **验证需求: 11.5**

- [ ] 8. 自定义 Composable Hooks
  - [x] 8.1 实现 useLoading
    - 创建 `src/composables/useLoading.ts`，提供 `loading` 响应式状态和 `run` 执行方法
    - `run` 方法在异步函数执行前设置 loading=true，完成/失败后设置 loading=false
    - 正确传播返回值和异常
    - _需求: 15.1, 15.2, 15.3, 15.4_

  - [ ]* 8.2 编写 useLoading 状态管理属性测试
    - **Property 7: useLoading 状态管理与结果传播**
    - 使用 fast-check 生成随机异步函数（成功/失败/不同延迟），验证 loading 状态和结果传播
    - **验证需求: 15.3, 15.4**

  - [x] 8.3 实现 usePermission
    - 创建 `src/composables/usePermission.ts`，提供 `hasPermission` 和 `hasRole` 方法
    - 从 Permission Store 读取权限和角色信息
    - _需求: 15.5, 15.6, 15.7_

  - [~] 8.4 实现 usePagination
    - 创建 `src/composables/usePagination.ts`，提供 `page`、`pageSize`、`total`、`pageCount` 响应式状态
    - 提供 `onPageChange` 和 `onPageSizeChange` 方法
    - `pageCount` 自动计算：`Math.ceil(total / pageSize)`（最小为 1）
    - `page` 超过 `pageCount` 时自动修正
    - _需求: 15.8, 15.9, 15.10, 15.11, 15.12_

  - [ ]* 8.5 编写 usePagination 分页计算属性测试
    - **Property 9: usePagination 分页计算不变量**
    - 使用 fast-check 生成随机 total/pageSize/page 组合，验证 pageCount 计算和 page 自动修正
    - **验证需求: 15.10, 15.11**

- [ ] 9. 自定义指令
  - [~] 9.1 实现 v-permission 指令
    - 创建 `src/directives/permission.ts`，检查 Permission Store 中是否包含指定权限标识
    - 无权限则移除 DOM 元素
    - _需求: 11.6_

- [ ] 10. 检查点 - 确保路由和 Hooks 测试通过
  - 确保所有测试通过，如有问题请向用户确认。

- [ ] 11. 应用入口与根组件
  - [~] 11.1 创建应用入口文件
    - 创建 `src/main.ts`，创建 Vue 应用实例
    - 注册 Router、Pinia、Naive UI、vue-i18n 插件
    - 全局引入公共样式文件
    - 注册 v-permission 自定义指令
    - _需求: 2.1, 2.2, 16.9_

  - [~] 11.2 创建根组件
    - 创建 `src/App.vue`，包含 `<router-view>` 渲染路由页面
    - _需求: 2.2_

- [ ] 12. 布局组件
  - [~] 12.1 实现侧边栏组件
    - 创建 `src/layouts/Sidebar.vue`，使用 Naive UI NMenu 组件渲染导航菜单
    - 支持 collapsed 折叠状态切换（折叠时仅显示图标）
    - 支持三级及以上嵌套菜单，通过 NMenu options 嵌套配置实现
    - 根据已注册动态路由和权限列表动态生成菜单数据
    - 根据当前路由路径自动展开父级菜单并高亮当前项
    - 点击菜单项导航到对应路由
    - _需求: 3.2, 3.3, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12, 11.4_

  - [~] 12.2 实现顶部栏组件
    - 创建 `src/layouts/Header.vue`，展示当前登录用户名
    - 提供退出登录按钮（调用 Auth Store logout）
    - 实现语言切换器（Language Switcher），位于右上角，支持中英文切换
    - 语言切换时更新 i18n locale 并持久化到 localStorage
    - _需求: 3.4, 3.5, 9.4, 9.5, 9.6_

  - [ ]* 12.3 编写语言偏好持久化往返属性测试
    - **Property 2: 语言偏好持久化往返（Round-Trip）**
    - 验证语言切换后 localStorage 存储值与选择一致，应用重新初始化后恢复正确语言
    - **验证需求: 9.6, 9.7**

  - [~] 12.4 实现后台管理布局
    - 创建 `src/layouts/AdminLayout.vue`，采用左侧固定侧边栏 + 右侧内容区域布局
    - 内容区域包含 Header 和 `<router-view>` 渲染当前路由页面
    - _需求: 3.1, 3.6_

- [ ] 13. 页面实现
  - [~] 13.1 实现登录页面
    - 创建 `src/views/login/LoginPage.vue`，提供用户名和密码输入框、登录按钮
    - 实现表单验证：空用户名或密码时显示错误提示
    - 登录成功后保存认证信息并导航到 Dashboard
    - 登录失败时显示错误提示
    - _需求: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 13.2 编写登录表单空值验证属性测试
    - **Property 10: 登录表单空值验证**
    - 使用 fast-check 生成随机空白字符串组合，验证表单拒绝提交
    - **验证需求: 5.3**

  - [~] 13.3 实现仪表盘页面
    - 创建 `src/views/dashboard/DashboardPage.vue`，显示欢迎信息（含用户名）
    - 使用 Naive UI 卡片组件展示统计信息占位区域
    - _需求: 8.1, 8.2_

  - [~] 13.4 实现错误页面（401、403、404、500）
    - 创建 `src/views/error/Error401.vue`，显示 401 状态码和"未授权/登录已过期"提示，提供"重新登录"按钮
    - 创建 `src/views/error/Error403.vue`，显示 403 状态码和"无权限访问"提示，提供"返回首页"按钮
    - 创建 `src/views/error/Error404.vue`，显示 404 状态码和"页面不存在"提示，提供"返回首页"按钮
    - 创建 `src/views/error/Error500.vue`，显示 500 状态码和"服务器错误"提示，提供"返回首页"按钮
    - 所有错误页面采用居中布局，支持 i18n 多语言文本
    - _需求: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9, 13.10_

  - [~] 13.5 实现权限管理页面
    - 创建 `src/views/permission/PermissionManagement.vue`
    - 展示角色列表（角色名称和描述）
    - 选择角色时展示该角色的权限项（树形结构或分组列表）
    - 支持修改角色权限配置并提交更新
    - 仅 admin 角色可见，支持 i18n 多语言
    - _需求: 14.1, 14.2, 14.3, 14.4, 14.5, 14.7_

- [ ] 14. 检查点 - 确保页面和布局测试通过
  - 确保所有测试通过，如有问题请向用户确认。

- [ ] 15. 第三方组件封装
  - [~] 15.1 实现富文本编辑器封装
    - 创建 `src/components/third-party/rich-text/RichTextEditor.vue`
    - 基于 TipTap 或 WangEditor 封装，支持 v-model 双向绑定
    - 提供工具栏配置项，支持只读模式
    - 通过 `update:modelValue` 事件实时同步 HTML 内容
    - 实现错误捕获和降级提示
    - _需求: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.14_

  - [~] 15.2 实现拖拽列表组件封装
    - 创建 `src/components/third-party/drag/DragList.vue`
    - 基于 VueDraggable 或 SortableJS 封装，支持 v-model 绑定列表数据
    - 拖拽完成触发 change 事件（携带完整列表和变更详情）
    - 支持 handle 拖拽手柄和 disabled 禁用属性
    - 实现错误捕获和降级提示
    - _需求: 12.9, 12.10, 12.11, 12.12, 12.13, 12.14_

  - [~] 15.3 实现 ECharts 图表组件封装
    - 创建 `src/components/third-party/charts/EChartsComponent.vue`
    - 通过 option 属性接收配置，支持 width/height/theme 属性
    - 实现 ResizeObserver 自动 resize
    - option 变化时调用 setOption 更新，组件销毁时调用 dispose 释放资源
    - 实现错误捕获和降级提示
    - _需求: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.14, 17.15_

  - [~] 15.4 实现 G2 图表组件封装
    - 创建 `src/components/third-party/charts/G2Component.vue`
    - 通过 options 属性接收配置，支持 width/height/theme 属性
    - 实现 ResizeObserver 自动重新渲染
    - options 变化时重新渲染，组件销毁时释放资源
    - 实现错误捕获和降级提示
    - _需求: 17.8, 17.9, 17.10, 17.11, 17.12, 17.13, 17.14, 17.15_

  - [~] 15.5 创建图表组件统一类型定义和使用示例
    - 为 EChartsComponent 和 G2Component 提供统一的 TypeScript 类型定义
    - 创建折线图、柱状图、饼图的基本配置示例
    - _需求: 17.14, 17.16_

  - [~] 15.6 创建第三方组件使用示例文档
    - 为富文本编辑器和拖拽列表组件提供使用示例，包含基本用法和常用配置说明
    - _需求: 12.15_

- [ ] 16. 整合与连接
  - [~] 16.1 连接所有模块到应用入口
    - 确保 main.ts 正确注册所有插件和全局配置
    - 确保路由守卫在应用启动时生效
    - 确保 Mock 服务根据环境变量正确启用/禁用
    - 确保根路径 `/` 重定向到 `/dashboard`
    - _需求: 2.1, 4.5, 10.6, 19.7_

  - [ ]* 16.2 编写集成测试
    - 测试完整登录流程：登录 → 权限加载 → 动态路由注册 → 导航到 Dashboard
    - 测试退出登录流程：清除认证 → 清除权限 → 移除动态路由 → 导航到登录页
    - 测试路由守卫完整流程
    - _需求: 6.2, 6.3, 11.3, 11.8, 11.9_

- [ ] 17. 最终检查点 - 确保所有测试通过
  - 确保所有测试通过，如有问题请向用户确认。

## 说明

- 标记 `*` 的子任务为可选任务，可跳过以加快 MVP 进度
- 每个任务引用了具体的需求编号，确保需求可追溯
- 检查点任务用于阶段性验证，确保增量开发的正确性
- 属性测试验证设计文档中定义的通用正确性属性
- 单元测试验证具体场景和边界条件
