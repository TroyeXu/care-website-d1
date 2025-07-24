<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">價格資訊</div>
        <q-table
          :rows="plans"
          :columns="columns"
          flat
          bordered
          class="q-mt-md"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'
import { useHead, useRuntimeConfig, useRoute } from '#imports'

usePageSeo('計費方案 - DogFriend', '查看各種護理服務的價格與方案')
const columns = [
  { name: 'type', label: '方案', field: 'type' },
  { name: 'price', label: '價格', field: 'price' },
  { name: 'desc', label: '內容', field: 'desc' },
]

const plans = [
  { type: '按時付費', price: 'NT$300/時', desc: '彈性選擇看護時數' },
  { type: '包班制', price: 'NT$6000/天', desc: '全天候專業照護' },
]

const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: '計費方案 - DogFriend',
        url: baseUrl + route.fullPath,
        itemListElement: plans.map((p) => ({
          '@type': 'Offer',
          price: p.price.replace('NT$', ''),
          priceCurrency: 'TWD',
          itemOffered: {
            '@type': 'Service',
            name: p.type,
            description: p.desc,
          },
        })),
      }),
    },
  ],
})
</script>
