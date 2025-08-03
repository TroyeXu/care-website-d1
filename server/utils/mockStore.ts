// Mock 資料儲存
import { type User, type Booking, type Payment, type Review } from '~/utils/mockData'
import type { ServerCaregiver } from '~/server/types'

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

let caregivers: ServerCaregiver[] = [
  {
    id: 'caregiver-1',
    user_id: 'user-2',
    name: '張美麗',
    avatar: 'https://i.pravatar.cc/150?img=1',
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
  },
  {
    id: 'caregiver-2',
    user_id: 'user-3',
    name: '林志明',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4.9,
    reviews_count: 36,
    hourly_rate: 600,
    experience_years: 8,
    certifications: ['護理師執照', '重症護理師證照', 'ACLS高級心臟救命術'],
    languages: ['中文', '英文'],
    specialties: ['重症照護', '呼吸照護', '心臟監測'],
    service_areas: ['台北市', '新北市', '桃園市'],
    availability: {
      monday: ['00:00', '23:59'],
      tuesday: ['00:00', '23:59'],
      wednesday: ['00:00', '23:59'],
      thursday: ['00:00', '23:59'],
      friday: ['00:00', '23:59'],
      saturday: ['00:00', '23:59'],
      sunday: ['00:00', '23:59']
    },
    bio: '專業重症護理師，熟悉各種醫療儀器操作，能處理複雜的醫療狀況',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z'
  },
  {
    id: 'caregiver-3',
    user_id: 'user-4',
    name: '王淑芬',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 4.7,
    reviews_count: 52,
    hourly_rate: 450,
    experience_years: 15,
    certifications: ['護理師執照', '復健護理認證'],
    languages: ['中文', '台語', '客語'],
    specialties: ['復健護理', '物理治療輔助', '肌力訓練'],
    service_areas: ['台中市', '彰化縣', '南投縣'],
    availability: {
      monday: null,
      tuesday: ['14:00', '22:00'],
      wednesday: ['14:00', '22:00'],
      thursday: ['14:00', '22:00'],
      friday: ['14:00', '22:00'],
      saturday: ['08:00', '18:00'],
      sunday: ['08:00', '18:00']
    },
    bio: '協助患者進行復健訓練，提供專業的復健護理服務',
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-22T00:00:00Z'
  },
  {
    id: 'caregiver-4',
    user_id: 'user-5',
    name: '陳美玲',
    avatar: 'https://i.pravatar.cc/150?img=4',
    rating: 4.8,
    reviews_count: 48,
    hourly_rate: 500,
    experience_years: 10,
    certifications: ['護理師執照', '長照人員認證', 'CPR急救證照'],
    languages: ['中文', '英文', '日文'],
    specialties: ['老年護理', '失智症照護', '傷口護理'],
    service_areas: ['高雄市', '屏東縣'],
    availability: {
      monday: ['08:00', '20:00'],
      tuesday: ['08:00', '20:00'],
      wednesday: ['08:00', '20:00'],
      thursday: ['08:00', '20:00'],
      friday: ['08:00', '20:00'],
      saturday: null,
      sunday: null
    },
    bio: '專注於提供高品質的老年照護服務，擁有豐富的醫院和居家照護經驗',
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-23T00:00:00Z'
  },
  {
    id: 'caregiver-5',
    user_id: 'user-6',
    name: '李建國',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 4.5,
    reviews_count: 42,
    hourly_rate: 550,
    experience_years: 12,
    certifications: ['護理師執照', '安寧療護專科護理師'],
    languages: ['中文', '台語'],
    specialties: ['安寧照護', '疼痛管理', '心理支持'],
    service_areas: ['台南市', '嘉義市'],
    availability: {
      monday: ['09:00', '17:00'],
      tuesday: ['09:00', '17:00'],
      wednesday: ['09:00', '17:00'],
      thursday: ['09:00', '17:00'],
      friday: ['09:00', '17:00'],
      saturday: ['10:00', '14:00'],
      sunday: null
    },
    bio: '提供全人照護，重視病人尊嚴，協助病人及家屬面對生命議題',
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-24T00:00:00Z'
  }
]

let bookings: Booking[] = [
  {
    id: 'booking-1',
    user_id: 'user-1',
    caregiver_id: 1,
    service_type: 'hourly',
    start_date: '2024-01-15',
    end_date: '2024-01-15',
    start_time: '09:00',
    end_time: '12:00',
    status: 'completed',
    total_cost: 1050,
    patient_info: {
      name: '王小明',
      age: 75,
      gender: '男',
      medicalConditions: ['高血壓', '糖尿病'],
      emergencyContact: '王大明 (兒子) - 0923-456-789'
    },
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
    method: 'credit_card',
    transaction_id: 'txn_123456',
    created_at: '2024-01-15T12:30:00Z',
    updated_at: '2024-01-15T12:30:00Z'
  }
]

let reviews: Review[] = [
  {
    id: 'review-1',
    booking_id: 'booking-1',
    user_id: 'user-1',
    caregiver_id: 1,
    rating: 5,
    comment: '服務很好，照顧員很專業',
    created_at: '2024-01-15T13:00:00Z',
    updated_at: '2024-01-15T13:00:00Z'
  },
  {
    id: 'review-2',
    booking_id: 'booking-2',
    user_id: 'user-1',
    caregiver_id: 1,
    rating: 5,
    comment: '張美麗護理師非常專業，對待我的父親就像家人一樣。她的失智症照護經驗豐富，讓我們很放心。',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  },
  {
    id: 'review-3',
    booking_id: 'booking-3',
    user_id: 'user-3',
    caregiver_id: 2,
    rating: 4,
    comment: '林志明護理師的重症護理經驗確實很豐富，處理緊急狀況很冷靜。只是希望能更準時一些。',
    created_at: '2024-01-18T14:00:00Z',
    updated_at: '2024-01-18T14:00:00Z'
  },
  {
    id: 'review-4',
    booking_id: 'booking-4',
    user_id: 'user-4',
    caregiver_id: 3,
    rating: 5,
    comment: '王淑芬護理師的復健指導非常專業，我的膝蓋恢復得很好。她很有耐心，會仔細說明每個動作。',
    created_at: '2024-01-12T09:00:00Z',
    updated_at: '2024-01-12T09:00:00Z'
  },
  {
    id: 'review-5',
    booking_id: 'booking-5',
    user_id: 'user-5',
    caregiver_id: 4,
    rating: 5,
    comment: '陳美玲護理師照顧我的母親已經半年了，她的專業和愛心讓全家人都很感動。強烈推薦！',
    created_at: '2024-01-08T16:00:00Z',
    updated_at: '2024-01-08T16:00:00Z'
  },
  {
    id: 'review-6',
    booking_id: 'booking-6',
    user_id: 'user-6',
    caregiver_id: 5,
    rating: 4,
    comment: '李建國護理師的安寧照護經驗豐富，給了我們很大的心理支持。',
    created_at: '2024-01-05T11:00:00Z',
    updated_at: '2024-01-05T11:00:00Z'
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
        users[index] = { ...users[index], ...updates, updated_at: new Date().toISOString() } as User
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
    create: (caregiver: ServerCaregiver) => {
      caregivers.push(caregiver)
      return caregiver
    },
    update: (id: string, updates: Partial<ServerCaregiver>) => {
      const index = caregivers.findIndex(c => c.id === id)
      if (index !== -1) {
        caregivers[index] = { ...caregivers[index], ...updates, updated_at: new Date().toISOString() } as ServerCaregiver
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
    getByPatientId: (patientId: string) => bookings.filter(b => b.user_id === patientId),
    getByCaregiverId: (caregiverId: number) => bookings.filter(b => b.caregiver_id === caregiverId),
    create: (booking: Booking) => {
      bookings.push(booking)
      return booking
    },
    update: (id: string, updates: Partial<Booking>) => {
      const index = bookings.findIndex(b => b.id === id)
      if (index !== -1) {
        bookings[index] = { ...bookings[index], ...updates, updated_at: new Date().toISOString() } as Booking
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
        payments[index] = { ...payments[index], ...updates, updated_at: new Date().toISOString() } as Payment
        return payments[index]
      }
      return null
    }
  },
  
  reviews: {
    getAll: () => reviews,
    getById: (id: string) => reviews.find(r => r.id === id),
    getByCaregiverId: (caregiverId: number) => reviews.filter(r => r.caregiver_id === caregiverId),
    create: (review: Review) => {
      reviews.push(review)
      return review
    },
    update: (id: string, updates: Partial<Review>) => {
      const index = reviews.findIndex(r => r.id === id)
      if (index !== -1) {
        reviews[index] = { ...reviews[index], ...updates, updated_at: new Date().toISOString() } as Review
        return reviews[index]
      }
      return null
    }
  }
}