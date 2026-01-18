import type { D1Database } from '@cloudflare/workers-types'
import { calculateOffset, calculatePagination } from '../api-response'

interface AdminCaregiverListParams {
  status?: string
  search?: string
  city?: string
  verified?: string
  page?: number
  limit?: number
  sort?: string
  order?: string
}

export const getAdminCaregiversList = async (
  db: D1Database,
  queryParams: AdminCaregiverListParams,
) => {
  const {
    status,
    search,
    city,
    verified,
    page = 1,
    limit = 20,
    sort = 'created_at',
    order = 'desc',
  } = queryParams

  // 建立查詢條件
  const conditions: string[] = []
  const params: any[] = []

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
  const total = (countResult?.total as number) || 0

  // 查詢看護師列表
  const offset = calculateOffset(Number(page), Number(limit))
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
  const caregivers = (result.results || []).map((row: any) => ({
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

  const pagination = calculatePagination(
    Number(total),
    Number(page),
    Number(limit),
  )

  return {
    caregivers,
    pagination,
  }
}
