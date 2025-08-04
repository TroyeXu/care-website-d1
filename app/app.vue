<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- 左側按鈕 -->
        <q-btn
          v-if="canGoBack"
          flat
          dense
          round
          icon="arrow_back"
          class="q-mr-sm"
          aria-label="返回"
          @click="goBack"
        />
        <q-btn
          v-else
          flat
          dense
          round
          icon="menu"
          class="q-mr-sm"
          aria-label="選單"
          @click="drawer = !drawer"
        />

        <!-- 頁面標題 -->
        <q-toolbar-title class="text-h6">
          {{ currentPageTitle }}
        </q-toolbar-title>

        <!-- 右側操作 -->
        <div class="row q-gutter-xs">
          <!-- 聯絡我們 -->
          <q-btn
            flat
            label="聯絡我們"
            color="primary"
            @click="router.push('/support/contact')"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!-- 導航抽屉 -->
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

        <!-- 主選單 -->
        <q-list padding>
          <q-item-label header class="text-weight-medium text-grey-8">
            主選單
          </q-item-label>

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

          <!-- 移除用戶中心區塊 -->

          <q-separator class="q-my-md" />

          <!-- 其他選項 -->
          <q-item-label header class="text-weight-medium text-grey-8">
            其他
          </q-item-label>

          <q-item
            v-for="item in otherMenuItems"
            :key="item.to"
            v-ripple
            clickable
            :to="item.to"
            exact
            class="rounded-borders q-ma-xs"
            @click="drawer = false"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" color="grey-6" />
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
      <NuxtPage />
    </q-page-container>

    <!-- 底部快速選單 -->
    <q-footer elevated class="bg-white border-t mobile-footer">
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

    <!-- 用戶選單對話框 -->
    <q-dialog v-model="showUserMenu">
      <q-card style="min-width: 250px">
        <q-card-section v-if="authStore.currentUser">
          <div class="text-center">
            <q-avatar size="60px" class="q-mb-md">
              <img
                v-if="authStore.currentUser.avatar"
                :src="authStore.currentUser.avatar"
                :alt="authStore.currentUser.name"
              />
              <q-icon v-else name="person" />
            </q-avatar>
            <div class="text-h6">{{ authStore.currentUser.name }}</div>
            <div class="text-caption text-grey-6">
              {{ authStore.currentUser.email }}
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-list>
          <q-item
            clickable
            @click="router.push('/user/profile'); showUserMenu = false"
          >
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>個人資料</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="router.push('/user/settings'); showUserMenu = false"
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>設定</q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable @click="handleLogout">
            <q-item-section avatar>
              <q-icon name="logout" color="negative" />
            </q-item-section>
            <q-item-section>登出</q-item-section>
          </q-item>
        </q-list>
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

// 頁面標題對應
const pageTitles: Record<string, string> = {
  '/': '首頁',
  '/caregivers': '看護師列表',
  '/caregivers/search': '搜尋看護師',
  '/booking/calculator': '費用計算器',
  '/support/contact': '聯繫我們',
  '/info/about': '關於我們',
  '/join': '成為看護師',
}

// 主選單項目
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
    label: '看護師列表',
    caption: '瀏覽所有可用看護師',
  },
  {
    to: '/caregivers/search',
    icon: 'search',
    label: '搜尋看護師',
    caption: '進階搜尋和篩選',
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
]

// 移除用戶功能選單，改為空陣列
const userMenuItems: any[] = []

// 其他選單項目
const otherMenuItems = [
  {
    to: '/info/about',
    icon: 'business',
    label: '關於我們',
    caption: '了解我們的公司與服務',
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

const canGoBack = computed(() => {
  if (typeof window === 'undefined') return false
  return window.history.length > 1 && route.path !== '/'
})

// 方法
const goBack = async () => {
  if (canGoBack.value) {
    router.go(-1)
  } else {
    await router.push('/')
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
      activeTab.value = 'home'
    }
  },
  { immediate: true },
)

// 生命週期
onMounted(() => {
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
  .q-header .q-toolbar {
    padding: 0 12px;
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
  .q-toolbar-title {
    font-size: 16px;
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
</style>
