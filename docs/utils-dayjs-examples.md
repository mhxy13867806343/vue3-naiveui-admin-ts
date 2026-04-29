# dayjs 工具模块使用示例

本文档展示 `src/utils/dayjs.ts` 中导出方法的常见用法。

## 模块导入

```typescript
import dayjs, { formatDate, fromNow } from '@/utils/dayjs'
```

## 1. formatDate — 日期格式化

`formatDate(date, format?)` 接收日期值和可选的格式字符串，返回格式化后的日期字符串。

### 使用默认格式

默认格式为 `'YYYY-MM-DD HH:mm:ss'`。

```typescript
const now = formatDate(new Date())
// 输出示例: '2025-01-15 14:30:00'
```

### 自定义格式

```typescript
// 仅日期
const dateOnly = formatDate(new Date(), 'YYYY-MM-DD')
// 输出示例: '2025-01-15'

// 仅时间
const timeOnly = formatDate(new Date(), 'HH:mm')
// 输出示例: '14:30'

// 中文格式
const cnFormat = formatDate(new Date(), 'YYYY年MM月DD日')
// 输出示例: '2025年01月15日'
```

### 从不同类型的输入格式化

```typescript
// 从时间戳
const fromTimestamp = formatDate(1700000000000, 'YYYY-MM-DD')

// 从字符串
const fromString = formatDate('2025-06-15', 'MM/DD/YYYY')
// 输出: '06/15/2025'
```

## 2. fromNow — 相对时间

`fromNow(date)` 接收日期值，返回相对于当前时间的中文描述文本。

```typescript
import dayjs, { fromNow } from '@/utils/dayjs'

// 几分钟前
const fiveMinutesAgo = fromNow(dayjs().subtract(5, 'minute').toDate())
// 输出: '5 分钟前'

// 几小时前
const threeHoursAgo = fromNow(dayjs().subtract(3, 'hour').toDate())
// 输出: '3 小时前'

// 几天前
const twoDaysAgo = fromNow(dayjs().subtract(2, 'day').toDate())
// 输出: '2 天前'
```

## 3. 直接使用 dayjs 实例（高级用法）

dayjs 已预配置中文语言包和 `relativeTime`、`customParseFormat` 插件，可直接使用。

```typescript
import dayjs from '@/utils/dayjs'

// 自定义格式解析（customParseFormat 插件）
const customParsed = dayjs('15/01/2025', 'DD/MM/YYYY')
console.log(customParsed.format('YYYY-MM-DD'))
// 输出: '2025-01-15'

// 日期比较
const isBefore = dayjs('2025-01-01').isBefore('2025-06-01')
// 输出: true

// 日期加减
const nextWeek = dayjs().add(7, 'day').format('YYYY-MM-DD')
```

## 注意事项

- dayjs 默认已设置为中文语言环境（`zh-cn`），`fromNow` 返回的是中文描述
- `customParseFormat` 插件允许使用自定义格式字符串解析日期
- `relativeTime` 插件提供 `fromNow()` 等相对时间方法
