import { t as createComponent, M as useSpinnerProps, N as useSpinner, _ as _export_sfc, u as usePageSeo, o as useQuasar, p as useAuthStore, O as useNuxtApp, l as useRuntimeConfig, k as useHead, g as __nuxt_component_1$1, c as __nuxt_component_3, a as __nuxt_component_1, b as __nuxt_component_2, q as __nuxt_component_4, P as navigateTo, j as __nuxt_component_9$1 } from './server.mjs';
import { h, defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, createVNode, withDirectives, vShow, toDisplayString, unref, createBlock, createCommentVNode, openBlock, Fragment, renderList, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useApiService } from './useApiService-Bqe0bsFu.mjs';
import { C as CaregiverCard } from './CaregiverCard-QaBVwOTI.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_3$1 } from '../_/QSlideTransition.mjs';
import { _ as __nuxt_component_8 } from '../_/QSelect.mjs';
import { _ as __nuxt_component_9 } from '../_/QChip.mjs';
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

const innerHTML = '<circle cx="50" cy="50" r="44" fill="none" stroke-width="4" stroke-opacity=".5" stroke="currentColor"></circle><circle cx="8" cy="54" r="6" fill="currentColor" stroke-width="3" stroke="currentColor"><animateTransform attributeName="transform" type="rotate" from="0 50 48" to="360 50 52" dur="2s" repeatCount="indefinite"></animateTransform></circle>';

const __nuxt_component_8$1 = createComponent({
  name: 'QSpinnerOrbit',

  props: useSpinnerProps,

  setup (props) {
    const { cSize, classes } = useSpinner(props);
    return () => h('svg', {
      class: classes.value,
      width: cSize.value,
      height: cSize.value,
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'xMidYMid',
      xmlns: 'http://www.w3.org/2000/svg',
      innerHTML
    })
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "match",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("智能媒合 - 護理服務平台", "根據您的需求智能推薦最適合的看護師");
    const $q = useQuasar();
    const apiService = useApiService();
    const authStore = useAuthStore();
    const matchedCaregivers = ref([]);
    const isMatching = ref(false);
    const hasSearched = ref(false);
    const showPreferences = ref(false);
    const preferences = ref({
      location: "",
      maxHourlyRate: null,
      minRating: null,
      requiredSkills: []
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
    const hasPreferences = computed(() => {
      return preferences.value.location || preferences.value.maxHourlyRate !== null || preferences.value.minRating !== null || preferences.value.requiredSkills.length > 0;
    });
    const findMatches = async () => {
      isMatching.value = true;
      hasSearched.value = true;
      try {
        let candidates = [];
        if (hasPreferences.value) {
          candidates = await apiService.filterCaregivers({
            ...preferences.value,
            // 將 null 值過濾掉
            ...preferences.value.maxHourlyRate && { maxHourlyRate: preferences.value.maxHourlyRate },
            ...preferences.value.minRating && { minRating: preferences.value.minRating }
          });
        } else {
          const result = await apiService.getFeaturedCaregivers();
          candidates = Array.isArray(result) ? result : result.data || [];
        }
        const scoredCaregivers = candidates.map((caregiver) => ({
          ...caregiver,
          matchScore: calculateMatchScore(caregiver)
        }));
        matchedCaregivers.value = scoredCaregivers.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)).slice(0, 8);
        if (matchedCaregivers.value.length === 0) {
          $q.notify({
            type: "info",
            message: "沒有找到符合條件的看護師，請調整媒合條件",
            timeout: 3e3
          });
        } else {
          $q.notify({
            type: "positive",
            message: `媒合成功！找到 ${matchedCaregivers.value.length} 位推薦看護師`,
            timeout: 2e3
          });
        }
      } catch (error) {
        console.error("媒合失敗:", error);
        $q.notify({
          type: "negative",
          message: error.message || "媒合失敗，請稍後再試",
          timeout: 3e3
        });
      } finally {
        isMatching.value = false;
      }
    };
    const calculateMatchScore = (caregiver) => {
      let score = 0.5;
      score += caregiver.rating / 5 * 0.3;
      if (preferences.value.location && caregiver.location?.includes(preferences.value.location)) {
        score += 0.25;
      }
      if (preferences.value.requiredSkills.length > 0) {
        const matchedSkills = preferences.value.requiredSkills.filter(
          (skill) => caregiver.skills.toLowerCase().includes(skill.toLowerCase())
        );
        score += matchedSkills.length / preferences.value.requiredSkills.length * 0.25;
      }
      if (preferences.value.maxHourlyRate && caregiver.hourly_rate <= preferences.value.maxHourlyRate) {
        score += 0.2;
      }
      return Math.min(score, 1);
    };
    const getMatchReasons = (caregiver) => {
      const reasons = [];
      if (caregiver.rating >= 4.5) {
        reasons.push("高評分");
      }
      if (preferences.value.location && caregiver.location?.includes(preferences.value.location)) {
        reasons.push("地區匹配");
      }
      if (preferences.value.requiredSkills.length > 0) {
        const matchedSkills = preferences.value.requiredSkills.filter(
          (skill) => caregiver.skills.toLowerCase().includes(skill.toLowerCase())
        );
        if (matchedSkills.length > 0) {
          reasons.push(`具備${matchedSkills.length}項所需技能`);
        }
      }
      if (preferences.value.maxHourlyRate && caregiver.hourly_rate <= preferences.value.maxHourlyRate) {
        reasons.push("價格合理");
      }
      if (caregiver.experience.includes("專業")) {
        reasons.push("專業經驗");
      }
      return reasons.length > 0 ? reasons : ["推薦看護師"];
    };
    const getMatchScoreColor = (score) => {
      if (score >= 0.8) return "positive";
      if (score >= 0.6) return "warning";
      return "info";
    };
    const clearPreferences = () => {
      preferences.value = {
        location: "",
        maxHourlyRate: null,
        minRating: null,
        requiredSkills: []
      };
      matchedCaregivers.value = [];
      hasSearched.value = false;
    };
    const startBooking = (caregiver) => {
      if (!authStore.currentUser) {
        $q.notify({
          type: "warning",
          message: "請先登入才能進行預約",
          timeout: 3e3
        });
        navigateTo("/auth/login");
        return;
      }
      navigateTo({
        path: "/booking/create",
        query: { caregiverId: caregiver.id }
      });
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
            name: "智能媒合 - 護理服務平台",
            url: baseUrl + $route.fullPath,
            description: "根據您的需求智能推薦最適合的看護師",
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
      const _component_q_btn = __nuxt_component_3;
      const _component_q_slide_transition = __nuxt_component_3$1;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_select = __nuxt_component_8;
      const _component_q_input = __nuxt_component_4;
      const _component_q_spinner_orbit = __nuxt_component_8$1;
      const _component_q_chip = __nuxt_component_9;
      const _component_q_card_actions = __nuxt_component_9$1;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row justify-center" data-v-0a234703${_scopeId}><div class="col-12 col-lg-10" data-v-0a234703${_scopeId}><div class="row items-center justify-between q-mb-lg" data-v-0a234703${_scopeId}><div class="text-h5 text-primary" data-v-0a234703${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_icon, {
              name: "psychology",
              size: "md",
              class: "q-mr-sm"
            }, null, _parent2, _scopeId));
            _push2(` 智能媒合推薦 </div>`);
            _push2(ssrRenderComponent(_component_q_btn, {
              flat: "",
              icon: "tune",
              onClick: ($event) => showPreferences.value = !showPreferences.value,
              color: hasPreferences.value ? "primary" : "grey"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 偏好設定 `);
                } else {
                  return [
                    createTextVNode(" 偏好設定 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_q_slide_transition, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card, {
                    style: showPreferences.value ? null : { display: "none" },
                    flat: "",
                    bordered: "",
                    class: "q-mb-lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_card_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-h6 q-mb-md" data-v-0a234703${_scopeId4}>媒合偏好</div><div class="row q-gutter-md" data-v-0a234703${_scopeId4}><div class="col-12 col-sm-6 col-md-4" data-v-0a234703${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_select, {
                                modelValue: preferences.value.location,
                                "onUpdate:modelValue": ($event) => preferences.value.location = $event,
                                options: locationOptions,
                                label: "希望服務地區",
                                outlined: "",
                                dense: "",
                                clearable: "",
                                "emit-value": "",
                                "map-options": ""
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="col-12 col-sm-6 col-md-4" data-v-0a234703${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_input, {
                                modelValue: preferences.value.maxHourlyRate,
                                "onUpdate:modelValue": ($event) => preferences.value.maxHourlyRate = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                label: "最高時薪預算",
                                outlined: "",
                                dense: "",
                                min: "0",
                                suffix: "元/小時"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="col-12 col-sm-6 col-md-4" data-v-0a234703${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_input, {
                                modelValue: preferences.value.minRating,
                                "onUpdate:modelValue": ($event) => preferences.value.minRating = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                label: "最低評分要求",
                                outlined: "",
                                dense: "",
                                min: "1",
                                max: "5",
                                step: "0.1"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div></div><div class="row q-gutter-md q-mt-md" data-v-0a234703${_scopeId4}><div class="col-12" data-v-0a234703${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_select, {
                                modelValue: preferences.value.requiredSkills,
                                "onUpdate:modelValue": ($event) => preferences.value.requiredSkills = $event,
                                options: skillOptions,
                                label: "需要的專業技能",
                                outlined: "",
                                dense: "",
                                multiple: "",
                                "use-chips": "",
                                clearable: ""
                              }, null, _parent5, _scopeId4));
                              _push5(`</div></div><div class="row q-gutter-md q-mt-md" data-v-0a234703${_scopeId4}><div class="col" data-v-0a234703${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_btn, {
                                flat: "",
                                color: "grey",
                                onClick: clearPreferences
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 清除偏好 `);
                                  } else {
                                    return [
                                      createTextVNode(" 清除偏好 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="col-auto" data-v-0a234703${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_btn, {
                                color: "primary",
                                onClick: findMatches,
                                loading: isMatching.value
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 重新媒合 `);
                                  } else {
                                    return [
                                      createTextVNode(" 重新媒合 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-h6 q-mb-md" }, "媒合偏好"),
                                createVNode("div", { class: "row q-gutter-md" }, [
                                  createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                    createVNode(_component_q_select, {
                                      modelValue: preferences.value.location,
                                      "onUpdate:modelValue": ($event) => preferences.value.location = $event,
                                      options: locationOptions,
                                      label: "希望服務地區",
                                      outlined: "",
                                      dense: "",
                                      clearable: "",
                                      "emit-value": "",
                                      "map-options": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                    createVNode(_component_q_input, {
                                      modelValue: preferences.value.maxHourlyRate,
                                      "onUpdate:modelValue": ($event) => preferences.value.maxHourlyRate = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      label: "最高時薪預算",
                                      outlined: "",
                                      dense: "",
                                      min: "0",
                                      suffix: "元/小時"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                    createVNode(_component_q_input, {
                                      modelValue: preferences.value.minRating,
                                      "onUpdate:modelValue": ($event) => preferences.value.minRating = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      label: "最低評分要求",
                                      outlined: "",
                                      dense: "",
                                      min: "1",
                                      max: "5",
                                      step: "0.1"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                                  createVNode("div", { class: "col-12" }, [
                                    createVNode(_component_q_select, {
                                      modelValue: preferences.value.requiredSkills,
                                      "onUpdate:modelValue": ($event) => preferences.value.requiredSkills = $event,
                                      options: skillOptions,
                                      label: "需要的專業技能",
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
                                      onClick: clearPreferences
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 清除偏好 ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "col-auto" }, [
                                    createVNode(_component_q_btn, {
                                      color: "primary",
                                      onClick: findMatches,
                                      loading: isMatching.value
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 重新媒合 ")
                                      ]),
                                      _: 1
                                    }, 8, ["loading"])
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
                              createVNode("div", { class: "text-h6 q-mb-md" }, "媒合偏好"),
                              createVNode("div", { class: "row q-gutter-md" }, [
                                createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                  createVNode(_component_q_select, {
                                    modelValue: preferences.value.location,
                                    "onUpdate:modelValue": ($event) => preferences.value.location = $event,
                                    options: locationOptions,
                                    label: "希望服務地區",
                                    outlined: "",
                                    dense: "",
                                    clearable: "",
                                    "emit-value": "",
                                    "map-options": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                  createVNode(_component_q_input, {
                                    modelValue: preferences.value.maxHourlyRate,
                                    "onUpdate:modelValue": ($event) => preferences.value.maxHourlyRate = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    label: "最高時薪預算",
                                    outlined: "",
                                    dense: "",
                                    min: "0",
                                    suffix: "元/小時"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                  createVNode(_component_q_input, {
                                    modelValue: preferences.value.minRating,
                                    "onUpdate:modelValue": ($event) => preferences.value.minRating = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    label: "最低評分要求",
                                    outlined: "",
                                    dense: "",
                                    min: "1",
                                    max: "5",
                                    step: "0.1"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                                createVNode("div", { class: "col-12" }, [
                                  createVNode(_component_q_select, {
                                    modelValue: preferences.value.requiredSkills,
                                    "onUpdate:modelValue": ($event) => preferences.value.requiredSkills = $event,
                                    options: skillOptions,
                                    label: "需要的專業技能",
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
                                    onClick: clearPreferences
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 清除偏好 ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "col-auto" }, [
                                  createVNode(_component_q_btn, {
                                    color: "primary",
                                    onClick: findMatches,
                                    loading: isMatching.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 重新媒合 ")
                                    ]),
                                    _: 1
                                  }, 8, ["loading"])
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
                            createVNode("div", { class: "text-h6 q-mb-md" }, "媒合偏好"),
                            createVNode("div", { class: "row q-gutter-md" }, [
                              createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                createVNode(_component_q_select, {
                                  modelValue: preferences.value.location,
                                  "onUpdate:modelValue": ($event) => preferences.value.location = $event,
                                  options: locationOptions,
                                  label: "希望服務地區",
                                  outlined: "",
                                  dense: "",
                                  clearable: "",
                                  "emit-value": "",
                                  "map-options": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                createVNode(_component_q_input, {
                                  modelValue: preferences.value.maxHourlyRate,
                                  "onUpdate:modelValue": ($event) => preferences.value.maxHourlyRate = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  label: "最高時薪預算",
                                  outlined: "",
                                  dense: "",
                                  min: "0",
                                  suffix: "元/小時"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                createVNode(_component_q_input, {
                                  modelValue: preferences.value.minRating,
                                  "onUpdate:modelValue": ($event) => preferences.value.minRating = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  label: "最低評分要求",
                                  outlined: "",
                                  dense: "",
                                  min: "1",
                                  max: "5",
                                  step: "0.1"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                              createVNode("div", { class: "col-12" }, [
                                createVNode(_component_q_select, {
                                  modelValue: preferences.value.requiredSkills,
                                  "onUpdate:modelValue": ($event) => preferences.value.requiredSkills = $event,
                                  options: skillOptions,
                                  label: "需要的專業技能",
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
                                  onClick: clearPreferences
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 清除偏好 ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "col-auto" }, [
                                createVNode(_component_q_btn, {
                                  color: "primary",
                                  onClick: findMatches,
                                  loading: isMatching.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 重新媒合 ")
                                  ]),
                                  _: 1
                                }, 8, ["loading"])
                              ])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 512), [
                      [vShow, showPreferences.value]
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (isMatching.value) {
              _push2(`<div class="text-center q-pa-lg" data-v-0a234703${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_spinner_orbit, {
                size: "50px",
                color: "primary"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-body2 q-mt-md" data-v-0a234703${_scopeId}>智能媒合中...</div></div>`);
            } else if (matchedCaregivers.value.length === 0 && hasSearched.value) {
              _push2(`<div class="text-center q-pa-lg" data-v-0a234703${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_icon, {
                name: "search_off",
                size: "80px",
                color: "grey-5"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-h6 q-mt-md text-grey-7" data-v-0a234703${_scopeId}>沒有找到符合條件的看護師</div><div class="text-body2 text-grey-6 q-mt-sm" data-v-0a234703${_scopeId}> 請嘗試調整您的媒合偏好或擴大搜尋範圍 </div>`);
              _push2(ssrRenderComponent(_component_q_btn, {
                flat: "",
                color: "primary",
                onClick: clearPreferences,
                class: "q-mt-md"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 重設條件 `);
                  } else {
                    return [
                      createTextVNode(" 重設條件 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (matchedCaregivers.value.length > 0) {
              _push2(`<div data-v-0a234703${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                bordered: "",
                class: "q-mb-md"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h6 text-primary" data-v-0a234703${_scopeId3}> 找到 ${ssrInterpolate(matchedCaregivers.value.length)} 位符合條件的看護師 </div><div class="text-body2 text-grey-6" data-v-0a234703${_scopeId3}> 以下是根據您的需求精心篩選的推薦 </div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 text-primary" }, " 找到 " + toDisplayString(matchedCaregivers.value.length) + " 位符合條件的看護師 ", 1),
                            createVNode("div", { class: "text-body2 text-grey-6" }, " 以下是根據您的需求精心篩選的推薦 ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 text-primary" }, " 找到 " + toDisplayString(matchedCaregivers.value.length) + " 位符合條件的看護師 ", 1),
                          createVNode("div", { class: "text-body2 text-grey-6" }, " 以下是根據您的需求精心篩選的推薦 ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="caregiver-list" data-v-0a234703${_scopeId}><!--[-->`);
              ssrRenderList(matchedCaregivers.value, (caregiver, index) => {
                _push2(`<div class="match-card" data-v-0a234703${_scopeId}>`);
                _push2(ssrRenderComponent(_component_q_card, {
                  flat: "",
                  bordered: "",
                  class: "full-height cursor-pointer",
                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/caregivers/${caregiver.id}`)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_q_card_section, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="row items-center justify-between q-mb-sm" data-v-0a234703${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_q_chip, {
                              color: getMatchScoreColor(caregiver.matchScore || 0),
                              "text-color": "white",
                              size: "sm"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(` 媒合度 ${ssrInterpolate(Math.round((caregiver.matchScore || 0) * 100))}% `);
                                } else {
                                  return [
                                    createTextVNode(" 媒合度 " + toDisplayString(Math.round((caregiver.matchScore || 0) * 100)) + "% ", 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            if (index < 3) {
                              _push4(ssrRenderComponent(_component_q_chip, {
                                color: "orange",
                                "text-color": "white",
                                size: "sm"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(` 第 ${ssrInterpolate(index + 1)} 推薦 `);
                                  } else {
                                    return [
                                      createTextVNode(" 第 " + toDisplayString(index + 1) + " 推薦 ", 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div>`);
                            _push4(ssrRenderComponent(CaregiverCard, { caregiver }, null, _parent4, _scopeId3));
                            _push4(`<div class="q-mt-md" data-v-0a234703${_scopeId3}><div class="text-caption text-grey-6 q-mb-xs" data-v-0a234703${_scopeId3}>推薦原因：</div><div class="text-body2" data-v-0a234703${_scopeId3}><!--[-->`);
                            ssrRenderList(getMatchReasons(caregiver), (reason) => {
                              _push4(ssrRenderComponent(_component_q_chip, {
                                key: reason,
                                size: "sm",
                                outline: "",
                                color: "primary",
                                class: "q-mr-xs q-mb-xs"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`${ssrInterpolate(reason)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(reason), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            });
                            _push4(`<!--]--></div></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "row items-center justify-between q-mb-sm" }, [
                                createVNode(_component_q_chip, {
                                  color: getMatchScoreColor(caregiver.matchScore || 0),
                                  "text-color": "white",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 媒合度 " + toDisplayString(Math.round((caregiver.matchScore || 0) * 100)) + "% ", 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color"]),
                                index < 3 ? (openBlock(), createBlock(_component_q_chip, {
                                  key: 0,
                                  color: "orange",
                                  "text-color": "white",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 第 " + toDisplayString(index + 1) + " 推薦 ", 1)
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ]),
                              createVNode(CaregiverCard, { caregiver }, null, 8, ["caregiver"]),
                              createVNode("div", { class: "q-mt-md" }, [
                                createVNode("div", { class: "text-caption text-grey-6 q-mb-xs" }, "推薦原因："),
                                createVNode("div", { class: "text-body2" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(getMatchReasons(caregiver), (reason) => {
                                    return openBlock(), createBlock(_component_q_chip, {
                                      key: reason,
                                      size: "sm",
                                      outline: "",
                                      color: "primary",
                                      class: "q-mr-xs q-mb-xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(reason), 1)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_q_card_actions, { align: "right" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_q_btn, {
                              flat: "",
                              color: "primary",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/caregivers/${caregiver.id}`)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(` 查看詳情 `);
                                } else {
                                  return [
                                    createTextVNode(" 查看詳情 ")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_q_btn, {
                              color: "primary",
                              onClick: ($event) => startBooking(caregiver)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(` 立即預約 `);
                                } else {
                                  return [
                                    createTextVNode(" 立即預約 ")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "primary",
                                onClick: withModifiers(($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/caregivers/${caregiver.id}`), ["stop"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 查看詳情 ")
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              createVNode(_component_q_btn, {
                                color: "primary",
                                onClick: withModifiers(($event) => startBooking(caregiver), ["stop"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 立即預約 ")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_q_card_section, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "row items-center justify-between q-mb-sm" }, [
                              createVNode(_component_q_chip, {
                                color: getMatchScoreColor(caregiver.matchScore || 0),
                                "text-color": "white",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 媒合度 " + toDisplayString(Math.round((caregiver.matchScore || 0) * 100)) + "% ", 1)
                                ]),
                                _: 2
                              }, 1032, ["color"]),
                              index < 3 ? (openBlock(), createBlock(_component_q_chip, {
                                key: 0,
                                color: "orange",
                                "text-color": "white",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 第 " + toDisplayString(index + 1) + " 推薦 ", 1)
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ]),
                            createVNode(CaregiverCard, { caregiver }, null, 8, ["caregiver"]),
                            createVNode("div", { class: "q-mt-md" }, [
                              createVNode("div", { class: "text-caption text-grey-6 q-mb-xs" }, "推薦原因："),
                              createVNode("div", { class: "text-body2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(getMatchReasons(caregiver), (reason) => {
                                  return openBlock(), createBlock(_component_q_chip, {
                                    key: reason,
                                    size: "sm",
                                    outline: "",
                                    color: "primary",
                                    class: "q-mr-xs q-mb-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(reason), 1)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_q_card_actions, { align: "right" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "primary",
                              onClick: withModifiers(($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/caregivers/${caregiver.id}`), ["stop"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 查看詳情 ")
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            createVNode(_component_q_btn, {
                              color: "primary",
                              onClick: withModifiers(($event) => startBooking(caregiver), ["stop"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 立即預約 ")
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<div data-v-0a234703${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h6 q-mb-md" data-v-0a234703${_scopeId3}>歡迎使用智能媒合服務</div><div class="text-body2 text-grey-6 q-mb-md" data-v-0a234703${_scopeId3}> 設定您的偏好條件，我們將為您推薦最適合的看護師 </div>`);
                          _push4(ssrRenderComponent(_component_q_btn, {
                            color: "primary",
                            icon: "psychology",
                            onClick: ($event) => showPreferences.value = true
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` 開始媒合 `);
                              } else {
                                return [
                                  createTextVNode(" 開始媒合 ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 q-mb-md" }, "歡迎使用智能媒合服務"),
                            createVNode("div", { class: "text-body2 text-grey-6 q-mb-md" }, " 設定您的偏好條件，我們將為您推薦最適合的看護師 "),
                            createVNode(_component_q_btn, {
                              color: "primary",
                              icon: "psychology",
                              onClick: ($event) => showPreferences.value = true
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 開始媒合 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "歡迎使用智能媒合服務"),
                          createVNode("div", { class: "text-body2 text-grey-6 q-mb-md" }, " 設定您的偏好條件，我們將為您推薦最適合的看護師 "),
                          createVNode(_component_q_btn, {
                            color: "primary",
                            icon: "psychology",
                            onClick: ($event) => showPreferences.value = true
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 開始媒合 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "row justify-center" }, [
                createVNode("div", { class: "col-12 col-lg-10" }, [
                  createVNode("div", { class: "row items-center justify-between q-mb-lg" }, [
                    createVNode("div", { class: "text-h5 text-primary" }, [
                      createVNode(_component_q_icon, {
                        name: "psychology",
                        size: "md",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" 智能媒合推薦 ")
                    ]),
                    createVNode(_component_q_btn, {
                      flat: "",
                      icon: "tune",
                      onClick: ($event) => showPreferences.value = !showPreferences.value,
                      color: hasPreferences.value ? "primary" : "grey"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 偏好設定 ")
                      ]),
                      _: 1
                    }, 8, ["onClick", "color"])
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
                              createVNode("div", { class: "text-h6 q-mb-md" }, "媒合偏好"),
                              createVNode("div", { class: "row q-gutter-md" }, [
                                createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                  createVNode(_component_q_select, {
                                    modelValue: preferences.value.location,
                                    "onUpdate:modelValue": ($event) => preferences.value.location = $event,
                                    options: locationOptions,
                                    label: "希望服務地區",
                                    outlined: "",
                                    dense: "",
                                    clearable: "",
                                    "emit-value": "",
                                    "map-options": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                  createVNode(_component_q_input, {
                                    modelValue: preferences.value.maxHourlyRate,
                                    "onUpdate:modelValue": ($event) => preferences.value.maxHourlyRate = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    label: "最高時薪預算",
                                    outlined: "",
                                    dense: "",
                                    min: "0",
                                    suffix: "元/小時"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6 col-md-4" }, [
                                  createVNode(_component_q_input, {
                                    modelValue: preferences.value.minRating,
                                    "onUpdate:modelValue": ($event) => preferences.value.minRating = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    label: "最低評分要求",
                                    outlined: "",
                                    dense: "",
                                    min: "1",
                                    max: "5",
                                    step: "0.1"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mt-md" }, [
                                createVNode("div", { class: "col-12" }, [
                                  createVNode(_component_q_select, {
                                    modelValue: preferences.value.requiredSkills,
                                    "onUpdate:modelValue": ($event) => preferences.value.requiredSkills = $event,
                                    options: skillOptions,
                                    label: "需要的專業技能",
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
                                    onClick: clearPreferences
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 清除偏好 ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "col-auto" }, [
                                  createVNode(_component_q_btn, {
                                    color: "primary",
                                    onClick: findMatches,
                                    loading: isMatching.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 重新媒合 ")
                                    ]),
                                    _: 1
                                  }, 8, ["loading"])
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 512), [
                        [vShow, showPreferences.value]
                      ])
                    ]),
                    _: 1
                  }),
                  isMatching.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center q-pa-lg"
                  }, [
                    createVNode(_component_q_spinner_orbit, {
                      size: "50px",
                      color: "primary"
                    }),
                    createVNode("div", { class: "text-body2 q-mt-md" }, "智能媒合中...")
                  ])) : matchedCaregivers.value.length === 0 && hasSearched.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center q-pa-lg"
                  }, [
                    createVNode(_component_q_icon, {
                      name: "search_off",
                      size: "80px",
                      color: "grey-5"
                    }),
                    createVNode("div", { class: "text-h6 q-mt-md text-grey-7" }, "沒有找到符合條件的看護師"),
                    createVNode("div", { class: "text-body2 text-grey-6 q-mt-sm" }, " 請嘗試調整您的媒合偏好或擴大搜尋範圍 "),
                    createVNode(_component_q_btn, {
                      flat: "",
                      color: "primary",
                      onClick: clearPreferences,
                      class: "q-mt-md"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 重設條件 ")
                      ]),
                      _: 1
                    })
                  ])) : matchedCaregivers.value.length > 0 ? (openBlock(), createBlock("div", { key: 2 }, [
                    createVNode(_component_q_card, {
                      flat: "",
                      bordered: "",
                      class: "q-mb-md"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_card_section, { class: "text-center" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-h6 text-primary" }, " 找到 " + toDisplayString(matchedCaregivers.value.length) + " 位符合條件的看護師 ", 1),
                            createVNode("div", { class: "text-body2 text-grey-6" }, " 以下是根據您的需求精心篩選的推薦 ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "caregiver-list" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(matchedCaregivers.value, (caregiver, index) => {
                        return openBlock(), createBlock("div", {
                          key: caregiver.id,
                          class: "match-card"
                        }, [
                          createVNode(_component_q_card, {
                            flat: "",
                            bordered: "",
                            class: "full-height cursor-pointer",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/caregivers/${caregiver.id}`)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_card_section, null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "row items-center justify-between q-mb-sm" }, [
                                    createVNode(_component_q_chip, {
                                      color: getMatchScoreColor(caregiver.matchScore || 0),
                                      "text-color": "white",
                                      size: "sm"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 媒合度 " + toDisplayString(Math.round((caregiver.matchScore || 0) * 100)) + "% ", 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["color"]),
                                    index < 3 ? (openBlock(), createBlock(_component_q_chip, {
                                      key: 0,
                                      color: "orange",
                                      "text-color": "white",
                                      size: "sm"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 第 " + toDisplayString(index + 1) + " 推薦 ", 1)
                                      ]),
                                      _: 2
                                    }, 1024)) : createCommentVNode("", true)
                                  ]),
                                  createVNode(CaregiverCard, { caregiver }, null, 8, ["caregiver"]),
                                  createVNode("div", { class: "q-mt-md" }, [
                                    createVNode("div", { class: "text-caption text-grey-6 q-mb-xs" }, "推薦原因："),
                                    createVNode("div", { class: "text-body2" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(getMatchReasons(caregiver), (reason) => {
                                        return openBlock(), createBlock(_component_q_chip, {
                                          key: reason,
                                          size: "sm",
                                          outline: "",
                                          color: "primary",
                                          class: "q-mr-xs q-mb-xs"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(reason), 1)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ])
                                  ])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_q_card_actions, { align: "right" }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_btn, {
                                    flat: "",
                                    color: "primary",
                                    onClick: withModifiers(($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/caregivers/${caregiver.id}`), ["stop"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 查看詳情 ")
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"]),
                                  createVNode(_component_q_btn, {
                                    color: "primary",
                                    onClick: withModifiers(($event) => startBooking(caregiver), ["stop"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 立即預約 ")
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]);
                      }), 128))
                    ])
                  ])) : (openBlock(), createBlock("div", { key: 3 }, [
                    createVNode(_component_q_card, {
                      flat: "",
                      bordered: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_card_section, { class: "text-center" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-h6 q-mb-md" }, "歡迎使用智能媒合服務"),
                            createVNode("div", { class: "text-body2 text-grey-6 q-mb-md" }, " 設定您的偏好條件，我們將為您推薦最適合的看護師 "),
                            createVNode(_component_q_btn, {
                              color: "primary",
                              icon: "psychology",
                              onClick: ($event) => showPreferences.value = true
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 開始媒合 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]))
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/booking/match.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const match = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0a234703"]]);

export { match as default };
//# sourceMappingURL=match-nRYqmw7n.mjs.map
