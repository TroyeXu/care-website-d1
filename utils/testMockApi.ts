/**
 * Mock API 測試工具
 * 用於驗證 Mock API 配置是否正確工作
 */

export const testMockApiSetup = async () => {
  const results = {
    configLoaded: false,
    mockApiWorking: false,
    serviceLayerWorking: false,
    dataIntegrity: false,
    errors: [] as string[]
  }

  try {
    // 測試 1: 檢查配置是否載入
    const { config, isUsingMockApi } = useApiConfig()
    if (config.value && isUsingMockApi.value) {
      results.configLoaded = true
    } else {
      results.errors.push('API 配置未正確載入')
    }

    // 測試 2: 檢查 Mock API 是否工作
    const { getCaregivers } = useMockApi()
    const caregiverResponse = await getCaregivers(1, 5)
    if (caregiverResponse.success && caregiverResponse.data) {
      results.mockApiWorking = true
    } else {
      results.errors.push('Mock API 無法正常運作')
    }

    // 測試 3: 檢查服務層是否工作
    const apiService = useApiService()
    const serviceResponse = await apiService.getCaregivers(1, 3)
    if (serviceResponse && serviceResponse.data) {
      results.serviceLayerWorking = true
    } else {
      results.errors.push('API 服務層無法正常運作')
    }

    // 測試 4: 檢查資料完整性
    const { mockCaregivers, mockUsers, mockBookings } = await import('~/utils/mockData')
    if (mockCaregivers.length > 0 && mockUsers.length > 0 && mockBookings.length > 0) {
      results.dataIntegrity = true
    } else {
      results.errors.push('Mock 資料不完整')
    }

  } catch (error: any) {
    results.errors.push(`測試執行錯誤: ${error.message}`)
  }

  return results
}

export const printTestResults = (results: Awaited<ReturnType<typeof testMockApiSetup>>) => {
  console.log('🧪 Mock API 測試結果:')
  console.log('========================')
  console.log(`✅ 配置載入: ${results.configLoaded ? '通過' : '失敗'}`)
  console.log(`✅ Mock API: ${results.mockApiWorking ? '通過' : '失敗'}`)
  console.log(`✅ 服務層: ${results.serviceLayerWorking ? '通過' : '失敗'}`)
  console.log(`✅ 資料完整性: ${results.dataIntegrity ? '通過' : '失敗'}`)
  
  if (results.errors.length > 0) {
    console.log('\n❌ 錯誤訊息:')
    results.errors.forEach(error => console.log(`   - ${error}`))
  } else {
    console.log('\n🎉 所有測試通過！Mock API 設定正確。')
  }
}