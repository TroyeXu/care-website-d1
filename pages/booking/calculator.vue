<template>
  <q-layout view="hHh LpR fff">
    <!-- 漸變背景的頁首 -->
    <q-header elevated class="header-gradient text-white">
      <q-toolbar>
        <q-toolbar-title class="header-title">
          <q-icon name="medical_services" size="md" class="q-mr-sm" />
          <h1 class="text-h5 q-my-none">專業護理服務計費系統</h1>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="page-background">
      <q-page padding>
        <div class="row q-col-gutter-md">
          <!-- 左側主卡片 -->
          <div class="col-12 col-md-8">
            <q-card class="main-card" flat bordered>
              <!-- 篩選器區域 -->
              <q-card-section>
                <!-- 服務類型選擇 -->
                <div class="service-type-selector q-mb-md">
                  <div class="row no-wrap">
                    <div class="col text-center">
                      <q-btn
                        :color="
                          selectedCategory === '鐘點制' ? 'primary' : 'grey-5'
                        "
                        :text-color="
                          selectedCategory === '鐘點制' ? 'white' : 'grey-8'
                        "
                        class="service-type-btn"
                        size="lg"
                        no-caps
                        unelevated
                        @click="selectedCategory = '鐘點制'"
                      >
                        鐘點制
                      </q-btn>
                    </div>
                    <div class="col text-center">
                      <q-btn
                        :color="
                          selectedCategory === '包班制' ? 'secondary' : 'grey-5'
                        "
                        :text-color="
                          selectedCategory === '包班制' ? 'white' : 'grey-8'
                        "
                        class="service-type-btn"
                        size="lg"
                        no-caps
                        unelevated
                        @click="selectedCategory = '包班制'"
                      >
                        包班制
                      </q-btn>
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
                      <template v-slot:prepend>
                        <q-icon name="search" color="primary" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-sm-4">
                    <q-btn
                      color="primary"
                      icon="refresh"
                      label="重置所有選擇"
                      @click="resetSelections"
                      class="full-width"
                      outline
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
                            @click="applyFilter('price', 100)"
                            :color="
                              activeFilters.price === 100 ? 'primary' : 'grey-4'
                            "
                            :text-color="
                              activeFilters.price === 100 ? 'white' : 'black'
                            "
                            :outline="activeFilters.price !== 100"
                          >
                            價格 > 100元
                          </q-chip>
                        </div>
                        <div class="col-auto">
                          <q-chip
                            clickable
                            @click="applyFilter('price', 50)"
                            :color="
                              activeFilters.price === 50 ? 'primary' : 'grey-4'
                            "
                            :text-color="
                              activeFilters.price === 50 ? 'white' : 'black'
                            "
                            :outline="activeFilters.price !== 50"
                          >
                            價格 > 50元
                          </q-chip>
                        </div>
                        <div class="col-auto">
                          <q-chip
                            clickable
                            @click="applyFilter('price', 0)"
                            :color="
                              activeFilters.price === 0 ? 'primary' : 'grey-4'
                            "
                            :text-color="
                              activeFilters.price === 0 ? 'white' : 'black'
                            "
                            :outline="activeFilters.price !== 0"
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
                            @click="applyFilter('subCategory', subCat)"
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
                          >
                            {{ subCat }}
                          </q-chip>
                        </div>
                        <div class="col-auto">
                          <q-chip
                            clickable
                            @click="applyFilter('subCategory', null)"
                            :color="
                              !activeFilters.subCategory
                                ? 'secondary'
                                : 'grey-4'
                            "
                            :text-color="
                              !activeFilters.subCategory ? 'white' : 'black'
                            "
                            :outline="activeFilters.subCategory !== null"
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
                        @click="resetAllFilters"
                        :disable="!isAnyFilterActive"
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
                      class="col-12 col-sm-6"
                      v-for="item in shiftTypeItems"
                      :key="item.code"
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
                      :key="item.code"
                      :clickable="
                        !(
                          selectedCategory === '鐘點制' &&
                          !isSelected(item) &&
                          wouldExceedLimit(item)
                        )
                      "
                      @click="toggleItem(item)"
                      :class="{
                        'selected-item': isSelected(item),
                        'mandatory-item': item.code === 'HR01',
                        'disabled-item':
                          selectedCategory === '鐘點制' &&
                          !isSelected(item) &&
                          wouldExceedLimit(item),
                      }"
                      class="service-item q-pa-md"
                      v-ripple
                      v-show="
                        !(
                          selectedCategory === '鐘點制' &&
                          item.subCategory === '時段加價'
                        )
                      "
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
                          @click.stop="toggleItem(item)"
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
                        />
                      </q-item-section>
                    </q-item>
                  </transition-group>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <!-- 右側摘要卡片 -->
          <div class="col-12 col-md-4">
            <q-card class="summary-card" flat bordered>
              <q-card-section>
                <div class="text-h6 text-primary">
                  <q-icon name="summarize" /> 費用統計
                </div>
                <!-- 移除小費設定，已移動到最下方 -->

                <!-- 即時費用計算器（鐘點制） -->
                <div v-if="selectedCategory === '鐘點制'" class="q-mt-md">
                  <div class="row items-center justify-between">
                    <div class="text-subtitle2">服務時間設定</div>
                    <q-btn
                      flat
                      dense
                      round
                      :icon="showCalculator ? 'expand_less' : 'expand_more'"
                      @click="showCalculator = !showCalculator"
                    />
                  </div>
                  <q-slide-transition>
                    <div v-show="showCalculator" class="q-mt-sm">
                      <!-- 天數選擇 -->
                      <div class="q-mb-sm">
                        <div class="text-subtitle2 q-mb-xs">天數選擇</div>
                        <div class="row justify-between q-col-gutter-xs">
                          <div
                            class="col-2"
                            v-for="days in [1, 2, 3, 5, 7]"
                            :key="days"
                          >
                            <q-btn
                              :color="dayCount === days ? 'secondary' : 'white'"
                              :text-color="
                                dayCount === days ? 'white' : 'secondary'
                              "
                              :label="`${days}天`"
                              size="sm"
                              @click="dayCount = days"
                              :unelevated="dayCount === days"
                              :flat="dayCount !== days"
                              class="q-px-xs day-btn full-width"
                              style="border: dayCount !== days ? '1px solid #26a69a' : 'none'"
                            />
                          </div>
                        </div>
                        <q-input
                          v-model.number="dayCount"
                          type="number"
                          label="自定義天數"
                          outlined
                          dense
                          min="1"
                          class="q-mt-sm"
                          :rules="[(val) => val >= 1 || '請輸入有效天數']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="event" color="secondary" />
                          </template>
                        </q-input>
                      </div>

                      <!-- 快速選擇小時數 -->
                      <div class="q-mb-sm">
                        <div class="text-subtitle2 q-mb-xs">每日服務時數</div>
                        <div class="row justify-between q-col-gutter-xs">
                          <div
                            class="col-2"
                            v-for="hours in [4, 8, 10, 12, 24]"
                            :key="hours"
                          >
                            <q-btn
                              :color="hourCount === hours ? 'primary' : 'white'"
                              :text-color="
                                hourCount === hours ? 'white' : 'primary'
                              "
                              :label="`${hours}時`"
                              size="sm"
                              @click="hourCount = hours"
                              :unelevated="hourCount === hours"
                              :flat="hourCount !== hours"
                              class="q-px-xs hour-btn full-width"
                              style="border: hourCount !== hours ? '1px solid #1976d2' : 'none'"
                            />
                          </div>
                        </div>
                        <q-input
                          v-model.number="hourCount"
                          type="number"
                          label="自定義小時數"
                          outlined
                          dense
                          min="1"
                          class="q-mt-sm"
                          :rules="[(val) => val >= 1 || '請輸入有效小時數']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="schedule" color="primary" />
                          </template>
                        </q-input>
                      </div>

                      <!-- 加價項目 -->
                      <div class="q-mt-md">
                        <div class="row items-center justify-between">
                          <div class="text-subtitle2">加價項目</div>
                          <q-btn
                            flat
                            dense
                            round
                            :icon="
                              showAdditionalItems
                                ? 'expand_less'
                                : 'expand_more'
                            "
                            @click="showAdditionalItems = !showAdditionalItems"
                          />
                        </div>
                        <q-slide-transition>
                          <div
                            v-show="showAdditionalItems"
                            class="row q-col-gutter-sm q-mt-sm"
                          >
                            <div class="col-12">
                              <div class="row items-center">
                                <div class="col">
                                  <q-toggle
                                    v-model="isNightShift"
                                    label="夜間時段 (22:00-08:00)"
                                    color="blue-grey"
                                    @update:model-value="
                                      toggleAdditionalService('HR09')
                                    "
                                  />
                                </div>
                                <div class="col-auto text-blue-grey">
                                  <q-badge color="blue-grey" text-color="white">
                                    {{ formatCurrency(20) }} 元
                                  </q-badge>
                                </div>
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="row items-center">
                                <div class="col">
                                  <q-toggle
                                    v-model="isUrgent"
                                    label="加價急徵"
                                    color="amber"
                                    @update:model-value="
                                      toggleAdditionalService('HR10')
                                    "
                                  />
                                </div>
                                <div class="col-auto text-amber">
                                  <q-badge color="amber" text-color="white">
                                    {{ formatCurrency(30) }} 元
                                  </q-badge>
                                </div>
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="row items-center">
                                <div class="col">
                                  <q-toggle
                                    v-model="isDoubleUrgent"
                                    label="二次加價急徵"
                                    color="orange"
                                    @update:model-value="
                                      toggleAdditionalService('HR11')
                                    "
                                  />
                                </div>
                                <div class="col-auto text-orange">
                                  <q-badge color="orange" text-color="white">
                                    {{ formatCurrency(30) }} 元
                                  </q-badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </q-slide-transition>
                      </div>

                      <div
                        class="text-subtitle1 q-mt-sm text-primary text-center"
                      >
                        預計費用：{{ formatCurrency(hourlyTotalWithTime) }} 元
                        <div class="text-caption text-grey text-center">
                          (服務項目
                          {{
                            formatCurrency(
                              selectedHourlyItems.reduce(
                                (sum, item) =>
                                  item.subCategory === '時段加價'
                                    ? sum
                                    : sum + item.price,
                                0,
                              ),
                            )
                          }}
                          元 x {{ hourCount }} 時 x {{ dayCount }} 天 + 加價項目
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
                          元)
                        </div>
                      </div>
                    </div>
                  </q-slide-transition>
                </div>

                <!-- 包班制天數計算器 -->
                <div v-if="selectedCategory === '包班制'" class="q-mt-md">
                  <div class="row items-center justify-between">
                    <div class="text-subtitle2">包班時間設定</div>
                    <q-btn
                      flat
                      dense
                      round
                      :icon="
                        showShiftCalculator ? 'expand_less' : 'expand_more'
                      "
                      @click="showShiftCalculator = !showShiftCalculator"
                    />
                  </div>
                  <q-slide-transition>
                    <div v-show="showShiftCalculator" class="q-mt-sm">
                      <!-- 包班制天數選擇 -->
                      <div class="q-mb-sm">
                        <div class="text-subtitle2 q-mb-xs">包班天數</div>
                        <div class="row q-col-gutter-xs">
                          <div
                            class="col-auto"
                            v-for="days in [1, 3, 5, 7, 14]"
                            :key="days"
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
                              @click="shiftDayCount = days"
                              :unelevated="shiftDayCount === days"
                              :flat="shiftDayCount !== days"
                              class="q-px-sm day-btn"
                              style="border: shiftDayCount !== days ? '1px solid #26a69a' : 'none'"
                            />
                          </div>
                        </div>
                        <q-input
                          v-model.number="shiftDayCount"
                          type="number"
                          label="自定義天數"
                          outlined
                          dense
                          min="1"
                          class="q-mt-sm"
                          :rules="[(val) => val >= 1 || '請輸入有效天數']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="event" color="secondary" />
                          </template>
                        </q-input>
                      </div>

                      <div
                        class="text-subtitle1 q-mt-sm text-primary text-center"
                      >
                        預計費用：{{ formatCurrency(shiftTotalWithDays) }} 元
                        <div class="text-caption text-grey text-center">
                          (服務項目
                          {{
                            formatCurrency(
                              selectedShiftItems.reduce(
                                (sum, item) => sum + item.price,
                                0,
                              ) + (selectedShiftType === 'SH01' ? 3000 : 5500),
                            )
                          }}
                          元 x {{ shiftDayCount }} 天)
                        </div>
                      </div>
                    </div>
                  </q-slide-transition>
                </div>
              </q-card-section>

              <q-card-section>
                <!-- 圓餅圖 (使用 vue-chartjs) -->
                <div class="chart-container">
                  <Pie
                    v-if="chartData.labels.length > 0"
                    :data="chartData"
                    :options="chartOptions"
                    class="pie-chart"
                  />
                  <div v-else class="text-center text-grey q-pa-md">
                    尚未選擇任何服務項目
                  </div>
                </div>
              </q-card-section>

              <q-card-section v-if="selectedItems.length > 0">
                <q-list dense>
                  <q-item
                    v-for="item in selectedItems"
                    :key="`selected-${item.code}`"
                  >
                    <q-item-section>
                      <q-item-label>{{ item.name }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      {{ formatCurrency(item.price) }} 元
                    </q-item-section>
                  </q-item>
                  <q-separator class="q-my-sm" />
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-weight-bold"
                        >服務項目總金額</q-item-label
                      >
                      <div class="text-caption text-grey">
                        已選 {{ selectedItems.length }} 項服務
                      </div>
                    </q-item-section>
                    <q-item-section side>
                      <span class="text-weight-bold text-primary"
                        >{{
                          formatCurrency(
                            selectedItems.reduce(
                              (sum, item) => sum + item.price,
                              0,
                            ),
                          )
                        }}
                        元</span
                      >
                    </q-item-section>
                  </q-item>

                  <q-separator class="q-my-sm" />

                  <!-- 總計金額 -->
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-h6"
                        >總計金額</q-item-label
                      >
                    </q-item-section>
                    <q-item-section side>
                      <span class="text-weight-bold text-h6 text-primary"
                        >{{ formatCurrency(totalCost + tipAmount) }} 元</span
                      >
                    </q-item-section>
                  </q-item>
                  <!-- 小費設定 -->
                  <q-item>
                    <q-item-section>
                      <div class="row items-center">
                        <q-icon
                          name="volunteer_activism"
                          color="pink-6"
                          class="q-mr-sm"
                        />
                        <span>小費金額</span>
                      </div>
                    </q-item-section>
                    <q-item-section side>
                      <div class="row items-center">
                        <q-btn
                          round
                          flat
                          dense
                          icon="remove"
                          @click="tipAmount = Math.max(0, tipAmount - 50)"
                          color="grey"
                          class="q-mr-xs"
                        />
                        <q-input
                          v-model.number="tipAmount"
                          type="number"
                          dense
                          outlined
                          class="tip-input-inline"
                          style="width: 100px"
                          :rules="[(val) => val >= 0 || '請輸入有效金額']"
                        >
                          <template v-slot:append>
                            <span class="text-grey-8">元</span>
                          </template>
                        </q-input>
                        <q-btn
                          round
                          flat
                          dense
                          icon="add"
                          @click="tipAmount += 50"
                          color="pink-6"
                          class="q-ml-xs"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-footer
      elevated
      class="footer-gradient text-white"
      style="min-height: 64px"
    >
      <q-toolbar style="height: 5rem">
        <q-toolbar-title>
          <div class="row items-center" style="width: 100%">
            <div class="col-grow" style="white-space: nowrap">
              <div class="column" style="line-height: 1.5">
                <div class="row items-center">
                  <span class="text-subtitle1">總費用：</span>
                  <span ref="totalCostElement" class="text-h5 cost-display">{{
                    formatCurrency(totalCost + tipAmount)
                  }}</span>
                  <span
                    v-if="selectedCategory === '鐘點制'"
                    class="text-subtitle1"
                    style="margin-left: 8px"
                  >
                    ({{ hourCount * dayCount }} 小時)
                  </span>
                  <span class="text-subtitle1">元</span>
                  <q-badge
                    v-if="tipAmount > 0"
                    color="pink-6"
                    class="q-ml-sm"
                    style="padding: 4px 8px"
                  >
                    含小費 {{ formatCurrency(tipAmount) }} 元
                  </q-badge>
                </div>
                <div
                  v-if="selectedCategory === '鐘點制'"
                  class="row items-center q-mt-xs"
                >
                  <span class="text-caption text-grey-7">每小時上限500元</span>
                </div>
              </div>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <!-- 幫助對話框 -->
    <q-dialog v-model="showHelp">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center bg-primary text-white">
          <div class="text-h6">使用說明</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
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
  </q-layout>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('護理費計算器 - DogFriend', '快速計算並預估您的護理服務費用')
import { Pie } from 'vue-chartjs'
import { useCareService } from '~/composables/useCareService'

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
/* 基本樣式 */
.header-gradient {
  background: linear-gradient(135deg, #3a6186, #89253e);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.header-title {
  display: flex;
  align-items: center;
}

.footer-gradient {
  background: linear-gradient(135deg, #89253e, #3a6186);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.page-background {
  background-color: #f8f9fa;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e6ed' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  position: relative;
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
