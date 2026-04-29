import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/zh-cn'

// 注册插件
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

// 设置默认语言为中文
dayjs.locale('zh-cn')

/**
 * 格式化日期
 * @param date - 日期值，支持 string | number | Date | dayjs.Dayjs
 * @param format - 格式字符串，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: string | number | Date | dayjs.Dayjs,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  return dayjs(date).format(format)
}

/**
 * 获取相对时间描述
 * @param date - 日期值，支持 string | number | Date | dayjs.Dayjs
 * @returns 相对于当前时间的描述文本，如"3 小时前"
 */
export function fromNow(date: string | number | Date | dayjs.Dayjs): string {
  return dayjs(date).fromNow()
}

export default dayjs
