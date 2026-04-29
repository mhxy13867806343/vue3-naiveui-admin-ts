# 实现计划：Dashboard 功能增强

## 概述

本实现计划将设计文档中的六项功能增强拆分为可执行的编码任务，按照增量构建的方式组织。每个任务在前一个任务的基础上递进，最终将所有功能集成到一起。技术栈为 Vue 3 + TypeScript + Naive UI + Pinia + vue-i18n。

## 任务

- [x] 1. 配置测试框架
  - 安装 Vitest、fast-check 和 @vue/test-utils 依赖
  - 创建 `vitest.config.ts` 配置文件，配置路径别名 `@` 指向 `src/`
  - 在 `package.json` 中添加 `test` 脚本
  - _需求: 全部（测试基础设施）_

- [x] 2. 新增类型定义和国际化文本
  - [x] 2.1 扩展类型定义
    - 在 `src/types/index.ts` 中新增 `RoleItem`、`RoleFormData`、`ThemeMode`、`CellType`、`MazeGrid`、`MazeStep`、`SortStep`、`HttpStatusConfig` 等类型接口
    - _需求: 4.3, 4.13, 2.8, 5.4, 5.11, 6.3_
  - [x] 2.2 扩展中英文国际化语言包
    - 在 `src/locales/zh-CN.ts` 中新增 `header`（全屏、主题、退出确认）、`role`（角色管理 CRUD）、`rules`（规则示例）、`httpStatus`（HTTP 状态码）相关文本
    - 在 `src/locales/en-US.ts` 中新增对应的英文文本
    - _需求: 1.8, 2.10, 3.5, 4.15, 5.20, 6.16_

- [x] 3. 实现全屏切换功能
  - [x] 3.1 创建 `src/composables/useFullscreen.ts`
    - 实现 `useFullscreen` composable，提供 `isFullscreen` 响应式状态和 `toggleFullscreen` 方法
    - 使用 `useEventListener` 监听 `fullscreenchange` 事件同步状态
    - 组件卸载时自动清理事件监听
    - _需求: 1.2, 1.3, 1.6, 1.7_
  - [ ]* 3.2 编写 `useFullscreen` 单元测试
    - 创建 `src/composables/__tests__/useFullscreen.test.ts`
    - 测试全屏状态切换、事件监听、API 调用
    - _需求: 1.2, 1.3, 1.6_

- [x] 4. 实现暗黑模式切换功能
  - [x] 4.1 创建 `src/composables/useThemeMode.ts`
    - 实现 `useThemeMode` composable，提供 `themeMode`、`setThemeMode`、`naiveTheme` 接口
    - 从 localStorage 读取/写入主题偏好，支持 `'light' | 'dark' | 'system'` 三种模式
    - `'system'` 模式下通过 `matchMedia` 监听系统主题变化
    - `naiveTheme` 计算属性返回 `null`（亮色）或 `darkTheme`（暗色）
    - _需求: 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_
  - [ ]* 4.2 编写 `useThemeMode` 单元测试
    - 创建 `src/composables/__tests__/useThemeMode.test.ts`
    - 测试模式切换、localStorage 持久化、系统主题检测、无效值回退
    - _需求: 2.3, 2.4, 2.5, 2.7_
  - [x] 4.3 集成主题到 `App.vue`
    - 在 `App.vue` 中引入 `useThemeMode`，使用 `<NConfigProvider :theme="naiveTheme">` 包裹应用根组件
    - _需求: 2.3, 2.4_

- [x] 5. 修改 Header 组件（全屏、主题、退出确认）
  - [x] 5.1 集成全屏按钮和主题切换下拉菜单到 Header
    - 在 `src/layouts/Header.vue` 右侧操作区域添加主题切换 `NDropdown`（三个选项 + 图标）和全屏切换 `NButton`（带 tooltip）
    - 布局顺序：用户名 → 主题切换 → 全屏按钮 → 语言切换 → 退出登录
    - _需求: 1.1, 1.4, 1.5, 1.8, 2.1, 2.2, 2.9, 2.10_
  - [x] 5.2 实现退出登录确认弹窗
    - 修改 `handleLogout` 方法，使用 `useDialog` 弹出 `NDialog.warning()` 确认框
    - 确认后执行原有退出逻辑，取消则关闭弹窗
    - _需求: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 6. 检查点 - 确保全屏、主题、退出确认功能正常
  - 确保所有测试通过，如有疑问请询问用户。

- [x] 7. 实现角色管理 CRUD
  - [x] 7.1 创建角色 Mock API
    - 创建 `src/api/mock/role.ts`，实现内存数组存储的角色 CRUD Mock 数据
    - 包含 `handleRoleListMock`、`handleRoleCreateMock`、`handleRoleUpdateMock`、`handleRoleDeleteMock`、`handleRolePermissionMock` 五个函数
    - _需求: 4.13_
  - [x] 7.2 在 API 层导出角色接口
    - 在 `src/api/index.ts` 中新增 `apiGetRoles`、`apiCreateRole`、`apiUpdateRole`、`apiDeleteRole`、`apiUpdateRolePermission` 导出函数
    - _需求: 4.1, 4.5, 4.7, 4.9, 4.12_
  - [ ]* 7.3 编写角色 Mock API 单元测试
    - 创建 `src/api/mock/__tests__/role.test.ts`
    - 测试 CRUD 操作返回值正确性
    - _需求: 4.13_
  - [x] 7.4 重构 `RoleManagement.vue` 实现完整 CRUD
    - 从 API 加载角色列表数据，替代静态硬编码数据
    - 实现新增/编辑角色表单弹窗（`NModal` + `NForm`），包含角色名称（必填）、角色标识（必填）、描述、状态字段
    - 实现删除确认弹窗（`useDialog`）
    - 实现权限配置弹窗（`NModal` + `NTree`）
    - 使用 `useLoading` 管理表格加载状态
    - API 请求失败时使用 `useMessage` 显示错误通知
    - _需求: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11, 4.12, 4.14, 4.15, 4.16_

- [x] 8. 检查点 - 确保角色管理 CRUD 功能正常
  - 确保所有测试通过，如有疑问请询问用户。

- [x] 9. 实现规则示例 - 迷宫生成与求解
  - [x] 9.1 创建迷宫算法核心逻辑
    - 创建 `src/views/rules/mazeAlgorithms.ts`，实现 `generateMazeRecursiveBacktrack` 和 `generateMazePrim` 生成器函数
    - 创建 `src/views/rules/mazeSolvers.ts`，实现 `solveBFS` 和 `solveDFS` 生成器函数
    - 算法以 Generator 形式实现，每次 yield 一个 `MazeStep`
    - _需求: 5.4, 5.5_
  - [ ]* 9.2 编写迷宫生成有效性属性测试
    - 创建 `src/views/rules/__tests__/mazeAlgorithms.prop.test.ts`
    - **Property 1: 迷宫生成有效性** — 验证生成的迷宫网格尺寸正确、存在唯一起点和终点、起点到终点可达
    - **验证需求: 5.4**
  - [ ]* 9.3 编写迷宫求解正确性属性测试
    - 创建 `src/views/rules/__tests__/mazeSolvers.prop.test.ts`
    - **Property 2: 迷宫求解正确性** — 验证求解路径起始于起点、终止于终点、每步相邻且为通道、无重复
    - **验证需求: 5.5**
  - [x] 9.4 创建 `MazeGenerator.vue` 页面组件
    - 实现控制面板（算法选择、尺寸配置、速度滑块）
    - 使用 Canvas API 渲染迷宫网格，不同 CellType 对应不同颜色
    - 通过 `requestAnimationFrame` + 速度控制逐步消费 Generator 实现动画
    - 组件卸载时清理 `requestAnimationFrame` 和定时器
    - _需求: 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.21_

- [ ] 10. 实现规则示例 - 排序可视化
  - [ ] 10.1 创建排序算法核心逻辑
    - 创建 `src/views/rules/sortAlgorithms.ts`，实现 `bubbleSort`、`quickSort`、`mergeSort`、`insertionSort` 生成器函数
    - 每次 yield 一个 `SortStep`（当前数组状态、比较索引、交换索引）
    - _需求: 5.11_
  - [ ]* 10.2 编写排序算法正确性属性测试
    - 创建 `src/views/rules/__tests__/sortAlgorithms.prop.test.ts`
    - **Property 3: 排序算法正确性** — 验证排序后数组单调非递减且为原数组的排列
    - **验证需求: 5.11**
  - [~] 10.3 创建 `SortingVisualizer.vue` 页面组件
    - 实现控制面板（算法选择、数组大小、速度滑块）
    - 使用 Canvas API 渲染柱状图，高亮比较和交换的元素
    - 通过 `requestAnimationFrame` + 速度控制实现动画
    - _需求: 5.11, 5.12, 5.13, 5.14, 5.21_

- [ ] 11. 实现规则示例 - 生命游戏
  - [~] 11.1 创建生命游戏核心逻辑
    - 创建 `src/views/rules/gameOfLife.ts`，实现 `nextGeneration`、`countNeighbors`、`toggleCell` 纯函数和预设图案数据
    - _需求: 5.15, 5.16, 5.17, 5.19_
  - [ ]* 11.2 编写单元格切换自反性属性测试
    - 创建 `src/views/rules/__tests__/gameOfLife.prop.test.ts`
    - **Property 4: 单元格切换自反性** — 验证对同一坐标执行两次 toggle 后网格恢复初始状态
    - **验证需求: 5.16**
  - [ ]* 11.3 编写生命游戏演化规则属性测试
    - 在 `src/views/rules/__tests__/gameOfLife.prop.test.ts` 中追加
    - **Property 5: 生命游戏演化规则正确性** — 验证 `nextGeneration` 结果中每个单元格严格遵循 Conway 规则
    - **验证需求: 5.17**
  - [~] 11.4 创建 `GameOfLife.vue` 页面组件
    - 实现控制面板（开始/暂停/单步/重置/预设模式/速度）
    - 使用 Canvas API 渲染网格，支持点击切换单元格状态
    - 实现自动演化动画和单步推进
    - _需求: 5.15, 5.16, 5.17, 5.18, 5.19, 5.21_

- [ ] 12. 检查点 - 确保规则示例三个页面功能正常
  - 确保所有测试通过，如有疑问请询问用户。

- [ ] 13. 实现 HTTP 状态码页面
  - [~] 13.1 创建 HTTP 状态码配置数据
    - 创建 `src/views/http-status/httpStatusConfig.ts`，定义 11 个状态码（200、204、301、400、401、403、404、500、502、503、504）的配置数据
    - 包含 code、name、i18nKey、type、showReLoginButton、showBackHomeButton 字段
    - _需求: 6.1, 6.4-6.14_
  - [ ]* 13.2 编写 HTTP 状态码配置单元测试
    - 创建 `src/views/http-status/__tests__/httpStatusConfig.test.ts`
    - 测试配置完整性（11 个状态码全部存在）、类型映射正确性
    - _需求: 6.4-6.14_
  - [~] 13.3 创建 `HttpStatusPage.vue` 通用组件
    - 通过路由参数 `:code` 获取当前状态码，从配置中查找对应数据
    - 使用 Naive UI `NResult` 组件渲染，视觉风格与现有 Error401/403/404/500 页面一致
    - 根据配置显示"重新登录"或"返回首页"按钮
    - 未知状态码显示通用提示页面
    - _需求: 6.3, 6.8, 6.9, 6.10, 6.11, 6.15, 6.16_

- [ ] 14. 配置路由和菜单集成
  - [~] 14.1 扩展路由配置
    - 在 `src/router/dynamic-routes.ts` 中新增规则示例路由（`/rules/maze`、`/rules/sorting`、`/rules/game-of-life`）和 HTTP 状态码动态路由（`/permission/http-:code`）
    - _需求: 5.3, 6.2_
  - [~] 14.2 扩展侧边栏菜单
    - 在 `src/layouts/Sidebar.vue` 中新增"规则示例"一级菜单项（含迷宫、排序、生命游戏子菜单）
    - 在权限管理菜单下新增"HTTP 状态码"子菜单分组（含 11 个状态码子项）
    - _需求: 5.1, 5.2, 6.1_
  - [~] 14.3 扩展 AdminLayout 路由映射和 Header 面包屑映射
    - 在 `src/layouts/AdminLayout.vue` 的 `pathToI18nKey` 中新增规则示例和 HTTP 状态码路由的映射
    - 在 `src/layouts/Header.vue` 的 `pathTitleMap` 中新增对应的面包屑映射
    - _需求: 5.3, 6.2_

- [ ] 15. 最终检查点 - 确保所有功能集成正常
  - 确保所有测试通过，如有疑问请询问用户。

## 备注

- 标记 `*` 的任务为可选任务，可跳过以加快 MVP 进度
- 每个任务引用了具体的需求编号，确保可追溯性
- 检查点任务确保增量验证
- 属性测试验证算法核心逻辑的通用正确性属性
- 单元测试验证具体示例和边界情况
