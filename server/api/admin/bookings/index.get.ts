// 管理員：預約列表 API
import { defineEventHandler, getQuery } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { createSuccessResponse } from '../../../utils/api-response'
import { handleError } from '../../../utils/error-handler'
import { validatePaginationParams } from '../../../utils/validation'
import { getAdminBookingsList } from '../../../utils/admin/bookingService'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('booking.view')(event)

  try {
    const query = getQuery(event)
    const { page = 1, limit = 20 } = query

    // 驗證分頁參數
    validatePaginationParams(Number(page), Number(limit))

    const db = getD1(event)

    const result = await getAdminBookingsList(db, query)

    return createSuccessResponse(result)
  } catch (error) {
    handleError(error, '取得預約列表')
  }
})
