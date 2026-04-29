/**
 * Mock 服务入口
 * 通过 VITE_APP_MOCK_ENABLED 环境变量控制开关
 */
import { isMockEnabled } from '@/utils/env'
import { setupAuthMock } from './auth'
import { setupUserMock } from './user'

export async function setupMock() {
  if (!isMockEnabled()) {
    return
  }

  setupAuthMock()
  setupUserMock()

  console.log('[Mock] Mock service enabled')
}
