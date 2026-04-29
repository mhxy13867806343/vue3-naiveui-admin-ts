# lodash-es 工具模块使用示例

本文档展示 `src/utils/lodash.ts` 中按需导出的常用工具函数的用法。

## 模块导入

```typescript
import { debounce, throttle, cloneDeep, merge, isEmpty, get } from '@/utils/lodash'
```

## 1. debounce — 防抖

在指定时间内如果再次触发则重新计时，适用于搜索输入、窗口 resize 等场景。

```typescript
// 搜索输入框防抖：用户停止输入 300ms 后才执行搜索
const handleSearch = debounce((keyword: string) => {
  console.log('执行搜索:', keyword)
}, 300)

// 模拟连续输入
handleSearch('v')
handleSearch('vu')
handleSearch('vue') // 只有最后一次会在 300ms 后执行
```

## 2. throttle — 节流

在指定时间内最多执行一次，适用于滚动事件、按钮点击等场景。

```typescript
// 滚动事件节流：每 200ms 最多执行一次
const handleScroll = throttle(() => {
  console.log('处理滚动事件, scrollTop:', document.documentElement.scrollTop)
}, 200)

window.addEventListener('scroll', handleScroll)
```

## 3. cloneDeep — 深拷贝

创建对象的深层副本，修改副本不会影响原始对象。

```typescript
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

console.log(original.settings.theme) // 'dark'（未被修改）
console.log(cloned.settings.theme)   // 'light'
console.log(original.tags)           // ['admin', 'active']
console.log(cloned.tags)             // ['admin', 'active', 'modified']
```

## 4. merge — 深合并

递归合并多个对象，后面的对象属性会覆盖前面的。

```typescript
const defaultConfig = {
  api: { timeout: 5000, retries: 3 },
  ui: { theme: 'light', language: 'zh-CN' },
}

const userConfig = {
  api: { timeout: 10000 },
  ui: { theme: 'dark' },
}

const finalConfig = merge({}, defaultConfig, userConfig)
// 结果: { api: { timeout: 10000, retries: 3 }, ui: { theme: 'dark', language: 'zh-CN' } }
```

## 5. isEmpty — 空值判断

判断值是否为空（空对象、空数组、空字符串、null、undefined）。

```typescript
isEmpty({})           // true
isEmpty([])           // true
isEmpty('')           // true
isEmpty(null)         // true
isEmpty({ a: 1 })    // false
isEmpty([1])          // false
isEmpty('hello')      // false
```

## 6. get — 安全取值

安全地访问深层嵌套属性，路径不存在时返回默认值。

```typescript
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
// 输出: '张三'

// 路径不存在时返回默认值
const email = get(response, 'data.user.profile.email', '未设置')
// 输出: '未设置'

// 使用数组路径语法
const firstRole = get(response, 'data.user.roles[0]', 'guest')
// 输出: 'admin'
```

## 注意事项

- 所有函数从 `lodash-es` 按需导出，支持 Tree Shaking，不会引入整个 lodash 库
- 如需其他 lodash 函数，可在 `src/utils/lodash.ts` 中添加导出
