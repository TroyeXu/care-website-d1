import { getCurrentInstance, computed, h, defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, unref, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { F as Form, r as registerSchema, a as Field } from './validationSchemas-NSZeyp_z.mjs';
import { t as createComponent, v as useDarkProps, w as useDark, J as isObject, _ as _export_sfc, u as usePageSeo, o as useQuasar, p as useAuthStore, a as __nuxt_component_1, b as __nuxt_component_2, g as __nuxt_component_1$1, q as __nuxt_component_4, i as __nuxt_component_5$2, c as __nuxt_component_3, r as __nuxt_component_20, j as __nuxt_component_9$1 } from './server.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_13 } from '../_/QRadio.mjs';
import { _ as __nuxt_component_9 } from '../_/QCheckbox.mjs';
import { _ as __nuxt_component_3$3 } from '../_/QToggle.mjs';
import { _ as __nuxt_component_4$1 } from '../_/QExpansionItem.mjs';
import { _ as __nuxt_component_8 } from '../_/QSelect.mjs';
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
import '../_/QChip.mjs';

const components = {
  radio: __nuxt_component_13,
  checkbox: __nuxt_component_9,
  toggle: __nuxt_component_3$3
};

const typeValues = Object.keys(components);

function getPropValueFn (userPropName, defaultPropName) {
  if (typeof userPropName === 'function') return userPropName

  const propName = userPropName !== void 0
    ? userPropName
    : defaultPropName;

  return opt => opt[ propName ]
}

const __nuxt_component_6 = createComponent({
  name: 'QOptionGroup',

  props: {
    ...useDarkProps,

    modelValue: {
      required: true
    },
    options: {
      type: Array,
      validator: opts => opts.every(isObject),
      default: () => []
    },

    optionValue: [ Function, String ],
    optionLabel: [ Function, String ],
    optionDisable: [ Function, String ],

    name: String,

    type: {
      type: String,
      default: 'radio',
      validator: v => typeValues.includes(v)
    },

    color: String,
    keepColor: Boolean,
    dense: Boolean,

    size: String,

    leftLabel: Boolean,
    inline: Boolean,
    disable: Boolean
  },

  emits: [ 'update:modelValue' ],

  setup (props, { emit, slots }) {
    const { proxy: { $q } } = getCurrentInstance();

    const arrayModel = Array.isArray(props.modelValue);

    if (props.type === 'radio') {
      if (arrayModel === true) {
        console.error('q-option-group: model should not be array');
      }
    }
    else if (arrayModel === false) {
      console.error('q-option-group: model should be array in your case');
    }

    const isDark = useDark(props, $q);
    const component = computed(() => components[ props.type ]);

    const getOptionValue = computed(() => getPropValueFn(props.optionValue, 'value'));
    const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, 'label'));
    const getOptionDisable = computed(() => getPropValueFn(props.optionDisable, 'disable'));

    const innerOptions = computed(() => props.options.map(opt => ({
      val: getOptionValue.value(opt),
      name: opt.name === void 0 ? props.name : opt.name,
      disable: props.disable || getOptionDisable.value(opt),
      leftLabel: opt.leftLabel === void 0 ? props.leftLabel : opt.leftLabel,
      color: opt.color === void 0 ? props.color : opt.color,
      checkedIcon: opt.checkedIcon,
      uncheckedIcon: opt.uncheckedIcon,
      dark: opt.dark === void 0 ? isDark.value : opt.dark,
      size: opt.size === void 0 ? props.size : opt.size,
      dense: props.dense,
      keepColor: opt.keepColor === void 0 ? props.keepColor : opt.keepColor
    })));

    const classes = computed(() =>
      'q-option-group q-gutter-x-sm'
      + (props.inline === true ? ' q-option-group--inline' : '')
    );

    const attrs = computed(() => {
      const attrs = { role: 'group' };

      if (props.type === 'radio') {
        attrs.role = 'radiogroup';

        if (props.disable === true) {
          attrs[ 'aria-disabled' ] = 'true';
        }
      }

      return attrs
    });

    function onUpdateModelValue (value) {
      emit('update:modelValue', value);
    }

    return () => h('div', {
      class: classes.value,
      ...attrs.value
    }, props.options.map((opt, i) => {
      // TODO: (Qv3) Make the 'opt' a separate property instead of
      // the whole scope for consistency and flexibility
      // (e.g. { opt } instead of opt)
      const child = slots[ 'label-' + i ] !== void 0
        ? () => slots[ 'label-' + i ](opt)
        : (
            slots.label !== void 0
              ? () => slots.label(opt)
              : void 0
          );

      return h('div', [
        h(component.value, {
          label: child === void 0 ? getOptionLabel.value(opt) : null,
          modelValue: props.modelValue,
          'onUpdate:modelValue': onUpdateModelValue,
          ...innerOptions.value[ i ]
        }, child)
      ])
    }))
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("註冊帳號 - 護理服務平台", "免費註冊成為護理服務平台使用者，享受專業的照護服務");
    const router = useRouter();
    const $q = useQuasar();
    const authStore = useAuthStore();
    const loading = ref(false);
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const showErrorDialog = ref(false);
    const errorMessage = ref("");
    const medicalHistory = ref([]);
    const preferences = ref([]);
    const roleOptions = [
      {
        label: "患者/家屬",
        value: "patient",
        icon: "elderly",
        description: "尋找照護服務"
      },
      {
        label: "照護員",
        value: "caregiver",
        icon: "medical_services",
        description: "提供照護服務"
      }
    ];
    const genderOptions = [
      { label: "男性", value: "男" },
      { label: "女性", value: "女" },
      { label: "其他", value: "其他" }
    ];
    const medicalConditionOptions = [
      "糖尿病",
      "高血壓",
      "心臟病",
      "失智症",
      "中風後遺症",
      "骨折/骨病",
      "癌症",
      "腎臟病",
      "肝病",
      "精神疾病",
      "其他慢性病"
    ];
    const preferenceOptions = [
      "女性照護員",
      "男性照護員",
      "有護理師證照",
      "有照服員證照",
      "失智症照護經驗",
      "復健照護經驗",
      "日間照護",
      "夜間照護",
      "24小時照護",
      "語言溝通佳",
      "有愛心耐心",
      "經驗豐富"
    ];
    const handleSubmit = async (values) => {
      loading.value = true;
      try {
        const registerData = {
          ...values,
          profile: {
            ...values.profile,
            medicalHistory: medicalHistory.value.length > 0 ? medicalHistory.value : void 0,
            preferences: preferences.value.length > 0 ? preferences.value : void 0
          }
        };
        await authStore.register(registerData);
        $q.notify({
          type: "positive",
          message: "註冊成功！歡迎加入護理服務平台",
          icon: "check_circle",
          timeout: 3e3
        });
        await router.push("/user/dashboard");
      } catch (error) {
        console.error("註冊失敗:", error);
        errorMessage.value = error.message || "註冊過程發生錯誤，請稍後再試";
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_input = __nuxt_component_4;
      const _component_q_separator = __nuxt_component_5$2;
      const _component_q_option_group = __nuxt_component_6;
      const _component_q_expansion_item = __nuxt_component_4$1;
      const _component_q_select = __nuxt_component_8;
      const _component_q_checkbox = __nuxt_component_9;
      const _component_q_btn = __nuxt_component_3;
      const _component_router_link = resolveComponent("router-link");
      const _component_q_dialog = __nuxt_component_20;
      const _component_q_card_actions = __nuxt_component_9$1;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md flex flex-center bg-grey-1" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: "",
              class: "register-card",
              style: { "min-width": "400px", "max-width": "500px", "width": "100%" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center q-pb-none" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h5 text-primary q-mb-sm" data-v-37a56a5c${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "person_add",
                          size: "md",
                          class: "q-mr-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(` 建立新帳號 </div><div class="text-grey-6 text-body2" data-v-37a56a5c${_scopeId3}> 加入護理服務平台，開始您的照護之旅 </div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h5 text-primary q-mb-sm" }, [
                            createVNode(_component_q_icon, {
                              name: "person_add",
                              size: "md",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 建立新帳號 ")
                          ]),
                          createVNode("div", { class: "text-grey-6 text-body2" }, " 加入護理服務平台，開始您的照護之旅 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Form), {
                          "validation-schema": unref(registerSchema),
                          onSubmit: handleSubmit
                        }, {
                          default: withCtx(({ errors, isSubmitting }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-h6 q-mb-md text-grey-8" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_icon, {
                                name: "info",
                                class: "q-mr-xs"
                              }, null, _parent5, _scopeId4));
                              _push5(` 基本資訊 </div><div class="row q-gutter-md q-mb-md" data-v-37a56a5c${_scopeId4}><div class="col" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "name" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "姓名 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "person",
                                      placeholder: "請輸入您的姓名"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "姓名 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "person",
                                        placeholder: "請輸入您的姓名"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div><div class="row q-gutter-md q-mb-md" data-v-37a56a5c${_scopeId4}><div class="col" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "email" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "電子郵件 *",
                                      type: "email",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "email",
                                      placeholder: "example@email.com"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件 *",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "email",
                                        placeholder: "example@email.com"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div><div class="row q-gutter-md q-mb-md" data-v-37a56a5c${_scopeId4}><div class="col" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "phone" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "電話號碼 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "phone",
                                      placeholder: "09XXXXXXXX",
                                      mask: "##########"
                                    }), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電話號碼 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "phone",
                                        placeholder: "09XXXXXXXX",
                                        mask: "##########"
                                      }), null, 16, ["error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                              _push5(ssrRenderComponent(_component_q_separator, { class: "q-my-md" }, null, _parent5, _scopeId4));
                              _push5(`<div class="text-h6 q-mb-md text-grey-8" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_icon, {
                                name: "lock",
                                class: "q-mr-xs"
                              }, null, _parent5, _scopeId4));
                              _push5(` 密碼設定 </div><div class="row q-gutter-md q-mb-md" data-v-37a56a5c${_scopeId4}><div class="col" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "password" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "密碼 *",
                                      type: showPassword.value ? "text" : "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "lock",
                                      placeholder: "至少8個字符，包含大小寫和數字"
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
                                        label: "密碼 *",
                                        type: showPassword.value ? "text" : "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "lock",
                                        placeholder: "至少8個字符，包含大小寫和數字"
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
                              _push5(`</div></div><div class="row q-gutter-md q-mb-md" data-v-37a56a5c${_scopeId4}><div class="col" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "confirmPassword" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                      label: "確認密碼 *",
                                      type: showConfirmPassword.value ? "text" : "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "lock",
                                      placeholder: "請再次輸入密碼"
                                    }), {
                                      append: withCtx((_4, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_icon, {
                                            name: showConfirmPassword.value ? "visibility" : "visibility_off",
                                            class: "cursor-pointer",
                                            onClick: ($event) => showConfirmPassword.value = !showConfirmPassword.value
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: showConfirmPassword.value ? "visibility" : "visibility_off",
                                              class: "cursor-pointer",
                                              onClick: ($event) => showConfirmPassword.value = !showConfirmPassword.value
                                            }, null, 8, ["name", "onClick"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "確認密碼 *",
                                        type: showConfirmPassword.value ? "text" : "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "lock",
                                        placeholder: "請再次輸入密碼"
                                      }), {
                                        append: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: showConfirmPassword.value ? "visibility" : "visibility_off",
                                            class: "cursor-pointer",
                                            onClick: ($event) => showConfirmPassword.value = !showConfirmPassword.value
                                          }, null, 8, ["name", "onClick"])
                                        ]),
                                        _: 2
                                      }, 1040, ["type", "error", "error-message"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                              _push5(ssrRenderComponent(_component_q_separator, { class: "q-my-md" }, null, _parent5, _scopeId4));
                              _push5(`<div class="text-h6 q-mb-md text-grey-8" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_icon, {
                                name: "group",
                                class: "q-mr-xs"
                              }, null, _parent5, _scopeId4));
                              _push5(` 用戶類型 </div><div class="row q-gutter-md q-mb-md" data-v-37a56a5c${_scopeId4}><div class="col" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "role" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_option_group, mergeProps(field, {
                                      options: roleOptions,
                                      type: "radio",
                                      inline: "",
                                      error: !!errorMessage2,
                                      class: "q-mt-sm"
                                    }), null, _parent6, _scopeId5));
                                    if (errorMessage2) {
                                      _push6(`<div class="text-negative text-caption q-mt-xs" data-v-37a56a5c${_scopeId5}>${ssrInterpolate(errorMessage2)}</div>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      createVNode(_component_q_option_group, mergeProps(field, {
                                        options: roleOptions,
                                        type: "radio",
                                        inline: "",
                                        error: !!errorMessage2,
                                        class: "q-mt-sm"
                                      }), null, 16, ["error"]),
                                      errorMessage2 ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-negative text-caption q-mt-xs"
                                      }, toDisplayString(errorMessage2), 1)) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                              _push5(ssrRenderComponent(_component_q_expansion_item, {
                                icon: "settings",
                                label: "個人資料 (選填)",
                                class: "q-mb-md",
                                "header-class": "text-grey-7"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="q-pa-md bg-grey-1" data-v-37a56a5c${_scopeId5}><div class="row q-gutter-md q-mb-md" data-v-37a56a5c${_scopeId5}><div class="col-6" data-v-37a56a5c${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Field), { name: "profile.age" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                            label: "年齡",
                                            type: "number",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage2,
                                            "error-message": errorMessage2,
                                            suffix: "歲",
                                            min: "18",
                                            max: "120"
                                          }), null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_input, mergeProps(field, {
                                              label: "年齡",
                                              type: "number",
                                              outlined: "",
                                              dense: "",
                                              error: !!errorMessage2,
                                              "error-message": errorMessage2,
                                              suffix: "歲",
                                              min: "18",
                                              max: "120"
                                            }), null, 16, ["error", "error-message"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(`</div><div class="col-6" data-v-37a56a5c${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Field), { name: "profile.gender" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_select, mergeProps(field, {
                                            label: "性別",
                                            options: genderOptions,
                                            outlined: "",
                                            dense: "",
                                            "emit-value": "",
                                            "map-options": "",
                                            error: !!errorMessage2,
                                            "error-message": errorMessage2
                                          }), null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_select, mergeProps(field, {
                                              label: "性別",
                                              options: genderOptions,
                                              outlined: "",
                                              dense: "",
                                              "emit-value": "",
                                              "map-options": "",
                                              error: !!errorMessage2,
                                              "error-message": errorMessage2
                                            }), null, 16, ["error", "error-message"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(`</div></div><div class="row q-gutter-md q-mb-md" data-v-37a56a5c${_scopeId5}><div class="col" data-v-37a56a5c${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Field), { name: "profile.address" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                            label: "地址",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage2,
                                            "error-message": errorMessage2,
                                            placeholder: "請輸入完整地址"
                                          }), null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_input, mergeProps(field, {
                                              label: "地址",
                                              outlined: "",
                                              dense: "",
                                              error: !!errorMessage2,
                                              "error-message": errorMessage2,
                                              placeholder: "請輸入完整地址"
                                            }), null, 16, ["error", "error-message"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(`</div></div><div class="row q-gutter-md q-mb-md" data-v-37a56a5c${_scopeId5}><div class="col" data-v-37a56a5c${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Field), { name: "profile.emergencyContact" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_input, mergeProps(field, {
                                            label: "緊急聯絡人電話",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage2,
                                            "error-message": errorMessage2,
                                            placeholder: "09XXXXXXXX",
                                            mask: "##########"
                                          }), null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_input, mergeProps(field, {
                                              label: "緊急聯絡人電話",
                                              outlined: "",
                                              dense: "",
                                              error: !!errorMessage2,
                                              "error-message": errorMessage2,
                                              placeholder: "09XXXXXXXX",
                                              mask: "##########"
                                            }), null, 16, ["error", "error-message"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(`</div></div><div class="row q-gutter-md q-mb-md" data-v-37a56a5c${_scopeId5}><div class="col" data-v-37a56a5c${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_q_select, {
                                      modelValue: medicalHistory.value,
                                      "onUpdate:modelValue": ($event) => medicalHistory.value = $event,
                                      label: "醫療史",
                                      options: medicalConditionOptions,
                                      outlined: "",
                                      dense: "",
                                      multiple: "",
                                      "use-chips": "",
                                      placeholder: "選擇相關的醫療狀況"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div></div><div class="row q-gutter-md" data-v-37a56a5c${_scopeId5}><div class="col" data-v-37a56a5c${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_q_select, {
                                      modelValue: preferences.value,
                                      "onUpdate:modelValue": ($event) => preferences.value = $event,
                                      label: "照護偏好",
                                      options: preferenceOptions,
                                      outlined: "",
                                      dense: "",
                                      multiple: "",
                                      "use-chips": "",
                                      placeholder: "選擇您的照護偏好"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "q-pa-md bg-grey-1" }, [
                                        createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                          createVNode("div", { class: "col-6" }, [
                                            createVNode(unref(Field), { name: "profile.age" }, {
                                              default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                                createVNode(_component_q_input, mergeProps(field, {
                                                  label: "年齡",
                                                  type: "number",
                                                  outlined: "",
                                                  dense: "",
                                                  error: !!errorMessage2,
                                                  "error-message": errorMessage2,
                                                  suffix: "歲",
                                                  min: "18",
                                                  max: "120"
                                                }), null, 16, ["error", "error-message"])
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          createVNode("div", { class: "col-6" }, [
                                            createVNode(unref(Field), { name: "profile.gender" }, {
                                              default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                                createVNode(_component_q_select, mergeProps(field, {
                                                  label: "性別",
                                                  options: genderOptions,
                                                  outlined: "",
                                                  dense: "",
                                                  "emit-value": "",
                                                  "map-options": "",
                                                  error: !!errorMessage2,
                                                  "error-message": errorMessage2
                                                }), null, 16, ["error", "error-message"])
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                          createVNode("div", { class: "col" }, [
                                            createVNode(unref(Field), { name: "profile.address" }, {
                                              default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                                createVNode(_component_q_input, mergeProps(field, {
                                                  label: "地址",
                                                  outlined: "",
                                                  dense: "",
                                                  error: !!errorMessage2,
                                                  "error-message": errorMessage2,
                                                  placeholder: "請輸入完整地址"
                                                }), null, 16, ["error", "error-message"])
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                          createVNode("div", { class: "col" }, [
                                            createVNode(unref(Field), { name: "profile.emergencyContact" }, {
                                              default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                                createVNode(_component_q_input, mergeProps(field, {
                                                  label: "緊急聯絡人電話",
                                                  outlined: "",
                                                  dense: "",
                                                  error: !!errorMessage2,
                                                  "error-message": errorMessage2,
                                                  placeholder: "09XXXXXXXX",
                                                  mask: "##########"
                                                }), null, 16, ["error", "error-message"])
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                          createVNode("div", { class: "col" }, [
                                            createVNode(_component_q_select, {
                                              modelValue: medicalHistory.value,
                                              "onUpdate:modelValue": ($event) => medicalHistory.value = $event,
                                              label: "醫療史",
                                              options: medicalConditionOptions,
                                              outlined: "",
                                              dense: "",
                                              multiple: "",
                                              "use-chips": "",
                                              placeholder: "選擇相關的醫療狀況"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ])
                                        ]),
                                        createVNode("div", { class: "row q-gutter-md" }, [
                                          createVNode("div", { class: "col" }, [
                                            createVNode(_component_q_select, {
                                              modelValue: preferences.value,
                                              "onUpdate:modelValue": ($event) => preferences.value = $event,
                                              label: "照護偏好",
                                              options: preferenceOptions,
                                              outlined: "",
                                              dense: "",
                                              multiple: "",
                                              "use-chips": "",
                                              placeholder: "選擇您的照護偏好"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`<div class="row q-gutter-md q-mb-lg" data-v-37a56a5c${_scopeId4}><div class="col" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Field), { name: "agreeToTerms" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_checkbox, mergeProps(field, {
                                      "model-value": field.value,
                                      label: "我同意服務條款和隱私政策",
                                      error: !!errorMessage2
                                    }), null, _parent6, _scopeId5));
                                    if (errorMessage2) {
                                      _push6(`<div class="text-negative text-caption q-mt-xs" data-v-37a56a5c${_scopeId5}>${ssrInterpolate(errorMessage2)}</div>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      createVNode(_component_q_checkbox, mergeProps(field, {
                                        "model-value": field.value,
                                        label: "我同意服務條款和隱私政策",
                                        error: !!errorMessage2
                                      }), null, 16, ["model-value", "error"]),
                                      errorMessage2 ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-negative text-caption q-mt-xs"
                                      }, toDisplayString(errorMessage2), 1)) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div><div class="row q-gutter-md" data-v-37a56a5c${_scopeId4}><div class="col" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                size: "lg",
                                class: "full-width",
                                loading: isSubmitting || loading.value,
                                disable: Object.keys(errors).length > 0,
                                icon: "person_add"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(isSubmitting ? "註冊中..." : "建立帳號")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(isSubmitting ? "註冊中..." : "建立帳號"), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div><div class="text-center q-mt-md" data-v-37a56a5c${_scopeId4}><div class="text-body2 text-grey-6" data-v-37a56a5c${_scopeId4}> 已有帳號？ `);
                              _push5(ssrRenderComponent(_component_router_link, {
                                to: "/auth/login",
                                class: "text-primary text-decoration-none"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 立即登入 `);
                                  } else {
                                    return [
                                      createTextVNode(" 立即登入 ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                                  createVNode(_component_q_icon, {
                                    name: "info",
                                    class: "q-mr-xs"
                                  }),
                                  createTextVNode(" 基本資訊 ")
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(unref(Field), { name: "name" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "姓名 *",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2,
                                          "prefix-icon": "person",
                                          placeholder: "請輸入您的姓名"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(unref(Field), { name: "email" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "電子郵件 *",
                                          type: "email",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2,
                                          "prefix-icon": "email",
                                          placeholder: "example@email.com"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(unref(Field), { name: "phone" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "電話號碼 *",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2,
                                          "prefix-icon": "phone",
                                          placeholder: "09XXXXXXXX",
                                          mask: "##########"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode(_component_q_separator, { class: "q-my-md" }),
                                createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                                  createVNode(_component_q_icon, {
                                    name: "lock",
                                    class: "q-mr-xs"
                                  }),
                                  createTextVNode(" 密碼設定 ")
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(unref(Field), { name: "password" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "密碼 *",
                                          type: showPassword.value ? "text" : "password",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2,
                                          "prefix-icon": "lock",
                                          placeholder: "至少8個字符，包含大小寫和數字"
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
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(unref(Field), { name: "confirmPassword" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "確認密碼 *",
                                          type: showConfirmPassword.value ? "text" : "password",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2,
                                          "prefix-icon": "lock",
                                          placeholder: "請再次輸入密碼"
                                        }), {
                                          append: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: showConfirmPassword.value ? "visibility" : "visibility_off",
                                              class: "cursor-pointer",
                                              onClick: ($event) => showConfirmPassword.value = !showConfirmPassword.value
                                            }, null, 8, ["name", "onClick"])
                                          ]),
                                          _: 2
                                        }, 1040, ["type", "error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode(_component_q_separator, { class: "q-my-md" }),
                                createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                                  createVNode(_component_q_icon, {
                                    name: "group",
                                    class: "q-mr-xs"
                                  }),
                                  createTextVNode(" 用戶類型 ")
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(unref(Field), { name: "role" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_option_group, mergeProps(field, {
                                          options: roleOptions,
                                          type: "radio",
                                          inline: "",
                                          error: !!errorMessage2,
                                          class: "q-mt-sm"
                                        }), null, 16, ["error"]),
                                        errorMessage2 ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-negative text-caption q-mt-xs"
                                        }, toDisplayString(errorMessage2), 1)) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode(_component_q_expansion_item, {
                                  icon: "settings",
                                  label: "個人資料 (選填)",
                                  class: "q-mb-md",
                                  "header-class": "text-grey-7"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "q-pa-md bg-grey-1" }, [
                                      createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                        createVNode("div", { class: "col-6" }, [
                                          createVNode(unref(Field), { name: "profile.age" }, {
                                            default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                              createVNode(_component_q_input, mergeProps(field, {
                                                label: "年齡",
                                                type: "number",
                                                outlined: "",
                                                dense: "",
                                                error: !!errorMessage2,
                                                "error-message": errorMessage2,
                                                suffix: "歲",
                                                min: "18",
                                                max: "120"
                                              }), null, 16, ["error", "error-message"])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        createVNode("div", { class: "col-6" }, [
                                          createVNode(unref(Field), { name: "profile.gender" }, {
                                            default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                              createVNode(_component_q_select, mergeProps(field, {
                                                label: "性別",
                                                options: genderOptions,
                                                outlined: "",
                                                dense: "",
                                                "emit-value": "",
                                                "map-options": "",
                                                error: !!errorMessage2,
                                                "error-message": errorMessage2
                                              }), null, 16, ["error", "error-message"])
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                        createVNode("div", { class: "col" }, [
                                          createVNode(unref(Field), { name: "profile.address" }, {
                                            default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                              createVNode(_component_q_input, mergeProps(field, {
                                                label: "地址",
                                                outlined: "",
                                                dense: "",
                                                error: !!errorMessage2,
                                                "error-message": errorMessage2,
                                                placeholder: "請輸入完整地址"
                                              }), null, 16, ["error", "error-message"])
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                        createVNode("div", { class: "col" }, [
                                          createVNode(unref(Field), { name: "profile.emergencyContact" }, {
                                            default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                              createVNode(_component_q_input, mergeProps(field, {
                                                label: "緊急聯絡人電話",
                                                outlined: "",
                                                dense: "",
                                                error: !!errorMessage2,
                                                "error-message": errorMessage2,
                                                placeholder: "09XXXXXXXX",
                                                mask: "##########"
                                              }), null, 16, ["error", "error-message"])
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                        createVNode("div", { class: "col" }, [
                                          createVNode(_component_q_select, {
                                            modelValue: medicalHistory.value,
                                            "onUpdate:modelValue": ($event) => medicalHistory.value = $event,
                                            label: "醫療史",
                                            options: medicalConditionOptions,
                                            outlined: "",
                                            dense: "",
                                            multiple: "",
                                            "use-chips": "",
                                            placeholder: "選擇相關的醫療狀況"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ])
                                      ]),
                                      createVNode("div", { class: "row q-gutter-md" }, [
                                        createVNode("div", { class: "col" }, [
                                          createVNode(_component_q_select, {
                                            modelValue: preferences.value,
                                            "onUpdate:modelValue": ($event) => preferences.value = $event,
                                            label: "照護偏好",
                                            options: preferenceOptions,
                                            outlined: "",
                                            dense: "",
                                            multiple: "",
                                            "use-chips": "",
                                            placeholder: "選擇您的照護偏好"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(unref(Field), { name: "agreeToTerms" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_checkbox, mergeProps(field, {
                                          "model-value": field.value,
                                          label: "我同意服務條款和隱私政策",
                                          error: !!errorMessage2
                                        }), null, 16, ["model-value", "error"]),
                                        errorMessage2 ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-negative text-caption q-mt-xs"
                                        }, toDisplayString(errorMessage2), 1)) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(_component_q_btn, {
                                      type: "submit",
                                      color: "primary",
                                      size: "lg",
                                      class: "full-width",
                                      loading: isSubmitting || loading.value,
                                      disable: Object.keys(errors).length > 0,
                                      icon: "person_add"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(isSubmitting ? "註冊中..." : "建立帳號"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["loading", "disable"])
                                  ])
                                ]),
                                createVNode("div", { class: "text-center q-mt-md" }, [
                                  createVNode("div", { class: "text-body2 text-grey-6" }, [
                                    createTextVNode(" 已有帳號？ "),
                                    createVNode(_component_router_link, {
                                      to: "/auth/login",
                                      class: "text-primary text-decoration-none"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 立即登入 ")
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
                            "validation-schema": unref(registerSchema),
                            onSubmit: handleSubmit
                          }, {
                            default: withCtx(({ errors, isSubmitting }) => [
                              createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                                createVNode(_component_q_icon, {
                                  name: "info",
                                  class: "q-mr-xs"
                                }),
                                createTextVNode(" 基本資訊 ")
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(unref(Field), { name: "name" }, {
                                    default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "姓名 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "person",
                                        placeholder: "請輸入您的姓名"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(unref(Field), { name: "email" }, {
                                    default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電子郵件 *",
                                        type: "email",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "email",
                                        placeholder: "example@email.com"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(unref(Field), { name: "phone" }, {
                                    default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "電話號碼 *",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "phone",
                                        placeholder: "09XXXXXXXX",
                                        mask: "##########"
                                      }), null, 16, ["error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode(_component_q_separator, { class: "q-my-md" }),
                              createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                                createVNode(_component_q_icon, {
                                  name: "lock",
                                  class: "q-mr-xs"
                                }),
                                createTextVNode(" 密碼設定 ")
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(unref(Field), { name: "password" }, {
                                    default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "密碼 *",
                                        type: showPassword.value ? "text" : "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "lock",
                                        placeholder: "至少8個字符，包含大小寫和數字"
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
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(unref(Field), { name: "confirmPassword" }, {
                                    default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                      createVNode(_component_q_input, mergeProps(field, {
                                        label: "確認密碼 *",
                                        type: showConfirmPassword.value ? "text" : "password",
                                        outlined: "",
                                        dense: "",
                                        error: !!errorMessage2,
                                        "error-message": errorMessage2,
                                        "prefix-icon": "lock",
                                        placeholder: "請再次輸入密碼"
                                      }), {
                                        append: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: showConfirmPassword.value ? "visibility" : "visibility_off",
                                            class: "cursor-pointer",
                                            onClick: ($event) => showConfirmPassword.value = !showConfirmPassword.value
                                          }, null, 8, ["name", "onClick"])
                                        ]),
                                        _: 2
                                      }, 1040, ["type", "error", "error-message"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode(_component_q_separator, { class: "q-my-md" }),
                              createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                                createVNode(_component_q_icon, {
                                  name: "group",
                                  class: "q-mr-xs"
                                }),
                                createTextVNode(" 用戶類型 ")
                              ]),
                              createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(unref(Field), { name: "role" }, {
                                    default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                      createVNode(_component_q_option_group, mergeProps(field, {
                                        options: roleOptions,
                                        type: "radio",
                                        inline: "",
                                        error: !!errorMessage2,
                                        class: "q-mt-sm"
                                      }), null, 16, ["error"]),
                                      errorMessage2 ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-negative text-caption q-mt-xs"
                                      }, toDisplayString(errorMessage2), 1)) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode(_component_q_expansion_item, {
                                icon: "settings",
                                label: "個人資料 (選填)",
                                class: "q-mb-md",
                                "header-class": "text-grey-7"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "q-pa-md bg-grey-1" }, [
                                    createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                      createVNode("div", { class: "col-6" }, [
                                        createVNode(unref(Field), { name: "profile.age" }, {
                                          default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                            createVNode(_component_q_input, mergeProps(field, {
                                              label: "年齡",
                                              type: "number",
                                              outlined: "",
                                              dense: "",
                                              error: !!errorMessage2,
                                              "error-message": errorMessage2,
                                              suffix: "歲",
                                              min: "18",
                                              max: "120"
                                            }), null, 16, ["error", "error-message"])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      createVNode("div", { class: "col-6" }, [
                                        createVNode(unref(Field), { name: "profile.gender" }, {
                                          default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                            createVNode(_component_q_select, mergeProps(field, {
                                              label: "性別",
                                              options: genderOptions,
                                              outlined: "",
                                              dense: "",
                                              "emit-value": "",
                                              "map-options": "",
                                              error: !!errorMessage2,
                                              "error-message": errorMessage2
                                            }), null, 16, ["error", "error-message"])
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                      createVNode("div", { class: "col" }, [
                                        createVNode(unref(Field), { name: "profile.address" }, {
                                          default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                            createVNode(_component_q_input, mergeProps(field, {
                                              label: "地址",
                                              outlined: "",
                                              dense: "",
                                              error: !!errorMessage2,
                                              "error-message": errorMessage2,
                                              placeholder: "請輸入完整地址"
                                            }), null, 16, ["error", "error-message"])
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                      createVNode("div", { class: "col" }, [
                                        createVNode(unref(Field), { name: "profile.emergencyContact" }, {
                                          default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                            createVNode(_component_q_input, mergeProps(field, {
                                              label: "緊急聯絡人電話",
                                              outlined: "",
                                              dense: "",
                                              error: !!errorMessage2,
                                              "error-message": errorMessage2,
                                              placeholder: "09XXXXXXXX",
                                              mask: "##########"
                                            }), null, 16, ["error", "error-message"])
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                      createVNode("div", { class: "col" }, [
                                        createVNode(_component_q_select, {
                                          modelValue: medicalHistory.value,
                                          "onUpdate:modelValue": ($event) => medicalHistory.value = $event,
                                          label: "醫療史",
                                          options: medicalConditionOptions,
                                          outlined: "",
                                          dense: "",
                                          multiple: "",
                                          "use-chips": "",
                                          placeholder: "選擇相關的醫療狀況"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ])
                                    ]),
                                    createVNode("div", { class: "row q-gutter-md" }, [
                                      createVNode("div", { class: "col" }, [
                                        createVNode(_component_q_select, {
                                          modelValue: preferences.value,
                                          "onUpdate:modelValue": ($event) => preferences.value = $event,
                                          label: "照護偏好",
                                          options: preferenceOptions,
                                          outlined: "",
                                          dense: "",
                                          multiple: "",
                                          "use-chips": "",
                                          placeholder: "選擇您的照護偏好"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(unref(Field), { name: "agreeToTerms" }, {
                                    default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                      createVNode(_component_q_checkbox, mergeProps(field, {
                                        "model-value": field.value,
                                        label: "我同意服務條款和隱私政策",
                                        error: !!errorMessage2
                                      }), null, 16, ["model-value", "error"]),
                                      errorMessage2 ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-negative text-caption q-mt-xs"
                                      }, toDisplayString(errorMessage2), 1)) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "row q-gutter-md" }, [
                                createVNode("div", { class: "col" }, [
                                  createVNode(_component_q_btn, {
                                    type: "submit",
                                    color: "primary",
                                    size: "lg",
                                    class: "full-width",
                                    loading: isSubmitting || loading.value,
                                    disable: Object.keys(errors).length > 0,
                                    icon: "person_add"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(isSubmitting ? "註冊中..." : "建立帳號"), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["loading", "disable"])
                                ])
                              ]),
                              createVNode("div", { class: "text-center q-mt-md" }, [
                                createVNode("div", { class: "text-body2 text-grey-6" }, [
                                  createTextVNode(" 已有帳號？ "),
                                  createVNode(_component_router_link, {
                                    to: "/auth/login",
                                    class: "text-primary text-decoration-none"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 立即登入 ")
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
                            name: "person_add",
                            size: "md",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" 建立新帳號 ")
                        ]),
                        createVNode("div", { class: "text-grey-6 text-body2" }, " 加入護理服務平台，開始您的照護之旅 ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode(unref(Form), {
                          "validation-schema": unref(registerSchema),
                          onSubmit: handleSubmit
                        }, {
                          default: withCtx(({ errors, isSubmitting }) => [
                            createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                              createVNode(_component_q_icon, {
                                name: "info",
                                class: "q-mr-xs"
                              }),
                              createTextVNode(" 基本資訊 ")
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(unref(Field), { name: "name" }, {
                                  default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "姓名 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "person",
                                      placeholder: "請輸入您的姓名"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(unref(Field), { name: "email" }, {
                                  default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "電子郵件 *",
                                      type: "email",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "email",
                                      placeholder: "example@email.com"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(unref(Field), { name: "phone" }, {
                                  default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "電話號碼 *",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "phone",
                                      placeholder: "09XXXXXXXX",
                                      mask: "##########"
                                    }), null, 16, ["error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode(_component_q_separator, { class: "q-my-md" }),
                            createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                              createVNode(_component_q_icon, {
                                name: "lock",
                                class: "q-mr-xs"
                              }),
                              createTextVNode(" 密碼設定 ")
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(unref(Field), { name: "password" }, {
                                  default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "密碼 *",
                                      type: showPassword.value ? "text" : "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "lock",
                                      placeholder: "至少8個字符，包含大小寫和數字"
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
                            createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(unref(Field), { name: "confirmPassword" }, {
                                  default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                    createVNode(_component_q_input, mergeProps(field, {
                                      label: "確認密碼 *",
                                      type: showConfirmPassword.value ? "text" : "password",
                                      outlined: "",
                                      dense: "",
                                      error: !!errorMessage2,
                                      "error-message": errorMessage2,
                                      "prefix-icon": "lock",
                                      placeholder: "請再次輸入密碼"
                                    }), {
                                      append: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: showConfirmPassword.value ? "visibility" : "visibility_off",
                                          class: "cursor-pointer",
                                          onClick: ($event) => showConfirmPassword.value = !showConfirmPassword.value
                                        }, null, 8, ["name", "onClick"])
                                      ]),
                                      _: 2
                                    }, 1040, ["type", "error", "error-message"])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode(_component_q_separator, { class: "q-my-md" }),
                            createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                              createVNode(_component_q_icon, {
                                name: "group",
                                class: "q-mr-xs"
                              }),
                              createTextVNode(" 用戶類型 ")
                            ]),
                            createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(unref(Field), { name: "role" }, {
                                  default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                    createVNode(_component_q_option_group, mergeProps(field, {
                                      options: roleOptions,
                                      type: "radio",
                                      inline: "",
                                      error: !!errorMessage2,
                                      class: "q-mt-sm"
                                    }), null, 16, ["error"]),
                                    errorMessage2 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-negative text-caption q-mt-xs"
                                    }, toDisplayString(errorMessage2), 1)) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode(_component_q_expansion_item, {
                              icon: "settings",
                              label: "個人資料 (選填)",
                              class: "q-mb-md",
                              "header-class": "text-grey-7"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "q-pa-md bg-grey-1" }, [
                                  createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                    createVNode("div", { class: "col-6" }, [
                                      createVNode(unref(Field), { name: "profile.age" }, {
                                        default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                          createVNode(_component_q_input, mergeProps(field, {
                                            label: "年齡",
                                            type: "number",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage2,
                                            "error-message": errorMessage2,
                                            suffix: "歲",
                                            min: "18",
                                            max: "120"
                                          }), null, 16, ["error", "error-message"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    createVNode("div", { class: "col-6" }, [
                                      createVNode(unref(Field), { name: "profile.gender" }, {
                                        default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                          createVNode(_component_q_select, mergeProps(field, {
                                            label: "性別",
                                            options: genderOptions,
                                            outlined: "",
                                            dense: "",
                                            "emit-value": "",
                                            "map-options": "",
                                            error: !!errorMessage2,
                                            "error-message": errorMessage2
                                          }), null, 16, ["error", "error-message"])
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                    createVNode("div", { class: "col" }, [
                                      createVNode(unref(Field), { name: "profile.address" }, {
                                        default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                          createVNode(_component_q_input, mergeProps(field, {
                                            label: "地址",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage2,
                                            "error-message": errorMessage2,
                                            placeholder: "請輸入完整地址"
                                          }), null, 16, ["error", "error-message"])
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                    createVNode("div", { class: "col" }, [
                                      createVNode(unref(Field), { name: "profile.emergencyContact" }, {
                                        default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                          createVNode(_component_q_input, mergeProps(field, {
                                            label: "緊急聯絡人電話",
                                            outlined: "",
                                            dense: "",
                                            error: !!errorMessage2,
                                            "error-message": errorMessage2,
                                            placeholder: "09XXXXXXXX",
                                            mask: "##########"
                                          }), null, 16, ["error", "error-message"])
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                    createVNode("div", { class: "col" }, [
                                      createVNode(_component_q_select, {
                                        modelValue: medicalHistory.value,
                                        "onUpdate:modelValue": ($event) => medicalHistory.value = $event,
                                        label: "醫療史",
                                        options: medicalConditionOptions,
                                        outlined: "",
                                        dense: "",
                                        multiple: "",
                                        "use-chips": "",
                                        placeholder: "選擇相關的醫療狀況"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ])
                                  ]),
                                  createVNode("div", { class: "row q-gutter-md" }, [
                                    createVNode("div", { class: "col" }, [
                                      createVNode(_component_q_select, {
                                        modelValue: preferences.value,
                                        "onUpdate:modelValue": ($event) => preferences.value = $event,
                                        label: "照護偏好",
                                        options: preferenceOptions,
                                        outlined: "",
                                        dense: "",
                                        multiple: "",
                                        "use-chips": "",
                                        placeholder: "選擇您的照護偏好"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(unref(Field), { name: "agreeToTerms" }, {
                                  default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                    createVNode(_component_q_checkbox, mergeProps(field, {
                                      "model-value": field.value,
                                      label: "我同意服務條款和隱私政策",
                                      error: !!errorMessage2
                                    }), null, 16, ["model-value", "error"]),
                                    errorMessage2 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-negative text-caption q-mt-xs"
                                    }, toDisplayString(errorMessage2), 1)) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "row q-gutter-md" }, [
                              createVNode("div", { class: "col" }, [
                                createVNode(_component_q_btn, {
                                  type: "submit",
                                  color: "primary",
                                  size: "lg",
                                  class: "full-width",
                                  loading: isSubmitting || loading.value,
                                  disable: Object.keys(errors).length > 0,
                                  icon: "person_add"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(isSubmitting ? "註冊中..." : "建立帳號"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["loading", "disable"])
                              ])
                            ]),
                            createVNode("div", { class: "text-center q-mt-md" }, [
                              createVNode("div", { class: "text-body2 text-grey-6" }, [
                                createTextVNode(" 已有帳號？ "),
                                createVNode(_component_router_link, {
                                  to: "/auth/login",
                                  class: "text-primary text-decoration-none"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 立即登入 ")
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
                              _push5(`<div class="text-h6 text-negative" data-v-37a56a5c${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_q_icon, {
                                name: "error",
                                class: "q-mr-sm"
                              }, null, _parent5, _scopeId4));
                              _push5(` 註冊失敗 </div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-h6 text-negative" }, [
                                  createVNode(_component_q_icon, {
                                    name: "error",
                                    class: "q-mr-sm"
                                  }),
                                  createTextVNode(" 註冊失敗 ")
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
                                createTextVNode(" 註冊失敗 ")
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
                              createTextVNode(" 註冊失敗 ")
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
                class: "register-card",
                style: { "min-width": "400px", "max-width": "500px", "width": "100%" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, { class: "text-center q-pb-none" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h5 text-primary q-mb-sm" }, [
                        createVNode(_component_q_icon, {
                          name: "person_add",
                          size: "md",
                          class: "q-mr-sm"
                        }),
                        createTextVNode(" 建立新帳號 ")
                      ]),
                      createVNode("div", { class: "text-grey-6 text-body2" }, " 加入護理服務平台，開始您的照護之旅 ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode(unref(Form), {
                        "validation-schema": unref(registerSchema),
                        onSubmit: handleSubmit
                      }, {
                        default: withCtx(({ errors, isSubmitting }) => [
                          createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                            createVNode(_component_q_icon, {
                              name: "info",
                              class: "q-mr-xs"
                            }),
                            createTextVNode(" 基本資訊 ")
                          ]),
                          createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(unref(Field), { name: "name" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "姓名 *",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage2,
                                    "error-message": errorMessage2,
                                    "prefix-icon": "person",
                                    placeholder: "請輸入您的姓名"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(unref(Field), { name: "email" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "電子郵件 *",
                                    type: "email",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage2,
                                    "error-message": errorMessage2,
                                    "prefix-icon": "email",
                                    placeholder: "example@email.com"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(unref(Field), { name: "phone" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "電話號碼 *",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage2,
                                    "error-message": errorMessage2,
                                    "prefix-icon": "phone",
                                    placeholder: "09XXXXXXXX",
                                    mask: "##########"
                                  }), null, 16, ["error", "error-message"])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode(_component_q_separator, { class: "q-my-md" }),
                          createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                            createVNode(_component_q_icon, {
                              name: "lock",
                              class: "q-mr-xs"
                            }),
                            createTextVNode(" 密碼設定 ")
                          ]),
                          createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(unref(Field), { name: "password" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "密碼 *",
                                    type: showPassword.value ? "text" : "password",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage2,
                                    "error-message": errorMessage2,
                                    "prefix-icon": "lock",
                                    placeholder: "至少8個字符，包含大小寫和數字"
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
                          createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(unref(Field), { name: "confirmPassword" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                  createVNode(_component_q_input, mergeProps(field, {
                                    label: "確認密碼 *",
                                    type: showConfirmPassword.value ? "text" : "password",
                                    outlined: "",
                                    dense: "",
                                    error: !!errorMessage2,
                                    "error-message": errorMessage2,
                                    "prefix-icon": "lock",
                                    placeholder: "請再次輸入密碼"
                                  }), {
                                    append: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: showConfirmPassword.value ? "visibility" : "visibility_off",
                                        class: "cursor-pointer",
                                        onClick: ($event) => showConfirmPassword.value = !showConfirmPassword.value
                                      }, null, 8, ["name", "onClick"])
                                    ]),
                                    _: 2
                                  }, 1040, ["type", "error", "error-message"])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode(_component_q_separator, { class: "q-my-md" }),
                          createVNode("div", { class: "text-h6 q-mb-md text-grey-8" }, [
                            createVNode(_component_q_icon, {
                              name: "group",
                              class: "q-mr-xs"
                            }),
                            createTextVNode(" 用戶類型 ")
                          ]),
                          createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(unref(Field), { name: "role" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                  createVNode(_component_q_option_group, mergeProps(field, {
                                    options: roleOptions,
                                    type: "radio",
                                    inline: "",
                                    error: !!errorMessage2,
                                    class: "q-mt-sm"
                                  }), null, 16, ["error"]),
                                  errorMessage2 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-negative text-caption q-mt-xs"
                                  }, toDisplayString(errorMessage2), 1)) : createCommentVNode("", true)
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode(_component_q_expansion_item, {
                            icon: "settings",
                            label: "個人資料 (選填)",
                            class: "q-mb-md",
                            "header-class": "text-grey-7"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "q-pa-md bg-grey-1" }, [
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col-6" }, [
                                    createVNode(unref(Field), { name: "profile.age" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "年齡",
                                          type: "number",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2,
                                          suffix: "歲",
                                          min: "18",
                                          max: "120"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "col-6" }, [
                                    createVNode(unref(Field), { name: "profile.gender" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_select, mergeProps(field, {
                                          label: "性別",
                                          options: genderOptions,
                                          outlined: "",
                                          dense: "",
                                          "emit-value": "",
                                          "map-options": "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(unref(Field), { name: "profile.address" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "地址",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2,
                                          placeholder: "請輸入完整地址"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(unref(Field), { name: "profile.emergencyContact" }, {
                                      default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                        createVNode(_component_q_input, mergeProps(field, {
                                          label: "緊急聯絡人電話",
                                          outlined: "",
                                          dense: "",
                                          error: !!errorMessage2,
                                          "error-message": errorMessage2,
                                          placeholder: "09XXXXXXXX",
                                          mask: "##########"
                                        }), null, 16, ["error", "error-message"])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md q-mb-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(_component_q_select, {
                                      modelValue: medicalHistory.value,
                                      "onUpdate:modelValue": ($event) => medicalHistory.value = $event,
                                      label: "醫療史",
                                      options: medicalConditionOptions,
                                      outlined: "",
                                      dense: "",
                                      multiple: "",
                                      "use-chips": "",
                                      placeholder: "選擇相關的醫療狀況"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                createVNode("div", { class: "row q-gutter-md" }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode(_component_q_select, {
                                      modelValue: preferences.value,
                                      "onUpdate:modelValue": ($event) => preferences.value = $event,
                                      label: "照護偏好",
                                      options: preferenceOptions,
                                      outlined: "",
                                      dense: "",
                                      multiple: "",
                                      "use-chips": "",
                                      placeholder: "選擇您的照護偏好"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "row q-gutter-md q-mb-lg" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(unref(Field), { name: "agreeToTerms" }, {
                                default: withCtx(({ field, errorMessage: errorMessage2 }) => [
                                  createVNode(_component_q_checkbox, mergeProps(field, {
                                    "model-value": field.value,
                                    label: "我同意服務條款和隱私政策",
                                    error: !!errorMessage2
                                  }), null, 16, ["model-value", "error"]),
                                  errorMessage2 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-negative text-caption q-mt-xs"
                                  }, toDisplayString(errorMessage2), 1)) : createCommentVNode("", true)
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "row q-gutter-md" }, [
                            createVNode("div", { class: "col" }, [
                              createVNode(_component_q_btn, {
                                type: "submit",
                                color: "primary",
                                size: "lg",
                                class: "full-width",
                                loading: isSubmitting || loading.value,
                                disable: Object.keys(errors).length > 0,
                                icon: "person_add"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(isSubmitting ? "註冊中..." : "建立帳號"), 1)
                                ]),
                                _: 2
                              }, 1032, ["loading", "disable"])
                            ])
                          ]),
                          createVNode("div", { class: "text-center q-mt-md" }, [
                            createVNode("div", { class: "text-body2 text-grey-6" }, [
                              createTextVNode(" 已有帳號？ "),
                              createVNode(_component_router_link, {
                                to: "/auth/login",
                                class: "text-primary text-decoration-none"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 立即登入 ")
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
                            createTextVNode(" 註冊失敗 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-37a56a5c"]]);

export { register as default };
//# sourceMappingURL=register-DiyoBo0f.mjs.map
