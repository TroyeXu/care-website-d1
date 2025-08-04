import { defineStore } from 'pinia'

interface Payment {
  id: number
  date: string
  amount: number
  method: string
  status: string
}

export const usePaymentsStore = defineStore('payments', {
  state: () => ({
    payments: JSON.parse(
      localStorage.getItem('payments') ||
        JSON.stringify([
          {
            id: 1,
            date: '2024-05-01',
            amount: 1000,
            method: '信用卡',
            status: '已完成',
          },
          {
            id: 2,
            date: '2024-05-15',
            amount: 800,
            method: '轉帳',
            status: '待處理',
          },
        ]),
    ),
  }),
  getters: {
    getAll: (state) => state.payments,
  },
  actions: {
    addPayment(payment: Payment) {
      this.payments.push(payment)
      localStorage.setItem('payments', JSON.stringify(this.payments))
    },
  },
})
