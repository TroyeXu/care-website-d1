// 管理員：待審核看護師列表 API
import { defineEventHandler, getQuery } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('caregiver.verify')(event)

  const query = getQuery(event)
  const { page = 1, limit = 20 } = query

  const db = getD1(event)

  try {
    // 查詢待審核的看護師
    const offset = (Number(page) - 1) * Number(limit)

    // 計算總數
    const countResult = await db
      .prepare(
        `
        SELECT COUNT(*) as total
        FROM caregivers c
        LEFT JOIN caregiver_verifications cv ON c.id = cv.caregiver_id
        WHERE cv.status = 'pending' OR cv.status IS NULL
      `,
      )
      .first()

    const total = countResult?.total || 0

    // 查詢列表
    const result = await db
      .prepare(
        `
        SELECT 
          c.*,
          u.name,
          u.email,
          u.phone,
          u.avatar,
          cv.submitted_at,
          cv.documents,
          COUNT(DISTINCT cc.id) as cert_count
        FROM caregivers c
        JOIN users u ON c.user_id = u.id
        LEFT JOIN caregiver_verifications cv ON c.id = cv.caregiver_id
        LEFT JOIN caregiver_certifications cc ON c.id = cc.caregiver_id
        WHERE cv.status = 'pending' OR cv.status IS NULL
        GROUP BY c.id
        ORDER BY cv.submitted_at ASC
        LIMIT ? OFFSET ?
      `,
      )
      .bind(Number(limit), offset)
      .all()

    // 格式化資料
    const caregivers = result.results.map((row) => ({
      id: row.id,
      user_id: row.user_id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      avatar: row.avatar,
      bio: row.bio,
      experience_years: row.experience_years,
      hourly_rate: row.hourly_rate,
      city: row.city,
      district: row.district,
      skills: row.skills ? JSON.parse(row.skills as string) : [],
      languages: row.languages ? JSON.parse(row.languages as string) : [],
      submitted_at: row.submitted_at || row.created_at,
      documents: row.documents ? JSON.parse(row.documents as string) : [],
      certifications_count: row.cert_count,
      created_at: row.created_at,
    }))

    return {
      success: true,
      pending: caregivers,
      pagination: {
        total: Number(total),
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(Number(total) / Number(limit)),
      },
    }
  } catch (error) {
    console.error('取得待審核看護師列表錯誤:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '取得待審核列表失敗',
    })
  }
})
