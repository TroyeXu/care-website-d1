import { getCurrentInstance, ref, computed, watch, shallowReactive, onBeforeUnmount, h, withDirectives, vShow } from 'vue';
import { s as createComponent, M as useModelToggleEmits, z as useDarkProps, N as useModelToggleProps, O as useRouterLinkProps, A as useDark, P as useId, Q as useModelToggle, R as uid, k as __nuxt_component_15, g as __nuxt_component_13, x as hSlot, h as __nuxt_component_14, i as __nuxt_component_12, b as __nuxt_component_1, F as stopAndPrevent } from '../build/server.mjs';
import { _ as __nuxt_component_7$1 } from './QSlideTransition.mjs';

const itemGroups = shallowReactive({});
const LINK_PROPS = Object.keys(useRouterLinkProps);

const __nuxt_component_7 = createComponent({
  name: 'QExpansionItem',

  props: {
    ...useRouterLinkProps,
    ...useModelToggleProps,
    ...useDarkProps,

    icon: String,

    label: String,
    labelLines: [ Number, String ],

    caption: String,
    captionLines: [ Number, String ],

    dense: Boolean,

    toggleAriaLabel: String,
    expandIcon: String,
    expandedIcon: String,
    expandIconClass: [ Array, String, Object ],
    duration: {},

    headerInsetLevel: Number,
    contentInsetLevel: Number,

    expandSeparator: Boolean,
    defaultOpened: Boolean,
    hideExpandIcon: Boolean,
    expandIconToggle: Boolean,
    switchToggleSide: Boolean,
    denseToggle: Boolean,
    group: String,
    popup: Boolean,

    headerStyle: [ Array, String, Object ],
    headerClass: [ Array, String, Object ]
  },

  emits: [
    ...useModelToggleEmits,
    'click', 'afterShow', 'afterHide'
  ],

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);

    const showing = ref(
      props.modelValue !== null
        ? props.modelValue
        : props.defaultOpened
    );

    const blurTargetRef = ref(null);
    const targetUid = useId();

    const { show, hide, toggle } = useModelToggle({ showing });

    let uniqueId, exitGroup;

    const classes = computed(() =>
      'q-expansion-item q-item-type'
      + ` q-expansion-item--${ showing.value === true ? 'expanded' : 'collapsed' }`
      + ` q-expansion-item--${ props.popup === true ? 'popup' : 'standard' }`
    );

    const contentStyle = computed(() => {
      if (props.contentInsetLevel === void 0) {
        return null
      }

      const dir = $q.lang.rtl === true ? 'Right' : 'Left';
      return {
        [ 'padding' + dir ]: (props.contentInsetLevel * 56) + 'px'
      }
    });

    const hasLink = computed(() =>
      props.disable !== true && (
        props.href !== void 0
        || (props.to !== void 0 && props.to !== null && props.to !== '')
      )
    );

    const linkProps = computed(() => {
      const acc = {};
      LINK_PROPS.forEach(key => {
        acc[ key ] = props[ key ];
      });
      return acc
    });

    const isClickable = computed(() =>
      hasLink.value === true || props.expandIconToggle !== true
    );

    const expansionIcon = computed(() => (
      props.expandedIcon !== void 0 && showing.value === true
        ? props.expandedIcon
        : props.expandIcon || $q.iconSet.expansionItem[ props.denseToggle === true ? 'denseIcon' : 'icon' ]
    ));

    const activeToggleIcon = computed(() =>
      props.disable !== true && (hasLink.value === true || props.expandIconToggle === true)
    );

    const headerSlotScope = computed(() => ({
      expanded: showing.value === true,
      detailsId: targetUid.value,
      toggle,
      show,
      hide
    }));

    const toggleAriaAttrs = computed(() => {
      const toggleAriaLabel = props.toggleAriaLabel !== void 0
        ? props.toggleAriaLabel
        : $q.lang.label[ showing.value === true ? 'collapse' : 'expand' ](props.label);

      return {
        role: 'button',
        'aria-expanded': showing.value === true ? 'true' : 'false',
        'aria-controls': targetUid.value,
        'aria-label': toggleAriaLabel
      }
    });

    watch(() => props.group, name => {
      exitGroup?.();
      name !== void 0 && enterGroup();
    });

    function onHeaderClick (e) {
      hasLink.value !== true && toggle(e);
      emit('click', e);
    }

    function toggleIconKeyboard (e) {
      e.keyCode === 13 && toggleIcon(e, true);
    }

    function toggleIcon (e, keyboard) {
      if (keyboard !== true && e.qAvoidFocus !== true) {
        blurTargetRef.value?.focus();
      }

      toggle(e);
      stopAndPrevent(e);
    }

    function onShow () {
      emit('afterShow');
    }

    function onHide () {
      emit('afterHide');
    }

    function enterGroup () {
      if (uniqueId === void 0) {
        uniqueId = uid();
      }

      if (showing.value === true) {
        itemGroups[ props.group ] = uniqueId;
      }

      const show = watch(showing, val => {
        if (val === true) {
          itemGroups[ props.group ] = uniqueId;
        }
        else if (itemGroups[ props.group ] === uniqueId) {
          delete itemGroups[ props.group ];
        }
      });

      const group = watch(
        () => itemGroups[ props.group ],
        (val, oldVal) => {
          if (oldVal === uniqueId && val !== void 0 && val !== uniqueId) {
            hide();
          }
        }
      );

      exitGroup = () => {
        show();
        group();

        if (itemGroups[ props.group ] === uniqueId) {
          delete itemGroups[ props.group ];
        }

        exitGroup = void 0;
      };
    }

    function getToggleIcon () {
      const data = {
        class: [
          'q-focusable relative-position cursor-pointer'
            + `${ props.denseToggle === true && props.switchToggleSide === true ? ' items-end' : '' }`,
          props.expandIconClass
        ],
        side: props.switchToggleSide !== true,
        avatar: props.switchToggleSide
      };

      const child = [
        h(__nuxt_component_1, {
          class: 'q-expansion-item__toggle-icon'
            + (props.expandedIcon === void 0 && showing.value === true
              ? ' q-expansion-item__toggle-icon--rotated'
              : ''),
          name: expansionIcon.value
        })
      ];

      if (activeToggleIcon.value === true) {
        Object.assign(data, {
          tabindex: 0,
          ...toggleAriaAttrs.value,
          onClick: toggleIcon,
          onKeyup: toggleIconKeyboard
        });

        child.unshift(
          h('div', {
            ref: blurTargetRef,
            class: 'q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded',
            tabindex: -1
          })
        );
      }

      return h(__nuxt_component_14, data, () => child)
    }

    function getHeaderChild () {
      let child;

      if (slots.header !== void 0) {
        child = [].concat(slots.header(headerSlotScope.value));
      }
      else {
        child = [
          h(__nuxt_component_14, () => [
            h(__nuxt_component_12, { lines: props.labelLines }, () => props.label || ''),

            props.caption
              ? h(__nuxt_component_12, { lines: props.captionLines, caption: true }, () => props.caption)
              : null
          ])
        ];

        props.icon && child[ props.switchToggleSide === true ? 'push' : 'unshift' ](
          h(__nuxt_component_14, {
            side: props.switchToggleSide === true,
            avatar: props.switchToggleSide !== true
          }, () => h(__nuxt_component_1, { name: props.icon }))
        );
      }

      if (props.disable !== true && props.hideExpandIcon !== true) {
        child[ props.switchToggleSide === true ? 'unshift' : 'push' ](
          getToggleIcon()
        );
      }

      return child
    }

    function getHeader () {
      const data = {
        ref: 'item',
        style: props.headerStyle,
        class: props.headerClass,
        dark: isDark.value,
        disable: props.disable,
        dense: props.dense,
        insetLevel: props.headerInsetLevel
      };

      if (isClickable.value === true) {
        data.clickable = true;
        data.onClick = onHeaderClick;

        Object.assign(
          data,
          hasLink.value === true ? linkProps.value : toggleAriaAttrs.value
        );
      }

      return h(__nuxt_component_13, data, getHeaderChild)
    }

    function getTransitionChild () {
      return withDirectives(
        h('div', {
          key: 'e-content',
          class: 'q-expansion-item__content relative-position',
          style: contentStyle.value,
          id: targetUid.value
        }, hSlot(slots.default)),
        [ [
          vShow,
          showing.value
        ] ]
      )
    }

    function getContent () {
      const node = [
        getHeader(),

        h(__nuxt_component_7$1, {
          duration: props.duration,
          onShow,
          onHide
        }, getTransitionChild)
      ];

      if (props.expandSeparator === true) {
        node.push(
          h(__nuxt_component_15, {
            class: 'q-expansion-item__border q-expansion-item__border--top absolute-top',
            dark: isDark.value
          }),
          h(__nuxt_component_15, {
            class: 'q-expansion-item__border q-expansion-item__border--bottom absolute-bottom',
            dark: isDark.value
          })
        );
      }

      return node
    }

    props.group !== void 0 && enterGroup();

    onBeforeUnmount(() => {
      exitGroup?.();
    });

    return () => h('div', { class: classes.value }, [
      h('div', { class: 'q-expansion-item__container relative-position' }, getContent())
    ])
  }
});

export { __nuxt_component_7 as _ };
//# sourceMappingURL=QExpansionItem.mjs.map
