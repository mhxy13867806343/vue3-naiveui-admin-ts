<script setup lang="ts">
/**
 * 多级路由示例 - 视频 / B 站卡片+弹幕
 * 暗色主题 · 视频卡片网格 · 实时弹幕飘过
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { NTag, NButton, NInput } from 'naive-ui'

interface Video {
  id: number
  title: string
  cover: string
  up: string
  upAvatar: string
  views: string
  danmaku: string
  duration: string
  tag: string
}

const videos = ref<Video[]>([
  { id: 1, title: '【漫画】我把异世界开成了 4S 店 | 第一集', cover: 'https://picsum.photos/seed/bili1/400/250', up: '咕咕的午饭', upAvatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=1', views: '356.8万', danmaku: '8.2万', duration: '23:14', tag: '动画' },
  { id: 2, title: '前端面试官最爱的 JS 闭包 5 道题 | 你能答对几道？', cover: 'https://picsum.photos/seed/bili2/400/250', up: 'Code 师傅', upAvatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=2', views: '128.5万', danmaku: '3.1万', duration: '15:48', tag: '科技' },
  { id: 3, title: '我用 1 个月时间把 Vue 源码从头读到尾...', cover: 'https://picsum.photos/seed/bili3/400/250', up: 'Vue 老司机', upAvatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=3', views: '89.3万', danmaku: '1.8万', duration: '42:01', tag: '编程' },
  { id: 4, title: '凌晨 3 点试吃 100 种零食 | 第 18 期', cover: 'https://picsum.photos/seed/bili4/400/250', up: '吃货小胖', upAvatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=4', views: '512.9万', danmaku: '12.4万', duration: '18:33', tag: '美食' },
  { id: 5, title: '【4K 60FPS】真·原神 实机演示 全画质拉满', cover: 'https://picsum.photos/seed/bili5/400/250', up: '原游戏迷', upAvatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=5', views: '1623.1万', danmaku: '38.5万', duration: '12:05', tag: '游戏' },
  { id: 6, title: 'AI 写代码已经强到这种程度了？实测 Cursor', cover: 'https://picsum.photos/seed/bili6/400/250', up: '极客大佬', upAvatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=6', views: '67.2万', danmaku: '9.5千', duration: '08:21', tag: 'AI' },
])

const tags = ['全部', '动画', '科技', '编程', '美食', '游戏', 'AI']
const activeTag = ref('全部')

// ---------- 实时弹幕 ----------
interface Bullet {
  id: number
  text: string
  top: number
  duration: number
  color: string
}
const bullets = ref<Bullet[]>([])
const danmakuPool = [
  '前排！！',
  'UP 主真厉害',
  '哈哈哈哈哈哈',
  '这操作绝了',
  '我先点赞 + 收藏',
  '上次这么早遇到 UP 还是上次',
  '666666',
  '草（一种植物）',
  '泪目了家人们',
  '看完整视频再走',
  '已三连',
  '这剪辑太好了',
]
const colors = ['#fff', '#ffe066', '#74b9ff', '#ff7675', '#a29bfe', '#55efc4']

let bulletTimer: number | null = null
const newBullet = ref('')

function spawnBullet(text: string) {
  bullets.value.push({
    id: Date.now() + Math.random(),
    text,
    top: Math.random() * 80 + 5,
    duration: 8 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
  })
  // 自动清理
  setTimeout(() => {
    bullets.value.shift()
  }, 12000)
}

function send() {
  const t = newBullet.value.trim()
  if (t) {
    spawnBullet(t)
    newBullet.value = ''
  }
}

onMounted(() => {
  bulletTimer = window.setInterval(() => {
    spawnBullet(danmakuPool[Math.floor(Math.random() * danmakuPool.length)])
  }, 1500)
})
onBeforeUnmount(() => {
  if (bulletTimer) clearInterval(bulletTimer)
})
</script>

<template>
  <div class="bili">
    <h2 class="text-xl font-semibold mb-4 hero-title">业务示例 / 视频 / B 站卡片 + 弹幕</h2>

    <!-- 弹幕舞台 -->
    <div class="stage">
      <div class="stage-bg">
        <span class="logo">🅱 ilibili</span>
        <span class="motto">( ゜- ゜)つロ 干杯～</span>
      </div>
      <div
        v-for="b in bullets" :key="b.id"
        class="bullet"
        :style="{
          top: b.top + '%',
          color: b.color,
          animationDuration: b.duration + 's',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
        }"
      >{{ b.text }}</div>

      <!-- 发送弹幕 -->
      <div class="dm-bar">
        <NInput
          v-model:value="newBullet"
          placeholder="发条友善的弹幕"
          :input-props="{ style: { color: '#fff' } }"
          style="background: rgba(255,255,255,0.1); --n-text-color: #fff"
          @keydown.enter="send"
        />
        <NButton type="primary" color="#fb7299" @click="send">发送</NButton>
      </div>
    </div>

    <!-- 标签切换 -->
    <div class="tags-bar">
      <NTag
        v-for="t in tags" :key="t"
        :type="activeTag === t ? 'error' : 'default'"
        :bordered="false"
        round size="large"
        class="cursor-pointer"
        @click="activeTag = t"
      >{{ t }}</NTag>
    </div>

    <!-- 视频网格 -->
    <div class="grid">
      <div
        v-for="v in videos"
        v-show="activeTag === '全部' || v.tag === activeTag"
        :key="v.id"
        class="video-card"
      >
        <div class="cover-wrap">
          <img :src="v.cover" :alt="v.title" />
          <span class="duration">{{ v.duration }}</span>
          <span class="play-mask">▶</span>
        </div>
        <div class="info">
          <div class="title" :title="v.title">{{ v.title }}</div>
          <div class="meta">
            <img class="up-avatar" :src="v.upAvatar" alt="up" />
            <span class="up">{{ v.up }}</span>
          </div>
          <div class="stats">
            <span>📺 {{ v.views }}</span>
            <span>💬 {{ v.danmaku }}</span>
            <NTag size="small" :bordered="false" type="error">{{ v.tag }}</NTag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bili {
  background: #0f1419;
  min-height: 100vh;
  margin: -16px;
  padding: 16px;
  color: #e5e7eb;
}
.hero-title {
  background: linear-gradient(90deg, #fb7299, #00aeec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stage {
  position: relative;
  height: 280px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  margin-bottom: 16px;
}
.stage-bg {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: rgba(255, 255, 255, 0.06);
}
.stage-bg .logo { font-size: 80px; font-weight: 900; }
.stage-bg .motto { font-size: 18px; margin-top: 8px; }

.bullet {
  position: absolute;
  left: 100%;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 500;
  animation: fly linear forwards;
  pointer-events: none;
  font-family: -apple-system, sans-serif;
}
@keyframes fly {
  from { transform: translateX(0); }
  to { transform: translateX(-200%); }
}

.dm-bar {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  z-index: 10;
}
.dm-bar :deep(.n-input) { flex: 1; }
.dm-bar :deep(.n-input__input-el) { color: #fff !important; }

.tags-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.cursor-pointer { cursor: pointer; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}
.video-card {
  background: #1a1f24;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  border: 1px solid #1f2937;
}
.video-card:hover {
  transform: translateY(-3px);
  border-color: #fb7299;
}
.cover-wrap { position: relative; aspect-ratio: 16 / 10; overflow: hidden; }
.cover-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.video-card:hover .cover-wrap img { transform: scale(1.05); }
.duration {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 11px;
}
.play-mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 36px;
  opacity: 0;
  transition: opacity 0.2s;
}
.video-card:hover .play-mask { opacity: 1; }

.info { padding: 10px 12px; }
.title {
  font-size: 13px;
  line-height: 1.5;
  color: #e5e7eb;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 40px;
  margin-bottom: 8px;
}
.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.up-avatar { width: 18px; height: 18px; border-radius: 50%; }
.up { font-size: 12px; color: #9ca3af; }
.stats {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 11px;
  color: #6b7280;
}
</style>
