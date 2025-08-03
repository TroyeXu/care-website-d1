import { computed, toValue, reactive, getCurrentInstance, onServerPrefetch, ref, shallowRef, toRef, nextTick, unref, onBeforeUpdate, h } from 'vue';
import { O as hash } from '../nitro/nitro.mjs';
import { isPlainObject } from '@vue/shared';
import { a6 as fetchDefaults, a7 as useNuxtApp, a8 as asyncDataDefaults, a9 as useRequestFetch, aa as createError, n as createComponent, ab as useFormProps, W as useSizeProps, X as useSize, ac as useFormAttrs, F as hMergeSlot, b as __nuxt_component_1, ad as useFormInject, ae as between, $ as stopAndPrevent } from '../build/server.mjs';
import { debounce } from 'perfect-debounce';

function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
  if (!nuxtApp._asyncData[key.value]?._init) {
    initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
    nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
  }
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const initialFetch = () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => nuxtApp._asyncData[key.value].execute(...args2),
    execute: (...args2) => nuxtApp._asyncData[key.value].execute(...args2),
    clear: () => clearNuxtDataByKey(nuxtApp, key.value)
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
        nuxtApp._asyncDataPromises[key].cancelled = true;
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      asyncData.status.value = "pending";
      const promise = new Promise(
        (resolve, reject) => {
          try {
            resolve(handler(nuxtApp));
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        if (promise.cancelled) {
          return nuxtApp._asyncDataPromises[key];
        }
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (promise.cancelled) {
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        if (promise.cancelled) {
          return;
        }
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  let controller;
  const asyncData = useAsyncData(watchSources === false ? key.value : key, () => {
    controller?.abort?.(new DOMException("Request aborted as another request to the same endpoint was initiated.", "AbortError"));
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(new DOMException("Request aborted due to timeout.", "AbortError")), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}

const __nuxt_component_11 = createComponent({
  name: 'QRating',

  props: {
    ...useSizeProps,
    ...useFormProps,

    modelValue: {
      type: Number,
      required: true
    },

    max: {
      type: [ String, Number ],
      default: 5
    },

    icon: [ String, Array ],
    iconHalf: [ String, Array ],
    iconSelected: [ String, Array ],

    iconAriaLabel: [ String, Array ],

    color: [ String, Array ],
    colorHalf: [ String, Array ],
    colorSelected: [ String, Array ],

    noReset: Boolean,
    noDimming: Boolean,

    readonly: Boolean,
    disable: Boolean
  },

  emits: [ 'update:modelValue' ],

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const sizeStyle = useSize(props);
    const formAttrs = useFormAttrs(props);
    const injectFormInput = useFormInject(formAttrs);

    const mouseModel = ref(0);

    let iconRefs = {};

    const editable = computed(() =>
      props.readonly !== true && props.disable !== true
    );

    const classes = computed(() =>
      'q-rating row inline items-center'
      + ` q-rating--${ editable.value === true ? '' : 'non-' }editable`
      + (props.noDimming === true ? ' q-rating--no-dimming' : '')
      + (props.disable === true ? ' disabled' : '')
      + (
        props.color !== void 0 && Array.isArray(props.color) === false
          ? ` text-${ props.color }`
          : ''
      )
    );

    const iconData = computed(() => {
      const
        iconLen = Array.isArray(props.icon) === true ? props.icon.length : 0,
        selIconLen = Array.isArray(props.iconSelected) === true ? props.iconSelected.length : 0,
        halfIconLen = Array.isArray(props.iconHalf) === true ? props.iconHalf.length : 0,
        colorLen = Array.isArray(props.color) === true ? props.color.length : 0,
        selColorLen = Array.isArray(props.colorSelected) === true ? props.colorSelected.length : 0,
        halfColorLen = Array.isArray(props.colorHalf) === true ? props.colorHalf.length : 0;

      return {
        iconLen,
        icon: iconLen > 0 ? props.icon[ iconLen - 1 ] : props.icon,
        selIconLen,
        selIcon: selIconLen > 0 ? props.iconSelected[ selIconLen - 1 ] : props.iconSelected,
        halfIconLen,
        halfIcon: halfIconLen > 0 ? props.iconHalf[ selIconLen - 1 ] : props.iconHalf,
        colorLen,
        color: colorLen > 0 ? props.color[ colorLen - 1 ] : props.color,
        selColorLen,
        selColor: selColorLen > 0 ? props.colorSelected[ selColorLen - 1 ] : props.colorSelected,
        halfColorLen,
        halfColor: halfColorLen > 0 ? props.colorHalf[ halfColorLen - 1 ] : props.colorHalf
      }
    });

    const iconLabel = computed(() => {
      if (typeof props.iconAriaLabel === 'string') {
        const label = props.iconAriaLabel.length !== 0 ? `${ props.iconAriaLabel } ` : '';
        return i => `${ label }${ i }`
      }

      if (Array.isArray(props.iconAriaLabel) === true) {
        const iMax = props.iconAriaLabel.length;

        if (iMax > 0) {
          return i => props.iconAriaLabel[ Math.min(i, iMax) - 1 ]
        }
      }

      return (i, label) => `${ label } ${ i }`
    });

    const stars = computed(() => {
      const
        acc = [],
        icons = iconData.value,
        ceil = Math.ceil(props.modelValue),
        tabindex = editable.value === true ? 0 : null;

      const halfIndex = props.iconHalf === void 0 || ceil === props.modelValue
        ? -1
        : ceil;

      for (let i = 1; i <= props.max; i++) {
        const
          active = (mouseModel.value === 0 && props.modelValue >= i) || (mouseModel.value > 0 && mouseModel.value >= i),
          half = halfIndex === i && mouseModel.value < i,
          exSelected = mouseModel.value > 0 && (half === true ? ceil : props.modelValue) >= i && mouseModel.value < i,
          color = half === true
            ? (i <= icons.halfColorLen ? props.colorHalf[ i - 1 ] : icons.halfColor)
            : (
                icons.selColor !== void 0 && active === true
                  ? (i <= icons.selColorLen ? props.colorSelected[ i - 1 ] : icons.selColor)
                  : (i <= icons.colorLen ? props.color[ i - 1 ] : icons.color)
              ),
          name = (
            half === true
              ? (i <= icons.halfIconLen ? props.iconHalf[ i - 1 ] : icons.halfIcon)
              : (
                  icons.selIcon !== void 0 && (active === true || exSelected === true)
                    ? (i <= icons.selIconLen ? props.iconSelected[ i - 1 ] : icons.selIcon)
                    : (i <= icons.iconLen ? props.icon[ i - 1 ] : icons.icon)
                )
          ) || $q.iconSet.rating.icon;

        acc.push({
          name: (
            half === true
              ? (i <= icons.halfIconLen ? props.iconHalf[ i - 1 ] : icons.halfIcon)
              : (
                  icons.selIcon !== void 0 && (active === true || exSelected === true)
                    ? (i <= icons.selIconLen ? props.iconSelected[ i - 1 ] : icons.selIcon)
                    : (i <= icons.iconLen ? props.icon[ i - 1 ] : icons.icon)
                )
          ) || $q.iconSet.rating.icon,

          attrs: {
            tabindex,
            role: 'radio',
            'aria-checked': props.modelValue === i ? 'true' : 'false',
            'aria-label': iconLabel.value(i, name)
          },

          iconClass: 'q-rating__icon'
            + (active === true || half === true ? ' q-rating__icon--active' : '')
            + (exSelected === true ? ' q-rating__icon--exselected' : '')
            + (mouseModel.value === i ? ' q-rating__icon--hovered' : '')
            + (color !== void 0 ? ` text-${ color }` : '')
        });
      }

      return acc
    });

    const attributes = computed(() => {
      const attrs = { role: 'radiogroup' };

      if (props.disable === true) {
        attrs[ 'aria-disabled' ] = 'true';
      }
      if (props.readonly === true) {
        attrs[ 'aria-readonly' ] = 'true';
      }

      return attrs
    });

    function set (value) {
      if (editable.value === true) {
        const
          model = between(parseInt(value, 10), 1, parseInt(props.max, 10)),
          newVal = props.noReset !== true && props.modelValue === model ? 0 : model;

        newVal !== props.modelValue && emit('update:modelValue', newVal);
        mouseModel.value = 0;
      }
    }

    function setHoverValue (value) {
      if (editable.value === true) {
        mouseModel.value = value;
      }
    }

    function onKeyup (e, i) {
      switch (e.keyCode) {
        case 13:
        case 32:
          set(i);
          return stopAndPrevent(e)
        case 37: // LEFT ARROW
        case 40: // DOWN ARROW
          if (iconRefs[ `rt${ i - 1 }` ]) {
            iconRefs[ `rt${ i - 1 }` ].focus();
          }
          return stopAndPrevent(e)
        case 39: // RIGHT ARROW
        case 38: // UP ARROW
          if (iconRefs[ `rt${ i + 1 }` ]) {
            iconRefs[ `rt${ i + 1 }` ].focus();
          }
          return stopAndPrevent(e)
      }
    }

    function resetMouseModel () {
      mouseModel.value = 0;
    }

    onBeforeUpdate(() => {
      iconRefs = {};
    });

    return () => {
      const child = [];

      stars.value.forEach(({ iconClass, name, attrs }, index) => {
        const i = index + 1;

        child.push(
          h('div', {
            key: i,
            ref: el => { iconRefs[ `rt${ i }` ] = el; },
            class: 'q-rating__icon-container flex flex-center',
            ...attrs,
            onClick () { set(i); },
            onMouseover () { setHoverValue(i); },
            onMouseout: resetMouseModel,
            onFocus () { setHoverValue(i); },
            onBlur: resetMouseModel,
            onKeyup (e) { onKeyup(e, i); }
          }, hMergeSlot(
            slots[ `tip-${ i }` ],
            [ h(__nuxt_component_1, { class: iconClass, name }) ]
          ))
        );
      });

      if (props.name !== void 0 && props.disable !== true) {
        injectFormInput(child, 'push');
      }

      return h('div', {
        class: classes.value,
        style: sizeStyle.value,
        ...attributes.value
      }, child)
    }
  }
});

export { __nuxt_component_11 as _, useFetch as u };
//# sourceMappingURL=QRating.mjs.map
