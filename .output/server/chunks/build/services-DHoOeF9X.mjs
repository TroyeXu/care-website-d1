import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as usePageSeo, s as useRoute, l as useRuntimeConfig, k as useHead, a as __nuxt_component_1, b as __nuxt_component_2, i as __nuxt_component_5$2, d as __nuxt_component_3$2, j as __nuxt_component_9$1, c as __nuxt_component_3 } from './server.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_4$1 } from '../_/QExpansionItem.mjs';
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
import '../_/QSlideTransition.mjs';

const _sfc_main = {
  __name: "services",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("服務介紹 - DogFriend", "瞭解居家與醫院看護等多元服務項目");
    useRoute();
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseUrl || "";
    useHead({
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                serviceType: "居家照顧",
                description: "提供到府日常照料與生活協助",
                provider: { "@type": "Organization", name: "DogFriend", url: baseUrl },
                areaServed: "Taiwan"
              },
              {
                "@type": "Service",
                serviceType: "醫院看護",
                description: "協助住院期間的照護需求",
                provider: { "@type": "Organization", name: "DogFriend", url: baseUrl },
                areaServed: "Taiwan"
              },
              {
                "@type": "Service",
                serviceType: "外籍看護",
                description: "多語溝通、跨文化照護",
                provider: { "@type": "Organization", name: "DogFriend", url: baseUrl },
                areaServed: "Taiwan"
              }
            ]
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_separator = __nuxt_component_5$2;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_expansion_item = __nuxt_component_4$1;
      const _component_q_card_actions = __nuxt_component_9$1;
      const _component_q_btn = __nuxt_component_3;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: "",
              class: "info-card"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6"${_scopeId3}>服務介紹</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6" }, "服務介紹")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_separator, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_list, { bordered: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_expansion_item, {
                          icon: "home",
                          label: "居家照顧",
                          class: "q-px-sm"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="q-pa-sm"${_scopeId4}>提供到府日常照料與生活協助。</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "q-pa-sm" }, "提供到府日常照料與生活協助。")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_expansion_item, {
                          icon: "local_hospital",
                          label: "醫院看護",
                          class: "q-px-sm"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="q-pa-sm"${_scopeId4}>協助住院期間的照護需求。</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "q-pa-sm" }, "協助住院期間的照護需求。")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_expansion_item, {
                          icon: "translate",
                          label: "外籍看護",
                          class: "q-px-sm"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="q-pa-sm"${_scopeId4}>多語溝通、跨文化照護。</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "q-pa-sm" }, "多語溝通、跨文化照護。")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_expansion_item, {
                            icon: "home",
                            label: "居家照顧",
                            class: "q-px-sm"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "q-pa-sm" }, "提供到府日常照料與生活協助。")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_expansion_item, {
                            icon: "local_hospital",
                            label: "醫院看護",
                            class: "q-px-sm"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "q-pa-sm" }, "協助住院期間的照護需求。")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_expansion_item, {
                            icon: "translate",
                            label: "外籍看護",
                            class: "q-px-sm"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "q-pa-sm" }, "多語溝通、跨文化照護。")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_card_actions, { align: "right" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_btn, {
                          flat: "",
                          color: "primary",
                          to: "/contact",
                          label: "聯繫我們"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "primary",
                            to: "/contact",
                            label: "聯繫我們"
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
                        createVNode("div", { class: "text-h6" }, "服務介紹")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_separator),
                    createVNode(_component_q_list, { bordered: "" }, {
                      default: withCtx(() => [
                        createVNode(_component_q_expansion_item, {
                          icon: "home",
                          label: "居家照顧",
                          class: "q-px-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "q-pa-sm" }, "提供到府日常照料與生活協助。")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_expansion_item, {
                          icon: "local_hospital",
                          label: "醫院看護",
                          class: "q-px-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "q-pa-sm" }, "協助住院期間的照護需求。")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_expansion_item, {
                          icon: "translate",
                          label: "外籍看護",
                          class: "q-px-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "q-pa-sm" }, "多語溝通、跨文化照護。")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_card_actions, { align: "right" }, {
                      default: withCtx(() => [
                        createVNode(_component_q_btn, {
                          flat: "",
                          color: "primary",
                          to: "/contact",
                          label: "聯繫我們"
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
              createVNode(_component_q_card, {
                flat: "",
                bordered: "",
                class: "info-card"
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6" }, "服務介紹")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_q_separator),
                  createVNode(_component_q_list, { bordered: "" }, {
                    default: withCtx(() => [
                      createVNode(_component_q_expansion_item, {
                        icon: "home",
                        label: "居家照顧",
                        class: "q-px-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "q-pa-sm" }, "提供到府日常照料與生活協助。")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_expansion_item, {
                        icon: "local_hospital",
                        label: "醫院看護",
                        class: "q-px-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "q-pa-sm" }, "協助住院期間的照護需求。")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_expansion_item, {
                        icon: "translate",
                        label: "外籍看護",
                        class: "q-px-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "q-pa-sm" }, "多語溝通、跨文化照護。")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_q_card_actions, { align: "right" }, {
                    default: withCtx(() => [
                      createVNode(_component_q_btn, {
                        flat: "",
                        color: "primary",
                        to: "/contact",
                        label: "聯繫我們"
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
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/info/services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=services-DHoOeF9X.mjs.map
