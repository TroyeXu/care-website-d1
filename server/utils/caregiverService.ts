import type { D1Database } from '@cloudflare/workers-types'

interface CaregiverListParams {
  city?: string
  district?: string
  specialty?: string
  minRate?: number
  maxRate?: number
  minRating?: number
  experienceYears?: number
  gender?: string
  sortBy?: string
  page?: number
  limit?: number
  q?: string
}

export const getCaregiversList = async (
  db: D1Database,
  queryParams: CaregiverListParams,
) => {
  const {
    city,
    district,
    specialty,
    minRate,
    maxRate,
    minRating,
    experienceYears,
    gender,
    sortBy = 'rating',
    page = 1,
    limit = 20,
    q,
  } = queryParams

  const pageNum = Number(page)
  const limitNum = Number(limit)

  // Note: calculateOffset is auto-imported from utils/api-response
  const offset = calculateOffset(pageNum, limitNum)

  // 建立查詢條件
  const conditions = ['c.status = "active"']
  const params: any[] = []

  // 時薪範圍篩選
  if (minRate) {
    conditions.push('c.hourly_rate >= ?')
    params.push(Number(minRate))
  }

  if (maxRate) {
    conditions.push('c.hourly_rate <= ?')
    params.push(Number(maxRate))
  }

  // 評分篩選
  if (minRating) {
    conditions.push('c.rating >= ?')
    params.push(Number(minRating))
  }

  // 經驗年數篩選
  if (experienceYears) {
    conditions.push('c.experience_years >= ?')
    params.push(Number(experienceYears))
  }

  // 性別篩選
  if (gender) {
    conditions.push('u.gender = ?')
    params.push(gender)
  }

  // 服務區域篩選（使用子查詢）
  if (city || district) {
    let areaCondition =
      'c.id IN (SELECT caregiver_id FROM service_areas WHERE 1=1'
    if (city) {
      areaCondition += ' AND city = ?'
      params.push(city)
    }
    if (district) {
      areaCondition += ' AND district = ?'
      params.push(district)
    }
    areaCondition += ')'
    conditions.push(areaCondition)
  }

  // 專長篩選（使用子查詢）
  if (specialty) {
    conditions.push(
      'c.id IN (SELECT caregiver_id FROM specialties WHERE name = ? OR category = ?)',
    )
    params.push(specialty, specialty)
  }

  // 關鍵字搜尋
  if (q) {
    const searchPattern = `%${q}%`
    conditions.push(
      '(u.name LIKE ? OR c.bio LIKE ? OR c.id IN (SELECT caregiver_id FROM specialties WHERE name LIKE ?))',
    )
    params.push(searchPattern, searchPattern, searchPattern)
  }

  const whereClause = conditions.join(' AND ')

  // 排序設定
  let orderBy = 'c.rating DESC, c.total_reviews DESC' // 預設按評分排序
  switch (sortBy) {
    case 'price_low':
      orderBy = 'c.hourly_rate ASC'
      break
    case 'price_high':
      orderBy = 'c.hourly_rate DESC'
      break
    case 'experience':
      orderBy = 'c.experience_years DESC'
      break
    case 'reviews':
      orderBy = 'c.total_reviews DESC'
      break
  }

  // 查詢總數
  const countQuery = `
    SELECT COUNT(DISTINCT c.id) as total 
    FROM caregivers c
    LEFT JOIN users u ON c.user_id = u.id
    WHERE ${whereClause}
  `
  const countStmt =
    params.length > 0
      ? db.prepare(countQuery).bind(...params)
      : db.prepare(countQuery)
  const countResult = (await countStmt.first()) as { total: number }

  // 查詢看護列表
  const listQuery = `
    SELECT DISTINCT
      c.*,
      u.name,
      u.email,
      u.phone,
      u.avatar,
      u.gender,
      u.address
    FROM caregivers c
    LEFT JOIN users u ON c.user_id = u.id
    WHERE ${whereClause}
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `

  const listStmt = db.prepare(listQuery).bind(...params, limitNum, offset)

  const results = await listStmt.all()

  // 為每個看護查詢相關資料
  const caregiversWithDetails = await Promise.all(
    (results.results || []).map(async (caregiver: any) => {
      // 批量查詢相關資料
      const [certifications, specialties, serviceAreas, recentReviews] =
        await Promise.all([
          // 證照
          db
            .prepare(
              `
          SELECT name, issuer, verified 
          FROM certifications 
          WHERE caregiver_id = ? AND verified = 1
          LIMIT 5
        `,
            )
            .bind(caregiver.id)
            .all(),

          // 專長
          db
            .prepare(
              `
          SELECT name, category 
          FROM specialties 
          WHERE caregiver_id = ?
          LIMIT 10
        `,
            )
            .bind(caregiver.id)
            .all(),

          // 服務區域
          db
            .prepare(
              `
          SELECT city, district 
          FROM service_areas 
          WHERE caregiver_id = ?
        `,
            )
            .bind(caregiver.id)
            .all(),

          // 最近評價
          db
            .prepare(
              `
          SELECT rating, comment, created_at 
          FROM reviews 
          WHERE caregiver_id = ?
          ORDER BY created_at DESC
          LIMIT 3
        `,
            )
            .bind(caregiver.id)
            .all(),
        ])

      return {
        id: caregiver.id,
        user_id: caregiver.user_id,
        name: caregiver.name,
        avatar: caregiver.avatar,
        gender: caregiver.gender,
        address: caregiver.address,

        // 專業資訊
        hourly_rate: caregiver.hourly_rate,
        experience_years: caregiver.experience_years,
        bio: caregiver.bio,

        // 評價與統計
        rating: caregiver.rating || 0,
        total_reviews: caregiver.total_reviews || 0,
        completion_rate: caregiver.completion_rate || 0,
        response_rate: caregiver.response_rate || 0,

        // 驗證狀態
        background_checked: caregiver.background_checked,
        drug_test_passed: caregiver.drug_test_passed,

        // 關聯資料
        certifications:
          certifications.results?.map((c: any) => ({
            name: c.name,
            issuer: c.issuer,
            verified: c.verified,
          })) || [],

        specialties:
          specialties.results?.map((s: any) => ({
            name: s.name,
            category: s.category,
          })) || [],

        service_areas:
          serviceAreas.results?.map((a: any) => ({
            city: a.city,
            district: a.district,
          })) || [],

        recent_reviews:
          recentReviews.results?.map((r: any) => ({
            rating: r.rating,
            comment: r.comment,
            created_at: r.created_at,
          })) || [],

        // 狀態
        status: caregiver.status,
        created_at: caregiver.created_at,
      }
    }),
  )

  // 計算分頁資訊
  const pagination = calculatePagination(
    Number(countResult?.total || 0),
    pageNum,
    limitNum,
  )

  return {
    data: caregiversWithDetails,
    pagination,
    meta: {
      filters: {
        city,
        district,
        specialty,
        minRate,
        maxRate,
        minRating,
        experienceYears,
        gender,
        sortBy,
      },
    },
  }
}
