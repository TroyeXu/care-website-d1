import { t as createComponent, Q as useAlignProps, R as useAlign, S as getNormalizedVNodes, y as hSlot, T as useRouterLinkProps, U as useRouterLink, g as __nuxt_component_1$1, E as hMergeSlot, _ as _export_sfc, o as useQuasar, p as useAuthStore, O as useNuxtApp, l as useRuntimeConfig, k as useHead, c as __nuxt_component_3, a as __nuxt_component_1, b as __nuxt_component_2, d as __nuxt_component_3$2, e as __nuxt_component_5$1, f as __nuxt_component_6, h as __nuxt_component_8, P as navigateTo, i as __nuxt_component_5$2, u as usePageSeo } from './server.mjs';
import { computed, h, defineComponent, ref, watch, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useApiService } from './useApiService-Bqe0bsFu.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_1$2 } from '../_/QSpinnerGrid.mjs';
import { _ as __nuxt_component_8$1 } from '../_/QRating.mjs';
import { _ as __nuxt_component_9 } from '../_/QChip.mjs';
import { _ as __nuxt_component_9$1 } from '../_/QSpinnerDots.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@intlify/utils';
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

const disabledValues = [ '', true ];

const __nuxt_component_4 = createComponent({
  name: 'QBreadcrumbs',

  props: {
    ...useAlignProps,

    separator: {
      type: String,
      default: '/'
    },
    separatorColor: String,

    activeColor: {
      type: String,
      default: 'primary'
    },

    gutter: {
      type: String,
      validator: v => [ 'none', 'xs', 'sm', 'md', 'lg', 'xl' ].includes(v),
      default: 'sm'
    }
  },

  setup (props, { slots }) {
    const alignClass = useAlign(props);

    const classes = computed(() =>
      `flex items-center ${ alignClass.value }${ props.gutter === 'none' ? '' : ` q-gutter-${ props.gutter }` }`
    );

    const sepClass = computed(() => (props.separatorColor ? ` text-${ props.separatorColor }` : ''));
    const activeClass = computed(() => ` text-${ props.activeColor }`);

    return () => {
      if (slots.default === void 0) return

      const vnodes = getNormalizedVNodes(
        hSlot(slots.default)
      );

      if (vnodes.length === 0) return

      let els = 1;

      const
        child = [],
        len = vnodes.filter(c => c.type?.name === 'QBreadcrumbsEl').length,
        separator = slots.separator !== void 0
          ? slots.separator
          : () => props.separator;

      vnodes.forEach(comp => {
        if (comp.type?.name === 'QBreadcrumbsEl') {
          const middle = els < len;
          const disabled = comp.props !== null && disabledValues.includes(comp.props.disable);
          const cls = (middle === true ? '' : ' q-breadcrumbs--last')
            + (disabled !== true && middle === true ? activeClass.value : '');

          els++;

          child.push(
            h('div', {
              class: `flex items-center${ cls }`
            }, [ comp ])
          );

          if (middle === true) {
            child.push(
              h('div', {
                class: 'q-breadcrumbs__separator' + sepClass.value
              }, separator())
            );
          }
        }
        else {
          child.push(comp);
        }
      });

      return h('div', {
        class: 'q-breadcrumbs'
      }, [
        h('div', { class: classes.value }, child)
      ])
    }
  }
});

const __nuxt_component_5 = createComponent({
  name: 'QBreadcrumbsEl',

  props: {
    ...useRouterLinkProps,

    label: String,
    icon: String,

    tag: {
      type: String,
      default: 'span'
    }
  },

  emits: [ 'click' ],

  setup (props, { slots }) {
    const { linkTag, linkAttrs, linkClass, navigateOnClick } = useRouterLink();

    const data = computed(() => {
      return {
        class: 'q-breadcrumbs__el q-link '
          + 'flex inline items-center relative-position '
          + (props.disable !== true ? 'q-link--focusable' + linkClass.value : 'q-breadcrumbs__el--disable'),
        ...linkAttrs.value,
        onClick: navigateOnClick
      }
    });

    const iconClass = computed(() =>
      'q-breadcrumbs__el-icon'
      + (props.label !== void 0 ? ' q-breadcrumbs__el-icon--with-label' : '')
    );

    return () => {
      const child = [];

      props.icon !== void 0 && child.push(
        h(__nuxt_component_1$1, {
          class: iconClass.value,
          name: props.icon
        })
      );

      props.label !== void 0 && child.push(props.label);

      return h(
        linkTag.value,
        { ...data.value },
        hMergeSlot(slots.default, child)
      )
    }
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const $q = useQuasar();
    const apiService = useApiService();
    const authStore = useAuthStore();
    const caregiver = ref(null);
    const reviews = ref([]);
    const isLoading = ref(false);
    const isLoadingReviews = ref(false);
    const error = ref(null);
    const isFavorite = ref(false);
    const caregiverId = computed(() => {
      const id = route.params.id;
      return typeof id === "string" ? parseInt(id) : Array.isArray(id) ? parseInt(id[0]) : 0;
    });
    const loadCaregiverData = async () => {
      if (!caregiverId.value) {
        error.value = "無效的看護師 ID";
        return;
      }
      isLoading.value = true;
      error.value = null;
      try {
        caregiver.value = await apiService.getCaregiverById(caregiverId.value);
        if (caregiver.value) {
          usePageSeo(
            `${caregiver.value.name} - 護理服務平台`,
            `查看 ${caregiver.value.name} 的詳細資歷、專業技能和用戶評價`
          );
        }
        await loadReviews();
      } catch (err) {
        console.error("載入看護師資料失敗:", err);
        error.value = err.message || "載入失敗，請稍後再試";
      } finally {
        isLoading.value = false;
      }
    };
    const loadReviews = async () => {
      if (!caregiverId.value) return;
      isLoadingReviews.value = true;
      try {
        reviews.value = await apiService.getReviewsByCaregiver(caregiverId.value);
      } catch (err) {
        console.error("載入評價失敗:", err);
      } finally {
        isLoadingReviews.value = false;
      }
    };
    const startBooking = () => {
      if (!authStore.currentUser) {
        $q.notify({
          type: "warning",
          message: "請先登入才能進行預約",
          timeout: 3e3
        });
        navigateTo("/auth/login");
        return;
      }
      if (!caregiver.value) return;
      navigateTo({
        path: "/booking/create",
        query: { caregiverId: caregiver.value.id }
      });
    };
    const contactCaregiver = () => {
      if (!caregiver.value) return;
      $q.dialog({
        title: "聯繫看護師",
        message: `您可以透過以下方式聯繫 ${caregiver.value.name}：

電話：0987-654-321
電子郵件：${caregiver.value.name.toLowerCase()}@care-platform.com`,
        ok: {
          color: "primary",
          label: "確定"
        }
      });
    };
    const toggleFavorite = () => {
      if (!authStore.currentUser) {
        $q.notify({
          type: "warning",
          message: "請先登入才能收藏看護師",
          timeout: 3e3
        });
        return;
      }
      isFavorite.value = !isFavorite.value;
      $q.notify({
        type: "positive",
        message: isFavorite.value ? "已加入收藏" : "已取消收藏",
        timeout: 2e3
      });
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
    };
    const { $route } = useNuxtApp();
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseUrl || "";
    watch(caregiver, (newCaregiver) => {
      if (newCaregiver) {
        useHead({
          script: [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: newCaregiver.name,
                jobTitle: "專業看護師",
                description: newCaregiver.description || newCaregiver.experience,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: newCaregiver.location
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: newCaregiver.rating,
                  reviewCount: newCaregiver.review_count || 12,
                  bestRating: 5,
                  worstRating: 1
                },
                url: baseUrl + $route.fullPath
              })
            }
          ]
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_spinner_grid = __nuxt_component_1$2;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_btn = __nuxt_component_3;
      const _component_q_breadcrumbs = __nuxt_component_4;
      const _component_q_breadcrumbs_el = __nuxt_component_5;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_rating = __nuxt_component_8$1;
      const _component_q_chip = __nuxt_component_9;
      const _component_q_spinner_dots = __nuxt_component_9$1;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_item = __nuxt_component_5$1;
      const _component_q_item_section = __nuxt_component_6;
      const _component_q_item_label = __nuxt_component_8;
      const _component_q_separator = __nuxt_component_5$2;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isLoading.value) {
              _push2(`<div class="text-center q-pa-lg" data-v-03f0c809${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_spinner_grid, {
                size: "50px",
                color: "primary"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-body2 q-mt-md" data-v-03f0c809${_scopeId}>載入中...</div></div>`);
            } else if (error.value) {
              _push2(`<div class="text-center q-pa-lg" data-v-03f0c809${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_icon, {
                name: "error_outline",
                size: "80px",
                color: "negative"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-h6 q-mt-md text-negative" data-v-03f0c809${_scopeId}>載入失敗</div><div class="text-body2 text-grey-6 q-mt-sm" data-v-03f0c809${_scopeId}>${ssrInterpolate(error.value)}</div>`);
              _push2(ssrRenderComponent(_component_q_btn, {
                flat: "",
                color: "primary",
                onClick: loadCaregiverData,
                class: "q-mt-md"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 重新載入 `);
                  } else {
                    return [
                      createTextVNode(" 重新載入 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (caregiver.value) {
              _push2(`<div class="row justify-center" data-v-03f0c809${_scopeId}><div class="col-12 col-lg-10" data-v-03f0c809${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_breadcrumbs, { class: "q-mb-lg" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_breadcrumbs_el, {
                      icon: "home",
                      to: "/",
                      label: "首頁"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_q_breadcrumbs_el, {
                      to: "/caregivers",
                      label: "看護師列表"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_q_breadcrumbs_el, {
                      label: caregiver.value.name
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_breadcrumbs_el, {
                        icon: "home",
                        to: "/",
                        label: "首頁"
                      }),
                      createVNode(_component_q_breadcrumbs_el, {
                        to: "/caregivers",
                        label: "看護師列表"
                      }),
                      createVNode(_component_q_breadcrumbs_el, {
                        label: caregiver.value.name
                      }, null, 8, ["label"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="row q-gutter-lg" data-v-03f0c809${_scopeId}><div class="col-12 col-md-8" data-v-03f0c809${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                bordered: "",
                class: "q-mb-lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="row items-center" data-v-03f0c809${_scopeId3}><div class="col" data-v-03f0c809${_scopeId3}><div class="text-h5 text-primary q-mb-xs" data-v-03f0c809${_scopeId3}>${ssrInterpolate(caregiver.value.name)}</div><div class="text-subtitle1 text-grey-7" data-v-03f0c809${_scopeId3}>${ssrInterpolate(caregiver.value.specialization || "專業看護師")}</div></div><div class="col-auto" data-v-03f0c809${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_rating, {
                            modelValue: caregiver.value.rating,
                            "onUpdate:modelValue": ($event) => caregiver.value.rating = $event,
                            size: "2em",
                            max: 5,
                            color: "orange",
                            readonly: ""
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="text-center text-caption q-mt-xs" data-v-03f0c809${_scopeId3}>${ssrInterpolate(caregiver.value.rating)}/5 (基於 ${ssrInterpolate(caregiver.value.review_count || 12)} 則評價) </div></div></div><div class="q-mt-md" data-v-03f0c809${_scopeId3}>`);
                          if (caregiver.value.available) {
                            _push4(ssrRenderComponent(_component_q_chip, {
                              color: "positive",
                              "text-color": "white",
                              icon: "check_circle",
                              size: "sm"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(` 目前可預約 `);
                                } else {
                                  return [
                                    createTextVNode(" 目前可預約 ")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(_component_q_chip, {
                              color: "negative",
                              "text-color": "white",
                              icon: "schedule",
                              size: "sm"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(` 目前不可預約 `);
                                } else {
                                  return [
                                    createTextVNode(" 目前不可預約 ")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          }
                          if (caregiver.value.location) {
                            _push4(ssrRenderComponent(_component_q_chip, {
                              outline: "",
                              color: "primary",
                              icon: "location_on",
                              size: "sm"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(caregiver.value.location)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(caregiver.value.location), 1)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          if (caregiver.value.experience_years) {
                            _push4(ssrRenderComponent(_component_q_chip, {
                              outline: "",
                              color: "secondary",
                              icon: "work",
                              size: "sm"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(caregiver.value.experience_years || 5)} 年經驗 `);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(caregiver.value.experience_years || 5) + " 年經驗 ", 1)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "row items-center" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode("div", { class: "text-h5 text-primary q-mb-xs" }, toDisplayString(caregiver.value.name), 1),
                                createVNode("div", { class: "text-subtitle1 text-grey-7" }, toDisplayString(caregiver.value.specialization || "專業看護師"), 1)
                              ]),
                              createVNode("div", { class: "col-auto" }, [
                                createVNode(_component_q_rating, {
                                  modelValue: caregiver.value.rating,
                                  "onUpdate:modelValue": ($event) => caregiver.value.rating = $event,
                                  size: "2em",
                                  max: 5,
                                  color: "orange",
                                  readonly: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "text-center text-caption q-mt-xs" }, toDisplayString(caregiver.value.rating) + "/5 (基於 " + toDisplayString(caregiver.value.review_count || 12) + " 則評價) ", 1)
                              ])
                            ]),
                            createVNode("div", { class: "q-mt-md" }, [
                              caregiver.value.available ? (openBlock(), createBlock(_component_q_chip, {
                                key: 0,
                                color: "positive",
                                "text-color": "white",
                                icon: "check_circle",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 目前可預約 ")
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(_component_q_chip, {
                                key: 1,
                                color: "negative",
                                "text-color": "white",
                                icon: "schedule",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 目前不可預約 ")
                                ]),
                                _: 1
                              })),
                              caregiver.value.location ? (openBlock(), createBlock(_component_q_chip, {
                                key: 2,
                                outline: "",
                                color: "primary",
                                icon: "location_on",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(caregiver.value.location), 1)
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              caregiver.value.experience_years ? (openBlock(), createBlock(_component_q_chip, {
                                key: 3,
                                outline: "",
                                color: "secondary",
                                icon: "work",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(caregiver.value.experience_years || 5) + " 年經驗 ", 1)
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "row items-center" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode("div", { class: "text-h5 text-primary q-mb-xs" }, toDisplayString(caregiver.value.name), 1),
                              createVNode("div", { class: "text-subtitle1 text-grey-7" }, toDisplayString(caregiver.value.specialization || "專業看護師"), 1)
                            ]),
                            createVNode("div", { class: "col-auto" }, [
                              createVNode(_component_q_rating, {
                                modelValue: caregiver.value.rating,
                                "onUpdate:modelValue": ($event) => caregiver.value.rating = $event,
                                size: "2em",
                                max: 5,
                                color: "orange",
                                readonly: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "text-center text-caption q-mt-xs" }, toDisplayString(caregiver.value.rating) + "/5 (基於 " + toDisplayString(caregiver.value.review_count || 12) + " 則評價) ", 1)
                            ])
                          ]),
                          createVNode("div", { class: "q-mt-md" }, [
                            caregiver.value.available ? (openBlock(), createBlock(_component_q_chip, {
                              key: 0,
                              color: "positive",
                              "text-color": "white",
                              icon: "check_circle",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 目前可預約 ")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(_component_q_chip, {
                              key: 1,
                              color: "negative",
                              "text-color": "white",
                              icon: "schedule",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 目前不可預約 ")
                              ]),
                              _: 1
                            })),
                            caregiver.value.location ? (openBlock(), createBlock(_component_q_chip, {
                              key: 2,
                              outline: "",
                              color: "primary",
                              icon: "location_on",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(caregiver.value.location), 1)
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            caregiver.value.experience_years ? (openBlock(), createBlock(_component_q_chip, {
                              key: 3,
                              outline: "",
                              color: "secondary",
                              icon: "work",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(caregiver.value.experience_years || 5) + " 年經驗 ", 1)
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                bordered: "",
                class: "q-mb-lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h6 q-mb-md" data-v-03f0c809${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_icon, {
                            name: "psychology",
                            class: "q-mr-sm"
                          }, null, _parent4, _scopeId3));
                          _push4(` 專業經驗與技能 </div><div class="q-mb-md" data-v-03f0c809${_scopeId3}><div class="text-subtitle2 q-mb-sm" data-v-03f0c809${_scopeId3}>工作經驗</div><div class="text-body2" data-v-03f0c809${_scopeId3}>${ssrInterpolate(caregiver.value.experience)}</div></div><div class="q-mb-md" data-v-03f0c809${_scopeId3}><div class="text-subtitle2 q-mb-sm" data-v-03f0c809${_scopeId3}>專業技能</div><div class="text-body2" data-v-03f0c809${_scopeId3}>${ssrInterpolate(caregiver.value.skills)}</div></div>`);
                          if (caregiver.value.description) {
                            _push4(`<div class="q-mb-md" data-v-03f0c809${_scopeId3}><div class="text-subtitle2 q-mb-sm" data-v-03f0c809${_scopeId3}>個人簡介</div><div class="text-body2" data-v-03f0c809${_scopeId3}>${ssrInterpolate(caregiver.value.description || "我是一位專業的看護師，擁有豐富的照護經驗和專業技能。我致力於為每位患者提供最優質的照護服務，確保他們的健康和安全。")}</div></div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 q-mb-md" }, [
                              createVNode(_component_q_icon, {
                                name: "psychology",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" 專業經驗與技能 ")
                            ]),
                            createVNode("div", { class: "q-mb-md" }, [
                              createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "工作經驗"),
                              createVNode("div", { class: "text-body2" }, toDisplayString(caregiver.value.experience), 1)
                            ]),
                            createVNode("div", { class: "q-mb-md" }, [
                              createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "專業技能"),
                              createVNode("div", { class: "text-body2" }, toDisplayString(caregiver.value.skills), 1)
                            ]),
                            caregiver.value.description ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "q-mb-md"
                            }, [
                              createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "個人簡介"),
                              createVNode("div", { class: "text-body2" }, toDisplayString(caregiver.value.description || "我是一位專業的看護師，擁有豐富的照護經驗和專業技能。我致力於為每位患者提供最優質的照護服務，確保他們的健康和安全。"), 1)
                            ])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 q-mb-md" }, [
                            createVNode(_component_q_icon, {
                              name: "psychology",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 專業經驗與技能 ")
                          ]),
                          createVNode("div", { class: "q-mb-md" }, [
                            createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "工作經驗"),
                            createVNode("div", { class: "text-body2" }, toDisplayString(caregiver.value.experience), 1)
                          ]),
                          createVNode("div", { class: "q-mb-md" }, [
                            createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "專業技能"),
                            createVNode("div", { class: "text-body2" }, toDisplayString(caregiver.value.skills), 1)
                          ]),
                          caregiver.value.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "q-mb-md"
                          }, [
                            createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "個人簡介"),
                            createVNode("div", { class: "text-body2" }, toDisplayString(caregiver.value.description || "我是一位專業的看護師，擁有豐富的照護經驗和專業技能。我致力於為每位患者提供最優質的照護服務，確保他們的健康和安全。"), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                bordered: "",
                class: "q-mb-lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h6 q-mb-md" data-v-03f0c809${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_icon, {
                            name: "verified",
                            class: "q-mr-sm"
                          }, null, _parent4, _scopeId3));
                          _push4(` 證照資格 </div><div class="row q-gutter-sm" data-v-03f0c809${_scopeId3}><!--[-->`);
                          ssrRenderList(caregiver.value.licenses, (license) => {
                            _push4(ssrRenderComponent(_component_q_chip, {
                              key: license,
                              color: "blue-1",
                              "text-color": "blue-8",
                              icon: "verified_user"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(license)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(license), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 q-mb-md" }, [
                              createVNode(_component_q_icon, {
                                name: "verified",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" 證照資格 ")
                            ]),
                            createVNode("div", { class: "row q-gutter-sm" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(caregiver.value.licenses, (license) => {
                                return openBlock(), createBlock(_component_q_chip, {
                                  key: license,
                                  color: "blue-1",
                                  "text-color": "blue-8",
                                  icon: "verified_user"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(license), 1)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 q-mb-md" }, [
                            createVNode(_component_q_icon, {
                              name: "verified",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 證照資格 ")
                          ]),
                          createVNode("div", { class: "row q-gutter-sm" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(caregiver.value.licenses, (license) => {
                              return openBlock(), createBlock(_component_q_chip, {
                                key: license,
                                color: "blue-1",
                                "text-color": "blue-8",
                                icon: "verified_user"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(license), 1)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                bordered: "",
                class: "q-mb-lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="row items-center justify-between q-mb-md" data-v-03f0c809${_scopeId3}><div class="text-h6" data-v-03f0c809${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_icon, {
                            name: "rate_review",
                            class: "q-mr-sm"
                          }, null, _parent4, _scopeId3));
                          _push4(` 用戶評價 </div>`);
                          _push4(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            color: "primary",
                            onClick: loadReviews,
                            loading: isLoadingReviews.value
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` 更新評價 `);
                              } else {
                                return [
                                  createTextVNode(" 更新評價 ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                          if (isLoadingReviews.value) {
                            _push4(`<div class="text-center q-pa-md" data-v-03f0c809${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_q_spinner_dots, {
                              size: "30px",
                              color: "primary"
                            }, null, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else if (reviews.value.length === 0) {
                            _push4(`<div class="text-center q-pa-md text-grey-6" data-v-03f0c809${_scopeId3}> 尚無評價 </div>`);
                          } else {
                            _push4(`<div data-v-03f0c809${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_q_list, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(reviews.value.slice(0, 3), (review) => {
                                    _push5(ssrRenderComponent(_component_q_item, {
                                      key: review.id,
                                      class: "q-pa-md"
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(_component_q_item_section, null, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(ssrRenderComponent(_component_q_item_label, { class: "row items-center q-mb-xs" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_q_rating, {
                                                        "model-value": review.rating,
                                                        size: "1em",
                                                        max: 5,
                                                        color: "orange",
                                                        readonly: "",
                                                        class: "q-mr-sm"
                                                      }, null, _parent8, _scopeId7));
                                                      _push8(`<span class="text-caption text-grey-6" data-v-03f0c809${_scopeId7}>${ssrInterpolate(formatDate(review.created_at))}</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(_component_q_rating, {
                                                          "model-value": review.rating,
                                                          size: "1em",
                                                          max: 5,
                                                          color: "orange",
                                                          readonly: "",
                                                          class: "q-mr-sm"
                                                        }, null, 8, ["model-value"]),
                                                        createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                                _push7(ssrRenderComponent(_component_q_item_label, { class: "text-body2" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(`${ssrInterpolate(review.comment)}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(review.comment), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                                _push7(ssrRenderComponent(_component_q_item_label, {
                                                  caption: "",
                                                  class: "text-grey-6"
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(` 由 ${ssrInterpolate(review.user_name || "匯名用戶")} 提供 `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                return [
                                                  createVNode(_component_q_item_label, { class: "row items-center q-mb-xs" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_rating, {
                                                        "model-value": review.rating,
                                                        size: "1em",
                                                        max: 5,
                                                        color: "orange",
                                                        readonly: "",
                                                        class: "q-mr-sm"
                                                      }, null, 8, ["model-value"]),
                                                      createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_q_item_label, { class: "text-body2" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(review.comment), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_q_item_label, {
                                                    caption: "",
                                                    class: "text-grey-6"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_label, { class: "row items-center q-mb-xs" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_rating, {
                                                      "model-value": review.rating,
                                                      size: "1em",
                                                      max: 5,
                                                      color: "orange",
                                                      readonly: "",
                                                      class: "q-mr-sm"
                                                    }, null, 8, ["model-value"]),
                                                    createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_q_item_label, { class: "text-body2" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(review.comment), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_q_item_label, {
                                                  caption: "",
                                                  class: "text-grey-6"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(reviews.value.slice(0, 3), (review) => {
                                      return openBlock(), createBlock(_component_q_item, {
                                        key: review.id,
                                        class: "q-pa-md"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "row items-center q-mb-xs" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_rating, {
                                                    "model-value": review.rating,
                                                    size: "1em",
                                                    max: 5,
                                                    color: "orange",
                                                    readonly: "",
                                                    class: "q-mr-sm"
                                                  }, null, 8, ["model-value"]),
                                                  createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, { class: "text-body2" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(review.comment), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, {
                                                caption: "",
                                                class: "text-grey-6"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            if (reviews.value.length > 3) {
                              _push4(`<div class="text-center q-mt-md" data-v-03f0c809${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_q_btn, {
                                flat: "",
                                color: "primary",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/support/reviews?caregiverId=${caregiver.value.id}`)
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(` 查看全部 ${ssrInterpolate(reviews.value.length)} 則評價 `);
                                  } else {
                                    return [
                                      createTextVNode(" 查看全部 " + toDisplayString(reviews.value.length) + " 則評價 ", 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent4, _scopeId3));
                              _push4(`</div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div>`);
                          }
                        } else {
                          return [
                            createVNode("div", { class: "row items-center justify-between q-mb-md" }, [
                              createVNode("div", { class: "text-h6" }, [
                                createVNode(_component_q_icon, {
                                  name: "rate_review",
                                  class: "q-mr-sm"
                                }),
                                createTextVNode(" 用戶評價 ")
                              ]),
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "primary",
                                onClick: loadReviews,
                                loading: isLoadingReviews.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 更新評價 ")
                                ]),
                                _: 1
                              }, 8, ["loading"])
                            ]),
                            isLoadingReviews.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center q-pa-md"
                            }, [
                              createVNode(_component_q_spinner_dots, {
                                size: "30px",
                                color: "primary"
                              })
                            ])) : reviews.value.length === 0 ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-center q-pa-md text-grey-6"
                            }, " 尚無評價 ")) : (openBlock(), createBlock("div", { key: 2 }, [
                              createVNode(_component_q_list, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(reviews.value.slice(0, 3), (review) => {
                                    return openBlock(), createBlock(_component_q_item, {
                                      key: review.id,
                                      class: "q-pa-md"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, { class: "row items-center q-mb-xs" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_rating, {
                                                  "model-value": review.rating,
                                                  size: "1em",
                                                  max: 5,
                                                  color: "orange",
                                                  readonly: "",
                                                  class: "q-mr-sm"
                                                }, null, 8, ["model-value"]),
                                                createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_q_item_label, { class: "text-body2" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(review.comment), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_q_item_label, {
                                              caption: "",
                                              class: "text-grey-6"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ]),
                                _: 1
                              }),
                              reviews.value.length > 3 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center q-mt-md"
                              }, [
                                createVNode(_component_q_btn, {
                                  flat: "",
                                  color: "primary",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/support/reviews?caregiverId=${caregiver.value.id}`)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 查看全部 " + toDisplayString(reviews.value.length) + " 則評價 ", 1)
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])) : createCommentVNode("", true)
                            ]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "row items-center justify-between q-mb-md" }, [
                            createVNode("div", { class: "text-h6" }, [
                              createVNode(_component_q_icon, {
                                name: "rate_review",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" 用戶評價 ")
                            ]),
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "primary",
                              onClick: loadReviews,
                              loading: isLoadingReviews.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 更新評價 ")
                              ]),
                              _: 1
                            }, 8, ["loading"])
                          ]),
                          isLoadingReviews.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center q-pa-md"
                          }, [
                            createVNode(_component_q_spinner_dots, {
                              size: "30px",
                              color: "primary"
                            })
                          ])) : reviews.value.length === 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center q-pa-md text-grey-6"
                          }, " 尚無評價 ")) : (openBlock(), createBlock("div", { key: 2 }, [
                            createVNode(_component_q_list, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(reviews.value.slice(0, 3), (review) => {
                                  return openBlock(), createBlock(_component_q_item, {
                                    key: review.id,
                                    class: "q-pa-md"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, { class: "row items-center q-mb-xs" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_rating, {
                                                "model-value": review.rating,
                                                size: "1em",
                                                max: 5,
                                                color: "orange",
                                                readonly: "",
                                                class: "q-mr-sm"
                                              }, null, 8, ["model-value"]),
                                              createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_label, { class: "text-body2" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(review.comment), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_label, {
                                            caption: "",
                                            class: "text-grey-6"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            }),
                            reviews.value.length > 3 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center q-mt-md"
                            }, [
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "primary",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/support/reviews?caregiverId=${caregiver.value.id}`)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 查看全部 " + toDisplayString(reviews.value.length) + " 則評價 ", 1)
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])) : createCommentVNode("", true)
                          ]))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="col-12 col-md-4" data-v-03f0c809${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                bordered: "",
                class: "q-mb-lg sticky-card"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h6 q-mb-md text-center" data-v-03f0c809${_scopeId3}>服務價格</div><div class="text-center q-mb-md" data-v-03f0c809${_scopeId3}><div class="text-h4 text-primary" data-v-03f0c809${_scopeId3}> NT$ ${ssrInterpolate(caregiver.value.hourly_rate)}</div><div class="text-caption text-grey-6" data-v-03f0c809${_scopeId3}>每小時</div></div><div class="text-center q-mb-lg" data-v-03f0c809${_scopeId3}><div class="text-h5 text-secondary" data-v-03f0c809${_scopeId3}> NT$ ${ssrInterpolate(caregiver.value.shift_rate)}</div><div class="text-caption text-grey-6" data-v-03f0c809${_scopeId3}>每班 (早/晚班 8小時)</div></div>`);
                          _push4(ssrRenderComponent(_component_q_separator, { class: "q-mb-md" }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_q_btn, {
                            color: "primary",
                            size: "lg",
                            class: "full-width q-mb-sm",
                            icon: "calendar_today",
                            disable: !caregiver.value.available,
                            onClick: startBooking
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(caregiver.value.available ? "立即預約" : "目前不可預約")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(caregiver.value.available ? "立即預約" : "目前不可預約"), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            color: "secondary",
                            class: "full-width q-mb-sm",
                            icon: "message",
                            onClick: contactCaregiver
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` 聯繫看護師 `);
                              } else {
                                return [
                                  createTextVNode(" 聯繫看護師 ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            color: "grey",
                            class: "full-width",
                            icon: "favorite_border",
                            onClick: toggleFavorite
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(isFavorite.value ? "取消收藏" : "收藏看護師")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(isFavorite.value ? "取消收藏" : "收藏看護師"), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<div class="text-caption text-grey-6 text-center q-mt-md" data-v-03f0c809${_scopeId3}> 最後更新：${ssrInterpolate(formatDate(caregiver.value.updated_at))}</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 q-mb-md text-center" }, "服務價格"),
                            createVNode("div", { class: "text-center q-mb-md" }, [
                              createVNode("div", { class: "text-h4 text-primary" }, " NT$ " + toDisplayString(caregiver.value.hourly_rate), 1),
                              createVNode("div", { class: "text-caption text-grey-6" }, "每小時")
                            ]),
                            createVNode("div", { class: "text-center q-mb-lg" }, [
                              createVNode("div", { class: "text-h5 text-secondary" }, " NT$ " + toDisplayString(caregiver.value.shift_rate), 1),
                              createVNode("div", { class: "text-caption text-grey-6" }, "每班 (早/晚班 8小時)")
                            ]),
                            createVNode(_component_q_separator, { class: "q-mb-md" }),
                            createVNode(_component_q_btn, {
                              color: "primary",
                              size: "lg",
                              class: "full-width q-mb-sm",
                              icon: "calendar_today",
                              disable: !caregiver.value.available,
                              onClick: startBooking
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(caregiver.value.available ? "立即預約" : "目前不可預約"), 1)
                              ]),
                              _: 1
                            }, 8, ["disable"]),
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "secondary",
                              class: "full-width q-mb-sm",
                              icon: "message",
                              onClick: contactCaregiver
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 聯繫看護師 ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "grey",
                              class: "full-width",
                              icon: "favorite_border",
                              onClick: toggleFavorite
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(isFavorite.value ? "取消收藏" : "收藏看護師"), 1)
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "text-caption text-grey-6 text-center q-mt-md" }, " 最後更新：" + toDisplayString(formatDate(caregiver.value.updated_at)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 q-mb-md text-center" }, "服務價格"),
                          createVNode("div", { class: "text-center q-mb-md" }, [
                            createVNode("div", { class: "text-h4 text-primary" }, " NT$ " + toDisplayString(caregiver.value.hourly_rate), 1),
                            createVNode("div", { class: "text-caption text-grey-6" }, "每小時")
                          ]),
                          createVNode("div", { class: "text-center q-mb-lg" }, [
                            createVNode("div", { class: "text-h5 text-secondary" }, " NT$ " + toDisplayString(caregiver.value.shift_rate), 1),
                            createVNode("div", { class: "text-caption text-grey-6" }, "每班 (早/晚班 8小時)")
                          ]),
                          createVNode(_component_q_separator, { class: "q-mb-md" }),
                          createVNode(_component_q_btn, {
                            color: "primary",
                            size: "lg",
                            class: "full-width q-mb-sm",
                            icon: "calendar_today",
                            disable: !caregiver.value.available,
                            onClick: startBooking
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(caregiver.value.available ? "立即預約" : "目前不可預約"), 1)
                            ]),
                            _: 1
                          }, 8, ["disable"]),
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "secondary",
                            class: "full-width q-mb-sm",
                            icon: "message",
                            onClick: contactCaregiver
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 聯繫看護師 ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "grey",
                            class: "full-width",
                            icon: "favorite_border",
                            onClick: toggleFavorite
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(isFavorite.value ? "取消收藏" : "收藏看護師"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "text-caption text-grey-6 text-center q-mt-md" }, " 最後更新：" + toDisplayString(formatDate(caregiver.value.updated_at)), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h6 q-mb-md" data-v-03f0c809${_scopeId3}>快速資訊</div>`);
                          _push4(ssrRenderComponent(_component_q_list, { dense: "" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_q_item, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_icon, {
                                              name: "location_on",
                                              color: "primary"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_icon, {
                                                name: "location_on",
                                                color: "primary"
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_item_label, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`服務地區`);
                                                } else {
                                                  return [
                                                    createTextVNode("服務地區")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(caregiver.value.location || "未提供")}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(caregiver.value.location || "未提供"), 1)
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("服務地區")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(caregiver.value.location || "未提供"), 1)
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
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "location_on",
                                              color: "primary"
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("服務地區")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(caregiver.value.location || "未提供"), 1)
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
                                _push5(ssrRenderComponent(_component_q_item, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_icon, {
                                              name: "schedule",
                                              color: "primary"
                                            }, null, _parent7, _scopeId6));
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
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_item_label, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`可用狀態`);
                                                } else {
                                                  return [
                                                    createTextVNode("可用狀態")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(caregiver.value.available ? "目前可預約" : "目前不可預約")}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(caregiver.value.available ? "目前可預約" : "目前不可預約"), 1)
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("可用狀態")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(caregiver.value.available ? "目前可預約" : "目前不可預約"), 1)
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
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "schedule",
                                              color: "primary"
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("可用狀態")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(caregiver.value.available ? "目前可預約" : "目前不可預約"), 1)
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
                                _push5(ssrRenderComponent(_component_q_item, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_icon, {
                                              name: "work",
                                              color: "primary"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_icon, {
                                                name: "work",
                                                color: "primary"
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_item_label, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`工作經驗`);
                                                } else {
                                                  return [
                                                    createTextVNode("工作經驗")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(caregiver.value.experience_years || 5)} 年`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(caregiver.value.experience_years || 5) + " 年", 1)
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("工作經驗")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(caregiver.value.experience_years || 5) + " 年", 1)
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
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "work",
                                              color: "primary"
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("工作經驗")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(caregiver.value.experience_years || 5) + " 年", 1)
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
                                _push5(ssrRenderComponent(_component_q_item, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_icon, {
                                              name: "language",
                                              color: "primary"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_icon, {
                                                name: "language",
                                                color: "primary"
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_item_label, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`語言能力`);
                                                } else {
                                                  return [
                                                    createTextVNode("語言能力")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`中文、台語`);
                                                } else {
                                                  return [
                                                    createTextVNode("中文、台語")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("語言能力")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("中文、台語")
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
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "language",
                                              color: "primary"
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("語言能力")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("中文、台語")
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
                                  createVNode(_component_q_item, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "location_on",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("服務地區")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(caregiver.value.location || "未提供"), 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "schedule",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("可用狀態")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(caregiver.value.available ? "目前可預約" : "目前不可預約"), 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "work",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("工作經驗")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(caregiver.value.experience_years || 5) + " 年", 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "language",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("語言能力")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("中文、台語")
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
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 q-mb-md" }, "快速資訊"),
                            createVNode(_component_q_list, { dense: "" }, {
                              default: withCtx(() => [
                                createVNode(_component_q_item, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "location_on",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("服務地區")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(caregiver.value.location || "未提供"), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "schedule",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("可用狀態")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(caregiver.value.available ? "目前可預約" : "目前不可預約"), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "work",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("工作經驗")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(caregiver.value.experience_years || 5) + " 年", 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "language",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("語言能力")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("中文、台語")
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
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "快速資訊"),
                          createVNode(_component_q_list, { dense: "" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "location_on",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("服務地區")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(caregiver.value.location || "未提供"), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "schedule",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("可用狀態")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(caregiver.value.available ? "目前可預約" : "目前不可預約"), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "work",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("工作經驗")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(caregiver.value.experience_years || 5) + " 年", 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "language",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("語言能力")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("中文、台語")
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
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<div class="text-center q-pa-lg" data-v-03f0c809${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_icon, {
                name: "person_search",
                size: "80px",
                color: "grey-5"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-h6 q-mt-md text-grey-7" data-v-03f0c809${_scopeId}>找不到看護師資訊</div><div class="text-body2 text-grey-6 q-mt-sm" data-v-03f0c809${_scopeId}> 請確認看護師 ID 是否正確 </div>`);
              _push2(ssrRenderComponent(_component_q_btn, {
                flat: "",
                color: "primary",
                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/caregivers"),
                class: "q-mt-md"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 返回看護師列表 `);
                  } else {
                    return [
                      createTextVNode(" 返回看護師列表 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              isLoading.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center q-pa-lg"
              }, [
                createVNode(_component_q_spinner_grid, {
                  size: "50px",
                  color: "primary"
                }),
                createVNode("div", { class: "text-body2 q-mt-md" }, "載入中...")
              ])) : error.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center q-pa-lg"
              }, [
                createVNode(_component_q_icon, {
                  name: "error_outline",
                  size: "80px",
                  color: "negative"
                }),
                createVNode("div", { class: "text-h6 q-mt-md text-negative" }, "載入失敗"),
                createVNode("div", { class: "text-body2 text-grey-6 q-mt-sm" }, toDisplayString(error.value), 1),
                createVNode(_component_q_btn, {
                  flat: "",
                  color: "primary",
                  onClick: loadCaregiverData,
                  class: "q-mt-md"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 重新載入 ")
                  ]),
                  _: 1
                })
              ])) : caregiver.value ? (openBlock(), createBlock("div", {
                key: 2,
                class: "row justify-center"
              }, [
                createVNode("div", { class: "col-12 col-lg-10" }, [
                  createVNode(_component_q_breadcrumbs, { class: "q-mb-lg" }, {
                    default: withCtx(() => [
                      createVNode(_component_q_breadcrumbs_el, {
                        icon: "home",
                        to: "/",
                        label: "首頁"
                      }),
                      createVNode(_component_q_breadcrumbs_el, {
                        to: "/caregivers",
                        label: "看護師列表"
                      }),
                      createVNode(_component_q_breadcrumbs_el, {
                        label: caregiver.value.name
                      }, null, 8, ["label"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "row q-gutter-lg" }, [
                    createVNode("div", { class: "col-12 col-md-8" }, [
                      createVNode(_component_q_card, {
                        flat: "",
                        bordered: "",
                        class: "q-mb-lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "row items-center" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode("div", { class: "text-h5 text-primary q-mb-xs" }, toDisplayString(caregiver.value.name), 1),
                                  createVNode("div", { class: "text-subtitle1 text-grey-7" }, toDisplayString(caregiver.value.specialization || "專業看護師"), 1)
                                ]),
                                createVNode("div", { class: "col-auto" }, [
                                  createVNode(_component_q_rating, {
                                    modelValue: caregiver.value.rating,
                                    "onUpdate:modelValue": ($event) => caregiver.value.rating = $event,
                                    size: "2em",
                                    max: 5,
                                    color: "orange",
                                    readonly: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("div", { class: "text-center text-caption q-mt-xs" }, toDisplayString(caregiver.value.rating) + "/5 (基於 " + toDisplayString(caregiver.value.review_count || 12) + " 則評價) ", 1)
                                ])
                              ]),
                              createVNode("div", { class: "q-mt-md" }, [
                                caregiver.value.available ? (openBlock(), createBlock(_component_q_chip, {
                                  key: 0,
                                  color: "positive",
                                  "text-color": "white",
                                  icon: "check_circle",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 目前可預約 ")
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock(_component_q_chip, {
                                  key: 1,
                                  color: "negative",
                                  "text-color": "white",
                                  icon: "schedule",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 目前不可預約 ")
                                  ]),
                                  _: 1
                                })),
                                caregiver.value.location ? (openBlock(), createBlock(_component_q_chip, {
                                  key: 2,
                                  outline: "",
                                  color: "primary",
                                  icon: "location_on",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(caregiver.value.location), 1)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                caregiver.value.experience_years ? (openBlock(), createBlock(_component_q_chip, {
                                  key: 3,
                                  outline: "",
                                  color: "secondary",
                                  icon: "work",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(caregiver.value.experience_years || 5) + " 年經驗 ", 1)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card, {
                        flat: "",
                        bordered: "",
                        class: "q-mb-lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6 q-mb-md" }, [
                                createVNode(_component_q_icon, {
                                  name: "psychology",
                                  class: "q-mr-sm"
                                }),
                                createTextVNode(" 專業經驗與技能 ")
                              ]),
                              createVNode("div", { class: "q-mb-md" }, [
                                createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "工作經驗"),
                                createVNode("div", { class: "text-body2" }, toDisplayString(caregiver.value.experience), 1)
                              ]),
                              createVNode("div", { class: "q-mb-md" }, [
                                createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "專業技能"),
                                createVNode("div", { class: "text-body2" }, toDisplayString(caregiver.value.skills), 1)
                              ]),
                              caregiver.value.description ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "q-mb-md"
                              }, [
                                createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "個人簡介"),
                                createVNode("div", { class: "text-body2" }, toDisplayString(caregiver.value.description || "我是一位專業的看護師，擁有豐富的照護經驗和專業技能。我致力於為每位患者提供最優質的照護服務，確保他們的健康和安全。"), 1)
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card, {
                        flat: "",
                        bordered: "",
                        class: "q-mb-lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6 q-mb-md" }, [
                                createVNode(_component_q_icon, {
                                  name: "verified",
                                  class: "q-mr-sm"
                                }),
                                createTextVNode(" 證照資格 ")
                              ]),
                              createVNode("div", { class: "row q-gutter-sm" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(caregiver.value.licenses, (license) => {
                                  return openBlock(), createBlock(_component_q_chip, {
                                    key: license,
                                    color: "blue-1",
                                    "text-color": "blue-8",
                                    icon: "verified_user"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(license), 1)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card, {
                        flat: "",
                        bordered: "",
                        class: "q-mb-lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "row items-center justify-between q-mb-md" }, [
                                createVNode("div", { class: "text-h6" }, [
                                  createVNode(_component_q_icon, {
                                    name: "rate_review",
                                    class: "q-mr-sm"
                                  }),
                                  createTextVNode(" 用戶評價 ")
                                ]),
                                createVNode(_component_q_btn, {
                                  flat: "",
                                  color: "primary",
                                  onClick: loadReviews,
                                  loading: isLoadingReviews.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 更新評價 ")
                                  ]),
                                  _: 1
                                }, 8, ["loading"])
                              ]),
                              isLoadingReviews.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center q-pa-md"
                              }, [
                                createVNode(_component_q_spinner_dots, {
                                  size: "30px",
                                  color: "primary"
                                })
                              ])) : reviews.value.length === 0 ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-center q-pa-md text-grey-6"
                              }, " 尚無評價 ")) : (openBlock(), createBlock("div", { key: 2 }, [
                                createVNode(_component_q_list, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(reviews.value.slice(0, 3), (review) => {
                                      return openBlock(), createBlock(_component_q_item, {
                                        key: review.id,
                                        class: "q-pa-md"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "row items-center q-mb-xs" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_rating, {
                                                    "model-value": review.rating,
                                                    size: "1em",
                                                    max: 5,
                                                    color: "orange",
                                                    readonly: "",
                                                    class: "q-mr-sm"
                                                  }, null, 8, ["model-value"]),
                                                  createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, { class: "text-body2" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(review.comment), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, {
                                                caption: "",
                                                class: "text-grey-6"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 1
                                }),
                                reviews.value.length > 3 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center q-mt-md"
                                }, [
                                  createVNode(_component_q_btn, {
                                    flat: "",
                                    color: "primary",
                                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/support/reviews?caregiverId=${caregiver.value.id}`)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 查看全部 " + toDisplayString(reviews.value.length) + " 則評價 ", 1)
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])) : createCommentVNode("", true)
                              ]))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "col-12 col-md-4" }, [
                      createVNode(_component_q_card, {
                        flat: "",
                        bordered: "",
                        class: "q-mb-lg sticky-card"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6 q-mb-md text-center" }, "服務價格"),
                              createVNode("div", { class: "text-center q-mb-md" }, [
                                createVNode("div", { class: "text-h4 text-primary" }, " NT$ " + toDisplayString(caregiver.value.hourly_rate), 1),
                                createVNode("div", { class: "text-caption text-grey-6" }, "每小時")
                              ]),
                              createVNode("div", { class: "text-center q-mb-lg" }, [
                                createVNode("div", { class: "text-h5 text-secondary" }, " NT$ " + toDisplayString(caregiver.value.shift_rate), 1),
                                createVNode("div", { class: "text-caption text-grey-6" }, "每班 (早/晚班 8小時)")
                              ]),
                              createVNode(_component_q_separator, { class: "q-mb-md" }),
                              createVNode(_component_q_btn, {
                                color: "primary",
                                size: "lg",
                                class: "full-width q-mb-sm",
                                icon: "calendar_today",
                                disable: !caregiver.value.available,
                                onClick: startBooking
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(caregiver.value.available ? "立即預約" : "目前不可預約"), 1)
                                ]),
                                _: 1
                              }, 8, ["disable"]),
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "secondary",
                                class: "full-width q-mb-sm",
                                icon: "message",
                                onClick: contactCaregiver
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 聯繫看護師 ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "grey",
                                class: "full-width",
                                icon: "favorite_border",
                                onClick: toggleFavorite
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(isFavorite.value ? "取消收藏" : "收藏看護師"), 1)
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "text-caption text-grey-6 text-center q-mt-md" }, " 最後更新：" + toDisplayString(formatDate(caregiver.value.updated_at)), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card, {
                        flat: "",
                        bordered: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6 q-mb-md" }, "快速資訊"),
                              createVNode(_component_q_list, { dense: "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "location_on",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("服務地區")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(caregiver.value.location || "未提供"), 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "schedule",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("可用狀態")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(caregiver.value.available ? "目前可預約" : "目前不可預約"), 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "work",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("工作經驗")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(caregiver.value.experience_years || 5) + " 年", 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "language",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("語言能力")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("中文、台語")
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
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 3,
                class: "text-center q-pa-lg"
              }, [
                createVNode(_component_q_icon, {
                  name: "person_search",
                  size: "80px",
                  color: "grey-5"
                }),
                createVNode("div", { class: "text-h6 q-mt-md text-grey-7" }, "找不到看護師資訊"),
                createVNode("div", { class: "text-body2 text-grey-6 q-mt-sm" }, " 請確認看護師 ID 是否正確 "),
                createVNode(_component_q_btn, {
                  flat: "",
                  color: "primary",
                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/caregivers"),
                  class: "q-mt-md"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 返回看護師列表 ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/caregivers/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-03f0c809"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-KP0Rlb9g.mjs.map
