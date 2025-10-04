<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="adminStore.toggleSidebar"
        />

        <q-toolbar-title>
          <div class="text-h6">管理後台</div>
        </q-toolbar-title>

        <!-- 通知按鈕 -->
        <q-btn flat round icon="notifications" class="q-mr-sm">
          <q-badge
            v-if="adminStore.unreadNotifications > 0"
            color="red"
            floating
          >
            {{ adminStore.unreadNotifications }}
          </q-badge>

          <q-menu>
            <q-list style="min-width: 300px">
              <q-item-label header>通知</q-item-label>

              <template v-if="adminStore.notifications.length > 0">
                <q-item
                  v-for="notification in adminStore.notifications.slice(0, 5)"
                  :key="notification.id"
                  clickable
                  @click="adminStore.markNotificationRead(notification.id)"
                >
                  <q-item-section avatar>
                    <q-icon
                      :name="getNotificationIcon(notification.type)"
                      :color="getNotificationColor(notification.type)"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ notification.title }}</q-item-label>
                    <q-item-label caption>{{
                      notification.message
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>

              <q-item v-else>
                <q-item-section>
                  <q-item-label>沒有新通知</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable @click="adminStore.markAllNotificationsRead">
                <q-item-section>標記全部已讀</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <!-- 用戶選單 -->
        <q-btn flat round>
          <q-avatar size="32px">
            <img
              :src="
                adminStore.currentAdmin?.avatar ||
                'https://i.pravatar.cc/150?img=1'
              "
            />
          </q-avatar>

          <q-menu>
            <q-list style="min-width: 200px">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img
                      :src="
                        adminStore.currentAdmin?.avatar ||
                        'https://i.pravatar.cc/150?img=1'
                      "
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{
                    adminStore.currentAdmin?.name
                  }}</q-item-label>
                  <q-item-label caption>{{
                    adminStore.currentAdmin?.email
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item
                v-close-popup
                clickable
                @click="navigateTo('/admin/profile')"
              >
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>個人資料</q-item-section>
              </q-item>

              <q-item
                v-close-popup
                clickable
                @click="navigateTo('/admin/settings')"
              >
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>
                <q-item-section>系統設定</q-item-section>
              </q-item>

              <q-separator />

              <q-item v-close-popup clickable @click="handleLogout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>登出</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Sidebar -->
    <q-drawer
      v-model="adminStore.sidebarOpen"
      show-if-above
      bordered
      :width="250"
    >
      <q-list>
        <q-item-label header class="text-grey-8"> 功能選單 </q-item-label>

        <!-- 儀表板 -->
        <q-item
          clickable
          :active="route.path === '/admin/dashboard'"
          @click="navigateTo('/admin/dashboard')"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>儀表板</q-item-label>
          </q-item-section>
        </q-item>

        <!-- 看護師管理 -->
        <q-expansion-item
          v-if="adminStore.hasPermission('caregiver.view')"
          icon="medical_services"
          label="看護師管理"
          :default-opened="route.path.startsWith('/admin/caregivers')"
        >
          <q-item
            clickable
            :inset-level="1"
            :active="route.path === '/admin/caregivers'"
            @click="navigateTo('/admin/caregivers')"
          >
            <q-item-section>看護師列表</q-item-section>
          </q-item>

          <q-item
            v-if="adminStore.hasPermission('caregiver.verify')"
            clickable
            :inset-level="1"
            :active="route.path === '/admin/caregivers/pending'"
            @click="navigateTo('/admin/caregivers/pending')"
          >
            <q-item-section>
              待審核
              <q-badge v-if="pendingCaregivers > 0" color="red" class="q-ml-sm">
                {{ pendingCaregivers }}
              </q-badge>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- 預約管理 -->
        <q-expansion-item
          v-if="adminStore.hasPermission('booking.view')"
          icon="calendar_month"
          label="預約管理"
          :default-opened="route.path.startsWith('/admin/bookings')"
        >
          <q-item
            clickable
            :inset-level="1"
            :active="route.path === '/admin/bookings'"
            @click="navigateTo('/admin/bookings')"
          >
            <q-item-section>預約列表</q-item-section>
          </q-item>

          <q-item
            clickable
            :inset-level="1"
            :active="route.path === '/admin/bookings/disputes'"
            @click="navigateTo('/admin/bookings/disputes')"
          >
            <q-item-section>
              爭議處理
              <q-badge v-if="openDisputes > 0" color="orange" class="q-ml-sm">
                {{ openDisputes }}
              </q-badge>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- 用戶管理 -->
        <q-item
          v-if="adminStore.hasPermission('user.view')"
          clickable
          :active="route.path.startsWith('/admin/users')"
          @click="navigateTo('/admin/users')"
        >
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>用戶管理</q-item-label>
          </q-item-section>
        </q-item>

        <!-- 內容管理 -->
        <q-expansion-item
          v-if="adminStore.hasPermission('content.view')"
          icon="article"
          label="內容管理"
          :default-opened="route.path.startsWith('/admin/content')"
        >
          <q-item
            clickable
            :inset-level="1"
            :active="route.path === '/admin/content/faqs'"
            @click="navigateTo('/admin/content/faqs')"
          >
            <q-item-section>FAQ 管理</q-item-section>
          </q-item>

          <q-item
            clickable
            :inset-level="1"
            :active="route.path === '/admin/content/homepage'"
            @click="navigateTo('/admin/content/homepage')"
          >
            <q-item-section>首頁設定</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- 報表分析 -->
        <q-item
          v-if="adminStore.hasPermission('report.view')"
          clickable
          :active="route.path.startsWith('/admin/reports')"
          @click="navigateTo('/admin/reports')"
        >
          <q-item-section avatar>
            <q-icon name="analytics" />
          </q-item-section>
          <q-item-section>
            <q-item-label>報表分析</q-item-label>
          </q-item-section>
        </q-item>

        <!-- 系統設定 -->
        <q-item
          v-if="adminStore.hasPermission('settings.view')"
          clickable
          :active="route.path.startsWith('/admin/settings')"
          @click="navigateTo('/admin/settings')"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>系統設定</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useAdminStore } from '~/stores/admin'

const route = useRoute()
const adminStore = useAdminStore()
const $q = useQuasar()

// 待處理數量（可以從 API 取得）
const pendingCaregivers = ref(0)
const openDisputes = ref(0)

// 導航函數 - 需要明確定義在 setup 中
const router = useRouter()
const navigateTo = (path: string) => {
  router.push(path)
}

// 通知圖示
const getNotificationIcon = (type: string) => {
  const icons: Record<string, string> = {
    info: 'info',
    success: 'check_circle',
    warning: 'warning',
    error: 'error',
  }
  return icons[type] || 'info'
}

// 通知顏色
const getNotificationColor = (type: string) => {
  const colors: Record<string, string> = {
    info: 'blue',
    success: 'green',
    warning: 'orange',
    error: 'red',
  }
  return colors[type] || 'grey'
}

// 登出處理
const handleLogout = () => {
  $q.dialog({
    title: '確認登出',
    message: '確定要登出管理後台嗎？',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await adminStore.logout()
  })
}

// 載入待處理數量
onMounted(async () => {
  // TODO: 從 API 取得待處理數量
  // const { data } = await $fetch('/api/admin/dashboard/pending')
  // pendingCaregivers.value = data.pending_caregivers
  // openDisputes.value = data.open_disputes
})
</script>

<style scoped>
.q-item--active {
  background: rgba(0, 0, 0, 0.05);
}
</style>
