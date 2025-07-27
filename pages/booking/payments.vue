<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-lg-10">
        <!-- 標題 -->
        <PageHeader title="支付管理" icon="account_balance_wallet" />
        
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
            
            <LoadingState v-if="isLoading" :loading="isLoading" />
            
            <EmptyState
              v-else-if="payments.length === 0"
              icon="payment"
              title="尚無支付紀錄"
              description="您的支付紀錄將在此顯示"
            />
            
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
                  <StatusChip :status="payment.status" type="payment" />
                </q-item-section>
              </q-item>
            </q-list>
            
            <!-- 統計資訊 -->
            <div v-if="payments.length > 0" class="q-mt-md">
              <q-separator class="q-mb-md" />
              <div class="row q-gutter-md">
                <div class="col">
                  <StatCard
                    :value="totalAmount"
                    label="總支付金額"
                    color="blue"
                    icon="account_balance_wallet"
                    prefix="NT$ "
                    :loading="isLoading"
                  />
                </div>
                <div class="col">
                  <StatCard
                    :value="completedPayments"
                    label="成功交易"
                    color="green"
                    icon="check_circle"
                    :loading="isLoading"
                  />
                </div>
                <div class="col">
                  <StatCard
                    :value="payments.length"
                    label="總交易次數"
                    color="orange"
                    icon="receipt"
                    :loading="isLoading"
                  />
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
