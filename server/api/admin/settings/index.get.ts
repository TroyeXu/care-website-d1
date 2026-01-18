// 管理員取得所有系統設定 API
import { defineEventHandler, getQuery } from 'h3'
import { getD1 } from '../../../utils/d1'
import { getCurrentAdmin, hasPermission } from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
  createAuthorizationError,
} from '../../../utils/error-handler'

export default defineEventHandler(async (event) => {
  try {
    // 驗證管理員權限
    const admin = await getCurrentAdmin(event)
    if (!admin) {
      throw createAuthenticationError('請先登入管理後台')
    }

    // 檢查權限
    if (!hasPermission(admin, 'settings.view')) {
      throw createAuthorizationError('無此操作權限')
    }

    const query = getQuery(event)
    const db = getD1(event)

    let whereClause = ''
    const params: any[] = []

    // 可依類別篩選
    if (query.category) {
      whereClause = 'WHERE category = ?'
      params.push(query.category)
    }

    // 查詢所有設定
    const { results: settings } = await db
      .prepare(
        `SELECT
          s.*,
          u.name as updated_by_name
         FROM system_settings s
         LEFT JOIN admins a ON s.updated_by = a.id
         LEFT JOIN users u ON a.user_id = u.id
         ${whereClause}
         ORDER BY category, key`,
      )
      .bind(...params)
      .all()

    // 查詢所有類別
    const { results: categories } = await db
      .prepare(
        `SELECT DISTINCT category, COUNT(*) as count
         FROM system_settings
         GROUP BY category
         ORDER BY category`,
      )
      .all()

    // 轉換設定值為適當的型別（僅用於顯示）
    const formattedSettings = (settings || []).map((setting: any) => {
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

      return {
        ...setting,
        displayValue,
      }
    })

    return createSuccessResponse({
      settings: formattedSettings,
      categories: categories || [],
    })
  } catch (error) {
    handleError(error, '取得系統設定')
  }
})
