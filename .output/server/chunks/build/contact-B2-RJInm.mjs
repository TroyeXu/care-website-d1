import { _ as _export_sfc, u as usePageSeo, o as useQuasar, O as useNuxtApp, l as useRuntimeConfig, k as useHead, a as __nuxt_component_1, b as __nuxt_component_2, g as __nuxt_component_1$1, i as __nuxt_component_5$2, d as __nuxt_component_3$2, e as __nuxt_component_5, f as __nuxt_component_6, h as __nuxt_component_8, q as __nuxt_component_4, c as __nuxt_component_3, P as navigateTo } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { F as Form, c as contactSchema, a as Field } from './validationSchemas-NSZeyp_z.mjs';
import { u as useApiService } from './useApiService-Bqe0bsFu.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_8$1 } from '../_/QSelect.mjs';
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
import 'yup';
import './useApiConfig-D0iRs2xG.mjs';
import '../_/QChip.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("聯繫我們 - 護理服務平台", "歡迎透過電話或電子郵件與我們聯絡，我們很樂意為您提供協助");
    const $q = useQuasar();
    const apiService = useApiService();
    const loading = ref(false);
    const subjectOptions = [
      { label: "服務諮詢", value: "服務諮詢" },
      { label: "預約問題", value: "預約問題" },
      { label: "費用問題", value: "費用問題" },
      { label: "帳戶問題", value: "帳戶問題" },
      { label: "技術支援", value: "技術支援" },
      { label: "投訴建議", value: "投訴建議" },
      { label: "合作洽談", value: "合作洽談" },
      { label: "其他問題", value: "其他問題" }
    ];
    const handleSubmit = async (values) => {
      loading.value = true;
      try {
        const response = await apiService.submitContactForm(values);
        $q.notify({
          type: "positive",
          message: response.message || "您的訊息已成功送出，我們會盡快回覆您",
          icon: "check_circle",
          timeout: 5e3,
          actions: [
            {
              label: "確定",
              color: "white",
              handler: () => {
              }
            }
          ]
        });
        $q.dialog({
          title: "訊息已送出",
          message: "感謝您的聯絡，我們已收到您的訊息，將在24小時內回覆您。",
          ok: {
            color: "primary",
            label: "確定"
          }
        }).onOk(() => {
        });
      } catch (error) {
        console.error("送出聯絡表單失敗:", error);
        $q.notify({
          type: "negative",
          message: error.message || "送出失敗，請稍後再試",
          icon: "error",
          timeout: 5e3
        });
      } finally {
        loading.value = false;
      }
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
            "@type": "ContactPage",
            name: "聯繫我們 - 護理服務平台",
            url: baseUrl + $route.fullPath,
            description: "歡迎透過電話或電子郵件與我們聯絡，我們很樂意為您提供協助",
            provider: {
              "@type": "Organization",
              name: "護理服務平台",
              telephone: "02-1234-5678",
              email: "service@care-platform.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "信義路五段7號35樓",
                addressLocality: "信義區",
                addressRegion: "台北市",
                addressCountry: "TW"
              }
            }
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_separator = __nuxt_component_5$2;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_item = __nuxt_component_5;
      const _component_q_item_section = __nuxt_component_6;
      const _component_q_item_label = __nuxt_component_8;
      const _component_q_input = __nuxt_component_4;
      const _component_q_select = __nuxt_component_8$1;
      const _component_q_btn = __nuxt_component_3;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row justify-center" data-v-932a52c8${_scopeId}><div class="col-12 col-md-8 col-lg-6" data-v-932a52c8${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: "",
              class: "contact-card"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h5 text-primary q-mb-sm" data-v-932a52c8${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "contact_support",
                          size: "md",
                          class: "q-mr-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(` 聯繫我們 </div><div class="text-body2 text-grey-7" data-v-932a52c8${_scopeId3}> 我們很樂意為您提供協助，請選擇最適合的聯絡方式 </div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h5 text-primary q-mb-sm" }, [
                            createVNode(_component_q_icon, {
                              name: "contact_support",
                              size: "md",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 聯繫我們 ")
                          ]),
                          createVNode("div", { class: "text-body2 text-grey-7" }, " 我們很樂意為您提供協助，請選擇最適合的聯絡方式 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_separator, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-932a52c8${_scopeId3}>聯絡資訊</div>`);
                        _push4(ssrRenderComponent(_component_q_list, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_icon, {
                                            name: "phone",
                                            color: "primary",
                                            size: "md"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: "phone",
                                              color: "primary",
                                              size: "md"
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
                                                _push8(`客服電話`);
                                              } else {
                                                return [
                                                  createTextVNode("客服電話")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`02-1234-5678`);
                                              } else {
                                                return [
                                                  createTextVNode("02-1234-5678")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_q_item_label, {
                                            caption: "",
                                            class: "text-grey-6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`服務時間：週一至週五 09:00-18:00`);
                                              } else {
                                                return [
                                                  createTextVNode("服務時間：週一至週五 09:00-18:00")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("客服電話")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("02-1234-5678")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, {
                                              caption: "",
                                              class: "text-grey-6"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("服務時間：週一至週五 09:00-18:00")
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
                                            name: "phone",
                                            color: "primary",
                                            size: "md"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("客服電話")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("02-1234-5678")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, {
                                            caption: "",
                                            class: "text-grey-6"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("服務時間：週一至週五 09:00-18:00")
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
                                            name: "email",
                                            color: "primary",
                                            size: "md"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: "email",
                                              color: "primary",
                                              size: "md"
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
                                                _push8(`電子郵件`);
                                              } else {
                                                return [
                                                  createTextVNode("電子郵件")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`service@care-platform.com`);
                                              } else {
                                                return [
                                                  createTextVNode("service@care-platform.com")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_q_item_label, {
                                            caption: "",
                                            class: "text-grey-6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`我們會在24小時內回覆您`);
                                              } else {
                                                return [
                                                  createTextVNode("我們會在24小時內回覆您")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("電子郵件")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("service@care-platform.com")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, {
                                              caption: "",
                                              class: "text-grey-6"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("我們會在24小時內回覆您")
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
                                            name: "email",
                                            color: "primary",
                                            size: "md"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("電子郵件")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("service@care-platform.com")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, {
                                            caption: "",
                                            class: "text-grey-6"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("我們會在24小時內回覆您")
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
                                            name: "location_on",
                                            color: "primary",
                                            size: "md"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: "location_on",
                                              color: "primary",
                                              size: "md"
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
                                                _push8(`服務地址`);
                                              } else {
                                                return [
                                                  createTextVNode("服務地址")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`台北市信義區信義路五段7號`);
                                              } else {
                                                return [
                                                  createTextVNode("台北市信義區信義路五段7號")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_q_item_label, {
                                            caption: "",
                                            class: "text-grey-6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`台北101大樓35樓`);
                                              } else {
                                                return [
                                                  createTextVNode("台北101大樓35樓")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("服務地址")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("台北市信義區信義路五段7號")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, {
                                              caption: "",
                                              class: "text-grey-6"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("台北101大樓35樓")
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
                                            color: "primary",
                                            size: "md"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("服務地址")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("台北市信義區信義路五段7號")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, {
                                            caption: "",
                                            class: "text-grey-6"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("台北101大樓35樓")
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
                                          name: "phone",
                                          color: "primary",
                                          size: "md"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("客服電話")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("02-1234-5678")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, {
                                          caption: "",
                                          class: "text-grey-6"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("服務時間：週一至週五 09:00-18:00")
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
                                          name: "email",
                                          color: "primary",
                                          size: "md"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("電子郵件")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("service@care-platform.com")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, {
                                          caption: "",
                                          class: "text-grey-6"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("我們會在24小時內回覆您")
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
                                          name: "location_on",
                                          color: "primary",
                                          size: "md"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("服務地址")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("台北市信義區信義路五段7號")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, {
                                          caption: "",
                                          class: "text-grey-6"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("台北101大樓35樓")
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
                          createVNode("div", { class: "text-h6 q-mb-md" }, "聯絡資訊"),
                          createVNode(_component_q_list, null, {
                            default: withCtx(() => [
                              createVNode(_component_q_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "phone",
                                        color: "primary",
                                        size: "md"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("客服電話")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("02-1234-5678")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, {
                                        caption: "",
                                        class: "text-grey-6"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("服務時間：週一至週五 09:00-18:00")
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
                                        name: "email",
                                        color: "primary",
                                        size: "md"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("電子郵件")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("service@care-platform.com")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, {
                                        caption: "",
                                        class: "text-grey-6"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("我們會在24小時內回覆您")
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
                                        name: "location_on",
                                        color: "primary",
                                        size: "md"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("服務地址")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("台北市信義區信義路五段7號")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, {
                                        caption: "",
                                        class: "text-grey-6"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("台北101大樓35樓")
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
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-932a52c8${_scopeId3}>線上聯絡</div>`);
                        _push4(ssrRenderComponent(unref(Form), {
                          "validation-schema": unref(contactSchema),
                          onSubmit: handleSubmit
                        }, {
                          default: withCtx(({ errors, isSubmitting }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="row q-gutter-md q-mb-md" data-v-932a52c8${_scopeId4}><div class="col-12 col-sm-6" data-v-932a52c8${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "name" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "姓名 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      placeholder: "請輸入您的姓名"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "姓名 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        placeholder: "請輸入您的姓名"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="col-12 col-sm-6" data-v-932a52c8${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "email" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "電子郵件 *",
                                      type: "email",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      placeholder: "example@email.com"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件 *",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        placeholder: "example@email.com"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div><div class="row q-gutter-md q-mb-md" data-v-932a52c8${_scopeId4}><div class="col-12 col-sm-6" data-v-932a52c8${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "phone" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "電話號碼 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      placeholder: "09XXXXXXXX"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電話號碼 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        placeholder: "09XXXXXXXX"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="col-12 col-sm-6" data-v-932a52c8${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "subject" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_select, mergeProps(field, {
                                      label: "聯絡主題 *",
                                      options: subjectOptions,
                                      outlined: "",
                                      dense: "",
                                      "emit-value": "",
                                      "map-options": "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_select, mergeProps(field, {
                                        label: "聯絡主題 *",
                                        options: subjectOptions,
                                        outlined: "",
                                        dense: "",
                                        "emit-value": "",
                                        "map-options": "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div><div class="row q-gutter-md q-mb-lg" data-v-932a52c8${_scopeId4}><div class="col-12" data-v-932a52c8${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "message" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "詳細訊息 *",
                                      type: "textarea",
                                      outlined: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      rows: "5",
                                      placeholder: "請詳細描述您的問題或需求，我們會盡快為您解答"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "詳細訊息 *",
                                        type: "textarea",
                                        outlined: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        rows: "5",
                                        placeholder: "請詳細描述您的問題或需求，我們會盡快為您解答"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div><div class="text-right" data-v-932a52c8${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                size: "lg",
                                loading: isSubmitting || loading.value,
                                disable: Object.keys(errors).length > 0,
                                icon: "send"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(isSubmitting ? "送出中..." : "送出訊息")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(isSubmitting ? "送出中..." : "送出訊息"), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col-12 col-sm-6" }, [
                                    createVNode(unref(Field), { name: "name" }, {
                                      default: withCtx(({ field, errorMessage }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "姓名 *",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage,
                                          "error-message": errorMessage,
                                          placeholder: "請輸入您的姓名"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "col-12 col-sm-6" }, [
                                    createVNode(unref(Field), { name: "email" }, {
                                      default: withCtx(({ field, errorMessage }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "電子郵件 *",
                                          type: "email",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage,
                                          "error-message": errorMessage,
                                          placeholder: "example@email.com"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col-12 col-sm-6" }, [
                                    createVNode(unref(Field), { name: "phone" }, {
                                      default: withCtx(({ field, errorMessage }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "電話號碼 *",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage,
                                          "error-message": errorMessage,
                                          placeholder: "09XXXXXXXX"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "col-12 col-sm-6" }, [
                                    createVNode(unref(Field), { name: "subject" }, {
                                      default: withCtx(({ field, errorMessage }) => [
                                        createVNode(_component_q_select, mergeProps(field, {
                                          label: "聯絡主題 *",
                                          options: subjectOptions,
                                          outlined: "",
                                          dense: "",
                                          "emit-value": "",
                                          "map-options": "",
                                          error: !!errorMessage,
                                          "error-message": errorMessage
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                                  createVNode("div", { class: "col-12" }, [
                                    createVNode(unref(Field), { name: "message" }, {
                                      default: withCtx(({ field, errorMessage }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "詳細訊息 *",
                                          type: "textarea",
                                          outlined: "",
                                          error: !!errorMessage,
                                          "error-message": errorMessage,
                                          rows: "5",
                                          placeholder: "請詳細描述您的問題或需求，我們會盡快為您解答"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "text-right" }, [
                                  createVNode(_component_q_btn, {
                                    type: "submit",
                                    color: "primary",
                                    size: "lg",
                                    loading: isSubmitting || loading.value,
                                    disable: Object.keys(errors).length > 0,
                                    icon: "send"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(isSubmitting ? "送出中..." : "送出訊息"), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["loading", "disable"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "線上聯絡"),
                          createVNode(unref(Form), {
                            "validation-schema": unref(contactSchema),
                            onSubmit: handleSubmit
                          }, {
                            default: withCtx(({ errors, isSubmitting }) => [
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(unref(Field), { name: "name" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "姓名 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        placeholder: "請輸入您的姓名"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(unref(Field), { name: "email" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件 *",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        placeholder: "example@email.com"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(unref(Field), { name: "phone" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電話號碼 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        placeholder: "09XXXXXXXX"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(unref(Field), { name: "subject" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_select, mergeProps(field, {
                                        label: "聯絡主題 *",
                                        options: subjectOptions,
                                        outlined: "",
                                        dense: "",
                                        "emit-value": "",
                                        "map-options": "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                                createVNode("div", { class: "col-12" }, [
                                  createVNode(unref(Field), { name: "message" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "詳細訊息 *",
                                        type: "textarea",
                                        outlined: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        rows: "5",
                                        placeholder: "請詳細描述您的問題或需求，我們會盡快為您解答"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode(_component_q_btn, {
                                  type: "submit",
                                  color: "primary",
                                  size: "lg",
                                  loading: isSubmitting || loading.value,
                                  disable: Object.keys(errors).length > 0,
                                  icon: "send"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(isSubmitting ? "送出中..." : "送出訊息"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["loading", "disable"])
                              ])
                            ]),
                            _: 1
                          }, 8, ["validation-schema"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h5 text-primary q-mb-sm" }, [
                          createVNode(_component_q_icon, {
                            name: "contact_support",
                            size: "md",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" 聯繫我們 ")
                        ]),
                        createVNode("div", { class: "text-body2 text-grey-7" }, " 我們很樂意為您提供協助，請選擇最適合的聯絡方式 ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_separator),
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6 q-mb-md" }, "聯絡資訊"),
                        createVNode(_component_q_list, null, {
                          default: withCtx(() => [
                            createVNode(_component_q_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: "phone",
                                      color: "primary",
                                      size: "md"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("客服電話")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_label, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("02-1234-5678")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_label, {
                                      caption: "",
                                      class: "text-grey-6"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("服務時間：週一至週五 09:00-18:00")
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
                                      name: "email",
                                      color: "primary",
                                      size: "md"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("電子郵件")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_label, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("service@care-platform.com")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_label, {
                                      caption: "",
                                      class: "text-grey-6"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("我們會在24小時內回覆您")
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
                                      name: "location_on",
                                      color: "primary",
                                      size: "md"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("服務地址")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_label, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("台北市信義區信義路五段7號")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_label, {
                                      caption: "",
                                      class: "text-grey-6"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("台北101大樓35樓")
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
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6 q-mb-md" }, "線上聯絡"),
                        createVNode(unref(Form), {
                          "validation-schema": unref(contactSchema),
                          onSubmit: handleSubmit
                        }, {
                          default: withCtx(({ errors, isSubmitting }) => [
                            createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                              createVNode("div", { class: "col-12 col-sm-6" }, [
                                createVNode(unref(Field), { name: "name" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "姓名 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      placeholder: "請輸入您的姓名"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "col-12 col-sm-6" }, [
                                createVNode(unref(Field), { name: "email" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "電子郵件 *",
                                      type: "email",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      placeholder: "example@email.com"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                              createVNode("div", { class: "col-12 col-sm-6" }, [
                                createVNode(unref(Field), { name: "phone" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "電話號碼 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      placeholder: "09XXXXXXXX"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "col-12 col-sm-6" }, [
                                createVNode(unref(Field), { name: "subject" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_select, mergeProps(field, {
                                      label: "聯絡主題 *",
                                      options: subjectOptions,
                                      outlined: "",
                                      dense: "",
                                      "emit-value": "",
                                      "map-options": "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                              createVNode("div", { class: "col-12" }, [
                                createVNode(unref(Field), { name: "message" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "詳細訊息 *",
                                      type: "textarea",
                                      outlined: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      rows: "5",
                                      placeholder: "請詳細描述您的問題或需求，我們會盡快為您解答"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                size: "lg",
                                loading: isSubmitting || loading.value,
                                disable: Object.keys(errors).length > 0,
                                icon: "send"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(isSubmitting ? "送出中..." : "送出訊息"), 1)
                                ]),
                                _: 2
                              }, 1032, ["loading", "disable"])
                            ])
                          ]),
                          _: 1
                        }, 8, ["validation-schema"])
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
              class: "q-mt-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-932a52c8${_scopeId3}>常見問題</div><div class="row q-gutter-md" data-v-932a52c8${_scopeId3}><div class="col-12 col-sm-6" data-v-932a52c8${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_btn, {
                          flat: "",
                          "no-caps": "",
                          class: "full-width text-left",
                          icon: "help_outline",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/content/blog")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="q-ml-sm" data-v-932a52c8${_scopeId4}><div class="text-weight-medium" data-v-932a52c8${_scopeId4}>使用說明</div><div class="text-caption text-grey-6" data-v-932a52c8${_scopeId4}>如何使用平台服務</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "q-ml-sm" }, [
                                  createVNode("div", { class: "text-weight-medium" }, "使用說明"),
                                  createVNode("div", { class: "text-caption text-grey-6" }, "如何使用平台服務")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="col-12 col-sm-6" data-v-932a52c8${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_btn, {
                          flat: "",
                          "no-caps": "",
                          class: "full-width text-left",
                          icon: "payment",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/info/pricing")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="q-ml-sm" data-v-932a52c8${_scopeId4}><div class="text-weight-medium" data-v-932a52c8${_scopeId4}>收費說明</div><div class="text-caption text-grey-6" data-v-932a52c8${_scopeId4}>服務費用與付款方式</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "q-ml-sm" }, [
                                  createVNode("div", { class: "text-weight-medium" }, "收費說明"),
                                  createVNode("div", { class: "text-caption text-grey-6" }, "服務費用與付款方式")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "常見問題"),
                          createVNode("div", { class: "row q-gutter-md" }, [
                            createVNode("div", { class: "col-12 col-sm-6" }, [
                              createVNode(_component_q_btn, {
                                flat: "",
                                "no-caps": "",
                                class: "full-width text-left",
                                icon: "help_outline",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/content/blog")
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "q-ml-sm" }, [
                                    createVNode("div", { class: "text-weight-medium" }, "使用說明"),
                                    createVNode("div", { class: "text-caption text-grey-6" }, "如何使用平台服務")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            createVNode("div", { class: "col-12 col-sm-6" }, [
                              createVNode(_component_q_btn, {
                                flat: "",
                                "no-caps": "",
                                class: "full-width text-left",
                                icon: "payment",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/info/pricing")
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "q-ml-sm" }, [
                                    createVNode("div", { class: "text-weight-medium" }, "收費說明"),
                                    createVNode("div", { class: "text-caption text-grey-6" }, "服務費用與付款方式")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
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
                        createVNode("div", { class: "text-h6 q-mb-md" }, "常見問題"),
                        createVNode("div", { class: "row q-gutter-md" }, [
                          createVNode("div", { class: "col-12 col-sm-6" }, [
                            createVNode(_component_q_btn, {
                              flat: "",
                              "no-caps": "",
                              class: "full-width text-left",
                              icon: "help_outline",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/content/blog")
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "q-ml-sm" }, [
                                  createVNode("div", { class: "text-weight-medium" }, "使用說明"),
                                  createVNode("div", { class: "text-caption text-grey-6" }, "如何使用平台服務")
                                ])
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "col-12 col-sm-6" }, [
                            createVNode(_component_q_btn, {
                              flat: "",
                              "no-caps": "",
                              class: "full-width text-left",
                              icon: "payment",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/info/pricing")
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "q-ml-sm" }, [
                                  createVNode("div", { class: "text-weight-medium" }, "收費說明"),
                                  createVNode("div", { class: "text-caption text-grey-6" }, "服務費用與付款方式")
                                ])
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "row justify-center" }, [
                createVNode("div", { class: "col-12 col-md-8 col-lg-6" }, [
                  createVNode(_component_q_card, {
                    flat: "",
                    bordered: "",
                    class: "contact-card"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h5 text-primary q-mb-sm" }, [
                            createVNode(_component_q_icon, {
                              name: "contact_support",
                              size: "md",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 聯繫我們 ")
                          ]),
                          createVNode("div", { class: "text-body2 text-grey-7" }, " 我們很樂意為您提供協助，請選擇最適合的聯絡方式 ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_separator),
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "聯絡資訊"),
                          createVNode(_component_q_list, null, {
                            default: withCtx(() => [
                              createVNode(_component_q_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "phone",
                                        color: "primary",
                                        size: "md"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("客服電話")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("02-1234-5678")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, {
                                        caption: "",
                                        class: "text-grey-6"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("服務時間：週一至週五 09:00-18:00")
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
                                        name: "email",
                                        color: "primary",
                                        size: "md"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("電子郵件")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("service@care-platform.com")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, {
                                        caption: "",
                                        class: "text-grey-6"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("我們會在24小時內回覆您")
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
                                        name: "location_on",
                                        color: "primary",
                                        size: "md"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("服務地址")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("台北市信義區信義路五段7號")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, {
                                        caption: "",
                                        class: "text-grey-6"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("台北101大樓35樓")
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
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "線上聯絡"),
                          createVNode(unref(Form), {
                            "validation-schema": unref(contactSchema),
                            onSubmit: handleSubmit
                          }, {
                            default: withCtx(({ errors, isSubmitting }) => [
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(unref(Field), { name: "name" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "姓名 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        placeholder: "請輸入您的姓名"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(unref(Field), { name: "email" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件 *",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        placeholder: "example@email.com"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(unref(Field), { name: "phone" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電話號碼 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        placeholder: "09XXXXXXXX"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(unref(Field), { name: "subject" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_select, mergeProps(field, {
                                        label: "聯絡主題 *",
                                        options: subjectOptions,
                                        outlined: "",
                                        dense: "",
                                        "emit-value": "",
                                        "map-options": "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                                createVNode("div", { class: "col-12" }, [
                                  createVNode(unref(Field), { name: "message" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "詳細訊息 *",
                                        type: "textarea",
                                        outlined: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        rows: "5",
                                        placeholder: "請詳細描述您的問題或需求，我們會盡快為您解答"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode(_component_q_btn, {
                                  type: "submit",
                                  color: "primary",
                                  size: "lg",
                                  loading: isSubmitting || loading.value,
                                  disable: Object.keys(errors).length > 0,
                                  icon: "send"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(isSubmitting ? "送出中..." : "送出訊息"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["loading", "disable"])
                              ])
                            ]),
                            _: 1
                          }, 8, ["validation-schema"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_q_card, {
                    flat: "",
                    bordered: "",
                    class: "q-mt-md"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "常見問題"),
                          createVNode("div", { class: "row q-gutter-md" }, [
                            createVNode("div", { class: "col-12 col-sm-6" }, [
                              createVNode(_component_q_btn, {
                                flat: "",
                                "no-caps": "",
                                class: "full-width text-left",
                                icon: "help_outline",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/content/blog")
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "q-ml-sm" }, [
                                    createVNode("div", { class: "text-weight-medium" }, "使用說明"),
                                    createVNode("div", { class: "text-caption text-grey-6" }, "如何使用平台服務")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            createVNode("div", { class: "col-12 col-sm-6" }, [
                              createVNode(_component_q_btn, {
                                flat: "",
                                "no-caps": "",
                                class: "full-width text-left",
                                icon: "payment",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/info/pricing")
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "q-ml-sm" }, [
                                    createVNode("div", { class: "text-weight-medium" }, "收費說明"),
                                    createVNode("div", { class: "text-caption text-grey-6" }, "服務費用與付款方式")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ])
                        ]),
                        _: 1
                      })
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/support/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-932a52c8"]]);

export { contact as default };
//# sourceMappingURL=contact-B2-RJInm.mjs.map
