// 用户与认证

export interface UserInfo {
  username: string
  role: 'admin' | 'user'
  avatar?: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  userInfo: UserInfo
}

// 权限

export interface Permission {
  id: string
  name: string
  code: string // 权限标识，如 'dashboard:view'
  parentId?: string
}

export interface RolePermission {
  role: string
  roleName: string
  description: string
  permissions: string[] // 权限 code 列表
}

// 路由元信息

export interface RouteMeta {
  title: string
  icon?: string
  permissions?: string[]
  roles?: string[]
  hidden?: boolean // 是否在菜单中隐藏
}

// 菜单

export interface MenuItem {
  key: string
  label: string
  icon?: string
  path?: string
  children?: MenuItem[]
}

// 分页

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// Mock 数据结构

export interface MockResponse<T> {
  code: number
  message: string
  data: T
}

// 角色管理

/** 角色实体 */
export interface RoleItem {
  id: number
  name: string
  code: string
  description: string
  status: 'enabled' | 'disabled'
  permCount: number
  userCount: number
  permissions: string[]
  createTime: string
}

/** 角色表单数据 */
export interface RoleFormData {
  name: string
  code: string
  description: string
  status: 'enabled' | 'disabled'
}

// 主题模式

export type ThemeMode = 'light' | 'dark' | 'system'

// 迷宫

export type CellType = 'wall' | 'passage' | 'start' | 'end' | 'path' | 'visited'

export interface MazeGrid {
  rows: number
  cols: number
  cells: CellType[][]
}

export interface MazeStep {
  row: number
  col: number
  type: CellType
}

export type MazeAlgorithm = 'recursive-backtrack' | 'prim'
export type SolveAlgorithm = 'bfs' | 'dfs'

// 排序

export interface SortStep {
  array: number[]
  comparing: [number, number]
  swapping: [number, number] | null
}

export type SortAlgorithm = 'bubble' | 'quick' | 'merge' | 'insertion'

// 生命游戏

export type Grid = boolean[][]

export interface GameOfLifePreset {
  name: string
  i18nKey: string
  pattern: boolean[][]
  offset: { row: number; col: number }
}

// HTTP 状态码

export interface HttpStatusConfig {
  code: number
  name: string
  i18nKey: string
  type: 'success' | 'info' | 'warning' | 'error'
  showReLoginButton?: boolean
  showBackHomeButton?: boolean
}
