// 管理員：看護師列表 API
import { defineEventHandler, getQuery, createError } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'

export default defineEventHandler(async (event) => {
  // 檢查管理員權限
  await requireAdmin(event)
  await requirePermission('caregiver.view')(event)

  const query = getQuery(event)
  const {
    status,
    search,
    city,
    verified,
    page = 1,
    limit = 20,
    sort = 'created_at',
    order = 'desc',
  } = query

  const db = getD1(event)

  try {
    // 建立查詢條件
    const conditions = []
    const params = []

    if (status) {
      conditions.push('c.status = ?')
      params.push(status)
    }

    if (search) {
      conditions.push('(u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)')
      const searchPattern = `%${search}%`
      params.push(searchPattern, searchPattern, searchPattern)
    }

    if (city) {
      conditions.push('c.city = ?')
      params.push(city)
    }

    if (verified !== undefined) {
      conditions.push('cv.status = ?')
      params.push(verified === 'true' ? 'approved' : 'pending')
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    // 計算總數
    const countQuery = `
      SELECT COUNT(DISTINCT c.id) as total
      FROM caregivers c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN caregiver_verifications cv ON c.id = cv.caregiver_id
      ${whereClause}
    `

    const countResult = await db
      .prepare(countQuery)
      .bind(...params)
      .first()
    const total = countResult?.total || 0

    // 查詢看護師列表
    const offset = (Number(page) - 1) * Number(limit)
    const listQuery = `
      SELECT 
        c.*,
        u.name,
        u.email,
        u.phone,
        u.avatar,
        cv.status as verification_status,
        cv.submitted_at,
        cv.reviewed_at,
        cv.reviewed_by,
        COUNT(DISTINCT cc.id) as cert_count,
        COUNT(DISTINCT csa.id) as service_area_count
      FROM caregivers c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN caregiver_verifications cv ON c.id = cv.caregiver_id
      LEFT JOIN caregiver_certifications cc ON c.id = cc.caregiver_id
      LEFT JOIN caregiver_service_areas csa ON c.id = csa.caregiver_id
      ${whereClause}
      GROUP BY c.id
      ORDER BY ${sort} ${order}
      LIMIT ? OFFSET ?
    `

    const listParams = [...params, Number(limit), offset]
    const result = await db
      .prepare(listQuery)
      .bind(...listParams)
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
      rating: row.rating,
      status: row.status,
      city: row.city,
      district: row.district,
      skills: row.skills ? JSON.parse(row.skills as string) : [],
      languages: row.languages ? JSON.parse(row.languages as string) : [],
      certifications_count: row.cert_count,
      service_areas_count: row.service_area_count,
      verification: {
        status: row.verification_status || 'pending',
        submitted_at: row.submitted_at,
        reviewed_at: row.reviewed_at,
        reviewed_by: row.reviewed_by,
      },
      created_at: row.created_at,
      updated_at: row.updated_at,
    }))

    return {
      success: true,
      caregivers,
      pagination: {
        total: Number(total),
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(Number(total) / Number(limit)),
      },
    }
  } catch (error) {
    console.error('取得看護師列表錯誤:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '取得看護師列表失敗',
    })
  }
})
