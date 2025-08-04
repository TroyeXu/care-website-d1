import type { CaregiverDisplay } from '~/types/caregiver'

export interface MatchingCriteria {
  location?: string
  serviceType: 'hourly' | 'shift'
  maxBudget?: number
  requiredSkills?: string[]
  requiredLicenses?: string[]
  patientConditions?: string[]
  preferredGender?: string
  availabilityNeeded?: string
  urgencyLevel?: 'normal' | 'urgent' | 'emergency'
}

export interface MatchResult {
  caregiver: CaregiverDisplay
  score: number
  matchReasons: string[]
  warnings: string[]
  priceEstimate: number
}

export const useMatchingAlgorithm = () => {
  const calculateLocationScore = (
    caregiver: CaregiverDisplay,
    criteria: MatchingCriteria,
  ): number => {
    if (!criteria.location || !caregiver.location) return 0

    // Simple location matching - in a real app, you'd use geo-coordinates
    if (caregiver.location.includes(criteria.location)) {
      return 30 // High score for exact location match
    } else if (
      caregiver.location.includes('台北') &&
      criteria.location.includes('台北')
    ) {
      return 20 // Medium score for same city
    } else if (
      caregiver.location.includes('新北') &&
      criteria.location.includes('台北')
    ) {
      return 15 // Lower score for nearby areas
    }

    return 5 // Base score for different areas
  }

  const calculateSkillScore = (
    caregiver: CaregiverDisplay,
    criteria: MatchingCriteria,
  ): number => {
    if (!criteria.requiredSkills || criteria.requiredSkills.length === 0)
      return 0

    let score = 0
    const caregiverSkills = (caregiver.skills || '').toLowerCase()

    for (const skill of criteria.requiredSkills) {
      if (caregiverSkills.includes(skill.toLowerCase())) {
        score += 15 // 15 points per matching skill
      }
    }

    return Math.min(score, 40) // Cap at 40 points
  }

  const calculateLicenseScore = (
    caregiver: CaregiverDisplay,
    criteria: MatchingCriteria,
  ): number => {
    if (!criteria.requiredLicenses || criteria.requiredLicenses.length === 0)
      return 0

    let score = 0

    for (const license of criteria.requiredLicenses) {
      if ((caregiver.licenses || []).some((cl) => cl.includes(license))) {
        score += 20 // 20 points per matching license
      }
    }

    return Math.min(score, 50) // Cap at 50 points
  }

  const calculateExperienceScore = (
    caregiver: CaregiverDisplay,
    criteria: MatchingCriteria,
  ): number => {
    // Extract years of experience from experience string
    const experienceMatch = (caregiver.experience || '').match(/(\d+)年/)
    const firstMatch = experienceMatch?.[1]
    const years = firstMatch ? parseInt(firstMatch, 10) : 0

    if (years >= 8) return 25
    if (years >= 5) return 20
    if (years >= 3) return 15
    if (years >= 1) return 10
    return 5
  }

  const calculateRatingScore = (caregiver: CaregiverDisplay): number => {
    // Rating contributes up to 25 points (5.0 rating = 25 points)
    return Math.round((caregiver.rating || 0) * 5)
  }

  const calculateBudgetScore = (
    caregiver: CaregiverDisplay,
    criteria: MatchingCriteria,
  ): number => {
    if (!criteria.maxBudget) return 0

    const price =
      criteria.serviceType === 'shift'
        ? caregiver.shift_rate || caregiver.hourly_rate * 12
        : caregiver.hourly_rate || 0

    if (!price) return 0 // No price information available

    if (price <= criteria.maxBudget * 0.8) return 20 // Under budget
    if (price <= criteria.maxBudget) return 10 // Within budget
    if (price <= criteria.maxBudget * 1.2) return 5 // Slightly over budget
    return -10 // Significantly over budget
  }

  const calculateAvailabilityScore = (
    caregiver: CaregiverDisplay,
    criteria: MatchingCriteria,
  ): number => {
    if (!criteria.availabilityNeeded) return 0

    const availability = (caregiver.available || '').toLowerCase()
    const needed = criteria.availabilityNeeded.toLowerCase()

    if (availability.includes('全天')) return 20 // Available 24/7
    if (needed.includes('週') && availability.includes('週')) return 15 // Weekly availability match
    if (needed.includes('夜') && availability.includes('夜')) return 15 // Night availability match

    return 5 // Base availability score
  }

  const calculateSpecialNeedsScore = (
    caregiver: CaregiverDisplay,
    criteria: MatchingCriteria,
  ): number => {
    if (!criteria.patientConditions || criteria.patientConditions.length === 0)
      return 0

    let score = 0
    const caregiverSkills = (caregiver.skills || '').toLowerCase()
    const caregiverExperience = (caregiver.experience || '').toLowerCase()

    for (const condition of criteria.patientConditions) {
      const conditionLower = condition.toLowerCase()

      if (
        caregiverSkills.includes(conditionLower) ||
        caregiverExperience.includes(conditionLower)
      ) {
        score += 25 // High score for specific condition experience
      } else if (
        conditionLower.includes('失智') &&
        caregiverSkills.includes('失智')
      ) {
        score += 30 // Extra high for dementia care
      } else if (
        conditionLower.includes('復健') &&
        caregiverSkills.includes('復健')
      ) {
        score += 25 // High for rehabilitation
      }
    }

    return Math.min(score, 60) // Cap at 60 points
  }

  const generateMatchReasons = (
    caregiver: CaregiverDisplay,
    criteria: MatchingCriteria,
    scores: Record<string, number>,
  ): string[] => {
    const reasons: string[] = []

    if ((scores.rating || 0) >= 20) {
      reasons.push(`⭐ 高評分看護師 (${caregiver.rating || 0}/5.0)`)
    }

    if ((scores.location || 0) >= 20) {
      reasons.push(`📍 地理位置優勢 - ${caregiver.location}`)
    }

    if ((scores.skills || 0) >= 20) {
      reasons.push(`🎯 專業技能匹配度高`)
    }

    if ((scores.licenses || 0) >= 30) {
      reasons.push(`🏆 具備所需專業證照`)
    }

    if ((scores.experience || 0) >= 20) {
      reasons.push(`💼 豐富的照護經驗`)
    }

    if ((scores.specialNeeds || 0) >= 25) {
      reasons.push(`🔬 具備特殊照護經驗`)
    }

    if ((scores.budget || 0) >= 10) {
      reasons.push(`💰 費用合理`)
    }

    if ((scores.availability || 0) >= 15) {
      reasons.push(`⏰ 時間安排彈性`)
    }

    return reasons
  }

  const generateWarnings = (
    caregiver: CaregiverDisplay,
    criteria: MatchingCriteria,
    scores: Record<string, number>,
  ): string[] => {
    const warnings: string[] = []

    if ((scores.budget || 0) < 0) {
      warnings.push('💸 費用可能超出預算')
    }

    if ((scores.location || 0) < 10) {
      warnings.push('🚗 可能需要較長通勤時間')
    }

    if (
      (scores.skills || 0) === 0 &&
      criteria.requiredSkills &&
      criteria.requiredSkills.length > 0
    ) {
      warnings.push('⚠️ 未完全匹配所需技能')
    }

    if ((caregiver.rating || 0) < 4.0) {
      warnings.push('📊 評分相對較低，建議查看詳細評價')
    }

    return warnings
  }

  const calculateMatchScore = (
    caregiver: CaregiverDisplay,
    criteria: MatchingCriteria,
  ): MatchResult => {
    const scores = {
      location: calculateLocationScore(caregiver, criteria),
      skills: calculateSkillScore(caregiver, criteria),
      licenses: calculateLicenseScore(caregiver, criteria),
      experience: calculateExperienceScore(caregiver, criteria),
      rating: calculateRatingScore(caregiver),
      budget: calculateBudgetScore(caregiver, criteria),
      availability: calculateAvailabilityScore(caregiver, criteria),
      specialNeeds: calculateSpecialNeedsScore(caregiver, criteria),
    }

    // Apply urgency multiplier
    let urgencyMultiplier = 1
    if (criteria.urgencyLevel === 'urgent') urgencyMultiplier = 1.1
    if (criteria.urgencyLevel === 'emergency') urgencyMultiplier = 1.2

    const totalScore = Math.round(
      Object.values(scores).reduce((sum, score) => sum + score, 0) *
        urgencyMultiplier,
    )

    const matchReasons = generateMatchReasons(caregiver, criteria, scores)
    const warnings = generateWarnings(caregiver, criteria, scores)

    const priceEstimate =
      criteria.serviceType === 'shift'
        ? caregiver.shift_rate || caregiver.hourly_rate * 12 || 0
        : caregiver.hourly_rate || 0

    return {
      caregiver,
      score: Math.max(0, Math.min(100, totalScore)), // Normalize to 0-100
      matchReasons,
      warnings,
      priceEstimate,
    }
  }

  const findMatches = (
    caregivers: CaregiverDisplay[],
    criteria: MatchingCriteria,
    limit: number = 3,
  ): MatchResult[] => {
    const matches = caregivers
      .map((caregiver) => calculateMatchScore(caregiver, criteria))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)

    return matches
  }

  const getMatchingTips = (criteria: MatchingCriteria): string[] => {
    const tips: string[] = []

    if (!criteria.location) {
      tips.push('💡 提供地理位置可以找到更近的看護師')
    }

    if (criteria.maxBudget && criteria.maxBudget < 250) {
      tips.push('💡 提高預算可能會有更多優質選擇')
    }

    if (!criteria.requiredSkills || criteria.requiredSkills.length === 0) {
      tips.push('💡 明確說明需要的專業技能可以提高匹配精度')
    }

    if (criteria.urgencyLevel === 'emergency') {
      tips.push('⚡ 緊急預約可能需要支付額外費用')
    }

    return tips
  }

  return {
    calculateMatchScore,
    findMatches,
    getMatchingTips,
  }
}
