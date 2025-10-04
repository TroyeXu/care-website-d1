<template>
  <q-page class="q-pa-md">
    <!-- 頁面標題 -->
    <div class="row q-mb-lg">
      <div class="col">
        <h4 class="q-ma-none">看護師管理</h4>
        <div class="text-grey-7">管理所有看護師資料</div>
      </div>
      <div class="col-auto q-gutter-sm">
        <q-btn
          color="primary"
          label="新增看護師"
          icon="add"
          @click="showAddDialog = true"
        />
        <q-btn
          color="green"
          label="匯出"
          icon="download"
          outline
          @click="exportData"
        />
      </div>
    </div>

    <!-- 搜尋和篩選 -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="row q-gutter-md">
          <div class="col-12 col-md-4">
            <q-input
              v-model="filters.search"
              label="搜尋"
              placeholder="姓名、電話、Email"
              outlined
              dense
              clearable
              @update:model-value="debouncedSearch"
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-md-2">
            <q-select
              v-model="filters.status"
              label="狀態"
              :options="statusOptions"
              outlined
              dense
              clearable
              emit-value
              map-options
              @update:model-value="loadCaregivers"
            />
          </div>

          <div class="col-12 col-md-2">
            <q-select
              v-model="filters.verified"
              label="審核狀態"
              :options="verifiedOptions"
              outlined
              dense
              clearable
              emit-value
              map-options
              @update:model-value="loadCaregivers"
            />
          </div>

          <div class="col-12 col-md-2">
            <q-select
              v-model="filters.city"
              label="城市"
              :options="cityOptions"
              outlined
              dense
              clearable
              @update:model-value="loadCaregivers"
            />
          </div>

          <div class="col-12 col-md-auto">
            <q-btn label="重置" color="grey" outline @click="resetFilters" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 資料表格 -->
    <q-card flat bordered>
      <q-table
        v-model:pagination="pagination"
        :rows="caregivers"
        :columns="columns"
        row-key="id"
        :loading="loading"
        binary-state-sort
        @request="onRequest"
      >
        <!-- 頭像欄位 -->
        <template #body-cell-avatar="props">
          <q-td :props="props">
            <q-avatar size="40px">
              <img
                :src="
                  props.row.avatar ||
                  `https://i.pravatar.cc/150?u=${props.row.id}`
                "
              />
            </q-avatar>
          </q-td>
        </template>

        <!-- 姓名欄位 -->
        <template #body-cell-name="props">
          <q-td :props="props">
            <div class="text-weight-medium">{{ props.row.name }}</div>
            <div class="text-caption text-grey">{{ props.row.email }}</div>
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

        <!-- 審核狀態欄位 -->
        <template #body-cell-verification="props">
          <q-td :props="props">
            <q-badge
              :color="getVerificationColor(props.row.verification.status)"
              :label="getVerificationLabel(props.row.verification.status)"
            />
          </q-td>
        </template>

        <!-- 評分欄位 -->
        <template #body-cell-rating="props">
          <q-td :props="props">
            <q-rating
              :model-value="props.row.rating"
              size="sm"
              color="orange"
              readonly
            />
            <span class="q-ml-sm text-caption">{{ props.row.rating }}</span>
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
              @click="viewCaregiver(props.row)"
            >
              <q-tooltip>查看詳情</q-tooltip>
            </q-btn>

            <q-btn
              v-if="adminStore.hasPermission('caregiver.edit')"
              flat
              round
              dense
              icon="edit"
              color="green"
              size="sm"
              @click="editCaregiver(props.row)"
            >
              <q-tooltip>編輯</q-tooltip>
            </q-btn>

            <q-btn
              v-if="
                adminStore.hasPermission('caregiver.verify') &&
                props.row.verification.status === 'pending'
              "
              flat
              round
              dense
              icon="verified"
              color="orange"
              size="sm"
              @click="verifyCaregiver(props.row)"
            >
              <q-tooltip>審核</q-tooltip>
            </q-btn>

            <q-btn
              v-if="adminStore.hasPermission('caregiver.edit')"
              flat
              round
              dense
              :icon="props.row.status === 'active' ? 'block' : 'check_circle'"
              :color="props.row.status === 'active' ? 'red' : 'green'"
              size="sm"
              @click="toggleStatus(props.row)"
            >
              <q-tooltip>{{
                props.row.status === 'active' ? '停用' : '啟用'
              }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- 審核對話框 -->
    <q-dialog v-model="showVerifyDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">審核看護師</div>
        </q-card-section>

        <q-card-section>
          <div class="q-mb-md">
            <div class="text-subtitle2">看護師資訊</div>
            <div>姓名：{{ selectedCaregiver?.name }}</div>
            <div>Email：{{ selectedCaregiver?.email }}</div>
            <div>經驗：{{ selectedCaregiver?.experience_years }} 年</div>
          </div>

          <q-option-group
            v-model="verifyAction"
            :options="[
              { label: '通過審核', value: 'approve' },
              { label: '拒絕審核', value: 'reject' },
            ]"
            color="primary"
          />

          <q-input
            v-if="verifyAction === 'reject'"
            v-model="rejectReason"
            label="拒絕原因"
            type="textarea"
            outlined
            rows="3"
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="取消" />
          <q-btn
            color="primary"
            label="確認"
            :disable="verifyAction === 'reject' && !rejectReason"
            @click="submitVerification"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar, debounce } from 'quasar'
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
const caregivers = ref<any[]>([])
const selectedCaregiver = ref<any>(null)
const showVerifyDialog = ref(false)
const showAddDialog = ref(false)
const verifyAction = ref('approve')
const rejectReason = ref('')

// 篩選條件
const filters = ref({
  search: '',
  status: null,
  verified: null,
  city: null,
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
  { name: 'avatar', label: '頭像', field: 'avatar', align: 'left' as const },
  {
    name: 'name',
    label: '姓名',
    field: 'name',
    align: 'left' as const,
    sortable: true,
  },
  { name: 'phone', label: '電話', field: 'phone', align: 'left' as const },
  {
    name: 'experience_years',
    label: '經驗',
    field: 'experience_years',
    align: 'center' as const,
    sortable: true,
  },
  {
    name: 'hourly_rate',
    label: '時薪',
    field: 'hourly_rate',
    align: 'center' as const,
    sortable: true,
    format: (val: number) => `$${val}`,
  },
  {
    name: 'rating',
    label: '評分',
    field: 'rating',
    align: 'center' as const,
    sortable: true,
  },
  { name: 'city', label: '城市', field: 'city', align: 'center' as const },
  { name: 'status', label: '狀態', field: 'status', align: 'center' as const },
  {
    name: 'verification',
    label: '審核狀態',
    field: 'verification',
    align: 'center' as const,
  },
  {
    name: 'actions',
    label: '操作',
    field: 'actions',
    align: 'center' as const,
  },
]

// 選項
const statusOptions = [
  { label: '全部', value: null },
  { label: '啟用', value: 'active' },
  { label: '停用', value: 'inactive' },
]

const verifiedOptions = [
  { label: '全部', value: null },
  { label: '待審核', value: 'pending' },
  { label: '已通過', value: 'approved' },
  { label: '已拒絕', value: 'rejected' },
]

const cityOptions = ['台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市']

// 載入看護師列表
const loadCaregivers = async () => {
  loading.value = true

  try {
    const response = await $fetch('/api/admin/caregivers', {
      query: {
        ...filters.value,
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        sort: pagination.value.sortBy,
        order: pagination.value.descending ? 'desc' : 'asc',
      },
    })

    caregivers.value = response.caregivers
    pagination.value.rowsNumber = response.pagination.total
  } catch (error) {
    console.error('載入看護師列表錯誤:', error)
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

  loadCaregivers()
}

// 防抖搜尋
const debouncedSearch = debounce(() => {
  pagination.value.page = 1
  loadCaregivers()
}, 500)

// 重置篩選
const resetFilters = () => {
  filters.value = {
    search: '',
    status: null,
    verified: null,
    city: null,
  }
  loadCaregivers()
}

// 查看詳情
const viewCaregiver = (caregiver: any) => {
  navigateTo(`/admin/caregivers/${caregiver.id}`)
}

// 編輯看護師
const editCaregiver = (caregiver: any) => {
  // TODO: 實作編輯功能
  console.log('編輯看護師:', caregiver)
}

// 審核看護師
const verifyCaregiver = (caregiver: any) => {
  selectedCaregiver.value = caregiver
  verifyAction.value = 'approve'
  rejectReason.value = ''
  showVerifyDialog.value = true
}

// 提交審核
const submitVerification = async () => {
  try {
    await $fetch(`/api/admin/caregivers/${selectedCaregiver.value.id}/verify`, {
      method: 'POST',
      body: {
        action: verifyAction.value,
        reason: rejectReason.value,
      },
    })

    $q.notify({
      type: 'positive',
      message: '審核成功',
    })

    showVerifyDialog.value = false
    loadCaregivers()
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: '審核失敗',
    })
  }
}

// 切換狀態
const toggleStatus = (caregiver: any) => {
  const newStatus = caregiver.status === 'active' ? 'inactive' : 'active'

  $q.dialog({
    title: '確認操作',
    message: `確定要${newStatus === 'active' ? '啟用' : '停用'}此看護師嗎？`,
    cancel: true,
  }).onOk(async () => {
    try {
      await $fetch(`/api/admin/caregivers/${caregiver.id}`, {
        method: 'PUT',
        body: { status: newStatus },
      })

      $q.notify({
        type: 'positive',
        message: '狀態更新成功',
      })

      loadCaregivers()
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: '操作失敗',
      })
    }
  })
}

// 匯出資料
const exportData = () => {
  // TODO: 實作匯出功能
  $q.notify({
    type: 'info',
    message: '匯出功能開發中',
  })
}

// 輔助函數
const getStatusColor = (status: string) => {
  return status === 'active' ? 'green' : 'grey'
}

const getStatusLabel = (status: string) => {
  return status === 'active' ? '啟用' : '停用'
}

const getVerificationColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'orange',
    approved: 'green',
    rejected: 'red',
  }
  return colors[status] || 'grey'
}

const getVerificationLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: '待審核',
    approved: '已通過',
    rejected: '已拒絕',
  }
  return labels[status] || status
}

// 初始化
onMounted(() => {
  loadCaregivers()
})
</script>
