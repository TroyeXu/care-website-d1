<template>
  <div class="calculator-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg-pattern"></div>
      <div class="hero-content">
        <div class="container">
          <div class="hero-text-center">
            <div class="hero-icon-wrapper">
              <q-icon name="calculate" class="hero-icon" />
            </div>
            <h1 class="hero-title">專業護理費用計算器</h1>
            <p class="hero-subtitle">
              智能計算，透明收費，讓您清楚了解每一筆護理服務費用
            </p>
            <div class="hero-badges">
              <q-chip color="white" text-color="primary" icon="check_circle">
                即時計算
              </q-chip>
              <q-chip color="white" text-color="primary" icon="visibility">
                透明收費
              </q-chip>
              <q-chip color="white" text-color="primary" icon="security">
                專業可靠
              </q-chip>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,208C960,235,1056,245,1152,224C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <!-- 計算器主卡片 -->
        <div class="calculator-main-card">
          <q-card class="modern-card main-calculator" flat>
            <q-card-section class="card-header">
              <div class="section-title">
                <q-icon name="tune" class="title-icon" />
                <h3>服務選擇</h3>
              </div>
            </q-card-section>

            <q-card-section>
              <!-- 服務類型選擇 -->
              <div class="service-type-selector">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <div
                      class="type-card"
                      :class="{ active: selectedCategory === '鐘點制' }"
                      @click="selectedCategory = '鐘點制'"
                    >
                      <div class="type-icon">
                        <q-icon name="schedule" />
                      </div>
                      <h4>鐘點制</h4>
                      <p>彈性時間，按小時計費</p>
                      <div
                        v-if="selectedCategory === '鐘點制'"
                        class="type-badge"
                      >
                        <q-icon name="check" />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div
                      class="type-card"
                      :class="{ active: selectedCategory === '包班制' }"
                      @click="selectedCategory = '包班制'"
                    >
                      <div class="type-icon">
                        <q-icon name="event" />
                      </div>
                      <h4>包班制</h4>
                      <p>長期照護，按班次計費</p>
                      <div
                        v-if="selectedCategory === '包班制'"
                        class="type-badge"
                      >
                        <q-icon name="check" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-mt-md q-col-gutter-sm">
                <div class="col-12 col-sm-8">
                  <q-input
                    v-model="searchText"
                    label="搜尋服務項目"
                    outlined
                    clearable
                    class="search-input"
                  >
                    <template #prepend>
                      <q-icon name="search" color="primary" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-4">
                  <q-btn
                    color="primary"
                    icon="refresh"
                    label="重置所有選擇"
                    class="full-width"
                    outline
                    @click="resetSelections"
                  />
                </div>
              </div>
            </q-card-section>

            <!-- 統一篩選區域 -->
            <q-card-section class="q-pt-none">
              <div class="row items-center justify-between">
                <div class="text-subtitle2">篩選選項：</div>
                <q-btn
                  flat
                  dense
                  round
                  :icon="showFilters ? 'expand_less' : 'expand_more'"
                  @click="showFilters = !showFilters"
                />
              </div>
              <q-slide-transition>
                <div
                  v-show="showFilters"
                  class="filter-section q-pa-sm rounded-borders q-mt-sm"
                >
                  <!-- 價格篩選 -->
                  <div class="filter-group">
                    <div class="filter-label">價格篩選：</div>
                    <div class="row q-col-gutter-sm">
                      <div class="col-auto">
                        <q-chip
                          clickable
                          :color="
                            activeFilters.price === 100 ? 'primary' : 'grey-4'
                          "
                          :text-color="
                            activeFilters.price === 100 ? 'white' : 'black'
                          "
                          :outline="activeFilters.price !== 100"
                          @click="applyFilter('price', 100)"
                        >
                          價格 > 100元
                        </q-chip>
                      </div>
                      <div class="col-auto">
                        <q-chip
                          clickable
                          :color="
                            activeFilters.price === 50 ? 'primary' : 'grey-4'
                          "
                          :text-color="
                            activeFilters.price === 50 ? 'white' : 'black'
                          "
                          :outline="activeFilters.price !== 50"
                          @click="applyFilter('price', 50)"
                        >
                          價格 > 50元
                        </q-chip>
                      </div>
                      <div class="col-auto">
                        <q-chip
                          clickable
                          :color="
                            activeFilters.price === 0 ? 'primary' : 'grey-4'
                          "
                          :text-color="
                            activeFilters.price === 0 ? 'white' : 'black'
                          "
                          :outline="activeFilters.price !== 0"
                          @click="applyFilter('price', 0)"
                        >
                          全部
                        </q-chip>
                      </div>
                    </div>
                  </div>

                  <!-- 子類別篩選 -->
                  <div class="filter-group q-mt-sm">
                    <div class="filter-label">類別篩選：</div>
                    <div class="row q-col-gutter-sm">
                      <div
                        v-for="subCat in availableSubCategories"
                        :key="subCat"
                        class="col-auto"
                      >
                        <q-chip
                          clickable
                          :color="
                            activeFilters.subCategory === subCat
                              ? 'secondary'
                              : 'grey-4'
                          "
                          :text-color="
                            activeFilters.subCategory === subCat
                              ? 'white'
                              : 'black'
                          "
                          :outline="activeFilters.subCategory !== subCat"
                          @click="applyFilter('subCategory', subCat)"
                        >
                          {{ subCat }}
                        </q-chip>
                      </div>
                      <div class="col-auto">
                        <q-chip
                          clickable
                          :color="
                            !activeFilters.subCategory ? 'secondary' : 'grey-4'
                          "
                          :text-color="
                            !activeFilters.subCategory ? 'white' : 'black'
                          "
                          :outline="activeFilters.subCategory !== null"
                          @click="applyFilter('subCategory', null)"
                        >
                          全部
                        </q-chip>
                      </div>
                    </div>
                  </div>

                  <!-- 重置篩選 -->
                  <div class="text-right q-mt-sm">
                    <q-btn
                      outline
                      size="sm"
                      color="secondary"
                      icon="filter_alt_off"
                      label="清除篩選"
                      :disable="!isAnyFilterActive"
                      @click="resetAllFilters"
                    />
                  </div>
                </div>
              </q-slide-transition>
            </q-card-section>

            <!-- 服務項目列表 -->
            <q-card-section>
              <!-- 包班制班次選擇 -->
              <div v-if="selectedCategory === '包班制'" class="q-mb-md">
                <div class="text-subtitle1 q-mb-sm">選擇班次</div>
                <div class="row q-col-gutter-md">
                  <div
                    v-for="item in shiftTypeItems"
                    :key="item.code"
                    class="col-12 col-sm-6"
                  >
                    <q-card
                      :class="{
                        'shift-card': true,
                        'shift-card-selected': isSelected(item),
                      }"
                      clickable
                      @click="selectShiftType(item)"
                    >
                      <q-card-section class="q-py-sm">
                        <div class="row items-center">
                          <div class="col-auto">
                            <q-icon
                              :name="item.icon"
                              :color="getItemColor(item)"
                              size="md"
                            />
                          </div>
                          <div class="col q-ml-sm">
                            <div class="text-subtitle2">{{ item.name }}</div>
                            <div class="text-caption">
                              <q-icon
                                name="paid"
                                size="xs"
                                color="primary"
                                class="q-mr-xs"
                              />
                              <span
                                >{{ formatCurrency(item.price) }} 元/班</span
                              >
                            </div>
                          </div>
                          <div class="col-auto">
                            <q-radio
                              v-model="selectedShiftType"
                              :val="item.code"
                              color="primary"
                            />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>

              <div class="text-subtitle1 q-mb-sm">
                {{
                  selectedCategory === '包班制'
                    ? '選擇附加服務'
                    : '選擇服務項目'
                }}
              </div>
              <q-list bordered separator class="rounded-borders">
                <transition-group name="list" tag="div">
                  <q-item
                    v-for="item in filteredItems"
                    v-show="
                      !(
                        selectedCategory === '鐘點制' &&
                        item.subCategory === '時段加價'
                      )
                    "
                    :key="item.code"
                    v-ripple
                    :clickable="
                      !(
                        selectedCategory === '鐘點制' &&
                        !isSelected(item) &&
                        wouldExceedLimit(item)
                      )
                    "
                    :class="{
                      'selected-item': isSelected(item),
                      'mandatory-item': item.code === 'HR01',
                      'disabled-item':
                        selectedCategory === '鐘點制' &&
                        !isSelected(item) &&
                        wouldExceedLimit(item),
                    }"
                    class="service-item q-pa-md"
                    @click="toggleItem(item)"
                  >
                    <q-item-section avatar>
                      <q-icon
                        :name="item.icon"
                        :color="getItemColor(item)"
                        size="md"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-body1">
                        {{ item.name }}
                        <q-badge
                          v-if="item.code === 'HR01'"
                          color="positive"
                          class="q-ml-sm"
                        >
                          必選
                        </q-badge>
                      </q-item-label>
                      <q-item-label caption class="q-mt-sm">
                        <div class="row items-center">
                          <q-icon
                            name="paid"
                            size="xs"
                            color="primary"
                            class="q-mr-xs"
                          />
                          <span>金額：{{ item.price }} 元</span>
                        </div>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-checkbox
                        v-model="selectedItems"
                        :val="item"
                        color="primary"
                        :disable="
                          (item.code === 'HR01' && !isSelected(item)) ||
                          (selectedCategory === '鐘點制' &&
                            !isSelected(item) &&
                            wouldExceedLimit(item))
                        "
                        :aria-label="`選擇 ${item.name}`"
                        @click.stop="toggleItem(item)"
                      />
                    </q-item-section>
                  </q-item>
                </transition-group>
              </q-list>

              <!-- 費用總計和預約按鈕 -->
              <div v-if="selectedItems.length > 0" class="cost-summary-section">
                <q-separator class="q-my-md" />
                <div class="q-pa-md">
                  <!-- 鐘點制時數計算 -->
                  <div v-if="selectedCategory === '鐘點制'" class="q-mb-md">
                    <div class="text-subtitle1 q-mb-sm">服務時間設定</div>

                    <!-- 天數選擇 -->
                    <div class="q-mb-sm">
                      <div class="text-subtitle2 q-mb-xs">天數選擇</div>
                      <div class="row q-col-gutter-xs">
                        <div
                          v-for="days in [1, 2, 3, 5, 7]"
                          :key="days"
                          class="col-auto"
                        >
                          <q-btn
                            :color="dayCount === days ? 'secondary' : 'white'"
                            :text-color="
                              dayCount === days ? 'white' : 'secondary'
                            "
                            :label="`${days}天`"
                            size="sm"
                            :unelevated="dayCount === days"
                            :flat="dayCount !== days"
                            class="q-px-sm"
                            @click="dayCount = days"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            v-model.number="dayCount"
                            type="number"
                            label="自訂"
                            outlined
                            dense
                            min="1"
                            :rules="[(val) => val >= 1 || '請輸入有效天數']"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- 小時數選擇 -->
                    <div class="q-mb-sm">
                      <div class="text-subtitle2 q-mb-xs">每日服務時數</div>
                      <div class="row q-col-gutter-xs">
                        <div
                          v-for="hours in [4, 8, 10, 12, 24]"
                          :key="hours"
                          class="col-auto"
                        >
                          <q-btn
                            :color="hourCount === hours ? 'primary' : 'white'"
                            :text-color="
                              hourCount === hours ? 'white' : 'primary'
                            "
                            :label="`${hours}時`"
                            size="sm"
                            :unelevated="hourCount === hours"
                            :flat="hourCount !== hours"
                            class="q-px-sm"
                            @click="hourCount = hours"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            v-model.number="hourCount"
                            type="number"
                            label="自訂"
                            outlined
                            dense
                            min="1"
                            :rules="[(val) => val >= 1 || '請輸入有效小時數']"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- 加價項目 -->
                    <div class="q-mb-sm">
                      <div class="text-subtitle2 q-mb-xs">加價項目</div>
                      <div class="row q-col-gutter-sm">
                        <div class="col-auto">
                          <q-chip
                            clickable
                            :color="isNightShift ? 'blue-grey' : 'grey-3'"
                            :text-color="isNightShift ? 'white' : 'black'"
                            @click="
                              isNightShift = !isNightShift
                              toggleAdditionalService('HR09')
                            "
                          >
                            <q-icon name="nights_stay" class="q-mr-xs" />
                            夜間時段 +20元
                          </q-chip>
                        </div>
                        <div class="col-auto">
                          <q-chip
                            clickable
                            :color="isUrgent ? 'amber' : 'grey-3'"
                            :text-color="isUrgent ? 'white' : 'black'"
                            @click="
                              isUrgent = !isUrgent
                              toggleAdditionalService('HR10')
                            "
                          >
                            <q-icon name="priority_high" class="q-mr-xs" />
                            加價急徵 +30元
                          </q-chip>
                        </div>
                        <div class="col-auto">
                          <q-chip
                            clickable
                            :color="isDoubleUrgent ? 'orange' : 'grey-3'"
                            :text-color="isDoubleUrgent ? 'white' : 'black'"
                            @click="
                              isDoubleUrgent = !isDoubleUrgent
                              toggleAdditionalService('HR11')
                            "
                          >
                            <q-icon name="flash_on" class="q-mr-xs" />
                            二次加價 +30元
                          </q-chip>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 包班制天數計算 -->
                  <div v-if="selectedCategory === '包班制'" class="q-mb-md">
                    <div class="text-subtitle1 q-mb-sm">包班時間設定</div>
                    <div class="text-subtitle2 q-mb-xs">包班天數</div>
                    <div class="row q-col-gutter-xs">
                      <div
                        v-for="days in [1, 3, 5, 7, 14]"
                        :key="days"
                        class="col-auto"
                      >
                        <q-btn
                          :color="
                            shiftDayCount === days ? 'secondary' : 'white'
                          "
                          :text-color="
                            shiftDayCount === days ? 'white' : 'secondary'
                          "
                          :label="`${days}天`"
                          size="sm"
                          :unelevated="shiftDayCount === days"
                          :flat="shiftDayCount !== days"
                          class="q-px-sm"
                          @click="shiftDayCount = days"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          v-model.number="shiftDayCount"
                          type="number"
                          label="自訂"
                          outlined
                          dense
                          min="1"
                          :rules="[(val) => val >= 1 || '請輸入有效天數']"
                        />
                      </div>
                    </div>
                  </div>

                  <q-separator class="q-my-sm" />

                  <!-- 費用明細 -->
                  <div class="row items-center justify-between q-mb-sm">
                    <div class="text-subtitle2">服務項目</div>
                    <div class="text-subtitle1 text-weight-bold">
                      {{
                        formatCurrency(
                          selectedCategory === '鐘點制'
                            ? selectedHourlyItems.reduce(
                                (sum, item) =>
                                  item.subCategory !== '時段加價'
                                    ? sum + item.price
                                    : sum,
                                0,
                              ) *
                                hourCount *
                                dayCount
                            : (selectedShiftItems.reduce(
                                (sum, item) => sum + item.price,
                                0,
                              ) +
                                (selectedShiftType === 'SH01' ? 3000 : 5500)) *
                                shiftDayCount,
                        )
                      }}
                      元
                    </div>
                  </div>

                  <div
                    v-if="
                      selectedCategory === '鐘點制' &&
                      (isNightShift || isUrgent || isDoubleUrgent)
                    "
                    class="row items-center justify-between q-mb-sm"
                  >
                    <div class="text-subtitle2">加價項目</div>
                    <div class="text-subtitle1 text-weight-bold">
                      {{
                        formatCurrency(
                          selectedHourlyItems.reduce(
                            (sum, item) =>
                              item.subCategory === '時段加價'
                                ? sum + item.price
                                : sum,
                            0,
                          ) * dayCount,
                        )
                      }}
                      元
                    </div>
                  </div>

                  <!-- 小費設定 -->
                  <div class="row items-center q-mb-sm">
                    <div class="col-4">
                      <span class="text-subtitle2">小費金額</span>
                    </div>
                    <div class="col-8">
                      <div class="row items-center justify-end">
                        <q-btn
                          round
                          flat
                          dense
                          size="sm"
                          icon="remove"
                          color="grey"
                          @click="tipAmount = Math.max(0, tipAmount - 50)"
                        />
                        <q-input
                          v-model.number="tipAmount"
                          type="number"
                          dense
                          outlined
                          class="q-mx-sm"
                          style="width: 100px"
                          :rules="[(val) => val >= 0 || '請輸入有效金額']"
                        >
                          <template #append>
                            <span class="text-grey-8">元</span>
                          </template>
                        </q-input>
                        <q-btn
                          round
                          flat
                          dense
                          size="sm"
                          icon="add"
                          color="primary"
                          @click="tipAmount += 50"
                        />
                      </div>
                    </div>
                  </div>

                  <q-separator class="q-my-md" />

                  <!-- 總金額 -->
                  <div class="row items-center justify-between q-mb-md">
                    <div class="text-h6 text-weight-bold">總計金額</div>
                    <div class="text-h4 text-primary text-weight-bold">
                      {{ formatCurrency(totalCost + tipAmount) }} 元
                    </div>
                  </div>

                  <!-- 聯繫我們按鈕 -->
                  <q-btn
                    color="primary"
                    size="lg"
                    class="full-width"
                    @click="router.push('/support/contact')"
                  >
                    <q-icon name="contact_support" class="q-mr-sm" />
                    聯繫我們
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </main>

    <!-- 幫助對話框 -->
    <q-dialog v-model="showHelp">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center bg-primary text-white">
          <div class="text-h6">使用說明</div>
          <q-space />
          <q-btn v-close-popup icon="close" flat round dense />
        </q-card-section>
        <q-card-section>
          <p>
            <b>鐘點制</b
            >：按小時計費，基本照護為必選項目，可根據需求選擇附加服務。
          </p>
          <p>
            <b>包班制</b
            >：按班次計費，選擇12小時或24小時班次，可根據需求選擇附加服務。
          </p>
          <p>點擊服務項目或勾選核取方塊可選擇/取消選擇服務。</p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import usePageSeo from '~/composables/usePageSeo'
import { useCareService } from '~/composables/useCareService'

usePageSeo('護理費計算器 - DogFriend', '快速計算並預估您的護理服務費用')

const router = useRouter()
const $q = useQuasar()

const {
  particlesLoaded,
  careItems,
  selectedHourlyItems,
  selectedShiftItems,
  selectedCategory,
  selectedShiftType,
  searchText,
  showHelp,
  previousTotalCost,
  totalCostElement,
  particleContainer,
  tipAmount,
  hourCount,
  dayCount,
  shiftDayCount,
  showFilters,
  showCalculator,
  showShiftCalculator,
  showAdditionalItems,
  isNightShift,
  isUrgent,
  isDoubleUrgent,
  activeFilters,
  isAnyFilterActive,
  particlesOptions,
  selectedItems,
  hourlyRate,
  hourlyRateReachedLimit,
  wouldExceedLimit,
  hourlyTotalWithTime,
  availableSubCategories,
  shiftTypeItems,
  filteredItems,
  shiftTotalWithDays,
  totalCost,
  chartData,
  chartOptions,
  formatCurrency,
  toggleItem,
  createParticleExplosion,
  isSelected,
  selectShiftType,
  resetSelections,
  applyFilter,
  resetAllFilters,
  toggleAdditionalService,
  calculatePreviewCost,
  getItemIcon,
  getItemColor,
} = useCareService()
</script>

<style scoped>
/* 計算器頁面樣式 */
.calculator-page {
  min-height: 100vh;
  background: #f8fafc;
  overflow-x: hidden; /* 防止左右滑動 */
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0 120px;
  overflow: hidden;
}

.hero-bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(
      circle at 25% 25%,
      rgba(255, 255, 255, 0.1) 2px,
      transparent 2px
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(255, 255, 255, 0.1) 2px,
      transparent 2px
    );
  background-size: 60px 60px;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-text-center {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.hero-icon {
  font-size: 3rem;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.hero-wave svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 60px;
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 主要內容區 */
.main-content {
  padding: 4rem 0 2rem; /* 減少底部內邊距 */
}

.calculator-main-card {
  max-width: 1000px;
  margin: 0 auto;
}

/* 現代化卡片 */
.modern-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.modern-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card-header {
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 20px 20px 0 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 1.5rem;
  color: #667eea;
}

.section-title h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

/* 服務類型選擇器 */
.service-type-selector {
  margin-bottom: 2rem;
}

.type-card {
  position: relative;
  padding: 2rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.type-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.type-card.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.type-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.type-card.active .type-icon {
  background: rgba(255, 255, 255, 0.2);
}

.type-card h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.type-card p {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.8;
}

.type-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

/* 費用摘要卡片 */
.total-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  margin-top: 1rem;
}

.total-amount {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.total-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

/* 費用總計區域 */
.cost-summary-section {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 0 0 20px 20px;
  margin-top: 1rem;
}

/* 動畫效果 */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
  opacity: 0;
}

.scale-enter-to,
.scale-leave-from {
  transform: scale(1);
  opacity: 1;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .calculator-main-card {
    max-width: 100%;
  }

  .action-content {
    flex-direction: column;
    gap: 1rem;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }

  .hero-badges {
    flex-direction: column;
    align-items: center;
  }

  /* 移動端調整底部間距 */
  .main-content {
    padding-bottom: 2rem;
  }

  /* 移動端隱藏 FAB 標籤 */
  .q-fab-action__label {
    display: none;
  }
}

@media (max-width: 480px) {
  /* 小螢幕調整 */
  .action-section {
    padding: 0.75rem;
  }

  .action-btn-main {
    font-size: 1rem;
    padding: 0.875rem 1.5rem;
  }
}

/* 粒子效果樣式 */
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* 卡片樣式 */
.main-card,
.summary-card {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.main-card:hover,
.summary-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* 篩選器區域樣式 */
.category-tabs {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 4px;
}

.filter-section {
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.filter-group {
  padding: 8px 0;
}

.filter-label {
  font-weight: 500;
  color: #666;
  margin-bottom: 6px;
  font-size: 0.9rem;
}

.q-tab__indicator {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(90deg, #4a90e2, #50c8b4);
  height: 4px;
  border-radius: 2px;
}

/* 標籤頁樣式 */
.q-tab__indicator {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(90deg, #4a90e2, #50c8b4);
  height: 4px;
  border-radius: 2px;
}

/* 搜尋框樣式 */
.search-input {
  transition: all 0.3s ease;
}

.search-input:focus-within {
  transform: scale(1.01);
}

/* 服務類型卡片樣式 */
.service-type-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  height: 100%;
}

.service-type-selected {
  border-color: currentColor;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.service-type-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 服務項目樣式 */
.service-item {
  border-radius: 8px;
  margin: 8px 0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
  transform: translateY(-2px);
}

.selected-item {
  background-color: rgba(25, 118, 210, 0.08) !important;
  border-left: 4px solid #1976d2;
}

.mandatory-item {
  background-color: rgba(76, 175, 80, 0.08);
}

.disabled-item {
  opacity: 0.6;
  cursor: not-allowed !important;
  background-color: rgba(0, 0, 0, 0.03);
}

.disabled-item:hover {
  transform: none !important;
}

/* 小時按鈕樣式 */
.hour-btn,
.day-btn {
  min-width: 50px;
  font-weight: 500;
  border-radius: 16px;
  transition: all 0.2s ease;
  margin: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
}

.hour-btn {
  border: 1px solid #1976d2 !important;
}

.day-btn {
  border: 1px solid #26a69a !important;
}

.hour-btn.q-btn--unelevated {
  border: none !important;
}

/* 天數按鈕樣式 */
.day-btn {
  min-width: 60px;
  font-weight: 500;
  border-radius: 16px;
  transition: all 0.2s ease;
  margin: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #26a69a !important;
}

.day-btn.q-btn--unelevated {
  border: none !important;
}

/* 圓餅圖樣式 */
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  height: 250px;
}

.pie-chart {
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
}

.shift-card {
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.shift-card-selected {
  border: 2px solid #1976d2;
  box-shadow: 0 3px 8px rgba(25, 118, 210, 0.2);
}

/* 總費用顯示樣式 */
.cost-display {
  font-weight: bold;
  position: relative;
  display: inline-block;
  animation: pulse 0.5s ease;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* 動畫效果 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* 列表動畫 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* 響應式調整 */
@media (max-width: 600px) {
  .pie-chart {
    width: 120px;
    height: 120px;
  }

  .legend-item {
    margin: 2px 4px;
  }

  .legend-text {
    font-size: 12px;
  }
}
</style>
