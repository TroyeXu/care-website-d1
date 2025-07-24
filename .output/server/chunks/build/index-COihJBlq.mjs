import { mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as usePageSeo, k as useHead, l as useRuntimeConfig, d as __nuxt_component_3$2, e as __nuxt_component_5, f as __nuxt_component_6, g as __nuxt_component_1$1, h as __nuxt_component_8, a as __nuxt_component_1, b as __nuxt_component_2, m as __nuxt_component_5$1 } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo(
      "首頁 - DogFriend 專業看護媒合平台",
      "快速找到可靠看護，了解我們的服務與優勢"
    );
    const config = useRuntimeConfig();
    useHead({
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "DogFriend",
            url: config.public.baseUrl
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_item = __nuxt_component_5;
      const _component_q_item_section = __nuxt_component_6;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_item_label = __nuxt_component_8;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_badge = __nuxt_component_5$1;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="q-mb-lg" data-v-126555e6${_scopeId}><h2 class="text-h5 q-mb-md" data-v-126555e6${_scopeId}>${ssrInterpolate(_ctx.$t("index.ourServices"))}</h2>`);
            _push2(ssrRenderComponent(_component_q_list, {
              bordered: "",
              class: "rounded-borders bg-white"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_icon, {
                                name: "home",
                                color: "primary"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_icon, {
                                  name: "home",
                                  color: "primary"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_item_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_item_label, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`居家照顧`);
                                  } else {
                                    return [
                                      createTextVNode("居家照顧")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`提供到府看護與生活協助`);
                                  } else {
                                    return [
                                      createTextVNode("提供到府看護與生活協助")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_item_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("居家照顧")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_label, { caption: "" }, {
                                  default: withCtx(() => [
                                    createTextVNode("提供到府看護與生活協助")
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
                          createVNode(_component_q_item_section, { avatar: "" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_icon, {
                                name: "home",
                                color: "primary"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_item_section, null, {
                            default: withCtx(() => [
                              createVNode(_component_q_item_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("居家照顧")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item_label, { caption: "" }, {
                                default: withCtx(() => [
                                  createTextVNode("提供到府看護與生活協助")
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
                  _push3(ssrRenderComponent(_component_q_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_icon, {
                                name: "local_hospital",
                                color: "primary"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_icon, {
                                  name: "local_hospital",
                                  color: "primary"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_item_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_item_label, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`醫院看護`);
                                  } else {
                                    return [
                                      createTextVNode("醫院看護")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`協助住院期間的照護需求`);
                                  } else {
                                    return [
                                      createTextVNode("協助住院期間的照護需求")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_item_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("醫院看護")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_label, { caption: "" }, {
                                  default: withCtx(() => [
                                    createTextVNode("協助住院期間的照護需求")
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
                          createVNode(_component_q_item_section, { avatar: "" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_icon, {
                                name: "local_hospital",
                                color: "primary"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_item_section, null, {
                            default: withCtx(() => [
                              createVNode(_component_q_item_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("醫院看護")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item_label, { caption: "" }, {
                                default: withCtx(() => [
                                  createTextVNode("協助住院期間的照護需求")
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
                  _push3(ssrRenderComponent(_component_q_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_icon, {
                                name: "flight",
                                color: "primary"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_icon, {
                                  name: "flight",
                                  color: "primary"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_item_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_item_label, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`外籍看護`);
                                  } else {
                                    return [
                                      createTextVNode("外籍看護")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`具備多語溝通能力的專業看護`);
                                  } else {
                                    return [
                                      createTextVNode("具備多語溝通能力的專業看護")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_item_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("外籍看護")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_label, { caption: "" }, {
                                  default: withCtx(() => [
                                    createTextVNode("具備多語溝通能力的專業看護")
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
                          createVNode(_component_q_item_section, { avatar: "" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_icon, {
                                name: "flight",
                                color: "primary"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_item_section, null, {
                            default: withCtx(() => [
                              createVNode(_component_q_item_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("外籍看護")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item_label, { caption: "" }, {
                                default: withCtx(() => [
                                  createTextVNode("具備多語溝通能力的專業看護")
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
                    createVNode(_component_q_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_q_item_section, { avatar: "" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_icon, {
                              name: "home",
                              color: "primary"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_item_section, null, {
                          default: withCtx(() => [
                            createVNode(_component_q_item_label, null, {
                              default: withCtx(() => [
                                createTextVNode("居家照顧")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_item_label, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("提供到府看護與生活協助")
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
                              name: "local_hospital",
                              color: "primary"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_item_section, null, {
                          default: withCtx(() => [
                            createVNode(_component_q_item_label, null, {
                              default: withCtx(() => [
                                createTextVNode("醫院看護")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_item_label, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("協助住院期間的照護需求")
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
                              name: "flight",
                              color: "primary"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_item_section, null, {
                          default: withCtx(() => [
                            createVNode(_component_q_item_label, null, {
                              default: withCtx(() => [
                                createTextVNode("外籍看護")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_item_label, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("具備多語溝通能力的專業看護")
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
            _push2(`</div><div data-v-126555e6${_scopeId}><h2 class="text-h5 q-mb-md" data-v-126555e6${_scopeId}>${ssrInterpolate(_ctx.$t("index.whyUs"))}</h2>`);
            _push2(ssrRenderComponent(_component_q_card, {
              class: "q-mb-sm",
              bordered: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6" data-v-126555e6${_scopeId3}>快速媒合</div><div class="text-subtitle2" data-v-126555e6${_scopeId3}>完善系統立即找到合適看護</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6" }, "快速媒合"),
                          createVNode("div", { class: "text-subtitle2" }, "完善系統立即找到合適看護")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6" }, "快速媒合"),
                        createVNode("div", { class: "text-subtitle2" }, "完善系統立即找到合適看護")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_card, {
              class: "q-mb-sm",
              bordered: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6" data-v-126555e6${_scopeId3}>專業篩選</div><div class="text-subtitle2" data-v-126555e6${_scopeId3}>嚴格背景審查與專業訓練</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6" }, "專業篩選"),
                          createVNode("div", { class: "text-subtitle2" }, "嚴格背景審查與專業訓練")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6" }, "專業篩選"),
                        createVNode("div", { class: "text-subtitle2" }, "嚴格背景審查與專業訓練")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-center q-mt-md" data-v-126555e6${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_badge, {
              color: "primary",
              class: "q-pa-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`98% 滿意度`);
                } else {
                  return [
                    createTextVNode("98% 滿意度")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "q-mb-lg" }, [
                createVNode("h2", { class: "text-h5 q-mb-md" }, toDisplayString(_ctx.$t("index.ourServices")), 1),
                createVNode(_component_q_list, {
                  bordered: "",
                  class: "rounded-borders bg-white"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_q_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_q_item_section, { avatar: "" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_icon, {
                              name: "home",
                              color: "primary"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_item_section, null, {
                          default: withCtx(() => [
                            createVNode(_component_q_item_label, null, {
                              default: withCtx(() => [
                                createTextVNode("居家照顧")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_item_label, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("提供到府看護與生活協助")
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
                              name: "local_hospital",
                              color: "primary"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_item_section, null, {
                          default: withCtx(() => [
                            createVNode(_component_q_item_label, null, {
                              default: withCtx(() => [
                                createTextVNode("醫院看護")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_item_label, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("協助住院期間的照護需求")
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
                              name: "flight",
                              color: "primary"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_item_section, null, {
                          default: withCtx(() => [
                            createVNode(_component_q_item_label, null, {
                              default: withCtx(() => [
                                createTextVNode("外籍看護")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_item_label, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("具備多語溝通能力的專業看護")
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
              createVNode("div", null, [
                createVNode("h2", { class: "text-h5 q-mb-md" }, toDisplayString(_ctx.$t("index.whyUs")), 1),
                createVNode(_component_q_card, {
                  class: "q-mb-sm",
                  bordered: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6" }, "快速媒合"),
                        createVNode("div", { class: "text-subtitle2" }, "完善系統立即找到合適看護")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_q_card, {
                  class: "q-mb-sm",
                  bordered: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6" }, "專業篩選"),
                        createVNode("div", { class: "text-subtitle2" }, "嚴格背景審查與專業訓練")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "text-center q-mt-md" }, [
                  createVNode(_component_q_badge, {
                    color: "primary",
                    class: "q-pa-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("98% 滿意度")
                    ]),
                    _: 1
                  })
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-126555e6"]]);

export { index as default };
//# sourceMappingURL=index-COihJBlq.mjs.map
