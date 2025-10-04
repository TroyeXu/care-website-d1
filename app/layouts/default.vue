<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="header-toolbar">
        <!-- 左側返回按鈕，首頁不顯示 -->
        <div class="header-left">
          <q-btn
            v-if="route.path !== '/'"
            flat
            dense
            round
            icon="arrow_back"
            aria-label="返回"
            @click="goBack"
          />
        </div>

        <!-- 頁面標題 - 絕對定位置中 -->
        <q-toolbar-title class="header-title text-h6">
          {{ currentPageTitle }}
        </q-toolbar-title>

        <!-- 右側操作 -->
        <div class="header-right row q-gutter-xs items-center">
          <!-- 用戶選單（已登入） -->
          <div v-if="currentUser" class="row items-center q-gutter-sm">
            <q-chip
              color="primary"
              text-color="white"
              icon="verified_user"
              class="gt-sm"
              size="sm"
            >
              {{ currentUser.role === 'caregiver' ? '看護' : '客戶' }}
            </q-chip>

            <q-btn
              flat
              round
              dense
              icon="notifications"
              @click="showNotifications = true"
            >
              <q-badge v-if="unreadCount > 0" color="red" floating>
                {{ unreadCount }}
              </q-badge>
            </q-btn>

            <q-btn-dropdown flat dense no-caps class="text-weight-medium">
              <template #label>
                <q-avatar size="28px" class="q-mr-sm">
                  <img
                    :src="
                      currentUser.avatar ||
                      'https://cdn.quasar.dev/img/avatar.png'
                    "
                  />
                </q-avatar>
                {{ currentUser.name }}
              </template>
              <q-list>
                <q-item
                  v-close-popup
                  clickable
                  @click="router.push('/profile')"
                >
                  <q-item-section avatar>
                    <q-icon name="person" />
                  </q-item-section>
                  <q-item-section>個人資料</q-item-section>
                </q-item>

                <q-item
                  v-close-popup
                  clickable
                  @click="router.push('/bookings')"
                >
                  <q-item-section avatar>
                    <q-icon name="event_note" />
                  </q-item-section>
                  <q-item-section>我的預約</q-item-section>
                </q-item>

                <q-separator />

                <q-item v-close-popup clickable @click="handleLogout">
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
              dense
              no-caps
              label="登入"
              color="primary"
              class="text-weight-medium"
              @click="router.push('/auth/login')"
            />
            <q-separator vertical inset class="gt-xs" />
            <q-btn
              flat
              dense
              no-caps
              label="註冊"
              color="primary"
              class="text-weight-medium"
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
      bordered
      :width="280"
      :breakpoint="768"
      class="bg-white"
    >
      <q-scroll-area class="fit">
        <!-- 平台介紹 -->
        <div class="bg-primary text-white q-pa-md text-center">
          <q-icon name="medical_services" size="40px" class="q-mb-sm" />
          <div class="text-h6 q-mb-xs">專業看護媒合平台</div>
          <div class="text-caption">為您找到最合適的照護服務</div>
        </div>

        <q-separator />

        <!-- 主選單 - 直接顯示清單 -->
        <q-list padding>
          <q-item
            v-for="item in mainMenuItems"
            :key="item.to"
            v-ripple
            clickable
            :to="item.to"
            exact
            class="rounded-borders q-ma-xs"
            @click="drawer = false"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.caption }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>

    <!-- 底部快速選單 -->
    <q-footer
      v-if="showFooter"
      elevated
      class="bg-white border-t mobile-footer"
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
      >
        <q-tab
          name="home"
          icon="home"
          label="首頁"
          no-caps
          @click="router.push('/')"
        />
        <q-tab
          name="caregivers"
          icon="people"
          label="看護師"
          no-caps
          @click="router.push('/caregivers')"
        />
        <q-tab
          name="calculator"
          icon="calculate"
          label="費用計算器"
          no-caps
          @click="router.push('/booking/calculator')"
        />
        <q-tab
          name="menu"
          icon="menu"
          label="更多"
          no-caps
          @click="drawer = !drawer"
        />
      </q-tabs>
    </q-footer>

    <!-- 通知對話框 -->
    <q-dialog v-model="showNotifications">
      <q-card style="min-width: 300px; max-width: 400px">
        <q-card-section class="row items-center">
          <div class="text-h6">通知</div>
          <q-space />
          <q-btn
            flat
            dense
            round
            icon="close"
            @click="showNotifications = false"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list>
            <q-item v-for="i in 3" :key="i" clickable>
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  icon="notifications"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>新的預約確認</q-item-label>
                <q-item-label caption
                  >您的預約已被確認，請準時到達</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label caption>5 分鐘前</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="primary" @click="showNotifications = false">
            全部已讀
          </q-btn>
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
const unreadCount = ref(0)

// 計算是否顯示 footer
const showFooter = computed(() => {
  // 只在特定頁面顯示 footer
  return true
})

// 頁面標題對應
const pageTitles: Record<string, string> = {
  '/': '首頁',
  '/caregivers': '看護師',
  '/bookings': '我的預約',
  '/booking/calculator': '費用計算器',
  '/support/contact': '聯繫我們',
  '/support/faq': '常見問題',
  '/info/about': '關於我們',
  '/join': '成為看護師',
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

  return pageTitles[route.path] || '護理服務平台'
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
.border-t {
  border-top: 1px solid #e0e0e0;
}

/* Header 樣式優化 */
.q-header {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

/* Header 佈局 - 實現標題置中 */
.header-toolbar {
  position: relative;
  padding: 0 12px;
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

.q-header .q-btn-dropdown {
  padding: 6px 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.q-header .q-btn-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.q-header .q-avatar {
  border: 2px solid #f5f5f5;
}

/* Mobile Footer 優化 */
.mobile-footer {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* 確保內容不被 footer 遮擋 */
.q-page-container {
  padding-bottom: 56px;
}

/* Footer 預設樣式 */
.q-footer {
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
}

.q-footer .q-tabs {
  padding: 4px 0;
}

.q-footer .q-tab {
  min-height: 48px;
  padding: 4px 8px;
}

.q-footer .q-tab__icon {
  font-size: 24px;
  margin-bottom: 2px;
}

.q-footer .q-tab__label {
  font-size: 11px;
  margin-top: 2px;
  line-height: 1.2;
}

/* 響應式優化 */
@media (max-width: 768px) {
  .header-toolbar {
    padding: 0 8px;
    min-height: 56px;
  }

  .header-left {
    left: 8px;
  }

  .header-title {
    max-width: 50%;
    font-size: 18px;
  }

  .header-right {
    padding-right: 8px;
  }

  .q-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2000;
  }

  .q-footer .q-tabs {
    padding: 2px 0;
  }

  .q-footer .q-tab {
    min-height: 52px;
    font-size: 10px;
    padding: 6px 4px;
  }

  .q-footer .q-tab__icon {
    font-size: 20px;
    margin-bottom: 2px;
  }

  .q-footer .q-tab__label {
    font-size: 10px;
    margin-top: 0;
  }

  /* 為 footer 留出空間 */
  .q-page-container {
    padding-bottom: 52px;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 16px;
    max-width: 45%;
  }

  .header-left {
    left: 4px;
  }

  .header-right {
    padding-right: 4px;
  }

  .q-footer .q-tab {
    min-height: 48px;
    font-size: 9px;
    padding: 4px 2px;
  }

  .q-footer .q-tab__icon {
    font-size: 18px;
  }

  .q-footer .q-tab__label {
    font-size: 9px;
    margin-top: 1px;
  }

  /* 為 footer 留出空間 */
  .q-page-container {
    padding-bottom: 48px;
  }
}

/* Drawer 優化 */
.q-drawer .q-item {
  border-radius: 8px;
  margin: 2px 8px;
}

.q-drawer .q-item:hover {
  background-color: rgba(25, 118, 210, 0.08);
}

.q-drawer .q-item.router-link-active {
  background-color: rgba(25, 118, 210, 0.12);
  color: #1976d2;
}

/* Header 動畫 */
.q-header {
  transition: all 0.3s ease;
}

/* Footer Tab 動畫 */
.q-tab {
  transition: all 0.2s ease;
}

.q-tab:hover {
  transform: translateY(-1px);
}

/* 通知小紅點動畫 */
.q-badge {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Dialog 優化 */
.q-dialog .q-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
}

/* 用戶頭像懸停效果 */
.q-avatar {
  transition: transform 0.2s ease;
}

.q-avatar:hover {
  transform: scale(1.05);
}

/* 防止水平滾動 */
:deep(.q-page) {
  overflow-x: hidden;
  max-width: 100vw;
}

:deep(.q-layout) {
  overflow-x: hidden;
}

/* 修正 Quasar 的 row 可能造成的溢出 */
:deep(.row.q-col-gutter-md) {
  margin: 0;
  padding: 0 1rem;
}
</style>
