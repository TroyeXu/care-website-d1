// 管理員：審核看護師 API
import { defineEventHandler, readBody, getRouterParam } from 'h3'
import { nanoid } from 'nanoid'
import { getD1 } from '../../../utils/d1'
import {
  getCurrentAdmin,
  logAdminAction,
  hasPermission,
} from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
  createAuthorizationError,
  createNotFoundError,
  createValidationError,
} from '../../../utils/error-handler'
import {
  validateId,
  validateRequired,
  validateEnum,
} from '../../../utils/validation'
import { NotificationHelpers } from '../../../utils/notification'

export default defineEventHandler(async (event) => {
  const caregiverId = getRouterParam(event, 'id')
  const { action, reason } = await readBody(event)

  try {
    // 驗證管理員權限
    const admin = await getCurrentAdmin(event)
    if (!admin) {
      throw createAuthenticationError('未授權')
    }

    // 檢查是否有審核看護師的權限
    if (!hasPermission(admin, 'caregivers.verify')) {
      throw createAuthorizationError('無此操作權限')
    }

    // 使用統一的驗證工具
    validateId(caregiverId, 'id')
    validateRequired(action, 'action', '審核動作')
    validateEnum(action, ['approve', 'reject'], 'action', '審核動作')

    if (action === 'reject') {
      validateRequired(reason, 'reason', '拒絕原因')
    }

    const db = getD1(event)

    // 檢查看護師是否存在
    const caregiver = await db
      .prepare('SELECT * FROM caregivers WHERE id = ?')
      .bind(caregiverId)
      .first()

    if (!caregiver) {
      throw createNotFoundError('看護師', caregiverId)
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

    // 發送通知給看護師
    if (action === 'approve') {
      await NotificationHelpers.caregiverVerified(
        event,
        String(caregiver.user_id),
        caregiverId,
      )
    } else {
      await NotificationHelpers.caregiverRejected(
        event,
        String(caregiver.user_id),
        reason || '',
      )
    }

    return createSuccessResponse(
      {
        caregiver_id: caregiverId,
        status: newStatus,
        reviewed_at: now,
        reviewed_by: admin.id,
        rejection_reason: action === 'reject' ? reason : null,
      },
      action === 'approve' ? '審核通過' : '審核拒絕',
    )
  } catch (error: any) {
    handleError(error, '審核看護師')
  }
})
