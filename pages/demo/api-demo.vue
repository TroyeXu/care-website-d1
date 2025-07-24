<template>
  <div class="api-demo">
    <div class="container">
      <h1>Mock API 演示頁面</h1>
      
      <!-- API 模式切換 -->
      <ApiModeToggle />

      <!-- 載入狀態 -->
      <div v-if="apiService.isLoading.value" class="loading">
        <div class="spinner"></div>
        <p>載入中...</p>
      </div>

      <!-- 錯誤狀態 -->
      <div v-if="apiService.error.value" class="error">
        <h3>發生錯誤</h3>
        <p>{{ apiService.error.value.message }}</p>
        <button @click="apiService.clearError()">清除錯誤</button>
      </div>

      <!-- 認證測試 -->
      <div class="demo-section">
        <h2>認證測試</h2>
        <form @submit.prevent="testLogin" class="test-form">
          <div class="form-group">
            <label>Email:</label>
            <input v-model="loginForm.email" type="email" placeholder="zhiming.lin@email.com">
          </div>
          <div class="form-group">
            <label>密碼:</label>
            <input v-model="loginForm.password" type="password" placeholder="password123">
          </div>
          <button type="submit" :disabled="apiService.isLoading.value">
            測試登入
          </button>
        </form>
        
        <div v-if="loginResult" class="result">
          <h3>登入結果：</h3>
          <pre>{{ JSON.stringify(loginResult, null, 2) }}</pre>
        </div>
      </div>

      <!-- 看護師資料測試 -->
      <div class="demo-section">
        <h2>看護師資料測試</h2>
        <div class="test-actions">
          <button @click="testGetCaregivers" :disabled="apiService.isLoading.value">
            載入看護師列表
          </button>
          <button @click="testSearchCaregivers" :disabled="apiService.isLoading.value">
            搜尋看護師
          </button>
          <button @click="testFilterCaregivers" :disabled="apiService.isLoading.value">
            篩選看護師
          </button>
        </div>
        
        <div v-if="caregiverResults" class="result">
          <h3>看護師資料：</h3>
          <div class="caregiver-grid">
            <div v-for="caregiver in caregiverResults" :key="caregiver.id" class="caregiver-card">
              <h4>{{ caregiver.name }}</h4>
              <p>經驗：{{ caregiver.experience }}</p>
              <p>評分：{{ caregiver.rating }}/5.0</p>
              <p>時薪：NT$ {{ caregiver.hourly_rate }}</p>
              <p>地點：{{ caregiver.location }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 預約測試 -->
      <div class="demo-section">
        <h2>預約測試</h2>
        <form @submit.prevent="testCreateBooking" class="test-form">
          <div class="form-group">
            <label>看護師ID:</label>
            <select v-model="bookingForm.caregiver_id">
              <option value="">選擇看護師</option>
              <option v-for="caregiver in caregiverResults" :key="caregiver.id" :value="caregiver.id">
                {{ caregiver.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>服務類型:</label>
            <select v-model="bookingForm.service_type">
              <option value="hourly">按時計費</option>
              <option value="shift">包班制</option>
            </select>
          </div>
          <div class="form-group">
            <label>開始日期:</label>
            <input v-model="bookingForm.start_date" type="date">
          </div>
          <div class="form-group">
            <label>開始時間:</label>
            <input v-model="bookingForm.start_time" type="time">
          </div>
          <div class="form-group">
            <label>結束時間:</label>
            <input v-model="bookingForm.end_time" type="time">
          </div>
          <div class="form-group">
            <label>特殊需求:</label>
            <textarea v-model="bookingForm.special_requests" placeholder="請描述特殊需求..."></textarea>
          </div>
          <button type="submit" :disabled="apiService.isLoading.value">
            建立預約
          </button>
        </form>
        
        <div v-if="bookingResult" class="result">
          <h3>預約結果：</h3>
          <pre>{{ JSON.stringify(bookingResult, null, 2) }}</pre>
        </div>
      </div>

      <!-- 支付測試 -->
      <div class="demo-section">
        <h2>支付測試</h2>
        <form @submit.prevent="testPayment" class="test-form">
          <div class="form-group">
            <label>預約ID:</label>
            <input v-model="paymentForm.bookingId" placeholder="booking-001">
          </div>
          <div class="form-group">
            <label>金額:</label>
            <input v-model="paymentForm.amount" type="number" placeholder="2240">
          </div>
          <div class="form-group">
            <label>支付方式:</label>
            <select v-model="paymentForm.method">
              <option value="credit_card">信用卡</option>
              <option value="bank_transfer">銀行轉帳</option>
              <option value="cash">現金</option>
            </select>
          </div>
          <div v-if="paymentForm.method === 'credit_card'" class="card-details">
            <div class="form-group">
              <label>卡號:</label>
              <input v-model="paymentForm.cardNumber" placeholder="1234567890123456">
            </div>
            <div class="form-group">
              <label>CVV:</label>
              <input v-model="paymentForm.cvv" placeholder="123">
            </div>
          </div>
          <button type="submit" :disabled="apiService.isLoading.value">
            處理支付
          </button>
        </form>
        
        <div v-if="paymentResult" class="result">
          <h3>支付結果：</h3>
          <pre>{{ JSON.stringify(paymentResult, null, 2) }}</pre>
        </div>
      </div>

      <!-- 儀表板統計測試 -->
      <div class="demo-section">
        <h2>儀表板統計測試</h2>
        <button @click="testDashboardStats" :disabled="apiService.isLoading.value">
          載入儀表板統計
        </button>
        
        <div v-if="dashboardStats" class="result">
          <h3>儀表板統計：</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <h4>總預約數</h4>
              <p class="stat-number">{{ dashboardStats.totalBookings }}</p>
            </div>
            <div class="stat-card">
              <h4>已完成預約</h4>
              <p class="stat-number">{{ dashboardStats.completedBookings }}</p>
            </div>
            <div class="stat-card">
              <h4>待確認預約</h4>
              <p class="stat-number">{{ dashboardStats.pendingBookings }}</p>
            </div>
            <div class="stat-card">
              <h4>總花費</h4>
              <p class="stat-number">NT$ {{ dashboardStats.totalSpent.toLocaleString() }}</p>
            </div>
          </div>
          
          <div v-if="dashboardStats.favoriteCaregiver" class="favorite-caregiver">
            <h4>最常預約的看護師：</h4>
            <p>{{ dashboardStats.favoriteCaregiver.name }}</p>
          </div>
        </div>
      </div>

      <!-- API 響應時間測試 -->
      <div class="demo-section">
        <h2>API 響應時間測試</h2>
        <button @click="testApiPerformance" :disabled="apiService.isLoading.value">
          測試 API 響應時間
        </button>
        
        <div v-if="performanceResults.length > 0" class="result">
          <h3>響應時間結果：</h3>
          <table class="performance-table">
            <thead>
              <tr>
                <th>API 名稱</th>
                <th>響應時間 (ms)</th>
                <th>狀態</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in performanceResults" :key="result.name">
                <td>{{ result.name }}</td>
                <td>{{ result.duration }}</td>
                <td :class="result.success ? 'success' : 'error'">
                  {{ result.success ? '成功' : '失敗' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApiService } from '~/composables/useApiService'
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('Mock API 演示 - DogFriend', 'Mock API 功能測試和演示頁面')

const apiService = useApiService({ useMockApi: true })

// 測試表單資料
const loginForm = ref({
  email: 'zhiming.lin@email.com',
  password: 'password123'
})

const bookingForm = ref({
  caregiver_id: '',
  service_type: 'hourly',
  start_date: '',
  end_date: '',
  start_time: '09:00',
  end_time: '17:00',
  special_requests: ''
})

const paymentForm = ref({
  bookingId: 'booking-001',
  amount: 2240,
  method: 'credit_card',
  cardNumber: '1234567890123456',
  cvv: '123'
})

// 測試結果
const loginResult = ref(null)
const caregiverResults = ref([])
const bookingResult = ref(null)
const paymentResult = ref(null)
const dashboardStats = ref(null)
const performanceResults = ref([])

// 測試方法
const testLogin = async () => {
  try {
    const result = await apiService.login(loginForm.value.email, loginForm.value.password)
    loginResult.value = result
  } catch (error) {
    console.error('登入測試失敗:', error)
  }
}

const testGetCaregivers = async () => {
  try {
    const result = await apiService.getCaregivers(1, 10)
    caregiverResults.value = result.data ? result.data.data : result
  } catch (error) {
    console.error('載入看護師列表失敗:', error)
  }
}

const testSearchCaregivers = async () => {
  try {
    const result = await apiService.searchCaregivers('失智症')
    caregiverResults.value = result
  } catch (error) {
    console.error('搜尋看護師失敗:', error)
  }
}

const testFilterCaregivers = async () => {
  try {
    const result = await apiService.filterCaregivers({
      location: '台北市',
      minRating: 4.5,
      maxHourlyRate: 300
    })
    caregiverResults.value = result
  } catch (error) {
    console.error('篩選看護師失敗:', error)
  }
}

const testCreateBooking = async () => {
  try {
    // 設定默認值
    if (!bookingForm.value.start_date) {
      bookingForm.value.start_date = new Date().toISOString().split('T')[0]
    }
    if (!bookingForm.value.end_date) {
      bookingForm.value.end_date = bookingForm.value.start_date
    }

    const bookingData = {
      caregiver_id: parseInt(bookingForm.value.caregiver_id),
      user_id: 'user-001',
      service_type: bookingForm.value.service_type,
      start_date: bookingForm.value.start_date,
      end_date: bookingForm.value.end_date,
      start_time: bookingForm.value.start_time,
      end_time: bookingForm.value.end_time,
      special_requests: bookingForm.value.special_requests,
      total_cost: 2240,
      status: 'pending',
      patient_info: {
        name: '測試用戶',
        age: 45,
        gender: '男',
        medicalConditions: ['糖尿病'],
        emergencyContact: '0912-345-678'
      }
    }

    const result = await apiService.createBooking(bookingData)
    bookingResult.value = result
  } catch (error) {
    console.error('建立預約失敗:', error)
  }
}

const testPayment = async () => {
  try {
    const paymentData = {
      bookingId: paymentForm.value.bookingId,
      amount: paymentForm.value.amount,
      method: paymentForm.value.method,
      cardDetails: paymentForm.value.method === 'credit_card' ? {
        number: paymentForm.value.cardNumber,
        cvv: paymentForm.value.cvv,
        expiryMonth: '12',
        expiryYear: '2025'
      } : undefined
    }

    const result = await apiService.processPayment(paymentData)
    paymentResult.value = result
  } catch (error) {
    console.error('支付處理失敗:', error)
  }
}

const testDashboardStats = async () => {
  try {
    const result = await apiService.getDashboardStats('user-001')
    dashboardStats.value = result
  } catch (error) {
    console.error('載入儀表板統計失敗:', error)
  }
}

const testApiPerformance = async () => {
  const tests = [
    { name: '載入看護師列表', fn: () => apiService.getCaregivers() },
    { name: '搜尋看護師', fn: () => apiService.searchCaregivers('專業') },
    { name: '載入用戶預約', fn: () => apiService.getBookingsByUser('user-001') },
    { name: '儀表板統計', fn: () => apiService.getDashboardStats('user-001') }
  ]

  performanceResults.value = []

  for (const test of tests) {
    const startTime = performance.now()
    let success = true
    
    try {
      await test.fn()
    } catch (error) {
      success = false
    }
    
    const endTime = performance.now()
    const duration = Math.round(endTime - startTime)
    
    performanceResults.value.push({
      name: test.name,
      duration,
      success
    })
  }
}

// 初始化
onMounted(() => {
  testGetCaregivers()
})
</script>

<style scoped>
.api-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.container {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.api-mode-toggle {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.toggle-buttons {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.toggle-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #e9ecef;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-buttons button.active {
  background: #007bff;
  color: white;
}

.mode-info {
  margin-top: 10px;
  color: #666;
}

.loading {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: #e3f2fd;
  border-radius: 8px;
  margin-bottom: 20px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  padding: 20px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  margin-bottom: 20px;
}

.error h3 {
  color: #721c24;
  margin: 0 0 10px 0;
}

.error p {
  color: #721c24;
  margin: 0 0 10px 0;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.demo-section h2 {
  margin: 0 0 20px 0;
  color: #495057;
}

.test-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #495057;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

.test-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.test-actions button,
.test-form button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.test-actions button:hover,
.test-form button:hover {
  background: #0056b3;
}

.test-actions button:disabled,
.test-form button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.result {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #007bff;
}

.result h3 {
  margin: 0 0 10px 0;
  color: #495057;
}

.result pre {
  background: #343a40;
  color: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
}

.caregiver-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.caregiver-card {
  padding: 15px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.caregiver-card h4 {
  margin: 0 0 10px 0;
  color: #007bff;
}

.caregiver-card p {
  margin: 5px 0;
  color: #6c757d;
  font-size: 14px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.stat-card {
  padding: 15px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  text-align: center;
}

.stat-card h4 {
  margin: 0 0 10px 0;
  color: #6c757d;
  font-size: 14px;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #007bff;
  margin: 0;
}

.favorite-caregiver {
  margin-top: 15px;
  padding: 15px;
  background: #e3f2fd;
  border-radius: 8px;
}

.performance-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.performance-table th,
.performance-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.performance-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.performance-table .success {
  color: #28a745;
}

.performance-table .error {
  color: #dc3545;
}

.card-details {
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .api-demo {
    padding: 10px;
  }
  
  .container {
    padding: 20px;
  }
  
  .toggle-buttons {
    flex-direction: column;
  }
  
  .test-actions {
    flex-direction: column;
  }
  
  .caregiver-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>