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
          {{ caregiver.available }}
        </div>
      </div>

      <div class="basic-info">
        <h3 class="name">{{ caregiver.name }}</h3>
        <div class="rating">
          <div class="stars">
            <span
              v-for="i in 5"
              :key="i"
              class="star"
              :class="{ filled: i <= Math.floor(caregiver.rating) }"
            >
              ★
            </span>
          </div>
          <span class="rating-number">{{ caregiver.rating }}</span>
        </div>
        <p class="location">📍 {{ caregiver.location }}</p>
      </div>

      <div class="pricing">
        <div class="price-item">
          <span class="label">時薪</span>
          <span class="price">NT$ {{ caregiver.hourly_rate }}</span>
        </div>
        <div class="price-item">
          <span class="label">班次</span>
          <span class="price">NT$ {{ caregiver.shift_rate }}</span>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="experience">
        <h4>經驗背景</h4>
        <p>{{ caregiver.experience }}</p>
      </div>

      <div class="skills">
        <h4>專業技能</h4>
        <div class="skills-tags">
          <span v-for="skill in skillsArray" :key="skill" class="skill-tag">
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="licenses">
        <h4>專業證照</h4>
        <div class="licenses-list">
          <span
            v-for="license in caregiver.licenses"
            :key="license"
            class="license-badge"
          >
            🏆 {{ license }}
          </span>
        </div>
      </div>

      <div v-if="caregiver.description" class="description">
        <h4>詳細介紹</h4>
        <p>{{ caregiver.description }}</p>
      </div>
    </div>

    <div class="card-footer">
      <div class="actions">
        <button type="button" class="btn-secondary" @click.stop="goDetail">
          查看詳情
        </button>
        <button
          type="button"
          class="btn-primary"
          @click.stop="$emit('book', caregiver)"
        >
          立即預約
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { CaregiverDisplay } from '~/types/caregiver'

interface Props {
  caregiver: CaregiverDisplay
  compact?: boolean
}

const props = defineProps<Props>()
const router = useRouter()

const emit = defineEmits<{
  select: [caregiver: CaregiverDisplay]
  book: [caregiver: CaregiverDisplay]
}>()

const skillsArray = computed(() => {
  return (
    props.caregiver.skills?.split('、').filter((skill) => skill.trim()) || []
  )
})

const availabilityClass = computed(() => {
  // 處理 available 可能是布林值或字串的情況
  const available = props.caregiver.available

  if (typeof available === 'boolean') {
    return available ? 'available-full' : 'available-limited'
  }

  const availability = (available || '').toLowerCase()
  if (availability.includes('全天') || availability.includes('24')) {
    return 'available-full'
  } else if (availability.includes('週')) {
    return 'available-partial'
  } else {
    return 'available-limited'
  }
})

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/images/default-avatar.jpg'
}

const goDetail = () => {
  router.push(`/caregivers/${props.caregiver.id}`)
}
</script>

<style scoped>
.caregiver-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.caregiver-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border-color: #3182ce;
  transform: translateY(-2px);
}

.card-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  margin-bottom: 20px;
  align-items: start;
}

.avatar-section {
  position: relative;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e2e8f0;
}

.availability-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  border: 2px solid white;
}

.available-full {
  background: #38a169;
}

.available-partial {
  background: #d69e2e;
}

.available-limited {
  background: #e53e3e;
}

.basic-info {
  min-width: 0;
}

.name {
  margin: 0 0 8px 0;
  color: #2d3748;
  font-size: 1.25rem;
  font-weight: 700;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #e2e8f0;
  font-size: 16px;
  transition: color 0.2s;
}

.star.filled {
  color: #f6e05e;
}

.rating-number {
  font-weight: 600;
  color: #4a5568;
}

.location {
  margin: 0;
  color: #718096;
  font-size: 14px;
}

.pricing {
  text-align: right;
}

.price-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.price-item .label {
  font-size: 12px;
  color: #718096;
  margin-bottom: 2px;
}

.price-item .price {
  font-size: 16px;
  font-weight: 700;
  color: #3182ce;
}

.card-body {
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
}

.card-body h4 {
  margin: 0 0 8px 0;
  color: #2d3748;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-body > div {
  margin-bottom: 16px;
}

.card-body > div:last-child {
  margin-bottom: 0;
}

.experience p,
.description p {
  margin: 0;
  color: #4a5568;
  line-height: 1.5;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.licenses-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.license-badge {
  color: #3182ce;
  font-size: 14px;
  font-weight: 500;
}

.card-footer {
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
  margin-top: 20px;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-secondary {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
}

.btn-primary {
  padding: 8px 16px;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #2c5282;
}

@media (max-width: 768px) {
  .card-header {
    grid-template-columns: 1fr;
    gap: 12px;
    text-align: center;
  }

  .pricing {
    text-align: center;
  }

  .actions {
    flex-direction: column;
  }

  .skills-tags {
    justify-content: center;
  }
}
</style>
