import { computed, type Ref } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  type TooltipItem
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend)

interface SelectedItem {
  code: string
  name: string
  price: number
  category: string
  subCategory: string
}

interface ChartCalculations {
  selectedItems: Ref<SelectedItem[]>
  totalCost: Ref<number>
  formatCurrency: (value: number) => string
}

export default function useChart(calculations: ChartCalculations) {
  const { selectedItems, totalCost, formatCurrency } = calculations

  const chartData = computed(() => {
    if (selectedItems.value.length === 0) {
      return { labels: [], datasets: [] }
    }
    const subCategoryCosts: Record<string, number> = {}
    selectedItems.value.forEach(item => {
      if (!subCategoryCosts[item.subCategory]) {
        subCategoryCosts[item.subCategory] = 0
      }
      subCategoryCosts[item.subCategory] += item.price
    })
    const labels = Object.keys(subCategoryCosts)
    const data = labels.map(label => subCategoryCosts[label] || 0)
    const backgroundColors = ['#4A90E2', '#50C8B4', '#F5A623', '#D0021B', '#9013FE', '#BD10E0', '#7ED321']
    return { labels, datasets: [{ data, backgroundColor: backgroundColors.slice(0, labels.length), borderWidth: 0 }] }
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, padding: 15, font: { size: 12 } }
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'doughnut'>) {
            const label = context.label || ''
            const value = (context.raw as number) || 0
            const percentage = ((value / totalCost.value) * 100).toFixed(1)
            return `${label}: ${formatCurrency(value)} 元 (${percentage}%)`
          }
        }
      }
    }
  }

  return { chartData, chartOptions }
}
