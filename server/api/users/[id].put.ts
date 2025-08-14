import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { getD1 } from '../../utils/d1'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: '用戶 ID 為必填',
    })
  }

  try {
    const db = getD1(event)

    // 檢查用戶是否存在
    const existingUser = await db
      .prepare('SELECT * FROM users WHERE id = ?')
      .bind(id)
      .first()

    if (!existingUser) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到該用戶',
      })
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
      throw createError({
        statusCode: 400,
        statusMessage: '沒有要更新的資料',
      })
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

    return {
      success: true,
      data: updatedUser,
    }
  } catch (error: any) {
    console.error('Update user error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '更新用戶資料失敗',
    })
  }
})
