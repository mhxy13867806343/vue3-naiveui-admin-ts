<script setup lang="ts">
/**
 * 模板2：左右分栏
 * 左侧品牌区（紫蓝渐变），右侧白色注册表单
 */
import {
  NForm, NFormItem, NInput, NButton,
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
  <div class="t2-page">
    <!-- 左侧品牌区 -->
    <div class="t2-left">
      <div class="t2-brand">
        <div class="t2-logo">🚀</div>
        <h1>{{ t('register.brandTitle') }}</h1>
        <p class="t2-subtitle">{{ t('register.brandSubtitle') }}</p>
        <p class="t2-desc">{{ t('register.brandDesc') }}</p>
        <div class="t2-features">
          <div class="t2-feature">
            <span class="t2-dot"></span>
            <span>{{ t('register.featureSecurity') }}</span>
          </div>
          <div class="t2-feature">
            <span class="t2-dot"></span>
            <span>{{ t('register.featurePermission') }}</span>
          </div>
          <div class="t2-feature">
            <span class="t2-dot"></span>
            <span>{{ t('register.featureI18n') }}</span>
          </div>
        </div>
      </div>
      <!-- 装饰圆 -->
      <div class="t2-circle t2-circle-1"></div>
      <div class="t2-circle t2-circle-2"></div>
    </div>

    <!-- 右侧表单区 -->
    <div class="t2-right">
      <div class="t2-form-wrapper">
        <h2>{{ t('register.createAccount') }}</h2>
        <p class="t2-form-desc">{{ t('register.createAccountDesc') }}</p>

        <NForm ref="formRef" :model="form" :rules="rules" label-placement="top" size="large">
          <NFormItem :label="t('register.username')" path="username">
            <NInput v-model:value="form.username" :placeholder="t('register.usernamePlaceholder')">
              <template #prefix><span class="t2-input-icon">👤</span></template>
            </NInput>
          </NFormItem>
          <NFormItem :label="t('register.password')" path="password">
            <NInput
              v-model:value="form.password"
              type="password"
              show-password-on="click"
              :placeholder="t('register.passwordPlaceholder')"
            >
              <template #prefix><span class="t2-input-icon">🔒</span></template>
            </NInput>
          </NFormItem>
          <NFormItem :label="t('register.confirmPassword')" path="confirmPassword">
            <NInput
              v-model:value="form.confirmPassword"
              type="password"
              show-password-on="click"
              :placeholder="t('register.confirmPasswordPlaceholder')"
              @keyup.enter="onSubmit"
            >
              <template #prefix><span class="t2-input-icon">🔒</span></template>
            </NInput>
          </NFormItem>
          <NButton type="primary" block size="large" :loading="props.loading" class="t2-btn" @click="onSubmit">
            {{ t('register.registerButton') }}
          </NButton>
        </NForm>

        <div class="t2-footer">
          <router-link to="/login" class="t2-link">{{ t('register.goToLogin') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.t2-page {
  display: flex;
  min-height: 100vh;
}

/* 左侧品牌区 */
.t2-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px;
  position: relative;
  overflow: hidden;
}

.t2-brand {
  position: relative;
  z-index: 1;
  color: #fff;
  max-width: 400px;
}

.t2-logo {
  font-size: 56px;
  margin-bottom: 16px;
}

.t2-brand h1 {
  font-size: 34px;
  font-weight: 700;
  margin: 0 0 12px;
}

.t2-subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin: 0 0 6px;
}

.t2-desc {
  font-size: 14px;
  opacity: 0.65;
  margin: 0 0 40px;
}

.t2-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.t2-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  opacity: 0.9;
}

.t2-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  flex-shrink: 0;
}

.t2-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
}

.t2-circle-1 {
  width: 300px;
  height: 300px;
  top: -80px;
  right: -60px;
}

.t2-circle-2 {
  width: 200px;
  height: 200px;
  bottom: -40px;
  left: -40px;
}

/* 右侧表单区 */
.t2-right {
  width: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #fff;
}

.t2-form-wrapper {
  width: 100%;
  max-width: 380px;
}

.t2-form-wrapper h2 {
  font-size: 26px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.t2-form-desc {
  font-size: 14px;
  color: #999;
  margin: 0 0 32px;
}

.t2-input-icon {
  font-size: 16px;
  margin-right: 4px;
}

.t2-btn {
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
  margin-top: 8px;
}

.t2-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
}

.t2-link {
  color: #667eea;
  text-decoration: none;
}

.t2-link:hover {
  color: #764ba2;
}

/* 响应式 */
@media (max-width: 960px) {
  .t2-left {
    display: none;
  }

  .t2-right {
    width: 100%;
    background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  }

  .t2-form-wrapper {
    background: #fff;
    padding: 40px 32px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  }
}
</style>
