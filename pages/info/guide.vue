<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card q-mb-lg">
      <q-card-section>
        <div class="text-h6">如何開始使用</div>
        <p>透過簡單四個步驟即可媒合到專業看護。</p>
      </q-card-section>
    </q-card>

    <q-timeline color="primary">
      <q-timeline-entry
        v-for="(step, index) in steps"
        :key="index"
        :title="step.title"
        :subtitle="step.subtitle"
        :icon="step.icon"
      >
        {{ step.text }}
      </q-timeline-entry>
    </q-timeline>

    <div class="text-center q-mt-md">
      <q-btn color="primary" to="/auth/register" label="立即註冊" />
    </div>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('使用指南 - DogFriend', '一步步教你如何使用 DogFriend 平台')
const steps = [
  {
    title: '步驟一',
    subtitle: '註冊帳號',
    icon: 'person_add',
    text: '於平台註冊並填寫個人資料',
  },
  {
    title: '步驟二',
    subtitle: '搜尋看護',
    icon: 'search',
    text: '使用搜尋功能找到適合的人員',
  },
  {
    title: '步驟三',
    subtitle: '預約服務',
    icon: 'event',
    text: '聯繫我們確認排程',
  },
  {
    title: '步驟四',
    subtitle: '開始照護',
    icon: 'check_circle',
    text: '看護到府開始服務',
  },
]
</script>

<style scoped></style>
