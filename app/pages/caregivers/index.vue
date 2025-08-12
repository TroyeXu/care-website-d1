<template>
  <q-page class="caregivers-page">
    <!-- 固定頂部搜尋區域 -->
    <div class="search-header">
      <div class="search-container">
        <q-input
          v-model="searchQuery"
          placeholder="搜尋看護師姓名或專業技能..."
          filled
          dense
          class="search-input"
          @input="handleSearch"
        >
          <template #prepend>
            <q-icon name="search" size="20px" />
          </template>
          <template #append>
            <q-btn
              v-if="searchQuery"
              flat
              dense
              round
              icon="close"
              size="sm"
              @click="searchQuery = ''"
            />
          </template>
        </q-input>
      </div>
      
      <!-- 快速篩選按鈕 -->
      <div class="quick-filters">
        <q-scroll-area horizontal style="height: 45px">
          <div class="row no-wrap q-gutter-xs q-px-sm">
            <q-chip
              v-for="filter in quickFilters"
              :key="filter.key"
              :color="activeQuickFilter === filter.key ? 'primary' : 'grey-3'"
              :text-color="activeQuickFilter === filter.key ? 'white' : 'grey-8'"
              clickable
              @click="toggleQuickFilter(filter.key)"
            >
              <q-icon :name="filter.icon" size="16px" class="q-mr-xs" />
              {{ filter.label }}
            </q-chip>
          </div>
        </q-scroll-area>
      </div>
    </div>

    <!-- 排序和篩選欄 -->
    <div class="filter-bar">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-caption text-grey-6">
            找到 {{ filteredCaregivers.length }} 位看護師
          </div>
        </div>
        <div class="col-auto q-gutter-x-xs">
          <q-btn
            flat
            dense
            round
            icon="sort"
            :color="sortBy !== 'default' ? 'primary' : 'grey-7'"
            @click="showSortMenu = true"
          />
          <q-btn
            flat
            dense
            round
            icon="filter_list"
            :color="activeFilterCount > 0 ? 'primary' : 'grey-7'"
            @click="showFilterDrawer = true"
          />
        </div>
      </div>
    </div>

    <!-- 載入狀態 -->
    <div v-if="loading" class="loading-container">
      <q-spinner-dots size="40px" color="primary" />
      <div class="text-grey-6 q-mt-md">載入中...</div>
    </div>

    <!-- 看護師列表 -->
    <div v-else class="caregiver-list">
      <div v-if="filteredCaregivers.length === 0" class="empty-state">
        <q-icon name="search_off" size="64px" color="grey-5" />
        <div class="text-h6 text-grey-7 q-mt-md">沒有找到看護師</div>
        <div class="text-body2 text-grey-6 q-mt-sm">請嘗試調整搜尋條件</div>
        <q-btn
          flat
          color="primary"
          label="清除篩選"
          class="q-mt-md"
          @click="clearAllFilters"
        />
      </div>

      <!-- 看護師卡片列表 -->
      <div v-else class="cards-container">
        <q-card
          v-for="caregiver in paginatedCaregivers"
          :key="caregiver.id"
          flat
          class="caregiver-card"
          @click="navigateToDetail(caregiver)"
        >
          <q-card-section class="q-pa-sm">
            <div class="row items-start no-wrap">
              <!-- 左側：頭像 -->
              <div class="col-auto q-pr-sm">
                <q-avatar size="60px">
                  <img :src="caregiver.avatar" :alt="caregiver.name" />
                </q-avatar>
              </div>

              <!-- 中間：基本資訊 -->
              <div class="col q-pr-xs">
                <div class="text-subtitle1 text-weight-bold">
                  {{ caregiver.name }}
                </div>
                
                <!-- 評分 -->
                <div class="row items-center q-mt-xs">
                  <q-rating
                    :model-value="caregiver.rating"
                    size="14px"
                    color="amber"
                    readonly
                  />
                  <span class="text-caption text-grey-6 q-ml-xs">
                    {{ caregiver.rating }} ({{ caregiver.reviews_count }})
                  </span>
                </div>

                <!-- 資訊標籤 -->
                <div class="info-tags q-mt-xs">
                  <q-chip
                    dense
                    size="sm"
                    color="grey-2"
                    text-color="grey-8"
                    class="q-ma-none q-mr-xs"
                  >
                    <q-icon name="work" size="12px" class="q-mr-xs" />
                    {{ caregiver.experience_years }}年經驗
                  </q-chip>
                  <q-chip
                    dense
                    size="sm"
                    color="grey-2"
                    text-color="grey-8"
                    class="q-ma-none"
                  >
                    <q-icon name="place" size="12px" class="q-mr-xs" />
                    {{ caregiver.service_areas?.[0] || '未指定' }}
                  </q-chip>
                </div>

                <!-- 專業技能 -->
                <div class="skills-tags q-mt-xs">
                  <q-chip
                    v-for="(skill, index) in caregiver.specialties?.slice(0, 2)"
                    :key="index"
                    dense
                    size="sm"
                    color="primary"
                    text-color="white"
                    class="q-ma-none q-mr-xs"
                  >
                    {{ skill }}
                  </q-chip>
                  <span
                    v-if="caregiver.specialties?.length > 2"
                    class="text-caption text-grey-6"
                  >
                    +{{ caregiver.specialties.length - 2 }}
                  </span>
                </div>
              </div>

              <!-- 右側：價格 -->
              <div class="col-auto text-right">
                <div class="price-info">
                  <div class="text-h6 text-primary text-weight-bold">
                    ${{ caregiver.hourly_rate }}
                  </div>
                  <div class="text-caption text-grey-6">/小時</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- 載入更多 -->
        <div v-if="hasMore" class="load-more">
          <q-btn
            flat
            color="primary"
            label="載入更多"
            class="full-width"
            @click="loadMore"
          />
        </div>
      </div>
    </div>

    <!-- 排序選單 (Bottom Sheet) -->
    <q-dialog v-model="showSortMenu" position="bottom">
      <q-card class="sort-menu">
        <q-card-section class="q-pb-none">
          <div class="text-h6">排序方式</div>
        </q-card-section>
        <q-list>
          <q-item
            v-for="option in sortOptions"
            :key="option.value"
            clickable
            v-close-popup
            @click="setSortBy(option.value)"
          >
            <q-item-section>
              <q-item-label>{{ option.label }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon
                v-if="sortBy === option.value"
                name="check"
                color="primary"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>

    <!-- 篩選側邊欄 -->
    <q-drawer
      v-model="showFilterDrawer"
      side="right"
      overlay
      elevated
      :width="320"
      :breakpoint="0"
    >
      <div class="filter-drawer">
        <!-- 標題 -->
        <div class="filter-header">
          <div class="text-h6">篩選條件</div>
          <q-btn
            flat
            dense
            round
            icon="close"
            @click="showFilterDrawer = false"
          />
        </div>

        <!-- 篩選內容 -->
        <q-scroll-area class="filter-content">
          <!-- 服務地區 -->
          <div class="filter-section">
            <div class="filter-title">服務地區</div>
            <q-select
              v-model="filters.location"
              :options="locationOptions"
              filled
              dense
              clearable
              placeholder="選擇地區"
            />
          </div>

          <!-- 價格範圍 -->
          <div class="filter-section">
            <div class="filter-title">價格範圍 (時薪)</div>
            <div class="price-range">
              <q-input
                v-model.number="filters.minPrice"
                type="number"
                filled
                dense
                placeholder="最低"
                prefix="$"
                class="col"
              />
              <span class="q-mx-sm">-</span>
              <q-input
                v-model.number="filters.maxPrice"
                type="number"
                filled
                dense
                placeholder="最高"
                prefix="$"
                class="col"
              />
            </div>
          </div>

          <!-- 評分 -->
          <div class="filter-section">
            <div class="filter-title">最低評分</div>
            <div class="text-center q-pt-sm">
              <q-rating
                v-model="filters.minRating"
                size="32px"
                color="amber"
                :max="5"
              />
              <div class="text-caption text-grey-6 q-mt-xs">
                {{ filters.minRating || 0 }} 星以上
              </div>
            </div>
          </div>

          <!-- 經驗年數 -->
          <div class="filter-section">
            <div class="filter-title">經驗年數</div>
            <q-option-group
              v-model="filters.experience"
              :options="experienceOptions"
              color="primary"
            />
          </div>

          <!-- 專業技能 -->
          <div class="filter-section">
            <div class="filter-title">專業技能</div>
            <div class="skills-grid">
              <q-checkbox
                v-for="skill in skillOptions"
                :key="skill"
                v-model="filters.skills"
                :val="skill"
                :label="skill"
                dense
              />
            </div>
          </div>

          <!-- 其他條件 -->
          <div class="filter-section">
            <div class="filter-title">其他條件</div>
            <q-checkbox
              v-model="filters.availableOnly"
              label="只顯示可預約"
              dense
            />
          </div>
        </q-scroll-area>

        <!-- 底部按鈕 -->
        <div class="filter-footer">
          <q-btn
            flat
            label="清除"
            class="col"
            @click="clearFilters"
          />
          <q-btn
            unelevated
            color="primary"
            label="套用"
            class="col"
            @click="applyFilters"
          />
        </div>
      </div>
    </q-drawer>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import CaregiverCard from '~/components/CaregiverCard.vue'

const router = useRouter()
const $q = useQuasar()

// 響應式資料
const searchQuery = ref('')
const loading = ref(false)
const showSortMenu = ref(false)
const showFilterDrawer = ref(false)
const sortBy = ref('default')
const activeQuickFilter = ref('')
const currentPage = ref(1)
const pageSize = 10

// 模擬資料
const caregivers = ref([
  {
    id: 'caregiver-1',
    name: '林美玲',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 4.8,
    reviews_count: 156,
    experience_years: 8,
    hourly_rate: 600,
    service_areas: ['台北市', '新北市'],
    specialties: ['長期照護', '失智照護', '復健協助'],
    is_available: true,
    is_verified: true,
  },
  {
    id: 'caregiver-2', 
    name: '陳淑芬',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4.9,
    reviews_count: 203,
    experience_years: 12,
    hourly_rate: 700,
    service_areas: ['台北市'],
    specialties: ['重症照護', '醫院看護', '居家照護'],
    is_available: true,
    is_verified: true,
  },
  {
    id: 'caregiver-3',
    name: '王雅婷',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 4.7,
    reviews_count: 89,
    experience_years: 5,
    hourly_rate: 550,
    service_areas: ['新北市'],
    specialties: ['老人照護', '陪伴服務'],
    is_available: false,
    is_verified: true,
  },
  // 可以添加更多模擬資料
])

// 快速篩選選項
const quickFilters = [
  { key: 'available', label: '可預約', icon: 'event_available' },
  { key: 'highRating', label: '高評分', icon: 'star' },
  { key: 'experienced', label: '資深', icon: 'workspace_premium' },
  { key: 'nearby', label: '附近', icon: 'near_me' },
]

// 排序選項
const sortOptions = [
  { label: '預設排序', value: 'default' },
  { label: '評分最高', value: 'rating' },
  { label: '價格最低', value: 'price_asc' },
  { label: '價格最高', value: 'price_desc' },
  { label: '經驗最多', value: 'experience' },
  { label: '距離最近', value: 'distance' },
]

// 地區選項 - 台灣所有縣市
const locationOptions = [
  // 直轄市
  '台北市',
  '新北市',
  '桃園市',
  '台中市',
  '台南市',
  '高雄市',
  // 縣
  '基隆市',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '屏東縣',
  '宜蘭縣',
  '花蓮縣',
  '台東縣',
  // 外島
  '澎湖縣',
  '金門縣',
  '連江縣',
]

// 經驗選項
const experienceOptions = [
  { label: '不限', value: 'all' },
  { label: '1-3年', value: '1-3' },
  { label: '3-5年', value: '3-5' },
  { label: '5-10年', value: '5-10' },
  { label: '10年以上', value: '10+' },
]

// 技能選項
const skillOptions = [
  '長期照護',
  '失智照護',
  '重症照護',
  '復健協助',
  '居家照護',
  '醫院看護',
  '老人照護',
  '陪伴服務',
]

// 篩選條件
const filters = ref({
  location: null,
  minPrice: null,
  maxPrice: null,
  minRating: 0,
  experience: 'all',
  skills: [],
  availableOnly: false,
})

// 計算屬性
const filteredCaregivers = computed(() => {
  let result = [...caregivers.value]

  // 搜尋
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.specialties.some(s => s.toLowerCase().includes(query))
    )
  }

  // 快速篩選
  if (activeQuickFilter.value === 'available') {
    result = result.filter(c => c.is_available)
  } else if (activeQuickFilter.value === 'highRating') {
    result = result.filter(c => c.rating >= 4.5)
  } else if (activeQuickFilter.value === 'experienced') {
    result = result.filter(c => c.experience_years >= 5)
  }

  // 套用篩選條件
  if (filters.value.location) {
    result = result.filter(c => c.service_areas.includes(filters.value.location))
  }
  if (filters.value.minPrice) {
    result = result.filter(c => c.hourly_rate >= filters.value.minPrice)
  }
  if (filters.value.maxPrice) {
    result = result.filter(c => c.hourly_rate <= filters.value.maxPrice)
  }
  if (filters.value.minRating > 0) {
    result = result.filter(c => c.rating >= filters.value.minRating)
  }
  if (filters.value.availableOnly) {
    result = result.filter(c => c.is_available)
  }

  // 排序
  if (sortBy.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'price_asc') {
    result.sort((a, b) => a.hourly_rate - b.hourly_rate)
  } else if (sortBy.value === 'price_desc') {
    result.sort((a, b) => b.hourly_rate - a.hourly_rate)
  } else if (sortBy.value === 'experience') {
    result.sort((a, b) => b.experience_years - a.experience_years)
  }

  return result
})

const paginatedCaregivers = computed(() => {
  const start = 0
  const end = currentPage.value * pageSize
  return filteredCaregivers.value.slice(start, end)
})

const hasMore = computed(() => {
  return paginatedCaregivers.value.length < filteredCaregivers.value.length
})

const activeFilterCount = computed(() => {
  let count = 0
  if (filters.value.location) count++
  if (filters.value.minPrice || filters.value.maxPrice) count++
  if (filters.value.minRating > 0) count++
  if (filters.value.experience !== 'all') count++
  if (filters.value.skills.length > 0) count++
  if (filters.value.availableOnly) count++
  return count
})

// 方法
const handleSearch = () => {
  currentPage.value = 1
}

const toggleQuickFilter = (key: string) => {
  if (activeQuickFilter.value === key) {
    activeQuickFilter.value = ''
  } else {
    activeQuickFilter.value = key
  }
  currentPage.value = 1
}

const setSortBy = (value: string) => {
  sortBy.value = value
  currentPage.value = 1
}

const applyFilters = () => {
  showFilterDrawer.value = false
  currentPage.value = 1
}

const clearFilters = () => {
  filters.value = {
    location: null,
    minPrice: null,
    maxPrice: null,
    minRating: 0,
    experience: 'all',
    skills: [],
    availableOnly: false,
  }
}

const clearAllFilters = () => {
  searchQuery.value = ''
  activeQuickFilter.value = ''
  sortBy.value = 'default'
  clearFilters()
  currentPage.value = 1
}

const loadMore = () => {
  currentPage.value++
}

const navigateToDetail = (caregiver: any) => {
  router.push(`/caregivers/${caregiver.id}`)
}


// 生命週期
onMounted(() => {
  // 載入資料
})
</script>

<style scoped>
.caregivers-page {
  background: #f5f7fa;
  min-height: 100vh;
}

/* 搜尋區域 */
.search-header {
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-container {
  padding: 12px;
}

.search-input {
  background: #f5f7fa;
}

.search-input :deep(.q-field__control) {
  border-radius: 12px;
}

/* 快速篩選 */
.quick-filters {
  border-top: 1px solid #f0f0f0;
  padding: 8px 0;
}

/* 篩選欄 */
.filter-bar {
  background: white;
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
}

/* 載入狀態 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

/* 空狀態 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 32px;
}

/* 看護師卡片 */
.cards-container {
  padding: 12px;
}

.caregiver-card {
  margin-bottom: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;
}

.caregiver-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.info-tags,
.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.price-info {
  min-width: 60px;
}

/* 載入更多 */
.load-more {
  padding: 16px;
}

/* 排序選單 */
.sort-menu {
  border-radius: 12px 12px 0 0;
  max-height: 50vh;
}

/* 篩選側邊欄 */
.filter-drawer {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.filter-content {
  flex: 1;
  padding: 16px;
}

.filter-section {
  margin-bottom: 24px;
}

.filter-title {
  font-weight: 600;
  margin-bottom: 12px;
  color: #2c3e50;
}

.price-range {
  display: flex;
  align-items: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.filter-footer {
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

/* 響應式調整 */
@media (min-width: 768px) {
  .cards-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .load-more {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1024px) {
  .cards-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 動畫 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.caregiver-card {
  animation: fadeIn 0.3s ease-out;
}
</style>