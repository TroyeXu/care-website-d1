<template>
  <q-page class="q-pa-md">
    <!-- 頁面標題與統計 -->
    <div class="page-header q-mb-lg">
      <div class="row items-center justify-between">
        <div class="col">
          <h1 class="text-h4 text-primary q-mb-sm">
            <q-icon name="medical_services" class="q-mr-sm" />
            專業看護師
          </h1>
          <p class="text-body1 text-grey-7">
            瀏覽所有專業看護員，找到最合適的人選
          </p>
        </div>
        <div class="col-auto text-right">
          <div class="text-h6 text-primary">{{ caregivers.length }}</div>
          <div class="text-caption text-grey-6">位看護師</div>
        </div>
      </div>
    </div>

    <!-- 工具列 -->
    <div class="toolbar-section q-mb-lg">
      <div class="row items-center justify-between q-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            v-model="searchQuery"
            placeholder="搜尋看護師姓名或專業技能..."
            outlined
            dense
            clearable
            @input="filterCaregivers"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-6">
          <div class="row items-center justify-end q-gutter-sm">
            <q-select
              v-model="sortBy"
              :options="sortOptions"
              label="排序方式"
              outlined
              dense
              emit-value
              map-options
              @update:model-value="sortCaregivers"
              class="col-auto"
              style="min-width: 120px"
            />
            <q-btn-toggle
              v-model="viewMode"
              :options="viewOptions"
              outline
              color="primary"
              size="sm"
            />
            <q-btn
              flat
              round
              icon="tune"
              @click="showFilters = !showFilters"
              :color="hasActiveFilters ? 'primary' : 'grey'"
            >
              <q-tooltip>篩選選項</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- 篩選面板 -->
    <q-slide-transition>
      <q-card v-show="showFilters" flat bordered class="q-mb-lg">
        <q-card-section>
          <div class="text-subtitle1 q-mb-md">篩選選項</div>
          <div class="row q-gutter-md">
            <div class="col-12 col-sm-6 col-md-3">
              <q-select
                v-model="filters.location"
                :options="locationOptions"
                label="服務地區"
                outlined
                dense
                clearable
              />
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <q-range
                v-model="filters.priceRange"
                :min="0"
                :max="2000"
                :step="50"
                label
                color="primary"
                label-always
                markers
              />
              <div class="text-caption text-center q-mt-sm">價格範圍 (NT$/時)</div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <q-rating
                v-model="filters.minRating"
                :max="5"
                size="1.5em"
                color="orange"
              />
              <div class="text-caption text-center q-mt-sm">最低評分</div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <q-toggle
                v-model="filters.availableOnly"
                label="僅顯示可預約"
                color="primary"
              />
            </div>
          </div>
          <div class="row justify-end q-mt-md">
            <q-btn flat @click="clearFilters" class="q-mr-sm">清除</q-btn>
            <q-btn color="primary" @click="applyFilters">套用篩選</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-slide-transition>

    <!-- 載入狀態 -->
    <div v-if="loading" class="loading-state text-center q-pa-xl">
      <q-spinner-grid size="60px" color="primary" />
      <div class="q-mt-md text-h6 text-grey-6">載入看護師資料中</div>
      <q-linear-progress 
        :value="loadingProgress" 
        color="primary" 
        class="q-mt-md" 
        style="width: 200px; margin: 0 auto;"
      />
      <div class="text-caption text-grey-5 q-mt-sm">{{ loadingProgress * 100 | 0 }}%</div>
    </div>

    <!-- 看護師列表 -->
    <div v-else-if="filteredCaregivers.length > 0">
      <!-- 網格檢視 -->
      <div v-if="viewMode === 'grid'" class="caregiver-grid">
        <CaregiverCard 
          v-for="caregiver in filteredCaregivers" 
          :key="caregiver.id" 
          :caregiver="caregiver"
          :compact="true"
          @select="navigateToDetail"
          @book="startBooking"
        />
      </div>
      
      <!-- 列表檢視 -->
      <div v-else class="caregiver-list-view">
        <q-list separator>
          <CaregiverListItem
            v-for="caregiver in filteredCaregivers"
            :key="caregiver.id"
            :caregiver="caregiver"
            @select="navigateToDetail"
            @book="startBooking"
          />
        </q-list>
      </div>
    </div>

    <!-- 空狀態 -->
    <div v-else class="empty-state text-center q-pa-xl">
      <q-icon name="person_search" size="5rem" color="grey-4" class="q-mb-lg" />
      <div class="text-h5 text-grey-6 q-mb-md">
        {{ searchQuery || hasActiveFilters ? '沒有找到符合條件的看護師' : '目前沒有可用的看護師' }}
      </div>
      <div class="text-body1 text-grey-5 q-mb-lg">
        {{ searchQuery || hasActiveFilters ? '請嘗試調整搜尋條件或篩選設定' : '請稍後再試或聯絡客服' }}
      </div>
      <div class="row justify-center q-gutter-sm">
        <q-btn 
          v-if="searchQuery || hasActiveFilters"
          flat 
          color="primary" 
          @click="clearAllFilters"
        >
          清除所有條件
        </q-btn>
        <q-btn 
          outline 
          color="primary" 
          icon="support_agent"
          @click="contactSupport"
        >
          聯絡客服
        </q-btn>
      </div>
    </div>

    <!-- 錯誤狀態 -->
    <q-banner v-if="error" class="bg-red-1 text-red-8 q-mt-md rounded-borders">
      <template v-slot:avatar>
        <q-icon name="error_outline" color="red" />
      </template>
      <div class="text-weight-bold">載入失敗</div>
      <div class="text-caption q-mt-xs">{{ error }}</div>
      <template v-slot:action>
        <q-btn 
          flat 
          color="red" 
          @click="loadCaregivers"
          :loading="loading"
        >
          重新載入
        </q-btn>
      </template>
    </q-banner>

    <!-- 載入更多按鈕 -->
    <div v-if="!loading && hasMore" class="text-center q-mt-lg">
      <q-btn
        outline
        color="primary"
        @click="loadMoreCaregivers"
        :loading="loadingMore"
      >
        載入更多看護師
      </q-btn>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useApiService } from '~/composables/useApiService'
import CaregiverCard from '~/components/CaregiverCard.vue'

// 簡化的頁面設定
useHead({
  title: '看護列表 - 護理服務平台',
  meta: [
    { name: 'description', content: '瀏覽所有專業看護員，找到最合適的人選' }
  ]
})

// 組合式函數
const router = useRouter()
const $q = useQuasar()
const apiService = useApiService()

// 響應式資料
const caregivers = ref([])
const filteredCaregivers = ref([])
const loading = ref(false)
const loadingMore = ref(false)
const loadingProgress = ref(0)
const error = ref('')
const hasMore = ref(true)
const currentPage = ref(1)

// UI 狀態
const searchQuery = ref('')
const viewMode = ref('grid')
const sortBy = ref('rating')
const showFilters = ref(false)

// 篩選條件
const filters = ref({
  location: '',
  priceRange: { min: 0, max: 2000 },
  minRating: 0,
  availableOnly: false
})

// 選項資料
const sortOptions = [
  { label: '評分最高', value: 'rating' },
  { label: '價格最低', value: 'price_low' },
  { label: '價格最高', value: 'price_high' },
  { label: '經驗最多', value: 'experience' },
  { label: '最新加入', value: 'newest' }
]

const viewOptions = [
  { label: '網格', value: 'grid', icon: 'grid_view' },
  { label: '列表', value: 'list', icon: 'list' }
]

const locationOptions = [
  '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市'
]

// 計算屬性
const hasActiveFilters = computed(() => {
  return filters.value.location ||
         filters.value.priceRange.min > 0 ||
         filters.value.priceRange.max < 2000 ||
         filters.value.minRating > 0 ||
         filters.value.availableOnly
})

// 方法
const loadCaregivers = async () => {
  loading.value = true
  error.value = ''
  loadingProgress.value = 0
  
  // 模擬載入進度
  const progressInterval = setInterval(() => {
    if (loadingProgress.value < 0.9) {
      loadingProgress.value += 0.1
    }
  }, 200)
  
  try {
    const response = await apiService.getCaregivers(1, 50)
    caregivers.value = response.data?.data || response.data || response
    filteredCaregivers.value = [...caregivers.value]
    loadingProgress.value = 1
    
    // 清除進度條
    setTimeout(() => {
      clearInterval(progressInterval)
    }, 500)
    
  } catch (err: any) {
    error.value = err.message || '載入看護師資料失敗'
    console.error('載入看護師失敗:', err)
    clearInterval(progressInterval)
  } finally {
    loading.value = false
  }
}

const loadMoreCaregivers = async () => {
  if (loadingMore.value || !hasMore.value) return
  
  loadingMore.value = true
  currentPage.value++
  
  try {
    const response = await apiService.getCaregivers(currentPage.value, 20)
    const newCaregivers = response.data?.data || response.data || response
    
    if (newCaregivers.length === 0) {
      hasMore.value = false
    } else {
      caregivers.value.push(...newCaregivers)
      filterCaregivers()
    }
  } catch (err: any) {
    console.error('載入更多看護師失敗:', err)
    $q.notify({
      type: 'negative',
      message: '載入更多資料失敗',
      timeout: 3000
    })
  } finally {
    loadingMore.value = false
  }
}

const filterCaregivers = () => {
  let filtered = [...caregivers.value]
  
  // 文字搜尋
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(caregiver => 
      caregiver.name.toLowerCase().includes(query) ||
      caregiver.skills.toLowerCase().includes(query) ||
      caregiver.location.toLowerCase().includes(query)
    )
  }
  
  // 地區篩選
  if (filters.value.location) {
    filtered = filtered.filter(caregiver => 
      caregiver.location.includes(filters.value.location)
    )
  }
  
  // 價格範圍篩選
  filtered = filtered.filter(caregiver => 
    caregiver.hourly_rate >= filters.value.priceRange.min &&
    caregiver.hourly_rate <= filters.value.priceRange.max
  )
  
  // 最低評分篩選
  if (filters.value.minRating > 0) {
    filtered = filtered.filter(caregiver => 
      caregiver.rating >= filters.value.minRating
    )
  }
  
  // 僅顯示可預約
  if (filters.value.availableOnly) {
    filtered = filtered.filter(caregiver => caregiver.available)
  }
  
  filteredCaregivers.value = filtered
  sortCaregivers()
}

const sortCaregivers = () => {
  const sorted = [...filteredCaregivers.value]
  
  switch (sortBy.value) {
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating)
      break
    case 'price_low':
      sorted.sort((a, b) => a.hourly_rate - b.hourly_rate)
      break
    case 'price_high':
      sorted.sort((a, b) => b.hourly_rate - a.hourly_rate)
      break
    case 'experience':
      sorted.sort((a, b) => (b.experience_years || 0) - (a.experience_years || 0))
      break
    case 'newest':
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      break
  }
  
  filteredCaregivers.value = sorted
}

const applyFilters = () => {
  filterCaregivers()
  showFilters.value = false
}

const clearFilters = () => {
  filters.value = {
    location: '',
    priceRange: { min: 0, max: 2000 },
    minRating: 0,
    availableOnly: false
  }
  filterCaregivers()
}

const clearAllFilters = () => {
  searchQuery.value = ''
  clearFilters()
}

const navigateToDetail = (caregiver) => {
  router.push(`/caregivers/${caregiver.id}`)
}

const startBooking = (caregiver) => {
  router.push({
    path: '/booking/create',
    query: { caregiverId: caregiver.id }
  })
}

const contactSupport = () => {
  router.push('/support/contact')
}

// 監聽搜尋查詢變化
watch(searchQuery, () => {
  filterCaregivers()
}, { debounce: 300 })

// 頁面載入時執行
onMounted(() => {
  loadCaregivers()
})
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.toolbar-section .q-input {
  background: white;
  border-radius: 8px;
}

.caregiver-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.caregiver-list-view {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading-state {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-state {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 768px) {
  .page-header {
    padding: 1.5rem;
  }
  
  .caregiver-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .toolbar-section .row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .toolbar-section .col-12:last-child .row {
    justify-content: center;
    margin-top: 1rem;
  }
}

@media (max-width: 480px) {
  .caregiver-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .q-page {
    padding: 0.75rem;
  }
}

/* 改善篩選面板的響應式設計 */
.q-card .row.q-gutter-md > div {
  min-width: 0;
}

/* 改善按鈕群組在小螢幕上的顯示 */
@media (max-width: 600px) {
  .q-btn-toggle {
    width: 100%;
  }
  
  .toolbar-section .q-select {
    min-width: 100px;
  }
}

/* 載入進度條動畫 */
.q-linear-progress {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

/* 篩選卡片動畫 */
.q-slide-transition-enter-active,
.q-slide-transition-leave-active {
  transition: all 0.3s ease;
}

.q-slide-transition-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.q-slide-transition-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
