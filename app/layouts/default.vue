<template>
  <q-layout view="hHh Lpr lFf" class="bg-body">
    <!-- Header with Glassmorphism -->
    <q-header class="glass-header text-primary" height-hint="64">
      <q-toolbar class="header-toolbar q-px-md q-py-sm">
        <!-- 左側返回按鈕，首頁不顯示 -->
        <div class="header-left">
          <q-btn
            v-if="route.path !== '/'"
            flat
            dense
            round
            icon="arrow_back"
            aria-label="返回"
            class="hover-rotate"
            @click="goBack"
          />
        </div>

        <!-- 頁面標題 - 絕對定位置中 -->
        <q-toolbar-title class="header-title text-h6 text-weight-bold text-dark">
          {{ currentPageTitle }}
        </q-toolbar-title>

        <!-- 右側操作 -->
        <div class="header-right row q-gutter-sm items-center">
          <!-- 用戶選單（已登入） -->
          <div v-if="currentUser" class="row items-center q-gutter-sm">
            <q-chip
              color="primary"
              text-color="white"
              icon="verified_user"
              class="gt-sm shadow-1"
              size="sm"
            >
              {{ currentUser.role === 'caregiver' ? '看護' : '客戶' }}
            </q-chip>

            <q-btn
              flat
              round
              dense
              icon="notifications_none"
              class="text-grey-8"
              @click="showNotifications = true"
            >
              <q-badge v-if="unreadCount > 0" color="red" floating rounded>
                {{ unreadCount }}
              </q-badge>
            </q-btn>

            <q-btn-dropdown flat dense no-caps class="text-weight-medium text-dark profile-btn">
              <template #label>
                <q-avatar size="32px" class="q-mr-sm shadow-1">
                  <img
                    :src="
                      currentUser.avatar ||
                      'https://cdn.quasar.dev/img/avatar.png'
                    "
                  />
                </q-avatar>
                <span class="gt-xs">{{ currentUser.name }}</span>
              </template>
              <q-list class="menu-list">
                <q-item
                  v-close-popup
                  clickable
                  @click="router.push('/profile')"
                  class="menu-item"
                >
                  <q-item-section avatar>
                    <q-icon name="person_outline" />
                  </q-item-section>
                  <q-item-section>個人資料</q-item-section>
                </q-item>

                <q-item
                  v-close-popup
                  clickable
                  @click="router.push('/bookings')"
                  class="menu-item"
                >
                  <q-item-section avatar>
                    <q-icon name="event_note" />
                  </q-item-section>
                  <q-item-section>我的預約</q-item-section>
                </q-item>

                <q-separator class="q-my-xs" />

                <q-item v-close-popup clickable @click="handleLogout" class="menu-item text-negative">
                  <q-item-section avatar>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section>登出</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>

          <!-- 登入/註冊按鈕（未登入） -->
          <div v-else class="row q-gutter-sm items-center">
            <q-btn
              flat
              rounded
              no-caps
              label="登入"
              color="primary"
              class="text-weight-bold"
              @click="router.push('/auth/login')"
            />
            <q-separator vertical inset class="gt-xs q-mx-sm" />
            <q-btn
              unelevated
              rounded
              no-caps
              label="註冊"
              color="primary"
              class="text-weight-bold shadow-2"
              @click="router.push('/auth/register')"
            />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <!-- 導航抽屜 -->
    <q-drawer
      v-model="drawer"
      side="left"
      overlay
      behavior="mobile"
      :width="280"
      class="glass-drawer"
    >
      <div class="drawer-content fit column no-wrap">
        <!-- 平台介紹 -->
        <div class="drawer-header q-pa-lg text-center">
          <div class="logo-circle q-mx-auto q-mb-md flex flex-center">
            <q-icon name="medical_services" size="32px" color="white" />
          </div>
          <div class="text-h6 text-white text-weight-bold q-mb-xs">Care Platform</div>
          <div class="text-caption text-white opacity-80">專業看護媒合平台</div>
        </div>

        <q-scroll-area class="col q-py-md">
          <!-- 主選單 - 直接顯示清單 -->
          <q-list padding class="q-px-sm">
            <q-item
              v-for="item in mainMenuItems"
              :key="item.to"
              v-ripple
              clickable
              :to="item.to"
              exact
              class="drawer-item q-mb-xs"
              active-class="drawer-item-active"
              @click="drawer = false"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">{{ item.label }}</q-item-label>
                <q-item-label caption>{{ item.caption }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
        
        <div class="q-pa-md text-center text-caption text-grey-5">
          Version 1.0.0
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>

    <!-- 底部快速選單 -->
    <q-footer
      v-if="showFooter"
      class="glass-footer border-t mobile-footer text-primary"
    >
      <q-tabs
        v-model="activeTab"
        dense
        align="justify"
        indicator-color="primary"
        active-color="primary"
        inactive-color="grey-6"
        class="text-grey-8"
        narrow-indicator
        no-caps
      >
        <q-tab
          name="home"
          icon="home"
          label="首頁"
          @click="router.push('/')"
          class="footer-tab"
        />
        <q-tab
          name="caregivers"
          icon="people"
          label="看護師"
          @click="router.push('/caregivers')"
          class="footer-tab"
        />
        <q-tab
          name="calculator"
          icon="calculate"
          label="費用"
          @click="router.push('/booking/calculator')"
          class="footer-tab"
        />
        <q-tab
          name="menu"
          icon="menu"
          label="更多"
          @click="drawer = !drawer"
          class="footer-tab"
        />
      </q-tabs>
    </q-footer>

    <!-- 通知對話框 -->
    <q-dialog v-model="showNotifications" transition-show="scale" transition-hide="scale">
      <q-card class="card-modern" style="min-width: 320px; max-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-weight-bold">通知中心</div>
          <q-space />
          <q-btn
            flat
            dense
            round
            icon="close"
            color="grey-7"
            @click="showNotifications = false"
          />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-list separator>
            <q-item v-for="i in 3" :key="i" clickable v-ripple class="rounded-borders q-mb-sm notification-item">
              <q-item-section avatar>
                <q-avatar
                  color="blue-1"
                  text-color="primary"
                  icon="notifications_active"
                  size="md"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">新的預約確認</q-item-label>
                <q-item-label caption class="text-grey-7"
                  >您的預約已被確認，請準時到達</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label caption class="text-grey-5">5 分鐘前</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md bg-grey-1">
          <q-btn flat color="primary" label="全部已讀" class="text-weight-bold" @click="showNotifications = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

// 組合式函數
const route = useRoute()
const router = useRouter()
const $q = useQuasar()

// 響應式資料
const drawer = ref(false)
const activeTab = ref('home')
const showNotifications = ref(false)
const showUserMenu = ref(false)
const currentUser = ref<any>(null)
const unreadCount = ref(2) // Mock data

// 計算是否顯示 footer
const showFooter = computed(() => {
  // 只在特定頁面顯示 footer
  return true
})

// 頁面標題對應
const pageTitles: Record<string, string> = {
  '/': '首頁',
  '/caregivers': '找看護',
  '/bookings': '我的預約',
  '/booking/calculator': '費用試算',
  '/support/contact': '聯繫我們',
  '/support/faq': '常見問題',
  '/info/about': '關於我們',
  '/join': '成為看護師',
  '/auth/login': '登入',
  '/auth/register': '註冊',
}

// 主選單項目 - 整合所有選項
const mainMenuItems = [
  {
    to: '/',
    icon: 'home',
    label: '首頁',
    caption: '回到主頁面',
  },
  {
    to: '/caregivers',
    icon: 'people',
    label: '看護師',
    caption: '瀏覽與搜尋專業看護師',
  },
  {
    to: '/bookings',
    icon: 'event_note',
    label: '我的預約',
    caption: '查看和管理您的預約',
  },
  {
    to: '/booking/calculator',
    icon: 'calculate',
    label: '費用計算器',
    caption: '計算服務費用',
  },
  {
    to: '/join',
    icon: 'person_add',
    label: '成為看護師',
    caption: '加入我們的團隊',
  },
  {
    to: '/info/about',
    icon: 'business',
    label: '關於我們',
    caption: '了解我們的公司與服務',
  },
  {
    to: '/support/faq',
    icon: 'quiz',
    label: '常見問題',
    caption: '快速找到您需要的答案',
  },
  {
    to: '/support/contact',
    icon: 'contact_support',
    label: '聯繫我們',
    caption: '客服支援和意見回饋',
  },
]

// 計算屬性
const currentPageTitle = computed(() => {
  // 優先使用動態路由
  if (route.params.id) {
    if (route.path.includes('/caregivers/')) {
      return '看護師詳情'
    }
  }

  return pageTitles[route.path] || 'Care Platform'
})

// 方法
const goBack = async () => {
  // 檢查是否可以返回上一頁
  if (
    typeof window !== 'undefined' &&
    window.history.length > 1 &&
    route.path !== '/'
  ) {
    router.go(-1)
  } else {
    // 如果不能返回或在首頁，就返回首頁
    await router.push('/')
  }
}

// 處理登出
const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', {
      method: 'POST',
    })
    currentUser.value = null
    $q.notify({
      type: 'positive',
      message: '已成功登出',
      position: 'top',
    })
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// 檢查認證狀態
const checkAuth = async () => {
  try {
    const { user } = await $fetch('/api/auth/me')
    currentUser.value = user
  } catch (error) {
    currentUser.value = null
  }
}

// 監聽路由變化更新底部選項卡
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') {
      activeTab.value = 'home'
    } else if (newPath.startsWith('/caregivers')) {
      activeTab.value = 'caregivers'
    } else if (newPath.startsWith('/booking/calculator')) {
      activeTab.value = 'calculator'
    } else {
      // 其他頁面不選中任何 tab
      activeTab.value = ''
    }
  },
  { immediate: true },
)

// 生命週期
onMounted(() => {
  // 檢查認證狀態
  checkAuth()

  // 監聽測試頁面的抽屜開關事件
  window.addEventListener('toggle-drawer', () => {
    drawer.value = !drawer.value
  })
})
</script>

<style scoped>
.bg-body {
  background-color: var(--bg-body, #f8f9fa);
}

/* Glass Header */
.glass-header {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.header-toolbar {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.header-left {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.header-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: auto;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-right {
  margin-left: auto;
  z-index: 2;
}

/* Profile Button */
.profile-btn {
  border-radius: 24px;
  padding-right: 12px;
  padding-left: 4px;
  transition: background 0.3s;
}

.profile-btn:hover {
  background: rgba(0,0,0,0.05);
}

/* Menu Styles */
.menu-list {
  min-width: 200px;
  border-radius: 12px;
}

.menu-item {
  border-radius: 8px;
  margin: 4px 8px;
}

.menu-item:hover {
  background: var(--bg-body, #f5f5f5);
}

/* Glass Footer */
.glass-footer {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: env(safe-area-inset-bottom);
}

.footer-tab {
  transition: all 0.2s ease;
}

.footer-tab:hover {
  background: rgba(var(--primary-rgb, 25, 118, 210), 0.05);
}

/* Drawer Styles */
.glass-drawer :deep(.q-drawer__content) {
  background: #ffffff;
}

.drawer-header {
  background: linear-gradient(135deg, var(--primary-color, #1976d2), var(--secondary-color, #26a69a));
}

.logo-circle {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  backdrop-filter: blur(4px);
}

.drawer-item {
  border-radius: 12px;
  color: #555;
  transition: all 0.2s;
}

.drawer-item:hover {
  background: rgba(0, 0, 0, 0.03);
  color: var(--primary-color, #1976d2);
}

.drawer-item-active {
  background: rgba(var(--primary-rgb, 25, 118, 210), 0.1);
  color: var(--primary-color, #1976d2);
}

.opacity-80 {
  opacity: 0.8;
}

/* Notification Dialog */
.notification-item {
  transition: background 0.2s;
}

.notification-item:hover {
  background: #f8f9fa;
}

/* Animations */
.hover-rotate {
  transition: transform 0.3s ease;
}

.hover-rotate:hover {
  transform: rotate(-15deg);
}

/* Responsive */
@media (max-width: 768px) {
  .header-title {
    font-size: 1.1rem;
    max-width: 50%;
  }
}
</style>