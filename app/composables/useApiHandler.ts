import type { Ref } from 'vue'
import { useQuasar } from 'quasar'

interface ApiHandlerOptions<T> {
  loadingRef?: Ref<boolean>
  successMessage?: string
  errorMessage?: string
  onSuccess?: (data: T) => void
  onError?: (error: unknown) => void
}

export const useApiHandler = () => {
  const $q = useQuasar()

  const handleApiCall = async <T>(
    apiCall: () => Promise<T>,
    options: ApiHandlerOptions<T> = {},
  ): Promise<T | null> => {
    if (options.loadingRef) {
      options.loadingRef.value = true
    }

    try {
      const result = await apiCall()

      if (options.successMessage) {
        $q.notify({
          type: 'positive',
          message: options.successMessage,
          timeout: 2000,
          position: 'top',
        })
      }

      options.onSuccess?.(result)
      return result
    } catch (error: unknown) {
      console.error('API 調用失敗:', error)

      const errorMsg =
        options.errorMessage ||
        (error instanceof Error ? error.message : '操作失敗，請稍後再試')
      $q.notify({
        type: 'negative',
        message: errorMsg,
        timeout: 3000,
        position: 'top',
      })

      options.onError?.(error)
      return null
    } finally {
      if (options.loadingRef) {
        options.loadingRef.value = false
      }
    }
  }

  return { handleApiCall }
}
