import { defineEventHandler, getQuery } from 'h3'
import { getD1 } from '../../utils/d1'
import { createSuccessResponse } from '../../utils/api-response'
import { handleError } from '../../utils/error-handler'
import { validatePaginationParams } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { page = 1, limit = 20 } = query

  try {
    const db = getD1(event)

    // 驗證分頁參數
    const pageNum = Number(page)
    const limitNum = Number(limit)
    validatePaginationParams(pageNum, limitNum)

    // 調用 Service
    const result = await getCaregiversList(db, query)

    return createSuccessResponse(result.data, undefined, {
      pagination: result.pagination,
      filters: result.meta.filters,
    })
  } catch (error: any) {
    handleError(error, '查詢看護師列表')
  }
})
