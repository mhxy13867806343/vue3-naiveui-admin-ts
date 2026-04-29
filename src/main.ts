import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import { setupRouterGuard } from './router/guard'
import { permissionDirective } from './directives/permission'
import { setupMock } from './api/mock'

// 全局样式
import './styles/global.css'

async function bootstrap() {
  // 条件初始化 Mock 服务
  await setupMock()

  const app = createApp(App)
  const pinia = createPinia()

  app.use(pinia)
  app.use(router)
  app.use(i18n)

  // 注册 v-permission 自定义指令
  app.directive('permission', permissionDirective)

  // 设置路由守卫
  setupRouterGuard(router)

  app.mount('#app')
}

bootstrap()
