<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">安全措施</div>
        <q-list bordered class="rounded-borders q-mt-md">
          <q-expansion-item
            v-for="(s, i) in safeties"
            :key="i"
            :label="s.title"
          >
            {{ s.desc }}
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('安全措施 - DogFriend', '瞭解我們對看護與客戶的安全保障')
const safeties = [
  { title: '完整背景調查', desc: '所有看護員皆通過身份與犯罪紀錄查核' },
  { title: '定期教育訓練', desc: '持續進修並更新照護技巧' },
  { title: '24小時客服支援', desc: '任何突發狀況皆可即時聯繫我們' },
  { title: '嚴格健康監測', desc: '人員須定期健康檢查，確保服務品質' },
  { title: '保密個資管理', desc: '遵守個人資料保護法，提供完善資訊安全' },
]
</script>
