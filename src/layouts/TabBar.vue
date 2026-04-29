<script setup lang="ts">
/**
 * TabBar - 多标签页导航
 * 类似浏览器标签页，支持点击切换、关闭、右键菜单
 */
import { computed, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NTabs, NTabPane, NDropdown } from 'naive-ui'
import { useTabsStore } from '@/stores/tabs'

const router = useRouter()
const tabsStore = useTabsStore()
const { t } = useI18n()

const activeTab = computed({
  get: () => tabsStore.activeTab,
  set: (val: string) => {
    tabsStore.activeTab = val
  },
})

/** Switch tab on click */
function handleTabChange(value: string) {
  tabsStore.activeTab = value
  router.push(value)
}

/** Close tab */
function handleClose(name: string) {
  const previousActive = tabsStore.activeTab
  tabsStore.removeTab(name)
  if (previousActive === name) {
    router.push(tabsStore.activeTab)
  }
}

/** Right-click context menu */
const showContextMenu = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const contextMenuTab = ref('')

const contextMenuOptions = computed(() => [
  { label: t('tabs.closeCurrent'), key: 'closeCurrent', disabled: !tabsStore.tabs.find(t => t.path === contextMenuTab.value)?.closable },
  { label: t('tabs.closeOthers'), key: 'closeOthers' },
  { label: t('tabs.closeAll'), key: 'closeAll' },
])

function handleContextMenu(e: MouseEvent, path: string) {
  e.preventDefault()
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
  if (key === 'closeCurrent') {
    const prev = tabsStore.activeTab
    tabsStore.removeTab(contextMenuTab.value)
    if (prev === contextMenuTab.value) {
      router.push(tabsStore.activeTab)
    }
  } else if (key === 'closeOthers') {
    tabsStore.closeOthers(contextMenuTab.value)
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
    <NTabs
      type="card"
      :value="activeTab"
      @update:value="handleTabChange"
      @close="handleClose"
      size="small"
    >
      <NTabPane
        v-for="tab in tabsStore.tabs"
        :key="tab.path"
        :name="tab.path"
        :tab="t(tab.titleKey)"
        :closable="tab.closable"
        @contextmenu.prevent="handleContextMenu($event, tab.path)"
      />
    </NTabs>
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
  padding: 6px 16px 0;
  background: #fff;
  border-bottom: 1px solid #efeff5;
}
.tab-bar :deep(.n-tabs-tab) {
  --n-tab-padding: 6px 16px;
}
</style>
