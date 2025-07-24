import { computed, ref, getCurrentInstance, h, Transition, defineComponent, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { t as createComponent, ar as useTimeout, y as hSlot, b2 as QSpinner, aS as vmIsDestroyed, _ as _export_sfc, o as useQuasar, a as __nuxt_component_1, b as __nuxt_component_2, c as __nuxt_component_3, q as __nuxt_component_4, j as __nuxt_component_9$1 } from './server.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_9 } from '../_/QChip.mjs';
import { _ as __nuxt_component_17 } from '../_/QForm.mjs';
import { _ as __nuxt_component_8 } from '../_/QSelect.mjs';
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

const useRatioProps = {
  ratio: [ String, Number ]
};

function useRatio (props, naturalRatio) {
  // return ratioStyle
  return computed(() => {
    const ratio = Number(
      props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0)
    );

    return isNaN(ratio) !== true && ratio > 0
      ? { paddingBottom: `${ 100 / ratio }%` }
      : null
  })
}

const defaultRatio = 1.7778; /* 16/9 */

const __nuxt_component_8$1 = createComponent({
  name: 'QImg',

  props: {
    ...useRatioProps,

    src: String,
    srcset: String,
    sizes: String,

    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,

    draggable: Boolean,

    loading: {
      type: String,
      default: 'lazy'
    },
    loadingShowDelay: {
      type: [ Number, String ],
      default: 0
    },

    fetchpriority: {
      type: String,
      default: 'auto'
    },
    width: String,
    height: String,
    initialRatio: {
      type: [ Number, String ],
      default: defaultRatio
    },

    placeholderSrc: String,
    errorSrc: String,

    fit: {
      type: String,
      default: 'cover'
    },
    position: {
      type: String,
      default: '50% 50%'
    },

    imgClass: String,
    imgStyle: Object,

    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,

    spinnerColor: String,
    spinnerSize: String
  },

  emits: [ 'load', 'error' ],

  setup (props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    const vm = getCurrentInstance();

    const { registerTimeout: registerLoadTimeout, removeTimeout: removeLoadTimeout } = useTimeout();
    const { removeTimeout: removeLoadShowTimeout } = useTimeout();

    const placeholderImg = computed(() => (
      props.placeholderSrc !== void 0
        ? { src: props.placeholderSrc }
        : null
    ));

    const errorImg = computed(() => (
      props.errorSrc !== void 0
        ? { src: props.errorSrc, __qerror: true }
        : null
    ));

    const images = [
      ref(null),
      ref(placeholderImg.value)
    ];

    const position = ref(0);

    const isLoading = ref(false);
    const hasError = ref(false);

    const classes = computed(() =>
      `q-img q-img--${ props.noNativeMenu === true ? 'no-' : '' }menu`
    );

    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));

    const imgClass = computed(() =>
      `q-img__image ${ props.imgClass !== void 0 ? props.imgClass + ' ' : '' }`
      + `q-img__image--with${ props.noTransition === true ? 'out' : '' }-transition`
      + ' q-img__image--'
    );

    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));

    function clearLoading () {
      removeLoadShowTimeout();
      isLoading.value = false;
    }

    function onLoad ({ target }) {
      if (vmIsDestroyed(vm) === false) {
        removeLoadTimeout();

        naturalRatio.value = target.naturalHeight === 0
          ? 0.5
          : target.naturalWidth / target.naturalHeight;

        waitForCompleteness(target, 1);
      }
    }

    function waitForCompleteness (target, count) {
      // protect against running forever
      if (count === 1000 || vmIsDestroyed(vm) === true) return

      if (target.complete === true) {
        onReady(target);
      }
      else {
        registerLoadTimeout(() => {
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }

    function onReady (target) {
      if (vmIsDestroyed(vm) === true) return

      position.value = position.value ^ 1;
      images[ position.value ].value = null;

      clearLoading();

      if (target.getAttribute('__qerror') !== 'true') {
        hasError.value = false;
      }

      emit('load', target.currentSrc || target.src);
    }

    function onError (err) {
      removeLoadTimeout();
      clearLoading();

      hasError.value = true;
      images[ position.value ].value = errorImg.value;
      images[ position.value ^ 1 ].value = placeholderImg.value;

      emit('error', err);
    }

    function getImage (index) {
      const img = images[ index ].value;

      const data = {
        key: 'img_' + index,
        class: imgClass.value,
        style: imgStyle.value,
        alt: props.alt,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        'aria-hidden': 'true',
        draggable: props.draggable,
        ...img
      };

      if (position.value === index) {
        Object.assign(data, {
          class: data.class + 'current',
          onLoad,
          onError
        });
      }
      else {
        data.class += 'loaded';
      }

      return h(
        'div',
        { class: 'q-img__container absolute-full', key: 'img' + index },
        h('img', data)
      )
    }

    function getContent () {
      if (isLoading.value === false) {
        return h('div', {
          key: 'content',
          class: 'q-img__content absolute-full q-anchor--skip'
        }, hSlot(slots[ hasError.value === true ? 'error' : 'default' ]))
      }

      return h('div', {
        key: 'loading',
        class: 'q-img__loading absolute-full flex flex-center'
      }, (
        slots.loading !== void 0
          ? slots.loading()
          : (
              props.noSpinner === true
                ? void 0
                : [
                    h(QSpinner, {
                      color: props.spinnerColor,
                      size: props.spinnerSize
                    })
                  ]
            )
      ))
    }

    return () => {
      const content = [];

      if (ratioStyle.value !== null) {
        content.push(
          h('div', { key: 'filler', style: ratioStyle.value })
        );
      }

      if (images[ 0 ].value !== null) {
        content.push(
          getImage(0)
        );
      }

      if (images[ 1 ].value !== null) {
        content.push(
          getImage(1)
        );
      }

      content.push(
        h(Transition, { name: 'q-transition--fade' }, getContent)
      );

      return h('div', {
        key: 'main',
        class: classes.value,
        style: style.value,
        role: 'img',
        'aria-label': props.alt
      }, content)
    }
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "responsive-test",
  __ssrInlineRender: true,
  setup(__props) {
    const $q = useQuasar();
    const windowWidth = ref(0);
    const windowHeight = ref(0);
    const formData = ref({
      name: "",
      email: "",
      phone: "",
      service: null,
      message: ""
    });
    const testDrawer = () => {
      const event = new CustomEvent("toggle-drawer");
      (void 0).dispatchEvent(event);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_chip = __nuxt_component_9;
      const _component_q_btn = __nuxt_component_3;
      const _component_q_form = __nuxt_component_17;
      const _component_q_input = __nuxt_component_4;
      const _component_q_select = __nuxt_component_8;
      const _component_q_img = __nuxt_component_8$1;
      const _component_q_card_actions = __nuxt_component_9$1;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-h4 q-mb-md" data-v-86a7add7${_scopeId}>響應式設計測試</div>`);
            _push2(ssrRenderComponent(_component_q_card, { class: "q-mb-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-86a7add7${_scopeId3}>螢幕資訊</div><div class="row q-gutter-md" data-v-86a7add7${_scopeId3}><div class="col-12 col-sm-6 col-md-3" data-v-86a7add7${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_chip, {
                          color: unref($q).screen.xs ? "primary" : "grey",
                          "text-color": "white"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` XS (&lt; 600px): ${ssrInterpolate(unref($q).screen.xs)}`);
                            } else {
                              return [
                                createTextVNode(" XS (< 600px): " + toDisplayString(unref($q).screen.xs), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="col-12 col-sm-6 col-md-3" data-v-86a7add7${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_chip, {
                          color: unref($q).screen.sm ? "primary" : "grey",
                          "text-color": "white"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` SM (600-1023px): ${ssrInterpolate(unref($q).screen.sm)}`);
                            } else {
                              return [
                                createTextVNode(" SM (600-1023px): " + toDisplayString(unref($q).screen.sm), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="col-12 col-sm-6 col-md-3" data-v-86a7add7${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_chip, {
                          color: unref($q).screen.md ? "primary" : "grey",
                          "text-color": "white"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` MD (1024-1439px): ${ssrInterpolate(unref($q).screen.md)}`);
                            } else {
                              return [
                                createTextVNode(" MD (1024-1439px): " + toDisplayString(unref($q).screen.md), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="col-12 col-sm-6 col-md-3" data-v-86a7add7${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_chip, {
                          color: unref($q).screen.lg ? "primary" : "grey",
                          "text-color": "white"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` LG (1440-1919px): ${ssrInterpolate(unref($q).screen.lg)}`);
                            } else {
                              return [
                                createTextVNode(" LG (1440-1919px): " + toDisplayString(unref($q).screen.lg), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="col-12 col-sm-6 col-md-3" data-v-86a7add7${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_chip, {
                          color: unref($q).screen.xl ? "primary" : "grey",
                          "text-color": "white"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` XL (≥ 1920px): ${ssrInterpolate(unref($q).screen.xl)}`);
                            } else {
                              return [
                                createTextVNode(" XL (≥ 1920px): " + toDisplayString(unref($q).screen.xl), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div><div class="q-mt-md" data-v-86a7add7${_scopeId3}><p data-v-86a7add7${_scopeId3}>視窗寬度: ${ssrInterpolate(windowWidth.value)}px</p><p data-v-86a7add7${_scopeId3}>視窗高度: ${ssrInterpolate(windowHeight.value)}px</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "螢幕資訊"),
                          createVNode("div", { class: "row q-gutter-md" }, [
                            createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                              createVNode(_component_q_chip, {
                                color: unref($q).screen.xs ? "primary" : "grey",
                                "text-color": "white"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" XS (< 600px): " + toDisplayString(unref($q).screen.xs), 1)
                                ]),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                              createVNode(_component_q_chip, {
                                color: unref($q).screen.sm ? "primary" : "grey",
                                "text-color": "white"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" SM (600-1023px): " + toDisplayString(unref($q).screen.sm), 1)
                                ]),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                              createVNode(_component_q_chip, {
                                color: unref($q).screen.md ? "primary" : "grey",
                                "text-color": "white"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" MD (1024-1439px): " + toDisplayString(unref($q).screen.md), 1)
                                ]),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                              createVNode(_component_q_chip, {
                                color: unref($q).screen.lg ? "primary" : "grey",
                                "text-color": "white"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" LG (1440-1919px): " + toDisplayString(unref($q).screen.lg), 1)
                                ]),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                              createVNode(_component_q_chip, {
                                color: unref($q).screen.xl ? "primary" : "grey",
                                "text-color": "white"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" XL (≥ 1920px): " + toDisplayString(unref($q).screen.xl), 1)
                                ]),
                                _: 1
                              }, 8, ["color"])
                            ])
                          ]),
                          createVNode("div", { class: "q-mt-md" }, [
                            createVNode("p", null, "視窗寬度: " + toDisplayString(windowWidth.value) + "px", 1),
                            createVNode("p", null, "視窗高度: " + toDisplayString(windowHeight.value) + "px", 1)
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
                        createVNode("div", { class: "text-h6 q-mb-md" }, "螢幕資訊"),
                        createVNode("div", { class: "row q-gutter-md" }, [
                          createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                            createVNode(_component_q_chip, {
                              color: unref($q).screen.xs ? "primary" : "grey",
                              "text-color": "white"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" XS (< 600px): " + toDisplayString(unref($q).screen.xs), 1)
                              ]),
                              _: 1
                            }, 8, ["color"])
                          ]),
                          createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                            createVNode(_component_q_chip, {
                              color: unref($q).screen.sm ? "primary" : "grey",
                              "text-color": "white"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" SM (600-1023px): " + toDisplayString(unref($q).screen.sm), 1)
                              ]),
                              _: 1
                            }, 8, ["color"])
                          ]),
                          createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                            createVNode(_component_q_chip, {
                              color: unref($q).screen.md ? "primary" : "grey",
                              "text-color": "white"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" MD (1024-1439px): " + toDisplayString(unref($q).screen.md), 1)
                              ]),
                              _: 1
                            }, 8, ["color"])
                          ]),
                          createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                            createVNode(_component_q_chip, {
                              color: unref($q).screen.lg ? "primary" : "grey",
                              "text-color": "white"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" LG (1440-1919px): " + toDisplayString(unref($q).screen.lg), 1)
                              ]),
                              _: 1
                            }, 8, ["color"])
                          ]),
                          createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                            createVNode(_component_q_chip, {
                              color: unref($q).screen.xl ? "primary" : "grey",
                              "text-color": "white"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" XL (≥ 1920px): " + toDisplayString(unref($q).screen.xl), 1)
                              ]),
                              _: 1
                            }, 8, ["color"])
                          ])
                        ]),
                        createVNode("div", { class: "q-mt-md" }, [
                          createVNode("p", null, "視窗寬度: " + toDisplayString(windowWidth.value) + "px", 1),
                          createVNode("p", null, "視窗高度: " + toDisplayString(windowHeight.value) + "px", 1)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_card, { class: "q-mb-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-86a7add7${_scopeId3}>Header 測試</div><p data-v-86a7add7${_scopeId3}>檢查 Header 在不同螢幕尺寸下的表現：</p><ul data-v-86a7add7${_scopeId3}><li data-v-86a7add7${_scopeId3}>手機版：應顯示漢堡選單圖標</li><li data-v-86a7add7${_scopeId3}>平板/桌面版：應顯示返回按鈕</li><li data-v-86a7add7${_scopeId3}>標題應居中顯示</li></ul>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "Header 測試"),
                          createVNode("p", null, "檢查 Header 在不同螢幕尺寸下的表現："),
                          createVNode("ul", null, [
                            createVNode("li", null, "手機版：應顯示漢堡選單圖標"),
                            createVNode("li", null, "平板/桌面版：應顯示返回按鈕"),
                            createVNode("li", null, "標題應居中顯示")
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
                        createVNode("div", { class: "text-h6 q-mb-md" }, "Header 測試"),
                        createVNode("p", null, "檢查 Header 在不同螢幕尺寸下的表現："),
                        createVNode("ul", null, [
                          createVNode("li", null, "手機版：應顯示漢堡選單圖標"),
                          createVNode("li", null, "平板/桌面版：應顯示返回按鈕"),
                          createVNode("li", null, "標題應居中顯示")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_card, { class: "q-mb-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-86a7add7${_scopeId3}>Footer 快速選單測試</div><p data-v-86a7add7${_scopeId3}>底部導航應在所有設備上都可見：</p><ul data-v-86a7add7${_scopeId3}><li data-v-86a7add7${_scopeId3}>4個主要功能按鈕：首頁、看護師、預約、我的</li><li data-v-86a7add7${_scopeId3}>圖標和文字應清晰可見</li><li data-v-86a7add7${_scopeId3}>點擊應有反饋效果</li><li data-v-86a7add7${_scopeId3}>在手機上應固定在底部</li></ul>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "Footer 快速選單測試"),
                          createVNode("p", null, "底部導航應在所有設備上都可見："),
                          createVNode("ul", null, [
                            createVNode("li", null, "4個主要功能按鈕：首頁、看護師、預約、我的"),
                            createVNode("li", null, "圖標和文字應清晰可見"),
                            createVNode("li", null, "點擊應有反饋效果"),
                            createVNode("li", null, "在手機上應固定在底部")
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
                        createVNode("div", { class: "text-h6 q-mb-md" }, "Footer 快速選單測試"),
                        createVNode("p", null, "底部導航應在所有設備上都可見："),
                        createVNode("ul", null, [
                          createVNode("li", null, "4個主要功能按鈕：首頁、看護師、預約、我的"),
                          createVNode("li", null, "圖標和文字應清晰可見"),
                          createVNode("li", null, "點擊應有反饋效果"),
                          createVNode("li", null, "在手機上應固定在底部")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_card, { class: "q-mb-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-86a7add7${_scopeId3}>側邊抽屜選單測試</div>`);
                        _push4(ssrRenderComponent(_component_q_btn, {
                          color: "primary",
                          onClick: testDrawer
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 開啟側邊選單 `);
                            } else {
                              return [
                                createTextVNode(" 開啟側邊選單 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="q-mt-md" data-v-86a7add7${_scopeId3}><p data-v-86a7add7${_scopeId3}>測試要點：</p><ul data-v-86a7add7${_scopeId3}><li data-v-86a7add7${_scopeId3}>選單應從左側滑出</li><li data-v-86a7add7${_scopeId3}>在手機上應覆蓋整個螢幕</li><li data-v-86a7add7${_scopeId3}>在平板/桌面上可以同時顯示內容</li><li data-v-86a7add7${_scopeId3}>應包含用戶資訊區塊</li><li data-v-86a7add7${_scopeId3}>選單項目應分類清晰</li></ul></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "側邊抽屜選單測試"),
                          createVNode(_component_q_btn, {
                            color: "primary",
                            onClick: testDrawer
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 開啟側邊選單 ")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "q-mt-md" }, [
                            createVNode("p", null, "測試要點："),
                            createVNode("ul", null, [
                              createVNode("li", null, "選單應從左側滑出"),
                              createVNode("li", null, "在手機上應覆蓋整個螢幕"),
                              createVNode("li", null, "在平板/桌面上可以同時顯示內容"),
                              createVNode("li", null, "應包含用戶資訊區塊"),
                              createVNode("li", null, "選單項目應分類清晰")
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
                        createVNode("div", { class: "text-h6 q-mb-md" }, "側邊抽屜選單測試"),
                        createVNode(_component_q_btn, {
                          color: "primary",
                          onClick: testDrawer
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 開啟側邊選單 ")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "q-mt-md" }, [
                          createVNode("p", null, "測試要點："),
                          createVNode("ul", null, [
                            createVNode("li", null, "選單應從左側滑出"),
                            createVNode("li", null, "在手機上應覆蓋整個螢幕"),
                            createVNode("li", null, "在平板/桌面上可以同時顯示內容"),
                            createVNode("li", null, "應包含用戶資訊區塊"),
                            createVNode("li", null, "選單項目應分類清晰")
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
            _push2(ssrRenderComponent(_component_q_card, { class: "q-mb-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-86a7add7${_scopeId3}>響應式網格系統測試</div><div class="row q-gutter-md" data-v-86a7add7${_scopeId3}><!--[-->`);
                        ssrRenderList(8, (i) => {
                          _push4(`<div class="col-12 col-sm-6 col-md-4 col-lg-3" data-v-86a7add7${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_card, {
                            flat: "",
                            bordered: ""
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="text-h6" data-v-86a7add7${_scopeId5}>項目 ${ssrInterpolate(i)}</div><p data-v-86a7add7${_scopeId5}>這是一個響應式網格項目</p>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "text-h6" }, "項目 " + toDisplayString(i), 1),
                                        createVNode("p", null, "這是一個響應式網格項目")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_q_card_section, { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h6" }, "項目 " + toDisplayString(i), 1),
                                      createVNode("p", null, "這是一個響應式網格項目")
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        });
                        _push4(`<!--]--></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "響應式網格系統測試"),
                          createVNode("div", { class: "row q-gutter-md" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                              return createVNode("div", {
                                class: "col-12 col-sm-6 col-md-4 col-lg-3",
                                key: i
                              }, [
                                createVNode(_component_q_card, {
                                  flat: "",
                                  bordered: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_card_section, { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-h6" }, "項目 " + toDisplayString(i), 1),
                                        createVNode("p", null, "這是一個響應式網格項目")
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]);
                            }), 64))
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
                        createVNode("div", { class: "text-h6 q-mb-md" }, "響應式網格系統測試"),
                        createVNode("div", { class: "row q-gutter-md" }, [
                          (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                            return createVNode("div", {
                              class: "col-12 col-sm-6 col-md-4 col-lg-3",
                              key: i
                            }, [
                              createVNode(_component_q_card, {
                                flat: "",
                                bordered: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_card_section, { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h6" }, "項目 " + toDisplayString(i), 1),
                                      createVNode("p", null, "這是一個響應式網格項目")
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ]);
                          }), 64))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_card, { class: "q-mb-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-86a7add7${_scopeId3}>表單響應式測試</div>`);
                        _push4(ssrRenderComponent(_component_q_form, { class: "row q-gutter-md" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_input, {
                                modelValue: formData.value.name,
                                "onUpdate:modelValue": ($event) => formData.value.name = $event,
                                label: "姓名",
                                outlined: "",
                                dense: "",
                                class: "col-12 col-sm-6"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_input, {
                                modelValue: formData.value.email,
                                "onUpdate:modelValue": ($event) => formData.value.email = $event,
                                label: "電子郵件",
                                outlined: "",
                                dense: "",
                                class: "col-12 col-sm-6"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_input, {
                                modelValue: formData.value.phone,
                                "onUpdate:modelValue": ($event) => formData.value.phone = $event,
                                label: "電話",
                                outlined: "",
                                dense: "",
                                class: "col-12 col-sm-6"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_select, {
                                modelValue: formData.value.service,
                                "onUpdate:modelValue": ($event) => formData.value.service = $event,
                                label: "服務類型",
                                options: ["日間照護", "夜間照護", "24小時照護"],
                                outlined: "",
                                dense: "",
                                class: "col-12 col-sm-6"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_input, {
                                modelValue: formData.value.message,
                                "onUpdate:modelValue": ($event) => formData.value.message = $event,
                                label: "留言",
                                type: "textarea",
                                outlined: "",
                                dense: "",
                                rows: "3",
                                class: "col-12"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_input, {
                                  modelValue: formData.value.name,
                                  "onUpdate:modelValue": ($event) => formData.value.name = $event,
                                  label: "姓名",
                                  outlined: "",
                                  dense: "",
                                  class: "col-12 col-sm-6"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_q_input, {
                                  modelValue: formData.value.email,
                                  "onUpdate:modelValue": ($event) => formData.value.email = $event,
                                  label: "電子郵件",
                                  outlined: "",
                                  dense: "",
                                  class: "col-12 col-sm-6"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_q_input, {
                                  modelValue: formData.value.phone,
                                  "onUpdate:modelValue": ($event) => formData.value.phone = $event,
                                  label: "電話",
                                  outlined: "",
                                  dense: "",
                                  class: "col-12 col-sm-6"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_q_select, {
                                  modelValue: formData.value.service,
                                  "onUpdate:modelValue": ($event) => formData.value.service = $event,
                                  label: "服務類型",
                                  options: ["日間照護", "夜間照護", "24小時照護"],
                                  outlined: "",
                                  dense: "",
                                  class: "col-12 col-sm-6"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_q_input, {
                                  modelValue: formData.value.message,
                                  "onUpdate:modelValue": ($event) => formData.value.message = $event,
                                  label: "留言",
                                  type: "textarea",
                                  outlined: "",
                                  dense: "",
                                  rows: "3",
                                  class: "col-12"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "表單響應式測試"),
                          createVNode(_component_q_form, { class: "row q-gutter-md" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_input, {
                                modelValue: formData.value.name,
                                "onUpdate:modelValue": ($event) => formData.value.name = $event,
                                label: "姓名",
                                outlined: "",
                                dense: "",
                                class: "col-12 col-sm-6"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_q_input, {
                                modelValue: formData.value.email,
                                "onUpdate:modelValue": ($event) => formData.value.email = $event,
                                label: "電子郵件",
                                outlined: "",
                                dense: "",
                                class: "col-12 col-sm-6"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_q_input, {
                                modelValue: formData.value.phone,
                                "onUpdate:modelValue": ($event) => formData.value.phone = $event,
                                label: "電話",
                                outlined: "",
                                dense: "",
                                class: "col-12 col-sm-6"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_q_select, {
                                modelValue: formData.value.service,
                                "onUpdate:modelValue": ($event) => formData.value.service = $event,
                                label: "服務類型",
                                options: ["日間照護", "夜間照護", "24小時照護"],
                                outlined: "",
                                dense: "",
                                class: "col-12 col-sm-6"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_q_input, {
                                modelValue: formData.value.message,
                                "onUpdate:modelValue": ($event) => formData.value.message = $event,
                                label: "留言",
                                type: "textarea",
                                outlined: "",
                                dense: "",
                                rows: "3",
                                class: "col-12"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode("div", { class: "text-h6 q-mb-md" }, "表單響應式測試"),
                        createVNode(_component_q_form, { class: "row q-gutter-md" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_input, {
                              modelValue: formData.value.name,
                              "onUpdate:modelValue": ($event) => formData.value.name = $event,
                              label: "姓名",
                              outlined: "",
                              dense: "",
                              class: "col-12 col-sm-6"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_q_input, {
                              modelValue: formData.value.email,
                              "onUpdate:modelValue": ($event) => formData.value.email = $event,
                              label: "電子郵件",
                              outlined: "",
                              dense: "",
                              class: "col-12 col-sm-6"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_q_input, {
                              modelValue: formData.value.phone,
                              "onUpdate:modelValue": ($event) => formData.value.phone = $event,
                              label: "電話",
                              outlined: "",
                              dense: "",
                              class: "col-12 col-sm-6"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_q_select, {
                              modelValue: formData.value.service,
                              "onUpdate:modelValue": ($event) => formData.value.service = $event,
                              label: "服務類型",
                              options: ["日間照護", "夜間照護", "24小時照護"],
                              outlined: "",
                              dense: "",
                              class: "col-12 col-sm-6"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_q_input, {
                              modelValue: formData.value.message,
                              "onUpdate:modelValue": ($event) => formData.value.message = $event,
                              label: "留言",
                              type: "textarea",
                              outlined: "",
                              dense: "",
                              rows: "3",
                              class: "col-12"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
            _push2(ssrRenderComponent(_component_q_card, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6 q-mb-md" data-v-86a7add7${_scopeId3}>卡片響應式測試</div><div class="row q-gutter-md" data-v-86a7add7${_scopeId3}><!--[-->`);
                        ssrRenderList(3, (i) => {
                          _push4(`<div class="col-12 col-md-6 col-lg-4" data-v-86a7add7${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_card, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_q_img, {
                                  src: "https://placehold.co/400x200",
                                  ratio: 16 / 9
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_q_card_section, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="text-h6" data-v-86a7add7${_scopeId5}>看護師 ${ssrInterpolate(i)}</div><div class="text-subtitle2" data-v-86a7add7${_scopeId5}>5年經驗 | 專業護理</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "text-h6" }, "看護師 " + toDisplayString(i), 1),
                                        createVNode("div", { class: "text-subtitle2" }, "5年經驗 | 專業護理")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_q_card_section, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<p data-v-86a7add7${_scopeId5}>專業的護理服務，照顧您的家人如同自己的家人。</p>`);
                                    } else {
                                      return [
                                        createVNode("p", null, "專業的護理服務，照顧您的家人如同自己的家人。")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_q_card_actions, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_btn, {
                                        flat: "",
                                        color: "primary"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`查看詳情`);
                                          } else {
                                            return [
                                              createTextVNode("查看詳情")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_q_btn, {
                                        flat: "",
                                        color: "secondary"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`立即預約`);
                                          } else {
                                            return [
                                              createTextVNode("立即預約")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          color: "primary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("查看詳情")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          color: "secondary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("立即預約")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_q_img, {
                                    src: "https://placehold.co/400x200",
                                    ratio: 16 / 9
                                  }),
                                  createVNode(_component_q_card_section, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h6" }, "看護師 " + toDisplayString(i), 1),
                                      createVNode("div", { class: "text-subtitle2" }, "5年經驗 | 專業護理")
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_q_card_section, null, {
                                    default: withCtx(() => [
                                      createVNode("p", null, "專業的護理服務，照顧您的家人如同自己的家人。")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_card_actions, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        color: "primary"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("查看詳情")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        color: "secondary"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("立即預約")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        });
                        _push4(`<!--]--></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6 q-mb-md" }, "卡片響應式測試"),
                          createVNode("div", { class: "row q-gutter-md" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                              return createVNode("div", {
                                class: "col-12 col-md-6 col-lg-4",
                                key: i
                              }, [
                                createVNode(_component_q_card, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_img, {
                                      src: "https://placehold.co/400x200",
                                      ratio: 16 / 9
                                    }),
                                    createVNode(_component_q_card_section, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-h6" }, "看護師 " + toDisplayString(i), 1),
                                        createVNode("div", { class: "text-subtitle2" }, "5年經驗 | 專業護理")
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_card_section, null, {
                                      default: withCtx(() => [
                                        createVNode("p", null, "專業的護理服務，照顧您的家人如同自己的家人。")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_card_actions, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          color: "primary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("查看詳情")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_btn, {
                                          flat: "",
                                          color: "secondary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("立即預約")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 2
                                }, 1024)
                              ]);
                            }), 64))
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
                        createVNode("div", { class: "text-h6 q-mb-md" }, "卡片響應式測試"),
                        createVNode("div", { class: "row q-gutter-md" }, [
                          (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                            return createVNode("div", {
                              class: "col-12 col-md-6 col-lg-4",
                              key: i
                            }, [
                              createVNode(_component_q_card, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_img, {
                                    src: "https://placehold.co/400x200",
                                    ratio: 16 / 9
                                  }),
                                  createVNode(_component_q_card_section, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h6" }, "看護師 " + toDisplayString(i), 1),
                                      createVNode("div", { class: "text-subtitle2" }, "5年經驗 | 專業護理")
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_q_card_section, null, {
                                    default: withCtx(() => [
                                      createVNode("p", null, "專業的護理服務，照顧您的家人如同自己的家人。")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_card_actions, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        color: "primary"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("查看詳情")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_btn, {
                                        flat: "",
                                        color: "secondary"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("立即預約")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1024)
                            ]);
                          }), 64))
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
              createVNode("div", { class: "text-h4 q-mb-md" }, "響應式設計測試"),
              createVNode(_component_q_card, { class: "q-mb-md" }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6 q-mb-md" }, "螢幕資訊"),
                      createVNode("div", { class: "row q-gutter-md" }, [
                        createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                          createVNode(_component_q_chip, {
                            color: unref($q).screen.xs ? "primary" : "grey",
                            "text-color": "white"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" XS (< 600px): " + toDisplayString(unref($q).screen.xs), 1)
                            ]),
                            _: 1
                          }, 8, ["color"])
                        ]),
                        createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                          createVNode(_component_q_chip, {
                            color: unref($q).screen.sm ? "primary" : "grey",
                            "text-color": "white"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" SM (600-1023px): " + toDisplayString(unref($q).screen.sm), 1)
                            ]),
                            _: 1
                          }, 8, ["color"])
                        ]),
                        createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                          createVNode(_component_q_chip, {
                            color: unref($q).screen.md ? "primary" : "grey",
                            "text-color": "white"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" MD (1024-1439px): " + toDisplayString(unref($q).screen.md), 1)
                            ]),
                            _: 1
                          }, 8, ["color"])
                        ]),
                        createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                          createVNode(_component_q_chip, {
                            color: unref($q).screen.lg ? "primary" : "grey",
                            "text-color": "white"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" LG (1440-1919px): " + toDisplayString(unref($q).screen.lg), 1)
                            ]),
                            _: 1
                          }, 8, ["color"])
                        ]),
                        createVNode("div", { class: "col-12 col-sm-6 col-md-3" }, [
                          createVNode(_component_q_chip, {
                            color: unref($q).screen.xl ? "primary" : "grey",
                            "text-color": "white"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" XL (≥ 1920px): " + toDisplayString(unref($q).screen.xl), 1)
                            ]),
                            _: 1
                          }, 8, ["color"])
                        ])
                      ]),
                      createVNode("div", { class: "q-mt-md" }, [
                        createVNode("p", null, "視窗寬度: " + toDisplayString(windowWidth.value) + "px", 1),
                        createVNode("p", null, "視窗高度: " + toDisplayString(windowHeight.value) + "px", 1)
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_card, { class: "q-mb-md" }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6 q-mb-md" }, "Header 測試"),
                      createVNode("p", null, "檢查 Header 在不同螢幕尺寸下的表現："),
                      createVNode("ul", null, [
                        createVNode("li", null, "手機版：應顯示漢堡選單圖標"),
                        createVNode("li", null, "平板/桌面版：應顯示返回按鈕"),
                        createVNode("li", null, "標題應居中顯示")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_card, { class: "q-mb-md" }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6 q-mb-md" }, "Footer 快速選單測試"),
                      createVNode("p", null, "底部導航應在所有設備上都可見："),
                      createVNode("ul", null, [
                        createVNode("li", null, "4個主要功能按鈕：首頁、看護師、預約、我的"),
                        createVNode("li", null, "圖標和文字應清晰可見"),
                        createVNode("li", null, "點擊應有反饋效果"),
                        createVNode("li", null, "在手機上應固定在底部")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_card, { class: "q-mb-md" }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6 q-mb-md" }, "側邊抽屜選單測試"),
                      createVNode(_component_q_btn, {
                        color: "primary",
                        onClick: testDrawer
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 開啟側邊選單 ")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "q-mt-md" }, [
                        createVNode("p", null, "測試要點："),
                        createVNode("ul", null, [
                          createVNode("li", null, "選單應從左側滑出"),
                          createVNode("li", null, "在手機上應覆蓋整個螢幕"),
                          createVNode("li", null, "在平板/桌面上可以同時顯示內容"),
                          createVNode("li", null, "應包含用戶資訊區塊"),
                          createVNode("li", null, "選單項目應分類清晰")
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_card, { class: "q-mb-md" }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6 q-mb-md" }, "響應式網格系統測試"),
                      createVNode("div", { class: "row q-gutter-md" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                          return createVNode("div", {
                            class: "col-12 col-sm-6 col-md-4 col-lg-3",
                            key: i
                          }, [
                            createVNode(_component_q_card, {
                              flat: "",
                              bordered: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_card_section, { class: "text-center" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-h6" }, "項目 " + toDisplayString(i), 1),
                                    createVNode("p", null, "這是一個響應式網格項目")
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ]);
                        }), 64))
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_card, { class: "q-mb-md" }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6 q-mb-md" }, "表單響應式測試"),
                      createVNode(_component_q_form, { class: "row q-gutter-md" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_input, {
                            modelValue: formData.value.name,
                            "onUpdate:modelValue": ($event) => formData.value.name = $event,
                            label: "姓名",
                            outlined: "",
                            dense: "",
                            class: "col-12 col-sm-6"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_q_input, {
                            modelValue: formData.value.email,
                            "onUpdate:modelValue": ($event) => formData.value.email = $event,
                            label: "電子郵件",
                            outlined: "",
                            dense: "",
                            class: "col-12 col-sm-6"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_q_input, {
                            modelValue: formData.value.phone,
                            "onUpdate:modelValue": ($event) => formData.value.phone = $event,
                            label: "電話",
                            outlined: "",
                            dense: "",
                            class: "col-12 col-sm-6"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_q_select, {
                            modelValue: formData.value.service,
                            "onUpdate:modelValue": ($event) => formData.value.service = $event,
                            label: "服務類型",
                            options: ["日間照護", "夜間照護", "24小時照護"],
                            outlined: "",
                            dense: "",
                            class: "col-12 col-sm-6"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_q_input, {
                            modelValue: formData.value.message,
                            "onUpdate:modelValue": ($event) => formData.value.message = $event,
                            label: "留言",
                            type: "textarea",
                            outlined: "",
                            dense: "",
                            rows: "3",
                            class: "col-12"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_card, null, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6 q-mb-md" }, "卡片響應式測試"),
                      createVNode("div", { class: "row q-gutter-md" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                          return createVNode("div", {
                            class: "col-12 col-md-6 col-lg-4",
                            key: i
                          }, [
                            createVNode(_component_q_card, null, {
                              default: withCtx(() => [
                                createVNode(_component_q_img, {
                                  src: "https://placehold.co/400x200",
                                  ratio: 16 / 9
                                }),
                                createVNode(_component_q_card_section, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-h6" }, "看護師 " + toDisplayString(i), 1),
                                    createVNode("div", { class: "text-subtitle2" }, "5年經驗 | 專業護理")
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_q_card_section, null, {
                                  default: withCtx(() => [
                                    createVNode("p", null, "專業的護理服務，照顧您的家人如同自己的家人。")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_card_actions, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_btn, {
                                      flat: "",
                                      color: "primary"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("查看詳情")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_btn, {
                                      flat: "",
                                      color: "secondary"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("立即預約")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1024)
                          ]);
                        }), 64))
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/responsive-test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const responsiveTest = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-86a7add7"]]);

export { responsiveTest as default };
//# sourceMappingURL=responsive-test-20B5x1qX.mjs.map
