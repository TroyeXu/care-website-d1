<template>
  <div class="api-mode-toggle q-pa-md">
    <q-card class="bg-grey-1">
      <q-card-section>
        <div class="text-h6 q-mb-md">
          <q-icon name="settings" class="q-mr-sm" />
          API 模式設定
        </div>
        
        <div class="q-mb-md">
          <q-toggle
            v-model="isUsingMockApi"
            :label="isUsingMockApi ? 'Mock API 模式' : '真實 API 模式'"
            :color="isUsingMockApi ? 'orange' : 'green'"
            @update:model-value="handleToggle"
          />
        </div>
        
        <div class="text-body2 text-grey-7 q-mb-md">
          <div v-if="isUsingMockApi" class="text-orange">
            <q-icon name="science" class="q-mr-xs" />
            目前使用模擬 API，所有資料都是測試資料
          </div>
          <div v-else class="text-green">
            <q-icon name="cloud" class="q-mr-xs" />
            目前使用真實 API，連接到 Supabase 後端
          </div>
        </div>
        
        <div class="row q-gutter-sm">
          <q-btn
            size="sm"
            outline
            color="orange"
            icon="science"
            label="Mock API"
            @click="switchToMock"
            :class="{ 'bg-orange-1': isUsingMockApi }"
          />
          <q-btn
            size="sm"
            outline
            color="green"
            icon="cloud"
            label="真實 API"
            @click="switchToReal"
            :class="{ 'bg-green-1': !isUsingMockApi }"
          />
          <q-btn
            size="sm"
            outline
            color="blue"
            icon="refresh"
            label="重設"
            @click="resetConfig"
          />
        </div>
        
        <q-separator class="q-my-md" />
        
        <div class="text-caption text-grey-6">
          <div><strong>配置資訊：</strong></div>
          <div>環境：{{ isProduction ? '生產' : '開發' }}</div>
          <div>API 端點：{{ config.baseUrl }}</div>
          <div>超時時間：{{ config.timeout }}ms</div>
          <div>重試次數：{{ config.retryCount }}</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { 
  config, 
  isUsingMockApi, 
  isProduction,
  switchToMockApi, 
  switchToRealApi, 
  resetToDefaults,
  smartApiSelection
} = useApiConfig()

const handleToggle = async (value: boolean) => {
  if (value) {
    switchToMockApi()
  } else {
    await smartApiSelection()
    if (isUsingMockApi.value) {
      // 如果智能選擇後還是 Mock API，說明真實 API 不可用
      $q.notify({
        type: 'warning',
        message: '真實 API 不可用，已自動保持 Mock API 模式',
        timeout: 3000
      })
    } else {
      switchToRealApi()
    }
  }
}

const switchToMock = () => {
  switchToMockApi()
  $q.notify({
    type: 'info',
    message: '已切換到 Mock API 模式',
    icon: 'science',
    timeout: 2000
  })
}

const switchToReal = async () => {
  await smartApiSelection()
  if (!isUsingMockApi.value) {
    $q.notify({
      type: 'positive',
      message: '已切換到真實 API 模式',
      icon: 'cloud',
      timeout: 2000
    })
  } else {
    $q.notify({
      type: 'warning',
      message: '真實 API 不可用，維持 Mock API 模式',
      icon: 'warning',
      timeout: 3000
    })
  }
}

const resetConfig = () => {
  resetToDefaults()
  $q.notify({
    type: 'info',
    message: '配置已重設為預設值',
    icon: 'refresh',
    timeout: 2000
  })
}
</script>

<style scoped>
.api-mode-toggle {
  max-width: 400px;
}
</style>