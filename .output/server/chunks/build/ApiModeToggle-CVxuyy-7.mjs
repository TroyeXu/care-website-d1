import { defineComponent, mergeProps, withCtx, unref, isRef, createVNode, createTextVNode, createBlock, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useApiConfig } from './useApiConfig-D0iRs2xG.mjs';
import { _ as _export_sfc, a as __nuxt_component_1, b as __nuxt_component_2, g as __nuxt_component_1$1, c as __nuxt_component_3, i as __nuxt_component_5$2 } from './server.mjs';
import { _ as __nuxt_component_3$3 } from '../_/QToggle.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ApiModeToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      config,
      isUsingMockApi,
      isProduction,
      switchToMockApi,
      switchToRealApi,
      resetToDefaults,
      smartApiSelection
    } = useApiConfig();
    const handleToggle = async (value) => {
      if (value) {
        switchToMockApi();
      } else {
        await smartApiSelection();
        if (isUsingMockApi.value) {
          $q.notify({
            type: "warning",
            message: "真實 API 不可用，已自動保持 Mock API 模式",
            timeout: 3e3
          });
        } else {
          switchToRealApi();
        }
      }
    };
    const switchToMock = () => {
      switchToMockApi();
      $q.notify({
        type: "info",
        message: "已切換到 Mock API 模式",
        icon: "science",
        timeout: 2e3
      });
    };
    const switchToReal = async () => {
      await smartApiSelection();
      if (!isUsingMockApi.value) {
        $q.notify({
          type: "positive",
          message: "已切換到真實 API 模式",
          icon: "cloud",
          timeout: 2e3
        });
      } else {
        $q.notify({
          type: "warning",
          message: "真實 API 不可用，維持 Mock API 模式",
          icon: "warning",
          timeout: 3e3
        });
      }
    };
    const resetConfig = () => {
      resetToDefaults();
      $q.notify({
        type: "info",
        message: "配置已重設為預設值",
        icon: "refresh",
        timeout: 2e3
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_toggle = __nuxt_component_3$3;
      const _component_q_btn = __nuxt_component_3;
      const _component_q_separator = __nuxt_component_5$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "api-mode-toggle q-pa-md" }, _attrs))} data-v-6d93b68e>`);
      _push(ssrRenderComponent(_component_q_card, { class: "bg-grey-1" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card_section, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-h6 q-mb-md" data-v-6d93b68e${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_q_icon, {
                    name: "settings",
                    class: "q-mr-sm"
                  }, null, _parent3, _scopeId2));
                  _push3(` API 模式設定 </div><div class="q-mb-md" data-v-6d93b68e${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_q_toggle, {
                    modelValue: unref(isUsingMockApi),
                    "onUpdate:modelValue": [($event) => isRef(isUsingMockApi) ? isUsingMockApi.value = $event : null, handleToggle],
                    label: unref(isUsingMockApi) ? "Mock API 模式" : "真實 API 模式",
                    color: unref(isUsingMockApi) ? "orange" : "green"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="text-body2 text-grey-7 q-mb-md" data-v-6d93b68e${_scopeId2}>`);
                  if (unref(isUsingMockApi)) {
                    _push3(`<div class="text-orange" data-v-6d93b68e${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_icon, {
                      name: "science",
                      class: "q-mr-xs"
                    }, null, _parent3, _scopeId2));
                    _push3(` 目前使用模擬 API，所有資料都是測試資料 </div>`);
                  } else {
                    _push3(`<div class="text-green" data-v-6d93b68e${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_icon, {
                      name: "cloud",
                      class: "q-mr-xs"
                    }, null, _parent3, _scopeId2));
                    _push3(` 目前使用真實 API，連接到 Supabase 後端 </div>`);
                  }
                  _push3(`</div><div class="row q-gutter-sm" data-v-6d93b68e${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_q_btn, {
                    size: "sm",
                    outline: "",
                    color: "orange",
                    icon: "science",
                    label: "Mock API",
                    onClick: switchToMock,
                    class: { "bg-orange-1": unref(isUsingMockApi) }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_btn, {
                    size: "sm",
                    outline: "",
                    color: "green",
                    icon: "cloud",
                    label: "真實 API",
                    onClick: switchToReal,
                    class: { "bg-green-1": !unref(isUsingMockApi) }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_btn, {
                    size: "sm",
                    outline: "",
                    color: "blue",
                    icon: "refresh",
                    label: "重設",
                    onClick: resetConfig
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_q_separator, { class: "q-my-md" }, null, _parent3, _scopeId2));
                  _push3(`<div class="text-caption text-grey-6" data-v-6d93b68e${_scopeId2}><div data-v-6d93b68e${_scopeId2}><strong data-v-6d93b68e${_scopeId2}>配置資訊：</strong></div><div data-v-6d93b68e${_scopeId2}>環境：${ssrInterpolate(unref(isProduction) ? "生產" : "開發")}</div><div data-v-6d93b68e${_scopeId2}>API 端點：${ssrInterpolate(unref(config).baseUrl)}</div><div data-v-6d93b68e${_scopeId2}>超時時間：${ssrInterpolate(unref(config).timeout)}ms</div><div data-v-6d93b68e${_scopeId2}>重試次數：${ssrInterpolate(unref(config).retryCount)}</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-h6 q-mb-md" }, [
                      createVNode(_component_q_icon, {
                        name: "settings",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" API 模式設定 ")
                    ]),
                    createVNode("div", { class: "q-mb-md" }, [
                      createVNode(_component_q_toggle, {
                        modelValue: unref(isUsingMockApi),
                        "onUpdate:modelValue": [($event) => isRef(isUsingMockApi) ? isUsingMockApi.value = $event : null, handleToggle],
                        label: unref(isUsingMockApi) ? "Mock API 模式" : "真實 API 模式",
                        color: unref(isUsingMockApi) ? "orange" : "green"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "color"])
                    ]),
                    createVNode("div", { class: "text-body2 text-grey-7 q-mb-md" }, [
                      unref(isUsingMockApi) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-orange"
                      }, [
                        createVNode(_component_q_icon, {
                          name: "science",
                          class: "q-mr-xs"
                        }),
                        createTextVNode(" 目前使用模擬 API，所有資料都是測試資料 ")
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-green"
                      }, [
                        createVNode(_component_q_icon, {
                          name: "cloud",
                          class: "q-mr-xs"
                        }),
                        createTextVNode(" 目前使用真實 API，連接到 Supabase 後端 ")
                      ]))
                    ]),
                    createVNode("div", { class: "row q-gutter-sm" }, [
                      createVNode(_component_q_btn, {
                        size: "sm",
                        outline: "",
                        color: "orange",
                        icon: "science",
                        label: "Mock API",
                        onClick: switchToMock,
                        class: { "bg-orange-1": unref(isUsingMockApi) }
                      }, null, 8, ["class"]),
                      createVNode(_component_q_btn, {
                        size: "sm",
                        outline: "",
                        color: "green",
                        icon: "cloud",
                        label: "真實 API",
                        onClick: switchToReal,
                        class: { "bg-green-1": !unref(isUsingMockApi) }
                      }, null, 8, ["class"]),
                      createVNode(_component_q_btn, {
                        size: "sm",
                        outline: "",
                        color: "blue",
                        icon: "refresh",
                        label: "重設",
                        onClick: resetConfig
                      })
                    ]),
                    createVNode(_component_q_separator, { class: "q-my-md" }),
                    createVNode("div", { class: "text-caption text-grey-6" }, [
                      createVNode("div", null, [
                        createVNode("strong", null, "配置資訊：")
                      ]),
                      createVNode("div", null, "環境：" + toDisplayString(unref(isProduction) ? "生產" : "開發"), 1),
                      createVNode("div", null, "API 端點：" + toDisplayString(unref(config).baseUrl), 1),
                      createVNode("div", null, "超時時間：" + toDisplayString(unref(config).timeout) + "ms", 1),
                      createVNode("div", null, "重試次數：" + toDisplayString(unref(config).retryCount), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_q_card_section, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-h6 q-mb-md" }, [
                    createVNode(_component_q_icon, {
                      name: "settings",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" API 模式設定 ")
                  ]),
                  createVNode("div", { class: "q-mb-md" }, [
                    createVNode(_component_q_toggle, {
                      modelValue: unref(isUsingMockApi),
                      "onUpdate:modelValue": [($event) => isRef(isUsingMockApi) ? isUsingMockApi.value = $event : null, handleToggle],
                      label: unref(isUsingMockApi) ? "Mock API 模式" : "真實 API 模式",
                      color: unref(isUsingMockApi) ? "orange" : "green"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "color"])
                  ]),
                  createVNode("div", { class: "text-body2 text-grey-7 q-mb-md" }, [
                    unref(isUsingMockApi) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-orange"
                    }, [
                      createVNode(_component_q_icon, {
                        name: "science",
                        class: "q-mr-xs"
                      }),
                      createTextVNode(" 目前使用模擬 API，所有資料都是測試資料 ")
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-green"
                    }, [
                      createVNode(_component_q_icon, {
                        name: "cloud",
                        class: "q-mr-xs"
                      }),
                      createTextVNode(" 目前使用真實 API，連接到 Supabase 後端 ")
                    ]))
                  ]),
                  createVNode("div", { class: "row q-gutter-sm" }, [
                    createVNode(_component_q_btn, {
                      size: "sm",
                      outline: "",
                      color: "orange",
                      icon: "science",
                      label: "Mock API",
                      onClick: switchToMock,
                      class: { "bg-orange-1": unref(isUsingMockApi) }
                    }, null, 8, ["class"]),
                    createVNode(_component_q_btn, {
                      size: "sm",
                      outline: "",
                      color: "green",
                      icon: "cloud",
                      label: "真實 API",
                      onClick: switchToReal,
                      class: { "bg-green-1": !unref(isUsingMockApi) }
                    }, null, 8, ["class"]),
                    createVNode(_component_q_btn, {
                      size: "sm",
                      outline: "",
                      color: "blue",
                      icon: "refresh",
                      label: "重設",
                      onClick: resetConfig
                    })
                  ]),
                  createVNode(_component_q_separator, { class: "q-my-md" }),
                  createVNode("div", { class: "text-caption text-grey-6" }, [
                    createVNode("div", null, [
                      createVNode("strong", null, "配置資訊：")
                    ]),
                    createVNode("div", null, "環境：" + toDisplayString(unref(isProduction) ? "生產" : "開發"), 1),
                    createVNode("div", null, "API 端點：" + toDisplayString(unref(config).baseUrl), 1),
                    createVNode("div", null, "超時時間：" + toDisplayString(unref(config).timeout) + "ms", 1),
                    createVNode("div", null, "重試次數：" + toDisplayString(unref(config).retryCount), 1)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ApiModeToggle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-6d93b68e"]]), { __name: "ApiModeToggle" });

export { __nuxt_component_4 as _ };
//# sourceMappingURL=ApiModeToggle-CVxuyy-7.mjs.map
