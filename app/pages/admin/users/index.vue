<template>
  <q-page class="q-pa-md">
    <!-- 頁面標題 -->
    <div class="row q-mb-lg">
      <div class="col">
        <h4 class="q-ma-none">用戶管理</h4>
        <div class="text-grey-7">管理所有用戶資料</div>
      </div>
      <div class="col-auto q-gutter-sm">
        <q-btn
          color="primary"
          label="新增用戶"
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
              v-model="filters.role"
              label="角色"
              :options="roleOptions"
              outlined
              dense
              clearable
              emit-value
              map-options
              @update:model-value="loadUsers"
            />
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
              @update:model-value="loadUsers"
            />
          </div>

          <div class="col-12 col-md-auto">
            <q-btn label="重置" color="grey" outline @click="resetFilters" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 用戶列表 -->
    <q-card flat bordered>
      <q-table
        v-model:pagination="pagination"
        :rows="users"
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

        <!-- 角色欄位 -->
        <template #body-cell-role="props">
          <q-td :props="props">
            <q-badge
              :color="getRoleColor(props.row)"
              :label="getRoleLabel(props.row)"
            />
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

        <!-- 預約統計欄位 -->
        <template #body-cell-bookings="props">
          <q-td :props="props">
            <div>總計: {{ props.row.booking_count }}</div>
            <div class="text-caption text-green">
              完成: {{ props.row.completed_bookings }}
            </div>
          </q-td>
        </template>

        <!-- 最後活動欄位 -->
        <template #body-cell-last_activity="props">
          <q-td :props="props">
            <div v-if="props.row.last_booking_date">
              {{ formatDate(props.row.last_booking_date) }}
            </div>
            <div v-else class="text-grey">無活動</div>
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
              @click="viewUser(props.row)"
            >
              <q-tooltip>查看詳情</q-tooltip>
            </q-btn>

            <q-btn
              v-if="adminStore.hasPermission('user.edit')"
              flat
              round
              dense
              icon="edit"
              color="green"
              size="sm"
              @click="editUser(props.row)"
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
                  v-if="adminStore.hasPermission('user.reset_password')"
                  v-close-popup
                  clickable
                  @click="resetPassword(props.row)"
                >
                  <q-item-section avatar>
                    <q-icon name="lock_reset" color="orange" />
                  </q-item-section>
                  <q-item-section>重設密碼</q-item-section>
                </q-item>

                <q-separator v-if="adminStore.hasPermission('user.suspend')" />

                <q-item
                  v-if="
                    adminStore.hasPermission('user.suspend') &&
                    props.row.status === 'active'
                  "
                  v-close-popup
                  clickable
                  @click="updateStatus(props.row, 'suspended')"
                >
                  <q-item-section avatar>
                    <q-icon name="pause" color="orange" />
                  </q-item-section>
                  <q-item-section>暫停帳號</q-item-section>
                </q-item>

                <q-item
                  v-if="
                    adminStore.hasPermission('user.suspend') &&
                    props.row.status === 'suspended'
                  "
                  v-close-popup
                  clickable
                  @click="updateStatus(props.row, 'active')"
                >
                  <q-item-section avatar>
                    <q-icon name="play_arrow" color="green" />
                  </q-item-section>
                  <q-item-section>啟用帳號</q-item-section>
                </q-item>

                <q-item
                  v-if="
                    adminStore.hasPermission('user.suspend') &&
                    props.row.status !== 'banned'
                  "
                  v-close-popup
                  clickable
                  @click="updateStatus(props.row, 'banned')"
                >
                  <q-item-section avatar>
                    <q-icon name="block" color="red" />
                  </q-item-section>
                  <q-item-section>封禁帳號</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- 重設密碼對話框 -->
    <q-dialog v-model="showResetDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">重設密碼</div>
        </q-card-section>

        <q-card-section>
          <div class="q-mb-md">
            確定要為用戶 <strong>{{ selectedUser?.name }}</strong> 重設密碼嗎？
          </div>

          <q-option-group
            v-model="resetMethod"
            :options="[
              { label: '發送重設郵件', value: 'email' },
              { label: '設定臨時密碼', value: 'manual' },
            ]"
            color="primary"
          />

          <q-input
            v-if="resetMethod === 'manual'"
            v-model="tempPassword"
            label="臨時密碼"
            type="text"
            outlined
            class="q-mt-md"
            hint="至少 6 個字元"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="取消" />
          <q-btn
            color="primary"
            label="確認"
            :disable="
              resetMethod === 'manual' &&
              (!tempPassword || tempPassword.length < 6)
            "
            @click="confirmResetPassword"
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
const users = ref<any[]>([])
const selectedUser = ref<any>(null)
const showAddDialog = ref(false)
const showResetDialog = ref(false)
const resetMethod = ref('email')
const tempPassword = ref('')

// 篩選條件
const filters = ref({
  search: '',
  role: null,
  status: null,
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
  { name: 'role', label: '角色', field: 'role', align: 'center' as const },
  { name: 'status', label: '狀態', field: 'status', align: 'center' as const },
  {
    name: 'bookings',
    label: '預約統計',
    field: 'booking_count',
    align: 'center' as const,
  },
  {
    name: 'last_activity',
    label: '最後活動',
    field: 'last_booking_date',
    align: 'center' as const,
    sortable: true,
  },
  {
    name: 'created_at',
    label: '註冊時間',
    field: 'created_at',
    align: 'center' as const,
    sortable: true,
    format: (val: string) => formatDate(val),
  },
  {
    name: 'actions',
    label: '操作',
    field: 'actions',
    align: 'center' as const,
  },
]

// 選項
const roleOptions = [
  { label: '全部', value: null },
  { label: '一般用戶', value: 'user' },
  { label: '病患', value: 'patient' },
  { label: '看護師', value: 'caregiver' },
]

const statusOptions = [
  { label: '全部', value: null },
  { label: '啟用', value: 'active' },
  { label: '暫停', value: 'suspended' },
  { label: '封禁', value: 'banned' },
]

// 載入用戶列表
const loadUsers = async () => {
  loading.value = true

  try {
    const response = await $fetch('/api/admin/users', {
      query: {
        ...filters.value,
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        sort: pagination.value.sortBy,
        order: pagination.value.descending ? 'desc' : 'asc',
      },
    })

    users.value = response.users
    pagination.value.rowsNumber = response.pagination.total
  } catch (error) {
    console.error('載入用戶列表錯誤:', error)
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

  loadUsers()
}

// 防抖搜尋
const debouncedSearch = debounce(() => {
  pagination.value.page = 1
  loadUsers()
}, 500)

// 重置篩選
const resetFilters = () => {
  filters.value = {
    search: '',
    role: null,
    status: null,
  }
  loadUsers()
}

// 查看詳情
const viewUser = (user: any) => {
  navigateTo(`/admin/users/${user.id}`)
}

// 編輯用戶
const editUser = (user: any) => {
  // TODO: 實作編輯功能
  console.log('編輯用戶:', user)
}

// 重設密碼
const resetPassword = (user: any) => {
  selectedUser.value = user
  resetMethod.value = 'email'
  tempPassword.value = ''
  showResetDialog.value = true
}

// 確認重設密碼
const confirmResetPassword = async () => {
  try {
    await $fetch(`/api/admin/users/${selectedUser.value.id}/reset-password`, {
      method: 'POST',
      body: {
        method: resetMethod.value,
        temporary_password:
          resetMethod.value === 'manual' ? tempPassword.value : undefined,
      },
    })

    $q.notify({
      type: 'positive',
      message: resetMethod.value === 'email' ? '重設郵件已發送' : '密碼已重設',
    })

    showResetDialog.value = false
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: '操作失敗',
    })
  }
}

// 更新狀態
const updateStatus = (user: any, newStatus: string) => {
  const statusLabels: Record<string, string> = {
    active: '啟用',
    suspended: '暫停',
    banned: '封禁',
  }

  $q.dialog({
    title: '確認操作',
    message: `確定要${statusLabels[newStatus]}此用戶嗎？`,
    prompt:
      newStatus !== 'active'
        ? {
            model: '',
            type: 'text',
            label: '原因',
          }
        : undefined,
    cancel: true,
  }).onOk(async (reason?: string) => {
    try {
      await $fetch(`/api/admin/users/${user.id}/status`, {
        method: 'PUT',
        body: {
          status: newStatus,
          reason: reason || undefined,
        },
      })

      $q.notify({
        type: 'positive',
        message: '狀態更新成功',
      })

      loadUsers()
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
const getRoleColor = (user: any) => {
  if (user.is_admin) return 'purple'
  if (user.is_caregiver) return 'green'
  return 'blue'
}

const getRoleLabel = (user: any) => {
  if (user.is_admin) return '管理員'
  if (user.is_caregiver) return '看護師'
  if (user.role === 'patient') return '病患'
  return '一般用戶'
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: 'green',
    suspended: 'orange',
    banned: 'red',
  }
  return colors[status] || 'grey'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    active: '啟用',
    suspended: '暫停',
    banned: '封禁',
  }
  return labels[status] || status
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW')
}

// 初始化
onMounted(() => {
  loadUsers()
})
</script>
