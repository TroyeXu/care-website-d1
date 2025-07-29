<template>
  <q-item clickable @click="$emit('select', caregiver)" class="caregiver-list-item">
    <q-item-section avatar>
      <q-avatar size="60px">
        <img 
          :src="caregiver.photo || '/images/default-avatar.jpg'" 
          :alt="caregiver.name"
          @error="handleImageError"
        />
      </q-avatar>
      <q-chip
        :color="availabilityColor"
        text-color="white"
        size="sm"
        class="availability-chip"
      >
        {{ availabilityText }}
      </q-chip>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-h6 text-primary">
        {{ caregiver.name }}
      </q-item-label>
      <q-item-label caption class="text-body2 q-mb-xs">
        <q-icon name="location_on" size="sm" class="q-mr-xs" />
        {{ caregiver.location }}
      </q-item-label>
      
      <div class="row items-center q-mb-sm">
        <q-rating
          :model-value="caregiver.rating"
          :max="5"
          size="1em"
          color="orange"
          readonly
          class="q-mr-sm"
        />
        <span class="text-caption text-grey-6">
          {{ caregiver.rating }} ({{ caregiver.review_count || 12 }} 則評價)
        </span>
      </div>

      <div class="skills-preview">
        <q-chip
          v-for="skill in skillsPreview"
          :key="skill"
          outline
          size="sm"
          color="primary"
          class="q-mr-xs q-mb-xs"
        >
          {{ skill }}
        </q-chip>
        <span v-if="remainingSkills > 0" class="text-caption text-grey-6">
          +{{ remainingSkills }} 項技能
        </span>
      </div>
    </q-item-section>

    <q-item-section side class="pricing-section">
      <div class="pricing-info text-right">
        <div class="price-item">
          <div class="text-h6 text-primary">NT$ {{ caregiver.hourly_rate }}</div>
          <div class="text-caption text-grey-6">每小時</div>
        </div>
        <div class="price-item q-mt-sm">
          <div class="text-subtitle1 text-secondary">NT$ {{ caregiver.shift_rate }}</div>
          <div class="text-caption text-grey-6">每班次</div>
        </div>
      </div>
      
      <div class="actions q-mt-md">
        <q-btn
          outline
          color="primary"
          size="sm"
          @click.stop="$emit('select', caregiver)"
          class="q-mb-xs"
        >
          查看詳情
        </q-btn>
        <q-btn
          color="primary"
          size="sm"
          :disable="!caregiver.available"
          @click.stop="$emit('book', caregiver)"
        >
          {{ caregiver.available ? '立即預約' : '不可預約' }}
        </q-btn>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Caregiver } from '~/stores/caregivers'

interface Props {
  caregiver: Caregiver
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [caregiver: Caregiver]
  book: [caregiver: Caregiver]
}>()

const skillsArray = computed(() => {
  return props.caregiver.skills.split('、').filter(skill => skill.trim())
})

const skillsPreview = computed(() => {
  return skillsArray.value.slice(0, 3)
})

const remainingSkills = computed(() => {
  return Math.max(0, skillsArray.value.length - 3)
})

const availabilityColor = computed(() => {
  if (props.caregiver.available) {
    return 'positive'
  }
  return 'negative'
})

const availabilityText = computed(() => {
  return props.caregiver.available ? '可預約' : '不可預約'
})

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/images/default-avatar.jpg'
}
</script>

<style scoped>
.caregiver-list-item {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.caregiver-list-item:hover {
  background-color: #f7fafc;
}

.caregiver-list-item:last-child {
  border-bottom: none;
}

.availability-chip {
  position: absolute;
  bottom: -5px;
  right: -5px;
  min-height: 20px;
}

.skills-preview {
  max-width: 300px;
}

.pricing-section {
  min-width: 140px;
}

.pricing-info {
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .caregiver-list-item {
    padding: 1rem;
  }
  
  .skills-preview {
    max-width: 200px;
  }
  
  .pricing-section {
    min-width: 120px;
  }
  
  .actions {
    flex-direction: row;
    gap: 0.25rem;
  }
  
  .actions .q-btn {
    font-size: 0.75rem;
    padding: 4px 8px;
  }
}

@media (max-width: 600px) {
  .caregiver-list-item .q-item-section {
    padding: 0.5rem 0;
  }
  
  .pricing-section {
    display: none;
  }
  
  .caregiver-list-item {
    border-radius: 8px;
    margin-bottom: 0.5rem;
    border: 1px solid #e2e8f0;
  }
}
</style>