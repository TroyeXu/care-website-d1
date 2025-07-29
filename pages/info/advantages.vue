<template>
  <q-page class="advantages-page">
    <div class="hero-section">
      <div class="container">
        <h1 class="hero-title">服務優勢</h1>
        <p class="hero-subtitle">選擇 DogFriend 的四大核心優勢</p>
      </div>
    </div>

    <div class="advantages-section">
      <div class="container">
        <div class="advantages-grid">
          <div
            v-for="(adv, i) in advantages"
            :key="i"
            class="advantage-card"
            :class="`advantage-${i + 1}`"
          >
            <div class="advantage-icon">
              <q-icon :name="adv.icon" />
            </div>
            <h3 class="advantage-title">{{ adv.title }}</h3>
            <p class="advantage-desc">{{ adv.desc }}</p>
            <div class="advantage-number">{{ String(i + 1).padStart(2, '0') }}</div>
          </div>
        </div>

        <div class="cta-section">
          <div class="cta-content">
            <h2 class="cta-title">準備好體驗優質服務了嗎？</h2>
            <p class="cta-subtitle">立即註冊，享受專業照護媒合服務</p>
            <q-btn
              size="lg"
              color="primary"
              to="/auth/register"
              label="立即開始體驗"
              rounded
              unelevated
              class="cta-button"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('服務優勢 - DogFriend', '了解選擇 DogFriend 的四大優勢')
const advantages = [
  { title: '快速媒合', desc: '透過演算法即時找到合適看護', icon: 'bolt' },
  { title: '專業審核', desc: '嚴格把關每位看護的資格', icon: 'verified' },
  { title: '彈性排班', desc: '依照需求安排看護時段', icon: 'schedule' },
  { title: '完善保障', desc: '客服與意外保險讓您更放心', icon: 'security' },
]
</script>

<style scoped>
.advantages-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0 60px;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  max-width: 500px;
  margin: 0 auto;
}

.advantages-section {
  padding: 80px 0;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.advantage-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.advantage-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.advantage-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.advantage-1:hover { box-shadow: 0 20px 60px rgba(255, 193, 7, 0.3); }
.advantage-2:hover { box-shadow: 0 20px 60px rgba(40, 167, 69, 0.3); }
.advantage-3:hover { box-shadow: 0 20px 60px rgba(23, 162, 184, 0.3); }
.advantage-4:hover { box-shadow: 0 20px 60px rgba(220, 53, 69, 0.3); }

.advantage-1::before { background: linear-gradient(135deg, #ffc107, #ff8a00); }
.advantage-2::before { background: linear-gradient(135deg, #28a745, #20c997); }
.advantage-3::before { background: linear-gradient(135deg, #17a2b8, #007bff); }
.advantage-4::before { background: linear-gradient(135deg, #dc3545, #e83e8c); }

.advantage-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.3s ease;
}

.advantage-1 .advantage-icon { background: linear-gradient(135deg, #ffc107, #ff8a00); }
.advantage-2 .advantage-icon { background: linear-gradient(135deg, #28a745, #20c997); }
.advantage-3 .advantage-icon { background: linear-gradient(135deg, #17a2b8, #007bff); }
.advantage-4 .advantage-icon { background: linear-gradient(135deg, #dc3545, #e83e8c); }

.advantage-card:hover .advantage-icon {
  transform: scale(1.1) rotateY(360deg);
}

.advantage-icon .q-icon {
  font-size: 2.5rem;
  color: white;
}

.advantage-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.advantage-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 0;
}

.advantage-number {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: #667eea;
}

.cta-section {
  text-align: center;
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.cta-subtitle {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: none;
  min-width: 200px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .advantage-card {
    padding: 2rem 1.5rem;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
  
  .cta-section {
    padding: 2rem 1.5rem;
  }
}
</style>
