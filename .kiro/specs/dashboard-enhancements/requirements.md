# 需求文档

## 简介

本需求文档描述对现有 Admin Dashboard 后台管理系统的六项功能增强：（1）全屏切换功能，允许用户在后台管理系统中进入和退出浏览器全屏模式；（2）全局暗黑模式切换，支持亮色、暗色和跟随系统三种主题模式；（3）退出登录确认提示，防止用户误操作退出；（4）角色管理页面完整 CRUD 交互，将现有静态数据展示升级为具备新增、编辑、删除、权限配置等完整交互逻辑的功能页面；（5）左侧导航菜单新增"规则示例"分类，包含迷宫生成与求解等算法可视化示例页面；（6）权限管理菜单下新增 HTTP 状态码展示页面，涵盖 200、204、301、400、401、403、404、500、502、503、504 等常见状态码。所有新增功能均需支持现有的中英文国际化体系，并遵循项目已有的技术栈和代码规范（Vue 3 + TypeScript + Naive UI + Pinia）。

## 术语表

- **Fullscreen_Toggle（全屏切换组件）**: 位于 Header 顶部栏中的全屏切换按钮，用于控制浏览器全屏模式的进入和退出
- **Fullscreen_API（全屏 API）**: 浏览器原生提供的 Fullscreen API（`document.fullscreenElement`、`document.documentElement.requestFullscreen`、`document.exitFullscreen`），用于控制页面全屏状态
- **useFullscreen（全屏 Hook）**: 封装全屏状态管理逻辑的 Vue 3 Composable 函数，提供全屏状态查询和切换方法
- **Role_Management_Page（角色管理页面）**: 位于 `src/views/system/RoleManagement.vue` 的角色管理页面，提供角色的增删改查和权限配置功能
- **Role_Form_Dialog（角色表单弹窗）**: 用于新增和编辑角色信息的 Naive UI 模态弹窗组件，包含角色名称、角色标识、描述、状态等表单字段
- **Role_Delete_Confirm（角色删除确认）**: 删除角色前的二次确认弹窗，防止误操作
- **Role_Permission_Dialog（角色权限配置弹窗）**: 用于查看和配置角色权限的模态弹窗，以树形结构展示权限项并支持勾选
- **Role_API（角色 API）**: 角色管理相关的 Mock API 接口集合，包含角色列表查询、新增、编辑、删除和权限配置接口
- **Rule_Examples（规则示例）**: 左侧导航菜单中新增的一级菜单分类，包含算法和规则的可视化示例页面
- **Maze_Generator（迷宫生成器）**: 规则示例中的迷宫生成与求解可视化页面，支持多种迷宫生成算法和路径求解算法的动画展示
- **Sorting_Visualizer（排序可视化器）**: 规则示例中的排序算法可视化页面，以动画形式展示不同排序算法的执行过程
- **Game_Of_Life（生命游戏）**: 规则示例中的 Conway 生命游戏可视化页面，展示元胞自动机的演化规则
- **Theme_Switcher（主题切换器）**: 位于 Header 顶部栏中全屏按钮左侧的下拉菜单，用于切换全局主题模式（亮色/暗色/跟随系统）
- **useThemeMode（主题模式 Hook）**: 封装主题模式管理逻辑的 Vue 3 Composable 函数，提供主题状态查询、切换方法和系统主题偏好监听
- **Logout_Confirm（退出登录确认）**: 用户点击退出登录按钮后弹出的二次确认弹窗，防止误操作
- **HTTP_Status_Pages（HTTP 状态码页面）**: 权限管理菜单下新增的一组 HTTP 状态码展示页面，每个页面展示对应状态码的含义、描述和视觉效果

## 需求

### 需求 1：全屏切换功能

**用户故事：** 作为一名管理员，我希望在后台管理系统的顶部栏中能够一键切换浏览器全屏模式，以便在需要专注操作时获得更大的可视区域。

#### 验收标准

1. THE Header SHALL 在右侧操作区域提供一个 Fullscreen_Toggle 按钮，位于语言切换器左侧
2. WHEN 用户点击 Fullscreen_Toggle 按钮且当前处于非全屏状态时, THE useFullscreen SHALL 调用 Fullscreen_API 的 `requestFullscreen` 方法使页面进入全屏模式
3. WHEN 用户点击 Fullscreen_Toggle 按钮且当前处于全屏状态时, THE useFullscreen SHALL 调用 Fullscreen_API 的 `exitFullscreen` 方法使页面退出全屏模式
4. WHILE 页面处于全屏状态时, THE Fullscreen_Toggle SHALL 显示"退出全屏"图标以指示当前状态
5. WHILE 页面处于非全屏状态时, THE Fullscreen_Toggle SHALL 显示"进入全屏"图标以指示当前状态
6. WHEN 用户通过键盘 Esc 键或浏览器原生方式退出全屏时, THE useFullscreen SHALL 监听 `fullscreenchange` 事件并同步更新全屏状态
7. THE useFullscreen SHALL 作为 Vue 3 Composable 函数封装在 `src/composables/useFullscreen.ts` 中，提供 `isFullscreen` 响应式状态和 `toggleFullscreen` 方法
8. THE Fullscreen_Toggle SHALL 支持 I18n_Module 的多语言文本显示，tooltip 提示文字可通过语言包切换

### 需求 2：全局暗黑模式切换

**用户故事：** 作为一名管理员，我希望能够在后台管理系统中切换亮色、暗色或跟随系统的主题模式，以便在不同光线环境下获得舒适的视觉体验。

#### 验收标准

1. THE Header SHALL 在右侧操作区域提供一个 Theme_Switcher 下拉菜单，位于 Fullscreen_Toggle 按钮左侧
2. THE Theme_Switcher SHALL 提供三个选项：亮色模式（Light）、暗色模式（Dark）、跟随系统（System）
3. WHEN 用户选择"亮色模式"时, THE useThemeMode SHALL 将 Naive UI 的全局主题设置为 null（默认亮色主题）
4. WHEN 用户选择"暗色模式"时, THE useThemeMode SHALL 将 Naive UI 的全局主题设置为 darkTheme
5. WHEN 用户选择"跟随系统"时, THE useThemeMode SHALL 通过 `window.matchMedia('(prefers-color-scheme: dark)')` 检测系统主题偏好，并自动应用对应主题
6. WHILE 主题模式设置为"跟随系统"时, THE useThemeMode SHALL 监听系统主题偏好变化事件，实时同步切换主题
7. THE useThemeMode SHALL 将用户选择的主题模式持久化到 localStorage，应用重新加载后恢复用户偏好
8. THE useThemeMode SHALL 作为 Vue 3 Composable 函数封装在 `src/composables/useThemeMode.ts` 中，提供 `themeMode` 响应式状态、`setThemeMode` 方法和 `naiveTheme` 计算属性
9. THE Theme_Switcher SHALL 根据当前激活的主题模式显示对应的图标（如 ☀️ 亮色、🌙 暗色、💻 系统）
10. THE Theme_Switcher SHALL 支持 I18n_Module 的多语言文本显示，下拉选项文字可通过语言包切换

### 需求 3：退出登录确认提示

**用户故事：** 作为一名管理员，我希望在点击退出登录按钮时系统弹出确认提示，以防止因误操作而意外退出系统。

#### 验收标准

1. WHEN 用户点击 Header 中的退出登录按钮时, THE Header SHALL 弹出 Logout_Confirm 确认弹窗，而非直接执行退出操作
2. THE Logout_Confirm SHALL 显示确认提示文字（如"确定要退出登录吗？"）
3. WHEN 用户在 Logout_Confirm 中点击确认时, THE Header SHALL 执行退出登录逻辑（清除认证信息、清除权限、移除动态路由、导航到登录页）
4. WHEN 用户在 Logout_Confirm 中点击取消时, THE Header SHALL 关闭确认弹窗，不执行退出操作
5. THE Logout_Confirm SHALL 支持 I18n_Module 的多语言文本显示，确认提示文字和按钮文字可通过语言包切换

### 需求 4：角色管理完整 CRUD 交互

**用户故事：** 作为一名系统管理员，我希望角色管理页面具备完整的增删改查交互功能，以便我能够管理系统中的角色信息和权限配置，而不仅仅是查看静态数据。

#### 验收标准

1. THE Role_Management_Page SHALL 从 Role_API 获取角色列表数据，替代现有的静态硬编码数据
2. WHEN 用户点击"添加"按钮时, THE Role_Management_Page SHALL 打开 Role_Form_Dialog，表单字段为空，标题显示为"新增角色"
3. THE Role_Form_Dialog SHALL 包含以下表单字段：角色名称（必填）、角色标识（必填）、描述（选填）、状态（启用/禁用开关）
4. WHEN 用户在 Role_Form_Dialog 中提交空的角色名称或角色标识时, THE Role_Form_Dialog SHALL 显示表单验证错误提示，阻止提交
5. WHEN 用户在新增模式下填写完表单并点击确认时, THE Role_Management_Page SHALL 调用 Role_API 的新增接口，成功后刷新角色列表并关闭弹窗
6. WHEN 用户点击角色列表中某行的"编辑"按钮时, THE Role_Management_Page SHALL 打开 Role_Form_Dialog，表单字段预填充该角色的现有数据，标题显示为"编辑角色"
7. WHEN 用户在编辑模式下修改表单并点击确认时, THE Role_Management_Page SHALL 调用 Role_API 的编辑接口，成功后刷新角色列表并关闭弹窗
8. WHEN 用户点击角色列表中某行的"删除"按钮时, THE Role_Management_Page SHALL 弹出 Role_Delete_Confirm 确认弹窗，显示待删除角色的名称
9. WHEN 用户在 Role_Delete_Confirm 中点击确认时, THE Role_Management_Page SHALL 调用 Role_API 的删除接口，成功后刷新角色列表
10. WHEN 用户在 Role_Delete_Confirm 中点击取消时, THE Role_Management_Page SHALL 关闭确认弹窗，不执行删除操作
11. WHEN 用户点击角色列表中某行的"权限"按钮时, THE Role_Management_Page SHALL 打开 Role_Permission_Dialog，以树形结构展示系统权限项，并勾选该角色已拥有的权限
12. WHEN 用户在 Role_Permission_Dialog 中修改权限勾选并点击确认时, THE Role_Management_Page SHALL 调用 Role_API 的权限配置接口，成功后刷新角色列表
13. THE Role_API SHALL 在 `src/api/mock/role.ts` 中实现角色管理的 Mock 接口，包含列表查询、新增、编辑、删除和权限配置五个接口
14. IF Role_API 请求失败, THEN THE Role_Management_Page SHALL 显示 Naive UI 错误通知提示
15. THE Role_Management_Page SHALL 支持 I18n_Module 的多语言文本显示，所有按钮文字、弹窗标题、表单标签和提示信息均可通过语言包切换
16. WHILE 角色列表数据正在加载时, THE Role_Management_Page SHALL 在表格区域显示加载状态

### 需求 5：左侧菜单新增规则示例分类

**用户故事：** 作为一名开发者或学习者，我希望后台管理系统的左侧导航菜单中包含一个"规则示例"分类，以便我能够浏览和体验有趣的算法与规则可视化示例。

#### 验收标准

1. THE Sidebar SHALL 在导航菜单中新增一个名为"规则示例"的一级菜单项，使用合适的图标（如 🧪 或 🎯）
2. THE Rule_Examples 菜单项 SHALL 包含以下子菜单项：迷宫生成与求解（Maze_Generator）、排序可视化（Sorting_Visualizer）、生命游戏（Game_Of_Life）
3. THE Router SHALL 为每个规则示例页面配置对应的路由，路径格式为 `/rules/{example-name}`
4. THE Maze_Generator SHALL 提供一个交互式迷宫可视化页面，支持用户选择迷宫生成算法（至少包含递归回溯法和 Prim 算法）
5. THE Maze_Generator SHALL 支持用户选择路径求解算法（至少包含 BFS 广度优先搜索和 DFS 深度优先搜索）
6. THE Maze_Generator SHALL 以网格形式渲染迷宫，使用不同颜色区分墙壁、通道、起点、终点和求解路径
7. WHEN 用户点击"生成迷宫"按钮时, THE Maze_Generator SHALL 以动画形式逐步展示迷宫的生成过程
8. WHEN 用户点击"求解迷宫"按钮时, THE Maze_Generator SHALL 以动画形式逐步展示路径搜索和求解过程
9. THE Maze_Generator SHALL 提供速度控制滑块，允许用户调节动画播放速度
10. THE Maze_Generator SHALL 提供迷宫尺寸配置选项，允许用户设置迷宫的行数和列数
11. THE Sorting_Visualizer SHALL 提供一个排序算法可视化页面，支持用户选择排序算法（至少包含冒泡排序、快速排序、归并排序和插入排序）
12. THE Sorting_Visualizer SHALL 以柱状图形式渲染待排序数组，柱子高度对应数组元素值
13. WHEN 用户点击"开始排序"按钮时, THE Sorting_Visualizer SHALL 以动画形式逐步展示排序过程，高亮当前正在比较和交换的元素
14. THE Sorting_Visualizer SHALL 提供速度控制滑块和数组大小配置选项
15. THE Game_Of_Life SHALL 提供一个 Conway 生命游戏可视化页面，以网格形式渲染细胞状态
16. WHEN 用户点击网格中的单元格时, THE Game_Of_Life SHALL 切换该单元格的存活/死亡状态
17. WHEN 用户点击"开始演化"按钮时, THE Game_Of_Life SHALL 按照生命游戏规则自动推进每一代的演化，并以动画形式更新网格
18. THE Game_Of_Life SHALL 提供"暂停"、"单步"和"重置"控制按钮
19. THE Game_Of_Life SHALL 提供预设模式选择（如滑翔机、脉冲星、高斯帕滑翔机枪等经典图案）
20. THE Rule_Examples 的所有页面 SHALL 支持 I18n_Module 的多语言文本显示，页面标题、按钮文字和控制标签均可通过语言包切换
21. THE Rule_Examples 的所有可视化渲染 SHALL 使用 Canvas API 或 CSS Grid 实现，确保在大尺寸网格下保持流畅的渲染性能

### 需求 6：权限管理菜单下新增 HTTP 状态码页面

**用户故事：** 作为一名开发者，我希望在权限管理菜单下能够查看各种 HTTP 状态码的展示页面，以便了解不同状态码的含义和视觉呈现效果。

#### 验收标准

1. THE Sidebar SHALL 在权限管理菜单项下新增一个"HTTP 状态码"子菜单分组，包含以下状态码页面：200、204、301、400、401、403、404、500、502、503、504
2. THE Router SHALL 为每个 HTTP 状态码页面配置对应的路由，路径格式为 `/permission/http-{code}`（如 `/permission/http-200`、`/permission/http-404`）
3. EACH HTTP_Status_Page SHALL 以居中布局展示状态码数字、状态码名称、状态码描述说明
4. THE HTTP_Status_Page 200 SHALL 显示 "200 OK" 及"请求成功"的描述，使用成功状态的视觉样式（绿色系）
5. THE HTTP_Status_Page 204 SHALL 显示 "204 No Content" 及"请求成功但无返回内容"的描述，使用成功状态的视觉样式
6. THE HTTP_Status_Page 301 SHALL 显示 "301 Moved Permanently" 及"资源已永久移动"的描述，使用信息状态的视觉样式（蓝色系）
7. THE HTTP_Status_Page 400 SHALL 显示 "400 Bad Request" 及"请求参数错误"的描述，使用警告状态的视觉样式（橙色系）
8. THE HTTP_Status_Page 401 SHALL 显示 "401 Unauthorized" 及"未授权/登录已过期"的描述，使用警告状态的视觉样式，并提供"重新登录"按钮
9. THE HTTP_Status_Page 403 SHALL 显示 "403 Forbidden" 及"无权限访问"的描述，使用警告状态的视觉样式，并提供"返回首页"按钮
10. THE HTTP_Status_Page 404 SHALL 显示 "404 Not Found" 及"页面不存在"的描述，使用警告状态的视觉样式，并提供"返回首页"按钮
11. THE HTTP_Status_Page 500 SHALL 显示 "500 Internal Server Error" 及"服务器内部错误"的描述，使用错误状态的视觉样式（红色系），并提供"返回首页"按钮
12. THE HTTP_Status_Page 502 SHALL 显示 "502 Bad Gateway" 及"网关错误"的描述，使用错误状态的视觉样式
13. THE HTTP_Status_Page 503 SHALL 显示 "503 Service Unavailable" 及"服务不可用"的描述，使用错误状态的视觉样式
14. THE HTTP_Status_Page 504 SHALL 显示 "504 Gateway Timeout" 及"网关超时"的描述，使用错误状态的视觉样式
15. ALL HTTP_Status_Pages SHALL 使用 Naive UI NResult 组件保持与现有错误页面（Error401、Error403、Error404、Error500）一致的视觉风格
16. ALL HTTP_Status_Pages SHALL 支持 I18n_Module 的多语言文本显示，状态码名称、描述和按钮文字均可通过语言包切换
