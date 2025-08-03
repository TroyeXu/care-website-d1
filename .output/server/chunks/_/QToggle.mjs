import { computed, h } from 'vue';
import { n as createComponent, b as __nuxt_component_1 } from '../build/server.mjs';
import { u as useCheckboxEmits, a as useCheckboxProps, b as useCheckbox } from './use-checkbox.mjs';

const __nuxt_component_12$2 = createComponent({
  name: 'QToggle',

  props: {
    ...useCheckboxProps,

    icon: String,
    iconColor: String
  },

  emits: useCheckboxEmits,

  setup (props) {
    function getInner (isTrue, isIndeterminate) {
      const icon = computed(() =>
        (isTrue.value === true
          ? props.checkedIcon
          : (isIndeterminate.value === true ? props.indeterminateIcon : props.uncheckedIcon)
        ) || props.icon
      );

      const color = computed(() => (isTrue.value === true ? props.iconColor : null));

      return () => [
        h('div', { class: 'q-toggle__track' }),

        h('div', {
          class: 'q-toggle__thumb absolute flex flex-center no-wrap'
        }, icon.value !== void 0
          ? [
              h(__nuxt_component_1, {
                name: icon.value,
                color: color.value
              })
            ]
          : void 0
        )
      ]
    }

    return useCheckbox('toggle', getInner)
  }
});

export { __nuxt_component_12$2 as _ };
//# sourceMappingURL=QToggle.mjs.map
