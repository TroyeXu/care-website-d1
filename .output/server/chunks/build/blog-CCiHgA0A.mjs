import { computed, mergeProps, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as usePageSeo, a as __nuxt_component_1, b as __nuxt_component_2, j as __nuxt_component_9$1, c as __nuxt_component_3 } from './server.mjs';
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
  __name: "blog",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("部落格 - DogFriend", "知識分享與常見問題");
    const posts = [
      {
        title: "如何選擇看護",
        slug: "how-to-choose-caregiver",
        date: "2024-05-10",
        excerpt: "教你從需求到媒合的注意事項"
      },
      {
        title: "照護常見QA",
        slug: "caregiving-faq",
        date: "2024-05-05",
        excerpt: "彙整雇主最關心的問題"
      }
    ];
    const sortedPosts = computed(
      () => posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    );
    function formatDate(d) {
      return new Date(d).toLocaleDateString("zh-TW");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
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
                        _push4(`<div class="text-h6 q-mb-md"${_scopeId3}>知識分享與常見問題</div><!--[-->`);
                        ssrRenderList(sortedPosts.value, (post, i) => {
                          _push4(ssrRenderComponent(_component_q_card, {
                            key: i,
                            flat: "",
                            bordered: "",
                            class: "q-mb-sm"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_q_card_section, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="text-subtitle1"${_scopeId5}>${ssrInterpolate(post.title)}</div><div class="text-caption text-grey"${_scopeId5}>${ssrInterpolate(formatDate(post.date))}</div><p class="q-mt-sm"${_scopeId5}>${ssrInterpolate(post.excerpt)}</p>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "text-subtitle1" }, toDisplayString(post.title), 1),
                                        createVNode("div", { class: "text-caption text-grey" }, toDisplayString(formatDate(post.date)), 1),
                                        createVNode("p", { class: "q-mt-sm" }, toDisplayString(post.excerpt), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_q_card_actions, { align: "right" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_btn, {
                                        flat: "",
                                        color: "primary",
                                        to: `/blog/${post.slug}`,
                                        label: "閱讀更多"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          color: "primary",
                                          to: `/blog/${post.slug}`,
                                          label: "閱讀更多"
                                        }, null, 8, ["to"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_q_card_section, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-subtitle1" }, toDisplayString(post.title), 1),
                                      createVNode("div", { class: "text-caption text-grey" }, toDisplayString(formatDate(post.date)), 1),
                                      createVNode("p", { class: "q-mt-sm" }, toDisplayString(post.excerpt), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_q_card_actions, { align: "right" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        color: "primary",
                                        to: `/blog/${post.slug}`,
                                        label: "閱讀更多"
                                      }, null, 8, ["to"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "知識分享與常見問題"),
                          (openBlock(true), createBlock(Fragment, null, renderList(sortedPosts.value, (post, i) => {
                            return openBlock(), createBlock(_component_q_card, {
                              key: i,
                              flat: "",
                              bordered: "",
                              class: "q-mb-sm"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_card_section, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-subtitle1" }, toDisplayString(post.title), 1),
                                    createVNode("div", { class: "text-caption text-grey" }, toDisplayString(formatDate(post.date)), 1),
                                    createVNode("p", { class: "q-mt-sm" }, toDisplayString(post.excerpt), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_q_card_actions, { align: "right" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_btn, {
                                      flat: "",
                                      color: "primary",
                                      to: `/blog/${post.slug}`,
                                      label: "閱讀更多"
                                    }, null, 8, ["to"])
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6 q-mb-md" }, "知識分享與常見問題"),
                        (openBlock(true), createBlock(Fragment, null, renderList(sortedPosts.value, (post, i) => {
                          return openBlock(), createBlock(_component_q_card, {
                            key: i,
                            flat: "",
                            bordered: "",
                            class: "q-mb-sm"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_card_section, null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-subtitle1" }, toDisplayString(post.title), 1),
                                  createVNode("div", { class: "text-caption text-grey" }, toDisplayString(formatDate(post.date)), 1),
                                  createVNode("p", { class: "q-mt-sm" }, toDisplayString(post.excerpt), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_q_card_actions, { align: "right" }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_btn, {
                                    flat: "",
                                    color: "primary",
                                    to: `/blog/${post.slug}`,
                                    label: "閱讀更多"
                                  }, null, 8, ["to"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
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
                      createVNode("div", { class: "text-h6 q-mb-md" }, "知識分享與常見問題"),
                      (openBlock(true), createBlock(Fragment, null, renderList(sortedPosts.value, (post, i) => {
                        return openBlock(), createBlock(_component_q_card, {
                          key: i,
                          flat: "",
                          bordered: "",
                          class: "q-mb-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_card_section, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-subtitle1" }, toDisplayString(post.title), 1),
                                createVNode("div", { class: "text-caption text-grey" }, toDisplayString(formatDate(post.date)), 1),
                                createVNode("p", { class: "q-mt-sm" }, toDisplayString(post.excerpt), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_q_card_actions, { align: "right" }, {
                              default: withCtx(() => [
                                createVNode(_component_q_btn, {
                                  flat: "",
                                  color: "primary",
                                  to: `/blog/${post.slug}`,
                                  label: "閱讀更多"
                                }, null, 8, ["to"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
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
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/content/blog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=blog-CCiHgA0A.mjs.map
