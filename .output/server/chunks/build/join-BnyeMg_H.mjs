import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, u as usePageSeo, a as __nuxt_component_1, b as __nuxt_component_2, d as __nuxt_component_3$2, e as __nuxt_component_5, f as __nuxt_component_6, g as __nuxt_component_1$1, h as __nuxt_component_8, i as __nuxt_component_5$2, j as __nuxt_component_9$1, c as __nuxt_component_3 } from './server.mjs';
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
  __name: "join",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("成為看護員 - DogFriend", "加入我們的看護團隊，展現您的專業");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_item = __nuxt_component_5;
      const _component_q_item_section = __nuxt_component_6;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_item_label = __nuxt_component_8;
      const _component_q_separator = __nuxt_component_5$2;
      const _component_q_card_actions = __nuxt_component_9$1;
      const _component_q_btn = __nuxt_component_3;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md flex flex-center" }, _attrs), {
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
                        _push4(`<div class="text-h6 q-mb-sm" data-v-d14c4a4f${_scopeId3}>成為看護員</div><p data-v-d14c4a4f${_scopeId3}>加入 DogFriend 團隊，發揮您的照護專長。</p>`);
                        _push4(ssrRenderComponent(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders q-mt-md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_icon, {
                                            name: "person_add",
                                            color: "primary"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: "person_add",
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
                                                _push8(`註冊帳號`);
                                              } else {
                                                return [
                                                  createTextVNode("註冊帳號")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`建立個人檔案並填寫基本資料`);
                                              } else {
                                                return [
                                                  createTextVNode("建立個人檔案並填寫基本資料")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("註冊帳號")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("建立個人檔案並填寫基本資料")
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
                                            name: "person_add",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("註冊帳號")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("建立個人檔案並填寫基本資料")
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
                                            name: "assignment_turned_in",
                                            color: "primary"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: "assignment_turned_in",
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
                                                _push8(`資格審核`);
                                              } else {
                                                return [
                                                  createTextVNode("資格審核")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`提交證照與經驗以供審查`);
                                              } else {
                                                return [
                                                  createTextVNode("提交證照與經驗以供審查")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("資格審核")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("提交證照與經驗以供審查")
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
                                            name: "assignment_turned_in",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("資格審核")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("提交證照與經驗以供審查")
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
                                            name: "school",
                                            color: "primary"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: "school",
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
                                                _push8(`完成培訓`);
                                              } else {
                                                return [
                                                  createTextVNode("完成培訓")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`線上課程快速上手服務流程`);
                                              } else {
                                                return [
                                                  createTextVNode("線上課程快速上手服務流程")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("完成培訓")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("線上課程快速上手服務流程")
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
                                            name: "school",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("完成培訓")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("線上課程快速上手服務流程")
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
                                          name: "person_add",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("註冊帳號")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("建立個人檔案並填寫基本資料")
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
                                          name: "assignment_turned_in",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("資格審核")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("提交證照與經驗以供審查")
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
                                          name: "school",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("完成培訓")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("線上課程快速上手服務流程")
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
                          createVNode("div", { class: "text-h6 q-mb-sm" }, "成為看護員"),
                          createVNode("p", null, "加入 DogFriend 團隊，發揮您的照護專長。"),
                          createVNode(_component_q_list, {
                            bordered: "",
                            class: "rounded-borders q-mt-md"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "person_add",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("註冊帳號")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("建立個人檔案並填寫基本資料")
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
                                        name: "assignment_turned_in",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("資格審核")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("提交證照與經驗以供審查")
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
                                        name: "school",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("完成培訓")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("線上課程快速上手服務流程")
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
                  _push3(ssrRenderComponent(_component_q_separator, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_card_actions, { align: "right" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_btn, {
                          color: "primary",
                          to: "/auth/register",
                          label: "立即加入"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_btn, {
                            color: "primary",
                            to: "/auth/register",
                            label: "立即加入"
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
                        createVNode("div", { class: "text-h6 q-mb-sm" }, "成為看護員"),
                        createVNode("p", null, "加入 DogFriend 團隊，發揮您的照護專長。"),
                        createVNode(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders q-mt-md"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: "person_add",
                                      color: "primary"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("註冊帳號")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_label, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("建立個人檔案並填寫基本資料")
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
                                      name: "assignment_turned_in",
                                      color: "primary"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("資格審核")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_label, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("提交證照與經驗以供審查")
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
                                      name: "school",
                                      color: "primary"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("完成培訓")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_label, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("線上課程快速上手服務流程")
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
                    }),
                    createVNode(_component_q_separator),
                    createVNode(_component_q_card_actions, { align: "right" }, {
                      default: withCtx(() => [
                        createVNode(_component_q_btn, {
                          color: "primary",
                          to: "/auth/register",
                          label: "立即加入"
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
                      createVNode("div", { class: "text-h6 q-mb-sm" }, "成為看護員"),
                      createVNode("p", null, "加入 DogFriend 團隊，發揮您的照護專長。"),
                      createVNode(_component_q_list, {
                        bordered: "",
                        class: "rounded-borders q-mt-md"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_q_item_section, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_icon, {
                                    name: "person_add",
                                    color: "primary"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item_section, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("註冊帳號")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_label, { caption: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode("建立個人檔案並填寫基本資料")
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
                                    name: "assignment_turned_in",
                                    color: "primary"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item_section, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("資格審核")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_label, { caption: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode("提交證照與經驗以供審查")
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
                                    name: "school",
                                    color: "primary"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item_section, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("完成培訓")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_label, { caption: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode("線上課程快速上手服務流程")
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
                  }),
                  createVNode(_component_q_separator),
                  createVNode(_component_q_card_actions, { align: "right" }, {
                    default: withCtx(() => [
                      createVNode(_component_q_btn, {
                        color: "primary",
                        to: "/auth/register",
                        label: "立即加入"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/join.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const join = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d14c4a4f"]]);

export { join as default };
//# sourceMappingURL=join-BnyeMg_H.mjs.map
