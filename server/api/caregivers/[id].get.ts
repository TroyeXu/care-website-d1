export default defineEventHandler(async (event) => {
  const caregiverId = getRouterParam(event, 'id')
  
  // 獲取 D1 實例
  const { cloudflare } = event.context
  const db = cloudflare?.env?.DB
  
  // 如果沒有 D1（開發環境），返回測試資料
  if (!db) {
    return {
      id: caregiverId,
      name: '張美麗',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 4.8,
      reviews_count: 124,
      hourly_rate: 350,
      experience_years: 5,
      bio: '專業照護服務員，擁有5年以上照護經驗',
      certifications: ['照顧服務員', '急救證照'],
      languages: ['中文', '台語'],
      specialties: ['失智症照護', '復健協助'],
      service_areas: ['台北市', '新北市']
    }
  }
  
  try {
    // 查詢照護員基本資料
    const caregiver = await db
      .prepare('SELECT * FROM caregivers WHERE id = ?')
      .bind(caregiverId)
      .first()
    
    if (!caregiver) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到該照護員'
      })
    }
    
    // 查詢證照
    const certifications = await db
      .prepare('SELECT certification FROM caregiver_certifications WHERE caregiver_id = ?')
      .bind(caregiverId)
      .all()
    
    // 查詢語言
    const languages = await db
      .prepare('SELECT language FROM caregiver_languages WHERE caregiver_id = ?')
      .bind(caregiverId)
      .all()
    
    // 查詢專長
    const specialties = await db
      .prepare('SELECT specialty FROM caregiver_specialties WHERE caregiver_id = ?')
      .bind(caregiverId)
      .all()
    
    // 查詢服務區域
    const service_areas = await db
      .prepare('SELECT area FROM caregiver_service_areas WHERE caregiver_id = ?')
      .bind(caregiverId)
      .all()
    
    // 查詢評價
    const reviews = await db
      .prepare(`
        SELECT r.*, b.patient_name 
        FROM reviews r
        JOIN bookings b ON r.booking_id = b.id
        WHERE r.caregiver_id = ?
        ORDER BY r.created_at DESC
        LIMIT 10
      `)
      .bind(caregiverId)
      .all()
    
    return {
      ...caregiver,
      certifications: certifications.results.map((c: any) => c.certification),
      languages: languages.results.map((l: any) => l.language),
      specialties: specialties.results.map((s: any) => s.specialty),
      service_areas: service_areas.results.map((a: any) => a.area),
      reviews: reviews.results
    }
  } catch (error: any) {
    if (error.statusCode === 404) {
      throw error
    }
    
    console.error('Database error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '資料庫查詢錯誤'
    })
  }
})