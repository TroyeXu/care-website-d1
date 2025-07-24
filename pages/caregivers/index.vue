<template>
  <q-page class="q-pa-md">
    <div class="page-header q-mb-lg">
      <h1 class="text-h4 text-primary q-mb-sm">
        <q-icon name="medical_services" class="q-mr-sm" />
        專業看護師
      </h1>
      <p class="text-body1 text-grey-7">
        瀏覽所有專業看護員，找到最合適的人選
      </p>
    </div>

    <!-- 載入狀態 -->
    <div v-if="loading" class="text-center q-pa-lg">
      <q-spinner-dots size="3rem" color="primary" />
      <div class="q-mt-md text-grey-6">載入看護師資料中...</div>
    </div>

    <!-- 看護師列表 -->
    <div v-else-if="caregivers.length > 0" class="caregiver-list">
      <CaregiverCard v-for="c in caregivers" :key="c.id" :caregiver="c" />
    </div>

    <!-- 空狀態 -->
    <div v-else class="empty-state text-center q-pa-xl">
      <q-icon name="search_off" size="4rem" color="grey-4" class="q-mb-md" />
      <div class="text-h6 text-grey-6 q-mb-sm">目前沒有可用的看護師</div>
      <div class="text-body2 text-grey-5">請稍後再試或聯絡客服</div>
    </div>

    <!-- 錯誤狀態 -->
    <q-banner v-if="error" class="bg-red-1 text-red-8 q-mt-md">
      <div class="text-weight-bold">載入失敗</div>
      <div class="text-caption">{{ error }}</div>
      <template v-slot:action>
        <q-btn flat color="red" @click="loadCaregivers">重試</q-btn>
      </template>
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApiService } from '~/composables/useApiService'
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('看護列表 - 護理服務平台', '瀏覽所有專業看護員，找到最合適的人選')

// 組合式函數
const apiService = useApiService()

// 響應式資料
const caregivers = ref([])
const loading = ref(false)
const error = ref('')

// 載入看護師資料
const loadCaregivers = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await apiService.getCaregivers(1, 50) // 載入前50位看護師
    caregivers.value = response.data?.data || response.data || response
  } catch (err: any) {
    error.value = err.message || '載入看護師資料失敗'
    console.error('載入看護師失敗:', err)
  } finally {
    loading.value = false
  }
}

// 頁面載入時執行
onMounted(() => {
  loadCaregivers()
})
</script>

<style scoped>
.caregiver-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
