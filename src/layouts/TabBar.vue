<script setup lang="ts">
/**
 * TabBar - 多标签页导航
 * 支持点击切换、X 关闭、右键菜单（关闭当前/关闭其他/关闭所有）
 */
import { computed, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NDropdown } from 'naive-ui'
import { useTabsStore } from '@/stores/tabs'

const router = useRouter()
const tabsStore = useTabsStore()
const { t } = useI18n()

/** 右键菜单状态 */
const showContextMenu = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const contextMenuTab = ref('')

const contextMenuOptions = computed(() => [
  {
    label: '关闭当前',
    key: 'closeCurrent',
    disabled: !tabsStore.tabs.find((tab) => tab.path === contextMenuTab.value)?.closable,
  },
  { label: '关闭其他', key: 'closeOthers' },
  { label: '关闭左侧', key: 'closeLeft' },
  { label: '关闭右侧', key: 'closeRight' },
  { type: 'divider', key: 'd1' },
  { label: '关闭所有', key: 'closeAll' },
])

/** 点击标签切换 */
function handleTabClick(path: string) {
  tabsStore.activeTab = path
  router.push(path)
}

/** 关闭标签 */
function handleClose(e: Event, path: string) {
  e.stopPropagation()
  const prev = tabsStore.activeTab
  tabsStore.removeTab(path)
  if (prev === path) {
    router.push(tabsStore.activeTab)
  }
}

/** 右键菜单 */
function handleContextMenu(e: MouseEvent, path: string) {
  e.preventDefault()
  e.stopPropagation()
  contextMenuTab.value = path
  showContextMenu.value = false
  nextTick(() => {
    showContextMenu.value = true
    contextMenuX.value = e.clientX
    contextMenuY.value = e.clientY
  })
}

function handleContextMenuSelect(key: string) {
  showContextMenu.value = false
  const targetPath = contextMenuTab.value

  if (key === 'closeCurrent') {
    const prev = tabsStore.activeTab
    tabsStore.removeTab(targetPath)
    if (prev === targetPath) router.push(tabsStore.activeTab)
  } else if (key === 'closeOthers') {
    tabsStore.closeOthers(targetPath)
    router.push(tabsStore.activeTab)
  } else if (key === 'closeLeft') {
    tabsStore.closeLeft(targetPath)
    router.push(tabsStore.activeTab)
  } else if (key === 'closeRight') {
    tabsStore.closeRight(targetPath)
    router.push(tabsStore.activeTab)
  } else if (key === 'closeAll') {
    tabsStore.closeAll()
    router.push(tabsStore.activeTab)
  }
}

function handleClickOutside() {
  showContextMenu.value = false
}
</script>

<template>
  <div class="tab-bar">
    <div class="tab-list">
      <div
        v-for="tab in tabsStore.tabs"
        :key="tab.path"
        :class="['tab-item', { 'tab-active': tabsStore.activeTab === tab.path }]"
        @click="handleTabClick(tab.path)"
        @contextmenu="handleContextMenu($event, tab.path)"
      >
        <span class="tab-label">{{ t(tab.titleKey) }}</span>
        <span
          v-if="tab.closable"
          class="tab-close"
          @click="handleClose($event, tab.path)"
        >×</span>
      </div>
    </div>

    <!-- 右键菜单 -->
    <NDropdown
      placement="bottom-start"
      trigger="manual"
      :x="contextMenuX"
      :y="contextMenuY"
      :options="contextMenuOptions"
      :show="showContextMenu"
      @select="handleContextMenuSelect"
      @clickoutside="handleClickOutside"
    />
  </div>
</template>

<style scoped>
.tab-bar {
  display: flex;
  align-items: center;
  padding: 6px 16px 0;
  background: #fff;
  border-bottom: 1px solid #efeff5;
  overflow-x: auto;
  overflow-y: hidden;
}
.tab-bar::-webkit-scrollbar { height: 0; }
.tab-list {
  display: flex;
  gap: 4px;
  flex-wrap: nowrap;
  min-width: 0;
}
.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 13px;
  color: #666;
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
.tab-item:hover {
  color: #18a058;
  background: #f0faf4;
}
.tab-active {
  color: #18a058;
  background: #fff;
  border-color: #18a058;
  font-weight: 500;
}
.tab-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 14px;
  line-height: 1;
  border-radius: 50%;
  color: #999;
  transition: all 0.2s;
}
.tab-close:hover {
  color: #fff;
  background: #d03050;
}
.tab-label {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
