<script setup lang="ts">
/**
 * LoginFormTabs - 登录表单标签页组件
 * 包含三种登录方式：账号密码、手机号、邮箱
 * 以及记住我、忘记密码、社交登录、注册链接等公共元素
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  NForm, NFormItem, NInput, NButton, NCheckbox,
  NTabs, NTabPane, useMessage,
  type FormInst, type FormRules,
} from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { useLoading } from '@/composables/useLoading'
import { useSmsCountdown } from '@/composables/useSmsCountdown'
import { getLoginAccountRules, getLoginPhoneRules, getLoginEmailRules } from '@/utils/form-rules'
import { isValidPhone } from '@/utils/validators'

const props = defineProps<{
  dark?: boolean
}>()

const emit = defineEmits<{
  login: []
}>()

const router = useRouter()
const { t } = useI18n()
const message = useMessage()
const authStore = useAuthStore()
const { loading, run } = useLoading()

const formRef = ref<FormInst | null>(null)
const rememberMe = ref(false)
const loginType = ref<'account' | 'phone' | 'email'>('account')
const form = ref({
  username: 'admin',
  password: 'admin123',
  phone: '',
  smsCode: '',
  email: '',
  emailPassword: '',
})

const smsCountdown = ref(0)
function sendSmsCode() {
  if (!form.value.phone) {
    message.warning(t('login.phoneRequired'))
    return
  }
  smsCountdown.value = 60
  const timer = setInterval(() => {
    smsCountdown.value--
    if (smsCountdown.value <= 0) clearInterval(timer)
  }, 1000)
  message.success(t('login.smsCodeSent'))
}

const accountRules: FormRules = {
  username: [{ required: true, message: () => t('login.usernameRequired'), trigger: ['blur'] }],
  password: [{ required: true, message: () => t('login.passwordRequired'), trigger: ['blur'] }],
}
const phoneRules: FormRules = {
  phone: [
    { required: true, message: () => t('login.phoneRequired'), trigger: ['blur'] },
    { pattern: /^1[3-9]\d{9}$/, message: () => '请输入正确的11位手机号', trigger: ['blur', 'input'] },
  ],
  smsCode: [
    { required: true, message: () => t('login.smsCodeRequired'), trigger: ['blur'] },
    { pattern: /^\d{4,6}$/, message: () => '验证码为4-6位数字', trigger: ['blur', 'input'] },
  ],
}
const emailRules: FormRules = {
  email: [
    { required: true, message: () => t('login.emailRequired'), trigger: ['blur'] },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: () => '请输入正确的邮箱地址', trigger: ['blur', 'input'] },
  ],
  emailPassword: [{ required: true, message: () => t('login.passwordRequired'), trigger: ['blur'] }],
}

const currentRules = ref<FormRules>(accountRules)

function onTabChange(tab: string | number) {
  loginType.value = tab as 'account' | 'phone' | 'email'
  if (tab === 'account') currentRules.value = accountRules
  else if (tab === 'phone') currentRules.value = phoneRules
  else currentRules.value = emailRules
}

async function handleLogin() {
  try { await formRef.value?.validate() } catch { return }
  try {
    if (loginType.value === 'account') {
      await run(() => authStore.login(form.value.username, form.value.password))
    } else {
      // phone / email login — simulate
      await run(async () => { await new Promise(r => setTimeout(r, 600)) })
    }
    message.success(t('login.loginSuccess'))
    emit('login')
    router.push('/dashboard')
  } catch {
    message.error(t('login.loginFailed'))
  }
}

const linkClass = props.dark ? 'link-accent' : 'link-green'
</script>

<template>
  <NTabs
    v-model:value="loginType"
    type="line"
    animated
    :class="{ 'dark-tabs': dark }"
    @update:value="onTabChange"
  >
    <!-- 账号密码登录 -->
    <NTabPane name="account" :tab="t('login.accountLogin')">
      <NForm ref="formRef" :model="form" :rules="accountRules" label-placement="top" size="large">
        <NFormItem :label="t('login.username')" path="username">
          <NInput v-model:value="form.username" :placeholder="t('login.usernamePlaceholder')">
            <template #prefix><span>👤</span></template>
          </NInput>
        </NFormItem>
        <NFormItem :label="t('login.password')" path="password">
          <NInput
            v-model:value="form.password"
            type="password"
            show-password-on="click"
            :placeholder="t('login.passwordPlaceholder')"
            @keyup.enter="handleLogin"
          >
            <template #prefix><span>🔒</span></template>
          </NInput>
        </NFormItem>
        <div class="form-options">
          <NCheckbox v-model:checked="rememberMe">{{ t('login.rememberMe') }}</NCheckbox>
          <a href="javascript:void(0)" :class="linkClass">{{ t('login.forgotPassword') }}</a>
        </div>
        <NButton type="primary" block size="large" :loading="loading" @click="handleLogin">
          {{ t('login.loginButton') }}
        </NButton>
      </NForm>
    </NTabPane>

    <!-- 手机号登录 -->
    <NTabPane name="phone" :tab="t('login.phoneLogin')">
      <NForm ref="formRef" :model="form" :rules="phoneRules" label-placement="top" size="large">
        <NFormItem :label="t('login.phone')" path="phone">
          <NInput v-model:value="form.phone" :placeholder="t('login.phonePlaceholder')">
            <template #prefix><span>📱</span></template>
          </NInput>
        </NFormItem>
        <NFormItem :label="t('login.smsCode')" path="smsCode">
          <NInput
            v-model:value="form.smsCode"
            :placeholder="t('login.smsCodePlaceholder')"
            @keyup.enter="handleLogin"
          >
            <template #prefix><span>✉️</span></template>
            <template #suffix>
              <NButton
                text
                type="primary"
                :disabled="smsCountdown > 0"
                @click="sendSmsCode"
                size="small"
              >
                {{ smsCountdown > 0 ? t('login.resendCode', { seconds: smsCountdown }) : t('login.sendCode') }}
              </NButton>
            </template>
          </NInput>
        </NFormItem>
        <div class="form-options">
          <NCheckbox v-model:checked="rememberMe">{{ t('login.rememberMe') }}</NCheckbox>
          <a href="javascript:void(0)" :class="linkClass">{{ t('login.forgotPassword') }}</a>
        </div>
        <NButton type="primary" block size="large" :loading="loading" @click="handleLogin">
          {{ t('login.loginButton') }}
        </NButton>
      </NForm>
    </NTabPane>

    <!-- 邮箱登录 -->
    <NTabPane name="email" :tab="t('login.emailLogin')">
      <NForm ref="formRef" :model="form" :rules="emailRules" label-placement="top" size="large">
        <NFormItem :label="t('login.email')" path="email">
          <NInput v-model:value="form.email" :placeholder="t('login.emailPlaceholder')">
            <template #prefix><span>📧</span></template>
          </NInput>
        </NFormItem>
        <NFormItem :label="t('login.emailPassword')" path="emailPassword">
          <NInput
            v-model:value="form.emailPassword"
            type="password"
            show-password-on="click"
            :placeholder="t('login.passwordPlaceholder')"
            @keyup.enter="handleLogin"
          >
            <template #prefix><span>🔒</span></template>
          </NInput>
        </NFormItem>
        <div class="form-options">
          <NCheckbox v-model:checked="rememberMe">{{ t('login.rememberMe') }}</NCheckbox>
          <a href="javascript:void(0)" :class="linkClass">{{ t('login.forgotPassword') }}</a>
        </div>
        <NButton type="primary" block size="large" :loading="loading" @click="handleLogin">
          {{ t('login.loginButton') }}
        </NButton>
      </NForm>
    </NTabPane>
  </NTabs>

  <!-- 其他登录方式 -->
  <div class="social-section">
    <span :class="['social-label', { 'social-label-dark': dark }]">{{ t('login.otherLogin') }}</span>
    <div class="social-row">
      <div :class="['social-icon', { 'social-icon-dark': dark }]">🐙</div>
      <div :class="['social-icon', { 'social-icon-dark': dark }]">💬</div>
      <div :class="['social-icon', { 'social-icon-dark': dark }]">🐧</div>
    </div>
  </div>

  <!-- 注册链接 -->
  <div :class="['register-link', { 'register-link-dark': dark }]">
    {{ t('login.goToRegister').split('？')[0] || t('login.goToRegister').split('?')[0] }}？<router-link to="/register" :class="linkClass">
      {{ t('login.goToRegister').includes('？') ? t('login.goToRegister').split('？')[1] : t('login.goToRegister').split('?')[1] || t('login.goToRegister') }}
    </router-link>
  </div>
</template>

<style scoped>
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.link-green { color: #18a058; text-decoration: none; font-weight: 500; font-size: 13px; }
.link-green:hover { color: #36ad6a; }
.link-accent { color: #818cf8; text-decoration: none; font-weight: 500; font-size: 13px; }
.link-accent:hover { color: #a5b4fc; }

/* Social section */
.social-section { text-align: center; margin-top: 24px; }
.social-label {
  font-size: 13px; color: #bbb; position: relative; display: inline-block; padding: 0 16px;
}
.social-label::before, .social-label::after {
  content: ''; position: absolute; top: 50%; width: 50px; height: 1px; background: #e8e8e8;
}
.social-label::before { right: 100%; }
.social-label::after { left: 100%; }
.social-label-dark { color: #64748b; }
.social-label-dark::before, .social-label-dark::after { background: rgba(255,255,255,0.15); }
.social-row { display: flex; justify-content: center; gap: 16px; margin-top: 12px; }
.social-icon {
  width: 38px; height: 38px; border-radius: 50%; border: 1px solid #e8e8e8;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  font-size: 18px; transition: all 0.3s ease;
}
.social-icon:hover { border-color: #18a058; background: rgba(24,160,88,0.05); transform: translateY(-2px); }
.social-icon-dark { border-color: rgba(255,255,255,0.2); }
.social-icon-dark:hover { border-color: #818cf8; background: rgba(129,140,248,0.1); }

/* Register link */
.register-link { text-align: center; margin-top: 16px; font-size: 13px; color: #999; }
.register-link-dark { color: #94a3b8; }

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
/* Dark mode - tabs nav line, eye icon, input prefix */
.dark-tabs :deep(.n-tabs-nav) { --n-tab-border-color: rgba(255,255,255,0.1) !important; }
.dark-tabs :deep(.n-input__eye) { color: #94a3b8 !important; }
.dark-tabs :deep(.n-input__eye:hover) { color: #cbd5e1 !important; }
.dark-tabs :deep(.n-input__prefix) { color: #94a3b8; }
.dark-tabs :deep(.n-form-item .n-form-item-feedback) { color: #f87171; }
</style>
