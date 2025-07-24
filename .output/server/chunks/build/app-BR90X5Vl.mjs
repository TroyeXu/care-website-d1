import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, u as usePageSeo, a as __nuxt_component_1, b as __nuxt_component_2, c as __nuxt_component_3 } from './server.mjs';
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
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("下載 App - DogFriend", "取得 DogFriend 行動 App 隨時掌握服務進度");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_btn = __nuxt_component_3;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md flex flex-center" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: "",
              class: "info-card q-pa-md",
              style: { "max-width": "380px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-sm" data-v-6c4edb98${_scopeId3}>下載行動 App</div><p data-v-6c4edb98${_scopeId3}>掃描 QR Code 或前往商店下載，隨時掌握服務進度。</p><img class="qr-code q-my-md" src="https://api.qrserver.com/v1/create-qr-code/?data=https://www.example.com/app&amp;size=150x150" alt="App QR Code" loading="lazy" data-v-6c4edb98${_scopeId3}><div class="row justify-center q-gutter-sm" data-v-6c4edb98${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_btn, {
                          flat: "",
                          color: "primary",
                          label: "App Store"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_btn, {
                          flat: "",
                          color: "secondary",
                          label: "Google Play"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-sm" }, "下載行動 App"),
                          createVNode("p", null, "掃描 QR Code 或前往商店下載，隨時掌握服務進度。"),
                          createVNode("img", {
                            class: "qr-code q-my-md",
                            src: "https://api.qrserver.com/v1/create-qr-code/?data=https://www.example.com/app&size=150x150",
                            alt: "App QR Code",
                            loading: "lazy"
                          }),
                          createVNode("div", { class: "row justify-center q-gutter-sm" }, [
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "primary",
                              label: "App Store"
                            }),
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "secondary",
                              label: "Google Play"
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6 q-mb-sm" }, "下載行動 App"),
                        createVNode("p", null, "掃描 QR Code 或前往商店下載，隨時掌握服務進度。"),
                        createVNode("img", {
                          class: "qr-code q-my-md",
                          src: "https://api.qrserver.com/v1/create-qr-code/?data=https://www.example.com/app&size=150x150",
                          alt: "App QR Code",
                          loading: "lazy"
                        }),
                        createVNode("div", { class: "row justify-center q-gutter-sm" }, [
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "primary",
                            label: "App Store"
                          }),
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "secondary",
                            label: "Google Play"
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
                class: "info-card q-pa-md",
                style: { "max-width": "380px" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, { class: "text-center" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6 q-mb-sm" }, "下載行動 App"),
                      createVNode("p", null, "掃描 QR Code 或前往商店下載，隨時掌握服務進度。"),
                      createVNode("img", {
                        class: "qr-code q-my-md",
                        src: "https://api.qrserver.com/v1/create-qr-code/?data=https://www.example.com/app&size=150x150",
                        alt: "App QR Code",
                        loading: "lazy"
                      }),
                      createVNode("div", { class: "row justify-center q-gutter-sm" }, [
                        createVNode(_component_q_btn, {
                          flat: "",
                          color: "primary",
                          label: "App Store"
                        }),
                        createVNode(_component_q_btn, {
                          flat: "",
                          color: "secondary",
                          label: "Google Play"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const app = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6c4edb98"]]);

export { app as default };
//# sourceMappingURL=app-BR90X5Vl.mjs.map
