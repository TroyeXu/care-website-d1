<template>
  <div class="caregiver-card" @click="$emit('select', caregiver)">
    <div class="card-header">
      <div class="avatar-section">
        <img
          :src="caregiver.photo"
          :alt="caregiver.name"
          class="avatar"
          @error="handleImageError"
        />
        <div class="availability-badge" :class="availabilityClass">
          <q-icon v-if="isAvailable" name="check_circle" size="12px" />
          {{ availabilityText }}
        </div>
      </div>

      <div class="basic-info">
        <h3 class="name">{{ caregiver.name }}</h3>
        <div class="rating">
          <q-rating
            :model-value="caregiver.rating"
            size="16px"
            color="orange"
            readonly
          />
          <span class="rating-number">{{ caregiver.rating }}</span>
          <span class="review-count">({{ caregiver.reviews_count || 0 }})</span>
        </div>
        <p class="location">
          <q-icon name="location_on" size="16px" color="grey" />
          {{ caregiver.location }}
        </p>
      </div>

      <div class="pricing">
        <div class="price-main">
          <span class="price">NT$ {{ caregiver.hourly_rate }}</span>
          <span class="label">/小時</span>
        </div>
        <div class="quick-actions">
          <q-btn
            flat
            round
            icon="chat"
            size="sm"
            color="grey-7"
            @click.stop="openChat"
          >
            <q-tooltip>私訊詢問</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="favorite_border"
            size="sm"
            color="grey-7"
            @click.stop="toggleFavorite"
          >
            <q-tooltip>收藏</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>

    <div v-if="!compact" class="card-body">
      <div class="experience">
        <h4>
          <q-icon name="work_history" size="18px" color="primary" />
          經驗背景
        </h4>
        <p>{{ caregiver.experience }}</p>
      </div>

      <div class="skills">
        <h4>
          <q-icon name="psychology" size="18px" color="primary" />
          專業技能
        </h4>
        <div class="skills-tags">
          <q-chip
            v-for="skill in skillsArray"
            :key="skill"
            size="sm"
            color="primary"
            text-color="white"
            dense
          >
            {{ skill }}
          </q-chip>
        </div>
      </div>

      <div class="licenses">
        <h4>
          <q-icon name="verified" size="18px" color="primary" />
          專業證照
        </h4>
        <div class="licenses-list">
          <q-chip
            v-for="license in caregiver.licenses"
            :key="license"
            size="sm"
            color="green"
            text-color="white"
            icon="verified_user"
            dense
          >
            {{ license }}
          </q-chip>
        </div>
      </div>
    </div>

    <!-- 手機版精簡內容 -->
    <div v-else class="card-body-compact">
      <div class="compact-info">
        <div class="info-item">
          <q-icon name="work_history" size="16px" color="grey-7" />
          <span>{{ caregiver.experience }}</span>
        </div>
        <div class="skills-preview">
          <q-chip
            v-for="skill in skillsArray.slice(0, 2)"
            :key="skill"
            size="sm"
            outline
            color="primary"
            dense
          >
            {{ skill }}
          </q-chip>
          <span v-if="skillsArray.length > 2" class="more-skills">
            +{{ skillsArray.length - 2 }}
          </span>
        </div>
      </div>
    </div>

    <div class="card-footer">
      <div class="actions">
        <q-btn
          outline
          color="primary"
          size="sm"
          class="btn-detail"
          @click.stop="goDetail"
        >
          查看詳情
        </q-btn>
        <q-btn
          unelevated
          color="primary"
          size="sm"
          class="btn-book"
          @click.stop="$emit('book', caregiver)"
        >
          立即預約
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import type { CaregiverDisplay } from '~/types/caregiver'

interface Props {
  caregiver: CaregiverDisplay
  compact?: boolean
}

const props = defineProps<Props>()
const router = useRouter()
const $q = useQuasar()

const emit = defineEmits<{
  select: [caregiver: CaregiverDisplay]
  book: [caregiver: CaregiverDisplay]
}>()

const skillsArray = computed(() => {
  if (Array.isArray(props.caregiver.skills)) {
    return props.caregiver.skills
  }
  return (
    props.caregiver.skills?.split('、').filter((skill) => skill.trim()) || []
  )
})

const isAvailable = computed(() => {
  if (props.caregiver.is_available !== undefined) {
    return props.caregiver.is_available
  }
  const available = props.caregiver.available
  if (typeof available === 'boolean') {
    return available
  }
  const availability = (available || '').toLowerCase()
  return (
    availability.includes('全天') ||
    availability.includes('24') ||
    availability.includes('可')
  )
})

const availabilityClass = computed(() => {
  return isAvailable.value ? 'available-full' : 'available-limited'
})

const availabilityText = computed(() => {
  if (props.caregiver.is_available !== undefined) {
    return props.caregiver.is_available ? '可預約' : '暫無檔期'
  }
  const available = props.caregiver.available
  if (typeof available === 'boolean') {
    return available ? '可預約' : '暫無檔期'
  }
  return available || '暫無檔期'
})

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/images/default-avatar.jpg'
}

const goDetail = () => {
  router.push(`/caregivers/${props.caregiver.id}`)
}

const openChat = () => {
  $q.notify({
    message: `即將開放與 ${props.caregiver.name} 的私訊功能`,
    color: 'info',
    position: 'top',
    timeout: 2000,
  })
}

const toggleFavorite = () => {
  $q.notify({
    message: '收藏功能即將開放',
    color: 'info',
    position: 'top',
    timeout: 2000,
  })
}
</script>

<style scoped>
.caregiver-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.caregiver-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border-color: var(--q-primary);
  transform: translateY(-2px);
}

.card-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  margin-bottom: 16px;
  align-items: start;
}

.avatar-section {
  position: relative;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e2e8f0;
}

.gender-chip {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 11px !important;
}

.availability-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  color: white;
  border: 2px solid white;
  display: flex;
  align-items: center;
  gap: 2px;
}

.available-full {
  background: var(--q-positive);
}

.available-limited {
  background: var(--q-negative);
}

.basic-info {
  min-width: 0;
}

.name {
  margin: 0 0 6px 0;
  color: #2d3748;
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.age {
  font-size: 14px;
  font-weight: normal;
  color: #718096;
}

.experience-years {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #718096;
  margin-top: 4px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.rating-number {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.875rem;
}

.review-count {
  color: #718096;
  font-size: 0.75rem;
}

.location {
  margin: 0;
  color: #718096;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.pricing {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-main .price {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--q-primary);
}

.price-main .label {
  font-size: 0.75rem;
  color: #718096;
}

.quick-actions {
  display: flex;
  gap: 4px;
}

.card-body {
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
  flex: 1;
}

.card-body h4 {
  margin: 0 0 8px 0;
  color: #2d3748;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-body > div {
  margin-bottom: 16px;
}

.card-body > div:last-child {
  margin-bottom: 0;
}

.experience p {
  margin: 0;
  color: #4a5568;
  line-height: 1.4;
  font-size: 0.875rem;
}

.skills-tags,
.licenses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* 手機版精簡內容 */
.card-body-compact {
  border-top: 1px solid #e2e8f0;
  padding-top: 12px;
  flex: 1;
}

.compact-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: #4a5568;
}

.skills-preview {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.more-skills {
  font-size: 0.75rem;
  color: #718096;
  font-weight: 500;
}

.card-footer {
  border-top: 1px solid #e2e8f0;
  padding-top: 12px;
  margin-top: auto;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: space-between;
}

.btn-detail,
.btn-book {
  flex: 1;
}

/* 手機版響應式設計 */
@media (max-width: 600px) {
  .caregiver-card {
    padding: 16px;
    margin-bottom: 12px;
  }

  .card-header {
    gap: 10px;
  }

  .avatar {
    width: 60px;
    height: 60px;
  }

  .name {
    font-size: 1rem;
  }

  .availability-badge {
    font-size: 10px;
    padding: 2px 4px;
  }

  .price-main .price {
    font-size: 1rem;
  }

  .quick-actions {
    display: none; /* 在卡片上隱藏快速操作按鈕 */
  }

  .card-body h4 {
    font-size: 0.8125rem;
  }

  .actions {
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .caregiver-card {
    padding: 14px;
    border-radius: 8px;
  }

  .pricing {
    align-items: center;
  }

  .price-main {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
}
</style>
