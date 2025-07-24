<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6 q-mb-md">知識分享與常見問題</div>
        <q-card
          v-for="(post, i) in sortedPosts"
          :key="i"
          flat
          bordered
          class="q-mb-sm"
        >
          <q-card-section>
            <div class="text-subtitle1">{{ post.title }}</div>
            <div class="text-caption text-grey">
              {{ formatDate(post.date) }}
            </div>
            <p class="q-mt-sm">{{ post.excerpt }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              color="primary"
              :to="`/blog/${post.slug}`"
              label="閱讀更多"
            />
          </q-card-actions>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('部落格 - DogFriend', '知識分享與常見問題')

const posts = [
  {
    title: '如何選擇看護',
    slug: 'how-to-choose-caregiver',
    date: '2024-05-10',
    excerpt: '教你從需求到媒合的注意事項',
  },
  {
    title: '照護常見QA',
    slug: 'caregiving-faq',
    date: '2024-05-05',
    excerpt: '彙整雇主最關心的問題',
  },
]

const sortedPosts = computed(() =>
  posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
)

function formatDate(d) {
  return new Date(d).toLocaleDateString('zh-TW')
}
</script>

<style scoped></style>
