<template>
  <q-page class="q-pa-md">
    <!-- 頁面標題 -->
    <div class="row q-mb-lg">
      <div class="col">
        <h4 class="q-ma-none">儀表板</h4>
        <div class="text-grey-7">
          歡迎回來，{{ adminStore.currentAdmin?.name }}
        </div>
      </div>
      <div class="col-auto">
        <q-btn
          color="primary"
          label="重新整理"
          icon="refresh"
          :loading="loading"
          @click="loadDashboardData"
        />
      </div>
    </div>

    <!-- 統計卡片 -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-grey-7 text-caption">總用戶數</div>
                <div class="text-h5 q-mt-sm">{{ stats.totalUsers }}</div>
                <div class="text-caption text-green q-mt-xs">
                  <q-icon name="trending_up" />
                  本月新增 {{ stats.newUsersThisMonth }}
                </div>
              </div>
              <div class="col-auto">
                <q-icon name="people" size="48px" color="blue-6" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-grey-7 text-caption">活躍看護師</div>
                <div class="text-h5 q-mt-sm">{{ stats.activeCaregivers }}</div>
                <div class="text-caption text-orange q-mt-xs">
                  <q-icon name="pending" />
                  待審核 {{ stats.pendingCaregivers }}
                </div>
              </div>
              <div class="col-auto">
                <q-icon name="medical_services" size="48px" color="green-6" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-grey-7 text-caption">本月預約</div>
                <div class="text-h5 q-mt-sm">{{ stats.monthlyBookings }}</div>
                <div class="text-caption text-blue q-mt-xs">
                  <q-icon name="schedule" />
                  進行中 {{ stats.activeBookings }}
                </div>
              </div>
              <div class="col-auto">
                <q-icon name="calendar_month" size="48px" color="orange-6" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-grey-7 text-caption">本月收入</div>
                <div class="text-h5 q-mt-sm">
                  ${{ stats.monthlyRevenue.toLocaleString() }}
                </div>
                <div class="text-caption text-green q-mt-xs">
                  <q-icon name="trending_up" />
                  較上月 +{{ stats.revenueGrowth }}%
                </div>
              </div>
              <div class="col-auto">
                <q-icon name="attach_money" size="48px" color="purple-6" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- 待處理事項 -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 q-mb-md">待處理事項</div>
            <q-list separator>
              <q-item
                clickable
                @click="navigateTo('/admin/caregivers/pending')"
              >
                <q-item-section avatar>
                  <q-avatar color="orange" text-color="white">
                    {{ pendingItems.caregivers }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>待審核看護師</q-item-label>
                  <q-item-label caption>需要審核新註冊的看護師</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="chevron_right" />
                </q-item-section>
              </q-item>

              <q-item clickable @click="navigateTo('/admin/bookings/disputes')">
                <q-item-section avatar>
                  <q-avatar color="red" text-color="white">
                    {{ pendingItems.disputes }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>待處理爭議</q-item-label>
                  <q-item-label caption>需要處理的預約爭議</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="chevron_right" />
                </q-item-section>
              </q-item>

              <q-item clickable @click="navigateTo('/admin/bookings/refunds')">
                <q-item-section avatar>
                  <q-avatar color="blue" text-color="white">
                    {{ pendingItems.refunds }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>待處理退款</q-item-label>
                  <q-item-label caption>需要處理的退款申請</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="chevron_right" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- 最近活動 -->
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 q-mb-md">最近活動</div>
            <q-timeline color="primary">
              <q-timeline-entry
                v-for="activity in recentActivities"
                :key="activity.id"
                :title="activity.title"
                :subtitle="activity.time"
                :icon="activity.icon"
                :color="activity.color"
              >
                {{ activity.description }}
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- 快速操作 -->
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 q-mb-md">快速操作</div>
            <div class="row q-gutter-sm">
              <q-btn
                color="primary"
                icon="person_add"
                label="新增用戶"
                @click="navigateTo('/admin/users/new')"
              />
              <q-btn
                color="green"
                icon="medical_services"
                label="審核看護師"
                @click="navigateTo('/admin/caregivers/pending')"
              />
              <q-btn
                color="orange"
                icon="calendar_month"
                label="查看預約"
                @click="navigateTo('/admin/bookings')"
              />
              <q-btn
                color="purple"
                icon="analytics"
                label="查看報表"
                @click="navigateTo('/admin/reports')"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin'

// 設定頁面 meta
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const adminStore = useAdminStore()
const router = useRouter()

// 導航函數
const navigateTo = (path: string) => {
  router.push(path)
}

// 狀態
const loading = ref(false)

// 統計資料
const stats = ref({
  totalUsers: 0,
  newUsersThisMonth: 0,
  activeCaregivers: 0,
  pendingCaregivers: 0,
  monthlyBookings: 0,
  activeBookings: 0,
  monthlyRevenue: 0,
  revenueGrowth: 0,
})

// 待處理事項
const pendingItems = ref({
  caregivers: 0,
  disputes: 0,
  refunds: 0,
})

// 最近活動
const recentActivities = ref([
  {
    id: 1,
    title: '新用戶註冊',
    time: '5 分鐘前',
    description: '王小明 註冊為新用戶',
    icon: 'person_add',
    color: 'green',
  },
  {
    id: 2,
    title: '預約完成',
    time: '15 分鐘前',
    description: '預約 #B001234 已完成服務',
    icon: 'check_circle',
    color: 'blue',
  },
  {
    id: 3,
    title: '看護師審核',
    time: '1 小時前',
    description: '張護士 通過審核',
    icon: 'verified',
    color: 'purple',
  },
])

// 載入儀表板資料
const loadDashboardData = async () => {
  loading.value = true

  try {
    // TODO: 從 API 載入實際資料
    // const { data } = await $fetch('/api/admin/dashboard/stats')
    // stats.value = data.stats
    // 實際從 API 載入資料
    // TODO: 實作 API 端點 /api/admin/dashboard/stats
    const data = (await $fetch('/api/admin/dashboard/stats').catch(() => ({
      stats: {
        totalUsers: 0,
        newUsersThisMonth: 0,
        activeCaregivers: 0,
        pendingCaregivers: 0,
        monthlyBookings: 0,
        activeBookings: 0,
        monthlyRevenue: 0,
        revenueGrowth: 0,
      },
      pendingItems: {
        caregivers: 0,
        disputes: 0,
        refunds: 0,
      },
    }))) as {
      stats: typeof stats.value
      pendingItems: typeof pendingItems.value
    }

    stats.value = data.stats || stats.value
    pendingItems.value = data.pendingItems || pendingItems.value
  } catch (error) {
    console.error('載入儀表板資料錯誤:', error)
  } finally {
    loading.value = false
  }
}

// 初始化
onMounted(() => {
  loadDashboardData()
})
</script>
