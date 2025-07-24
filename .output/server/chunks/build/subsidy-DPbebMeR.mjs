import { mergeProps, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as usePageSeo, a as __nuxt_component_1, b as __nuxt_component_2, d as __nuxt_component_3$2, c as __nuxt_component_3 } from './server.mjs';
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
  __name: "subsidy",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("補助資訊 - DogFriend", "了解政府與機構提供的照護補助");
    const subsidies = [
      {
        name: "長照補助",
        desc: "政府提供的長期照顧補助方案，依照失能等級給予費用補助。",
        url: "https://example.com/long-term-care"
      },
      {
        name: "看護保險方案",
        desc: "民間保險公司推出的照護險，減輕長期看護費用負擔。",
        url: "https://example.com/caregiver-insurance"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_expansion_item = __nuxt_component_4$1;
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
                        _push4(`<div class="text-h6"${_scopeId3}>補助與保險資訊</div>`);
                        _push4(ssrRenderComponent(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders q-mt-md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(subsidies, (item, i) => {
                                _push5(ssrRenderComponent(_component_q_expansion_item, {
                                  key: i,
                                  label: item.name
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="q-mb-sm"${_scopeId5}>${ssrInterpolate(item.desc)}</div>`);
                                      _push6(ssrRenderComponent(_component_q_btn, {
                                        flat: "",
                                        size: "sm",
                                        color: "primary",
                                        href: item.url,
                                        target: "_blank",
                                        icon: "open_in_new",
                                        label: "前往連結"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode("div", { class: "q-mb-sm" }, toDisplayString(item.desc), 1),
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          size: "sm",
                                          color: "primary",
                                          href: item.url,
                                          target: "_blank",
                                          icon: "open_in_new",
                                          label: "前往連結"
                                        }, null, 8, ["href"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(subsidies, (item, i) => {
                                  return createVNode(_component_q_expansion_item, {
                                    key: i,
                                    label: item.name
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "q-mb-sm" }, toDisplayString(item.desc), 1),
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        size: "sm",
                                        color: "primary",
                                        href: item.url,
                                        target: "_blank",
                                        icon: "open_in_new",
                                        label: "前往連結"
                                      }, null, 8, ["href"])
                                    ]),
                                    _: 2
                                  }, 1032, ["label"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "text-h6" }, "補助與保險資訊"),
                          createVNode(_component_q_list, {
                            bordered: "",
                            class: "rounded-borders q-mt-md"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(subsidies, (item, i) => {
                                return createVNode(_component_q_expansion_item, {
                                  key: i,
                                  label: item.name
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "q-mb-sm" }, toDisplayString(item.desc), 1),
                                    createVNode(_component_q_btn, {
                                      flat: "",
                                      size: "sm",
                                      color: "primary",
                                      href: item.url,
                                      target: "_blank",
                                      icon: "open_in_new",
                                      label: "前往連結"
                                    }, null, 8, ["href"])
                                  ]),
                                  _: 2
                                }, 1032, ["label"]);
                              }), 64))
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
                        createVNode("div", { class: "text-h6" }, "補助與保險資訊"),
                        createVNode(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders q-mt-md"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(subsidies, (item, i) => {
                              return createVNode(_component_q_expansion_item, {
                                key: i,
                                label: item.name
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "q-mb-sm" }, toDisplayString(item.desc), 1),
                                  createVNode(_component_q_btn, {
                                    flat: "",
                                    size: "sm",
                                    color: "primary",
                                    href: item.url,
                                    target: "_blank",
                                    icon: "open_in_new",
                                    label: "前往連結"
                                  }, null, 8, ["href"])
                                ]),
                                _: 2
                              }, 1032, ["label"]);
                            }), 64))
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
              createVNode(_component_q_card, {
                flat: "",
                bordered: "",
                class: "info-card"
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6" }, "補助與保險資訊"),
                      createVNode(_component_q_list, {
                        bordered: "",
                        class: "rounded-borders q-mt-md"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(subsidies, (item, i) => {
                            return createVNode(_component_q_expansion_item, {
                              key: i,
                              label: item.name
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "q-mb-sm" }, toDisplayString(item.desc), 1),
                                createVNode(_component_q_btn, {
                                  flat: "",
                                  size: "sm",
                                  color: "primary",
                                  href: item.url,
                                  target: "_blank",
                                  icon: "open_in_new",
                                  label: "前往連結"
                                }, null, 8, ["href"])
                              ]),
                              _: 2
                            }, 1032, ["label"]);
                          }), 64))
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
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/info/subsidy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=subsidy-DPbebMeR.mjs.map
