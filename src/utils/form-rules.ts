/**
 * 通用表单验证规则工厂
 * 登录/注册页面共用，传入 t 函数生成国际化规则
 */
import type { FormRules } from 'naive-ui'
import { PHONE_REGEX, EMAIL_REGEX, SMS_CODE_REGEX, PASSWORD_MIN_LENGTH } from './validators'

type TFunc = (key: string, params?: Record<string, unknown>) => string

/** 登录 - 账号密码规则 */
export function getLoginAccountRules(t: TFunc): FormRules {
  return {
    username: [
      { required: true, message: () => t('login.usernameRequired'), trigger: ['blur', 'input'] },
    ],
    password: [
      { required: true, message: () => t('login.passwordRequired'), trigger: ['blur', 'input'] },
    ],
  }
}

/** 登录 - 手机号规则 */
export function getLoginPhoneRules(t: TFunc): FormRules {
  return {
    phone: [
      { required: true, message: () => t('login.phoneRequired'), trigger: ['blur'] },
      { pattern: PHONE_REGEX, message: () => t('login.phoneInvalid'), trigger: ['blur', 'input'] },
    ],
    smsCode: [
      { required: true, message: () => t('login.smsCodeRequired'), trigger: ['blur'] },
      { pattern: SMS_CODE_REGEX, message: () => t('login.smsCodeInvalid'), trigger: ['blur', 'input'] },
    ],
  }
}

/** 登录 - 邮箱规则 */
export function getLoginEmailRules(t: TFunc): FormRules {
  return {
    email: [
      { required: true, message: () => t('login.emailRequired'), trigger: ['blur'] },
      { pattern: EMAIL_REGEX, message: () => t('login.emailInvalid'), trigger: ['blur', 'input'] },
    ],
    emailPassword: [
      { required: true, message: () => t('login.passwordRequired'), trigger: ['blur', 'input'] },
    ],
  }
}

/** 注册 - 账号规则 */
export function getRegisterAccountRules(t: TFunc, getPassword: () => string): FormRules {
  return {
    username: [
      { required: true, message: () => t('register.usernameRequired'), trigger: ['blur', 'input'] },
    ],
    password: [
      { required: true, message: () => t('register.passwordRequired'), trigger: ['blur'] },
      { min: PASSWORD_MIN_LENGTH, message: () => t('register.passwordMinLength'), trigger: ['blur', 'input'] },
    ],
    confirmPassword: [
      { required: true, message: () => t('register.confirmPasswordRequired'), trigger: ['blur'] },
      {
        validator: (_r: unknown, v: string) => {
          if (v && v !== getPassword()) return new Error(t('register.passwordMismatch'))
          return true
        },
        trigger: ['blur', 'input'],
      },
    ],
  }
}

/** 注册 - 手机号规则 */
export function getRegisterPhoneRules(t: TFunc): FormRules {
  return {
    phone: [
      { required: true, message: () => t('register.phoneRequired'), trigger: ['blur'] },
      { pattern: PHONE_REGEX, message: () => t('register.phoneInvalid'), trigger: ['blur', 'input'] },
    ],
    smsCode: [
      { required: true, message: () => t('register.smsCodeRequired'), trigger: ['blur'] },
      { pattern: SMS_CODE_REGEX, message: () => t('register.smsCodeInvalid'), trigger: ['blur', 'input'] },
    ],
    password: [
      { required: true, message: () => t('register.passwordRequired'), trigger: ['blur'] },
      { min: PASSWORD_MIN_LENGTH, message: () => t('register.passwordMinLength'), trigger: ['blur', 'input'] },
    ],
  }
}

/** 注册 - 邮箱规则 */
export function getRegisterEmailRules(t: TFunc, getEmailPassword: () => string): FormRules {
  return {
    email: [
      { required: true, message: () => t('register.emailRequired'), trigger: ['blur'] },
      { pattern: EMAIL_REGEX, message: () => t('register.emailInvalid'), trigger: ['blur', 'input'] },
    ],
    emailPassword: [
      { required: true, message: () => t('register.passwordRequired'), trigger: ['blur'] },
      { min: PASSWORD_MIN_LENGTH, message: () => t('register.passwordMinLength'), trigger: ['blur', 'input'] },
    ],
    emailConfirmPassword: [
      { required: true, message: () => t('register.confirmPasswordRequired'), trigger: ['blur'] },
      {
        validator: (_r: unknown, v: string) => {
          if (v && v !== getEmailPassword()) return new Error(t('register.passwordMismatch'))
          return true
        },
        trigger: ['blur', 'input'],
      },
    ],
  }
}
