import { getCurrentInstance, provide, computed, h, inject, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { t as createComponent, v as useDarkProps, w as useDark, x as timelineKey, y as hSlot, z as emptyRenderFn, A as hUniqueSlot, g as __nuxt_component_1$1, u as usePageSeo, a as __nuxt_component_1, b as __nuxt_component_2, c as __nuxt_component_3$1 } from './server.mjs';
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

const __nuxt_component_3 = createComponent({
  name: 'QTimeline',

  props: {
    ...useDarkProps,

    color: {
      type: String,
      default: 'primary'
    },
    side: {
      type: String,
      default: 'right',
      validator: v => [ 'left', 'right' ].includes(v)
    },
    layout: {
      type: String,
      default: 'dense',
      validator: v => [ 'dense', 'comfortable', 'loose' ].includes(v)
    }
  },

  setup (props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);

    provide(timelineKey, props);

    const classes = computed(() =>
      `q-timeline q-timeline--${ props.layout } q-timeline--${ props.layout }--${ props.side }`
      + (isDark.value === true ? ' q-timeline--dark' : '')
    );

    return () => h('ul', { class: classes.value }, hSlot(slots.default))
  }
});

const __nuxt_component_4 = createComponent({
  name: 'QTimelineEntry',

  props: {
    heading: Boolean,
    tag: {
      type: String,
      default: 'h3'
    },
    side: {
      type: String,
      default: 'right',
      validator: v => [ 'left', 'right' ].includes(v)
    },

    icon: String,
    avatar: String,

    color: String,

    title: String,
    subtitle: String,
    body: String
  },

  setup (props, { slots }) {
    const $timeline = inject(timelineKey, emptyRenderFn);
    if ($timeline === emptyRenderFn) {
      console.error('QTimelineEntry needs to be child of QTimeline');
      return emptyRenderFn
    }

    const classes = computed(() =>
      `q-timeline__entry q-timeline__entry--${ props.side }`
      + (props.icon !== void 0 || props.avatar !== void 0 ? ' q-timeline__entry--icon' : '')
    );

    const dotClass = computed(() =>
      `q-timeline__dot text-${ props.color || $timeline.color }`
    );

    const reverse = computed(() =>
      $timeline.layout === 'comfortable' && $timeline.side === 'left'
    );

    return () => {
      const child = hUniqueSlot(slots.default, []);

      if (props.body !== void 0) {
        child.unshift(props.body);
      }

      if (props.heading === true) {
        const content = [
          h('div'),
          h('div'),
          h(
            props.tag,
            { class: 'q-timeline__heading-title' },
            child
          )
        ];

        return h('div', {
          class: 'q-timeline__heading'
        }, reverse.value === true ? content.reverse() : content)
      }

      let dot;

      if (props.icon !== void 0) {
        dot = [
          h(__nuxt_component_1$1, {
            class: 'row items-center justify-center',
            name: props.icon
          })
        ];
      }
      else if (props.avatar !== void 0) {
        dot = [
          h('img', {
            class: 'q-timeline__dot-img',
            src: props.avatar
          })
        ];
      }

      const content = [
        h('div', { class: 'q-timeline__subtitle' }, [
          h('span', {}, hSlot(slots.subtitle, [ props.subtitle ]))
        ]),

        h('div', { class: dotClass.value }, dot),

        h('div', { class: 'q-timeline__content' }, [
          h('h6', { class: 'q-timeline__title' }, hSlot(slots.title, [ props.title ]))
        ].concat(child))
      ];

      return h('li', {
        class: classes.value
      }, reverse.value === true ? content.reverse() : content)
    }
  }
});

const _sfc_main = {
  __name: "guide",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("使用指南 - DogFriend", "一步步教你如何使用 DogFriend 平台");
    const steps = [
      {
        title: "步驟一",
        subtitle: "註冊帳號",
        icon: "person_add",
        text: "於平台註冊並填寫個人資料"
      },
      {
        title: "步驟二",
        subtitle: "搜尋看護",
        icon: "search",
        text: "使用搜尋功能找到適合的人員"
      },
      {
        title: "步驟三",
        subtitle: "預約服務",
        icon: "event",
        text: "聯繫我們確認排程"
      },
      {
        title: "步驟四",
        subtitle: "開始照護",
        icon: "check_circle",
        text: "看護到府開始服務"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_timeline = __nuxt_component_3;
      const _component_q_timeline_entry = __nuxt_component_4;
      const _component_q_btn = __nuxt_component_3$1;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: "",
              class: "info-card q-mb-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6"${_scopeId3}>如何開始使用</div><p${_scopeId3}>透過簡單四個步驟即可媒合到專業看護。</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-h6" }, "如何開始使用"),
                          createVNode("p", null, "透過簡單四個步驟即可媒合到專業看護。")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6" }, "如何開始使用"),
                        createVNode("p", null, "透過簡單四個步驟即可媒合到專業看護。")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_timeline, { color: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(steps, (step, index) => {
                    _push3(ssrRenderComponent(_component_q_timeline_entry, {
                      key: index,
                      title: step.title,
                      subtitle: step.subtitle,
                      icon: step.icon
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(step.text)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(step.text), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(steps, (step, index) => {
                      return createVNode(_component_q_timeline_entry, {
                        key: index,
                        title: step.title,
                        subtitle: step.subtitle,
                        icon: step.icon
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(step.text), 1)
                        ]),
                        _: 2
                      }, 1032, ["title", "subtitle", "icon"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-center q-mt-md"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_btn, {
              color: "primary",
              to: "/auth/register",
              label: "立即註冊"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_q_card, {
                flat: "",
                bordered: "",
                class: "info-card q-mb-lg"
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6" }, "如何開始使用"),
                      createVNode("p", null, "透過簡單四個步驟即可媒合到專業看護。")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_timeline, { color: "primary" }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(steps, (step, index) => {
                    return createVNode(_component_q_timeline_entry, {
                      key: index,
                      title: step.title,
                      subtitle: step.subtitle,
                      icon: step.icon
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(step.text), 1)
                      ]),
                      _: 2
                    }, 1032, ["title", "subtitle", "icon"]);
                  }), 64))
                ]),
                _: 1
              }),
              createVNode("div", { class: "text-center q-mt-md" }, [
                createVNode(_component_q_btn, {
                  color: "primary",
                  to: "/auth/register",
                  label: "立即註冊"
                })
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/info/guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=guide-a9T8HuD8.mjs.map
