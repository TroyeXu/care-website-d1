// 管理員：看護師列表 API
import { defineEventHandler, getQuery } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { createSuccessResponse } from '../../../utils/api-response'
import { handleError } from '../../../utils/error-handler'
import { validatePaginationParams } from '../../../utils/validation'
import { getAdminCaregiversList } from '../../../utils/admin/caregiverService'

export default defineEventHandler(async (event) => {
  // 檢查管理員權限
  await requireAdmin(event)
  await requirePermission('caregiver.view')(event)

  try {
    const query = getQuery(event)
    const { page = 1, limit = 20 } = query

    // 驗證分頁參數
    validatePaginationParams(Number(page), Number(limit))

    const db = getD1(event)

    const result = await getAdminCaregiversList(db, query)

    return createSuccessResponse(result)
  } catch (error) {
    handleError(error, '取得看護師列表')
  }
})
