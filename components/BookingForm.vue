<template>
  <div class="booking-form">
    <div class="form-header">
      <h2>預約看護服務</h2>
      <p v-if="caregiver">預約看護師：{{ caregiver.name }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="booking-form-content">
      <div class="form-section">
        <h3>服務類型</h3>
        <div class="radio-group">
          <label>
            <input
              type="radio"
              v-model="form.serviceType"
              value="hourly"
              required
            />
            <span>按小時計費</span>
          </label>
          <label>
            <input
              type="radio"
              v-model="form.serviceType"
              value="shift"
              required
            />
            <span>按班次計費</span>
          </label>
        </div>
      </div>

      <div class="form-section">
        <h3>預約時間</h3>
        <div class="date-time-grid">
          <div class="form-group">
            <label>開始日期</label>
            <input
              type="date"
              v-model="form.startDate"
              required
              :min="minDate"
            />
          </div>
          <div class="form-group">
            <label>結束日期</label>
            <input
              type="date"
              v-model="form.endDate"
              required
              :min="form.startDate"
            />
          </div>
          <div class="form-group">
            <label>開始時間</label>
            <input
              type="time"
              v-model="form.startTime"
              required
            />
          </div>
          <div class="form-group" v-if="form.serviceType === 'hourly'">
            <label>結束時間</label>
            <input
              type="time"
              v-model="form.endTime"
              required
            />
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3>被照護者資訊</h3>
        <div class="patient-info-grid">
          <div class="form-group">
            <label>姓名</label>
            <input
              type="text"
              v-model="form.patientInfo.name"
              required
              placeholder="請輸入被照護者姓名"
            />
          </div>
          <div class="form-group">
            <label>年齡</label>
            <input
              type="number"
              v-model="form.patientInfo.age"
              required
              min="1"
              max="120"
            />
          </div>
          <div class="form-group">
            <label>性別</label>
            <select v-model="form.patientInfo.gender" required>
              <option value="">請選擇</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <div class="form-group">
            <label>緊急聯絡人電話</label>
            <input
              type="tel"
              v-model="form.patientInfo.emergencyContact"
              required
              placeholder="0912-345-678"
            />
          </div>
        </div>
        
        <div class="form-group">
          <label>疾病史/特殊需求</label>
          <textarea
            v-model="medicalConditionsText"
            placeholder="請說明被照護者的疾病史、特殊需求或注意事項"
            rows="3"
          ></textarea>
        </div>
      </div>

      <div class="form-section">
        <h3>特殊需求</h3>
        <div class="form-group">
          <label>其他特殊需求</label>
          <textarea
            v-model="form.specialRequests"
            placeholder="請說明任何特殊需求或注意事項"
            rows="3"
          ></textarea>
        </div>
      </div>

      <div class="cost-summary">
        <h3>費用預估</h3>
        <div class="cost-breakdown">
          <div class="cost-item">
            <span>預估總費用</span>
            <span class="cost-value">NT$ {{ estimatedCost.toLocaleString() }}</span>
          </div>
          <div class="cost-note">
            <small>*實際費用以最終確認為準</small>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" @click="$emit('cancel')" class="btn-secondary">
          取消
        </button>
        <button type="submit" :disabled="isSubmitting" class="btn-primary">
          {{ isSubmitting ? '處理中...' : '確認預約' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useBookingStore } from '~/stores/bookings'
import { useCaregiverStore } from '~/stores/caregivers'

interface Props {
  caregiverId?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  cancel: []
  success: [bookingId: string]
}>()

const bookingStore = useBookingStore()
const caregiverStore = useCaregiverStore()

const caregiver = computed(() => 
  props.caregiverId ? caregiverStore.getCaregiverById(props.caregiverId) : null
)

const isSubmitting = ref(false)
const medicalConditionsText = ref('')

const form = ref({
  serviceType: 'hourly' as 'hourly' | 'shift',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  specialRequests: '',
  patientInfo: {
    name: '',
    age: 0,
    gender: '',
    emergencyContact: ''
  }
})

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const estimatedCost = computed(() => {
  if (!caregiver.value || !form.value.startDate || !form.value.startTime) {
    return 0
  }

  const startDate = new Date(form.value.startDate)
  const endDate = new Date(form.value.endDate || form.value.startDate)
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

  if (form.value.serviceType === 'hourly' && form.value.endTime) {
    const startTime = new Date(`2000-01-01T${form.value.startTime}`)
    const endTime = new Date(`2000-01-01T${form.value.endTime}`)
    const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
    return Math.round(hours * caregiver.value.hourly_rate * days)
  } else if (form.value.serviceType === 'shift') {
    return caregiver.value.shift_rate * days
  }

  return 0
})

watch(() => form.value.startDate, (newDate) => {
  if (newDate && !form.value.endDate) {
    form.value.endDate = newDate
  }
})

watch(() => form.value.serviceType, (newType) => {
  if (newType === 'shift') {
    form.value.endTime = ''
  }
})

watch(medicalConditionsText, (newValue) => {
  // 將文字轉換為陣列
  const conditions = newValue.split('\n').filter(condition => condition.trim())
  form.value.patientInfo.medicalConditions = conditions
})

const handleSubmit = async () => {
  if (!caregiver.value) return

  isSubmitting.value = true

  try {
    const bookingData = {
      caregiver_id: caregiver.value.id,
      user_id: 'user-001', // 暫時使用固定用戶ID
      service_type: form.value.serviceType,
      start_date: form.value.startDate,
      end_date: form.value.endDate,
      start_time: form.value.startTime,
      end_time: form.value.endTime,
      special_requests: form.value.specialRequests,
      total_cost: estimatedCost.value,
      status: 'pending' as const,
      patient_info: {
        ...form.value.patientInfo,
        medicalConditions: medicalConditionsText.value.split('\n').filter(condition => condition.trim())
      }
    }

    const newBooking = await bookingStore.createBooking(bookingData)
    emit('success', newBooking.id)
  } catch (error) {
    console.error('預約失敗:', error)
    alert('預約失敗，請稍後再試')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.booking-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.form-header h2 {
  margin: 0 0 8px 0;
  color: #2d3748;
}

.form-header p {
  color: #4a5568;
  margin: 0;
}

.form-section {
  margin-bottom: 32px;
}

.form-section h3 {
  margin: 0 0 16px 0;
  color: #2d3748;
  font-size: 1.25rem;
}

.radio-group {
  display: flex;
  gap: 24px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.date-time-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.patient-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 4px;
  font-weight: 600;
  color: #4a5568;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3182ce;
}

.cost-summary {
  background: #f7fafc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 32px;
}

.cost-summary h3 {
  margin: 0 0 16px 0;
  color: #2d3748;
}

.cost-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cost-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3182ce;
}

.cost-note {
  color: #718096;
  text-align: center;
  margin-top: 8px;
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

.btn-secondary {
  padding: 12px 24px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f7fafc;
}

.btn-primary {
  padding: 12px 24px;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: #2c5282;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .booking-form {
    padding: 16px;
  }
  
  .date-time-grid,
  .patient-info-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 12px;
  }
}
</style>