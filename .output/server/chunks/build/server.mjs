import { computed, markRaw, defineComponent, h, unref, onBeforeUnmount, getCurrentInstance, onDeactivated, nextTick, watch, onMounted, ref, withDirectives, Transition, onBeforeUpdate, inject, onActivated, reactive, provide, hasInjectionContext, effectScope, isRef, isReactive, toRaw, getCurrentScope, onScopeDispose, toRefs, createElementBlock, shallowRef, cloneVNode, Suspense, Fragment, useSSRContext, createApp, shallowReactive, mergeProps, withCtx, createTextVNode, toDisplayString as toDisplayString$1, createBlock, createCommentVNode, openBlock, createVNode, renderList, toRef, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, isReadonly, isShallow, Text } from 'vue';
import { m as createError$1, s as sanitizeStatusCode, t as getContext, $ as $fetch$1, v as baseURL, w as createHooks, x as executeAsync, y as defuFn, z as toRouteMatcher, A as createRouter$1, B as defu, C as klona, D as getRequestURL, E as getRequestHeader, F as parse$1, o as destr, G as isEqual, H as setCookie, I as getCookie, J as deleteCookie } from '../nitro/nitro.mjs';
import { RouterView, useRoute as useRoute$1, useRouter as useRouter$1, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { createPathIndexLanguageParser, parseAcceptLanguage } from '@intlify/utils';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrGetDirectiveProps, ssrRenderAttrs, ssrRenderSuspense, ssrRenderVNode } from 'vue/server-renderer';
import { createClient } from '@supabase/supabase-js';
import { u as useHead$1, h as headSymbol, a as useSeoMeta$1 } from '../routes/renderer.mjs';

const lang = {
  isoName: 'zh-TW',
  nativeName: '中文（繁體）',
  label: {
    clear: '清除',
    ok: '確定',
    cancel: '取消',
    close: '關閉',
    set: '設定',
    select: '選擇',
    reset: '重置',
    remove: '移除',
    update: '更新',
    create: '新增',
    search: '搜尋',
    filter: '篩選',
    refresh: '更新',
    expand: label => (label ? `展開"${ label }"` : '擴張'),
    collapse: label => (label ? `折疊"${ label }"` : '坍塌')
  },
  date: {
    days: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    daysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    headerTitle: date => new Intl.DateTimeFormat('zh-TW', {
      weekday: 'short', month: 'short', day: 'numeric'
    }).format(date),
    firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: false,
    pluralDay: '日',
    prevMonth: '上个月',
    nextMonth: '下个月',
    prevYear: '上一年',
    nextYear: '下一年',
    today: '今天',
    prevRangeYears: range => `以前${ range }年`,
    nextRangeYears: range => `接下来${ range }年`
  },
  table: {
    noData: '沒有資料',
    noResults: '沒有相符資料',
    loading: '載入中...',
    selectedRecords: rows => '已選擇 ' + rows + ' 列',
    recordsPerPage: '每頁列數：',
    allRows: '全部',
    pagination: (start, end, total) => start + '-' + end + ' 列，共 ' + total + ' 列',
    columns: '欄位'
  },
  pagination: {
    first: '首頁',
    prev: '上一頁',
    next: '下一頁',
    last: '最後一頁'
  },
  editor: {
    url: '網址',
    bold: '粗體',
    italic: '斜體',
    strikethrough: '刪除線',
    underline: '下劃線',
    unorderedList: '項目符號清單',
    orderedList: '編號清單',
    subscript: '下標',
    superscript: '上標',
    hyperlink: '超連結',
    toggleFullscreen: '切換全螢幕',
    quote: '段落引用',
    left: '靠左對齊',
    center: '置中對齊',
    right: '靠右對齊',
    justify: '分散對齊',
    print: '列印',
    outdent: '減少縮排',
    indent: '增加縮排',
    removeFormat: '清除格式',
    formatting: '區塊元素',
    fontSize: '字型大小',
    align: '對齊',
    hr: '水平分隔線',
    undo: '復原',
    redo: '取消復原',
    heading1: '標題 1',
    heading2: '標題 2',
    heading3: '標題 3',
    heading4: '標題 4',
    heading5: '標題 5',
    heading6: '標題 6',
    paragraph: '段落',
    code: '程式碼',
    size1: '非常小',
    size2: '稍小',
    size3: '正常',
    size4: '稍大',
    size5: '大',
    size6: '非常大',
    size7: '超級大',
    defaultFont: '預設字型',
    viewSource: '切換原始碼'
  },
  tree: {
    noNodes: '沒有節點',
    noResults: '沒有相符節點'
  }
};

const iconSet = {
  name: 'material-icons',
  type: {
    positive: 'check_circle',
    negative: 'warning',
    info: 'info',
    warning: 'priority_high'
  },
  arrow: {
    up: 'arrow_upward',
    right: 'arrow_forward',
    down: 'arrow_downward',
    left: 'arrow_back',
    dropdown: 'arrow_drop_down'
  },
  chevron: {
    left: 'chevron_left',
    right: 'chevron_right'
  },
  colorPicker: {
    spectrum: 'gradient',
    tune: 'tune',
    palette: 'style'
  },
  pullToRefresh: {
    icon: 'refresh'
  },
  carousel: {
    left: 'chevron_left',
    right: 'chevron_right',
    up: 'keyboard_arrow_up',
    down: 'keyboard_arrow_down',
    navigationIcon: 'lens'
  },
  chip: {
    remove: 'cancel',
    selected: 'check'
  },
  datetime: {
    arrowLeft: 'chevron_left',
    arrowRight: 'chevron_right',
    now: 'access_time',
    today: 'today'
  },
  editor: {
    bold: 'format_bold',
    italic: 'format_italic',
    strikethrough: 'strikethrough_s',
    underline: 'format_underlined',
    unorderedList: 'format_list_bulleted',
    orderedList: 'format_list_numbered',
    subscript: 'vertical_align_bottom',
    superscript: 'vertical_align_top',
    hyperlink: 'link',
    toggleFullscreen: 'fullscreen',
    quote: 'format_quote',
    left: 'format_align_left',
    center: 'format_align_center',
    right: 'format_align_right',
    justify: 'format_align_justify',
    print: 'print',
    outdent: 'format_indent_decrease',
    indent: 'format_indent_increase',
    removeFormat: 'format_clear',
    formatting: 'text_format',
    fontSize: 'format_size',
    align: 'format_align_left',
    hr: 'remove',
    undo: 'undo',
    redo: 'redo',
    heading: 'format_size',
    code: 'code',
    size: 'format_size',
    font: 'font_download',
    viewSource: 'code'
  },
  expansionItem: {
    icon: 'keyboard_arrow_down',
    denseIcon: 'arrow_drop_down'
  },
  fab: {
    icon: 'add',
    activeIcon: 'close'
  },
  field: {
    clear: 'cancel',
    error: 'error'
  },
  pagination: {
    first: 'first_page',
    prev: 'keyboard_arrow_left',
    next: 'keyboard_arrow_right',
    last: 'last_page'
  },
  rating: {
    icon: 'grade'
  },
  stepper: {
    done: 'check',
    active: 'edit',
    error: 'warning'
  },
  tabs: {
    left: 'chevron_left',
    right: 'chevron_right',
    up: 'keyboard_arrow_up',
    down: 'keyboard_arrow_down'
  },
  table: {
    arrowUp: 'arrow_upward',
    warning: 'warning',
    firstPage: 'first_page',
    prevPage: 'chevron_left',
    nextPage: 'chevron_right',
    lastPage: 'last_page'
  },
  tree: {
    icon: 'play_arrow'
  },
  uploader: {
    done: 'done',
    clear: 'clear',
    add: 'add_box',
    upload: 'cloud_upload',
    removeQueue: 'clear_all',
    removeUploaded: 'done_all'
  }
};

const useSizeDefaults = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
};

const useSizeProps = {
  size: String
};

function useSize (props, sizes = useSizeDefaults) {
  // return sizeStyle
  return computed(() => (
    props.size !== void 0
      ? { fontSize: props.size in sizes ? `${ sizes[ props.size ] }px` : props.size }
      : null
  ))
}

const useSpinnerProps = {
  size: {
    type: [ String, Number ],
    default: '1em'
  },
  color: String
};

function useSpinner (props) {
  return {
    cSize: computed(() => (
      props.size in useSizeDefaults
        ? `${ useSizeDefaults[ props.size ] }px`
        : props.size
    )),

    classes: computed(() =>
      'q-spinner' + (props.color ? ` text-${ props.color }` : '')
    )
  }
}

function injectProp (target, propName, get, set) {
  Object.defineProperty(target, propName, {
    get,
    set,
    enumerable: true
  });
  return target
}

function injectMultipleProps (target, props) {
  for (const key in props) {
    injectProp(target, key, props[ key ]);
  }
  return target
}

function createComponent (raw) { return markRaw(defineComponent(raw)) }
function createDirective (raw) { return markRaw(raw) }

const createReactivePlugin = (state, plugin) => {
      Object.assign(plugin, state);
      return plugin
    }
  ;

const QSpinner = createComponent({
  name: 'QSpinner',

  props: {
    ...useSpinnerProps,

    thickness: {
      type: Number,
      default: 5
    }
  },

  setup (props) {
    const { cSize, classes } = useSpinner(props);

    return () => h('svg', {
      class: classes.value + ' q-spinner-mat',
      width: cSize.value,
      height: cSize.value,
      viewBox: '25 25 50 50'
    }, [
      h('circle', {
        class: 'path',
        cx: '50',
        cy: '50',
        r: '20',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': props.thickness,
        'stroke-miterlimit': '10'
      })
    ])
  }
});

/* eslint-disable no-useless-escape */


/**
 * __ QUASAR_SSR __            -> runs on SSR on client or server
 * __ QUASAR_SSR_SERVER __     -> runs on SSR on server
 * __ QUASAR_SSR_CLIENT __     -> runs on SSR on client
 * __ QUASAR_SSR_PWA __        -> built with SSR+PWA; may run on SSR on client or on PWA client
 *                              (needs runtime detection)
 */

const isRuntimeSsrPreHydration = { value: true }
  ;

function getMatch (userAgent, platformMatch) {
  const match = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(userAgent)
    || /(opr)[\/]([\w.]+)/.exec(userAgent)
    || /(vivaldi)[\/]([\w.]+)/.exec(userAgent)
    || /(chrome|crios)[\/]([\w.]+)/.exec(userAgent)
    || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent)
    || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent)
    || /(firefox|fxios)[\/]([\w.]+)/.exec(userAgent)
    || /(webkit)[\/]([\w.]+)/.exec(userAgent)
    || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(userAgent)
    || [];

  return {
    browser: match[ 5 ] || match[ 3 ] || match[ 1 ] || '',
    version: match[ 4 ] || match[ 2 ] || '0',
    platform: platformMatch[ 0 ] || ''
  }
}

function getPlatformMatch (userAgent) {
  return /(ipad)/.exec(userAgent)
    || /(ipod)/.exec(userAgent)
    || /(windows phone)/.exec(userAgent)
    || /(iphone)/.exec(userAgent)
    || /(kindle)/.exec(userAgent)
    || /(silk)/.exec(userAgent)
    || /(android)/.exec(userAgent)
    || /(win)/.exec(userAgent)
    || /(mac)/.exec(userAgent)
    || /(linux)/.exec(userAgent)
    || /(cros)/.exec(userAgent)
    // TODO: Remove BlackBerry detection. BlackBerry OS, BlackBerry 10, and BlackBerry PlayBook OS
    // is officially dead as of January 4, 2022 (https://www.blackberry.com/us/en/support/devices/end-of-life)
    || /(playbook)/.exec(userAgent)
    || /(bb)/.exec(userAgent)
    || /(blackberry)/.exec(userAgent)
    || []
}

function getPlatform (UA) {
  const userAgent = UA.toLowerCase();
  const platformMatch = getPlatformMatch(userAgent);
  const matched = getMatch(userAgent, platformMatch);
  const browser = {
    mobile: false,
    desktop: false,

    cordova: false,
    capacitor: false,
    nativeMobile: false,
    // nativeMobileWrapper: void 0,
    electron: false,
    bex: false,

    linux: false,
    mac: false,
    win: false,
    cros: false,

    chrome: false,
    firefox: false,
    opera: false,
    safari: false,
    vivaldi: false,
    edge: false,
    edgeChromium: false,
    ie: false,
    webkit: false,

    android: false,
    ios: false,
    ipad: false,
    iphone: false,
    ipod: false,
    kindle: false,
    winphone: false,
    blackberry: false,
    playbook: false,
    silk: false
  };

  if (matched.browser) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version, 10);
  }

  if (matched.platform) {
    browser[ matched.platform ] = true;
  }

  const knownMobiles = browser.android
    || browser.ios
    || browser.bb
    || browser.blackberry
    || browser.ipad
    || browser.iphone
    || browser.ipod
    || browser.kindle
    || browser.playbook
    || browser.silk
    || browser[ 'windows phone' ];

  // These are all considered mobile platforms, meaning they run a mobile browser
  if (
    knownMobiles === true
    || userAgent.indexOf('mobile') !== -1
  ) {
    browser.mobile = true;
  }
  // If it's not mobile we should consider it's desktop platform, meaning it runs a desktop browser
  // It's a workaround for anonymized user agents
  // (browser.cros || browser.mac || browser.linux || browser.win)
  else {
    browser.desktop = true;
  }

  if (browser[ 'windows phone' ]) {
    browser.winphone = true;
    delete browser[ 'windows phone' ];
  }

  if (browser.edga || browser.edgios || browser.edg) {
    browser.edge = true;
    matched.browser = 'edge';
  }
  else if (browser.crios) {
    browser.chrome = true;
    matched.browser = 'chrome';
  }
  else if (browser.fxios) {
    browser.firefox = true;
    matched.browser = 'firefox';
  }

  // Set iOS if on iPod, iPad or iPhone
  if (browser.ipod || browser.ipad || browser.iphone) {
    browser.ios = true;
  }

  if (browser.vivaldi) {
    matched.browser = 'vivaldi';
    browser.vivaldi = true;
  }

  // TODO: The assumption about WebKit based browsers below is not completely accurate.
  // Google released Blink(a fork of WebKit) engine on April 3, 2013, which is really different than WebKit today.
  // Today, one might want to check for WebKit to deal with its bugs, which is used on all browsers on iOS, and Safari browser on all platforms.
  if (
    // Chrome, Opera 15+, Vivaldi and Safari are webkit based browsers
    browser.chrome
    || browser.opr
    || browser.safari
    || browser.vivaldi
    // we expect unknown, non iOS mobile browsers to be webkit based
    || (
      browser.mobile === true
      && browser.ios !== true
      && knownMobiles !== true
    )
  ) {
    browser.webkit = true;
  }

  // Opera 15+ are identified as opr
  if (browser.opr) {
    matched.browser = 'opera';
    browser.opera = true;
  }

  // Some browsers are marked as Safari but are not
  if (browser.safari) {
    if (browser.blackberry || browser.bb) {
      matched.browser = 'blackberry';
      browser.blackberry = true;
    }
    else if (browser.playbook) {
      matched.browser = 'playbook';
      browser.playbook = true;
    }
    else if (browser.android) {
      matched.browser = 'android';
      browser.android = true;
    }
    else if (browser.kindle) {
      matched.browser = 'kindle';
      browser.kindle = true;
    }
    else if (browser.silk) {
      matched.browser = 'silk';
      browser.silk = true;
    }
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;

  return browser
}

const ssrClient = {
  has: {
    touch: false,
    webStorage: false
  },
  within: { iframe: false }
};

// We export "client" for hydration error-free parts,
// like touch directives who do not (and must NOT) wait
// for the client takeover;
// Do NOT import this directly in your app, unless you really know
// what you are doing.
const client = ssrClient
  ;

const Platform = {
  install (opts) {
    const { $q } = opts;

    {
      $q.platform = this.parseSSR(opts.ssrContext);
    }
  }
};

{
  Platform.parseSSR = (ssrContext) => {
    const userAgent = ssrContext.req.headers[ 'user-agent' ] || ssrContext.req.headers[ 'User-Agent' ] || '';
    return {
      ...client,
      userAgent,
      is: getPlatform(userAgent)
    }
  };
}

const listenOpts = {
  hasPassive: false,
  passiveCapture: true,
  notPassiveCapture: true
};

try {
  const opts = Object.defineProperty({}, 'passive', {
    get () {
      Object.assign(listenOpts, {
        hasPassive: true,
        passive: { passive: true },
        notPassive: { passive: false },
        passiveCapture: { passive: true, capture: true },
        notPassiveCapture: { passive: false, capture: true }
      });
    }
  });
  window.addEventListener('qtest', null, opts);
  window.removeEventListener('qtest', null, opts);
}
catch (_) {}

function noop$1 () {}

function position (e) {
  if (e.touches && e.touches[ 0 ]) {
    e = e.touches[ 0 ];
  }
  else if (e.changedTouches && e.changedTouches[ 0 ]) {
    e = e.changedTouches[ 0 ];
  }
  else if (e.targetTouches && e.targetTouches[ 0 ]) {
    e = e.targetTouches[ 0 ];
  }

  return {
    top: e.clientY,
    left: e.clientX
  }
}

function getEventPath (e) {
  if (e.path) {
    return e.path
  }
  if (e.composedPath) {
    return e.composedPath()
  }

  const path = [];
  let el = e.target;

  while (el) {
    path.push(el);

    if (el.tagName === 'HTML') {
      path.push(document);
      path.push(window);
      return path
    }

    el = el.parentElement;
  }
}

function stop (e) {
  e.stopPropagation();
}

function prevent (e) {
  e.cancelable !== false && e.preventDefault();
}

function stopAndPrevent (e) {
  e.cancelable !== false && e.preventDefault();
  e.stopPropagation();
}

function addEvt (ctx, targetName, events) {
  const name = `__q_${ targetName }_evt`;

  ctx[ name ] = ctx[ name ] !== void 0
    ? ctx[ name ].concat(events)
    : events;

  events.forEach(evt => {
    evt[ 0 ].addEventListener(evt[ 1 ], ctx[ evt[ 2 ] ], listenOpts[ evt[ 3 ] ]);
  });
}

function cleanEvt (ctx, targetName) {
  const name = `__q_${ targetName }_evt`;

  if (ctx[ name ] !== void 0) {
    ctx[ name ].forEach(evt => {
      evt[ 0 ].removeEventListener(evt[ 1 ], ctx[ evt[ 2 ] ], listenOpts[ evt[ 3 ] ]);
    });
    ctx[ name ] = void 0;
  }
}

function debounce (fn, wait = 250, immediate) {
  let timer = null;

  function debounced (/* ...args */) {
    const args = arguments;

    const later = () => {
      timer = null;
      {
        fn.apply(this, args);
      }
    };

    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(later, wait);
  }

  debounced.cancel = () => {
    timer !== null && clearTimeout(timer);
  };

  return debounced
}

const { passive: passive$1 } = listenOpts;

const Screen = createReactivePlugin({
  width: 0,
  height: 0,
  name: 'xs',

  sizes: {
    sm: 600,
    md: 1024,
    lg: 1440,
    xl: 1920
  },

  lt: {
    sm: true,
    md: true,
    lg: true,
    xl: true
  },
  gt: {
    xs: false,
    sm: false,
    md: false,
    lg: false
  },

  xs: true,
  sm: false,
  md: false,
  lg: false,
  xl: false
}, {
  setSizes: noop$1,
  setDebounce: noop$1,

  install ({ $q, onSSRHydrated }) {
    $q.screen = this;

    return
  }
});

const Plugin$3 = createReactivePlugin({
  isActive: false,
  mode: false
}, {
  __media: void 0,

  set (val) {
    return
  },

  toggle () {
  },

  install ({ $q, ssrContext }) {
    const { dark } = $q.config;

    {
      this.isActive = dark === true;

      $q.dark = {
        isActive: false,
        mode: false,
        set: val => {
          ssrContext._meta.bodyClasses = ssrContext._meta.bodyClasses
            .replace(' body--light', '')
            .replace(' body--dark', '') + ` body--${ val === true ? 'dark' : 'light' }`;

          $q.dark.isActive = val === true;
          $q.dark.mode = val;
        },
        toggle: () => {
          $q.dark.set($q.dark.isActive === false);
        }
      };

      $q.dark.set(dark);
      return
    }
  }
});

function shouldIgnoreKey (evt) {
  return evt !== Object(evt)
    || evt.isComposing === true
    || evt.qKeyEvent === true
}

function isKeyCode (evt, keyCodes) {
  return shouldIgnoreKey(evt) === true
    ? false
    : [].concat(keyCodes).includes(evt.keyCode)
}

function getMobilePlatform (is) {
  if (is.ios === true) return 'ios'
  if (is.android === true) return 'android'
}

function getBodyClasses ({ is, has, within }, cfg) {
  const cls = [
    is.desktop === true ? 'desktop' : 'mobile',
    `${ has.touch === false ? 'no-' : '' }touch`
  ];

  if (is.mobile === true) {
    const mobile = getMobilePlatform(is);
    mobile !== void 0 && cls.push('platform-' + mobile);
  }

  if (is.nativeMobile === true) {
    const type = is.nativeMobileWrapper;

    cls.push(type);
    cls.push('native-mobile');

    if (
      is.ios === true
      && (cfg[ type ] === void 0 || cfg[ type ].iosStatusBarPadding !== false)
    ) {
      cls.push('q-ios-padding');
    }
  }
  else if (is.electron === true) {
    cls.push('electron');
  }
  else if (is.bex === true) {
    cls.push('bex');
  }

  within.iframe === true && cls.push('within-iframe');

  return cls
}

const Body = {
  install (opts) {
    {
      const { $q, ssrContext } = opts;
      const cls = getBodyClasses($q.platform, $q.config);

      if ($q.config.screen?.bodyClass === true) {
        cls.push('screen--xs');
      }

      ssrContext._meta.bodyClasses += cls.join(' ');

      const brand = $q.config.brand;
      if (brand !== void 0) {
        const vars = Object.keys(brand)
          .map(key => `--q-${ key }:${ brand[ key ] };`)
          .join('');

        ssrContext._meta.endingHeadTags += `<style>:root{${ vars }}</style>`;
      }

      return
    }
  }
};

const History = {
  __history: [],
  add: noop$1,
  remove: noop$1,

  install ({ $q }) {
    return
  }
};

const defaultLang = {
  isoName: 'en-US',
  nativeName: 'English (US)',
  label: {
    clear: 'Clear',
    ok: 'OK',
    cancel: 'Cancel',
    close: 'Close',
    set: 'Set',
    select: 'Select',
    reset: 'Reset',
    remove: 'Remove',
    update: 'Update',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    refresh: 'Refresh',
    expand: label => (label ? `Expand "${ label }"` : 'Expand'),
    collapse: label => (label ? `Collapse "${ label }"` : 'Collapse')
  },
  date: {
    days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: false,
    pluralDay: 'days',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    prevYear: 'Previous year',
    nextYear: 'Next year',
    today: 'Today',
    prevRangeYears: range => `Previous ${ range } years`,
    nextRangeYears: range => `Next ${ range } years`
  },
  table: {
    noData: 'No data available',
    noResults: 'No matching records found',
    loading: 'Loading...',
    selectedRecords: rows => (
      rows === 1
        ? '1 record selected.'
        : (rows === 0 ? 'No' : rows) + ' records selected.'
    ),
    recordsPerPage: 'Records per page:',
    allRows: 'All',
    pagination: (start, end, total) => start + '-' + end + ' of ' + total,
    columns: 'Columns'
  },
  pagination: {
    first: 'First page',
    prev: 'Previous page',
    next: 'Next page',
    last: 'Last page'
  },
  editor: {
    url: 'URL',
    bold: 'Bold',
    italic: 'Italic',
    strikethrough: 'Strikethrough',
    underline: 'Underline',
    unorderedList: 'Unordered List',
    orderedList: 'Ordered List',
    subscript: 'Subscript',
    superscript: 'Superscript',
    hyperlink: 'Hyperlink',
    toggleFullscreen: 'Toggle Fullscreen',
    quote: 'Quote',
    left: 'Left align',
    center: 'Center align',
    right: 'Right align',
    justify: 'Justify align',
    print: 'Print',
    outdent: 'Decrease indentation',
    indent: 'Increase indentation',
    removeFormat: 'Remove formatting',
    formatting: 'Formatting',
    fontSize: 'Font Size',
    align: 'Align',
    hr: 'Insert Horizontal Rule',
    undo: 'Undo',
    redo: 'Redo',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
    heading4: 'Heading 4',
    heading5: 'Heading 5',
    heading6: 'Heading 6',
    paragraph: 'Paragraph',
    code: 'Code',
    size1: 'Very small',
    size2: 'A bit small',
    size3: 'Normal',
    size4: 'Medium-large',
    size5: 'Big',
    size6: 'Very big',
    size7: 'Maximum',
    defaultFont: 'Default Font',
    viewSource: 'View Source'
  },
  tree: {
    noNodes: 'No nodes available',
    noResults: 'No matching nodes found'
  }
};

function getLocale$1 () {
  return
}

const Plugin$2 = createReactivePlugin({
  __qLang: {}
}, {
  // props: object
  // __langConfig: object

  getLocale: getLocale$1,

  set (langObject = defaultLang, ssrContext) {
    const lang = {
      ...langObject,
      rtl: langObject.rtl === true,
      getLocale: getLocale$1
    };

    {
      if (ssrContext === void 0) {
        console.error('SSR ERROR: second param required: Lang.set(lang, ssrContext)');
        return
      }

      lang.set = ssrContext.$q.lang.set;

      if (ssrContext.$q.config.lang === void 0 || ssrContext.$q.config.lang.noHtmlAttrs !== true) {
        const dir = lang.rtl === true ? 'rtl' : 'ltr';
        const attrs = `lang=${ lang.isoName } dir=${ dir }`;

        ssrContext._meta.htmlAttrs = ssrContext.__qPrevLang !== void 0
          ? ssrContext._meta.htmlAttrs.replace(ssrContext.__qPrevLang, attrs)
          : attrs;

        ssrContext.__qPrevLang = attrs;
      }

      ssrContext.$q.lang = lang;
    }
  },

  install ({ $q, lang, ssrContext }) {
    {
      const initialLang = lang || defaultLang;

      $q.lang = {};
      $q.lang.set = langObject => {
        this.set(langObject, ssrContext);
      };

      $q.lang.set(initialLang);

      // one-time SSR server operation
      if (
        this.props === void 0
        || this.props.isoName !== initialLang.isoName
      ) {
        this.props = { ...initialLang };
      }
    }
  }
});

const Plugin$1 = createReactivePlugin({
  iconMapFn: null,
  __qIconSet: {}
}, {
  // props: object

  set (setObject, ssrContext) {
    const def = { ...setObject };

    {
      if (ssrContext === void 0) {
        console.error('SSR ERROR: second param required: IconSet.set(iconSet, ssrContext)');
        return
      }

      def.set = ssrContext.$q.iconSet.set;
      Object.assign(ssrContext.$q.iconSet, def);
    }
  },

  install ({ $q, iconSet: iconSet$1, ssrContext }) {
    {
      const initialSet = iconSet$1 || iconSet;

      $q.iconMapFn = ssrContext.$q.config.iconMapFn || this.iconMapFn || null;
      $q.iconSet = {};
      $q.iconSet.set = setObject => {
        this.set(setObject, ssrContext);
      };

      $q.iconSet.set(initialSet);

      // one-time SSR server operation
      if (
        this.props === void 0
        || this.props.name !== initialSet.name
      ) {
        this.props = { ...initialSet };
      }
    }
  }
});

const quasarKey = '_q_';
const timelineKey = '_q_t_';
const layoutKey = '_q_l_';
const pageContainerKey = '_q_pc_';
const formKey = '_q_fo_';
const tabsKey = '_q_tabs_';

function emptyRenderFn () {}

function isDeepEqual (a, b) {
  if (a === b) {
    return true
  }

  if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
    if (a.constructor !== b.constructor) {
      return false
    }

    let length, i;

    if (a.constructor === Array) {
      length = a.length;

      if (length !== b.length) {
        return false
      }

      for (i = length; i-- !== 0;) {
        if (isDeepEqual(a[ i ], b[ i ]) !== true) {
          return false
        }
      }

      return true
    }

    if (a.constructor === Map) {
      if (a.size !== b.size) {
        return false
      }

      let iter = a.entries();

      i = iter.next();
      while (i.done !== true) {
        if (b.has(i.value[ 0 ]) !== true) {
          return false
        }
        i = iter.next();
      }

      iter = a.entries();
      i = iter.next();
      while (i.done !== true) {
        if (isDeepEqual(i.value[ 1 ], b.get(i.value[ 0 ])) !== true) {
          return false
        }
        i = iter.next();
      }

      return true
    }

    if (a.constructor === Set) {
      if (a.size !== b.size) {
        return false
      }

      const iter = a.entries();

      i = iter.next();
      while (i.done !== true) {
        if (b.has(i.value[ 0 ]) !== true) {
          return false
        }
        i = iter.next();
      }

      return true
    }

    if (a.buffer != null && a.buffer.constructor === ArrayBuffer) {
      length = a.length;

      if (length !== b.length) {
        return false
      }

      for (i = length; i-- !== 0;) {
        if (a[ i ] !== b[ i ]) {
          return false
        }
      }

      return true
    }

    if (a.constructor === RegExp) {
      return a.source === b.source && a.flags === b.flags
    }

    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf()
    }

    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString()
    }

    const keys = Object.keys(a).filter(key => a[ key ] !== void 0);
    length = keys.length;

    if (length !== Object.keys(b).filter(key => b[ key ] !== void 0).length) {
      return false
    }

    for (i = length; i-- !== 0;) {
      const key = keys[ i ];
      if (isDeepEqual(a[ key ], b[ key ]) !== true) {
        return false
      }
    }

    return true
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b // eslint-disable-line no-self-compare
}

// not perfect, but what we ARE interested is for Arrays not to slip in
// as spread operator will mess things up in various areas
function isObject$1 (v) {
  return v !== null && typeof v === 'object' && Array.isArray(v) !== true
}

function isDate$1 (v) {
  return Object.prototype.toString.call(v) === '[object Date]'
}

function isNumber$1 (v) {
  return typeof v === 'number' && isFinite(v)
}

/**
 * If the list below changes, make sure
 * to also edit /ui/testing/specs/generators/generator.plugin.js
 * on the "autoInstalledPlugins" array
 */
const autoInstalledPlugins = [
  Platform,
  Body,
  Plugin$3,
  Screen,
  History,
  Plugin$2,
  Plugin$1
];

function installPlugins (pluginOpts, pluginList) {
  pluginList.forEach(Plugin => {
    Plugin.install(pluginOpts);
    Plugin.__installed = true;
  });
}

function prepareApp (app, uiOpts, pluginOpts) {
  app.config.globalProperties.$q = pluginOpts.$q;
  app.provide(quasarKey, pluginOpts.$q);

  installPlugins(pluginOpts, autoInstalledPlugins);

  uiOpts.components !== void 0 && Object.values(uiOpts.components).forEach(c => {
    if (isObject$1(c) === true && c.name !== void 0) {
      app.component(c.name, c);
    }
  });

  uiOpts.directives !== void 0 && Object.values(uiOpts.directives).forEach(d => {
    if (isObject$1(d) === true && d.name !== void 0) {
      app.directive(d.name, d);
    }
  });

  uiOpts.plugins !== void 0 && installPlugins(
    pluginOpts,
    Object.values(uiOpts.plugins).filter(
      p => typeof p.install === 'function' && autoInstalledPlugins.includes(p) === false
    )
  );

  if (isRuntimeSsrPreHydration.value === true) {
    pluginOpts.$q.onSSRHydrated = () => {
      pluginOpts.onSSRHydrated.forEach(fn => { fn(); });
      pluginOpts.$q.onSSRHydrated = () => {};
    };
  }
}

const installQuasar = function (parentApp, opts = {}, ssrContext) {
    const $q = {
      version: '2.18.1',
      config: opts.config || {}
    };

    Object.assign(ssrContext, {
      $q,
      _meta: {
        htmlAttrs: '',
        headTags: '',
        endingHeadTags: '',
        bodyClasses: '',
        bodyAttrs: 'data-server-rendered',
        bodyTags: ''
      }
    });

    if (ssrContext._modules === void 0) {
      // not OK. means the SSR build is not using @quasar/ssr-helpers,
      // but we shouldn't crash the app
      ssrContext._modules = [];
    }

    if (ssrContext.onRendered === void 0) {
      // not OK. means the SSR build is not using @quasar/ssr-helpers,
      // but we shouldn't crash the app
      ssrContext.onRendered = () => {};
    }

    parentApp.config.globalProperties.ssrContext = ssrContext;

    prepareApp(parentApp, opts, {
      parentApp,
      $q,
      lang: opts.lang,
      iconSet: opts.iconSet,
      ssrContext
    });
  }

function css (element, css) {
  const style = element.style;

  for (const prop in css) {
    style[ prop ] = css[ prop ];
  }
}

// internal
function getElement (el) {
  if (el === void 0 || el === null) {
    return void 0
  }

  if (typeof el === 'string') {
    try {
      return document.querySelector(el) || void 0
    }
    catch (err) {
      return void 0
    }
  }

  const target = unref(el);
  if (target) {
    return target.$el || target
  }
}

// internal
function childHasFocus (el, focusedEl) {
  if (el === void 0 || el === null || el.contains(focusedEl) === true) {
    return true
  }

  for (let next = el.nextElementSibling; next !== null; next = next.nextElementSibling) {
    if (next.contains(focusedEl)) {
      return true
    }
  }

  return false
}

const scrollTargetProp = {} /* SSR does not know about Element */
  ;

const scrollTargets = []
  ;

function getScrollTarget (el, targetEl) {
  let target = getElement(targetEl);

  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window
    }

    target = el.closest('.scroll,.scroll-y,.overflow-auto');
  }

  return scrollTargets.includes(target)
    ? window
    : target
}

function getVerticalScrollPosition (scrollTarget) {
  return scrollTarget === window
    ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    : scrollTarget.scrollTop
}

function getHorizontalScrollPosition (scrollTarget) {
  return scrollTarget === window
    ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
    : scrollTarget.scrollLeft
}

function animVerticalScrollTo (el, to, duration = 0 /* , prevTime */) {
  const prevTime = arguments[ 3 ] === void 0 ? performance.now() : arguments[ 3 ];
  const pos = getVerticalScrollPosition(el);

  if (duration <= 0) {
    if (pos !== to) {
      setScroll(el, to);
    }
    return
  }

  requestAnimationFrame(nowTime => {
    const frameTime = nowTime - prevTime;
    const newPos = pos + (to - pos) / Math.max(frameTime, duration) * frameTime;
    setScroll(el, newPos);
    if (newPos !== to) {
      animVerticalScrollTo(el, to, duration - frameTime, nowTime);
    }
  });
}

function animHorizontalScrollTo (el, to, duration = 0 /* , prevTime */) {
  const prevTime = arguments[ 3 ] === void 0 ? performance.now() : arguments[ 3 ];
  const pos = getHorizontalScrollPosition(el);

  if (duration <= 0) {
    if (pos !== to) {
      setHorizontalScroll(el, to);
    }
    return
  }

  requestAnimationFrame(nowTime => {
    const frameTime = nowTime - prevTime;
    const newPos = pos + (to - pos) / Math.max(frameTime, duration) * frameTime;
    setHorizontalScroll(el, newPos);
    if (newPos !== to) {
      animHorizontalScrollTo(el, to, duration - frameTime, nowTime);
    }
  });
}

function setScroll (scrollTarget, offset) {
  if (scrollTarget === window) {
    window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, offset);
    return
  }
  scrollTarget.scrollTop = offset;
}

function setHorizontalScroll (scrollTarget, offset) {
  if (scrollTarget === window) {
    window.scrollTo(offset, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    return
  }
  scrollTarget.scrollLeft = offset;
}

function setVerticalScrollPosition (scrollTarget, offset, duration) {
  if (duration) {
    animVerticalScrollTo(scrollTarget, offset, duration);
    return
  }
  setScroll(scrollTarget, offset);
}

function setHorizontalScrollPosition (scrollTarget, offset, duration) {
  if (duration) {
    animHorizontalScrollTo(scrollTarget, offset, duration);
    return
  }
  setHorizontalScroll(scrollTarget, offset);
}

let size;
function getScrollbarWidth () {
  if (size !== undefined) {
    return size
  }

  const
    inner = document.createElement('p'),
    outer = document.createElement('div');

  css(inner, {
    width: '100%',
    height: '200px'
  });
  css(outer, {
    position: 'absolute',
    top: '0px',
    left: '0px',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  const w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let w2 = inner.offsetWidth;

  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  outer.remove();
  size = w1 - w2;

  return size
}

function hasScrollbar (el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false
  }

  return onY
    ? (
        el.scrollHeight > el.clientHeight && (
          el.classList.contains('scroll')
          || el.classList.contains('overflow-auto')
          || [ 'auto', 'scroll' ].includes(window.getComputedStyle(el)[ 'overflow-y' ])
        )
      )
    : (
        el.scrollWidth > el.clientWidth && (
          el.classList.contains('scroll')
          || el.classList.contains('overflow-auto')
          || [ 'auto', 'scroll' ].includes(window.getComputedStyle(el)[ 'overflow-x' ])
        )
      )
}

let
  registered = 0,
  scrollPositionX,
  scrollPositionY,
  maxScrollTop,
  vpPendingUpdate = false,
  bodyLeft,
  bodyTop,
  href,
  closeTimer = null;

function onWheel (e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}

function shouldPreventScroll (e) {
  if (e.target === document.body || e.target.classList.contains('q-layout__backdrop')) {
    return true
  }

  const
    path = getEventPath(e),
    shift = e.shiftKey && !e.deltaX,
    scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY),
    delta = shift || scrollY ? e.deltaY : e.deltaX;

  for (let index = 0; index < path.length; index++) {
    const el = path[ index ];

    if (hasScrollbar(el, scrollY)) {
      return scrollY
        ? (
            delta < 0 && el.scrollTop === 0
              ? true
              : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight
          )
        : (
            delta < 0 && el.scrollLeft === 0
              ? true
              : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth
          )
    }
  }

  return true
}

function onAppleScroll (e) {
  if (e.target === document) {
    // required, otherwise iOS blocks further scrolling
    // until the mobile scrollbar dissappears
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop; // eslint-disable-line
  }
}

function onAppleResize (evt) {
  if (vpPendingUpdate === true) return

  vpPendingUpdate = true;

  requestAnimationFrame(() => {
    vpPendingUpdate = false;

    const
      { height } = evt.target,
      { clientHeight, scrollTop } = document.scrollingElement;

    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }

    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}

function apply$1 (action) {
  const
    body = document.body,
    hasViewport = window.visualViewport !== void 0;

  if (action === 'add') {
    const { overflowY, overflowX } = window.getComputedStyle(body);

    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;

    href = window.location.href;

    body.style.left = `-${ scrollPositionX }px`;
    body.style.top = `-${ scrollPositionY }px`;

    if (overflowX !== 'hidden' && (overflowX === 'scroll' || body.scrollWidth > window.innerWidth)) {
      body.classList.add('q-body--force-scrollbar-x');
    }
    if (overflowY !== 'hidden' && (overflowY === 'scroll' || body.scrollHeight > window.innerHeight)) {
      body.classList.add('q-body--force-scrollbar-y');
    }

    body.classList.add('q-body--prevent-scroll');
    document.qScrollPrevented = true;

    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener('resize', onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener('scroll', onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      }
      else {
        window.addEventListener('scroll', onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }

  if (client.is.desktop === true && client.is.mac === true) {
    // ref. https://developers.google.com/web/updates/2017/01/scrolling-intervention
    window[ `${ action }EventListener` ]('wheel', onWheel, listenOpts.notPassive);
  }

  if (action === 'remove') {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener('resize', onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener('scroll', onAppleResize, listenOpts.passiveCapture);
      }
      else {
        window.removeEventListener('scroll', onAppleScroll, listenOpts.passiveCapture);
      }
    }

    body.classList.remove('q-body--prevent-scroll');
    body.classList.remove('q-body--force-scrollbar-x');
    body.classList.remove('q-body--force-scrollbar-y');

    document.qScrollPrevented = false;

    body.style.left = bodyLeft;
    body.style.top = bodyTop;

    // scroll back only if route has not changed
    if (window.location.href === href) {
      window.scrollTo(scrollPositionX, scrollPositionY);
    }

    maxScrollTop = void 0;
  }
}

function preventScroll (state) {
  let action = 'add';

  if (state === true) {
    registered++;

    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
      return
    }

    if (registered > 1) return
  }
  else {
    if (registered === 0) return

    registered--;

    if (registered > 0) return

    action = 'remove';

    if (client.is.ios === true && client.is.nativeMobile === true) {
      closeTimer !== null && clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply$1(action);
        closeTimer = null;
      }, 100);
      return
    }
  }

  apply$1(action);
}

const Plugin = createReactivePlugin({
  isActive: false
}, {
  show (opts) {
    return
  },

  hide (group) {
  },

  setDefaults (opts) {
  },

  install ({ $q, parentApp }) {
    $q.loading = this;
  }
});

function useHistory (showing, hide, hideOnRouteChange) {
  let historyEntry;

  function removeFromHistory () {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }

  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });

  return {
    removeFromHistory,

    addToHistory () {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };

      History.add(historyEntry);
    }
  }
}

// copied to docs too
function getParentProxy (proxy) {
  if (Object(proxy.$parent) === proxy.$parent) {
    return proxy.$parent
  }

  let { parent } = proxy.$;

  while (Object(parent) === parent) {
    if (Object(parent.proxy) === parent.proxy) {
      return parent.proxy
    }

    parent = parent.parent;
  }
}

function fillNormalizedVNodes (children, vnode) {
  if (typeof vnode.type === 'symbol') {
    if (Array.isArray(vnode.children) === true) {
      vnode.children.forEach(child => {
        fillNormalizedVNodes(children, child);
      });
    }
  }
  else {
    children.add(vnode);
  }
}

// vnodes from rendered in advanced slots
function getNormalizedVNodes (vnodes) {
  const children = new Set();

  vnodes.forEach(vnode => {
    fillNormalizedVNodes(children, vnode);
  });

  return Array.from(children)
}

function vmHasRouter (vm) {
  return vm.appContext.config.globalProperties.$router !== void 0
}

function vmIsDestroyed (vm) {
  return vm.isUnmounted === true || vm.isDeactivated === true
}

/*
 * Usage:
 *    registerTimeout(fn[, delay])
 *    removeTimeout()
 */

function useTimeout () {
  let timer = null;
  const vm = getCurrentInstance();

  function removeTimeout () {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);

  return {
    removeTimeout,

    registerTimeout (fn, delay) {
      removeTimeout();

      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(() => {
          timer = null;
          fn();
        }, delay);
      }
    }
  }
}

/*
 * Usage:
 *    registerTick(fn)
 *    removeTick()
 */

function useTick () {
  let tickFn;
  const vm = getCurrentInstance();

  function removeTick () {
    tickFn = void 0;
  }

  onDeactivated(removeTick);
  onBeforeUnmount(removeTick);

  return {
    removeTick,

    registerTick (fn) {
      tickFn = fn;

      nextTick(() => {
        if (tickFn === fn) {
          // we also check if VM is destroyed, since if it
          // got to trigger one nextTick() we cannot stop it
          vmIsDestroyed(vm) === false && tickFn();
          tickFn = void 0;
        }
      });
    }
  }
}

const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },

  'onUpdate:modelValue': [ Function, Array ]
};

const useModelToggleEmits = [
  'beforeShow', 'show', 'beforeHide', 'hide'
];

// handleShow/handleHide -> removeTick(), self (& emit show)

function useModelToggle ({
  showing,
  canShow, // optional
  hideOnRouteChange, // optional
  handleShow, // optional
  handleHide, // optional
  processOnMount // optional
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;

  let payload;

  function toggle (evt) {
    if (showing.value === true) ;
    else {
      show(evt);
    }
  }

  function show (evt) {
    if (
      (props.disable === true)
      || (evt?.qAnchorHandled === true)
      || (canShow !== void 0 && canShow(evt) !== true)
    ) return

    const listener = props[ 'onUpdate:modelValue' ] !== void 0;

    if (props.modelValue === null || listener === false || true) {
      processShow(evt);
    }
  }

  function processShow (evt) {
    if (showing.value === true) return

    showing.value = true;

    emit('beforeShow', evt);

    if (handleShow !== void 0) {
      handleShow(evt);
    }
    else {
      emit('show', evt);
    }
  }

  function hide (evt) {
    return
  }

  function processHide (evt) {
    if (showing.value === false) return

    showing.value = false;

    emit('beforeHide', evt);

    if (handleHide !== void 0) {
      handleHide(evt);
    }
    else {
      emit('hide', evt);
    }
  }

  function processModelChange (val) {
    if (props.disable === true && val === true) {
      if (props[ 'onUpdate:modelValue' ] !== void 0) {
        emit('update:modelValue', false);
      }
    }
    else if ((val === true) !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }

  watch(() => props.modelValue, processModelChange);

  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) ;
    });
  }

  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });

  // expose public methods
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);

  return publicMethods
}

const useTransitionProps = {
  transitionShow: {
    type: String,
    default: 'fade'
  },

  transitionHide: {
    type: String,
    default: 'fade'
  },

  transitionDuration: {
    type: [ String, Number ],
    default: 300
  }
};

function useTransition (props, defaultShowFn = () => {}, defaultHideFn = () => {}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${ props.transitionShow || defaultShowFn() }`;
      const hide = `q-transition--${ props.transitionHide || defaultHideFn() }`;

      return {
        appear: true,

        enterFromClass: `${ show }-enter-from`,
        enterActiveClass: `${ show }-enter-active`,
        enterToClass: `${ show }-enter-to`,

        leaveFromClass: `${ hide }-leave-from`,
        leaveActiveClass: `${ hide }-leave-active`,
        leaveToClass: `${ hide }-leave-to`
      }
    }),

    transitionStyle: computed(() => `--q-transition-duration: ${ props.transitionDuration }ms`)
  }
}

let queue = [];
let waitFlags = [];

function addFocusFn (fn) {
  if (waitFlags.length === 0) {
    fn();
  }
  else {
    queue.push(fn);
  }
}

function removeFocusFn (fn) {
  queue = queue.filter(entry => entry !== fn);
}

/**
 * Noop internal component to ease testing
 * of the teleported content.
 *
 * const wrapper = mount(QDialog, { ... })
 * const teleportedWrapper = wrapper.findComponent({ name: 'QPortal' })
 */
createComponent({
  name: 'QPortal',
  setup (_, { slots }) {
    return () => slots.default()
  }
});

// Warning!
// You MUST specify "inheritAttrs: false" in your component

function usePortal (vm, innerRef, renderPortalContent, type) {
  // showing, including while in show/hide transition
  const portalIsActive = ref(false);

  // showing & not in any show/hide transition
  const portalIsAccessible = ref(false);

  {
    return {
      portalIsActive,
      portalIsAccessible,

      showPortal: noop$1,
      hidePortal: noop$1,
      renderPortal: noop$1
    }
  }
}

function usePreventScroll () {
  let currentState;

  return {
    preventBodyScroll (state) {
      if (
        state !== currentState
        && (currentState !== void 0 || state === true)
      ) {
        currentState = state;
        preventScroll(state);
      }
    }
  }
}

function hSlot (slot, otherwise) {
  return slot !== void 0
    ? slot() || otherwise
    : otherwise
}

function hUniqueSlot (slot, otherwise) {
  if (slot !== void 0) {
    const vnode = slot();
    if (vnode !== void 0 && vnode !== null) {
      return vnode.slice()
    }
  }

  return otherwise
}

/**
 * Source definitely exists,
 * so it's merged with the possible slot
 */
function hMergeSlot (slot, source) {
  return slot !== void 0
    ? source.concat(slot())
    : source
}

/**
 * Merge with possible slot,
 * even if source might not exist
 */
function hMergeSlotSafely (slot, source) {
  if (slot === void 0) {
    return source
  }

  return source !== void 0
    ? source.concat(slot())
    : slot()
}

/*
 * (String)  key       - unique vnode key
 * (Boolean) condition - should change ONLY when adding/removing directive
 */
function hDir (
  tag,
  data,
  children,
  key,
  condition,
  getDirsFn
) {
  data.key = key + condition;

  const vnode = h(tag, data, children);

  return condition === true
    ? withDirectives(vnode, getDirsFn())
    : vnode
}

const handlers$1 = [];
let escDown;

function onKeydown (evt) {
  escDown = evt.keyCode === 27;
}

function onBlur () {
  if (escDown === true) {
    escDown = false;
  }
}

function onKeyup (evt) {
  if (escDown === true) {
    escDown = false;

    if (isKeyCode(evt, 27) === true) {
      handlers$1[ handlers$1.length - 1 ](evt);
    }
  }
}

function update (action) {
  window[ action ]('keydown', onKeydown);
  window[ action ]('blur', onBlur);
  window[ action ]('keyup', onKeyup);
  escDown = false;
}

function addEscapeKey (fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);

    if (handlers$1.length === 1) {
      update('addEventListener');
    }
  }
}

function removeEscapeKey (fn) {
  const index = handlers$1.indexOf(fn);
  if (index !== -1) {
    handlers$1.splice(index, 1);

    if (handlers$1.length === 0) {
      update('removeEventListener');
    }
  }
}

const handlers = [];

function trigger (e) {
  handlers[ handlers.length - 1 ](e);
}

function addFocusout (fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);

    if (handlers.length === 1) {
      document.body.addEventListener('focusin', trigger);
    }
  }
}

function removeFocusout (fn) {
  const index = handlers.indexOf(fn);
  if (index !== -1) {
    handlers.splice(index, 1);

    if (handlers.length === 0) {
      document.body.removeEventListener('focusin', trigger);
    }
  }
}

let maximizedModals = 0;

const positionClass = {
  standard: 'fixed-full flex-center',
  top: 'fixed-top justify-center',
  bottom: 'fixed-bottom justify-center',
  right: 'fixed-right items-center',
  left: 'fixed-left items-center'
};

const defaultTransitions = {
  standard: [ 'scale', 'scale' ],
  top: [ 'slide-down', 'slide-up' ],
  bottom: [ 'slide-up', 'slide-down' ],
  right: [ 'slide-left', 'slide-right' ],
  left: [ 'slide-right', 'slide-left' ]
};

const __nuxt_component_20 = createComponent({
  name: 'QDialog',

  inheritAttrs: false,

  props: {
    ...useModelToggleProps,
    ...useTransitionProps,

    transitionShow: String, // override useTransitionProps
    transitionHide: String, // override useTransitionProps

    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,

    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,

    seamless: Boolean,

    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,

    square: Boolean,

    backdropFilter: String,

    position: {
      type: String,
      default: 'standard',
      validator: val => [ 'standard', 'top', 'bottom', 'left', 'right' ].includes(val)
    }
  },

  emits: [
    ...useModelToggleEmits,
    'shake', 'click', 'escapeKey'
  ],

  setup (props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();

    const innerRef = ref(null);
    const showing = ref(false);
    const animating = ref(false);

    let shakeTimeout = null, refocusTarget = null, isMaximized, avoidAutoClose;

    const hideOnRouteChange = computed(() =>
      props.persistent !== true
      && props.noRouteDismiss !== true
      && props.seamless !== true
    );

    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout } = useTimeout();
    const { registerTick, removeTick } = useTick();

    const { transitionStyle } = useTransition(
      props,
      () => defaultTransitions[ props.position ][ 0 ],
      () => defaultTransitions[ props.position ][ 1 ]
    );

    computed(() => (
      transitionStyle.value
      + (
        props.backdropFilter !== void 0
          // Safari requires the -webkit prefix
          ? `;backdrop-filter:${ props.backdropFilter };-webkit-backdrop-filter:${ props.backdropFilter }`
          : ''
      )
    ));

    const { showPortal, hidePortal, portalIsAccessible, renderPortal } = usePortal();

    const { hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide,
      processOnMount: true
    });

    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);

    computed(() =>
      'q-dialog__inner flex no-pointer-events'
      + ` q-dialog__inner--${ props.maximized === true ? 'maximized' : 'minimized' }`
      + ` q-dialog__inner--${ props.position } ${ positionClass[ props.position ] }`
      + (animating.value === true ? ' q-dialog__inner--animating' : '')
      + (props.fullWidth === true ? ' q-dialog__inner--fullwidth' : '')
      + (props.fullHeight === true ? ' q-dialog__inner--fullheight' : '')
      + (props.square === true ? ' q-dialog__inner--square' : '')
    );

    const useBackdrop = computed(() => showing.value === true && props.seamless !== true);

    computed(() => (
      props.autoClose === true
        ? { onClick: onAutoClose }
        : {}
    ));

    computed(() => [
      'q-dialog fullscreen no-pointer-events '
        + `q-dialog--${ useBackdrop.value === true ? 'modal' : 'seamless' }`,
      attrs.class
    ]);

    watch(() => props.maximized, state => {
      showing.value === true && updateMaximized(state);
    });

    watch(useBackdrop, val => {
      preventBodyScroll(val);

      if (val === true) {
        addFocusout(onFocusChange);
        addEscapeKey(onEscapeKey);
      }
      else {
        removeFocusout(onFocusChange);
        removeEscapeKey(onEscapeKey);
      }
    });

    function handleShow (evt) {
      addToHistory();

      refocusTarget = props.noRefocus === false && document.activeElement !== null
        ? document.activeElement
        : null;

      updateMaximized(props.maximized);
      showPortal();
      animating.value = true;

      if (props.noFocus !== true) {
        document.activeElement?.blur();
        registerTick(focus);
      }
      else {
        removeTick();
      }

      // should removeTimeout() if this gets removed
      registerTimeout(() => {
        if (vm.proxy.$q.platform.is.ios === true) {
          if (props.seamless !== true && document.activeElement) {
            const
              { top, bottom } = document.activeElement.getBoundingClientRect(),
              { innerHeight } = window,
              height = window.visualViewport !== void 0
                ? window.visualViewport.height
                : innerHeight;

            if (top > 0 && bottom > height / 2) {
              document.scrollingElement.scrollTop = Math.min(
                document.scrollingElement.scrollHeight - height,
                bottom >= innerHeight
                  ? Infinity
                  : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 2)
              );
            }

            document.activeElement.scrollIntoView();
          }

          // required in order to avoid the "double-tap needed" issue
          avoidAutoClose = true;
          innerRef.value.click();
          avoidAutoClose = false;
        }

        showPortal(true); // done showing portal
        animating.value = false;
        emit('show', evt);
      }, props.transitionDuration);
    }

    function handleHide (evt) {
      removeTick();
      removeFromHistory();
      cleanup(true);
      animating.value = true;
      hidePortal();

      if (refocusTarget !== null) {
        ((evt?.type.indexOf('key') === 0
          ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])')
          : void 0
        ) || refocusTarget).focus();

        refocusTarget = null;
      }

      // should removeTimeout() if this gets removed
      registerTimeout(() => {
        hidePortal(true); // done hiding, now destroy
        animating.value = false;
        emit('hide', evt);
      }, props.transitionDuration);
    }

    function focus (selector) {
      addFocusFn(() => {
        let node = innerRef.value;

        if (node === null) return

        if (selector !== void 0) {
          const target = node.querySelector(selector);
          if (target !== null) {
            target.focus({ preventScroll: true });
            return
          }
        }

        if (node.contains(document.activeElement) !== true) {
          node = (
            node.querySelector('[autofocus][tabindex], [data-autofocus][tabindex]')
            || node.querySelector('[autofocus] [tabindex], [data-autofocus] [tabindex]')
            || node.querySelector('[autofocus], [data-autofocus]')
            || node
          );

          node.focus({ preventScroll: true });
        }
      });
    }

    function shake (focusTarget) {
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus({ preventScroll: true });
      }
      else {
        focus();
      }

      emit('shake');

      const node = innerRef.value;

      if (node !== null) {
        node.classList.remove('q-animate--scale');
        node.classList.add('q-animate--scale');
        shakeTimeout !== null && clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          shakeTimeout = null;
          if (innerRef.value !== null) {
            node.classList.remove('q-animate--scale');
            // some platforms (like desktop Chrome)
            // require calling focus() again
            focus();
          }
        }, 170);
      }
    }

    function onEscapeKey () {
      if (props.seamless !== true) {
        if (props.persistent === true || props.noEscDismiss === true) {
          props.maximized !== true && props.noShake !== true && shake();
        }
        else {
          emit('escapeKey');
          hide();
        }
      }
    }

    function cleanup (hiding) {
      if (shakeTimeout !== null) {
        clearTimeout(shakeTimeout);
        shakeTimeout = null;
      }

      if (hiding === true || showing.value === true) {
        updateMaximized(false);

        if (props.seamless !== true) {
          preventBodyScroll(false);
          removeFocusout(onFocusChange);
          removeEscapeKey(onEscapeKey);
        }
      }

      if (hiding !== true) {
        refocusTarget = null;
      }
    }

    function updateMaximized (active) {
      if (active === true) {
        if (isMaximized !== true) {
          maximizedModals < 1 && document.body.classList.add('q-body--dialog');
          maximizedModals++;

          isMaximized = true;
        }
      }
      else if (isMaximized === true) {
        if (maximizedModals < 2) {
          document.body.classList.remove('q-body--dialog');
        }

        maximizedModals--;
        isMaximized = false;
      }
    }

    function onAutoClose (e) {
      if (avoidAutoClose !== true) {
        hide(e);
        emit('click', e);
      }
    }

    function onFocusChange (evt) {
      // the focus is not in a vue child component
      if (
        props.allowFocusOutside !== true
        && portalIsAccessible.value === true
        && childHasFocus(innerRef.value, evt.target) !== true
      ) {
        focus('[tabindex]:not([tabindex="-1"])');
      }
    }

    Object.assign(vm.proxy, {
      // expose public methods
      focus, shake,

      // private but needed by QSelect
      __updateRefocusTarget (target) {
        refocusTarget = target || null;
      }
    });

    onBeforeUnmount(cleanup);

    return renderPortal
  }
});

const defaultViewBox = '0 0 24 24';

const sameFn = i => i;
const ionFn = i => `ionicons ${ i }`;

const libMap = {
  'mdi-': i => `mdi ${ i }`,
  'icon-': sameFn, // fontawesome equiv
  'bt-': i => `bt ${ i }`,
  'eva-': i => `eva ${ i }`,
  'ion-md': ionFn,
  'ion-ios': ionFn,
  'ion-logo': ionFn,
  'iconfont ': sameFn,
  'ti-': i => `themify-icon ${ i }`,
  'bi-': i => `bootstrap-icons ${ i }`,
  'i-': sameFn // UnoCSS pure icons
};

const matMap = {
  o_: '-outlined',
  r_: '-round',
  s_: '-sharp'
};

const symMap = {
  sym_o_: '-outlined',
  sym_r_: '-rounded',
  sym_s_: '-sharp'
};

const libRE = new RegExp('^(' + Object.keys(libMap).join('|') + ')');
const matRE = new RegExp('^(' + Object.keys(matMap).join('|') + ')');
const symRE = new RegExp('^(' + Object.keys(symMap).join('|') + ')');
const mRE = /^[Mm]\s?[-+]?\.?\d/;
const imgRE = /^img:/;
const svgUseRE = /^svguse:/;
const ionRE = /^ion-/;
const faRE = /^(fa-(classic|sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;

const __nuxt_component_1$1$1 = createComponent({
  name: 'QIcon',

  props: {
    ...useSizeProps,

    tag: {
      type: String,
      default: 'i'
    },

    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  },

  setup (props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);

    const classes = computed(() =>
      'q-icon'
      + (props.left === true ? ' on-left' : '') // TODO Qv3: drop this
      + (props.right === true ? ' on-right' : '')
      + (props.color !== void 0 ? ` text-${ props.color }` : '')
    );

    const type = computed(() => {
      let cls;
      let icon = props.name;

      if (icon === 'none' || !icon) {
        return { none: true }
      }

      if ($q.iconMapFn !== null) {
        const res = $q.iconMapFn(icon);
        if (res !== void 0) {
          if (res.icon !== void 0) {
            icon = res.icon;
            if (icon === 'none' || !icon) {
              return { none: true }
            }
          }
          else {
            return {
              cls: res.cls,
              content: res.content !== void 0
                ? res.content
                : ' '
            }
          }
        }
      }

      if (mRE.test(icon) === true) {
        const [ def, viewBox = defaultViewBox ] = icon.split('|');

        return {
          svg: true,
          viewBox,
          nodes: def.split('&&').map(path => {
            const [ d, style, transform ] = path.split('@@');
            return h('path', { style, d, transform })
          })
        }
      }

      if (imgRE.test(icon) === true) {
        return {
          img: true,
          src: icon.substring(4)
        }
      }

      if (svgUseRE.test(icon) === true) {
        const [ def, viewBox = defaultViewBox ] = icon.split('|');

        return {
          svguse: true,
          src: def.substring(7),
          viewBox
        }
      }

      let content = ' ';
      const matches = icon.match(libRE);

      if (matches !== null) {
        cls = libMap[ matches[ 1 ] ](icon);
      }
      else if (faRE.test(icon) === true) {
        cls = icon;
      }
      else if (ionRE.test(icon) === true) {
        cls = `ionicons ion-${ $q.platform.is.ios === true ? 'ios' : 'md' }${ icon.substring(3) }`;
      }
      else if (symRE.test(icon) === true) {
        // "notranslate" class is for Google Translate
        // to avoid tampering with Material Symbols ligature font
        //
        // Caution: To be able to add suffix to the class name,
        // keep the 'material-symbols' at the end of the string.
        cls = 'notranslate material-symbols';

        const matches = icon.match(symRE);
        if (matches !== null) {
          icon = icon.substring(6);
          cls += symMap[ matches[ 1 ] ];
        }

        content = icon;
      }
      else {
        // "notranslate" class is for Google Translate
        // to avoid tampering with Material Icons ligature font
        //
        // Caution: To be able to add suffix to the class name,
        // keep the 'material-icons' at the end of the string.
        cls = 'notranslate material-icons';

        const matches = icon.match(matRE);
        if (matches !== null) {
          icon = icon.substring(2);
          cls += matMap[ matches[ 1 ] ];
        }

        content = icon;
      }

      return {
        cls,
        content
      }
    });

    return () => {
      const data = {
        class: classes.value,
        style: sizeStyle.value,
        'aria-hidden': 'true',
      };

      if (type.value.none === true) {
        return h(props.tag, data, hSlot(slots.default))
      }

      if (type.value.img === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h('img', { src: type.value.src })
        ]))
      }

      if (type.value.svg === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h('svg', {
            viewBox: type.value.viewBox || '0 0 24 24'
          }, type.value.nodes)
        ]))
      }

      if (type.value.svguse === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h('svg', {
            viewBox: type.value.viewBox
          }, [
            h('use', { 'xlink:href': type.value.src })
          ])
        ]))
      }

      if (type.value.cls !== void 0) {
        data.class += ' ' + type.value.cls;
      }

      return h(props.tag, data, hMergeSlot(slots.default, [
        type.value.content
      ]))
    }
  }
});

const getSSRProps = () => ({});

const __q_directive_0 = createDirective({ name: 'ripple', getSSRProps }
  
);

const alignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
  between: 'between',
  around: 'around',
  evenly: 'evenly',
  stretch: 'stretch'
};

const alignValues$2 = Object.keys(alignMap);

const useAlignProps = {
  align: {
    type: String,
    validator: v => alignValues$2.includes(v)
  }
};

function useAlign (props) {
  // return alignClass
  return computed(() => {
    const align = props.align === void 0
      ? props.vertical === true ? 'stretch' : 'left'
      : props.align;

    return `${ props.vertical === true ? 'items' : 'justify' }-${ alignMap[ align ] }`
  })
}

/*
 * Inspired by RouterLink from Vue Router
 *  --> API should match!
 */


// Get the original path value of a record by following its aliasOf
function getOriginalPath (record) {
  return record
    ? (
        record.aliasOf
          ? record.aliasOf.path
          : record.path
      ) : ''
}

function isSameRouteRecord (a, b) {
  // since the original record has an undefined value for aliasOf
  // but all aliases point to the original record, this will always compare
  // the original record
  return (a.aliasOf || a) === (b.aliasOf || b)
}

function includesParams (outer, inner) {
  for (const key in inner) {
    const
      innerValue = inner[ key ],
      outerValue = outer[ key ];

    if (typeof innerValue === 'string') {
      if (innerValue !== outerValue) {
        return false
      }
    }
    else if (
      Array.isArray(outerValue) === false
      || outerValue.length !== innerValue.length
      || innerValue.some((value, i) => value !== outerValue[ i ])
    ) {
      return false
    }
  }

  return true
}

function isEquivalentArray (a, b) {
  return Array.isArray(b) === true
    ? a.length === b.length && a.every((value, i) => value === b[ i ])
    : a.length === 1 && a[ 0 ] === b
}

function isSameRouteLocationParamsValue (a, b) {
  return Array.isArray(a) === true
    ? isEquivalentArray(a, b)
    : (
        Array.isArray(b) === true
          ? isEquivalentArray(b, a)
          : a === b
      )
}

function isSameRouteLocationParams (a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false
  }

  for (const key in a) {
    if (isSameRouteLocationParamsValue(a[ key ], b[ key ]) === false) {
      return false
    }
  }

  return true
}

const useRouterLinkNonMatchingProps = {
  // router-link
  to: [ String, Object ],
  replace: Boolean,

  // regular <a> link
  href: String,
  target: String,

  // state
  disable: Boolean
};

const useRouterLinkProps = {
  ...useRouterLinkNonMatchingProps,

  // router-link
  exact: Boolean,
  activeClass: {
    type: String,
    default: 'q-router-link--active'
  },
  exactActiveClass: {
    type: String,
    default: 'q-router-link--exact-active'
  }
};

// external props: type, tag

function useRouterLink ({ fallbackTag, useDisableForRouterLinkProps = true } = {}) {
  const vm = getCurrentInstance();
  const { props, proxy, emit } = vm;

  const hasRouter = vmHasRouter(vm);
  const hasHrefLink = computed(() => props.disable !== true && props.href !== void 0);

  // for perf reasons, we use minimum amount of runtime work
  const hasRouterLinkProps = useDisableForRouterLinkProps === true
    ? computed(() =>
      hasRouter === true
      && props.disable !== true
      && hasHrefLink.value !== true
      && props.to !== void 0 && props.to !== null && props.to !== ''
    )
    : computed(() =>
      hasRouter === true
      && hasHrefLink.value !== true
      && props.to !== void 0 && props.to !== null && props.to !== ''
    );

  const resolvedLink = computed(() => (
    hasRouterLinkProps.value === true
      ? getLink(props.to)
      : null
  ));

  const hasRouterLink = computed(() => resolvedLink.value !== null);
  const hasLink = computed(() => hasHrefLink.value === true || hasRouterLink.value === true);

  const linkTag = computed(() => (
    props.type === 'a' || hasLink.value === true
      ? 'a'
      : (props.tag || fallbackTag || 'div')
  ));

  const linkAttrs = computed(() => (
    hasHrefLink.value === true
      ? {
          href: props.href,
          target: props.target
        }
      : (
          hasRouterLink.value === true
            ? {
                href: resolvedLink.value.href,
                target: props.target
              }
            : {}
        )
  ));

  const linkActiveIndex = computed(() => {
    if (hasRouterLink.value === false) {
      return -1
    }

    const
      { matched } = resolvedLink.value,
      { length } = matched,
      routeMatched = matched[ length - 1 ];

    if (routeMatched === void 0) {
      return -1
    }

    const currentMatched = proxy.$route.matched;

    if (currentMatched.length === 0) {
      return -1
    }

    const index = currentMatched.findIndex(
      isSameRouteRecord.bind(null, routeMatched)
    );

    if (index !== -1) {
      return index
    }

    // possible parent record
    const parentRecordPath = getOriginalPath(matched[ length - 2 ]);

    return (
      // we are dealing with nested routes
      length > 1
      // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      && getOriginalPath(routeMatched) === parentRecordPath
      // avoid comparing the child with its parent
      && currentMatched[ currentMatched.length - 1 ].path !== parentRecordPath
        ? currentMatched.findIndex(
          isSameRouteRecord.bind(null, matched[ length - 2 ])
        )
        : index
    )
  });

  const linkIsActive = computed(() =>
    hasRouterLink.value === true
    && linkActiveIndex.value !== -1
    && includesParams(proxy.$route.params, resolvedLink.value.params)
  );

  const linkIsExactActive = computed(() =>
    linkIsActive.value === true
      && linkActiveIndex.value === proxy.$route.matched.length - 1
      && isSameRouteLocationParams(proxy.$route.params, resolvedLink.value.params)
  );

  const linkClass = computed(() => (
    hasRouterLink.value === true
      ? (
          linkIsExactActive.value === true
            ? ` ${ props.exactActiveClass } ${ props.activeClass }`
            : (
                props.exact === true
                  ? ''
                  : (linkIsActive.value === true ? ` ${ props.activeClass }` : '')
              )
        )
      : ''
  ));

  function getLink (to) {
    try { return proxy.$router.resolve(to) }
    catch (_) {}

    return null
  }

  /**
   * @returns Promise<RouterError | false | undefined>
   */
  function navigateToRouterLink (
    e,
    { returnRouterError, to = props.to, replace = props.replace } = {}
  ) {
    if (props.disable === true) {
      // ensure native navigation is prevented in all cases,
      // like when useDisableForRouterLinkProps === false (QRouteTab)
      e.preventDefault();
      return Promise.resolve(false)
    }

    if (
      // don't redirect with control keys;
      // should match RouterLink from Vue Router
      e.metaKey || e.altKey || e.ctrlKey || e.shiftKey

      // don't redirect on right click
      || (e.button !== void 0 && e.button !== 0)

      // don't redirect if it should open in a new window
      || props.target === '_blank'
    ) {
      return Promise.resolve(false)
    }

    // hinder the native navigation
    e.preventDefault();

    // then() can also return a "soft" router error (Vue Router behavior)
    const promise = proxy.$router[ replace === true ? 'replace' : 'push' ](to);

    return returnRouterError === true
      ? promise
      // else catching hard errors and also "soft" ones - then(err => ...)
      : promise.then(() => {}).catch(() => {})
  }

  // warning! ensure that the component using it has 'click' included in its 'emits' definition prop
  function navigateOnClick (e) {
    if (hasRouterLink.value === true) {
      const go = opts => navigateToRouterLink(e, opts);

      emit('click', e, go);
      e.defaultPrevented !== true && go();
    }
    else {
      emit('click', e);
    }
  }

  return {
    hasRouterLink,
    hasHrefLink,
    hasLink,

    linkTag,
    resolvedLink,
    linkIsActive,
    linkIsExactActive,
    linkClass,
    linkAttrs,

    getLink,
    navigateToRouterLink,
    navigateOnClick
  }
}

const btnPadding = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};

const formTypes = [ 'button', 'submit', 'reset' ];
const mediaTypeRE = /[^\s]\/[^\s]/;

const btnDesignOptions = [ 'flat', 'outline', 'push', 'unelevated' ];

function getBtnDesign (props, defaultValue) {
  if (props.flat === true) return 'flat'
  if (props.outline === true) return 'outline'
  if (props.push === true) return 'push'
  if (props.unelevated === true) return 'unelevated'
  return defaultValue
}

const nonRoundBtnProps = {
  ...useSizeProps,
  ...useRouterLinkNonMatchingProps,

  type: {
    type: String,
    default: 'button'
  },

  label: [ Number, String ],
  icon: String,
  iconRight: String,

  ...btnDesignOptions.reduce(
    (acc, val) => (acc[ val ] = Boolean) && acc,
    {}
  ),

  square: Boolean,
  rounded: Boolean,
  glossy: Boolean,

  size: String,
  fab: Boolean,
  fabMini: Boolean,
  padding: String,

  color: String,
  textColor: String,
  noCaps: Boolean,
  noWrap: Boolean,
  dense: Boolean,

  tabindex: [ Number, String ],

  ripple: {
    type: [ Boolean, Object ],
    default: true
  },

  align: {
    ...useAlignProps.align,
    default: 'center'
  },
  stack: Boolean,
  stretch: Boolean,
  loading: {
    type: Boolean,
    default: null
  },
  disable: Boolean
};

const useBtnProps = {
  ...nonRoundBtnProps,
  round: Boolean
};

function useBtn (props) {
  const sizeStyle = useSize(props, defaultSizes);
  const alignClass = useAlign(props);
  const { hasRouterLink, hasLink, linkTag, linkAttrs, navigateOnClick } = useRouterLink({
    fallbackTag: 'button'
  });

  const style = computed(() => {
    const obj = props.fab === false && props.fabMini === false
      ? sizeStyle.value
      : {};

    return props.padding !== void 0
      ? Object.assign({}, obj, {
        padding: props.padding
          .split(/\s+/)
          .map(v => (v in btnPadding ? btnPadding[ v ] + 'px' : v))
          .join(' '),
        minWidth: '0',
        minHeight: '0'
      })
      : obj
  });

  const isRounded = computed(() =>
    props.rounded === true || props.fab === true || props.fabMini === true
  );

  const isActionable = computed(() =>
    props.disable !== true && props.loading !== true
  );

  const tabIndex = computed(() => (
    isActionable.value === true ? props.tabindex || 0 : -1
  ));

  const design = computed(() => getBtnDesign(props, 'standard'));

  const attributes = computed(() => {
    const acc = { tabindex: tabIndex.value };

    if (hasLink.value === true) {
      Object.assign(acc, linkAttrs.value);
    }
    else if (formTypes.includes(props.type) === true) {
      acc.type = props.type;
    }

    if (linkTag.value === 'a') {
      if (props.disable === true) {
        acc[ 'aria-disabled' ] = 'true';
      }
      else if (acc.href === void 0) {
        acc.role = 'button';
      }

      if (hasRouterLink.value !== true && mediaTypeRE.test(props.type) === true) {
        acc.type = props.type;
      }
    }
    else if (props.disable === true) {
      acc.disabled = '';
      acc[ 'aria-disabled' ] = 'true';
    }

    if (props.loading === true && props.percentage !== void 0) {
      Object.assign(acc, {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': props.percentage
      });
    }

    return acc
  });

  const classes = computed(() => {
    let colors;

    if (props.color !== void 0) {
      if (props.flat === true || props.outline === true) {
        colors = `text-${ props.textColor || props.color }`;
      }
      else {
        colors = `bg-${ props.color } text-${ props.textColor || 'white' }`;
      }
    }
    else if (props.textColor) {
      colors = `text-${ props.textColor }`;
    }

    const shape = props.round === true
      ? 'round'
      : `rectangle${ isRounded.value === true ? ' q-btn--rounded' : (props.square === true ? ' q-btn--square' : '') }`;

    return `q-btn--${ design.value } q-btn--${ shape }`
      + (colors !== void 0 ? ' ' + colors : '')
      + (isActionable.value === true ? ' q-btn--actionable q-focusable q-hoverable' : (props.disable === true ? ' disabled' : ''))
      + (props.fab === true ? ' q-btn--fab' : (props.fabMini === true ? ' q-btn--fab-mini' : ''))
      + (props.noCaps === true ? ' q-btn--no-uppercase' : '')
      + (props.dense === true ? ' q-btn--dense' : '')
      + (props.stretch === true ? ' no-border-radius self-stretch' : '')
      + (props.glossy === true ? ' glossy' : '')
      + (props.square ? ' q-btn--square' : '')
  });

  const innerClasses = computed(() =>
    alignClass.value + (props.stack === true ? ' column' : ' row')
    + (props.noWrap === true ? ' no-wrap text-no-wrap' : '')
    + (props.loading === true ? ' q-btn__content--hidden' : '')
  );

  return {
    classes,
    style,
    innerClasses,
    attributes,
    hasLink,
    linkTag,
    navigateOnClick,
    isActionable
  }
}

const { passiveCapture } = listenOpts;

let
  touchTarget = null,
  keyboardTarget = null,
  mouseTarget = null;

const __nuxt_component_3 = createComponent({
  name: 'QBtn',

  props: {
    ...useBtnProps,

    percentage: Number,
    darkPercentage: Boolean,

    onTouchstart: [ Function, Array ]
  },

  emits: [ 'click', 'keydown', 'mousedown', 'keyup' ],

  setup (props, { slots, emit }) {
    const { proxy } = getCurrentInstance();

    const {
      classes, style, innerClasses,
      attributes,
      hasLink, linkTag, navigateOnClick,
      isActionable
    } = useBtn(props);

    const rootRef = ref(null);
    const blurTargetRef = ref(null);

    let localTouchTargetEl = null, avoidMouseRipple, mouseTimer = null;

    const hasLabel = computed(() =>
      props.label !== void 0 && props.label !== null && props.label !== ''
    );

    const ripple = computed(() => (
      props.disable === true || props.ripple === false
        ? false
        : {
            keyCodes: hasLink.value === true ? [ 13, 32 ] : [ 13 ],
            ...(props.ripple === true ? {} : props.ripple)
          }
    ));

    const rippleProps = computed(() => ({ center: props.round }));

    const percentageStyle = computed(() => {
      const val = Math.max(0, Math.min(100, props.percentage));
      return val > 0
        ? { transition: 'transform 0.6s', transform: `translateX(${ val - 100 }%)` }
        : {}
    });

    const onEvents = computed(() => {
      if (props.loading === true) {
        return {
          onMousedown: onLoadingEvt,
          onTouchstart: onLoadingEvt,
          onClick: onLoadingEvt,
          onKeydown: onLoadingEvt,
          onKeyup: onLoadingEvt
        }
      }

      if (isActionable.value === true) {
        const acc = {
          onClick,
          onKeydown,
          onMousedown
        };

        if (proxy.$q.platform.has.touch === true) {
          const suffix = props.onTouchstart !== void 0
            ? ''
            : 'Passive';

          acc[ `onTouchstart${ suffix }` ] = onTouchstart;
        }

        return acc
      }

      return {
        // needed; especially for disabled <a> tags
        onClick: stopAndPrevent
      }
    });

    const nodeProps = computed(() => ({
      ref: rootRef,
      class: 'q-btn q-btn-item non-selectable no-outline ' + classes.value,
      style: style.value,
      ...attributes.value,
      ...onEvents.value
    }));

    function onClick (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      if (e !== void 0) {
        if (e.defaultPrevented === true) return

        const el = document.activeElement;
        // focus button if it came from ENTER on form
        // prevent the new submit (already done)
        if (
          props.type === 'submit'
          && el !== document.body
          && rootRef.value.contains(el) === false
          // required for iOS and desktop Safari
          && el.contains(rootRef.value) === false
        ) {
          e.qAvoidFocus !== true && rootRef.value.focus();

          const onClickCleanup = () => {
            document.removeEventListener('keydown', stopAndPrevent, true);
            document.removeEventListener('keyup', onClickCleanup, passiveCapture);
            rootRef.value?.removeEventListener('blur', onClickCleanup, passiveCapture);
          };

          document.addEventListener('keydown', stopAndPrevent, true);
          document.addEventListener('keyup', onClickCleanup, passiveCapture);
          rootRef.value.addEventListener('blur', onClickCleanup, passiveCapture);
        }
      }

      navigateOnClick(e);
    }

    function onKeydown (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      emit('keydown', e);

      if (isKeyCode(e, [ 13, 32 ]) === true && keyboardTarget !== rootRef.value) {
        keyboardTarget !== null && cleanup();

        if (e.defaultPrevented !== true) {
          // focus external button if the focus helper was focused before
          e.qAvoidFocus !== true && rootRef.value.focus();

          keyboardTarget = rootRef.value;
          rootRef.value.classList.add('q-btn--active');
          document.addEventListener('keyup', onPressEnd, true);
          rootRef.value.addEventListener('blur', onPressEnd, passiveCapture);
        }

        stopAndPrevent(e);
      }
    }

    function onTouchstart (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      emit('touchstart', e);

      if (e.defaultPrevented === true) return

      if (touchTarget !== rootRef.value) {
        touchTarget !== null && cleanup();
        touchTarget = rootRef.value;

        localTouchTargetEl = e.target;
        localTouchTargetEl.addEventListener('touchcancel', onPressEnd, passiveCapture);
        localTouchTargetEl.addEventListener('touchend', onPressEnd, passiveCapture);
      }

      // avoid duplicated mousedown event
      // triggering another early ripple
      avoidMouseRipple = true;
      mouseTimer !== null && clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        mouseTimer = null;
        avoidMouseRipple = false;
      }, 200);
    }

    function onMousedown (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      e.qSkipRipple = avoidMouseRipple === true;
      emit('mousedown', e);

      if (e.defaultPrevented !== true && mouseTarget !== rootRef.value) {
        mouseTarget !== null && cleanup();
        mouseTarget = rootRef.value;
        rootRef.value.classList.add('q-btn--active');
        document.addEventListener('mouseup', onPressEnd, passiveCapture);
      }
    }

    function onPressEnd (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      // needed for IE (because it emits blur when focusing button from focus helper)
      if (
        e?.type === 'blur'
        && document.activeElement === rootRef.value
      ) return

      if (e?.type === 'keyup') {
        if (keyboardTarget === rootRef.value && isKeyCode(e, [ 13, 32 ]) === true) {
          // for click trigger
          const evt = new MouseEvent('click', e);
          evt.qKeyEvent = true;
          e.defaultPrevented === true && prevent(evt);
          e.cancelBubble === true && stop(evt);
          rootRef.value.dispatchEvent(evt);

          stopAndPrevent(e);

          // for ripple
          e.qKeyEvent = true;
        }

        emit('keyup', e);
      }

      cleanup();
    }

    function cleanup (destroying) {
      const blurTarget = blurTargetRef.value;

      if (
        destroying !== true
        && (touchTarget === rootRef.value || mouseTarget === rootRef.value)
        && blurTarget !== null
        && blurTarget !== document.activeElement
      ) {
        blurTarget.setAttribute('tabindex', -1);
        blurTarget.focus();
      }

      if (touchTarget === rootRef.value) {
        if (localTouchTargetEl !== null) {
          localTouchTargetEl.removeEventListener('touchcancel', onPressEnd, passiveCapture);
          localTouchTargetEl.removeEventListener('touchend', onPressEnd, passiveCapture);
        }
        touchTarget = localTouchTargetEl = null;
      }

      if (mouseTarget === rootRef.value) {
        document.removeEventListener('mouseup', onPressEnd, passiveCapture);
        mouseTarget = null;
      }

      if (keyboardTarget === rootRef.value) {
        document.removeEventListener('keyup', onPressEnd, true);
        rootRef.value?.removeEventListener('blur', onPressEnd, passiveCapture);
        keyboardTarget = null;
      }

      rootRef.value?.classList.remove('q-btn--active');
    }

    function onLoadingEvt (evt) {
      stopAndPrevent(evt);
      evt.qSkipRipple = true;
    }

    onBeforeUnmount(() => {
      cleanup(true);
    });

    // expose public methods
    Object.assign(proxy, {
      click: e => {
        if (isActionable.value === true) {
          onClick(e);
        }
      }
    });

    return () => {
      let inner = [];

      props.icon !== void 0 && inner.push(
        h(__nuxt_component_1$1$1, {
          name: props.icon,
          left: props.stack !== true && hasLabel.value === true,
          role: 'img'
        })
      );

      hasLabel.value === true && inner.push(
        h('span', { class: 'block' }, [ props.label ])
      );

      inner = hMergeSlot(slots.default, inner);

      if (props.iconRight !== void 0 && props.round === false) {
        inner.push(
          h(__nuxt_component_1$1$1, {
            name: props.iconRight,
            right: props.stack !== true && hasLabel.value === true,
            role: 'img'
          })
        );
      }

      const child = [
        h('span', {
          class: 'q-focus-helper',
          ref: blurTargetRef
        })
      ];

      if (props.loading === true && props.percentage !== void 0) {
        child.push(
          h('span', {
            class: 'q-btn__progress absolute-full overflow-hidden' + (props.darkPercentage === true ? ' q-btn__progress--dark' : '')
          }, [
            h('span', {
              class: 'q-btn__progress-indicator fit block',
              style: percentageStyle.value
            })
          ])
        );
      }

      child.push(
        h('span', {
          class: 'q-btn__content text-center col items-center q-anchor--skip ' + innerClasses.value
        }, inner)
      );

      props.loading !== null && child.push(
        h(Transition, {
          name: 'q-transition--fade'
        }, () => (
          props.loading === true
            ? [
                h('span', {
                  key: 'loading',
                  class: 'absolute-full flex flex-center'
                }, slots.loading !== void 0 ? slots.loading() : [ h(QSpinner) ])
              ]
            : null
        ))
      );

      return withDirectives(
        h(
          linkTag.value,
          nodeProps.value,
          child
        ),
        [ [
          __q_directive_0,
          ripple.value,
          void 0,
          rippleProps.value
        ] ]
      )
    }
  }
});

const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};

function useDark (props, $q) {
  // return isDark
  return computed(() => (
    props.dark === null
      ? $q.dark.isActive
      : props.dark
  ))
}

const __nuxt_component_1$1 = createComponent({
  name: 'QCard',

  props: {
    ...useDarkProps,

    tag: {
      type: String,
      default: 'div'
    },

    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },

  setup (props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);

    const classes = computed(() =>
      'q-card'
      + (isDark.value === true ? ' q-card--dark q-dark' : '')
      + (props.bordered === true ? ' q-card--bordered' : '')
      + (props.square === true ? ' q-card--square no-border-radius' : '')
      + (props.flat === true ? ' q-card--flat no-shadow' : '')
    );

    return () => h(props.tag, { class: classes.value }, hSlot(slots.default))
  }
});

const __nuxt_component_2$1 = createComponent({
  name: 'QCardSection',

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    horizontal: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'q-card__section'
      + ` q-card__section--${ props.horizontal === true ? 'horiz row no-wrap' : 'vert' }`
    );

    return () => h(props.tag, { class: classes.value }, hSlot(slots.default))
  }
});

const __nuxt_component_9$1 = createComponent({
  name: 'QCardActions',

  props: {
    ...useAlignProps,
    vertical: Boolean
  },

  setup (props, { slots }) {
    const alignClass = useAlign(props);

    const classes = computed(() =>
      `q-card__actions ${ alignClass.value }`
      + ` q-card__actions--${ props.vertical === true ? 'vert column' : 'horiz row' }`
    );

    return () => h('div', { class: classes.value }, hSlot(slots.default))
  }
});

const insetMap = {
  true: 'inset',
  item: 'item-inset',
  'item-thumbnail': 'item-thumbnail-inset'
};

const margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
};

const __nuxt_component_5$2 = createComponent({
  name: 'QSeparator',

  props: {
    ...useDarkProps,

    spaced: [ Boolean, String ],
    inset: [ Boolean, String ],
    vertical: Boolean,
    color: String,
    size: String
  },

  setup (props) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);

    const orientation = computed(() => (
      props.vertical === true
        ? 'vertical'
        : 'horizontal'
    ));

    const orientClass = computed(() => ` q-separator--${ orientation.value }`);

    const insetClass = computed(() => (
      props.inset !== false
        ? `${ orientClass.value }-${ insetMap[ props.inset ] }`
        : ''
    ));

    const classes = computed(() =>
      `q-separator${ orientClass.value }${ insetClass.value }`
      + (props.color !== void 0 ? ` bg-${ props.color }` : '')
      + (isDark.value === true ? ' q-separator--dark' : '')
    );

    const style = computed(() => {
      const acc = {};

      if (props.size !== void 0) {
        acc[ props.vertical === true ? 'width' : 'height' ] = props.size;
      }

      if (props.spaced !== false) {
        const size = props.spaced === true
          ? `${ margins.md }px`
          : props.spaced in margins ? `${ margins[ props.spaced ] }px` : props.spaced;

        const dir = props.vertical === true
          ? [ 'Left', 'Right' ]
          : [ 'Top', 'Bottom' ];

        acc[ `margin${ dir[ 0 ] }` ] = acc[ `margin${ dir[ 1 ] }` ] = size;
      }

      return acc
    });

    return () => h('hr', {
      class: classes.value,
      style: style.value,
      'aria-orientation': orientation.value
    })
  }
});

/**
 * Based on the work of https://github.com/jchook/uuid-random
 */

let
  buf,
  bufIdx = 0;
const hexBytes = new Array(256);

// Pre-calculate toString(16) for speed
for (let i = 0; i < 256; i++) {
  hexBytes[ i ] = (i + 0x100).toString(16).substring(1);
}

// Use best available PRNG
const randomBytes = (() => {
  // Node & Browser support
  const lib = typeof crypto !== 'undefined'
    ? crypto
    : (
        void 0
      );

  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes
    }
    if (lib.getRandomValues !== void 0) {
      return n => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes
      }
    }
  }

  return n => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r
  }
})();

// Buffer random numbers for speed
// Reduce memory usage by decreasing this number (min 16)
// or improve speed by increasing this number (try 16384)
const BUFFER_SIZE = 4096;

function uid () {
  // Buffer some random bytes for speed
  if (buf === void 0 || (bufIdx + 16 > BUFFER_SIZE)) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }

  const b = Array.prototype.slice.call(buf, bufIdx, (bufIdx += 16));
  b[ 6 ] = (b[ 6 ] & 0x0f) | 0x40;
  b[ 8 ] = (b[ 8 ] & 0x3f) | 0x80;

  return hexBytes[ b[ 0 ] ] + hexBytes[ b[ 1 ] ]
    + hexBytes[ b[ 2 ] ] + hexBytes[ b[ 3 ] ] + '-'
    + hexBytes[ b[ 4 ] ] + hexBytes[ b[ 5 ] ] + '-'
    + hexBytes[ b[ 6 ] ] + hexBytes[ b[ 7 ] ] + '-'
    + hexBytes[ b[ 8 ] ] + hexBytes[ b[ 9 ] ] + '-'
    + hexBytes[ b[ 10 ] ] + hexBytes[ b[ 11 ] ]
    + hexBytes[ b[ 12 ] ] + hexBytes[ b[ 13 ] ]
    + hexBytes[ b[ 14 ] ] + hexBytes[ b[ 15 ] ]
}

function parseValue$1 (val) {
  return val === void 0 || val === null
    ? null
    : val
}

function getId (val, required) {
  return val === void 0 || val === null
    ? (required === true ? `f_${ uid() }` : null)
    : val
}

/**
 * Returns an "id" which is a ref() that can be used as
 * a unique identifier to apply to a DOM node attribute.
 *
 * On SSR, it takes care of generating the id on the client side (only) to
 * avoid hydration errors.
 */
function useId ({ getValue, required = true } = {}) {
  if (isRuntimeSsrPreHydration.value === true) {
    const id = getValue !== void 0
      ? ref(parseValue$1(getValue()))
      : ref(null);

    if (required === true && id.value === null) {
      onMounted(() => {
        id.value = `f_${ uid() }`; // getId(null, true)
      });
    }

    if (getValue !== void 0) {
      watch(getValue, newId => {
        id.value = getId(newId, required);
      });
    }

    return id
  }

  return getValue !== void 0
    ? computed(() => getId(getValue(), required))
    : ref(`f_${ uid() }`) // getId(null, true)
}

const listenerRE = /^on[A-Z]/;

function useSplitAttrs () {
  const { attrs, vnode } = getCurrentInstance();

  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };

  function update () {
    const attributes = {};
    const listeners = {};

    for (const key in attrs) {
      if (key !== 'class' && key !== 'style' && listenerRE.test(key) === false) {
        attributes[ key ] = attrs[ key ];
      }
    }

    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[ key ] = vnode.props[ key ];
      }
    }

    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }

  onBeforeUpdate(update);

  update();

  return acc
}

function useFormChild ({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);

  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();

    // export public method (so it can be used in QForm)
    Object.assign(proxy, { validate, resetValidation });

    watch(() => props.disable, val => {
      if (val === true) {
        typeof resetValidation === 'function' && resetValidation();
        $form.unbindComponent(proxy);
      }
      else {
        $form.bindComponent(proxy);
      }
    });

    onMounted(() => {
      // register to parent QForm
      props.disable !== true && $form.bindComponent(proxy);
    });

    onBeforeUnmount(() => {
      // un-register from parent QForm
      props.disable !== true && $form.unbindComponent(proxy);
    });
  }
  else if (requiresQForm === true) {
    console.error('Parent QForm not found on useFormChild()!');
  }
}

// file referenced from docs

const
  hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,
  hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,
  hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,
  rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;

// Keep in sync with ui/types/api/validation.d.ts
const testPattern = {
  date: v => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: v => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: v => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: v => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),

  // -- RFC 5322 --
  // -- Added in v2.6.6 --
  // This is a basic helper validation.
  // For something more complex (like RFC 822) you should write and use your own rule.
  // We won't be accepting PRs to enhance the one below because of the reason above.
  // eslint-disable-next-line
  email: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),

  hexColor: v => hex.test(v),
  hexaColor: v => hexa.test(v),
  hexOrHexaColor: v => hexOrHexa.test(v),

  rgbColor: v => rgb.test(v),
  rgbaColor: v => rgba.test(v),
  rgbOrRgbaColor: v => rgb.test(v) || rgba.test(v),

  hexOrRgbColor: v => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: v => hexa.test(v) || rgba.test(v),
  anyColor: v => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};

const lazyRulesValues = [ true, false, 'ondemand' ];

const useValidateProps = {
  modelValue: {},

  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,

  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [ Boolean, String ],
    default: false, // statement unneeded but avoids future vue implementation changes
    validator: v => lazyRulesValues.includes(v)
  }
};

function useValidate (focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();

  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(false);

  useFormChild({ validate, resetValidation });

  let validateIndex = 0, unwatchRules;

  const hasRules = computed(() =>
    props.rules !== void 0
    && props.rules !== null
    && props.rules.length !== 0
  );

  const canDebounceValidate = computed(() => (
    props.disable !== true
    && hasRules.value === true
    // Should not have a validation in progress already;
    // It might mean that focus switched to submit btn and
    // QForm's submit() has been called already (ENTER key)
    && innerLoading.value === false
  ));

  const hasError = computed(() =>
    props.error === true || innerError.value === true
  );

  const errorMessage = computed(() => (
    typeof props.errorMessage === 'string' && props.errorMessage.length !== 0
      ? props.errorMessage
      : innerErrorMessage.value
  ));

  watch(() => props.modelValue, () => {
    isDirtyModel.value = true;

    if (
      canDebounceValidate.value === true
      // trigger validation if not using any kind of lazy-rules
      && props.lazyRules === false
    ) {
      debouncedValidate();
    }
  });

  function onRulesChange () {
    if (
      props.lazyRules !== 'ondemand'
      && canDebounceValidate.value === true
      && isDirtyModel.value === true
    ) {
      debouncedValidate();
    }
  }

  watch(() => props.reactiveRules, val => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, onRulesChange, { immediate: true, deep: true });
      }
    }
    else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });

  watch(() => props.lazyRules, onRulesChange);

  watch(focused, val => {
    if (val === true) {
      isDirtyModel.value = true;
    }
    else if (
      canDebounceValidate.value === true
      && props.lazyRules !== 'ondemand'
    ) {
      debouncedValidate();
    }
  });

  function resetValidation () {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = false;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }

  /*
   * Return value
   *   - true (validation succeeded)
   *   - false (validation failed)
   *   - Promise (pending async validation)
   */
  function validate (val = props.modelValue) {
    if (
      props.disable === true
      || hasRules.value === false
    ) {
      return true
    }

    const index = ++validateIndex;

    const setDirty = innerLoading.value !== true
      ? () => { isDirtyModel.value = true; }
      : () => {};

    const update = (err, msg) => {
      err === true && setDirty();

      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };

    const promises = [];

    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[ i ];
      let res;

      if (typeof rule === 'function') {
        res = rule(val, testPattern);
      }
      else if (typeof rule === 'string' && testPattern[ rule ] !== void 0) {
        res = testPattern[ rule ](val);
      }

      if (res === false || typeof res === 'string') {
        update(true, res);
        return false
      }
      else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }

    if (promises.length === 0) {
      update(false);
      return true
    }

    innerLoading.value = true;

    return Promise.all(promises).then(
      res => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true
        }

        const msg = res.find(r => r === false || typeof r === 'string');
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0
      },
      e => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }

        return false
      }
    )
  }

  const debouncedValidate = debounce(validate, 0);

  onBeforeUnmount(() => {
    unwatchRules?.();
    debouncedValidate.cancel();
  });

  // expose public methods & props
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, 'hasError', () => hasError.value);

  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,

    validate,
    resetValidation
  }
}

function fieldValueIsFilled (val) {
  return val !== void 0
    && val !== null
    && ('' + val).length !== 0
}

const useNonInputFieldProps = {
  ...useDarkProps,
  ...useValidateProps,

  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,

  labelColor: String,
  color: String,
  bgColor: String,

  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [ Boolean, String ],

  square: Boolean,

  loading: Boolean,

  labelSlot: Boolean,

  bottomSlots: Boolean,
  hideBottomSpace: Boolean,

  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,

  counter: Boolean,

  clearable: Boolean,
  clearIcon: String,

  disable: Boolean,
  readonly: Boolean,

  autofocus: Boolean,

  for: String
};

const useFieldProps = {
  ...useNonInputFieldProps,
  maxlength: [ Number, String ]
};

const useFieldEmits = [ 'update:modelValue', 'clear', 'focus', 'blur' ];

function useFieldState ({ requiredForAttr = true, tagProp, changeEvent = false } = {}) {
  const { props, proxy } = getCurrentInstance();

  const isDark = useDark(props, proxy.$q);
  const targetUid = useId({
    required: requiredForAttr,
    getValue: () => props.for
  });

  return {
    requiredForAttr,
    changeEvent,
    tag: tagProp === true
      ? computed(() => props.tag)
      : { value: 'label' },

    isDark,

    editable: computed(() =>
      props.disable !== true && props.readonly !== true
    ),

    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,

    splitAttrs: useSplitAttrs(),
    targetUid,

    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)

    /**
     * user supplied additionals:

     * innerValue - computed
     * floatingLabel - computed
     * inputRef - computed

     * fieldClass - computed
     * hasShadow - computed

     * controlEvents - Object with fn(e)

     * getControl - fn
     * getInnerAppend - fn
     * getControlChild - fn
     * getShadowControl - fn
     * showPopup - fn
     */
  }
}

function useField (state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;

  let focusoutTimer = null;

  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }

  if (state.emitValue === void 0) {
    state.emitValue = value => {
      emit('update:modelValue', value);
    };
  }

  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }

  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });

  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === 'string' || typeof props.modelValue === 'number'
          ? ('' + props.modelValue).length
          : (Array.isArray(props.modelValue) === true ? props.modelValue.length : 0);

        const max = props.maxlength !== void 0
          ? props.maxlength
          : props.maxValues;

        return len + (max !== void 0 ? ' / ' + max : '')
      }
    });
  }

  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);

  const floatingLabel = state.floatingLabel !== void 0
    ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true)
    : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);

  const shouldRenderBottom = computed(() =>
    props.bottomSlots === true
    || props.hint !== void 0
    || hasRules.value === true
    || props.counter === true
    || props.error !== null
  );

  const styleType = computed(() => {
    if (props.filled === true) { return 'filled' }
    if (props.outlined === true) { return 'outlined' }
    if (props.borderless === true) { return 'borderless' }
    if (props.standout) { return 'standout' }
    return 'standard'
  });

  const classes = computed(() =>
    `q-field row no-wrap items-start q-field--${ styleType.value }`
    + (state.fieldClass !== void 0 ? ` ${ state.fieldClass.value }` : '')
    + (props.rounded === true ? ' q-field--rounded' : '')
    + (props.square === true ? ' q-field--square' : '')
    + (floatingLabel.value === true ? ' q-field--float' : '')
    + (hasLabel.value === true ? ' q-field--labeled' : '')
    + (props.dense === true ? ' q-field--dense' : '')
    + (props.itemAligned === true ? ' q-field--item-aligned q-item-type' : '')
    + (state.isDark.value === true ? ' q-field--dark' : '')
    + (state.getControl === void 0 ? ' q-field--auto-height' : '')
    + (state.focused.value === true ? ' q-field--focused' : '')
    + (hasError.value === true ? ' q-field--error' : '')
    + (hasError.value === true || state.focused.value === true ? ' q-field--highlighted' : '')
    + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? ' q-field--with-bottom' : '')
    + (props.disable === true ? ' q-field--disabled' : (props.readonly === true ? ' q-field--readonly' : ''))
  );

  const contentClass = computed(() =>
    'q-field__control relative-position row no-wrap'
    + (props.bgColor !== void 0 ? ` bg-${ props.bgColor }` : '')
    + (
      hasError.value === true
        ? ' text-negative'
        : (
            typeof props.standout === 'string' && props.standout.length !== 0 && state.focused.value === true
              ? ` ${ props.standout }`
              : (props.color !== void 0 ? ` text-${ props.color }` : '')
          )
    )
  );

  const hasLabel = computed(() =>
    props.labelSlot === true || props.label !== void 0
  );

  const labelClass = computed(() =>
    'q-field__label no-pointer-events absolute ellipsis'
    + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${ props.labelColor }` : '')
  );

  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));

  const attributes = computed(() => {
    const acc = {};

    if (state.targetUid.value) {
      acc.for = state.targetUid.value;
    }

    if (props.disable === true) {
      acc[ 'aria-disabled' ] = 'true';
    }

    return acc
  });

  function focusHandler () {
    const el = document.activeElement;
    let target = state.targetRef?.value;

    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute('tabindex') === true || (target = target.querySelector('[tabindex]'));
      if (target !== el) {
        target?.focus({ preventScroll: true });
      }
    }
  }

  function focus () {
    addFocusFn(focusHandler);
  }

  function blur () {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }

  function onControlFocusin (e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }

    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit('focus', e);
    }
  }

  function onControlFocusout (e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;

      if (
        document.hasFocus() === true && (
          state.hasPopupOpen === true
          || state.controlRef === void 0
          || state.controlRef.value === null
          || state.controlRef.value.contains(document.activeElement) !== false
        )
      ) return

      if (state.focused.value === true) {
        state.focused.value = false;
        emit('blur', e);
      }

      then?.();
    });
  }

  function clearValue (e) {
    // prevent activating the field but keep focus on desktop
    stopAndPrevent(e);

    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef?.value || state.rootRef.value;
      el.focus();
    }
    else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }

    if (props.type === 'file') {
      // do not let focus be triggered
      // as it will make the native file dialog
      // appear for another selection
      state.inputRef.value.value = null;
    }

    emit('update:modelValue', null);
    state.changeEvent === true && emit('change', null);
    emit('clear', props.modelValue);

    nextTick(() => {
      const isDirty = isDirtyModel.value;
      resetValidation();
      isDirtyModel.value = isDirty;
    });
  }

  function onClearableKeyup (evt) {
    [ 13, 32 ].includes(evt.keyCode) && clearValue(evt);
  }

  function getContent () {
    const node = [];

    slots.prepend !== void 0 && node.push(
      h('div', {
        class: 'q-field__prepend q-field__marginal row no-wrap items-center',
        key: 'prepend',
        onClick: prevent
      }, slots.prepend())
    );

    node.push(
      h('div', {
        class: 'q-field__control-container col relative-position row no-wrap q-anchor--skip'
      }, getControlContainer())
    );

    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode('error', [
        h(__nuxt_component_1$1$1, { name: $q.iconSet.field.error, color: 'negative' })
      ])
    );

    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          'inner-loading-append',
          slots.loading !== void 0
            ? slots.loading()
            : [ h(QSpinner, { color: props.color }) ]
        )
      );
    }
    else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode('inner-clearable-append', [
          h(__nuxt_component_1$1$1, {
            class: 'q-field__focusable-action',
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            role: 'button',
            'aria-hidden': 'false',
            'aria-label': $q.lang.label.clear,
            onKeyup: onClearableKeyup,
            onClick: clearValue
          })
        ])
      );
    }

    slots.append !== void 0 && node.push(
      h('div', {
        class: 'q-field__append q-field__marginal row no-wrap items-center',
        key: 'append',
        onClick: prevent
      }, slots.append())
    );

    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode('inner-append', state.getInnerAppend())
    );

    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );

    return node
  }

  function getControlContainer () {
    const node = [];

    props.prefix !== void 0 && props.prefix !== null && node.push(
      h('div', {
        class: 'q-field__prefix no-pointer-events row items-center'
      }, props.prefix)
    );

    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }

    if (state.getControl !== void 0) {
      node.push(state.getControl());
    }
    // internal usage only:
    else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    }
    else if (slots.control !== void 0) {
      node.push(
        h('div', {
          ref: state.targetRef,
          class: 'q-field__native row',
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          'data-autofocus': props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }

    hasLabel.value === true && node.push(
      h('div', {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );

    props.suffix !== void 0 && props.suffix !== null && node.push(
      h('div', {
        class: 'q-field__suffix no-pointer-events row items-center'
      }, props.suffix)
    );

    return node.concat(hSlot(slots.default))
  }

  function getBottom () {
    let msg, key;

    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [ h('div', { role: 'alert' }, errorMessage.value) ];
        key = `q--slot-error-${ errorMessage.value }`;
      }
      else {
        msg = hSlot(slots.error);
        key = 'q--slot-error';
      }
    }
    else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [ h('div', props.hint) ];
        key = `q--slot-hint-${ props.hint }`;
      }
      else {
        msg = hSlot(slots.hint);
        key = 'q--slot-hint';
      }
    }

    const hasCounter = props.counter === true || slots.counter !== void 0;

    if (
      props.hideBottomSpace === true
      && hasCounter === false
      && msg === void 0
    ) return

    const main = h('div', {
      key,
      class: 'q-field__messages col'
    }, msg);

    return h('div', {
      class: 'q-field__bottom row items-start q-field__bottom--'
        + (props.hideBottomSpace !== true ? 'animated' : 'stale'),
      onClick: prevent
    }, [
      props.hideBottomSpace === true
        ? main
        : h(Transition, { name: 'q-transition--field-message' }, () => main),

      hasCounter === true
        ? h('div', {
          class: 'q-field__counter'
        }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value)
        : null
    ])
  }

  function getInnerAppendNode (key, content) {
    return content === null
      ? null
      : h('div', {
        key,
        class: 'q-field__append q-field__marginal row no-wrap items-center q-anchor--skip'
      }, content)
  }

  let shouldActivate = false;

  onDeactivated(() => {
    shouldActivate = true;
  });

  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });

  props.autofocus === true && onMounted(() => {
    proxy.focus();
  });

  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });

  // expose public methods
  Object.assign(proxy, { focus, blur });

  return function renderField () {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0
      ? {
          ...state.splitAttrs.attributes.value,
          'data-autofocus': props.autofocus === true || void 0,
          ...attributes.value
        }
      : attributes.value;

    return h(state.tag.value, {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0
        ? h('div', {
          class: 'q-field__before q-field__marginal row no-wrap items-center',
          onClick: prevent
        }, slots.before())
        : null,

      h('div', {
        class: 'q-field__inner relative-position col self-stretch'
      }, [
        h('div', {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),

        shouldRenderBottom.value === true
          ? getBottom()
          : null
      ]),

      slots.after !== void 0
        ? h('div', {
          class: 'q-field__after q-field__marginal row no-wrap items-center',
          onClick: prevent
        }, slots.after())
        : null
    ])
  }
}

// leave NAMED_MASKS at top of file (code referenced from docs)
const NAMED_MASKS = {
  date: '####/##/##',
  datetime: '####/##/## ##:##',
  time: '##:##',
  fulltime: '##:##:##',
  phone: '(###) ### - ####',
  card: '#### #### #### ####'
};

const TOKENS = {
  '#': { pattern: '[\\d]', negate: '[^\\d]' },

  S: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]' },
  N: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]' },

  A: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]', transform: v => v.toLocaleUpperCase() },
  a: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]', transform: v => v.toLocaleLowerCase() },

  X: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]', transform: v => v.toLocaleUpperCase() },
  x: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]', transform: v => v.toLocaleLowerCase() }
};

const KEYS = Object.keys(TOKENS);
KEYS.forEach(key => {
  TOKENS[ key ].regex = new RegExp(TOKENS[ key ].pattern);
});

const
  tokenRegexMask = new RegExp('\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([' + KEYS.join('') + '])|(.)', 'g'),
  escRegex = /[.*+?^${}()|[\]\\]/g;

const MARKER = String.fromCharCode(1);

const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [ Boolean, String ],
  unmaskedValue: Boolean
};

function useMask (props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;

  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());

  function getIsTypeText () {
    return props.autogrow === true
      || [ 'textarea', 'text', 'search', 'url', 'tel', 'password' ].includes(props.type)
  }

  watch(() => props.type + props.autogrow, updateMaskInternals);

  watch(() => props.mask, v => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    }
    else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit('update:modelValue', val);
    }
  });

  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });

  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });

  function getInitialMaskedValue () {
    updateMaskInternals();

    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));

      return props.fillMask !== false
        ? fillWithMask(masked)
        : masked
    }

    return props.modelValue
  }

  function getPaddedMaskMarked (size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size)
    }

    let pad = '', localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);

    if (padPos !== -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }

      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }

    return localMaskMarked
  }

  function updateMaskInternals () {
    hasMask.value = props.mask !== void 0
      && props.mask.length !== 0
      && getIsTypeText();

    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = '';
      maskReplaced = '';
      return
    }

    const
      localComputedMask = NAMED_MASKS[ props.mask ] === void 0
        ? props.mask
        : NAMED_MASKS[ props.mask ],
      fillChar = typeof props.fillMask === 'string' && props.fillMask.length !== 0
        ? props.fillMask.slice(0, 1)
        : '_',
      fillCharEscaped = fillChar.replace(escRegex, '\\$&'),
      unmask = [],
      extract = [],
      mask = [];

    let
      firstMatch = props.reverseFillMask === true,
      unmaskChar = '',
      negateChar = '';

    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[ token ];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push('(?:' + negateChar + '+)?(' + c.pattern + '+)?(?:' + negateChar + '+)?(' + c.pattern + '+)?');
          firstMatch = false;
        }
        extract.push('(?:' + negateChar + '+)?(' + c.pattern + ')?');
      }
      else if (esc !== void 0) {
        unmaskChar = '\\' + (esc === '\\' ? '' : esc);
        mask.push(esc);
        unmask.push('([^' + unmaskChar + ']+)?' + unmaskChar + '?');
      }
      else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === '\\' ? '\\\\\\\\' : c.replace(escRegex, '\\\\$&');
        mask.push(c);
        unmask.push('([^' + unmaskChar + ']+)?' + unmaskChar + '?');
      }
    });

    const
      unmaskMatcher = new RegExp(
        '^'
        + unmask.join('')
        + '(' + (unmaskChar === '' ? '.' : '[^' + unmaskChar + ']') + '+)?'
        + (unmaskChar === '' ? '' : '[' + unmaskChar + ']*') + '$'
      ),
      extractLast = extract.length - 1,
      extractMatcher = extract.map((re, index) => {
        if (index === 0 && props.reverseFillMask === true) {
          return new RegExp('^' + fillCharEscaped + '*' + re)
        }
        else if (index === extractLast) {
          return new RegExp(
            '^' + re
            + '(' + (negateChar === '' ? '.' : negateChar) + '+)?'
            + (props.reverseFillMask === true ? '$' : fillCharEscaped + '*')
          )
        }

        return new RegExp('^' + re)
      });

    computedMask = mask;
    computedUnmask = val => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join('');
      }

      const
        extractMatch = [],
        extractMatcherLength = extractMatcher.length;

      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[ i ].exec(str);

        if (m === null) {
          break
        }

        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length !== 0) {
        return extractMatch.join('')
      }

      return val
    };
    maskMarked = mask.map(v => (typeof v === 'string' ? v : MARKER)).join('');
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }

  function updateMaskValue (rawVal, updateMaskInternalsFlag, inputType) {
    const
      inp = inputRef.value,
      end = inp.selectionEnd,
      endReverse = inp.value.length - end,
      unmasked = unmaskValue(rawVal);

    // Update here so unmask uses the original fillChar
    updateMaskInternalsFlag === true && updateMaskInternals();

    const
      preMasked = maskValue(unmasked),
      masked = props.fillMask !== false
        ? fillWithMask(preMasked)
        : preMasked,
      changed = innerValue.value !== masked;

    // We want to avoid "flickering" so we set value immediately
    inp.value !== masked && (inp.value = masked);

    changed === true && (innerValue.value = masked);

    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, 'forward');
        return
      }

      if (inputType === 'insertFromPaste' && props.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        // each non-marker char means we move once to right
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[ i ] !== MARKER) {
            cursor++;
          }
        }

        moveCursor.right(inp, cursor);
        return
      }

      if ([ 'deleteContentBackward', 'deleteContentForward' ].indexOf(inputType) !== -1) {
        const cursor = props.reverseFillMask === true
          ? (
              end === 0
                ? (masked.length > preMasked.length ? 1 : 0)
                : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1
            )
          : end;

        inp.setSelectionRange(cursor, cursor, 'forward');
        return
      }

      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));

          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, 'forward');
          }
          else {
            moveCursor.rightReverse(inp, cursor);
          }
        }
        else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, 'backward');
        }
      }
      else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        }
        else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });

    const val = props.unmaskedValue === true
      ? unmaskValue(masked)
      : masked;

    if (
      String(props.modelValue) !== val
      && (props.modelValue !== null || val !== '')
    ) {
      emitValue(val, true);
    }
  }

  function moveCursorForPaste (inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));

    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    pastedTextStart = start;

    inp.setSelectionRange(start, end, 'forward');
  }

  const moveCursor = {
    left (inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);

      for (; i >= 0; i--) {
        if (maskMarked[ i ] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break
        }
      }

      if (
        i < 0
        && maskMarked[ cursor ] !== void 0
        && maskMarked[ cursor ] !== MARKER
      ) {
        return moveCursor.right(inp, 0)
      }

      cursor >= 0 && inp.setSelectionRange(cursor, cursor, 'backward');
    },

    right (inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);

      for (; i <= limit; i++) {
        if (maskMarked[ i ] === MARKER) {
          cursor = i;
          break
        }
        else if (maskMarked[ i - 1 ] === MARKER) {
          cursor = i;
        }
      }

      if (
        i > limit
        && maskMarked[ cursor - 1 ] !== void 0
        && maskMarked[ cursor - 1 ] !== MARKER
      ) {
        return moveCursor.left(inp, limit)
      }

      inp.setSelectionRange(cursor, cursor, 'forward');
    },

    leftReverse (inp, cursor) {
      const
        localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);

      for (; i >= 0; i--) {
        if (localMaskMarked[ i - 1 ] === MARKER) {
          cursor = i;
          break
        }
        else if (localMaskMarked[ i ] === MARKER) {
          cursor = i;
          if (i === 0) {
            break
          }
        }
      }

      if (
        i < 0
        && localMaskMarked[ cursor ] !== void 0
        && localMaskMarked[ cursor ] !== MARKER
      ) {
        return moveCursor.rightReverse(inp, 0)
      }

      cursor >= 0 && inp.setSelectionRange(cursor, cursor, 'backward');
    },

    rightReverse (inp, cursor) {
      const
        limit = inp.value.length,
        localMaskMarked = getPaddedMaskMarked(limit),
        noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);

      for (; i <= limit; i++) {
        if (localMaskMarked[ i - 1 ] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break
        }
      }

      if (
        i > limit
        && localMaskMarked[ cursor - 1 ] !== void 0
        && localMaskMarked[ cursor - 1 ] !== MARKER
      ) {
        return moveCursor.leftReverse(inp, limit)
      }

      inp.setSelectionRange(cursor, cursor, 'forward');
    }
  };

  function onMaskedClick (e) {
    emit('click', e);

    selectionAnchor = void 0;
  }

  function onMaskedKeydown (e) {
    emit('keydown', e);

    if (
      shouldIgnoreKey(e) === true
      || e.altKey === true // let browser handle these
    ) return

    const
      inp = inputRef.value,
      start = inp.selectionStart,
      end = inp.selectionEnd;

    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }

    if (e.keyCode === 37 || e.keyCode === 39) { // Left / Right
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === 'forward' ? start : end;
      }

      const fn = moveCursor[ (e.keyCode === 39 ? 'right' : 'left') + (props.reverseFillMask === true ? 'Reverse' : '') ];

      e.preventDefault();
      fn(inp, selectionAnchor === start ? end : start);

      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), 'forward');
      }
    }
    else if (
      e.keyCode === 8 // Backspace
      && props.reverseFillMask !== true
      && start === end
    ) {
      moveCursor.left(inp, start);
      inp.setSelectionRange(inp.selectionStart, end, 'backward');
    }
    else if (
      e.keyCode === 46 // Delete
      && props.reverseFillMask === true
      && start === end
    ) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start, inp.selectionEnd, 'forward');
    }
  }

  function maskValue (val) {
    if (val === void 0 || val === null || val === '') { return '' }

    if (props.reverseFillMask === true) {
      return maskValueReverse(val)
    }

    const mask = computedMask;

    let valIndex = 0, output = '';

    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const
        valChar = val[ valIndex ],
        maskDef = mask[ maskIndex ];

      if (typeof maskDef === 'string') {
        output += maskDef;
        valChar === maskDef && valIndex++;
      }
      else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0
          ? maskDef.transform(valChar)
          : valChar;
        valIndex++;
      }
      else {
        return output
      }
    }

    return output
  }

  function maskValueReverse (val) {
    const
      mask = computedMask,
      firstTokenIndex = maskMarked.indexOf(MARKER);

    let valIndex = val.length - 1, output = '';

    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex !== -1; maskIndex--) {
      const maskDef = mask[ maskIndex ];

      let valChar = val[ valIndex ];

      if (typeof maskDef === 'string') {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      }
      else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[ valIndex ];
        // eslint-disable-next-line no-unmodified-loop-condition
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar))
      }
      else {
        return output
      }
    }

    return output
  }

  function unmaskValue (val) {
    return typeof val !== 'string' || computedUnmask === void 0
      ? (typeof val === 'number' ? computedUnmask('' + val) : val)
      : computedUnmask(val)
  }

  function fillWithMask (val) {
    if (maskReplaced.length - val.length <= 0) {
      return val
    }

    return props.reverseFillMask === true && val.length !== 0
      ? maskReplaced.slice(0, -val.length) + val
      : val + maskReplaced.slice(val.length)
  }

  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  }
}

const useFormProps = {
  name: String
};

function useFormAttrs (props) {
  return computed(() => ({
    type: 'hidden',
    name: props.name,
    value: props.modelValue
  }))
}

function useFormInject (formAttrs = {}) {
  return (child, action, className) => {
    child[ action ](
      h('input', {
        class: 'hidden' + (className || ''),
        ...formAttrs.value
      })
    );
  }
}

function useFormInputNameAttr (props) {
  return computed(() => props.name || props.for)
}

function useFileFormDomProps (props, typeGuard) {
  function getFormDomProps () {
    const model = props.modelValue;

    try {
      const dt = 'DataTransfer' in window
        ? new DataTransfer()
        : ('ClipboardEvent' in window
            ? new ClipboardEvent('').clipboardData
            : void 0
          );

      if (Object(model) === model) {
        ('length' in model
          ? Array.from(model)
          : [ model ]
        ).forEach(file => {
          dt.items.add(file);
        });
      }

      return {
        files: dt.files
      }
    }
    catch (e) {
      return {
        files: void 0
      }
    }
  }

  return computed(() => {
      if (props.type !== 'file') return
      return getFormDomProps()
    })
    
}

const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;

function useKeyComposition (onInput) {
  return function onComposition (e) {
    if (e.type === 'compositionend' || e.type === 'change') {
      if (e.target.qComposing !== true) return
      e.target.qComposing = false;
      onInput(e);
    }
    else if (
      e.type === 'compositionupdate'
      && e.target.qComposing !== true
      && typeof e.data === 'string'
    ) {
      const isComposing = client.is.firefox === true
        ? isPlainText.test(e.data) === false
        : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;

      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  }
}

const __nuxt_component_4$1 = createComponent({
  name: 'QInput',

  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,

    // override of useFieldProps > modelValue
    modelValue: {} // SSR does not know about FileList
      ,

    shadowText: String,

    type: {
      type: String,
      default: 'text'
    },

    debounce: [ String, Number ],

    autogrow: Boolean, // makes a textarea

    inputClass: [ Array, String, Object ],
    inputStyle: [ Array, String, Object ]
  },

  emits: [
    ...useFieldEmits,
    'paste', 'change',
    'keydown', 'click', 'animationend'
  ],

  setup (props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;

    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;

    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);

    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props, emit, emitValue, inputRef);

    const formDomProps = useFileFormDomProps(props);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));

    const onComposition = useKeyComposition(onInput);

    const state = useFieldState({ changeEvent: true });

    const isTextarea = computed(() =>
      props.type === 'textarea' || props.autogrow === true
    );

    const isTypeText = computed(() =>
      isTextarea.value === true
      || [ 'text', 'search', 'url', 'tel', 'password' ].includes(props.type)
    );

    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };

      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;

      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        // reset selection anchor on pointer selection
        evt.onClick = onMaskedClick;
      }

      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }

      return evt
    });

    const inputAttrs = computed(() => {
      const attrs = {
        tabindex: 0,
        'data-autofocus': props.autofocus === true || void 0,
        rows: props.type === 'textarea' ? 6 : void 0,
        'aria-label': props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };

      if (isTextarea.value === false) {
        attrs.type = props.type;
      }

      if (props.autogrow === true) {
        attrs.rows = 1;
      }

      return attrs
    });

    // some browsers lose the native input value
    // so we need to reattach it dynamically
    // (like type="password" <-> type="text"; see #12078)
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });

    watch(() => props.modelValue, v => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) return
        }

        updateMaskValue(v);
      }
      else if (innerValue.value !== v) {
        innerValue.value = v;

        if (
          props.type === 'number'
          && temp.hasOwnProperty('value') === true
        ) {
          if (typedNumber === true) {
            typedNumber = false;
          }
          else {
            delete temp.value;
          }
        }
      }

      // textarea only
      props.autogrow === true && nextTick(adjustHeight);
    });

    watch(() => props.autogrow, val => {
      // textarea only
      if (val === true) {
        nextTick(adjustHeight);
      }
      // if it has a number of rows set respect it
      else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = 'auto';
      }
    });

    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });

    function focus () {
      addFocusFn(() => {
        const el = document.activeElement;
        if (
          inputRef.value !== null
          && inputRef.value !== el
          && (el === null || el.id !== state.targetUid.value)
        ) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }

    function select () {
      inputRef.value?.select();
    }

    function onPaste (e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }

      emit('paste', e);
    }

    function onInput (e) {
      if (!e || !e.target) return

      if (props.type === 'file') {
        emit('update:modelValue', e.target.files);
        return
      }

      const val = e.target.value;

      if (e.target.qComposing === true) {
        temp.value = val;
        return
      }

      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      }
      else {
        emitValue(val);

        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;

          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }

      // we need to trigger it immediately too,
      // to avoid "flickering"
      props.autogrow === true && adjustHeight();
    }

    function onAnimationend (e) {
      emit('animationend', e);
      adjustHeight();
    }

    function emitValue (val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;

        if (
          props.type !== 'number'
          && temp.hasOwnProperty('value') === true
        ) {
          delete temp.value;
        }

        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;

          stopWatcher === true && (stopValueWatcher = true);
          emit('update:modelValue', val);

          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }

        emitValueFn = void 0;
      };

      if (props.type === 'number') {
        typedNumber = true;
        temp.value = val;
      }

      if (props.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      }
      else {
        emitValueFn();
      }
    }

    // textarea only
    function adjustHeight () {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          // chrome does not keep scroll #15498
          const { scrollTop } = inp;
          // chrome calculates a smaller scrollHeight when in a .column container
          const { overflowY, maxHeight } = $q.platform.is.firefox === true
            ? {}
            : window.getComputedStyle(inp);
          // on firefox or if overflowY is specified as scroll #14263, #14344
          // we don't touch overflow
          // firefox is not so bad in the end
          const changeOverflow = overflowY !== void 0 && overflowY !== 'scroll';

          // reset height of textarea to a small size to detect the real height
          // but keep the total control size the same
          changeOverflow === true && (inp.style.overflowY = 'hidden');
          parentStyle.marginBottom = (inp.scrollHeight - 1) + 'px';
          inp.style.height = '1px';

          inp.style.height = inp.scrollHeight + 'px';
          // we should allow scrollbars only
          // if there is maxHeight and content is taller than maxHeight
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? 'auto' : 'hidden');
          parentStyle.marginBottom = '';
          inp.scrollTop = scrollTop;
        }
      });
    }

    function onChange (e) {
      onComposition(e);

      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }

      emitValueFn?.();

      emit('change', e.target.value);
    }

    function onFinishEditing (e) {
      e !== void 0 && stop(e);

      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }

      emitValueFn?.();

      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;

      // we need to use setTimeout instead of this.$nextTick
      // to avoid a bug where focusout is not emitted for type date/time/week/...
      props.type !== 'file' && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : '';
        }
      });
    }

    function getCurValue () {
      return temp.hasOwnProperty('value') === true
        ? temp.value
        : (innerValue.value !== void 0 ? innerValue.value : '')
    }

    onBeforeUnmount(() => {
      onFinishEditing();
    });

    onMounted(() => {
      // textarea only
      props.autogrow === true && adjustHeight();
    });

    Object.assign(state, {
      innerValue,

      fieldClass: computed(() =>
        `q-${ isTextarea.value === true ? 'textarea' : 'input' }`
        + (props.autogrow === true ? ' q-textarea--autogrow' : '')
      ),

      hasShadow: computed(() =>
        props.type !== 'file'
        && typeof props.shadowText === 'string'
        && props.shadowText.length !== 0
      ),

      inputRef,

      emitValue,

      hasValue,

      floatingLabel: computed(() =>
        (
          hasValue.value === true
          && (props.type !== 'number' || isNaN(innerValue.value) === false)
        )
        || fieldValueIsFilled(props.displayValue)
      ),

      getControl: () => {
        return h(isTextarea.value === true ? 'textarea' : 'input', {
          ref: inputRef,
          class: [
            'q-field__native q-placeholder',
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...(
            props.type !== 'file'
              ? { value: getCurValue() }
              : formDomProps.value
          )
        })
      },

      getShadowControl: () => {
        return h('div', {
          class: 'q-field__native q-field__shadow absolute-bottom no-pointer-events'
            + (isTextarea.value === true ? '' : ' text-no-wrap')
        }, [
          h('span', { class: 'invisible' }, getCurValue()),
          h('span', props.shadowText)
        ])
      }
    });

    const renderFn = useField(state);

    // expose public methods
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value // deprecated
    });

    injectProp(proxy, 'nativeEl', () => inputRef.value);

    return renderFn
  }
});

const ssrAPI = {
  onOk: () => ssrAPI,
  onCancel: () => ssrAPI,
  onDismiss: () => ssrAPI,
  hide: () => ssrAPI,
  update: () => ssrAPI
};

function globalDialog (DefaultComponent, supportsCustomComponent, parentApp) {
  return pluginProps => {
    { return ssrAPI }
  }
}

const Dialog = {
  install ({ $q, parentApp }) {
    $q.dialog = this.create = globalDialog();
  }
};

const __nuxt_component_6$1 = createComponent({
  name: 'QAvatar',

  props: {
    ...useSizeProps,

    fontSize: String,

    color: String,
    textColor: String,

    icon: String,
    square: Boolean,
    rounded: Boolean
  },

  setup (props, { slots }) {
    const sizeStyle = useSize(props);

    const classes = computed(() =>
      'q-avatar'
      + (props.color ? ` bg-${ props.color }` : '')
      + (props.textColor ? ` text-${ props.textColor } q-chip--colored` : '')
      + (
        props.square === true
          ? ' q-avatar--square'
          : (props.rounded === true ? ' rounded-borders' : '')
      )
    );

    const contentStyle = computed(() => (
      props.fontSize
        ? { fontSize: props.fontSize }
        : null
    ));

    return () => {
      const icon = props.icon !== void 0
        ? [ h(__nuxt_component_1$1$1, { name: props.icon }) ]
        : void 0;

      return h('div', {
        class: classes.value,
        style: sizeStyle.value
      }, [
        h('div', {
          class: 'q-avatar__content row flex-center overflow-hidden',
          style: contentStyle.value
        }, hMergeSlotSafely(slots.default, icon))
      ])
    }
  }
});

const Notify = {
  setDefaults (opts) {
  },

  registerType (typeName, typeOpts) {
  },

  install ({ $q, parentApp }) {
    $q.notify = this.create = noop$1
      ;

    $q.notify.setDefaults = this.setDefaults;
    $q.notify.registerType = this.registerType;

    if ($q.config.notify !== void 0) {
      this.setDefaults($q.config.notify);
    }
  }
};

const Quasar = {
  name: 'Quasar',
  version: '2.18.1',

  install: installQuasar,

  // TODO: remove in Qv3 (should only be used through the plugin)
  // We provide a deprecated fallback here
  lang: Plugin$2,

  // TODO: remove in Qv3 (should only be used through the plugin)
  // We provide a deprecated fallback here
  iconSet: Plugin$1
};

/**
 * Returns the $q instance.
 * Equivalent to `this.$q` inside templates.
 */
function useQuasar () {
  return inject(quasarKey)
}

const { passive } = listenOpts;
const axisValues = [ 'both', 'horizontal', 'vertical' ];

const QScrollObserver = createComponent({
  name: 'QScrollObserver',

  props: {
    axis: {
      type: String,
      validator: v => axisValues.includes(v),
      default: 'vertical'
    },

    debounce: [ String, Number ],

    scrollTarget: scrollTargetProp
  },

  emits: [ 'scroll' ],

  setup (props, { emit }) {
    const scroll = {
      position: {
        top: 0,
        left: 0
      },

      direction: 'down',
      directionChanged: false,

      delta: {
        top: 0,
        left: 0
      },

      inflectionPoint: {
        top: 0,
        left: 0
      }
    };

    let clearTimer = null, localScrollTarget, parentEl;

    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });

    function emitEvent () {
      clearTimer?.();

      const top = Math.max(0, getVerticalScrollPosition(localScrollTarget));
      const left = getHorizontalScrollPosition(localScrollTarget);

      const delta = {
        top: top - scroll.position.top,
        left: left - scroll.position.left
      };

      if (
        (props.axis === 'vertical' && delta.top === 0)
        || (props.axis === 'horizontal' && delta.left === 0)
      ) return

      const curDir = Math.abs(delta.top) >= Math.abs(delta.left)
        ? (delta.top < 0 ? 'up' : 'down')
        : (delta.left < 0 ? 'left' : 'right');

      scroll.position = { top, left };
      scroll.directionChanged = scroll.direction !== curDir;
      scroll.delta = delta;

      if (scroll.directionChanged === true) {
        scroll.direction = curDir;
        scroll.inflectionPoint = scroll.position;
      }

      emit('scroll', { ...scroll });
    }

    function configureScrollTarget () {
      localScrollTarget = getScrollTarget(parentEl, props.scrollTarget);
      localScrollTarget.addEventListener('scroll', trigger, passive);
      trigger(true);
    }

    function unconfigureScrollTarget () {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener('scroll', trigger, passive);
        localScrollTarget = void 0;
      }
    }

    function trigger (immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === '0') {
        emitEvent();
      }
      else if (clearTimer === null) {
        const [ timer, fn ] = props.debounce
          ? [ setTimeout(emitEvent, props.debounce), clearTimeout ]
          : [ requestAnimationFrame(emitEvent), cancelAnimationFrame ];

        clearTimer = () => {
          fn(timer);
          clearTimer = null;
        };
      }
    }

    const { proxy } = getCurrentInstance();

    watch(() => proxy.$q.lang.rtl, emitEvent);

    onMounted(() => {
      parentEl = proxy.$el.parentNode;
      configureScrollTarget();
    });

    onBeforeUnmount(() => {
      clearTimer?.();
      unconfigureScrollTarget();
    });

    // expose public methods
    Object.assign(proxy, {
      trigger,
      getPosition: () => scroll
    });

    return noop$1
  }
});

const QResizeObserver = createComponent({
  name: 'QResizeObserver',

  props: {
    debounce: {
      type: [ String, Number ],
      default: 100
    }
  },

  emits: [ 'resize' ],

  setup (props, { emit }) {
    { return noop$1 }
  }
});

const __nuxt_component_0 = createComponent({
  name: 'QLayout',

  props: {
    container: Boolean,
    view: {
      type: String,
      default: 'hhh lpr fff',
      validator: v => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },

    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const rootRef = ref(null);

    // page related
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: 'down', inflectionPoint: 0 });

    // container only prop
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());

    const classes = computed(() =>
      'q-layout q-layout--'
      + (props.container === true ? 'containerized' : 'standard')
    );

    const style = computed(() => (
      props.container === false
        ? { minHeight: $q.screen.height + 'px' }
        : null
    ));

    // used by container only
    const targetStyle = computed(() => (
      scrollbarWidth.value !== 0
        ? { [ $q.lang.rtl === true ? 'left' : 'right' ]: `${ scrollbarWidth.value }px` }
        : null
    ));

    const targetChildStyle = computed(() => (
      scrollbarWidth.value !== 0
        ? {
            [ $q.lang.rtl === true ? 'right' : 'left' ]: 0,
            [ $q.lang.rtl === true ? 'left' : 'right' ]: `-${ scrollbarWidth.value }px`,
            width: `calc(100% + ${ scrollbarWidth.value }px)`
          }
        : null
    ));

    function onPageScroll (data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };

        scroll.value = info;
        props.onScroll !== void 0 && emit('scroll', info);
      }
    }

    function onPageResize (data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;

      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit('scrollHeight', newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }

      if (resized === true && props.onResize !== void 0) {
        emit('resize', data);
      }
    }

    function onContainerResize ({ height }) {
      if (containerHeight.value !== height) {
        containerHeight.value = height;
        updateScrollbarWidth();
      }
    }

    function updateScrollbarWidth () {
      if (props.container === true) {
        const width = height.value > containerHeight.value
          ? getScrollbarWidth()
          : 0;

        if (scrollbarWidth.value !== width) {
          scrollbarWidth.value = width;
        }
      }
    }

    let animateTimer = null;

    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),

      rootRef,

      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),

      rows: computed(() => {
        const rows = props.view.toLowerCase().split(' ');
        return {
          top: rows[ 0 ].split(''),
          middle: rows[ 1 ].split(''),
          bottom: rows[ 2 ].split('')
        }
      }),

      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),

      scroll,

      animate () {
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
        }
        else {
          document.body.classList.add('q-body--layout-animate');
        }

        animateTimer = setTimeout(() => {
          animateTimer = null;
          document.body.classList.remove('q-body--layout-animate');
        }, 155);
      },

      update (part, prop, val) {
        $layout[ part ][ prop ] = val;
      }
    };

    provide(layoutKey, $layout);

    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);

      const layout = h('div', {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);

      if (props.container === true) {
        return h('div', {
          class: 'q-layout-container overflow-hidden',
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h('div', {
            class: 'absolute-full',
            style: targetStyle.value
          }, [
            h('div', {
              class: 'scroll',
              style: targetChildStyle.value
            }, [ layout ])
          ])
        ])
      }

      return layout
    }
  }
});

const __nuxt_component_1 = createComponent({
  name: 'QHeader',

  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    },
    bordered: Boolean,
    elevated: Boolean,

    heightHint: {
      type: [ String, Number ],
      default: 50
    }
  },

  emits: [ 'reveal', 'focusin' ],

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error('QHeader needs to be child of QLayout');
      return emptyRenderFn
    }

    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);

    const fixed = computed(() =>
      props.reveal === true
      || $layout.view.value.indexOf('H') !== -1
      || ($q.platform.is.ios && $layout.isContainer.value === true)
    );

    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0
      }
      const offset = size.value - $layout.scroll.value.position;
      return offset > 0 ? offset : 0
    });

    const hidden = computed(() => props.modelValue !== true
      || (fixed.value === true && revealed.value !== true)
    );

    const revealOnFocus = computed(() =>
      props.modelValue === true && hidden.value === true && props.reveal === true
    );

    const classes = computed(() =>
      'q-header q-layout__section--marginal '
      + (fixed.value === true ? 'fixed' : 'absolute') + '-top'
      + (props.bordered === true ? ' q-header--bordered' : '')
      + (hidden.value === true ? ' q-header--hidden' : '')
      + (props.modelValue !== true ? ' q-layout--prevent-focus' : '')
    );

    const style = computed(() => {
      const
        view = $layout.rows.value.top,
        css = {};

      if (view[ 0 ] === 'l' && $layout.left.space === true) {
        css[ $q.lang.rtl === true ? 'right' : 'left' ] = `${ $layout.left.size }px`;
      }
      if (view[ 2 ] === 'r' && $layout.right.space === true) {
        css[ $q.lang.rtl === true ? 'left' : 'right' ] = `${ $layout.right.size }px`;
      }

      return css
    });

    function updateLayout (prop, val) {
      $layout.update('header', prop, val);
    }

    function updateLocal (prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }

    function onResize ({ height }) {
      updateLocal(size, height);
      updateLayout('size', height);
    }

    function onFocusin (evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }

      emit('focusin', evt);
    }

    watch(() => props.modelValue, val => {
      updateLayout('space', val);
      updateLocal(revealed, true);
      $layout.animate();
    });

    watch(offset, val => {
      updateLayout('offset', val);
    });

    watch(() => props.reveal, val => {
      val === false && updateLocal(revealed, props.modelValue);
    });

    watch(revealed, val => {
      $layout.animate();
      emit('reveal', val);
    });

    watch($layout.scroll, scroll => {
      props.reveal === true && updateLocal(revealed,
        scroll.direction === 'up'
        || scroll.position <= props.revealOffset
        || scroll.position - scroll.inflectionPoint < 100
      );
    });

    const instance = {};

    $layout.instances.header = instance;
    props.modelValue === true && updateLayout('size', size.value);
    updateLayout('space', props.modelValue);
    updateLayout('offset', offset.value);

    onBeforeUnmount(() => {
      if ($layout.instances.header === instance) {
        $layout.instances.header = void 0;
        updateLayout('size', 0);
        updateLayout('offset', 0);
        updateLayout('space', false);
      }
    });

    return () => {
      const child = hUniqueSlot(slots.default, []);

      props.elevated === true && child.push(
        h('div', {
          class: 'q-layout__shadow absolute-full overflow-hidden no-pointer-events'
        })
      );

      child.push(
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      );

      return h('header', {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child)
    }
  }
});

const __nuxt_component_2 = createComponent({
  name: 'QToolbar',

  props: {
    inset: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'q-toolbar row no-wrap items-center'
      + (props.inset === true ? ' q-toolbar--inset' : '')
    );

    return () => h('div', { class: classes.value, role: 'toolbar' }, hSlot(slots.default))
  }
});

const __nuxt_component_4 = createComponent({
  name: 'QToolbarTitle',

  props: {
    shrink: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'q-toolbar__title ellipsis'
      + (props.shrink === true ? ' col-shrink' : '')
    );

    return () => h('div', { class: classes.value }, hSlot(slots.default))
  }
});

const alignValues$1 = [ 'top', 'middle', 'bottom' ];

const __nuxt_component_5$1 = createComponent({
  name: 'QBadge',

  props: {
    color: String,
    textColor: String,

    floating: Boolean,
    transparent: Boolean,
    multiLine: Boolean,
    outline: Boolean,
    rounded: Boolean,

    label: [ Number, String ],

    align: {
      type: String,
      validator: v => alignValues$1.includes(v)
    }
  },

  setup (props, { slots }) {
    const style = computed(() => {
      return props.align !== void 0
        ? { verticalAlign: props.align }
        : null
    });

    const classes = computed(() => {
      const text = props.outline === true
        ? props.color || props.textColor
        : props.textColor;

      return 'q-badge flex inline items-center no-wrap'
        + ` q-badge--${ props.multiLine === true ? 'multi' : 'single' }-line`
        + (props.outline === true
          ? ' q-badge--outline'
          : (props.color !== void 0 ? ` bg-${ props.color }` : '')
        )
        + (text !== void 0 ? ` text-${ text }` : '')
        + (props.floating === true ? ' q-badge--floating' : '')
        + (props.rounded === true ? ' q-badge--rounded' : '')
        + (props.transparent === true ? ' q-badge--transparent' : '')
    });

    return () => h('div', {
      class: classes.value,
      style: style.value,
      role: 'status',
      'aria-label': props.label
    }, hMergeSlot(slots.default, props.label !== void 0 ? [ props.label ] : []))
  }
});

const TouchPan = createDirective({ name: 'touch-pan', getSSRProps }
  
);

function between (v, min, max) {
  return max <= min
    ? min
    : Math.min(max, Math.max(min, v))
}

function normalizeToInterval (v, min, max) {
  if (max <= min) {
    return min
  }

  const size = (max - min + 1);

  let index = min + (v - min) % size;
  if (index < min) {
    index = size + index;
  }

  return index === 0 ? 0 : index // fix for (-a % a) => -0
}

function pad (v, length = 2, char = '0') {
  if (v === void 0 || v === null) {
    return v
  }

  const val = '' + v;
  return val.length >= length
    ? val
    : new Array(length - val.length + 1).join(char) + val
}

const duration = 150;

const __nuxt_component_8$1 = createComponent({
  name: 'QDrawer',

  inheritAttrs: false,

  props: {
    ...useModelToggleProps,
    ...useDarkProps,

    side: {
      type: String,
      default: 'left',
      validator: v => [ 'left', 'right' ].includes(v)
    },

    width: {
      type: Number,
      default: 300
    },

    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    noMiniAnimation: Boolean,

    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,

    behavior: {
      type: String,
      validator: v => [ 'default', 'desktop', 'mobile' ].includes(v),
      default: 'default'
    },

    bordered: Boolean,
    elevated: Boolean,

    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },

  emits: [
    ...useModelToggleEmits,
    'onLayout', 'miniState'
  ],

  setup (props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;

    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();

    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error('QDrawer needs to be child of QLayout');
      return emptyRenderFn
    }

    let lastDesktopState, timerMini = null, layoutTotalWidthWatcher;

    const belowBreakpoint = ref(
      props.behavior === 'mobile'
      || (props.behavior !== 'desktop' && $layout.totalWidth.value <= props.breakpoint)
    );

    const isMini = computed(() =>
      props.mini === true && belowBreakpoint.value !== true
    );

    const size = computed(() => (
      isMini.value === true
        ? props.miniWidth
        : props.width
    ));

    const showing = ref(
      props.showIfAbove === true && belowBreakpoint.value === false
        ? true
        : props.modelValue === true
    );

    const hideOnRouteChange = computed(() =>
      props.persistent !== true
      && (belowBreakpoint.value === true || onScreenOverlay.value === true)
    );

    function handleShow (evt, noEvent) {
      addToHistory();

      evt !== false && $layout.animate();
      applyPosition(0);

      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[ otherSide.value ];
        if (otherInstance?.belowBreakpoint === true) {
          otherInstance.hide(false);
        }

        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      }
      else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }

      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit('show', evt);
      }, duration);
    }

    function handleHide (evt, noEvent) {
      removeFromHistory();

      evt !== false && $layout.animate();

      applyBackdrop(0);
      applyPosition(stateDirection.value * size.value);

      cleanup();

      if (noEvent !== true) {
        registerTimeout(() => { emit('hide', evt); }, duration);
      }
      else {
        removeTimeout();
      }
    }

    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });

    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);

    const instance = {
      belowBreakpoint,
      hide
    };

    const rightSide = computed(() => props.side === 'right');

    const stateDirection = computed(() =>
      ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1)
    );

    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref( // starting with "hidden" for SSR
      size.value * stateDirection.value
    );

    const otherSide = computed(() => (rightSide.value === true ? 'left' : 'right'));
    const offset = computed(() => (
      showing.value === true && belowBreakpoint.value === false && props.overlay === false
        ? (props.miniToOverlay === true ? props.miniWidth : size.value)
        : 0
    ));

    const fixed = computed(() =>
      props.overlay === true
      || props.miniToOverlay === true
      || $layout.view.value.indexOf(rightSide.value ? 'R' : 'L') !== -1
      || ($q.platform.is.ios === true && $layout.isContainer.value === true)
    );

    const onLayout = computed(() =>
      props.overlay === false
      && showing.value === true
      && belowBreakpoint.value === false
    );

    const onScreenOverlay = computed(() =>
      props.overlay === true
      && showing.value === true
      && belowBreakpoint.value === false
    );

    const backdropClass = computed(() =>
      'fullscreen q-drawer__backdrop'
      + (showing.value === false && flagPanning.value === false ? ' hidden' : '')
    );

    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${ flagBackdropBg.value * 0.4 })`
    }));

    const headerSlot = computed(() => (
      rightSide.value === true
        ? $layout.rows.value.top[ 2 ] === 'r'
        : $layout.rows.value.top[ 0 ] === 'l'
    ));

    const footerSlot = computed(() => (
      rightSide.value === true
        ? $layout.rows.value.bottom[ 2 ] === 'r'
        : $layout.rows.value.bottom[ 0 ] === 'l'
    ));

    const aboveStyle = computed(() => {
      const css = {};

      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css.top = `${ $layout.header.offset }px`;
        }
        else if ($layout.header.space === true) {
          css.top = `${ $layout.header.size }px`;
        }
      }

      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css.bottom = `${ $layout.footer.offset }px`;
        }
        else if ($layout.footer.space === true) {
          css.bottom = `${ $layout.footer.size }px`;
        }
      }

      return css
    });

    const style = computed(() => {
      const style = {
        width: `${ size.value }px`,
        transform: `translateX(${ flagContentPosition.value }px)`
      };

      return belowBreakpoint.value === true
        ? style
        : Object.assign(style, aboveStyle.value)
    });

    const contentClass = computed(() =>
      'q-drawer__content fit '
      + ($layout.isContainer.value !== true ? 'scroll' : 'overflow-auto')
    );

    const classes = computed(() =>
      `q-drawer q-drawer--${ props.side }`
      + (flagMiniAnimate.value === true ? ' q-drawer--mini-animate' : '')
      + (props.bordered === true ? ' q-drawer--bordered' : '')
      + (isDark.value === true ? ' q-drawer--dark q-dark' : '')
      + (
        flagPanning.value === true
          ? ' no-transition'
          : (showing.value === true ? '' : ' q-layout--prevent-focus')
      )
      + (
        belowBreakpoint.value === true
          ? ' fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding'
          : ` q-drawer--${ isMini.value === true ? 'mini' : 'standard' }`
          + (fixed.value === true || onLayout.value !== true ? ' fixed' : '')
          + (props.overlay === true || props.miniToOverlay === true ? ' q-drawer--on-top' : '')
          + (headerSlot.value === true ? ' q-drawer--top-padding' : '')
      )
    );

    const openDirective = computed(() => {
      // if props.noSwipeOpen !== true
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;

      return [ [
        TouchPan,
        onOpenPan,
        void 0,
        {
          [ dir ]: true,
          mouse: true
        }
      ] ]
    });

    const contentCloseDirective = computed(() => {
      // if belowBreakpoint.value === true && props.noSwipeClose !== true
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;

      return [ [
        TouchPan,
        onClosePan,
        void 0,
        {
          [ dir ]: true,
          mouse: true
        }
      ] ]
    });

    const backdropCloseDirective = computed(() => {
      // if showing.value === true && props.noSwipeBackdrop !== true
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;

      return [ [
        TouchPan,
        onClosePan,
        void 0,
        {
          [ dir ]: true,
          mouse: true,
          mouseAllDir: true
        }
      ] ]
    });

    function updateBelowBreakpoint () {
      updateLocal(belowBreakpoint, (
        props.behavior === 'mobile'
        || (props.behavior !== 'desktop' && $layout.totalWidth.value <= props.breakpoint)
      ));
    }

    watch(belowBreakpoint, val => {
      if (val === true) { // from lg to xs
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      }
      else if (
        props.overlay === false
        && props.behavior !== 'mobile'
        && lastDesktopState !== false
      ) { // from xs to lg
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        }
        else {
          show(false);
        }
      }
    });

    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[ oldSide ] === instance) {
        $layout.instances[ oldSide ] = void 0;
        $layout[ oldSide ].space = false;
        $layout[ oldSide ].offset = 0;
      }

      $layout.instances[ newSide ] = instance;
      $layout[ newSide ].size = size.value;
      $layout[ newSide ].space = onLayout.value;
      $layout[ newSide ].offset = offset.value;
    });

    watch($layout.totalWidth, () => {
      if ($layout.isContainer.value === true || document.qScrollPrevented !== true) {
        updateBelowBreakpoint();
      }
    });

    watch(
      () => props.behavior + props.breakpoint,
      updateBelowBreakpoint
    );

    watch($layout.isContainer, val => {
      showing.value === true && preventBodyScroll(val !== true);
      val === true && updateBelowBreakpoint();
    });

    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });

    watch(offset, val => { updateLayout('offset', val); });

    watch(onLayout, val => {
      emit('onLayout', val);
      updateLayout('space', val);
    });

    watch(rightSide, () => { applyPosition(); });

    watch(size, val => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });

    watch(() => props.miniToOverlay, val => {
      updateSizeOnLayout(val, size.value);
    });

    watch(() => $q.lang.rtl, () => { applyPosition(); });

    watch(() => props.mini, () => {
      if (props.noMiniAnimation) return
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });

    watch(isMini, val => { emit('miniState', val); });

    function applyPosition (position) {
      if (position === void 0) {
        nextTick(() => {
          position = showing.value === true ? 0 : size.value;
          applyPosition(stateDirection.value * position);
        });
      }
      else {
        if (
          $layout.isContainer.value === true
          && rightSide.value === true
          && (belowBreakpoint.value === true || Math.abs(position) === size.value)
        ) {
          position += stateDirection.value * $layout.scrollbarWidth.value;
        }

        flagContentPosition.value = position;
      }
    }

    function applyBackdrop (x) {
      flagBackdropBg.value = x;
    }

    function setScrollable (v) {
      const action = v === true
        ? 'remove'
        : ($layout.isContainer.value !== true ? 'add' : '');

      action !== '' && document.body.classList[ action ]('q-body--drawer-toggle');
    }

    function animateMini () {
      timerMini !== null && clearTimeout(timerMini);

      if (vm.proxy && vm.proxy.$el) {
        // need to speed it up and apply it immediately,
        // even faster than Vue's nextTick!
        vm.proxy.$el.classList.add('q-drawer--mini-animate');
      }

      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        timerMini = null;
        flagMiniAnimate.value = false;
        vm?.proxy?.$el?.classList.remove('q-drawer--mini-animate');
      }, 150);
    }

    function onOpenPan (evt) {
      if (showing.value !== false) {
        // some browsers might capture and trigger this
        // even if Drawer has just been opened (but animation is still pending)
        return
      }

      const
        width = size.value,
        position = between(evt.distance.x, 0, width);

      if (evt.isFinal === true) {
        const opened = position >= Math.min(75, width);

        if (opened === true) {
          show();
        }
        else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }

        flagPanning.value = false;
        return
      }

      applyPosition(
        ($q.lang.rtl === true ? rightSide.value !== true : rightSide.value)
          ? Math.max(width - position, 0)
          : Math.min(0, position - width)
      );
      applyBackdrop(
        between(position / width, 0, 1)
      );

      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }

    function onClosePan (evt) {
      if (showing.value !== true) {
        // some browsers might capture and trigger this
        // even if Drawer has just been closed (but animation is still pending)
        return
      }

      const
        width = size.value,
        dir = evt.direction === props.side,
        position = ($q.lang.rtl === true ? dir !== true : dir)
          ? between(evt.distance.x, 0, width)
          : 0;

      if (evt.isFinal === true) {
        const opened = Math.abs(position) < Math.min(75, width);

        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        }
        else {
          hide();
        }

        flagPanning.value = false;
        return
      }

      applyPosition(stateDirection.value * position);
      applyBackdrop(between(1 - position / width, 0, 1));

      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }

    function cleanup () {
      preventBodyScroll(false);
      setScrollable(true);
    }

    function updateLayout (prop, val) {
      $layout.update(props.side, prop, val);
    }

    function updateLocal (prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }

    function updateSizeOnLayout (miniToOverlay, size) {
      updateLayout('size', miniToOverlay === true ? props.miniWidth : size);
    }

    $layout.instances[ props.side ] = instance;
    updateSizeOnLayout(props.miniToOverlay, size.value);
    updateLayout('space', onLayout.value);
    updateLayout('offset', offset.value);

    if (
      props.showIfAbove === true
      && props.modelValue !== true
      && showing.value === true
      && props[ 'onUpdate:modelValue' ] !== void 0
    ) {
      emit('update:modelValue', true);
    }

    onMounted(() => {
      emit('onLayout', onLayout.value);
      emit('miniState', isMini.value);

      lastDesktopState = props.showIfAbove === true;

      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };

      if ($layout.totalWidth.value !== 0) {
        // make sure that all computed properties
        // have been updated before calling handleShow/handleHide()
        nextTick(fn);
        return
      }

      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;

        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        }
        else {
          fn();
        }
      });
    });

    onBeforeUnmount(() => {
      layoutTotalWidthWatcher?.();

      if (timerMini !== null) {
        clearTimeout(timerMini);
        timerMini = null;
      }

      showing.value === true && cleanup();

      if ($layout.instances[ props.side ] === instance) {
        $layout.instances[ props.side ] = void 0;
        updateLayout('size', 0);
        updateLayout('offset', 0);
        updateLayout('space', false);
      }
    });

    return () => {
      const child = [];

      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(
          withDirectives(
            h('div', {
              key: 'open',
              class: `q-drawer__opener fixed-${ props.side }`,
              'aria-hidden': 'true'
            }),
            openDirective.value
          )
        );

        child.push(
          hDir(
            'div',
            {
              ref: 'backdrop',
              class: backdropClass.value,
              style: backdropStyle.value,
              'aria-hidden': 'true',
              onClick: hide
            },
            void 0,
            'backdrop',
            props.noSwipeBackdrop !== true && showing.value === true,
            () => backdropCloseDirective.value
          )
        );
      }

      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h('div', {
          ...attrs,
          key: '' + mini, // required otherwise Vue will not diff correctly
          class: [
            contentClass.value,
            attrs.class
          ]
        }, mini === true
          ? slots.mini()
          : hSlot(slots.default)
        )
      ];

      if (props.elevated === true && showing.value === true) {
        content.push(
          h('div', {
            class: 'q-layout__shadow absolute-full overflow-hidden no-pointer-events'
          })
        );
      }

      child.push(
        hDir(
          'aside',
          { ref: 'content', class: classes.value, style: style.value },
          content,
          'contentclose',
          props.noSwipeClose !== true && belowBreakpoint.value === true,
          () => contentCloseDirective.value
        )
      );

      return h('div', { class: 'q-drawer-container' }, child)
    }
  }
});

/**
 * We are using a sub-component to avoid unnecessary re-renders
 * of the QScrollArea content when the scrollbars are interacted with.
 */
const ScrollAreaControls = createComponent({
  props: [
    'store',
    'barStyle',
    'verticalBarStyle',
    'horizontalBarStyle'
  ],

  setup (props) {
    return () => ([
      h('div', {
        class: props.store.scroll.vertical.barClass.value,
        style: [ props.barStyle, props.verticalBarStyle ],
        'aria-hidden': 'true',
        onMousedown: props.store.onVerticalMousedown
      }),

      h('div', {
        class: props.store.scroll.horizontal.barClass.value,
        style: [ props.barStyle, props.horizontalBarStyle ],
        'aria-hidden': 'true',
        onMousedown: props.store.onHorizontalMousedown
      }),

      withDirectives(
        h('div', {
          ref: props.store.scroll.vertical.ref,
          class: props.store.scroll.vertical.thumbClass.value,
          style: props.store.scroll.vertical.style.value,
          'aria-hidden': 'true'
        }),
        props.store.thumbVertDir
      ),

      withDirectives(
        h('div', {
          ref: props.store.scroll.horizontal.ref,
          class: props.store.scroll.horizontal.thumbClass.value,
          style: props.store.scroll.horizontal.style.value,
          'aria-hidden': 'true'
        }),
        props.store.thumbHorizDir
      )
    ])
  }
});

const axisList = [ 'vertical', 'horizontal' ];
const dirProps = {
  vertical: { offset: 'offsetY', scroll: 'scrollTop', dir: 'down', dist: 'y' },
  horizontal: { offset: 'offsetX', scroll: 'scrollLeft', dir: 'right', dist: 'x' }
};
const panOpts = {
  prevent: true,
  mouse: true,
  mouseAllDir: true
};

const getMinThumbSize = size => (size >= 250 ? 50 : Math.ceil(size / 5));

const __nuxt_component_9 = createComponent({
  name: 'QScrollArea',

  props: {
    ...useDarkProps,

    thumbStyle: Object,
    verticalThumbStyle: Object,
    horizontalThumbStyle: Object,

    barStyle: [ Array, String, Object ],
    verticalBarStyle: [ Array, String, Object ],
    horizontalBarStyle: [ Array, String, Object ],

    verticalOffset: {
      type: Array,
      default: [ 0, 0 ]
    },
    horizontalOffset: {
      type: Array,
      default: [ 0, 0 ]
    },

    contentStyle: [ Array, String, Object ],
    contentActiveStyle: [ Array, String, Object ],

    delay: {
      type: [ String, Number ],
      default: 1000
    },

    visible: {
      type: Boolean,
      default: null
    },

    tabindex: [ String, Number ],

    onScroll: Function
  },

  setup (props, { slots, emit }) {
    // state management
    const tempShowing = ref(false);
    const panning = ref(false);
    const hover = ref(false);

    // other...
    const container = {
      vertical: ref(0),
      horizontal: ref(0)
    };

    const scroll = {
      vertical: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      },

      horizontal: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      }
    };

    const { proxy } = getCurrentInstance();

    const isDark = useDark(props, proxy.$q);

    let timer = null, panRefPos;

    const targetRef = ref(null);

    const classes = computed(() =>
      'q-scrollarea'
      + (isDark.value === true ? ' q-scrollarea--dark' : '')
    );

    Object.assign(container, {
      verticalInner: computed(() => (
        container.vertical.value - props.verticalOffset[ 0 ] - props.verticalOffset[ 1 ]
      )),

      horizontalInner: computed(() => (
        container.horizontal.value - props.horizontalOffset[ 0 ] - props.horizontalOffset[ 1 ]
      ))
    });

    scroll.vertical.percentage = computed(() => {
      const diff = scroll.vertical.size.value - container.vertical.value;
      if (diff <= 0) { return 0 }
      const p = between(scroll.vertical.position.value / diff, 0, 1);
      return Math.round(p * 10000) / 10000
    });
    scroll.vertical.thumbHidden = computed(() => (
      (
        (props.visible === null ? hover.value : props.visible) !== true
        && tempShowing.value === false
        && panning.value === false
      ) || scroll.vertical.size.value <= container.vertical.value + 1
    ));
    scroll.vertical.thumbStart = computed(() => (
      props.verticalOffset[ 0 ]
      + scroll.vertical.percentage.value * (container.verticalInner.value - scroll.vertical.thumbSize.value)
    ));
    scroll.vertical.thumbSize = computed(() =>
      Math.round(
        between(
          container.verticalInner.value * container.verticalInner.value / scroll.vertical.size.value,
          getMinThumbSize(container.verticalInner.value),
          container.verticalInner.value
        )
      )
    );
    scroll.vertical.style = computed(() => ({
      ...props.thumbStyle,
      ...props.verticalThumbStyle,
      top: `${ scroll.vertical.thumbStart.value }px`,
      height: `${ scroll.vertical.thumbSize.value }px`,
      right: `${ props.horizontalOffset[ 1 ] }px`
    }));
    scroll.vertical.thumbClass = computed(() => (
      'q-scrollarea__thumb q-scrollarea__thumb--v absolute-right'
      + (scroll.vertical.thumbHidden.value === true ? ' q-scrollarea__thumb--invisible' : '')
    ));
    scroll.vertical.barClass = computed(() => (
      'q-scrollarea__bar q-scrollarea__bar--v absolute-right'
      + (scroll.vertical.thumbHidden.value === true ? ' q-scrollarea__bar--invisible' : '')
    ));

    scroll.horizontal.percentage = computed(() => {
      const diff = scroll.horizontal.size.value - container.horizontal.value;
      if (diff <= 0) { return 0 }
      const p = between(Math.abs(scroll.horizontal.position.value) / diff, 0, 1);
      return Math.round(p * 10000) / 10000
    });
    scroll.horizontal.thumbHidden = computed(() => (
      (
        (props.visible === null ? hover.value : props.visible) !== true
        && tempShowing.value === false
        && panning.value === false
      ) || scroll.horizontal.size.value <= container.horizontal.value + 1
    ));
    scroll.horizontal.thumbStart = computed(() => (
      props.horizontalOffset[ 0 ]
      + scroll.horizontal.percentage.value * (container.horizontalInner.value - scroll.horizontal.thumbSize.value)
    ));
    scroll.horizontal.thumbSize = computed(() =>
      Math.round(
        between(
          container.horizontalInner.value * container.horizontalInner.value / scroll.horizontal.size.value,
          getMinThumbSize(container.horizontalInner.value),
          container.horizontalInner.value
        )
      )
    );
    scroll.horizontal.style = computed(() => ({
      ...props.thumbStyle,
      ...props.horizontalThumbStyle,
      [ proxy.$q.lang.rtl === true ? 'right' : 'left' ]: `${ scroll.horizontal.thumbStart.value }px`,
      width: `${ scroll.horizontal.thumbSize.value }px`,
      bottom: `${ props.verticalOffset[ 1 ] }px`
    }));
    scroll.horizontal.thumbClass = computed(() => (
      'q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom'
      + (scroll.horizontal.thumbHidden.value === true ? ' q-scrollarea__thumb--invisible' : '')
    ));
    scroll.horizontal.barClass = computed(() => (
      'q-scrollarea__bar q-scrollarea__bar--h absolute-bottom'
      + (scroll.horizontal.thumbHidden.value === true ? ' q-scrollarea__bar--invisible' : '')
    ));

    const mainStyle = computed(() => (
      scroll.vertical.thumbHidden.value === true && scroll.horizontal.thumbHidden.value === true
        ? props.contentStyle
        : props.contentActiveStyle
    ));

    function getScroll () {
      const info = {};

      axisList.forEach(axis => {
        const data = scroll[ axis ];
        Object.assign(info, {
          [ axis + 'Position' ]: data.position.value,
          [ axis + 'Percentage' ]: data.percentage.value,
          [ axis + 'Size' ]: data.size.value,
          [ axis + 'ContainerSize' ]: container[ axis ].value,
          [ axis + 'ContainerInnerSize' ]: container[ axis + 'Inner' ].value
        });
      });

      return info
    }

    // we have lots of listeners, so
    // ensure we're not emitting same info
    // multiple times
    const emitScroll = debounce(() => {
      const info = getScroll();
      info.ref = proxy;
      emit('scroll', info);
    }, 0);

    function localSetScrollPosition (axis, offset, duration) {
      if (axisList.includes(axis) === false) {
        console.error('[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)');
        return
      }

      const fn = axis === 'vertical'
        ? setVerticalScrollPosition
        : setHorizontalScrollPosition;

      fn(targetRef.value, offset, duration);
    }

    function updateContainer ({ height, width }) {
      let change = false;

      if (container.vertical.value !== height) {
        container.vertical.value = height;
        change = true;
      }

      if (container.horizontal.value !== width) {
        container.horizontal.value = width;
        change = true;
      }

      change === true && startTimer();
    }

    function updateScroll ({ position }) {
      let change = false;

      if (scroll.vertical.position.value !== position.top) {
        scroll.vertical.position.value = position.top;
        change = true;
      }

      if (scroll.horizontal.position.value !== position.left) {
        scroll.horizontal.position.value = position.left;
        change = true;
      }

      change === true && startTimer();
    }

    function updateScrollSize ({ height, width }) {
      if (scroll.horizontal.size.value !== width) {
        scroll.horizontal.size.value = width;
        startTimer();
      }

      if (scroll.vertical.size.value !== height) {
        scroll.vertical.size.value = height;
        startTimer();
      }
    }

    function onPanThumb (e, axis) {
      const data = scroll[ axis ];

      if (e.isFirst === true) {
        if (data.thumbHidden.value === true) return

        panRefPos = data.position.value;
        panning.value = true;
      }
      else if (panning.value !== true) {
        return
      }

      if (e.isFinal === true) {
        panning.value = false;
      }

      const dProp = dirProps[ axis ];

      const multiplier = (
        (data.size.value - container[ axis ].value)
        / (container[ axis + 'Inner' ].value - data.thumbSize.value)
      );
      const distance = e.distance[ dProp.dist ];
      const pos = panRefPos + (e.direction === dProp.dir ? 1 : -1) * distance * multiplier;

      setScroll(pos, axis);
    }

    function onMousedown (evt, axis) {
      const data = scroll[ axis ];

      if (data.thumbHidden.value !== true) {
        const startOffset = axis === 'vertical'
          ? props.verticalOffset[ 0 ]
          : props.horizontalOffset[ 0 ];

        const offset = evt[ dirProps[ axis ].offset ] - startOffset;
        const thumbStart = data.thumbStart.value - startOffset;

        if (offset < thumbStart || offset > thumbStart + data.thumbSize.value) {
          const targetThumbStart = offset - data.thumbSize.value / 2;
          const percentage = between(targetThumbStart / (container[ axis + 'Inner' ].value - data.thumbSize.value), 0, 1);
          setScroll(percentage * Math.max(0, data.size.value - container[ axis ].value), axis);
        }

        // activate thumb pan
        if (data.ref.value !== null) {
          data.ref.value.dispatchEvent(new MouseEvent(evt.type, evt));
        }
      }
    }

    function startTimer () {
      tempShowing.value = true;

      timer !== null && clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        tempShowing.value = false;
      }, props.delay);

      props.onScroll !== void 0 && emitScroll();
    }

    function setScroll (offset, axis) {
      targetRef.value[ dirProps[ axis ].scroll ] = offset;
    }

    let mouseEventTimer = null;

    function onMouseenter () {
      if (mouseEventTimer !== null) {
        clearTimeout(mouseEventTimer);
      }

      // setTimeout needed for iOS; see ticket #16210
      mouseEventTimer = setTimeout(() => {
        mouseEventTimer = null;
        hover.value = true;
      }, proxy.$q.platform.is.ios ? 50 : 0);
    }

    function onMouseleave () {
      if (mouseEventTimer !== null) {
        clearTimeout(mouseEventTimer);
        mouseEventTimer = null;
      }

      hover.value = false;
    }

    let scrollPosition = null;

    watch(() => proxy.$q.lang.rtl, rtl => {
      if (targetRef.value !== null) {
        setHorizontalScrollPosition(
          targetRef.value,
          Math.abs(scroll.horizontal.position.value) * (rtl === true ? -1 : 1)
        );
      }
    });

    onDeactivated(() => {
      scrollPosition = {
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      };
    });

    onActivated(() => {
      if (scrollPosition === null) return

      const scrollTarget = targetRef.value;

      if (scrollTarget !== null) {
        setHorizontalScrollPosition(scrollTarget, scrollPosition.left);
        setVerticalScrollPosition(scrollTarget, scrollPosition.top);
      }
    });

    onBeforeUnmount(emitScroll.cancel);

    // expose public methods
    Object.assign(proxy, {
      getScrollTarget: () => targetRef.value,
      getScroll,
      getScrollPosition: () => ({
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      }),
      getScrollPercentage: () => ({
        top: scroll.vertical.percentage.value,
        left: scroll.horizontal.percentage.value
      }),
      setScrollPosition: localSetScrollPosition,
      setScrollPercentage (axis, percentage, duration) {
        localSetScrollPosition(
          axis,
          percentage
            * (scroll[ axis ].size.value - container[ axis ].value)
            * (axis === 'horizontal' && proxy.$q.lang.rtl === true ? -1 : 1),
          duration
        );
      }
    });

    const store = {
      scroll,

      thumbVertDir: [ [
        TouchPan,
        e => { onPanThumb(e, 'vertical'); },
        void 0,
        { vertical: true, ...panOpts }
      ] ],

      thumbHorizDir: [ [
        TouchPan,
        e => { onPanThumb(e, 'horizontal'); },
        void 0,
        { horizontal: true, ...panOpts }
      ] ],

      onVerticalMousedown (evt) {
        onMousedown(evt, 'vertical');
      },

      onHorizontalMousedown (evt) {
        onMousedown(evt, 'horizontal');
      }
    };

    return () => {
      return h('div', {
        class: classes.value,
        onMouseenter,
        onMouseleave
      }, [
        h('div', {
          ref: targetRef,
          class: 'q-scrollarea__container scroll relative-position fit hide-scrollbar',
          tabindex: props.tabindex !== void 0 ? props.tabindex : void 0
        }, [
          h('div', {
            class: 'q-scrollarea__content absolute',
            style: mainStyle.value
          }, hMergeSlot(slots.default, [
            h(QResizeObserver, {
              debounce: 0,
              onResize: updateScrollSize
            })
          ])),

          h(QScrollObserver, {
            axis: 'both',
            onScroll: updateScroll
          })
        ]),

        h(QResizeObserver, {
          debounce: 0,
          onResize: updateContainer
        }),

        h(ScrollAreaControls, {
          store,
          barStyle: props.barStyle,
          verticalBarStyle: props.verticalBarStyle,
          horizontalBarStyle: props.horizontalBarStyle
        })
      ])
    }
  }
});

const roleAttrExceptions = [ 'ul', 'ol' ];

const __nuxt_component_3$2 = createComponent({
  name: 'QList',

  props: {
    ...useDarkProps,

    bordered: Boolean,
    dense: Boolean,
    separator: Boolean,
    padding: Boolean,

    tag: {
      type: String,
      default: 'div'
    }
  },

  setup (props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);

    const role = computed(() => (
      roleAttrExceptions.includes(props.tag) ? null : 'list')
    );

    const classes = computed(() =>
      'q-list'
      + (props.bordered === true ? ' q-list--bordered' : '')
      + (props.dense === true ? ' q-list--dense' : '')
      + (props.separator === true ? ' q-list--separator' : '')
      + (isDark.value === true ? ' q-list--dark' : '')
      + (props.padding === true ? ' q-list--padding' : '')
    );

    return () => h(props.tag, { class: classes.value, role: role.value }, hSlot(slots.default))
  }
});

const __nuxt_component_8 = createComponent({
  name: 'QItemLabel',

  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [ Number, String ]
  },

  setup (props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10));

    const classes = computed(() =>
      'q-item__label'
      + (props.overline === true ? ' q-item__label--overline text-overline' : '')
      + (props.caption === true ? ' q-item__label--caption text-caption' : '')
      + (props.header === true ? ' q-item__label--header' : '')
      + (parsedLines.value === 1 ? ' ellipsis' : '')
    );

    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1
        ? {
            overflow: 'hidden',
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': parsedLines.value
          }
        : null
    });

    return () => h('div', {
      style: style.value,
      class: classes.value
    }, hSlot(slots.default))
  }
});

const __nuxt_component_5 = createComponent({
  name: 'QItem',

  props: {
    ...useDarkProps,
    ...useRouterLinkProps,

    tag: {
      type: String,
      default: 'div'
    },

    active: {
      type: Boolean,
      default: null
    },

    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,

    tabindex: [ String, Number ],

    focused: Boolean,
    manualFocus: Boolean
  },

  emits: [ 'click', 'keyup' ],

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const isDark = useDark(props, $q);
    const { hasLink, linkAttrs, linkClass, linkTag, navigateOnClick } = useRouterLink();

    const rootRef = ref(null);
    const blurTargetRef = ref(null);

    const isActionable = computed(() =>
      props.clickable === true
        || hasLink.value === true
        || props.tag === 'label'
    );

    const isClickable = computed(() =>
      props.disable !== true && isActionable.value === true
    );

    const classes = computed(() =>
      'q-item q-item-type row no-wrap'
      + (props.dense === true ? ' q-item--dense' : '')
      + (isDark.value === true ? ' q-item--dark' : '')
      + (
        hasLink.value === true && props.active === null
          ? linkClass.value
          : (
              props.active === true
                ? ` q-item--active${ props.activeClass !== void 0 ? ` ${ props.activeClass }` : '' }`
                : ''
            )
      )
      + (props.disable === true ? ' disabled' : '')
      + (
        isClickable.value === true
          ? ' q-item--clickable q-link cursor-pointer '
            + (props.manualFocus === true ? 'q-manual-focusable' : 'q-focusable q-hoverable')
            + (props.focused === true ? ' q-manual-focusable--focused' : '')
          : ''
      )
    );

    const style = computed(() => {
      if (props.insetLevel === void 0) {
        return null
      }

      const dir = $q.lang.rtl === true ? 'Right' : 'Left';
      return {
        [ 'padding' + dir ]: (16 + props.insetLevel * 56) + 'px'
      }
    });

    function onClick (e) {
      if (isClickable.value === true) {
        if (blurTargetRef.value !== null && e.qAvoidFocus !== true) {
          if (e.qKeyEvent !== true && document.activeElement === rootRef.value) {
            blurTargetRef.value.focus();
          }
          else if (document.activeElement === blurTargetRef.value) {
            rootRef.value.focus();
          }
        }

        navigateOnClick(e);
      }
    }

    function onKeyup (e) {
      if (isClickable.value === true && isKeyCode(e, [ 13, 32 ]) === true) {
        stopAndPrevent(e);

        // for ripple
        e.qKeyEvent = true;

        // for click trigger
        const evt = new MouseEvent('click', e);
        evt.qKeyEvent = true;
        rootRef.value.dispatchEvent(evt);
      }

      emit('keyup', e);
    }

    function getContent () {
      const child = hUniqueSlot(slots.default, []);

      isClickable.value === true && child.unshift(
        h('div', { class: 'q-focus-helper', tabindex: -1, ref: blurTargetRef })
      );

      return child
    }

    return () => {
      const data = {
        ref: rootRef,
        class: classes.value,
        style: style.value,
        role: 'listitem',
        onClick,
        onKeyup
      };

      if (isClickable.value === true) {
        data.tabindex = props.tabindex || '0';
        Object.assign(data, linkAttrs.value);
      }
      else if (isActionable.value === true) {
        data[ 'aria-disabled' ] = 'true';
      }

      return h(
        linkTag.value,
        data,
        getContent()
      )
    }
  }
});

const __nuxt_component_6 = createComponent({
  name: 'QItemSection',

  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    noWrap: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'q-item__section column'
      + ` q-item__section--${ props.avatar === true || props.side === true || props.thumbnail === true ? 'side' : 'main' }`
      + (props.top === true ? ' q-item__section--top justify-start' : ' justify-center')
      + (props.avatar === true ? ' q-item__section--avatar' : '')
      + (props.thumbnail === true ? ' q-item__section--thumbnail' : '')
      + (props.noWrap === true ? ' q-item__section--nowrap' : '')
    );

    return () => h('div', { class: classes.value }, hSlot(slots.default))
  }
});

const __nuxt_component_15 = createComponent({
  name: 'QPageContainer',

  setup (_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();

    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error('QPageContainer needs to be child of QLayout');
      return emptyRenderFn
    }

    provide(pageContainerKey, true);

    const style = computed(() => {
      const css = {};

      if ($layout.header.space === true) {
        css.paddingTop = `${ $layout.header.size }px`;
      }
      if ($layout.right.space === true) {
        css[ `padding${ $q.lang.rtl === true ? 'Left' : 'Right' }` ] = `${ $layout.right.size }px`;
      }
      if ($layout.footer.space === true) {
        css.paddingBottom = `${ $layout.footer.size }px`;
      }
      if ($layout.left.space === true) {
        css[ `padding${ $q.lang.rtl === true ? 'Right' : 'Left' }` ] = `${ $layout.left.size }px`;
      }

      return css
    });

    return () => h('div', {
      class: 'q-page-container',
      style: style.value
    }, hSlot(slots.default))
  }
});

const __nuxt_component_17 = createComponent({
  name: 'QFooter',

  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    bordered: Boolean,
    elevated: Boolean,

    heightHint: {
      type: [ String, Number ],
      default: 50
    }
  },

  emits: [ 'reveal', 'focusin' ],

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error('QFooter needs to be child of QLayout');
      return emptyRenderFn
    }

    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const windowHeight = ref(
      isRuntimeSsrPreHydration.value === true || $layout.isContainer.value === true
        ? 0
        : window.innerHeight
    );

    const fixed = computed(() =>
      props.reveal === true
      || $layout.view.value.indexOf('F') !== -1
      || ($q.platform.is.ios && $layout.isContainer.value === true)
    );

    const containerHeight = computed(() => (
      $layout.isContainer.value === true
        ? $layout.containerHeight.value
        : windowHeight.value
    ));

    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0
      }
      const offset = $layout.scroll.value.position + containerHeight.value + size.value - $layout.height.value;
      return offset > 0 ? offset : 0
    });

    const hidden = computed(() =>
      props.modelValue !== true || (fixed.value === true && revealed.value !== true)
    );

    const revealOnFocus = computed(() =>
      props.modelValue === true && hidden.value === true && props.reveal === true
    );

    const classes = computed(() =>
      'q-footer q-layout__section--marginal '
      + (fixed.value === true ? 'fixed' : 'absolute') + '-bottom'
      + (props.bordered === true ? ' q-footer--bordered' : '')
      + (hidden.value === true ? ' q-footer--hidden' : '')
      + (
        props.modelValue !== true
          ? ' q-layout--prevent-focus' + (fixed.value !== true ? ' hidden' : '')
          : ''
      )
    );

    const style = computed(() => {
      const
        view = $layout.rows.value.bottom,
        css = {};

      if (view[ 0 ] === 'l' && $layout.left.space === true) {
        css[ $q.lang.rtl === true ? 'right' : 'left' ] = `${ $layout.left.size }px`;
      }
      if (view[ 2 ] === 'r' && $layout.right.space === true) {
        css[ $q.lang.rtl === true ? 'left' : 'right' ] = `${ $layout.right.size }px`;
      }

      return css
    });

    function updateLayout (prop, val) {
      $layout.update('footer', prop, val);
    }

    function updateLocal (prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }

    function onResize ({ height }) {
      updateLocal(size, height);
      updateLayout('size', height);
    }

    function updateRevealed () {
      if (props.reveal !== true) return

      const { direction, position, inflectionPoint } = $layout.scroll.value;

      updateLocal(revealed, (
        direction === 'up'
        || position - inflectionPoint < 100
        || $layout.height.value - containerHeight.value - position - size.value < 300
      ));
    }

    function onFocusin (evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }

      emit('focusin', evt);
    }

    watch(() => props.modelValue, val => {
      updateLayout('space', val);
      updateLocal(revealed, true);
      $layout.animate();
    });

    watch(offset, val => {
      updateLayout('offset', val);
    });

    watch(() => props.reveal, val => {
      val === false && updateLocal(revealed, props.modelValue);
    });

    watch(revealed, val => {
      $layout.animate();
      emit('reveal', val);
    });

    watch([ size, $layout.scroll, $layout.height ], updateRevealed);

    watch(() => $q.screen.height, val => {
      $layout.isContainer.value !== true && updateLocal(windowHeight, val);
    });

    const instance = {};

    $layout.instances.footer = instance;
    props.modelValue === true && updateLayout('size', size.value);
    updateLayout('space', props.modelValue);
    updateLayout('offset', offset.value);

    onBeforeUnmount(() => {
      if ($layout.instances.footer === instance) {
        $layout.instances.footer = void 0;
        updateLayout('size', 0);
        updateLayout('offset', 0);
        updateLayout('space', false);
      }
    });

    return () => {
      const child = hMergeSlot(slots.default, [
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      ]);

      props.elevated === true && child.push(
        h('div', {
          class: 'q-layout__shadow absolute-full overflow-hidden no-pointer-events'
        })
      );

      return h('footer', {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child)
    }
  }
});

function getIndicatorClass (color, top, vertical) {
  const pos = vertical === true
    ? [ 'left', 'right' ]
    : [ 'top', 'bottom' ];

  return `absolute-${ top === true ? pos[ 0 ] : pos[ 1 ] }${ color ? ` text-${ color }` : '' }`
}

const alignValues = [ 'left', 'center', 'right', 'justify' ];

const __nuxt_component_18 = createComponent({
  name: 'QTabs',

  props: {
    modelValue: [ Number, String ],

    align: {
      type: String,
      default: 'center',
      validator: v => alignValues.includes(v)
    },
    breakpoint: {
      type: [ String, Number ],
      default: 600
    },

    vertical: Boolean,
    shrink: Boolean,
    stretch: Boolean,

    activeClass: String,
    activeColor: String,
    activeBgColor: String,
    indicatorColor: String,
    leftIcon: String,
    rightIcon: String,

    outsideArrows: Boolean,
    mobileArrows: Boolean,

    switchIndicator: Boolean,

    narrowIndicator: Boolean,
    inlineLabel: Boolean,
    noCaps: Boolean,

    dense: Boolean,

    contentClass: String,

    'onUpdate:modelValue': [ Function, Array ]
  },

  setup (props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;

    const { registerTick: registerScrollTick } = useTick();
    const { registerTick: registerUpdateArrowsTick } = useTick();
    const { registerTick: registerAnimateTick } = useTick();

    const { registerTimeout: registerFocusTimeout, removeTimeout: removeFocusTimeout } = useTimeout();
    const { registerTimeout: registerScrollToTabTimeout, removeTimeout: removeScrollToTabTimeout } = useTimeout();

    const rootRef = ref(null);
    const contentRef = ref(null);

    const currentModel = ref(props.modelValue);
    const scrollable = ref(false);
    const leftArrow = ref(true);
    const rightArrow = ref(false);
    const justify = ref(false);

    const tabDataList = [];
    const tabDataListLen = ref(0);
    const hasFocus = ref(false);

    let animateTimer = null, scrollTimer = null, unwatchRoute;

    const tabProps = computed(() => ({
      activeClass: props.activeClass,
      activeColor: props.activeColor,
      activeBgColor: props.activeBgColor,
      indicatorClass: getIndicatorClass(
        props.indicatorColor,
        props.switchIndicator,
        props.vertical
      ),
      narrowIndicator: props.narrowIndicator,
      inlineLabel: props.inlineLabel,
      noCaps: props.noCaps
    }));

    const hasActiveTab = computed(() => {
      const len = tabDataListLen.value;
      const val = currentModel.value;

      for (let i = 0; i < len; i++) {
        if (tabDataList[ i ].name.value === val) {
          return true
        }
      }

      return false
    });

    const alignClass = computed(() => {
      const align = scrollable.value === true
        ? 'left'
        : (justify.value === true ? 'justify' : props.align);

      return `q-tabs__content--align-${ align }`
    });

    const classes = computed(() =>
      'q-tabs row no-wrap items-center'
      + ` q-tabs--${ scrollable.value === true ? '' : 'not-' }scrollable`
      + ` q-tabs--${ props.vertical === true ? 'vertical' : 'horizontal' }`
      + ` q-tabs__arrows--${ props.outsideArrows === true ? 'outside' : 'inside' }`
      + ` q-tabs--mobile-with${ props.mobileArrows === true ? '' : 'out' }-arrows`
      + (props.dense === true ? ' q-tabs--dense' : '')
      + (props.shrink === true ? ' col-shrink' : '')
      + (props.stretch === true ? ' self-stretch' : '')
    );

    const innerClass = computed(() =>
      'q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position '
      + alignClass.value
      + (props.contentClass !== void 0 ? ` ${ props.contentClass }` : '')
    );

    const domProps = computed(() => (
      props.vertical === true
        ? { container: 'height', content: 'offsetHeight', scroll: 'scrollHeight' }
        : { container: 'width', content: 'offsetWidth', scroll: 'scrollWidth' }
    ));

    const isRTL = computed(() => props.vertical !== true && $q.lang.rtl === true);
    const rtlPosCorrection = computed(() => isRTL.value === true);

    watch(isRTL, updateArrows);

    watch(() => props.modelValue, name => {
      updateModel({ name, setCurrent: true, skipEmit: true });
    });

    watch(() => props.outsideArrows, recalculateScroll);

    function updateModel ({ name, setCurrent, skipEmit }) {
      if (currentModel.value === name) return

      if (skipEmit !== true && props[ 'onUpdate:modelValue' ] !== void 0) {
        emit('update:modelValue', name);
      }

      if (
        setCurrent === true
        || props[ 'onUpdate:modelValue' ] === void 0
      ) {
        animate(currentModel.value, name);
        currentModel.value = name;
      }
    }

    function recalculateScroll () {
      registerScrollTick(() => {
        rootRef.value && updateContainer({
          width: rootRef.value.offsetWidth,
          height: rootRef.value.offsetHeight
        });
      });
    }

    function updateContainer (domSize) {
      // it can be called faster than component being initialized
      // so we need to protect against that case
      // (one example of such case is the docs release notes page)
      if (domProps.value === void 0 || contentRef.value === null) return

      const
        size = domSize[ domProps.value.container ],
        scrollSize = Math.min(
          contentRef.value[ domProps.value.scroll ],
          Array.prototype.reduce.call(
            contentRef.value.children,
            (acc, el) => acc + (el[ domProps.value.content ] || 0),
            0
          )
        ),
        scroll = size > 0 && scrollSize > size; // when there is no tab, in Chrome, size === 0 and scrollSize === 1

      scrollable.value = scroll;

      // Arrows need to be updated even if the scroll status was already true
      scroll === true && registerUpdateArrowsTick(updateArrows);

      justify.value = size < parseInt(props.breakpoint, 10);
    }

    function animate (oldName, newName) {
      const
        oldTab = oldName !== void 0 && oldName !== null && oldName !== ''
          ? tabDataList.find(tab => tab.name.value === oldName)
          : null,
        newTab = newName !== void 0 && newName !== null && newName !== ''
          ? tabDataList.find(tab => tab.name.value === newName)
          : null;

      if (hadActivated === true) {
        // After the component has been re-activated
        // we should not animate the transition.
        // Consider it as if the component has just been mounted.
        hadActivated = false;
      }
      else if (oldTab && newTab) {
        const
          oldEl = oldTab.tabIndicatorRef.value,
          newEl = newTab.tabIndicatorRef.value;

        if (animateTimer !== null) {
          clearTimeout(animateTimer);
          animateTimer = null;
        }

        oldEl.style.transition = 'none';
        oldEl.style.transform = 'none';
        newEl.style.transition = 'none';
        newEl.style.transform = 'none';

        const
          oldPos = oldEl.getBoundingClientRect(),
          newPos = newEl.getBoundingClientRect();

        newEl.style.transform = props.vertical === true
          ? `translate3d(0,${ oldPos.top - newPos.top }px,0) scale3d(1,${ newPos.height ? oldPos.height / newPos.height : 1 },1)`
          : `translate3d(${ oldPos.left - newPos.left }px,0,0) scale3d(${ newPos.width ? oldPos.width / newPos.width : 1 },1,1)`;

        // allow scope updates to kick in (QRouteTab needs more time)
        registerAnimateTick(() => {
          animateTimer = setTimeout(() => {
            animateTimer = null;
            newEl.style.transition = 'transform .25s cubic-bezier(.4, 0, .2, 1)';
            newEl.style.transform = 'none';
          }, 70);
        });
      }

      if (newTab && scrollable.value === true) {
        scrollToTabEl(newTab.rootRef.value);
      }
    }

    function scrollToTabEl (el) {
      const
        { left, width, top, height } = contentRef.value.getBoundingClientRect(),
        newPos = el.getBoundingClientRect();

      let offset = props.vertical === true ? newPos.top - top : newPos.left - left;

      if (offset < 0) {
        contentRef.value[ props.vertical === true ? 'scrollTop' : 'scrollLeft' ] += Math.floor(offset);
        updateArrows();
        return
      }

      offset += props.vertical === true ? newPos.height - height : newPos.width - width;
      if (offset > 0) {
        contentRef.value[ props.vertical === true ? 'scrollTop' : 'scrollLeft' ] += Math.ceil(offset);
        updateArrows();
      }
    }

    function updateArrows () {
      const content = contentRef.value;
      if (content === null) return

      const
        rect = content.getBoundingClientRect(),
        pos = props.vertical === true ? content.scrollTop : Math.abs(content.scrollLeft);

      if (isRTL.value === true) {
        leftArrow.value = Math.ceil(pos + rect.width) < content.scrollWidth - 1;
        rightArrow.value = pos > 0;
      }
      else {
        leftArrow.value = pos > 0;
        rightArrow.value = props.vertical === true
          ? Math.ceil(pos + rect.height) < content.scrollHeight
          : Math.ceil(pos + rect.width) < content.scrollWidth;
      }
    }

    function animScrollTo (value) {
      scrollTimer !== null && clearInterval(scrollTimer);
      scrollTimer = setInterval(() => {
        if (scrollTowards(value) === true) {
          stopAnimScroll();
        }
      }, 5);
    }

    function scrollToStart () {
      animScrollTo(rtlPosCorrection.value === true ? Number.MAX_SAFE_INTEGER : 0);
    }

    function scrollToEnd () {
      animScrollTo(rtlPosCorrection.value === true ? 0 : Number.MAX_SAFE_INTEGER);
    }

    function stopAnimScroll () {
      if (scrollTimer !== null) {
        clearInterval(scrollTimer);
        scrollTimer = null;
      }
    }

    function onKbdNavigate (keyCode, fromEl) {
      const tabs = Array.prototype.filter.call(
        contentRef.value.children,
        el => el === fromEl || (el.matches && el.matches('.q-tab.q-focusable') === true)
      );

      const len = tabs.length;
      if (len === 0) return

      if (keyCode === 36) { // Home
        scrollToTabEl(tabs[ 0 ]);
        tabs[ 0 ].focus();
        return true
      }
      if (keyCode === 35) { // End
        scrollToTabEl(tabs[ len - 1 ]);
        tabs[ len - 1 ].focus();
        return true
      }

      const dirPrev = keyCode === (props.vertical === true ? 38 /* ArrowUp */ : 37 /* ArrowLeft */);
      const dirNext = keyCode === (props.vertical === true ? 40 /* ArrowDown */ : 39 /* ArrowRight */);

      const dir = dirPrev === true ? -1 : (dirNext === true ? 1 : void 0);

      if (dir !== void 0) {
        const rtlDir = isRTL.value === true ? -1 : 1;
        const index = tabs.indexOf(fromEl) + dir * rtlDir;

        if (index >= 0 && index < len) {
          scrollToTabEl(tabs[ index ]);
          tabs[ index ].focus({ preventScroll: true });
        }

        return true
      }
    }

    // let's speed up execution of time-sensitive scrollTowards()
    // with a computed variable by directly applying the minimal
    // number of instructions on get/set functions
    const posFn = computed(() => (
      rtlPosCorrection.value === true
        ? { get: content => Math.abs(content.scrollLeft), set: (content, pos) => { content.scrollLeft = -pos; } }
        : (
            props.vertical === true
              ? { get: content => content.scrollTop, set: (content, pos) => { content.scrollTop = pos; } }
              : { get: content => content.scrollLeft, set: (content, pos) => { content.scrollLeft = pos; } }
          )
    ));

    function scrollTowards (value) {
      const
        content = contentRef.value,
        { get, set } = posFn.value;

      let
        done = false,
        pos = get(content);

      const direction = value < pos ? -1 : 1;

      pos += direction * 5;

      if (pos < 0) {
        done = true;
        pos = 0;
      }
      else if (
        (direction === -1 && pos <= value)
        || (direction === 1 && pos >= value)
      ) {
        done = true;
        pos = value;
      }

      set(content, pos);
      updateArrows();

      return done
    }

    function hasQueryIncluded (targetQuery, matchingQuery) {
      for (const key in targetQuery) {
        if (targetQuery[ key ] !== matchingQuery[ key ]) {
          return false
        }
      }

      return true
    }

    // 1. Do not use directly; use verifyRouteModel() instead
    // 2. Should set hadActivated to false upon exit
    function updateActiveRoute () {
      let name = null, bestScore = { matchedLen: 0, queryDiff: 9999, hrefLen: 0 };

      const list = tabDataList.filter(tab => tab.routeData?.hasRouterLink.value === true);
      const { hash: currentHash, query: currentQuery } = proxy.$route;
      const currentQueryLen = Object.keys(currentQuery).length;

      // Vue Router does not keep account of hash & query when matching
      // so we're doing this as well

      for (const tab of list) {
        const exact = tab.routeData.exact.value === true;

        if (tab.routeData[ exact === true ? 'linkIsExactActive' : 'linkIsActive' ].value !== true) {
          // it cannot match anything as it's not active nor exact-active
          continue
        }

        const { hash, query, matched, href } = tab.routeData.resolvedLink.value;
        const queryLen = Object.keys(query).length;

        if (exact === true) {
          if (hash !== currentHash) {
            // it's set to exact but it doesn't matches the hash
            continue
          }

          if (
            queryLen !== currentQueryLen
            || hasQueryIncluded(currentQuery, query) === false
          ) {
            // it's set to exact but it doesn't matches the query
            continue
          }

          // yey, we found the perfect match (route + hash + query)
          name = tab.name.value;
          break
        }

        if (hash !== '' && hash !== currentHash) {
          // it has hash and it doesn't matches
          continue
        }

        if (
          queryLen !== 0
          && hasQueryIncluded(query, currentQuery) === false
        ) {
          // it has query and it doesn't includes the current one
          continue
        }

        const newScore = {
          matchedLen: matched.length,
          queryDiff: currentQueryLen - queryLen,
          hrefLen: href.length - hash.length
        };

        if (newScore.matchedLen > bestScore.matchedLen) {
          // it matches more routes so it's more specific so we set it as current champion
          name = tab.name.value;
          bestScore = newScore;
          continue
        }
        else if (newScore.matchedLen !== bestScore.matchedLen) {
          // it matches less routes than the current champion so we discard it
          continue
        }

        if (newScore.queryDiff < bestScore.queryDiff) {
          // query is closer to the current one so we set it as current champion
          name = tab.name.value;
          bestScore = newScore;
        }
        else if (newScore.queryDiff !== bestScore.queryDiff) {
          // it matches less routes than the current champion so we discard it
          continue
        }

        if (newScore.hrefLen > bestScore.hrefLen) {
          // href is lengthier so it's more specific so we set it as current champion
          name = tab.name.value;
          bestScore = newScore;
        }
      }

      if (
        name === null
        && tabDataList.some(tab => tab.routeData === void 0 && tab.name.value === currentModel.value) === true
      ) {
        // we shouldn't interfere if non-route tab is active
        hadActivated = false;
        return
      }

      updateModel({ name, setCurrent: true });
    }

    function onFocusin (e) {
      removeFocusTimeout();

      if (
        hasFocus.value !== true
        && rootRef.value !== null
        && e.target
        && typeof e.target.closest === 'function'
      ) {
        const tab = e.target.closest('.q-tab');

        // if the target is contained by a QTab/QRouteTab
        // (it might be other elements focused, like additional QBtn)
        if (tab && rootRef.value.contains(tab) === true) {
          hasFocus.value = true;
          scrollable.value === true && scrollToTabEl(tab);
        }
      }
    }

    function onFocusout () {
      registerFocusTimeout(() => { hasFocus.value = false; }, 30);
    }

    function verifyRouteModel () {
      if ($tabs.avoidRouteWatcher === false) {
        registerScrollToTabTimeout(updateActiveRoute);
      }
      else {
        removeScrollToTabTimeout();
      }
    }

    function watchRoute () {
      if (unwatchRoute === void 0) {
        const unwatch = watch(() => proxy.$route.fullPath, verifyRouteModel);
        unwatchRoute = () => {
          unwatch();
          unwatchRoute = void 0;
        };
      }
    }

    function registerTab (tabData) {
      tabDataList.push(tabData);
      tabDataListLen.value++;

      recalculateScroll();

      // if it's a QTab or we don't have Vue Router
      if (tabData.routeData === void 0 || proxy.$route === void 0) {
        // we should position to the currently active tab (if any)
        registerScrollToTabTimeout(() => {
          if (scrollable.value === true) {
            const value = currentModel.value;
            const newTab = value !== void 0 && value !== null && value !== ''
              ? tabDataList.find(tab => tab.name.value === value)
              : null;

            newTab && scrollToTabEl(newTab.rootRef.value);
          }
        });
      }
      // else if it's a QRouteTab with a valid link
      else {
        // start watching route
        watchRoute();

        if (tabData.routeData.hasRouterLink.value === true) {
          verifyRouteModel();
        }
      }
    }

    function unregisterTab (tabData) {
      tabDataList.splice(tabDataList.indexOf(tabData), 1);
      tabDataListLen.value--;

      recalculateScroll();

      if (unwatchRoute !== void 0 && tabData.routeData !== void 0) {
        // unwatch route if we don't have any QRouteTabs left
        if (tabDataList.every(tab => tab.routeData === void 0) === true) {
          unwatchRoute();
        }

        // then update model
        verifyRouteModel();
      }
    }

    const $tabs = {
      currentModel,
      tabProps,
      hasFocus,
      hasActiveTab,

      registerTab,
      unregisterTab,

      verifyRouteModel,
      updateModel,
      onKbdNavigate,

      avoidRouteWatcher: false // false | string (uid)
    };

    provide(tabsKey, $tabs);

    function cleanup () {
      animateTimer !== null && clearTimeout(animateTimer);
      stopAnimScroll();
      unwatchRoute?.();
    }

    let hadRouteWatcher, hadActivated;

    onBeforeUnmount(cleanup);

    onDeactivated(() => {
      hadRouteWatcher = unwatchRoute !== void 0;
      cleanup();
    });

    onActivated(() => {
      if (hadRouteWatcher === true) {
        watchRoute();
        hadActivated = true;
        verifyRouteModel();
      }

      recalculateScroll();
    });

    return () => {
      return h('div', {
        ref: rootRef,
        class: classes.value,
        role: 'tablist',
        onFocusin,
        onFocusout
      }, [
        h(QResizeObserver, { onResize: updateContainer }),

        h('div', {
          ref: contentRef,
          class: innerClass.value,
          onScroll: updateArrows
        }, hSlot(slots.default)),

        h(__nuxt_component_1$1$1, {
          class: 'q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon'
            + (leftArrow.value === true ? '' : ' q-tabs__arrow--faded'),
          name: props.leftIcon || $q.iconSet.tabs[ props.vertical === true ? 'up' : 'left' ],
          onMousedownPassive: scrollToStart,
          onTouchstartPassive: scrollToStart,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        }),

        h(__nuxt_component_1$1$1, {
          class: 'q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon'
            + (rightArrow.value === true ? '' : ' q-tabs__arrow--faded'),
          name: props.rightIcon || $q.iconSet.tabs[ props.vertical === true ? 'down' : 'right' ],
          onMousedownPassive: scrollToEnd,
          onTouchstartPassive: scrollToEnd,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        })
      ])
    }
  }
});

let id = 0;

const useTabEmits = [ 'click', 'keydown' ];

const useTabProps = {
  icon: String,
  label: [ Number, String ],

  alert: [ Boolean, String ],
  alertIcon: String,

  name: {
    type: [ Number, String ],
    default: () => `t_${ id++ }`
  },

  noCaps: Boolean,

  tabindex: [ String, Number ],
  disable: Boolean,

  contentClass: String,

  ripple: {
    type: [ Boolean, Object ],
    default: true
  }
};

function useTab (props, slots, emit, routeData) {
  const $tabs = inject(tabsKey, emptyRenderFn);
  if ($tabs === emptyRenderFn) {
    console.error('QTab/QRouteTab component needs to be child of QTabs');
    return emptyRenderFn
  }

  const { proxy } = getCurrentInstance();

  const blurTargetRef = ref(null);
  const rootRef = ref(null);
  const tabIndicatorRef = ref(null);

  const ripple = computed(() => (
    props.disable === true || props.ripple === false
      ? false
      : Object.assign(
        { keyCodes: [ 13, 32 ], early: true },
        props.ripple === true ? {} : props.ripple
      )
  ));

  const isActive = computed(() => $tabs.currentModel.value === props.name);

  const classes = computed(() =>
    'q-tab relative-position self-stretch flex flex-center text-center'
    + (
      isActive.value === true
        ? (
            ' q-tab--active'
            + ($tabs.tabProps.value.activeClass ? ' ' + $tabs.tabProps.value.activeClass : '')
            + ($tabs.tabProps.value.activeColor ? ` text-${ $tabs.tabProps.value.activeColor }` : '')
            + ($tabs.tabProps.value.activeBgColor ? ` bg-${ $tabs.tabProps.value.activeBgColor }` : '')
          )
        : ' q-tab--inactive'
    )
    + (props.icon && props.label && $tabs.tabProps.value.inlineLabel === false ? ' q-tab--full' : '')
    + (props.noCaps === true || $tabs.tabProps.value.noCaps === true ? ' q-tab--no-caps' : '')
    + (props.disable === true ? ' disabled' : ' q-focusable q-hoverable cursor-pointer')
    + ('')
  );

  const innerClass = computed(() =>
    'q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable '
    + ($tabs.tabProps.value.inlineLabel === true ? 'row no-wrap q-tab__content--inline' : 'column')
    + (props.contentClass !== void 0 ? ` ${ props.contentClass }` : '')
  );

  const tabIndex = computed(() => (
    (
      props.disable === true
      || $tabs.hasFocus.value === true
      || (isActive.value === false && $tabs.hasActiveTab.value === true)
    )
      ? -1
      : props.tabindex || 0
  ));

  function onClick (e, keyboard) {
    if (keyboard !== true && e?.qAvoidFocus !== true) {
      blurTargetRef.value?.focus();
    }

    if (props.disable === true) {
      return
    }

    // do we have a QTab?
    {
      $tabs.updateModel({ name: props.name });
      emit('click', e);
      return
    }
  }

  function onKeydown (e) {
    if (isKeyCode(e, [ 13, 32 ])) {
      onClick(e, true);
    }
    else if (
      shouldIgnoreKey(e) !== true
      && e.keyCode >= 35
      && e.keyCode <= 40
      && e.altKey !== true
      && e.metaKey !== true
    ) {
      $tabs.onKbdNavigate(e.keyCode, proxy.$el) === true && stopAndPrevent(e);
    }

    emit('keydown', e);
  }

  function getContent () {
    const
      narrow = $tabs.tabProps.value.narrowIndicator,
      content = [],
      indicator = h('div', {
        ref: tabIndicatorRef,
        class: [
          'q-tab__indicator',
          $tabs.tabProps.value.indicatorClass
        ]
      });

    props.icon !== void 0 && content.push(
      h(__nuxt_component_1$1$1, {
        class: 'q-tab__icon',
        name: props.icon
      })
    );

    props.label !== void 0 && content.push(
      h('div', { class: 'q-tab__label' }, props.label)
    );

    props.alert !== false && content.push(
      props.alertIcon !== void 0
        ? h(__nuxt_component_1$1$1, {
          class: 'q-tab__alert-icon',
          color: props.alert !== true
            ? props.alert
            : void 0,
          name: props.alertIcon
        })
        : h('div', {
          class: 'q-tab__alert'
            + (props.alert !== true ? ` text-${ props.alert }` : '')
        })
    );

    narrow === true && content.push(indicator);

    const node = [
      h('div', { class: 'q-focus-helper', tabindex: -1, ref: blurTargetRef }),
      h('div', { class: innerClass.value }, hMergeSlot(slots.default, content))
    ];

    narrow === false && node.push(indicator);

    return node
  }

  const tabData = {
    name: computed(() => props.name),
    rootRef,
    tabIndicatorRef,
    routeData
  };

  onBeforeUnmount(() => {
    $tabs.unregisterTab(tabData);
  });

  onMounted(() => {
    $tabs.registerTab(tabData);
  });

  function renderTab (tag, customData) {
    const data = {
      ref: rootRef,
      class: classes.value,
      tabindex: tabIndex.value,
      role: 'tab',
      'aria-selected': isActive.value === true ? 'true' : 'false',
      'aria-disabled': props.disable === true ? 'true' : void 0,
      onClick,
      onKeydown,
      ...customData
    };

    return withDirectives(
      h(tag, data, getContent()),
      [ [ __q_directive_0, ripple.value ] ]
    )
  }

  return { renderTab, $tabs }
}

const __nuxt_component_19 = createComponent({
  name: 'QTab',

  props: useTabProps,

  emits: useTabEmits,

  setup (props, { slots, emit }) {
    const { renderTab } = useTab(props, slots, emit);
    return () => renderTab('div')
  }
});

const __nuxt_component_23 = createComponent({
  name: 'QSpace',

  setup () {
    const space = h('div', { class: 'q-space' });
    return () => space
  }
});

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    versions: {
      get nuxt() {
        return "4.0.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}
const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray$3(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const __nuxt_page_meta$2 = {
  title: "登入",
  layout: "auth"
};
const __nuxt_page_meta$1 = {
  title: "註冊帳號",
  layout: "auth"
};
const __nuxt_page_meta = {
  title: "表單驗證測試"
};
const _routes = [
  {
    name: "app",
    path: "/app",
    component: () => import('./app-BR90X5Vl.mjs')
  },
  {
    name: "join",
    path: "/join",
    component: () => import('./join-BnyeMg_H.mjs')
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index-COihJBlq.mjs')
  },
  {
    name: "login",
    path: "/login",
    component: () => import('./login-BZ_m6Ih3.mjs')
  },
  {
    name: "register",
    path: "/register",
    component: () => import('./register-koc_ZmXL.mjs')
  },
  {
    name: "auth-login",
    path: "/auth/login",
    meta: __nuxt_page_meta$2 || {},
    component: () => import('./login-BfrQnbO9.mjs')
  },
  {
    name: "info-about",
    path: "/info/about",
    component: () => import('./about-pb29NxIL.mjs')
  },
  {
    name: "info-guide",
    path: "/info/guide",
    component: () => import('./guide-a9T8HuD8.mjs')
  },
  {
    name: "info-safety",
    path: "/info/safety",
    component: () => import('./safety-CfD6_qb-.mjs')
  },
  {
    name: "content-blog",
    path: "/content/blog",
    component: () => import('./blog-CCiHgA0A.mjs')
  },
  {
    name: "info-pricing",
    path: "/info/pricing",
    component: () => import('./pricing-Bfd-IxeZ.mjs')
  },
  {
    name: "info-subsidy",
    path: "/info/subsidy",
    component: () => import('./subsidy-DPbebMeR.mjs')
  },
  {
    name: "auth-register",
    path: "/auth/register",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./register-DiyoBo0f.mjs')
  },
  {
    name: "booking-match",
    path: "/booking/match",
    component: () => import('./match-nRYqmw7n.mjs')
  },
  {
    name: "demo-api-demo",
    path: "/demo/api-demo",
    component: () => import('./api-demo-s-SJgUt5.mjs')
  },
  {
    name: "info-services",
    path: "/info/services",
    component: () => import('./services-DHoOeF9X.mjs')
  },
  {
    name: "user-dashboard",
    path: "/user/dashboard",
    meta: { "middleware": "auth" },
    component: () => import('./dashboard-DbGBw-ab.mjs')
  },
  {
    name: "caregivers-id",
    path: "/caregivers/:id()",
    component: () => import('./_id_-KP0Rlb9g.mjs')
  },
  {
    name: "info-advantages",
    path: "/info/advantages",
    component: () => import('./advantages-MGcE-jqa.mjs')
  },
  {
    name: "support-contact",
    path: "/support/contact",
    component: () => import('./contact-B2-RJInm.mjs')
  },
  {
    name: "support-reviews",
    path: "/support/reviews",
    component: () => import('./reviews-BVXCjHu1.mjs')
  },
  {
    name: "booking-payments",
    path: "/booking/payments",
    component: () => import('./payments-Cjvs84ig.mjs')
  },
  {
    name: "booking-schedule",
    path: "/booking/schedule",
    component: () => import('./schedule-ByuWCJAi.mjs')
  },
  {
    name: "caregivers",
    path: "/caregivers",
    component: () => import('./index-3WDe5_HN.mjs')
  },
  {
    name: "caregivers-search",
    path: "/caregivers/search",
    component: () => import('./search-DSwdYJvE.mjs')
  },
  {
    name: "content-resources",
    path: "/content/resources",
    component: () => import('./resources-CqnBXEy8.mjs')
  },
  {
    name: "booking-calculator",
    path: "/booking/calculator",
    component: () => import('./calculator-8oNAkVgO.mjs')
  },
  {
    name: "demo-form-validation",
    path: "/demo/form-validation",
    meta: __nuxt_page_meta || {},
    component: () => import('./form-validation-CjKqGVVg.mjs')
  },
  {
    name: "demo-responsive-test",
    path: "/demo/responsive-test",
    component: () => import('./responsive-test-20B5x1qX.mjs')
  }
];
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {
  auth: () => import('./auth-DL5PxFsA.mjs'),
  caregiver: () => import('./caregiver-BgtyEwuC.mjs'),
  patient: () => import('./patient-Bdr08n39.mjs')
};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      if (to.matched[0]?.components?.default === from.matched[0]?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    useError();
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$3(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from) => {
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || useNuxtApp();
  return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      const head = inject(headSymbol);
      if (!head) {
        throw new Error("[nuxt] [unhead] Missing Unhead instance.");
      }
      return head;
    }
  });
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  return useHead$1(input, { head, ...options });
}
function useSeoMeta(input, options = {}) {
  const head = injectHead(options.nuxt);
  return useSeoMeta$1(input, { head, ...options });
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function prerenderRoutes(path) {
  {
    return;
  }
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse$1(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
function useRequestURL(opts) {
  {
    return getRequestURL(useRequestEvent(), opts);
  }
}
const inlineConfig = {
  "nuxt": {}
};
const __appConfig = /* @__PURE__ */ defuFn(inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  nuxtApp._appConfig ||= klona(__appConfig);
  return nuxtApp._appConfig;
}
const _0_siteConfig_hxpx9TAykM4St_ybsPIAJmhOKQmae5Yd749dL71wvC8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-site-config:init",
  enforce: "pre",
  async setup(nuxtApp) {
    const state = useState("site-config");
    {
      const context = useRequestEvent()?.context;
      nuxtApp.hooks.hook("app:rendered", () => {
        state.value = context?.siteConfig.get({
          debug: (/* @__PURE__ */ useRuntimeConfig())["nuxt-site-config"].debug,
          resolveRefs: true
        });
      });
    }
    let stack = {};
    return {
      provide: {
        nuxtSiteConfig: stack
      }
    };
  }
});
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject$1(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && true) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = Symbol();
const ACTION_NAME = Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: assign$1 } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (true)) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign$1(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$1({ actions: {} }, options);
  const $subscribeOptions = { deep: true };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (true)) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$1($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign$1({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = action(prop, key);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign$1(store, setupStore);
    assign$1(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign$1($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign$1(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    setActivePinia(pinia);
    {
      nuxtApp.payload.pinia = pinia.state.value;
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
function updateSiteConfig(input = {}) {
  {
    const stack = useRequestEvent().context.siteConfig;
    stack.push(input);
    return;
  }
}
function useSiteConfig(options) {
  let stack;
  stack = useRequestEvent().context.siteConfig.get(defu({ resolveRefs: true }, options));
  return stack || {};
}
const i18n_server_kXMsyxD0I5ArdLQ73Kb_ZqlgxXisaFw4mZSmiieMDUA = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-site-config:i18n",
  // @ts-expect-error untyped
  dependsOn: ["i18n:plugin"],
  setup(nuxtApp) {
    const i18n = nuxtApp.$i18n;
    if (!i18n)
      return;
    useSiteConfig().url;
    try {
      const url = parseURL(i18n.baseUrl.value);
      if (false) ;
    } catch {
    }
    updateSiteConfig({
      _priority: -1,
      _context: "@nuxtjs/i18n",
      url: void 0,
      // @ts-expect-error untyped
      currentLocale: i18n.locale,
      // @ts-expect-error untyped
      description: computed(() => i18n.te("nuxtSiteConfig.description") ? i18n.t("nuxtSiteConfig.description") : void 0),
      // @ts-expect-error untyped
      name: computed(() => i18n.te("nuxtSiteConfig.name") ? i18n.t("nuxtSiteConfig.name") : void 0)
    });
  }
});
const componentsWithDefaults = { QBtn: __nuxt_component_3, QInput: __nuxt_component_4$1 };
const appConfigKey = "nuxtQuasar";
const quasarNuxtConfig = {
  lang,
  iconSet,
  components: { "defaults": { "QBtn": { "dense": true, "unelevated": true }, "QInput": { "outlined": true, "dense": true } } },
  plugins: { Notify, Dialog, Loading: Plugin },
  config: { "brand": { "primary": "#1976D2", "secondary": "#26A69A", "accent": "#9C27B0", "positive": "#21BA45", "negative": "#C10015", "info": "#31CCEC", "warning": "#F2C037" }, "notify": { "position": "top-right", "timeout": 3e3 }, "loading": { "delay": 400 } }
};
function omit(object, keys) {
  return Object.keys(object).reduce((output, key) => {
    if (!keys.includes(key)) {
      output[key] = object[key];
    }
    return output;
  }, {});
}
const plugin_L8UGadL0X0unLMI5Gais2tVmEbRW3rkathO0Vxyij4E = /* @__PURE__ */ defineNuxtPlugin((nuxt) => {
  const quasarAppConfig = useAppConfig()[appConfigKey];
  const { lang: lang2, iconSet: iconSet2, plugins: plugins2, components } = quasarNuxtConfig;
  let ssrContext;
  let quasarProxy;
  let config = defuFn(quasarAppConfig, omit(quasarNuxtConfig.config || {}, ["brand"]));
  {
    const BRAND_RE = /--q-[\w-]+:.+?;/g;
    const meta = reactive({
      bodyClasses: "",
      htmlAttrs: "",
      endingHeadTags: ""
    });
    const htmlAttrsRecord = computed(
      () => Object.fromEntries(
        meta.htmlAttrs.split(" ").map((attr) => attr.split("="))
      )
    );
    const bodyStyles = computed(() => {
      return [...meta.endingHeadTags.matchAll(BRAND_RE)].map((match) => match[0]).join("");
    });
    useHead(
      computed(() => ({
        bodyAttrs: {
          class: meta.bodyClasses,
          style: bodyStyles.value
        },
        htmlAttrs: htmlAttrsRecord.value
      }))
    );
    ssrContext = {
      req: nuxt.ssrContext.event.node.req,
      res: nuxt.ssrContext.event.node.res
    };
    quasarProxy = {
      install({ ssrContext: ssrContext2 }) {
        meta.bodyClasses = ssrContext2._meta.bodyClasses;
        meta.htmlAttrs = ssrContext2._meta.htmlAttrs;
        meta.endingHeadTags = ssrContext2._meta.endingHeadTags;
        ssrContext2._meta = new Proxy({}, {
          get(target, key) {
            return meta[key] ?? target[key];
          },
          set(target, key, value) {
            if (typeof meta[key] === "string") {
              meta[key] = value;
            } else {
              target[key] = value;
            }
            return true;
          }
        });
      }
    };
  }
  nuxt.vueApp.use(Quasar, {
    lang: lang2,
    iconSet: iconSet2,
    plugins: {
      quasarProxy,
      ...plugins2
    },
    config
    // @ts-expect-error Private Argument
  }, ssrContext);
  const quasar = useQuasar();
  const asDefault = (value) => value && typeof value === "object" ? () => value : value;
  for (const [name, propDefaults] of Object.entries(components.defaults || {})) {
    const component = componentsWithDefaults[name];
    for (const [propName, defaultValue] of Object.entries(propDefaults)) {
      const propConfig = component.props[propName];
      if (Array.isArray(propConfig) || typeof propConfig === "function") {
        component.props[propName] = {
          type: propConfig,
          default: asDefault(defaultValue)
        };
      } else if (typeof propConfig === "object") {
        if (propConfig) {
          propConfig.default = asDefault(defaultValue);
        } else {
          component.props[propName] = {
            default: asDefault(defaultValue)
          };
        }
      } else {
        throw new TypeError(`Unexpected prop definition type used at ${name}.props.${propName}, please open an issue.`);
      }
    }
  }
  return {
    provide: {
      q: quasar
    }
  };
});
/*!
  * shared v11.1.11
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
const assign = Object.assign;
const _create = Object.create;
const create = (obj = null) => _create(obj);
function escapeHtml(rawText) {
  return rawText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function escapeAttributeValue(value) {
  return value.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function sanitizeTranslatedHtml(html) {
  html = html.replace(/(\w+)\s*=\s*"([^"]*)"/g, (_, attrName, attrValue) => `${attrName}="${escapeAttributeValue(attrValue)}"`);
  html = html.replace(/(\w+)\s*=\s*'([^']*)'/g, (_, attrName, attrValue) => `${attrName}='${escapeAttributeValue(attrValue)}'`);
  const eventHandlerPattern = /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi;
  if (eventHandlerPattern.test(html)) {
    html = html.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3");
  }
  const javascriptUrlPattern = [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ];
  javascriptUrlPattern.forEach((pattern) => {
    html = html.replace(pattern, "$1javascript&#58;");
  });
  return html;
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join(items, separator2 = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator2 + item, "");
}
const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw new Error("Invalid value");
  }
  const stack = [{ src, des }];
  while (stack.length) {
    const { src: src2, des: des2 } = stack.pop();
    Object.keys(src2).forEach((key) => {
      if (key === "__proto__") {
        return;
      }
      if (isObject(src2[key]) && !isObject(des2[key])) {
        des2[key] = Array.isArray(src2[key]) ? [] : create();
      }
      if (isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key])) {
        des2[key] = src2[key];
      } else {
        stack.push({ src: src2[key], des: des2[key] });
      }
    });
  }
}
function localeHead$1(options, currentLanguage = options.getCurrentLanguage(), currentDirection = options.getCurrentDirection()) {
  const metaObject = {
    htmlAttrs: {},
    link: [],
    meta: []
  };
  if (options.dir) {
    metaObject.htmlAttrs.dir = currentDirection;
  }
  if (options.lang && currentLanguage) {
    metaObject.htmlAttrs.lang = currentLanguage;
  }
  if (options.seo) {
    const alternateLinks = getHreflangLinks(options);
    metaObject.link = metaObject.link.concat(
      alternateLinks,
      getCanonicalLink(options)
    );
    metaObject.meta = metaObject.meta.concat(
      getOgUrl(options),
      getCurrentOgLocale(options),
      getAlternateOgLocales(
        options,
        options.locales.map((x) => x.language || x.code)
      )
    );
  }
  return metaObject;
}
function createLocaleMap(locales) {
  const localeMap = /* @__PURE__ */ new Map();
  for (const locale of locales) {
    if (!locale.language) {
      console.warn("Locale `language` ISO code is required to generate alternate link");
      continue;
    }
    const [language, region] = locale.language.split("-");
    if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) {
      localeMap.set(language, locale);
    }
    localeMap.set(locale.language, locale);
  }
  return localeMap;
}
function getHreflangLinks(options) {
  if (!options.hreflangLinks) return [];
  const links = [];
  const localeMap = createLocaleMap(options.locales);
  for (const [language, locale] of localeMap.entries()) {
    const link = getHreflangLink(language, locale, options);
    if (!link) continue;
    links.push(link);
    if (options.defaultLocale && options.defaultLocale === locale.code && links[0].hreflang !== "x-default") {
      links.unshift(
        { [options.key]: "i18n-xd", rel: "alternate", href: link.href, hreflang: "x-default" }
      );
    }
  }
  return links;
}
function getHreflangLink(language, locale, options, routeWithoutQuery = options.strictCanonicals ? options.getRouteWithoutQuery() : void 0) {
  const localePath2 = options.getLocalizedRoute(locale.code, routeWithoutQuery);
  if (!localePath2) return void 0;
  const href = withQuery(
    hasProtocol(localePath2) ? localePath2 : joinURL(options.baseUrl, localePath2),
    options.strictCanonicals ? getCanonicalQueryParams(options) : {}
  );
  return { [options.key]: `i18n-alt-${language}`, rel: "alternate", href, hreflang: language };
}
function getCanonicalUrl(options, route = options.getCurrentRoute()) {
  const currentRoute = options.getLocaleRoute(
    Object.assign({}, route, { path: void 0, name: options.getRouteBaseName(route) })
  );
  if (!currentRoute) return "";
  return withQuery(joinURL(options.baseUrl, currentRoute.path), getCanonicalQueryParams(options));
}
function getCanonicalLink(options, href = getCanonicalUrl(options)) {
  if (!href) return [];
  return [{ [options.key]: "i18n-can", rel: "canonical", href }];
}
function getCanonicalQueryParams(options, route = options.getCurrentRoute()) {
  const currentRoute = options.getLocaleRoute(
    Object.assign({}, route, { path: void 0, name: options.getRouteBaseName(route) })
  );
  const currentRouteQuery = currentRoute?.query ?? {};
  const params = {};
  for (const param of options.canonicalQueries.filter((x) => x in currentRouteQuery)) {
    params[param] ??= [];
    for (const val of toArray$1(currentRouteQuery[param])) {
      params[param].push(val || "");
    }
  }
  return params;
}
function getOgUrl(options, href = getCanonicalUrl(options)) {
  if (!href) return [];
  return [
    { [options.key]: "i18n-og-url", property: "og:url", content: href }
  ];
}
function getCurrentOgLocale(options, currentLanguage = options.getCurrentLanguage()) {
  if (!currentLanguage) return [];
  return [
    { [options.key]: "i18n-og", property: "og:locale", content: formatOgLanguage(currentLanguage) }
  ];
}
function getAlternateOgLocales(options, languages, currentLanguage = options.getCurrentLanguage()) {
  const alternateLocales = languages.filter((locale) => locale && locale !== currentLanguage);
  return alternateLocales.map(
    (locale) => ({
      [options.key]: `i18n-og-alt-${locale}`,
      property: "og:locale:alternate",
      content: formatOgLanguage(locale)
    })
  );
}
function formatOgLanguage(val = "") {
  return val.replace(/-/g, "_");
}
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
function localePath(ctx, route, locale = ctx.getLocale()) {
  if (isString(route) && hasProtocol(route, { acceptRelative: true })) {
    return route;
  }
  try {
    return resolveRoute(ctx, route, locale).fullPath;
  } catch {
    return "";
  }
}
function localeRoute(ctx, route, locale = ctx.getLocale()) {
  try {
    return resolveRoute(ctx, route, locale);
  } catch {
    return;
  }
}
function normalizeRawLocation(route) {
  if (!isString(route)) {
    return assign({}, route);
  }
  if (route[0] === "/") {
    const { pathname: path, search, hash } = parsePath(route);
    return { path, query: parseQuery(search), hash };
  }
  return { name: route };
}
function resolveRoute(ctx, route, locale) {
  const normalized = normalizeRawLocation(route);
  const resolved = ctx.router.resolve(ctx.resolveLocalizedRouteObject(normalized, locale));
  if (resolved.name) {
    return resolved;
  }
  return ctx.router.resolve(route);
}
function switchLocalePath(ctx, locale, route = ctx.router.currentRoute.value) {
  const name = ctx.getRouteBaseName(route);
  if (!name) {
    return "";
  }
  const routeCopy = {
    name,
    params: assign({}, route.params, ctx.getLocalizedDynamicParams(locale)),
    fullPath: route.fullPath,
    query: route.query,
    hash: route.hash,
    path: route.path,
    meta: route.meta
  };
  const path = localePath(ctx, routeCopy, locale);
  return ctx.afterSwitchLocalePath(path, locale);
}
function createHeadContext(ctx, config, locale = ctx.getLocale(), locales = ctx.getLocales(), baseUrl = ctx.getBaseUrl()) {
  const currentLocale = locales.find((l) => l.code === locale) || {};
  const canonicalQueries = typeof config.seo === "object" && config.seo?.canonicalQueries || [];
  if (!baseUrl && true && true) {
    console.warn("I18n `baseUrl` is required to generate valid SEO tag links.");
  }
  return {
    ...config,
    key: "id",
    locales,
    baseUrl,
    canonicalQueries,
    hreflangLinks: ctx.routingOptions.hreflangLinks,
    defaultLocale: ctx.routingOptions.defaultLocale,
    strictCanonicals: ctx.routingOptions.strictCanonicals,
    getRouteBaseName: ctx.getRouteBaseName,
    getCurrentRoute: () => ctx.router.currentRoute.value,
    getCurrentLanguage: () => currentLocale.language,
    getCurrentDirection: () => currentLocale.dir || "ltr",
    getLocaleRoute: (route) => localeRoute(ctx, route),
    getLocalizedRoute: (locale2, route) => switchLocalePath(ctx, locale2, route),
    getRouteWithoutQuery: () => {
      try {
        return assign({}, ctx.router.resolve({ query: {} }), { meta: ctx.router.currentRoute.value.meta });
      } catch {
        return void 0;
      }
    }
  };
}
function localeHead(ctx, { dir = true, lang: lang2 = true, seo = true }) {
  return localeHead$1(createHeadContext(ctx, { dir, lang: lang2, seo }));
}
function _useLocaleHead(ctx, options) {
  const metaObject = ref(localeHead$1(createHeadContext(ctx, options)));
  return metaObject;
}
const separator = "___";
function normalizeRouteName(routeName) {
  if (typeof routeName === "string") return routeName;
  if (routeName != null) return routeName.toString();
  return "";
}
function getRouteBaseName(route) {
  return normalizeRouteName(typeof route === "object" ? route?.name : route).split(separator)[0];
}
const pathLanguageParser = createPathIndexLanguageParser(0);
const getLocaleFromRoutePath = (path) => pathLanguageParser(path);
const getLocaleFromRouteName = (name) => name.split(separator).at(1) ?? "";
function normalizeInput(input) {
  return typeof input !== "object" ? String(input) : String(input?.name || input?.path || "");
}
function getLocaleFromRoute(route) {
  const input = normalizeInput(route);
  return input[0] === "/" ? getLocaleFromRoutePath(input) : getLocaleFromRouteName(input);
}
function createLocaleRouteNameGetter(defaultLocale) {
  {
    return (routeName) => normalizeRouteName(routeName);
  }
}
function createLocalizedRouteByPathResolver(router) {
  {
    return (route) => route;
  }
}
const localeCodes = [
  "en",
  "zh"
];
const localeLoaders = {
  en: [
    {
      key: "locale_en_46json_ebbab604",
      load: () => import(
        './en-CDz1zlqs.mjs'
        /* webpackChunkName: "locale_en_46json_ebbab604" */
      ),
      cache: true
    }
  ],
  zh: [
    {
      key: "locale_zh_46json_18c173f2",
      load: () => import(
        './zh-BDvfvcr3.mjs'
        /* webpackChunkName: "locale_zh_46json_18c173f2" */
      ),
      cache: true
    }
  ]
};
const vueI18nConfigs = [];
const normalizedLocales = [
  {
    code: "en",
    language: "en",
    name: "English",
    iso: "en"
  },
  {
    code: "zh",
    language: "zh-TW",
    name: "中文",
    iso: "zh-TW"
  }
];
const cacheMessages = /* @__PURE__ */ new Map();
async function loadVueI18nOptions(vueI18nConfigs2) {
  const nuxtApp = useNuxtApp();
  const vueI18nOptions = { messages: {} };
  for (const configFile of vueI18nConfigs2) {
    const resolver = await configFile().then((x) => x.default);
    const resolved = isFunction(resolver) ? await nuxtApp.runWithContext(() => resolver()) : resolver;
    deepCopy(resolved, vueI18nOptions);
  }
  vueI18nOptions.fallbackLocale ??= false;
  return vueI18nOptions;
}
const isModule = (val) => toTypeString(val) === "[object Module]";
const isResolvedModule = (val) => isModule(val) || true;
async function getLocaleMessages$1(locale, loader) {
  const nuxtApp = useNuxtApp();
  try {
    const getter = await nuxtApp.runWithContext(loader.load).then((x) => isResolvedModule(x) ? x.default : x);
    return isFunction(getter) ? await nuxtApp.runWithContext(() => getter(locale)) : getter;
  } catch (e) {
    throw new Error(`Failed loading locale (${locale}): ` + e.message);
  }
}
async function getLocaleMessagesMergedCached(locale, loaders = []) {
  const nuxtApp = useNuxtApp();
  const merged = {};
  for (const loader of loaders) {
    const cached = getCachedMessages(loader);
    const messages = cached || await nuxtApp.runWithContext(async () => await getLocaleMessages$1(locale, loader));
    if (!cached && loader.cache !== false) {
      cacheMessages.set(loader.key, { ttl: Date.now() + 86400 * 1e3, value: messages });
    }
    deepCopy(messages, merged);
  }
  return merged;
}
function getCachedMessages(loader) {
  if (loader.cache === false) return;
  const cache2 = cacheMessages.get(loader.key);
  if (cache2 == null) return;
  return cache2.ttl > Date.now() ? cache2.value : void 0;
}
function getI18nTarget(i18n) {
  return i18n != null && "global" in i18n && "mode" in i18n ? i18n.global : i18n;
}
function getComposer$3(i18n) {
  const target = getI18nTarget(i18n);
  return "__composer" in target ? target.__composer : target;
}
function useRuntimeI18n(nuxtApp) {
  if (!nuxtApp) {
    return (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  }
  return nuxtApp.$config.public.i18n;
}
function useI18nDetection(nuxtApp) {
  const detectBrowserLanguage = useRuntimeI18n(nuxtApp).detectBrowserLanguage;
  const detect = detectBrowserLanguage || {};
  return {
    ...detect,
    enabled: !!detectBrowserLanguage,
    cookieKey: detect.cookieKey || "i18n_redirected"
  };
}
function resolveRootRedirect(config) {
  if (!config) return void 0;
  return {
    path: "/" + (isString(config) ? config : config.path).replace(/^\//, ""),
    code: !isString(config) && config.statusCode || 302
  };
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function matchDomainLocale(locales, host, pathLocale) {
  const normalizeDomain = (domain = "") => domain.replace(/https?:\/\//, "");
  const matches = locales.filter(
    (locale) => normalizeDomain(locale.domain) === host || toArray(locale.domains).includes(host)
  );
  if (matches.length <= 1) {
    return matches[0]?.code;
  }
  return (
    // match by current path locale
    matches.find((l) => l.code === pathLocale)?.code || // fallback to default locale for the domain
    matches.find((l) => l.defaultForDomains?.includes(host) ?? l.domainDefault)?.code
  );
}
function domainFromLocale(domainLocales, url, locale) {
  const lang2 = normalizedLocales.find((x) => x.code === locale);
  const domain = domainLocales?.[locale]?.domain || lang2?.domain || lang2?.domains?.find((v) => v === url.host);
  if (!domain) {
    return;
  }
  if (hasProtocol(domain, { strict: true })) {
    return domain;
  }
  return url.protocol + "//" + domain;
}
function getDefaultLocaleForDomain(host) {
  return normalizedLocales.find((l) => !!l.defaultForDomains?.includes(host))?.code;
}
const isSupportedLocale = (locale) => localeCodes.includes(locale || "");
const resolveSupportedLocale = (locale) => isSupportedLocale(locale) ? locale : void 0;
const useLocaleConfigs = () => useState(
  "i18n:cached-locale-configs",
  () => void 0
);
const useResolvedLocale = () => useState("i18n:resolved-locale", () => "");
function useI18nCookie({ cookieCrossOrigin, cookieDomain, cookieSecure, cookieKey }) {
  const date = /* @__PURE__ */ new Date();
  return useCookie(cookieKey, {
    path: "/",
    readonly: false,
    expires: new Date(date.setDate(date.getDate() + 365)),
    sameSite: cookieCrossOrigin ? "none" : "lax",
    domain: cookieDomain || void 0,
    secure: cookieCrossOrigin || cookieSecure
  });
}
function createNuxtI18nContext(nuxt, vueI18n, defaultLocale) {
  const i18n = getI18nTarget(vueI18n);
  const runtimeI18n = useRuntimeI18n(nuxt);
  const detectConfig = useI18nDetection(nuxt);
  const serverLocaleConfigs = useLocaleConfigs();
  const localeCookie = useI18nCookie(detectConfig);
  const getLocaleConfig = (locale) => serverLocaleConfigs.value[locale];
  const getDomainFromLocale = (locale) => domainFromLocale(runtimeI18n.domainLocales, useRequestURL({ xForwardedHost: true }), locale);
  const baseUrl = createBaseUrlGetter(nuxt, runtimeI18n.baseUrl);
  const resolvedLocale = useResolvedLocale();
  if (nuxt.ssrContext?.event?.context?.nuxtI18n?.detectLocale) {
    resolvedLocale.value = nuxt.ssrContext.event.context.nuxtI18n.detectLocale;
  }
  const loadMessagesFromClient = async (locale) => {
    const locales = getLocaleConfig(locale)?.fallbacks ?? [];
    if (!locales.includes(locale)) locales.push(locale);
    for (const k of locales) {
      const msg = await nuxt.runWithContext(() => getLocaleMessagesMergedCached(k, localeLoaders[k]));
      i18n.mergeLocaleMessage(k, msg);
    }
  };
  const loadMessagesFromServer = async (locale) => {
    if (locale in localeLoaders === false) return;
    const headers = getLocaleConfig(locale)?.cacheable ? {} : { "Cache-Control": "no-cache" };
    const messages = await $fetch(`/_i18n/${locale}/messages.json`, { headers });
    for (const k of Object.keys(messages)) {
      i18n.mergeLocaleMessage(k, messages[k]);
    }
  };
  const ctx = {
    vueI18n,
    initial: true,
    preloaded: false,
    config: runtimeI18n,
    rootRedirect: resolveRootRedirect(runtimeI18n.rootRedirect),
    redirectStatusCode: runtimeI18n.redirectStatusCode ?? 302,
    dynamicResourcesSSG: false,
    getDefaultLocale: () => defaultLocale,
    getLocale: () => unref(i18n.locale),
    setLocale: async (locale) => {
      const oldLocale = ctx.getLocale();
      if (locale === oldLocale || !isSupportedLocale(locale)) return;
      if (isRef(i18n.locale)) {
        i18n.locale.value = locale;
      } else {
        i18n.locale = locale;
      }
      await nuxt.callHook("i18n:localeSwitched", { newLocale: locale, oldLocale });
      resolvedLocale.value = locale;
    },
    setLocaleSuspend: async (locale) => {
      if (!isSupportedLocale(locale)) return;
      ctx.vueI18n.__pendingLocale = locale;
      ctx.vueI18n.__pendingLocalePromise = new Promise((resolve) => {
        ctx.vueI18n.__resolvePendingLocalePromise = async () => {
          ctx.setCookieLocale(locale);
          await ctx.setLocale(locale);
          ctx.vueI18n.__pendingLocale = void 0;
          resolve();
        };
      });
      {
        await ctx.vueI18n.__resolvePendingLocalePromise?.();
      }
    },
    getLocales: () => unref(i18n.locales).map((x) => isString(x) ? { code: x } : x),
    setCookieLocale: (locale) => {
      if (detectConfig.useCookie && isSupportedLocale(locale)) {
        localeCookie.value = locale;
      }
    },
    getBaseUrl: (locale) => {
      if (locale) {
        return joinURL(getDomainFromLocale(locale) || baseUrl(), nuxt.$config.app.baseURL);
      }
      return joinURL(baseUrl(), nuxt.$config.app.baseURL);
    },
    loadMessages: async (locale) => {
      try {
        return ctx.dynamicResourcesSSG || false ? await loadMessagesFromClient(locale) : await loadMessagesFromServer(locale);
      } catch (e) {
        console.warn(`Failed to load messages for locale "${locale}"`, e);
      }
    },
    composableCtx: void 0
  };
  ctx.composableCtx = createComposableContext(ctx, nuxt);
  return ctx;
}
function useNuxtI18nContext(nuxt) {
  if (nuxt._nuxtI18n == null) {
    throw new Error("Nuxt I18n context has not been set up yet.");
  }
  return nuxt._nuxtI18n;
}
function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l) => l.language?.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length });
      break;
    }
  }
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l) => l.language?.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
function findBrowserLocale(locales, browserLocales) {
  const matchedLocales = matchBrowserLocale(
    locales.map((l) => ({ code: l.code, language: l.language || l.code })),
    browserLocales
  );
  return matchedLocales.sort(compareBrowserLocale).at(0)?.code ?? "";
}
const getCookieLocale = (event, cookieName) => {
  const cookieValue = getRequestHeader(event, "cookie") || "";
  return parse$1(cookieValue)[cookieName];
};
const getRouteLocale = (event, route) => getLocaleFromRoute(route);
const getHeaderLocale = (event) => {
  return findBrowserLocale(normalizedLocales, parseAcceptLanguage(getRequestHeader(event, "accept-language") || ""));
};
const getHostLocale = (event, path, domainLocales) => {
  const host = getRequestURL(event, { xForwardedHost: true }).host;
  const locales = normalizedLocales.map((l) => ({
    ...l,
    domain: domainLocales[l.code]?.domain ?? l.domain
  }));
  return matchDomainLocale(locales, host, getLocaleFromRoutePath(path));
};
const useDetectors = (event, config, nuxtApp) => {
  if (!event) {
    throw new Error("H3Event is required for server-side locale detection");
  }
  const runtimeI18n = useRuntimeI18n(nuxtApp);
  return {
    cookie: () => getCookieLocale(event, config.cookieKey),
    header: () => getHeaderLocale(event),
    navigator: () => void 0,
    host: (path) => getHostLocale(event, path, runtimeI18n.domainLocales),
    route: (path) => getRouteLocale(event, path)
  };
};
const isRouteLocationPathRaw = (val) => !!val.path && !val.name;
function useComposableContext(nuxtApp) {
  const context = nuxtApp?._nuxtI18n?.composableCtx;
  if (!context) {
    throw new Error(
      "i18n context is not initialized. Ensure the i18n plugin is installed and the composable is used within a Vue component or setup function."
    );
  }
  return context;
}
const formatTrailingSlash = withoutTrailingSlash;
function createComposableContext(ctx, nuxtApp = useNuxtApp()) {
  const router = useRouter();
  useDetectors(useRequestEvent(), useI18nDetection(nuxtApp), nuxtApp);
  const defaultLocale = ctx.getDefaultLocale();
  const getLocalizedRouteName = createLocaleRouteNameGetter();
  function resolveLocalizedRouteByName(route, locale) {
    route.name ||= getRouteBaseName(router.currentRoute.value);
    const localizedName = getLocalizedRouteName(route.name, locale);
    if (router.hasRoute(localizedName)) {
      route.name = localizedName;
    }
    return route;
  }
  const routeByPathResolver = createLocalizedRouteByPathResolver();
  function resolveLocalizedRouteByPath(input, locale) {
    const route = routeByPathResolver(input, locale);
    const baseName = getRouteBaseName(route);
    if (baseName) {
      route.name = getLocalizedRouteName(baseName, locale);
      return route;
    }
    route.path = formatTrailingSlash(route.path, true);
    return route;
  }
  const composableCtx = {
    router,
    head: useHead({}),
    metaState: { htmlAttrs: {}, meta: [], link: [] },
    seoSettings: {
      dir: false,
      lang: false,
      seo: false
    },
    localePathPayload: getLocalePathPayload(),
    routingOptions: {
      defaultLocale,
      strictCanonicals: ctx.config.experimental.alternateLinkCanonicalQueries ?? true,
      hreflangLinks: false
    },
    getLocale: ctx.getLocale,
    getLocales: ctx.getLocales,
    getBaseUrl: ctx.getBaseUrl,
    getRouteBaseName,
    getRouteLocalizedParams: () => router.currentRoute.value.meta["nuxtI18nInternal"] ?? {},
    getLocalizedDynamicParams: (locale) => {
      return composableCtx.getRouteLocalizedParams()?.[locale];
    },
    afterSwitchLocalePath: (path, locale) => {
      composableCtx.getRouteLocalizedParams();
      return path;
    },
    resolveLocalizedRouteObject: (route, locale) => {
      return isRouteLocationPathRaw(route) ? resolveLocalizedRouteByPath(route, locale) : resolveLocalizedRouteByName(route, locale);
    }
  };
  return composableCtx;
}
function getLocalePathPayload(nuxtApp = useNuxtApp()) {
  return JSON.parse("{}");
}
async function loadAndSetLocale(nuxtApp, locale) {
  const ctx = useNuxtI18nContext(nuxtApp);
  const oldLocale = ctx.getLocale();
  if (locale === oldLocale && !ctx.initial) {
    return locale;
  }
  const data = { oldLocale, newLocale: locale, initialSetup: ctx.initial, context: nuxtApp };
  let override = await nuxtApp.callHook("i18n:beforeLocaleSwitch", data);
  if (override != null && false) {
    console.warn("[nuxt-i18n] Do not return in `i18n:beforeLocaleSwitch`, mutate `data.newLocale` instead.");
  }
  override ??= data.newLocale;
  if (isSupportedLocale(override)) {
    locale = override;
  }
  await ctx.loadMessages(locale);
  await ctx.setLocaleSuspend(locale);
  return locale;
}
function skipDetect(detect, path, pathLocale) {
  {
    return false;
  }
}
function detectLocale(nuxtApp, route) {
  const detectConfig = useI18nDetection(nuxtApp);
  const detectors = useDetectors(useRequestEvent(nuxtApp), detectConfig, nuxtApp);
  const ctx = useNuxtI18nContext(nuxtApp);
  const path = isString(route) ? route : route.path;
  function* detect() {
    if (ctx.initial && detectConfig.enabled && !skipDetect(detectConfig, path, detectors.route(path))) {
      yield detectors.cookie();
      yield detectors.header();
      yield detectors.navigator();
      yield detectConfig.fallbackLocale;
    }
  }
  for (const detected of detect()) {
    if (detected && isSupportedLocale(detected)) {
      return detected;
    }
  }
  return ctx.getLocale() || ctx.getDefaultLocale() || "";
}
function navigate(nuxtApp, to, locale) {
  return;
}
function createBaseUrlGetter(nuxt, baseUrl, defaultLocale, getDomainFromLocale) {
  if (isFunction(baseUrl)) {
    return () => baseUrl(nuxt);
  }
  return () => {
    return baseUrl ?? "";
  };
}
/*!
  * message-compiler v11.1.11
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  return loc;
}
const CompileErrorCodes = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14};
const COMPILE_ERROR_CODES_EXTEND_POINT = 17;
function createCompileError(code, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = code;
  const error = new SyntaxError(String(msg));
  error.code = code;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF;
  const isLF = (index2) => _buf[index2] === CHAR_LF;
  const isPS = (index2) => _buf[index2] === CHAR_PS;
  const isLS = (index2) => _buf[index2] === CHAR_LS;
  const isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2);
  const index = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const DOT = ".";
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 13,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 13,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(
    context2,
    13
    /* TokenTypes.EOF */
  );
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 7) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 7 || currentType === 11)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isTextStart(scnr, false);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "") => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return hasSpace;
      } else if (ch === "@" || !ch) {
        return hasSpace;
      } else if (ch === "|") {
        return !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function isIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36;
  }
  function takeIdentifierChar(scnr) {
    return takeChar(scnr, isIdentifier);
  }
  function isNamedIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36 || // $
    cc === 45;
  }
  function takeNamedIdentifierChar(scnr) {
    return takeChar(scnr, isNamedIdentifier);
  }
  function isDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function takeDigit(scnr) {
    return takeChar(scnr, isDigit);
  }
  function isHexDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57 || // 0-9
    cc >= 65 && cc <= 70 || // A-F
    cc >= 97 && cc <= 102;
  }
  function takeHexDigit(scnr) {
    return takeChar(scnr, isHexDigit);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeNamedIdentifierChar(scnr)) {
      name += ch;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function isLiteral2(ch) {
    return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    while (ch = takeChar(scnr, isLiteral2)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i = 0; i < digits; i++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function isInvalidIdentifier(ch) {
    return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    while (ch = takeChar(scnr, isInvalidIdentifier)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(buf);
      }
    };
    return fn("");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(
      scnr,
      "|"
      /* TokenChars.Pipe */
    );
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          2,
          "{"
          /* TokenChars.BraceLeft */
        );
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default: {
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 4 || context2.currentType === 5 || context2.currentType === 6)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 4, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 6, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 12, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
      }
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 7 || currentType === 8 || currentType === 11 || currentType === 9) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(
          context2,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        );
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 11, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 10, readLinkedRefer(scnr));
          }
        }
        if (currentType === 7) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default: {
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
      }
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(
        _context,
        13
        /* TokenTypes.EOF */
      );
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN$2 = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    // eslint-disable-next-line no-useless-escape
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "�";
    }
  }
}
function createParser(options = {}) {
  const location = options.location !== false;
  const { onError } = options;
  function emitError(tokenzer, code, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location ? createLocation(start, end) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function startNode(type, offset, loc) {
    const node = { type };
    if (location) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    if (location) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 11) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 8) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 9) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 10:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 4:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default: {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
      }
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 4:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 7: {
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
        }
      }
    } while (context.currentType !== 13 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 13);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 13) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 13) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 13) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "…" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i = 0; i < nodes.length; i++) {
    traverseNode(nodes[i], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6: {
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper(
        "linked"
        /* HelperNameMap.LINKED */
      );
      transformer.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  );
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c) => optimizeMessageNode(c));
  }
  return ast;
}
function optimizeMessageNode(message) {
  if (message.items.length === 1) {
    const item = message.items[0];
    if (item.type === 3 || item.type === 9) {
      message.static = item.value;
      delete item.value;
    }
  } else {
    const values = [];
    for (let i = 0; i < message.items.length; i++) {
      const item = message.items[i];
      if (!(item.type === 3 || item.type === 9)) {
        break;
      }
      if (item.value == null) {
        break;
      }
      values.push(item.value);
    }
    if (values.length === message.items.length) {
      message.static = join(values);
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (item.type === 3 || item.type === 9) {
          delete item.value;
        }
      }
    }
  }
}
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0: {
      const resource = node;
      minify(resource.body);
      resource.b = resource.body;
      delete resource.body;
      break;
    }
    case 1: {
      const plural = node;
      const cases = plural.cases;
      for (let i = 0; i < cases.length; i++) {
        minify(cases[i]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    }
    case 2: {
      const message = node;
      const items = message.items;
      for (let i = 0; i < items.length; i++) {
        minify(items[i]);
      }
      message.i = items;
      delete message.items;
      if (message.static) {
        message.s = message.static;
        delete message.static;
      }
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    }
    case 6: {
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    }
    case 5: {
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    }
    case 4: {
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
    }
  }
  delete node.type;
}
function createCodeGenerator(ast, options) {
  const { filename, breakLineCode, needIndent: _needIndent } = options;
  const location = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code, node) {
    _context.code += code;
  }
  function _newline(n, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i = 0; i < length; i++) {
    generateNode(generator, node.items[i]);
    if (i === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.cases[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "list"
        /* HelperNameMap.LIST */
      )}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
  }
}
const generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename = isString(options.filename) ? options.filename : "message.intl";
  !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    filename,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code, map } = generator.context();
  return {
    ast,
    code,
    map: map ? map.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
/*!
  * core-base v11.1.11
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function isMessageAST(val) {
  return isObject(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
}
const PROPS_BODY = ["b", "body"];
function resolveBody(node) {
  return resolveProps(node, PROPS_BODY);
}
const PROPS_CASES = ["c", "cases"];
function resolveCases(node) {
  return resolveProps(node, PROPS_CASES, []);
}
const PROPS_STATIC = ["s", "static"];
function resolveStatic(node) {
  return resolveProps(node, PROPS_STATIC);
}
const PROPS_ITEMS = ["i", "items"];
function resolveItems(node) {
  return resolveProps(node, PROPS_ITEMS, []);
}
const PROPS_TYPE = ["t", "type"];
function resolveType(node) {
  return resolveProps(node, PROPS_TYPE);
}
const PROPS_VALUE = ["v", "value"];
function resolveValue$1(node, type) {
  const resolved = resolveProps(node, PROPS_VALUE);
  if (resolved != null) {
    return resolved;
  } else {
    throw createUnhandleNodeError(type);
  }
}
const PROPS_MODIFIER = ["m", "modifier"];
function resolveLinkedModifier(node) {
  return resolveProps(node, PROPS_MODIFIER);
}
const PROPS_KEY = ["k", "key"];
function resolveLinkedKey(node) {
  const resolved = resolveProps(node, PROPS_KEY);
  if (resolved) {
    return resolved;
  } else {
    throw createUnhandleNodeError(
      6
      /* NodeTypes.Linked */
    );
  }
}
function resolveProps(node, props, defaultValue) {
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (hasOwn(node, prop) && node[prop] != null) {
      return node[prop];
    }
  }
  return defaultValue;
}
const AST_NODE_PROPS_KEYS = [
  ...PROPS_BODY,
  ...PROPS_CASES,
  ...PROPS_STATIC,
  ...PROPS_ITEMS,
  ...PROPS_KEY,
  ...PROPS_MODIFIER,
  ...PROPS_VALUE,
  ...PROPS_TYPE
];
function createUnhandleNodeError(type) {
  return new Error(`unhandled node type: ${type}`);
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = resolveBody(ast);
  if (body == null) {
    throw createUnhandleNodeError(
      0
      /* NodeTypes.Resource */
    );
  }
  const type = resolveType(body);
  if (type === 1) {
    const plural = body;
    const cases = resolveCases(plural);
    return ctx.plural(cases.reduce((messages, c) => [
      ...messages,
      formatMessageParts(ctx, c)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const static_ = resolveStatic(node);
  if (static_ != null) {
    return ctx.type === "text" ? static_ : ctx.normalize([static_]);
  } else {
    const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
    return ctx.normalize(messages);
  }
}
function formatMessagePart(ctx, node) {
  const type = resolveType(node);
  switch (type) {
    case 3: {
      return resolveValue$1(node, type);
    }
    case 9: {
      return resolveValue$1(node, type);
    }
    case 4: {
      const named = node;
      if (hasOwn(named, "k") && named.k) {
        return ctx.interpolate(ctx.named(named.k));
      }
      if (hasOwn(named, "key") && named.key) {
        return ctx.interpolate(ctx.named(named.key));
      }
      throw createUnhandleNodeError(type);
    }
    case 5: {
      const list = node;
      if (hasOwn(list, "i") && isNumber(list.i)) {
        return ctx.interpolate(ctx.list(list.i));
      }
      if (hasOwn(list, "index") && isNumber(list.index)) {
        return ctx.interpolate(ctx.list(list.index));
      }
      throw createUnhandleNodeError(type);
    }
    case 6: {
      const linked = node;
      const modifier = resolveLinkedModifier(linked);
      const key = resolveLinkedKey(linked);
      return ctx.linked(formatMessagePart(ctx, key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    }
    case 7: {
      return resolveValue$1(node, type);
    }
    case 8: {
      return resolveValue$1(node, type);
    }
    default:
      throw new Error(`unhandled node on format message part: ${type}`);
  }
}
const defaultOnCacheKey = (message) => message;
let compileCache = create();
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message, options), detectError };
}
// @__NO_SIDE_EFFECTS__
function compile(message, context) {
  if (isString(message)) {
    isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: "production" !== "production",
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format(message);
    } else {
      return format(message);
    }
  }
}
const CoreErrorCodes = {
  INVALID_ARGUMENT: COMPILE_ERROR_CODES_EXTEND_POINT,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
};
const CORE_ERROR_CODES_EXTEND_POINT = 24;
function createCoreError(code) {
  return createCompileError(code, null, void 0);
}
function getLocale(context, options) {
  return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
let _resolveLocale;
function resolveLocale(locale) {
  if (isString(locale)) {
    return locale;
  } else {
    if (isFunction(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) {
        return _resolveLocale;
      } else if (locale.constructor.name === "Function") {
        const resolve = locale();
        if (isPromise(resolve)) {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        }
        return _resolveLocale = resolve;
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
      }
    } else {
      throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
    }
  }
}
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const pathStateMachine = [];
pathStateMachine[
  0
  /* States.BEFORE_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    0
    /* States.BEFORE_PATH */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* States.IN_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1
    /* States.IN_PATH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* States.BEFORE_IDENT */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  3
  /* States.IN_IDENT */
] = {
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1,
    1
    /* Actions.PUSH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2,
    1
    /* Actions.PUSH */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    1
    /* Actions.PUSH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7,
    1
    /* Actions.PUSH */
  ]
};
pathStateMachine[
  4
  /* States.IN_SUB_PATH */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ],
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* PathCharTypes.RIGHT_BRACKET */
  ]: [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code = ch.charCodeAt(0);
  switch (code) {
    case 91:
    // [
    case 93:
    // ]
    case 46:
    // .
    case 34:
    // "
    case 39:
      return ch;
    case 95:
    // _
    case 36:
    // $
    case 45:
      return "i";
    case 9:
    // Tab (HT)
    case 10:
    // Newline (LF)
    case 13:
    // Return (CR)
    case 160:
    // No-break space (NBSP)
    case 65279:
    // Byte Order Mark (BOM)
    case 8232:
    // Line Separator (LS)
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* Actions.APPEND */
  ] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[
    1
    /* Actions.PUSH */
  ] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* Actions.APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* Actions.APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[
          1
          /* Actions.PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* Actions.APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap[
      "l"
      /* PathCharTypes.ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const key = hit[i];
    if (AST_NODE_PROPS_KEYS.includes(key) && isMessageAST(last)) {
      return null;
    }
    const val = last[key];
    if (val === void 0) {
      return null;
    }
    if (isFunction(last)) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const VERSION$1 = "11.1.11";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ (meta) => {
};
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
  const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages = isPlainObject(options.messages) ? options.messages : createResources(_locale);
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale);
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : createResources(_locale);
  const modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || create();
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  return context;
}
const createResources = (locale) => ({ [locale]: create() });
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function isAlmostSameLocale(locale, compareLocale) {
  if (locale === compareLocale)
    return false;
  return locale.split("-")[0] === compareLocale.split("-")[0];
}
function isImplicitFallback(targetLocale, locales) {
  const index = locales.indexOf(targetLocale);
  if (index === -1) {
    return false;
  }
  for (let i = index + 1; i < locales.length; i++) {
    if (isAlmostSameLocale(targetLocale, locales[i])) {
      return true;
    }
  }
  return false;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create();
  let overrides = create();
  let value;
  if (isString(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create();
  let overrides = create();
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => {
    return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || create();
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key, useLinked) {
    const msg = isFunction(options.messages) ? options.messages(key, !!useLinked) : isObject(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message(key, true)(ctx);
    const msg = (
      // The message in vnode resolved with linked are returned as an array by processor.nomalize
      type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret
    );
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    [
      "list"
      /* HelperNameMap.LIST */
    ]: list,
    [
      "named"
      /* HelperNameMap.NAMED */
    ]: named,
    [
      "plural"
      /* HelperNameMap.PLURAL */
    ]: plural,
    [
      "linked"
      /* HelperNameMap.LINKED */
    ]: linked,
    [
      "message"
      /* HelperNameMap.MESSAGE */
    ]: message,
    [
      "type"
      /* HelperNameMap.TYPE */
    ]: type,
    [
      "interpolate"
      /* HelperNameMap.INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* HelperNameMap.NORMALIZE */
    ]: normalize,
    [
      "values"
      /* HelperNameMap.VALUES */
    ]: assign(create(), _list, _named)
  };
  return ctx;
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : null;
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString(defaultMsgOrKey) || isFunction(defaultMsgOrKey));
  const locale = getLocale(context, options);
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || create()
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  let ret = postTranslation ? postTranslation(messaged, key) : messaged;
  if (escapeParameter && isString(ret)) {
    ret = sanitizeTranslatedHtml(ret);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = create();
  let targetLocale;
  let format2 = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    message = messages[targetLocale] || create();
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    if (!isImplicitFallback(targetLocale, locales)) {
      const missingRet = handleMissing(
        context,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        key,
        targetLocale,
        missingWarn,
        type
      );
      if (missingRet !== key) {
        format2 = missingRet;
      }
    }
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format2;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = create();
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key, useLinked) => {
    let val = resolveValue2(message, key);
    if (val == null && (fallbackContext || useLinked)) {
      const [, , message2] = resolveMessageFormat(
        fallbackContext || context,
        // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
        key,
        locale,
        fallbackLocale,
        fallbackWarn,
        missingWarn
      );
      val = resolveValue2(message2, key);
    }
    if (isString(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
/*!
  * vue-i18n v11.1.11
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "11.1.11";
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: CORE_ERROR_CODES_EXTEND_POINT,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32};
function createI18nError(code, ...args) {
  return createCompileError(code, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  if (isMessageAST(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (subKeys[i] === "__proto__") {
          throw new Error(`unsafe key: ${subKeys[i]}`);
        }
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = create();
        }
        if (!isObject(currentObj[subKeys[i]])) {
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        if (!isMessageAST(currentObj)) {
          currentObj[subKeys[lastIndex]] = obj[key];
          delete obj[key];
        } else {
          if (!AST_NODE_PROPS_KEYS.includes(subKeys[lastIndex])) {
            delete obj[key];
          }
        }
      }
      if (!isMessageAST(currentObj)) {
        const target = currentObj[subKeys[lastIndex]];
        if (isObject(target)) {
          handleFlatJson(target);
        }
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? create() : { [locale]: create() };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || create();
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages = isObject(options.messages) ? options.messages : create();
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(gl.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */ () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  const flatJson = options.flatJson;
  const _ref = shallowRef;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _context.locale = val;
      _locale.value = val;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _context.fallbackLocale = val;
      _fallbackLocale.value = val;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if ("production" !== "production" || false) ;
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && // for not `te` (e.g `t`)
    isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val) || isArray(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val) || isArray(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps((context) => {
      let ret;
      const _context2 = context;
      try {
        _context2.processor = processor;
        ret = Reflect.apply(translate, null, [_context2, ...args]);
      } finally {
        _context2.processor = null;
      }
      return ret;
    }, () => parseTranslateArgs(...args), "translate", (root) => root[TranslateVNodeSymbol](...args), (key) => [createTextNode(key)], (val) => isArray(val));
  }
  function numberParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
  }
  function datetimeParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    return wrapWithDeps(() => {
      if (!key) {
        return false;
      }
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      const resolved = _context.messageResolver(message, key);
      return isMessageAST(resolved) || isMessageFunction(resolved) || isString(resolved);
    }, () => [key], "translate exists", (root) => {
      return Reflect.apply(root.te, root, [key, locale2]);
    }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    if (flatJson) {
      const _message = { [locale2]: message };
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
      message = _message[locale2];
    }
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    const _message = { [locale2]: message };
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
    }
    message = _message[locale2];
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, create());
  }
}
function getFragmentableTag() {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key[0] !== "_");
      const options = create();
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign(create(), attrs);
      const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = create();
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign(create(), options2, { [prop]: props.format[prop] }) : options2;
      }, create());
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign(create(), attrs);
    const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
function getComposer$1(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$1(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [Translation.name, "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  const i18n = {
    // mode
    get mode() {
      return "composition";
    },
    // install plugin
    async install(app, ...options2) {
      app.__VUE_I18N_SYMBOL__ = symbol;
      app.provide(app.__VUE_I18N_SYMBOL__, i18n);
      if (isPlainObject(options2[0])) {
        const opts = options2[0];
        i18n.__composerExtend = opts.__composerExtend;
        i18n.__vueI18nExtend = opts.__vueI18nExtend;
      }
      let globalReleaseHandler = null;
      if (__globalInjection) {
        globalReleaseHandler = injectGlobalFields(app, i18n.global);
      }
      {
        apply(app, i18n, ...options2);
      }
      const unmountApp = app.unmount;
      app.unmount = () => {
        globalReleaseHandler && globalReleaseHandler();
        i18n.dispose();
        unmountApp();
      };
    },
    // global accessor
    get global() {
      return __global;
    },
    dispose() {
      globalScope.stop();
    },
    // @internal
    __instances,
    // @internal
    __getInstance,
    // @internal
    __setInstance,
    // @internal
    __deleteInstance
  };
  return i18n;
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode) {
  const scope = effectScope();
  const obj = scope.run(() => createComposer(options));
  if (obj == null) {
    throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
  }
  return [scope, obj];
}
function getI18nInstance(instance) {
  const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
  if (!i18n) {
    throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
  }
  return i18n;
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  return !useComponent ? target.parent : target.vnode.ctx || target.parent;
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
registerMessageCompiler(compile);
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
function useLocaleHead({ dir = true, lang: lang2 = true, seo = true } = {}, nuxtApp = useNuxtApp()) {
  const common = useComposableContext(nuxtApp);
  common.seoSettings = { dir, lang: lang2, seo };
  const head = _useLocaleHead(common, common.seoSettings);
  common.metaState = head.value;
  return head;
}
function useRouteBaseName(nuxtApp = useNuxtApp()) {
  const common = useComposableContext(nuxtApp);
  return (route) => {
    if (route == null) return;
    return common.getRouteBaseName(route) || void 0;
  };
}
function useLocalePath(nuxtApp = useNuxtApp()) {
  const common = useComposableContext(nuxtApp);
  return (route, locale) => localePath(common, route, locale);
}
function useLocaleRoute(nuxtApp = useNuxtApp()) {
  const common = useComposableContext(nuxtApp);
  return (route, locale) => localeRoute(common, route, locale);
}
function useSwitchLocalePath(nuxtApp = useNuxtApp()) {
  const common = useComposableContext(nuxtApp);
  return (locale) => switchLocalePath(common, locale);
}
const identifier = "nuxt-i18n-slp";
const switchLocalePathLinkWrapperExpr = new RegExp(
  [`<!--${identifier}-\\[(\\w+)\\]-->`, `.+?`, `<!--/${identifier}-->`].join(""),
  "g"
);
const switch_locale_path_ssr_NflG9_QeVcJ1jVig0vCfxB_cZhpEMQ9U2ujRUiYbbVw = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:switch-locale-path-ssr",
  dependsOn: ["i18n:plugin"],
  setup(_nuxt) {
    const nuxt = useNuxtApp(_nuxt._id);
    const switchLocalePath2 = useSwitchLocalePath(nuxt);
    nuxt.hook("app:rendered", (ctx) => {
      if (ctx.renderResult?.html == null) return;
      ctx.renderResult.html = ctx.renderResult.html.replaceAll(
        switchLocalePathLinkWrapperExpr,
        (match, p1) => {
          const encoded = encodeURI(switchLocalePath2(p1 ?? ""));
          return match.replace(
            /href="([^"]+)"/,
            `href="${encoded || "#"}" ${""}`
          );
        }
      );
    });
  }
});
const route_locale_detect__HPHJq3Jg7gwhwgKEI8tQavopSAjmrCSPXl9HgL2h9U = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:route-locale-detect",
  dependsOn: ["i18n:plugin"],
  async setup(_nuxt) {
    let __temp, __restore;
    const nuxt = useNuxtApp(_nuxt._id);
    const ctx = useNuxtI18nContext(nuxt);
    const resolvedLocale = useResolvedLocale();
    [__temp, __restore] = executeAsync(() => nuxt.runWithContext(
      () => loadAndSetLocale(
        nuxt,
        ctx.initial && resolvedLocale.value || detectLocale(nuxt, nuxt.$router.currentRoute.value)
      )
    )), await __temp, __restore();
    return;
  }
});
const preload_30FByJAs5vQa4mNNQLX15KPGCCVjIGrzdTjh6ve5W24 = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:preload",
  dependsOn: ["i18n:plugin"],
  async setup(_nuxt) {
    return;
  }
});
function extendI18n(i18n, { extendComposer, extendComposerInstance }) {
  const scope = effectScope();
  const installI18n = i18n.install.bind(i18n);
  i18n.install = (app, ...options) => {
    const pluginOptions = assign({}, options[0]);
    pluginOptions.__composerExtend = (c) => {
      extendComposerInstance(c, getComposer$3(i18n));
      return () => {
      };
    };
    if (i18n.mode === "legacy") {
      pluginOptions.__vueI18nExtend = (vueI18n) => {
        extendComposerInstance(vueI18n, getComposer$3(vueI18n));
        return () => {
        };
      };
    }
    Reflect.apply(installI18n, i18n, [app, pluginOptions]);
    const globalComposer = getComposer$3(i18n);
    scope.run(() => {
      extendComposer(globalComposer);
      if (i18n.mode === "legacy" && "__composer" in i18n.global) {
        extendComposerInstance(i18n.global, getComposer$3(i18n.global));
      }
    });
    if (i18n.mode === "composition" && app.config.globalProperties.$i18n != null) {
      extendComposerInstance(app.config.globalProperties.$i18n, globalComposer);
    }
    if (app.unmount) {
      const unmountApp = app.unmount.bind(app);
      app.unmount = () => {
        scope.stop();
        unmountApp();
      };
    }
  };
}
const setupVueI18nOptions = async (defaultLocale) => {
  const options = await loadVueI18nOptions(vueI18nConfigs);
  options.locale = defaultLocale || options.locale || "en-US";
  options.defaultLocale = defaultLocale;
  options.fallbackLocale ??= false;
  options.messages ??= {};
  for (const locale of localeCodes) {
    options.messages[locale] ??= {};
  }
  return options;
};
const i18n_EI7LsD1KYQADczz5hrChviGQCdVM8yUkvFEZLJpmnvM = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin",
  parallel: false,
  async setup(_nuxt) {
    let __temp, __restore;
    Object.defineProperty(_nuxt.versions, "nuxtI18n", { get: () => "10.0.2" });
    const nuxt = useNuxtApp(_nuxt._id);
    const runtimeI18n = useRuntimeI18n(nuxt);
    const preloadedOptions = nuxt.ssrContext?.event?.context?.nuxtI18n?.vueI18nOptions;
    const _defaultLocale = getDefaultLocaleForDomain(useRequestURL({ xForwardedHost: true }).host) || runtimeI18n.defaultLocale || "";
    const optionsI18n = preloadedOptions || ([__temp, __restore] = executeAsync(() => setupVueI18nOptions(_defaultLocale)), __temp = await __temp, __restore(), __temp);
    const localeConfigs = useLocaleConfigs();
    {
      localeConfigs.value = useRequestEvent().context.nuxtI18n?.localeConfigs || {};
    }
    prerenderRoutes(localeCodes.map((locale) => `/_i18n/${locale}/messages.json`));
    const i18n = createI18n(optionsI18n);
    const detectors = useDetectors(useRequestEvent(nuxt), useI18nDetection(nuxt), nuxt);
    const ctx = createNuxtI18nContext(nuxt, i18n, optionsI18n.defaultLocale);
    nuxt._nuxtI18n = ctx;
    extendI18n(i18n, {
      extendComposer(composer) {
        composer.locales = computed(() => runtimeI18n.locales);
        composer.localeCodes = computed(() => localeCodes);
        const _baseUrl = ref(ctx.getBaseUrl());
        composer.baseUrl = computed(() => _baseUrl.value);
        composer.strategy = "no_prefix";
        composer.localeProperties = computed(
          () => normalizedLocales.find((l) => l.code === composer.locale.value) || { code: composer.locale.value }
        );
        composer.setLocale = async (locale) => {
          await loadAndSetLocale(nuxt, locale);
          await nuxt.runWithContext(() => navigate(nuxt, nuxt.$router.currentRoute.value));
        };
        composer.loadLocaleMessages = ctx.loadMessages;
        composer.differentDomains = false;
        composer.defaultLocale = optionsI18n.defaultLocale;
        composer.getBrowserLocale = () => resolveSupportedLocale(detectors.header());
        composer.getLocaleCookie = () => resolveSupportedLocale(detectors.cookie());
        composer.setLocaleCookie = ctx.setCookieLocale;
        composer.finalizePendingLocaleChange = async () => {
          if (!i18n.__pendingLocale) return;
          await i18n.__resolvePendingLocalePromise?.();
        };
        composer.waitForPendingLocaleChange = async () => {
          await i18n?.__pendingLocalePromise;
        };
      },
      extendComposerInstance(instance, c) {
        const props = [
          ["locales", () => c.locales],
          ["localeCodes", () => c.localeCodes],
          ["baseUrl", () => c.baseUrl],
          ["strategy", () => "no_prefix"],
          ["localeProperties", () => c.localeProperties],
          ["setLocale", () => async (locale) => Reflect.apply(c.setLocale, c, [locale])],
          ["loadLocaleMessages", () => async (locale) => Reflect.apply(c.loadLocaleMessages, c, [locale])],
          ["differentDomains", () => false],
          ["defaultLocale", () => c.defaultLocale],
          ["getBrowserLocale", () => () => Reflect.apply(c.getBrowserLocale, c, [])],
          ["getLocaleCookie", () => () => Reflect.apply(c.getLocaleCookie, c, [])],
          ["setLocaleCookie", () => (locale) => Reflect.apply(c.setLocaleCookie, c, [locale])],
          ["finalizePendingLocaleChange", () => () => Reflect.apply(c.finalizePendingLocaleChange, c, [])],
          ["waitForPendingLocaleChange", () => () => Reflect.apply(c.waitForPendingLocaleChange, c, [])]
        ];
        for (const [key, get] of props) {
          Object.defineProperty(instance, key, { get });
        }
      }
    });
    nuxt.vueApp.use(i18n);
    Object.defineProperty(nuxt, "$i18n", { get: () => getI18nTarget(i18n) });
    nuxt.provide("localeHead", (options) => localeHead(nuxt._nuxtI18n.composableCtx, options));
    nuxt.provide("localePath", useLocalePath(nuxt));
    nuxt.provide("localeRoute", useLocaleRoute(nuxt));
    nuxt.provide("routeBaseName", useRouteBaseName(nuxt));
    nuxt.provide("getRouteBaseName", useRouteBaseName(nuxt));
    nuxt.provide("switchLocalePath", useSwitchLocalePath(nuxt));
  }
});
const pwaAssetsIcons = { "favicon": {}, "transparent": {}, "maskable": {}, "apple": {}, "appleSplashScreen": {} };
const pwa_icons_9bQHZEHdu4bluxTFRlO3Fslesgvj8FHPlXXG9DVWp5I = /* @__PURE__ */ defineNuxtPlugin(() => {
  const pwaIcons = {};
  configureEntries(pwaIcons, "transparent");
  configureEntries(pwaIcons, "maskable");
  configureEntries(pwaIcons, "favicon");
  configureEntries(pwaIcons, "apple");
  configureEntries(pwaIcons, "appleSplashScreen");
  return {
    provide: {
      pwaIcons
    }
  };
});
function configureEntries(pwaIcons, key) {
  pwaIcons[key] = Object.values(pwaAssetsIcons[key] ?? {}).reduce((acc, icon) => {
    const entry2 = {
      ...icon,
      asImage: {
        src: icon.url,
        key: `${key}-${icon.name}`
      }
    };
    if (icon.width && icon.height) {
      entry2.asImage.width = icon.width;
      entry2.asImage.height = icon.height;
    }
    acc[icon.name] = entry2;
    return acc;
  }, {});
}
const ssg_detect_IpHCGcQQ_IR5Rl99qyukWoMA9fJGfuTYyoksTzy81cs = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:ssg-detect",
  dependsOn: ["i18n:plugin", "i18n:plugin:route-locale-detect"],
  enforce: "post",
  setup(_nuxt) {
    return;
  }
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin$1,
  _0_siteConfig_hxpx9TAykM4St_ybsPIAJmhOKQmae5Yd749dL71wvC8,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  plugin,
  components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8,
  i18n_server_kXMsyxD0I5ArdLQ73Kb_ZqlgxXisaFw4mZSmiieMDUA,
  plugin_L8UGadL0X0unLMI5Gais2tVmEbRW3rkathO0Vxyij4E,
  switch_locale_path_ssr_NflG9_QeVcJ1jVig0vCfxB_cZhpEMQ9U2ujRUiYbbVw,
  route_locale_detect__HPHJq3Jg7gwhwgKEI8tQavopSAjmrCSPXl9HgL2h9U,
  preload_30FByJAs5vQa4mNNQLX15KPGCCVjIGrzdTjh6ve5W24,
  i18n_EI7LsD1KYQADczz5hrChviGQCdVM8yUkvFEZLJpmnvM,
  pwa_icons_9bQHZEHdu4bluxTFRlO3Fslesgvj8FHPlXXG9DVWp5I,
  ssg_detect_IpHCGcQQ_IR5Rl99qyukWoMA9fJGfuTYyoksTzy81cs
];
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_16 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const mockCaregivers = [
  {
    id: 1,
    name: "李美惠",
    experience: "8年專業照護經驗，曾在台大醫院工作",
    skills: "失智症照護、復健協助、醫療護理、心理支持",
    licenses: ["照服員結業證書", "CPR證照", "護理師證照"],
    rating: 4.9,
    photo: "/images/caregivers/li-mei-hui.jpg",
    available: "全天候",
    hourly_rate: 280,
    shift_rate: 3200,
    location: "台北市中正區",
    description: "專精於失智症照護，具備豐富的醫療背景，能提供專業的復健協助和心理支持。擅長與高齡患者溝通，具備耐心和愛心。",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-07-10T00:00:00Z"
  },
  {
    id: 2,
    name: "陳志強",
    experience: "6年居家照護經驗，專長術後照護",
    skills: "術後照護、傷口護理、復健陪伴、基礎醫療",
    licenses: ["照服員結業證書", "CPR證照"],
    rating: 4.8,
    photo: "/images/caregivers/chen-zhi-qiang.jpg",
    available: "週一至週五",
    hourly_rate: 260,
    shift_rate: 3e3,
    location: "台北市大安區",
    description: "男性照護員，力氣大適合協助行動不便患者。在術後照護方面經驗豐富，能協助復健訓練和傷口照護。",
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-07-12T00:00:00Z"
  },
  {
    id: 3,
    name: "王淑芬",
    experience: "10年護理經驗，前榮總護理師",
    skills: "專業護理、用藥管理、慢性病照護、緊急處理",
    licenses: ["護理師證照", "照服員結業證書", "CPR證照", "BLS證照"],
    rating: 4.95,
    photo: "/images/caregivers/wang-shu-fen.jpg",
    available: "全天候",
    hourly_rate: 320,
    shift_rate: 3800,
    location: "台北市信義區",
    description: "前榮總護理師，具備最高等級的醫療照護能力。擅長慢性病管理和用藥指導，能處理各種緊急狀況。",
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-07-14T00:00:00Z"
  },
  {
    id: 4,
    name: "黃雅雯",
    experience: "5年兒童及青少年照護經驗",
    skills: "兒童照護、發展遲緩協助、特殊需求照護、教育陪伴",
    licenses: ["照服員結業證書", "CPR證照", "早期療育師證照"],
    rating: 4.7,
    photo: "/images/caregivers/huang-ya-wen.jpg",
    available: "週一至週六",
    hourly_rate: 250,
    shift_rate: 2800,
    location: "新北市板橋區",
    description: "專精於兒童和青少年照護，對發展遲緩兒童有豐富經驗。個性活潑有耐心，能提供教育陪伴服務。",
    created_at: "2024-03-05T00:00:00Z",
    updated_at: "2024-07-08T00:00:00Z"
  },
  {
    id: 5,
    name: "劉建國",
    experience: "7年長照機構經驗，專長復健照護",
    skills: "復健協助、物理治療、肌力訓練、日常生活協助",
    licenses: ["照服員結業證書", "CPR證照", "物理治療助理證照"],
    rating: 4.6,
    photo: "/images/caregivers/liu-jian-guo.jpg",
    available: "週二至週日",
    hourly_rate: 270,
    shift_rate: 3100,
    location: "台北市松山區",
    description: "男性照護員，具備物理治療背景，專長復健訓練和肌力增強。適合需要復健協助的患者。",
    created_at: "2024-02-28T00:00:00Z",
    updated_at: "2024-07-11T00:00:00Z"
  },
  {
    id: 6,
    name: "張慧君",
    experience: "4年精神科照護經驗",
    skills: "精神疾病照護、情緒支持、行為管理、藥物監督",
    licenses: ["照服員結業證書", "CPR證照", "精神科護理證照"],
    rating: 4.8,
    photo: "/images/caregivers/zhang-hui-jun.jpg",
    available: "全天候",
    hourly_rate: 290,
    shift_rate: 3300,
    location: "台北市內湖區",
    description: "具備精神科專業背景，擅長處理精神疾病患者的照護需求。能提供情緒支持和行為管理。",
    created_at: "2024-04-12T00:00:00Z",
    updated_at: "2024-07-13T00:00:00Z"
  }
];
const mockUsers = [
  {
    id: "user-001",
    name: "林志明",
    email: "zhiming.lin@email.com",
    phone: "0912-345-678",
    role: "patient",
    avatar: "/images/users/lin-zhi-ming.jpg",
    created_at: "2024-05-01T00:00:00Z",
    updated_at: "2024-07-14T00:00:00Z",
    profile: {
      age: 45,
      gender: "男",
      address: "台北市中山區民生東路123號",
      emergencyContact: "0987-654-321",
      medicalHistory: ["糖尿病", "高血壓"],
      preferences: ["女性照護員", "有護理師證照", "日間照護"]
    }
  },
  {
    id: "user-002",
    name: "陳美玲",
    email: "meiling.chen@email.com",
    phone: "0923-456-789",
    role: "patient",
    avatar: "/images/users/chen-mei-ling.jpg",
    created_at: "2024-05-15T00:00:00Z",
    updated_at: "2024-07-10T00:00:00Z",
    profile: {
      age: 38,
      gender: "女",
      address: "新北市板橋區中山路456號",
      emergencyContact: "0976-543-210",
      medicalHistory: ["失智症初期"],
      preferences: ["專業護理師", "失智症照護經驗", "全天候服務"]
    }
  },
  {
    id: "user-003",
    name: "王大明",
    email: "daming.wang@email.com",
    phone: "0934-567-890",
    role: "patient",
    avatar: "/images/users/wang-da-ming.jpg",
    created_at: "2024-06-01T00:00:00Z",
    updated_at: "2024-07-12T00:00:00Z",
    profile: {
      age: 52,
      gender: "男",
      address: "台北市信義區忠孝東路789號",
      emergencyContact: "0965-432-109",
      medicalHistory: ["中風康復期", "行動不便"],
      preferences: ["男性照護員", "復健專長", "力氣大"]
    }
  }
];
const mockBookings = [
  {
    caregiver_id: 1,
    user_id: "user-001",
    service_type: "hourly",
    start_date: "2024-07-20",
    end_date: "2024-07-20",
    start_time: "09:00",
    end_time: "17:00",
    special_requests: "需要協助血糖監測和藥物提醒",
    total_cost: 2240,
    status: "confirmed",
    patient_info: {
      name: "林志明",
      age: 45,
      gender: "男",
      medicalConditions: ["糖尿病", "高血壓"],
      emergencyContact: "0987-654-321"
    },
    created_at: "2024-07-15T10:30:00Z",
    updated_at: "2024-07-15T14:20:00Z"
  },
  {
    caregiver_id: 3,
    user_id: "user-002",
    service_type: "shift",
    start_date: "2024-07-18",
    end_date: "2024-07-25",
    start_time: "08:00",
    special_requests: "失智症患者，需要特別耐心和關注",
    total_cost: 30400,
    status: "in_progress",
    patient_info: {
      name: "陳美玲母親",
      age: 78,
      gender: "女",
      medicalConditions: ["失智症初期", "行動緩慢"],
      emergencyContact: "0976-543-210"
    },
    created_at: "2024-07-10T16:45:00Z",
    updated_at: "2024-07-18T08:00:00Z"
  },
  {
    caregiver_id: 5,
    user_id: "user-003",
    service_type: "hourly",
    start_date: "2024-07-22",
    end_date: "2024-07-22",
    start_time: "14:00",
    end_time: "18:00",
    special_requests: "需要復健協助和物理治療指導",
    total_cost: 1080,
    status: "pending",
    patient_info: {
      name: "王大明",
      age: 52,
      gender: "男",
      medicalConditions: ["中風康復期", "左側肢體無力"],
      emergencyContact: "0965-432-109"
    },
    created_at: "2024-07-14T09:15:00Z",
    updated_at: "2024-07-14T09:15:00Z"
  },
  {
    caregiver_id: 2,
    user_id: "user-001",
    service_type: "shift",
    start_date: "2024-07-25",
    end_date: "2024-07-27",
    start_time: "20:00",
    special_requests: "術後照護，需要傷口換藥",
    total_cost: 9e3,
    status: "pending",
    patient_info: {
      name: "林志明",
      age: 45,
      gender: "男",
      medicalConditions: ["膝關節手術後", "糖尿病"],
      emergencyContact: "0987-654-321"
    },
    created_at: "2024-07-14T11:20:00Z",
    updated_at: "2024-07-14T11:20:00Z"
  }
];
const mockReviews = [
  {
    id: "review-001",
    booking_id: "booking-001",
    user_id: "user-001",
    caregiver_id: 1,
    rating: 5,
    comment: "李護理師非常專業，對糖尿病照護很有經驗，也很細心提醒用藥時間。強力推薦！",
    created_at: "2024-07-16T20:30:00Z",
    updated_at: "2024-07-16T20:30:00Z"
  },
  {
    id: "review-002",
    booking_id: "booking-002",
    user_id: "user-002",
    caregiver_id: 3,
    rating: 5,
    comment: "王護理師真的很棒！對失智症患者很有耐心，媽媽很喜歡她。專業度很高，值得信賴。",
    created_at: "2024-07-12T15:45:00Z",
    updated_at: "2024-07-12T15:45:00Z"
  },
  {
    id: "review-003",
    booking_id: "booking-003",
    user_id: "user-003",
    caregiver_id: 5,
    rating: 4,
    comment: "劉先生在復健指導方面很專業，力氣也夠協助移位。時間準時，服務態度良好。",
    created_at: "2024-07-11T19:20:00Z",
    updated_at: "2024-07-11T19:20:00Z"
  }
];
const mockPayments = [
  {
    id: "payment-001",
    booking_id: "booking-001",
    amount: 2240,
    method: "credit_card",
    status: "completed",
    transaction_id: "txn-abc123456",
    created_at: "2024-07-15T14:30:00Z",
    updated_at: "2024-07-15T14:30:00Z"
  },
  {
    id: "payment-002",
    booking_id: "booking-002",
    amount: 30400,
    method: "bank_transfer",
    status: "completed",
    transaction_id: "txn-def789012",
    created_at: "2024-07-10T17:00:00Z",
    updated_at: "2024-07-10T17:00:00Z"
  },
  {
    id: "payment-003",
    booking_id: "booking-003",
    amount: 1080,
    method: "cash",
    status: "pending",
    created_at: "2024-07-14T09:20:00Z",
    updated_at: "2024-07-14T09:20:00Z"
  }
];
const useSupabase = () => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  );
  return { supabase };
};
const useAuthStore = /* @__PURE__ */ defineStore("auth", {
  state: () => ({
    currentUser: null,
    users: mockUsers,
    isAuthenticated: false,
    loading: false,
    error: null
  }),
  getters: {
    userRole: (state) => state.currentUser?.role,
    isPatient: (state) => state.currentUser?.role === "patient",
    isCaregiver: (state) => state.currentUser?.role === "caregiver",
    isAdmin: (state) => state.currentUser?.role === "admin",
    userProfile: (state) => state.currentUser?.profile,
    userName: (state) => state.currentUser?.name,
    userEmail: (state) => state.currentUser?.email,
    getUserById: (state) => (id) => state.users.find((user) => user.id === id),
    getUsersByRole: (state) => (role) => state.users.filter((user) => user.role === role)
  },
  actions: {
    loadMockData() {
      this.users = mockUsers;
      this.currentUser = mockUsers[0];
      this.isAuthenticated = true;
    },
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const { supabase } = useSupabase();
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });
        if (error) throw error;
        const user = this.users.find((u) => u.email === credentials.email);
        if (user) {
          this.currentUser = user;
          this.isAuthenticated = true;
        } else {
          throw new Error("用戶資料不存在");
        }
      } catch (err) {
        this.error = err.message;
        console.error("Login error:", err);
        const user = this.users.find((u) => u.email === credentials.email);
        if (user) {
          this.currentUser = user;
          this.isAuthenticated = true;
        } else {
          throw new Error("無效的登入憑證");
        }
      } finally {
        this.loading = false;
      }
    },
    async register(userData) {
      this.loading = true;
      this.error = null;
      try {
        if (this.users.find((u) => u.email === userData.email)) {
          throw new Error("此電子郵件已被註冊");
        }
        const { supabase } = useSupabase();
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              name: userData.name,
              phone: userData.phone,
              role: userData.role
            }
          }
        });
        if (error) throw error;
        const newUser = {
          id: `user-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: userData.role,
          avatar: `/images/users/default-${userData.role}.jpg`,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString(),
          profile: userData.profile
        };
        this.users.push(newUser);
        this.currentUser = newUser;
        this.isAuthenticated = true;
        return newUser;
      } catch (err) {
        this.error = err.message;
        console.error("Registration error:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      this.loading = true;
      try {
        const { supabase } = useSupabase();
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (err) {
        console.error("Logout error:", err);
      } finally {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.loading = false;
        this.error = null;
      }
    },
    async updateProfile(updates) {
      if (!this.currentUser) {
        throw new Error("用戶未登入");
      }
      try {
        const { supabase } = useSupabase();
        const { data, error } = await supabase.from("profiles").update(updates).eq("id", this.currentUser.id).select().single();
        if (error) throw error;
        this.currentUser.profile = {
          ...this.currentUser.profile,
          ...updates
        };
        this.currentUser.updated_at = (/* @__PURE__ */ new Date()).toISOString();
        const userIndex = this.users.findIndex((u) => u.id === this.currentUser.id);
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.currentUser };
        }
        return this.currentUser;
      } catch (err) {
        this.error = err.message;
        console.error("Profile update error:", err);
        this.currentUser.profile = {
          ...this.currentUser.profile,
          ...updates
        };
        this.currentUser.updated_at = (/* @__PURE__ */ new Date()).toISOString();
        const userIndex = this.users.findIndex((u) => u.id === this.currentUser.id);
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.currentUser };
        }
        return this.currentUser;
      }
    },
    async resetPassword(email) {
      this.loading = true;
      this.error = null;
      try {
        const { supabase } = useSupabase();
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        return { message: "密碼重設信件已寄出" };
      } catch (err) {
        this.error = err.message;
        console.error("Password reset error:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async checkAuthStatus() {
      try {
        const { supabase } = useSupabase();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const localUser = this.users.find((u) => u.email === user.email);
          if (localUser) {
            this.currentUser = localUser;
            this.isAuthenticated = true;
          }
        } else {
          this.currentUser = null;
          this.isAuthenticated = false;
        }
      } catch (err) {
        console.error("Auth status check error:", err);
        this.currentUser = null;
        this.isAuthenticated = false;
      }
    },
    clearError() {
      this.error = null;
    },
    switchRole(newRole) {
      if (this.currentUser) {
        this.currentUser.role = newRole;
        this.currentUser.updated_at = (/* @__PURE__ */ new Date()).toISOString();
        const userIndex = this.users.findIndex((u) => u.id === this.currentUser.id);
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.currentUser };
        }
      }
    }
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const router = useRouter$1();
    const $q = useQuasar();
    const authStore = useAuthStore();
    const drawer = ref(false);
    const activeTab = ref("home");
    const showNotifications = ref(false);
    const showUserMenu = ref(false);
    const unreadNotifications = ref(3);
    const pageTitles = {
      "/": "首頁",
      "/caregivers": "看護師列表",
      "/caregivers/search": "搜尋看護師",
      "/booking/match": "智能媒合",
      "/booking/payments": "支付管理",
      "/booking/schedule": "排程管理",
      "/user/dashboard": "個人儀表板",
      "/auth/login": "登入",
      "/auth/register": "註冊",
      "/support/contact": "聯繫我們",
      "/support/reviews": "用戶評價",
      "/info/services": "服務介紹",
      "/info/pricing": "計費說明",
      "/info/about": "關於我們"
    };
    const mainMenuItems = [
      {
        to: "/",
        icon: "home",
        label: "首頁",
        caption: "回到主頁面"
      },
      {
        to: "/caregivers",
        icon: "people",
        label: "看護師列表",
        caption: "瀏覽所有可用看護師"
      },
      {
        to: "/caregivers/search",
        icon: "search",
        label: "搜尋看護師",
        caption: "進階搜尋和篩選"
      },
      {
        to: "/booking/match",
        icon: "psychology",
        label: "智能媒合",
        caption: "找到最適合的看護師"
      }
    ];
    const userMenuItems = [
      {
        to: "/user/dashboard",
        icon: "dashboard",
        label: "個人儀表板",
        caption: "查看您的統計資訊",
        requireAuth: true
      },
      {
        to: "/booking/schedule",
        icon: "calendar_today",
        label: "排程管理",
        caption: "管理您的預約排程",
        requireAuth: true
      },
      {
        to: "/booking/payments",
        icon: "payment",
        label: "支付管理",
        caption: "查看支付紀錄",
        requireAuth: true
      },
      {
        to: "/support/reviews",
        icon: "rate_review",
        label: "我的評價",
        caption: "查看和管理評價",
        requireAuth: false
      }
    ];
    const otherMenuItems = [
      {
        to: "/info/services",
        icon: "info",
        label: "服務介紹",
        caption: "了解我們的服務"
      },
      {
        to: "/info/pricing",
        icon: "attach_money",
        label: "計費說明",
        caption: "查看服務費用"
      },
      {
        to: "/support/contact",
        icon: "contact_support",
        label: "聯繫我們",
        caption: "客服支援和意見回饋"
      },
      {
        to: "/info/about",
        icon: "business",
        label: "關於我們",
        caption: "了解我們的公司"
      }
    ];
    const currentPageTitle = computed(() => {
      if (route.params.id) {
        if (route.path.includes("/caregivers/")) {
          return "看護師詳情";
        }
      }
      return pageTitles[route.path] || "護理服務平台";
    });
    const canGoBack = computed(() => {
      return (void 0).history.length > 1 && route.path !== "/";
    });
    const goBack = () => {
      if (canGoBack.value) {
        router.go(-1);
      } else {
        navigateTo("/");
      }
    };
    const handleProfileClick = () => {
      if (authStore.currentUser) {
        navigateTo("/user/dashboard");
      } else {
        navigateTo("/auth/login");
      }
    };
    const handleLogout = () => {
      $q.dialog({
        title: "確認登出",
        message: "您確定要登出嗎？",
        ok: {
          color: "negative",
          label: "登出"
        },
        cancel: {
          color: "grey",
          label: "取消"
        }
      }).onOk(() => {
        authStore.logout();
        drawer.value = false;
        navigateTo("/");
        $q.notify({
          type: "positive",
          message: "已成功登出",
          timeout: 2e3
        });
      });
    };
    watch(
      () => route.path,
      (newPath) => {
        if (newPath === "/") {
          activeTab.value = "home";
        } else if (newPath.startsWith("/caregivers")) {
          activeTab.value = "caregivers";
        } else if (newPath.startsWith("/booking") || newPath.startsWith("/user")) {
          activeTab.value = "booking";
        } else {
          activeTab.value = "profile";
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_layout = __nuxt_component_0;
      const _component_q_header = __nuxt_component_1;
      const _component_q_toolbar = __nuxt_component_2;
      const _component_q_btn = __nuxt_component_3;
      const _component_q_toolbar_title = __nuxt_component_4;
      const _component_q_badge = __nuxt_component_5$1;
      const _component_q_avatar = __nuxt_component_6$1;
      const _component_q_icon = __nuxt_component_1$1$1;
      const _component_q_drawer = __nuxt_component_8$1;
      const _component_q_scroll_area = __nuxt_component_9;
      const _component_q_separator = __nuxt_component_5$2;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_item_label = __nuxt_component_8;
      const _component_q_item = __nuxt_component_5;
      const _component_q_item_section = __nuxt_component_6;
      const _component_q_page_container = __nuxt_component_15;
      const _component_NuxtPage = __nuxt_component_16;
      const _component_q_footer = __nuxt_component_17;
      const _component_q_tabs = __nuxt_component_18;
      const _component_q_tab = __nuxt_component_19;
      const _component_q_dialog = __nuxt_component_20;
      const _component_q_card = __nuxt_component_1$1;
      const _component_q_card_section = __nuxt_component_2$1;
      const _component_q_space = __nuxt_component_23;
      const _component_q_card_actions = __nuxt_component_9$1;
      const _directive_ripple = __q_directive_0;
      _push(ssrRenderComponent(_component_q_layout, mergeProps({ view: "hHh Lpr lFf" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_header, {
              elevated: "",
              class: "bg-primary text-white"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_toolbar, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (canGoBack.value) {
                          _push4(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            dense: "",
                            round: "",
                            icon: "arrow_back",
                            class: "q-mr-sm",
                            onClick: goBack,
                            "aria-label": "返回"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            dense: "",
                            round: "",
                            icon: "menu",
                            class: "q-mr-sm",
                            onClick: ($event) => drawer.value = !drawer.value,
                            "aria-label": "選單"
                          }, null, _parent4, _scopeId3));
                        }
                        _push4(ssrRenderComponent(_component_q_toolbar_title, { class: "text-h6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(currentPageTitle.value)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString$1(currentPageTitle.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="row q-gutter-xs" data-v-b03fcb27${_scopeId3}>`);
                        if (unref(authStore).currentUser) {
                          _push4(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            dense: "",
                            round: "",
                            icon: "notifications",
                            onClick: ($event) => showNotifications.value = true
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (unreadNotifications.value > 0) {
                                  _push5(ssrRenderComponent(_component_q_badge, {
                                    color: "negative",
                                    floating: "",
                                    rounded: ""
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(unreadNotifications.value)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString$1(unreadNotifications.value), 1)
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  unreadNotifications.value > 0 ? (openBlock(), createBlock(_component_q_badge, {
                                    key: 0,
                                    color: "negative",
                                    floating: "",
                                    rounded: ""
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString$1(unreadNotifications.value), 1)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(authStore).currentUser) {
                          _push4(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            dense: "",
                            round: "",
                            onClick: ($event) => showUserMenu.value = true
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_q_avatar, { size: "32px" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      if (unref(authStore).currentUser.avatar) {
                                        _push6(`<img${ssrRenderAttr("src", unref(authStore).currentUser.avatar)}${ssrRenderAttr("alt", unref(authStore).currentUser.name)} data-v-b03fcb27${_scopeId5}>`);
                                      } else {
                                        _push6(ssrRenderComponent(_component_q_icon, { name: "person" }, null, _parent6, _scopeId5));
                                      }
                                    } else {
                                      return [
                                        unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          src: unref(authStore).currentUser.avatar,
                                          alt: unref(authStore).currentUser.name
                                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                          key: 1,
                                          name: "person"
                                        }))
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_q_avatar, { size: "32px" }, {
                                    default: withCtx(() => [
                                      unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: unref(authStore).currentUser.avatar,
                                        alt: unref(authStore).currentUser.name
                                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                        key: 1,
                                        name: "person"
                                      }))
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            dense: "",
                            icon: "login",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login"),
                            "aria-label": "登入"
                          }, null, _parent4, _scopeId3));
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          canGoBack.value ? (openBlock(), createBlock(_component_q_btn, {
                            key: 0,
                            flat: "",
                            dense: "",
                            round: "",
                            icon: "arrow_back",
                            class: "q-mr-sm",
                            onClick: goBack,
                            "aria-label": "返回"
                          })) : (openBlock(), createBlock(_component_q_btn, {
                            key: 1,
                            flat: "",
                            dense: "",
                            round: "",
                            icon: "menu",
                            class: "q-mr-sm",
                            onClick: ($event) => drawer.value = !drawer.value,
                            "aria-label": "選單"
                          }, null, 8, ["onClick"])),
                          createVNode(_component_q_toolbar_title, { class: "text-h6" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString$1(currentPageTitle.value), 1)
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "row q-gutter-xs" }, [
                            unref(authStore).currentUser ? (openBlock(), createBlock(_component_q_btn, {
                              key: 0,
                              flat: "",
                              dense: "",
                              round: "",
                              icon: "notifications",
                              onClick: ($event) => showNotifications.value = true
                            }, {
                              default: withCtx(() => [
                                unreadNotifications.value > 0 ? (openBlock(), createBlock(_component_q_badge, {
                                  key: 0,
                                  color: "negative",
                                  floating: "",
                                  rounded: ""
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString$1(unreadNotifications.value), 1)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true),
                            unref(authStore).currentUser ? (openBlock(), createBlock(_component_q_btn, {
                              key: 1,
                              flat: "",
                              dense: "",
                              round: "",
                              onClick: ($event) => showUserMenu.value = true
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_avatar, { size: "32px" }, {
                                  default: withCtx(() => [
                                    unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: unref(authStore).currentUser.avatar,
                                      alt: unref(authStore).currentUser.name
                                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                      key: 1,
                                      name: "person"
                                    }))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : (openBlock(), createBlock(_component_q_btn, {
                              key: 2,
                              flat: "",
                              dense: "",
                              icon: "login",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login"),
                              "aria-label": "登入"
                            }, null, 8, ["onClick"]))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_toolbar, null, {
                      default: withCtx(() => [
                        canGoBack.value ? (openBlock(), createBlock(_component_q_btn, {
                          key: 0,
                          flat: "",
                          dense: "",
                          round: "",
                          icon: "arrow_back",
                          class: "q-mr-sm",
                          onClick: goBack,
                          "aria-label": "返回"
                        })) : (openBlock(), createBlock(_component_q_btn, {
                          key: 1,
                          flat: "",
                          dense: "",
                          round: "",
                          icon: "menu",
                          class: "q-mr-sm",
                          onClick: ($event) => drawer.value = !drawer.value,
                          "aria-label": "選單"
                        }, null, 8, ["onClick"])),
                        createVNode(_component_q_toolbar_title, { class: "text-h6" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString$1(currentPageTitle.value), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "row q-gutter-xs" }, [
                          unref(authStore).currentUser ? (openBlock(), createBlock(_component_q_btn, {
                            key: 0,
                            flat: "",
                            dense: "",
                            round: "",
                            icon: "notifications",
                            onClick: ($event) => showNotifications.value = true
                          }, {
                            default: withCtx(() => [
                              unreadNotifications.value > 0 ? (openBlock(), createBlock(_component_q_badge, {
                                key: 0,
                                color: "negative",
                                floating: "",
                                rounded: ""
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString$1(unreadNotifications.value), 1)
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true),
                          unref(authStore).currentUser ? (openBlock(), createBlock(_component_q_btn, {
                            key: 1,
                            flat: "",
                            dense: "",
                            round: "",
                            onClick: ($event) => showUserMenu.value = true
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_avatar, { size: "32px" }, {
                                default: withCtx(() => [
                                  unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: unref(authStore).currentUser.avatar,
                                    alt: unref(authStore).currentUser.name
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                    key: 1,
                                    name: "person"
                                  }))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : (openBlock(), createBlock(_component_q_btn, {
                            key: 2,
                            flat: "",
                            dense: "",
                            icon: "login",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login"),
                            "aria-label": "登入"
                          }, null, 8, ["onClick"]))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_drawer, {
              modelValue: drawer.value,
              "onUpdate:modelValue": ($event) => drawer.value = $event,
              side: "left",
              overlay: "",
              bordered: "",
              width: 280,
              breakpoint: 768,
              class: "bg-white"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_scroll_area, { class: "fit" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(authStore).currentUser) {
                          _push4(`<div class="bg-primary text-white q-pa-md" data-v-b03fcb27${_scopeId3}><div class="row items-center q-gutter-md" data-v-b03fcb27${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_avatar, { size: "50px" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (unref(authStore).currentUser.avatar) {
                                  _push5(`<img${ssrRenderAttr("src", unref(authStore).currentUser.avatar)}${ssrRenderAttr("alt", unref(authStore).currentUser.name)} data-v-b03fcb27${_scopeId4}>`);
                                } else {
                                  _push5(ssrRenderComponent(_component_q_icon, { name: "person" }, null, _parent5, _scopeId4));
                                }
                              } else {
                                return [
                                  unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: unref(authStore).currentUser.avatar,
                                    alt: unref(authStore).currentUser.name
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                    key: 1,
                                    name: "person"
                                  }))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<div data-v-b03fcb27${_scopeId3}><div class="text-subtitle1 text-weight-medium" data-v-b03fcb27${_scopeId3}>${ssrInterpolate(unref(authStore).currentUser.name)}</div><div class="text-caption opacity-80" data-v-b03fcb27${_scopeId3}>${ssrInterpolate(unref(authStore).currentUser.email)}</div></div></div></div>`);
                        } else {
                          _push4(`<div class="bg-grey-1 q-pa-md text-center" data-v-b03fcb27${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_icon, {
                            name: "person_outline",
                            size: "40px",
                            color: "grey-6"
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="text-body2 text-grey-7 q-mt-sm q-mb-md" data-v-b03fcb27${_scopeId3}> 登入以享受完整功能 </div>`);
                          _push4(ssrRenderComponent(_component_q_btn, {
                            color: "primary",
                            size: "sm",
                            onClick: ($event) => {
                              ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login");
                              drawer.value = false;
                            }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` 立即登入 `);
                              } else {
                                return [
                                  createTextVNode(" 立即登入 ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        }
                        _push4(ssrRenderComponent(_component_q_separator, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_list, { padding: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_item_label, {
                                header: "",
                                class: "text-weight-medium text-grey-8"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 主選單 `);
                                  } else {
                                    return [
                                      createTextVNode(" 主選單 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<!--[-->`);
                              ssrRenderList(mainMenuItems, (item) => {
                                _push5(ssrRenderComponent(_component_q_item, mergeProps({
                                  key: item.to,
                                  clickable: "",
                                  to: item.to,
                                  onClick: ($event) => drawer.value = false,
                                  exact: "",
                                  class: "rounded-borders q-ma-xs"
                                }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_icon, {
                                              name: item.icon,
                                              color: "primary"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_icon, {
                                                name: item.icon,
                                                color: "primary"
                                              }, null, 8, ["name"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_item_label, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.label)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString$1(item.label), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.caption)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString$1(item.caption), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString$1(item.label), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString$1(item.caption), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: item.icon,
                                              color: "primary"
                                            }, null, 8, ["name"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString$1(item.label), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString$1(item.caption), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
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
                              _push5(ssrRenderComponent(_component_q_separator, { class: "q-my-md" }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_item_label, {
                                header: "",
                                class: "text-weight-medium text-grey-8"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 用戶中心 `);
                                  } else {
                                    return [
                                      createTextVNode(" 用戶中心 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<!--[-->`);
                              ssrRenderList(userMenuItems, (item) => {
                                _push5(ssrRenderComponent(_component_q_item, mergeProps({
                                  key: item.to,
                                  clickable: "",
                                  to: item.to,
                                  onClick: ($event) => drawer.value = false,
                                  exact: "",
                                  class: "rounded-borders q-ma-xs",
                                  disable: !unref(authStore).currentUser && item.requireAuth
                                }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_icon, {
                                              name: item.icon,
                                              color: "secondary"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_icon, {
                                                name: item.icon,
                                                color: "secondary"
                                              }, null, 8, ["name"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_item_label, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.label)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString$1(item.label), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.caption)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString$1(item.caption), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString$1(item.label), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString$1(item.caption), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      if (!unref(authStore).currentUser && item.requireAuth) {
                                        _push6(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_q_icon, {
                                                name: "lock",
                                                color: "grey-5",
                                                size: "xs"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_q_icon, {
                                                  name: "lock",
                                                  color: "grey-5",
                                                  size: "xs"
                                                })
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                    } else {
                                      return [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: item.icon,
                                              color: "secondary"
                                            }, null, 8, ["name"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString$1(item.label), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString$1(item.caption), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        !unref(authStore).currentUser && item.requireAuth ? (openBlock(), createBlock(_component_q_item_section, {
                                          key: 0,
                                          side: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "lock",
                                              color: "grey-5",
                                              size: "xs"
                                            })
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                              _push5(ssrRenderComponent(_component_q_separator, { class: "q-my-md" }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_item_label, {
                                header: "",
                                class: "text-weight-medium text-grey-8"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 其他 `);
                                  } else {
                                    return [
                                      createTextVNode(" 其他 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<!--[-->`);
                              ssrRenderList(otherMenuItems, (item) => {
                                _push5(ssrRenderComponent(_component_q_item, mergeProps({
                                  key: item.to,
                                  clickable: "",
                                  to: item.to,
                                  onClick: ($event) => drawer.value = false,
                                  exact: "",
                                  class: "rounded-borders q-ma-xs"
                                }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_icon, {
                                              name: item.icon,
                                              color: "grey-6"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_icon, {
                                                name: item.icon,
                                                color: "grey-6"
                                              }, null, 8, ["name"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_item_label, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.label)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString$1(item.label), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.caption)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString$1(item.caption), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString$1(item.label), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString$1(item.caption), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: item.icon,
                                              color: "grey-6"
                                            }, null, 8, ["name"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString$1(item.label), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString$1(item.caption), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
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
                              if (unref(authStore).currentUser) {
                                _push5(ssrRenderComponent(_component_q_item, mergeProps({
                                  clickable: "",
                                  onClick: handleLogout,
                                  class: "rounded-borders q-ma-xs text-negative"
                                }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_icon, {
                                              name: "logout",
                                              color: "negative"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_icon, {
                                                name: "logout",
                                                color: "negative"
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_item_label, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`登出`);
                                                } else {
                                                  return [
                                                    createTextVNode("登出")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`結束此次工作階段`);
                                                } else {
                                                  return [
                                                    createTextVNode("結束此次工作階段")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("登出")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("結束此次工作階段")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "logout",
                                              color: "negative"
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("登出")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("結束此次工作階段")
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
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(_component_q_item_label, {
                                  header: "",
                                  class: "text-weight-medium text-grey-8"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 主選單 ")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(), createBlock(Fragment, null, renderList(mainMenuItems, (item) => {
                                  return withDirectives(createVNode(_component_q_item, {
                                    key: item.to,
                                    clickable: "",
                                    to: item.to,
                                    onClick: ($event) => drawer.value = false,
                                    exact: "",
                                    class: "rounded-borders q-ma-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: item.icon,
                                            color: "primary"
                                          }, null, 8, ["name"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString$1(item.label), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString$1(item.caption), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["to", "onClick"]), [
                                    [_directive_ripple]
                                  ]);
                                }), 64)),
                                createVNode(_component_q_separator, { class: "q-my-md" }),
                                createVNode(_component_q_item_label, {
                                  header: "",
                                  class: "text-weight-medium text-grey-8"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 用戶中心 ")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(), createBlock(Fragment, null, renderList(userMenuItems, (item) => {
                                  return withDirectives(createVNode(_component_q_item, {
                                    key: item.to,
                                    clickable: "",
                                    to: item.to,
                                    onClick: ($event) => drawer.value = false,
                                    exact: "",
                                    class: "rounded-borders q-ma-xs",
                                    disable: !unref(authStore).currentUser && item.requireAuth
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: item.icon,
                                            color: "secondary"
                                          }, null, 8, ["name"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString$1(item.label), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString$1(item.caption), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      !unref(authStore).currentUser && item.requireAuth ? (openBlock(), createBlock(_component_q_item_section, {
                                        key: 0,
                                        side: ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "lock",
                                            color: "grey-5",
                                            size: "xs"
                                          })
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["to", "onClick", "disable"]), [
                                    [_directive_ripple]
                                  ]);
                                }), 64)),
                                createVNode(_component_q_separator, { class: "q-my-md" }),
                                createVNode(_component_q_item_label, {
                                  header: "",
                                  class: "text-weight-medium text-grey-8"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 其他 ")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(), createBlock(Fragment, null, renderList(otherMenuItems, (item) => {
                                  return withDirectives(createVNode(_component_q_item, {
                                    key: item.to,
                                    clickable: "",
                                    to: item.to,
                                    onClick: ($event) => drawer.value = false,
                                    exact: "",
                                    class: "rounded-borders q-ma-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: item.icon,
                                            color: "grey-6"
                                          }, null, 8, ["name"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString$1(item.label), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString$1(item.caption), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["to", "onClick"]), [
                                    [_directive_ripple]
                                  ]);
                                }), 64)),
                                unref(authStore).currentUser ? withDirectives((openBlock(), createBlock(_component_q_item, {
                                  key: 0,
                                  clickable: "",
                                  onClick: handleLogout,
                                  class: "rounded-borders q-ma-xs text-negative"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "logout",
                                          color: "negative"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("登出")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("結束此次工作階段")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })), [
                                  [_directive_ripple]
                                ]) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          unref(authStore).currentUser ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "bg-primary text-white q-pa-md"
                          }, [
                            createVNode("div", { class: "row items-center q-gutter-md" }, [
                              createVNode(_component_q_avatar, { size: "50px" }, {
                                default: withCtx(() => [
                                  unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: unref(authStore).currentUser.avatar,
                                    alt: unref(authStore).currentUser.name
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                    key: 1,
                                    name: "person"
                                  }))
                                ]),
                                _: 1
                              }),
                              createVNode("div", null, [
                                createVNode("div", { class: "text-subtitle1 text-weight-medium" }, toDisplayString$1(unref(authStore).currentUser.name), 1),
                                createVNode("div", { class: "text-caption opacity-80" }, toDisplayString$1(unref(authStore).currentUser.email), 1)
                              ])
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "bg-grey-1 q-pa-md text-center"
                          }, [
                            createVNode(_component_q_icon, {
                              name: "person_outline",
                              size: "40px",
                              color: "grey-6"
                            }),
                            createVNode("div", { class: "text-body2 text-grey-7 q-mt-sm q-mb-md" }, " 登入以享受完整功能 "),
                            createVNode(_component_q_btn, {
                              color: "primary",
                              size: "sm",
                              onClick: ($event) => {
                                ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login");
                                drawer.value = false;
                              }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 立即登入 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])),
                          createVNode(_component_q_separator),
                          createVNode(_component_q_list, { padding: "" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_item_label, {
                                header: "",
                                class: "text-weight-medium text-grey-8"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 主選單 ")
                                ]),
                                _: 1
                              }),
                              (openBlock(), createBlock(Fragment, null, renderList(mainMenuItems, (item) => {
                                return withDirectives(createVNode(_component_q_item, {
                                  key: item.to,
                                  clickable: "",
                                  to: item.to,
                                  onClick: ($event) => drawer.value = false,
                                  exact: "",
                                  class: "rounded-borders q-ma-xs"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: item.icon,
                                          color: "primary"
                                        }, null, 8, ["name"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString$1(item.label), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString$1(item.caption), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["to", "onClick"]), [
                                  [_directive_ripple]
                                ]);
                              }), 64)),
                              createVNode(_component_q_separator, { class: "q-my-md" }),
                              createVNode(_component_q_item_label, {
                                header: "",
                                class: "text-weight-medium text-grey-8"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 用戶中心 ")
                                ]),
                                _: 1
                              }),
                              (openBlock(), createBlock(Fragment, null, renderList(userMenuItems, (item) => {
                                return withDirectives(createVNode(_component_q_item, {
                                  key: item.to,
                                  clickable: "",
                                  to: item.to,
                                  onClick: ($event) => drawer.value = false,
                                  exact: "",
                                  class: "rounded-borders q-ma-xs",
                                  disable: !unref(authStore).currentUser && item.requireAuth
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: item.icon,
                                          color: "secondary"
                                        }, null, 8, ["name"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString$1(item.label), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString$1(item.caption), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    !unref(authStore).currentUser && item.requireAuth ? (openBlock(), createBlock(_component_q_item_section, {
                                      key: 0,
                                      side: ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "lock",
                                          color: "grey-5",
                                          size: "xs"
                                        })
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["to", "onClick", "disable"]), [
                                  [_directive_ripple]
                                ]);
                              }), 64)),
                              createVNode(_component_q_separator, { class: "q-my-md" }),
                              createVNode(_component_q_item_label, {
                                header: "",
                                class: "text-weight-medium text-grey-8"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 其他 ")
                                ]),
                                _: 1
                              }),
                              (openBlock(), createBlock(Fragment, null, renderList(otherMenuItems, (item) => {
                                return withDirectives(createVNode(_component_q_item, {
                                  key: item.to,
                                  clickable: "",
                                  to: item.to,
                                  onClick: ($event) => drawer.value = false,
                                  exact: "",
                                  class: "rounded-borders q-ma-xs"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: item.icon,
                                          color: "grey-6"
                                        }, null, 8, ["name"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString$1(item.label), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString$1(item.caption), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["to", "onClick"]), [
                                  [_directive_ripple]
                                ]);
                              }), 64)),
                              unref(authStore).currentUser ? withDirectives((openBlock(), createBlock(_component_q_item, {
                                key: 0,
                                clickable: "",
                                onClick: handleLogout,
                                class: "rounded-borders q-ma-xs text-negative"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "logout",
                                        color: "negative"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("登出")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("結束此次工作階段")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })), [
                                [_directive_ripple]
                              ]) : createCommentVNode("", true)
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
                    createVNode(_component_q_scroll_area, { class: "fit" }, {
                      default: withCtx(() => [
                        unref(authStore).currentUser ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-primary text-white q-pa-md"
                        }, [
                          createVNode("div", { class: "row items-center q-gutter-md" }, [
                            createVNode(_component_q_avatar, { size: "50px" }, {
                              default: withCtx(() => [
                                unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: unref(authStore).currentUser.avatar,
                                  alt: unref(authStore).currentUser.name
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                  key: 1,
                                  name: "person"
                                }))
                              ]),
                              _: 1
                            }),
                            createVNode("div", null, [
                              createVNode("div", { class: "text-subtitle1 text-weight-medium" }, toDisplayString$1(unref(authStore).currentUser.name), 1),
                              createVNode("div", { class: "text-caption opacity-80" }, toDisplayString$1(unref(authStore).currentUser.email), 1)
                            ])
                          ])
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "bg-grey-1 q-pa-md text-center"
                        }, [
                          createVNode(_component_q_icon, {
                            name: "person_outline",
                            size: "40px",
                            color: "grey-6"
                          }),
                          createVNode("div", { class: "text-body2 text-grey-7 q-mt-sm q-mb-md" }, " 登入以享受完整功能 "),
                          createVNode(_component_q_btn, {
                            color: "primary",
                            size: "sm",
                            onClick: ($event) => {
                              ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login");
                              drawer.value = false;
                            }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 立即登入 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])),
                        createVNode(_component_q_separator),
                        createVNode(_component_q_list, { padding: "" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_item_label, {
                              header: "",
                              class: "text-weight-medium text-grey-8"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 主選單 ")
                              ]),
                              _: 1
                            }),
                            (openBlock(), createBlock(Fragment, null, renderList(mainMenuItems, (item) => {
                              return withDirectives(createVNode(_component_q_item, {
                                key: item.to,
                                clickable: "",
                                to: item.to,
                                onClick: ($event) => drawer.value = false,
                                exact: "",
                                class: "rounded-borders q-ma-xs"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: item.icon,
                                        color: "primary"
                                      }, null, 8, ["name"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString$1(item.label), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString$1(item.caption), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["to", "onClick"]), [
                                [_directive_ripple]
                              ]);
                            }), 64)),
                            createVNode(_component_q_separator, { class: "q-my-md" }),
                            createVNode(_component_q_item_label, {
                              header: "",
                              class: "text-weight-medium text-grey-8"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 用戶中心 ")
                              ]),
                              _: 1
                            }),
                            (openBlock(), createBlock(Fragment, null, renderList(userMenuItems, (item) => {
                              return withDirectives(createVNode(_component_q_item, {
                                key: item.to,
                                clickable: "",
                                to: item.to,
                                onClick: ($event) => drawer.value = false,
                                exact: "",
                                class: "rounded-borders q-ma-xs",
                                disable: !unref(authStore).currentUser && item.requireAuth
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: item.icon,
                                        color: "secondary"
                                      }, null, 8, ["name"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString$1(item.label), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString$1(item.caption), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  !unref(authStore).currentUser && item.requireAuth ? (openBlock(), createBlock(_component_q_item_section, {
                                    key: 0,
                                    side: ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "lock",
                                        color: "grey-5",
                                        size: "xs"
                                      })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["to", "onClick", "disable"]), [
                                [_directive_ripple]
                              ]);
                            }), 64)),
                            createVNode(_component_q_separator, { class: "q-my-md" }),
                            createVNode(_component_q_item_label, {
                              header: "",
                              class: "text-weight-medium text-grey-8"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 其他 ")
                              ]),
                              _: 1
                            }),
                            (openBlock(), createBlock(Fragment, null, renderList(otherMenuItems, (item) => {
                              return withDirectives(createVNode(_component_q_item, {
                                key: item.to,
                                clickable: "",
                                to: item.to,
                                onClick: ($event) => drawer.value = false,
                                exact: "",
                                class: "rounded-borders q-ma-xs"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: item.icon,
                                        color: "grey-6"
                                      }, null, 8, ["name"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString$1(item.label), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_label, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString$1(item.caption), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["to", "onClick"]), [
                                [_directive_ripple]
                              ]);
                            }), 64)),
                            unref(authStore).currentUser ? withDirectives((openBlock(), createBlock(_component_q_item, {
                              key: 0,
                              clickable: "",
                              onClick: handleLogout,
                              class: "rounded-borders q-ma-xs text-negative"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: "logout",
                                      color: "negative"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("登出")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_label, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("結束此次工作階段")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })), [
                              [_directive_ripple]
                            ]) : createCommentVNode("", true)
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
            _push2(ssrRenderComponent(_component_q_page_container, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPage, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPage)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_footer, {
              elevated: "",
              class: "bg-white border-t"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_tabs, {
                    modelValue: activeTab.value,
                    "onUpdate:modelValue": ($event) => activeTab.value = $event,
                    dense: "",
                    align: "justify",
                    "indicator-color": "primary",
                    "active-color": "primary",
                    "inactive-color": "grey-6",
                    class: "text-grey-8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_tab, {
                          name: "home",
                          icon: "home",
                          label: "首頁",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/"),
                          "no-caps": ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_tab, {
                          name: "caregivers",
                          icon: "people",
                          label: "看護師",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/caregivers"),
                          "no-caps": ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_tab, {
                          name: "booking",
                          icon: "calendar_today",
                          label: "預約",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/booking/match"),
                          "no-caps": ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_tab, {
                          name: "profile",
                          icon: "person",
                          label: "我的",
                          onClick: handleProfileClick,
                          "no-caps": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_tab, {
                            name: "home",
                            icon: "home",
                            label: "首頁",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/"),
                            "no-caps": ""
                          }, null, 8, ["onClick"]),
                          createVNode(_component_q_tab, {
                            name: "caregivers",
                            icon: "people",
                            label: "看護師",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/caregivers"),
                            "no-caps": ""
                          }, null, 8, ["onClick"]),
                          createVNode(_component_q_tab, {
                            name: "booking",
                            icon: "calendar_today",
                            label: "預約",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/booking/match"),
                            "no-caps": ""
                          }, null, 8, ["onClick"]),
                          createVNode(_component_q_tab, {
                            name: "profile",
                            icon: "person",
                            label: "我的",
                            onClick: handleProfileClick,
                            "no-caps": ""
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_tabs, {
                      modelValue: activeTab.value,
                      "onUpdate:modelValue": ($event) => activeTab.value = $event,
                      dense: "",
                      align: "justify",
                      "indicator-color": "primary",
                      "active-color": "primary",
                      "inactive-color": "grey-6",
                      class: "text-grey-8"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_tab, {
                          name: "home",
                          icon: "home",
                          label: "首頁",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/"),
                          "no-caps": ""
                        }, null, 8, ["onClick"]),
                        createVNode(_component_q_tab, {
                          name: "caregivers",
                          icon: "people",
                          label: "看護師",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/caregivers"),
                          "no-caps": ""
                        }, null, 8, ["onClick"]),
                        createVNode(_component_q_tab, {
                          name: "booking",
                          icon: "calendar_today",
                          label: "預約",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/booking/match"),
                          "no-caps": ""
                        }, null, 8, ["onClick"]),
                        createVNode(_component_q_tab, {
                          name: "profile",
                          icon: "person",
                          label: "我的",
                          onClick: handleProfileClick,
                          "no-caps": ""
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_dialog, {
              modelValue: showNotifications.value,
              "onUpdate:modelValue": ($event) => showNotifications.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card, { style: { "min-width": "300px", "max-width": "400px" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_card_section, { class: "row items-center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-h6" data-v-b03fcb27${_scopeId4}>通知</div>`);
                              _push5(ssrRenderComponent(_component_q_space, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_btn, {
                                flat: "",
                                dense: "",
                                round: "",
                                icon: "close",
                                onClick: ($event) => showNotifications.value = false
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "text-h6" }, "通知"),
                                createVNode(_component_q_space),
                                createVNode(_component_q_btn, {
                                  flat: "",
                                  dense: "",
                                  round: "",
                                  icon: "close",
                                  onClick: ($event) => showNotifications.value = false
                                }, null, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_card_section, { class: "q-pt-none" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_list, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(3, (i) => {
                                      _push6(ssrRenderComponent(_component_q_item, {
                                        key: i,
                                        clickable: ""
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_q_avatar, {
                                                    color: "primary",
                                                    "text-color": "white",
                                                    icon: "notifications"
                                                  }, null, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_avatar, {
                                                      color: "primary",
                                                      "text-color": "white",
                                                      icon: "notifications"
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item_section, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_q_item_label, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`新的預約確認`);
                                                      } else {
                                                        return [
                                                          createTextVNode("新的預約確認")
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`您的預約已被確認，請準時到達`);
                                                      } else {
                                                        return [
                                                          createTextVNode("您的預約已被確認，請準時到達")
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_label, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("新的預約確認")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_q_item_label, { caption: "" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("您的預約已被確認，請準時到達")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_q_item_section, {
                                              side: "",
                                              top: ""
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_q_item_label, { caption: "" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`5 分鐘前`);
                                                      } else {
                                                        return [
                                                          createTextVNode("5 分鐘前")
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_label, { caption: "" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("5 分鐘前")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_section, { avatar: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_avatar, {
                                                    color: "primary",
                                                    "text-color": "white",
                                                    icon: "notifications"
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("新的預約確認")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_q_item_label, { caption: "" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("您的預約已被確認，請準時到達")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, {
                                                side: "",
                                                top: ""
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_label, { caption: "" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("5 分鐘前")
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
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                                        return createVNode(_component_q_item, {
                                          key: i,
                                          clickable: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_avatar, {
                                                  color: "primary",
                                                  "text-color": "white",
                                                  icon: "notifications"
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("新的預約確認")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_q_item_label, { caption: "" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("您的預約已被確認，請準時到達")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, {
                                              side: "",
                                              top: ""
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_label, { caption: "" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("5 分鐘前")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 64))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_list, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                                      return createVNode(_component_q_item, {
                                        key: i,
                                        clickable: ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, { avatar: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_avatar, {
                                                color: "primary",
                                                "text-color": "white",
                                                icon: "notifications"
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("新的預約確認")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("您的預約已被確認，請準時到達")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, {
                                            side: "",
                                            top: ""
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { caption: "" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("5 分鐘前")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
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
                                onClick: ($event) => showNotifications.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 全部已讀 `);
                                  } else {
                                    return [
                                      createTextVNode(" 全部已讀 ")
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
                                  onClick: ($event) => showNotifications.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 全部已讀 ")
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
                          createVNode(_component_q_card_section, { class: "row items-center" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6" }, "通知"),
                              createVNode(_component_q_space),
                              createVNode(_component_q_btn, {
                                flat: "",
                                dense: "",
                                round: "",
                                icon: "close",
                                onClick: ($event) => showNotifications.value = false
                              }, null, 8, ["onClick"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_card_section, { class: "q-pt-none" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_list, null, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                                    return createVNode(_component_q_item, {
                                      key: i,
                                      clickable: ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_avatar, {
                                              color: "primary",
                                              "text-color": "white",
                                              icon: "notifications"
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("新的預約確認")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("您的預約已被確認，請準時到達")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, {
                                          side: "",
                                          top: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, { caption: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("5 分鐘前")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_card_actions, { align: "right" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "primary",
                                onClick: ($event) => showNotifications.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 全部已讀 ")
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
                    createVNode(_component_q_card, { style: { "min-width": "300px", "max-width": "400px" } }, {
                      default: withCtx(() => [
                        createVNode(_component_q_card_section, { class: "row items-center" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-h6" }, "通知"),
                            createVNode(_component_q_space),
                            createVNode(_component_q_btn, {
                              flat: "",
                              dense: "",
                              round: "",
                              icon: "close",
                              onClick: ($event) => showNotifications.value = false
                            }, null, 8, ["onClick"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_card_section, { class: "q-pt-none" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_list, null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                                  return createVNode(_component_q_item, {
                                    key: i,
                                    clickable: ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_avatar, {
                                            color: "primary",
                                            "text-color": "white",
                                            icon: "notifications"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("新的預約確認")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("您的預約已被確認，請準時到達")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, {
                                        side: "",
                                        top: ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, { caption: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("5 分鐘前")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_card_actions, { align: "right" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "primary",
                              onClick: ($event) => showNotifications.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 全部已讀 ")
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
            _push2(ssrRenderComponent(_component_q_dialog, {
              modelValue: showUserMenu.value,
              "onUpdate:modelValue": ($event) => showUserMenu.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card, { style: { "min-width": "250px" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(authStore).currentUser) {
                          _push4(ssrRenderComponent(_component_q_card_section, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="text-center" data-v-b03fcb27${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_q_avatar, {
                                  size: "60px",
                                  class: "q-mb-md"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      if (unref(authStore).currentUser.avatar) {
                                        _push6(`<img${ssrRenderAttr("src", unref(authStore).currentUser.avatar)}${ssrRenderAttr("alt", unref(authStore).currentUser.name)} data-v-b03fcb27${_scopeId5}>`);
                                      } else {
                                        _push6(ssrRenderComponent(_component_q_icon, { name: "person" }, null, _parent6, _scopeId5));
                                      }
                                    } else {
                                      return [
                                        unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          src: unref(authStore).currentUser.avatar,
                                          alt: unref(authStore).currentUser.name
                                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                          key: 1,
                                          name: "person"
                                        }))
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`<div class="text-h6" data-v-b03fcb27${_scopeId4}>${ssrInterpolate(unref(authStore).currentUser.name)}</div><div class="text-caption text-grey-6" data-v-b03fcb27${_scopeId4}>${ssrInterpolate(unref(authStore).currentUser.email)}</div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "text-center" }, [
                                    createVNode(_component_q_avatar, {
                                      size: "60px",
                                      class: "q-mb-md"
                                    }, {
                                      default: withCtx(() => [
                                        unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          src: unref(authStore).currentUser.avatar,
                                          alt: unref(authStore).currentUser.name
                                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                          key: 1,
                                          name: "person"
                                        }))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "text-h6" }, toDisplayString$1(unref(authStore).currentUser.name), 1),
                                    createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString$1(unref(authStore).currentUser.email), 1)
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_component_q_separator, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_list, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_item, {
                                clickable: "",
                                onClick: ($event) => {
                                  ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/profile");
                                  showUserMenu.value = false;
                                }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_icon, { name: "person" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, { name: "person" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_q_item_section, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`個人資料`);
                                        } else {
                                          return [
                                            createTextVNode("個人資料")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, { name: "person" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createTextVNode("個人資料")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_item, {
                                clickable: "",
                                onClick: ($event) => {
                                  ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/settings");
                                  showUserMenu.value = false;
                                }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_icon, { name: "settings" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, { name: "settings" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_q_item_section, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`設定`);
                                        } else {
                                          return [
                                            createTextVNode("設定")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, { name: "settings" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createTextVNode("設定")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_separator, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_item, {
                                clickable: "",
                                onClick: handleLogout
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_icon, {
                                            name: "logout",
                                            color: "negative"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: "logout",
                                              color: "negative"
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_q_item_section, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`登出`);
                                        } else {
                                          return [
                                            createTextVNode("登出")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "logout",
                                            color: "negative"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createTextVNode("登出")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_item, {
                                  clickable: "",
                                  onClick: ($event) => {
                                    ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/profile");
                                    showUserMenu.value = false;
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, { name: "person" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createTextVNode("個人資料")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_q_item, {
                                  clickable: "",
                                  onClick: ($event) => {
                                    ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/settings");
                                    showUserMenu.value = false;
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, { name: "settings" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createTextVNode("設定")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_q_separator),
                                createVNode(_component_q_item, {
                                  clickable: "",
                                  onClick: handleLogout
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "logout",
                                          color: "negative"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createTextVNode("登出")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          unref(authStore).currentUser ? (openBlock(), createBlock(_component_q_card_section, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-center" }, [
                                createVNode(_component_q_avatar, {
                                  size: "60px",
                                  class: "q-mb-md"
                                }, {
                                  default: withCtx(() => [
                                    unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: unref(authStore).currentUser.avatar,
                                      alt: unref(authStore).currentUser.name
                                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                      key: 1,
                                      name: "person"
                                    }))
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "text-h6" }, toDisplayString$1(unref(authStore).currentUser.name), 1),
                                createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString$1(unref(authStore).currentUser.email), 1)
                              ])
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(_component_q_separator),
                          createVNode(_component_q_list, null, {
                            default: withCtx(() => [
                              createVNode(_component_q_item, {
                                clickable: "",
                                onClick: ($event) => {
                                  ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/profile");
                                  showUserMenu.value = false;
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, { name: "person" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createTextVNode("個人資料")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_component_q_item, {
                                clickable: "",
                                onClick: ($event) => {
                                  ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/settings");
                                  showUserMenu.value = false;
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, { name: "settings" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createTextVNode("設定")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_component_q_separator),
                              createVNode(_component_q_item, {
                                clickable: "",
                                onClick: handleLogout
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "logout",
                                        color: "negative"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_section, null, {
                                    default: withCtx(() => [
                                      createTextVNode("登出")
                                    ]),
                                    _: 1
                                  })
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card, { style: { "min-width": "250px" } }, {
                      default: withCtx(() => [
                        unref(authStore).currentUser ? (openBlock(), createBlock(_component_q_card_section, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-center" }, [
                              createVNode(_component_q_avatar, {
                                size: "60px",
                                class: "q-mb-md"
                              }, {
                                default: withCtx(() => [
                                  unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: unref(authStore).currentUser.avatar,
                                    alt: unref(authStore).currentUser.name
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                    key: 1,
                                    name: "person"
                                  }))
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "text-h6" }, toDisplayString$1(unref(authStore).currentUser.name), 1),
                              createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString$1(unref(authStore).currentUser.email), 1)
                            ])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(_component_q_separator),
                        createVNode(_component_q_list, null, {
                          default: withCtx(() => [
                            createVNode(_component_q_item, {
                              clickable: "",
                              onClick: ($event) => {
                                ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/profile");
                                showUserMenu.value = false;
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, { name: "person" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createTextVNode("個人資料")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_q_item, {
                              clickable: "",
                              onClick: ($event) => {
                                ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/settings");
                                showUserMenu.value = false;
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, { name: "settings" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createTextVNode("設定")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_q_separator),
                            createVNode(_component_q_item, {
                              clickable: "",
                              onClick: handleLogout
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: "logout",
                                      color: "negative"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createTextVNode("登出")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
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
              createVNode(_component_q_header, {
                elevated: "",
                class: "bg-primary text-white"
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_toolbar, null, {
                    default: withCtx(() => [
                      canGoBack.value ? (openBlock(), createBlock(_component_q_btn, {
                        key: 0,
                        flat: "",
                        dense: "",
                        round: "",
                        icon: "arrow_back",
                        class: "q-mr-sm",
                        onClick: goBack,
                        "aria-label": "返回"
                      })) : (openBlock(), createBlock(_component_q_btn, {
                        key: 1,
                        flat: "",
                        dense: "",
                        round: "",
                        icon: "menu",
                        class: "q-mr-sm",
                        onClick: ($event) => drawer.value = !drawer.value,
                        "aria-label": "選單"
                      }, null, 8, ["onClick"])),
                      createVNode(_component_q_toolbar_title, { class: "text-h6" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString$1(currentPageTitle.value), 1)
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "row q-gutter-xs" }, [
                        unref(authStore).currentUser ? (openBlock(), createBlock(_component_q_btn, {
                          key: 0,
                          flat: "",
                          dense: "",
                          round: "",
                          icon: "notifications",
                          onClick: ($event) => showNotifications.value = true
                        }, {
                          default: withCtx(() => [
                            unreadNotifications.value > 0 ? (openBlock(), createBlock(_component_q_badge, {
                              key: 0,
                              color: "negative",
                              floating: "",
                              rounded: ""
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString$1(unreadNotifications.value), 1)
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : createCommentVNode("", true),
                        unref(authStore).currentUser ? (openBlock(), createBlock(_component_q_btn, {
                          key: 1,
                          flat: "",
                          dense: "",
                          round: "",
                          onClick: ($event) => showUserMenu.value = true
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_avatar, { size: "32px" }, {
                              default: withCtx(() => [
                                unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: unref(authStore).currentUser.avatar,
                                  alt: unref(authStore).currentUser.name
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                  key: 1,
                                  name: "person"
                                }))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : (openBlock(), createBlock(_component_q_btn, {
                          key: 2,
                          flat: "",
                          dense: "",
                          icon: "login",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login"),
                          "aria-label": "登入"
                        }, null, 8, ["onClick"]))
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_drawer, {
                modelValue: drawer.value,
                "onUpdate:modelValue": ($event) => drawer.value = $event,
                side: "left",
                overlay: "",
                bordered: "",
                width: 280,
                breakpoint: 768,
                class: "bg-white"
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_scroll_area, { class: "fit" }, {
                    default: withCtx(() => [
                      unref(authStore).currentUser ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-primary text-white q-pa-md"
                      }, [
                        createVNode("div", { class: "row items-center q-gutter-md" }, [
                          createVNode(_component_q_avatar, { size: "50px" }, {
                            default: withCtx(() => [
                              unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: unref(authStore).currentUser.avatar,
                                alt: unref(authStore).currentUser.name
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                key: 1,
                                name: "person"
                              }))
                            ]),
                            _: 1
                          }),
                          createVNode("div", null, [
                            createVNode("div", { class: "text-subtitle1 text-weight-medium" }, toDisplayString$1(unref(authStore).currentUser.name), 1),
                            createVNode("div", { class: "text-caption opacity-80" }, toDisplayString$1(unref(authStore).currentUser.email), 1)
                          ])
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "bg-grey-1 q-pa-md text-center"
                      }, [
                        createVNode(_component_q_icon, {
                          name: "person_outline",
                          size: "40px",
                          color: "grey-6"
                        }),
                        createVNode("div", { class: "text-body2 text-grey-7 q-mt-sm q-mb-md" }, " 登入以享受完整功能 "),
                        createVNode(_component_q_btn, {
                          color: "primary",
                          size: "sm",
                          onClick: ($event) => {
                            ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login");
                            drawer.value = false;
                          }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 立即登入 ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])),
                      createVNode(_component_q_separator),
                      createVNode(_component_q_list, { padding: "" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_item_label, {
                            header: "",
                            class: "text-weight-medium text-grey-8"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 主選單 ")
                            ]),
                            _: 1
                          }),
                          (openBlock(), createBlock(Fragment, null, renderList(mainMenuItems, (item) => {
                            return withDirectives(createVNode(_component_q_item, {
                              key: item.to,
                              clickable: "",
                              to: item.to,
                              onClick: ($event) => drawer.value = false,
                              exact: "",
                              class: "rounded-borders q-ma-xs"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: item.icon,
                                      color: "primary"
                                    }, null, 8, ["name"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString$1(item.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_label, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString$1(item.caption), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["to", "onClick"]), [
                              [_directive_ripple]
                            ]);
                          }), 64)),
                          createVNode(_component_q_separator, { class: "q-my-md" }),
                          createVNode(_component_q_item_label, {
                            header: "",
                            class: "text-weight-medium text-grey-8"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 用戶中心 ")
                            ]),
                            _: 1
                          }),
                          (openBlock(), createBlock(Fragment, null, renderList(userMenuItems, (item) => {
                            return withDirectives(createVNode(_component_q_item, {
                              key: item.to,
                              clickable: "",
                              to: item.to,
                              onClick: ($event) => drawer.value = false,
                              exact: "",
                              class: "rounded-borders q-ma-xs",
                              disable: !unref(authStore).currentUser && item.requireAuth
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: item.icon,
                                      color: "secondary"
                                    }, null, 8, ["name"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString$1(item.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_label, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString$1(item.caption), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                !unref(authStore).currentUser && item.requireAuth ? (openBlock(), createBlock(_component_q_item_section, {
                                  key: 0,
                                  side: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: "lock",
                                      color: "grey-5",
                                      size: "xs"
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["to", "onClick", "disable"]), [
                              [_directive_ripple]
                            ]);
                          }), 64)),
                          createVNode(_component_q_separator, { class: "q-my-md" }),
                          createVNode(_component_q_item_label, {
                            header: "",
                            class: "text-weight-medium text-grey-8"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 其他 ")
                            ]),
                            _: 1
                          }),
                          (openBlock(), createBlock(Fragment, null, renderList(otherMenuItems, (item) => {
                            return withDirectives(createVNode(_component_q_item, {
                              key: item.to,
                              clickable: "",
                              to: item.to,
                              onClick: ($event) => drawer.value = false,
                              exact: "",
                              class: "rounded-borders q-ma-xs"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: item.icon,
                                      color: "grey-6"
                                    }, null, 8, ["name"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_q_item_section, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString$1(item.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_label, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString$1(item.caption), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["to", "onClick"]), [
                              [_directive_ripple]
                            ]);
                          }), 64)),
                          unref(authStore).currentUser ? withDirectives((openBlock(), createBlock(_component_q_item, {
                            key: 0,
                            clickable: "",
                            onClick: handleLogout,
                            class: "rounded-borders q-ma-xs text-negative"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_item_section, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_icon, {
                                    name: "logout",
                                    color: "negative"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item_section, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_item_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("登出")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_q_item_label, { caption: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode("結束此次工作階段")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [_directive_ripple]
                          ]) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_q_page_container, null, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPage)
                ]),
                _: 1
              }),
              createVNode(_component_q_footer, {
                elevated: "",
                class: "bg-white border-t"
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_tabs, {
                    modelValue: activeTab.value,
                    "onUpdate:modelValue": ($event) => activeTab.value = $event,
                    dense: "",
                    align: "justify",
                    "indicator-color": "primary",
                    "active-color": "primary",
                    "inactive-color": "grey-6",
                    class: "text-grey-8"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_q_tab, {
                        name: "home",
                        icon: "home",
                        label: "首頁",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/"),
                        "no-caps": ""
                      }, null, 8, ["onClick"]),
                      createVNode(_component_q_tab, {
                        name: "caregivers",
                        icon: "people",
                        label: "看護師",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/caregivers"),
                        "no-caps": ""
                      }, null, 8, ["onClick"]),
                      createVNode(_component_q_tab, {
                        name: "booking",
                        icon: "calendar_today",
                        label: "預約",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/booking/match"),
                        "no-caps": ""
                      }, null, 8, ["onClick"]),
                      createVNode(_component_q_tab, {
                        name: "profile",
                        icon: "person",
                        label: "我的",
                        onClick: handleProfileClick,
                        "no-caps": ""
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_q_dialog, {
                modelValue: showNotifications.value,
                "onUpdate:modelValue": ($event) => showNotifications.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card, { style: { "min-width": "300px", "max-width": "400px" } }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, { class: "row items-center" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6" }, "通知"),
                          createVNode(_component_q_space),
                          createVNode(_component_q_btn, {
                            flat: "",
                            dense: "",
                            round: "",
                            icon: "close",
                            onClick: ($event) => showNotifications.value = false
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card_section, { class: "q-pt-none" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_list, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                                return createVNode(_component_q_item, {
                                  key: i,
                                  clickable: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_avatar, {
                                          color: "primary",
                                          "text-color": "white",
                                          icon: "notifications"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("新的預約確認")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("您的預約已被確認，請準時到達")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, {
                                      side: "",
                                      top: ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("5 分鐘前")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card_actions, { align: "right" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "primary",
                            onClick: ($event) => showNotifications.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 全部已讀 ")
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
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_q_dialog, {
                modelValue: showUserMenu.value,
                "onUpdate:modelValue": ($event) => showUserMenu.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card, { style: { "min-width": "250px" } }, {
                    default: withCtx(() => [
                      unref(authStore).currentUser ? (openBlock(), createBlock(_component_q_card_section, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-center" }, [
                            createVNode(_component_q_avatar, {
                              size: "60px",
                              class: "q-mb-md"
                            }, {
                              default: withCtx(() => [
                                unref(authStore).currentUser.avatar ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: unref(authStore).currentUser.avatar,
                                  alt: unref(authStore).currentUser.name
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_q_icon, {
                                  key: 1,
                                  name: "person"
                                }))
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "text-h6" }, toDisplayString$1(unref(authStore).currentUser.name), 1),
                            createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString$1(unref(authStore).currentUser.email), 1)
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_q_separator),
                      createVNode(_component_q_list, null, {
                        default: withCtx(() => [
                          createVNode(_component_q_item, {
                            clickable: "",
                            onClick: ($event) => {
                              ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/profile");
                              showUserMenu.value = false;
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_item_section, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_icon, { name: "person" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item_section, null, {
                                default: withCtx(() => [
                                  createTextVNode("個人資料")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_q_item, {
                            clickable: "",
                            onClick: ($event) => {
                              ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/settings");
                              showUserMenu.value = false;
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_item_section, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_icon, { name: "settings" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item_section, null, {
                                default: withCtx(() => [
                                  createTextVNode("設定")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_q_separator),
                          createVNode(_component_q_item, {
                            clickable: "",
                            onClick: handleLogout
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_item_section, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_icon, {
                                    name: "logout",
                                    color: "negative"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_item_section, null, {
                                default: withCtx(() => [
                                  createTextVNode("登出")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
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
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b03fcb27"]]);
function usePageSeo(title, description, image = "/vite.svg") {
  const route = useRoute();
  const config = /* @__PURE__ */ useRuntimeConfig();
  const baseUrl = config.public.baseUrl || "";
  const { link: i18nLinks } = useLocaleHead({});
  useHead({
    link: [
      { rel: "canonical", href: baseUrl + route.fullPath },
      ...i18nLinks || []
    ],
    meta: [{ name: "robots", content: "index, follow" }],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "首頁",
              item: baseUrl + "/"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: title,
              item: baseUrl + route.fullPath
            }
          ]
        })
      }
    ]
  });
  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogType: "website",
    ogUrl: baseUrl + route.fullPath,
    ogImage: baseUrl + image,
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: "summary_large_image",
    twitterImage: baseUrl + image
  });
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    usePageSeo("錯誤 - DogFriend", "發生錯誤時的說明頁面");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-900" }, _attrs))}><div class="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center"><h1 class="text-5xl font-bold text-red-600 dark:text-red-400 mb-4">${ssrInterpolate(__props.error?.statusCode || "錯誤")}</h1><h2 class="text-xl text-gray-800 dark:text-gray-200 mt-2 mb-6">${ssrInterpolate(__props.error?.statusMessage || "發生未知錯誤")}</h2>`);
      if (__props.error?.statusCode === 404) {
        _push(`<p class="text-gray-600 dark:text-gray-400 mb-8"> 您要尋找的頁面可能已被移除、名稱變更或暫時無法使用。 </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col sm:flex-row gap-4 justify-center"><button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">${ssrInterpolate(__props.error?.statusCode === 404 ? "返回首頁" : "重試")}</button>`);
      if (__props.error?.statusCode !== 404) {
        _push(`<button class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"> 返回上一頁 </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext?._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

const server = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  _: _export_sfc,
  a: useHead,
  b: useRuntimeConfig,
  c: createError,
  d: useAuthStore,
  default: entry$1,
  e: useRoute,
  f: useNuxtApp,
  g: mockPayments,
  h: mockCaregivers,
  i: mockReviews,
  j: mockUsers,
  k: useSupabase,
  l: defineNuxtRouteMiddleware,
  m: mockBookings,
  n: navigateTo,
  u: usePageSeo
}, Symbol.toStringTag, { value: 'Module' }));

export { __nuxt_component_23 as $, hUniqueSlot as A, scrollTargetProp as B, getScrollTarget as C, listenOpts as D, hMergeSlot as E, vmHasRouter as F, isNumber$1 as G, History as H, isDate$1 as I, isObject$1 as J, injectMultipleProps as K, injectProp as L, useSpinnerProps as M, useSpinner as N, useNuxtApp as O, navigateTo as P, useAlignProps as Q, useAlign as R, getNormalizedVNodes as S, useRouterLinkProps as T, useRouterLink as U, btnDesignOptions as V, between as W, btnPadding as X, getBtnDesign as Y, isKeyCode as Z, _export_sfc as _, __nuxt_component_1$1 as a, __nuxt_component_4 as a$, useSizeProps as a0, useSize as a1, useFormProps as a2, useFormAttrs as a3, useFormInject as a4, stopAndPrevent as a5, layoutKey as a6, pageContainerKey as a7, useModelToggleEmits as a8, useModelToggleProps as a9, childHasFocus as aA, useFormInputNameAttr as aB, fieldValueIsFilled as aC, useKeyComposition as aD, isDeepEqual as aE, shouldIgnoreKey as aF, normalizeToInterval as aG, stop as aH, hDir as aI, hMergeSlotSafely as aJ, __q_directive_0 as aK, mockBookings as aL, mockPayments as aM, mockCaregivers as aN, mockReviews as aO, mockUsers as aP, useSupabase as aQ, formKey as aR, vmIsDestroyed as aS, pad as aT, Plugin$2 as aU, defaultLang as aV, createDirective as aW, getSSRProps as aX, __nuxt_component_0 as aY, __nuxt_component_1 as aZ, __nuxt_component_2 as a_, useId as aa, useModelToggle as ab, uid as ac, getParentProxy as ad, Platform as ae, debounce as af, useFieldEmits as ag, useFieldProps as ah, useField as ai, useFieldState as aj, prevent as ak, addEvt as al, cleanEvt as am, client as an, getScrollbarWidth as ao, useTransitionProps as ap, useTick as aq, useTimeout as ar, useTransition as as, usePortal as at, addEscapeKey as au, removeEscapeKey as av, addFocusout as aw, position as ax, removeFocusout as ay, addFocusFn as az, __nuxt_component_2$1 as b, __nuxt_component_15 as b0, __nuxt_component_17 as b1, QSpinner as b2, defineNuxtRouteMiddleware as b3, server as b4, __nuxt_component_3 as c, __nuxt_component_3$2 as d, __nuxt_component_5 as e, __nuxt_component_6 as f, __nuxt_component_1$1$1 as g, __nuxt_component_8 as h, __nuxt_component_5$2 as i, __nuxt_component_9$1 as j, useHead as k, useRuntimeConfig as l, __nuxt_component_5$1 as m, createError as n, useQuasar as o, useAuthStore as p, __nuxt_component_4$1 as q, __nuxt_component_20 as r, useRoute as s, createComponent as t, usePageSeo as u, useDarkProps as v, useDark as w, timelineKey as x, hSlot as y, emptyRenderFn as z };
//# sourceMappingURL=server.mjs.map
