<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">服務介紹</div>
      </q-card-section>
      <q-separator />
      <q-list bordered>
        <q-expansion-item icon="home" label="居家照顧" class="q-px-sm">
          <div class="q-pa-sm">提供到府日常照料與生活協助。</div>
        </q-expansion-item>
        <q-expansion-item
          icon="local_hospital"
          label="醫院看護"
          class="q-px-sm"
        >
          <div class="q-pa-sm">協助住院期間的照護需求。</div>
        </q-expansion-item>
        <q-expansion-item icon="translate" label="外籍看護" class="q-px-sm">
          <div class="q-pa-sm">多語溝通、跨文化照護。</div>
        </q-expansion-item>
      </q-list>
      <q-card-actions align="right">
        <q-btn flat color="primary" to="/contact" label="聯繫我們" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRuntimeConfig, useRoute, useHead } from '#imports'
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('服務介紹 - DogFriend', '瞭解居家與醫院看護等多元服務項目')

const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            serviceType: '居家照顧',
            description: '提供到府日常照料與生活協助',
            provider: { '@type': 'Organization', name: 'DogFriend', url: baseUrl },
            areaServed: 'Taiwan',
          },
          {
            '@type': 'Service',
            serviceType: '醫院看護',
            description: '協助住院期間的照護需求',
            provider: { '@type': 'Organization', name: 'DogFriend', url: baseUrl },
            areaServed: 'Taiwan',
          },
          {
            '@type': 'Service',
            serviceType: '外籍看護',
            description: '多語溝通、跨文化照護',
            provider: { '@type': 'Organization', name: 'DogFriend', url: baseUrl },
            areaServed: 'Taiwan',
          },
        ],
      }),
    },
  ],
})
</script>
