<template>
  <q-page class="q-pa-md">
    <!-- 頁面標題 -->
    <div class="row q-mb-lg">
      <div class="col">
        <h4 class="q-ma-none">預約管理</h4>
        <div class="text-grey-7">管理所有預約訂單</div>
      </div>
      <div class="col-auto q-gutter-sm">
        <q-btn
          color="primary"
          label="新建預約"
          icon="add"
          @click="createBooking"
        />
        <q-btn
          color="green"
          label="匯出報表"
          icon="download"
          outline
          @click="exportReport"
        />
      </div>
    </div>

    <!-- 統計卡片 -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-7">待確認</div>
            <div class="text-h6">{{ stats.pending }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-7">已確認</div>
            <div class="text-h6">{{ stats.confirmed }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-7">已完成</div>
            <div class="text-h6">{{ stats.completed }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-7">總收入</div>
            <div class="text-h6">
              ${{ stats.total_revenue?.toLocaleString() || 0 }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- 搜尋和篩選 -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="row q-gutter-md">
          <div class="col-12 col-md-3">
            <q-select
              v-model="filters.status"
              label="狀態"
              :options="statusOptions"
              outlined
              dense
              clearable
              emit-value
              map-options
              @update:model-value="loadBookings"
            />
          </div>

          <div class="col-12 col-md-3">
            <q-input
              v-model="filters.date_from"
              label="開始日期"
              type="date"
              outlined
              dense
              @update:model-value="loadBookings"
            />
          </div>

          <div class="col-12 col-md-3">
            <q-input
              v-model="filters.date_to"
              label="結束日期"
              type="date"
              outlined
              dense
              @update:model-value="loadBookings"
            />
          </div>

          <div class="col-12 col-md-auto">
            <q-btn label="重置" color="grey" outline @click="resetFilters" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 預約列表 -->
    <q-card flat bordered>
      <q-table
        v-model:pagination="pagination"
        :rows="bookings"
        :columns="columns"
        row-key="id"
        :loading="loading"
        binary-state-sort
        @request="onRequest"
      >
        <!-- ID 欄位 -->
        <template #body-cell-id="props">
          <q-td :props="props">
            <router-link
              :to="`/admin/bookings/${props.row.id}`"
              class="text-primary text-weight-medium"
            >
              #{{ props.row.id.slice(0, 8) }}
            </router-link>
          </q-td>
        </template>

        <!-- 用戶欄位 -->
        <template #body-cell-user="props">
          <q-td :props="props">
            <div>{{ props.row.user.name }}</div>
            <div class="text-caption text-grey">{{ props.row.user.phone }}</div>
          </q-td>
        </template>

        <!-- 看護師欄位 -->
        <template #body-cell-caregiver="props">
          <q-td :props="props">
            <div>{{ props.row.caregiver.name }}</div>
            <div class="text-caption text-grey">
              {{ props.row.caregiver.phone }}
            </div>
          </q-td>
        </template>

        <!-- 服務時間欄位 -->
        <template #body-cell-service="props">
          <q-td :props="props">
            <div>{{ props.row.service_date }}</div>
            <div class="text-caption">
              {{ props.row.start_time }} - {{ props.row.end_time }}
              <q-badge class="q-ml-sm"
                >{{ props.row.service_hours }}小時</q-badge
              >
            </div>
          </q-td>
        </template>

        <!-- 狀態欄位 -->
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="getStatusColor(props.row.status)"
              :label="getStatusLabel(props.row.status)"
            />
          </q-td>
        </template>

        <!-- 金額欄位 -->
        <template #body-cell-amount="props">
          <q-td :props="props">
            <div class="text-weight-medium">${{ props.row.total_amount }}</div>
            <div class="text-caption">
              <q-badge
                :color="
                  props.row.payment_status === 'paid' ? 'green' : 'orange'
                "
                :label="
                  props.row.payment_status === 'paid' ? '已付款' : '待付款'
                "
              />
            </div>
          </q-td>
        </template>

        <!-- 操作欄位 -->
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              round
              dense
              icon="visibility"
              color="primary"
              size="sm"
              @click="viewBooking(props.row)"
            >
              <q-tooltip>查看詳情</q-tooltip>
            </q-btn>

            <q-btn
              v-if="adminStore.hasPermission('booking.edit')"
              flat
              round
              dense
              icon="edit"
              color="green"
              size="sm"
              @click="editBooking(props.row)"
            >
              <q-tooltip>編輯</q-tooltip>
            </q-btn>

            <q-btn-dropdown
              flat
              round
              dense
              color="grey"
              icon="more_vert"
              size="sm"
            >
              <q-list>
                <q-item
                  v-if="props.row.status === 'pending'"
                  v-close-popup
                  clickable
                  @click="updateStatus(props.row, 'confirmed')"
                >
                  <q-item-section avatar>
                    <q-icon name="check" color="green" />
                  </q-item-section>
                  <q-item-section>確認預約</q-item-section>
                </q-item>

                <q-item
                  v-if="props.row.status === 'confirmed'"
                  v-close-popup
                  clickable
                  @click="updateStatus(props.row, 'completed')"
                >
                  <q-item-section avatar>
                    <q-icon name="done_all" color="blue" />
                  </q-item-section>
                  <q-item-section>完成服務</q-item-section>
                </q-item>

                <q-item
                  v-if="['pending', 'confirmed'].includes(props.row.status)"
                  v-close-popup
                  clickable
                  @click="updateStatus(props.row, 'cancelled')"
                >
                  <q-item-section avatar>
                    <q-icon name="cancel" color="red" />
                  </q-item-section>
                  <q-item-section>取消預約</q-item-section>
                </q-item>

                <q-separator />

                <q-item
                  v-if="props.row.payment_status === 'paid'"
                  v-close-popup
                  clickable
                  @click="handleRefund(props.row)"
                >
                  <q-item-section avatar>
                    <q-icon name="payments" color="orange" />
                  </q-item-section>
                  <q-item-section>處理退款</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useAdminStore } from '~/stores/admin'

// 設定頁面 meta
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const adminStore = useAdminStore()
const $q = useQuasar()

// 狀態
const loading = ref(false)
const bookings = ref<any[]>([])
const stats = ref({
  pending: 0,
  confirmed: 0,
  completed: 0,
  total_revenue: 0,
})

// 篩選條件
const filters = ref({
  status: null,
  date_from: null,
  date_to: null,
})

// 分頁
const pagination = ref({
  sortBy: 'created_at',
  descending: true,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
})

// 表格欄位
const columns = [
  { name: 'id', label: '訂單編號', field: 'id', align: 'left' as const },
  { name: 'user', label: '用戶', field: 'user', align: 'left' as const },
  {
    name: 'caregiver',
    label: '看護師',
    field: 'caregiver',
    align: 'left' as const,
  },
  {
    name: 'service',
    label: '服務時間',
    field: 'service',
    align: 'left' as const,
    sortable: true,
  },
  { name: 'status', label: '狀態', field: 'status', align: 'center' as const },
  {
    name: 'amount',
    label: '金額',
    field: 'total_amount',
    align: 'right' as const,
    sortable: true,
  },
  {
    name: 'actions',
    label: '操作',
    field: 'actions',
    align: 'center' as const,
  },
]

// 狀態選項
const statusOptions = [
  { label: '全部', value: null },
  { label: '待確認', value: 'pending' },
  { label: '已確認', value: 'confirmed' },
  { label: '進行中', value: 'in_progress' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' },
]

// 載入預約列表
const loadBookings = async () => {
  loading.value = true

  try {
    const response = await $fetch('/api/admin/bookings', {
      query: {
        ...filters.value,
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        sort: pagination.value.sortBy,
        order: pagination.value.descending ? 'desc' : 'asc',
      },
    })

    bookings.value = response.bookings
    stats.value = response.stats
    pagination.value.rowsNumber = response.pagination.total
  } catch (error) {
    console.error('載入預約列表錯誤:', error)
    $q.notify({
      type: 'negative',
      message: '載入失敗',
    })
  } finally {
    loading.value = false
  }
}

// 表格請求處理
const onRequest = (props: any) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination

  pagination.value.page = page
  pagination.value.rowsPerPage = rowsPerPage
  pagination.value.sortBy = sortBy
  pagination.value.descending = descending

  loadBookings()
}

// 重置篩選
const resetFilters = () => {
  filters.value = {
    status: null,
    date_from: null,
    date_to: null,
  }
  loadBookings()
}

// 查看詳情
const viewBooking = (booking: any) => {
  navigateTo(`/admin/bookings/${booking.id}`)
}

// 編輯預約
const editBooking = (booking: any) => {
  // TODO: 實作編輯功能
  console.log('編輯預約:', booking)
}

// 更新狀態
const updateStatus = (booking: any, newStatus: string) => {
  $q.dialog({
    title: '確認操作',
    message: `確定要將此預約狀態更改為「${getStatusLabel(newStatus)}」嗎？`,
    cancel: true,
  }).onOk(async () => {
    try {
      await $fetch(`/api/admin/bookings/${booking.id}/status`, {
        method: 'PUT',
        body: { status: newStatus },
      })

      $q.notify({
        type: 'positive',
        message: '狀態更新成功',
      })

      loadBookings()
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: '操作失敗',
      })
    }
  })
}

// 處理退款
const handleRefund = (booking: any) => {
  $q.dialog({
    title: '處理退款',
    message: `確定要為訂單 #${booking.id.slice(0, 8)} 處理退款嗎？`,
    prompt: {
      model: '',
      type: 'text',
      label: '退款原因',
    },
    cancel: true,
  }).onOk((reason: string) => {
    // TODO: 實作退款功能
    $q.notify({
      type: 'info',
      message: '退款功能開發中',
    })
  })
}

// 建立新預約
const createBooking = () => {
  // TODO: 實作新建預約功能
  $q.notify({
    type: 'info',
    message: '新建預約功能開發中',
  })
}

// 匯出報表
const exportReport = () => {
  // TODO: 實作匯出功能
  $q.notify({
    type: 'info',
    message: '匯出功能開發中',
  })
}

// 輔助函數
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'orange',
    confirmed: 'blue',
    in_progress: 'indigo',
    completed: 'green',
    cancelled: 'red',
    disputed: 'purple',
  }
  return colors[status] || 'grey'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: '待確認',
    confirmed: '已確認',
    in_progress: '進行中',
    completed: '已完成',
    cancelled: '已取消',
    disputed: '爭議中',
  }
  return labels[status] || status
}

// 初始化
onMounted(() => {
  loadBookings()
})
</script>
