/**
 * dayjs 工具模块使用示例
 *
 * 本文件展示 src/utils/dayjs.ts 中导出方法的常见用法。
 */

import dayjs, { formatDate, fromNow } from '@/utils/dayjs'

// ============================================================
// 1. formatDate — 日期格式化
// ============================================================

// 使用默认格式 'YYYY-MM-DD HH:mm:ss'
const now = formatDate(new Date())
console.log('当前时间（默认格式）:', now)
// 输出示例: 2025-01-15 14:30:00

// 自定义格式
const dateOnly = formatDate(new Date(), 'YYYY-MM-DD')
console.log('仅日期:', dateOnly)
// 输出示例: 2025-01-15

const timeOnly = formatDate(new Date(), 'HH:mm')
console.log('仅时间:', timeOnly)
// 输出示例: 14:30

// 中文格式
const cnFormat = formatDate(new Date(), 'YYYY年MM月DD日')
console.log('中文日期:', cnFormat)
// 输出示例: 2025年01月15日

// 从时间戳格式化
const fromTimestamp = formatDate(1700000000000, 'YYYY-MM-DD')
console.log('时间戳格式化:', fromTimestamp)

// 从字符串格式化
const fromString = formatDate('2025-06-15', 'MM/DD/YYYY')
console.log('字符串格式化:', fromString)
// 输出示例: 06/15/2025

// ============================================================
// 2. fromNow — 相对时间
// ============================================================

// 几分钟前
const fiveMinutesAgo = fromNow(dayjs().subtract(5, 'minute').toDate())
console.log('5 分钟前:', fiveMinutesAgo)
// 输出示例: 5 分钟前

// 几小时前
const threeHoursAgo = fromNow(dayjs().subtract(3, 'hour').toDate())
console.log('3 小时前:', threeHoursAgo)
// 输出示例: 3 小时前

// 几天前
const twoDaysAgo = fromNow(dayjs().subtract(2, 'day').toDate())
console.log('2 天前:', twoDaysAgo)
// 输出示例: 2 天前

// ============================================================
// 3. 直接使用 dayjs 实例（高级用法）
// ============================================================

// dayjs 已预配置中文语言包和 relativeTime、customParseFormat 插件
const customParsed = dayjs('15/01/2025', 'DD/MM/YYYY')
console.log('自定义格式解析:', customParsed.format('YYYY-MM-DD'))
// 输出示例: 2025-01-15

// 日期比较
const isBefore = dayjs('2025-01-01').isBefore('2025-06-01')
console.log('2025-01-01 在 2025-06-01 之前:', isBefore)
// 输出: true

// 日期加减
const nextWeek = dayjs().add(7, 'day').format('YYYY-MM-DD')
console.log('一周后:', nextWeek)

export { now, dateOnly, timeOnly, cnFormat, fromTimestamp, fromString }
