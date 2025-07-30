import { mockStore } from '~/server/utils/mockStore'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { area, specialty, minRate, maxRate } = query

  let caregivers = mockStore.caregivers.getAll()
  
  // 根據服務區域篩選
  if (area) {
    caregivers = caregivers.filter(c => 
      c.service_areas.includes(area as string)
    )
  }
  
  // 根據專長篩選
  if (specialty) {
    caregivers = caregivers.filter(c => 
      c.specialties.includes(specialty as string)
    )
  }
  
  // 根據時薪篩選
  if (minRate) {
    caregivers = caregivers.filter(c => 
      c.hourly_rate >= Number(minRate)
    )
  }
  
  if (maxRate) {
    caregivers = caregivers.filter(c => 
      c.hourly_rate <= Number(maxRate)
    )
  }

  return {
    caregivers,
    total: caregivers.length
  }
})