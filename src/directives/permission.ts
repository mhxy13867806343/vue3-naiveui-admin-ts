/**
 * v-permission 自定义指令
 * 检查 Permission Store 中是否包含指定权限标识
 * 无权限则移除 DOM 元素
 *
 * 用法: v-permission="'admin:user:edit'"
 */
import type { Directive, DirectiveBinding } from 'vue'
import { usePermissionStore } from '@/stores/permission'

export const permissionDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const permissionStore = usePermissionStore()
    const requiredPermission = binding.value

    if (requiredPermission && !permissionStore.hasPermission(requiredPermission)) {
      el.parentNode?.removeChild(el)
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string>) {
    const permissionStore = usePermissionStore()
    const requiredPermission = binding.value

    if (requiredPermission && !permissionStore.hasPermission(requiredPermission)) {
      el.parentNode?.removeChild(el)
    }
  },
}
