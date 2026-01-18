<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="booking-dialog" style="min-width: 350px; max-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">預約看護服務</div>
        <q-space />
        <q-btn v-close-popup icon="close" flat round dense />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle2 text-grey-6 q-mb-md">
          看護師：{{ caregiverName }}
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <!-- 服務類型 -->
        <q-select
          v-model="form.serviceType"
          :options="serviceTypeOptions"
          label="服務類型"
          filled
          emit-value
          map-options
        />

        <!-- 日期範圍 -->
        <q-input
          v-model="form.startDate"
          filled
          label="開始日期"
          type="date"
          :min="minDate"
        />

        <q-input
          v-model="form.endDate"
          filled
          label="結束日期"
          type="date"
          :min="form.startDate || minDate"
        />

        <!-- 時間 -->
        <div class="row q-gutter-sm">
          <q-input
            v-model="form.startTime"
            filled
            label="開始時間"
            type="time"
            class="col"
          />
          <q-input
            v-if="form.serviceType === 'hourly'"
            v-model="form.endTime"
            filled
            label="結束時間"
            type="time"
            class="col"
          />
        </div>

        <!-- 病患資訊 -->
        <q-input
          v-model="form.patientName"
          filled
          label="病患姓名"
          :rules="[(val) => !!val || '請輸入病患姓名']"
        />

        <div class="row q-gutter-sm">
          <q-input
            v-model.number="form.patientAge"
            filled
            label="年齡"
            type="number"
            min="1"
            max="120"
            class="col"
          />
          <q-select
            v-model="form.patientGender"
            :options="['男', '女']"
            filled
            label="性別"
            class="col"
          />
        </div>

        <q-input
          v-model="form.emergencyContact"
          filled
          label="緊急聯絡人電話"
          mask="####-###-###"
          :rules="[(val) => !!val || '請輸入緊急聯絡人電話']"
        />

        <!-- 特殊需求 -->
        <q-input
          v-model="form.specialRequests"
          filled
          label="特殊需求說明（選填）"
          type="textarea"
          rows="3"
        />

        <!-- 費用預估 -->
        <div class="cost-estimate q-pa-md bg-blue-1 rounded-borders">
          <div class="text-subtitle2 text-grey-8">預估費用</div>
          <div class="text-h5 text-primary text-weight-bold">
            NT$ {{ estimatedCost.toLocaleString() }}
          </div>
          <div class="text-caption text-grey-6">*實際費用以最終確認為準</div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-px-md q-pb-md">
        <q-btn v-close-popup flat label="取消" color="grey" />
        <q-btn
          unelevated
          label="確認預約"
          color="primary"
          :loading="submitting"
          @click="submitBooking"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useBookingStore } from '~/stores/bookings'
import { useAuthStore } from '~/stores/auth'

const props = defineProps<{
  caregiverId: string
  caregiverName: string
  hourlyRate: number
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

const bookingStore = useBookingStore()
const authStore = useAuthStore()
const submitting = ref(false)

// 表單資料
const form = ref({
  serviceType: 'hourly',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  patientName: '',
  patientAge: 0,
  patientGender: '',
  emergencyContact: '',
  specialRequests: '',
})

// 選項
const serviceTypeOptions = [
  { label: '按小時計費', value: 'hourly' },
  { label: '按班次計費（12小時）', value: 'shift' },
]

// 最小日期（今天）
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// 預估費用
const estimatedCost = computed(() => {
  if (!form.value.startDate) return 0

  const startDate = new Date(form.value.startDate)
  const endDate = new Date(form.value.endDate || form.value.startDate)
  const days =
    Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1

  if (
    form.value.serviceType === 'hourly' &&
    form.value.startTime &&
    form.value.endTime
  ) {
    const startTime = new Date(`2000-01-01T${form.value.startTime}`)
    const endTime = new Date(`2000-01-01T${form.value.endTime}`)
    let hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
    if (hours < 0) hours += 24 // 跨日
    return Math.round(hours * props.hourlyRate * days)
  } else if (form.value.serviceType === 'shift') {
    return props.hourlyRate * 12 * days // 12小時班
  }

  return 0
})

// 提交預約
const submitBooking = async () => {
  // 驗證必填欄位
  if (
    !form.value.startDate ||
    !form.value.startTime ||
    !form.value.patientName ||
    !form.value.patientAge ||
    !form.value.patientGender ||
    !form.value.emergencyContact
  ) {
    return
  }

  submitting.value = true

  if (!authStore.user) {
    alert('請先登入會員')
    submitting.value = false
    return
  }

  try {
    // 計算總時數
    const startDateTime = new Date(
      `${form.value.startDate} ${form.value.startTime}`,
    )
    const endDateTime =
      form.value.serviceType === 'hourly'
        ? new Date(`${form.value.startDate} ${form.value.endTime}`)
        : new Date(`${form.value.endDate || form.value.startDate} 20:00`) // 班制假設到晚上8點
    const totalHours =
      Math.abs(endDateTime.getTime() - startDateTime.getTime()) /
      (1000 * 60 * 60)

    const bookingData = {
      caregiver_id: props.caregiverId,
      user_id: authStore.user.id,
      service_date: form.value.startDate,
      start_time: form.value.startTime,
      end_time:
        form.value.serviceType === 'hourly' ? form.value.endTime : '20:00',
      total_hours: totalHours,
      hourly_rate: props.hourlyRate || 500, // 使用傳入的時薪或預設值
      total_amount: estimatedCost.value,
      status: 'pending' as const,
      notes: form.value.specialRequests,
    }

    const newBooking = await bookingStore.createBooking(bookingData)
    if (newBooking && typeof newBooking === 'object' && 'id' in newBooking) {
      onDialogOK((newBooking as any).id)
    }
  } catch (error) {
    console.error('預約失敗:', error)
    onDialogCancel()
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.booking-dialog {
  max-height: 90vh;
  overflow-y: auto;
}

.cost-estimate {
  text-align: center;
}
</style>
