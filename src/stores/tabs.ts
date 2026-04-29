import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TabItem {
  path: string
  titleKey: string // i18n key like 'menu.workspace'
  name: string
  closable: boolean
}

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<TabItem[]>([
    { path: '/dashboard/workspace', titleKey: 'menu.workspace', name: 'Workspace', closable: false },
  ])
  const activeTab = ref('/dashboard/workspace')

  function addTab(tab: TabItem) {
    if (!tabs.value.find(t => t.path === tab.path)) {
      tabs.value.push(tab)
    }
    activeTab.value = tab.path
  }

  function removeTab(path: string) {
    const idx = tabs.value.findIndex(t => t.path === path)
    if (idx === -1 || !tabs.value[idx].closable) return
    tabs.value.splice(idx, 1)
    if (activeTab.value === path) {
      activeTab.value = tabs.value[Math.max(0, idx - 1)]?.path || '/dashboard/workspace'
    }
  }

  function closeOthers(path: string) {
    tabs.value = tabs.value.filter(t => !t.closable || t.path === path)
    activeTab.value = path
  }

  function closeAll() {
    tabs.value = tabs.value.filter(t => !t.closable)
    activeTab.value = tabs.value[0]?.path || '/dashboard/workspace'
  }

  return { tabs, activeTab, addTab, removeTab, closeOthers, closeAll }
})
