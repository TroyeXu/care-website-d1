import { mergeProps, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from 'vue';
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
  __name: "advantages",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("服務優勢 - DogFriend", "了解選擇 DogFriend 的四大優勢");
    const advantages = [
      { title: "快速媒合", desc: "透過演算法即時找到合適看護", icon: "bolt" },
      { title: "專業審核", desc: "嚴格把關每位看護的資格", icon: "verified" },
      { title: "彈性排班", desc: "依照需求安排看護時段", icon: "schedule" },
      { title: "完善保障", desc: "客服與意外保險讓您更放心", icon: "security" }
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
                        _push4(`<div class="text-h6 q-mb-sm"${_scopeId3}>服務優勢</div><p class="text-subtitle2 q-mb-md"${_scopeId3}>選擇我們平台的四大理由</p>`);
                        _push4(ssrRenderComponent(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(advantages, (adv, i) => {
                                _push5(ssrRenderComponent(_component_q_expansion_item, {
                                  key: i,
                                  label: adv.title,
                                  icon: adv.icon
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(adv.desc)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(adv.desc), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(advantages, (adv, i) => {
                                  return createVNode(_component_q_expansion_item, {
                                    key: i,
                                    label: adv.title,
                                    icon: adv.icon
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(adv.desc), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["label", "icon"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="text-center q-mt-md"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_btn, {
                          color: "primary",
                          to: "/auth/register",
                          label: "立即體驗"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-sm" }, "服務優勢"),
                          createVNode("p", { class: "text-subtitle2 q-mb-md" }, "選擇我們平台的四大理由"),
                          createVNode(_component_q_list, {
                            bordered: "",
                            class: "rounded-borders"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(advantages, (adv, i) => {
                                return createVNode(_component_q_expansion_item, {
                                  key: i,
                                  label: adv.title,
                                  icon: adv.icon
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(adv.desc), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label", "icon"]);
                              }), 64))
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "text-center q-mt-md" }, [
                            createVNode(_component_q_btn, {
                              color: "primary",
                              to: "/auth/register",
                              label: "立即體驗"
                            })
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
                        createVNode("div", { class: "text-h6 q-mb-sm" }, "服務優勢"),
                        createVNode("p", { class: "text-subtitle2 q-mb-md" }, "選擇我們平台的四大理由"),
                        createVNode(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(advantages, (adv, i) => {
                              return createVNode(_component_q_expansion_item, {
                                key: i,
                                label: adv.title,
                                icon: adv.icon
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(adv.desc), 1)
                                ]),
                                _: 2
                              }, 1032, ["label", "icon"]);
                            }), 64))
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "text-center q-mt-md" }, [
                          createVNode(_component_q_btn, {
                            color: "primary",
                            to: "/auth/register",
                            label: "立即體驗"
                          })
                        ])
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
                      createVNode("div", { class: "text-h6 q-mb-sm" }, "服務優勢"),
                      createVNode("p", { class: "text-subtitle2 q-mb-md" }, "選擇我們平台的四大理由"),
                      createVNode(_component_q_list, {
                        bordered: "",
                        class: "rounded-borders"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(advantages, (adv, i) => {
                            return createVNode(_component_q_expansion_item, {
                              key: i,
                              label: adv.title,
                              icon: adv.icon
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(adv.desc), 1)
                              ]),
                              _: 2
                            }, 1032, ["label", "icon"]);
                          }), 64))
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "text-center q-mt-md" }, [
                        createVNode(_component_q_btn, {
                          color: "primary",
                          to: "/auth/register",
                          label: "立即體驗"
                        })
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
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/info/advantages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=advantages-MGcE-jqa.mjs.map
