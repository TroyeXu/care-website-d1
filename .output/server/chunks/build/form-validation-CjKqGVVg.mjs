import { _ as __nuxt_component_4 } from './ApiModeToggle-CVxuyy-7.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { F as Form, l as loginSchema, a as Field, r as registerSchema, c as contactSchema } from './validationSchemas-NSZeyp_z.mjs';
import { _ as _export_sfc, u as usePageSeo, o as useQuasar, a as __nuxt_component_1, b as __nuxt_component_2, g as __nuxt_component_1$1, q as __nuxt_component_4$1, c as __nuxt_component_3 } from './server.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_4$2 } from '../_/QBanner.mjs';
import { _ as __nuxt_component_8 } from '../_/QSelect.mjs';
import { _ as __nuxt_component_9 } from '../_/QCheckbox.mjs';
import './useApiConfig-D0iRs2xG.mjs';
import '../_/QToggle.mjs';
import '../_/use-checkbox.mjs';
import 'yup';
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
import '../_/QChip.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "form-validation",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("表單驗證測試 - 護理服務平台", "測試各種表單驗證功能的運作情況");
    const $q = useQuasar();
    const loginResult = ref(null);
    const registerResult = ref(null);
    const contactResult = ref(null);
    const roleOptions = [
      { label: "患者/家屬", value: "patient" },
      { label: "照護員", value: "caregiver" }
    ];
    const testLogin = async (values) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        if (values.email && values.password) {
          loginResult.value = {
            success: true,
            message: "登入表單驗證通過！所有欄位都符合要求。"
          };
          $q.notify({
            type: "positive",
            message: "登入表單驗證成功",
            timeout: 2e3
          });
        }
      } catch (error) {
        loginResult.value = {
          success: false,
          message: `驗證失敗：${error.message}`
        };
        $q.notify({
          type: "negative",
          message: "登入表單驗證失敗",
          timeout: 2e3
        });
      }
    };
    const testRegister = async (values) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        if (values.name && values.email && values.password && values.confirmPassword && values.role && values.agreeToTerms) {
          registerResult.value = {
            success: true,
            message: "註冊表單驗證通過！所有必填欄位都符合要求。"
          };
          $q.notify({
            type: "positive",
            message: "註冊表單驗證成功",
            timeout: 2e3
          });
        }
      } catch (error) {
        registerResult.value = {
          success: false,
          message: `驗證失敗：${error.message}`
        };
        $q.notify({
          type: "negative",
          message: "註冊表單驗證失敗",
          timeout: 2e3
        });
      }
    };
    const testContact = async (values) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (values.name && values.email && values.phone && values.subject && values.message) {
          contactResult.value = {
            success: true,
            message: "聯絡表單驗證通過！所有欄位都符合要求。"
          };
          $q.notify({
            type: "positive",
            message: "聯絡表單驗證成功",
            timeout: 2e3
          });
        }
      } catch (error) {
        contactResult.value = {
          success: false,
          message: `驗證失敗：${error.message}`
        };
        $q.notify({
          type: "negative",
          message: "聯絡表單驗證失敗",
          timeout: 2e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_ApiModeToggle = __nuxt_component_4;
      const _component_q_input = __nuxt_component_4$1;
      const _component_q_btn = __nuxt_component_3;
      const _component_q_banner = __nuxt_component_4$2;
      const _component_q_select = __nuxt_component_8;
      const _component_q_checkbox = __nuxt_component_9;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row justify-center" data-v-e494802e${_scopeId}><div class="col-12 col-md-10 col-lg-8" data-v-e494802e${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: "",
              class: "q-mb-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h5 text-primary q-mb-md" data-v-e494802e${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "rule",
                          class: "q-mr-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(` 表單驗證測試 </div><div class="text-body2 text-grey-7" data-v-e494802e${_scopeId3}> 測試 VeeValidate 整合和各種驗證規則的運作情況 </div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h5 text-primary q-mb-md" }, [
                            createVNode(_component_q_icon, {
                              name: "rule",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 表單驗證測試 ")
                          ]),
                          createVNode("div", { class: "text-body2 text-grey-7" }, " 測試 VeeValidate 整合和各種驗證規則的運作情況 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h5 text-primary q-mb-md" }, [
                          createVNode(_component_q_icon, {
                            name: "rule",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" 表單驗證測試 ")
                        ]),
                        createVNode("div", { class: "text-body2 text-grey-7" }, " 測試 VeeValidate 整合和各種驗證規則的運作情況 ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ApiModeToggle, { class: "q-mb-md" }, null, _parent2, _scopeId));
            _push2(`<div class="row q-gutter-md" data-v-e494802e${_scopeId}><div class="col-12 col-md-6" data-v-e494802e${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-e494802e${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "login",
                          class: "q-mr-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(` 登入表單驗證 </div>`);
                        _push4(ssrRenderComponent(unref(Form), {
                          "validation-schema": unref(loginSchema),
                          onSubmit: testLogin
                        }, {
                          default: withCtx(({ errors, isSubmitting }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
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
                                      class: "q-mb-md"
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
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Field), { name: "password" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "密碼 *",
                                      type: "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "密碼 *",
                                        type: "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                loading: isSubmitting,
                                disable: Object.keys(errors).length > 0,
                                class: "full-width"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 測試登入驗證 `);
                                  } else {
                                    return [
                                      createTextVNode(" 測試登入驗證 ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Field), { name: "email" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "電子郵件 *",
                                      type: "email",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Field), { name: "password" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "密碼 *",
                                      type: "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_btn, {
                                  type: "submit",
                                  color: "primary",
                                  loading: isSubmitting,
                                  disable: Object.keys(errors).length > 0,
                                  class: "full-width"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 測試登入驗證 ")
                                  ]),
                                  _: 2
                                }, 1032, ["loading", "disable"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (loginResult.value) {
                          _push4(`<div class="q-mt-md" data-v-e494802e${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_banner, {
                            class: loginResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="text-weight-bold" data-v-e494802e${_scopeId4}>${ssrInterpolate(loginResult.value.success ? "驗證通過" : "驗證失敗")}</div><div class="text-caption" data-v-e494802e${_scopeId4}>${ssrInterpolate(loginResult.value.message)}</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "text-weight-bold" }, toDisplayString(loginResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                                  createVNode("div", { class: "text-caption" }, toDisplayString(loginResult.value.message), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, [
                            createVNode(_component_q_icon, {
                              name: "login",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 登入表單驗證 ")
                          ]),
                          createVNode(unref(Form), {
                            "validation-schema": unref(loginSchema),
                            onSubmit: testLogin
                          }, {
                            default: withCtx(({ errors, isSubmitting }) => [
                              createVNode(unref(Field), { name: "email" }, {
                                default: withCtx(({ field, errorMessage }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "電子郵件 *",
                                    type: "email",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage,
                                    "error-message": errorMessage,
                                    class: "q-mb-md"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Field), { name: "password" }, {
                                default: withCtx(({ field, errorMessage }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "密碼 *",
                                    type: "password",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage,
                                    "error-message": errorMessage,
                                    class: "q-mb-md"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                loading: isSubmitting,
                                disable: Object.keys(errors).length > 0,
                                class: "full-width"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 測試登入驗證 ")
                                ]),
                                _: 2
                              }, 1032, ["loading", "disable"])
                            ]),
                            _: 1
                          }, 8, ["validation-schema"]),
                          loginResult.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "q-mt-md"
                          }, [
                            createVNode(_component_q_banner, {
                              class: loginResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-weight-bold" }, toDisplayString(loginResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                                createVNode("div", { class: "text-caption" }, toDisplayString(loginResult.value.message), 1)
                              ]),
                              _: 1
                            }, 8, ["class"])
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6 q-mb-md" }, [
                          createVNode(_component_q_icon, {
                            name: "login",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" 登入表單驗證 ")
                        ]),
                        createVNode(unref(Form), {
                          "validation-schema": unref(loginSchema),
                          onSubmit: testLogin
                        }, {
                          default: withCtx(({ errors, isSubmitting }) => [
                            createVNode(unref(Field), { name: "email" }, {
                              default: withCtx(({ field, errorMessage }) => [
                                createVNode(_component_q_input, mergeProps(field, {
                                  label: "電子郵件 *",
                                  type: "email",
                                  outlined: "",
                                  dense: "",
                                  error: !!errorMessage,
                                  "error-message": errorMessage,
                                  class: "q-mb-md"
                                }), null, 16, ["error", "error-message"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Field), { name: "password" }, {
                              default: withCtx(({ field, errorMessage }) => [
                                createVNode(_component_q_input, mergeProps(field, {
                                  label: "密碼 *",
                                  type: "password",
                                  outlined: "",
                                  dense: "",
                                  error: !!errorMessage,
                                  "error-message": errorMessage,
                                  class: "q-mb-md"
                                }), null, 16, ["error", "error-message"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_btn, {
                              type: "submit",
                              color: "primary",
                              loading: isSubmitting,
                              disable: Object.keys(errors).length > 0,
                              class: "full-width"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 測試登入驗證 ")
                              ]),
                              _: 2
                            }, 1032, ["loading", "disable"])
                          ]),
                          _: 1
                        }, 8, ["validation-schema"]),
                        loginResult.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "q-mt-md"
                        }, [
                          createVNode(_component_q_banner, {
                            class: loginResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-weight-bold" }, toDisplayString(loginResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                              createVNode("div", { class: "text-caption" }, toDisplayString(loginResult.value.message), 1)
                            ]),
                            _: 1
                          }, 8, ["class"])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="col-12 col-md-6" data-v-e494802e${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-e494802e${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "person_add",
                          class: "q-mr-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(` 註冊表單驗證 </div>`);
                        _push4(ssrRenderComponent(unref(Form), {
                          "validation-schema": unref(registerSchema),
                          onSubmit: testRegister
                        }, {
                          default: withCtx(({ errors, isSubmitting }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Field), { name: "name" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "姓名 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "姓名 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
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
                                      class: "q-mb-md"
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
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Field), { name: "phone" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "電話號碼 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電話號碼 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Field), { name: "password" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "密碼 *",
                                      type: "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "密碼 *",
                                        type: "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Field), { name: "confirmPassword" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "確認密碼 *",
                                      type: "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "確認密碼 *",
                                        type: "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Field), { name: "role" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_select, mergeProps(field, {
                                      label: "用戶類型 *",
                                      options: roleOptions,
                                      outlined: "",
                                      dense: "",
                                      "emit-value": "",
                                      "map-options": "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_select, mergeProps(field, {
                                        label: "用戶類型 *",
                                        options: roleOptions,
                                        outlined: "",
                                        dense: "",
                                        "emit-value": "",
                                        "map-options": "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Field), { name: "agreeToTerms" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_checkbox, mergeProps(field, {
                                      "model-value": field.value,
                                      label: "同意服務條款 *",
                                      error: !!errorMessage,
                                      class: "q-mb-md"
                                    }), null, _parent6, _scopeId5));
                                    if (errorMessage) {
                                      _push6(`<div class="text-negative text-caption" data-v-e494802e${_scopeId5}>${ssrInterpolate(errorMessage)}</div>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      createVNode(_component_q_checkbox, mergeProps(field, {
                                        "model-value": field.value,
                                        label: "同意服務條款 *",
                                        error: !!errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["model-value", "error"]),
                                      errorMessage ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-negative text-caption"
                                      }, toDisplayString(errorMessage), 1)) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                loading: isSubmitting,
                                disable: Object.keys(errors).length > 0,
                                class: "full-width"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 測試註冊驗證 `);
                                  } else {
                                    return [
                                      createTextVNode(" 測試註冊驗證 ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Field), { name: "name" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "姓名 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Field), { name: "email" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "電子郵件 *",
                                      type: "email",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Field), { name: "phone" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "電話號碼 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Field), { name: "password" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "密碼 *",
                                      type: "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Field), { name: "confirmPassword" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "確認密碼 *",
                                      type: "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Field), { name: "role" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_select, mergeProps(field, {
                                      label: "用戶類型 *",
                                      options: roleOptions,
                                      outlined: "",
                                      dense: "",
                                      "emit-value": "",
                                      "map-options": "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      class: "q-mb-md"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Field), { name: "agreeToTerms" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_checkbox, mergeProps(field, {
                                      "model-value": field.value,
                                      label: "同意服務條款 *",
                                      error: !!errorMessage,
                                      class: "q-mb-md"
                                    }), null, 16, ["model-value", "error"]),
                                    errorMessage ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-negative text-caption"
                                    }, toDisplayString(errorMessage), 1)) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_btn, {
                                  type: "submit",
                                  color: "primary",
                                  loading: isSubmitting,
                                  disable: Object.keys(errors).length > 0,
                                  class: "full-width"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 測試註冊驗證 ")
                                  ]),
                                  _: 2
                                }, 1032, ["loading", "disable"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (registerResult.value) {
                          _push4(`<div class="q-mt-md" data-v-e494802e${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_banner, {
                            class: registerResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="text-weight-bold" data-v-e494802e${_scopeId4}>${ssrInterpolate(registerResult.value.success ? "驗證通過" : "驗證失敗")}</div><div class="text-caption" data-v-e494802e${_scopeId4}>${ssrInterpolate(registerResult.value.message)}</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "text-weight-bold" }, toDisplayString(registerResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                                  createVNode("div", { class: "text-caption" }, toDisplayString(registerResult.value.message), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, [
                            createVNode(_component_q_icon, {
                              name: "person_add",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 註冊表單驗證 ")
                          ]),
                          createVNode(unref(Form), {
                            "validation-schema": unref(registerSchema),
                            onSubmit: testRegister
                          }, {
                            default: withCtx(({ errors, isSubmitting }) => [
                              createVNode(unref(Field), { name: "name" }, {
                                default: withCtx(({ field, errorMessage }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "姓名 *",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage,
                                    "error-message": errorMessage,
                                    class: "q-mb-md"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Field), { name: "email" }, {
                                default: withCtx(({ field, errorMessage }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "電子郵件 *",
                                    type: "email",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage,
                                    "error-message": errorMessage,
                                    class: "q-mb-md"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Field), { name: "phone" }, {
                                default: withCtx(({ field, errorMessage }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "電話號碼 *",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage,
                                    "error-message": errorMessage,
                                    class: "q-mb-md"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Field), { name: "password" }, {
                                default: withCtx(({ field, errorMessage }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "密碼 *",
                                    type: "password",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage,
                                    "error-message": errorMessage,
                                    class: "q-mb-md"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Field), { name: "confirmPassword" }, {
                                default: withCtx(({ field, errorMessage }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "確認密碼 *",
                                    type: "password",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage,
                                    "error-message": errorMessage,
                                    class: "q-mb-md"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Field), { name: "role" }, {
                                default: withCtx(({ field, errorMessage }) => [
                                  createVNode(_component_q_select, mergeProps(field, {
                                    label: "用戶類型 *",
                                    options: roleOptions,
                                    outlined: "",
                                    dense: "",
                                    "emit-value": "",
                                    "map-options": "",
                                    error: !!errorMessage,
                                    "error-message": errorMessage,
                                    class: "q-mb-md"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Field), { name: "agreeToTerms" }, {
                                default: withCtx(({ field, errorMessage }) => [
                                  createVNode(_component_q_checkbox, mergeProps(field, {
                                    "model-value": field.value,
                                    label: "同意服務條款 *",
                                    error: !!errorMessage,
                                    class: "q-mb-md"
                                  }), null, 16, ["model-value", "error"]),
                                  errorMessage ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-negative text-caption"
                                  }, toDisplayString(errorMessage), 1)) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                loading: isSubmitting,
                                disable: Object.keys(errors).length > 0,
                                class: "full-width"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 測試註冊驗證 ")
                                ]),
                                _: 2
                              }, 1032, ["loading", "disable"])
                            ]),
                            _: 1
                          }, 8, ["validation-schema"]),
                          registerResult.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "q-mt-md"
                          }, [
                            createVNode(_component_q_banner, {
                              class: registerResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-weight-bold" }, toDisplayString(registerResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                                createVNode("div", { class: "text-caption" }, toDisplayString(registerResult.value.message), 1)
                              ]),
                              _: 1
                            }, 8, ["class"])
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6 q-mb-md" }, [
                          createVNode(_component_q_icon, {
                            name: "person_add",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" 註冊表單驗證 ")
                        ]),
                        createVNode(unref(Form), {
                          "validation-schema": unref(registerSchema),
                          onSubmit: testRegister
                        }, {
                          default: withCtx(({ errors, isSubmitting }) => [
                            createVNode(unref(Field), { name: "name" }, {
                              default: withCtx(({ field, errorMessage }) => [
                                createVNode(_component_q_input, mergeProps(field, {
                                  label: "姓名 *",
                                  outlined: "",
                                  dense: "",
                                  error: !!errorMessage,
                                  "error-message": errorMessage,
                                  class: "q-mb-md"
                                }), null, 16, ["error", "error-message"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Field), { name: "email" }, {
                              default: withCtx(({ field, errorMessage }) => [
                                createVNode(_component_q_input, mergeProps(field, {
                                  label: "電子郵件 *",
                                  type: "email",
                                  outlined: "",
                                  dense: "",
                                  error: !!errorMessage,
                                  "error-message": errorMessage,
                                  class: "q-mb-md"
                                }), null, 16, ["error", "error-message"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Field), { name: "phone" }, {
                              default: withCtx(({ field, errorMessage }) => [
                                createVNode(_component_q_input, mergeProps(field, {
                                  label: "電話號碼 *",
                                  outlined: "",
                                  dense: "",
                                  error: !!errorMessage,
                                  "error-message": errorMessage,
                                  class: "q-mb-md"
                                }), null, 16, ["error", "error-message"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Field), { name: "password" }, {
                              default: withCtx(({ field, errorMessage }) => [
                                createVNode(_component_q_input, mergeProps(field, {
                                  label: "密碼 *",
                                  type: "password",
                                  outlined: "",
                                  dense: "",
                                  error: !!errorMessage,
                                  "error-message": errorMessage,
                                  class: "q-mb-md"
                                }), null, 16, ["error", "error-message"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Field), { name: "confirmPassword" }, {
                              default: withCtx(({ field, errorMessage }) => [
                                createVNode(_component_q_input, mergeProps(field, {
                                  label: "確認密碼 *",
                                  type: "password",
                                  outlined: "",
                                  dense: "",
                                  error: !!errorMessage,
                                  "error-message": errorMessage,
                                  class: "q-mb-md"
                                }), null, 16, ["error", "error-message"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Field), { name: "role" }, {
                              default: withCtx(({ field, errorMessage }) => [
                                createVNode(_component_q_select, mergeProps(field, {
                                  label: "用戶類型 *",
                                  options: roleOptions,
                                  outlined: "",
                                  dense: "",
                                  "emit-value": "",
                                  "map-options": "",
                                  error: !!errorMessage,
                                  "error-message": errorMessage,
                                  class: "q-mb-md"
                                }), null, 16, ["error", "error-message"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Field), { name: "agreeToTerms" }, {
                              default: withCtx(({ field, errorMessage }) => [
                                createVNode(_component_q_checkbox, mergeProps(field, {
                                  "model-value": field.value,
                                  label: "同意服務條款 *",
                                  error: !!errorMessage,
                                  class: "q-mb-md"
                                }), null, 16, ["model-value", "error"]),
                                errorMessage ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-negative text-caption"
                                }, toDisplayString(errorMessage), 1)) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_btn, {
                              type: "submit",
                              color: "primary",
                              loading: isSubmitting,
                              disable: Object.keys(errors).length > 0,
                              class: "full-width"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 測試註冊驗證 ")
                              ]),
                              _: 2
                            }, 1032, ["loading", "disable"])
                          ]),
                          _: 1
                        }, 8, ["validation-schema"]),
                        registerResult.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "q-mt-md"
                        }, [
                          createVNode(_component_q_banner, {
                            class: registerResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-weight-bold" }, toDisplayString(registerResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                              createVNode("div", { class: "text-caption" }, toDisplayString(registerResult.value.message), 1)
                            ]),
                            _: 1
                          }, 8, ["class"])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="col-12" data-v-e494802e${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-e494802e${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "contact_mail",
                          class: "q-mr-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(` 聯絡表單驗證 </div>`);
                        _push4(ssrRenderComponent(unref(Form), {
                          "validation-schema": unref(contactSchema),
                          onSubmit: testContact
                        }, {
                          default: withCtx(({ errors, isSubmitting }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="row q-gutter-md" data-v-e494802e${_scopeId4}><div class="col-12 col-md-6" data-v-e494802e${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "name" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "姓名 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "姓名 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="col-12 col-md-6" data-v-e494802e${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "email" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "電子郵件 *",
                                      type: "email",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件 *",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="col-12 col-md-6" data-v-e494802e${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "phone" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "電話號碼 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電話號碼 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="col-12 col-md-6" data-v-e494802e${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "subject" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "主題 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "主題 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="col-12" data-v-e494802e${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "message" }, {
                                default: withCtx(({ field, errorMessage }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "訊息 *",
                                      type: "textarea",
                                      outlined: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      rows: "4"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "訊息 *",
                                        type: "textarea",
                                        outlined: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        rows: "4"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                              _push5(ssrRenderComponent(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                loading: isSubmitting,
                                disable: Object.keys(errors).length > 0,
                                class: "q-mt-md"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 測試聯絡表單驗證 `);
                                  } else {
                                    return [
                                      createTextVNode(" 測試聯絡表單驗證 ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "row q-gutter-md" }, [
                                  createVNode("div", { class: "col-12 col-md-6" }, [
                                    createVNode(unref(Field), { name: "name" }, {
                                      default: withCtx(({ field, errorMessage }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "姓名 *",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage,
                                          "error-message": errorMessage
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "col-12 col-md-6" }, [
                                    createVNode(unref(Field), { name: "email" }, {
                                      default: withCtx(({ field, errorMessage }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "電子郵件 *",
                                          type: "email",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage,
                                          "error-message": errorMessage
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "col-12 col-md-6" }, [
                                    createVNode(unref(Field), { name: "phone" }, {
                                      default: withCtx(({ field, errorMessage }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "電話號碼 *",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage,
                                          "error-message": errorMessage
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "col-12 col-md-6" }, [
                                    createVNode(unref(Field), { name: "subject" }, {
                                      default: withCtx(({ field, errorMessage }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "主題 *",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage,
                                          "error-message": errorMessage
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "col-12" }, [
                                    createVNode(unref(Field), { name: "message" }, {
                                      default: withCtx(({ field, errorMessage }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "訊息 *",
                                          type: "textarea",
                                          outlined: "",
                                          error: !!errorMessage,
                                          "error-message": errorMessage,
                                          rows: "4"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode(_component_q_btn, {
                                  type: "submit",
                                  color: "primary",
                                  loading: isSubmitting,
                                  disable: Object.keys(errors).length > 0,
                                  class: "q-mt-md"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 測試聯絡表單驗證 ")
                                  ]),
                                  _: 2
                                }, 1032, ["loading", "disable"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (contactResult.value) {
                          _push4(`<div class="q-mt-md" data-v-e494802e${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_banner, {
                            class: contactResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="text-weight-bold" data-v-e494802e${_scopeId4}>${ssrInterpolate(contactResult.value.success ? "驗證通過" : "驗證失敗")}</div><div class="text-caption" data-v-e494802e${_scopeId4}>${ssrInterpolate(contactResult.value.message)}</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "text-weight-bold" }, toDisplayString(contactResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                                  createVNode("div", { class: "text-caption" }, toDisplayString(contactResult.value.message), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, [
                            createVNode(_component_q_icon, {
                              name: "contact_mail",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 聯絡表單驗證 ")
                          ]),
                          createVNode(unref(Form), {
                            "validation-schema": unref(contactSchema),
                            onSubmit: testContact
                          }, {
                            default: withCtx(({ errors, isSubmitting }) => [
                              createVNode("div", { class: "row q-gutter-md" }, [
                                createVNode("div", { class: "col-12 col-md-6" }, [
                                  createVNode(unref(Field), { name: "name" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "姓名 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "col-12 col-md-6" }, [
                                  createVNode(unref(Field), { name: "email" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件 *",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "col-12 col-md-6" }, [
                                  createVNode(unref(Field), { name: "phone" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電話號碼 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "col-12 col-md-6" }, [
                                  createVNode(unref(Field), { name: "subject" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "主題 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "col-12" }, [
                                  createVNode(unref(Field), { name: "message" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "訊息 *",
                                        type: "textarea",
                                        outlined: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        rows: "4"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                loading: isSubmitting,
                                disable: Object.keys(errors).length > 0,
                                class: "q-mt-md"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 測試聯絡表單驗證 ")
                                ]),
                                _: 2
                              }, 1032, ["loading", "disable"])
                            ]),
                            _: 1
                          }, 8, ["validation-schema"]),
                          contactResult.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "q-mt-md"
                          }, [
                            createVNode(_component_q_banner, {
                              class: contactResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-weight-bold" }, toDisplayString(contactResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                                createVNode("div", { class: "text-caption" }, toDisplayString(contactResult.value.message), 1)
                              ]),
                              _: 1
                            }, 8, ["class"])
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6 q-mb-md" }, [
                          createVNode(_component_q_icon, {
                            name: "contact_mail",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" 聯絡表單驗證 ")
                        ]),
                        createVNode(unref(Form), {
                          "validation-schema": unref(contactSchema),
                          onSubmit: testContact
                        }, {
                          default: withCtx(({ errors, isSubmitting }) => [
                            createVNode("div", { class: "row q-gutter-md" }, [
                              createVNode("div", { class: "col-12 col-md-6" }, [
                                createVNode(unref(Field), { name: "name" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "姓名 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "col-12 col-md-6" }, [
                                createVNode(unref(Field), { name: "email" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "電子郵件 *",
                                      type: "email",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "col-12 col-md-6" }, [
                                createVNode(unref(Field), { name: "phone" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "電話號碼 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "col-12 col-md-6" }, [
                                createVNode(unref(Field), { name: "subject" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "主題 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "col-12" }, [
                                createVNode(unref(Field), { name: "message" }, {
                                  default: withCtx(({ field, errorMessage }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "訊息 *",
                                      type: "textarea",
                                      outlined: "",
                                      error: !!errorMessage,
                                      "error-message": errorMessage,
                                      rows: "4"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode(_component_q_btn, {
                              type: "submit",
                              color: "primary",
                              loading: isSubmitting,
                              disable: Object.keys(errors).length > 0,
                              class: "q-mt-md"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 測試聯絡表單驗證 ")
                              ]),
                              _: 2
                            }, 1032, ["loading", "disable"])
                          ]),
                          _: 1
                        }, 8, ["validation-schema"]),
                        contactResult.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "q-mt-md"
                        }, [
                          createVNode(_component_q_banner, {
                            class: contactResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-weight-bold" }, toDisplayString(contactResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                              createVNode("div", { class: "text-caption" }, toDisplayString(contactResult.value.message), 1)
                            ]),
                            _: 1
                          }, 8, ["class"])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
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
                        _push4(`<div class="text-h6 q-mb-md" data-v-e494802e${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "info",
                          class: "q-mr-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(` 驗證規則說明 </div><div class="row q-gutter-md" data-v-e494802e${_scopeId3}><div class="col-12 col-md-4" data-v-e494802e${_scopeId3}><div class="text-subtitle2 q-mb-sm" data-v-e494802e${_scopeId3}>電子郵件驗證</div><ul class="text-body2 text-grey-7" data-v-e494802e${_scopeId3}><li data-v-e494802e${_scopeId3}>必填欄位</li><li data-v-e494802e${_scopeId3}>有效的 email 格式</li><li data-v-e494802e${_scopeId3}>最大長度 100 字符</li></ul></div><div class="col-12 col-md-4" data-v-e494802e${_scopeId3}><div class="text-subtitle2 q-mb-sm" data-v-e494802e${_scopeId3}>密碼驗證</div><ul class="text-body2 text-grey-7" data-v-e494802e${_scopeId3}><li data-v-e494802e${_scopeId3}>最少 8 個字符</li><li data-v-e494802e${_scopeId3}>包含大寫字母</li><li data-v-e494802e${_scopeId3}>包含小寫字母</li><li data-v-e494802e${_scopeId3}>包含數字</li><li data-v-e494802e${_scopeId3}>確認密碼必須一致</li></ul></div><div class="col-12 col-md-4" data-v-e494802e${_scopeId3}><div class="text-subtitle2 q-mb-sm" data-v-e494802e${_scopeId3}>其他驗證</div><ul class="text-body2 text-grey-7" data-v-e494802e${_scopeId3}><li data-v-e494802e${_scopeId3}>姓名：2-50 字符，中英文</li><li data-v-e494802e${_scopeId3}>電話：台灣手機或市話格式</li><li data-v-e494802e${_scopeId3}>年齡：18-120 歲</li><li data-v-e494802e${_scopeId3}>地址：5-200 字符</li></ul></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, [
                            createVNode(_component_q_icon, {
                              name: "info",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 驗證規則說明 ")
                          ]),
                          createVNode("div", { class: "row q-gutter-md" }, [
                            createVNode("div", { class: "col-12 col-md-4" }, [
                              createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "電子郵件驗證"),
                              createVNode("ul", { class: "text-body2 text-grey-7" }, [
                                createVNode("li", null, "必填欄位"),
                                createVNode("li", null, "有效的 email 格式"),
                                createVNode("li", null, "最大長度 100 字符")
                              ])
                            ]),
                            createVNode("div", { class: "col-12 col-md-4" }, [
                              createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "密碼驗證"),
                              createVNode("ul", { class: "text-body2 text-grey-7" }, [
                                createVNode("li", null, "最少 8 個字符"),
                                createVNode("li", null, "包含大寫字母"),
                                createVNode("li", null, "包含小寫字母"),
                                createVNode("li", null, "包含數字"),
                                createVNode("li", null, "確認密碼必須一致")
                              ])
                            ]),
                            createVNode("div", { class: "col-12 col-md-4" }, [
                              createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "其他驗證"),
                              createVNode("ul", { class: "text-body2 text-grey-7" }, [
                                createVNode("li", null, "姓名：2-50 字符，中英文"),
                                createVNode("li", null, "電話：台灣手機或市話格式"),
                                createVNode("li", null, "年齡：18-120 歲"),
                                createVNode("li", null, "地址：5-200 字符")
                              ])
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
                        createVNode("div", { class: "text-h6 q-mb-md" }, [
                          createVNode(_component_q_icon, {
                            name: "info",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" 驗證規則說明 ")
                        ]),
                        createVNode("div", { class: "row q-gutter-md" }, [
                          createVNode("div", { class: "col-12 col-md-4" }, [
                            createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "電子郵件驗證"),
                            createVNode("ul", { class: "text-body2 text-grey-7" }, [
                              createVNode("li", null, "必填欄位"),
                              createVNode("li", null, "有效的 email 格式"),
                              createVNode("li", null, "最大長度 100 字符")
                            ])
                          ]),
                          createVNode("div", { class: "col-12 col-md-4" }, [
                            createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "密碼驗證"),
                            createVNode("ul", { class: "text-body2 text-grey-7" }, [
                              createVNode("li", null, "最少 8 個字符"),
                              createVNode("li", null, "包含大寫字母"),
                              createVNode("li", null, "包含小寫字母"),
                              createVNode("li", null, "包含數字"),
                              createVNode("li", null, "確認密碼必須一致")
                            ])
                          ]),
                          createVNode("div", { class: "col-12 col-md-4" }, [
                            createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "其他驗證"),
                            createVNode("ul", { class: "text-body2 text-grey-7" }, [
                              createVNode("li", null, "姓名：2-50 字符，中英文"),
                              createVNode("li", null, "電話：台灣手機或市話格式"),
                              createVNode("li", null, "年齡：18-120 歲"),
                              createVNode("li", null, "地址：5-200 字符")
                            ])
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
                createVNode("div", { class: "col-12 col-md-10 col-lg-8" }, [
                  createVNode(_component_q_card, {
                    flat: "",
                    bordered: "",
                    class: "q-mb-md"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h5 text-primary q-mb-md" }, [
                            createVNode(_component_q_icon, {
                              name: "rule",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 表單驗證測試 ")
                          ]),
                          createVNode("div", { class: "text-body2 text-grey-7" }, " 測試 VeeValidate 整合和各種驗證規則的運作情況 ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ApiModeToggle, { class: "q-mb-md" }),
                  createVNode("div", { class: "row q-gutter-md" }, [
                    createVNode("div", { class: "col-12 col-md-6" }, [
                      createVNode(_component_q_card, {
                        flat: "",
                        bordered: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6 q-mb-md" }, [
                                createVNode(_component_q_icon, {
                                  name: "login",
                                  class: "q-mr-sm"
                                }),
                                createTextVNode(" 登入表單驗證 ")
                              ]),
                              createVNode(unref(Form), {
                                "validation-schema": unref(loginSchema),
                                onSubmit: testLogin
                              }, {
                                default: withCtx(({ errors, isSubmitting }) => [
                                  createVNode(unref(Field), { name: "email" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件 *",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Field), { name: "password" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "密碼 *",
                                        type: "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_btn, {
                                    type: "submit",
                                    color: "primary",
                                    loading: isSubmitting,
                                    disable: Object.keys(errors).length > 0,
                                    class: "full-width"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 測試登入驗證 ")
                                    ]),
                                    _: 2
                                  }, 1032, ["loading", "disable"])
                                ]),
                                _: 1
                              }, 8, ["validation-schema"]),
                              loginResult.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "q-mt-md"
                              }, [
                                createVNode(_component_q_banner, {
                                  class: loginResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-weight-bold" }, toDisplayString(loginResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                                    createVNode("div", { class: "text-caption" }, toDisplayString(loginResult.value.message), 1)
                                  ]),
                                  _: 1
                                }, 8, ["class"])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "col-12 col-md-6" }, [
                      createVNode(_component_q_card, {
                        flat: "",
                        bordered: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6 q-mb-md" }, [
                                createVNode(_component_q_icon, {
                                  name: "person_add",
                                  class: "q-mr-sm"
                                }),
                                createTextVNode(" 註冊表單驗證 ")
                              ]),
                              createVNode(unref(Form), {
                                "validation-schema": unref(registerSchema),
                                onSubmit: testRegister
                              }, {
                                default: withCtx(({ errors, isSubmitting }) => [
                                  createVNode(unref(Field), { name: "name" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "姓名 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Field), { name: "email" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件 *",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Field), { name: "phone" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電話號碼 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Field), { name: "password" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "密碼 *",
                                        type: "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Field), { name: "confirmPassword" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "確認密碼 *",
                                        type: "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Field), { name: "role" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_select, mergeProps(field, {
                                        label: "用戶類型 *",
                                        options: roleOptions,
                                        outlined: "",
                                        dense: "",
                                        "emit-value": "",
                                        "map-options": "",
                                        error: !!errorMessage,
                                        "error-message": errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Field), { name: "agreeToTerms" }, {
                                    default: withCtx(({ field, errorMessage }) => [
                                      createVNode(_component_q_checkbox, mergeProps(field, {
                                        "model-value": field.value,
                                        label: "同意服務條款 *",
                                        error: !!errorMessage,
                                        class: "q-mb-md"
                                      }), null, 16, ["model-value", "error"]),
                                      errorMessage ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-negative text-caption"
                                      }, toDisplayString(errorMessage), 1)) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_btn, {
                                    type: "submit",
                                    color: "primary",
                                    loading: isSubmitting,
                                    disable: Object.keys(errors).length > 0,
                                    class: "full-width"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 測試註冊驗證 ")
                                    ]),
                                    _: 2
                                  }, 1032, ["loading", "disable"])
                                ]),
                                _: 1
                              }, 8, ["validation-schema"]),
                              registerResult.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "q-mt-md"
                              }, [
                                createVNode(_component_q_banner, {
                                  class: registerResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-weight-bold" }, toDisplayString(registerResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                                    createVNode("div", { class: "text-caption" }, toDisplayString(registerResult.value.message), 1)
                                  ]),
                                  _: 1
                                }, 8, ["class"])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "col-12" }, [
                      createVNode(_component_q_card, {
                        flat: "",
                        bordered: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6 q-mb-md" }, [
                                createVNode(_component_q_icon, {
                                  name: "contact_mail",
                                  class: "q-mr-sm"
                                }),
                                createTextVNode(" 聯絡表單驗證 ")
                              ]),
                              createVNode(unref(Form), {
                                "validation-schema": unref(contactSchema),
                                onSubmit: testContact
                              }, {
                                default: withCtx(({ errors, isSubmitting }) => [
                                  createVNode("div", { class: "row q-gutter-md" }, [
                                    createVNode("div", { class: "col-12 col-md-6" }, [
                                      createVNode(unref(Field), { name: "name" }, {
                                        default: withCtx(({ field, errorMessage }) => [
                                          createVNode(_component_q_input, mergeProps(field, {
                                            label: "姓名 *",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage,
                                            "error-message": errorMessage
                                          }), null, 16, ["error", "error-message"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    createVNode("div", { class: "col-12 col-md-6" }, [
                                      createVNode(unref(Field), { name: "email" }, {
                                        default: withCtx(({ field, errorMessage }) => [
                                          createVNode(_component_q_input, mergeProps(field, {
                                            label: "電子郵件 *",
                                            type: "email",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage,
                                            "error-message": errorMessage
                                          }), null, 16, ["error", "error-message"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    createVNode("div", { class: "col-12 col-md-6" }, [
                                      createVNode(unref(Field), { name: "phone" }, {
                                        default: withCtx(({ field, errorMessage }) => [
                                          createVNode(_component_q_input, mergeProps(field, {
                                            label: "電話號碼 *",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage,
                                            "error-message": errorMessage
                                          }), null, 16, ["error", "error-message"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    createVNode("div", { class: "col-12 col-md-6" }, [
                                      createVNode(unref(Field), { name: "subject" }, {
                                        default: withCtx(({ field, errorMessage }) => [
                                          createVNode(_component_q_input, mergeProps(field, {
                                            label: "主題 *",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage,
                                            "error-message": errorMessage
                                          }), null, 16, ["error", "error-message"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    createVNode("div", { class: "col-12" }, [
                                      createVNode(unref(Field), { name: "message" }, {
                                        default: withCtx(({ field, errorMessage }) => [
                                          createVNode(_component_q_input, mergeProps(field, {
                                            label: "訊息 *",
                                            type: "textarea",
                                            outlined: "",
                                            error: !!errorMessage,
                                            "error-message": errorMessage,
                                            rows: "4"
                                          }), null, 16, ["error", "error-message"])
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  createVNode(_component_q_btn, {
                                    type: "submit",
                                    color: "primary",
                                    loading: isSubmitting,
                                    disable: Object.keys(errors).length > 0,
                                    class: "q-mt-md"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 測試聯絡表單驗證 ")
                                    ]),
                                    _: 2
                                  }, 1032, ["loading", "disable"])
                                ]),
                                _: 1
                              }, 8, ["validation-schema"]),
                              contactResult.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "q-mt-md"
                              }, [
                                createVNode(_component_q_banner, {
                                  class: contactResult.value.success ? "bg-green-1 text-green-8" : "bg-red-1 text-red-8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-weight-bold" }, toDisplayString(contactResult.value.success ? "驗證通過" : "驗證失敗"), 1),
                                    createVNode("div", { class: "text-caption" }, toDisplayString(contactResult.value.message), 1)
                                  ]),
                                  _: 1
                                }, 8, ["class"])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode(_component_q_card, {
                    flat: "",
                    bordered: "",
                    class: "q-mt-md"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 q-mb-md" }, [
                            createVNode(_component_q_icon, {
                              name: "info",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 驗證規則說明 ")
                          ]),
                          createVNode("div", { class: "row q-gutter-md" }, [
                            createVNode("div", { class: "col-12 col-md-4" }, [
                              createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "電子郵件驗證"),
                              createVNode("ul", { class: "text-body2 text-grey-7" }, [
                                createVNode("li", null, "必填欄位"),
                                createVNode("li", null, "有效的 email 格式"),
                                createVNode("li", null, "最大長度 100 字符")
                              ])
                            ]),
                            createVNode("div", { class: "col-12 col-md-4" }, [
                              createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "密碼驗證"),
                              createVNode("ul", { class: "text-body2 text-grey-7" }, [
                                createVNode("li", null, "最少 8 個字符"),
                                createVNode("li", null, "包含大寫字母"),
                                createVNode("li", null, "包含小寫字母"),
                                createVNode("li", null, "包含數字"),
                                createVNode("li", null, "確認密碼必須一致")
                              ])
                            ]),
                            createVNode("div", { class: "col-12 col-md-4" }, [
                              createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "其他驗證"),
                              createVNode("ul", { class: "text-body2 text-grey-7" }, [
                                createVNode("li", null, "姓名：2-50 字符，中英文"),
                                createVNode("li", null, "電話：台灣手機或市話格式"),
                                createVNode("li", null, "年齡：18-120 歲"),
                                createVNode("li", null, "地址：5-200 字符")
                              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/form-validation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const formValidation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e494802e"]]);

export { formValidation as default };
//# sourceMappingURL=form-validation-CjKqGVVg.mjs.map
