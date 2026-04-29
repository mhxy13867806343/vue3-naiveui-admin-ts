<script setup lang="ts">
/**
 * 模板1：经典居中卡片
 * 白色卡片居中，浅灰背景，简洁干净
 */
import {
  NCard, NForm, NFormItem, NInput, NButton,
  type FormInst, type FormRules,
} from 'naive-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  loading: boolean
}>()
const emit = defineEmits<{
  register: [username: string, password: string]
}>()

const { t } = useI18n()
const formRef = ref<FormInst | null>(null)
const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
})

const rules: FormRules = {
  username: [
    { required: true, message: () => t('register.usernameRequired'), trigger: ['blur', 'input'] },
  ],
  password: [
    { required: true, message: () => t('register.passwordRequired'), trigger: ['blur', 'input'] },
    { min: 6, message: () => t('register.passwordMinLength'), trigger: ['blur', 'input'] },
  ],
  confirmPassword: [
    { required: true, message: () => t('register.confirmPasswordRequired'), trigger: ['blur', 'input'] },
    {
      validator: (_rule: unknown, value: string) => {
        if (value !== form.value.password) return new Error(t('register.passwordMismatch'))
        return true
      },
      trigger: ['blur', 'input'],
    },
  ],
}

async function onSubmit() {
  try { await formRef.value?.validate() } catch { return }
  emit('register', form.value.username, form.value.password)
}
</script>

<template>
  <div class="t1-page">
    <NCard class="t1-card" :bordered="false">
      <div class="t1-header">
        <div class="t1-icon">📝</div>
        <h2>{{ t('register.title') }}</h2>
        <p>{{ t('register.createAccountDesc') }}</p>
      </div>

      <NForm ref="formRef" :model="form" :rules="rules" label-placement="top" size="large">
        <NFormItem :label="t('register.username')" path="username">
          <NInput v-model:value="form.username" :placeholder="t('register.usernamePlaceholder')" />
        </NFormItem>
        <NFormItem :label="t('register.password')" path="password">
          <NInput
            v-model:value="form.password"
            type="password"
            show-password-on="click"
            :placeholder="t('register.passwordPlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="t('register.confirmPassword')" path="confirmPassword">
          <NInput
            v-model:value="form.confirmPassword"
            type="password"
            show-password-on="click"
            :placeholder="t('register.confirmPasswordPlaceholder')"
            @keyup.enter="onSubmit"
          />
        </NFormItem>
        <NButton type="primary" block size="large" :loading="props.loading" @click="onSubmit">
          {{ t('register.registerButton') }}
        </NButton>
      </NForm>

      <div class="t1-footer">
        <router-link to="/login" class="t1-link">{{ t('register.goToLogin') }}</router-link>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.t1-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}

.t1-card {
  width: 420px;
  padding: 20px 16px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.t1-header {
  text-align: center;
  margin-bottom: 28px;
}

.t1-header .t1-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.t1-header h2 {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px;
}

.t1-header p {
  font-size: 13px;
  color: #999;
  margin: 0;
}

.t1-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
}

.t1-link {
  color: #18a058;
  text-decoration: none;
}

.t1-link:hover {
  color: #36ad6a;
}
</style>
