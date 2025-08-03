import useCareState from './useCareState'
import useCareFilters from './useCareFilters'
import useCostCalculations from './useCostCalculations'
import useParticleEffects from './useParticleEffects'
import useCareActions from './useCareActions'
import useChart from './useChart'

export function useCareService() {
  const state = useCareState()
  const filters = useCareFilters(state)
  const calculations = useCostCalculations(state)
  const particles = useParticleEffects(state, calculations)
  const actions = useCareActions(state, calculations, particles)
  const chart = useChart(calculations)

  return {
    ...state,
    ...filters,
    ...calculations,
    ...particles,
    ...actions,
    ...chart
  }
}
