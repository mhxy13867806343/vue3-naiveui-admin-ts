<script setup lang="ts">
/**
 * 多级路由示例 - 电商 / 淘宝商品流
 * 双列瀑布流商品卡 + 橙色主题 + 直播标签
 */
import { ref, computed } from 'vue'
import { NInput, NTag, NButton, NEmpty } from 'naive-ui'

interface Goods {
  id: number
  title: string
  price: number
  oldPrice?: number
  sold: number
  shop: string
  cover: string
  height: number // 瀑布流随机高度
  tags: string[]
  live?: boolean
}

const search = ref('')

const goods = ref<Goods[]>([
  { id: 1, title: '【官方旗舰】2024 新款牛仔裤男 宽松直筒韩版潮流', price: 89.9, oldPrice: 199, sold: 12453, shop: '潮男基地', cover: 'https://picsum.photos/seed/jeans/300/360', height: 240, tags: ['包邮', '7天无理由'], live: true },
  { id: 2, title: '2024 新款 T 恤 ins 风纯棉短袖 男女同款', price: 49, oldPrice: 99, sold: 5621, shop: '小棉袄优选', cover: 'https://picsum.photos/seed/tshirt/300/300', height: 200, tags: ['百亿补贴'] },
  { id: 3, title: '【限时直降】儿童羽绒服 加厚保暖 90% 白鸭绒', price: 199, oldPrice: 599, sold: 3201, shop: '小可爱童装', cover: 'https://picsum.photos/seed/jacket/300/400', height: 270, tags: ['秒杀'] },
  { id: 4, title: '日式简约餐桌 北欧实木 4-6人位', price: 1299, oldPrice: 2999, sold: 421, shop: '木匠工坊', cover: 'https://picsum.photos/seed/desk/300/220', height: 160, tags: ['送货上门'] },
  { id: 5, title: '咖啡机 全自动 家用意式 浓缩奶泡 2024 新品', price: 1599, oldPrice: 2299, sold: 882, shop: 'Coffee Pro', cover: 'https://picsum.photos/seed/coffee/300/350', height: 230, tags: ['12 期免息'], live: true },
  { id: 6, title: '苹果 iPhone 15 Pro 256G 国行原封 现货发售', price: 7999, oldPrice: 8999, sold: 1542, shop: '果粉之家', cover: 'https://picsum.photos/seed/iphone/300/280', height: 190, tags: ['顺丰包邮'] },
  { id: 7, title: '小米 Redmi 14 Pro 16+512G 5G 旗舰智能手机', price: 2299, oldPrice: 2799, sold: 6321, shop: '米家旗舰', cover: 'https://picsum.photos/seed/mi/300/420', height: 280, tags: ['官方正品'] },
  { id: 8, title: '蓝牙耳机 真无线 入耳式 降噪 2024 新款', price: 99, oldPrice: 299, sold: 23145, shop: '声音控', cover: 'https://picsum.photos/seed/buds/300/240', height: 170, tags: ['1000+人付款'], live: true },
])

const filtered = computed(() => {
  const q = search.value.trim()
  if (!q) return goods.value
  return goods.value.filter((g) => g.title.includes(q) || g.shop.includes(q))
})
</script>

<template>
  <div class="taobao">
    <h2 class="text-xl font-semibold mb-4">业务示例 / 电商 / 淘宝商品流</h2>

    <!-- 搜索条 -->
    <div class="search-bar">
      <NInput v-model:value="search" placeholder="🔍 搜你想要的..." round />
      <NButton type="warning" round>搜索</NButton>
    </div>

    <!-- 分类胶囊 -->
    <div class="cats">
      <span class="cat active">推荐</span>
      <span class="cat">服饰</span>
      <span class="cat">数码</span>
      <span class="cat">家居</span>
      <span class="cat">美食</span>
      <span class="cat">母婴</span>
      <span class="cat">运动</span>
    </div>

    <!-- 商品瀑布流（CSS columns）-->
    <div v-if="filtered.length" class="waterfall">
      <div v-for="g in filtered" :key="g.id" class="goods-card">
        <div class="cover-wrap" :style="{ aspectRatio: g.height / 200 }">
          <img :src="g.cover" :alt="g.title" />
          <span v-if="g.live" class="live">🔴 直播中</span>
        </div>
        <div class="goods-body">
          <div class="title">{{ g.title }}</div>
          <div class="tags">
            <NTag v-for="t in g.tags" :key="t" size="small" :bordered="false" :color="{ color: '#fff5f0', textColor: '#ff5000', borderColor: 'transparent' }">{{ t }}</NTag>
          </div>
          <div class="price-row">
            <span class="symbol">¥</span>
            <span class="price">{{ g.price }}</span>
            <span v-if="g.oldPrice" class="old">¥{{ g.oldPrice }}</span>
          </div>
          <div class="meta-row">
            <span class="shop">🏪 {{ g.shop }}</span>
            <span class="sold">{{ g.sold }}+ 付款</span>
          </div>
        </div>
      </div>
    </div>
    <NEmpty v-else description="暂无商品" />
  </div>
</template>

<style scoped>
.taobao {
  background: linear-gradient(180deg, #ffe1d6 0%, #fff 200px);
  min-height: 100vh;
  margin: -16px;
  padding: 16px;
}
.search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.cats {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0 12px;
}
.cat {
  flex-shrink: 0;
  padding: 4px 14px;
  border-radius: 999px;
  background: rgba(255, 80, 0, 0.08);
  color: #555;
  font-size: 13px;
  cursor: pointer;
}
.cat.active {
  background: linear-gradient(90deg, #ff5000, #ff8800);
  color: #fff;
  font-weight: 500;
}
.waterfall {
  column-count: 2;
  column-gap: 10px;
}
@media (min-width: 768px) {
  .waterfall { column-count: 3; }
}
@media (min-width: 1200px) {
  .waterfall { column-count: 4; }
}
.goods-card {
  break-inside: avoid;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s;
}
.goods-card:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12); }
.cover-wrap {
  position: relative;
  width: 100%;
  background: #f3f4f6;
  overflow: hidden;
}
.cover-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
.live {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
}
.goods-body { padding: 8px 10px 10px; }
.title {
  font-size: 13px;
  line-height: 1.4;
  color: #1f2937;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 6px;
}
.tags { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px; }
.price-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  color: #ff5000;
}
.symbol { font-size: 12px; font-weight: 600; }
.price { font-size: 18px; font-weight: 700; }
.old {
  color: #9ca3af;
  font-size: 12px;
  text-decoration: line-through;
}
.meta-row {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 11px;
  color: #6b7280;
}
.shop { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%; }
</style>
