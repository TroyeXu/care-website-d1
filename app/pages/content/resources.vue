<template>
  <q-page class="resources-page">
    <div class="resources-container q-pa-lg">
      <!-- 頁面標題區塊 -->
      <div class="page-header text-center q-mb-xl">
        <h1 class="text-h3 text-weight-bold q-mb-md text-primary">
          照護資源與常見問題
        </h1>
        <p class="text-subtitle1 text-grey-7 max-width-600 q-mx-auto">
          提供各類照護資源與文件下載，解答您的疑問
        </p>
      </div>

      <!-- 資源區塊 -->
      <div class="resources-sections">
        <!-- 文章資源區塊 -->
        <q-card class="resource-section q-mb-xl" flat>
          <q-card-section class="section-header">
            <div class="section-title">
              <q-icon name="article" class="q-mr-sm" size="2rem" color="primary" />
              <h2 class="text-h5 text-weight-medium">實用文章</h2>
            </div>
            <p class="text-body2 text-grey-7 q-mt-sm">
              精選照護相關文章，提供專業知識與實用技巧
            </p>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="articleQuery"
              label="搜尋文章內容"
              outlined
              dense
              class="search-input q-mb-lg"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <div class="articles-grid">
              <q-card
                v-for="(article, i) in filteredArticles"
                :key="i"
                class="article-card q-hoverable"
                flat
              >
                <q-card-section class="article-content">
                  <q-icon name="description" class="article-icon q-mb-sm" />
                  <h3 class="article-title text-subtitle1 text-weight-medium">
                    {{ article }}
                  </h3>
                </q-card-section>
                <q-card-actions>
                  <q-btn
                    flat
                    color="primary"
                    icon="visibility"
                    label="查看內容"
                    no-caps
                    size="sm"
                  />
                </q-card-actions>
              </q-card>
            </div>

            <div v-if="filteredArticles.length === 0" class="empty-state text-center q-py-lg">
              <q-icon name="search_off" size="3rem" color="grey-4" class="q-mb-md" />
              <p class="text-body2 text-grey-5">找不到相關文章</p>
            </div>
          </q-card-section>
        </q-card>

        <!-- FAQ 區塊 -->
        <q-card class="resource-section" flat>
          <q-card-section class="section-header">
            <div class="section-title">
              <q-icon name="help_outline" class="q-mr-sm" size="2rem" color="primary" />
              <h2 class="text-h5 text-weight-medium">常見問題</h2>
            </div>
            <p class="text-body2 text-grey-7 q-mt-sm">
              彙整使用者最關心的問題與詳細解答
            </p>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="faqQuery"
              label="搜尋問題或答案"
              outlined
              dense
              class="search-input q-mb-lg"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <div class="faq-list">
              <q-expansion-item
                v-for="(faq, i) in filteredFaqs"
                :key="i"
                class="faq-item q-mb-sm"
                :label="faq.q"
                icon="help_outline"
                header-class="faq-header"
              >
                <q-card class="faq-answer">
                  <q-card-section class="q-pa-lg">
                    <p class="text-body1">{{ faq.a }}</p>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>

            <div v-if="filteredFaqs.length === 0" class="empty-state text-center q-py-lg">
              <q-icon name="search_off" size="3rem" color="grey-4" class="q-mb-md" />
              <p class="text-body2 text-grey-5">找不到相關問題</p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
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
      innerHTML: JSON.stringify({
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
