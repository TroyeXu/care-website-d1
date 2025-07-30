import { mockStore } from '~/server/utils/mockStore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password, phone, role, profile } = body

  // 檢查 email 是否已存在
  const existingUser = mockStore.users.getByEmail(email)
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: '此電子郵件已被註冊'
    })
  }

  // 建立新用戶
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    phone,
    role: role || 'patient',
    avatar: `/images/users/default-${role || 'patient'}.jpg`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile: profile || {}
  }

  const createdUser = mockStore.users.create(newUser)

  // 如果是照護員，建立照護員資料
  if (role === 'caregiver') {
    const newCaregiver = {
      id: `caregiver-${Date.now()}`,
      user_id: createdUser.id,
      name: createdUser.name,
      avatar: createdUser.avatar,
      rating: 0,
      reviews_count: 0,
      hourly_rate: 300,
      experience_years: 0,
      certifications: [],
      languages: ['中文'],
      specialties: [],
      service_areas: [],
      availability: {},
      bio: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    mockStore.caregivers.create(newCaregiver)
  }

  return {
    user: {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      phone: createdUser.phone,
      role: createdUser.role,
      avatar: createdUser.avatar,
      profile: createdUser.profile
    },
    token: `mock-token-${createdUser.id}-${Date.now()}`
  }
})