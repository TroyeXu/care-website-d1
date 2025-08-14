import type { Booking } from '../../shared/types'

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

    getBookingsByCaregiver: (state) => (caregiverId: number | string) =>
      state.bookings.filter((b) => b.caregiver_id === String(caregiverId)),

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
    async fetchBookings() {
      this.loading = true
      this.error = null

      try {
        const { bookings } = await $fetch<{ bookings: Booking[] }>(
          '/api/bookings',
        )
        this.bookings = bookings || []
      } catch (err: unknown) {
        this.error =
          (err as any)?.data?.message ||
          (err as any)?.message ||
          '載入預約資料失敗'
        console.error('Error fetching bookings:', err)
        // 保持空陣列，不回退到 mock 資料
        this.bookings = []
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
        this.error =
          (err as any)?.data?.message || (err as any)?.message || '建立預約失敗'
        console.error('Error creating booking:', err)
        throw new Error(this.error || '未知錯誤')
      }
    },

    async updateBookingStatus(bookingId: string, status: Booking['status']) {
      try {
        // 呼叫 API 更新狀態
        const updatedBooking = await $fetch<Booking>(
          `/api/bookings/${bookingId}`,
          {
            method: 'PATCH',
            body: { status },
          },
        )

        // 更新本地狀態
        const index = this.bookings.findIndex((b) => b.id === bookingId)
        if (index !== -1) {
          this.bookings[index] = updatedBooking
        }

        if (this.currentBooking?.id === bookingId) {
          this.currentBooking = updatedBooking
        }

        return updatedBooking
      } catch (err: any) {
        // 如果 API 失敗，回退到本地更新
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
      }
    },

    cancelBooking(bookingId: string) {
      return this.updateBookingStatus(bookingId, 'cancelled')
    },

    confirmBooking(bookingId: string) {
      return this.updateBookingStatus(bookingId, 'confirmed')
    },

    async fetchBookingsByUser(userId: string) {
      try {
        const { bookings } = await $fetch<{ bookings: Booking[] }>(
          `/api/bookings?patient_id=${userId}`,
        )
        return bookings || []
      } catch (err: unknown) {
        this.error =
          (err as any)?.data?.message ||
          (err as any)?.message ||
          '載入用戶預約失敗'
        console.error('Error fetching user bookings:', err)
        return []
      }
    },

    async fetchBookingsByCaregiver(caregiverId: number) {
      this.loading = true
      this.error = null

      try {
        const { bookings } = await $fetch<{ bookings: Booking[] }>(
          `/api/bookings?caregiver_id=${caregiverId}`,
        )
        return bookings || []
      } catch (err: unknown) {
        this.error =
          (err as any)?.data?.message ||
          (err as any)?.message ||
          '載入照護員預約失敗'
        console.error('Error fetching caregiver bookings:', err)
        return []
      } finally {
        this.loading = false
      }
    },

    async fetchBookingById(bookingId: string) {
      this.loading = true
      this.error = null

      try {
        const booking = await $fetch<Booking>(`/api/bookings/${bookingId}`)

        // 更新本地資料
        const index = this.bookings.findIndex((b) => b.id === bookingId)
        if (index !== -1) {
          this.bookings[index] = booking
        } else {
          this.bookings.push(booking)
        }

        this.currentBooking = booking
        return booking
      } catch (err: unknown) {
        this.error =
          (err as any)?.data?.message ||
          (err as any)?.message ||
          '載入預約詳情失敗'
        console.error('Error fetching booking:', err)
        throw new Error(this.error || '未知錯誤')
      } finally {
        this.loading = false
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
