// 管理員：更新看護師資料 API
import { defineEventHandler, readBody, getRouterParam } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { logAdminAction } from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import {
  handleError,
  createNotFoundError,
  createValidationError,
} from '../../../utils/error-handler'
import { validateId } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('caregiver.edit')(event)

  const caregiverId = getRouterParam(event, 'id')

  try {
    // 驗證 ID
    validateId(caregiverId, 'id')

    const updates = await readBody(event)
    const db = getD1(event)
    const admin = event.context.admin

    // 檢查看護師是否存在
    const existing = await db
      .prepare('SELECT * FROM caregivers WHERE id = ?')
      .bind(caregiverId)
      .first()

    if (!existing) {
      throw createNotFoundError('看護師', caregiverId)
    }

    // 準備更新欄位
    const updateFields = []
    const updateValues = []

    // 可更新的欄位
    const allowedFields = [
      'bio',
      'experience_years',
      'hourly_rate',
      'city',
      'district',
      'status',
      'skills',
      'languages',
    ]

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        updateFields.push(`${field} = ?`)

        // 處理 JSON 欄位
        if (field === 'skills' || field === 'languages') {
          updateValues.push(JSON.stringify(updates[field]))
        } else {
          updateValues.push(updates[field])
        }
      }
    }

    if (updateFields.length === 0) {
      throw createValidationError('沒有提供要更新的欄位')
    }

    // 加入更新時間
    updateFields.push('updated_at = ?')
    updateValues.push(new Date().toISOString())

    // 執行更新
    updateValues.push(caregiverId)

    await db
      .prepare(
        `
        UPDATE caregivers 
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `,
      )
      .bind(...updateValues)
      .run()

    // 如果更新了用戶相關資料
    if (updates.user_data) {
      const userFields = []
      const userValues = []

      if (updates.user_data.name) {
        userFields.push('name = ?')
        userValues.push(updates.user_data.name)
      }

      if (updates.user_data.phone) {
        userFields.push('phone = ?')
        userValues.push(updates.user_data.phone)
      }

      if (userFields.length > 0) {
        userFields.push('updated_at = ?')
        userValues.push(new Date().toISOString())
        userValues.push(existing.user_id)

        await db
          .prepare(
            `
            UPDATE users 
            SET ${userFields.join(', ')}
            WHERE id = ?
          `,
          )
          .bind(...userValues)
          .run()
      }
    }

    // 記錄操作日誌
    await logAdminAction(event, 'update_caregiver', 'caregiver', caregiverId, {
      updates,
    })

    // 取得更新後的資料
    const updated = await db
      .prepare(
        `
        SELECT 
          c.*,
          u.name,
          u.email,
          u.phone
        FROM caregivers c
        JOIN users u ON c.user_id = u.id
        WHERE c.id = ?
      `,
      )
      .bind(caregiverId)
      .first()

    return createSuccessResponse(
      {
        ...updated,
        skills: updated?.skills ? JSON.parse(updated.skills as string) : [],
        languages: updated?.languages
          ? JSON.parse(updated.languages as string)
          : [],
      },
      '看護師資料已更新',
    )
  } catch (error: any) {
    handleError(error, '更新看護師資料')
  }
})
