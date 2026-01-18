// 管理員更新系統設定 API
import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { getD1 } from '../../../utils/d1'
import {
  getCurrentAdmin,
  hasPermission,
  logAdminAction,
} from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
  createAuthorizationError,
  createNotFoundError,
  createValidationError,
} from '../../../utils/error-handler'
import { validateRequired } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key')
  const body = await readBody(event)

  try {
    // 驗證參數
    validateRequired(key, 'key', '設定鍵值')
    validateRequired(body.value, 'value', '設定值')

    // 驗證管理員權限
    const admin = await getCurrentAdmin(event)
    if (!admin) {
      throw createAuthenticationError('請先登入管理後台')
    }

    // 檢查權限
    if (!hasPermission(admin, 'settings.edit')) {
      throw createAuthorizationError('無此操作權限')
    }

    const db = getD1(event)

    // 檢查設定是否存在
    const existing = await db
      .prepare('SELECT * FROM system_settings WHERE key = ?')
      .bind(key)
      .first()

    if (!existing) {
      throw createNotFoundError('系統設定', key)
    }

    // 驗證值的型別
    let valueToStore = body.value

    switch (existing.type) {
      case 'number':
        if (isNaN(Number(body.value))) {
          throw createValidationError('設定值必須是數字', 'value')
        }
        valueToStore = String(body.value)
        break

      case 'boolean':
        if (
          typeof body.value !== 'boolean' &&
          body.value !== '0' &&
          body.value !== '1'
        ) {
          throw createValidationError('設定值必須是布林值', 'value')
        }
        valueToStore = body.value === true || body.value === '1' ? '1' : '0'
        break

      case 'json':
        try {
          // 驗證是否為有效 JSON
          if (typeof body.value === 'string') {
            JSON.parse(body.value)
            valueToStore = body.value
          } else {
            valueToStore = JSON.stringify(body.value)
          }
        } catch (e) {
          throw createValidationError('設定值必須是有效的 JSON', 'value')
        }
        break

      case 'string':
      default:
        valueToStore = String(body.value)
        break
    }

    // 更新設定
    await db
      .prepare(
        `UPDATE system_settings
         SET value = ?,
             updated_at = datetime('now'),
             updated_by = ?
         WHERE key = ?`,
      )
      .bind(valueToStore, admin.id, key)
      .run()

    // 記錄操作日誌
    await logAdminAction(event, 'update_setting', 'system_setting', key, {
      old_value: existing.value,
      new_value: valueToStore,
    })

    // 取得更新後的設定
    const updated = await db
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

    // 轉換設定值用於回應
    let displayValue = updated.value
    switch (updated.type) {
      case 'number':
        displayValue = Number(updated.value)
        break
      case 'boolean':
        displayValue = updated.value === '1'
        break
      case 'json':
        try {
          displayValue = JSON.parse(updated.value)
        } catch (e) {
          console.error('無法解析 JSON:', e)
        }
        break
    }

    return createSuccessResponse(
      {
        ...updated,
        displayValue,
      },
      '系統設定更新成功',
    )
  } catch (error) {
    handleError(error, '更新系統設定')
  }
})
