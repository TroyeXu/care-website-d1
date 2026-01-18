// 取得公開系統設定 API
import { defineEventHandler, getQuery } from 'h3'
import { getD1 } from '../../utils/d1'
import { createSuccessResponse } from '../../utils/api-response'
import { handleError } from '../../utils/error-handler'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const db = getD1(event)

    let whereClause = 'WHERE is_public = 1'
    const params: any[] = []

    // 可依類別篩選
    if (query.category) {
      whereClause += ' AND category = ?'
      params.push(query.category)
    }

    // 查詢公開設定
    const { results: settings } = await db
      .prepare(
        `SELECT key, value, type, description, category
         FROM system_settings
         ${whereClause}
         ORDER BY category, key`,
      )
      .bind(...params)
      .all()

    // 轉換設定值為適當的型別
    const formattedSettings = (settings || []).reduce((acc: any, setting: any) => {
      let value = setting.value

      // 根據類型轉換值
      switch (setting.type) {
        case 'number':
          value = Number(value)
          break
        case 'boolean':
          value = value === '1' || value === 'true'
          break
        case 'json':
          try {
            value = JSON.parse(value)
          } catch (e) {
            console.error(`無法解析 JSON 設定 ${setting.key}:`, e)
          }
          break
      }

      acc[setting.key] = value
      return acc
    }, {})

    // 也提供分類分組的格式
    const groupedSettings = (settings || []).reduce((acc: any, setting: any) => {
      if (!acc[setting.category]) {
        acc[setting.category] = {}
      }

      let value = setting.value
      switch (setting.type) {
        case 'number':
          value = Number(value)
          break
        case 'boolean':
          value = value === '1' || value === 'true'
          break
        case 'json':
          try {
            value = JSON.parse(value)
          } catch (e) {
            console.error(`無法解析 JSON 設定 ${setting.key}:`, e)
          }
          break
      }

      acc[setting.category][setting.key] = value
      return acc
    }, {})

    return createSuccessResponse({
      settings: formattedSettings,
      grouped: groupedSettings,
    })
  } catch (error) {
    handleError(error, '取得公開設定')
  }
})
