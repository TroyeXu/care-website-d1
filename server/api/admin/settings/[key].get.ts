// 管理員取得單一系統設定 API
import { defineEventHandler, getRouterParam } from 'h3'
import { getD1 } from '../../../utils/d1'
import { getCurrentAdmin, hasPermission } from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
  createAuthorizationError,
  createNotFoundError,
} from '../../../utils/error-handler'
import { validateRequired } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key')

  try {
    // 驗證參數
    validateRequired(key, 'key', '設定鍵值')

    // 驗證管理員權限
    const admin = await getCurrentAdmin(event)
    if (!admin) {
      throw createAuthenticationError('請先登入管理後台')
    }

    // 檢查權限
    if (!hasPermission(admin, 'settings.view')) {
      throw createAuthorizationError('無此操作權限')
    }

    const db = getD1(event)

    // 查詢設定
    const setting = await db
      .prepare(
        `SELECT
          s.*,
          u.name as updated_by_name
         FROM system_settings s
         LEFT JOIN admins a ON s.updated_by = a.id
         LEFT JOIN users u ON a.user_id = u.id
         WHERE s.key = ?`,
      )
      .bind(key)
      .first()

    if (!setting) {
      throw createNotFoundError('系統設定', key)
    }

    // 轉換設定值
    let displayValue = setting.value
    switch (setting.type) {
      case 'number':
        displayValue = Number(setting.value)
        break
      case 'boolean':
        displayValue = setting.value === '1' || setting.value === 'true'
        break
      case 'json':
        try {
          displayValue = JSON.parse(setting.value)
        } catch (e) {
          console.error(`無法解析 JSON 設定 ${setting.key}:`, e)
        }
        break
    }

    return createSuccessResponse({
      ...setting,
      displayValue,
    })
  } catch (error) {
    handleError(error, '取得系統設定')
  }
})
