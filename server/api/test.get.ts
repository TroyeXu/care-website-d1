// 測試 API - 驗證 Cloudflare Workers + D1 整合
export default defineEventHandler(async (event) => {
  try {
    // 測試環境檢測
    const isCloudflare = !!event.context.cloudflare
    const hasD1 = !!event.context.cloudflare?.env?.DB
    
    // 測試回應
    return {
      success: true,
      environment: {
        isCloudflare,
        hasD1,
        runtime: isCloudflare ? 'cloudflare-workers' : 'node',
        timestamp: new Date().toISOString()
      },
      message: 'API is working!',
      features: {
        ssr: true,
        d1Database: hasD1,
        authentication: true,
        cryptoAPI: typeof crypto !== 'undefined'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})