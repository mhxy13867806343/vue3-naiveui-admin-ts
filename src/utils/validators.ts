/**
 * 通用验证规则和正则表达式
 * 登录/注册等表单共用
 */

/** ===== 正则表达式 ===== */

/** 手机号：1开头，第二位3-9，共11位 */
export const PHONE_REGEX = /^1[3-9]\d{9}$/

/** 邮箱 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** 短信验证码：4-6位数字 */
export const SMS_CODE_REGEX = /^\d{4,6}$/

/** 密码：至少6位 */
export const PASSWORD_MIN_LENGTH = 6

/** 用户名：2-20位字母数字下划线 */
export const USERNAME_REGEX = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,20}$/


/** ===== 验证函数 ===== */

export function isValidPhone(value: string): boolean {
  return PHONE_REGEX.test(value)
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value)
}

export function isValidSmsCode(value: string): boolean {
  return SMS_CODE_REGEX.test(value)
}

export function isValidPassword(value: string): boolean {
  return value.length >= PASSWORD_MIN_LENGTH
}

export function isValidUsername(value: string): boolean {
  return USERNAME_REGEX.test(value)
}
