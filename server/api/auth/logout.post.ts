export default defineEventHandler(async (event) => {
  // 模擬登出
  return {
    success: true,
    message: '登出成功'
  }
})