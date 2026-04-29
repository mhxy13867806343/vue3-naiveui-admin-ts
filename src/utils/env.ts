/**
 * 环境变量工具模块
 * 提供类型安全的 import.meta.env 访问方法
 */

/**
 * 获取指定环境变量的值
 * @param key 环境变量键名
 * @returns 环境变量值
 */
export function getEnvValue(key: keyof ImportMetaEnv): string {
  return import.meta.env[key] ?? ''
}

/**
 * 判断当前是否为开发模式
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * 判断当前是否为生产模式
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}

/**
 * 判断是否启用 Mock 服务
 */
export function isMockEnabled(): boolean {
  return getEnvValue('VITE_APP_MOCK_ENABLED') === 'true'
}

/**
 * 获取应用标题
 */
export function getAppTitle(): string {
  return getEnvValue('VITE_APP_TITLE')
}

/**
 * 获取 API 基础 URL
 */
export function getApiBaseUrl(): string {
  return getEnvValue('VITE_APP_API_BASE_URL')
}
