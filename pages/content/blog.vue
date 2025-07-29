<template>
  <q-page class="blog-page">
    <div class="blog-container q-pa-lg">
      <!-- 頁面標題區塊 -->
      <div class="page-header text-center q-mb-xl">
        <h1 class="text-h3 text-weight-bold q-mb-md text-primary">
          知識分享與常見問題
        </h1>
        <p class="text-subtitle1 text-grey-7 max-width-600 q-mx-auto">
          分享實用的照護知識，解答您的疑問
        </p>
      </div>

      <!-- 文章列表 -->
      <div class="posts-grid">
        <q-card
          v-for="(post, i) in sortedPosts"
          :key="i"
          class="post-card q-hoverable"
          flat
        >
          <q-card-section class="post-content">
            <div class="post-meta q-mb-md">
              <q-chip
                size="sm"
                color="primary"
                text-color="white"
                icon="schedule"
                :label="formatDate(post.date)"
              />
            </div>
            
            <h2 class="post-title text-h6 text-weight-medium q-mb-sm">
              {{ post.title }}
            </h2>
            
            <p class="post-excerpt text-body2 text-grey-7 q-mb-lg">
              {{ post.excerpt }}
            </p>
          </q-card-section>

          <q-card-actions class="post-actions q-pa-md">
            <q-btn
              :to="`/blog/${post.slug}`"
              color="primary"
              unelevated
              no-caps
              class="full-width read-more-btn"
            >
              <q-icon name="article" class="q-mr-sm" />
              閱讀完整文章
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <!-- 空狀態 -->
      <div v-if="sortedPosts.length === 0" class="empty-state text-center q-py-xl">
        <q-icon name="article" size="4rem" color="grey-4" class="q-mb-md" />
        <h3 class="text-h6 text-grey-6 q-mb-sm">尚無文章</h3>
        <p class="text-body2 text-grey-5">敬請期待更多精彩內容</p>
      </div>
    </div>
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

<style scoped>
.blog-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.blog-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  padding: 2rem 0;
}

.max-width-600 {
  max-width: 600px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.post-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.post-content {
  flex: 1;
  padding: 1.5rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.post-title {
  color: #2c3e50;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.post-card:hover .post-title {
  color: var(--q-primary);
}

.post-excerpt {
  line-height: 1.6;
}

.post-actions {
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.read-more-btn {
  border-radius: 8px;
  font-weight: 500;
  padding: 12px 24px;
  transition: all 0.2s ease;
}

.read-more-btn:hover {
  transform: translateY(-1px);
}

.empty-state {
  background: white;
  border-radius: 16px;
  padding: 4rem 2rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .blog-container {
    padding: 1rem;
  }
  
  .page-header {
    padding: 1rem 0;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .post-content {
    padding: 1rem;
  }
  
  .post-actions {
    padding: 1rem;
  }
}
</style>
