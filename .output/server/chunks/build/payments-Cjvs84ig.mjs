import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useApiService } from './useApiService-Bqe0bsFu.mjs';
import { u as usePageSeo, o as useQuasar, p as useAuthStore, O as useNuxtApp, l as useRuntimeConfig, k as useHead, g as __nuxt_component_1$1, a as __nuxt_component_1, b as __nuxt_component_2, c as __nuxt_component_3, d as __nuxt_component_3$2, e as __nuxt_component_5, f as __nuxt_component_6, h as __nuxt_component_8, i as __nuxt_component_5$2, q as __nuxt_component_4 } from './server.mjs';
import { _ as __nuxt_component_17 } from '../_/QForm.mjs';
import { _ as __nuxt_component_8$1 } from '../_/QSelect.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_9 } from '../_/QSpinnerDots.mjs';
import { _ as __nuxt_component_9$1 } from '../_/QChip.mjs';
import './useApiConfig-D0iRs2xG.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PaymentForm",
  __ssrInlineRender: true,
  emits: ["payment-success"],
  setup(__props, { emit: __emit }) {
    const $q = useQuasar();
    const apiService = useApiService();
    useAuthStore();
    const bookingId = ref("");
    const amount = ref(null);
    const method = ref("credit_card");
    const isSubmitting = ref(false);
    const cardDetails = ref({
      number: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: ""
    });
    const paymentMethods = [
      { label: "信用卡", value: "credit_card" },
      { label: "銀行轉帳", value: "bank_transfer" },
      { label: "現金付款", value: "cash" }
    ];
    const emit = __emit;
    const submit = async () => {
      if (!bookingId.value || !amount.value) {
        $q.notify({
          type: "negative",
          message: "請填寫完整的付款資訊",
          timeout: 3e3
        });
        return;
      }
      if (method.value === "credit_card" && (!cardDetails.value.number || !cardDetails.value.expiryMonth || !cardDetails.value.expiryYear || !cardDetails.value.cvv)) {
        $q.notify({
          type: "negative",
          message: "請填寫完整的信用卡資訊",
          timeout: 3e3
        });
        return;
      }
      isSubmitting.value = true;
      try {
        const paymentData = {
          bookingId: bookingId.value,
          amount: amount.value,
          method: method.value,
          ...method.value === "credit_card" && { cardDetails: cardDetails.value }
        };
        const result = await apiService.processPayment(paymentData);
        $q.notify({
          type: "positive",
          message: "付款成功！",
          timeout: 3e3
        });
        resetForm();
        emit("payment-success", result);
      } catch (error) {
        console.error("付款失敗:", error);
        $q.notify({
          type: "negative",
          message: error.message || "付款失敗，請稍後再試",
          timeout: 5e3
        });
      } finally {
        isSubmitting.value = false;
      }
    };
    const resetForm = () => {
      bookingId.value = "";
      amount.value = null;
      method.value = "credit_card";
      cardDetails.value = {
        number: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: ""
      };
    };
    const fillTestData = () => {
      bookingId.value = "booking-test-" + Date.now();
      amount.value = 1500;
      method.value = "credit_card";
      cardDetails.value = {
        number: "4111111111111111",
        expiryMonth: "12",
        expiryYear: "2025",
        cvv: "123"
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_form = __nuxt_component_17;
      const _component_q_input = __nuxt_component_4;
      const _component_q_select = __nuxt_component_8$1;
      const _component_q_btn = __nuxt_component_3;
      _push(ssrRenderComponent(_component_q_card, mergeProps({
        flat: "",
        bordered: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card_section, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-h6 q-mb-md"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_q_icon, {
                    name: "payment",
                    class: "q-mr-sm"
                  }, null, _parent3, _scopeId2));
                  _push3(` 新增付款 </div>`);
                  _push3(ssrRenderComponent(_component_q_form, {
                    onSubmit: submit,
                    class: "q-gutter-md"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="row q-gutter-md"${_scopeId3}><div class="col-12 col-sm-6"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_input, {
                          modelValue: bookingId.value,
                          "onUpdate:modelValue": ($event) => bookingId.value = $event,
                          label: "預約編號 *",
                          outlined: "",
                          dense: "",
                          placeholder: "輸入預約編號"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="col-12 col-sm-6"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_input, {
                          modelValue: amount.value,
                          "onUpdate:modelValue": ($event) => amount.value = $event,
                          modelModifiers: { number: true },
                          label: "付款金額 *",
                          type: "number",
                          outlined: "",
                          dense: "",
                          min: "1",
                          suffix: "元",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                        _push4(ssrRenderComponent(_component_q_select, {
                          modelValue: method.value,
                          "onUpdate:modelValue": ($event) => method.value = $event,
                          options: paymentMethods,
                          label: "付款方式 *",
                          outlined: "",
                          dense: "",
                          "emit-value": "",
                          "map-options": ""
                        }, null, _parent4, _scopeId3));
                        if (method.value === "credit_card") {
                          _push4(`<div class="q-pa-md bg-grey-1 rounded-borders"${_scopeId3}><div class="text-subtitle2 q-mb-md"${_scopeId3}>信用卡資訊</div><div class="row q-gutter-md"${_scopeId3}><div class="col-12"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_input, {
                            modelValue: cardDetails.value.number,
                            "onUpdate:modelValue": ($event) => cardDetails.value.number = $event,
                            label: "信用卡號碼 *",
                            outlined: "",
                            dense: "",
                            mask: "#### #### #### ####",
                            placeholder: "1234 5678 9012 3456"
                          }, null, _parent4, _scopeId3));
                          _push4(`</div><div class="col-6"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_select, {
                            modelValue: cardDetails.value.expiryMonth,
                            "onUpdate:modelValue": ($event) => cardDetails.value.expiryMonth = $event,
                            options: Array.from({ length: 12 }, (_4, i) => ({ label: String(i + 1).padStart(2, "0"), value: String(i + 1).padStart(2, "0") })),
                            label: "月份 *",
                            outlined: "",
                            dense: "",
                            "emit-value": "",
                            "map-options": ""
                          }, null, _parent4, _scopeId3));
                          _push4(`</div><div class="col-6"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_select, {
                            modelValue: cardDetails.value.expiryYear,
                            "onUpdate:modelValue": ($event) => cardDetails.value.expiryYear = $event,
                            options: Array.from({ length: 10 }, (_4, i) => ({ label: String(2024 + i), value: String(2024 + i) })),
                            label: "年份 *",
                            outlined: "",
                            dense: "",
                            "emit-value": "",
                            "map-options": ""
                          }, null, _parent4, _scopeId3));
                          _push4(`</div><div class="col-12"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_input, {
                            modelValue: cardDetails.value.cvv,
                            "onUpdate:modelValue": ($event) => cardDetails.value.cvv = $event,
                            label: "CVV *",
                            outlined: "",
                            dense: "",
                            mask: "###",
                            placeholder: "123"
                          }, null, _parent4, _scopeId3));
                          _push4(`</div></div></div>`);
                        } else if (method.value === "bank_transfer") {
                          _push4(`<div class="q-pa-md bg-blue-1 rounded-borders"${_scopeId3}><div class="text-subtitle2 q-mb-sm"${_scopeId3}>銀行轉帳資訊</div><div class="text-body2"${_scopeId3}><div${_scopeId3}>銀行：台灣銀行</div><div${_scopeId3}>戶名：護理服務平台有限公司</div><div${_scopeId3}>帳號：123-456-789012</div><div class="text-caption text-grey-6 q-mt-sm"${_scopeId3}>請於轉帳完成後提交此表單</div></div></div>`);
                        } else if (method.value === "cash") {
                          _push4(`<div class="q-pa-md bg-green-1 rounded-borders"${_scopeId3}><div class="text-subtitle2 q-mb-sm"${_scopeId3}>現金付款</div><div class="text-body2"${_scopeId3}> 請於服務時直接向看護師付款，並索取收據。 </div></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<div class="row q-gutter-sm"${_scopeId3}><div class="col"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_btn, {
                          flat: "",
                          color: "grey",
                          onClick: resetForm,
                          disable: isSubmitting.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 清除 `);
                            } else {
                              return [
                                createTextVNode(" 清除 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="col-auto"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_btn, {
                          flat: "",
                          color: "orange",
                          onClick: fillTestData,
                          disable: isSubmitting.value,
                          size: "sm"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 填入測試資料 `);
                            } else {
                              return [
                                createTextVNode(" 填入測試資料 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="col-auto"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_btn, {
                          type: "submit",
                          color: "primary",
                          loading: isSubmitting.value,
                          icon: "payment"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(isSubmitting.value ? "處理中..." : "確認付款")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(isSubmitting.value ? "處理中..." : "確認付款"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "row q-gutter-md" }, [
                            createVNode("div", { class: "col-12 col-sm-6" }, [
                              createVNode(_component_q_input, {
                                modelValue: bookingId.value,
                                "onUpdate:modelValue": ($event) => bookingId.value = $event,
                                label: "預約編號 *",
                                outlined: "",
                                dense: "",
                                placeholder: "輸入預約編號"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "col-12 col-sm-6" }, [
                              createVNode(_component_q_input, {
                                modelValue: amount.value,
                                "onUpdate:modelValue": ($event) => amount.value = $event,
                                modelModifiers: { number: true },
                                label: "付款金額 *",
                                type: "number",
                                outlined: "",
                                dense: "",
                                min: "1",
                                suffix: "元",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode(_component_q_select, {
                            modelValue: method.value,
                            "onUpdate:modelValue": ($event) => method.value = $event,
                            options: paymentMethods,
                            label: "付款方式 *",
                            outlined: "",
                            dense: "",
                            "emit-value": "",
                            "map-options": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          method.value === "credit_card" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "q-pa-md bg-grey-1 rounded-borders"
                          }, [
                            createVNode("div", { class: "text-subtitle2 q-mb-md" }, "信用卡資訊"),
                            createVNode("div", { class: "row q-gutter-md" }, [
                              createVNode("div", { class: "col-12" }, [
                                createVNode(_component_q_input, {
                                  modelValue: cardDetails.value.number,
                                  "onUpdate:modelValue": ($event) => cardDetails.value.number = $event,
                                  label: "信用卡號碼 *",
                                  outlined: "",
                                  dense: "",
                                  mask: "#### #### #### ####",
                                  placeholder: "1234 5678 9012 3456"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "col-6" }, [
                                createVNode(_component_q_select, {
                                  modelValue: cardDetails.value.expiryMonth,
                                  "onUpdate:modelValue": ($event) => cardDetails.value.expiryMonth = $event,
                                  options: Array.from({ length: 12 }, (_4, i) => ({ label: String(i + 1).padStart(2, "0"), value: String(i + 1).padStart(2, "0") })),
                                  label: "月份 *",
                                  outlined: "",
                                  dense: "",
                                  "emit-value": "",
                                  "map-options": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                              ]),
                              createVNode("div", { class: "col-6" }, [
                                createVNode(_component_q_select, {
                                  modelValue: cardDetails.value.expiryYear,
                                  "onUpdate:modelValue": ($event) => cardDetails.value.expiryYear = $event,
                                  options: Array.from({ length: 10 }, (_4, i) => ({ label: String(2024 + i), value: String(2024 + i) })),
                                  label: "年份 *",
                                  outlined: "",
                                  dense: "",
                                  "emit-value": "",
                                  "map-options": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                              ]),
                              createVNode("div", { class: "col-12" }, [
                                createVNode(_component_q_input, {
                                  modelValue: cardDetails.value.cvv,
                                  "onUpdate:modelValue": ($event) => cardDetails.value.cvv = $event,
                                  label: "CVV *",
                                  outlined: "",
                                  dense: "",
                                  mask: "###",
                                  placeholder: "123"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ])
                          ])) : method.value === "bank_transfer" ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "q-pa-md bg-blue-1 rounded-borders"
                          }, [
                            createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "銀行轉帳資訊"),
                            createVNode("div", { class: "text-body2" }, [
                              createVNode("div", null, "銀行：台灣銀行"),
                              createVNode("div", null, "戶名：護理服務平台有限公司"),
                              createVNode("div", null, "帳號：123-456-789012"),
                              createVNode("div", { class: "text-caption text-grey-6 q-mt-sm" }, "請於轉帳完成後提交此表單")
                            ])
                          ])) : method.value === "cash" ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "q-pa-md bg-green-1 rounded-borders"
                          }, [
                            createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "現金付款"),
                            createVNode("div", { class: "text-body2" }, " 請於服務時直接向看護師付款，並索取收據。 ")
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "row q-gutter-sm" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "grey",
                                onClick: resetForm,
                                disable: isSubmitting.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 清除 ")
                                ]),
                                _: 1
                              }, 8, ["disable"])
                            ]),
                            createVNode("div", { class: "col-auto" }, [
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "orange",
                                onClick: fillTestData,
                                disable: isSubmitting.value,
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 填入測試資料 ")
                                ]),
                                _: 1
                              }, 8, ["disable"])
                            ]),
                            createVNode("div", { class: "col-auto" }, [
                              createVNode(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                loading: isSubmitting.value,
                                icon: "payment"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(isSubmitting.value ? "處理中..." : "確認付款"), 1)
                                ]),
                                _: 1
                              }, 8, ["loading"])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "text-h6 q-mb-md" }, [
                      createVNode(_component_q_icon, {
                        name: "payment",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" 新增付款 ")
                    ]),
                    createVNode(_component_q_form, {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "q-gutter-md"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "row q-gutter-md" }, [
                          createVNode("div", { class: "col-12 col-sm-6" }, [
                            createVNode(_component_q_input, {
                              modelValue: bookingId.value,
                              "onUpdate:modelValue": ($event) => bookingId.value = $event,
                              label: "預約編號 *",
                              outlined: "",
                              dense: "",
                              placeholder: "輸入預約編號"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "col-12 col-sm-6" }, [
                            createVNode(_component_q_input, {
                              modelValue: amount.value,
                              "onUpdate:modelValue": ($event) => amount.value = $event,
                              modelModifiers: { number: true },
                              label: "付款金額 *",
                              type: "number",
                              outlined: "",
                              dense: "",
                              min: "1",
                              suffix: "元",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        createVNode(_component_q_select, {
                          modelValue: method.value,
                          "onUpdate:modelValue": ($event) => method.value = $event,
                          options: paymentMethods,
                          label: "付款方式 *",
                          outlined: "",
                          dense: "",
                          "emit-value": "",
                          "map-options": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        method.value === "credit_card" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "q-pa-md bg-grey-1 rounded-borders"
                        }, [
                          createVNode("div", { class: "text-subtitle2 q-mb-md" }, "信用卡資訊"),
                          createVNode("div", { class: "row q-gutter-md" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode(_component_q_input, {
                                modelValue: cardDetails.value.number,
                                "onUpdate:modelValue": ($event) => cardDetails.value.number = $event,
                                label: "信用卡號碼 *",
                                outlined: "",
                                dense: "",
                                mask: "#### #### #### ####",
                                placeholder: "1234 5678 9012 3456"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "col-6" }, [
                              createVNode(_component_q_select, {
                                modelValue: cardDetails.value.expiryMonth,
                                "onUpdate:modelValue": ($event) => cardDetails.value.expiryMonth = $event,
                                options: Array.from({ length: 12 }, (_3, i) => ({ label: String(i + 1).padStart(2, "0"), value: String(i + 1).padStart(2, "0") })),
                                label: "月份 *",
                                outlined: "",
                                dense: "",
                                "emit-value": "",
                                "map-options": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                            ]),
                            createVNode("div", { class: "col-6" }, [
                              createVNode(_component_q_select, {
                                modelValue: cardDetails.value.expiryYear,
                                "onUpdate:modelValue": ($event) => cardDetails.value.expiryYear = $event,
                                options: Array.from({ length: 10 }, (_3, i) => ({ label: String(2024 + i), value: String(2024 + i) })),
                                label: "年份 *",
                                outlined: "",
                                dense: "",
                                "emit-value": "",
                                "map-options": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                            ]),
                            createVNode("div", { class: "col-12" }, [
                              createVNode(_component_q_input, {
                                modelValue: cardDetails.value.cvv,
                                "onUpdate:modelValue": ($event) => cardDetails.value.cvv = $event,
                                label: "CVV *",
                                outlined: "",
                                dense: "",
                                mask: "###",
                                placeholder: "123"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ])
                        ])) : method.value === "bank_transfer" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "q-pa-md bg-blue-1 rounded-borders"
                        }, [
                          createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "銀行轉帳資訊"),
                          createVNode("div", { class: "text-body2" }, [
                            createVNode("div", null, "銀行：台灣銀行"),
                            createVNode("div", null, "戶名：護理服務平台有限公司"),
                            createVNode("div", null, "帳號：123-456-789012"),
                            createVNode("div", { class: "text-caption text-grey-6 q-mt-sm" }, "請於轉帳完成後提交此表單")
                          ])
                        ])) : method.value === "cash" ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "q-pa-md bg-green-1 rounded-borders"
                        }, [
                          createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "現金付款"),
                          createVNode("div", { class: "text-body2" }, " 請於服務時直接向看護師付款，並索取收據。 ")
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "row q-gutter-sm" }, [
                          createVNode("div", { class: "col" }, [
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "grey",
                              onClick: resetForm,
                              disable: isSubmitting.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 清除 ")
                              ]),
                              _: 1
                            }, 8, ["disable"])
                          ]),
                          createVNode("div", { class: "col-auto" }, [
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "orange",
                              onClick: fillTestData,
                              disable: isSubmitting.value,
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 填入測試資料 ")
                              ]),
                              _: 1
                            }, 8, ["disable"])
                          ]),
                          createVNode("div", { class: "col-auto" }, [
                            createVNode(_component_q_btn, {
                              type: "submit",
                              color: "primary",
                              loading: isSubmitting.value,
                              icon: "payment"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(isSubmitting.value ? "處理中..." : "確認付款"), 1)
                              ]),
                              _: 1
                            }, 8, ["loading"])
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
          } else {
            return [
              createVNode(_component_q_card_section, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-h6 q-mb-md" }, [
                    createVNode(_component_q_icon, {
                      name: "payment",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" 新增付款 ")
                  ]),
                  createVNode(_component_q_form, {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "q-gutter-md"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "row q-gutter-md" }, [
                        createVNode("div", { class: "col-12 col-sm-6" }, [
                          createVNode(_component_q_input, {
                            modelValue: bookingId.value,
                            "onUpdate:modelValue": ($event) => bookingId.value = $event,
                            label: "預約編號 *",
                            outlined: "",
                            dense: "",
                            placeholder: "輸入預約編號"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "col-12 col-sm-6" }, [
                          createVNode(_component_q_input, {
                            modelValue: amount.value,
                            "onUpdate:modelValue": ($event) => amount.value = $event,
                            modelModifiers: { number: true },
                            label: "付款金額 *",
                            type: "number",
                            outlined: "",
                            dense: "",
                            min: "1",
                            suffix: "元",
                            placeholder: "0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode(_component_q_select, {
                        modelValue: method.value,
                        "onUpdate:modelValue": ($event) => method.value = $event,
                        options: paymentMethods,
                        label: "付款方式 *",
                        outlined: "",
                        dense: "",
                        "emit-value": "",
                        "map-options": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      method.value === "credit_card" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "q-pa-md bg-grey-1 rounded-borders"
                      }, [
                        createVNode("div", { class: "text-subtitle2 q-mb-md" }, "信用卡資訊"),
                        createVNode("div", { class: "row q-gutter-md" }, [
                          createVNode("div", { class: "col-12" }, [
                            createVNode(_component_q_input, {
                              modelValue: cardDetails.value.number,
                              "onUpdate:modelValue": ($event) => cardDetails.value.number = $event,
                              label: "信用卡號碼 *",
                              outlined: "",
                              dense: "",
                              mask: "#### #### #### ####",
                              placeholder: "1234 5678 9012 3456"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "col-6" }, [
                            createVNode(_component_q_select, {
                              modelValue: cardDetails.value.expiryMonth,
                              "onUpdate:modelValue": ($event) => cardDetails.value.expiryMonth = $event,
                              options: Array.from({ length: 12 }, (_2, i) => ({ label: String(i + 1).padStart(2, "0"), value: String(i + 1).padStart(2, "0") })),
                              label: "月份 *",
                              outlined: "",
                              dense: "",
                              "emit-value": "",
                              "map-options": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                          ]),
                          createVNode("div", { class: "col-6" }, [
                            createVNode(_component_q_select, {
                              modelValue: cardDetails.value.expiryYear,
                              "onUpdate:modelValue": ($event) => cardDetails.value.expiryYear = $event,
                              options: Array.from({ length: 10 }, (_2, i) => ({ label: String(2024 + i), value: String(2024 + i) })),
                              label: "年份 *",
                              outlined: "",
                              dense: "",
                              "emit-value": "",
                              "map-options": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                          ]),
                          createVNode("div", { class: "col-12" }, [
                            createVNode(_component_q_input, {
                              modelValue: cardDetails.value.cvv,
                              "onUpdate:modelValue": ($event) => cardDetails.value.cvv = $event,
                              label: "CVV *",
                              outlined: "",
                              dense: "",
                              mask: "###",
                              placeholder: "123"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ])
                      ])) : method.value === "bank_transfer" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "q-pa-md bg-blue-1 rounded-borders"
                      }, [
                        createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "銀行轉帳資訊"),
                        createVNode("div", { class: "text-body2" }, [
                          createVNode("div", null, "銀行：台灣銀行"),
                          createVNode("div", null, "戶名：護理服務平台有限公司"),
                          createVNode("div", null, "帳號：123-456-789012"),
                          createVNode("div", { class: "text-caption text-grey-6 q-mt-sm" }, "請於轉帳完成後提交此表單")
                        ])
                      ])) : method.value === "cash" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "q-pa-md bg-green-1 rounded-borders"
                      }, [
                        createVNode("div", { class: "text-subtitle2 q-mb-sm" }, "現金付款"),
                        createVNode("div", { class: "text-body2" }, " 請於服務時直接向看護師付款，並索取收據。 ")
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "row q-gutter-sm" }, [
                        createVNode("div", { class: "col" }, [
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "grey",
                            onClick: resetForm,
                            disable: isSubmitting.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 清除 ")
                            ]),
                            _: 1
                          }, 8, ["disable"])
                        ]),
                        createVNode("div", { class: "col-auto" }, [
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "orange",
                            onClick: fillTestData,
                            disable: isSubmitting.value,
                            size: "sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 填入測試資料 ")
                            ]),
                            _: 1
                          }, 8, ["disable"])
                        ]),
                        createVNode("div", { class: "col-auto" }, [
                          createVNode(_component_q_btn, {
                            type: "submit",
                            color: "primary",
                            loading: isSubmitting.value,
                            icon: "payment"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(isSubmitting.value ? "處理中..." : "確認付款"), 1)
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ])
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
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PaymentForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PaymentForm = Object.assign(_sfc_main$1, { __name: "PaymentForm" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "payments",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("支付管理 - 護理服務平台", "查看您的支付紀錄和管理新支付");
    const $q = useQuasar();
    const apiService = useApiService();
    const authStore = useAuthStore();
    const payments = ref([]);
    const isLoading = ref(false);
    const totalAmount = computed(() => {
      return payments.value.reduce((sum, payment) => sum + payment.amount, 0);
    });
    const completedPayments = computed(() => {
      return payments.value.filter((p) => p.status === "completed").length;
    });
    const loadPaymentHistory = async () => {
      if (!authStore.currentUser) {
        $q.notify({
          type: "warning",
          message: "請先登入才能查看支付紀錄",
          timeout: 3e3
        });
        return;
      }
      isLoading.value = true;
      try {
        const result = await apiService.getPaymentHistory(authStore.currentUser.id);
        payments.value = Array.isArray(result) ? result : [];
      } catch (error) {
        console.error("載入支付紀錄失敗:", error);
        $q.notify({
          type: "negative",
          message: error.message || "載入支付紀錄失敗",
          timeout: 3e3
        });
      } finally {
        isLoading.value = false;
      }
    };
    const handlePaymentSuccess = (payment) => {
      payments.value.unshift(payment);
      $q.notify({
        type: "positive",
        message: "支付成功！新的支付紀錄已添加",
        timeout: 3e3
      });
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getPaymentMethodName = (method) => {
      const methodMap = {
        "credit_card": "信用卡",
        "bank_transfer": "銀行轉帳",
        "cash": "現金付款"
      };
      return methodMap[method] || method;
    };
    const getStatusName = (status) => {
      const statusMap = {
        "completed": "已完成",
        "pending": "處理中",
        "failed": "失敗",
        "cancelled": "已取消"
      };
      return statusMap[status] || status;
    };
    const getStatusColor = (status) => {
      const colorMap = {
        "completed": "positive",
        "pending": "warning",
        "failed": "negative",
        "cancelled": "grey"
      };
      return colorMap[status] || "grey";
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
            "@type": "WebPage",
            name: "支付管理 - 護理服務平台",
            url: baseUrl + $route.fullPath,
            description: "查看您的支付紀錄和管理新支付",
            provider: {
              "@type": "Organization",
              name: "護理服務平台"
            }
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_btn = __nuxt_component_3;
      const _component_q_spinner_dots = __nuxt_component_9;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_item = __nuxt_component_5;
      const _component_q_item_section = __nuxt_component_6;
      const _component_q_item_label = __nuxt_component_8;
      const _component_q_chip = __nuxt_component_9$1;
      const _component_q_separator = __nuxt_component_5$2;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row justify-center"${_scopeId}><div class="col-12 col-lg-10"${_scopeId}><div class="row items-center q-mb-lg"${_scopeId}><div class="text-h5 text-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_icon, {
              name: "account_balance_wallet",
              size: "md",
              class: "q-mr-sm"
            }, null, _parent2, _scopeId));
            _push2(` 支付管理 </div></div>`);
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: "",
              class: "q-mb-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="row items-center justify-between q-mb-md"${_scopeId3}><div class="text-h6"${_scopeId3}>支付紀錄</div>`);
                        _push4(ssrRenderComponent(_component_q_btn, {
                          flat: "",
                          icon: "refresh",
                          onClick: loadPaymentHistory,
                          loading: isLoading.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 更新 `);
                            } else {
                              return [
                                createTextVNode(" 更新 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (isLoading.value) {
                          _push4(`<div class="text-center q-pa-lg"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_spinner_dots, {
                            size: "50px",
                            color: "primary"
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="text-body2 q-mt-md"${_scopeId3}>載入中...</div></div>`);
                        } else if (payments.value.length === 0) {
                          _push4(`<div class="text-center q-pa-lg"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_icon, {
                            name: "payment",
                            size: "80px",
                            color: "grey-5"
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="text-h6 q-mt-md text-grey-7"${_scopeId3}>尚無支付紀錄</div><div class="text-body2 text-grey-6"${_scopeId3}> 您的支付紀錄將在此顯示 </div></div>`);
                        } else {
                          _push4(ssrRenderComponent(_component_q_list, {
                            bordered: "",
                            class: "rounded-borders"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(payments.value, (payment) => {
                                  _push5(ssrRenderComponent(_component_q_item, {
                                    key: payment.id,
                                    class: "q-pa-md"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_q_item_section, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_q_item_label, { class: "text-weight-medium" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(` 交易編號: ${ssrInterpolate(payment.transaction_id)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(" 交易編號: " + toDisplayString(payment.transaction_id), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(` 預約編號: ${ssrInterpolate(payment.booking_id)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(" 預約編號: " + toDisplayString(payment.booking_id), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(_component_q_item_label, {
                                                caption: "",
                                                class: "text-grey-6"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatDate(payment.created_at))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatDate(payment.created_at)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_q_item_label, { class: "text-weight-medium" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 交易編號: " + toDisplayString(payment.transaction_id), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_q_item_label, { caption: "" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 預約編號: " + toDisplayString(payment.booking_id), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_q_item_label, {
                                                  caption: "",
                                                  class: "text-grey-6"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatDate(payment.created_at)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<div class="text-right"${_scopeId6}><div class="text-h6 text-primary"${_scopeId6}> NT$ ${ssrInterpolate(payment.amount.toLocaleString())}</div><div class="text-caption text-grey-6"${_scopeId6}>${ssrInterpolate(getPaymentMethodName(payment.method))}</div></div>`);
                                            } else {
                                              return [
                                                createVNode("div", { class: "text-right" }, [
                                                  createVNode("div", { class: "text-h6 text-primary" }, " NT$ " + toDisplayString(payment.amount.toLocaleString()), 1),
                                                  createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(getPaymentMethodName(payment.method)), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_q_chip, {
                                                color: getStatusColor(payment.status),
                                                "text-color": "white",
                                                size: "sm"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(getStatusName(payment.status))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(getStatusName(payment.status)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_q_chip, {
                                                  color: getStatusColor(payment.status),
                                                  "text-color": "white",
                                                  size: "sm"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(getStatusName(payment.status)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["color"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "text-weight-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" 交易編號: " + toDisplayString(payment.transaction_id), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" 預約編號: " + toDisplayString(payment.booking_id), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, {
                                                caption: "",
                                                class: "text-grey-6"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDate(payment.created_at)), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_section, { side: "" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "text-right" }, [
                                                createVNode("div", { class: "text-h6 text-primary" }, " NT$ " + toDisplayString(payment.amount.toLocaleString()), 1),
                                                createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(getPaymentMethodName(payment.method)), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_section, { side: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_chip, {
                                                color: getStatusColor(payment.status),
                                                "text-color": "white",
                                                size: "sm"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(getStatusName(payment.status)), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["color"])
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(payments.value, (payment) => {
                                    return openBlock(), createBlock(_component_q_item, {
                                      key: payment.id,
                                      class: "q-pa-md"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, { class: "text-weight-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" 交易編號: " + toDisplayString(payment.transaction_id), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" 預約編號: " + toDisplayString(payment.booking_id), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_q_item_label, {
                                              caption: "",
                                              class: "text-grey-6"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDate(payment.created_at)), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_section, { side: "" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "text-right" }, [
                                              createVNode("div", { class: "text-h6 text-primary" }, " NT$ " + toDisplayString(payment.amount.toLocaleString()), 1),
                                              createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(getPaymentMethodName(payment.method)), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_section, { side: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_chip, {
                                              color: getStatusColor(payment.status),
                                              "text-color": "white",
                                              size: "sm"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(getStatusName(payment.status)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["color"])
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
                        }
                        if (payments.value.length > 0) {
                          _push4(`<div class="q-mt-md"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_separator, { class: "q-mb-md" }, null, _parent4, _scopeId3));
                          _push4(`<div class="row q-gutter-md"${_scopeId3}><div class="col"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_card, {
                            flat: "",
                            class: "bg-blue-1"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="text-h6 text-blue-8"${_scopeId5}> NT$ ${ssrInterpolate(totalAmount.value.toLocaleString())}</div><div class="text-caption text-blue-6"${_scopeId5}>總支付金額</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "text-h6 text-blue-8" }, " NT$ " + toDisplayString(totalAmount.value.toLocaleString()), 1),
                                        createVNode("div", { class: "text-caption text-blue-6" }, "總支付金額")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_q_card_section, { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h6 text-blue-8" }, " NT$ " + toDisplayString(totalAmount.value.toLocaleString()), 1),
                                      createVNode("div", { class: "text-caption text-blue-6" }, "總支付金額")
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div><div class="col"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_card, {
                            flat: "",
                            class: "bg-green-1"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="text-h6 text-green-8"${_scopeId5}>${ssrInterpolate(completedPayments.value)}</div><div class="text-caption text-green-6"${_scopeId5}>成功交易</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "text-h6 text-green-8" }, toDisplayString(completedPayments.value), 1),
                                        createVNode("div", { class: "text-caption text-green-6" }, "成功交易")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_q_card_section, { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h6 text-green-8" }, toDisplayString(completedPayments.value), 1),
                                      createVNode("div", { class: "text-caption text-green-6" }, "成功交易")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div><div class="col"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_card, {
                            flat: "",
                            class: "bg-orange-1"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="text-h6 text-orange-8"${_scopeId5}>${ssrInterpolate(payments.value.length)}</div><div class="text-caption text-orange-6"${_scopeId5}>總交易次數</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "text-h6 text-orange-8" }, toDisplayString(payments.value.length), 1),
                                        createVNode("div", { class: "text-caption text-orange-6" }, "總交易次數")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_q_card_section, { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h6 text-orange-8" }, toDisplayString(payments.value.length), 1),
                                      createVNode("div", { class: "text-caption text-orange-6" }, "總交易次數")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div></div></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "row items-center justify-between q-mb-md" }, [
                            createVNode("div", { class: "text-h6" }, "支付紀錄"),
                            createVNode(_component_q_btn, {
                              flat: "",
                              icon: "refresh",
                              onClick: loadPaymentHistory,
                              loading: isLoading.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 更新 ")
                              ]),
                              _: 1
                            }, 8, ["loading"])
                          ]),
                          isLoading.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center q-pa-lg"
                          }, [
                            createVNode(_component_q_spinner_dots, {
                              size: "50px",
                              color: "primary"
                            }),
                            createVNode("div", { class: "text-body2 q-mt-md" }, "載入中...")
                          ])) : payments.value.length === 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center q-pa-lg"
                          }, [
                            createVNode(_component_q_icon, {
                              name: "payment",
                              size: "80px",
                              color: "grey-5"
                            }),
                            createVNode("div", { class: "text-h6 q-mt-md text-grey-7" }, "尚無支付紀錄"),
                            createVNode("div", { class: "text-body2 text-grey-6" }, " 您的支付紀錄將在此顯示 ")
                          ])) : (openBlock(), createBlock(_component_q_list, {
                            key: 2,
                            bordered: "",
                            class: "rounded-borders"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(payments.value, (payment) => {
                                return openBlock(), createBlock(_component_q_item, {
                                  key: payment.id,
                                  class: "q-pa-md"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, { class: "text-weight-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 交易編號: " + toDisplayString(payment.transaction_id), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 預約編號: " + toDisplayString(payment.booking_id), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_label, {
                                          caption: "",
                                          class: "text-grey-6"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(payment.created_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_section, { side: "" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-right" }, [
                                          createVNode("div", { class: "text-h6 text-primary" }, " NT$ " + toDisplayString(payment.amount.toLocaleString()), 1),
                                          createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(getPaymentMethodName(payment.method)), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_section, { side: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_chip, {
                                          color: getStatusColor(payment.status),
                                          "text-color": "white",
                                          size: "sm"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(getStatusName(payment.status)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["color"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024)),
                          payments.value.length > 0 ? (openBlock(), createBlock("div", {
                            key: 3,
                            class: "q-mt-md"
                          }, [
                            createVNode(_component_q_separator, { class: "q-mb-md" }),
                            createVNode("div", { class: "row q-gutter-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(_component_q_card, {
                                  flat: "",
                                  class: "bg-blue-1"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_card_section, { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-h6 text-blue-8" }, " NT$ " + toDisplayString(totalAmount.value.toLocaleString()), 1),
                                        createVNode("div", { class: "text-caption text-blue-6" }, "總支付金額")
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              createVNode("div", { class: "col" }, [
                                createVNode(_component_q_card, {
                                  flat: "",
                                  class: "bg-green-1"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_card_section, { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-h6 text-green-8" }, toDisplayString(completedPayments.value), 1),
                                        createVNode("div", { class: "text-caption text-green-6" }, "成功交易")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "col" }, [
                                createVNode(_component_q_card, {
                                  flat: "",
                                  class: "bg-orange-1"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_card_section, { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-h6 text-orange-8" }, toDisplayString(payments.value.length), 1),
                                        createVNode("div", { class: "text-caption text-orange-6" }, "總交易次數")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ])
                            ])
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
                        createVNode("div", { class: "row items-center justify-between q-mb-md" }, [
                          createVNode("div", { class: "text-h6" }, "支付紀錄"),
                          createVNode(_component_q_btn, {
                            flat: "",
                            icon: "refresh",
                            onClick: loadPaymentHistory,
                            loading: isLoading.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 更新 ")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ]),
                        isLoading.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center q-pa-lg"
                        }, [
                          createVNode(_component_q_spinner_dots, {
                            size: "50px",
                            color: "primary"
                          }),
                          createVNode("div", { class: "text-body2 q-mt-md" }, "載入中...")
                        ])) : payments.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center q-pa-lg"
                        }, [
                          createVNode(_component_q_icon, {
                            name: "payment",
                            size: "80px",
                            color: "grey-5"
                          }),
                          createVNode("div", { class: "text-h6 q-mt-md text-grey-7" }, "尚無支付紀錄"),
                          createVNode("div", { class: "text-body2 text-grey-6" }, " 您的支付紀錄將在此顯示 ")
                        ])) : (openBlock(), createBlock(_component_q_list, {
                          key: 2,
                          bordered: "",
                          class: "rounded-borders"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(payments.value, (payment) => {
                              return openBlock(), createBlock(_component_q_item, {
                                key: payment.id,
                                class: "q-pa-md"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, { class: "text-weight-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" 交易編號: " + toDisplayString(payment.transaction_id), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" 預約編號: " + toDisplayString(payment.booking_id), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_label, {
                                        caption: "",
                                        class: "text-grey-6"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(payment.created_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_q_item_section, { side: "" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-right" }, [
                                        createVNode("div", { class: "text-h6 text-primary" }, " NT$ " + toDisplayString(payment.amount.toLocaleString()), 1),
                                        createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(getPaymentMethodName(payment.method)), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_q_item_section, { side: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_chip, {
                                        color: getStatusColor(payment.status),
                                        "text-color": "white",
                                        size: "sm"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(getStatusName(payment.status)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["color"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024)),
                        payments.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "q-mt-md"
                        }, [
                          createVNode(_component_q_separator, { class: "q-mb-md" }),
                          createVNode("div", { class: "row q-gutter-md" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(_component_q_card, {
                                flat: "",
                                class: "bg-blue-1"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_card_section, { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h6 text-blue-8" }, " NT$ " + toDisplayString(totalAmount.value.toLocaleString()), 1),
                                      createVNode("div", { class: "text-caption text-blue-6" }, "總支付金額")
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            createVNode("div", { class: "col" }, [
                              createVNode(_component_q_card, {
                                flat: "",
                                class: "bg-green-1"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_card_section, { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h6 text-green-8" }, toDisplayString(completedPayments.value), 1),
                                      createVNode("div", { class: "text-caption text-green-6" }, "成功交易")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "col" }, [
                              createVNode(_component_q_card, {
                                flat: "",
                                class: "bg-orange-1"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_card_section, { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h6 text-orange-8" }, toDisplayString(payments.value.length), 1),
                                      createVNode("div", { class: "text-caption text-orange-6" }, "總交易次數")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(PaymentForm, { onPaymentSuccess: handlePaymentSuccess }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "row justify-center" }, [
                createVNode("div", { class: "col-12 col-lg-10" }, [
                  createVNode("div", { class: "row items-center q-mb-lg" }, [
                    createVNode("div", { class: "text-h5 text-primary" }, [
                      createVNode(_component_q_icon, {
                        name: "account_balance_wallet",
                        size: "md",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" 支付管理 ")
                    ])
                  ]),
                  createVNode(_component_q_card, {
                    flat: "",
                    bordered: "",
                    class: "q-mb-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "row items-center justify-between q-mb-md" }, [
                            createVNode("div", { class: "text-h6" }, "支付紀錄"),
                            createVNode(_component_q_btn, {
                              flat: "",
                              icon: "refresh",
                              onClick: loadPaymentHistory,
                              loading: isLoading.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 更新 ")
                              ]),
                              _: 1
                            }, 8, ["loading"])
                          ]),
                          isLoading.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center q-pa-lg"
                          }, [
                            createVNode(_component_q_spinner_dots, {
                              size: "50px",
                              color: "primary"
                            }),
                            createVNode("div", { class: "text-body2 q-mt-md" }, "載入中...")
                          ])) : payments.value.length === 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center q-pa-lg"
                          }, [
                            createVNode(_component_q_icon, {
                              name: "payment",
                              size: "80px",
                              color: "grey-5"
                            }),
                            createVNode("div", { class: "text-h6 q-mt-md text-grey-7" }, "尚無支付紀錄"),
                            createVNode("div", { class: "text-body2 text-grey-6" }, " 您的支付紀錄將在此顯示 ")
                          ])) : (openBlock(), createBlock(_component_q_list, {
                            key: 2,
                            bordered: "",
                            class: "rounded-borders"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(payments.value, (payment) => {
                                return openBlock(), createBlock(_component_q_item, {
                                  key: payment.id,
                                  class: "q-pa-md"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, { class: "text-weight-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 交易編號: " + toDisplayString(payment.transaction_id), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 預約編號: " + toDisplayString(payment.booking_id), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_label, {
                                          caption: "",
                                          class: "text-grey-6"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(payment.created_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_section, { side: "" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-right" }, [
                                          createVNode("div", { class: "text-h6 text-primary" }, " NT$ " + toDisplayString(payment.amount.toLocaleString()), 1),
                                          createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(getPaymentMethodName(payment.method)), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_section, { side: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_chip, {
                                          color: getStatusColor(payment.status),
                                          "text-color": "white",
                                          size: "sm"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(getStatusName(payment.status)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["color"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024)),
                          payments.value.length > 0 ? (openBlock(), createBlock("div", {
                            key: 3,
                            class: "q-mt-md"
                          }, [
                            createVNode(_component_q_separator, { class: "q-mb-md" }),
                            createVNode("div", { class: "row q-gutter-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(_component_q_card, {
                                  flat: "",
                                  class: "bg-blue-1"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_card_section, { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-h6 text-blue-8" }, " NT$ " + toDisplayString(totalAmount.value.toLocaleString()), 1),
                                        createVNode("div", { class: "text-caption text-blue-6" }, "總支付金額")
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              createVNode("div", { class: "col" }, [
                                createVNode(_component_q_card, {
                                  flat: "",
                                  class: "bg-green-1"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_card_section, { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-h6 text-green-8" }, toDisplayString(completedPayments.value), 1),
                                        createVNode("div", { class: "text-caption text-green-6" }, "成功交易")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "col" }, [
                                createVNode(_component_q_card, {
                                  flat: "",
                                  class: "bg-orange-1"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_card_section, { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-h6 text-orange-8" }, toDisplayString(payments.value.length), 1),
                                        createVNode("div", { class: "text-caption text-orange-6" }, "總交易次數")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(PaymentForm, { onPaymentSuccess: handlePaymentSuccess })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/booking/payments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=payments-Cjvs84ig.mjs.map
