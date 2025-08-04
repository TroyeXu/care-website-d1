import { watch, onMounted, type Ref } from 'vue'
import { gsap } from 'gsap'

interface ParticleState {
  totalCostElement: Ref<HTMLElement | null>
  previousTotalCost: Ref<number>
  isNightShift: Ref<boolean>
  isUrgent: Ref<boolean>
  isDoubleUrgent: Ref<boolean>
}

interface ParticleCalculations {
  totalCost: Ref<number>
}

export default function useParticleEffects(
  state: ParticleState,
  calculations: ParticleCalculations,
) {
  const { totalCost } = calculations
  const {
    totalCostElement,
    previousTotalCost,
    isNightShift,
    isUrgent,
    isDoubleUrgent,
  } = state

  function particlesLoaded(container: unknown) {
    console.log('粒子容器已加載', container)
  }

  const particlesOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      color: { value: ['#4A90E2', '#50C8B4', '#89253e'] },
      links: {
        color: '#c8c8c8',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: true,
        speed: 1,
        straight: false,
      },
      number: { density: { enable: true, area: 800 }, value: 30 },
      opacity: { value: 0.3 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }

  function createParticleExplosion(x: number, y: number, color: string) {
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.left = '0'
    container.style.top = '0'
    container.style.width = '100%'
    container.style.height = '100%'
    container.style.pointerEvents = 'none'
    container.style.zIndex = '9999'
    document.body.appendChild(container)

    const particleCount = 20
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.style.position = 'absolute'
      particle.style.width = `${Math.random() * 6 + 2}px`
      particle.style.height = particle.style.width
      particle.style.backgroundColor =
        color === 'primary'
          ? '#1976d2'
          : color === 'secondary'
            ? '#26a69a'
            : color === 'deep-orange'
              ? '#ff5722'
              : `#${Math.floor(Math.random() * 16777215).toString(16)}`
      particle.style.borderRadius = '50%'
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`
      container.appendChild(particle)
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 100 + 50
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed
      gsap.to(particle, {
        x: vx,
        y: vy,
        opacity: 0,
        duration: 0.6 + Math.random() * 0.4,
        ease: 'power1.out',
        onComplete: () => {
          container.removeChild(particle)
          if (container.childElementCount === 0) {
            document.body.removeChild(container)
          }
        },
      })
    }
  }

  watch(totalCost, (newVal, oldVal) => {
    previousTotalCost.value = oldVal
    if (totalCostElement.value) {
      gsap.killTweensOf(totalCostElement.value)
      const color =
        newVal > oldVal ? '#4caf50' : newVal < oldVal ? '#f44336' : 'inherit'
      gsap.to(totalCostElement.value, {
        color,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(totalCostElement.value, {
            color: 'inherit',
            duration: 0.5,
            delay: 0.5,
            ease: 'power2.inOut',
          })
        },
      })
      gsap.fromTo(
        totalCostElement.value,
        { scale: 1 },
        {
          scale: 1.2,
          duration: 0.2,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        },
      )
    }
  })

  onMounted(() => {
    if (totalCostElement.value) {
      gsap.fromTo(
        totalCostElement.value,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' },
      )
    }
  })

  return {
    particlesLoaded,
    particlesOptions,
    createParticleExplosion,
  }
}
