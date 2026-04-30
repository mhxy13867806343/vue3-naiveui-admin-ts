<script setup lang="ts">
/**
 * RegisterFormTabs - 注册表单标签页组件
 * 包含三种注册方式：账号注册、手机号注册、邮箱注册
 * 以及同意服务条款、登录链接等公共元素
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  NForm, NFormItem, NInput, NButton, NCheckbox,
  NTabs, NTabPane, useMessage,
  type FormInst, type FormRules,
} from 'naive-ui'
import { useLoading } from '@/composables/useLoading'

const props = defineProps<{
  dark?: boolean
}>()

const emit = defineEmits<{
  register: []
}>()

const router = useRouter()
const { t } = useI18n()
const message = useMessage()
const { loading, run } = useLoading()

const formRef = ref<FormInst | null>(null)
const agreeTerms = ref(false)
const registerType = ref<'account' | 'phone' | 'email'>('account')
const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  smsCode: '',
  email: '',
  emailPassword: '',
  emailConfirmPassword: '',
})

const smsCountdown = ref(0)
function sendSmsCode() {
  if (!form.value.phone) {
    message.warning(t('register.phoneRequired'))
    return
  }
  smsCountdown.value = 60
  const timer = setInterval(() => {
    smsCountdown.value--
    if (smsCountdown.value <= 0) clearInterval(timer)
  }, 1000)
  message.success(t('register.smsCodeSent'))
}

const accountRules: FormRules = {
  username: [{ required: true, message: () => t('register.usernameRequired'), trigger: ['blur'] }],
  password: [
    { required: true, message: () => t('register.passwordRequired'), trigger: ['blur'] },
    { min: 6, message: () => t('register.passwordMinLength'), trigger: ['blur'] },
  ],
  confirmPassword: [
    { required: true, message: () => t('register.confirmPasswordRequired'), trigger: ['blur'] },
    {
      validator: (_r: unknown, v: string) => {
        if (v && v !== form.value.password) return new Error(t('register.passwordMismatch'))
        return true
      },
      trigger: ['blur'],
    },
  ],
}
const phoneRules: FormRules = {
  phone: [
    { required: true, message: () => t('register.phoneRequired'), trigger: ['blur'] },
    { pattern: /^1[3-9]\d{9}$/, message: () => t('register.phoneInvalid') || '请输入正确的手机号', trigger: ['blur', 'input'] },
  ],
  smsCode: [
    { required: true, message: () => t('register.smsCodeRequired'), trigger: ['blur'] },
    { pattern: /^\d{4,6}$/, message: () => t('register.smsCodeInvalid') || '验证码为4-6位数字', trigger: ['blur', 'input'] },
  ],
  password: [
    { required: true, message: () => t('register.passwordRequired'), trigger: ['blur'] },
    { min: 6, message: () => t('register.passwordMinLength'), trigger: ['blur'] },
  ],
}
const emailRules: FormRules = {
  email: [
    { required: true, message: () => t('register.emailRequired'), trigger: ['blur'] },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: () => t('register.emailInvalid') || '请输入正确的邮箱地址', trigger: ['blur', 'input'] },
  ],
  emailPassword: [
    { required: true, message: () => t('register.passwordRequired'), trigger: ['blur'] },
    { min: 6, message: () => t('register.passwordMinLength'), trigger: ['blur'] },
  ],
  emailConfirmPassword: [
    { required: true, message: () => t('register.confirmPasswordRequired'), trigger: ['blur'] },
    {
      validator: (_r: unknown, v: string) => {
        if (v && v !== form.value.emailPassword) return new Error(t('register.passwordMismatch'))
        return true
      },
      trigger: ['blur'],
    },
  ],
}

function onTabChange(tab: string | number) {
  registerType.value = tab as 'account' | 'phone' | 'email'
}

async function handleRegister() {
  try { await formRef.value?.validate() } catch { return }
  if (!agreeTerms.value) {
    message.warning(t('register.agreeTermsRequired'))
    return
  }
  try {
    await run(async () => { await new Promise(r => setTimeout(r, 600)) })
    message.success(t('register.registerSuccess'))
    emit('register')
    router.push('/login')
  } catch {
    message.error(t('register.registerFailed'))
  }
}

const linkClass = props.dark ? 'link-accent' : 'link-green'
</script>

<template>
  <NTabs
    v-model:value="registerType"
    type="line"
    animated
    :class="{ 'dark-tabs': dark }"
    @update:value="onTabChange"
  >
    <!-- 账号注册 -->
    <NTabPane name="account" :tab="t('register.accountRegister')">
      <NForm ref="formRef" :model="form" :rules="accountRules" label-placement="top" size="large">
        <NFormItem :label="t('register.username')" path="username">
          <NInput v-model:value="form.username" :placeholder="t('register.usernamePlaceholder')">
            <template #prefix><span>👤</span></template>
          </NInput>
        </NFormItem>
        <NFormItem :label="t('register.password')" path="password">
          <NInput v-model:value="form.password" type="password" show-password-on="click" :placeholder="t('register.passwordPlaceholder')">
            <template #prefix><span>🔒</span></template>
          </NInput>
        </NFormItem>
        <NFormItem :label="t('register.confirmPassword')" path="confirmPassword">
          <NInput
            v-model:value="form.confirmPassword"
            type="password"
            show-password-on="click"
            :placeholder="t('register.confirmPasswordPlaceholder')"
            @keyup.enter="handleRegister"
          >
            <template #prefix><span>🔒</span></template>
          </NInput>
        </NFormItem>
      </NForm>
    </NTabPane>

    <!-- 手机号注册 -->
    <NTabPane name="phone" :tab="t('register.phoneRegister')">
      <NForm ref="formRef" :model="form" :rules="phoneRules" label-placement="top" size="large">
        <NFormItem :label="t('register.phone')" path="phone">
          <NInput v-model:value="form.phone" :placeholder="t('register.phonePlaceholder')">
            <template #prefix><span>📱</span></template>
          </NInput>
        </NFormItem>
        <NFormItem :label="t('register.smsCode')" path="smsCode">
          <NInput v-model:value="form.smsCode" :placeholder="t('register.smsCodePlaceholder')">
            <template #prefix><span>✉️</span></template>
            <template #suffix>
              <NButton
                text
                type="primary"
                :disabled="smsCountdown > 0"
                size="small"
                @click="sendSmsCode"
              >
                {{ smsCountdown > 0 ? t('register.resendCode', { seconds: smsCountdown }) : t('register.sendCode') }}
              </NButton>
            </template>
          </NInput>
        </NFormItem>
        <NFormItem :label="t('register.password')" path="password">
          <NInput
            v-model:value="form.password"
            type="password"
            show-password-on="click"
            :placeholder="t('register.passwordPlaceholder')"
            @keyup.enter="handleRegister"
          >
            <template #prefix><span>🔒</span></template>
          </NInput>
        </NFormItem>
      </NForm>
    </NTabPane>

    <!-- 邮箱注册 -->
    <NTabPane name="email" :tab="t('register.emailRegister')">
      <NForm ref="formRef" :model="form" :rules="emailRules" label-placement="top" size="large">
        <NFormItem :label="t('register.email')" path="email">
          <NInput v-model:value="form.email" :placeholder="t('register.emailPlaceholder')">
            <template #prefix><span>📧</span></template>
          </NInput>
        </NFormItem>
        <NFormItem :label="t('register.emailPassword')" path="emailPassword">
          <NInput v-model:value="form.emailPassword" type="password" show-password-on="click" :placeholder="t('register.passwordPlaceholder')">
            <template #prefix><span>🔒</span></template>
          </NInput>
        </NFormItem>
        <NFormItem :label="t('register.confirmPassword')" path="emailConfirmPassword">
          <NInput
            v-model:value="form.emailConfirmPassword"
            type="password"
            show-password-on="click"
            :placeholder="t('register.confirmPasswordPlaceholder')"
            @keyup.enter="handleRegister"
          >
            <template #prefix><span>🔒</span></template>
          </NInput>
        </NFormItem>
      </NForm>
    </NTabPane>
  </NTabs>

  <!-- 同意服务条款 -->
  <div :class="['terms-section', { 'terms-dark': dark }]">
    <NCheckbox v-model:checked="agreeTerms">
      {{ t('register.agreeTerms') }}
      <a href="javascript:void(0)" :class="linkClass">{{ t('register.termsOfService') }}</a>
      {{ t('register.and') }}
      <a href="javascript:void(0)" :class="linkClass">{{ t('register.privacyPolicy') }}</a>
    </NCheckbox>
  </div>

  <!-- 注册按钮 -->
  <NButton type="primary" block size="large" :loading="loading" style="margin-top: 8px;" @click="handleRegister">
    {{ t('register.registerButton') }}
  </NButton>

  <!-- 登录链接 -->
  <div :class="['login-link', { 'login-link-dark': dark }]">
    {{ t('register.goToLogin').split('？')[0] || t('register.goToLogin').split('?')[0] }}？<router-link to="/login" :class="linkClass">
      {{ t('register.goToLogin').includes('？') ? t('register.goToLogin').split('？')[1] : t('register.goToLogin').split('?')[1] || t('register.goToLogin') }}
    </router-link>
  </div>
</template>

<style scoped>
.link-green { color: #18a058; text-decoration: none; font-weight: 500; font-size: 13px; }
.link-green:hover { color: #36ad6a; }
.link-accent { color: #818cf8; text-decoration: none; font-weight: 500; font-size: 13px; }
.link-accent:hover { color: #a5b4fc; }

.terms-section { margin-top: 12px; margin-bottom: 4px; }
.terms-section :deep(.n-checkbox__label) { color: inherit; }
.terms-dark :deep(.n-checkbox__label) { color: #94a3b8 !important; }
.terms-dark :deep(.n-checkbox .n-checkbox-box) {
  --n-color: transparent !important;
  --n-border: 1px solid rgba(255,255,255,0.25) !important;
  --n-color-checked: #818cf8 !important;
  --n-border-checked: 1px solid #818cf8 !important;
}
.login-link { text-align: center; margin-top: 16px; font-size: 13px; color: #999; }
.login-link-dark { color: #94a3b8; }

/* Dark tabs override */
.dark-tabs :deep(.n-tabs-tab) { color: #94a3b8; }
.dark-tabs :deep(.n-tabs-tab--active) { color: #818cf8 !important; }
.dark-tabs :deep(.n-tabs-bar) { background: #818cf8; }

/* Dark mode - form labels, text, inputs */
.dark-tabs :deep(.n-form-item-label__text) { color: #cbd5e1 !important; }
.dark-tabs :deep(.n-form-item-feedback__line) { color: #f87171; }
.dark-tabs :deep(.n-input) {
  --n-color: rgba(255,255,255,0.06) !important;
  --n-color-focus: rgba(255,255,255,0.1) !important;
  --n-border: 1px solid rgba(255,255,255,0.15) !important;
  --n-border-hover: 1px solid rgba(129,140,248,0.5) !important;
  --n-border-focus: 1px solid #818cf8 !important;
  --n-text-color: #e2e8f0 !important;
  --n-placeholder-color: #64748b !important;
  --n-caret-color: #818cf8 !important;
}
.dark-tabs :deep(.n-input__suffix) { color: #94a3b8; }
.dark-tabs :deep(.n-checkbox__label) { color: #94a3b8 !important; }
.dark-tabs :deep(.n-checkbox .n-checkbox-box) {
  --n-color: transparent !important;
  --n-border: 1px solid rgba(255,255,255,0.25) !important;
  --n-color-checked: #818cf8 !important;
  --n-border-checked: 1px solid #818cf8 !important;
}
/* Dark mode - tabs nav line, eye icon, input prefix, terms text */
.dark-tabs :deep(.n-tabs-nav) { --n-tab-border-color: rgba(255,255,255,0.1) !important; }
.dark-tabs :deep(.n-input__eye) { color: #94a3b8 !important; }
.dark-tabs :deep(.n-input__eye:hover) { color: #cbd5e1 !important; }
.dark-tabs :deep(.n-input__prefix) { color: #94a3b8; }
.dark-tabs :deep(.n-form-item .n-form-item-feedback) { color: #f87171; }
/* Dark mode terms checkbox outside tabs */
.login-link-dark :deep(.n-checkbox__label) { color: #94a3b8 !important; }
</style>
