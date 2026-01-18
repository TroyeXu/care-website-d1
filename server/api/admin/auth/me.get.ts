// 取得當前管理員資訊 API
import { defineEventHandler } from 'h3'
import { getCurrentAdmin } from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
} from '../../../utils/error-handler'

export default defineEventHandler(async (event) => {
  try {
    const admin = await getCurrentAdmin(event)

    if (!admin) {
      throw createAuthenticationError('請先登入管理後台')
    }

    return createSuccessResponse({
      admin: {
        id: admin.id,
        user_id: admin.user_id,
        name: admin.name,
        email: admin.email,
        role_id: admin.role_id,
        is_super: admin.is_super,
        permissions: admin.permissions,
      },
    })
  } catch (error: any) {
    handleError(error, '獲取管理員資訊')
  }
})
