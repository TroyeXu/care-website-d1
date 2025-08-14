interface Review {
  name: string
  comment: string
  rating: number
}

export const useReviewStore = defineStore('reviews', {
  state: () => ({
    reviews: [
      { name: '陳先生', comment: '看護服務非常專業且貼心。', rating: 5 },
      { name: '林小姐', comment: '迅速找到合適的看護員，感謝！', rating: 4 },
    ],
  }),
  getters: {
    averageRating: (state) => {
      if (state.reviews.length === 0) return 0
      return (
        state.reviews.reduce((sum, r) => sum + r.rating, 0) /
        state.reviews.length
      )
    },
  },
  actions: {
    addReview(review: Review) {
      this.reviews.push(review)
    },
  },
})
