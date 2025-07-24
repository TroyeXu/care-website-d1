<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card
      flat
      bordered
      class="info-card"
      style="max-width: 700px; width: 100%"
    >
      <q-card-section>
        <div class="text-h5 q-mb-sm">關於我們</div>
        <p>
          DogFriend 成立於 2023 年，致力於打造專業又友善的照護媒合平台。
          我們秉持「以人為本」的心態，為家庭與照護人員提供最適宜的解決方案。
        </p>
      </q-card-section>
      <q-separator />

      <q-card-section>
        <div class="text-h6 q-mb-sm">願景與使命</div>
        <q-list bordered dense>
          <q-item v-for="m in missions" :key="m.title">
            <q-item-section avatar>
              <q-icon :name="m.icon" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ m.title }}</q-item-label>
              <q-item-label caption>{{ m.desc }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-h6 q-mb-sm">專業團隊</div>
        <p>
          我們的團隊由資深護理師、居家照護專家與人資顧問等專業人士組成，
          為你提供 24 小時的指導與諮詢。
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" to="/" label="回首頁" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'
import { useRuntimeConfig, useRoute, useHead } from '#imports'

usePageSeo(
  '關於我們 - DogFriend 專業看護媒合平台',
  '認識 DogFriend 團隊與我們的使命',
)

const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: '關於我們 - DogFriend',
        url: baseUrl + route.fullPath,
        description: '認識 DogFriend 團隊與我們的使命',
      }),
    },
  ],
})
const missions = [
  {
    title: '以人為本',
    desc: '以使用者需求為首要考量',
    icon: 'emoji_people',
  },
  {
    title: '專業可信',
    desc: '嚴格審核照護質量',
    icon: 'verified_user',
  },
  {
    title: '創新便利',
    desc: '使用科技提升媒合效率',
    icon: 'lightbulb',
  },
]
</script>
