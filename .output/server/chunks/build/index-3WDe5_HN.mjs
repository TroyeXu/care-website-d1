import { C as CaregiverCard } from './CaregiverCard-QaBVwOTI.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useApiService } from './useApiService-Bqe0bsFu.mjs';
import { _ as _export_sfc, u as usePageSeo, g as __nuxt_component_1$1, c as __nuxt_component_3 } from './server.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_9 } from '../_/QSpinnerDots.mjs';
import { _ as __nuxt_component_4$2 } from '../_/QBanner.mjs';
import 'vue-router';
import './useApiConfig-D0iRs2xG.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("看護列表 - 護理服務平台", "瀏覽所有專業看護員，找到最合適的人選");
    const apiService = useApiService();
    const caregivers = ref([]);
    const loading = ref(false);
    const error = ref("");
    const loadCaregivers = async () => {
      loading.value = true;
      error.value = "";
      try {
        const response = await apiService.getCaregivers(1, 50);
        caregivers.value = response.data?.data || response.data || response;
      } catch (err) {
        error.value = err.message || "載入看護師資料失敗";
        console.error("載入看護師失敗:", err);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_spinner_dots = __nuxt_component_9;
      const _component_CaregiverCard = CaregiverCard;
      const _component_q_banner = __nuxt_component_4$2;
      const _component_q_btn = __nuxt_component_3;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="page-header q-mb-lg" data-v-614c8375${_scopeId}><h1 class="text-h4 text-primary q-mb-sm" data-v-614c8375${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_icon, {
              name: "medical_services",
              class: "q-mr-sm"
            }, null, _parent2, _scopeId));
            _push2(` 專業看護師 </h1><p class="text-body1 text-grey-7" data-v-614c8375${_scopeId}> 瀏覽所有專業看護員，找到最合適的人選 </p></div>`);
            if (loading.value) {
              _push2(`<div class="text-center q-pa-lg" data-v-614c8375${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_spinner_dots, {
                size: "3rem",
                color: "primary"
              }, null, _parent2, _scopeId));
              _push2(`<div class="q-mt-md text-grey-6" data-v-614c8375${_scopeId}>載入看護師資料中...</div></div>`);
            } else if (caregivers.value.length > 0) {
              _push2(`<div class="caregiver-list" data-v-614c8375${_scopeId}><!--[-->`);
              ssrRenderList(caregivers.value, (c) => {
                _push2(ssrRenderComponent(_component_CaregiverCard, {
                  key: c.id,
                  caregiver: c
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="empty-state text-center q-pa-xl" data-v-614c8375${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_icon, {
                name: "search_off",
                size: "4rem",
                color: "grey-4",
                class: "q-mb-md"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-h6 text-grey-6 q-mb-sm" data-v-614c8375${_scopeId}>目前沒有可用的看護師</div><div class="text-body2 text-grey-5" data-v-614c8375${_scopeId}>請稍後再試或聯絡客服</div></div>`);
            }
            if (error.value) {
              _push2(ssrRenderComponent(_component_q_banner, { class: "bg-red-1 text-red-8 q-mt-md" }, {
                action: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_btn, {
                      flat: "",
                      color: "red",
                      onClick: loadCaregivers
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`重試`);
                        } else {
                          return [
                            createTextVNode("重試")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_btn, {
                        flat: "",
                        color: "red",
                        onClick: loadCaregivers
                      }, {
                        default: withCtx(() => [
                          createTextVNode("重試")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-weight-bold" data-v-614c8375${_scopeId2}>載入失敗</div><div class="text-caption" data-v-614c8375${_scopeId2}>${ssrInterpolate(error.value)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-weight-bold" }, "載入失敗"),
                      createVNode("div", { class: "text-caption" }, toDisplayString(error.value), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "page-header q-mb-lg" }, [
                createVNode("h1", { class: "text-h4 text-primary q-mb-sm" }, [
                  createVNode(_component_q_icon, {
                    name: "medical_services",
                    class: "q-mr-sm"
                  }),
                  createTextVNode(" 專業看護師 ")
                ]),
                createVNode("p", { class: "text-body1 text-grey-7" }, " 瀏覽所有專業看護員，找到最合適的人選 ")
              ]),
              loading.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center q-pa-lg"
              }, [
                createVNode(_component_q_spinner_dots, {
                  size: "3rem",
                  color: "primary"
                }),
                createVNode("div", { class: "q-mt-md text-grey-6" }, "載入看護師資料中...")
              ])) : caregivers.value.length > 0 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "caregiver-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(caregivers.value, (c) => {
                  return openBlock(), createBlock(_component_CaregiverCard, {
                    key: c.id,
                    caregiver: c
                  }, null, 8, ["caregiver"]);
                }), 128))
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "empty-state text-center q-pa-xl"
              }, [
                createVNode(_component_q_icon, {
                  name: "search_off",
                  size: "4rem",
                  color: "grey-4",
                  class: "q-mb-md"
                }),
                createVNode("div", { class: "text-h6 text-grey-6 q-mb-sm" }, "目前沒有可用的看護師"),
                createVNode("div", { class: "text-body2 text-grey-5" }, "請稍後再試或聯絡客服")
              ])),
              error.value ? (openBlock(), createBlock(_component_q_banner, {
                key: 3,
                class: "bg-red-1 text-red-8 q-mt-md"
              }, {
                action: withCtx(() => [
                  createVNode(_component_q_btn, {
                    flat: "",
                    color: "red",
                    onClick: loadCaregivers
                  }, {
                    default: withCtx(() => [
                      createTextVNode("重試")
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "text-weight-bold" }, "載入失敗"),
                  createVNode("div", { class: "text-caption" }, toDisplayString(error.value), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/caregivers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-614c8375"]]);

export { index as default };
//# sourceMappingURL=index-3WDe5_HN.mjs.map
