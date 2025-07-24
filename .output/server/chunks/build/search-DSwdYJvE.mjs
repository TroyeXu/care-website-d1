import { _ as _export_sfc, u as usePageSeo, o as useQuasar, O as useNuxtApp, l as useRuntimeConfig, k as useHead, g as __nuxt_component_1$1, q as __nuxt_component_4, c as __nuxt_component_3, a as __nuxt_component_1, b as __nuxt_component_2, P as navigateTo } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, createVNode, withDirectives, vShow, unref, createBlock, toDisplayString, withKeys, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useApiService } from './useApiService-Bqe0bsFu.mjs';
import { C as CaregiverCard } from './CaregiverCard-QaBVwOTI.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_8 } from '../_/QTooltip.mjs';
import { _ as __nuxt_component_3$1 } from '../_/QSlideTransition.mjs';
import { _ as __nuxt_component_8$1 } from '../_/QSelect.mjs';
import { _ as __nuxt_component_9 } from '../_/QSpinnerDots.mjs';
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
import './useApiConfig-D0iRs2xG.mjs';
import '../_/QChip.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("搜尋看護師 - 護理服務平台", "快速搜尋專業看護師，找到最適合的照護服務");
    const $q = useQuasar();
    const apiService = useApiService();
    const searchQuery = ref("");
    const searchResults = ref([]);
    const recommendedCaregivers = ref([]);
    const isSearching = ref(false);
    const hasSearched = ref(false);
    const showAdvancedFilters = ref(false);
    const filters = ref({
      location: "",
      minRating: null,
      maxHourlyRate: null,
      maxShiftRate: null,
      skills: []
    });
    const locationOptions = [
      { label: "台北市", value: "台北" },
      { label: "新北市", value: "新北" },
      { label: "桃園市", value: "桃園" },
      { label: "台中市", value: "台中" },
      { label: "台南市", value: "台南" },
      { label: "高雄市", value: "高雄" }
    ];
    const skillOptions = [
      "專業照護",
      "失智症照護",
      "復健協助",
      "夜間照護",
      "用藥管理",
      "營養調理",
      "心理支持",
      "物理治療",
      "語言治療",
      "職能治療"
    ];
    const hasActiveFilters = computed(() => {
      return filters.value.location || filters.value.minRating !== null || filters.value.maxHourlyRate !== null || filters.value.maxShiftRate !== null || filters.value.skills.length > 0;
    });
    const performSearch = async () => {
      if (!searchQuery.value.trim() && !hasActiveFilters.value) {
        searchResults.value = [];
        hasSearched.value = false;
        return;
      }
      isSearching.value = true;
      hasSearched.value = true;
      try {
        let results = [];
        if (searchQuery.value.trim()) {
          results = await apiService.searchCaregivers(searchQuery.value.trim());
        } else {
          const allCaregivers = await apiService.getCaregivers(1, 100);
          results = Array.isArray(allCaregivers) ? allCaregivers : allCaregivers.data || [];
        }
        if (hasActiveFilters.value) {
          results = await apiService.filterCaregivers({
            ...filters.value,
            // 將 null 值過濾掉
            ...filters.value.minRating && { minRating: filters.value.minRating },
            ...filters.value.maxHourlyRate && { maxHourlyRate: filters.value.maxHourlyRate },
            ...filters.value.maxShiftRate && { maxShiftRate: filters.value.maxShiftRate }
          });
        }
        searchResults.value = Array.isArray(results) ? results : [];
        if (searchResults.value.length === 0) {
          $q.notify({
            type: "info",
            message: "沒有找到符合條件的看護師，請嘗試調整搜尋條件",
            timeout: 3e3
          });
        } else {
          $q.notify({
            type: "positive",
            message: `找到 ${searchResults.value.length} 位符合條件的看護師`,
            timeout: 2e3
          });
        }
      } catch (error) {
        console.error("搜尋失敗:", error);
        $q.notify({
          type: "negative",
          message: error.message || "搜尋失敗，請稍後再試",
          timeout: 3e3
        });
      } finally {
        isSearching.value = false;
      }
    };
    const applyFilters = () => {
      performSearch();
      showAdvancedFilters.value = false;
    };
    const clearFilters = () => {
      filters.value = {
        location: "",
        minRating: null,
        maxHourlyRate: null,
        maxShiftRate: null,
        skills: []
      };
      performSearch();
    };
    const clearSearch = () => {
      searchQuery.value = "";
      searchResults.value = [];
      hasSearched.value = false;
      clearFilters();
    };
    const { $route } = useNuxtApp();
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseUrl || "";
    useHead({
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchResultsPage",
            name: "搜尋看護師 - 護理服務平台",
            url: baseUrl + $route.fullPath,
            description: "快速搜尋專業看護師，找到最適合的照護服務",
            provider: {
              "@type": "Organization",
              name: "護理服務平台"
            }
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_input = __nuxt_component_4;
      const _component_q_btn = __nuxt_component_3;
      const _component_q_tooltip = __nuxt_component_8;
      const _component_q_slide_transition = __nuxt_component_3$1;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_select = __nuxt_component_8$1;
      const _component_q_spinner_dots = __nuxt_component_9;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row justify-between items-center q-mb-lg" data-v-5195190f${_scopeId}><div class="text-h5 text-primary" data-v-5195190f${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_icon, {
              name: "search",
              size: "md",
              class: "q-mr-sm"
            }, null, _parent2, _scopeId));
            _push2(` 搜尋看護師 </div><div class="text-caption text-grey-6" data-v-5195190f${_scopeId}> 共找到 ${ssrInterpolate(searchResults.value.length)} 位看護師 </div></div><div class="row q-gutter-md q-mb-lg" data-v-5195190f${_scopeId}><div class="col-12 col-md-8" data-v-5195190f${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_input, {
              modelValue: searchQuery.value,
              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
              label: "搜尋看護師 (姓名、技能、地區、證照)",
              outlined: "",
              dense: "",
              clearable: "",
              loading: isSearching.value,
              onInput: performSearch,
              onKeyup: performSearch,
              placeholder: "例如：林護理師、復健、台北、護理師證照"
            }, {
              prepend: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_icon, { name: "search" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_icon, { name: "search" })
                  ];
                }
              }),
              append: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_btn, {
                    flat: "",
                    dense: "",
                    icon: "tune",
                    onClick: ($event) => showAdvancedFilters.value = !showAdvancedFilters.value,
                    color: hasActiveFilters.value ? "primary" : "grey"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_tooltip, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`進階篩選`);
                            } else {
                              return [
                                createTextVNode("進階篩選")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_tooltip, null, {
                            default: withCtx(() => [
                              createTextVNode("進階篩選")
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
                    createVNode(_component_q_btn, {
                      flat: "",
                      dense: "",
                      icon: "tune",
                      onClick: ($event) => showAdvancedFilters.value = !showAdvancedFilters.value,
                      color: hasActiveFilters.value ? "primary" : "grey"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_tooltip, null, {
                          default: withCtx(() => [
                            createTextVNode("進階篩選")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onClick", "color"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="col-12 col-md-4" data-v-5195190f${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_btn, {
              color: "primary",
              icon: "search",
              loading: isSearching.value,
              onClick: performSearch,
              class: "full-width"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 搜尋 `);
                } else {
                  return [
                    createTextVNode(" 搜尋 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_q_slide_transition, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card, {
                    style: showAdvancedFilters.value ? null : { display: "none" },
                    flat: "",
                    bordered: "",
                    class: "q-mb-lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_card_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-h6 q-mb-md" data-v-5195190f${_scopeId4}>進階篩選</div><div class="row q-gutter-md" data-v-5195190f${_scopeId4}><div class="col-12 col-sm-6 col-md-3" data-v-5195190f${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_select, {
                                modelValue: filters.value.location,
                                "onUpdate:modelValue": ($event) => filters.value.location = $event,
                                options: locationOptions,
                                label: "服務地區",
                                outlined: "",
                                dense: "",
                                clearable: "",
                                "emit-value": "",
                                "map-options": ""
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="col-12 col-sm-6 col-md-3" data-v-5195190f${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_input, {
                                modelValue: filters.value.minRating,
                                "onUpdate:modelValue": ($event) => filters.value.minRating = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                label: "最低評分",
                                outlined: "",
                                dense: "",
                                min: "1",
                                max: "5",
                                step: "0.1"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="col-12 col-sm-6 col-md-3" data-v-5195190f${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_input, {
                                modelValue: filters.value.maxHourlyRate,
                                "onUpdate:modelValue": ($event) => filters.value.maxHourlyRate = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                label: "最高時薪",
                                outlined: "",
                                dense: "",
                                min: "0",
                                suffix: "元/小時"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="col-12 col-sm-6 col-md-3" data-v-5195190f${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_input, {
                                modelValue: filters.value.maxShiftRate,
                                "onUpdate:modelValue": ($event) => filters.value.maxShiftRate = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                label: "最高班薪",
                                outlined: "",
                                dense: "",
                                min: "0",
                                suffix: "元/班"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div></div><div class="row q-gutter-md q-mt-md" data-v-5195190f${_scopeId4}><div class="col-12" data-v-5195190f${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_select, {
                                modelValue: filters.value.skills,
                                "onUpdate:modelValue": ($event) => filters.value.skills = $event,
                                options: skillOptions,
                                label: "專業技能",
                                outlined: "",
                                dense: "",
                                multiple: "",
                                "use-chips": "",
                                clearable: ""
                              }, null, _parent5, _scopeId4));
                              _push5(`</div></div><div class="row q-gutter-md q-mt-md" data-v-5195190f${_scopeId4}><div class="col" data-v-5195190f${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_btn, {
                                flat: "",
                                color: "grey",
                                onClick: clearFilters
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 清除篩選 `);
                                  } else {
                                    return [
                                      createTextVNode(" 清除篩選 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="col-auto" data-v-5195190f${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_btn, {
                                color: "primary",
                                onClick: applyFilters
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 套用篩選 `);
                                  } else {
                                    return [
                                      createTextVNode(" 套用篩選 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-h6 q-mb-md" }, "進階篩選"),
                                createVNode("div", { class: "row q-gutter-md" }, [
                                  createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                    createVNode(_component_q_select, {
                                      modelValue: filters.value.location,
                                      "onUpdate:modelValue": ($event) => filters.value.location = $event,
                                      options: locationOptions,
                                      label: "服務地區",
                                      outlined: "",
                                      dense: "",
                                      clearable: "",
                                      "emit-value": "",
                                      "map-options": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                    createVNode(_component_q_input, {
                                      modelValue: filters.value.minRating,
                                      "onUpdate:modelValue": ($event) => filters.value.minRating = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      label: "最低評分",
                                      outlined: "",
                                      dense: "",
                                      min: "1",
                                      max: "5",
                                      step: "0.1"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                    createVNode(_component_q_input, {
                                      modelValue: filters.value.maxHourlyRate,
                                      "onUpdate:modelValue": ($event) => filters.value.maxHourlyRate = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      label: "最高時薪",
                                      outlined: "",
                                      dense: "",
                                      min: "0",
                                      suffix: "元/小時"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                    createVNode(_component_q_input, {
                                      modelValue: filters.value.maxShiftRate,
                                      "onUpdate:modelValue": ($event) => filters.value.maxShiftRate = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      label: "最高班薪",
                                      outlined: "",
                                      dense: "",
                                      min: "0",
                                      suffix: "元/班"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                                  createVNode("div", { class: "col-12" }, [
                                    createVNode(_component_q_select, {
                                      modelValue: filters.value.skills,
                                      "onUpdate:modelValue": ($event) => filters.value.skills = $event,
                                      options: skillOptions,
                                      label: "專業技能",
                                      outlined: "",
                                      dense: "",
                                      multiple: "",
                                      "use-chips": "",
                                      clearable: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(_component_q_btn, {
                                      flat: "",
                                      color: "grey",
                                      onClick: clearFilters
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 清除篩選 ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "col-auto" }, [
                                    createVNode(_component_q_btn, {
                                      color: "primary",
                                      onClick: applyFilters
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 套用篩選 ")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6 q-mb-md" }, "進階篩選"),
                              createVNode("div", { class: "row q-gutter-md" }, [
                                createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                  createVNode(_component_q_select, {
                                    modelValue: filters.value.location,
                                    "onUpdate:modelValue": ($event) => filters.value.location = $event,
                                    options: locationOptions,
                                    label: "服務地區",
                                    outlined: "",
                                    dense: "",
                                    clearable: "",
                                    "emit-value": "",
                                    "map-options": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                  createVNode(_component_q_input, {
                                    modelValue: filters.value.minRating,
                                    "onUpdate:modelValue": ($event) => filters.value.minRating = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    label: "最低評分",
                                    outlined: "",
                                    dense: "",
                                    min: "1",
                                    max: "5",
                                    step: "0.1"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                  createVNode(_component_q_input, {
                                    modelValue: filters.value.maxHourlyRate,
                                    "onUpdate:modelValue": ($event) => filters.value.maxHourlyRate = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    label: "最高時薪",
                                    outlined: "",
                                    dense: "",
                                    min: "0",
                                    suffix: "元/小時"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                  createVNode(_component_q_input, {
                                    modelValue: filters.value.maxShiftRate,
                                    "onUpdate:modelValue": ($event) => filters.value.maxShiftRate = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    label: "最高班薪",
                                    outlined: "",
                                    dense: "",
                                    min: "0",
                                    suffix: "元/班"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                                createVNode("div", { class: "col-12" }, [
                                  createVNode(_component_q_select, {
                                    modelValue: filters.value.skills,
                                    "onUpdate:modelValue": ($event) => filters.value.skills = $event,
                                    options: skillOptions,
                                    label: "專業技能",
                                    outlined: "",
                                    dense: "",
                                    multiple: "",
                                    "use-chips": "",
                                    clearable: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(_component_q_btn, {
                                    flat: "",
                                    color: "grey",
                                    onClick: clearFilters
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 清除篩選 ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "col-auto" }, [
                                  createVNode(_component_q_btn, {
                                    color: "primary",
                                    onClick: applyFilters
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 套用篩選 ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    withDirectives(createVNode(_component_q_card, {
                      flat: "",
                      bordered: "",
                      class: "q-mb-lg"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_card_section, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-h6 q-mb-md" }, "進階篩選"),
                            createVNode("div", { class: "row q-gutter-md" }, [
                              createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                createVNode(_component_q_select, {
                                  modelValue: filters.value.location,
                                  "onUpdate:modelValue": ($event) => filters.value.location = $event,
                                  options: locationOptions,
                                  label: "服務地區",
                                  outlined: "",
                                  dense: "",
                                  clearable: "",
                                  "emit-value": "",
                                  "map-options": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                createVNode(_component_q_input, {
                                  modelValue: filters.value.minRating,
                                  "onUpdate:modelValue": ($event) => filters.value.minRating = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  label: "最低評分",
                                  outlined: "",
                                  dense: "",
                                  min: "1",
                                  max: "5",
                                  step: "0.1"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                createVNode(_component_q_input, {
                                  modelValue: filters.value.maxHourlyRate,
                                  "onUpdate:modelValue": ($event) => filters.value.maxHourlyRate = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  label: "最高時薪",
                                  outlined: "",
                                  dense: "",
                                  min: "0",
                                  suffix: "元/小時"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                                createVNode(_component_q_input, {
                                  modelValue: filters.value.maxShiftRate,
                                  "onUpdate:modelValue": ($event) => filters.value.maxShiftRate = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  label: "最高班薪",
                                  outlined: "",
                                  dense: "",
                                  min: "0",
                                  suffix: "元/班"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                              createVNode("div", { class: "col-12" }, [
                                createVNode(_component_q_select, {
                                  modelValue: filters.value.skills,
                                  "onUpdate:modelValue": ($event) => filters.value.skills = $event,
                                  options: skillOptions,
                                  label: "專業技能",
                                  outlined: "",
                                  dense: "",
                                  multiple: "",
                                  "use-chips": "",
                                  clearable: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(_component_q_btn, {
                                  flat: "",
                                  color: "grey",
                                  onClick: clearFilters
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 清除篩選 ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "col-auto" }, [
                                createVNode(_component_q_btn, {
                                  color: "primary",
                                  onClick: applyFilters
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 套用篩選 ")
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
                    }, 512), [
                      [vShow, showAdvancedFilters.value]
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (isSearching.value) {
              _push2(`<div class="text-center q-pa-lg" data-v-5195190f${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_spinner_dots, {
                size: "50px",
                color: "primary"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-body2 q-mt-md" data-v-5195190f${_scopeId}>搜尋中...</div></div>`);
            } else if (searchResults.value.length === 0 && hasSearched.value) {
              _push2(`<div class="text-center q-pa-lg" data-v-5195190f${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_icon, {
                name: "search_off",
                size: "80px",
                color: "grey-5"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-h6 q-mt-md text-grey-7" data-v-5195190f${_scopeId}>沒有找到符合條件的看護師</div><div class="text-body2 text-grey-6 q-mt-sm" data-v-5195190f${_scopeId}> 請嘗試調整搜尋關鍵字或篩選條件 </div>`);
              _push2(ssrRenderComponent(_component_q_btn, {
                flat: "",
                color: "primary",
                onClick: clearSearch,
                class: "q-mt-md"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 清除搜尋 `);
                  } else {
                    return [
                      createTextVNode(" 清除搜尋 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (searchResults.value.length > 0) {
              _push2(`<div class="caregiver-list" data-v-5195190f${_scopeId}><!--[-->`);
              ssrRenderList(searchResults.value, (caregiver) => {
                _push2(ssrRenderComponent(CaregiverCard, {
                  key: caregiver.id,
                  caregiver,
                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/caregivers/${caregiver.id}`)
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div data-v-5195190f${_scopeId}><div class="text-h6 q-mb-md text-grey-7" data-v-5195190f${_scopeId}>推薦看護師</div><div class="caregiver-list" data-v-5195190f${_scopeId}><!--[-->`);
              ssrRenderList(recommendedCaregivers.value, (caregiver) => {
                _push2(ssrRenderComponent(CaregiverCard, {
                  key: caregiver.id,
                  caregiver,
                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/caregivers/${caregiver.id}`)
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            }
          } else {
            return [
              createVNode("div", { class: "row justify-between items-center q-mb-lg" }, [
                createVNode("div", { class: "text-h5 text-primary" }, [
                  createVNode(_component_q_icon, {
                    name: "search",
                    size: "md",
                    class: "q-mr-sm"
                  }),
                  createTextVNode(" 搜尋看護師 ")
                ]),
                createVNode("div", { class: "text-caption text-grey-6" }, " 共找到 " + toDisplayString(searchResults.value.length) + " 位看護師 ", 1)
              ]),
              createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                createVNode("div", { class: "col-12 col-md-8" }, [
                  createVNode(_component_q_input, {
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    label: "搜尋看護師 (姓名、技能、地區、證照)",
                    outlined: "",
                    dense: "",
                    clearable: "",
                    loading: isSearching.value,
                    onInput: performSearch,
                    onKeyup: withKeys(performSearch, ["enter"]),
                    placeholder: "例如：林護理師、復健、台北、護理師證照"
                  }, {
                    prepend: withCtx(() => [
                      createVNode(_component_q_icon, { name: "search" })
                    ]),
                    append: withCtx(() => [
                      createVNode(_component_q_btn, {
                        flat: "",
                        dense: "",
                        icon: "tune",
                        onClick: ($event) => showAdvancedFilters.value = !showAdvancedFilters.value,
                        color: hasActiveFilters.value ? "primary" : "grey"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_tooltip, null, {
                            default: withCtx(() => [
                              createTextVNode("進階篩選")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick", "color"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "loading"])
                ]),
                createVNode("div", { class: "col-12 col-md-4" }, [
                  createVNode(_component_q_btn, {
                    color: "primary",
                    icon: "search",
                    loading: isSearching.value,
                    onClick: performSearch,
                    class: "full-width"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 搜尋 ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ]),
              createVNode(_component_q_slide_transition, null, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_q_card, {
                    flat: "",
                    bordered: "",
                    class: "q-mb-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "進階篩選"),
                          createVNode("div", { class: "row q-gutter-md" }, [
                            createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                              createVNode(_component_q_select, {
                                modelValue: filters.value.location,
                                "onUpdate:modelValue": ($event) => filters.value.location = $event,
                                options: locationOptions,
                                label: "服務地區",
                                outlined: "",
                                dense: "",
                                clearable: "",
                                "emit-value": "",
                                "map-options": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                              createVNode(_component_q_input, {
                                modelValue: filters.value.minRating,
                                "onUpdate:modelValue": ($event) => filters.value.minRating = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                label: "最低評分",
                                outlined: "",
                                dense: "",
                                min: "1",
                                max: "5",
                                step: "0.1"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                              createVNode(_component_q_input, {
                                modelValue: filters.value.maxHourlyRate,
                                "onUpdate:modelValue": ($event) => filters.value.maxHourlyRate = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                label: "最高時薪",
                                outlined: "",
                                dense: "",
                                min: "0",
                                suffix: "元/小時"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                              createVNode(_component_q_input, {
                                modelValue: filters.value.maxShiftRate,
                                "onUpdate:modelValue": ($event) => filters.value.maxShiftRate = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                label: "最高班薪",
                                outlined: "",
                                dense: "",
                                min: "0",
                                suffix: "元/班"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode(_component_q_select, {
                                modelValue: filters.value.skills,
                                "onUpdate:modelValue": ($event) => filters.value.skills = $event,
                                options: skillOptions,
                                label: "專業技能",
                                outlined: "",
                                dense: "",
                                multiple: "",
                                "use-chips": "",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "grey",
                                onClick: clearFilters
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 清除篩選 ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "col-auto" }, [
                              createVNode(_component_q_btn, {
                                color: "primary",
                                onClick: applyFilters
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 套用篩選 ")
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
                  }, 512), [
                    [vShow, showAdvancedFilters.value]
                  ])
                ]),
                _: 1
              }),
              isSearching.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center q-pa-lg"
              }, [
                createVNode(_component_q_spinner_dots, {
                  size: "50px",
                  color: "primary"
                }),
                createVNode("div", { class: "text-body2 q-mt-md" }, "搜尋中...")
              ])) : searchResults.value.length === 0 && hasSearched.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center q-pa-lg"
              }, [
                createVNode(_component_q_icon, {
                  name: "search_off",
                  size: "80px",
                  color: "grey-5"
                }),
                createVNode("div", { class: "text-h6 q-mt-md text-grey-7" }, "沒有找到符合條件的看護師"),
                createVNode("div", { class: "text-body2 text-grey-6 q-mt-sm" }, " 請嘗試調整搜尋關鍵字或篩選條件 "),
                createVNode(_component_q_btn, {
                  flat: "",
                  color: "primary",
                  onClick: clearSearch,
                  class: "q-mt-md"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 清除搜尋 ")
                  ]),
                  _: 1
                })
              ])) : searchResults.value.length > 0 ? (openBlock(), createBlock("div", {
                key: 2,
                class: "caregiver-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(searchResults.value, (caregiver) => {
                  return openBlock(), createBlock(CaregiverCard, {
                    key: caregiver.id,
                    caregiver,
                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/caregivers/${caregiver.id}`)
                  }, null, 8, ["caregiver", "onClick"]);
                }), 128))
              ])) : (openBlock(), createBlock("div", { key: 3 }, [
                createVNode("div", { class: "text-h6 q-mb-md text-grey-7" }, "推薦看護師"),
                createVNode("div", { class: "caregiver-list" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(recommendedCaregivers.value, (caregiver) => {
                    return openBlock(), createBlock(CaregiverCard, {
                      key: caregiver.id,
                      caregiver,
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/caregivers/${caregiver.id}`)
                    }, null, 8, ["caregiver", "onClick"]);
                  }), 128))
                ])
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/caregivers/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const search = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5195190f"]]);

export { search as default };
//# sourceMappingURL=search-DSwdYJvE.mjs.map
