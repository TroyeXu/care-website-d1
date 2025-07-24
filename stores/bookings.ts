import { defineStore } from 'pinia'
import { mockBookings } from '~/utils/mockData'

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
    error: null as string | null
  }),

  getters: {
    getBookingById: (state) => (id: string) =>
      state.bookings.find(b => b.id === id),

    getBookingsByUserId: (state) => (userId: string) =>
      state.bookings.filter(b => b.user_id === userId),

    getBookingsByCaregiver: (state) => (caregiverId: number) =>
      state.bookings.filter(b => b.caregiver_id === caregiverId),

    pendingBookings: (state) =>
      state.bookings.filter(b => b.status === 'pending'),

    confirmedBookings: (state) =>
      state.bookings.filter(b => b.status === 'confirmed'),

    recentBookings: (state) =>
      state.bookings
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)
  },

  actions: {
    loadMockData() {
      const bookingsWithIds = mockBookings.map((booking, index) => ({
        ...booking,
        id: `booking-${String(index + 1).padStart(3, '0')}`
      }))
      this.bookings = bookingsWithIds
    },

    async fetchBookings() {
      this.loading = true
      this.error = null
      
      try {
        const { supabase } = useSupabase()
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        this.bookings = data || []
      } catch (err: any) {
        this.error = err.message
        console.error('Error fetching bookings:', err)
        this.loadMockData()
      } finally {
        this.loading = false
      }
    },

    async createBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) {
      try {
        const { supabase } = useSupabase()
        const { data, error } = await supabase
          .from('bookings')
          .insert([bookingData])
          .select()
          .single()
        
        if (error) throw error
        
        this.bookings.unshift(data)
        this.currentBooking = data
        
        return data
      } catch (err: any) {
        this.error = err.message
        console.error('Error creating booking:', err)
        throw err
      }
    },

    async updateBookingStatus(bookingId: string, status: Booking['status']) {
      try {
        const { supabase } = useSupabase()
        const { data, error } = await supabase
          .from('bookings')
          .update({ status })
          .eq('id', bookingId)
          .select()
          .single()
        
        if (error) throw error
        
        const index = this.bookings.findIndex(b => b.id === bookingId)
        if (index !== -1) {
          this.bookings[index] = data
        }
        
        return data
      } catch (err: any) {
        this.error = err.message
        console.error('Error updating booking status:', err)
        throw err
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
        const { supabase } = useSupabase()
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        return data || []
      } catch (err: any) {
        this.error = err.message
        console.error('Error fetching user bookings:', err)
        return []
      }
    },

    setCurrentBooking(booking: Booking | null) {
      this.currentBooking = booking
    },

    clearCurrentBooking() {
      this.currentBooking = null
    }
  }
})