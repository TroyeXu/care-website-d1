<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6 q-mb-md">
        <q-icon name="payment" class="q-mr-sm" />
        新增付款
      </div>

      <q-form class="q-gutter-md" @submit.prevent="submit">
        <!-- 基本付款資訊 -->
        <div class="row q-gutter-md">
          <div class="col-12 col-sm-6">
            <q-input
              v-model="bookingId"
              label="預約編號 *"
              outlined
              dense
              placeholder="輸入預約編號"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model.number="amount"
              label="付款金額 *"
              type="number"
              outlined
              dense
              min="1"
              suffix="元"
              placeholder="0"
            />
          </div>
        </div>

        <!-- 付款方式 -->
        <q-select
          v-model="method"
          :options="paymentMethods"
          label="付款方式 *"
          outlined
          dense
          emit-value
          map-options
        />

        <!-- 信用卡資訊 -->
        <div
          v-if="method === 'credit_card'"
          class="q-pa-md bg-grey-1 rounded-borders"
        >
          <div class="text-subtitle2 q-mb-md">信用卡資訊</div>
          <div class="row q-gutter-md">
            <div class="col-12">
              <q-input
                v-model="cardDetails.number"
                label="信用卡號碼 *"
                outlined
                dense
                mask="#### #### #### ####"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div class="col-6">
              <q-select
                v-model="cardDetails.expiryMonth"
                :options="
                  Array.from({ length: 12 }, (_, i) => ({
                    label: String(i + 1).padStart(2, '0'),
                    value: String(i + 1).padStart(2, '0'),
                  }))
                "
                label="月份 *"
                outlined
                dense
                emit-value
                map-options
              />
            </div>
            <div class="col-6">
              <q-select
                v-model="cardDetails.expiryYear"
                :options="
                  Array.from({ length: 10 }, (_, i) => ({
                    label: String(2024 + i),
                    value: String(2024 + i),
                  }))
                "
                label="年份 *"
                outlined
                dense
                emit-value
                map-options
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="cardDetails.cvv"
                label="CVV *"
                outlined
                dense
                mask="###"
                placeholder="123"
              />
            </div>
          </div>
        </div>

        <!-- 銀行轉帳說明 -->
        <div
          v-else-if="method === 'bank_transfer'"
          class="q-pa-md bg-blue-1 rounded-borders"
        >
          <div class="text-subtitle2 q-mb-sm">銀行轉帳資訊</div>
          <div class="text-body2">
            <div>銀行：台灣銀行</div>
            <div>戶名：護理服務平台有限公司</div>
            <div>帳號：123-456-789012</div>
            <div class="text-caption text-grey-6 q-mt-sm">
              請於轉帳完成後提交此表單
            </div>
          </div>
        </div>

        <!-- 現金付款說明 -->
        <div
          v-else-if="method === 'cash'"
          class="q-pa-md bg-green-1 rounded-borders"
        >
          <div class="text-subtitle2 q-mb-sm">現金付款</div>
          <div class="text-body2">請於服務時直接向看護師付款，並索取收據。</div>
        </div>

        <!-- 測試按鈕 -->
        <div class="row q-gutter-sm">
          <div class="col">
            <q-btn flat color="grey" :disable="isSubmitting" @click="resetForm">
              清除
            </q-btn>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              color="orange"
              :disable="isSubmitting"
              size="sm"
              @click="fillTestData"
            >
              填入測試資料
            </q-btn>
          </div>
          <div class="col-auto">
            <q-btn
              type="submit"
              color="primary"
              :loading="isSubmitting"
              icon="payment"
            >
              {{ isSubmitting ? '處理中...' : '確認付款' }}
            </q-btn>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useApiService } from '~/composables/useApiService'

// 組合式函數
const $q = useQuasar()
const apiService = useApiService()

// 響應式資料
const bookingId = ref('')
const amount = ref<number | null>(null)
const method = ref('credit_card')
const isSubmitting = ref(false)

// 信用卡資訊
const cardDetails = ref({
  number: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: '',
})

// 付款方式選項
const paymentMethods = [
  { label: '信用卡', value: 'credit_card' },
  { label: '銀行轉帳', value: 'bank_transfer' },
  { label: '現金付款', value: 'cash' },
]

// 發出事件
const emit = defineEmits(['payment-success'])

// 提交付款
const submit = async () => {
  if (!bookingId.value || !amount.value) {
    $q.notify({
      type: 'negative',
      message: '請填寫完整的付款資訊',
      timeout: 3000,
    })
    return
  }

  if (
    method.value === 'credit_card' &&
    (!cardDetails.value.number ||
      !cardDetails.value.expiryMonth ||
      !cardDetails.value.expiryYear ||
      !cardDetails.value.cvv)
  ) {
    $q.notify({
      type: 'negative',
      message: '請填寫完整的信用卡資訊',
      timeout: 3000,
    })
    return
  }

  isSubmitting.value = true

  try {
    const paymentData = {
      booking_id: bookingId.value,
      amount: amount.value,
      method: method.value as 'credit_card' | 'bank_transfer' | 'cash',
      status: 'pending' as const,
      ...(method.value === 'credit_card' && { cardDetails: cardDetails.value }),
    }

    const result = await apiService.processPayment(paymentData)

    $q.notify({
      type: 'positive',
      message: '付款成功！',
      timeout: 3000,
    })

    // 清空表單
    resetForm()

    // 發出成功事件
    emit('payment-success', result)
  } catch (error: unknown) {
    console.error('付款失敗:', error)
    const errorMessage =
      error instanceof Error ? error.message : '付款失敗，請稍後再試'
    $q.notify({
      type: 'negative',
      message: errorMessage,
      timeout: 5000,
    })
  } finally {
    isSubmitting.value = false
  }
}

// 重置表單
const resetForm = () => {
  bookingId.value = ''
  amount.value = null
  method.value = 'credit_card'
  cardDetails.value = {
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  }
}

// 測試付款資料填入
const fillTestData = () => {
  bookingId.value = 'booking-test-' + Date.now()
  amount.value = 1500
  method.value = 'credit_card'
  cardDetails.value = {
    number: '4111111111111111',
    expiryMonth: '12',
    expiryYear: '2025',
    cvv: '123',
  }
}
</script>
