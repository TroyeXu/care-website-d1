import type { Caregiver } from '~/types/caregiver'

export const transformCaregiver = (data: any): Caregiver => {
  return {
    id: data.id,
    user_id: data.user_id || data.id,
    name: data.name,
    avatar: data.avatar || 'https://i.pravatar.cc/150',
    gender: data.gender || 'female',
    address: data.address || '',
    hourly_rate: data.hourly_rate || 300,
    experience_years: data.experience_years || 0,
    bio: data.bio || '',
    rating: data.rating || 0,
    total_reviews: data.total_reviews || 0,
    completion_rate: data.completion_rate || 95,
    response_rate: data.response_rate || 90,
    background_checked:
      data.background_checked !== undefined ? data.background_checked : true,
    drug_test_passed:
      data.drug_test_passed !== undefined ? data.drug_test_passed : true,
    certifications: data.certifications || [],
    specialties: data.specialties || [],
    service_areas: data.service_areas || [],
    recent_reviews: data.recent_reviews || [],
    status: data.status || 'active',
    created_at: data.created_at,
    updated_at: data.updated_at,
    // 舊版相容屬性
    description: data.bio || '',
    skills:
      data.specialties?.map((s: any) => (typeof s === 'string' ? s : s.name)) ||
      [],
    languages: ['中文', '台語'],
    availability: {
      weekday: true,
      weekend: true,
      overnight: false,
    },
    reviews_count: data.total_reviews || 0,
  }
}
