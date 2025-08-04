import type { Caregiver } from '~/stores/caregivers'
import type { Booking } from '~/stores/bookings'

// 舊格式的 Caregiver 資料
interface OldCaregiver {
  id: number
  name: string
  experience: string
  skills: string
  licenses: string[]
  rating: number
  photo: string
  available: string
  hourly_rate: number
  shift_rate: number
  location: string
  description: string
  created_at: string
  updated_at: string
}

// 轉換函數：將舊格式轉換為新格式
function convertToNewCaregiver(old: OldCaregiver): Caregiver {
  // 根據評分計算合理的評論數
  const reviewCount = Math.floor((old.rating - 4) * 100 + Math.random() * 20)

  return {
    id: `caregiver-${old.id}`,
    name: old.name,
    avatar: old.photo,
    rating: old.rating,
    reviews_count: reviewCount,
    hourly_rate: old.hourly_rate,
    experience_years: parseInt(old.experience.match(/\d+/)?.[0] || '0'),
    bio: old.description,
    certifications: old.licenses,
    languages: ['中文', '台語'],
    specialties: old.skills.split('、'),
    service_areas: [old.location],
    created_at: old.created_at,
    updated_at: old.updated_at,
  }
}

// Types are imported from stores, no need to re-export

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'patient' | 'caregiver' | 'admin'
  avatar?: string
  created_at: string
  updated_at: string
  profile?: {
    age?: number
    gender?: string
    address?: string
    emergencyContact?: string
    medicalHistory?: string[]
    preferences?: string[]
  }
}

const oldMockCaregivers: OldCaregiver[] = [
  {
    id: 1,
    name: '李美惠',
    experience: '8年專業照護經驗，曾在台大醫院工作',
    skills: '失智症照護、復健協助、醫療護理、心理支持',
    licenses: ['照服員結業證書', 'CPR證照', '護理師證照'],
    rating: 4.9,
    photo: '/images/caregivers/li-mei-hui.jpg',
    available: '全天候',
    hourly_rate: 280,
    shift_rate: 3200,
    location: '台北市中正區',
    description:
      '專精於失智症照護，具備豐富的醫療背景，能提供專業的復健協助和心理支持。擅長與高齡患者溝通，具備耐心和愛心。',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-07-10T00:00:00Z',
  },
  {
    id: 2,
    name: '陳志強',
    experience: '6年居家照護經驗，專長術後照護',
    skills: '術後照護、傷口護理、復健陪伴、基礎醫療',
    licenses: ['照服員結業證書', 'CPR證照'],
    rating: 4.8,
    photo: '/images/caregivers/chen-zhi-qiang.jpg',
    available: '週一至週五',
    hourly_rate: 260,
    shift_rate: 3000,
    location: '台北市大安區',
    description:
      '男性照護員，力氣大適合協助行動不便患者。在術後照護方面經驗豐富，能協助復健訓練和傷口照護。',
    created_at: '2024-02-20T00:00:00Z',
    updated_at: '2024-07-12T00:00:00Z',
  },
  {
    id: 3,
    name: '王淑芬',
    experience: '10年護理經驗，前榮總護理師',
    skills: '專業護理、用藥管理、慢性病照護、緊急處理',
    licenses: ['護理師證照', '照服員結業證書', 'CPR證照', 'BLS證照'],
    rating: 4.95,
    photo: '/images/caregivers/wang-shu-fen.jpg',
    available: '全天候',
    hourly_rate: 320,
    shift_rate: 3800,
    location: '台北市信義區',
    description:
      '前榮總護理師，具備最高等級的醫療照護能力。擅長慢性病管理和用藥指導，能處理各種緊急狀況。',
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-07-14T00:00:00Z',
  },
  {
    id: 4,
    name: '黃雅雯',
    experience: '5年兒童及青少年照護經驗',
    skills: '兒童照護、發展遲緩協助、特殊需求照護、教育陪伴',
    licenses: ['照服員結業證書', 'CPR證照', '早期療育師證照'],
    rating: 4.7,
    photo: '/images/caregivers/huang-ya-wen.jpg',
    available: '週一至週六',
    hourly_rate: 250,
    shift_rate: 2800,
    location: '新北市板橋區',
    description:
      '專精於兒童和青少年照護，對發展遲緩兒童有豐富經驗。個性活潑有耐心，能提供教育陪伴服務。',
    created_at: '2024-03-05T00:00:00Z',
    updated_at: '2024-07-08T00:00:00Z',
  },
  {
    id: 5,
    name: '劉建國',
    experience: '7年長照機構經驗，專長復健照護',
    skills: '復健協助、物理治療、肌力訓練、日常生活協助',
    licenses: ['照服員結業證書', 'CPR證照', '物理治療助理證照'],
    rating: 4.6,
    photo: '/images/caregivers/liu-jian-guo.jpg',
    available: '週二至週日',
    hourly_rate: 270,
    shift_rate: 3100,
    location: '台北市松山區',
    description:
      '男性照護員，具備物理治療背景，專長復健訓練和肌力增強。適合需要復健協助的患者。',
    created_at: '2024-02-28T00:00:00Z',
    updated_at: '2024-07-11T00:00:00Z',
  },
  {
    id: 6,
    name: '張慧君',
    experience: '4年精神科照護經驗',
    skills: '精神疾病照護、情緒支持、行為管理、藥物監督',
    licenses: ['照服員結業證書', 'CPR證照', '精神科護理證照'],
    rating: 4.8,
    photo: '/images/caregivers/zhang-hui-jun.jpg',
    available: '全天候',
    hourly_rate: 290,
    shift_rate: 3300,
    location: '台北市內湖區',
    description:
      '具備精神科專業背景，擅長處理精神疾病患者的照護需求。能提供情緒支持和行為管理。',
    created_at: '2024-04-12T00:00:00Z',
    updated_at: '2024-07-13T00:00:00Z',
  },
]

export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: '林志明',
    email: 'zhiming.lin@email.com',
    phone: '0912-345-678',
    role: 'patient',
    avatar: '/images/users/lin-zhi-ming.jpg',
    created_at: '2024-05-01T00:00:00Z',
    updated_at: '2024-07-14T00:00:00Z',
    profile: {
      age: 45,
      gender: '男',
      address: '台北市中山區民生東路123號',
      emergencyContact: '0987-654-321',
      medicalHistory: ['糖尿病', '高血壓'],
      preferences: ['女性照護員', '有護理師證照', '日間照護'],
    },
  },
  {
    id: 'user-002',
    name: '陳美玲',
    email: 'meiling.chen@email.com',
    phone: '0923-456-789',
    role: 'patient',
    avatar: '/images/users/chen-mei-ling.jpg',
    created_at: '2024-05-15T00:00:00Z',
    updated_at: '2024-07-10T00:00:00Z',
    profile: {
      age: 38,
      gender: '女',
      address: '新北市板橋區中山路456號',
      emergencyContact: '0976-543-210',
      medicalHistory: ['失智症初期'],
      preferences: ['專業護理師', '失智症照護經驗', '全天候服務'],
    },
  },
  {
    id: 'user-003',
    name: '王大明',
    email: 'daming.wang@email.com',
    phone: '0934-567-890',
    role: 'patient',
    avatar: '/images/users/wang-da-ming.jpg',
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-07-12T00:00:00Z',
    profile: {
      age: 52,
      gender: '男',
      address: '台北市信義區忠孝東路789號',
      emergencyContact: '0965-432-109',
      medicalHistory: ['中風康復期', '行動不便'],
      preferences: ['男性照護員', '復健專長', '力氣大'],
    },
  },
]

export const mockBookings: Omit<Booking, 'id'>[] = [
  {
    caregiver_id: 1,
    user_id: 'user-001',
    service_type: 'hourly',
    start_date: '2024-07-20',
    end_date: '2024-07-20',
    start_time: '09:00',
    end_time: '17:00',
    special_requests: '需要協助血糖監測和藥物提醒',
    total_cost: 2240,
    status: 'confirmed',
    patient_info: {
      name: '林志明',
      age: 45,
      gender: '男',
      medicalConditions: ['糖尿病', '高血壓'],
      emergencyContact: '0987-654-321',
    },
    created_at: '2024-07-15T10:30:00Z',
    updated_at: '2024-07-15T14:20:00Z',
  },
  {
    caregiver_id: 3,
    user_id: 'user-002',
    service_type: 'shift',
    start_date: '2024-07-18',
    end_date: '2024-07-25',
    start_time: '08:00',
    special_requests: '失智症患者，需要特別耐心和關注',
    total_cost: 30400,
    status: 'in_progress',
    patient_info: {
      name: '陳美玲母親',
      age: 78,
      gender: '女',
      medicalConditions: ['失智症初期', '行動緩慢'],
      emergencyContact: '0976-543-210',
    },
    created_at: '2024-07-10T16:45:00Z',
    updated_at: '2024-07-18T08:00:00Z',
  },
  {
    caregiver_id: 5,
    user_id: 'user-003',
    service_type: 'hourly',
    start_date: '2024-07-22',
    end_date: '2024-07-22',
    start_time: '14:00',
    end_time: '18:00',
    special_requests: '需要復健協助和物理治療指導',
    total_cost: 1080,
    status: 'pending',
    patient_info: {
      name: '王大明',
      age: 52,
      gender: '男',
      medicalConditions: ['中風康復期', '左側肢體無力'],
      emergencyContact: '0965-432-109',
    },
    created_at: '2024-07-14T09:15:00Z',
    updated_at: '2024-07-14T09:15:00Z',
  },
  {
    caregiver_id: 2,
    user_id: 'user-001',
    service_type: 'shift',
    start_date: '2024-07-25',
    end_date: '2024-07-27',
    start_time: '20:00',
    special_requests: '術後照護，需要傷口換藥',
    total_cost: 9000,
    status: 'pending',
    patient_info: {
      name: '林志明',
      age: 45,
      gender: '男',
      medicalConditions: ['膝關節手術後', '糖尿病'],
      emergencyContact: '0987-654-321',
    },
    created_at: '2024-07-14T11:20:00Z',
    updated_at: '2024-07-14T11:20:00Z',
  },
]

export interface Review {
  id: string
  booking_id: string
  user_id: string
  caregiver_id: number
  rating: number
  comment: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  booking_id: string
  amount: number
  method: 'credit_card' | 'bank_transfer' | 'cash'
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  transaction_id?: string
  created_at: string
  updated_at: string
}

export const mockReviews: Review[] = [
  {
    id: 'review-001',
    booking_id: 'booking-001',
    user_id: 'user-001',
    caregiver_id: 1,
    rating: 5,
    comment:
      '李護理師非常專業，對糖尿病照護很有經驗，也很細心提醒用藥時間。強力推薦！',
    created_at: '2024-07-16T20:30:00Z',
    updated_at: '2024-07-16T20:30:00Z',
  },
  {
    id: 'review-002',
    booking_id: 'booking-002',
    user_id: 'user-002',
    caregiver_id: 3,
    rating: 5,
    comment:
      '王護理師真的很棒！對失智症患者很有耐心，媽媽很喜歡她。專業度很高，值得信賴。',
    created_at: '2024-07-12T15:45:00Z',
    updated_at: '2024-07-12T15:45:00Z',
  },
  {
    id: 'review-003',
    booking_id: 'booking-003',
    user_id: 'user-003',
    caregiver_id: 5,
    rating: 4,
    comment:
      '劉先生在復健指導方面很專業，力氣也夠協助移位。時間準時，服務態度良好。',
    created_at: '2024-07-11T19:20:00Z',
    updated_at: '2024-07-11T19:20:00Z',
  },
]

export const mockPayments: Payment[] = [
  {
    id: 'payment-001',
    booking_id: 'booking-001',
    amount: 2240,
    method: 'credit_card',
    status: 'completed',
    transaction_id: 'txn-abc123456',
    created_at: '2024-07-15T14:30:00Z',
    updated_at: '2024-07-15T14:30:00Z',
  },
  {
    id: 'payment-002',
    booking_id: 'booking-002',
    amount: 30400,
    method: 'bank_transfer',
    status: 'completed',
    transaction_id: 'txn-def789012',
    created_at: '2024-07-10T17:00:00Z',
    updated_at: '2024-07-10T17:00:00Z',
  },
  {
    id: 'payment-003',
    booking_id: 'booking-003',
    amount: 1080,
    method: 'cash',
    status: 'pending',
    created_at: '2024-07-14T09:20:00Z',
    updated_at: '2024-07-14T09:20:00Z',
  },
]

export interface ServiceType {
  id: string
  name: string
  description: string
  basePrice: number
  unit: string
  features: string[]
}

export const mockServiceTypes: ServiceType[] = [
  {
    id: 'hourly',
    name: '按小時計費',
    description: '靈活的時薪制服務，適合短期或不定期照護需求',
    basePrice: 250,
    unit: '小時',
    features: ['彈性時間安排', '1小時起預約', '適合短期照護', '可選擇特定時段'],
  },
  {
    id: 'shift-12',
    name: '12小時班',
    description: '半天班照護服務，提供專業持續照護',
    basePrice: 3000,
    unit: '班',
    features: [
      '連續12小時照護',
      '專業看護駐點',
      '適合日間或夜間照護',
      '完整照護記錄',
    ],
  },
  {
    id: 'shift-24',
    name: '24小時班',
    description: '全天候照護服務，提供最完整的照護保障',
    basePrice: 5500,
    unit: '班',
    features: [
      '24小時不間斷照護',
      '專業團隊輪班',
      '緊急狀況即時處理',
      '家屬完全放心',
    ],
  },
]

export interface CostModifier {
  id: string
  name: string
  description: string
  amount: number
  type: 'fixed' | 'percentage'
  conditions: string[]
}

export const mockCostModifiers: CostModifier[] = [
  {
    id: 'night-shift',
    name: '夜班加成',
    description: '夜間時段（22:00-08:00）服務加成',
    amount: 20,
    type: 'fixed',
    conditions: ['時間範圍 22:00-08:00'],
  },
  {
    id: 'urgent-service',
    name: '急件服務費',
    description: '24小時內急件預約加成',
    amount: 30,
    type: 'fixed',
    conditions: ['預約時間距離服務開始 < 24小時'],
  },
  {
    id: 'double-urgent',
    name: '雙重急件費',
    description: '6小時內急件預約額外加成',
    amount: 30,
    type: 'fixed',
    conditions: ['預約時間距離服務開始 < 6小時'],
  },
  {
    id: 'weekend-premium',
    name: '假日加成',
    description: '週末及國定假日服務加成',
    amount: 10,
    type: 'percentage',
    conditions: ['週六、週日或國定假日'],
  },
  {
    id: 'special-care',
    name: '特殊照護加成',
    description: '需要特殊醫療技能的照護加成',
    amount: 15,
    type: 'percentage',
    conditions: ['失智症', '精神疾病', '重症照護'],
  },
]

// 轉換所有舊格式的 caregivers 為新格式
export const mockCaregivers: Caregiver[] = oldMockCaregivers.map(
  convertToNewCaregiver,
)

export const getMockDataForStore = () => ({
  caregivers: mockCaregivers,
  users: mockUsers,
  bookings: mockBookings,
  reviews: mockReviews,
  payments: mockPayments,
  serviceTypes: mockServiceTypes,
  costModifiers: mockCostModifiers,
})
