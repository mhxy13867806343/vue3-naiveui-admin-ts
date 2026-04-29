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
