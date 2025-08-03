export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { area, specialty, minRate, maxRate } = query
  
  // 獲取 D1 實例
  const { cloudflare } = event.context
  const db = cloudflare?.env?.DB
  
  // 如果沒有 D1（開發環境），返回測試資料
  if (!db) {
    return {
      caregivers: [
        {
          id: 'cg-001',
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
      ],
      total: 1
    }
  }
  
  try {
    // 建立基本查詢
    let sql = 'SELECT * FROM caregivers WHERE 1=1'
    const params: any[] = []
    
    // 根據時薪篩選
    if (minRate) {
      sql += ' AND hourly_rate >= ?'
      params.push(Number(minRate))
    }
    
    if (maxRate) {
      sql += ' AND hourly_rate <= ?'
      params.push(Number(maxRate))
    }
    
    sql += ' ORDER BY rating DESC, reviews_count DESC'
    
    // 查詢照護員
    const stmt = db.prepare(sql)
    params.forEach((param, index) => stmt.bind(index + 1, param))
    const caregivers = await stmt.all()
    
    // 為每個照護員查詢相關資料
    let caregiversWithDetails = await Promise.all(
      caregivers.results.map(async (caregiver: any) => {
        // 查詢證照
        const certifications = await db
          .prepare('SELECT certification FROM caregiver_certifications WHERE caregiver_id = ?')
          .bind(caregiver.id)
          .all()
        
        // 查詢語言
        const languages = await db
          .prepare('SELECT language FROM caregiver_languages WHERE caregiver_id = ?')
          .bind(caregiver.id)
          .all()
        
        // 查詢專長
        const specialties = await db
          .prepare('SELECT specialty FROM caregiver_specialties WHERE caregiver_id = ?')
          .bind(caregiver.id)
          .all()
        
        // 查詢服務區域
        const service_areas = await db
          .prepare('SELECT area FROM caregiver_service_areas WHERE caregiver_id = ?')
          .bind(caregiver.id)
          .all()
        
        return {
          ...caregiver,
          certifications: certifications.results.map((c: any) => c.certification),
          languages: languages.results.map((l: any) => l.language),
          specialties: specialties.results.map((s: any) => s.specialty),
          service_areas: service_areas.results.map((a: any) => a.area)
        }
      })
    )
    
    // 根據服務區域篩選
    if (area) {
      caregiversWithDetails = caregiversWithDetails.filter(c => 
        c.service_areas.includes(area as string)
      )
    }
    
    // 根據專長篩選
    if (specialty) {
      caregiversWithDetails = caregiversWithDetails.filter(c => 
        c.specialties.includes(specialty as string)
      )
    }
    
    return {
      caregivers: caregiversWithDetails,
      total: caregiversWithDetails.length
    }
  } catch (error) {
    console.error('Database error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '資料庫查詢錯誤'
    })
  }
})