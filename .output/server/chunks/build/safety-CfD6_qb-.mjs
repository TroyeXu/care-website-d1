import { mergeProps, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as usePageSeo, a as __nuxt_component_1, b as __nuxt_component_2, d as __nuxt_component_3$2 } from './server.mjs';
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
  __name: "safety",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("安全措施 - DogFriend", "瞭解我們對看護與客戶的安全保障");
    const safeties = [
      { title: "完整背景調查", desc: "所有看護員皆通過身份與犯罪紀錄查核" },
      { title: "定期教育訓練", desc: "持續進修並更新照護技巧" },
      { title: "24小時客服支援", desc: "任何突發狀況皆可即時聯繫我們" },
      { title: "嚴格健康監測", desc: "人員須定期健康檢查，確保服務品質" },
      { title: "保密個資管理", desc: "遵守個人資料保護法，提供完善資訊安全" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_expansion_item = __nuxt_component_4$1;
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
                        _push4(`<div class="text-h6"${_scopeId3}>安全措施</div>`);
                        _push4(ssrRenderComponent(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders q-mt-md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(safeties, (s, i) => {
                                _push5(ssrRenderComponent(_component_q_expansion_item, {
                                  key: i,
                                  label: s.title
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(s.desc)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(s.desc), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(safeties, (s, i) => {
                                  return createVNode(_component_q_expansion_item, {
                                    key: i,
                                    label: s.title
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(s.desc), 1)
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
                          createVNode("div", { class: "text-h6" }, "安全措施"),
                          createVNode(_component_q_list, {
                            bordered: "",
                            class: "rounded-borders q-mt-md"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(safeties, (s, i) => {
                                return createVNode(_component_q_expansion_item, {
                                  key: i,
                                  label: s.title
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(s.desc), 1)
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
                        createVNode("div", { class: "text-h6" }, "安全措施"),
                        createVNode(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders q-mt-md"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(safeties, (s, i) => {
                              return createVNode(_component_q_expansion_item, {
                                key: i,
                                label: s.title
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(s.desc), 1)
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
                      createVNode("div", { class: "text-h6" }, "安全措施"),
                      createVNode(_component_q_list, {
                        bordered: "",
                        class: "rounded-borders q-mt-md"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(safeties, (s, i) => {
                            return createVNode(_component_q_expansion_item, {
                              key: i,
                              label: s.title
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(s.desc), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/info/safety.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=safety-CfD6_qb-.mjs.map
