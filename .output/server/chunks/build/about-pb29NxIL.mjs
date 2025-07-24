import { mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as usePageSeo, s as useRoute, l as useRuntimeConfig, k as useHead, a as __nuxt_component_1, b as __nuxt_component_2, i as __nuxt_component_5$2, d as __nuxt_component_3$2, e as __nuxt_component_5, f as __nuxt_component_6, g as __nuxt_component_1$1, h as __nuxt_component_8, j as __nuxt_component_9$1, c as __nuxt_component_3 } from './server.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
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

const _sfc_main = {
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo(
      "關於我們 - DogFriend 專業看護媒合平台",
      "認識 DogFriend 團隊與我們的使命"
    );
    const route = useRoute();
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseUrl || "";
    useHead({
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "關於我們 - DogFriend",
            url: baseUrl + route.fullPath,
            description: "認識 DogFriend 團隊與我們的使命"
          })
        }
      ]
    });
    const missions = [
      {
        title: "以人為本",
        desc: "以使用者需求為首要考量",
        icon: "emoji_people"
      },
      {
        title: "專業可信",
        desc: "嚴格審核照護質量",
        icon: "verified_user"
      },
      {
        title: "創新便利",
        desc: "使用科技提升媒合效率",
        icon: "lightbulb"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_separator = __nuxt_component_5$2;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_item = __nuxt_component_5;
      const _component_q_item_section = __nuxt_component_6;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_item_label = __nuxt_component_8;
      const _component_q_card_actions = __nuxt_component_9$1;
      const _component_q_btn = __nuxt_component_3;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md flex flex-center" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: "",
              class: "info-card",
              style: { "max-width": "700px", "width": "100%" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h5 q-mb-sm"${_scopeId3}>關於我們</div><p${_scopeId3}> DogFriend 成立於 2023 年，致力於打造專業又友善的照護媒合平台。 我們秉持「以人為本」的心態，為家庭與照護人員提供最適宜的解決方案。 </p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h5 q-mb-sm" }, "關於我們"),
                          createVNode("p", null, " DogFriend 成立於 2023 年，致力於打造專業又友善的照護媒合平台。 我們秉持「以人為本」的心態，為家庭與照護人員提供最適宜的解決方案。 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_separator, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-sm"${_scopeId3}>願景與使命</div>`);
                        _push4(ssrRenderComponent(_component_q_list, {
                          bordered: "",
                          dense: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(missions, (m) => {
                                _push5(ssrRenderComponent(_component_q_item, {
                                  key: m.title
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_icon, {
                                              name: m.icon,
                                              color: "primary"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_icon, {
                                                name: m.icon,
                                                color: "primary"
                                              }, null, 8, ["name"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_item_label, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(m.title)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(m.title), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(m.desc)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(m.desc), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(m.title), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(m.desc), 1)
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
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: m.icon,
                                              color: "primary"
                                            }, null, 8, ["name"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(m.title), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(m.desc), 1)
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
                                (openBlock(), createBlock(Fragment, null, renderList(missions, (m) => {
                                  return createVNode(_component_q_item, {
                                    key: m.title
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: m.icon,
                                            color: "primary"
                                          }, null, 8, ["name"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(m.title), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(m.desc), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-sm" }, "願景與使命"),
                          createVNode(_component_q_list, {
                            bordered: "",
                            dense: ""
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(missions, (m) => {
                                return createVNode(_component_q_item, {
                                  key: m.title
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: m.icon,
                                          color: "primary"
                                        }, null, 8, ["name"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(m.title), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(m.desc), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_separator, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-sm"${_scopeId3}>專業團隊</div><p${_scopeId3}> 我們的團隊由資深護理師、居家照護專家與人資顧問等專業人士組成， 為你提供 24 小時的指導與諮詢。 </p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-sm" }, "專業團隊"),
                          createVNode("p", null, " 我們的團隊由資深護理師、居家照護專家與人資顧問等專業人士組成， 為你提供 24 小時的指導與諮詢。 ")
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
                          to: "/",
                          label: "回首頁"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "primary",
                            to: "/",
                            label: "回首頁"
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
                        createVNode("div", { class: "text-h5 q-mb-sm" }, "關於我們"),
                        createVNode("p", null, " DogFriend 成立於 2023 年，致力於打造專業又友善的照護媒合平台。 我們秉持「以人為本」的心態，為家庭與照護人員提供最適宜的解決方案。 ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_separator),
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6 q-mb-sm" }, "願景與使命"),
                        createVNode(_component_q_list, {
                          bordered: "",
                          dense: ""
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(missions, (m) => {
                              return createVNode(_component_q_item, {
                                key: m.title
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: m.icon,
                                        color: "primary"
                                      }, null, 8, ["name"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(m.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(m.desc), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_separator),
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6 q-mb-sm" }, "專業團隊"),
                        createVNode("p", null, " 我們的團隊由資深護理師、居家照護專家與人資顧問等專業人士組成， 為你提供 24 小時的指導與諮詢。 ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_card_actions, { align: "right" }, {
                      default: withCtx(() => [
                        createVNode(_component_q_btn, {
                          flat: "",
                          color: "primary",
                          to: "/",
                          label: "回首頁"
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
                class: "info-card",
                style: { "max-width": "700px", "width": "100%" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h5 q-mb-sm" }, "關於我們"),
                      createVNode("p", null, " DogFriend 成立於 2023 年，致力於打造專業又友善的照護媒合平台。 我們秉持「以人為本」的心態，為家庭與照護人員提供最適宜的解決方案。 ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_q_separator),
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6 q-mb-sm" }, "願景與使命"),
                      createVNode(_component_q_list, {
                        bordered: "",
                        dense: ""
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(missions, (m) => {
                            return createVNode(_component_q_item, {
                              key: m.title
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: m.icon,
                                      color: "primary"
                                    }, null, 8, ["name"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(m.title), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_label, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(m.desc), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_q_separator),
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6 q-mb-sm" }, "專業團隊"),
                      createVNode("p", null, " 我們的團隊由資深護理師、居家照護專家與人資顧問等專業人士組成， 為你提供 24 小時的指導與諮詢。 ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_q_card_actions, { align: "right" }, {
                    default: withCtx(() => [
                      createVNode(_component_q_btn, {
                        flat: "",
                        color: "primary",
                        to: "/",
                        label: "回首頁"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/info/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-pb29NxIL.mjs.map
