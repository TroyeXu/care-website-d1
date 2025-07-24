<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-lg-10">
        <!-- 標題 -->
        <div class="row items-center q-mb-lg">
          <div class="text-h5 text-primary">
            <q-icon name="account_balance_wallet" size="md" class="q-mr-sm" />
            支付管理
          </div>
        </div>
        
        <!-- 支付紀錄 -->
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <div class="row items-center justify-between q-mb-md">
              <div class="text-h6">支付紀錄</div>
              <q-btn
                flat
                icon="refresh"
                @click="loadPaymentHistory"
                :loading="isLoading"
              >
                更新
              </q-btn>
            </div>
            
            <div v-if="isLoading" class="text-center q-pa-lg">
              <q-spinner-dots size="50px" color="primary" />
              <div class="text-body2 q-mt-md">載入中...</div>
            </div>
            
            <div v-else-if="payments.length === 0" class="text-center q-pa-lg">
              <q-icon name="payment" size="80px" color="grey-5" />
              <div class="text-h6 q-mt-md text-grey-7">尚無支付紀錄</div>
              <div class="text-body2 text-grey-6">
                您的支付紀錄將在此顯示
              </div>
            </div>
            
            <q-list v-else bordered class="rounded-borders">
              <q-item
                v-for="payment in payments"
                :key="payment.id"
                class="q-pa-md"
              >
                <q-item-section>
                  <q-item-label class="text-weight-medium">
                    交易編號: {{ payment.transaction_id }}
                  </q-item-label>
                  <q-item-label caption>
                    預約編號: {{ payment.booking_id }}
                  </q-item-label>
                  <q-item-label caption class="text-grey-6">
                    {{ formatDate(payment.created_at) }}
                  </q-item-label>
                </q-item-section>
                
                <q-item-section side>
                  <div class="text-right">
                    <div class="text-h6 text-primary">
                      NT$ {{ payment.amount.toLocaleString() }}
                    </div>
                    <div class="text-caption text-grey-6">
                      {{ getPaymentMethodName(payment.method) }}
                    </div>
                  </div>
                </q-item-section>
                
                <q-item-section side>
                  <q-chip
                    :color="getStatusColor(payment.status)"
                    text-color="white"
                    size="sm"
                  >
                    {{ getStatusName(payment.status) }}
                  </q-chip>
                </q-item-section>
              </q-item>
            </q-list>
            
            <!-- 統計資訊 -->
            <div v-if="payments.length > 0" class="q-mt-md">
              <q-separator class="q-mb-md" />
              <div class="row q-gutter-md">
                <div class="col">
                  <q-card flat class="bg-blue-1">
                    <q-card-section class="text-center">
                      <div class="text-h6 text-blue-8">
                        NT$ {{ totalAmount.toLocaleString() }}
                      </div>
                      <div class="text-caption text-blue-6">總支付金額</div>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col">
                  <q-card flat class="bg-green-1">
                    <q-card-section class="text-center">
                      <div class="text-h6 text-green-8">
                        {{ completedPayments }}
                      </div>
                      <div class="text-caption text-green-6">成功交易</div>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col">
                  <q-card flat class="bg-orange-1">
                    <q-card-section class="text-center">
                      <div class="text-h6 text-orange-8">
                        {{ payments.length }}
                      </div>
                      <div class="text-caption text-orange-6">總交易次數</div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        
        <!-- 新增支付 -->
        <PaymentForm @payment-success="handlePaymentSuccess" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useApiService } from '~/composables/useApiService'
import { useAuthStore } from '~/stores/auth'
import usePageSeo from '~/composables/usePageSeo'
import PaymentForm from '~/components/PaymentForm.vue'
import type { Payment } from '~/utils/mockData'

// SEO
usePageSeo('支付管理 - 護理服務平台', '查看您的支付紀錄和管理新支付')

// 組合式函數
const $q = useQuasar()
const apiService = useApiService()
const authStore = useAuthStore()

// 響應式資料
const payments = ref<Payment[]>([])
const isLoading = ref(false)

// 計算屬性
const totalAmount = computed(() => {
  return payments.value.reduce((sum, payment) => sum + payment.amount, 0)
})

const completedPayments = computed(() => {
  return payments.value.filter(p => p.status === 'completed').length
})

// 載入支付紀錄
const loadPaymentHistory = async () => {
  if (!authStore.currentUser) {
    $q.notify({
      type: 'warning',
      message: '請先登入才能查看支付紀錄',
      timeout: 3000
    })
    return
  }
  
  isLoading.value = true
  
  try {
    const result = await apiService.getPaymentHistory(authStore.currentUser.id)
    payments.value = Array.isArray(result) ? result : []
    
  } catch (error: any) {
    console.error('載入支付紀錄失敗:', error)
    $q.notify({
      type: 'negative',
      message: error.message || '載入支付紀錄失敗',
      timeout: 3000
    })
  } finally {
    isLoading.value = false
  }
}

// 處理支付成功
const handlePaymentSuccess = (payment: Payment) => {
  // 新增到本地列表
  payments.value.unshift(payment)
  
  $q.notify({
    type: 'positive',
    message: '支付成功！新的支付紀錄已添加',
    timeout: 3000
  })
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 獲取支付方式名稱
const getPaymentMethodName = (method: string) => {
  const methodMap: Record<string, string> = {
    'credit_card': '信用卡',
    'bank_transfer': '銀行轉帳',
    'cash': '現金付款'
  }
  return methodMap[method] || method
}

// 獲取狀態名稱
const getStatusName = (status: string) => {
  const statusMap: Record<string, string> = {
    'completed': '已完成',
    'pending': '處理中',
    'failed': '失敗',
    'cancelled': '已取消'
  }
  return statusMap[status] || status
}

// 獲取狀態顏色
const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    'completed': 'positive',
    'pending': 'warning',
    'failed': 'negative',
    'cancelled': 'grey'
  }
  return colorMap[status] || 'grey'
}

// 生命週期
onMounted(() => {
  loadPaymentHistory()
})

// 頁面結構化資料
const { $route } = useNuxtApp()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '支付管理 - 護理服務平台',
        url: baseUrl + $route.fullPath,
        description: '查看您的支付紀錄和管理新支付',
        provider: {
          '@type': 'Organization',
          name: '護理服務平台'
        }
      })
    }
  ]
})
</script>
