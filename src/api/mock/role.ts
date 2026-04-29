/**
 * 角色管理 Mock 数据
 * 内存数组存储，支持运行时增删改，页面刷新后重置
 */
import type { MockResponse, RoleItem } from '@/types'

/** 权限树数据（用于权限配置弹窗） */
export const allPermissions: string[] = [
  'dashboard:view',
  'dashboard:workspace',
  'dashboard:analytics',
  'system:user:view',
  'system:user:edit',
  'system:user:delete',
  'system:role:view',
  'system:role:edit',
  'system:menu:view',
  'system:menu:edit',
  'system:department:view',
  'system:department:edit',
  'content:article:view',
  'content:article:edit',
  'content:article:delete',
  'content:category:view',
  'content:category:edit',
  'content:tag:view',
  'content:tag:edit',
  'components:editor',
  'components:drag',
  'components:charts',
  'components:icons',
  'features:i18n',
  'features:clipboard',
  'features:print',
  'permission:view',
  'permission:edit',
  'about:view',
]

let nextId = 6

/** 角色列表（内存存储） */
const roles: RoleItem[] = [
  {
    id: 1,
    name: '超级管理员',
    code: 'super_admin',
    description: '拥有系统所有权限，可管理所有模块',
    status: 'enabled',
    permCount: 30,
    userCount: 2,
    permissions: [...allPermissions],
    createTime: '2024-01-01',
  },
  {
    id: 2,
    name: '管理员',
    code: 'admin',
    description: '拥有大部分管理权限，不可修改系统配置',
    status: 'enabled',
    permCount: 24,
    userCount: 5,
    permissions: allPermissions.slice(0, 24),
    createTime: '2024-01-01',
  },
  {
    id: 3,
    name: '编辑',
    code: 'editor',
    description: '可管理内容模块，包括文章、分类、标签',
    status: 'enabled',
    permCount: 12,
    userCount: 8,
    permissions: allPermissions.filter((p) => p.startsWith('content:') || p.startsWith('dashboard:')),
    createTime: '2024-01-05',
  },
  {
    id: 4,
    name: '普通用户',
    code: 'user',
    description: '仅有基础浏览权限',
    status: 'enabled',
    permCount: 6,
    userCount: 120,
    permissions: ['dashboard:view', 'dashboard:workspace', 'about:view', 'content:article:view', 'content:category:view', 'content:tag:view'],
    createTime: '2024-01-05',
  },
  {
    id: 5,
    name: '访客',
    code: 'viewer',
    description: '只读权限，仅可查看公开内容',
    status: 'disabled',
    permCount: 3,
    userCount: 500,
    permissions: ['dashboard:view', 'about:view', 'content:article:view'],
    createTime: '2024-02-01',
  },
]

/** 获取角色列表 */
export function handleRoleListMock(): MockResponse<RoleItem[]> {
  return {
    code: 200,
    message: 'success',
    data: roles.map((r) => ({ ...r })),
  }
}

/** 新增角色 */
export function handleRoleCreateMock(body: string | object): MockResponse<RoleItem> {
  const data = typeof body === 'string' ? JSON.parse(body) : body
  const newRole: RoleItem = {
    id: nextId++,
    name: data.name,
    code: data.code,
    description: data.description || '',
    status: data.status || 'enabled',
    permCount: 0,
    userCount: 0,
    permissions: [],
    createTime: new Date().toISOString().slice(0, 10),
  }
  roles.push(newRole)
  return {
    code: 200,
    message: '创建成功',
    data: { ...newRole },
  }
}

/** 编辑角色 */
export function handleRoleUpdateMock(body: string | object): MockResponse<null> {
  const data = typeof body === 'string' ? JSON.parse(body) : body
  const index = roles.findIndex((r) => r.id === data.id)
  if (index === -1) {
    return { code: 404, message: '角色不存在', data: null }
  }
  roles[index] = {
    ...roles[index],
    name: data.name ?? roles[index].name,
    code: data.code ?? roles[index].code,
    description: data.description ?? roles[index].description,
    status: data.status ?? roles[index].status,
  }
  return { code: 200, message: '更新成功', data: null }
}

/** 删除角色 */
export function handleRoleDeleteMock(id: number): MockResponse<null> {
  const index = roles.findIndex((r) => r.id === id)
  if (index === -1) {
    return { code: 404, message: '角色不存在', data: null }
  }
  roles.splice(index, 1)
  return { code: 200, message: '删除成功', data: null }
}

/** 更新角色权限 */
export function handleRolePermissionMock(body: string | object): MockResponse<null> {
  const data = typeof body === 'string' ? JSON.parse(body) : body
  const role = roles.find((r) => r.id === data.roleId)
  if (!role) {
    return { code: 404, message: '角色不存在', data: null }
  }
  role.permissions = data.permissions || []
  role.permCount = role.permissions.length
  return { code: 200, message: '权限更新成功', data: null }
}
