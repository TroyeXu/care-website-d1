import { defineStore } from 'pinia'

export interface Booking {
  id: string
  caregiver_id: number
  user_id: string
  service_type: 'hourly' | 'shift'
  start_date: string
  end_date: string
  start_time: string
  end_time?: string
  special_requests?: string
  total_cost: number
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  patient_info: {
    name: string
    age: number
    gender: string
    medicalConditions: string[]
    emergencyContact: string
  }
  created_at: string
  updated_at: string
}

export const useBookingStore = defineStore('bookings', {
  state: () => ({
    bookings: [] as Booking[],
    currentBooking: null as Booking | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getBookingById: (state) => (id: string) =>
      state.bookings.find((b) => b.id === id),

    getBookingsByUserId: (state) => (userId: string) =>
      state.bookings.filter((b) => b.user_id === userId),

    getBookingsByCaregiver: (state) => (caregiverId: number) =>
      state.bookings.filter((b) => b.caregiver_id === caregiverId),

    pendingBookings: (state) =>
      state.bookings.filter((b) => b.status === 'pending'),

    confirmedBookings: (state) =>
      state.bookings.filter((b) => b.status === 'confirmed'),

    recentBookings: (state) =>
      state.bookings
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 5),
  },

  actions: {
    loadMockData() {
      // 暫時使用空陣列，等待 mockBookings 資料定義
      this.bookings = []
    },

    async fetchBookings() {
      this.loading = true
      this.error = null

      try {
        const { bookings } = await $fetch<{ bookings: Booking[] }>(
          '/api/bookings',
        )
        this.bookings = bookings || []
      } catch (err: unknown) {
        this.error = err.data?.message || err.message || '載入預約資料失敗'
        console.error('Error fetching bookings:', err)
        this.loadMockData()
      } finally {
        this.loading = false
      }
    },

    async createBooking(
      bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>,
    ) {
      try {
        const newBooking = await $fetch<Booking>('/api/bookings', {
          method: 'POST' as const,
          body: bookingData,
        })

        this.bookings.unshift(newBooking)
        this.currentBooking = newBooking

        return newBooking
      } catch (err: unknown) {
        this.error = err.data?.message || err.message || '建立預約失敗'
        console.error('Error creating booking:', err)
        throw new Error(this.error || '未知錯誤')
      }
    },

    async updateBookingStatus(bookingId: string, status: Booking['status']) {
      try {
        // 直接在本地更新狀態
        const index = this.bookings.findIndex((b) => b.id === bookingId)
        if (index !== -1) {
          this.bookings[index] = {
            ...this.bookings[index],
            status,
            updated_at: new Date().toISOString(),
          }
          return this.bookings[index]
        }
        throw new Error('找不到預約')
      } catch (err: any) {
        this.error = err.message || '更新預約狀態失敗'
        console.error('Error updating booking status:', err)
        throw new Error(this.error || '未知錯誤')
      }
    },

    async cancelBooking(bookingId: string) {
      return this.updateBookingStatus(bookingId, 'cancelled')
    },

    async confirmBooking(bookingId: string) {
      return this.updateBookingStatus(bookingId, 'confirmed')
    },

    async fetchBookingsByUser(userId: string) {
      try {
        const { bookings } = await $fetch<{ bookings: Booking[] }>(
          `/api/bookings?patient_id=${userId}`,
        )
        return bookings || []
      } catch (err: unknown) {
        this.error = err.data?.message || err.message || '載入用戶預約失敗'
        console.error('Error fetching user bookings:', err)
        return []
      }
    },

    setCurrentBooking(booking: Booking | null) {
      this.currentBooking = booking
    },

    clearCurrentBooking() {
      this.currentBooking = null
    },
  },
})
