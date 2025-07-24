import { ref, computed, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as usePageSeo, s as useRoute, l as useRuntimeConfig, k as useHead, a as __nuxt_component_1, b as __nuxt_component_2, q as __nuxt_component_4, d as __nuxt_component_3$2, e as __nuxt_component_5, f as __nuxt_component_6 } from './server.mjs';
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
  __name: "resources",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("資源中心 - DogFriend", "提供各類照護資源與文件下載");
    const articles = [
      "如何選擇適合的看護員",
      "居家照護的注意事項",
      "照護資源補助申請流程"
    ];
    const faqs = [
      { q: "如何預約看護？", a: "可透過搜尋後直接聯繫我們協助排程。" },
      { q: "是否提供試用？", a: "初次服務可享一次免費試用時段。" },
      { q: "收費模式為何？", a: "依照服務項目與時數計費。" }
    ];
    const articleQuery = ref("");
    const faqQuery = ref("");
    const filteredArticles = computed(() => {
      if (!articleQuery.value) return articles;
      return articles.filter((a) => a.includes(articleQuery.value));
    });
    const filteredFaqs = computed(() => {
      if (!faqQuery.value) return faqs;
      return faqs.filter(
        (f) => f.q.includes(faqQuery.value) || f.a.includes(faqQuery.value)
      );
    });
    const route = useRoute();
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseUrl || "";
    useHead({
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            name: "資源中心 - DogFriend",
            url: baseUrl + route.fullPath,
            description: "提供各類照護資源與文件下載",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a }
            }))
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_input = __nuxt_component_4;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_item = __nuxt_component_5;
      const _component_q_item_section = __nuxt_component_6;
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
                        _push4(`<div class="text-h6"${_scopeId3}>照護資源與常見問題</div><div class="q-mt-md text-subtitle2"${_scopeId3}>文章</div>`);
                        _push4(ssrRenderComponent(_component_q_input, {
                          modelValue: articleQuery.value,
                          "onUpdate:modelValue": ($event) => articleQuery.value = $event,
                          label: "搜尋文章",
                          outlined: "",
                          dense: "",
                          class: "q-mb-md"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders q-mb-lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(filteredArticles.value, (a, i) => {
                                _push5(ssrRenderComponent(_component_q_item, { key: i }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(a)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(a), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(a), 1)
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
                                (openBlock(true), createBlock(Fragment, null, renderList(filteredArticles.value, (a, i) => {
                                  return openBlock(), createBlock(_component_q_item, { key: i }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(a), 1)
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
                        _push4(`<div class="text-subtitle2"${_scopeId3}>FAQ</div>`);
                        _push4(ssrRenderComponent(_component_q_input, {
                          modelValue: faqQuery.value,
                          "onUpdate:modelValue": ($event) => faqQuery.value = $event,
                          label: "搜尋FAQ",
                          outlined: "",
                          dense: "",
                          class: "q-mb-md"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(filteredFaqs.value, (q, i) => {
                                _push5(ssrRenderComponent(_component_q_expansion_item, {
                                  key: i,
                                  label: q.q
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(q.a)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(q.a), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(filteredFaqs.value, (q, i) => {
                                  return openBlock(), createBlock(_component_q_expansion_item, {
                                    key: i,
                                    label: q.q
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(q.a), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["label"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "text-h6" }, "照護資源與常見問題"),
                          createVNode("div", { class: "q-mt-md text-subtitle2" }, "文章"),
                          createVNode(_component_q_input, {
                            modelValue: articleQuery.value,
                            "onUpdate:modelValue": ($event) => articleQuery.value = $event,
                            label: "搜尋文章",
                            outlined: "",
                            dense: "",
                            class: "q-mb-md"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_q_list, {
                            bordered: "",
                            class: "rounded-borders q-mb-lg"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(filteredArticles.value, (a, i) => {
                                return openBlock(), createBlock(_component_q_item, { key: i }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(a), 1)
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
                          createVNode("div", { class: "text-subtitle2" }, "FAQ"),
                          createVNode(_component_q_input, {
                            modelValue: faqQuery.value,
                            "onUpdate:modelValue": ($event) => faqQuery.value = $event,
                            label: "搜尋FAQ",
                            outlined: "",
                            dense: "",
                            class: "q-mb-md"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_q_list, {
                            bordered: "",
                            class: "rounded-borders"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(filteredFaqs.value, (q, i) => {
                                return openBlock(), createBlock(_component_q_expansion_item, {
                                  key: i,
                                  label: q.q
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(q.a), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label"]);
                              }), 128))
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
                        createVNode("div", { class: "text-h6" }, "照護資源與常見問題"),
                        createVNode("div", { class: "q-mt-md text-subtitle2" }, "文章"),
                        createVNode(_component_q_input, {
                          modelValue: articleQuery.value,
                          "onUpdate:modelValue": ($event) => articleQuery.value = $event,
                          label: "搜尋文章",
                          outlined: "",
                          dense: "",
                          class: "q-mb-md"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders q-mb-lg"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredArticles.value, (a, i) => {
                              return openBlock(), createBlock(_component_q_item, { key: i }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(a), 1)
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
                        createVNode("div", { class: "text-subtitle2" }, "FAQ"),
                        createVNode(_component_q_input, {
                          modelValue: faqQuery.value,
                          "onUpdate:modelValue": ($event) => faqQuery.value = $event,
                          label: "搜尋FAQ",
                          outlined: "",
                          dense: "",
                          class: "q-mb-md"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_q_list, {
                          bordered: "",
                          class: "rounded-borders"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredFaqs.value, (q, i) => {
                              return openBlock(), createBlock(_component_q_expansion_item, {
                                key: i,
                                label: q.q
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(q.a), 1)
                                ]),
                                _: 2
                              }, 1032, ["label"]);
                            }), 128))
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
                      createVNode("div", { class: "text-h6" }, "照護資源與常見問題"),
                      createVNode("div", { class: "q-mt-md text-subtitle2" }, "文章"),
                      createVNode(_component_q_input, {
                        modelValue: articleQuery.value,
                        "onUpdate:modelValue": ($event) => articleQuery.value = $event,
                        label: "搜尋文章",
                        outlined: "",
                        dense: "",
                        class: "q-mb-md"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_q_list, {
                        bordered: "",
                        class: "rounded-borders q-mb-lg"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredArticles.value, (a, i) => {
                            return openBlock(), createBlock(_component_q_item, { key: i }, {
                              default: withCtx(() => [
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(a), 1)
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
                      createVNode("div", { class: "text-subtitle2" }, "FAQ"),
                      createVNode(_component_q_input, {
                        modelValue: faqQuery.value,
                        "onUpdate:modelValue": ($event) => faqQuery.value = $event,
                        label: "搜尋FAQ",
                        outlined: "",
                        dense: "",
                        class: "q-mb-md"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_q_list, {
                        bordered: "",
                        class: "rounded-borders"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredFaqs.value, (q, i) => {
                            return openBlock(), createBlock(_component_q_expansion_item, {
                              key: i,
                              label: q.q
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(q.a), 1)
                              ]),
                              _: 2
                            }, 1032, ["label"]);
                          }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/content/resources.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=resources-CqnBXEy8.mjs.map
