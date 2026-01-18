import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { getD1 } from '../../utils/d1'
import { createSuccessResponse } from '../../utils/api-response'
import {
  handleError,
  createNotFoundError,
  createValidationError,
} from '../../utils/error-handler'
import { validateId } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  try {
    validateId(id, 'id')

    const body = await readBody(event)
    const db = getD1(event)

    // 檢查用戶是否存在
    const existingUser = await db
      .prepare('SELECT * FROM users WHERE id = ?')
      .bind(id)
      .first()

    if (!existingUser) {
      throw createNotFoundError('用戶', id)
    }

    // 建立更新欄位
    const updates = []
    const params = []

    // 可更新的欄位（不包含敏感資料）
    const allowedFields = ['name', 'phone', 'avatar_url', 'address', 'gender']

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates.push(`${field} = ?`)
        params.push(body[field])
      }
    }

    // 處理 email_verified 和 phone_verified
    if (
      body.email_verified !== undefined &&
      typeof body.email_verified === 'boolean'
    ) {
      updates.push('email_verified = ?')
      params.push(body.email_verified ? 1 : 0)
    }

    if (
      body.phone_verified !== undefined &&
      typeof body.phone_verified === 'boolean'
    ) {
      updates.push('phone_verified = ?')
      params.push(body.phone_verified ? 1 : 0)
    }

    if (updates.length === 0) {
      throw createValidationError('沒有提供要更新的欄位')
    }

    // 加入更新時間
    updates.push('updated_at = CURRENT_TIMESTAMP')
    params.push(id)

    // 執行更新
    const updateQuery = `
      UPDATE users
      SET ${updates.join(', ')}
      WHERE id = ?
    `

    await db
      .prepare(updateQuery)
      .bind(...params)
      .run()

    // 返回更新後的資料
    const updatedUser = await db
      .prepare(
        `
        SELECT
          id,
          email,
          name,
          phone,
          role,
          avatar_url,
          email_verified,
          phone_verified,
          address,
          gender,
          created_at,
          updated_at
        FROM users
        WHERE id = ?
      `,
      )
      .bind(id)
      .first()

    return createSuccessResponse(updatedUser, '用戶資料已更新')
  } catch (error: any) {
    handleError(error, '更新用戶資料')
  }
})
