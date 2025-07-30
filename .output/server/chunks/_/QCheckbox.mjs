import { h, computed } from 'vue';
import { s as createComponent, b as __nuxt_component_1 } from '../build/server.mjs';
import { u as useCheckboxEmits, a as useCheckboxProps, b as useCheckbox } from './use-checkbox.mjs';

const createBgNode = () => h('div', {
  key: 'svg',
  class: 'q-checkbox__bg absolute'
}, [
  h('svg', {
    class: 'q-checkbox__svg fit absolute-full',
    viewBox: '0 0 24 24'
  }, [
    h('path', {
      class: 'q-checkbox__truthy',
      fill: 'none',
      d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
    }),

    h('path', {
      class: 'q-checkbox__indet',
      d: 'M4,14H20V10H4'
    })
  ])
]);

const __nuxt_component_5$1 = createComponent({
  name: 'QCheckbox',

  props: useCheckboxProps,
  emits: useCheckboxEmits,

  setup (props) {
    const bgNode = createBgNode();

    function getInner (isTrue, isIndeterminate) {
      const icon = computed(() =>
        (isTrue.value === true
          ? props.checkedIcon
          : (isIndeterminate.value === true
              ? props.indeterminateIcon
              : props.uncheckedIcon
            )
        ) || null
      );

      return () => (
        icon.value !== null
          ? [
              h('div', {
                key: 'icon',
                class: 'q-checkbox__icon-container absolute-full flex flex-center no-wrap'
              }, [
                h(__nuxt_component_1, {
                  class: 'q-checkbox__icon',
                  name: icon.value
                })
              ])
            ]
          : [ bgNode ]
      )
    }

    return useCheckbox('checkbox', getInner)
  }
});

export { __nuxt_component_5$1 as _ };
//# sourceMappingURL=QCheckbox.mjs.map
