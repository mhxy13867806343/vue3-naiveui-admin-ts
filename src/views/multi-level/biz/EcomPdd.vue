<script setup lang="ts">
/**
 * 多级路由示例 - 电商 / 拼多多拼团
 * 红色主题、拼团进度、倒计时、单列大图风格
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { NTag, NProgress, NAvatar, NButton } from 'naive-ui'

interface PddItem {
  id: number
  title: string
  groupPrice: number
  singlePrice: number
  members: number // 已成团人数
  needed: number // 需要人数
  cover: string
  saved: number
  endsAt: number
}

const now = ref(Date.now())
const items = ref<PddItem[]>([
  { id: 1, title: '【百亿补贴】洗衣液 4 桶装 新升级配方', groupPrice: 19.9, singlePrice: 39.9, members: 2, needed: 3, cover: 'https://picsum.photos/seed/pdd1/400/300', saved: 20, endsAt: Date.now() + 1000 * 60 * 60 * 5 },
  { id: 2, title: '【限时秒杀】整箱牛奶 250ml × 24 盒', groupPrice: 39.9, singlePrice: 89, members: 7, needed: 10, cover: 'https://picsum.photos/seed/pdd2/400/300', saved: 49, endsAt: Date.now() + 1000 * 60 * 30 },
  { id: 3, title: '【0 元试吃】坚果大礼包 8 种混合装', groupPrice: 0, singlePrice: 49, members: 4, needed: 5, cover: 'https://picsum.photos/seed/pdd3/400/300', saved: 49, endsAt: Date.now() + 1000 * 60 * 60 * 12 },
  { id: 4, title: '【厂家直发】儿童四季睡衣纯棉两件套', groupPrice: 29.9, singlePrice: 79, members: 1, needed: 2, cover: 'https://picsum.photos/seed/pdd4/400/300', saved: 50, endsAt: Date.now() + 1000 * 60 * 60 * 8 },
  { id: 5, title: '【新人专享】1 元购 沐浴露体验装', groupPrice: 1, singlePrice: 19.9, members: 0, needed: 1, cover: 'https://picsum.photos/seed/pdd5/400/300', saved: 18.9, endsAt: Date.now() + 1000 * 60 * 60 * 24 },
])

let timer: number | null = null
onMounted(() => { timer = window.setInterval(() => now.value = Date.now(), 1000) })
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

function fmt(ts: number) {
  let s = Math.max(0, Math.floor((ts - now.value) / 1000))
  const h = Math.floor(s / 3600); s -= h * 3600
  const m = Math.floor(s / 60); s -= m * 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const fakeFaces = ['🧑', '👩', '👨', '👵', '👴', '🧓', '🧒', '👶']
function joinGroup(item: PddItem) {
  if (item.members < item.needed) {
    item.members++
  }
}
</script>

<template>
  <div class="pdd">
    <h2 class="text-xl font-semibold mb-4">业务示例 / 电商 / 拼多多拼团</h2>

    <!-- 顶部 banner -->
    <div class="banner">
      <div class="banner-left">
        <div class="big">🔥 拼团专区</div>
        <div class="sub">人多更便宜 · 0 元试吃 · 限时秒杀</div>
      </div>
      <NTag :bordered="false" :color="{ color: '#fff', textColor: '#e02020', borderColor: 'transparent' }" round>
        百亿补贴
      </NTag>
    </div>

    <!-- 商品列表 -->
    <div class="list">
      <div v-for="item in items" :key="item.id" class="item-card">
        <img class="cover" :src="item.cover" :alt="item.title" />
        <div class="body">
          <div class="title">{{ item.title }}</div>

          <div class="prices">
            <span class="group-price">¥{{ item.groupPrice }}</span>
            <span class="single">单买 ¥{{ item.singlePrice }}</span>
            <NTag size="small" :bordered="false" :color="{ color: '#fff0f0', textColor: '#e02020', borderColor: 'transparent' }">
              省 ¥{{ item.saved }}
            </NTag>
          </div>

          <div class="progress-row">
            <div class="faces">
              <NAvatar
                v-for="i in item.members" :key="i"
                size="small" round
                :color="['#ffd6d6', '#ffe7d6', '#fff0d6'][i % 3]"
                style="margin-left: -8px; border: 2px solid #fff"
              >{{ fakeFaces[i % fakeFaces.length] }}</NAvatar>
              <NAvatar
                v-for="i in (item.needed - item.members)" :key="'p' + i"
                size="small" round color="#f3f4f6"
                style="margin-left: -8px; border: 2px solid #fff; color: #9ca3af"
              >?</NAvatar>
            </div>
            <span class="need-count">还差 <b>{{ item.needed - item.members }}</b> 人成团</span>
          </div>

          <NProgress
            type="line"
            :percentage="(item.members / item.needed) * 100"
            :show-indicator="false"
            :height="6"
            :color="'#e02020'"
            :rail-color="'#fee2e2'"
          />

          <div class="bottom">
            <span class="countdown">⏰ {{ fmt(item.endsAt) }} 后结束</span>
            <NButton
              type="error" size="small" round
              :disabled="item.members >= item.needed"
              @click="joinGroup(item)"
            >
              {{ item.members >= item.needed ? '已成团' : '一键拼团' }}
            </NButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pdd {
  background: linear-gradient(180deg, #ffe5e5 0%, #fff 200px);
  min-height: 100vh;
  margin: -16px;
  padding: 16px;
}
.banner {
  background: linear-gradient(135deg, #e02020 0%, #ff8800 100%);
  color: #fff;
  border-radius: 12px;
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  box-shadow: 0 6px 16px rgba(224, 32, 32, 0.25);
}
.banner .big { font-size: 22px; font-weight: 700; }
.banner .sub { font-size: 12px; margin-top: 4px; opacity: 0.9; }

.list { display: flex; flex-direction: column; gap: 12px; }
.item-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: transform 0.15s;
}
.item-card:hover { transform: translateY(-2px); }
.cover {
  width: 140px;
  height: auto;
  object-fit: cover;
  flex-shrink: 0;
}
.body {
  flex: 1;
  padding: 12px 14px;
  min-width: 0;
}
.title {
  font-size: 14px;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
}
.prices {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.group-price {
  color: #e02020;
  font-size: 22px;
  font-weight: 700;
}
.single {
  color: #9ca3af;
  font-size: 12px;
  text-decoration: line-through;
}
.progress-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.faces { display: flex; padding-left: 8px; }
.need-count { font-size: 12px; color: #6b7280; }
.need-count b { color: #e02020; }
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.countdown {
  font-size: 12px;
  color: #e02020;
  font-family: 'SF Mono', Consolas, monospace;
}
</style>
