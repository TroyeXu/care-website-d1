import { mergeProps, withCtx, createVNode, unref, createTextVNode, isRef, toDisplayString, withDirectives, createBlock, openBlock, Fragment, renderList, vShow, createCommentVNode, withModifiers, TransitionGroup, ref, computed, watch, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps } from 'vue/server-renderer';
import { aW as createDirective, aX as getSSRProps, _ as _export_sfc, u as usePageSeo, aY as __nuxt_component_0, aZ as __nuxt_component_1, a_ as __nuxt_component_2, a$ as __nuxt_component_4, g as __nuxt_component_1$1, b0 as __nuxt_component_15, a as __nuxt_component_1$2, b as __nuxt_component_2$1, c as __nuxt_component_3, q as __nuxt_component_4$1, d as __nuxt_component_3$2, e as __nuxt_component_5, aK as __q_directive_0, f as __nuxt_component_6, h as __nuxt_component_8, m as __nuxt_component_5$1, i as __nuxt_component_5$2, b1 as __nuxt_component_17, r as __nuxt_component_20, $ as __nuxt_component_23 } from './server.mjs';
import { Pie } from 'vue-chartjs';
import { gsap } from 'gsap';
import { Chart, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { _ as __nuxt_component_0$1 } from '../_/QPage.mjs';
import { _ as __nuxt_component_3$1 } from '../_/QSlideTransition.mjs';
import { _ as __nuxt_component_9 } from '../_/QChip.mjs';
import { _ as __nuxt_component_13 } from '../_/QRadio.mjs';
import { _ as __nuxt_component_9$1 } from '../_/QCheckbox.mjs';
import { _ as __nuxt_component_3$3 } from '../_/QToggle.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@intlify/utils';
import 'vue-router';
import 'node:url';
import 'consola';
import '@supabase/supabase-js';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import '../_/use-checkbox.mjs';

const __q_directive_1 = createDirective({ name: 'close-popup', getSSRProps }
  
);

function useCareState() {
  const careItems = ref([
    { code: "HR01", name: "基本照護(必選)", price: 200, category: "鐘點制", subCategory: "基本服務", selectedByDefault: true, icon: "favorite", color: "deep-orange" },
    { code: "HR02", name: "抽痰需求", price: 50, category: "鐘點制", subCategory: "醫療照護", icon: "medical_services", color: "light-blue" },
    { code: "HR03", name: "鼻胃管或其他管灌", price: 60, category: "鐘點制", subCategory: "醫療照護", icon: "medical_services", color: "teal" },
    { code: "HR04", name: "導尿管或其它引流管", price: 50, category: "鐘點制", subCategory: "醫療照護", icon: "medical_services", color: "cyan" },
    { code: "HR05", name: "氣切or氣管內管", price: 60, category: "鐘點制", subCategory: "醫療照護", icon: "medical_services", color: "indigo" },
    { code: "HR06", name: "體重>50公斤並需協助上下床", price: 70, category: "鐘點制", subCategory: "特殊需求", icon: "bed", color: "deep-purple" },
    { code: "HR07", name: "意識不清或無法配合", price: 70, category: "鐘點制", subCategory: "特殊需求", icon: "psychology", color: "purple" },
    { code: "HR08", name: "有任何傳染病或需要隔離病人", price: 80, category: "鐘點制", subCategory: "特殊需求", icon: "coronavirus", color: "red" },
    { code: "HR09", name: "夜間:2200-0800", price: 20, category: "鐘點制", subCategory: "時段加價", icon: "bedtime", color: "blue-grey" },
    { code: "HR10", name: "加價急徵", price: 30, category: "鐘點制", subCategory: "時段加價", icon: "priority_high", color: "amber" },
    { code: "HR11", name: "二次加價急徵", price: 30, category: "鐘點制", subCategory: "時段加價", icon: "bolt", color: "orange" },
    { code: "SH01", name: "12小時/班", price: 3e3, category: "包班制", subCategory: "基本班次", icon: "schedule", color: "primary" },
    { code: "SH02", name: "24小時/班", price: 5500, category: "包班制", subCategory: "基本班次", icon: "access_time_filled", color: "secondary" },
    { code: "SH03", name: "體重>50公斤並需協助上下床", price: 200, category: "包班制", subCategory: "特殊需求", icon: "bed", color: "deep-purple" },
    { code: "SH04", name: "意識不清或無法配合", price: 200, category: "包班制", subCategory: "特殊需求", icon: "psychology", color: "purple" },
    { code: "SH05", name: "有任何傳染病或需要隔離病人", price: 300, category: "包班制", subCategory: "特殊需求", icon: "coronavirus", color: "red" }
  ]);
  const selectedHourlyItems = ref(careItems.value.filter((item) => item.selectedByDefault && item.category === "鐘點制"));
  const selectedShiftItems = ref([]);
  const selectedCategory = ref("鐘點制");
  const selectedShiftType = ref("SH01");
  const searchText = ref("");
  const showHelp = ref(false);
  const previousTotalCost = ref(0);
  const totalCostElement = ref(null);
  const particleContainer = ref(null);
  const tipAmount = ref(0);
  const hourCount = ref(1);
  const dayCount = ref(1);
  const shiftDayCount = ref(1);
  const showFilters = ref(false);
  const showCalculator = ref(false);
  const showShiftCalculator = ref(false);
  const showAdditionalItems = ref(true);
  const isNightShift = ref(false);
  const isUrgent = ref(false);
  const isDoubleUrgent = ref(false);
  const activeFilters = ref({ price: 0, subCategory: null });
  return {
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
    activeFilters
  };
}
function useCareFilters(state) {
  const { searchText, activeFilters, careItems, selectedCategory } = state;
  const isAnyFilterActive = computed(
    () => activeFilters.value.price > 0 || activeFilters.value.subCategory !== null
  );
  const availableSubCategories = computed(() => {
    const subCategories = careItems.value.filter((item) => item.category === selectedCategory.value && (item.subCategory === "醫療照護" || item.subCategory === "特殊需求")).map((item) => item.subCategory);
    return [...new Set(subCategories)];
  });
  const filteredItems = computed(() => {
    return careItems.value.filter((item) => {
      const matchCategory = item.category === selectedCategory.value;
      let matchSearch = true;
      let matchPrice = true;
      let matchSubCategory = true;
      if (selectedCategory.value === "包班制" && item.subCategory === "基本班次") {
        return false;
      }
      if (searchText.value) {
        matchSearch = item.name.toLowerCase().includes(searchText.value.toLowerCase());
      }
      if (activeFilters.value.price > 0) {
        matchPrice = item.price > activeFilters.value.price;
      }
      if (activeFilters.value.subCategory) {
        matchSubCategory = item.subCategory === activeFilters.value.subCategory;
      }
      return matchCategory && matchSearch && matchPrice && matchSubCategory;
    });
  });
  function applyFilter(filterType, value) {
    if (filterType !== "search") {
      searchText.value = "";
    }
    if (activeFilters.value[filterType] === value) {
      activeFilters.value[filterType] = filterType === "price" ? 0 : null;
    } else {
      activeFilters.value[filterType] = value;
    }
  }
  function resetAllFilters() {
    activeFilters.value = { price: 0, subCategory: null };
  }
  return {
    isAnyFilterActive,
    availableSubCategories,
    filteredItems,
    applyFilter,
    resetAllFilters
  };
}
function useCostCalculations(state) {
  const {
    selectedCategory,
    selectedHourlyItems,
    selectedShiftItems,
    selectedShiftType,
    hourCount,
    dayCount,
    shiftDayCount
  } = state;
  const selectedItems = computed(
    () => selectedCategory.value === "鐘點制" ? selectedHourlyItems.value : selectedShiftItems.value
  );
  const hourlyRate = computed(() => {
    if (selectedCategory.value !== "鐘點制") return 0;
    return selectedHourlyItems.value.reduce((sum, item) => {
      return item.subCategory === "時段加價" ? sum : sum + item.price;
    }, 0);
  });
  const hourlyRateReachedLimit = computed(() => hourlyRate.value >= 500);
  function wouldExceedLimit(item) {
    return false;
  }
  const hourlyTotalWithTime = computed(() => {
    if (selectedCategory.value !== "鐘點制") return 0;
    return selectedHourlyItems.value.reduce((sum, item) => {
      if (item.subCategory === "時段加價") {
        return sum + item.price * dayCount.value;
      }
      return sum + item.price * hourCount.value * dayCount.value;
    }, 0);
  });
  const shiftTotalWithDays = computed(() => {
    if (selectedCategory.value !== "包班制") return 0;
    let basePrice = 0;
    if (selectedShiftType.value === "SH01") {
      basePrice = 3e3;
    } else if (selectedShiftType.value === "SH02") {
      basePrice = 5500;
    }
    const additionalServices = selectedShiftItems.value.reduce((sum, item) => sum + item.price, 0);
    return (basePrice + additionalServices) * shiftDayCount.value;
  });
  const totalCost = computed(
    () => selectedCategory.value === "鐘點制" ? hourlyTotalWithTime.value : shiftTotalWithDays.value
  );
  function calculatePreviewCost(item) {
    if (selectedCategory.value === "鐘點制" && item.subCategory !== "時段加價") {
      return totalCost.value + item.price * hourCount.value;
    } else {
      return totalCost.value + item.price;
    }
  }
  function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return {
    selectedItems,
    hourlyRate,
    hourlyRateReachedLimit,
    wouldExceedLimit,
    hourlyTotalWithTime,
    shiftTotalWithDays,
    totalCost,
    calculatePreviewCost,
    formatCurrency
  };
}
function useParticleEffects(state, calculations) {
  const { totalCost } = calculations;
  const {
    totalCostElement,
    previousTotalCost
  } = state;
  function particlesLoaded(container) {
    console.log("粒子容器已加載", container);
  }
  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: { value: ["#4A90E2", "#50C8B4", "#89253e"] },
      links: { color: "#c8c8c8", distance: 150, enable: true, opacity: 0.2, width: 1 },
      move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 1, straight: false },
      number: { density: { enable: true, area: 800 }, value: 30 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } }
    },
    detectRetina: true
  };
  function createParticleExplosion(x, y, color) {
    const container = (void 0).createElement("div");
    container.style.position = "fixed";
    container.style.left = "0";
    container.style.top = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none";
    container.style.zIndex = "9999";
    (void 0).body.appendChild(container);
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = (void 0).createElement("div");
      particle.style.position = "absolute";
      particle.style.width = `${Math.random() * 6 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = color === "primary" ? "#1976d2" : color === "secondary" ? "#26a69a" : color === "deep-orange" ? "#ff5722" : `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      particle.style.borderRadius = "50%";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      container.appendChild(particle);
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 100 + 50;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      gsap.to(particle, {
        x: vx,
        y: vy,
        opacity: 0,
        duration: 0.6 + Math.random() * 0.4,
        ease: "power1.out",
        onComplete: () => {
          container.removeChild(particle);
          if (container.childElementCount === 0) {
            (void 0).body.removeChild(container);
          }
        }
      });
    }
  }
  watch(totalCost, (newVal, oldVal) => {
    previousTotalCost.value = oldVal;
    if (totalCostElement.value) {
      gsap.killTweensOf(totalCostElement.value);
      const color = newVal > oldVal ? "#4caf50" : newVal < oldVal ? "#f44336" : "inherit";
      gsap.to(totalCostElement.value, {
        color,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(totalCostElement.value, { color: "inherit", duration: 0.5, delay: 0.5, ease: "power2.inOut" });
        }
      });
      gsap.fromTo(totalCostElement.value, { scale: 1 }, { scale: 1.2, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 });
    }
  });
  return {
    particlesLoaded,
    particlesOptions,
    createParticleExplosion
  };
}
function useCareActions(state, calculations, particleApi) {
  const {
    careItems,
    selectedHourlyItems,
    selectedShiftItems,
    selectedCategory,
    selectedShiftType,
    searchText,
    isNightShift,
    isUrgent,
    isDoubleUrgent,
    hourCount,
    dayCount,
    shiftDayCount
  } = state;
  function toggleItem(item) {
    const targetArray = selectedCategory.value === "鐘點制" ? selectedHourlyItems : selectedShiftItems;
    const index = targetArray.value.findIndex((i) => i.code === item.code);
    if (index === -1) {
      targetArray.value.push(item);
    } else if (item.code !== "HR01") {
      targetArray.value.splice(index, 1);
      const el = (void 0).querySelector(`[data-code="${item.code}"]`);
      if (el) {
        gsap.fromTo(el, { scale: 1, backgroundColor: "rgba(255, 87, 34, 0.2)" }, { scale: 1, backgroundColor: "transparent", duration: 0.5, ease: "power1.out" });
      }
    }
  }
  function isSelected(item) {
    return calculations.selectedItems.value.some((i) => i.code === item.code);
  }
  function selectShiftType(item) {
    selectedShiftType.value = item.code;
  }
  function resetSelections() {
    selectedHourlyItems.value = careItems.value.filter((item) => item.selectedByDefault && item.category === "鐘點制");
    selectedShiftItems.value = [];
    selectedShiftType.value = "SH01";
    searchText.value = "";
    isNightShift.value = false;
    isUrgent.value = false;
    isDoubleUrgent.value = false;
    dayCount.value = 1;
    hourCount.value = 1;
    shiftDayCount.value = 1;
  }
  function toggleAdditionalService(code) {
    const item = careItems.value.find((item2) => item2.code === code);
    if (!item) return;
    const index = selectedHourlyItems.value.findIndex((i) => i.code === code);
    if (code === "HR09") {
      if (isNightShift.value && index === -1) {
        selectedHourlyItems.value.push(item);
      } else if (!isNightShift.value && index !== -1) {
        selectedHourlyItems.value.splice(index, 1);
      }
    } else if (code === "HR10") {
      if (isUrgent.value && index === -1) {
        selectedHourlyItems.value.push(item);
      } else if (!isUrgent.value && index !== -1) {
        selectedHourlyItems.value.splice(index, 1);
      }
    } else if (code === "HR11") {
      if (isDoubleUrgent.value && index === -1) {
        selectedHourlyItems.value.push(item);
      } else if (!isDoubleUrgent.value && index !== -1) {
        selectedHourlyItems.value.splice(index, 1);
      }
    }
  }
  function getItemIcon(item) {
    return item.icon || "help_outline";
  }
  function getItemColor(item) {
    return item.color || "primary";
  }
  watch(isNightShift, () => {
    toggleAdditionalService("HR09");
  });
  watch(isUrgent, () => {
    toggleAdditionalService("HR10");
  });
  watch(isDoubleUrgent, () => {
    toggleAdditionalService("HR11");
  });
  return {
    toggleItem,
    isSelected,
    selectShiftType,
    resetSelections,
    toggleAdditionalService,
    getItemIcon,
    getItemColor
  };
}
Chart.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);
function useChart(calculations) {
  const { selectedItems, totalCost, formatCurrency } = calculations;
  const chartData = computed(() => {
    if (selectedItems.value.length === 0) {
      return { labels: [], datasets: [] };
    }
    const subCategoryCosts = {};
    selectedItems.value.forEach((item) => {
      if (!subCategoryCosts[item.subCategory]) {
        subCategoryCosts[item.subCategory] = 0;
      }
      subCategoryCosts[item.subCategory] += item.price;
    });
    const labels = Object.keys(subCategoryCosts);
    const data = labels.map((label) => subCategoryCosts[label]);
    const backgroundColors = ["#4A90E2", "#50C8B4", "#F5A623", "#D0021B", "#9013FE", "#BD10E0", "#7ED321"];
    return { labels, datasets: [{ data, backgroundColor: backgroundColors.slice(0, labels.length), borderWidth: 0 }] };
  });
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 12, padding: 15, font: { size: 12 } }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const percentage = (value / totalCost.value * 100).toFixed(1);
            return `${label}: ${formatCurrency(value)} 元 (${percentage}%)`;
          }
        }
      }
    }
  };
  return { chartData, chartOptions };
}
function useCareService() {
  const state = useCareState();
  const filters = useCareFilters(state);
  const calculations = useCostCalculations(state);
  const particles = useParticleEffects(state, calculations);
  const actions = useCareActions(state, calculations);
  const chart = useChart(calculations);
  return {
    ...state,
    ...filters,
    ...calculations,
    ...particles,
    ...actions,
    ...chart
  };
}
const _sfc_main = {
  __name: "calculator",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("護理費計算器 - DogFriend", "快速計算並預估您的護理服務費用");
    const {
      selectedHourlyItems,
      selectedShiftItems,
      selectedCategory,
      selectedShiftType,
      searchText,
      showHelp,
      totalCostElement,
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
      selectedItems,
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
      isSelected,
      selectShiftType,
      resetSelections,
      applyFilter,
      resetAllFilters,
      toggleAdditionalService,
      getItemColor
    } = useCareService();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_layout = __nuxt_component_0;
      const _component_q_header = __nuxt_component_1;
      const _component_q_toolbar = __nuxt_component_2;
      const _component_q_toolbar_title = __nuxt_component_4;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_page_container = __nuxt_component_15;
      const _component_q_page = __nuxt_component_0$1;
      const _component_q_card = __nuxt_component_1$2;
      const _component_q_card_section = __nuxt_component_2$1;
      const _component_q_btn = __nuxt_component_3;
      const _component_q_input = __nuxt_component_4$1;
      const _component_q_slide_transition = __nuxt_component_3$1;
      const _component_q_chip = __nuxt_component_9;
      const _component_q_radio = __nuxt_component_13;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_item = __nuxt_component_5;
      const _component_q_item_section = __nuxt_component_6;
      const _component_q_item_label = __nuxt_component_8;
      const _component_q_badge = __nuxt_component_5$1;
      const _component_q_checkbox = __nuxt_component_9$1;
      const _component_q_toggle = __nuxt_component_3$3;
      const _component_q_separator = __nuxt_component_5$2;
      const _component_q_footer = __nuxt_component_17;
      const _component_q_dialog = __nuxt_component_20;
      const _component_q_space = __nuxt_component_23;
      const _directive_ripple = __q_directive_0;
      const _directive_close_popup = __q_directive_1;
      _push(ssrRenderComponent(_component_q_layout, mergeProps({ view: "hHh LpR fff" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_header, {
              elevated: "",
              class: "header-gradient text-white"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_toolbar, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_toolbar_title, { class: "header-title" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_icon, {
                                name: "medical_services",
                                size: "md",
                                class: "q-mr-sm"
                              }, null, _parent5, _scopeId4));
                              _push5(`<h1 class="text-h5 q-my-none" data-v-8eb201ff${_scopeId4}>專業護理服務計費系統</h1>`);
                            } else {
                              return [
                                createVNode(_component_q_icon, {
                                  name: "medical_services",
                                  size: "md",
                                  class: "q-mr-sm"
                                }),
                                createVNode("h1", { class: "text-h5 q-my-none" }, "專業護理服務計費系統")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_toolbar_title, { class: "header-title" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_icon, {
                                name: "medical_services",
                                size: "md",
                                class: "q-mr-sm"
                              }),
                              createVNode("h1", { class: "text-h5 q-my-none" }, "專業護理服務計費系統")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_toolbar, null, {
                      default: withCtx(() => [
                        createVNode(_component_q_toolbar_title, { class: "header-title" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_icon, {
                              name: "medical_services",
                              size: "md",
                              class: "q-mr-sm"
                            }),
                            createVNode("h1", { class: "text-h5 q-my-none" }, "專業護理服務計費系統")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_page_container, { class: "page-background" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_page, { padding: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="row q-col-gutter-md" data-v-8eb201ff${_scopeId3}><div class="col-12 col-md-8" data-v-8eb201ff${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_card, {
                          class: "main-card",
                          flat: "",
                          bordered: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_card_section, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="service-type-selector q-mb-md" data-v-8eb201ff${_scopeId5}><div class="row no-wrap" data-v-8eb201ff${_scopeId5}><div class="col text-center" data-v-8eb201ff${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_q_btn, {
                                      color: unref(selectedCategory) === "鐘點制" ? "primary" : "grey-5",
                                      "text-color": unref(selectedCategory) === "鐘點制" ? "white" : "grey-8",
                                      class: "service-type-btn",
                                      size: "lg",
                                      "no-caps": "",
                                      unelevated: "",
                                      onClick: ($event) => selectedCategory.value = "鐘點制"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` 鐘點制 `);
                                        } else {
                                          return [
                                            createTextVNode(" 鐘點制 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div><div class="col text-center" data-v-8eb201ff${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_q_btn, {
                                      color: unref(selectedCategory) === "包班制" ? "secondary" : "grey-5",
                                      "text-color": unref(selectedCategory) === "包班制" ? "white" : "grey-8",
                                      class: "service-type-btn",
                                      size: "lg",
                                      "no-caps": "",
                                      unelevated: "",
                                      onClick: ($event) => selectedCategory.value = "包班制"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` 包班制 `);
                                        } else {
                                          return [
                                            createTextVNode(" 包班制 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div></div></div><div class="row q-mt-md q-col-gutter-sm" data-v-8eb201ff${_scopeId5}><div class="col-12 col-sm-8" data-v-8eb201ff${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_q_input, {
                                      modelValue: unref(searchText),
                                      "onUpdate:modelValue": ($event) => isRef(searchText) ? searchText.value = $event : null,
                                      label: "搜尋服務項目",
                                      outlined: "",
                                      clearable: "",
                                      class: "search-input"
                                    }, {
                                      prepend: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_icon, {
                                            name: "search",
                                            color: "primary"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: "search",
                                              color: "primary"
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div><div class="col-12 col-sm-4" data-v-8eb201ff${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_q_btn, {
                                      color: "primary",
                                      icon: "refresh",
                                      label: "重置所有選擇",
                                      onClick: unref(resetSelections),
                                      class: "full-width",
                                      outline: ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "service-type-selector q-mb-md" }, [
                                        createVNode("div", { class: "row no-wrap" }, [
                                          createVNode("div", { class: "col text-center" }, [
                                            createVNode(_component_q_btn, {
                                              color: unref(selectedCategory) === "鐘點制" ? "primary" : "grey-5",
                                              "text-color": unref(selectedCategory) === "鐘點制" ? "white" : "grey-8",
                                              class: "service-type-btn",
                                              size: "lg",
                                              "no-caps": "",
                                              unelevated: "",
                                              onClick: ($event) => selectedCategory.value = "鐘點制"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" 鐘點制 ")
                                              ]),
                                              _: 1
                                            }, 8, ["color", "text-color", "onClick"])
                                          ]),
                                          createVNode("div", { class: "col text-center" }, [
                                            createVNode(_component_q_btn, {
                                              color: unref(selectedCategory) === "包班制" ? "secondary" : "grey-5",
                                              "text-color": unref(selectedCategory) === "包班制" ? "white" : "grey-8",
                                              class: "service-type-btn",
                                              size: "lg",
                                              "no-caps": "",
                                              unelevated: "",
                                              onClick: ($event) => selectedCategory.value = "包班制"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" 包班制 ")
                                              ]),
                                              _: 1
                                            }, 8, ["color", "text-color", "onClick"])
                                          ])
                                        ])
                                      ]),
                                      createVNode("div", { class: "row q-mt-md q-col-gutter-sm" }, [
                                        createVNode("div", { class: "col-12 col-sm-8" }, [
                                          createVNode(_component_q_input, {
                                            modelValue: unref(searchText),
                                            "onUpdate:modelValue": ($event) => isRef(searchText) ? searchText.value = $event : null,
                                            label: "搜尋服務項目",
                                            outlined: "",
                                            clearable: "",
                                            class: "search-input"
                                          }, {
                                            prepend: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "search",
                                                color: "primary"
                                              })
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        createVNode("div", { class: "col-12 col-sm-4" }, [
                                          createVNode(_component_q_btn, {
                                            color: "primary",
                                            icon: "refresh",
                                            label: "重置所有選擇",
                                            onClick: unref(resetSelections),
                                            class: "full-width",
                                            outline: ""
                                          }, null, 8, ["onClick"])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_card_section, { class: "q-pt-none" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="row items-center justify-between" data-v-8eb201ff${_scopeId5}><div class="text-subtitle2" data-v-8eb201ff${_scopeId5}>篩選選項：</div>`);
                                    _push6(ssrRenderComponent(_component_q_btn, {
                                      flat: "",
                                      dense: "",
                                      round: "",
                                      icon: unref(showFilters) ? "expand_less" : "expand_more",
                                      onClick: ($event) => showFilters.value = !unref(showFilters)
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                    _push6(ssrRenderComponent(_component_q_slide_transition, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div style="${ssrRenderStyle(unref(showFilters) ? null : { display: "none" })}" class="filter-section q-pa-sm rounded-borders q-mt-sm" data-v-8eb201ff${_scopeId6}><div class="filter-group" data-v-8eb201ff${_scopeId6}><div class="filter-label" data-v-8eb201ff${_scopeId6}>價格篩選：</div><div class="row q-col-gutter-sm" data-v-8eb201ff${_scopeId6}><div class="col-auto" data-v-8eb201ff${_scopeId6}>`);
                                          _push7(ssrRenderComponent(_component_q_chip, {
                                            clickable: "",
                                            onClick: ($event) => unref(applyFilter)("price", 100),
                                            color: unref(activeFilters).price === 100 ? "primary" : "grey-4",
                                            "text-color": unref(activeFilters).price === 100 ? "white" : "black",
                                            outline: unref(activeFilters).price !== 100
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` 價格 &gt; 100元 `);
                                              } else {
                                                return [
                                                  createTextVNode(" 價格 > 100元 ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`</div><div class="col-auto" data-v-8eb201ff${_scopeId6}>`);
                                          _push7(ssrRenderComponent(_component_q_chip, {
                                            clickable: "",
                                            onClick: ($event) => unref(applyFilter)("price", 50),
                                            color: unref(activeFilters).price === 50 ? "primary" : "grey-4",
                                            "text-color": unref(activeFilters).price === 50 ? "white" : "black",
                                            outline: unref(activeFilters).price !== 50
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` 價格 &gt; 50元 `);
                                              } else {
                                                return [
                                                  createTextVNode(" 價格 > 50元 ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`</div><div class="col-auto" data-v-8eb201ff${_scopeId6}>`);
                                          _push7(ssrRenderComponent(_component_q_chip, {
                                            clickable: "",
                                            onClick: ($event) => unref(applyFilter)("price", 0),
                                            color: unref(activeFilters).price === 0 ? "primary" : "grey-4",
                                            "text-color": unref(activeFilters).price === 0 ? "white" : "black",
                                            outline: unref(activeFilters).price !== 0
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` 全部 `);
                                              } else {
                                                return [
                                                  createTextVNode(" 全部 ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`</div></div></div><div class="filter-group q-mt-sm" data-v-8eb201ff${_scopeId6}><div class="filter-label" data-v-8eb201ff${_scopeId6}>類別篩選：</div><div class="row q-col-gutter-sm" data-v-8eb201ff${_scopeId6}><!--[-->`);
                                          ssrRenderList(unref(availableSubCategories), (subCat) => {
                                            _push7(`<div class="col-auto" data-v-8eb201ff${_scopeId6}>`);
                                            _push7(ssrRenderComponent(_component_q_chip, {
                                              clickable: "",
                                              onClick: ($event) => unref(applyFilter)("subCategory", subCat),
                                              color: unref(activeFilters).subCategory === subCat ? "secondary" : "grey-4",
                                              "text-color": unref(activeFilters).subCategory === subCat ? "white" : "black",
                                              outline: unref(activeFilters).subCategory !== subCat
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(subCat)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(subCat), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`</div>`);
                                          });
                                          _push7(`<!--]--><div class="col-auto" data-v-8eb201ff${_scopeId6}>`);
                                          _push7(ssrRenderComponent(_component_q_chip, {
                                            clickable: "",
                                            onClick: ($event) => unref(applyFilter)("subCategory", null),
                                            color: !unref(activeFilters).subCategory ? "secondary" : "grey-4",
                                            "text-color": !unref(activeFilters).subCategory ? "white" : "black",
                                            outline: unref(activeFilters).subCategory !== null
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` 全部 `);
                                              } else {
                                                return [
                                                  createTextVNode(" 全部 ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`</div></div></div><div class="text-right q-mt-sm" data-v-8eb201ff${_scopeId6}>`);
                                          _push7(ssrRenderComponent(_component_q_btn, {
                                            outline: "",
                                            size: "sm",
                                            color: "secondary",
                                            icon: "filter_alt_off",
                                            label: "清除篩選",
                                            onClick: unref(resetAllFilters),
                                            disable: !unref(isAnyFilterActive)
                                          }, null, _parent7, _scopeId6));
                                          _push7(`</div></div>`);
                                        } else {
                                          return [
                                            withDirectives(createVNode("div", { class: "filter-section q-pa-sm rounded-borders q-mt-sm" }, [
                                              createVNode("div", { class: "filter-group" }, [
                                                createVNode("div", { class: "filter-label" }, "價格篩選："),
                                                createVNode("div", { class: "row q-col-gutter-sm" }, [
                                                  createVNode("div", { class: "col-auto" }, [
                                                    createVNode(_component_q_chip, {
                                                      clickable: "",
                                                      onClick: ($event) => unref(applyFilter)("price", 100),
                                                      color: unref(activeFilters).price === 100 ? "primary" : "grey-4",
                                                      "text-color": unref(activeFilters).price === 100 ? "white" : "black",
                                                      outline: unref(activeFilters).price !== 100
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" 價格 > 100元 ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick", "color", "text-color", "outline"])
                                                  ]),
                                                  createVNode("div", { class: "col-auto" }, [
                                                    createVNode(_component_q_chip, {
                                                      clickable: "",
                                                      onClick: ($event) => unref(applyFilter)("price", 50),
                                                      color: unref(activeFilters).price === 50 ? "primary" : "grey-4",
                                                      "text-color": unref(activeFilters).price === 50 ? "white" : "black",
                                                      outline: unref(activeFilters).price !== 50
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" 價格 > 50元 ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick", "color", "text-color", "outline"])
                                                  ]),
                                                  createVNode("div", { class: "col-auto" }, [
                                                    createVNode(_component_q_chip, {
                                                      clickable: "",
                                                      onClick: ($event) => unref(applyFilter)("price", 0),
                                                      color: unref(activeFilters).price === 0 ? "primary" : "grey-4",
                                                      "text-color": unref(activeFilters).price === 0 ? "white" : "black",
                                                      outline: unref(activeFilters).price !== 0
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" 全部 ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick", "color", "text-color", "outline"])
                                                  ])
                                                ])
                                              ]),
                                              createVNode("div", { class: "filter-group q-mt-sm" }, [
                                                createVNode("div", { class: "filter-label" }, "類別篩選："),
                                                createVNode("div", { class: "row q-col-gutter-sm" }, [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(availableSubCategories), (subCat) => {
                                                    return openBlock(), createBlock("div", {
                                                      key: subCat,
                                                      class: "col-auto"
                                                    }, [
                                                      createVNode(_component_q_chip, {
                                                        clickable: "",
                                                        onClick: ($event) => unref(applyFilter)("subCategory", subCat),
                                                        color: unref(activeFilters).subCategory === subCat ? "secondary" : "grey-4",
                                                        "text-color": unref(activeFilters).subCategory === subCat ? "white" : "black",
                                                        outline: unref(activeFilters).subCategory !== subCat
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(subCat), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick", "color", "text-color", "outline"])
                                                    ]);
                                                  }), 128)),
                                                  createVNode("div", { class: "col-auto" }, [
                                                    createVNode(_component_q_chip, {
                                                      clickable: "",
                                                      onClick: ($event) => unref(applyFilter)("subCategory", null),
                                                      color: !unref(activeFilters).subCategory ? "secondary" : "grey-4",
                                                      "text-color": !unref(activeFilters).subCategory ? "white" : "black",
                                                      outline: unref(activeFilters).subCategory !== null
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" 全部 ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick", "color", "text-color", "outline"])
                                                  ])
                                                ])
                                              ]),
                                              createVNode("div", { class: "text-right q-mt-sm" }, [
                                                createVNode(_component_q_btn, {
                                                  outline: "",
                                                  size: "sm",
                                                  color: "secondary",
                                                  icon: "filter_alt_off",
                                                  label: "清除篩選",
                                                  onClick: unref(resetAllFilters),
                                                  disable: !unref(isAnyFilterActive)
                                                }, null, 8, ["onClick", "disable"])
                                              ])
                                            ], 512), [
                                              [vShow, unref(showFilters)]
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("div", { class: "row items-center justify-between" }, [
                                        createVNode("div", { class: "text-subtitle2" }, "篩選選項："),
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          dense: "",
                                          round: "",
                                          icon: unref(showFilters) ? "expand_less" : "expand_more",
                                          onClick: ($event) => showFilters.value = !unref(showFilters)
                                        }, null, 8, ["icon", "onClick"])
                                      ]),
                                      createVNode(_component_q_slide_transition, null, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode("div", { class: "filter-section q-pa-sm rounded-borders q-mt-sm" }, [
                                            createVNode("div", { class: "filter-group" }, [
                                              createVNode("div", { class: "filter-label" }, "價格篩選："),
                                              createVNode("div", { class: "row q-col-gutter-sm" }, [
                                                createVNode("div", { class: "col-auto" }, [
                                                  createVNode(_component_q_chip, {
                                                    clickable: "",
                                                    onClick: ($event) => unref(applyFilter)("price", 100),
                                                    color: unref(activeFilters).price === 100 ? "primary" : "grey-4",
                                                    "text-color": unref(activeFilters).price === 100 ? "white" : "black",
                                                    outline: unref(activeFilters).price !== 100
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" 價格 > 100元 ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick", "color", "text-color", "outline"])
                                                ]),
                                                createVNode("div", { class: "col-auto" }, [
                                                  createVNode(_component_q_chip, {
                                                    clickable: "",
                                                    onClick: ($event) => unref(applyFilter)("price", 50),
                                                    color: unref(activeFilters).price === 50 ? "primary" : "grey-4",
                                                    "text-color": unref(activeFilters).price === 50 ? "white" : "black",
                                                    outline: unref(activeFilters).price !== 50
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" 價格 > 50元 ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick", "color", "text-color", "outline"])
                                                ]),
                                                createVNode("div", { class: "col-auto" }, [
                                                  createVNode(_component_q_chip, {
                                                    clickable: "",
                                                    onClick: ($event) => unref(applyFilter)("price", 0),
                                                    color: unref(activeFilters).price === 0 ? "primary" : "grey-4",
                                                    "text-color": unref(activeFilters).price === 0 ? "white" : "black",
                                                    outline: unref(activeFilters).price !== 0
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" 全部 ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick", "color", "text-color", "outline"])
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "filter-group q-mt-sm" }, [
                                              createVNode("div", { class: "filter-label" }, "類別篩選："),
                                              createVNode("div", { class: "row q-col-gutter-sm" }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(availableSubCategories), (subCat) => {
                                                  return openBlock(), createBlock("div", {
                                                    key: subCat,
                                                    class: "col-auto"
                                                  }, [
                                                    createVNode(_component_q_chip, {
                                                      clickable: "",
                                                      onClick: ($event) => unref(applyFilter)("subCategory", subCat),
                                                      color: unref(activeFilters).subCategory === subCat ? "secondary" : "grey-4",
                                                      "text-color": unref(activeFilters).subCategory === subCat ? "white" : "black",
                                                      outline: unref(activeFilters).subCategory !== subCat
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(subCat), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick", "color", "text-color", "outline"])
                                                  ]);
                                                }), 128)),
                                                createVNode("div", { class: "col-auto" }, [
                                                  createVNode(_component_q_chip, {
                                                    clickable: "",
                                                    onClick: ($event) => unref(applyFilter)("subCategory", null),
                                                    color: !unref(activeFilters).subCategory ? "secondary" : "grey-4",
                                                    "text-color": !unref(activeFilters).subCategory ? "white" : "black",
                                                    outline: unref(activeFilters).subCategory !== null
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" 全部 ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick", "color", "text-color", "outline"])
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "text-right q-mt-sm" }, [
                                              createVNode(_component_q_btn, {
                                                outline: "",
                                                size: "sm",
                                                color: "secondary",
                                                icon: "filter_alt_off",
                                                label: "清除篩選",
                                                onClick: unref(resetAllFilters),
                                                disable: !unref(isAnyFilterActive)
                                              }, null, 8, ["onClick", "disable"])
                                            ])
                                          ], 512), [
                                            [vShow, unref(showFilters)]
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_card_section, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(selectedCategory) === "包班制") {
                                      _push6(`<div class="q-mb-md" data-v-8eb201ff${_scopeId5}><div class="text-subtitle1 q-mb-sm" data-v-8eb201ff${_scopeId5}>選擇班次</div><div class="row q-col-gutter-md" data-v-8eb201ff${_scopeId5}><!--[-->`);
                                      ssrRenderList(unref(shiftTypeItems), (item) => {
                                        _push6(`<div class="col-12 col-sm-6" data-v-8eb201ff${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_q_card, {
                                          class: {
                                            "shift-card": true,
                                            "shift-card-selected": unref(isSelected)(item)
                                          },
                                          clickable: "",
                                          onClick: ($event) => unref(selectShiftType)(item)
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_q_card_section, { class: "q-py-sm" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<div class="row items-center" data-v-8eb201ff${_scopeId7}><div class="col-auto" data-v-8eb201ff${_scopeId7}>`);
                                                    _push8(ssrRenderComponent(_component_q_icon, {
                                                      name: item.icon,
                                                      color: unref(getItemColor)(item),
                                                      size: "md"
                                                    }, null, _parent8, _scopeId7));
                                                    _push8(`</div><div class="col q-ml-sm" data-v-8eb201ff${_scopeId7}><div class="text-subtitle2" data-v-8eb201ff${_scopeId7}>${ssrInterpolate(item.name)}</div><div class="text-caption" data-v-8eb201ff${_scopeId7}>`);
                                                    _push8(ssrRenderComponent(_component_q_icon, {
                                                      name: "paid",
                                                      size: "xs",
                                                      color: "primary",
                                                      class: "q-mr-xs"
                                                    }, null, _parent8, _scopeId7));
                                                    _push8(`<span data-v-8eb201ff${_scopeId7}>${ssrInterpolate(unref(formatCurrency)(item.price))} 元/班</span></div></div><div class="col-auto" data-v-8eb201ff${_scopeId7}>`);
                                                    _push8(ssrRenderComponent(_component_q_radio, {
                                                      modelValue: unref(selectedShiftType),
                                                      "onUpdate:modelValue": ($event) => isRef(selectedShiftType) ? selectedShiftType.value = $event : null,
                                                      val: item.code,
                                                      color: "primary"
                                                    }, null, _parent8, _scopeId7));
                                                    _push8(`</div></div>`);
                                                  } else {
                                                    return [
                                                      createVNode("div", { class: "row items-center" }, [
                                                        createVNode("div", { class: "col-auto" }, [
                                                          createVNode(_component_q_icon, {
                                                            name: item.icon,
                                                            color: unref(getItemColor)(item),
                                                            size: "md"
                                                          }, null, 8, ["name", "color"])
                                                        ]),
                                                        createVNode("div", { class: "col q-ml-sm" }, [
                                                          createVNode("div", { class: "text-subtitle2" }, toDisplayString(item.name), 1),
                                                          createVNode("div", { class: "text-caption" }, [
                                                            createVNode(_component_q_icon, {
                                                              name: "paid",
                                                              size: "xs",
                                                              color: "primary",
                                                              class: "q-mr-xs"
                                                            }),
                                                            createVNode("span", null, toDisplayString(unref(formatCurrency)(item.price)) + " 元/班", 1)
                                                          ])
                                                        ]),
                                                        createVNode("div", { class: "col-auto" }, [
                                                          createVNode(_component_q_radio, {
                                                            modelValue: unref(selectedShiftType),
                                                            "onUpdate:modelValue": ($event) => isRef(selectedShiftType) ? selectedShiftType.value = $event : null,
                                                            val: item.code,
                                                            color: "primary"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "val"])
                                                        ])
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_q_card_section, { class: "q-py-sm" }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "row items-center" }, [
                                                      createVNode("div", { class: "col-auto" }, [
                                                        createVNode(_component_q_icon, {
                                                          name: item.icon,
                                                          color: unref(getItemColor)(item),
                                                          size: "md"
                                                        }, null, 8, ["name", "color"])
                                                      ]),
                                                      createVNode("div", { class: "col q-ml-sm" }, [
                                                        createVNode("div", { class: "text-subtitle2" }, toDisplayString(item.name), 1),
                                                        createVNode("div", { class: "text-caption" }, [
                                                          createVNode(_component_q_icon, {
                                                            name: "paid",
                                                            size: "xs",
                                                            color: "primary",
                                                            class: "q-mr-xs"
                                                          }),
                                                          createVNode("span", null, toDisplayString(unref(formatCurrency)(item.price)) + " 元/班", 1)
                                                        ])
                                                      ]),
                                                      createVNode("div", { class: "col-auto" }, [
                                                        createVNode(_component_q_radio, {
                                                          modelValue: unref(selectedShiftType),
                                                          "onUpdate:modelValue": ($event) => isRef(selectedShiftType) ? selectedShiftType.value = $event : null,
                                                          val: item.code,
                                                          color: "primary"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "val"])
                                                      ])
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      });
                                      _push6(`<!--]--></div></div>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`<div class="text-subtitle1 q-mb-sm" data-v-8eb201ff${_scopeId5}>${ssrInterpolate(unref(selectedCategory) === "包班制" ? "選擇附加服務" : "選擇服務項目")}</div>`);
                                    _push6(ssrRenderComponent(_component_q_list, {
                                      bordered: "",
                                      separator: "",
                                      class: "rounded-borders"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div${ssrRenderAttrs({ name: "list" })} data-v-8eb201ff>`);
                                          ssrRenderList(unref(filteredItems), (item) => {
                                            _push7(ssrRenderComponent(_component_q_item, mergeProps({
                                              key: item.code,
                                              clickable: !(unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)),
                                              onClick: ($event) => unref(toggleItem)(item),
                                              class: [{
                                                "selected-item": unref(isSelected)(item),
                                                "mandatory-item": item.code === "HR01",
                                                "disabled-item": unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)
                                              }, "service-item q-pa-md"],
                                              style: !(unref(selectedCategory) === "鐘點制" && item.subCategory === "時段加價") ? null : { display: "none" }
                                            }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(_component_q_icon, {
                                                          name: item.icon,
                                                          color: unref(getItemColor)(item),
                                                          size: "md"
                                                        }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_icon, {
                                                            name: item.icon,
                                                            color: unref(getItemColor)(item),
                                                            size: "md"
                                                          }, null, 8, ["name", "color"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_q_item_section, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(_component_q_item_label, { class: "text-weight-bold text-body1" }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`${ssrInterpolate(item.name)} `);
                                                              if (item.code === "HR01") {
                                                                _push10(ssrRenderComponent(_component_q_badge, {
                                                                  color: "positive",
                                                                  class: "q-ml-sm"
                                                                }, {
                                                                  default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                    if (_push11) {
                                                                      _push11(` 必選 `);
                                                                    } else {
                                                                      return [
                                                                        createTextVNode(" 必選 ")
                                                                      ];
                                                                    }
                                                                  }),
                                                                  _: 2
                                                                }, _parent10, _scopeId9));
                                                              } else {
                                                                _push10(`<!---->`);
                                                              }
                                                            } else {
                                                              return [
                                                                createTextVNode(toDisplayString(item.name) + " ", 1),
                                                                item.code === "HR01" ? (openBlock(), createBlock(_component_q_badge, {
                                                                  key: 0,
                                                                  color: "positive",
                                                                  class: "q-ml-sm"
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createTextVNode(" 必選 ")
                                                                  ]),
                                                                  _: 1
                                                                })) : createCommentVNode("", true)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(_component_q_item_label, {
                                                          caption: "",
                                                          class: "q-mt-sm"
                                                        }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`<div class="row items-center" data-v-8eb201ff${_scopeId9}>`);
                                                              _push10(ssrRenderComponent(_component_q_icon, {
                                                                name: "paid",
                                                                size: "xs",
                                                                color: "primary",
                                                                class: "q-mr-xs"
                                                              }, null, _parent10, _scopeId9));
                                                              _push10(`<span data-v-8eb201ff${_scopeId9}>金額：${ssrInterpolate(item.price)} 元</span></div>`);
                                                            } else {
                                                              return [
                                                                createVNode("div", { class: "row items-center" }, [
                                                                  createVNode(_component_q_icon, {
                                                                    name: "paid",
                                                                    size: "xs",
                                                                    color: "primary",
                                                                    class: "q-mr-xs"
                                                                  }),
                                                                  createVNode("span", null, "金額：" + toDisplayString(item.price) + " 元", 1)
                                                                ])
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_item_label, { class: "text-weight-bold text-body1" }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(item.name) + " ", 1),
                                                              item.code === "HR01" ? (openBlock(), createBlock(_component_q_badge, {
                                                                key: 0,
                                                                color: "positive",
                                                                class: "q-ml-sm"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode(" 必選 ")
                                                                ]),
                                                                _: 1
                                                              })) : createCommentVNode("", true)
                                                            ]),
                                                            _: 2
                                                          }, 1024),
                                                          createVNode(_component_q_item_label, {
                                                            caption: "",
                                                            class: "q-mt-sm"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode("div", { class: "row items-center" }, [
                                                                createVNode(_component_q_icon, {
                                                                  name: "paid",
                                                                  size: "xs",
                                                                  color: "primary",
                                                                  class: "q-mr-xs"
                                                                }),
                                                                createVNode("span", null, "金額：" + toDisplayString(item.price) + " 元", 1)
                                                              ])
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(_component_q_checkbox, {
                                                          onClick: ($event) => unref(toggleItem)(item),
                                                          modelValue: unref(selectedItems),
                                                          "onUpdate:modelValue": ($event) => isRef(selectedItems) ? selectedItems.value = $event : null,
                                                          val: item,
                                                          color: "primary",
                                                          disable: item.code === "HR01" && !unref(isSelected)(item) || unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item),
                                                          "aria-label": `選擇 ${item.name}`
                                                        }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_checkbox, {
                                                            onClick: withModifiers(($event) => unref(toggleItem)(item), ["stop"]),
                                                            modelValue: unref(selectedItems),
                                                            "onUpdate:modelValue": ($event) => isRef(selectedItems) ? selectedItems.value = $event : null,
                                                            val: item,
                                                            color: "primary",
                                                            disable: item.code === "HR01" && !unref(isSelected)(item) || unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item),
                                                            "aria-label": `選擇 ${item.name}`
                                                          }, null, 8, ["onClick", "modelValue", "onUpdate:modelValue", "val", "disable", "aria-label"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_icon, {
                                                          name: item.icon,
                                                          color: unref(getItemColor)(item),
                                                          size: "md"
                                                        }, null, 8, ["name", "color"])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_q_item_section, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_item_label, { class: "text-weight-bold text-body1" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(item.name) + " ", 1),
                                                            item.code === "HR01" ? (openBlock(), createBlock(_component_q_badge, {
                                                              key: 0,
                                                              color: "positive",
                                                              class: "q-ml-sm"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(" 必選 ")
                                                              ]),
                                                              _: 1
                                                            })) : createCommentVNode("", true)
                                                          ]),
                                                          _: 2
                                                        }, 1024),
                                                        createVNode(_component_q_item_label, {
                                                          caption: "",
                                                          class: "q-mt-sm"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "row items-center" }, [
                                                              createVNode(_component_q_icon, {
                                                                name: "paid",
                                                                size: "xs",
                                                                color: "primary",
                                                                class: "q-mr-xs"
                                                              }),
                                                              createVNode("span", null, "金額：" + toDisplayString(item.price) + " 元", 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_q_item_section, { side: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_checkbox, {
                                                          onClick: withModifiers(($event) => unref(toggleItem)(item), ["stop"]),
                                                          modelValue: unref(selectedItems),
                                                          "onUpdate:modelValue": ($event) => isRef(selectedItems) ? selectedItems.value = $event : null,
                                                          val: item,
                                                          color: "primary",
                                                          disable: item.code === "HR01" && !unref(isSelected)(item) || unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item),
                                                          "aria-label": `選擇 ${item.name}`
                                                        }, null, 8, ["onClick", "modelValue", "onUpdate:modelValue", "val", "disable", "aria-label"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          });
                                          _push7(`</div>`);
                                        } else {
                                          return [
                                            createVNode(TransitionGroup, {
                                              name: "list",
                                              tag: "div"
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredItems), (item) => {
                                                  return withDirectives((openBlock(), createBlock(_component_q_item, {
                                                    key: item.code,
                                                    clickable: !(unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)),
                                                    onClick: ($event) => unref(toggleItem)(item),
                                                    class: [{
                                                      "selected-item": unref(isSelected)(item),
                                                      "mandatory-item": item.code === "HR01",
                                                      "disabled-item": unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)
                                                    }, "service-item q-pa-md"]
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_q_icon, {
                                                            name: item.icon,
                                                            color: unref(getItemColor)(item),
                                                            size: "md"
                                                          }, null, 8, ["name", "color"])
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_q_item_section, null, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_q_item_label, { class: "text-weight-bold text-body1" }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(item.name) + " ", 1),
                                                              item.code === "HR01" ? (openBlock(), createBlock(_component_q_badge, {
                                                                key: 0,
                                                                color: "positive",
                                                                class: "q-ml-sm"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode(" 必選 ")
                                                                ]),
                                                                _: 1
                                                              })) : createCommentVNode("", true)
                                                            ]),
                                                            _: 2
                                                          }, 1024),
                                                          createVNode(_component_q_item_label, {
                                                            caption: "",
                                                            class: "q-mt-sm"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode("div", { class: "row items-center" }, [
                                                                createVNode(_component_q_icon, {
                                                                  name: "paid",
                                                                  size: "xs",
                                                                  color: "primary",
                                                                  class: "q-mr-xs"
                                                                }),
                                                                createVNode("span", null, "金額：" + toDisplayString(item.price) + " 元", 1)
                                                              ])
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_q_item_section, { side: "" }, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_q_checkbox, {
                                                            onClick: withModifiers(($event) => unref(toggleItem)(item), ["stop"]),
                                                            modelValue: unref(selectedItems),
                                                            "onUpdate:modelValue": ($event) => isRef(selectedItems) ? selectedItems.value = $event : null,
                                                            val: item,
                                                            color: "primary",
                                                            disable: item.code === "HR01" && !unref(isSelected)(item) || unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item),
                                                            "aria-label": `選擇 ${item.name}`
                                                          }, null, 8, ["onClick", "modelValue", "onUpdate:modelValue", "val", "disable", "aria-label"])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["clickable", "onClick", "class"])), [
                                                    [_directive_ripple],
                                                    [
                                                      vShow,
                                                      !(unref(selectedCategory) === "鐘點制" && item.subCategory === "時段加價")
                                                    ]
                                                  ]);
                                                }), 128))
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      unref(selectedCategory) === "包班制" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "q-mb-md"
                                      }, [
                                        createVNode("div", { class: "text-subtitle1 q-mb-sm" }, "選擇班次"),
                                        createVNode("div", { class: "row q-col-gutter-md" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(shiftTypeItems), (item) => {
                                            return openBlock(), createBlock("div", {
                                              class: "col-12 col-sm-6",
                                              key: item.code
                                            }, [
                                              createVNode(_component_q_card, {
                                                class: {
                                                  "shift-card": true,
                                                  "shift-card-selected": unref(isSelected)(item)
                                                },
                                                clickable: "",
                                                onClick: ($event) => unref(selectShiftType)(item)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_card_section, { class: "q-py-sm" }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "row items-center" }, [
                                                        createVNode("div", { class: "col-auto" }, [
                                                          createVNode(_component_q_icon, {
                                                            name: item.icon,
                                                            color: unref(getItemColor)(item),
                                                            size: "md"
                                                          }, null, 8, ["name", "color"])
                                                        ]),
                                                        createVNode("div", { class: "col q-ml-sm" }, [
                                                          createVNode("div", { class: "text-subtitle2" }, toDisplayString(item.name), 1),
                                                          createVNode("div", { class: "text-caption" }, [
                                                            createVNode(_component_q_icon, {
                                                              name: "paid",
                                                              size: "xs",
                                                              color: "primary",
                                                              class: "q-mr-xs"
                                                            }),
                                                            createVNode("span", null, toDisplayString(unref(formatCurrency)(item.price)) + " 元/班", 1)
                                                          ])
                                                        ]),
                                                        createVNode("div", { class: "col-auto" }, [
                                                          createVNode(_component_q_radio, {
                                                            modelValue: unref(selectedShiftType),
                                                            "onUpdate:modelValue": ($event) => isRef(selectedShiftType) ? selectedShiftType.value = $event : null,
                                                            val: item.code,
                                                            color: "primary"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "val"])
                                                        ])
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1032, ["class", "onClick"])
                                            ]);
                                          }), 128))
                                        ])
                                      ])) : createCommentVNode("", true),
                                      createVNode("div", { class: "text-subtitle1 q-mb-sm" }, toDisplayString(unref(selectedCategory) === "包班制" ? "選擇附加服務" : "選擇服務項目"), 1),
                                      createVNode(_component_q_list, {
                                        bordered: "",
                                        separator: "",
                                        class: "rounded-borders"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(TransitionGroup, {
                                            name: "list",
                                            tag: "div"
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredItems), (item) => {
                                                return withDirectives((openBlock(), createBlock(_component_q_item, {
                                                  key: item.code,
                                                  clickable: !(unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)),
                                                  onClick: ($event) => unref(toggleItem)(item),
                                                  class: [{
                                                    "selected-item": unref(isSelected)(item),
                                                    "mandatory-item": item.code === "HR01",
                                                    "disabled-item": unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)
                                                  }, "service-item q-pa-md"]
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_icon, {
                                                          name: item.icon,
                                                          color: unref(getItemColor)(item),
                                                          size: "md"
                                                        }, null, 8, ["name", "color"])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_q_item_section, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_item_label, { class: "text-weight-bold text-body1" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(item.name) + " ", 1),
                                                            item.code === "HR01" ? (openBlock(), createBlock(_component_q_badge, {
                                                              key: 0,
                                                              color: "positive",
                                                              class: "q-ml-sm"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(" 必選 ")
                                                              ]),
                                                              _: 1
                                                            })) : createCommentVNode("", true)
                                                          ]),
                                                          _: 2
                                                        }, 1024),
                                                        createVNode(_component_q_item_label, {
                                                          caption: "",
                                                          class: "q-mt-sm"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "row items-center" }, [
                                                              createVNode(_component_q_icon, {
                                                                name: "paid",
                                                                size: "xs",
                                                                color: "primary",
                                                                class: "q-mr-xs"
                                                              }),
                                                              createVNode("span", null, "金額：" + toDisplayString(item.price) + " 元", 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_q_item_section, { side: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_checkbox, {
                                                          onClick: withModifiers(($event) => unref(toggleItem)(item), ["stop"]),
                                                          modelValue: unref(selectedItems),
                                                          "onUpdate:modelValue": ($event) => isRef(selectedItems) ? selectedItems.value = $event : null,
                                                          val: item,
                                                          color: "primary",
                                                          disable: item.code === "HR01" && !unref(isSelected)(item) || unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item),
                                                          "aria-label": `選擇 ${item.name}`
                                                        }, null, 8, ["onClick", "modelValue", "onUpdate:modelValue", "val", "disable", "aria-label"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["clickable", "onClick", "class"])), [
                                                  [_directive_ripple],
                                                  [
                                                    vShow,
                                                    !(unref(selectedCategory) === "鐘點制" && item.subCategory === "時段加價")
                                                  ]
                                                ]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_card_section, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "service-type-selector q-mb-md" }, [
                                      createVNode("div", { class: "row no-wrap" }, [
                                        createVNode("div", { class: "col text-center" }, [
                                          createVNode(_component_q_btn, {
                                            color: unref(selectedCategory) === "鐘點制" ? "primary" : "grey-5",
                                            "text-color": unref(selectedCategory) === "鐘點制" ? "white" : "grey-8",
                                            class: "service-type-btn",
                                            size: "lg",
                                            "no-caps": "",
                                            unelevated: "",
                                            onClick: ($event) => selectedCategory.value = "鐘點制"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" 鐘點制 ")
                                            ]),
                                            _: 1
                                          }, 8, ["color", "text-color", "onClick"])
                                        ]),
                                        createVNode("div", { class: "col text-center" }, [
                                          createVNode(_component_q_btn, {
                                            color: unref(selectedCategory) === "包班制" ? "secondary" : "grey-5",
                                            "text-color": unref(selectedCategory) === "包班制" ? "white" : "grey-8",
                                            class: "service-type-btn",
                                            size: "lg",
                                            "no-caps": "",
                                            unelevated: "",
                                            onClick: ($event) => selectedCategory.value = "包班制"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" 包班制 ")
                                            ]),
                                            _: 1
                                          }, 8, ["color", "text-color", "onClick"])
                                        ])
                                      ])
                                    ]),
                                    createVNode("div", { class: "row q-mt-md q-col-gutter-sm" }, [
                                      createVNode("div", { class: "col-12 col-sm-8" }, [
                                        createVNode(_component_q_input, {
                                          modelValue: unref(searchText),
                                          "onUpdate:modelValue": ($event) => isRef(searchText) ? searchText.value = $event : null,
                                          label: "搜尋服務項目",
                                          outlined: "",
                                          clearable: "",
                                          class: "search-input"
                                        }, {
                                          prepend: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "search",
                                              color: "primary"
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      createVNode("div", { class: "col-12 col-sm-4" }, [
                                        createVNode(_component_q_btn, {
                                          color: "primary",
                                          icon: "refresh",
                                          label: "重置所有選擇",
                                          onClick: unref(resetSelections),
                                          class: "full-width",
                                          outline: ""
                                        }, null, 8, ["onClick"])
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_card_section, { class: "q-pt-none" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "row items-center justify-between" }, [
                                      createVNode("div", { class: "text-subtitle2" }, "篩選選項："),
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        dense: "",
                                        round: "",
                                        icon: unref(showFilters) ? "expand_less" : "expand_more",
                                        onClick: ($event) => showFilters.value = !unref(showFilters)
                                      }, null, 8, ["icon", "onClick"])
                                    ]),
                                    createVNode(_component_q_slide_transition, null, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode("div", { class: "filter-section q-pa-sm rounded-borders q-mt-sm" }, [
                                          createVNode("div", { class: "filter-group" }, [
                                            createVNode("div", { class: "filter-label" }, "價格篩選："),
                                            createVNode("div", { class: "row q-col-gutter-sm" }, [
                                              createVNode("div", { class: "col-auto" }, [
                                                createVNode(_component_q_chip, {
                                                  clickable: "",
                                                  onClick: ($event) => unref(applyFilter)("price", 100),
                                                  color: unref(activeFilters).price === 100 ? "primary" : "grey-4",
                                                  "text-color": unref(activeFilters).price === 100 ? "white" : "black",
                                                  outline: unref(activeFilters).price !== 100
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 價格 > 100元 ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick", "color", "text-color", "outline"])
                                              ]),
                                              createVNode("div", { class: "col-auto" }, [
                                                createVNode(_component_q_chip, {
                                                  clickable: "",
                                                  onClick: ($event) => unref(applyFilter)("price", 50),
                                                  color: unref(activeFilters).price === 50 ? "primary" : "grey-4",
                                                  "text-color": unref(activeFilters).price === 50 ? "white" : "black",
                                                  outline: unref(activeFilters).price !== 50
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 價格 > 50元 ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick", "color", "text-color", "outline"])
                                              ]),
                                              createVNode("div", { class: "col-auto" }, [
                                                createVNode(_component_q_chip, {
                                                  clickable: "",
                                                  onClick: ($event) => unref(applyFilter)("price", 0),
                                                  color: unref(activeFilters).price === 0 ? "primary" : "grey-4",
                                                  "text-color": unref(activeFilters).price === 0 ? "white" : "black",
                                                  outline: unref(activeFilters).price !== 0
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 全部 ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick", "color", "text-color", "outline"])
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "filter-group q-mt-sm" }, [
                                            createVNode("div", { class: "filter-label" }, "類別篩選："),
                                            createVNode("div", { class: "row q-col-gutter-sm" }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(availableSubCategories), (subCat) => {
                                                return openBlock(), createBlock("div", {
                                                  key: subCat,
                                                  class: "col-auto"
                                                }, [
                                                  createVNode(_component_q_chip, {
                                                    clickable: "",
                                                    onClick: ($event) => unref(applyFilter)("subCategory", subCat),
                                                    color: unref(activeFilters).subCategory === subCat ? "secondary" : "grey-4",
                                                    "text-color": unref(activeFilters).subCategory === subCat ? "white" : "black",
                                                    outline: unref(activeFilters).subCategory !== subCat
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(subCat), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick", "color", "text-color", "outline"])
                                                ]);
                                              }), 128)),
                                              createVNode("div", { class: "col-auto" }, [
                                                createVNode(_component_q_chip, {
                                                  clickable: "",
                                                  onClick: ($event) => unref(applyFilter)("subCategory", null),
                                                  color: !unref(activeFilters).subCategory ? "secondary" : "grey-4",
                                                  "text-color": !unref(activeFilters).subCategory ? "white" : "black",
                                                  outline: unref(activeFilters).subCategory !== null
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 全部 ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick", "color", "text-color", "outline"])
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "text-right q-mt-sm" }, [
                                            createVNode(_component_q_btn, {
                                              outline: "",
                                              size: "sm",
                                              color: "secondary",
                                              icon: "filter_alt_off",
                                              label: "清除篩選",
                                              onClick: unref(resetAllFilters),
                                              disable: !unref(isAnyFilterActive)
                                            }, null, 8, ["onClick", "disable"])
                                          ])
                                        ], 512), [
                                          [vShow, unref(showFilters)]
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_card_section, null, {
                                  default: withCtx(() => [
                                    unref(selectedCategory) === "包班制" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "q-mb-md"
                                    }, [
                                      createVNode("div", { class: "text-subtitle1 q-mb-sm" }, "選擇班次"),
                                      createVNode("div", { class: "row q-col-gutter-md" }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(shiftTypeItems), (item) => {
                                          return openBlock(), createBlock("div", {
                                            class: "col-12 col-sm-6",
                                            key: item.code
                                          }, [
                                            createVNode(_component_q_card, {
                                              class: {
                                                "shift-card": true,
                                                "shift-card-selected": unref(isSelected)(item)
                                              },
                                              clickable: "",
                                              onClick: ($event) => unref(selectShiftType)(item)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_card_section, { class: "q-py-sm" }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "row items-center" }, [
                                                      createVNode("div", { class: "col-auto" }, [
                                                        createVNode(_component_q_icon, {
                                                          name: item.icon,
                                                          color: unref(getItemColor)(item),
                                                          size: "md"
                                                        }, null, 8, ["name", "color"])
                                                      ]),
                                                      createVNode("div", { class: "col q-ml-sm" }, [
                                                        createVNode("div", { class: "text-subtitle2" }, toDisplayString(item.name), 1),
                                                        createVNode("div", { class: "text-caption" }, [
                                                          createVNode(_component_q_icon, {
                                                            name: "paid",
                                                            size: "xs",
                                                            color: "primary",
                                                            class: "q-mr-xs"
                                                          }),
                                                          createVNode("span", null, toDisplayString(unref(formatCurrency)(item.price)) + " 元/班", 1)
                                                        ])
                                                      ]),
                                                      createVNode("div", { class: "col-auto" }, [
                                                        createVNode(_component_q_radio, {
                                                          modelValue: unref(selectedShiftType),
                                                          "onUpdate:modelValue": ($event) => isRef(selectedShiftType) ? selectedShiftType.value = $event : null,
                                                          val: item.code,
                                                          color: "primary"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "val"])
                                                      ])
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "onClick"])
                                          ]);
                                        }), 128))
                                      ])
                                    ])) : createCommentVNode("", true),
                                    createVNode("div", { class: "text-subtitle1 q-mb-sm" }, toDisplayString(unref(selectedCategory) === "包班制" ? "選擇附加服務" : "選擇服務項目"), 1),
                                    createVNode(_component_q_list, {
                                      bordered: "",
                                      separator: "",
                                      class: "rounded-borders"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(TransitionGroup, {
                                          name: "list",
                                          tag: "div"
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredItems), (item) => {
                                              return withDirectives((openBlock(), createBlock(_component_q_item, {
                                                key: item.code,
                                                clickable: !(unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)),
                                                onClick: ($event) => unref(toggleItem)(item),
                                                class: [{
                                                  "selected-item": unref(isSelected)(item),
                                                  "mandatory-item": item.code === "HR01",
                                                  "disabled-item": unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)
                                                }, "service-item q-pa-md"]
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_icon, {
                                                        name: item.icon,
                                                        color: unref(getItemColor)(item),
                                                        size: "md"
                                                      }, null, 8, ["name", "color"])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_q_item_section, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_item_label, { class: "text-weight-bold text-body1" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(item.name) + " ", 1),
                                                          item.code === "HR01" ? (openBlock(), createBlock(_component_q_badge, {
                                                            key: 0,
                                                            color: "positive",
                                                            class: "q-ml-sm"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(" 必選 ")
                                                            ]),
                                                            _: 1
                                                          })) : createCommentVNode("", true)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_q_item_label, {
                                                        caption: "",
                                                        class: "q-mt-sm"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "row items-center" }, [
                                                            createVNode(_component_q_icon, {
                                                              name: "paid",
                                                              size: "xs",
                                                              color: "primary",
                                                              class: "q-mr-xs"
                                                            }),
                                                            createVNode("span", null, "金額：" + toDisplayString(item.price) + " 元", 1)
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_q_item_section, { side: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_checkbox, {
                                                        onClick: withModifiers(($event) => unref(toggleItem)(item), ["stop"]),
                                                        modelValue: unref(selectedItems),
                                                        "onUpdate:modelValue": ($event) => isRef(selectedItems) ? selectedItems.value = $event : null,
                                                        val: item,
                                                        color: "primary",
                                                        disable: item.code === "HR01" && !unref(isSelected)(item) || unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item),
                                                        "aria-label": `選擇 ${item.name}`
                                                      }, null, 8, ["onClick", "modelValue", "onUpdate:modelValue", "val", "disable", "aria-label"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1032, ["clickable", "onClick", "class"])), [
                                                [_directive_ripple],
                                                [
                                                  vShow,
                                                  !(unref(selectedCategory) === "鐘點制" && item.subCategory === "時段加價")
                                                ]
                                              ]);
                                            }), 128))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="col-12 col-md-4" data-v-8eb201ff${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_card, {
                          class: "summary-card",
                          flat: "",
                          bordered: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_card_section, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="text-h6 text-primary" data-v-8eb201ff${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_q_icon, { name: "summarize" }, null, _parent6, _scopeId5));
                                    _push6(` 費用統計 </div>`);
                                    if (unref(selectedCategory) === "鐘點制") {
                                      _push6(`<div class="q-mt-md" data-v-8eb201ff${_scopeId5}><div class="row items-center justify-between" data-v-8eb201ff${_scopeId5}><div class="text-subtitle2" data-v-8eb201ff${_scopeId5}>服務時間設定</div>`);
                                      _push6(ssrRenderComponent(_component_q_btn, {
                                        flat: "",
                                        dense: "",
                                        round: "",
                                        icon: unref(showCalculator) ? "expand_less" : "expand_more",
                                        onClick: ($event) => showCalculator.value = !unref(showCalculator)
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                      _push6(ssrRenderComponent(_component_q_slide_transition, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div style="${ssrRenderStyle(unref(showCalculator) ? null : { display: "none" })}" class="q-mt-sm" data-v-8eb201ff${_scopeId6}><div class="q-mb-sm" data-v-8eb201ff${_scopeId6}><div class="text-subtitle2 q-mb-xs" data-v-8eb201ff${_scopeId6}>天數選擇</div><div class="row justify-between q-col-gutter-xs" data-v-8eb201ff${_scopeId6}><!--[-->`);
                                            ssrRenderList([1, 2, 3, 5, 7], (days) => {
                                              _push7(`<div class="col-2" data-v-8eb201ff${_scopeId6}>`);
                                              _push7(ssrRenderComponent(_component_q_btn, {
                                                color: unref(dayCount) === days ? "secondary" : "white",
                                                "text-color": unref(dayCount) === days ? "white" : "secondary",
                                                label: `${days}天`,
                                                size: "sm",
                                                onClick: ($event) => dayCount.value = days,
                                                unelevated: unref(dayCount) === days,
                                                flat: unref(dayCount) !== days,
                                                class: "q-px-xs day-btn full-width",
                                                style: { "border": "dayCount !== days ? '1px solid #26a69a' : 'none'" }
                                              }, null, _parent7, _scopeId6));
                                              _push7(`</div>`);
                                            });
                                            _push7(`<!--]--></div>`);
                                            _push7(ssrRenderComponent(_component_q_input, {
                                              modelValue: unref(dayCount),
                                              "onUpdate:modelValue": ($event) => isRef(dayCount) ? dayCount.value = $event : null,
                                              modelModifiers: { number: true },
                                              type: "number",
                                              label: "自定義天數",
                                              outlined: "",
                                              dense: "",
                                              min: "1",
                                              class: "q-mt-sm",
                                              rules: [(val) => val >= 1 || "請輸入有效天數"]
                                            }, {
                                              prepend: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_q_icon, {
                                                    name: "event",
                                                    color: "secondary"
                                                  }, null, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_icon, {
                                                      name: "event",
                                                      color: "secondary"
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(`</div><div class="q-mb-sm" data-v-8eb201ff${_scopeId6}><div class="text-subtitle2 q-mb-xs" data-v-8eb201ff${_scopeId6}>每日服務時數</div><div class="row justify-between q-col-gutter-xs" data-v-8eb201ff${_scopeId6}><!--[-->`);
                                            ssrRenderList([4, 8, 10, 12, 24], (hours) => {
                                              _push7(`<div class="col-2" data-v-8eb201ff${_scopeId6}>`);
                                              _push7(ssrRenderComponent(_component_q_btn, {
                                                color: unref(hourCount) === hours ? "primary" : "white",
                                                "text-color": unref(hourCount) === hours ? "white" : "primary",
                                                label: `${hours}時`,
                                                size: "sm",
                                                onClick: ($event) => hourCount.value = hours,
                                                unelevated: unref(hourCount) === hours,
                                                flat: unref(hourCount) !== hours,
                                                class: "q-px-xs hour-btn full-width",
                                                style: { "border": "hourCount !== hours ? '1px solid #1976d2' : 'none'" }
                                              }, null, _parent7, _scopeId6));
                                              _push7(`</div>`);
                                            });
                                            _push7(`<!--]--></div>`);
                                            _push7(ssrRenderComponent(_component_q_input, {
                                              modelValue: unref(hourCount),
                                              "onUpdate:modelValue": ($event) => isRef(hourCount) ? hourCount.value = $event : null,
                                              modelModifiers: { number: true },
                                              type: "number",
                                              label: "自定義小時數",
                                              outlined: "",
                                              dense: "",
                                              min: "1",
                                              class: "q-mt-sm",
                                              rules: [(val) => val >= 1 || "請輸入有效小時數"]
                                            }, {
                                              prepend: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_q_icon, {
                                                    name: "schedule",
                                                    color: "primary"
                                                  }, null, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_icon, {
                                                      name: "schedule",
                                                      color: "primary"
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(`</div><div class="q-mt-md" data-v-8eb201ff${_scopeId6}><div class="row items-center justify-between" data-v-8eb201ff${_scopeId6}><div class="text-subtitle2" data-v-8eb201ff${_scopeId6}>加價項目</div>`);
                                            _push7(ssrRenderComponent(_component_q_btn, {
                                              flat: "",
                                              dense: "",
                                              round: "",
                                              icon: unref(showAdditionalItems) ? "expand_less" : "expand_more",
                                              onClick: ($event) => showAdditionalItems.value = !unref(showAdditionalItems)
                                            }, null, _parent7, _scopeId6));
                                            _push7(`</div>`);
                                            _push7(ssrRenderComponent(_component_q_slide_transition, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<div style="${ssrRenderStyle(unref(showAdditionalItems) ? null : { display: "none" })}" class="row q-col-gutter-sm q-mt-sm" data-v-8eb201ff${_scopeId7}><div class="col-12" data-v-8eb201ff${_scopeId7}><div class="row items-center" data-v-8eb201ff${_scopeId7}><div class="col" data-v-8eb201ff${_scopeId7}>`);
                                                  _push8(ssrRenderComponent(_component_q_toggle, {
                                                    modelValue: unref(isNightShift),
                                                    "onUpdate:modelValue": [($event) => isRef(isNightShift) ? isNightShift.value = $event : null, ($event) => unref(toggleAdditionalService)("HR09")],
                                                    label: "夜間時段 (22:00-08:00)",
                                                    color: "blue-grey"
                                                  }, null, _parent8, _scopeId7));
                                                  _push8(`</div><div class="col-auto text-blue-grey" data-v-8eb201ff${_scopeId7}>`);
                                                  _push8(ssrRenderComponent(_component_q_badge, {
                                                    color: "blue-grey",
                                                    "text-color": "white"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(unref(formatCurrency)(20))} 元 `);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(unref(formatCurrency)(20)) + " 元 ", 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(`</div></div></div><div class="col-12" data-v-8eb201ff${_scopeId7}><div class="row items-center" data-v-8eb201ff${_scopeId7}><div class="col" data-v-8eb201ff${_scopeId7}>`);
                                                  _push8(ssrRenderComponent(_component_q_toggle, {
                                                    modelValue: unref(isUrgent),
                                                    "onUpdate:modelValue": [($event) => isRef(isUrgent) ? isUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR10")],
                                                    label: "加價急徵",
                                                    color: "amber"
                                                  }, null, _parent8, _scopeId7));
                                                  _push8(`</div><div class="col-auto text-amber" data-v-8eb201ff${_scopeId7}>`);
                                                  _push8(ssrRenderComponent(_component_q_badge, {
                                                    color: "amber",
                                                    "text-color": "white"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(unref(formatCurrency)(30))} 元 `);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(`</div></div></div><div class="col-12" data-v-8eb201ff${_scopeId7}><div class="row items-center" data-v-8eb201ff${_scopeId7}><div class="col" data-v-8eb201ff${_scopeId7}>`);
                                                  _push8(ssrRenderComponent(_component_q_toggle, {
                                                    modelValue: unref(isDoubleUrgent),
                                                    "onUpdate:modelValue": [($event) => isRef(isDoubleUrgent) ? isDoubleUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR11")],
                                                    label: "二次加價急徵",
                                                    color: "orange"
                                                  }, null, _parent8, _scopeId7));
                                                  _push8(`</div><div class="col-auto text-orange" data-v-8eb201ff${_scopeId7}>`);
                                                  _push8(ssrRenderComponent(_component_q_badge, {
                                                    color: "orange",
                                                    "text-color": "white"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(unref(formatCurrency)(30))} 元 `);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(`</div></div></div></div>`);
                                                } else {
                                                  return [
                                                    withDirectives(createVNode("div", { class: "row q-col-gutter-sm q-mt-sm" }, [
                                                      createVNode("div", { class: "col-12" }, [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode("div", { class: "col" }, [
                                                            createVNode(_component_q_toggle, {
                                                              modelValue: unref(isNightShift),
                                                              "onUpdate:modelValue": [($event) => isRef(isNightShift) ? isNightShift.value = $event : null, ($event) => unref(toggleAdditionalService)("HR09")],
                                                              label: "夜間時段 (22:00-08:00)",
                                                              color: "blue-grey"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                          ]),
                                                          createVNode("div", { class: "col-auto text-blue-grey" }, [
                                                            createVNode(_component_q_badge, {
                                                              color: "blue-grey",
                                                              "text-color": "white"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(unref(formatCurrency)(20)) + " 元 ", 1)
                                                              ]),
                                                              _: 1
                                                            })
                                                          ])
                                                        ])
                                                      ]),
                                                      createVNode("div", { class: "col-12" }, [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode("div", { class: "col" }, [
                                                            createVNode(_component_q_toggle, {
                                                              modelValue: unref(isUrgent),
                                                              "onUpdate:modelValue": [($event) => isRef(isUrgent) ? isUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR10")],
                                                              label: "加價急徵",
                                                              color: "amber"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                          ]),
                                                          createVNode("div", { class: "col-auto text-amber" }, [
                                                            createVNode(_component_q_badge, {
                                                              color: "amber",
                                                              "text-color": "white"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                              ]),
                                                              _: 1
                                                            })
                                                          ])
                                                        ])
                                                      ]),
                                                      createVNode("div", { class: "col-12" }, [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode("div", { class: "col" }, [
                                                            createVNode(_component_q_toggle, {
                                                              modelValue: unref(isDoubleUrgent),
                                                              "onUpdate:modelValue": [($event) => isRef(isDoubleUrgent) ? isDoubleUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR11")],
                                                              label: "二次加價急徵",
                                                              color: "orange"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                          ]),
                                                          createVNode("div", { class: "col-auto text-orange" }, [
                                                            createVNode(_component_q_badge, {
                                                              color: "orange",
                                                              "text-color": "white"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                              ]),
                                                              _: 1
                                                            })
                                                          ])
                                                        ])
                                                      ])
                                                    ], 512), [
                                                      [vShow, unref(showAdditionalItems)]
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(`</div><div class="text-subtitle1 q-mt-sm text-primary text-center" data-v-8eb201ff${_scopeId6}> 預計費用：${ssrInterpolate(unref(formatCurrency)(unref(hourlyTotalWithTime)))} 元 <div class="text-caption text-grey text-center" data-v-8eb201ff${_scopeId6}> (服務項目 ${ssrInterpolate(unref(formatCurrency)(
                                              unref(selectedHourlyItems).reduce(
                                                (sum, item) => item.subCategory === "時段加價" ? sum : sum + item.price,
                                                0
                                              )
                                            ))} 元 x ${ssrInterpolate(unref(hourCount))} 時 x ${ssrInterpolate(unref(dayCount))} 天 + 加價項目 ${ssrInterpolate(unref(formatCurrency)(
                                              unref(selectedHourlyItems).reduce(
                                                (sum, item) => item.subCategory === "時段加價" ? sum + item.price : sum,
                                                0
                                              ) * unref(dayCount)
                                            ))} 元) </div></div></div>`);
                                          } else {
                                            return [
                                              withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                                createVNode("div", { class: "q-mb-sm" }, [
                                                  createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "天數選擇"),
                                                  createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                                    (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3, 5, 7], (days) => {
                                                      return createVNode("div", {
                                                        class: "col-2",
                                                        key: days
                                                      }, [
                                                        createVNode(_component_q_btn, {
                                                          color: unref(dayCount) === days ? "secondary" : "white",
                                                          "text-color": unref(dayCount) === days ? "white" : "secondary",
                                                          label: `${days}天`,
                                                          size: "sm",
                                                          onClick: ($event) => dayCount.value = days,
                                                          unelevated: unref(dayCount) === days,
                                                          flat: unref(dayCount) !== days,
                                                          class: "q-px-xs day-btn full-width",
                                                          style: { "border": "dayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                        }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                      ]);
                                                    }), 64))
                                                  ]),
                                                  createVNode(_component_q_input, {
                                                    modelValue: unref(dayCount),
                                                    "onUpdate:modelValue": ($event) => isRef(dayCount) ? dayCount.value = $event : null,
                                                    modelModifiers: { number: true },
                                                    type: "number",
                                                    label: "自定義天數",
                                                    outlined: "",
                                                    dense: "",
                                                    min: "1",
                                                    class: "q-mt-sm",
                                                    rules: [(val) => val >= 1 || "請輸入有效天數"]
                                                  }, {
                                                    prepend: withCtx(() => [
                                                      createVNode(_component_q_icon, {
                                                        name: "event",
                                                        color: "secondary"
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                                ]),
                                                createVNode("div", { class: "q-mb-sm" }, [
                                                  createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "每日服務時數"),
                                                  createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                                    (openBlock(), createBlock(Fragment, null, renderList([4, 8, 10, 12, 24], (hours) => {
                                                      return createVNode("div", {
                                                        class: "col-2",
                                                        key: hours
                                                      }, [
                                                        createVNode(_component_q_btn, {
                                                          color: unref(hourCount) === hours ? "primary" : "white",
                                                          "text-color": unref(hourCount) === hours ? "white" : "primary",
                                                          label: `${hours}時`,
                                                          size: "sm",
                                                          onClick: ($event) => hourCount.value = hours,
                                                          unelevated: unref(hourCount) === hours,
                                                          flat: unref(hourCount) !== hours,
                                                          class: "q-px-xs hour-btn full-width",
                                                          style: { "border": "hourCount !== hours ? '1px solid #1976d2' : 'none'" }
                                                        }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                      ]);
                                                    }), 64))
                                                  ]),
                                                  createVNode(_component_q_input, {
                                                    modelValue: unref(hourCount),
                                                    "onUpdate:modelValue": ($event) => isRef(hourCount) ? hourCount.value = $event : null,
                                                    modelModifiers: { number: true },
                                                    type: "number",
                                                    label: "自定義小時數",
                                                    outlined: "",
                                                    dense: "",
                                                    min: "1",
                                                    class: "q-mt-sm",
                                                    rules: [(val) => val >= 1 || "請輸入有效小時數"]
                                                  }, {
                                                    prepend: withCtx(() => [
                                                      createVNode(_component_q_icon, {
                                                        name: "schedule",
                                                        color: "primary"
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                                ]),
                                                createVNode("div", { class: "q-mt-md" }, [
                                                  createVNode("div", { class: "row items-center justify-between" }, [
                                                    createVNode("div", { class: "text-subtitle2" }, "加價項目"),
                                                    createVNode(_component_q_btn, {
                                                      flat: "",
                                                      dense: "",
                                                      round: "",
                                                      icon: unref(showAdditionalItems) ? "expand_less" : "expand_more",
                                                      onClick: ($event) => showAdditionalItems.value = !unref(showAdditionalItems)
                                                    }, null, 8, ["icon", "onClick"])
                                                  ]),
                                                  createVNode(_component_q_slide_transition, null, {
                                                    default: withCtx(() => [
                                                      withDirectives(createVNode("div", { class: "row q-col-gutter-sm q-mt-sm" }, [
                                                        createVNode("div", { class: "col-12" }, [
                                                          createVNode("div", { class: "row items-center" }, [
                                                            createVNode("div", { class: "col" }, [
                                                              createVNode(_component_q_toggle, {
                                                                modelValue: unref(isNightShift),
                                                                "onUpdate:modelValue": [($event) => isRef(isNightShift) ? isNightShift.value = $event : null, ($event) => unref(toggleAdditionalService)("HR09")],
                                                                label: "夜間時段 (22:00-08:00)",
                                                                color: "blue-grey"
                                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                            ]),
                                                            createVNode("div", { class: "col-auto text-blue-grey" }, [
                                                              createVNode(_component_q_badge, {
                                                                color: "blue-grey",
                                                                "text-color": "white"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode(toDisplayString(unref(formatCurrency)(20)) + " 元 ", 1)
                                                                ]),
                                                                _: 1
                                                              })
                                                            ])
                                                          ])
                                                        ]),
                                                        createVNode("div", { class: "col-12" }, [
                                                          createVNode("div", { class: "row items-center" }, [
                                                            createVNode("div", { class: "col" }, [
                                                              createVNode(_component_q_toggle, {
                                                                modelValue: unref(isUrgent),
                                                                "onUpdate:modelValue": [($event) => isRef(isUrgent) ? isUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR10")],
                                                                label: "加價急徵",
                                                                color: "amber"
                                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                            ]),
                                                            createVNode("div", { class: "col-auto text-amber" }, [
                                                              createVNode(_component_q_badge, {
                                                                color: "amber",
                                                                "text-color": "white"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                                ]),
                                                                _: 1
                                                              })
                                                            ])
                                                          ])
                                                        ]),
                                                        createVNode("div", { class: "col-12" }, [
                                                          createVNode("div", { class: "row items-center" }, [
                                                            createVNode("div", { class: "col" }, [
                                                              createVNode(_component_q_toggle, {
                                                                modelValue: unref(isDoubleUrgent),
                                                                "onUpdate:modelValue": [($event) => isRef(isDoubleUrgent) ? isDoubleUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR11")],
                                                                label: "二次加價急徵",
                                                                color: "orange"
                                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                            ]),
                                                            createVNode("div", { class: "col-auto text-orange" }, [
                                                              createVNode(_component_q_badge, {
                                                                color: "orange",
                                                                "text-color": "white"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                                ]),
                                                                _: 1
                                                              })
                                                            ])
                                                          ])
                                                        ])
                                                      ], 512), [
                                                        [vShow, unref(showAdditionalItems)]
                                                      ])
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                                  createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(hourlyTotalWithTime))) + " 元 ", 1),
                                                  createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                                    unref(selectedHourlyItems).reduce(
                                                      (sum, item) => item.subCategory === "時段加價" ? sum : sum + item.price,
                                                      0
                                                    )
                                                  )) + " 元 x " + toDisplayString(unref(hourCount)) + " 時 x " + toDisplayString(unref(dayCount)) + " 天 + 加價項目 " + toDisplayString(unref(formatCurrency)(
                                                    unref(selectedHourlyItems).reduce(
                                                      (sum, item) => item.subCategory === "時段加價" ? sum + item.price : sum,
                                                      0
                                                    ) * unref(dayCount)
                                                  )) + " 元) ", 1)
                                                ])
                                              ], 512), [
                                                [vShow, unref(showCalculator)]
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    if (unref(selectedCategory) === "包班制") {
                                      _push6(`<div class="q-mt-md" data-v-8eb201ff${_scopeId5}><div class="row items-center justify-between" data-v-8eb201ff${_scopeId5}><div class="text-subtitle2" data-v-8eb201ff${_scopeId5}>包班時間設定</div>`);
                                      _push6(ssrRenderComponent(_component_q_btn, {
                                        flat: "",
                                        dense: "",
                                        round: "",
                                        icon: unref(showShiftCalculator) ? "expand_less" : "expand_more",
                                        onClick: ($event) => showShiftCalculator.value = !unref(showShiftCalculator)
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                      _push6(ssrRenderComponent(_component_q_slide_transition, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div style="${ssrRenderStyle(unref(showShiftCalculator) ? null : { display: "none" })}" class="q-mt-sm" data-v-8eb201ff${_scopeId6}><div class="q-mb-sm" data-v-8eb201ff${_scopeId6}><div class="text-subtitle2 q-mb-xs" data-v-8eb201ff${_scopeId6}>包班天數</div><div class="row q-col-gutter-xs" data-v-8eb201ff${_scopeId6}><!--[-->`);
                                            ssrRenderList([1, 3, 5, 7, 14], (days) => {
                                              _push7(`<div class="col-auto" data-v-8eb201ff${_scopeId6}>`);
                                              _push7(ssrRenderComponent(_component_q_btn, {
                                                color: unref(shiftDayCount) === days ? "secondary" : "white",
                                                "text-color": unref(shiftDayCount) === days ? "white" : "secondary",
                                                label: `${days}天`,
                                                size: "sm",
                                                onClick: ($event) => shiftDayCount.value = days,
                                                unelevated: unref(shiftDayCount) === days,
                                                flat: unref(shiftDayCount) !== days,
                                                class: "q-px-sm day-btn",
                                                style: { "border": "shiftDayCount !== days ? '1px solid #26a69a' : 'none'" }
                                              }, null, _parent7, _scopeId6));
                                              _push7(`</div>`);
                                            });
                                            _push7(`<!--]--></div>`);
                                            _push7(ssrRenderComponent(_component_q_input, {
                                              modelValue: unref(shiftDayCount),
                                              "onUpdate:modelValue": ($event) => isRef(shiftDayCount) ? shiftDayCount.value = $event : null,
                                              modelModifiers: { number: true },
                                              type: "number",
                                              label: "自定義天數",
                                              outlined: "",
                                              dense: "",
                                              min: "1",
                                              class: "q-mt-sm",
                                              rules: [(val) => val >= 1 || "請輸入有效天數"]
                                            }, {
                                              prepend: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_q_icon, {
                                                    name: "event",
                                                    color: "secondary"
                                                  }, null, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_icon, {
                                                      name: "event",
                                                      color: "secondary"
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(`</div><div class="text-subtitle1 q-mt-sm text-primary text-center" data-v-8eb201ff${_scopeId6}> 預計費用：${ssrInterpolate(unref(formatCurrency)(unref(shiftTotalWithDays)))} 元 <div class="text-caption text-grey text-center" data-v-8eb201ff${_scopeId6}> (服務項目 ${ssrInterpolate(unref(formatCurrency)(
                                              unref(selectedShiftItems).reduce(
                                                (sum, item) => sum + item.price,
                                                0
                                              ) + (unref(selectedShiftType) === "SH01" ? 3e3 : 5500)
                                            ))} 元 x ${ssrInterpolate(unref(shiftDayCount))} 天) </div></div></div>`);
                                          } else {
                                            return [
                                              withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                                createVNode("div", { class: "q-mb-sm" }, [
                                                  createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "包班天數"),
                                                  createVNode("div", { class: "row q-col-gutter-xs" }, [
                                                    (openBlock(), createBlock(Fragment, null, renderList([1, 3, 5, 7, 14], (days) => {
                                                      return createVNode("div", {
                                                        class: "col-auto",
                                                        key: days
                                                      }, [
                                                        createVNode(_component_q_btn, {
                                                          color: unref(shiftDayCount) === days ? "secondary" : "white",
                                                          "text-color": unref(shiftDayCount) === days ? "white" : "secondary",
                                                          label: `${days}天`,
                                                          size: "sm",
                                                          onClick: ($event) => shiftDayCount.value = days,
                                                          unelevated: unref(shiftDayCount) === days,
                                                          flat: unref(shiftDayCount) !== days,
                                                          class: "q-px-sm day-btn",
                                                          style: { "border": "shiftDayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                        }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                      ]);
                                                    }), 64))
                                                  ]),
                                                  createVNode(_component_q_input, {
                                                    modelValue: unref(shiftDayCount),
                                                    "onUpdate:modelValue": ($event) => isRef(shiftDayCount) ? shiftDayCount.value = $event : null,
                                                    modelModifiers: { number: true },
                                                    type: "number",
                                                    label: "自定義天數",
                                                    outlined: "",
                                                    dense: "",
                                                    min: "1",
                                                    class: "q-mt-sm",
                                                    rules: [(val) => val >= 1 || "請輸入有效天數"]
                                                  }, {
                                                    prepend: withCtx(() => [
                                                      createVNode(_component_q_icon, {
                                                        name: "event",
                                                        color: "secondary"
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                                ]),
                                                createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                                  createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(shiftTotalWithDays))) + " 元 ", 1),
                                                  createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                                    unref(selectedShiftItems).reduce(
                                                      (sum, item) => sum + item.price,
                                                      0
                                                    ) + (unref(selectedShiftType) === "SH01" ? 3e3 : 5500)
                                                  )) + " 元 x " + toDisplayString(unref(shiftDayCount)) + " 天) ", 1)
                                                ])
                                              ], 512), [
                                                [vShow, unref(showShiftCalculator)]
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      createVNode("div", { class: "text-h6 text-primary" }, [
                                        createVNode(_component_q_icon, { name: "summarize" }),
                                        createTextVNode(" 費用統計 ")
                                      ]),
                                      unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "q-mt-md"
                                      }, [
                                        createVNode("div", { class: "row items-center justify-between" }, [
                                          createVNode("div", { class: "text-subtitle2" }, "服務時間設定"),
                                          createVNode(_component_q_btn, {
                                            flat: "",
                                            dense: "",
                                            round: "",
                                            icon: unref(showCalculator) ? "expand_less" : "expand_more",
                                            onClick: ($event) => showCalculator.value = !unref(showCalculator)
                                          }, null, 8, ["icon", "onClick"])
                                        ]),
                                        createVNode(_component_q_slide_transition, null, {
                                          default: withCtx(() => [
                                            withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                              createVNode("div", { class: "q-mb-sm" }, [
                                                createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "天數選擇"),
                                                createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                                  (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3, 5, 7], (days) => {
                                                    return createVNode("div", {
                                                      class: "col-2",
                                                      key: days
                                                    }, [
                                                      createVNode(_component_q_btn, {
                                                        color: unref(dayCount) === days ? "secondary" : "white",
                                                        "text-color": unref(dayCount) === days ? "white" : "secondary",
                                                        label: `${days}天`,
                                                        size: "sm",
                                                        onClick: ($event) => dayCount.value = days,
                                                        unelevated: unref(dayCount) === days,
                                                        flat: unref(dayCount) !== days,
                                                        class: "q-px-xs day-btn full-width",
                                                        style: { "border": "dayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                      }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                    ]);
                                                  }), 64))
                                                ]),
                                                createVNode(_component_q_input, {
                                                  modelValue: unref(dayCount),
                                                  "onUpdate:modelValue": ($event) => isRef(dayCount) ? dayCount.value = $event : null,
                                                  modelModifiers: { number: true },
                                                  type: "number",
                                                  label: "自定義天數",
                                                  outlined: "",
                                                  dense: "",
                                                  min: "1",
                                                  class: "q-mt-sm",
                                                  rules: [(val) => val >= 1 || "請輸入有效天數"]
                                                }, {
                                                  prepend: withCtx(() => [
                                                    createVNode(_component_q_icon, {
                                                      name: "event",
                                                      color: "secondary"
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                              ]),
                                              createVNode("div", { class: "q-mb-sm" }, [
                                                createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "每日服務時數"),
                                                createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                                  (openBlock(), createBlock(Fragment, null, renderList([4, 8, 10, 12, 24], (hours) => {
                                                    return createVNode("div", {
                                                      class: "col-2",
                                                      key: hours
                                                    }, [
                                                      createVNode(_component_q_btn, {
                                                        color: unref(hourCount) === hours ? "primary" : "white",
                                                        "text-color": unref(hourCount) === hours ? "white" : "primary",
                                                        label: `${hours}時`,
                                                        size: "sm",
                                                        onClick: ($event) => hourCount.value = hours,
                                                        unelevated: unref(hourCount) === hours,
                                                        flat: unref(hourCount) !== hours,
                                                        class: "q-px-xs hour-btn full-width",
                                                        style: { "border": "hourCount !== hours ? '1px solid #1976d2' : 'none'" }
                                                      }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                    ]);
                                                  }), 64))
                                                ]),
                                                createVNode(_component_q_input, {
                                                  modelValue: unref(hourCount),
                                                  "onUpdate:modelValue": ($event) => isRef(hourCount) ? hourCount.value = $event : null,
                                                  modelModifiers: { number: true },
                                                  type: "number",
                                                  label: "自定義小時數",
                                                  outlined: "",
                                                  dense: "",
                                                  min: "1",
                                                  class: "q-mt-sm",
                                                  rules: [(val) => val >= 1 || "請輸入有效小時數"]
                                                }, {
                                                  prepend: withCtx(() => [
                                                    createVNode(_component_q_icon, {
                                                      name: "schedule",
                                                      color: "primary"
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                              ]),
                                              createVNode("div", { class: "q-mt-md" }, [
                                                createVNode("div", { class: "row items-center justify-between" }, [
                                                  createVNode("div", { class: "text-subtitle2" }, "加價項目"),
                                                  createVNode(_component_q_btn, {
                                                    flat: "",
                                                    dense: "",
                                                    round: "",
                                                    icon: unref(showAdditionalItems) ? "expand_less" : "expand_more",
                                                    onClick: ($event) => showAdditionalItems.value = !unref(showAdditionalItems)
                                                  }, null, 8, ["icon", "onClick"])
                                                ]),
                                                createVNode(_component_q_slide_transition, null, {
                                                  default: withCtx(() => [
                                                    withDirectives(createVNode("div", { class: "row q-col-gutter-sm q-mt-sm" }, [
                                                      createVNode("div", { class: "col-12" }, [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode("div", { class: "col" }, [
                                                            createVNode(_component_q_toggle, {
                                                              modelValue: unref(isNightShift),
                                                              "onUpdate:modelValue": [($event) => isRef(isNightShift) ? isNightShift.value = $event : null, ($event) => unref(toggleAdditionalService)("HR09")],
                                                              label: "夜間時段 (22:00-08:00)",
                                                              color: "blue-grey"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                          ]),
                                                          createVNode("div", { class: "col-auto text-blue-grey" }, [
                                                            createVNode(_component_q_badge, {
                                                              color: "blue-grey",
                                                              "text-color": "white"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(unref(formatCurrency)(20)) + " 元 ", 1)
                                                              ]),
                                                              _: 1
                                                            })
                                                          ])
                                                        ])
                                                      ]),
                                                      createVNode("div", { class: "col-12" }, [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode("div", { class: "col" }, [
                                                            createVNode(_component_q_toggle, {
                                                              modelValue: unref(isUrgent),
                                                              "onUpdate:modelValue": [($event) => isRef(isUrgent) ? isUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR10")],
                                                              label: "加價急徵",
                                                              color: "amber"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                          ]),
                                                          createVNode("div", { class: "col-auto text-amber" }, [
                                                            createVNode(_component_q_badge, {
                                                              color: "amber",
                                                              "text-color": "white"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                              ]),
                                                              _: 1
                                                            })
                                                          ])
                                                        ])
                                                      ]),
                                                      createVNode("div", { class: "col-12" }, [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode("div", { class: "col" }, [
                                                            createVNode(_component_q_toggle, {
                                                              modelValue: unref(isDoubleUrgent),
                                                              "onUpdate:modelValue": [($event) => isRef(isDoubleUrgent) ? isDoubleUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR11")],
                                                              label: "二次加價急徵",
                                                              color: "orange"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                          ]),
                                                          createVNode("div", { class: "col-auto text-orange" }, [
                                                            createVNode(_component_q_badge, {
                                                              color: "orange",
                                                              "text-color": "white"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                              ]),
                                                              _: 1
                                                            })
                                                          ])
                                                        ])
                                                      ])
                                                    ], 512), [
                                                      [vShow, unref(showAdditionalItems)]
                                                    ])
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                                createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(hourlyTotalWithTime))) + " 元 ", 1),
                                                createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                                  unref(selectedHourlyItems).reduce(
                                                    (sum, item) => item.subCategory === "時段加價" ? sum : sum + item.price,
                                                    0
                                                  )
                                                )) + " 元 x " + toDisplayString(unref(hourCount)) + " 時 x " + toDisplayString(unref(dayCount)) + " 天 + 加價項目 " + toDisplayString(unref(formatCurrency)(
                                                  unref(selectedHourlyItems).reduce(
                                                    (sum, item) => item.subCategory === "時段加價" ? sum + item.price : sum,
                                                    0
                                                  ) * unref(dayCount)
                                                )) + " 元) ", 1)
                                              ])
                                            ], 512), [
                                              [vShow, unref(showCalculator)]
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ])) : createCommentVNode("", true),
                                      unref(selectedCategory) === "包班制" ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "q-mt-md"
                                      }, [
                                        createVNode("div", { class: "row items-center justify-between" }, [
                                          createVNode("div", { class: "text-subtitle2" }, "包班時間設定"),
                                          createVNode(_component_q_btn, {
                                            flat: "",
                                            dense: "",
                                            round: "",
                                            icon: unref(showShiftCalculator) ? "expand_less" : "expand_more",
                                            onClick: ($event) => showShiftCalculator.value = !unref(showShiftCalculator)
                                          }, null, 8, ["icon", "onClick"])
                                        ]),
                                        createVNode(_component_q_slide_transition, null, {
                                          default: withCtx(() => [
                                            withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                              createVNode("div", { class: "q-mb-sm" }, [
                                                createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "包班天數"),
                                                createVNode("div", { class: "row q-col-gutter-xs" }, [
                                                  (openBlock(), createBlock(Fragment, null, renderList([1, 3, 5, 7, 14], (days) => {
                                                    return createVNode("div", {
                                                      class: "col-auto",
                                                      key: days
                                                    }, [
                                                      createVNode(_component_q_btn, {
                                                        color: unref(shiftDayCount) === days ? "secondary" : "white",
                                                        "text-color": unref(shiftDayCount) === days ? "white" : "secondary",
                                                        label: `${days}天`,
                                                        size: "sm",
                                                        onClick: ($event) => shiftDayCount.value = days,
                                                        unelevated: unref(shiftDayCount) === days,
                                                        flat: unref(shiftDayCount) !== days,
                                                        class: "q-px-sm day-btn",
                                                        style: { "border": "shiftDayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                      }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                    ]);
                                                  }), 64))
                                                ]),
                                                createVNode(_component_q_input, {
                                                  modelValue: unref(shiftDayCount),
                                                  "onUpdate:modelValue": ($event) => isRef(shiftDayCount) ? shiftDayCount.value = $event : null,
                                                  modelModifiers: { number: true },
                                                  type: "number",
                                                  label: "自定義天數",
                                                  outlined: "",
                                                  dense: "",
                                                  min: "1",
                                                  class: "q-mt-sm",
                                                  rules: [(val) => val >= 1 || "請輸入有效天數"]
                                                }, {
                                                  prepend: withCtx(() => [
                                                    createVNode(_component_q_icon, {
                                                      name: "event",
                                                      color: "secondary"
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                              ]),
                                              createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                                createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(shiftTotalWithDays))) + " 元 ", 1),
                                                createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                                  unref(selectedShiftItems).reduce(
                                                    (sum, item) => sum + item.price,
                                                    0
                                                  ) + (unref(selectedShiftType) === "SH01" ? 3e3 : 5500)
                                                )) + " 元 x " + toDisplayString(unref(shiftDayCount)) + " 天) ", 1)
                                              ])
                                            ], 512), [
                                              [vShow, unref(showShiftCalculator)]
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ])) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_card_section, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="chart-container" data-v-8eb201ff${_scopeId5}>`);
                                    if (unref(chartData).labels.length > 0) {
                                      _push6(ssrRenderComponent(unref(Pie), {
                                        data: unref(chartData),
                                        options: unref(chartOptions),
                                        class: "pie-chart"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<div class="text-center text-grey q-pa-md" data-v-8eb201ff${_scopeId5}> 尚未選擇任何服務項目 </div>`);
                                    }
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "chart-container" }, [
                                        unref(chartData).labels.length > 0 ? (openBlock(), createBlock(unref(Pie), {
                                          key: 0,
                                          data: unref(chartData),
                                          options: unref(chartOptions),
                                          class: "pie-chart"
                                        }, null, 8, ["data", "options"])) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "text-center text-grey q-pa-md"
                                        }, " 尚未選擇任何服務項目 "))
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (unref(selectedItems).length > 0) {
                                _push5(ssrRenderComponent(_component_q_card_section, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_list, { dense: "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(unref(selectedItems), (item) => {
                                              _push7(ssrRenderComponent(_component_q_item, {
                                                key: `selected-${item.code}`
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_q_item_section, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_q_item_label, null, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`${ssrInterpolate(item.name)}`);
                                                              } else {
                                                                return [
                                                                  createTextVNode(toDisplayString(item.name), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_q_item_label, null, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(item.name), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1024)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(unref(formatCurrency)(item.price))} 元 `);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(unref(formatCurrency)(item.price)) + " 元 ", 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_q_item_section, null, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_q_item_label, null, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(item.name), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_q_item_section, { side: "" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(unref(formatCurrency)(item.price)) + " 元 ", 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
                                            _push7(ssrRenderComponent(_component_q_separator, { class: "q-my-sm" }, null, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_q_item_section, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(_component_q_item_label, { class: "text-weight-bold" }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`服務項目總金額`);
                                                            } else {
                                                              return [
                                                                createTextVNode("服務項目總金額")
                                                              ];
                                                            }
                                                          }),
                                                          _: 1
                                                        }, _parent9, _scopeId8));
                                                        _push9(`<div class="text-caption text-grey" data-v-8eb201ff${_scopeId8}> 已選 ${ssrInterpolate(unref(selectedItems).length)} 項服務 </div>`);
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_item_label, { class: "text-weight-bold" }, {
                                                            default: withCtx(() => [
                                                              createTextVNode("服務項目總金額")
                                                            ]),
                                                            _: 1
                                                          }),
                                                          createVNode("div", { class: "text-caption text-grey" }, " 已選 " + toDisplayString(unref(selectedItems).length) + " 項服務 ", 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<span class="text-weight-bold text-primary" data-v-8eb201ff${_scopeId8}>${ssrInterpolate(unref(formatCurrency)(
                                                          unref(selectedItems).reduce(
                                                            (sum, item) => sum + item.price,
                                                            0
                                                          )
                                                        ))} 元</span>`);
                                                      } else {
                                                        return [
                                                          createVNode("span", { class: "text-weight-bold text-primary" }, toDisplayString(unref(formatCurrency)(
                                                            unref(selectedItems).reduce(
                                                              (sum, item) => sum + item.price,
                                                              0
                                                            )
                                                          )) + " 元", 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_section, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_item_label, { class: "text-weight-bold" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("服務項目總金額")
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode("div", { class: "text-caption text-grey" }, " 已選 " + toDisplayString(unref(selectedItems).length) + " 項服務 ", 1)
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_q_item_section, { side: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode("span", { class: "text-weight-bold text-primary" }, toDisplayString(unref(formatCurrency)(
                                                          unref(selectedItems).reduce(
                                                            (sum, item) => sum + item.price,
                                                            0
                                                          )
                                                        )) + " 元", 1)
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_separator, { class: "q-my-sm" }, null, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_q_item_section, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(_component_q_item_label, { class: "text-weight-bold text-h6" }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`總計金額`);
                                                            } else {
                                                              return [
                                                                createTextVNode("總計金額")
                                                              ];
                                                            }
                                                          }),
                                                          _: 1
                                                        }, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_item_label, { class: "text-weight-bold text-h6" }, {
                                                            default: withCtx(() => [
                                                              createTextVNode("總計金額")
                                                            ]),
                                                            _: 1
                                                          })
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<span class="text-weight-bold text-h6 text-primary" data-v-8eb201ff${_scopeId8}>${ssrInterpolate(unref(formatCurrency)(unref(totalCost) + unref(tipAmount)))} 元</span>`);
                                                      } else {
                                                        return [
                                                          createVNode("span", { class: "text-weight-bold text-h6 text-primary" }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))) + " 元", 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_section, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_item_label, { class: "text-weight-bold text-h6" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("總計金額")
                                                          ]),
                                                          _: 1
                                                        })
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_q_item_section, { side: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode("span", { class: "text-weight-bold text-h6 text-primary" }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))) + " 元", 1)
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_q_item_section, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<div class="row items-center" data-v-8eb201ff${_scopeId8}>`);
                                                        _push9(ssrRenderComponent(_component_q_icon, {
                                                          name: "volunteer_activism",
                                                          color: "pink-6",
                                                          class: "q-mr-sm"
                                                        }, null, _parent9, _scopeId8));
                                                        _push9(`<span data-v-8eb201ff${_scopeId8}>小費金額</span></div>`);
                                                      } else {
                                                        return [
                                                          createVNode("div", { class: "row items-center" }, [
                                                            createVNode(_component_q_icon, {
                                                              name: "volunteer_activism",
                                                              color: "pink-6",
                                                              class: "q-mr-sm"
                                                            }),
                                                            createVNode("span", null, "小費金額")
                                                          ])
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<div class="row items-center" data-v-8eb201ff${_scopeId8}>`);
                                                        _push9(ssrRenderComponent(_component_q_btn, {
                                                          round: "",
                                                          flat: "",
                                                          dense: "",
                                                          icon: "remove",
                                                          onClick: ($event) => tipAmount.value = Math.max(0, unref(tipAmount) - 50),
                                                          color: "grey",
                                                          class: "q-mr-xs"
                                                        }, null, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(_component_q_input, {
                                                          modelValue: unref(tipAmount),
                                                          "onUpdate:modelValue": ($event) => isRef(tipAmount) ? tipAmount.value = $event : null,
                                                          modelModifiers: { number: true },
                                                          type: "number",
                                                          dense: "",
                                                          outlined: "",
                                                          class: "tip-input-inline",
                                                          style: { "width": "100px" },
                                                          rules: [(val) => val >= 0 || "請輸入有效金額"]
                                                        }, {
                                                          append: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`<span class="text-grey-8" data-v-8eb201ff${_scopeId9}>元</span>`);
                                                            } else {
                                                              return [
                                                                createVNode("span", { class: "text-grey-8" }, "元")
                                                              ];
                                                            }
                                                          }),
                                                          _: 1
                                                        }, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(_component_q_btn, {
                                                          round: "",
                                                          flat: "",
                                                          dense: "",
                                                          icon: "add",
                                                          onClick: ($event) => tipAmount.value += 50,
                                                          color: "pink-6",
                                                          class: "q-ml-xs"
                                                        }, null, _parent9, _scopeId8));
                                                        _push9(`</div>`);
                                                      } else {
                                                        return [
                                                          createVNode("div", { class: "row items-center" }, [
                                                            createVNode(_component_q_btn, {
                                                              round: "",
                                                              flat: "",
                                                              dense: "",
                                                              icon: "remove",
                                                              onClick: ($event) => tipAmount.value = Math.max(0, unref(tipAmount) - 50),
                                                              color: "grey",
                                                              class: "q-mr-xs"
                                                            }, null, 8, ["onClick"]),
                                                            createVNode(_component_q_input, {
                                                              modelValue: unref(tipAmount),
                                                              "onUpdate:modelValue": ($event) => isRef(tipAmount) ? tipAmount.value = $event : null,
                                                              modelModifiers: { number: true },
                                                              type: "number",
                                                              dense: "",
                                                              outlined: "",
                                                              class: "tip-input-inline",
                                                              style: { "width": "100px" },
                                                              rules: [(val) => val >= 0 || "請輸入有效金額"]
                                                            }, {
                                                              append: withCtx(() => [
                                                                createVNode("span", { class: "text-grey-8" }, "元")
                                                              ]),
                                                              _: 1
                                                            }, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                                            createVNode(_component_q_btn, {
                                                              round: "",
                                                              flat: "",
                                                              dense: "",
                                                              icon: "add",
                                                              onClick: ($event) => tipAmount.value += 50,
                                                              color: "pink-6",
                                                              class: "q-ml-xs"
                                                            }, null, 8, ["onClick"])
                                                          ])
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_section, null, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode(_component_q_icon, {
                                                            name: "volunteer_activism",
                                                            color: "pink-6",
                                                            class: "q-mr-sm"
                                                          }),
                                                          createVNode("span", null, "小費金額")
                                                        ])
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_q_item_section, { side: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode(_component_q_btn, {
                                                            round: "",
                                                            flat: "",
                                                            dense: "",
                                                            icon: "remove",
                                                            onClick: ($event) => tipAmount.value = Math.max(0, unref(tipAmount) - 50),
                                                            color: "grey",
                                                            class: "q-mr-xs"
                                                          }, null, 8, ["onClick"]),
                                                          createVNode(_component_q_input, {
                                                            modelValue: unref(tipAmount),
                                                            "onUpdate:modelValue": ($event) => isRef(tipAmount) ? tipAmount.value = $event : null,
                                                            modelModifiers: { number: true },
                                                            type: "number",
                                                            dense: "",
                                                            outlined: "",
                                                            class: "tip-input-inline",
                                                            style: { "width": "100px" },
                                                            rules: [(val) => val >= 0 || "請輸入有效金額"]
                                                          }, {
                                                            append: withCtx(() => [
                                                              createVNode("span", { class: "text-grey-8" }, "元")
                                                            ]),
                                                            _: 1
                                                          }, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                                          createVNode(_component_q_btn, {
                                                            round: "",
                                                            flat: "",
                                                            dense: "",
                                                            icon: "add",
                                                            onClick: ($event) => tipAmount.value += 50,
                                                            color: "pink-6",
                                                            class: "q-ml-xs"
                                                          }, null, 8, ["onClick"])
                                                        ])
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedItems), (item) => {
                                                return openBlock(), createBlock(_component_q_item, {
                                                  key: `selected-${item.code}`
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_item_section, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_item_label, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(item.name), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_q_item_section, { side: "" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(unref(formatCurrency)(item.price)) + " 元 ", 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1024);
                                              }), 128)),
                                              createVNode(_component_q_separator, { class: "q-my-sm" }),
                                              createVNode(_component_q_item, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_section, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_item_label, { class: "text-weight-bold" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("服務項目總金額")
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode("div", { class: "text-caption text-grey" }, " 已選 " + toDisplayString(unref(selectedItems).length) + " 項服務 ", 1)
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_q_item_section, { side: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode("span", { class: "text-weight-bold text-primary" }, toDisplayString(unref(formatCurrency)(
                                                        unref(selectedItems).reduce(
                                                          (sum, item) => sum + item.price,
                                                          0
                                                        )
                                                      )) + " 元", 1)
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_separator, { class: "q-my-sm" }),
                                              createVNode(_component_q_item, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_section, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_item_label, { class: "text-weight-bold text-h6" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("總計金額")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_q_item_section, { side: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode("span", { class: "text-weight-bold text-h6 text-primary" }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))) + " 元", 1)
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_section, null, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "row items-center" }, [
                                                        createVNode(_component_q_icon, {
                                                          name: "volunteer_activism",
                                                          color: "pink-6",
                                                          class: "q-mr-sm"
                                                        }),
                                                        createVNode("span", null, "小費金額")
                                                      ])
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_q_item_section, { side: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "row items-center" }, [
                                                        createVNode(_component_q_btn, {
                                                          round: "",
                                                          flat: "",
                                                          dense: "",
                                                          icon: "remove",
                                                          onClick: ($event) => tipAmount.value = Math.max(0, unref(tipAmount) - 50),
                                                          color: "grey",
                                                          class: "q-mr-xs"
                                                        }, null, 8, ["onClick"]),
                                                        createVNode(_component_q_input, {
                                                          modelValue: unref(tipAmount),
                                                          "onUpdate:modelValue": ($event) => isRef(tipAmount) ? tipAmount.value = $event : null,
                                                          modelModifiers: { number: true },
                                                          type: "number",
                                                          dense: "",
                                                          outlined: "",
                                                          class: "tip-input-inline",
                                                          style: { "width": "100px" },
                                                          rules: [(val) => val >= 0 || "請輸入有效金額"]
                                                        }, {
                                                          append: withCtx(() => [
                                                            createVNode("span", { class: "text-grey-8" }, "元")
                                                          ]),
                                                          _: 1
                                                        }, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                                        createVNode(_component_q_btn, {
                                                          round: "",
                                                          flat: "",
                                                          dense: "",
                                                          icon: "add",
                                                          onClick: ($event) => tipAmount.value += 50,
                                                          color: "pink-6",
                                                          class: "q-ml-xs"
                                                        }, null, 8, ["onClick"])
                                                      ])
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_q_list, { dense: "" }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedItems), (item) => {
                                              return openBlock(), createBlock(_component_q_item, {
                                                key: `selected-${item.code}`
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_section, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_item_label, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(item.name), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_q_item_section, { side: "" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(unref(formatCurrency)(item.price)) + " 元 ", 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128)),
                                            createVNode(_component_q_separator, { class: "q-my-sm" }),
                                            createVNode(_component_q_item, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_section, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_item_label, { class: "text-weight-bold" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("服務項目總金額")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode("div", { class: "text-caption text-grey" }, " 已選 " + toDisplayString(unref(selectedItems).length) + " 項服務 ", 1)
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_q_item_section, { side: "" }, {
                                                  default: withCtx(() => [
                                                    createVNode("span", { class: "text-weight-bold text-primary" }, toDisplayString(unref(formatCurrency)(
                                                      unref(selectedItems).reduce(
                                                        (sum, item) => sum + item.price,
                                                        0
                                                      )
                                                    )) + " 元", 1)
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_separator, { class: "q-my-sm" }),
                                            createVNode(_component_q_item, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_section, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_item_label, { class: "text-weight-bold text-h6" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("總計金額")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_q_item_section, { side: "" }, {
                                                  default: withCtx(() => [
                                                    createVNode("span", { class: "text-weight-bold text-h6 text-primary" }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))) + " 元", 1)
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_section, null, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "row items-center" }, [
                                                      createVNode(_component_q_icon, {
                                                        name: "volunteer_activism",
                                                        color: "pink-6",
                                                        class: "q-mr-sm"
                                                      }),
                                                      createVNode("span", null, "小費金額")
                                                    ])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_q_item_section, { side: "" }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "row items-center" }, [
                                                      createVNode(_component_q_btn, {
                                                        round: "",
                                                        flat: "",
                                                        dense: "",
                                                        icon: "remove",
                                                        onClick: ($event) => tipAmount.value = Math.max(0, unref(tipAmount) - 50),
                                                        color: "grey",
                                                        class: "q-mr-xs"
                                                      }, null, 8, ["onClick"]),
                                                      createVNode(_component_q_input, {
                                                        modelValue: unref(tipAmount),
                                                        "onUpdate:modelValue": ($event) => isRef(tipAmount) ? tipAmount.value = $event : null,
                                                        modelModifiers: { number: true },
                                                        type: "number",
                                                        dense: "",
                                                        outlined: "",
                                                        class: "tip-input-inline",
                                                        style: { "width": "100px" },
                                                        rules: [(val) => val >= 0 || "請輸入有效金額"]
                                                      }, {
                                                        append: withCtx(() => [
                                                          createVNode("span", { class: "text-grey-8" }, "元")
                                                        ]),
                                                        _: 1
                                                      }, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                                      createVNode(_component_q_btn, {
                                                        round: "",
                                                        flat: "",
                                                        dense: "",
                                                        icon: "add",
                                                        onClick: ($event) => tipAmount.value += 50,
                                                        color: "pink-6",
                                                        class: "q-ml-xs"
                                                      }, null, 8, ["onClick"])
                                                    ])
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(_component_q_card_section, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-h6 text-primary" }, [
                                      createVNode(_component_q_icon, { name: "summarize" }),
                                      createTextVNode(" 費用統計 ")
                                    ]),
                                    unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "q-mt-md"
                                    }, [
                                      createVNode("div", { class: "row items-center justify-between" }, [
                                        createVNode("div", { class: "text-subtitle2" }, "服務時間設定"),
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          dense: "",
                                          round: "",
                                          icon: unref(showCalculator) ? "expand_less" : "expand_more",
                                          onClick: ($event) => showCalculator.value = !unref(showCalculator)
                                        }, null, 8, ["icon", "onClick"])
                                      ]),
                                      createVNode(_component_q_slide_transition, null, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                            createVNode("div", { class: "q-mb-sm" }, [
                                              createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "天數選擇"),
                                              createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                                (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3, 5, 7], (days) => {
                                                  return createVNode("div", {
                                                    class: "col-2",
                                                    key: days
                                                  }, [
                                                    createVNode(_component_q_btn, {
                                                      color: unref(dayCount) === days ? "secondary" : "white",
                                                      "text-color": unref(dayCount) === days ? "white" : "secondary",
                                                      label: `${days}天`,
                                                      size: "sm",
                                                      onClick: ($event) => dayCount.value = days,
                                                      unelevated: unref(dayCount) === days,
                                                      flat: unref(dayCount) !== days,
                                                      class: "q-px-xs day-btn full-width",
                                                      style: { "border": "dayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                    }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                  ]);
                                                }), 64))
                                              ]),
                                              createVNode(_component_q_input, {
                                                modelValue: unref(dayCount),
                                                "onUpdate:modelValue": ($event) => isRef(dayCount) ? dayCount.value = $event : null,
                                                modelModifiers: { number: true },
                                                type: "number",
                                                label: "自定義天數",
                                                outlined: "",
                                                dense: "",
                                                min: "1",
                                                class: "q-mt-sm",
                                                rules: [(val) => val >= 1 || "請輸入有效天數"]
                                              }, {
                                                prepend: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "event",
                                                    color: "secondary"
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                            ]),
                                            createVNode("div", { class: "q-mb-sm" }, [
                                              createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "每日服務時數"),
                                              createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                                (openBlock(), createBlock(Fragment, null, renderList([4, 8, 10, 12, 24], (hours) => {
                                                  return createVNode("div", {
                                                    class: "col-2",
                                                    key: hours
                                                  }, [
                                                    createVNode(_component_q_btn, {
                                                      color: unref(hourCount) === hours ? "primary" : "white",
                                                      "text-color": unref(hourCount) === hours ? "white" : "primary",
                                                      label: `${hours}時`,
                                                      size: "sm",
                                                      onClick: ($event) => hourCount.value = hours,
                                                      unelevated: unref(hourCount) === hours,
                                                      flat: unref(hourCount) !== hours,
                                                      class: "q-px-xs hour-btn full-width",
                                                      style: { "border": "hourCount !== hours ? '1px solid #1976d2' : 'none'" }
                                                    }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                  ]);
                                                }), 64))
                                              ]),
                                              createVNode(_component_q_input, {
                                                modelValue: unref(hourCount),
                                                "onUpdate:modelValue": ($event) => isRef(hourCount) ? hourCount.value = $event : null,
                                                modelModifiers: { number: true },
                                                type: "number",
                                                label: "自定義小時數",
                                                outlined: "",
                                                dense: "",
                                                min: "1",
                                                class: "q-mt-sm",
                                                rules: [(val) => val >= 1 || "請輸入有效小時數"]
                                              }, {
                                                prepend: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "schedule",
                                                    color: "primary"
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                            ]),
                                            createVNode("div", { class: "q-mt-md" }, [
                                              createVNode("div", { class: "row items-center justify-between" }, [
                                                createVNode("div", { class: "text-subtitle2" }, "加價項目"),
                                                createVNode(_component_q_btn, {
                                                  flat: "",
                                                  dense: "",
                                                  round: "",
                                                  icon: unref(showAdditionalItems) ? "expand_less" : "expand_more",
                                                  onClick: ($event) => showAdditionalItems.value = !unref(showAdditionalItems)
                                                }, null, 8, ["icon", "onClick"])
                                              ]),
                                              createVNode(_component_q_slide_transition, null, {
                                                default: withCtx(() => [
                                                  withDirectives(createVNode("div", { class: "row q-col-gutter-sm q-mt-sm" }, [
                                                    createVNode("div", { class: "col-12" }, [
                                                      createVNode("div", { class: "row items-center" }, [
                                                        createVNode("div", { class: "col" }, [
                                                          createVNode(_component_q_toggle, {
                                                            modelValue: unref(isNightShift),
                                                            "onUpdate:modelValue": [($event) => isRef(isNightShift) ? isNightShift.value = $event : null, ($event) => unref(toggleAdditionalService)("HR09")],
                                                            label: "夜間時段 (22:00-08:00)",
                                                            color: "blue-grey"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                        ]),
                                                        createVNode("div", { class: "col-auto text-blue-grey" }, [
                                                          createVNode(_component_q_badge, {
                                                            color: "blue-grey",
                                                            "text-color": "white"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(unref(formatCurrency)(20)) + " 元 ", 1)
                                                            ]),
                                                            _: 1
                                                          })
                                                        ])
                                                      ])
                                                    ]),
                                                    createVNode("div", { class: "col-12" }, [
                                                      createVNode("div", { class: "row items-center" }, [
                                                        createVNode("div", { class: "col" }, [
                                                          createVNode(_component_q_toggle, {
                                                            modelValue: unref(isUrgent),
                                                            "onUpdate:modelValue": [($event) => isRef(isUrgent) ? isUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR10")],
                                                            label: "加價急徵",
                                                            color: "amber"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                        ]),
                                                        createVNode("div", { class: "col-auto text-amber" }, [
                                                          createVNode(_component_q_badge, {
                                                            color: "amber",
                                                            "text-color": "white"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                            ]),
                                                            _: 1
                                                          })
                                                        ])
                                                      ])
                                                    ]),
                                                    createVNode("div", { class: "col-12" }, [
                                                      createVNode("div", { class: "row items-center" }, [
                                                        createVNode("div", { class: "col" }, [
                                                          createVNode(_component_q_toggle, {
                                                            modelValue: unref(isDoubleUrgent),
                                                            "onUpdate:modelValue": [($event) => isRef(isDoubleUrgent) ? isDoubleUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR11")],
                                                            label: "二次加價急徵",
                                                            color: "orange"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                        ]),
                                                        createVNode("div", { class: "col-auto text-orange" }, [
                                                          createVNode(_component_q_badge, {
                                                            color: "orange",
                                                            "text-color": "white"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                            ]),
                                                            _: 1
                                                          })
                                                        ])
                                                      ])
                                                    ])
                                                  ], 512), [
                                                    [vShow, unref(showAdditionalItems)]
                                                  ])
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                              createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(hourlyTotalWithTime))) + " 元 ", 1),
                                              createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                                unref(selectedHourlyItems).reduce(
                                                  (sum, item) => item.subCategory === "時段加價" ? sum : sum + item.price,
                                                  0
                                                )
                                              )) + " 元 x " + toDisplayString(unref(hourCount)) + " 時 x " + toDisplayString(unref(dayCount)) + " 天 + 加價項目 " + toDisplayString(unref(formatCurrency)(
                                                unref(selectedHourlyItems).reduce(
                                                  (sum, item) => item.subCategory === "時段加價" ? sum + item.price : sum,
                                                  0
                                                ) * unref(dayCount)
                                              )) + " 元) ", 1)
                                            ])
                                          ], 512), [
                                            [vShow, unref(showCalculator)]
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ])) : createCommentVNode("", true),
                                    unref(selectedCategory) === "包班制" ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "q-mt-md"
                                    }, [
                                      createVNode("div", { class: "row items-center justify-between" }, [
                                        createVNode("div", { class: "text-subtitle2" }, "包班時間設定"),
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          dense: "",
                                          round: "",
                                          icon: unref(showShiftCalculator) ? "expand_less" : "expand_more",
                                          onClick: ($event) => showShiftCalculator.value = !unref(showShiftCalculator)
                                        }, null, 8, ["icon", "onClick"])
                                      ]),
                                      createVNode(_component_q_slide_transition, null, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                            createVNode("div", { class: "q-mb-sm" }, [
                                              createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "包班天數"),
                                              createVNode("div", { class: "row q-col-gutter-xs" }, [
                                                (openBlock(), createBlock(Fragment, null, renderList([1, 3, 5, 7, 14], (days) => {
                                                  return createVNode("div", {
                                                    class: "col-auto",
                                                    key: days
                                                  }, [
                                                    createVNode(_component_q_btn, {
                                                      color: unref(shiftDayCount) === days ? "secondary" : "white",
                                                      "text-color": unref(shiftDayCount) === days ? "white" : "secondary",
                                                      label: `${days}天`,
                                                      size: "sm",
                                                      onClick: ($event) => shiftDayCount.value = days,
                                                      unelevated: unref(shiftDayCount) === days,
                                                      flat: unref(shiftDayCount) !== days,
                                                      class: "q-px-sm day-btn",
                                                      style: { "border": "shiftDayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                    }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                  ]);
                                                }), 64))
                                              ]),
                                              createVNode(_component_q_input, {
                                                modelValue: unref(shiftDayCount),
                                                "onUpdate:modelValue": ($event) => isRef(shiftDayCount) ? shiftDayCount.value = $event : null,
                                                modelModifiers: { number: true },
                                                type: "number",
                                                label: "自定義天數",
                                                outlined: "",
                                                dense: "",
                                                min: "1",
                                                class: "q-mt-sm",
                                                rules: [(val) => val >= 1 || "請輸入有效天數"]
                                              }, {
                                                prepend: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "event",
                                                    color: "secondary"
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                            ]),
                                            createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                              createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(shiftTotalWithDays))) + " 元 ", 1),
                                              createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                                unref(selectedShiftItems).reduce(
                                                  (sum, item) => sum + item.price,
                                                  0
                                                ) + (unref(selectedShiftType) === "SH01" ? 3e3 : 5500)
                                              )) + " 元 x " + toDisplayString(unref(shiftDayCount)) + " 天) ", 1)
                                            ])
                                          ], 512), [
                                            [vShow, unref(showShiftCalculator)]
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_card_section, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "chart-container" }, [
                                      unref(chartData).labels.length > 0 ? (openBlock(), createBlock(unref(Pie), {
                                        key: 0,
                                        data: unref(chartData),
                                        options: unref(chartOptions),
                                        class: "pie-chart"
                                      }, null, 8, ["data", "options"])) : (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "text-center text-grey q-pa-md"
                                      }, " 尚未選擇任何服務項目 "))
                                    ])
                                  ]),
                                  _: 1
                                }),
                                unref(selectedItems).length > 0 ? (openBlock(), createBlock(_component_q_card_section, { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_list, { dense: "" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedItems), (item) => {
                                          return openBlock(), createBlock(_component_q_item, {
                                            key: `selected-${item.code}`
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_section, { side: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unref(formatCurrency)(item.price)) + " 元 ", 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128)),
                                        createVNode(_component_q_separator, { class: "q-my-sm" }),
                                        createVNode(_component_q_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_label, { class: "text-weight-bold" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("服務項目總金額")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("div", { class: "text-caption text-grey" }, " 已選 " + toDisplayString(unref(selectedItems).length) + " 項服務 ", 1)
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, { side: "" }, {
                                              default: withCtx(() => [
                                                createVNode("span", { class: "text-weight-bold text-primary" }, toDisplayString(unref(formatCurrency)(
                                                  unref(selectedItems).reduce(
                                                    (sum, item) => sum + item.price,
                                                    0
                                                  )
                                                )) + " 元", 1)
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_separator, { class: "q-my-sm" }),
                                        createVNode(_component_q_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_label, { class: "text-weight-bold text-h6" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("總計金額")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, { side: "" }, {
                                              default: withCtx(() => [
                                                createVNode("span", { class: "text-weight-bold text-h6 text-primary" }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))) + " 元", 1)
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "row items-center" }, [
                                                  createVNode(_component_q_icon, {
                                                    name: "volunteer_activism",
                                                    color: "pink-6",
                                                    class: "q-mr-sm"
                                                  }),
                                                  createVNode("span", null, "小費金額")
                                                ])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, { side: "" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "row items-center" }, [
                                                  createVNode(_component_q_btn, {
                                                    round: "",
                                                    flat: "",
                                                    dense: "",
                                                    icon: "remove",
                                                    onClick: ($event) => tipAmount.value = Math.max(0, unref(tipAmount) - 50),
                                                    color: "grey",
                                                    class: "q-mr-xs"
                                                  }, null, 8, ["onClick"]),
                                                  createVNode(_component_q_input, {
                                                    modelValue: unref(tipAmount),
                                                    "onUpdate:modelValue": ($event) => isRef(tipAmount) ? tipAmount.value = $event : null,
                                                    modelModifiers: { number: true },
                                                    type: "number",
                                                    dense: "",
                                                    outlined: "",
                                                    class: "tip-input-inline",
                                                    style: { "width": "100px" },
                                                    rules: [(val) => val >= 0 || "請輸入有效金額"]
                                                  }, {
                                                    append: withCtx(() => [
                                                      createVNode("span", { class: "text-grey-8" }, "元")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                                  createVNode(_component_q_btn, {
                                                    round: "",
                                                    flat: "",
                                                    dense: "",
                                                    icon: "add",
                                                    onClick: ($event) => tipAmount.value += 50,
                                                    color: "pink-6",
                                                    class: "q-ml-xs"
                                                  }, null, 8, ["onClick"])
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "row q-col-gutter-md" }, [
                            createVNode("div", { class: "col-12 col-md-8" }, [
                              createVNode(_component_q_card, {
                                class: "main-card",
                                flat: "",
                                bordered: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_card_section, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "service-type-selector q-mb-md" }, [
                                        createVNode("div", { class: "row no-wrap" }, [
                                          createVNode("div", { class: "col text-center" }, [
                                            createVNode(_component_q_btn, {
                                              color: unref(selectedCategory) === "鐘點制" ? "primary" : "grey-5",
                                              "text-color": unref(selectedCategory) === "鐘點制" ? "white" : "grey-8",
                                              class: "service-type-btn",
                                              size: "lg",
                                              "no-caps": "",
                                              unelevated: "",
                                              onClick: ($event) => selectedCategory.value = "鐘點制"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" 鐘點制 ")
                                              ]),
                                              _: 1
                                            }, 8, ["color", "text-color", "onClick"])
                                          ]),
                                          createVNode("div", { class: "col text-center" }, [
                                            createVNode(_component_q_btn, {
                                              color: unref(selectedCategory) === "包班制" ? "secondary" : "grey-5",
                                              "text-color": unref(selectedCategory) === "包班制" ? "white" : "grey-8",
                                              class: "service-type-btn",
                                              size: "lg",
                                              "no-caps": "",
                                              unelevated: "",
                                              onClick: ($event) => selectedCategory.value = "包班制"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" 包班制 ")
                                              ]),
                                              _: 1
                                            }, 8, ["color", "text-color", "onClick"])
                                          ])
                                        ])
                                      ]),
                                      createVNode("div", { class: "row q-mt-md q-col-gutter-sm" }, [
                                        createVNode("div", { class: "col-12 col-sm-8" }, [
                                          createVNode(_component_q_input, {
                                            modelValue: unref(searchText),
                                            "onUpdate:modelValue": ($event) => isRef(searchText) ? searchText.value = $event : null,
                                            label: "搜尋服務項目",
                                            outlined: "",
                                            clearable: "",
                                            class: "search-input"
                                          }, {
                                            prepend: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "search",
                                                color: "primary"
                                              })
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        createVNode("div", { class: "col-12 col-sm-4" }, [
                                          createVNode(_component_q_btn, {
                                            color: "primary",
                                            icon: "refresh",
                                            label: "重置所有選擇",
                                            onClick: unref(resetSelections),
                                            class: "full-width",
                                            outline: ""
                                          }, null, 8, ["onClick"])
                                        ])
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_card_section, { class: "q-pt-none" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "row items-center justify-between" }, [
                                        createVNode("div", { class: "text-subtitle2" }, "篩選選項："),
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          dense: "",
                                          round: "",
                                          icon: unref(showFilters) ? "expand_less" : "expand_more",
                                          onClick: ($event) => showFilters.value = !unref(showFilters)
                                        }, null, 8, ["icon", "onClick"])
                                      ]),
                                      createVNode(_component_q_slide_transition, null, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode("div", { class: "filter-section q-pa-sm rounded-borders q-mt-sm" }, [
                                            createVNode("div", { class: "filter-group" }, [
                                              createVNode("div", { class: "filter-label" }, "價格篩選："),
                                              createVNode("div", { class: "row q-col-gutter-sm" }, [
                                                createVNode("div", { class: "col-auto" }, [
                                                  createVNode(_component_q_chip, {
                                                    clickable: "",
                                                    onClick: ($event) => unref(applyFilter)("price", 100),
                                                    color: unref(activeFilters).price === 100 ? "primary" : "grey-4",
                                                    "text-color": unref(activeFilters).price === 100 ? "white" : "black",
                                                    outline: unref(activeFilters).price !== 100
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" 價格 > 100元 ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick", "color", "text-color", "outline"])
                                                ]),
                                                createVNode("div", { class: "col-auto" }, [
                                                  createVNode(_component_q_chip, {
                                                    clickable: "",
                                                    onClick: ($event) => unref(applyFilter)("price", 50),
                                                    color: unref(activeFilters).price === 50 ? "primary" : "grey-4",
                                                    "text-color": unref(activeFilters).price === 50 ? "white" : "black",
                                                    outline: unref(activeFilters).price !== 50
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" 價格 > 50元 ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick", "color", "text-color", "outline"])
                                                ]),
                                                createVNode("div", { class: "col-auto" }, [
                                                  createVNode(_component_q_chip, {
                                                    clickable: "",
                                                    onClick: ($event) => unref(applyFilter)("price", 0),
                                                    color: unref(activeFilters).price === 0 ? "primary" : "grey-4",
                                                    "text-color": unref(activeFilters).price === 0 ? "white" : "black",
                                                    outline: unref(activeFilters).price !== 0
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" 全部 ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick", "color", "text-color", "outline"])
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "filter-group q-mt-sm" }, [
                                              createVNode("div", { class: "filter-label" }, "類別篩選："),
                                              createVNode("div", { class: "row q-col-gutter-sm" }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(availableSubCategories), (subCat) => {
                                                  return openBlock(), createBlock("div", {
                                                    key: subCat,
                                                    class: "col-auto"
                                                  }, [
                                                    createVNode(_component_q_chip, {
                                                      clickable: "",
                                                      onClick: ($event) => unref(applyFilter)("subCategory", subCat),
                                                      color: unref(activeFilters).subCategory === subCat ? "secondary" : "grey-4",
                                                      "text-color": unref(activeFilters).subCategory === subCat ? "white" : "black",
                                                      outline: unref(activeFilters).subCategory !== subCat
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(subCat), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick", "color", "text-color", "outline"])
                                                  ]);
                                                }), 128)),
                                                createVNode("div", { class: "col-auto" }, [
                                                  createVNode(_component_q_chip, {
                                                    clickable: "",
                                                    onClick: ($event) => unref(applyFilter)("subCategory", null),
                                                    color: !unref(activeFilters).subCategory ? "secondary" : "grey-4",
                                                    "text-color": !unref(activeFilters).subCategory ? "white" : "black",
                                                    outline: unref(activeFilters).subCategory !== null
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" 全部 ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick", "color", "text-color", "outline"])
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "text-right q-mt-sm" }, [
                                              createVNode(_component_q_btn, {
                                                outline: "",
                                                size: "sm",
                                                color: "secondary",
                                                icon: "filter_alt_off",
                                                label: "清除篩選",
                                                onClick: unref(resetAllFilters),
                                                disable: !unref(isAnyFilterActive)
                                              }, null, 8, ["onClick", "disable"])
                                            ])
                                          ], 512), [
                                            [vShow, unref(showFilters)]
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_card_section, null, {
                                    default: withCtx(() => [
                                      unref(selectedCategory) === "包班制" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "q-mb-md"
                                      }, [
                                        createVNode("div", { class: "text-subtitle1 q-mb-sm" }, "選擇班次"),
                                        createVNode("div", { class: "row q-col-gutter-md" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(shiftTypeItems), (item) => {
                                            return openBlock(), createBlock("div", {
                                              class: "col-12 col-sm-6",
                                              key: item.code
                                            }, [
                                              createVNode(_component_q_card, {
                                                class: {
                                                  "shift-card": true,
                                                  "shift-card-selected": unref(isSelected)(item)
                                                },
                                                clickable: "",
                                                onClick: ($event) => unref(selectShiftType)(item)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_card_section, { class: "q-py-sm" }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "row items-center" }, [
                                                        createVNode("div", { class: "col-auto" }, [
                                                          createVNode(_component_q_icon, {
                                                            name: item.icon,
                                                            color: unref(getItemColor)(item),
                                                            size: "md"
                                                          }, null, 8, ["name", "color"])
                                                        ]),
                                                        createVNode("div", { class: "col q-ml-sm" }, [
                                                          createVNode("div", { class: "text-subtitle2" }, toDisplayString(item.name), 1),
                                                          createVNode("div", { class: "text-caption" }, [
                                                            createVNode(_component_q_icon, {
                                                              name: "paid",
                                                              size: "xs",
                                                              color: "primary",
                                                              class: "q-mr-xs"
                                                            }),
                                                            createVNode("span", null, toDisplayString(unref(formatCurrency)(item.price)) + " 元/班", 1)
                                                          ])
                                                        ]),
                                                        createVNode("div", { class: "col-auto" }, [
                                                          createVNode(_component_q_radio, {
                                                            modelValue: unref(selectedShiftType),
                                                            "onUpdate:modelValue": ($event) => isRef(selectedShiftType) ? selectedShiftType.value = $event : null,
                                                            val: item.code,
                                                            color: "primary"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "val"])
                                                        ])
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1032, ["class", "onClick"])
                                            ]);
                                          }), 128))
                                        ])
                                      ])) : createCommentVNode("", true),
                                      createVNode("div", { class: "text-subtitle1 q-mb-sm" }, toDisplayString(unref(selectedCategory) === "包班制" ? "選擇附加服務" : "選擇服務項目"), 1),
                                      createVNode(_component_q_list, {
                                        bordered: "",
                                        separator: "",
                                        class: "rounded-borders"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(TransitionGroup, {
                                            name: "list",
                                            tag: "div"
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredItems), (item) => {
                                                return withDirectives((openBlock(), createBlock(_component_q_item, {
                                                  key: item.code,
                                                  clickable: !(unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)),
                                                  onClick: ($event) => unref(toggleItem)(item),
                                                  class: [{
                                                    "selected-item": unref(isSelected)(item),
                                                    "mandatory-item": item.code === "HR01",
                                                    "disabled-item": unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)
                                                  }, "service-item q-pa-md"]
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_icon, {
                                                          name: item.icon,
                                                          color: unref(getItemColor)(item),
                                                          size: "md"
                                                        }, null, 8, ["name", "color"])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_q_item_section, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_item_label, { class: "text-weight-bold text-body1" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(item.name) + " ", 1),
                                                            item.code === "HR01" ? (openBlock(), createBlock(_component_q_badge, {
                                                              key: 0,
                                                              color: "positive",
                                                              class: "q-ml-sm"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(" 必選 ")
                                                              ]),
                                                              _: 1
                                                            })) : createCommentVNode("", true)
                                                          ]),
                                                          _: 2
                                                        }, 1024),
                                                        createVNode(_component_q_item_label, {
                                                          caption: "",
                                                          class: "q-mt-sm"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "row items-center" }, [
                                                              createVNode(_component_q_icon, {
                                                                name: "paid",
                                                                size: "xs",
                                                                color: "primary",
                                                                class: "q-mr-xs"
                                                              }),
                                                              createVNode("span", null, "金額：" + toDisplayString(item.price) + " 元", 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_q_item_section, { side: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_checkbox, {
                                                          onClick: withModifiers(($event) => unref(toggleItem)(item), ["stop"]),
                                                          modelValue: unref(selectedItems),
                                                          "onUpdate:modelValue": ($event) => isRef(selectedItems) ? selectedItems.value = $event : null,
                                                          val: item,
                                                          color: "primary",
                                                          disable: item.code === "HR01" && !unref(isSelected)(item) || unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item),
                                                          "aria-label": `選擇 ${item.name}`
                                                        }, null, 8, ["onClick", "modelValue", "onUpdate:modelValue", "val", "disable", "aria-label"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["clickable", "onClick", "class"])), [
                                                  [_directive_ripple],
                                                  [
                                                    vShow,
                                                    !(unref(selectedCategory) === "鐘點制" && item.subCategory === "時段加價")
                                                  ]
                                                ]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "col-12 col-md-4" }, [
                              createVNode(_component_q_card, {
                                class: "summary-card",
                                flat: "",
                                bordered: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_card_section, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h6 text-primary" }, [
                                        createVNode(_component_q_icon, { name: "summarize" }),
                                        createTextVNode(" 費用統計 ")
                                      ]),
                                      unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "q-mt-md"
                                      }, [
                                        createVNode("div", { class: "row items-center justify-between" }, [
                                          createVNode("div", { class: "text-subtitle2" }, "服務時間設定"),
                                          createVNode(_component_q_btn, {
                                            flat: "",
                                            dense: "",
                                            round: "",
                                            icon: unref(showCalculator) ? "expand_less" : "expand_more",
                                            onClick: ($event) => showCalculator.value = !unref(showCalculator)
                                          }, null, 8, ["icon", "onClick"])
                                        ]),
                                        createVNode(_component_q_slide_transition, null, {
                                          default: withCtx(() => [
                                            withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                              createVNode("div", { class: "q-mb-sm" }, [
                                                createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "天數選擇"),
                                                createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                                  (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3, 5, 7], (days) => {
                                                    return createVNode("div", {
                                                      class: "col-2",
                                                      key: days
                                                    }, [
                                                      createVNode(_component_q_btn, {
                                                        color: unref(dayCount) === days ? "secondary" : "white",
                                                        "text-color": unref(dayCount) === days ? "white" : "secondary",
                                                        label: `${days}天`,
                                                        size: "sm",
                                                        onClick: ($event) => dayCount.value = days,
                                                        unelevated: unref(dayCount) === days,
                                                        flat: unref(dayCount) !== days,
                                                        class: "q-px-xs day-btn full-width",
                                                        style: { "border": "dayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                      }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                    ]);
                                                  }), 64))
                                                ]),
                                                createVNode(_component_q_input, {
                                                  modelValue: unref(dayCount),
                                                  "onUpdate:modelValue": ($event) => isRef(dayCount) ? dayCount.value = $event : null,
                                                  modelModifiers: { number: true },
                                                  type: "number",
                                                  label: "自定義天數",
                                                  outlined: "",
                                                  dense: "",
                                                  min: "1",
                                                  class: "q-mt-sm",
                                                  rules: [(val) => val >= 1 || "請輸入有效天數"]
                                                }, {
                                                  prepend: withCtx(() => [
                                                    createVNode(_component_q_icon, {
                                                      name: "event",
                                                      color: "secondary"
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                              ]),
                                              createVNode("div", { class: "q-mb-sm" }, [
                                                createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "每日服務時數"),
                                                createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                                  (openBlock(), createBlock(Fragment, null, renderList([4, 8, 10, 12, 24], (hours) => {
                                                    return createVNode("div", {
                                                      class: "col-2",
                                                      key: hours
                                                    }, [
                                                      createVNode(_component_q_btn, {
                                                        color: unref(hourCount) === hours ? "primary" : "white",
                                                        "text-color": unref(hourCount) === hours ? "white" : "primary",
                                                        label: `${hours}時`,
                                                        size: "sm",
                                                        onClick: ($event) => hourCount.value = hours,
                                                        unelevated: unref(hourCount) === hours,
                                                        flat: unref(hourCount) !== hours,
                                                        class: "q-px-xs hour-btn full-width",
                                                        style: { "border": "hourCount !== hours ? '1px solid #1976d2' : 'none'" }
                                                      }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                    ]);
                                                  }), 64))
                                                ]),
                                                createVNode(_component_q_input, {
                                                  modelValue: unref(hourCount),
                                                  "onUpdate:modelValue": ($event) => isRef(hourCount) ? hourCount.value = $event : null,
                                                  modelModifiers: { number: true },
                                                  type: "number",
                                                  label: "自定義小時數",
                                                  outlined: "",
                                                  dense: "",
                                                  min: "1",
                                                  class: "q-mt-sm",
                                                  rules: [(val) => val >= 1 || "請輸入有效小時數"]
                                                }, {
                                                  prepend: withCtx(() => [
                                                    createVNode(_component_q_icon, {
                                                      name: "schedule",
                                                      color: "primary"
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                              ]),
                                              createVNode("div", { class: "q-mt-md" }, [
                                                createVNode("div", { class: "row items-center justify-between" }, [
                                                  createVNode("div", { class: "text-subtitle2" }, "加價項目"),
                                                  createVNode(_component_q_btn, {
                                                    flat: "",
                                                    dense: "",
                                                    round: "",
                                                    icon: unref(showAdditionalItems) ? "expand_less" : "expand_more",
                                                    onClick: ($event) => showAdditionalItems.value = !unref(showAdditionalItems)
                                                  }, null, 8, ["icon", "onClick"])
                                                ]),
                                                createVNode(_component_q_slide_transition, null, {
                                                  default: withCtx(() => [
                                                    withDirectives(createVNode("div", { class: "row q-col-gutter-sm q-mt-sm" }, [
                                                      createVNode("div", { class: "col-12" }, [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode("div", { class: "col" }, [
                                                            createVNode(_component_q_toggle, {
                                                              modelValue: unref(isNightShift),
                                                              "onUpdate:modelValue": [($event) => isRef(isNightShift) ? isNightShift.value = $event : null, ($event) => unref(toggleAdditionalService)("HR09")],
                                                              label: "夜間時段 (22:00-08:00)",
                                                              color: "blue-grey"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                          ]),
                                                          createVNode("div", { class: "col-auto text-blue-grey" }, [
                                                            createVNode(_component_q_badge, {
                                                              color: "blue-grey",
                                                              "text-color": "white"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(unref(formatCurrency)(20)) + " 元 ", 1)
                                                              ]),
                                                              _: 1
                                                            })
                                                          ])
                                                        ])
                                                      ]),
                                                      createVNode("div", { class: "col-12" }, [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode("div", { class: "col" }, [
                                                            createVNode(_component_q_toggle, {
                                                              modelValue: unref(isUrgent),
                                                              "onUpdate:modelValue": [($event) => isRef(isUrgent) ? isUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR10")],
                                                              label: "加價急徵",
                                                              color: "amber"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                          ]),
                                                          createVNode("div", { class: "col-auto text-amber" }, [
                                                            createVNode(_component_q_badge, {
                                                              color: "amber",
                                                              "text-color": "white"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                              ]),
                                                              _: 1
                                                            })
                                                          ])
                                                        ])
                                                      ]),
                                                      createVNode("div", { class: "col-12" }, [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode("div", { class: "col" }, [
                                                            createVNode(_component_q_toggle, {
                                                              modelValue: unref(isDoubleUrgent),
                                                              "onUpdate:modelValue": [($event) => isRef(isDoubleUrgent) ? isDoubleUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR11")],
                                                              label: "二次加價急徵",
                                                              color: "orange"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                          ]),
                                                          createVNode("div", { class: "col-auto text-orange" }, [
                                                            createVNode(_component_q_badge, {
                                                              color: "orange",
                                                              "text-color": "white"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                              ]),
                                                              _: 1
                                                            })
                                                          ])
                                                        ])
                                                      ])
                                                    ], 512), [
                                                      [vShow, unref(showAdditionalItems)]
                                                    ])
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                                createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(hourlyTotalWithTime))) + " 元 ", 1),
                                                createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                                  unref(selectedHourlyItems).reduce(
                                                    (sum, item) => item.subCategory === "時段加價" ? sum : sum + item.price,
                                                    0
                                                  )
                                                )) + " 元 x " + toDisplayString(unref(hourCount)) + " 時 x " + toDisplayString(unref(dayCount)) + " 天 + 加價項目 " + toDisplayString(unref(formatCurrency)(
                                                  unref(selectedHourlyItems).reduce(
                                                    (sum, item) => item.subCategory === "時段加價" ? sum + item.price : sum,
                                                    0
                                                  ) * unref(dayCount)
                                                )) + " 元) ", 1)
                                              ])
                                            ], 512), [
                                              [vShow, unref(showCalculator)]
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ])) : createCommentVNode("", true),
                                      unref(selectedCategory) === "包班制" ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "q-mt-md"
                                      }, [
                                        createVNode("div", { class: "row items-center justify-between" }, [
                                          createVNode("div", { class: "text-subtitle2" }, "包班時間設定"),
                                          createVNode(_component_q_btn, {
                                            flat: "",
                                            dense: "",
                                            round: "",
                                            icon: unref(showShiftCalculator) ? "expand_less" : "expand_more",
                                            onClick: ($event) => showShiftCalculator.value = !unref(showShiftCalculator)
                                          }, null, 8, ["icon", "onClick"])
                                        ]),
                                        createVNode(_component_q_slide_transition, null, {
                                          default: withCtx(() => [
                                            withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                              createVNode("div", { class: "q-mb-sm" }, [
                                                createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "包班天數"),
                                                createVNode("div", { class: "row q-col-gutter-xs" }, [
                                                  (openBlock(), createBlock(Fragment, null, renderList([1, 3, 5, 7, 14], (days) => {
                                                    return createVNode("div", {
                                                      class: "col-auto",
                                                      key: days
                                                    }, [
                                                      createVNode(_component_q_btn, {
                                                        color: unref(shiftDayCount) === days ? "secondary" : "white",
                                                        "text-color": unref(shiftDayCount) === days ? "white" : "secondary",
                                                        label: `${days}天`,
                                                        size: "sm",
                                                        onClick: ($event) => shiftDayCount.value = days,
                                                        unelevated: unref(shiftDayCount) === days,
                                                        flat: unref(shiftDayCount) !== days,
                                                        class: "q-px-sm day-btn",
                                                        style: { "border": "shiftDayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                      }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                    ]);
                                                  }), 64))
                                                ]),
                                                createVNode(_component_q_input, {
                                                  modelValue: unref(shiftDayCount),
                                                  "onUpdate:modelValue": ($event) => isRef(shiftDayCount) ? shiftDayCount.value = $event : null,
                                                  modelModifiers: { number: true },
                                                  type: "number",
                                                  label: "自定義天數",
                                                  outlined: "",
                                                  dense: "",
                                                  min: "1",
                                                  class: "q-mt-sm",
                                                  rules: [(val) => val >= 1 || "請輸入有效天數"]
                                                }, {
                                                  prepend: withCtx(() => [
                                                    createVNode(_component_q_icon, {
                                                      name: "event",
                                                      color: "secondary"
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                              ]),
                                              createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                                createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(shiftTotalWithDays))) + " 元 ", 1),
                                                createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                                  unref(selectedShiftItems).reduce(
                                                    (sum, item) => sum + item.price,
                                                    0
                                                  ) + (unref(selectedShiftType) === "SH01" ? 3e3 : 5500)
                                                )) + " 元 x " + toDisplayString(unref(shiftDayCount)) + " 天) ", 1)
                                              ])
                                            ], 512), [
                                              [vShow, unref(showShiftCalculator)]
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_card_section, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "chart-container" }, [
                                        unref(chartData).labels.length > 0 ? (openBlock(), createBlock(unref(Pie), {
                                          key: 0,
                                          data: unref(chartData),
                                          options: unref(chartOptions),
                                          class: "pie-chart"
                                        }, null, 8, ["data", "options"])) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "text-center text-grey q-pa-md"
                                        }, " 尚未選擇任何服務項目 "))
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  unref(selectedItems).length > 0 ? (openBlock(), createBlock(_component_q_card_section, { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_list, { dense: "" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedItems), (item) => {
                                            return openBlock(), createBlock(_component_q_item, {
                                              key: `selected-${item.code}`
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_section, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_item_label, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.name), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_q_item_section, { side: "" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(unref(formatCurrency)(item.price)) + " 元 ", 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128)),
                                          createVNode(_component_q_separator, { class: "q-my-sm" }),
                                          createVNode(_component_q_item, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_label, { class: "text-weight-bold" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("服務項目總金額")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("div", { class: "text-caption text-grey" }, " 已選 " + toDisplayString(unref(selectedItems).length) + " 項服務 ", 1)
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, { side: "" }, {
                                                default: withCtx(() => [
                                                  createVNode("span", { class: "text-weight-bold text-primary" }, toDisplayString(unref(formatCurrency)(
                                                    unref(selectedItems).reduce(
                                                      (sum, item) => sum + item.price,
                                                      0
                                                    )
                                                  )) + " 元", 1)
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_separator, { class: "q-my-sm" }),
                                          createVNode(_component_q_item, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_label, { class: "text-weight-bold text-h6" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("總計金額")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, { side: "" }, {
                                                default: withCtx(() => [
                                                  createVNode("span", { class: "text-weight-bold text-h6 text-primary" }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))) + " 元", 1)
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "row items-center" }, [
                                                    createVNode(_component_q_icon, {
                                                      name: "volunteer_activism",
                                                      color: "pink-6",
                                                      class: "q-mr-sm"
                                                    }),
                                                    createVNode("span", null, "小費金額")
                                                  ])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, { side: "" }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "row items-center" }, [
                                                    createVNode(_component_q_btn, {
                                                      round: "",
                                                      flat: "",
                                                      dense: "",
                                                      icon: "remove",
                                                      onClick: ($event) => tipAmount.value = Math.max(0, unref(tipAmount) - 50),
                                                      color: "grey",
                                                      class: "q-mr-xs"
                                                    }, null, 8, ["onClick"]),
                                                    createVNode(_component_q_input, {
                                                      modelValue: unref(tipAmount),
                                                      "onUpdate:modelValue": ($event) => isRef(tipAmount) ? tipAmount.value = $event : null,
                                                      modelModifiers: { number: true },
                                                      type: "number",
                                                      dense: "",
                                                      outlined: "",
                                                      class: "tip-input-inline",
                                                      style: { "width": "100px" },
                                                      rules: [(val) => val >= 0 || "請輸入有效金額"]
                                                    }, {
                                                      append: withCtx(() => [
                                                        createVNode("span", { class: "text-grey-8" }, "元")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                                    createVNode(_component_q_btn, {
                                                      round: "",
                                                      flat: "",
                                                      dense: "",
                                                      icon: "add",
                                                      onClick: ($event) => tipAmount.value += 50,
                                                      color: "pink-6",
                                                      class: "q-ml-xs"
                                                    }, null, 8, ["onClick"])
                                                  ])
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_page, { padding: "" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "row q-col-gutter-md" }, [
                          createVNode("div", { class: "col-12 col-md-8" }, [
                            createVNode(_component_q_card, {
                              class: "main-card",
                              flat: "",
                              bordered: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_card_section, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "service-type-selector q-mb-md" }, [
                                      createVNode("div", { class: "row no-wrap" }, [
                                        createVNode("div", { class: "col text-center" }, [
                                          createVNode(_component_q_btn, {
                                            color: unref(selectedCategory) === "鐘點制" ? "primary" : "grey-5",
                                            "text-color": unref(selectedCategory) === "鐘點制" ? "white" : "grey-8",
                                            class: "service-type-btn",
                                            size: "lg",
                                            "no-caps": "",
                                            unelevated: "",
                                            onClick: ($event) => selectedCategory.value = "鐘點制"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" 鐘點制 ")
                                            ]),
                                            _: 1
                                          }, 8, ["color", "text-color", "onClick"])
                                        ]),
                                        createVNode("div", { class: "col text-center" }, [
                                          createVNode(_component_q_btn, {
                                            color: unref(selectedCategory) === "包班制" ? "secondary" : "grey-5",
                                            "text-color": unref(selectedCategory) === "包班制" ? "white" : "grey-8",
                                            class: "service-type-btn",
                                            size: "lg",
                                            "no-caps": "",
                                            unelevated: "",
                                            onClick: ($event) => selectedCategory.value = "包班制"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" 包班制 ")
                                            ]),
                                            _: 1
                                          }, 8, ["color", "text-color", "onClick"])
                                        ])
                                      ])
                                    ]),
                                    createVNode("div", { class: "row q-mt-md q-col-gutter-sm" }, [
                                      createVNode("div", { class: "col-12 col-sm-8" }, [
                                        createVNode(_component_q_input, {
                                          modelValue: unref(searchText),
                                          "onUpdate:modelValue": ($event) => isRef(searchText) ? searchText.value = $event : null,
                                          label: "搜尋服務項目",
                                          outlined: "",
                                          clearable: "",
                                          class: "search-input"
                                        }, {
                                          prepend: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "search",
                                              color: "primary"
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      createVNode("div", { class: "col-12 col-sm-4" }, [
                                        createVNode(_component_q_btn, {
                                          color: "primary",
                                          icon: "refresh",
                                          label: "重置所有選擇",
                                          onClick: unref(resetSelections),
                                          class: "full-width",
                                          outline: ""
                                        }, null, 8, ["onClick"])
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_card_section, { class: "q-pt-none" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "row items-center justify-between" }, [
                                      createVNode("div", { class: "text-subtitle2" }, "篩選選項："),
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        dense: "",
                                        round: "",
                                        icon: unref(showFilters) ? "expand_less" : "expand_more",
                                        onClick: ($event) => showFilters.value = !unref(showFilters)
                                      }, null, 8, ["icon", "onClick"])
                                    ]),
                                    createVNode(_component_q_slide_transition, null, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode("div", { class: "filter-section q-pa-sm rounded-borders q-mt-sm" }, [
                                          createVNode("div", { class: "filter-group" }, [
                                            createVNode("div", { class: "filter-label" }, "價格篩選："),
                                            createVNode("div", { class: "row q-col-gutter-sm" }, [
                                              createVNode("div", { class: "col-auto" }, [
                                                createVNode(_component_q_chip, {
                                                  clickable: "",
                                                  onClick: ($event) => unref(applyFilter)("price", 100),
                                                  color: unref(activeFilters).price === 100 ? "primary" : "grey-4",
                                                  "text-color": unref(activeFilters).price === 100 ? "white" : "black",
                                                  outline: unref(activeFilters).price !== 100
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 價格 > 100元 ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick", "color", "text-color", "outline"])
                                              ]),
                                              createVNode("div", { class: "col-auto" }, [
                                                createVNode(_component_q_chip, {
                                                  clickable: "",
                                                  onClick: ($event) => unref(applyFilter)("price", 50),
                                                  color: unref(activeFilters).price === 50 ? "primary" : "grey-4",
                                                  "text-color": unref(activeFilters).price === 50 ? "white" : "black",
                                                  outline: unref(activeFilters).price !== 50
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 價格 > 50元 ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick", "color", "text-color", "outline"])
                                              ]),
                                              createVNode("div", { class: "col-auto" }, [
                                                createVNode(_component_q_chip, {
                                                  clickable: "",
                                                  onClick: ($event) => unref(applyFilter)("price", 0),
                                                  color: unref(activeFilters).price === 0 ? "primary" : "grey-4",
                                                  "text-color": unref(activeFilters).price === 0 ? "white" : "black",
                                                  outline: unref(activeFilters).price !== 0
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 全部 ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick", "color", "text-color", "outline"])
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "filter-group q-mt-sm" }, [
                                            createVNode("div", { class: "filter-label" }, "類別篩選："),
                                            createVNode("div", { class: "row q-col-gutter-sm" }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(availableSubCategories), (subCat) => {
                                                return openBlock(), createBlock("div", {
                                                  key: subCat,
                                                  class: "col-auto"
                                                }, [
                                                  createVNode(_component_q_chip, {
                                                    clickable: "",
                                                    onClick: ($event) => unref(applyFilter)("subCategory", subCat),
                                                    color: unref(activeFilters).subCategory === subCat ? "secondary" : "grey-4",
                                                    "text-color": unref(activeFilters).subCategory === subCat ? "white" : "black",
                                                    outline: unref(activeFilters).subCategory !== subCat
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(subCat), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick", "color", "text-color", "outline"])
                                                ]);
                                              }), 128)),
                                              createVNode("div", { class: "col-auto" }, [
                                                createVNode(_component_q_chip, {
                                                  clickable: "",
                                                  onClick: ($event) => unref(applyFilter)("subCategory", null),
                                                  color: !unref(activeFilters).subCategory ? "secondary" : "grey-4",
                                                  "text-color": !unref(activeFilters).subCategory ? "white" : "black",
                                                  outline: unref(activeFilters).subCategory !== null
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 全部 ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick", "color", "text-color", "outline"])
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "text-right q-mt-sm" }, [
                                            createVNode(_component_q_btn, {
                                              outline: "",
                                              size: "sm",
                                              color: "secondary",
                                              icon: "filter_alt_off",
                                              label: "清除篩選",
                                              onClick: unref(resetAllFilters),
                                              disable: !unref(isAnyFilterActive)
                                            }, null, 8, ["onClick", "disable"])
                                          ])
                                        ], 512), [
                                          [vShow, unref(showFilters)]
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_card_section, null, {
                                  default: withCtx(() => [
                                    unref(selectedCategory) === "包班制" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "q-mb-md"
                                    }, [
                                      createVNode("div", { class: "text-subtitle1 q-mb-sm" }, "選擇班次"),
                                      createVNode("div", { class: "row q-col-gutter-md" }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(shiftTypeItems), (item) => {
                                          return openBlock(), createBlock("div", {
                                            class: "col-12 col-sm-6",
                                            key: item.code
                                          }, [
                                            createVNode(_component_q_card, {
                                              class: {
                                                "shift-card": true,
                                                "shift-card-selected": unref(isSelected)(item)
                                              },
                                              clickable: "",
                                              onClick: ($event) => unref(selectShiftType)(item)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_card_section, { class: "q-py-sm" }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "row items-center" }, [
                                                      createVNode("div", { class: "col-auto" }, [
                                                        createVNode(_component_q_icon, {
                                                          name: item.icon,
                                                          color: unref(getItemColor)(item),
                                                          size: "md"
                                                        }, null, 8, ["name", "color"])
                                                      ]),
                                                      createVNode("div", { class: "col q-ml-sm" }, [
                                                        createVNode("div", { class: "text-subtitle2" }, toDisplayString(item.name), 1),
                                                        createVNode("div", { class: "text-caption" }, [
                                                          createVNode(_component_q_icon, {
                                                            name: "paid",
                                                            size: "xs",
                                                            color: "primary",
                                                            class: "q-mr-xs"
                                                          }),
                                                          createVNode("span", null, toDisplayString(unref(formatCurrency)(item.price)) + " 元/班", 1)
                                                        ])
                                                      ]),
                                                      createVNode("div", { class: "col-auto" }, [
                                                        createVNode(_component_q_radio, {
                                                          modelValue: unref(selectedShiftType),
                                                          "onUpdate:modelValue": ($event) => isRef(selectedShiftType) ? selectedShiftType.value = $event : null,
                                                          val: item.code,
                                                          color: "primary"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "val"])
                                                      ])
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "onClick"])
                                          ]);
                                        }), 128))
                                      ])
                                    ])) : createCommentVNode("", true),
                                    createVNode("div", { class: "text-subtitle1 q-mb-sm" }, toDisplayString(unref(selectedCategory) === "包班制" ? "選擇附加服務" : "選擇服務項目"), 1),
                                    createVNode(_component_q_list, {
                                      bordered: "",
                                      separator: "",
                                      class: "rounded-borders"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(TransitionGroup, {
                                          name: "list",
                                          tag: "div"
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredItems), (item) => {
                                              return withDirectives((openBlock(), createBlock(_component_q_item, {
                                                key: item.code,
                                                clickable: !(unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)),
                                                onClick: ($event) => unref(toggleItem)(item),
                                                class: [{
                                                  "selected-item": unref(isSelected)(item),
                                                  "mandatory-item": item.code === "HR01",
                                                  "disabled-item": unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)
                                                }, "service-item q-pa-md"]
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_icon, {
                                                        name: item.icon,
                                                        color: unref(getItemColor)(item),
                                                        size: "md"
                                                      }, null, 8, ["name", "color"])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_q_item_section, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_item_label, { class: "text-weight-bold text-body1" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(item.name) + " ", 1),
                                                          item.code === "HR01" ? (openBlock(), createBlock(_component_q_badge, {
                                                            key: 0,
                                                            color: "positive",
                                                            class: "q-ml-sm"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(" 必選 ")
                                                            ]),
                                                            _: 1
                                                          })) : createCommentVNode("", true)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_q_item_label, {
                                                        caption: "",
                                                        class: "q-mt-sm"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "row items-center" }, [
                                                            createVNode(_component_q_icon, {
                                                              name: "paid",
                                                              size: "xs",
                                                              color: "primary",
                                                              class: "q-mr-xs"
                                                            }),
                                                            createVNode("span", null, "金額：" + toDisplayString(item.price) + " 元", 1)
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_q_item_section, { side: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_checkbox, {
                                                        onClick: withModifiers(($event) => unref(toggleItem)(item), ["stop"]),
                                                        modelValue: unref(selectedItems),
                                                        "onUpdate:modelValue": ($event) => isRef(selectedItems) ? selectedItems.value = $event : null,
                                                        val: item,
                                                        color: "primary",
                                                        disable: item.code === "HR01" && !unref(isSelected)(item) || unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item),
                                                        "aria-label": `選擇 ${item.name}`
                                                      }, null, 8, ["onClick", "modelValue", "onUpdate:modelValue", "val", "disable", "aria-label"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1032, ["clickable", "onClick", "class"])), [
                                                [_directive_ripple],
                                                [
                                                  vShow,
                                                  !(unref(selectedCategory) === "鐘點制" && item.subCategory === "時段加價")
                                                ]
                                              ]);
                                            }), 128))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "col-12 col-md-4" }, [
                            createVNode(_component_q_card, {
                              class: "summary-card",
                              flat: "",
                              bordered: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_card_section, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-h6 text-primary" }, [
                                      createVNode(_component_q_icon, { name: "summarize" }),
                                      createTextVNode(" 費用統計 ")
                                    ]),
                                    unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "q-mt-md"
                                    }, [
                                      createVNode("div", { class: "row items-center justify-between" }, [
                                        createVNode("div", { class: "text-subtitle2" }, "服務時間設定"),
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          dense: "",
                                          round: "",
                                          icon: unref(showCalculator) ? "expand_less" : "expand_more",
                                          onClick: ($event) => showCalculator.value = !unref(showCalculator)
                                        }, null, 8, ["icon", "onClick"])
                                      ]),
                                      createVNode(_component_q_slide_transition, null, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                            createVNode("div", { class: "q-mb-sm" }, [
                                              createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "天數選擇"),
                                              createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                                (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3, 5, 7], (days) => {
                                                  return createVNode("div", {
                                                    class: "col-2",
                                                    key: days
                                                  }, [
                                                    createVNode(_component_q_btn, {
                                                      color: unref(dayCount) === days ? "secondary" : "white",
                                                      "text-color": unref(dayCount) === days ? "white" : "secondary",
                                                      label: `${days}天`,
                                                      size: "sm",
                                                      onClick: ($event) => dayCount.value = days,
                                                      unelevated: unref(dayCount) === days,
                                                      flat: unref(dayCount) !== days,
                                                      class: "q-px-xs day-btn full-width",
                                                      style: { "border": "dayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                    }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                  ]);
                                                }), 64))
                                              ]),
                                              createVNode(_component_q_input, {
                                                modelValue: unref(dayCount),
                                                "onUpdate:modelValue": ($event) => isRef(dayCount) ? dayCount.value = $event : null,
                                                modelModifiers: { number: true },
                                                type: "number",
                                                label: "自定義天數",
                                                outlined: "",
                                                dense: "",
                                                min: "1",
                                                class: "q-mt-sm",
                                                rules: [(val) => val >= 1 || "請輸入有效天數"]
                                              }, {
                                                prepend: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "event",
                                                    color: "secondary"
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                            ]),
                                            createVNode("div", { class: "q-mb-sm" }, [
                                              createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "每日服務時數"),
                                              createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                                (openBlock(), createBlock(Fragment, null, renderList([4, 8, 10, 12, 24], (hours) => {
                                                  return createVNode("div", {
                                                    class: "col-2",
                                                    key: hours
                                                  }, [
                                                    createVNode(_component_q_btn, {
                                                      color: unref(hourCount) === hours ? "primary" : "white",
                                                      "text-color": unref(hourCount) === hours ? "white" : "primary",
                                                      label: `${hours}時`,
                                                      size: "sm",
                                                      onClick: ($event) => hourCount.value = hours,
                                                      unelevated: unref(hourCount) === hours,
                                                      flat: unref(hourCount) !== hours,
                                                      class: "q-px-xs hour-btn full-width",
                                                      style: { "border": "hourCount !== hours ? '1px solid #1976d2' : 'none'" }
                                                    }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                  ]);
                                                }), 64))
                                              ]),
                                              createVNode(_component_q_input, {
                                                modelValue: unref(hourCount),
                                                "onUpdate:modelValue": ($event) => isRef(hourCount) ? hourCount.value = $event : null,
                                                modelModifiers: { number: true },
                                                type: "number",
                                                label: "自定義小時數",
                                                outlined: "",
                                                dense: "",
                                                min: "1",
                                                class: "q-mt-sm",
                                                rules: [(val) => val >= 1 || "請輸入有效小時數"]
                                              }, {
                                                prepend: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "schedule",
                                                    color: "primary"
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                            ]),
                                            createVNode("div", { class: "q-mt-md" }, [
                                              createVNode("div", { class: "row items-center justify-between" }, [
                                                createVNode("div", { class: "text-subtitle2" }, "加價項目"),
                                                createVNode(_component_q_btn, {
                                                  flat: "",
                                                  dense: "",
                                                  round: "",
                                                  icon: unref(showAdditionalItems) ? "expand_less" : "expand_more",
                                                  onClick: ($event) => showAdditionalItems.value = !unref(showAdditionalItems)
                                                }, null, 8, ["icon", "onClick"])
                                              ]),
                                              createVNode(_component_q_slide_transition, null, {
                                                default: withCtx(() => [
                                                  withDirectives(createVNode("div", { class: "row q-col-gutter-sm q-mt-sm" }, [
                                                    createVNode("div", { class: "col-12" }, [
                                                      createVNode("div", { class: "row items-center" }, [
                                                        createVNode("div", { class: "col" }, [
                                                          createVNode(_component_q_toggle, {
                                                            modelValue: unref(isNightShift),
                                                            "onUpdate:modelValue": [($event) => isRef(isNightShift) ? isNightShift.value = $event : null, ($event) => unref(toggleAdditionalService)("HR09")],
                                                            label: "夜間時段 (22:00-08:00)",
                                                            color: "blue-grey"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                        ]),
                                                        createVNode("div", { class: "col-auto text-blue-grey" }, [
                                                          createVNode(_component_q_badge, {
                                                            color: "blue-grey",
                                                            "text-color": "white"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(unref(formatCurrency)(20)) + " 元 ", 1)
                                                            ]),
                                                            _: 1
                                                          })
                                                        ])
                                                      ])
                                                    ]),
                                                    createVNode("div", { class: "col-12" }, [
                                                      createVNode("div", { class: "row items-center" }, [
                                                        createVNode("div", { class: "col" }, [
                                                          createVNode(_component_q_toggle, {
                                                            modelValue: unref(isUrgent),
                                                            "onUpdate:modelValue": [($event) => isRef(isUrgent) ? isUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR10")],
                                                            label: "加價急徵",
                                                            color: "amber"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                        ]),
                                                        createVNode("div", { class: "col-auto text-amber" }, [
                                                          createVNode(_component_q_badge, {
                                                            color: "amber",
                                                            "text-color": "white"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                            ]),
                                                            _: 1
                                                          })
                                                        ])
                                                      ])
                                                    ]),
                                                    createVNode("div", { class: "col-12" }, [
                                                      createVNode("div", { class: "row items-center" }, [
                                                        createVNode("div", { class: "col" }, [
                                                          createVNode(_component_q_toggle, {
                                                            modelValue: unref(isDoubleUrgent),
                                                            "onUpdate:modelValue": [($event) => isRef(isDoubleUrgent) ? isDoubleUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR11")],
                                                            label: "二次加價急徵",
                                                            color: "orange"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                        ]),
                                                        createVNode("div", { class: "col-auto text-orange" }, [
                                                          createVNode(_component_q_badge, {
                                                            color: "orange",
                                                            "text-color": "white"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                            ]),
                                                            _: 1
                                                          })
                                                        ])
                                                      ])
                                                    ])
                                                  ], 512), [
                                                    [vShow, unref(showAdditionalItems)]
                                                  ])
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                              createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(hourlyTotalWithTime))) + " 元 ", 1),
                                              createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                                unref(selectedHourlyItems).reduce(
                                                  (sum, item) => item.subCategory === "時段加價" ? sum : sum + item.price,
                                                  0
                                                )
                                              )) + " 元 x " + toDisplayString(unref(hourCount)) + " 時 x " + toDisplayString(unref(dayCount)) + " 天 + 加價項目 " + toDisplayString(unref(formatCurrency)(
                                                unref(selectedHourlyItems).reduce(
                                                  (sum, item) => item.subCategory === "時段加價" ? sum + item.price : sum,
                                                  0
                                                ) * unref(dayCount)
                                              )) + " 元) ", 1)
                                            ])
                                          ], 512), [
                                            [vShow, unref(showCalculator)]
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ])) : createCommentVNode("", true),
                                    unref(selectedCategory) === "包班制" ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "q-mt-md"
                                    }, [
                                      createVNode("div", { class: "row items-center justify-between" }, [
                                        createVNode("div", { class: "text-subtitle2" }, "包班時間設定"),
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          dense: "",
                                          round: "",
                                          icon: unref(showShiftCalculator) ? "expand_less" : "expand_more",
                                          onClick: ($event) => showShiftCalculator.value = !unref(showShiftCalculator)
                                        }, null, 8, ["icon", "onClick"])
                                      ]),
                                      createVNode(_component_q_slide_transition, null, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                            createVNode("div", { class: "q-mb-sm" }, [
                                              createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "包班天數"),
                                              createVNode("div", { class: "row q-col-gutter-xs" }, [
                                                (openBlock(), createBlock(Fragment, null, renderList([1, 3, 5, 7, 14], (days) => {
                                                  return createVNode("div", {
                                                    class: "col-auto",
                                                    key: days
                                                  }, [
                                                    createVNode(_component_q_btn, {
                                                      color: unref(shiftDayCount) === days ? "secondary" : "white",
                                                      "text-color": unref(shiftDayCount) === days ? "white" : "secondary",
                                                      label: `${days}天`,
                                                      size: "sm",
                                                      onClick: ($event) => shiftDayCount.value = days,
                                                      unelevated: unref(shiftDayCount) === days,
                                                      flat: unref(shiftDayCount) !== days,
                                                      class: "q-px-sm day-btn",
                                                      style: { "border": "shiftDayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                    }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                  ]);
                                                }), 64))
                                              ]),
                                              createVNode(_component_q_input, {
                                                modelValue: unref(shiftDayCount),
                                                "onUpdate:modelValue": ($event) => isRef(shiftDayCount) ? shiftDayCount.value = $event : null,
                                                modelModifiers: { number: true },
                                                type: "number",
                                                label: "自定義天數",
                                                outlined: "",
                                                dense: "",
                                                min: "1",
                                                class: "q-mt-sm",
                                                rules: [(val) => val >= 1 || "請輸入有效天數"]
                                              }, {
                                                prepend: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "event",
                                                    color: "secondary"
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                            ]),
                                            createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                              createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(shiftTotalWithDays))) + " 元 ", 1),
                                              createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                                unref(selectedShiftItems).reduce(
                                                  (sum, item) => sum + item.price,
                                                  0
                                                ) + (unref(selectedShiftType) === "SH01" ? 3e3 : 5500)
                                              )) + " 元 x " + toDisplayString(unref(shiftDayCount)) + " 天) ", 1)
                                            ])
                                          ], 512), [
                                            [vShow, unref(showShiftCalculator)]
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_card_section, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "chart-container" }, [
                                      unref(chartData).labels.length > 0 ? (openBlock(), createBlock(unref(Pie), {
                                        key: 0,
                                        data: unref(chartData),
                                        options: unref(chartOptions),
                                        class: "pie-chart"
                                      }, null, 8, ["data", "options"])) : (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "text-center text-grey q-pa-md"
                                      }, " 尚未選擇任何服務項目 "))
                                    ])
                                  ]),
                                  _: 1
                                }),
                                unref(selectedItems).length > 0 ? (openBlock(), createBlock(_component_q_card_section, { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_list, { dense: "" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedItems), (item) => {
                                          return openBlock(), createBlock(_component_q_item, {
                                            key: `selected-${item.code}`
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_section, { side: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unref(formatCurrency)(item.price)) + " 元 ", 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128)),
                                        createVNode(_component_q_separator, { class: "q-my-sm" }),
                                        createVNode(_component_q_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_label, { class: "text-weight-bold" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("服務項目總金額")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("div", { class: "text-caption text-grey" }, " 已選 " + toDisplayString(unref(selectedItems).length) + " 項服務 ", 1)
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, { side: "" }, {
                                              default: withCtx(() => [
                                                createVNode("span", { class: "text-weight-bold text-primary" }, toDisplayString(unref(formatCurrency)(
                                                  unref(selectedItems).reduce(
                                                    (sum, item) => sum + item.price,
                                                    0
                                                  )
                                                )) + " 元", 1)
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_separator, { class: "q-my-sm" }),
                                        createVNode(_component_q_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_label, { class: "text-weight-bold text-h6" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("總計金額")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, { side: "" }, {
                                              default: withCtx(() => [
                                                createVNode("span", { class: "text-weight-bold text-h6 text-primary" }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))) + " 元", 1)
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "row items-center" }, [
                                                  createVNode(_component_q_icon, {
                                                    name: "volunteer_activism",
                                                    color: "pink-6",
                                                    class: "q-mr-sm"
                                                  }),
                                                  createVNode("span", null, "小費金額")
                                                ])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, { side: "" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "row items-center" }, [
                                                  createVNode(_component_q_btn, {
                                                    round: "",
                                                    flat: "",
                                                    dense: "",
                                                    icon: "remove",
                                                    onClick: ($event) => tipAmount.value = Math.max(0, unref(tipAmount) - 50),
                                                    color: "grey",
                                                    class: "q-mr-xs"
                                                  }, null, 8, ["onClick"]),
                                                  createVNode(_component_q_input, {
                                                    modelValue: unref(tipAmount),
                                                    "onUpdate:modelValue": ($event) => isRef(tipAmount) ? tipAmount.value = $event : null,
                                                    modelModifiers: { number: true },
                                                    type: "number",
                                                    dense: "",
                                                    outlined: "",
                                                    class: "tip-input-inline",
                                                    style: { "width": "100px" },
                                                    rules: [(val) => val >= 0 || "請輸入有效金額"]
                                                  }, {
                                                    append: withCtx(() => [
                                                      createVNode("span", { class: "text-grey-8" }, "元")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                                  createVNode(_component_q_btn, {
                                                    round: "",
                                                    flat: "",
                                                    dense: "",
                                                    icon: "add",
                                                    onClick: ($event) => tipAmount.value += 50,
                                                    color: "pink-6",
                                                    class: "q-ml-xs"
                                                  }, null, 8, ["onClick"])
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_footer, {
              elevated: "",
              class: "footer-gradient text-white",
              style: { "min-height": "64px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_toolbar, { style: { "height": "5rem" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_toolbar_title, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="row items-center" style="${ssrRenderStyle({ "width": "100%" })}" data-v-8eb201ff${_scopeId4}><div class="col-grow" style="${ssrRenderStyle({ "white-space": "nowrap" })}" data-v-8eb201ff${_scopeId4}><div class="column" style="${ssrRenderStyle({ "line-height": "1.5" })}" data-v-8eb201ff${_scopeId4}><div class="row items-center" data-v-8eb201ff${_scopeId4}><span class="text-subtitle1" data-v-8eb201ff${_scopeId4}>總費用：</span><span class="text-h5 cost-display" data-v-8eb201ff${_scopeId4}>${ssrInterpolate(unref(formatCurrency)(unref(totalCost) + unref(tipAmount)))}</span>`);
                              if (unref(selectedCategory) === "鐘點制") {
                                _push5(`<span class="text-subtitle1" style="${ssrRenderStyle({ "margin-left": "8px" })}" data-v-8eb201ff${_scopeId4}> (${ssrInterpolate(unref(hourCount) * unref(dayCount))} 小時) </span>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<span class="text-subtitle1" data-v-8eb201ff${_scopeId4}>元</span>`);
                              if (unref(tipAmount) > 0) {
                                _push5(ssrRenderComponent(_component_q_badge, {
                                  color: "pink-6",
                                  class: "q-ml-sm",
                                  style: { "padding": "4px 8px" }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` 含小費 ${ssrInterpolate(unref(formatCurrency)(unref(tipAmount)))} 元 `);
                                    } else {
                                      return [
                                        createTextVNode(" 含小費 " + toDisplayString(unref(formatCurrency)(unref(tipAmount))) + " 元 ", 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div>`);
                              if (unref(selectedCategory) === "鐘點制") {
                                _push5(`<div class="row items-center q-mt-xs" data-v-8eb201ff${_scopeId4}><span class="text-caption text-grey-7" data-v-8eb201ff${_scopeId4}>每小時上限500元</span></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div></div></div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  class: "row items-center",
                                  style: { "width": "100%" }
                                }, [
                                  createVNode("div", {
                                    class: "col-grow",
                                    style: { "white-space": "nowrap" }
                                  }, [
                                    createVNode("div", {
                                      class: "column",
                                      style: { "line-height": "1.5" }
                                    }, [
                                      createVNode("div", { class: "row items-center" }, [
                                        createVNode("span", { class: "text-subtitle1" }, "總費用："),
                                        createVNode("span", {
                                          ref_key: "totalCostElement",
                                          ref: totalCostElement,
                                          class: "text-h5 cost-display"
                                        }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))), 513),
                                        unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "text-subtitle1",
                                          style: { "margin-left": "8px" }
                                        }, " (" + toDisplayString(unref(hourCount) * unref(dayCount)) + " 小時) ", 1)) : createCommentVNode("", true),
                                        createVNode("span", { class: "text-subtitle1" }, "元"),
                                        unref(tipAmount) > 0 ? (openBlock(), createBlock(_component_q_badge, {
                                          key: 1,
                                          color: "pink-6",
                                          class: "q-ml-sm",
                                          style: { "padding": "4px 8px" }
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 含小費 " + toDisplayString(unref(formatCurrency)(unref(tipAmount))) + " 元 ", 1)
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true)
                                      ]),
                                      unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "row items-center q-mt-xs"
                                      }, [
                                        createVNode("span", { class: "text-caption text-grey-7" }, "每小時上限500元")
                                      ])) : createCommentVNode("", true)
                                    ])
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_toolbar_title, null, {
                            default: withCtx(() => [
                              createVNode("div", {
                                class: "row items-center",
                                style: { "width": "100%" }
                              }, [
                                createVNode("div", {
                                  class: "col-grow",
                                  style: { "white-space": "nowrap" }
                                }, [
                                  createVNode("div", {
                                    class: "column",
                                    style: { "line-height": "1.5" }
                                  }, [
                                    createVNode("div", { class: "row items-center" }, [
                                      createVNode("span", { class: "text-subtitle1" }, "總費用："),
                                      createVNode("span", {
                                        ref_key: "totalCostElement",
                                        ref: totalCostElement,
                                        class: "text-h5 cost-display"
                                      }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))), 513),
                                      unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "text-subtitle1",
                                        style: { "margin-left": "8px" }
                                      }, " (" + toDisplayString(unref(hourCount) * unref(dayCount)) + " 小時) ", 1)) : createCommentVNode("", true),
                                      createVNode("span", { class: "text-subtitle1" }, "元"),
                                      unref(tipAmount) > 0 ? (openBlock(), createBlock(_component_q_badge, {
                                        key: 1,
                                        color: "pink-6",
                                        class: "q-ml-sm",
                                        style: { "padding": "4px 8px" }
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" 含小費 " + toDisplayString(unref(formatCurrency)(unref(tipAmount))) + " 元 ", 1)
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ]),
                                    unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "row items-center q-mt-xs"
                                    }, [
                                      createVNode("span", { class: "text-caption text-grey-7" }, "每小時上限500元")
                                    ])) : createCommentVNode("", true)
                                  ])
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_toolbar, { style: { "height": "5rem" } }, {
                      default: withCtx(() => [
                        createVNode(_component_q_toolbar_title, null, {
                          default: withCtx(() => [
                            createVNode("div", {
                              class: "row items-center",
                              style: { "width": "100%" }
                            }, [
                              createVNode("div", {
                                class: "col-grow",
                                style: { "white-space": "nowrap" }
                              }, [
                                createVNode("div", {
                                  class: "column",
                                  style: { "line-height": "1.5" }
                                }, [
                                  createVNode("div", { class: "row items-center" }, [
                                    createVNode("span", { class: "text-subtitle1" }, "總費用："),
                                    createVNode("span", {
                                      ref_key: "totalCostElement",
                                      ref: totalCostElement,
                                      class: "text-h5 cost-display"
                                    }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))), 513),
                                    unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "text-subtitle1",
                                      style: { "margin-left": "8px" }
                                    }, " (" + toDisplayString(unref(hourCount) * unref(dayCount)) + " 小時) ", 1)) : createCommentVNode("", true),
                                    createVNode("span", { class: "text-subtitle1" }, "元"),
                                    unref(tipAmount) > 0 ? (openBlock(), createBlock(_component_q_badge, {
                                      key: 1,
                                      color: "pink-6",
                                      class: "q-ml-sm",
                                      style: { "padding": "4px 8px" }
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 含小費 " + toDisplayString(unref(formatCurrency)(unref(tipAmount))) + " 元 ", 1)
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true)
                                  ]),
                                  unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "row items-center q-mt-xs"
                                  }, [
                                    createVNode("span", { class: "text-caption text-grey-7" }, "每小時上限500元")
                                  ])) : createCommentVNode("", true)
                                ])
                              ])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_dialog, {
              modelValue: unref(showHelp),
              "onUpdate:modelValue": ($event) => isRef(showHelp) ? showHelp.value = $event : null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card, { style: { "width": "700px", "max-width": "80vw" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_card_section, { class: "row items-center bg-primary text-white" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-h6" data-v-8eb201ff${_scopeId4}>使用說明</div>`);
                              _push5(ssrRenderComponent(_component_q_space, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_btn, mergeProps({
                                icon: "close",
                                flat: "",
                                round: "",
                                dense: ""
                              }, ssrGetDirectiveProps(_ctx, _directive_close_popup)), null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "text-h6" }, "使用說明"),
                                createVNode(_component_q_space),
                                withDirectives(createVNode(_component_q_btn, {
                                  icon: "close",
                                  flat: "",
                                  round: "",
                                  dense: ""
                                }, null, 512), [
                                  [_directive_close_popup]
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_card_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<p data-v-8eb201ff${_scopeId4}><b data-v-8eb201ff${_scopeId4}>鐘點制</b>：按小時計費，基本照護為必選項目，可根據需求選擇附加服務。 </p><p data-v-8eb201ff${_scopeId4}><b data-v-8eb201ff${_scopeId4}>包班制</b>：按班次計費，選擇12小時或24小時班次，可根據需求選擇附加服務。 </p><p data-v-8eb201ff${_scopeId4}>點擊服務項目或勾選核取方塊可選擇/取消選擇服務。</p>`);
                            } else {
                              return [
                                createVNode("p", null, [
                                  createVNode("b", null, "鐘點制"),
                                  createTextVNode("：按小時計費，基本照護為必選項目，可根據需求選擇附加服務。 ")
                                ]),
                                createVNode("p", null, [
                                  createVNode("b", null, "包班制"),
                                  createTextVNode("：按班次計費，選擇12小時或24小時班次，可根據需求選擇附加服務。 ")
                                ]),
                                createVNode("p", null, "點擊服務項目或勾選核取方塊可選擇/取消選擇服務。")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_card_section, { class: "row items-center bg-primary text-white" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6" }, "使用說明"),
                              createVNode(_component_q_space),
                              withDirectives(createVNode(_component_q_btn, {
                                icon: "close",
                                flat: "",
                                round: "",
                                dense: ""
                              }, null, 512), [
                                [_directive_close_popup]
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("p", null, [
                                createVNode("b", null, "鐘點制"),
                                createTextVNode("：按小時計費，基本照護為必選項目，可根據需求選擇附加服務。 ")
                              ]),
                              createVNode("p", null, [
                                createVNode("b", null, "包班制"),
                                createTextVNode("：按班次計費，選擇12小時或24小時班次，可根據需求選擇附加服務。 ")
                              ]),
                              createVNode("p", null, "點擊服務項目或勾選核取方塊可選擇/取消選擇服務。")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card, { style: { "width": "700px", "max-width": "80vw" } }, {
                      default: withCtx(() => [
                        createVNode(_component_q_card_section, { class: "row items-center bg-primary text-white" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-h6" }, "使用說明"),
                            createVNode(_component_q_space),
                            withDirectives(createVNode(_component_q_btn, {
                              icon: "close",
                              flat: "",
                              round: "",
                              dense: ""
                            }, null, 512), [
                              [_directive_close_popup]
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_card_section, null, {
                          default: withCtx(() => [
                            createVNode("p", null, [
                              createVNode("b", null, "鐘點制"),
                              createTextVNode("：按小時計費，基本照護為必選項目，可根據需求選擇附加服務。 ")
                            ]),
                            createVNode("p", null, [
                              createVNode("b", null, "包班制"),
                              createTextVNode("：按班次計費，選擇12小時或24小時班次，可根據需求選擇附加服務。 ")
                            ]),
                            createVNode("p", null, "點擊服務項目或勾選核取方塊可選擇/取消選擇服務。")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_q_header, {
                elevated: "",
                class: "header-gradient text-white"
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_toolbar, null, {
                    default: withCtx(() => [
                      createVNode(_component_q_toolbar_title, { class: "header-title" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "medical_services",
                            size: "md",
                            class: "q-mr-sm"
                          }),
                          createVNode("h1", { class: "text-h5 q-my-none" }, "專業護理服務計費系統")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_page_container, { class: "page-background" }, {
                default: withCtx(() => [
                  createVNode(_component_q_page, { padding: "" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "row q-col-gutter-md" }, [
                        createVNode("div", { class: "col-12 col-md-8" }, [
                          createVNode(_component_q_card, {
                            class: "main-card",
                            flat: "",
                            bordered: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_card_section, null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "service-type-selector q-mb-md" }, [
                                    createVNode("div", { class: "row no-wrap" }, [
                                      createVNode("div", { class: "col text-center" }, [
                                        createVNode(_component_q_btn, {
                                          color: unref(selectedCategory) === "鐘點制" ? "primary" : "grey-5",
                                          "text-color": unref(selectedCategory) === "鐘點制" ? "white" : "grey-8",
                                          class: "service-type-btn",
                                          size: "lg",
                                          "no-caps": "",
                                          unelevated: "",
                                          onClick: ($event) => selectedCategory.value = "鐘點制"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 鐘點制 ")
                                          ]),
                                          _: 1
                                        }, 8, ["color", "text-color", "onClick"])
                                      ]),
                                      createVNode("div", { class: "col text-center" }, [
                                        createVNode(_component_q_btn, {
                                          color: unref(selectedCategory) === "包班制" ? "secondary" : "grey-5",
                                          "text-color": unref(selectedCategory) === "包班制" ? "white" : "grey-8",
                                          class: "service-type-btn",
                                          size: "lg",
                                          "no-caps": "",
                                          unelevated: "",
                                          onClick: ($event) => selectedCategory.value = "包班制"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 包班制 ")
                                          ]),
                                          _: 1
                                        }, 8, ["color", "text-color", "onClick"])
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", { class: "row q-mt-md q-col-gutter-sm" }, [
                                    createVNode("div", { class: "col-12 col-sm-8" }, [
                                      createVNode(_component_q_input, {
                                        modelValue: unref(searchText),
                                        "onUpdate:modelValue": ($event) => isRef(searchText) ? searchText.value = $event : null,
                                        label: "搜尋服務項目",
                                        outlined: "",
                                        clearable: "",
                                        class: "search-input"
                                      }, {
                                        prepend: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "search",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    createVNode("div", { class: "col-12 col-sm-4" }, [
                                      createVNode(_component_q_btn, {
                                        color: "primary",
                                        icon: "refresh",
                                        label: "重置所有選擇",
                                        onClick: unref(resetSelections),
                                        class: "full-width",
                                        outline: ""
                                      }, null, 8, ["onClick"])
                                    ])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_card_section, { class: "q-pt-none" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "row items-center justify-between" }, [
                                    createVNode("div", { class: "text-subtitle2" }, "篩選選項："),
                                    createVNode(_component_q_btn, {
                                      flat: "",
                                      dense: "",
                                      round: "",
                                      icon: unref(showFilters) ? "expand_less" : "expand_more",
                                      onClick: ($event) => showFilters.value = !unref(showFilters)
                                    }, null, 8, ["icon", "onClick"])
                                  ]),
                                  createVNode(_component_q_slide_transition, null, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode("div", { class: "filter-section q-pa-sm rounded-borders q-mt-sm" }, [
                                        createVNode("div", { class: "filter-group" }, [
                                          createVNode("div", { class: "filter-label" }, "價格篩選："),
                                          createVNode("div", { class: "row q-col-gutter-sm" }, [
                                            createVNode("div", { class: "col-auto" }, [
                                              createVNode(_component_q_chip, {
                                                clickable: "",
                                                onClick: ($event) => unref(applyFilter)("price", 100),
                                                color: unref(activeFilters).price === 100 ? "primary" : "grey-4",
                                                "text-color": unref(activeFilters).price === 100 ? "white" : "black",
                                                outline: unref(activeFilters).price !== 100
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" 價格 > 100元 ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick", "color", "text-color", "outline"])
                                            ]),
                                            createVNode("div", { class: "col-auto" }, [
                                              createVNode(_component_q_chip, {
                                                clickable: "",
                                                onClick: ($event) => unref(applyFilter)("price", 50),
                                                color: unref(activeFilters).price === 50 ? "primary" : "grey-4",
                                                "text-color": unref(activeFilters).price === 50 ? "white" : "black",
                                                outline: unref(activeFilters).price !== 50
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" 價格 > 50元 ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick", "color", "text-color", "outline"])
                                            ]),
                                            createVNode("div", { class: "col-auto" }, [
                                              createVNode(_component_q_chip, {
                                                clickable: "",
                                                onClick: ($event) => unref(applyFilter)("price", 0),
                                                color: unref(activeFilters).price === 0 ? "primary" : "grey-4",
                                                "text-color": unref(activeFilters).price === 0 ? "white" : "black",
                                                outline: unref(activeFilters).price !== 0
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" 全部 ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick", "color", "text-color", "outline"])
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "filter-group q-mt-sm" }, [
                                          createVNode("div", { class: "filter-label" }, "類別篩選："),
                                          createVNode("div", { class: "row q-col-gutter-sm" }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(availableSubCategories), (subCat) => {
                                              return openBlock(), createBlock("div", {
                                                key: subCat,
                                                class: "col-auto"
                                              }, [
                                                createVNode(_component_q_chip, {
                                                  clickable: "",
                                                  onClick: ($event) => unref(applyFilter)("subCategory", subCat),
                                                  color: unref(activeFilters).subCategory === subCat ? "secondary" : "grey-4",
                                                  "text-color": unref(activeFilters).subCategory === subCat ? "white" : "black",
                                                  outline: unref(activeFilters).subCategory !== subCat
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(subCat), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick", "color", "text-color", "outline"])
                                              ]);
                                            }), 128)),
                                            createVNode("div", { class: "col-auto" }, [
                                              createVNode(_component_q_chip, {
                                                clickable: "",
                                                onClick: ($event) => unref(applyFilter)("subCategory", null),
                                                color: !unref(activeFilters).subCategory ? "secondary" : "grey-4",
                                                "text-color": !unref(activeFilters).subCategory ? "white" : "black",
                                                outline: unref(activeFilters).subCategory !== null
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" 全部 ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick", "color", "text-color", "outline"])
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "text-right q-mt-sm" }, [
                                          createVNode(_component_q_btn, {
                                            outline: "",
                                            size: "sm",
                                            color: "secondary",
                                            icon: "filter_alt_off",
                                            label: "清除篩選",
                                            onClick: unref(resetAllFilters),
                                            disable: !unref(isAnyFilterActive)
                                          }, null, 8, ["onClick", "disable"])
                                        ])
                                      ], 512), [
                                        [vShow, unref(showFilters)]
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_card_section, null, {
                                default: withCtx(() => [
                                  unref(selectedCategory) === "包班制" ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "q-mb-md"
                                  }, [
                                    createVNode("div", { class: "text-subtitle1 q-mb-sm" }, "選擇班次"),
                                    createVNode("div", { class: "row q-col-gutter-md" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(shiftTypeItems), (item) => {
                                        return openBlock(), createBlock("div", {
                                          class: "col-12 col-sm-6",
                                          key: item.code
                                        }, [
                                          createVNode(_component_q_card, {
                                            class: {
                                              "shift-card": true,
                                              "shift-card-selected": unref(isSelected)(item)
                                            },
                                            clickable: "",
                                            onClick: ($event) => unref(selectShiftType)(item)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_card_section, { class: "q-py-sm" }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "row items-center" }, [
                                                    createVNode("div", { class: "col-auto" }, [
                                                      createVNode(_component_q_icon, {
                                                        name: item.icon,
                                                        color: unref(getItemColor)(item),
                                                        size: "md"
                                                      }, null, 8, ["name", "color"])
                                                    ]),
                                                    createVNode("div", { class: "col q-ml-sm" }, [
                                                      createVNode("div", { class: "text-subtitle2" }, toDisplayString(item.name), 1),
                                                      createVNode("div", { class: "text-caption" }, [
                                                        createVNode(_component_q_icon, {
                                                          name: "paid",
                                                          size: "xs",
                                                          color: "primary",
                                                          class: "q-mr-xs"
                                                        }),
                                                        createVNode("span", null, toDisplayString(unref(formatCurrency)(item.price)) + " 元/班", 1)
                                                      ])
                                                    ]),
                                                    createVNode("div", { class: "col-auto" }, [
                                                      createVNode(_component_q_radio, {
                                                        modelValue: unref(selectedShiftType),
                                                        "onUpdate:modelValue": ($event) => isRef(selectedShiftType) ? selectedShiftType.value = $event : null,
                                                        val: item.code,
                                                        color: "primary"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "val"])
                                                    ])
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1032, ["class", "onClick"])
                                        ]);
                                      }), 128))
                                    ])
                                  ])) : createCommentVNode("", true),
                                  createVNode("div", { class: "text-subtitle1 q-mb-sm" }, toDisplayString(unref(selectedCategory) === "包班制" ? "選擇附加服務" : "選擇服務項目"), 1),
                                  createVNode(_component_q_list, {
                                    bordered: "",
                                    separator: "",
                                    class: "rounded-borders"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(TransitionGroup, {
                                        name: "list",
                                        tag: "div"
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredItems), (item) => {
                                            return withDirectives((openBlock(), createBlock(_component_q_item, {
                                              key: item.code,
                                              clickable: !(unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)),
                                              onClick: ($event) => unref(toggleItem)(item),
                                              class: [{
                                                "selected-item": unref(isSelected)(item),
                                                "mandatory-item": item.code === "HR01",
                                                "disabled-item": unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item)
                                              }, "service-item q-pa-md"]
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_section, { avatar: "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_icon, {
                                                      name: item.icon,
                                                      color: unref(getItemColor)(item),
                                                      size: "md"
                                                    }, null, 8, ["name", "color"])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_q_item_section, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_item_label, { class: "text-weight-bold text-body1" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.name) + " ", 1),
                                                        item.code === "HR01" ? (openBlock(), createBlock(_component_q_badge, {
                                                          key: 0,
                                                          color: "positive",
                                                          class: "q-ml-sm"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(" 必選 ")
                                                          ]),
                                                          _: 1
                                                        })) : createCommentVNode("", true)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_q_item_label, {
                                                      caption: "",
                                                      class: "q-mt-sm"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "row items-center" }, [
                                                          createVNode(_component_q_icon, {
                                                            name: "paid",
                                                            size: "xs",
                                                            color: "primary",
                                                            class: "q-mr-xs"
                                                          }),
                                                          createVNode("span", null, "金額：" + toDisplayString(item.price) + " 元", 1)
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_q_item_section, { side: "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_checkbox, {
                                                      onClick: withModifiers(($event) => unref(toggleItem)(item), ["stop"]),
                                                      modelValue: unref(selectedItems),
                                                      "onUpdate:modelValue": ($event) => isRef(selectedItems) ? selectedItems.value = $event : null,
                                                      val: item,
                                                      color: "primary",
                                                      disable: item.code === "HR01" && !unref(isSelected)(item) || unref(selectedCategory) === "鐘點制" && !unref(isSelected)(item) && unref(wouldExceedLimit)(item),
                                                      "aria-label": `選擇 ${item.name}`
                                                    }, null, 8, ["onClick", "modelValue", "onUpdate:modelValue", "val", "disable", "aria-label"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1032, ["clickable", "onClick", "class"])), [
                                              [_directive_ripple],
                                              [
                                                vShow,
                                                !(unref(selectedCategory) === "鐘點制" && item.subCategory === "時段加價")
                                              ]
                                            ]);
                                          }), 128))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "col-12 col-md-4" }, [
                          createVNode(_component_q_card, {
                            class: "summary-card",
                            flat: "",
                            bordered: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_card_section, null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-h6 text-primary" }, [
                                    createVNode(_component_q_icon, { name: "summarize" }),
                                    createTextVNode(" 費用統計 ")
                                  ]),
                                  unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "q-mt-md"
                                  }, [
                                    createVNode("div", { class: "row items-center justify-between" }, [
                                      createVNode("div", { class: "text-subtitle2" }, "服務時間設定"),
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        dense: "",
                                        round: "",
                                        icon: unref(showCalculator) ? "expand_less" : "expand_more",
                                        onClick: ($event) => showCalculator.value = !unref(showCalculator)
                                      }, null, 8, ["icon", "onClick"])
                                    ]),
                                    createVNode(_component_q_slide_transition, null, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                          createVNode("div", { class: "q-mb-sm" }, [
                                            createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "天數選擇"),
                                            createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                              (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3, 5, 7], (days) => {
                                                return createVNode("div", {
                                                  class: "col-2",
                                                  key: days
                                                }, [
                                                  createVNode(_component_q_btn, {
                                                    color: unref(dayCount) === days ? "secondary" : "white",
                                                    "text-color": unref(dayCount) === days ? "white" : "secondary",
                                                    label: `${days}天`,
                                                    size: "sm",
                                                    onClick: ($event) => dayCount.value = days,
                                                    unelevated: unref(dayCount) === days,
                                                    flat: unref(dayCount) !== days,
                                                    class: "q-px-xs day-btn full-width",
                                                    style: { "border": "dayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                  }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                ]);
                                              }), 64))
                                            ]),
                                            createVNode(_component_q_input, {
                                              modelValue: unref(dayCount),
                                              "onUpdate:modelValue": ($event) => isRef(dayCount) ? dayCount.value = $event : null,
                                              modelModifiers: { number: true },
                                              type: "number",
                                              label: "自定義天數",
                                              outlined: "",
                                              dense: "",
                                              min: "1",
                                              class: "q-mt-sm",
                                              rules: [(val) => val >= 1 || "請輸入有效天數"]
                                            }, {
                                              prepend: withCtx(() => [
                                                createVNode(_component_q_icon, {
                                                  name: "event",
                                                  color: "secondary"
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                          ]),
                                          createVNode("div", { class: "q-mb-sm" }, [
                                            createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "每日服務時數"),
                                            createVNode("div", { class: "row justify-between q-col-gutter-xs" }, [
                                              (openBlock(), createBlock(Fragment, null, renderList([4, 8, 10, 12, 24], (hours) => {
                                                return createVNode("div", {
                                                  class: "col-2",
                                                  key: hours
                                                }, [
                                                  createVNode(_component_q_btn, {
                                                    color: unref(hourCount) === hours ? "primary" : "white",
                                                    "text-color": unref(hourCount) === hours ? "white" : "primary",
                                                    label: `${hours}時`,
                                                    size: "sm",
                                                    onClick: ($event) => hourCount.value = hours,
                                                    unelevated: unref(hourCount) === hours,
                                                    flat: unref(hourCount) !== hours,
                                                    class: "q-px-xs hour-btn full-width",
                                                    style: { "border": "hourCount !== hours ? '1px solid #1976d2' : 'none'" }
                                                  }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                ]);
                                              }), 64))
                                            ]),
                                            createVNode(_component_q_input, {
                                              modelValue: unref(hourCount),
                                              "onUpdate:modelValue": ($event) => isRef(hourCount) ? hourCount.value = $event : null,
                                              modelModifiers: { number: true },
                                              type: "number",
                                              label: "自定義小時數",
                                              outlined: "",
                                              dense: "",
                                              min: "1",
                                              class: "q-mt-sm",
                                              rules: [(val) => val >= 1 || "請輸入有效小時數"]
                                            }, {
                                              prepend: withCtx(() => [
                                                createVNode(_component_q_icon, {
                                                  name: "schedule",
                                                  color: "primary"
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                          ]),
                                          createVNode("div", { class: "q-mt-md" }, [
                                            createVNode("div", { class: "row items-center justify-between" }, [
                                              createVNode("div", { class: "text-subtitle2" }, "加價項目"),
                                              createVNode(_component_q_btn, {
                                                flat: "",
                                                dense: "",
                                                round: "",
                                                icon: unref(showAdditionalItems) ? "expand_less" : "expand_more",
                                                onClick: ($event) => showAdditionalItems.value = !unref(showAdditionalItems)
                                              }, null, 8, ["icon", "onClick"])
                                            ]),
                                            createVNode(_component_q_slide_transition, null, {
                                              default: withCtx(() => [
                                                withDirectives(createVNode("div", { class: "row q-col-gutter-sm q-mt-sm" }, [
                                                  createVNode("div", { class: "col-12" }, [
                                                    createVNode("div", { class: "row items-center" }, [
                                                      createVNode("div", { class: "col" }, [
                                                        createVNode(_component_q_toggle, {
                                                          modelValue: unref(isNightShift),
                                                          "onUpdate:modelValue": [($event) => isRef(isNightShift) ? isNightShift.value = $event : null, ($event) => unref(toggleAdditionalService)("HR09")],
                                                          label: "夜間時段 (22:00-08:00)",
                                                          color: "blue-grey"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                      ]),
                                                      createVNode("div", { class: "col-auto text-blue-grey" }, [
                                                        createVNode(_component_q_badge, {
                                                          color: "blue-grey",
                                                          "text-color": "white"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(unref(formatCurrency)(20)) + " 元 ", 1)
                                                          ]),
                                                          _: 1
                                                        })
                                                      ])
                                                    ])
                                                  ]),
                                                  createVNode("div", { class: "col-12" }, [
                                                    createVNode("div", { class: "row items-center" }, [
                                                      createVNode("div", { class: "col" }, [
                                                        createVNode(_component_q_toggle, {
                                                          modelValue: unref(isUrgent),
                                                          "onUpdate:modelValue": [($event) => isRef(isUrgent) ? isUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR10")],
                                                          label: "加價急徵",
                                                          color: "amber"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                      ]),
                                                      createVNode("div", { class: "col-auto text-amber" }, [
                                                        createVNode(_component_q_badge, {
                                                          color: "amber",
                                                          "text-color": "white"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                          ]),
                                                          _: 1
                                                        })
                                                      ])
                                                    ])
                                                  ]),
                                                  createVNode("div", { class: "col-12" }, [
                                                    createVNode("div", { class: "row items-center" }, [
                                                      createVNode("div", { class: "col" }, [
                                                        createVNode(_component_q_toggle, {
                                                          modelValue: unref(isDoubleUrgent),
                                                          "onUpdate:modelValue": [($event) => isRef(isDoubleUrgent) ? isDoubleUrgent.value = $event : null, ($event) => unref(toggleAdditionalService)("HR11")],
                                                          label: "二次加價急徵",
                                                          color: "orange"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                      ]),
                                                      createVNode("div", { class: "col-auto text-orange" }, [
                                                        createVNode(_component_q_badge, {
                                                          color: "orange",
                                                          "text-color": "white"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(unref(formatCurrency)(30)) + " 元 ", 1)
                                                          ]),
                                                          _: 1
                                                        })
                                                      ])
                                                    ])
                                                  ])
                                                ], 512), [
                                                  [vShow, unref(showAdditionalItems)]
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                            createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(hourlyTotalWithTime))) + " 元 ", 1),
                                            createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                              unref(selectedHourlyItems).reduce(
                                                (sum, item) => item.subCategory === "時段加價" ? sum : sum + item.price,
                                                0
                                              )
                                            )) + " 元 x " + toDisplayString(unref(hourCount)) + " 時 x " + toDisplayString(unref(dayCount)) + " 天 + 加價項目 " + toDisplayString(unref(formatCurrency)(
                                              unref(selectedHourlyItems).reduce(
                                                (sum, item) => item.subCategory === "時段加價" ? sum + item.price : sum,
                                                0
                                              ) * unref(dayCount)
                                            )) + " 元) ", 1)
                                          ])
                                        ], 512), [
                                          [vShow, unref(showCalculator)]
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ])) : createCommentVNode("", true),
                                  unref(selectedCategory) === "包班制" ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "q-mt-md"
                                  }, [
                                    createVNode("div", { class: "row items-center justify-between" }, [
                                      createVNode("div", { class: "text-subtitle2" }, "包班時間設定"),
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        dense: "",
                                        round: "",
                                        icon: unref(showShiftCalculator) ? "expand_less" : "expand_more",
                                        onClick: ($event) => showShiftCalculator.value = !unref(showShiftCalculator)
                                      }, null, 8, ["icon", "onClick"])
                                    ]),
                                    createVNode(_component_q_slide_transition, null, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode("div", { class: "q-mt-sm" }, [
                                          createVNode("div", { class: "q-mb-sm" }, [
                                            createVNode("div", { class: "text-subtitle2 q-mb-xs" }, "包班天數"),
                                            createVNode("div", { class: "row q-col-gutter-xs" }, [
                                              (openBlock(), createBlock(Fragment, null, renderList([1, 3, 5, 7, 14], (days) => {
                                                return createVNode("div", {
                                                  class: "col-auto",
                                                  key: days
                                                }, [
                                                  createVNode(_component_q_btn, {
                                                    color: unref(shiftDayCount) === days ? "secondary" : "white",
                                                    "text-color": unref(shiftDayCount) === days ? "white" : "secondary",
                                                    label: `${days}天`,
                                                    size: "sm",
                                                    onClick: ($event) => shiftDayCount.value = days,
                                                    unelevated: unref(shiftDayCount) === days,
                                                    flat: unref(shiftDayCount) !== days,
                                                    class: "q-px-sm day-btn",
                                                    style: { "border": "shiftDayCount !== days ? '1px solid #26a69a' : 'none'" }
                                                  }, null, 8, ["color", "text-color", "label", "onClick", "unelevated", "flat"])
                                                ]);
                                              }), 64))
                                            ]),
                                            createVNode(_component_q_input, {
                                              modelValue: unref(shiftDayCount),
                                              "onUpdate:modelValue": ($event) => isRef(shiftDayCount) ? shiftDayCount.value = $event : null,
                                              modelModifiers: { number: true },
                                              type: "number",
                                              label: "自定義天數",
                                              outlined: "",
                                              dense: "",
                                              min: "1",
                                              class: "q-mt-sm",
                                              rules: [(val) => val >= 1 || "請輸入有效天數"]
                                            }, {
                                              prepend: withCtx(() => [
                                                createVNode(_component_q_icon, {
                                                  name: "event",
                                                  color: "secondary"
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                          ]),
                                          createVNode("div", { class: "text-subtitle1 q-mt-sm text-primary text-center" }, [
                                            createTextVNode(" 預計費用：" + toDisplayString(unref(formatCurrency)(unref(shiftTotalWithDays))) + " 元 ", 1),
                                            createVNode("div", { class: "text-caption text-grey text-center" }, " (服務項目 " + toDisplayString(unref(formatCurrency)(
                                              unref(selectedShiftItems).reduce(
                                                (sum, item) => sum + item.price,
                                                0
                                              ) + (unref(selectedShiftType) === "SH01" ? 3e3 : 5500)
                                            )) + " 元 x " + toDisplayString(unref(shiftDayCount)) + " 天) ", 1)
                                          ])
                                        ], 512), [
                                          [vShow, unref(showShiftCalculator)]
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_card_section, null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "chart-container" }, [
                                    unref(chartData).labels.length > 0 ? (openBlock(), createBlock(unref(Pie), {
                                      key: 0,
                                      data: unref(chartData),
                                      options: unref(chartOptions),
                                      class: "pie-chart"
                                    }, null, 8, ["data", "options"])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "text-center text-grey q-pa-md"
                                    }, " 尚未選擇任何服務項目 "))
                                  ])
                                ]),
                                _: 1
                              }),
                              unref(selectedItems).length > 0 ? (openBlock(), createBlock(_component_q_card_section, { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_list, { dense: "" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedItems), (item) => {
                                        return openBlock(), createBlock(_component_q_item, {
                                          key: `selected-${item.code}`
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_q_item_section, { side: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(formatCurrency)(item.price)) + " 元 ", 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128)),
                                      createVNode(_component_q_separator, { class: "q-my-sm" }),
                                      createVNode(_component_q_item, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "text-weight-bold" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("服務項目總金額")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("div", { class: "text-caption text-grey" }, " 已選 " + toDisplayString(unref(selectedItems).length) + " 項服務 ", 1)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, { side: "" }, {
                                            default: withCtx(() => [
                                              createVNode("span", { class: "text-weight-bold text-primary" }, toDisplayString(unref(formatCurrency)(
                                                unref(selectedItems).reduce(
                                                  (sum, item) => sum + item.price,
                                                  0
                                                )
                                              )) + " 元", 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_separator, { class: "q-my-sm" }),
                                      createVNode(_component_q_item, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "text-weight-bold text-h6" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("總計金額")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, { side: "" }, {
                                            default: withCtx(() => [
                                              createVNode("span", { class: "text-weight-bold text-h6 text-primary" }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))) + " 元", 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "row items-center" }, [
                                                createVNode(_component_q_icon, {
                                                  name: "volunteer_activism",
                                                  color: "pink-6",
                                                  class: "q-mr-sm"
                                                }),
                                                createVNode("span", null, "小費金額")
                                              ])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, { side: "" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "row items-center" }, [
                                                createVNode(_component_q_btn, {
                                                  round: "",
                                                  flat: "",
                                                  dense: "",
                                                  icon: "remove",
                                                  onClick: ($event) => tipAmount.value = Math.max(0, unref(tipAmount) - 50),
                                                  color: "grey",
                                                  class: "q-mr-xs"
                                                }, null, 8, ["onClick"]),
                                                createVNode(_component_q_input, {
                                                  modelValue: unref(tipAmount),
                                                  "onUpdate:modelValue": ($event) => isRef(tipAmount) ? tipAmount.value = $event : null,
                                                  modelModifiers: { number: true },
                                                  type: "number",
                                                  dense: "",
                                                  outlined: "",
                                                  class: "tip-input-inline",
                                                  style: { "width": "100px" },
                                                  rules: [(val) => val >= 0 || "請輸入有效金額"]
                                                }, {
                                                  append: withCtx(() => [
                                                    createVNode("span", { class: "text-grey-8" }, "元")
                                                  ]),
                                                  _: 1
                                                }, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                                createVNode(_component_q_btn, {
                                                  round: "",
                                                  flat: "",
                                                  dense: "",
                                                  icon: "add",
                                                  onClick: ($event) => tipAmount.value += 50,
                                                  color: "pink-6",
                                                  class: "q-ml-xs"
                                                }, null, 8, ["onClick"])
                                              ])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_footer, {
                elevated: "",
                class: "footer-gradient text-white",
                style: { "min-height": "64px" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_toolbar, { style: { "height": "5rem" } }, {
                    default: withCtx(() => [
                      createVNode(_component_q_toolbar_title, null, {
                        default: withCtx(() => [
                          createVNode("div", {
                            class: "row items-center",
                            style: { "width": "100%" }
                          }, [
                            createVNode("div", {
                              class: "col-grow",
                              style: { "white-space": "nowrap" }
                            }, [
                              createVNode("div", {
                                class: "column",
                                style: { "line-height": "1.5" }
                              }, [
                                createVNode("div", { class: "row items-center" }, [
                                  createVNode("span", { class: "text-subtitle1" }, "總費用："),
                                  createVNode("span", {
                                    ref_key: "totalCostElement",
                                    ref: totalCostElement,
                                    class: "text-h5 cost-display"
                                  }, toDisplayString(unref(formatCurrency)(unref(totalCost) + unref(tipAmount))), 513),
                                  unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-subtitle1",
                                    style: { "margin-left": "8px" }
                                  }, " (" + toDisplayString(unref(hourCount) * unref(dayCount)) + " 小時) ", 1)) : createCommentVNode("", true),
                                  createVNode("span", { class: "text-subtitle1" }, "元"),
                                  unref(tipAmount) > 0 ? (openBlock(), createBlock(_component_q_badge, {
                                    key: 1,
                                    color: "pink-6",
                                    class: "q-ml-sm",
                                    style: { "padding": "4px 8px" }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 含小費 " + toDisplayString(unref(formatCurrency)(unref(tipAmount))) + " 元 ", 1)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ]),
                                unref(selectedCategory) === "鐘點制" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "row items-center q-mt-xs"
                                }, [
                                  createVNode("span", { class: "text-caption text-grey-7" }, "每小時上限500元")
                                ])) : createCommentVNode("", true)
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_dialog, {
                modelValue: unref(showHelp),
                "onUpdate:modelValue": ($event) => isRef(showHelp) ? showHelp.value = $event : null
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card, { style: { "width": "700px", "max-width": "80vw" } }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, { class: "row items-center bg-primary text-white" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6" }, "使用說明"),
                          createVNode(_component_q_space),
                          withDirectives(createVNode(_component_q_btn, {
                            icon: "close",
                            flat: "",
                            round: "",
                            dense: ""
                          }, null, 512), [
                            [_directive_close_popup]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("p", null, [
                            createVNode("b", null, "鐘點制"),
                            createTextVNode("：按小時計費，基本照護為必選項目，可根據需求選擇附加服務。 ")
                          ]),
                          createVNode("p", null, [
                            createVNode("b", null, "包班制"),
                            createTextVNode("：按班次計費，選擇12小時或24小時班次，可根據需求選擇附加服務。 ")
                          ]),
                          createVNode("p", null, "點擊服務項目或勾選核取方塊可選擇/取消選擇服務。")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/booking/calculator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const calculator = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8eb201ff"]]);

export { calculator as default };
//# sourceMappingURL=calculator-8oNAkVgO.mjs.map
