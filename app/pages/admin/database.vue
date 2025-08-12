<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">D1 資料庫管理介面</h1>
      
      <!-- 表格列表 -->
      <div class="bg-white rounded-lg shadow mb-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800">資料表格</h2>
        </div>
        <div class="p-6">
          <div v-if="loading" class="text-center py-4">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <div v-else-if="tables.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="table in tables" 
              :key="table.name"
              @click="selectTable(table)"
              class="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              :class="{ 'bg-blue-50 border-blue-500': selectedTable?.name === table.name }"
            >
              <div class="font-semibold text-gray-900">{{ table.name }}</div>
              <div class="text-sm text-gray-600 mt-1">{{ table.count }} 筆記錄</div>
              <div class="text-xs text-gray-500 mt-2">
                {{ table.columns.length }} 個欄位
              </div>
            </div>
          </div>
          <div v-else class="text-gray-500 text-center py-4">
            無法載入表格資訊
          </div>
        </div>
      </div>

      <!-- 查詢區域 -->
      <div class="bg-white rounded-lg shadow mb-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800">SQL 查詢</h2>
        </div>
        <div class="p-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              SQL 語句
            </label>
            <textarea
              v-model="sqlQuery"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="輸入 SQL 查詢語句..."
            ></textarea>
          </div>
          
          <div class="flex gap-2 mb-4">
            <button
              @click="executeQuery"
              :disabled="!sqlQuery || queryLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {{ queryLoading ? '執行中...' : '執行查詢' }}
            </button>
            
            <button
              @click="clearQuery"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              清除
            </button>
            
            <!-- 快速查詢按鈕 -->
            <div class="ml-auto flex gap-2">
              <button
                v-if="selectedTable"
                @click="quickQuery('select')"
                class="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
              >
                查詢 {{ selectedTable.name }}
              </button>
              <button
                v-if="selectedTable"
                @click="quickQuery('structure')"
                class="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
              >
                查看結構
              </button>
            </div>
          </div>

          <!-- 查詢結果 -->
          <div v-if="queryError" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div class="text-red-700">{{ queryError }}</div>
          </div>

          <div v-if="queryResult" class="border rounded-lg overflow-hidden">
            <div class="bg-gray-50 px-4 py-2 border-b">
              <span class="text-sm text-gray-600">
                {{ queryResult.type === 'query' ? `返回 ${queryResult.results?.length || 0} 筆記錄` : `影響 ${queryResult.changes || 0} 筆記錄` }}
                <span v-if="queryResult.duration" class="ml-2">
                  ({{ queryResult.duration }}ms)
                </span>
              </span>
            </div>
            
            <div v-if="queryResult.results && queryResult.results.length > 0" class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th 
                      v-for="key in Object.keys(queryResult.results[0])" 
                      :key="key"
                      class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {{ key }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(row, idx) in queryResult.results" :key="idx" class="hover:bg-gray-50">
                    <td 
                      v-for="key in Object.keys(row)" 
                      :key="key"
                      class="px-4 py-2 text-sm text-gray-900 whitespace-nowrap"
                    >
                      <span v-if="row[key] === null" class="text-gray-400 italic">NULL</span>
                      <span v-else-if="typeof row[key] === 'boolean'">
                        <span :class="row[key] ? 'text-green-600' : 'text-red-600'">
                          {{ row[key] ? '✓' : '✗' }}
                        </span>
                      </span>
                      <span v-else>{{ row[key] }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="p-4 text-gray-500 text-center">
              無查詢結果
            </div>
          </div>
        </div>
      </div>

      <!-- 表格結構詳情 -->
      <div v-if="selectedTable" class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ selectedTable.name }} 表格結構
          </h2>
        </div>
        <div class="p-6">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">欄位名稱</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">類型</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">必填</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">預設值</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">主鍵</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="column in selectedTable.columns" :key="column.name">
                <td class="px-4 py-2 text-sm font-medium text-gray-900">{{ column.name }}</td>
                <td class="px-4 py-2 text-sm text-gray-600">{{ column.type }}</td>
                <td class="px-4 py-2 text-sm">
                  <span :class="column.notnull ? 'text-green-600' : 'text-gray-400'">
                    {{ column.notnull ? '✓' : '-' }}
                  </span>
                </td>
                <td class="px-4 py-2 text-sm text-gray-600">
                  {{ column.default || '-' }}
                </td>
                <td class="px-4 py-2 text-sm">
                  <span v-if="column.primary_key" class="text-blue-600">✓</span>
                  <span v-else class="text-gray-400">-</span>
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

interface Table {
  name: string
  sql: string
  count: number
  columns: Array<{
    name: string
    type: string
    notnull: boolean
    default: any
    primary_key: boolean
  }>
}

const tables = ref<Table[]>([])
const loading = ref(false)
const selectedTable = ref<Table | null>(null)
const sqlQuery = ref('')
const queryLoading = ref(false)
const queryResult = ref<any>(null)
const queryError = ref('')

// 載入表格列表
const loadTables = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/admin/db-tables')
    if (response.success) {
      tables.value = response.tables
    }
  } catch (error: any) {
    console.error('Failed to load tables:', error)
  } finally {
    loading.value = false
  }
}

// 選擇表格
const selectTable = (table: Table) => {
  selectedTable.value = table
}

// 執行查詢
const executeQuery = async () => {
  if (!sqlQuery.value) return
  
  queryLoading.value = true
  queryError.value = ''
  queryResult.value = null
  
  try {
    const response = await $fetch('/api/admin/db-query', {
      method: 'POST',
      body: {
        query: sqlQuery.value,
        params: []
      }
    })
    
    if (response.success) {
      queryResult.value = response
    }
  } catch (error: any) {
    queryError.value = error.data?.statusMessage || error.message || '查詢失敗'
  } finally {
    queryLoading.value = false
  }
}

// 清除查詢
const clearQuery = () => {
  sqlQuery.value = ''
  queryResult.value = null
  queryError.value = ''
}

// 快速查詢
const quickQuery = (type: 'select' | 'structure') => {
  if (!selectedTable.value) return
  
  if (type === 'select') {
    sqlQuery.value = `SELECT * FROM ${selectedTable.value.name} LIMIT 20`
  } else {
    sqlQuery.value = `PRAGMA table_info(${selectedTable.value.name})`
  }
  
  executeQuery()
}

onMounted(() => {
  loadTables()
})
</script>