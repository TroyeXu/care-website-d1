<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">照護資源與常見問題</div>
        <div class="q-mt-md text-subtitle2">文章</div>
        <q-input
          v-model="articleQuery"
          label="搜尋文章"
          outlined
          dense
          class="q-mb-md"
        />
        <q-list bordered class="rounded-borders q-mb-lg">
          <q-item v-for="(a, i) in filteredArticles" :key="i">
            <q-item-section>{{ a }}</q-item-section>
          </q-item>
        </q-list>
        <div class="text-subtitle2">FAQ</div>
        <q-input
          v-model="faqQuery"
          label="搜尋FAQ"
          outlined
          dense
          class="q-mb-md"
        />
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            v-for="(q, i) in filteredFaqs"
            :key="i"
            :label="q.q"
          >
            {{ q.a }}
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('資源中心 - DogFriend', '提供各類照護資源與文件下載')
import { ref, computed } from 'vue'
import { useHead, useRuntimeConfig, useRoute } from '#imports'

const articles = [
  '如何選擇適合的看護員',
  '居家照護的注意事項',
  '照護資源補助申請流程',
]

const faqs = [
  { q: '如何預約看護？', a: '可透過搜尋後直接聯繫我們協助排程。' },
  { q: '是否提供試用？', a: '初次服務可享一次免費試用時段。' },
  { q: '收費模式為何？', a: '依照服務項目與時數計費。' },
]

const articleQuery = ref('')
const faqQuery = ref('')

const filteredArticles = computed(() => {
  if (!articleQuery.value) return articles
  return articles.filter((a) => a.includes(articleQuery.value))
})

const filteredFaqs = computed(() => {
  if (!faqQuery.value) return faqs
  return faqs.filter(
    (f) => f.q.includes(faqQuery.value) || f.a.includes(faqQuery.value),
  )
})

const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        name: '資源中心 - DogFriend',
        url: baseUrl + route.fullPath,
        description: '提供各類照護資源與文件下載',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }),
    },
  ],
})
</script>
