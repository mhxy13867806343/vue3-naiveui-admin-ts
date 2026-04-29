<script setup lang="ts">
/**
 * 登录页面 - 5 套模板切换展示（NSelect 切换）
 * 模板1: 经典居中卡片
 * 模板2: 左右分栏 + 捂眼动画
 * 模板3: 深色主题全屏
 * 模板4: 顶部插画 + 底部表单
 * 模板5: 玻璃拟态毛玻璃
 */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NCard, NSelect } from 'naive-ui'
import LoginFormTabs from './components/LoginFormTabs.vue'

const { t } = useI18n()

const currentTemplate = ref(2)
const templateOptions = [
  { label: '模板1 · 经典卡片', value: 1 },
  { label: '模板2 · 左右分栏', value: 2 },
  { label: '模板3 · 深色主题', value: 3 },
  { label: '模板4 · 顶部插画', value: 4 },
  { label: '模板5 · 玻璃拟态', value: 5 },
]

/* Template 2 eye-closing animation state */
const isPwdFocus = ref(false)
</script>

<template>
  <!-- 模板切换浮动栏 -->
  <div class="template-switcher">
    <span class="switcher-label">🎨 切换模板</span>
    <NSelect v-model:value="currentTemplate" :options="templateOptions" size="small" class="switcher-select" />
  </div>

  <!-- ========== 模板1: 经典居中卡片 ========== -->
  <div v-if="currentTemplate === 1" class="tpl tpl1">
    <NCard class="tpl1-card" :bordered="false">
      <div class="tpl1-head">
        <div class="tpl1-icon">📋</div>
        <h2>{{ t('login.title') }}</h2>
        <p>欢迎回来，请登录您的账户</p>
      </div>
      <LoginFormTabs />
    </NCard>
  </div>

  <!-- ========== 模板2: 左右分栏 + 捂眼动画 ========== -->
  <div v-else-if="currentTemplate === 2" class="tpl tpl2">
    <div class="tpl2-left">
      <div class="tpl2-brand">
        <h1>Admin Dashboard</h1>
        <p class="tpl2-sub">开箱即用的中后台管理系统</p>
        <p class="tpl2-desc">基于 Vue 3 + Naive UI + TypeScript + Vite 8</p>
        <div class="tpl2-features">
          <div class="tpl2-feat"><span class="tpl2-dot"></span>动态路由 & 权限控制</div>
          <div class="tpl2-feat"><span class="tpl2-dot"></span>国际化多语言支持</div>
          <div class="tpl2-feat"><span class="tpl2-dot"></span>丰富的组件和图表</div>
        </div>
      </div>
    </div>
    <div class="tpl2-right">
      <div class="tpl2-form-wrap">
        <!-- 捂眼动画角色 -->
        <div class="avatar-wrap">
          <div class="avatar-char" :class="{ 'eyes-shut': isPwdFocus }">
            <div class="face">
              <div class="eyes"><div class="eye l-eye"><div class="pupil"></div></div><div class="eye r-eye"><div class="pupil"></div></div></div>
              <div class="hands"><div class="hand l-hand"></div><div class="hand r-hand"></div></div>
              <div class="mouth"></div>
            </div>
          </div>
        </div>
        <h2 class="tpl2-title">{{ t('login.title') }}</h2>
        <LoginFormTabs @focusin.capture="(e: FocusEvent) => { if ((e.target as HTMLInputElement)?.type === 'password') isPwdFocus = true }" @focusout.capture="(e: FocusEvent) => { if ((e.target as HTMLInputElement)?.type === 'password') isPwdFocus = false }" />
      </div>
    </div>
  </div>

  <!-- ========== 模板3: 深色主题全屏 ========== -->
  <div v-else-if="currentTemplate === 3" class="tpl tpl3">
    <div class="tpl3-particles">
      <span v-for="i in 20" :key="i" class="tpl3-particle" :style="{
        left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 5 + 's', animationDuration: 3 + Math.random() * 4 + 's',
        width: 2 + Math.random() * 4 + 'px', height: 2 + Math.random() * 4 + 'px',
      }"></span>
    </div>
    <div class="tpl3-card">
      <div class="tpl3-head"><div class="tpl3-logo">⚡</div><h2>{{ t('login.title') }}</h2><p>欢迎回来，请登录</p></div>
      <LoginFormTabs :dark="true" />
    </div>
  </div>

  <!-- ========== 模板4: 顶部插画 + 底部表单 ========== -->
  <div v-else-if="currentTemplate === 4" class="tpl tpl4">
    <div class="tpl4-wrapper">
      <div class="tpl4-illustration">
        <div class="tpl4-scene">
          <div class="tpl4-mountain m1"></div><div class="tpl4-mountain m2"></div>
          <div class="tpl4-sun"></div>
          <div class="tpl4-cloud c1"></div><div class="tpl4-cloud c2"></div>
        </div>
        <h2>欢迎回来</h2><p>登录您的账户继续使用</p>
      </div>
      <div class="tpl4-form-area">
        <LoginFormTabs />
      </div>
    </div>
  </div>

  <!-- ========== 模板5: 玻璃拟态毛玻璃 ========== -->
  <div v-else-if="currentTemplate === 5" class="tpl tpl5">
    <div class="tpl5-bg"><div class="tpl5-blob b1"></div><div class="tpl5-blob b2"></div><div class="tpl5-blob b3"></div></div>
    <div class="tpl5-glass">
      <div class="tpl5-head"><h2>✨ {{ t('login.title') }}</h2><p>输入您的凭据继续</p></div>
      <LoginFormTabs :dark="true" />
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
.tpl1 { display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%); }
.tpl1-card { width: 480px; padding: 24px 20px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
.tpl1-head { text-align: center; margin-bottom: 20px; }
.tpl1-icon { font-size: 48px; margin-bottom: 8px; }
.tpl1-head h2 { font-size: 22px; font-weight: 600; color: #333; margin-bottom: 4px; }
.tpl1-head p { font-size: 13px; color: #999; }

/* ===== 模板2: 左右分栏 + 捂眼动画 ===== */
.tpl2 { display: flex; }
.tpl2-left {
  flex: 1; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px; position: relative; overflow: hidden;
}
.tpl2-left::before {
  content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  animation: bgFloat 15s ease-in-out infinite;
}
@keyframes bgFloat {
  0%, 100% { transform: translate(0,0) rotate(0deg); }
  33% { transform: translate(30px,-30px) rotate(5deg); }
  66% { transform: translate(-20px,20px) rotate(-3deg); }
}
.tpl2-brand { position: relative; z-index: 1; color: #fff; max-width: 400px; }
.tpl2-brand h1 { font-size: 34px; font-weight: 700; margin-bottom: 12px; }
.tpl2-sub { font-size: 18px; opacity: 0.9; margin-bottom: 6px; }
.tpl2-desc { font-size: 14px; opacity: 0.65; margin-bottom: 36px; }
.tpl2-features { display: flex; flex-direction: column; gap: 14px; }
.tpl2-feat { display: flex; align-items: center; gap: 10px; font-size: 15px; opacity: 0.9; }
.tpl2-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.7); flex-shrink: 0; }
.tpl2-right { width: 540px; display: flex; align-items: center; justify-content: center; padding: 40px; background: #fff; }
.tpl2-form-wrap { width: 100%; max-width: 420px; }
.tpl2-title { font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px; text-align: center; }

/* 捂眼动画 */
.avatar-wrap { display: flex; justify-content: center; margin-bottom: 12px; }
.avatar-char { width: 110px; height: 110px; position: relative; }
.face {
  width: 90px; height: 90px; background: linear-gradient(145deg, #ffd93d, #ffb347);
  border-radius: 50%; position: absolute; top: 10px; left: 10px;
  box-shadow: 0 4px 15px rgba(255,179,71,0.4); overflow: hidden;
}
.eyes { display: flex; justify-content: center; gap: 18px; padding-top: 28px; position: relative; z-index: 2; }
.eye {
  width: 14px; height: 14px; background: #333; border-radius: 50%; position: relative;
  transition: all 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);
}
.pupil { width: 5px; height: 5px; background: #fff; border-radius: 50%; position: absolute; top: 3px; right: 3px; transition: all 0.3s ease; }
.eyes-shut .eye { height: 3px; border-radius: 3px; margin-top: 5px; }
.eyes-shut .pupil { opacity: 0; }
.hands { position: absolute; top: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 4px; z-index: 3; pointer-events: none; }
.hand {
  width: 28px; height: 20px; background: linear-gradient(145deg, #ffcc80, #ffb74d);
  border-radius: 10px 10px 6px 6px; opacity: 0; transform: translateY(28px);
  transition: all 0.4s cubic-bezier(0.68,-0.55,0.265,1.55); box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.eyes-shut .hand { opacity: 1; transform: translateY(0); }
.l-hand { transition-delay: 0.05s; }
.r-hand { transition-delay: 0.1s; }
.mouth { width: 18px; height: 9px; border-bottom: 3px solid #c0392b; border-radius: 0 0 50% 50%; margin: 10px auto 0; position: relative; z-index: 2; transition: all 0.3s ease; }
.eyes-shut .mouth { width: 12px; height: 5px; border-bottom-width: 2px; }

/* ===== 模板3: 深色主题全屏 ===== */
.tpl3 { display: flex; align-items: center; justify-content: center; background: #0f0f1a; position: relative; overflow: hidden; }
.tpl3-particles { position: absolute; inset: 0; }
.tpl3-particle { position: absolute; border-radius: 50%; background: rgba(99,102,241,0.5); animation: t3Float 4s ease-in-out infinite alternate; }
@keyframes t3Float { 0% { transform: translateY(0) scale(1); opacity: 0.3; } 100% { transform: translateY(-40px) scale(1.5); opacity: 0.8; } }
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
.tpl4 { display: flex; align-items: center; justify-content: center; background: #fff; }
.tpl4-wrapper { width: 480px; }
.tpl4-illustration { text-align: center; margin-bottom: 24px; }
.tpl4-scene {
  width: 100%; height: 160px; position: relative;
  background: linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 100%);
  border-radius: 20px; overflow: hidden; margin-bottom: 20px;
}
.tpl4-mountain { position: absolute; bottom: 0; width: 0; height: 0; border-left: 80px solid transparent; border-right: 80px solid transparent; }
.m1 { left: 20%; border-bottom: 100px solid #86efac; }
.m2 { left: 50%; border-bottom: 130px solid #4ade80; }
.tpl4-sun { position: absolute; top: 20px; right: 40px; width: 40px; height: 40px; border-radius: 50%; background: #fbbf24; box-shadow: 0 0 20px rgba(251,191,36,0.5); }
.tpl4-cloud { position: absolute; background: #fff; border-radius: 20px; animation: t4Drift 8s ease-in-out infinite alternate; }
.c1 { width: 60px; height: 20px; top: 30px; left: 15%; }
.c2 { width: 40px; height: 14px; top: 50px; left: 35%; animation-delay: 2s; }
@keyframes t4Drift { 0% { transform: translateX(0); } 100% { transform: translateX(20px); } }
.tpl4-illustration h2 { font-size: 22px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
.tpl4-illustration p { font-size: 14px; color: #999; }
.tpl4-form-area { padding: 0 8px; }

/* ===== 模板5: 玻璃拟态毛玻璃 ===== */
.tpl5 { display: flex; align-items: center; justify-content: center; background: #1a1a2e; position: relative; overflow: hidden; }
.tpl5-bg { position: absolute; inset: 0; }
.tpl5-blob { position: absolute; border-radius: 50%; filter: blur(80px); animation: t5Move 10s ease-in-out infinite alternate; }
.b1 { width: 400px; height: 400px; background: #6366f1; top: -10%; left: -5%; }
.b2 { width: 350px; height: 350px; background: #ec4899; bottom: -10%; right: -5%; animation-delay: 3s; }
.b3 { width: 250px; height: 250px; background: #14b8a6; top: 40%; left: 50%; animation-delay: 6s; }
@keyframes t5Move { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px,-30px) scale(1.1); } }
.tpl5-glass {
  position: relative; z-index: 1; width: 480px; padding: 40px 36px;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
  border-radius: 24px; backdrop-filter: blur(24px); box-shadow: 0 8px 32px rgba(0,0,0,0.3);
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
