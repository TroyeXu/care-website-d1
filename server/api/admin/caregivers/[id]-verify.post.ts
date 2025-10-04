// 管理員：審核看護師 API
import { defineEventHandler, readBody, createError } from 'h3'
import { nanoid } from 'nanoid'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { logAdminAction } from '../../../utils/admin-auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('caregiver.verify')(event)

  const caregiverId = getRouterParam(event, 'id')
  const { action, reason } = await readBody(event)

  if (!caregiverId) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少看護師 ID',
    })
  }

  if (!action || !['approve', 'reject'].includes(action)) {
    throw createError({
      statusCode: 400,
      statusMessage: '無效的審核動作',
    })
  }

  if (action === 'reject' && !reason) {
    throw createError({
      statusCode: 400,
      statusMessage: '拒絕時必須提供原因',
    })
  }

  const db = getD1(event)
  const admin = event.context.admin

  try {
    // 開始交易
    const results = []

    // 檢查看護師是否存在
    const caregiver = await db
      .prepare('SELECT * FROM caregivers WHERE id = ?')
      .bind(caregiverId)
      .first()

    if (!caregiver) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到該看護師',
      })
    }

    // 檢查是否已有審核記錄
    const verification = await db
      .prepare(
        `
        SELECT * FROM caregiver_verifications 
        WHERE caregiver_id = ? 
        ORDER BY submitted_at DESC 
        LIMIT 1
      `,
      )
      .bind(caregiverId)
      .first()

    const newStatus = action === 'approve' ? 'approved' : 'rejected'
    const now = new Date().toISOString()

    if (verification) {
      // 更新現有審核記錄
      await db
        .prepare(
          `
          UPDATE caregiver_verifications
          SET 
            status = ?,
            reviewed_at = ?,
            reviewed_by = ?,
            rejection_reason = ?
          WHERE id = ?
        `,
        )
        .bind(
          newStatus,
          now,
          admin.id,
          action === 'reject' ? reason : null,
          verification.id,
        )
        .run()
    } else {
      // 建立新的審核記錄
      await db
        .prepare(
          `
          INSERT INTO caregiver_verifications (
            id, caregiver_id, status, submitted_at, 
            reviewed_at, reviewed_by, rejection_reason
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        )
        .bind(
          nanoid(),
          caregiverId,
          newStatus,
          now,
          now,
          admin.id,
          action === 'reject' ? reason : null,
        )
        .run()
    }

    // 更新看護師狀態
    const caregiverStatus = action === 'approve' ? 'active' : 'inactive'
    await db
      .prepare(
        `
        UPDATE caregivers 
        SET status = ?, updated_at = ?
        WHERE id = ?
      `,
      )
      .bind(caregiverStatus, now, caregiverId)
      .run()

    // 記錄操作日誌
    await logAdminAction(
      event,
      action === 'approve' ? 'approve_caregiver' : 'reject_caregiver',
      'caregiver',
      caregiverId,
      { reason: action === 'reject' ? reason : null },
    )

    // TODO: 發送通知給看護師 (如果有通知系統)

    return {
      success: true,
      message: action === 'approve' ? '審核通過' : '審核拒絕',
      verification: {
        caregiver_id: caregiverId,
        status: newStatus,
        reviewed_at: now,
        reviewed_by: admin.id,
        rejection_reason: action === 'reject' ? reason : null,
      },
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('審核看護師錯誤:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '審核處理失敗',
    })
  }
})
