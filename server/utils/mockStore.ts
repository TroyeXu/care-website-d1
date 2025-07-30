// Mock 資料儲存
import { type User, type Caregiver, type Booking, type Payment, type Review } from '~/utils/mockData'

// 初始化 mock 資料
let users: User[] = [
  {
    id: 'user-1',
    name: '王小明',
    email: 'patient1@example.com',
    phone: '0912-345-678',
    role: 'patient',
    avatar: '/images/users/patient1.jpg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    profile: {
      age: 75,
      gender: '男',
      address: '台北市大安區和平東路123號',
      emergencyContact: '王大明 (兒子) - 0923-456-789',
      medicalHistory: ['高血壓', '糖尿病'],
      preferences: ['需要陪伴聊天', '喜歡戶外活動']
    }
  },
  {
    id: 'user-2',
    name: '張美麗',
    email: 'caregiver1@example.com',
    phone: '0923-456-789',
    role: 'caregiver',
    avatar: '/images/users/caregiver1.jpg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

let caregivers: Caregiver[] = [
  {
    id: 'caregiver-1',
    user_id: 'user-2',
    name: '張美麗',
    avatar: '/images/users/caregiver1.jpg',
    rating: 4.8,
    reviews_count: 124,
    hourly_rate: 350,
    experience_years: 5,
    certifications: ['照顧服務員', '急救證照'],
    languages: ['中文', '台語'],
    specialties: ['失智症照護', '復健協助'],
    service_areas: ['台北市', '新北市'],
    availability: {
      monday: ['08:00', '18:00'],
      tuesday: ['08:00', '18:00'],
      wednesday: ['08:00', '18:00'],
      thursday: ['08:00', '18:00'],
      friday: ['08:00', '18:00'],
      saturday: ['09:00', '15:00'],
      sunday: null
    },
    bio: '專業照護服務員，擁有5年以上照護經驗',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

let bookings: Booking[] = [
  {
    id: 'booking-1',
    patient_id: 'user-1',
    caregiver_id: 'caregiver-1',
    start_time: '2024-01-15T09:00:00Z',
    end_time: '2024-01-15T12:00:00Z',
    status: 'completed',
    total_amount: 1050,
    location: '台北市大安區和平東路123號',
    notes: '協助日常活動和陪伴',
    rating: 5,
    review: '服務很好，照顧員很專業',
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-15T13:00:00Z'
  }
]

let payments: Payment[] = [
  {
    id: 'payment-1',
    booking_id: 'booking-1',
    amount: 1050,
    status: 'completed',
    payment_method: 'credit_card',
    transaction_id: 'txn_123456',
    paid_at: '2024-01-15T12:30:00Z',
    created_at: '2024-01-15T12:30:00Z',
    updated_at: '2024-01-15T12:30:00Z'
  }
]

let reviews: Review[] = [
  {
    id: 'review-1',
    booking_id: 'booking-1',
    patient_id: 'user-1',
    caregiver_id: 'caregiver-1',
    rating: 5,
    comment: '服務很好，照顧員很專業',
    created_at: '2024-01-15T13:00:00Z',
    updated_at: '2024-01-15T13:00:00Z'
  }
]

// 匯出資料和操作函數
export const mockStore = {
  users: {
    getAll: () => users,
    getById: (id: string) => users.find(u => u.id === id),
    getByEmail: (email: string) => users.find(u => u.email === email),
    create: (user: User) => {
      users.push(user)
      return user
    },
    update: (id: string, updates: Partial<User>) => {
      const index = users.findIndex(u => u.id === id)
      if (index !== -1) {
        users[index] = { ...users[index], ...updates, updated_at: new Date().toISOString() }
        return users[index]
      }
      return null
    },
    delete: (id: string) => {
      const index = users.findIndex(u => u.id === id)
      if (index !== -1) {
        users.splice(index, 1)
        return true
      }
      return false
    }
  },
  
  caregivers: {
    getAll: () => caregivers,
    getById: (id: string) => caregivers.find(c => c.id === id),
    getByUserId: (userId: string) => caregivers.find(c => c.user_id === userId),
    create: (caregiver: Caregiver) => {
      caregivers.push(caregiver)
      return caregiver
    },
    update: (id: string, updates: Partial<Caregiver>) => {
      const index = caregivers.findIndex(c => c.id === id)
      if (index !== -1) {
        caregivers[index] = { ...caregivers[index], ...updates, updated_at: new Date().toISOString() }
        return caregivers[index]
      }
      return null
    },
    delete: (id: string) => {
      const index = caregivers.findIndex(c => c.id === id)
      if (index !== -1) {
        caregivers.splice(index, 1)
        return true
      }
      return false
    }
  },
  
  bookings: {
    getAll: () => bookings,
    getById: (id: string) => bookings.find(b => b.id === id),
    getByPatientId: (patientId: string) => bookings.filter(b => b.patient_id === patientId),
    getByCaregiverId: (caregiverId: string) => bookings.filter(b => b.caregiver_id === caregiverId),
    create: (booking: Booking) => {
      bookings.push(booking)
      return booking
    },
    update: (id: string, updates: Partial<Booking>) => {
      const index = bookings.findIndex(b => b.id === id)
      if (index !== -1) {
        bookings[index] = { ...bookings[index], ...updates, updated_at: new Date().toISOString() }
        return bookings[index]
      }
      return null
    },
    delete: (id: string) => {
      const index = bookings.findIndex(b => b.id === id)
      if (index !== -1) {
        bookings.splice(index, 1)
        return true
      }
      return false
    }
  },
  
  payments: {
    getAll: () => payments,
    getById: (id: string) => payments.find(p => p.id === id),
    getByBookingId: (bookingId: string) => payments.find(p => p.booking_id === bookingId),
    create: (payment: Payment) => {
      payments.push(payment)
      return payment
    },
    update: (id: string, updates: Partial<Payment>) => {
      const index = payments.findIndex(p => p.id === id)
      if (index !== -1) {
        payments[index] = { ...payments[index], ...updates, updated_at: new Date().toISOString() }
        return payments[index]
      }
      return null
    }
  },
  
  reviews: {
    getAll: () => reviews,
    getById: (id: string) => reviews.find(r => r.id === id),
    getByCaregiverId: (caregiverId: string) => reviews.filter(r => r.caregiver_id === caregiverId),
    create: (review: Review) => {
      reviews.push(review)
      return review
    },
    update: (id: string, updates: Partial<Review>) => {
      const index = reviews.findIndex(r => r.id === id)
      if (index !== -1) {
        reviews[index] = { ...reviews[index], ...updates, updated_at: new Date().toISOString() }
        return reviews[index]
      }
      return null
    }
  }
}