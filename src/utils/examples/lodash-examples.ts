/**
 * lodash-es 工具模块使用示例
 *
 * 本文件展示 src/utils/lodash.ts 中按需导出的常用工具函数的用法。
 */

import { debounce, throttle, cloneDeep, merge, isEmpty, get } from '@/utils/lodash'

// ============================================================
// 1. debounce — 防抖
// ============================================================

// 搜索输入框防抖：用户停止输入 300ms 后才执行搜索
const handleSearch = debounce((keyword: string) => {
  console.log('执行搜索:', keyword)
}, 300)

// 模拟连续输入
handleSearch('v')
handleSearch('vu')
handleSearch('vue') // 只有最后一次会在 300ms 后执行

// ============================================================
// 2. throttle — 节流
// ============================================================

// 滚动事件节流：每 200ms 最多执行一次
const handleScroll = throttle(() => {
  console.log('处理滚动事件, scrollTop:', document.documentElement.scrollTop)
}, 200)

// 绑定到 window scroll 事件
// window.addEventListener('scroll', handleScroll)

// ============================================================
// 3. cloneDeep — 深拷贝
// ============================================================

const original = {
  name: 'Admin',
  settings: {
    theme: 'dark',
    notifications: { email: true, sms: false },
  },
  tags: ['admin', 'active'],
}

const cloned = cloneDeep(original)
cloned.settings.theme = 'light'
cloned.tags.push('modified')

console.log('原始对象 theme:', original.settings.theme) // 'dark'（未被修改）
console.log('克隆对象 theme:', cloned.settings.theme)   // 'light'
console.log('原始对象 tags:', original.tags)             // ['admin', 'active']
console.log('克隆对象 tags:', cloned.tags)               // ['admin', 'active', 'modified']

// ============================================================
// 4. merge — 深合并
// ============================================================

const defaultConfig = {
  api: { timeout: 5000, retries: 3 },
  ui: { theme: 'light', language: 'zh-CN' },
}

const userConfig = {
  api: { timeout: 10000 },
  ui: { theme: 'dark' },
}

const finalConfig = merge({}, defaultConfig, userConfig)
console.log('合并后配置:', finalConfig)
// { api: { timeout: 10000, retries: 3 }, ui: { theme: 'dark', language: 'zh-CN' } }

// ============================================================
// 5. isEmpty — 空值判断
// ============================================================

console.log('isEmpty({}):', isEmpty({}))           // true
console.log('isEmpty([]):', isEmpty([]))           // true
console.log('isEmpty(""):', isEmpty(''))           // true
console.log('isEmpty(null):', isEmpty(null))       // true
console.log('isEmpty({ a: 1 }):', isEmpty({ a: 1 })) // false
console.log('isEmpty([1]):', isEmpty([1]))         // false
console.log('isEmpty("hello"):', isEmpty('hello')) // false

// ============================================================
// 6. get — 安全取值
// ============================================================

const response = {
  data: {
    user: {
      profile: { name: '张三', age: 28 },
      roles: ['admin'],
    },
  },
}

// 安全访问深层嵌套属性
const userName = get(response, 'data.user.profile.name', '未知用户')
console.log('用户名:', userName) // '张三'

// 路径不存在时返回默认值
const email = get(response, 'data.user.profile.email', '未设置')
console.log('邮箱:', email) // '未设置'

// 使用数组路径语法
const firstRole = get(response, 'data.user.roles[0]', 'guest')
console.log('首个角色:', firstRole) // 'admin'

export { handleSearch, handleScroll, cloned, finalConfig, userName, email, firstRole }
