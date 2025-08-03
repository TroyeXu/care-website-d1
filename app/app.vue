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
          @click="goBack"
          aria-label="返回"
        />
        <q-btn
          v-else
          flat
          dense
          round
          icon="menu"
          class="q-mr-sm"
          @click="drawer = !drawer"
          aria-label="選單"
        />
        
        <!-- 頁面標題 -->
        <q-toolbar-title class="text-h6">
          {{ currentPageTitle }}
        </q-toolbar-title>
        
        <!-- 右側操作 -->
        <div class="row q-gutter-xs">
          <!-- 通知按鈕 -->
          <q-btn
            v-if="authStore.currentUser"
            flat
            dense
            round
            icon="notifications"
            @click="showNotifications = true"
          >
            <q-badge
              v-if="unreadNotifications > 0"
              color="negative"
              floating
              rounded
            >
              {{ unreadNotifications }}
            </q-badge>
          </q-btn>
          
          <!-- 用戶頭像/登入按鈕 -->
          <q-btn
            v-if="authStore.currentUser"
            flat
            dense
            round
            @click="showUserMenu = true"
          >
            <q-avatar size="32px">
              <img
                v-if="authStore.currentUser.avatar"
                :src="authStore.currentUser.avatar"
                :alt="authStore.currentUser.name"
              />
              <q-icon v-else name="person" />
            </q-avatar>
          </q-btn>
          <q-btn
            v-else
            flat
            dense
            icon="login"
            @click="router.push('/auth/login')"
            aria-label="登入"
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
        <!-- 用戶資訊區域 -->
        <div v-if="authStore.currentUser" class="bg-primary text-white q-pa-md">
          <div class="row items-center q-gutter-md">
            <q-avatar size="50px">
              <img
                v-if="authStore.currentUser.avatar"
                :src="authStore.currentUser.avatar"
                :alt="authStore.currentUser.name"
              />
              <q-icon v-else name="person" />
            </q-avatar>
            <div>
              <div class="text-subtitle1 text-weight-medium">
                {{ authStore.currentUser.name }}
              </div>
              <div class="text-caption opacity-80">
                {{ authStore.currentUser.email }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 未登入狀態 -->
        <div v-else class="bg-grey-1 q-pa-md text-center">
          <q-icon name="person_outline" size="40px" color="grey-6" />
          <div class="text-body2 text-grey-7 q-mt-sm q-mb-md">
            登入以享受完整功能
          </div>
          <q-btn
            color="primary"
            size="sm"
            @click="router.push('/auth/login'); drawer = false"
          >
            立即登入
          </q-btn>
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
            clickable
            v-ripple
            :to="item.to"
            @click="drawer = false"
            exact
            class="rounded-borders q-ma-xs"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.caption }}</q-item-label>
            </q-item-section>
          </q-item>
          
          <q-separator class="q-my-md" />
          
          <!-- 用戶功能 -->
          <q-item-label header class="text-weight-medium text-grey-8">
            用戶中心
          </q-item-label>
          
          <q-item
            v-for="item in userMenuItems"
            :key="item.to"
            clickable
            v-ripple
            :to="item.to"
            @click="drawer = false"
            exact
            class="rounded-borders q-ma-xs"
            :disable="!authStore.currentUser && item.requireAuth"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" color="secondary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.caption }}</q-item-label>
            </q-item-section>
            <q-item-section side v-if="!authStore.currentUser && item.requireAuth">
              <q-icon name="lock" color="grey-5" size="xs" />
            </q-item-section>
          </q-item>
          
          <q-separator class="q-my-md" />
          
          <!-- 其他選項 -->
          <q-item-label header class="text-weight-medium text-grey-8">
            其他
          </q-item-label>
          
          <q-item
            v-for="item in otherMenuItems"
            :key="item.to"
            clickable
            v-ripple
            :to="item.to"
            @click="drawer = false"
            exact
            class="rounded-borders q-ma-xs"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" color="grey-6" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.caption }}</q-item-label>
            </q-item-section>
          </q-item>
          
          <!-- 登出按鈕 -->
          <q-item
            v-if="authStore.currentUser"
            clickable
            v-ripple
            @click="handleLogout"
            class="rounded-borders q-ma-xs text-negative"
          >
            <q-item-section avatar>
              <q-icon name="logout" color="negative" />
            </q-item-section>
            <q-item-section>
              <q-item-label>登出</q-item-label>
              <q-item-label caption>結束此次工作階段</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <NuxtPage />
    </q-page-container>

    <!-- 底部快速選單 -->
    <q-footer elevated class="bg-white border-t">
      <q-tabs
        v-model="activeTab"
        dense
        align="justify"
        indicator-color="primary"
        active-color="primary"
        inactive-color="grey-6"
        class="text-grey-8"
      >
        <q-tab
          name="home"
          icon="home"
          label="首頁"
          @click="router.push('/')"
          no-caps
        />
        <q-tab
          name="caregivers"
          icon="people"
          label="看護師"
          @click="router.push('/caregivers')"
          no-caps
        />
        <q-tab
          name="booking"
          icon="calendar_today"
          label="預約"
          @click="router.push('/booking/match')"
          no-caps
        />
        <q-tab
          name="profile"
          icon="person"
          label="我的"
          @click="handleProfileClick"
          no-caps
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
                <q-avatar color="primary" text-color="white" icon="notifications" />
              </q-item-section>
              <q-item-section>
                <q-item-label>新的預約確認</q-item-label>
                <q-item-label caption>您的預約已被確認，請準時到達</q-item-label>
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
          <q-item clickable @click="router.push('/user/profile'); showUserMenu = false">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>個人資料</q-item-section>
          </q-item>
          
          <q-item clickable @click="router.push('/user/settings'); showUserMenu = false">
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
import { useAuthStore } from '~/stores/auth'

// 組合式函數
const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

// 響應式資料
const drawer = ref(false)
const activeTab = ref('home')
const showNotifications = ref(false)
const showUserMenu = ref(false)
const unreadNotifications = ref(3) // 模擬數據

// 頁面標題對應
const pageTitles: Record<string, string> = {
  '/': '首頁',
  '/caregivers': '看護師列表',
  '/caregivers/search': '搜尋看護師',
  '/booking/match': '智能媒合',
  '/booking/payments': '支付管理',
  '/booking/schedule': '排程管理',
  '/user/dashboard': '個人儀表板',
  '/auth/login': '登入',
  '/auth/register': '註冊',
  '/support/contact': '聯繫我們',
  '/support/reviews': '用戶評價',
  '/info/services': '服務介紹',
  '/info/pricing': '計費說明',
  '/info/about': '關於我們'
}

// 主選單項目
const mainMenuItems = [
  {
    to: '/',
    icon: 'home',
    label: '首頁',
    caption: '回到主頁面'
  },
  {
    to: '/caregivers',
    icon: 'people',
    label: '看護師列表',
    caption: '瀏覽所有可用看護師'
  },
  {
    to: '/caregivers/search',
    icon: 'search',
    label: '搜尋看護師',
    caption: '進階搜尋和篩選'
  },
  {
    to: '/booking/match',
    icon: 'psychology',
    label: '智能媒合',
    caption: '找到最適合的看護師'
  }
]

// 用戶功能選單
const userMenuItems = [
  {
    to: '/user/dashboard',
    icon: 'dashboard',
    label: '個人儀表板',
    caption: '查看您的統計資訊',
    requireAuth: true
  },
  {
    to: '/booking/schedule',
    icon: 'calendar_today',
    label: '排程管理',
    caption: '管理您的預約排程',
    requireAuth: true
  },
  {
    to: '/booking/payments',
    icon: 'payment',
    label: '支付管理',
    caption: '查看支付紀錄',
    requireAuth: true
  },
  {
    to: '/support/reviews',
    icon: 'rate_review',
    label: '我的評價',
    caption: '查看和管理評價',
    requireAuth: false
  }
]

// 其他選單項目
const otherMenuItems = [
  {
    to: '/info/services',
    icon: 'info',
    label: '服務介紹',
    caption: '了解我們的服務'
  },
  {
    to: '/info/pricing',
    icon: 'attach_money',
    label: '計費說明',
    caption: '查看服務費用'
  },
  {
    to: '/support/contact',
    icon: 'contact_support',
    label: '聯繫我們',
    caption: '客服支援和意見回饋'
  },
  {
    to: '/info/about',
    icon: 'business',
    label: '關於我們',
    caption: '了解我們的公司'
  }
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

const handleProfileClick = async () => {
  if (authStore.currentUser) {
    await router.push('/user/dashboard')
  } else {
    await router.push('/auth/login')
  }
}

const handleLogout = () => {
  $q.dialog({
    title: '確認登出',
    message: '您確定要登出嗎？',
    ok: {
      color: 'negative',
      label: '登出'
    },
    cancel: {
      color: 'grey',
      label: '取消'
    }
  }).onOk(async () => {
    authStore.logout()
    drawer.value = false
    await router.push('/')
    $q.notify({
      type: 'positive',
      message: '已成功登出',
      timeout: 2000
    })
  })
}

// 監聽路由變化更新底部選項卡
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') {
      activeTab.value = 'home'
    } else if (newPath.startsWith('/caregivers')) {
      activeTab.value = 'caregivers'
    } else if (newPath.startsWith('/booking') || newPath.startsWith('/user')) {
      activeTab.value = 'booking'
    } else {
      activeTab.value = 'profile'
    }
  },
  { immediate: true }
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

/* 響應式優化 */
@media (max-width: 768px) {
  .q-header .q-toolbar {
    padding: 0 12px;
  }
  
  .q-footer .q-tabs {
    padding: 8px 0;
  }
  
  .q-footer .q-tab {
    min-height: 60px;
    font-size: 11px;
  }
  
  .q-footer .q-tab__icon {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .q-toolbar-title {
    font-size: 16px;
  }
  
  .q-footer .q-tab {
    min-height: 56px;
    font-size: 10px;
  }
  
  .q-footer .q-tab__icon {
    font-size: 18px;
  }
  
  .q-footer .q-tab__label {
    margin-top: 2px;
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
