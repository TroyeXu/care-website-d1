import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { u as useForm, F as Form, l as loginSchema, a as Field, p as passwordResetSchema } from './validationSchemas-NSZeyp_z.mjs';
import { _ as _export_sfc, u as usePageSeo, o as useQuasar, p as useAuthStore, a as __nuxt_component_1, b as __nuxt_component_2, g as __nuxt_component_1$1, q as __nuxt_component_4, c as __nuxt_component_3, r as __nuxt_component_20, j as __nuxt_component_9$1 } from './server.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_9 } from '../_/QCheckbox.mjs';
import { _ as __nuxt_component_4$1 } from '../_/QExpansionItem.mjs';
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
import 'node:url';
import 'consola';
import '@supabase/supabase-js';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import '../_/use-checkbox.mjs';
import '../_/QSlideTransition.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("登入 - 護理服務平台", "登入您的護理服務平台帳號，管理照護服務");
    const router = useRouter();
    const $q = useQuasar();
    const authStore = useAuthStore();
    const loading = ref(false);
    const showPassword = ref(false);
    const rememberMe = ref(false);
    const showForgotPasswordDialog = ref(false);
    const showErrorDialog = ref(false);
    const errorMessage = ref("");
    const { setFieldValue } = useForm();
    const testAccounts = {
      patient: {
        email: "zhiming.lin@email.com",
        password: "password123"
      },
      caregiver: {
        email: "meiling.chen@email.com",
        password: "password123"
      }
    };
    const fillTestAccount = async (type) => {
      const account = testAccounts[type];
      await nextTick();
      try {
        setFieldValue("email", account.email);
        setFieldValue("password", account.password);
        $q.notify({
          type: "info",
          message: `已填入${type === "patient" ? "患者" : "照護員"}測試帳號`,
          timeout: 2e3
        });
      } catch (error) {
        console.error("填入測試帳號失敗:", error);
      }
    };
    const handleSubmit = async (values) => {
      loading.value = true;
      try {
        await authStore.login(values);
        $q.notify({
          type: "positive",
          message: "登入成功！歡迎回來",
          icon: "check_circle",
          timeout: 3e3
        });
        const user = authStore.currentUser;
        if (user?.role === "caregiver") {
          await router.push("/caregivers");
        } else {
          await router.push("/user/dashboard");
        }
      } catch (error) {
        console.error("登入失敗:", error);
        errorMessage.value = error.message || "登入過程發生錯誤，請稍後再試";
        showErrorDialog.value = true;
        $q.notify({
          type: "negative",
          message: errorMessage.value,
          icon: "error",
          timeout: 5e3
        });
      } finally {
        loading.value = false;
      }
    };
    const handleForgotPassword = async (values) => {
      try {
        await authStore.resetPassword(values.email);
        $q.notify({
          type: "positive",
          message: "密碼重設郵件已發送，請檢查您的信箱",
          icon: "email",
          timeout: 5e3
        });
        showForgotPasswordDialog.value = false;
      } catch (error) {
        console.error("密碼重設失敗:", error);
        $q.notify({
          type: "negative",
          message: error.message || "密碼重設失敗，請稍後再試",
          icon: "error",
          timeout: 5e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_input = __nuxt_component_4;
      const _component_q_checkbox = __nuxt_component_9;
      const _component_q_btn = __nuxt_component_3;
      const _component_q_expansion_item = __nuxt_component_4$1;
      const _component_router_link = resolveComponent("router-link");
      const _component_q_dialog = __nuxt_component_20;
      const _component_q_card_actions = __nuxt_component_9$1;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md flex flex-center bg-grey-1" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: "",
              class: "login-card",
              style: { "min-width": "400px", "max-width": "450px", "width": "100%" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center q-pb-none" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h5 text-primary q-mb-sm" data-v-173742c4${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "login",
                          size: "md",
                          class: "q-mr-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(` 登入帳號 </div><div class="text-grey-6 text-body2" data-v-173742c4${_scopeId3}>歡迎回到護理服務平台</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h5 text-primary q-mb-sm" }, [
                            createVNode(_component_q_icon, {
                              name: "login",
                              size: "md",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 登入帳號 ")
                          ]),
                          createVNode("div", { class: "text-grey-6 text-body2" }, "歡迎回到護理服務平台")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Form), {
                          "validation-schema": unref(loginSchema),
                          onSubmit: handleSubmit
                        }, {
                          default: withCtx(({ errors, isSubmitting }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="row q-gutter-md q-mb-md" data-v-173742c4${_scopeId4}><div class="col" data-v-173742c4${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "email" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "電子郵件",
                                      type: "email",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "email",
                                      placeholder: "請輸入您的電子郵件",
                                      autocomplete: "email"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "email",
                                        placeholder: "請輸入您的電子郵件",
                                        autocomplete: "email"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div><div class="row q-gutter-md q-mb-lg" data-v-173742c4${_scopeId4}><div class="col" data-v-173742c4${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "password" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "密碼",
                                      type: showPassword.value ? "text" : "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "lock",
                                      placeholder: "請輸入您的密碼",
                                      autocomplete: "current-password"
                                    }), {
                                      append: withCtx((_4, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_icon, {
                                            name: showPassword.value ? "visibility" : "visibility_off",
                                            class: "cursor-pointer",
                                            onClick: ($event) => showPassword.value = !showPassword.value
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: showPassword.value ? "visibility" : "visibility_off",
                                              class: "cursor-pointer",
                                              onClick: ($event) => showPassword.value = !showPassword.value
                                            }, null, 8, ["name", "onClick"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "密碼",
                                        type: showPassword.value ? "text" : "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "lock",
                                        placeholder: "請輸入您的密碼",
                                        autocomplete: "current-password"
                                      }), {
                                        append: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: showPassword.value ? "visibility" : "visibility_off",
                                            class: "cursor-pointer",
                                            onClick: ($event) => showPassword.value = !showPassword.value
                                          }, null, 8, ["name", "onClick"])
                                        ]),
                                        _: 2
                                      }, 1040, ["type", "error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div><div class="row justify-between items-center q-mb-lg" data-v-173742c4${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_checkbox, {
                                modelValue: rememberMe.value,
                                "onUpdate:modelValue": ($event) => rememberMe.value = $event,
                                label: "記住我",
                                color: "primary",
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_btn, {
                                flat: "",
                                "no-caps": "",
                                color: "primary",
                                size: "sm",
                                onClick: ($event) => showForgotPasswordDialog.value = true
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 忘記密碼？ `);
                                  } else {
                                    return [
                                      createTextVNode(" 忘記密碼？ ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="row q-gutter-md q-mb-md" data-v-173742c4${_scopeId4}><div class="col" data-v-173742c4${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                size: "lg",
                                class: "full-width",
                                loading: isSubmitting || loading.value,
                                disable: Object.keys(errors).length > 0,
                                icon: "login"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(isSubmitting ? "登入中..." : "登入")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(isSubmitting ? "登入中..." : "登入"), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                              _push5(ssrRenderComponent(_component_q_expansion_item, {
                                icon: "info",
                                label: "測試帳號資訊",
                                class: "q-mb-md",
                                "header-class": "text-grey-6 text-caption"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="q-pa-md bg-blue-1" data-v-173742c4${_scopeId5}><div class="text-caption text-grey-7 q-mb-sm" data-v-173742c4${_scopeId5}> 您可以使用以下測試帳號進行登入： </div><div class="q-mb-xs" data-v-173742c4${_scopeId5}><strong data-v-173742c4${_scopeId5}>患者帳號：</strong>`);
                                    _push6(ssrRenderComponent(_component_q_btn, {
                                      flat: "",
                                      dense: "",
                                      size: "sm",
                                      color: "primary",
                                      onClick: ($event) => fillTestAccount("patient")
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` zhiming.lin@email.com `);
                                        } else {
                                          return [
                                            createTextVNode(" zhiming.lin@email.com ")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(`</div><div class="q-mb-xs" data-v-173742c4${_scopeId5}><strong data-v-173742c4${_scopeId5}>照護員帳號：</strong>`);
                                    _push6(ssrRenderComponent(_component_q_btn, {
                                      flat: "",
                                      dense: "",
                                      size: "sm",
                                      color: "primary",
                                      onClick: ($event) => fillTestAccount("caregiver")
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` meiling.chen@email.com `);
                                        } else {
                                          return [
                                            createTextVNode(" meiling.chen@email.com ")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(`</div><div class="text-caption text-grey-6" data-v-173742c4${_scopeId5}>密碼：password123</div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "q-pa-md bg-blue-1" }, [
                                        createVNode("div", { class: "text-caption text-grey-7 q-mb-sm" }, " 您可以使用以下測試帳號進行登入： "),
                                        createVNode("div", { class: "q-mb-xs" }, [
                                          createVNode("strong", null, "患者帳號："),
                                          createVNode(_component_q_btn, {
                                            flat: "",
                                            dense: "",
                                            size: "sm",
                                            color: "primary",
                                            onClick: ($event) => fillTestAccount("patient")
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" zhiming.lin@email.com ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
                                        ]),
                                        createVNode("div", { class: "q-mb-xs" }, [
                                          createVNode("strong", null, "照護員帳號："),
                                          createVNode(_component_q_btn, {
                                            flat: "",
                                            dense: "",
                                            size: "sm",
                                            color: "primary",
                                            onClick: ($event) => fillTestAccount("caregiver")
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" meiling.chen@email.com ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
                                        ]),
                                        createVNode("div", { class: "text-caption text-grey-6" }, "密碼：password123")
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`<div class="text-center" data-v-173742c4${_scopeId4}><div class="text-body2 text-grey-6" data-v-173742c4${_scopeId4}> 還沒有帳號？ `);
                              _push5(ssrRenderComponent(_component_router_link, {
                                to: "/auth/register",
                                class: "text-primary text-decoration-none"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 立即註冊 `);
                                  } else {
                                    return [
                                      createTextVNode(" 立即註冊 ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(unref(Field), { name: "email" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "電子郵件",
                                          type: "email",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2,
                                          "prefix-icon": "email",
                                          placeholder: "請輸入您的電子郵件",
                                          autocomplete: "email"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(unref(Field), { name: "password" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "密碼",
                                          type: showPassword.value ? "text" : "password",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2,
                                          "prefix-icon": "lock",
                                          placeholder: "請輸入您的密碼",
                                          autocomplete: "current-password"
                                        }), {
                                          append: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: showPassword.value ? "visibility" : "visibility_off",
                                              class: "cursor-pointer",
                                              onClick: ($event) => showPassword.value = !showPassword.value
                                            }, null, 8, ["name", "onClick"])
                                          ]),
                                          _: 2
                                        }, 1040, ["type", "error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "row justify-between items-center q-mb-lg" }, [
                                  createVNode(_component_q_checkbox, {
                                    modelValue: rememberMe.value,
                                    "onUpdate:modelValue": ($event) => rememberMe.value = $event,
                                    label: "記住我",
                                    color: "primary",
                                    size: "sm"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(_component_q_btn, {
                                    flat: "",
                                    "no-caps": "",
                                    color: "primary",
                                    size: "sm",
                                    onClick: ($event) => showForgotPasswordDialog.value = true
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 忘記密碼？ ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(_component_q_btn, {
                                      type: "submit",
                                      color: "primary",
                                      size: "lg",
                                      class: "full-width",
                                      loading: isSubmitting || loading.value,
                                      disable: Object.keys(errors).length > 0,
                                      icon: "login"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(isSubmitting ? "登入中..." : "登入"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["loading", "disable"])
                                  ])
                                ]),
                                createVNode(_component_q_expansion_item, {
                                  icon: "info",
                                  label: "測試帳號資訊",
                                  class: "q-mb-md",
                                  "header-class": "text-grey-6 text-caption"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "q-pa-md bg-blue-1" }, [
                                      createVNode("div", { class: "text-caption text-grey-7 q-mb-sm" }, " 您可以使用以下測試帳號進行登入： "),
                                      createVNode("div", { class: "q-mb-xs" }, [
                                        createVNode("strong", null, "患者帳號："),
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          dense: "",
                                          size: "sm",
                                          color: "primary",
                                          onClick: ($event) => fillTestAccount("patient")
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" zhiming.lin@email.com ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
                                      ]),
                                      createVNode("div", { class: "q-mb-xs" }, [
                                        createVNode("strong", null, "照護員帳號："),
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          dense: "",
                                          size: "sm",
                                          color: "primary",
                                          onClick: ($event) => fillTestAccount("caregiver")
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" meiling.chen@email.com ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
                                      ]),
                                      createVNode("div", { class: "text-caption text-grey-6" }, "密碼：password123")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-body2 text-grey-6" }, [
                                    createTextVNode(" 還沒有帳號？ "),
                                    createVNode(_component_router_link, {
                                      to: "/auth/register",
                                      class: "text-primary text-decoration-none"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 立即註冊 ")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Form), {
                            "validation-schema": unref(loginSchema),
                            onSubmit: handleSubmit
                          }, {
                            default: withCtx(({ errors, isSubmitting }) => [
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(unref(Field), { name: "email" }, {
                                    default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "email",
                                        placeholder: "請輸入您的電子郵件",
                                        autocomplete: "email"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(unref(Field), { name: "password" }, {
                                    default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "密碼",
                                        type: showPassword.value ? "text" : "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "lock",
                                        placeholder: "請輸入您的密碼",
                                        autocomplete: "current-password"
                                      }), {
                                        append: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: showPassword.value ? "visibility" : "visibility_off",
                                            class: "cursor-pointer",
                                            onClick: ($event) => showPassword.value = !showPassword.value
                                          }, null, 8, ["name", "onClick"])
                                        ]),
                                        _: 2
                                      }, 1040, ["type", "error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "row justify-between items-center q-mb-lg" }, [
                                createVNode(_component_q_checkbox, {
                                  modelValue: rememberMe.value,
                                  "onUpdate:modelValue": ($event) => rememberMe.value = $event,
                                  label: "記住我",
                                  color: "primary",
                                  size: "sm"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_q_btn, {
                                  flat: "",
                                  "no-caps": "",
                                  color: "primary",
                                  size: "sm",
                                  onClick: ($event) => showForgotPasswordDialog.value = true
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 忘記密碼？ ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(_component_q_btn, {
                                    type: "submit",
                                    color: "primary",
                                    size: "lg",
                                    class: "full-width",
                                    loading: isSubmitting || loading.value,
                                    disable: Object.keys(errors).length > 0,
                                    icon: "login"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(isSubmitting ? "登入中..." : "登入"), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["loading", "disable"])
                                ])
                              ]),
                              createVNode(_component_q_expansion_item, {
                                icon: "info",
                                label: "測試帳號資訊",
                                class: "q-mb-md",
                                "header-class": "text-grey-6 text-caption"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "q-pa-md bg-blue-1" }, [
                                    createVNode("div", { class: "text-caption text-grey-7 q-mb-sm" }, " 您可以使用以下測試帳號進行登入： "),
                                    createVNode("div", { class: "q-mb-xs" }, [
                                      createVNode("strong", null, "患者帳號："),
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        dense: "",
                                        size: "sm",
                                        color: "primary",
                                        onClick: ($event) => fillTestAccount("patient")
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" zhiming.lin@email.com ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ]),
                                    createVNode("div", { class: "q-mb-xs" }, [
                                      createVNode("strong", null, "照護員帳號："),
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        dense: "",
                                        size: "sm",
                                        color: "primary",
                                        onClick: ($event) => fillTestAccount("caregiver")
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" meiling.chen@email.com ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ]),
                                    createVNode("div", { class: "text-caption text-grey-6" }, "密碼：password123")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "text-center" }, [
                                createVNode("div", { class: "text-body2 text-grey-6" }, [
                                  createTextVNode(" 還沒有帳號？ "),
                                  createVNode(_component_router_link, {
                                    to: "/auth/register",
                                    class: "text-primary text-decoration-none"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 立即註冊 ")
                                    ]),
                                    _: 1
                                  })
                                ])
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
                    createVNode(_component_q_card_section, { class: "text-center q-pb-none" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h5 text-primary q-mb-sm" }, [
                          createVNode(_component_q_icon, {
                            name: "login",
                            size: "md",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" 登入帳號 ")
                        ]),
                        createVNode("div", { class: "text-grey-6 text-body2" }, "歡迎回到護理服務平台")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode(unref(Form), {
                          "validation-schema": unref(loginSchema),
                          onSubmit: handleSubmit
                        }, {
                          default: withCtx(({ errors, isSubmitting }) => [
                            createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(unref(Field), { name: "email" }, {
                                  default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "電子郵件",
                                      type: "email",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "email",
                                      placeholder: "請輸入您的電子郵件",
                                      autocomplete: "email"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(unref(Field), { name: "password" }, {
                                  default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "密碼",
                                      type: showPassword.value ? "text" : "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "lock",
                                      placeholder: "請輸入您的密碼",
                                      autocomplete: "current-password"
                                    }), {
                                      append: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: showPassword.value ? "visibility" : "visibility_off",
                                          class: "cursor-pointer",
                                          onClick: ($event) => showPassword.value = !showPassword.value
                                        }, null, 8, ["name", "onClick"])
                                      ]),
                                      _: 2
                                    }, 1040, ["type", "error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "row justify-between items-center q-mb-lg" }, [
                              createVNode(_component_q_checkbox, {
                                modelValue: rememberMe.value,
                                "onUpdate:modelValue": ($event) => rememberMe.value = $event,
                                label: "記住我",
                                color: "primary",
                                size: "sm"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_q_btn, {
                                flat: "",
                                "no-caps": "",
                                color: "primary",
                                size: "sm",
                                onClick: ($event) => showForgotPasswordDialog.value = true
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 忘記密碼？ ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(_component_q_btn, {
                                  type: "submit",
                                  color: "primary",
                                  size: "lg",
                                  class: "full-width",
                                  loading: isSubmitting || loading.value,
                                  disable: Object.keys(errors).length > 0,
                                  icon: "login"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(isSubmitting ? "登入中..." : "登入"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["loading", "disable"])
                              ])
                            ]),
                            createVNode(_component_q_expansion_item, {
                              icon: "info",
                              label: "測試帳號資訊",
                              class: "q-mb-md",
                              "header-class": "text-grey-6 text-caption"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "q-pa-md bg-blue-1" }, [
                                  createVNode("div", { class: "text-caption text-grey-7 q-mb-sm" }, " 您可以使用以下測試帳號進行登入： "),
                                  createVNode("div", { class: "q-mb-xs" }, [
                                    createVNode("strong", null, "患者帳號："),
                                    createVNode(_component_q_btn, {
                                      flat: "",
                                      dense: "",
                                      size: "sm",
                                      color: "primary",
                                      onClick: ($event) => fillTestAccount("patient")
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" zhiming.lin@email.com ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  createVNode("div", { class: "q-mb-xs" }, [
                                    createVNode("strong", null, "照護員帳號："),
                                    createVNode(_component_q_btn, {
                                      flat: "",
                                      dense: "",
                                      size: "sm",
                                      color: "primary",
                                      onClick: ($event) => fillTestAccount("caregiver")
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" meiling.chen@email.com ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  createVNode("div", { class: "text-caption text-grey-6" }, "密碼：password123")
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "text-center" }, [
                              createVNode("div", { class: "text-body2 text-grey-6" }, [
                                createTextVNode(" 還沒有帳號？ "),
                                createVNode(_component_router_link, {
                                  to: "/auth/register",
                                  class: "text-primary text-decoration-none"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 立即註冊 ")
                                  ]),
                                  _: 1
                                })
                              ])
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
            _push2(ssrRenderComponent(_component_q_dialog, {
              modelValue: showForgotPasswordDialog.value,
              "onUpdate:modelValue": ($event) => showForgotPasswordDialog.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card, { style: { "min-width": "350px" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_card_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-h6" data-v-173742c4${_scopeId4}>重設密碼</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-h6" }, "重設密碼")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_card_section, { class: "q-pt-none" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Form), {
                                "validation-schema": unref(passwordResetSchema),
                                onSubmit: handleForgotPassword
                              }, {
                                default: withCtx(({ errors: resetErrors, isSubmitting: isResetting }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Field), { name: "email" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                            label: "電子郵件",
                                            type: "email",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage2,
                                            "error-message": errorMessage2,
                                            placeholder: "請輸入您的電子郵件"
                                          }), null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_input, mergeProps(field, {
                                              label: "電子郵件",
                                              type: "email",
                                              outlined: "",
                                              dense: "",
                                              error: !!errorMessage2,
                                              "error-message": errorMessage2,
                                              placeholder: "請輸入您的電子郵件"
                                            }), null, 16, ["error", "error-message"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="row q-gutter-sm q-mt-md" data-v-173742c4${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_q_btn, {
                                      flat: "",
                                      label: "取消",
                                      onClick: ($event) => showForgotPasswordDialog.value = false
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_q_btn, {
                                      type: "submit",
                                      color: "primary",
                                      label: "發送重設郵件",
                                      loading: isResetting,
                                      disable: Object.keys(resetErrors).length > 0
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode(unref(Field), { name: "email" }, {
                                        default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                          createVNode(_component_q_input, mergeProps(field, {
                                            label: "電子郵件",
                                            type: "email",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage2,
                                            "error-message": errorMessage2,
                                            placeholder: "請輸入您的電子郵件"
                                          }), null, 16, ["error", "error-message"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "row q-gutter-sm q-mt-md" }, [
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          label: "取消",
                                          onClick: ($event) => showForgotPasswordDialog.value = false
                                        }, null, 8, ["onClick"]),
                                        createVNode(_component_q_btn, {
                                          type: "submit",
                                          color: "primary",
                                          label: "發送重設郵件",
                                          loading: isResetting,
                                          disable: Object.keys(resetErrors).length > 0
                                        }, null, 8, ["loading", "disable"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Form), {
                                  "validation-schema": unref(passwordResetSchema),
                                  onSubmit: handleForgotPassword
                                }, {
                                  default: withCtx(({ errors: resetErrors, isSubmitting: isResetting }) => [
                                    createVNode(unref(Field), { name: "email" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "電子郵件",
                                          type: "email",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2,
                                          placeholder: "請輸入您的電子郵件"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "row q-gutter-sm q-mt-md" }, [
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        label: "取消",
                                        onClick: ($event) => showForgotPasswordDialog.value = false
                                      }, null, 8, ["onClick"]),
                                      createVNode(_component_q_btn, {
                                        type: "submit",
                                        color: "primary",
                                        label: "發送重設郵件",
                                        loading: isResetting,
                                        disable: Object.keys(resetErrors).length > 0
                                      }, null, 8, ["loading", "disable"])
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["validation-schema"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6" }, "重設密碼")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_card_section, { class: "q-pt-none" }, {
                            default: withCtx(() => [
                              createVNode(unref(Form), {
                                "validation-schema": unref(passwordResetSchema),
                                onSubmit: handleForgotPassword
                              }, {
                                default: withCtx(({ errors: resetErrors, isSubmitting: isResetting }) => [
                                  createVNode(unref(Field), { name: "email" }, {
                                    default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        placeholder: "請輸入您的電子郵件"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "row q-gutter-sm q-mt-md" }, [
                                    createVNode(_component_q_btn, {
                                      flat: "",
                                      label: "取消",
                                      onClick: ($event) => showForgotPasswordDialog.value = false
                                    }, null, 8, ["onClick"]),
                                    createVNode(_component_q_btn, {
                                      type: "submit",
                                      color: "primary",
                                      label: "發送重設郵件",
                                      loading: isResetting,
                                      disable: Object.keys(resetErrors).length > 0
                                    }, null, 8, ["loading", "disable"])
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card, { style: { "min-width": "350px" } }, {
                      default: withCtx(() => [
                        createVNode(_component_q_card_section, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-h6" }, "重設密碼")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_card_section, { class: "q-pt-none" }, {
                          default: withCtx(() => [
                            createVNode(unref(Form), {
                              "validation-schema": unref(passwordResetSchema),
                              onSubmit: handleForgotPassword
                            }, {
                              default: withCtx(({ errors: resetErrors, isSubmitting: isResetting }) => [
                                createVNode(unref(Field), { name: "email" }, {
                                  default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "電子郵件",
                                      type: "email",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      placeholder: "請輸入您的電子郵件"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "row q-gutter-sm q-mt-md" }, [
                                  createVNode(_component_q_btn, {
                                    flat: "",
                                    label: "取消",
                                    onClick: ($event) => showForgotPasswordDialog.value = false
                                  }, null, 8, ["onClick"]),
                                  createVNode(_component_q_btn, {
                                    type: "submit",
                                    color: "primary",
                                    label: "發送重設郵件",
                                    loading: isResetting,
                                    disable: Object.keys(resetErrors).length > 0
                                  }, null, 8, ["loading", "disable"])
                                ])
                              ]),
                              _: 1
                            }, 8, ["validation-schema"])
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
            _push2(ssrRenderComponent(_component_q_dialog, {
              modelValue: showErrorDialog.value,
              "onUpdate:modelValue": ($event) => showErrorDialog.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_card_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-h6 text-negative" data-v-173742c4${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_icon, {
                                name: "error",
                                class: "q-mr-sm"
                              }, null, _parent5, _scopeId4));
                              _push5(` 登入失敗 </div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-h6 text-negative" }, [
                                  createVNode(_component_q_icon, {
                                    name: "error",
                                    class: "q-mr-sm"
                                  }),
                                  createTextVNode(" 登入失敗 ")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_card_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(errorMessage.value)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(errorMessage.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_card_actions, { align: "right" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_btn, {
                                flat: "",
                                color: "primary",
                                onClick: ($event) => showErrorDialog.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 確定 `);
                                  } else {
                                    return [
                                      createTextVNode(" 確定 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_btn, {
                                  flat: "",
                                  color: "primary",
                                  onClick: ($event) => showErrorDialog.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 確定 ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6 text-negative" }, [
                                createVNode(_component_q_icon, {
                                  name: "error",
                                  class: "q-mr-sm"
                                }),
                                createTextVNode(" 登入失敗 ")
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(errorMessage.value), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_card_actions, { align: "right" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "primary",
                                onClick: ($event) => showErrorDialog.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 確定 ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
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
                    createVNode(_component_q_card, null, {
                      default: withCtx(() => [
                        createVNode(_component_q_card_section, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-h6 text-negative" }, [
                              createVNode(_component_q_icon, {
                                name: "error",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" 登入失敗 ")
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_card_section, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(errorMessage.value), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_card_actions, { align: "right" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "primary",
                              onClick: ($event) => showErrorDialog.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 確定 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
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
                class: "login-card",
                style: { "min-width": "400px", "max-width": "450px", "width": "100%" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, { class: "text-center q-pb-none" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h5 text-primary q-mb-sm" }, [
                        createVNode(_component_q_icon, {
                          name: "login",
                          size: "md",
                          class: "q-mr-sm"
                        }),
                        createTextVNode(" 登入帳號 ")
                      ]),
                      createVNode("div", { class: "text-grey-6 text-body2" }, "歡迎回到護理服務平台")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode(unref(Form), {
                        "validation-schema": unref(loginSchema),
                        onSubmit: handleSubmit
                      }, {
                        default: withCtx(({ errors, isSubmitting }) => [
                          createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(unref(Field), { name: "email" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "電子郵件",
                                    type: "email",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage2,
                                    "error-message": errorMessage2,
                                    "prefix-icon": "email",
                                    placeholder: "請輸入您的電子郵件",
                                    autocomplete: "email"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(unref(Field), { name: "password" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "密碼",
                                    type: showPassword.value ? "text" : "password",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage2,
                                    "error-message": errorMessage2,
                                    "prefix-icon": "lock",
                                    placeholder: "請輸入您的密碼",
                                    autocomplete: "current-password"
                                  }), {
                                    append: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: showPassword.value ? "visibility" : "visibility_off",
                                        class: "cursor-pointer",
                                        onClick: ($event) => showPassword.value = !showPassword.value
                                      }, null, 8, ["name", "onClick"])
                                    ]),
                                    _: 2
                                  }, 1040, ["type", "error", "error-message"])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "row justify-between items-center q-mb-lg" }, [
                            createVNode(_component_q_checkbox, {
                              modelValue: rememberMe.value,
                              "onUpdate:modelValue": ($event) => rememberMe.value = $event,
                              label: "記住我",
                              color: "primary",
                              size: "sm"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_q_btn, {
                              flat: "",
                              "no-caps": "",
                              color: "primary",
                              size: "sm",
                              onClick: ($event) => showForgotPasswordDialog.value = true
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 忘記密碼？ ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                size: "lg",
                                class: "full-width",
                                loading: isSubmitting || loading.value,
                                disable: Object.keys(errors).length > 0,
                                icon: "login"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(isSubmitting ? "登入中..." : "登入"), 1)
                                ]),
                                _: 2
                              }, 1032, ["loading", "disable"])
                            ])
                          ]),
                          createVNode(_component_q_expansion_item, {
                            icon: "info",
                            label: "測試帳號資訊",
                            class: "q-mb-md",
                            "header-class": "text-grey-6 text-caption"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "q-pa-md bg-blue-1" }, [
                                createVNode("div", { class: "text-caption text-grey-7 q-mb-sm" }, " 您可以使用以下測試帳號進行登入： "),
                                createVNode("div", { class: "q-mb-xs" }, [
                                  createVNode("strong", null, "患者帳號："),
                                  createVNode(_component_q_btn, {
                                    flat: "",
                                    dense: "",
                                    size: "sm",
                                    color: "primary",
                                    onClick: ($event) => fillTestAccount("patient")
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" zhiming.lin@email.com ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                createVNode("div", { class: "q-mb-xs" }, [
                                  createVNode("strong", null, "照護員帳號："),
                                  createVNode(_component_q_btn, {
                                    flat: "",
                                    dense: "",
                                    size: "sm",
                                    color: "primary",
                                    onClick: ($event) => fillTestAccount("caregiver")
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" meiling.chen@email.com ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                createVNode("div", { class: "text-caption text-grey-6" }, "密碼：password123")
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "text-center" }, [
                            createVNode("div", { class: "text-body2 text-grey-6" }, [
                              createTextVNode(" 還沒有帳號？ "),
                              createVNode(_component_router_link, {
                                to: "/auth/register",
                                class: "text-primary text-decoration-none"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 立即註冊 ")
                                ]),
                                _: 1
                              })
                            ])
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
              createVNode(_component_q_dialog, {
                modelValue: showForgotPasswordDialog.value,
                "onUpdate:modelValue": ($event) => showForgotPasswordDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card, { style: { "min-width": "350px" } }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6" }, "重設密碼")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card_section, { class: "q-pt-none" }, {
                        default: withCtx(() => [
                          createVNode(unref(Form), {
                            "validation-schema": unref(passwordResetSchema),
                            onSubmit: handleForgotPassword
                          }, {
                            default: withCtx(({ errors: resetErrors, isSubmitting: isResetting }) => [
                              createVNode(unref(Field), { name: "email" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "電子郵件",
                                    type: "email",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage2,
                                    "error-message": errorMessage2,
                                    placeholder: "請輸入您的電子郵件"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "row q-gutter-sm q-mt-md" }, [
                                createVNode(_component_q_btn, {
                                  flat: "",
                                  label: "取消",
                                  onClick: ($event) => showForgotPasswordDialog.value = false
                                }, null, 8, ["onClick"]),
                                createVNode(_component_q_btn, {
                                  type: "submit",
                                  color: "primary",
                                  label: "發送重設郵件",
                                  loading: isResetting,
                                  disable: Object.keys(resetErrors).length > 0
                                }, null, 8, ["loading", "disable"])
                              ])
                            ]),
                            _: 1
                          }, 8, ["validation-schema"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_q_dialog, {
                modelValue: showErrorDialog.value,
                "onUpdate:modelValue": ($event) => showErrorDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card, null, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 text-negative" }, [
                            createVNode(_component_q_icon, {
                              name: "error",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 登入失敗 ")
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(errorMessage.value), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card_actions, { align: "right" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "primary",
                            onClick: ($event) => showErrorDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 確定 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-173742c4"]]);

export { login as default };
//# sourceMappingURL=login-BfrQnbO9.mjs.map
