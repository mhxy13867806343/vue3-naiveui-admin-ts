# 需求文档

## 简介

本项目是一个基础的后台管理系统，基于 Vue 3 + TypeScript + Vite 8 技术栈从零搭建。系统采用 Naive UI 作为 UI 组件库，Pinia 进行状态管理，Vue Router 处理路由。项目使用 Axios 进行 HTTP 请求封装并支持 Mock 数据模拟接口，使用 vue-i18n 实现中英文国际化支持，并提供基于角色的权限控制。项目需要提供一个标准的后台管理布局，包含侧边栏导航、顶部栏（含语言切换）、内容区域，以及登录页面、基于角色的动态路由注册、路由权限控制和角色权限管理。系统支持基于 Vite `.env` 文件的多环境变量配置，并提供 401、403、404、500 等完整的错误页面。

## 术语表

- **Admin_Dashboard（后台管理系统）**: 本项目的核心应用，提供后台管理界面和功能
- **Layout（布局组件）**: 后台管理系统的整体页面布局，包含侧边栏、顶部栏和内容区域
- **Sidebar（侧边栏）**: 位于页面左侧的导航菜单组件，用于展示和切换不同的功能模块
- **Header（顶部栏）**: 位于页面顶部的组件，用于展示系统信息、用户信息和常用操作
- **Content_Area（内容区域）**: 页面主体区域，用于展示当前路由对应的页面内容
- **Auth_Store（认证状态管理）**: 基于 Pinia 的状态管理模块，负责管理用户登录状态和认证信息
- **Router_Guard（路由守卫）**: Vue Router 的导航守卫，用于在路由跳转前进行权限验证
- **Login_Page（登录页面）**: 用户登录界面，提供用户名和密码输入表单
- **Dashboard_Page（仪表盘页面）**: 登录后的默认首页，展示系统概览信息
- **I18n_Module（国际化模块）**: 基于 vue-i18n 的多语言支持模块，负责管理语言包和语言切换逻辑
- **Language_Switcher（语言切换器）**: 位于 Header 右上角的语言切换组件，允许用户在中文和英文之间切换
- **HTTP_Client（HTTP 请求客户端）**: 基于 Axios 封装的 HTTP 请求模块，负责与后端 API 通信
- **Mock_Service（Mock 数据服务）**: 用于模拟后端接口返回数据的服务层，在开发阶段替代真实 API
- **Permission_Store（权限状态管理）**: 基于 Pinia 的权限管理模块，负责管理用户角色和权限信息
- **Role（角色）**: 系统中定义的用户角色类型，包括 admin（管理员）和 user（普通用户）等
- **Permission_Directive（权限指令）**: 自定义 Vue 指令，用于在模板中根据权限控制元素的显示与隐藏
- **Rich_Text_Editor（富文本编辑器）**: 集成的第三方富文本编辑组件（如 TipTap 或 WangEditor），用于在后台管理系统中提供富文本内容编辑能力
- **Drag_Module（拖拽模块）**: 基于第三方拖拽库（如 VueDraggable / SortableJS）封装的拖拽功能模块，用于实现列表排序、看板拖拽等交互
- **Third_Party_Wrapper（第三方组件封装层）**: 对第三方组件进行统一封装的抽象层，提供一致的接口规范和使用方式，降低第三方库的耦合度
- **Nested_Menu（多级菜单）**: 侧边栏中支持多层级嵌套的导航菜单结构，子菜单可展开和折叠
- **Error_Page（错误页面）**: 系统中用于展示 HTTP 错误状态的专用页面，包括 401（未授权）、403（无权限）、404（未找到）、500（服务器错误）等
- **Error_401_Page（401 页面）**: 当用户未授权或登录过期时展示的错误页面
- **Error_403_Page（403 页面）**: 当用户访问无权限的资源时展示的错误页面
- **Error_404_Page（404 页面）**: 当用户访问不存在的页面时展示的错误页面
- **Error_500_Page（500 页面）**: 当服务器发生内部错误时展示的错误页面
- **Permission_Management_Page（权限管理页面）**: 供管理员查看和管理系统角色及其对应权限的专用管理页面
- **Composable（组合式函数）**: 基于 Vue 3 Composition API 封装的可复用逻辑函数，遵循 `use` 前缀命名约定
- **useLoading（加载状态 Hook）**: 封装异步操作加载状态管理的组合式函数，提供 loading 状态和执行方法
- **usePermission（权限判断 Hook）**: 封装权限检查逻辑的组合式函数，提供权限验证和角色判断方法
- **usePagination（分页 Hook）**: 封装分页逻辑的组合式函数，提供页码、页大小、总数等分页状态管理
- **Style_Utility（公共样式与工具）**: 项目中提供的全局 CSS 变量、公共样式类以及 JS/TS 工具函数的统一集合
- **Lib_Integration（工具库集成层）**: 对 dayjs、lodash-es 等常用第三方 JS/TS 工具库进行统一封装和配置的集成层
- **Dayjs_Wrapper（日期工具封装）**: 对 dayjs 库进行统一配置和封装的模块，提供日期格式化、解析、比较等常用方法
- **Lodash_Wrapper（工具函数封装）**: 对 lodash-es 库进行按需导出和封装的模块，提供防抖、节流、深拷贝等常用工具函数
- **Chart_Wrapper（图表组件封装层）**: 对 ECharts 和 G2 图表库进行统一封装的抽象层，提供一致的图表组件接口
- **ECharts_Component（ECharts 图表组件）**: 基于 ECharts 封装的 Vue 图表组件，支持响应式尺寸和主题切换
- **G2_Component（G2 图表组件）**: 基于 AntV G2 封装的 Vue 图表组件，支持响应式尺寸和主题切换
- **Dynamic_Router（动态路由模块）**: 基于用户角色和权限动态注册路由的模块，登录后根据权限列表使用 Vue Router 的 `addRoute` 方法动态添加可访问的路由
- **Static_Routes（静态路由）**: 不依赖用户权限的基础路由集合，包括登录页、错误页等所有用户均可访问的路由
- **Dynamic_Routes（动态路由）**: 依赖用户角色和权限的路由集合，登录后根据权限动态注册到路由实例中
- **Env_Config（环境变量配置）**: 基于 Vite 的 `.env` 文件机制管理的应用环境变量配置，支持多环境差异化配置

## 需求

### 需求 1：项目初始化与工程配置

**用户故事：** 作为一名开发者，我希望项目具备完整的工程化配置，以便能够高效地进行开发和构建。

#### 验收标准

1. THE Admin_Dashboard SHALL 使用 Vite 8 作为构建工具，并配置 TypeScript 支持
2. THE Admin_Dashboard SHALL 集成 Vue 3、Vue Router、Pinia 和 Naive UI 作为核心依赖
3. THE Admin_Dashboard SHALL 配置路径别名，将 `@` 映射到 `src` 目录
4. THE Admin_Dashboard SHALL 包含 `tsconfig.json` 文件，启用严格模式的 TypeScript 类型检查

### 需求 2：应用入口与根组件

**用户故事：** 作为一名开发者，我希望应用具备标准的入口文件和根组件，以便 Vue 应用能够正确初始化和挂载。

#### 验收标准

1. THE Admin_Dashboard SHALL 在 `main.ts` 中创建 Vue 应用实例，并注册 Router、Pinia、Naive UI 和 vue-i18n 插件
2. THE Admin_Dashboard SHALL 提供 `App.vue` 根组件，包含 `<router-view>` 用于渲染路由页面
3. THE Admin_Dashboard SHALL 提供 `index.html` 入口文件，包含应用挂载点

### 需求 3：后台管理布局

**用户故事：** 作为一名管理员，我希望系统具备标准的后台管理布局，以便能够方便地浏览和操作各个功能模块。

#### 验收标准

1. THE Layout SHALL 采用左侧固定侧边栏加右侧内容区域的经典布局结构
2. THE Sidebar SHALL 使用 Naive UI 的菜单组件渲染导航菜单项
3. WHEN 用户点击 Sidebar 中的菜单项时, THE Router SHALL 导航到对应的路由路径
4. THE Header SHALL 展示当前登录用户的用户名
5. THE Header SHALL 提供退出登录按钮
6. THE Content_Area SHALL 通过 `<router-view>` 渲染当前路由匹配的页面组件
7. WHILE Sidebar 处于折叠状态时, THE Sidebar SHALL 仅显示菜单图标，隐藏菜单文字
8. THE Sidebar SHALL 支持多级嵌套菜单结构（Nested_Menu），菜单层级深度不少于三级
9. WHEN 用户点击含有子菜单的父级菜单项时, THE Sidebar SHALL 展开该菜单项的子菜单列表
10. WHEN 用户再次点击已展开的父级菜单项时, THE Sidebar SHALL 折叠该菜单项的子菜单列表
11. THE Sidebar SHALL 根据当前路由路径自动展开对应的父级菜单并高亮当前激活的菜单项
12. THE Sidebar SHALL 通过递归组件或 Naive UI 菜单组件的嵌套配置渲染多级菜单数据

### 需求 4：路由配置

**用户故事：** 作为一名开发者，我希望系统具备清晰的路由配置，区分静态路由和动态路由，以便页面导航逻辑正确且可维护。

#### 验收标准

1. THE Router SHALL 将路由分为 Static_Routes 和 Dynamic_Routes 两类进行管理
2. THE Static_Routes SHALL 包含 `/login`、`/401`、`/403`、`/404`、`/500` 等不依赖权限的基础路由
3. THE Dynamic_Routes SHALL 包含 `/dashboard`、`/permission-management` 等依赖用户权限的业务路由
4. THE Router SHALL 在应用初始化时仅注册 Static_Routes
5. WHEN 用户访问根路径 `/` 时, THE Router SHALL 重定向到 `/dashboard`
6. WHEN 用户访问未定义的路由路径时, THE Router SHALL 导航到 Error_404_Page
7. THE Router SHALL 配置 `/401` 路由，对应 Error_401_Page 组件
8. THE Router SHALL 配置 `/403` 路由，对应 Error_403_Page 组件
9. THE Router SHALL 配置 `/404` 路由，对应 Error_404_Page 组件
10. THE Router SHALL 配置 `/500` 路由，对应 Error_500_Page 组件

### 需求 5：登录页面

**用户故事：** 作为一名管理员，我希望系统提供登录页面，以便我能够通过身份验证进入系统。

#### 验收标准

1. THE Login_Page SHALL 提供用户名输入框和密码输入框
2. THE Login_Page SHALL 提供登录按钮
3. WHEN 用户提交空的用户名或密码时, THE Login_Page SHALL 显示表单验证错误提示
4. WHEN 用户提交有效的用户名和密码时, THE Auth_Store SHALL 保存用户认证信息并导航到 Dashboard_Page
5. IF 登录请求失败, THEN THE Login_Page SHALL 显示错误提示信息

### 需求 6：认证状态管理

**用户故事：** 作为一名开发者，我希望系统具备集中的认证状态管理，以便登录状态能够在各组件间共享和维护。

#### 验收标准

1. THE Auth_Store SHALL 使用 Pinia 定义，管理用户的登录状态、用户名和 token 信息
2. THE Auth_Store SHALL 提供 `login` 方法，接收用户名和密码参数，模拟登录并保存认证信息
3. THE Auth_Store SHALL 提供 `logout` 方法，清除认证信息并导航到 Login_Page
4. THE Auth_Store SHALL 将 token 持久化存储到 localStorage 中
5. WHEN 应用初始化时, THE Auth_Store SHALL 从 localStorage 中恢复 token 信息

### 需求 7：路由权限控制

**用户故事：** 作为一名管理员，我希望未登录时无法访问后台页面，以便系统数据得到保护。

#### 验收标准

1. WHEN 未认证用户访问受保护路由时, THE Router_Guard SHALL 重定向到 Login_Page
2. WHEN 已认证用户访问 Login_Page 时, THE Router_Guard SHALL 重定向到 Dashboard_Page
3. THE Router_Guard SHALL 通过检查 Auth_Store 中的 token 来判断用户是否已认证

### 需求 8：仪表盘页面

**用户故事：** 作为一名管理员，我希望登录后能看到一个仪表盘首页，以便快速了解系统概况。

#### 验收标准

1. THE Dashboard_Page SHALL 显示欢迎信息，包含当前登录用户的用户名
2. THE Dashboard_Page SHALL 使用 Naive UI 的卡片组件展示统计信息占位区域

### 需求 9：国际化（i18n）支持

**用户故事：** 作为一名管理员，我希望系统支持中英文切换，以便不同语言偏好的用户都能方便地使用系统。

#### 验收标准

1. THE Admin_Dashboard SHALL 集成 vue-i18n 作为国际化解决方案
2. THE I18n_Module SHALL 提供中文（zh-CN）和英文（en-US）两套语言包
3. THE I18n_Module SHALL 将中文（zh-CN）设置为默认语言
4. THE Language_Switcher SHALL 位于 Header 的右上角区域
5. WHEN 用户通过 Language_Switcher 切换语言时, THE I18n_Module SHALL 立即更新页面上所有可翻译的文本内容
6. THE I18n_Module SHALL 将用户选择的语言偏好持久化存储到 localStorage 中
7. WHEN 应用初始化时, THE I18n_Module SHALL 从 localStorage 中恢复用户上次选择的语言设置
8. THE I18n_Module SHALL 覆盖所有页面的静态文本，包括菜单项、按钮文字、提示信息和表单标签

### 需求 10：HTTP 请求层封装

**用户故事：** 作为一名开发者，我希望系统具备统一的 HTTP 请求封装和 Mock 数据支持，以便在开发阶段能够独立于后端进行前端开发和调试。

#### 验收标准

1. THE HTTP_Client SHALL 基于 Axios 创建统一的请求实例，配置基础 URL 和超时时间
2. THE HTTP_Client SHALL 在请求拦截器中自动附加 Auth_Store 中的 token 到请求头的 Authorization 字段
3. IF 接口返回 401 未授权状态码, THEN THE HTTP_Client SHALL 调用 Auth_Store 的 logout 方法并重定向到 Error_401_Page
4. IF 接口请求发生网络错误, THEN THE HTTP_Client SHALL 显示统一的错误提示信息
5. THE Mock_Service SHALL 使用 Mock 数据模拟后端接口响应，覆盖登录接口和用户信息接口
6. THE Mock_Service SHALL 支持通过配置开关控制是否启用 Mock 模式
7. THE HTTP_Client SHALL 提供 GET、POST、PUT、DELETE 等常用 HTTP 方法的封装

### 需求 11：基于角色的权限控制

**用户故事：** 作为一名系统管理员，我希望系统能够根据用户角色控制可访问的菜单和功能，以便不同角色的用户只能看到和操作其权限范围内的内容。

#### 验收标准

1. THE Permission_Store SHALL 管理当前用户的角色信息和权限列表
2. WHEN 用户登录成功时, THE Permission_Store SHALL 根据用户角色加载对应的权限列表
3. WHEN 用户登录成功时, THE Dynamic_Router SHALL 根据 Permission_Store 中的权限列表筛选 Dynamic_Routes，并使用 Vue Router 的 `addRoute` 方法将有权限的路由动态注册到路由实例中
4. THE Sidebar SHALL 根据已注册的动态路由和 Permission_Store 中的权限列表动态渲染菜单项，仅显示当前用户有权访问的菜单
5. WHEN 未授权用户尝试通过 URL 直接访问无权限的路由时, THE Router_Guard SHALL 重定向到 Error_403_Page
6. THE Permission_Directive SHALL 支持在模板中通过 `v-permission` 指令控制按钮和操作元素的显示与隐藏
7. THE Admin_Dashboard SHALL 预定义至少两种角色：admin（管理员）拥有全部权限，user（普通用户）拥有部分权限
8. WHEN 用户退出登录时, THE Permission_Store SHALL 清除所有已加载的权限信息
9. WHEN 用户退出登录时, THE Dynamic_Router SHALL 移除所有已动态注册的路由，将路由实例恢复为仅包含 Static_Routes 的初始状态

### 需求 12：第三方组件集成

**用户故事：** 作为一名开发者，我希望系统提供统一的第三方组件集成规范和常用第三方组件封装，以便在业务开发中能够快速复用富文本编辑、拖拽排序等常见功能，同时降低第三方库的耦合度。

#### 验收标准

1. THE Third_Party_Wrapper SHALL 在 `src/components/third-party` 目录下统一管理所有第三方组件的封装代码
2. THE Third_Party_Wrapper SHALL 为每个封装的第三方组件提供统一的 Props 接口定义和 TypeScript 类型声明
3. THE Third_Party_Wrapper SHALL 对第三方组件的核心 API 进行二次封装，使业务代码仅依赖封装层接口而非直接依赖第三方库
4. THE Rich_Text_Editor SHALL 基于 TipTap 或 WangEditor 进行封装，提供一个可复用的 Vue 组件
5. THE Rich_Text_Editor SHALL 支持通过 `v-model` 进行富文本内容的双向绑定
6. THE Rich_Text_Editor SHALL 提供工具栏配置项，允许业务方自定义可用的编辑功能（如加粗、斜体、插入图片、插入链接等）
7. WHEN 用户在 Rich_Text_Editor 中输入或编辑内容时, THE Rich_Text_Editor SHALL 通过 `update:modelValue` 事件实时同步 HTML 格式的内容数据
8. THE Rich_Text_Editor SHALL 支持只读模式，WHEN `readonly` 属性设置为 `true` 时, THE Rich_Text_Editor SHALL 禁用所有编辑功能并隐藏工具栏
9. THE Drag_Module SHALL 基于 VueDraggable 或 SortableJS 进行封装，提供一个可复用的 Vue 拖拽列表组件
10. THE Drag_Module SHALL 支持通过 `v-model` 绑定列表数据，拖拽排序后自动更新数据顺序
11. WHEN 用户完成拖拽操作时, THE Drag_Module SHALL 触发 `change` 事件，携带排序后的完整列表数据和变更详情（包含被移动元素的原始索引和目标索引）
12. THE Drag_Module SHALL 支持通过 `handle` 属性指定拖拽手柄的 CSS 选择器，限制仅通过特定区域触发拖拽
13. THE Drag_Module SHALL 支持通过 `disabled` 属性全局禁用拖拽功能
14. IF 第三方组件加载失败或初始化异常, THEN THE Third_Party_Wrapper SHALL 捕获错误并在组件区域显示友好的降级提示信息，避免页面崩溃
15. THE Third_Party_Wrapper SHALL 为每个封装组件提供使用示例文档，包含基本用法和常用配置说明

### 需求 13：错误页面

**用户故事：** 作为一名管理员，我希望系统在遇到未授权、权限不足、页面不存在或服务器错误时展示清晰的错误页面，以便我能够了解问题原因并采取相应操作。

#### 验收标准

1. THE Error_401_Page SHALL 显示 401 状态码和"未授权/登录已过期"的提示文字
2. THE Error_401_Page SHALL 提供"重新登录"按钮，WHEN 用户点击该按钮时, THE Router SHALL 导航到 Login_Page
3. THE Error_403_Page SHALL 显示 403 状态码和"无权限访问"的提示文字
4. THE Error_403_Page SHALL 提供"返回首页"按钮，WHEN 用户点击该按钮时, THE Router SHALL 导航到 Dashboard_Page
5. THE Error_404_Page SHALL 显示 404 状态码和"页面不存在"的提示文字
6. THE Error_404_Page SHALL 提供"返回首页"按钮，WHEN 用户点击该按钮时, THE Router SHALL 导航到 Dashboard_Page
7. THE Error_500_Page SHALL 显示 500 状态码和"服务器错误"的提示文字
8. THE Error_500_Page SHALL 提供"返回首页"按钮，WHEN 用户点击该按钮时, THE Router SHALL 导航到 Dashboard_Page
9. THE Error_Page SHALL 支持 I18n_Module 的多语言文本显示，所有提示文字和按钮文字均可通过语言包切换
10. THE Error_Page SHALL 在页面中央区域展示错误信息，采用居中布局和清晰的视觉层次

### 需求 14：权限管理页面

**用户故事：** 作为一名系统管理员，我希望系统提供一个专门的权限管理页面，以便我能够查看和管理系统中的角色及其对应的权限配置。

#### 验收标准

1. THE Permission_Management_Page SHALL 展示系统中所有已定义角色的列表，包含角色名称和角色描述
2. WHEN 管理员选择某个角色时, THE Permission_Management_Page SHALL 展示该角色拥有的所有权限项
3. THE Permission_Management_Page SHALL 以树形结构或分组列表的形式展示权限项，权限项按功能模块分组
4. WHEN 管理员修改某个角色的权限配置并提交时, THE Permission_Store SHALL 更新该角色的权限列表
5. THE Permission_Management_Page SHALL 仅对拥有 admin 角色的用户可见，普通用户无法访问该页面
6. IF 非 admin 角色用户尝试访问 Permission_Management_Page, THEN THE Router_Guard SHALL 重定向到 Error_403_Page
7. THE Permission_Management_Page SHALL 支持 I18n_Module 的多语言文本显示

### 需求 15：自定义 Composable Hooks

**用户故事：** 作为一名开发者，我希望系统提供常用的 Vue 3 Composable Hooks 封装，以便在业务开发中能够快速复用加载状态管理、权限判断、分页逻辑等通用功能，减少重复代码。

#### 验收标准

1. THE Composable SHALL 在 `src/composables` 目录下统一管理所有自定义组合式函数
2. THE useLoading SHALL 提供 `loading` 响应式状态（布尔值）和 `run` 执行方法
3. WHEN 调用 useLoading 的 `run` 方法传入异步函数时, THE useLoading SHALL 在异步函数执行前将 `loading` 设置为 `true`，在异步函数执行完成或失败后将 `loading` 设置为 `false`
4. THE useLoading SHALL 将异步函数的返回值通过 `run` 方法返回，将异步函数的异常通过 `run` 方法抛出
5. THE usePermission SHALL 提供 `hasPermission` 方法，接收权限标识字符串参数，返回布尔值表示当前用户是否拥有该权限
6. THE usePermission SHALL 提供 `hasRole` 方法，接收角色名称字符串参数，返回布尔值表示当前用户是否拥有该角色
7. THE usePermission SHALL 从 Permission_Store 中读取当前用户的权限和角色信息
8. THE usePagination SHALL 提供 `page`（当前页码）、`pageSize`（每页条数）、`total`（总条数）和 `pageCount`（总页数）响应式状态
9. THE usePagination SHALL 提供 `onPageChange` 和 `onPageSizeChange` 方法，用于更新分页状态
10. WHEN `total` 或 `pageSize` 发生变化时, THE usePagination SHALL 自动重新计算 `pageCount`
11. WHEN 当前 `page` 超过 `pageCount` 时, THE usePagination SHALL 自动将 `page` 修正为 `pageCount` 的值（最小为 1）
12. THE Composable SHALL 为每个组合式函数提供完整的 TypeScript 类型定义和 JSDoc 注释

### 需求 16：CSS/JS/TS 工具库集成与公共样式

**用户故事：** 作为一名开发者，我希望系统集成常用的日期处理和工具函数库，并提供统一的公共样式规范，以便在业务开发中能够高效地处理日期格式化、数据操作和样式复用。

#### 验收标准

1. THE Lib_Integration SHALL 在 `src/utils` 目录下统一管理所有工具库的封装和导出
2. THE Dayjs_Wrapper SHALL 集成 dayjs 库，并预配置中文语言包和常用插件（relativeTime、customParseFormat）
3. THE Dayjs_Wrapper SHALL 导出统一的日期格式化方法 `formatDate`，接收日期值和格式字符串参数，返回格式化后的日期字符串
4. THE Dayjs_Wrapper SHALL 导出统一的相对时间方法 `fromNow`，接收日期值参数，返回相对于当前时间的描述文本
5. THE Lodash_Wrapper SHALL 集成 lodash-es 库，并从 `src/utils/lodash.ts` 按需导出常用工具函数
6. THE Lodash_Wrapper SHALL 导出以下常用工具函数：`debounce`（防抖）、`throttle`（节流）、`cloneDeep`（深拷贝）、`merge`（深合并）、`isEmpty`（空值判断）、`get`（安全取值）
7. THE Style_Utility SHALL 在 `src/styles` 目录下提供全局样式文件，包含 CSS 变量定义（颜色、字体、间距等设计令牌）
8. THE Style_Utility SHALL 提供常用的 CSS 工具类，包括布局类（flex 居中、栅格）、间距类（margin、padding）、文本类（对齐、截断、省略）
9. THE Style_Utility SHALL 在 `main.ts` 中全局引入，确保所有组件均可使用公共样式
10. THE Lib_Integration SHALL 为每个工具库封装提供使用示例文件，放置在 `src/utils/examples` 目录下

### 需求 17：图表组件集成

**用户故事：** 作为一名开发者，我希望系统集成 ECharts 和 G2 图表库并提供统一的图表组件封装，以便在业务开发中能够快速实现数据可视化需求，同时保持图表组件的一致性和可维护性。

#### 验收标准

1. THE Chart_Wrapper SHALL 在 `src/components/third-party/charts` 目录下统一管理所有图表组件的封装代码
2. THE ECharts_Component SHALL 基于 ECharts 封装为一个 Vue 组件，通过 `option` 属性接收 ECharts 配置对象
3. THE ECharts_Component SHALL 支持通过 `width` 和 `height` 属性设置图表容器尺寸，默认宽度为 `100%`，默认高度为 `400px`
4. WHEN 图表容器的父元素尺寸发生变化时, THE ECharts_Component SHALL 自动调用 ECharts 的 `resize` 方法重新适配图表尺寸
5. THE ECharts_Component SHALL 支持通过 `theme` 属性切换 ECharts 主题，支持 `light` 和 `dark` 两种内置主题
6. WHEN `option` 属性的值发生变化时, THE ECharts_Component SHALL 调用 ECharts 的 `setOption` 方法更新图表配置
7. WHEN ECharts_Component 组件销毁时, THE ECharts_Component SHALL 调用 ECharts 的 `dispose` 方法释放图表实例资源
8. THE G2_Component SHALL 基于 AntV G2 封装为一个 Vue 组件，通过 `options` 属性接收 G2 图表配置对象
9. THE G2_Component SHALL 支持通过 `width` 和 `height` 属性设置图表容器尺寸，默认宽度为 `100%`，默认高度为 `400px`
10. WHEN 图表容器的父元素尺寸发生变化时, THE G2_Component SHALL 自动触发 G2 图表的重新渲染以适配新尺寸
11. THE G2_Component SHALL 支持通过 `theme` 属性切换 G2 主题，支持 `light` 和 `dark` 两种主题配置
12. WHEN `options` 属性的值发生变化时, THE G2_Component SHALL 重新渲染图表以反映最新配置
13. WHEN G2_Component 组件销毁时, THE G2_Component SHALL 调用 G2 图表实例的销毁方法释放资源
14. THE Chart_Wrapper SHALL 为 ECharts_Component 和 G2_Component 提供统一的 TypeScript 类型定义
15. IF 图表库加载失败或初始化异常, THEN THE Chart_Wrapper SHALL 捕获错误并在图表区域显示友好的降级提示信息
16. THE Chart_Wrapper SHALL 为每个图表组件提供使用示例，包含折线图、柱状图和饼图的基本配置示例

### 需求 18：动态路由

**用户故事：** 作为一名开发者，我希望系统支持基于用户角色和权限的动态路由注册机制，以便登录后仅加载用户有权访问的路由，提升安全性和灵活性。

#### 验收标准

1. THE Dynamic_Router SHALL 维护一份完整的 Dynamic_Routes 路由配置表，包含所有需要权限控制的业务路由及其对应的权限标识
2. THE Dynamic_Router SHALL 提供 `generateRoutes` 方法，接收权限列表参数，返回当前用户有权访问的路由配置数组
3. WHEN 用户登录成功且权限列表加载完成后, THE Dynamic_Router SHALL 调用 `generateRoutes` 方法筛选路由，并通过 Vue Router 的 `addRoute` 方法逐一注册到路由实例中
4. THE Dynamic_Router SHALL 为每条动态路由配置 `meta` 字段，包含 `permissions`（所需权限标识数组）和 `roles`（所需角色数组）属性
5. WHEN 页面刷新时, THE Dynamic_Router SHALL 在路由守卫中检测动态路由是否已注册，若未注册则重新执行动态路由注册流程
6. THE Dynamic_Router SHALL 提供 `resetRoutes` 方法，移除所有已动态注册的路由并将路由实例恢复为仅包含 Static_Routes 的状态
7. WHEN 用户退出登录时, THE Dynamic_Router SHALL 调用 `resetRoutes` 方法清除动态路由
8. THE Dynamic_Router SHALL 将动态路由配置中的 `component` 字段使用动态导入（`() => import(...)` ）实现路由组件的懒加载

### 需求 19：环境变量配置

**用户故事：** 作为一名开发者，我希望系统支持基于 Vite 的多环境变量配置，以便在不同环境（开发、生产）下使用不同的 API 地址和应用配置，无需修改代码。

#### 验收标准

1. THE Env_Config SHALL 提供 `.env` 文件，定义所有环境通用的环境变量
2. THE Env_Config SHALL 提供 `.env.development` 文件，定义开发环境专用的环境变量
3. THE Env_Config SHALL 提供 `.env.production` 文件，定义生产环境专用的环境变量
4. THE Env_Config SHALL 定义 `VITE_APP_TITLE` 环境变量，用于配置应用标题
5. THE Env_Config SHALL 定义 `VITE_APP_API_BASE_URL` 环境变量，用于配置 API 请求的基础 URL
6. THE Env_Config SHALL 定义 `VITE_APP_MOCK_ENABLED` 环境变量，用于控制 Mock_Service 的启用状态
7. THE HTTP_Client SHALL 从 `VITE_APP_API_BASE_URL` 环境变量读取 API 基础 URL，替代硬编码的基础地址
8. THE Admin_Dashboard SHALL 提供 `src/utils/env.ts` 工具模块，封装 `import.meta.env` 的类型安全访问方法
9. THE Env_Config SHALL 在 `env.d.ts` 类型声明文件中为所有自定义环境变量提供 TypeScript 类型定义
