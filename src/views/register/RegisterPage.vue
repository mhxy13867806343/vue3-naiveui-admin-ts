<script setup lang="ts">
/**
 * 注册页面 - 5 套模板切换展示
 * 模板1: 经典居中卡片
 * 模板2: 左右分栏（左品牌 + 右表单）
 * 模板3: 深色主题全屏
 * 模板4: 顶部插画 + 底部表单
 * 模板5: 玻璃拟态毛玻璃
 */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NCard, NSelect } from 'naive-ui'
import RegisterFormTabs from './components/RegisterFormTabs.vue'

const { t } = useI18n()

const currentTemplate = ref(1)
const templateOptions = [
  { label: '模板1 · 经典卡片', value: 1 },
  { label: '模板2 · 左右分栏', value: 2 },
  { label: '模板3 · 深色主题', value: 3 },
  { label: '模板4 · 顶部插画', value: 4 },
  { label: '模板5 · 玻璃拟态', value: 5 },
]
</script>

<template>
  <!-- 模板切换浮动栏 -->
  <div class="template-switcher">
    <span class="switcher-label">🎨 切换模板</span>
    <NSelect
      v-model:value="currentTemplate"
      :options="templateOptions"
      size="small"
      class="switcher-select"
    />
  </div>

  <!-- ========== 模板1: 经典居中卡片 ========== -->
  <div v-if="currentTemplate === 1" class="tpl tpl1">
    <NCard class="tpl1-card" :bordered="false">
      <div class="tpl1-head">
        <div class="tpl1-icon">🚀</div>
        <h2>{{ t('register.title') }}</h2>
        <p>创建您的账户，开始使用</p>
      </div>
      <RegisterFormTabs />
    </NCard>
  </div>

  <!-- ========== 模板2: 左右分栏 ========== -->
  <div v-else-if="currentTemplate === 2" class="tpl tpl2">
    <div class="tpl2-left">
      <div class="tpl2-brand">
        <h1>Admin Dashboard</h1>
        <p class="tpl2-sub">开箱即用的中后台管理系统</p>
        <p class="tpl2-desc">基于 Vue 3 + Naive UI + TypeScript</p>
        <div class="tpl2-dots">
          <span v-for="i in 3" :key="i" class="tpl2-dot"></span>
        </div>
      </div>
    </div>
    <div class="tpl2-right">
      <div class="tpl2-form-wrap">
        <h2>{{ t('register.title') }}</h2>
        <RegisterFormTabs />
      </div>
    </div>
  </div>

  <!-- ========== 模板3: 深色主题全屏 ========== -->
  <div v-else-if="currentTemplate === 3" class="tpl tpl3">
    <div class="tpl3-particles">
      <span v-for="i in 20" :key="i" class="tpl3-particle" :style="{
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 5 + 's',
        animationDuration: 3 + Math.random() * 4 + 's',
        width: 2 + Math.random() * 4 + 'px',
        height: 2 + Math.random() * 4 + 'px',
      }"
      ></span>
    </div>
    <div class="tpl3-card">
      <div class="tpl3-head">
        <div class="tpl3-logo">⚡</div>
        <h2>创建账户</h2>
        <p>加入我们，探索更多可能</p>
      </div>
      <RegisterFormTabs :dark="true" />
    </div>
  </div>

  <!-- ========== 模板4: 顶部插画 + 底部表单 ========== -->
  <div v-else-if="currentTemplate === 4" class="tpl tpl4">
    <div class="tpl4-wrapper">
      <div class="tpl4-illustration">
        <div class="tpl4-scene">
          <div class="tpl4-mountain m1"></div>
          <div class="tpl4-mountain m2"></div>
          <div class="tpl4-sun"></div>
          <div class="tpl4-cloud c1"></div>
          <div class="tpl4-cloud c2"></div>
        </div>
        <h2>开启新旅程</h2>
        <p>注册账户，解锁全部功能</p>
      </div>
      <div class="tpl4-form-area">
        <RegisterFormTabs />
      </div>
    </div>
  </div>

  <!-- ========== 模板5: 玻璃拟态毛玻璃 ========== -->
  <div v-else-if="currentTemplate === 5" class="tpl tpl5">
    <div class="tpl5-bg">
      <div class="tpl5-blob b1"></div>
      <div class="tpl5-blob b2"></div>
      <div class="tpl5-blob b3"></div>
    </div>
    <div class="tpl5-glass">
      <div class="tpl5-head">
        <h2>✨ 创建账户</h2>
        <p>填写以下信息完成注册</p>
      </div>
      <RegisterFormTabs :dark="true" />
    </div>
  </div>
</template>

<style scoped>
/* ===== 模板切换浮动栏 ===== */
.template-switcher {
  position: fixed; top: 16px; right: 16px; z-index: 9999;
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,0.95); padding: 8px 14px;
  border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  backdrop-filter: blur(10px);
}
.switcher-label { font-size: 13px; color: #666; white-space: nowrap; }
.switcher-select { width: 170px; }
.tpl { min-height: 100vh; }

/* ===== 模板1: 经典居中卡片 ===== */
.tpl1 {
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%);
}
.tpl1-card { width: 480px; padding: 24px 20px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
.tpl1-head { text-align: center; margin-bottom: 20px; }
.tpl1-icon { font-size: 52px; margin-bottom: 8px; }
.tpl1-head h2 { font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 6px; }
.tpl1-head p { font-size: 14px; color: #999; }

/* ===== 模板2: 左右分栏 ===== */
.tpl2 { display: flex; }
.tpl2-left {
  flex: 1; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
  padding: 60px; position: relative; overflow: hidden;
}
.tpl2-left::before {
  content: ''; position: absolute; width: 400px; height: 400px;
  border-radius: 50%; background: rgba(255,255,255,0.06);
  top: -100px; right: -100px;
}
.tpl2-left::after {
  content: ''; position: absolute; width: 300px; height: 300px;
  border-radius: 50%; background: rgba(255,255,255,0.04);
  bottom: -80px; left: -80px;
}
.tpl2-brand { position: relative; z-index: 1; color: #fff; max-width: 380px; }
.tpl2-brand h1 { font-size: 34px; font-weight: 700; margin-bottom: 12px; }
.tpl2-sub { font-size: 18px; opacity: 0.9; margin-bottom: 6px; }
.tpl2-desc { font-size: 14px; opacity: 0.65; margin-bottom: 32px; }
.tpl2-dots { display: flex; gap: 8px; }
.tpl2-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.5); }
.tpl2-right {
  width: 540px; display: flex; align-items: center; justify-content: center;
  padding: 40px; background: #fff;
}
.tpl2-form-wrap { width: 100%; max-width: 420px; }
.tpl2-form-wrap h2 { font-size: 26px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px; }

/* ===== 模板3: 深色主题全屏 ===== */
.tpl3 {
  display: flex; align-items: center; justify-content: center;
  background: #0f0f1a; position: relative; overflow: hidden;
}
.tpl3-particles { position: absolute; inset: 0; }
.tpl3-particle {
  position: absolute; border-radius: 50%; background: rgba(99,102,241,0.5);
  animation: tpl3Float 4s ease-in-out infinite alternate;
}
@keyframes tpl3Float {
  0% { transform: translateY(0) scale(1); opacity: 0.3; }
  100% { transform: translateY(-40px) scale(1.5); opacity: 0.8; }
}
.tpl3-card {
  position: relative; z-index: 1; width: 480px; padding: 40px 36px;
  background: rgba(30,30,50,0.85); border: 1px solid rgba(99,102,241,0.2);
  border-radius: 20px; backdrop-filter: blur(20px);
}
.tpl3-head { text-align: center; margin-bottom: 24px; }
.tpl3-logo { font-size: 48px; margin-bottom: 12px; }
.tpl3-head h2 { font-size: 24px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px; }
.tpl3-head p { font-size: 14px; color: #94a3b8; }

/* ===== 模板4: 顶部插画 + 底部表单 ===== */
.tpl4 {
  display: flex; align-items: center; justify-content: center;
  background: #fff;
}
.tpl4-wrapper { width: 480px; }
.tpl4-illustration { text-align: center; margin-bottom: 24px; }
.tpl4-scene {
  width: 100%; height: 160px; position: relative;
  background: linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 100%);
  border-radius: 20px; overflow: hidden; margin-bottom: 20px;
}
.tpl4-mountain {
  position: absolute; bottom: 0; width: 0; height: 0;
  border-left: 80px solid transparent; border-right: 80px solid transparent;
}
.m1 { left: 20%; border-bottom: 100px solid #86efac; }
.m2 { left: 50%; border-bottom: 130px solid #4ade80; }
.tpl4-sun {
  position: absolute; top: 20px; right: 40px;
  width: 40px; height: 40px; border-radius: 50%;
  background: #fbbf24; box-shadow: 0 0 20px rgba(251,191,36,0.5);
}
.tpl4-cloud {
  position: absolute; background: #fff; border-radius: 20px;
  animation: tpl4Drift 8s ease-in-out infinite alternate;
}
.c1 { width: 60px; height: 20px; top: 30px; left: 15%; }
.c2 { width: 40px; height: 14px; top: 50px; left: 35%; animation-delay: 2s; }
@keyframes tpl4Drift {
  0% { transform: translateX(0); }
  100% { transform: translateX(20px); }
}
.tpl4-illustration h2 { font-size: 22px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
.tpl4-illustration p { font-size: 14px; color: #999; }
.tpl4-form-area { padding: 0 8px; }

/* ===== 模板5: 玻璃拟态毛玻璃 ===== */
.tpl5 {
  display: flex; align-items: center; justify-content: center;
  background: #1a1a2e; position: relative; overflow: hidden;
}
.tpl5-bg { position: absolute; inset: 0; }
.tpl5-blob {
  position: absolute; border-radius: 50%; filter: blur(80px);
  animation: tpl5Move 10s ease-in-out infinite alternate;
}
.b1 { width: 400px; height: 400px; background: #6366f1; top: -10%; left: -5%; }
.b2 { width: 350px; height: 350px; background: #ec4899; bottom: -10%; right: -5%; animation-delay: 3s; }
.b3 { width: 250px; height: 250px; background: #14b8a6; top: 40%; left: 50%; animation-delay: 6s; }
@keyframes tpl5Move {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(40px, -30px) scale(1.1); }
}
.tpl5-glass {
  position: relative; z-index: 1; width: 480px; padding: 40px 36px;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
  border-radius: 24px; backdrop-filter: blur(24px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
.tpl5-head { text-align: center; margin-bottom: 20px; }
.tpl5-head h2 { font-size: 26px; font-weight: 600; color: #f1f5f9; margin-bottom: 6px; }
.tpl5-head p { font-size: 14px; color: #94a3b8; }

/* ===== 响应式 ===== */
@media (max-width: 960px) {
  .tpl2-left { display: none; }
  .tpl2-right { width: 100%; }
}
</style>
