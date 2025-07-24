<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">響應式設計測試</div>
    
    <!-- 當前螢幕尺寸資訊 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">螢幕資訊</div>
        <div class="row q-gutter-md">
          <div class="col-12 col-sm-6 col-md-3">
            <q-chip :color="$q.screen.xs ? 'primary' : 'grey'" text-color="white">
              XS (< 600px): {{ $q.screen.xs }}
            </q-chip>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-chip :color="$q.screen.sm ? 'primary' : 'grey'" text-color="white">
              SM (600-1023px): {{ $q.screen.sm }}
            </q-chip>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-chip :color="$q.screen.md ? 'primary' : 'grey'" text-color="white">
              MD (1024-1439px): {{ $q.screen.md }}
            </q-chip>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-chip :color="$q.screen.lg ? 'primary' : 'grey'" text-color="white">
              LG (1440-1919px): {{ $q.screen.lg }}
            </q-chip>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-chip :color="$q.screen.xl ? 'primary' : 'grey'" text-color="white">
              XL (≥ 1920px): {{ $q.screen.xl }}
            </q-chip>
          </div>
        </div>
        <div class="q-mt-md">
          <p>視窗寬度: {{ windowWidth }}px</p>
          <p>視窗高度: {{ windowHeight }}px</p>
        </div>
      </q-card-section>
    </q-card>

    <!-- Header 測試 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">Header 測試</div>
        <p>檢查 Header 在不同螢幕尺寸下的表現：</p>
        <ul>
          <li>手機版：應顯示漢堡選單圖標</li>
          <li>平板/桌面版：應顯示返回按鈕</li>
          <li>標題應居中顯示</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- Footer 快速選單測試 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">Footer 快速選單測試</div>
        <p>底部導航應在所有設備上都可見：</p>
        <ul>
          <li>4個主要功能按鈕：首頁、看護師、預約、我的</li>
          <li>圖標和文字應清晰可見</li>
          <li>點擊應有反饋效果</li>
          <li>在手機上應固定在底部</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 側邊抽屜選單測試 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">側邊抽屜選單測試</div>
        <q-btn color="primary" @click="testDrawer">
          開啟側邊選單
        </q-btn>
        <div class="q-mt-md">
          <p>測試要點：</p>
          <ul>
            <li>選單應從左側滑出</li>
            <li>在手機上應覆蓋整個螢幕</li>
            <li>在平板/桌面上可以同時顯示內容</li>
            <li>應包含用戶資訊區塊</li>
            <li>選單項目應分類清晰</li>
          </ul>
        </div>
      </q-card-section>
    </q-card>

    <!-- 響應式網格測試 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">響應式網格系統測試</div>
        <div class="row q-gutter-md">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="i in 8" :key="i">
            <q-card flat bordered>
              <q-card-section class="text-center">
                <div class="text-h6">項目 {{ i }}</div>
                <p>這是一個響應式網格項目</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 表單響應式測試 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">表單響應式測試</div>
        <q-form class="row q-gutter-md">
          <q-input
            v-model="formData.name"
            label="姓名"
            outlined
            dense
            class="col-12 col-sm-6"
          />
          <q-input
            v-model="formData.email"
            label="電子郵件"
            outlined
            dense
            class="col-12 col-sm-6"
          />
          <q-input
            v-model="formData.phone"
            label="電話"
            outlined
            dense
            class="col-12 col-sm-6"
          />
          <q-select
            v-model="formData.service"
            label="服務類型"
            :options="['日間照護', '夜間照護', '24小時照護']"
            outlined
            dense
            class="col-12 col-sm-6"
          />
          <q-input
            v-model="formData.message"
            label="留言"
            type="textarea"
            outlined
            dense
            rows="3"
            class="col-12"
          />
        </q-form>
      </q-card-section>
    </q-card>

    <!-- 卡片響應式測試 -->
    <q-card>
      <q-card-section>
        <div class="text-h6 q-mb-md">卡片響應式測試</div>
        <div class="row q-gutter-md">
          <div class="col-12 col-md-6 col-lg-4" v-for="i in 3" :key="i">
            <q-card>
              <q-img
                src="https://placehold.co/400x200"
                :ratio="16/9"
              />
              <q-card-section>
                <div class="text-h6">看護師 {{ i }}</div>
                <div class="text-subtitle2">5年經驗 | 專業護理</div>
              </q-card-section>
              <q-card-section>
                <p>專業的護理服務，照顧您的家人如同自己的家人。</p>
              </q-card-section>
              <q-card-actions>
                <q-btn flat color="primary">查看詳情</q-btn>
                <q-btn flat color="secondary">立即預約</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const windowWidth = ref(0)
const windowHeight = ref(0)
const formData = ref({
  name: '',
  email: '',
  phone: '',
  service: null,
  message: ''
})

const updateWindowSize = () => {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
}

const testDrawer = () => {
  // 觸發父組件的抽屜開關
  const event = new CustomEvent('toggle-drawer')
  window.dispatchEvent(event)
}

onMounted(() => {
  updateWindowSize()
  window.addEventListener('resize', updateWindowSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize)
})
</script>

<style scoped>
.q-card {
  transition: all 0.3s ease;
}

.q-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

@media (max-width: 599px) {
  .text-h4 {
    font-size: 1.5rem;
  }
  
  .text-h6 {
    font-size: 1.125rem;
  }
}
</style>