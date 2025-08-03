<script setup lang="ts">
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('錯誤 - DogFriend', '發生錯誤時的說明頁面')
const props = defineProps({
  error: Object,
})

// 提供清除錯誤的功能，返回上一頁或首頁
const handleError = () => {
  clearError({ redirect: props.error?.statusCode === 404 ? '/' : '' })
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-900"
  >
    <div
      class="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center"
    >
      <h1 class="text-5xl font-bold text-red-600 dark:text-red-400 mb-4">
        {{ error?.statusCode || '錯誤' }}
      </h1>

      <h2 class="text-xl text-gray-800 dark:text-gray-200 mt-2 mb-6">
        {{ error?.statusMessage || '發生未知錯誤' }}
      </h2>

      <p
        v-if="error?.statusCode === 404"
        class="text-gray-600 dark:text-gray-400 mb-8"
      >
        您要尋找的頁面可能已被移除、名稱變更或暫時無法使用。
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          @click="handleError"
        >
          {{ error?.statusCode === 404 ? '返回首頁' : '重試' }}
        </button>

        <button
          v-if="error?.statusCode !== 404"
          class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          @click="() => { if (typeof window !== 'undefined') window.history.back() }"
        >
          返回上一頁
        </button>
      </div>
    </div>
  </div>
</template>
