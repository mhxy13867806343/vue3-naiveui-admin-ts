<script setup lang="ts">
/**
 * usePermission Hook 演示页面
 */
import { ref } from 'vue'
import { NButton, NAlert, NSpace, NTag, NInput } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'
import { usePermission } from '@/composables/usePermission'

const { hasPermission, hasRole } = usePermission()

const permissionToCheck = ref('user:create')
const roleToCheck = ref('admin')

const commonPermissions = ['user:create', 'user:delete', 'user:edit', 'user:view', 'role:manage', 'system:settings']
const commonRoles = ['admin', 'user', 'editor', 'viewer']

const code = `import { usePermission } from '@/composables/usePermission'

const { hasPermission, hasRole } = usePermission()

// 检查权限
hasPermission('user:create') // true / false

// 检查角色
hasRole('admin') // true / false`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">usePermission</h2>
    <CodePreview
      title="权限判断"
      description="usePermission 从 Permission Store 读取权限和角色信息，提供 hasPermission 和 hasRole 方法"
      :code="code"
    >
      <NAlert type="info" title="说明" class="mb-4">
        输入权限标识或角色名称，实时检查当前用户是否拥有对应权限/角色。
      </NAlert>

      <NSpace vertical :size="16">
        <div>
          <h3 class="text-base font-medium mb-2">权限检查</h3>
          <NSpace align="center" class="mb-2">
            <NInput v-model:value="permissionToCheck" placeholder="输入权限标识" style="width: 200px" />
            <NTag :type="hasPermission(permissionToCheck) ? 'success' : 'error'">
              {{ hasPermission(permissionToCheck) ? '✅ 有权限' : '❌ 无权限' }}
            </NTag>
          </NSpace>
          <NSpace>
            <NTag
              v-for="p in commonPermissions"
              :key="p"
              :type="hasPermission(p) ? 'success' : 'default'"
              class="cursor-pointer"
              @click="permissionToCheck = p"
            >
              {{ p }}
            </NTag>
          </NSpace>
        </div>

        <div>
          <h3 class="text-base font-medium mb-2">角色检查</h3>
          <NSpace align="center" class="mb-2">
            <NInput v-model:value="roleToCheck" placeholder="输入角色名称" style="width: 200px" />
            <NTag :type="hasRole(roleToCheck) ? 'success' : 'error'">
              {{ hasRole(roleToCheck) ? '✅ 有角色' : '❌ 无角色' }}
            </NTag>
          </NSpace>
          <NSpace>
            <NTag
              v-for="r in commonRoles"
              :key="r"
              :type="hasRole(r) ? 'success' : 'default'"
              class="cursor-pointer"
              @click="roleToCheck = r"
            >
              {{ r }}
            </NTag>
          </NSpace>
        </div>
      </NSpace>
    </CodePreview>
  </div>
</template>
