<template>
  <q-page class="q-pa-md">
    <div class="row justify-between items-center q-mb-lg">
      <div class="text-h5 text-primary">
        <q-icon name="search" size="md" class="q-mr-sm" />
        搜尋看護師
      </div>
      <div class="text-caption text-grey-6">
        共找到 {{ searchResults.length }} 位看護師
      </div>
    </div>
    
    <!-- 搜尋輸入框 -->
    <div class="row q-gutter-md q-mb-lg">
      <div class="col-12 col-md-8">
        <q-input
          v-model="searchQuery"
          label="搜尋看護師 (姓名、技能、地區、證照)"
          outlined
          dense
          clearable
          :loading="isSearching"
          @input="performSearch"
          @keyup.enter="performSearch"
          placeholder="例如：林護理師、復健、台北、護理師證照"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-btn
              flat
              dense
              icon="tune"
              @click="showAdvancedFilters = !showAdvancedFilters"
              :color="hasActiveFilters ? 'primary' : 'grey'"
            >
              <q-tooltip>進階篩選</q-tooltip>
            </q-btn>
          </template>
        </q-input>
      </div>
      <div class="col-12 col-md-4">
        <q-btn
          color="primary"
          icon="search"
          :loading="isSearching"
          @click="performSearch"
          class="full-width"
        >
          搜尋
        </q-btn>
      </div>
    </div>
    
    <!-- 進階篩選 -->
    <q-slide-transition>
      <q-card v-show="showAdvancedFilters" flat bordered class="q-mb-lg">
        <q-card-section>
          <div class="text-h6 q-mb-md">進階篩選</div>
          <div class="row q-gutter-md">
            <div class="col-12 col-sm-6 col-md-3">
              <q-select
                v-model="filters.location"
                :options="locationOptions"
                label="服務地區"
                outlined
                dense
                clearable
                emit-value
                map-options
              />
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <q-input
                v-model.number="filters.minRating"
                type="number"
                label="最低評分"
                outlined
                dense
                min="1"
                max="5"
                step="0.1"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <q-input
                v-model.number="filters.maxHourlyRate"
                type="number"
                label="最高時薪"
                outlined
                dense
                min="0"
                suffix="元/小時"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <q-input
                v-model.number="filters.maxShiftRate"
                type="number"
                label="最高班薪"
                outlined
                dense
                min="0"
                suffix="元/班"
              />
            </div>
          </div>
          <div class="row q-gutter-md q-mt-md">
            <div class="col-12">
              <q-select
                v-model="filters.skills"
                :options="skillOptions"
                label="專業技能"
                outlined
                dense
                multiple
                use-chips
                clearable
              />
            </div>
          </div>
          <div class="row q-gutter-md q-mt-md">
            <div class="col">
              <q-btn
                flat
                color="grey"
                @click="clearFilters"
              >
                清除篩選
              </q-btn>
            </div>
            <div class="col-auto">
              <q-btn
                color="primary"
                @click="applyFilters"
              >
                套用篩選
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-slide-transition>
    
    <!-- 搜尋結果 -->
    <div v-if="isSearching" class="text-center q-pa-lg">
      <q-spinner-dots size="50px" color="primary" />
      <div class="text-body2 q-mt-md">搜尋中...</div>
    </div>
    
    <div v-else-if="searchResults.length === 0 && hasSearched" class="text-center q-pa-lg">
      <q-icon name="search_off" size="80px" color="grey-5" />
      <div class="text-h6 q-mt-md text-grey-7">沒有找到符合條件的看護師</div>
      <div class="text-body2 text-grey-6 q-mt-sm">
        請嘗試調整搜尋關鍵字或篩選條件
      </div>
      <q-btn
        flat
        color="primary"
        @click="clearSearch"
        class="q-mt-md"
      >
        清除搜尋
      </q-btn>
    </div>
    
    <div v-else-if="searchResults.length > 0" class="caregiver-list">
      <CaregiverCard
        v-for="caregiver in searchResults"
        :key="caregiver.id"
        :caregiver="caregiver"
        @click="navigateTo(`/caregivers/${caregiver.id}`)"
      />
    </div>
    
    <!-- 預設推薦 -->
    <div v-else>
      <div class="text-h6 q-mb-md text-grey-7">推薦看護師</div>
      <div class="caregiver-list">
        <CaregiverCard
          v-for="caregiver in recommendedCaregivers"
          :key="caregiver.id"
          :caregiver="caregiver"
          @click="navigateTo(`/caregivers/${caregiver.id}`)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useApiService } from '~/composables/useApiService'
import usePageSeo from '~/composables/usePageSeo'
import CaregiverCard from '~/components/CaregiverCard.vue'
import type { Caregiver } from '~/utils/mockData'

// SEO
usePageSeo('搜尋看護師 - 護理服務平台', '快速搜尋專業看護師，找到最適合的照護服務')

// 組合式函數
const $q = useQuasar()
const apiService = useApiService()

// 響應式資料
const searchQuery = ref('')
const searchResults = ref<Caregiver[]>([])
const recommendedCaregivers = ref<Caregiver[]>([])
const isSearching = ref(false)
const hasSearched = ref(false)
const showAdvancedFilters = ref(false)

// 篩選條件
const filters = ref({
  location: '',
  minRating: null as number | null,
  maxHourlyRate: null as number | null,
  maxShiftRate: null as number | null,
  skills: [] as string[]
})

// 選項資料
const locationOptions = [
  { label: '台北市', value: '台北' },
  { label: '新北市', value: '新北' },
  { label: '桃園市', value: '桃園' },
  { label: '台中市', value: '台中' },
  { label: '台南市', value: '台南' },
  { label: '高雄市', value: '高雄' }
]

const skillOptions = [
  '專業照護',
  '失智症照護',
  '復健協助',
  '夜間照護',
  '用藥管理',
  '營養調理',
  '心理支持',
  '物理治療',
  '語言治療',
  '職能治療'
]

// 計算屬性
const hasActiveFilters = computed(() => {
  return filters.value.location ||
         filters.value.minRating !== null ||
         filters.value.maxHourlyRate !== null ||
         filters.value.maxShiftRate !== null ||
         filters.value.skills.length > 0
})

// 方法
const performSearch = async () => {
  if (!searchQuery.value.trim() && !hasActiveFilters.value) {
    searchResults.value = []
    hasSearched.value = false
    return
  }
  
  isSearching.value = true
  hasSearched.value = true
  
  try {
    let results: Caregiver[] = []
    
    if (searchQuery.value.trim()) {
      // 執行文字搜尋
      results = await apiService.searchCaregivers(searchQuery.value.trim())
    } else {
      // 僅使用篩選條件
      const allCaregivers = await apiService.getCaregivers(1, 100)
      results = Array.isArray(allCaregivers) ? allCaregivers : allCaregivers.data || []
    }
    
    // 套用進階篩選
    if (hasActiveFilters.value) {
      results = await apiService.filterCaregivers({
        ...filters.value,
        // 將 null 值過濾掉
        ...(filters.value.minRating && { minRating: filters.value.minRating }),
        ...(filters.value.maxHourlyRate && { maxHourlyRate: filters.value.maxHourlyRate }),
        ...(filters.value.maxShiftRate && { maxShiftRate: filters.value.maxShiftRate })
      })
    }
    
    searchResults.value = Array.isArray(results) ? results : []
    
    // 顯示搜尋結果通知
    if (searchResults.value.length === 0) {
      $q.notify({
        type: 'info',
        message: '沒有找到符合條件的看護師，請嘗試調整搜尋條件',
        timeout: 3000
      })
    } else {
      $q.notify({
        type: 'positive',
        message: `找到 ${searchResults.value.length} 位符合條件的看護師`,
        timeout: 2000
      })
    }
    
  } catch (error: any) {
    console.error('搜尋失敗:', error)
    $q.notify({
      type: 'negative',
      message: error.message || '搜尋失敗，請稍後再試',
      timeout: 3000
    })
  } finally {
    isSearching.value = false
  }
}

const applyFilters = () => {
  performSearch()
  showAdvancedFilters.value = false
}

const clearFilters = () => {
  filters.value = {
    location: '',
    minRating: null,
    maxHourlyRate: null,
    maxShiftRate: null,
    skills: []
  }
  performSearch()
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  hasSearched.value = false
  clearFilters()
}

// 載入推薦看護師
const loadRecommendedCaregivers = async () => {
  try {
    const result = await apiService.getFeaturedCaregivers()
    recommendedCaregivers.value = Array.isArray(result) ? result : result.data || []
  } catch (error) {
    console.error('載入推薦看護師失敗:', error)
  }
}

// 生命週期
onMounted(() => {
  loadRecommendedCaregivers()
})

// 頁面結構化資料
const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SearchResultsPage',
        name: '搜尋看護師 - 護理服務平台',
        url: baseUrl + (route?.fullPath || '/caregivers/search'),
        description: '快速搜尋專業看護師，找到最適合的照護服務',
        provider: {
          '@type': 'Organization',
          name: '護理服務平台'
        }
      })
    }
  ]
})
</script>

<style scoped>
.caregiver-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
