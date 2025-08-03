<template>
  <q-page class="app-download-page">
    <div class="hero-section">
      <div class="container">
        <h1 class="hero-title">下載 DogFriend App</h1>
        <p class="hero-subtitle">隨時隨地掌握服務進度，享受更便利的使用體驗</p>
      </div>
    </div>

    <div class="download-section">
      <div class="container">
        <div class="download-content">
          <div class="app-preview">
            <div class="phone-mockup">
              <div class="phone-screen">
                <div class="app-interface">
                  <div class="status-bar"></div>
                  <div class="app-header">
                    <div class="logo-small"></div>
                    <span>DogFriend</span>
                  </div>
                  <div class="app-content">
                    <div class="feature-item"></div>
                    <div class="feature-item"></div>
                    <div class="feature-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="download-info">
            <div class="qr-section">
              <h2 class="section-title">快速下載</h2>
              <p class="section-desc">掃描 QR Code 或點擊下方按鈕下載</p>
              
              <div class="qr-container">
                <img
                  class="qr-code"
                  src="https://api.qrserver.com/v1/create-qr-code/?data=https://www.example.com/app&size=200x200"
                  alt="App QR Code"
                  loading="lazy"
                />
                <div class="qr-overlay">
                  <q-icon name="qr_code" size="24px" color="white" />
                </div>
              </div>
            </div>

            <div class="download-buttons">
              <a href="#" class="store-button app-store">
                <div class="store-icon">
                  <q-icon name="apple" />
                </div>
                <div class="store-text">
                  <div class="store-line1">Download on the</div>
                  <div class="store-line2">App Store</div>
                </div>
              </a>
              
              <a href="#" class="store-button google-play">
                <div class="store-icon">
                  <q-icon name="android" />
                </div>
                <div class="store-text">
                  <div class="store-line1">GET IT ON</div>
                  <div class="store-line2">Google Play</div>
                </div>
              </a>
            </div>

            <div class="app-features">
              <h3 class="features-title">App 特色功能</h3>
              <ul class="features-list">
                <li><q-icon name="notifications" /> 即時推播通知</li>
                <li><q-icon name="schedule" /> 智慧排程管理</li>
                <li><q-icon name="chat" /> 線上即時沟通</li>
                <li><q-icon name="star" /> 服務評價系統</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('下載 App - DogFriend', '取得 DogFriend 行動 App 隨時掌握服務進度')
</script>

<style scoped>
.app-download-page {
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
  max-width: 600px;
  margin: 0 auto;
}

.download-section {
  padding: 80px 0;
}

.download-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.app-preview {
  display: flex;
  justify-content: center;
}

.phone-mockup {
  width: 280px;
  height: 560px;
  background: #1a1a1a;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
}

.phone-mockup::before {
  content: '';
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 6px;
  background: #333;
  border-radius: 3px;
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 30px;
  overflow: hidden;
}

.app-interface {
  height: 100%;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.status-bar {
  height: 30px;
  background: rgba(0, 0, 0, 0.1);
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

.logo-small {
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 50%;
  margin-right: 10px;
}

.app-content {
  padding: 20px;
  flex: 1;
}

.feature-item {
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  margin-bottom: 15px;
  backdrop-filter: blur(10px);
}

.download-info {
  text-align: center;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.section-desc {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
}

.qr-section {
  margin-bottom: 3rem;
}

.qr-container {
  position: relative;
  display: inline-block;
  margin: 2rem 0;
}

.qr-code {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.qr-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.download-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.store-button {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background: #000;
  color: white;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 160px;
}

.store-button:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.store-icon {
  font-size: 2rem;
  margin-right: 12px;
}

.store-text {
  text-align: left;
}

.store-line1 {
  font-size: 0.8rem;
  opacity: 0.8;
}

.store-line2 {
  font-size: 1.1rem;
  font-weight: 600;
}

.app-features {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.features-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-align: center;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  color: #6c757d;
}

.features-list li:last-child {
  border-bottom: none;
}

.features-list .q-icon {
  margin-right: 12px;
  color: #667eea;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .download-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .phone-mockup {
    width: 240px;
    height: 480px;
  }
  
  .download-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .store-button {
    width: 100%;
    max-width: 200px;
  }
}
</style>
