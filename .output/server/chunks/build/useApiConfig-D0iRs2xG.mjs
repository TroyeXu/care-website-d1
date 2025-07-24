import { computed, ref } from 'vue';
import { aQ as useSupabase } from './server.mjs';

const apiConfig = ref({
  useMockApi: true,
  // 預設使用 Mock API
  baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  timeout: 1e4,
  retryCount: 3,
  debug: true
});
const useApiConfig = () => {
  const isUsingMockApi = computed(() => apiConfig.value.useMockApi);
  const isProduction = computed(() => "production" === "production");
  const updateConfig = (newConfig) => {
    apiConfig.value = { ...apiConfig.value, ...newConfig };
    if (apiConfig.value.debug && !isProduction.value) {
      console.log("🔧 API 配置已更新:", apiConfig.value);
    }
  };
  const switchToMockApi = () => {
    updateConfig({ useMockApi: true });
    if (apiConfig.value.debug) {
      console.log("🎭 已切換到 Mock API 模式");
    }
  };
  const switchToRealApi = () => {
    updateConfig({ useMockApi: false });
    if (apiConfig.value.debug) {
      console.log("🌐 已切換到真實 API 模式");
    }
  };
  const autoConfigureForEnvironment = () => {
    if (isProduction.value) {
      const forceMock = process.env.NUXT_PUBLIC_FORCE_MOCK_API === "true";
      updateConfig({
        useMockApi: forceMock,
        debug: false
      });
    } else {
      updateConfig({
        useMockApi: true,
        debug: true
      });
    }
  };
  const resetToDefaults = () => {
    apiConfig.value = {
      useMockApi: true,
      baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
      timeout: 1e4,
      retryCount: 3,
      debug: !isProduction.value
    };
  };
  const checkSupabaseAvailability = async () => {
    try {
      const { supabase } = useSupabase();
      const { data, error } = await supabase.auth.getSession();
      return !error;
    } catch {
      return false;
    }
  };
  const smartApiSelection = async () => {
    if (!isUsingMockApi.value) {
      const supabaseAvailable = await checkSupabaseAvailability();
      if (!supabaseAvailable) {
        console.warn("⚠️ Supabase 不可用，自動切換到 Mock API");
        switchToMockApi();
      }
    }
  };
  return {
    // 配置狀態
    config: computed(() => apiConfig.value),
    isUsingMockApi,
    isProduction,
    // 配置方法
    updateConfig,
    switchToMockApi,
    switchToRealApi,
    autoConfigureForEnvironment,
    resetToDefaults,
    // 智能功能
    checkSupabaseAvailability,
    smartApiSelection
  };
};

export { useApiConfig as u };
//# sourceMappingURL=useApiConfig-D0iRs2xG.mjs.map
