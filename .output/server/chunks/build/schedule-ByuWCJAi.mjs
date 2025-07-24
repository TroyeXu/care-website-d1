import { t as createComponent, y as hSlot, aT as pad, aU as Plugin, aV as defaultLang, v as useDarkProps, a2 as useFormProps, w as useDark, a3 as useFormAttrs, J as isObject, a4 as useFormInject, c as __nuxt_component_3, _ as _export_sfc, u as usePageSeo, o as useQuasar, p as useAuthStore, O as useNuxtApp, l as useRuntimeConfig, k as useHead, g as __nuxt_component_1$1, a as __nuxt_component_1, b as __nuxt_component_2, r as __nuxt_component_20, j as __nuxt_component_9$1, P as navigateTo } from './server.mjs';
import { computed, h, getCurrentInstance, ref, watch, nextTick, Transition, defineComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, createBlock, openBlock, Fragment, renderList, toDisplayString, withModifiers, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useApiService } from './useApiService-Bqe0bsFu.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_8 } from '../_/QSelect.mjs';
import { _ as __nuxt_component_1$2 } from '../_/QSpinnerGrid.mjs';
import { _ as __nuxt_component_8$1 } from '../_/QTooltip.mjs';
import { _ as __nuxt_component_9 } from '../_/QChip.mjs';
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
import './useApiConfig-D0iRs2xG.mjs';

const __nuxt_component_5 = createComponent({
  name: 'QBtnGroup',

  props: {
    unelevated: Boolean,
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    square: Boolean,
    push: Boolean,
    stretch: Boolean,
    glossy: Boolean,
    spread: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() => {
      const cls = [ 'unelevated', 'outline', 'flat', 'rounded', 'square', 'push', 'stretch', 'glossy' ]
        .filter(t => props[ t ] === true)
        .map(t => `q-btn-group--${ t }`).join(' ');

      return `q-btn-group row no-wrap${ cls.length !== 0 ? ' ' + cls : '' }`
        + (props.spread === true ? ' q-btn-group--spread' : ' inline')
    });

    return () => h('div', { class: classes.value }, hSlot(slots.default))
  }
});

function useRenderCache () {
  let cache = Object.create(null);

  return {
    getCache: (_, defaultValue) => (
          typeof defaultValue === 'function'
            ? defaultValue()
            : defaultValue
        )
      ,

    setCache (key, obj) {
      cache[ key ] = obj;
    },

    hasCache (key) {
      return Object.hasOwnProperty.call(cache, key)
    },

    clearCache (key) {
      if (key !== void 0) {
        delete cache[ key ];
      }
      else {
        cache = Object.create(null);
      }
    }
  }
}

// taken from https://github.com/jalaali/jalaali-js

/*
  Jalaali years starting the 33-year rule.
*/
const breaks = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
  1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
];

/*
  Converts a Gregorian date to Jalaali.
*/
function toJalaali (gy, gm, gd) {
  if (Object.prototype.toString.call(gy) === '[object Date]') {
    gd = gy.getDate();
    gm = gy.getMonth() + 1;
    gy = gy.getFullYear();
  }
  return d2j(g2d(gy, gm, gd))
}

/*
  Converts a Jalaali date to Gregorian.
*/
function toGregorian (jy, jm, jd) {
  return d2g(j2d(jy, jm, jd))
}

/*
  Is this a leap year or not?
*/
function isLeapJalaaliYear (jy) {
  return jalCalLeap(jy) === 0
}

/*
  Number of days in a given month in a Jalaali year.
*/
function jalaaliMonthLength (jy, jm) {
  if (jm <= 6) return 31
  if (jm <= 11) return 30
  if (isLeapJalaaliYear(jy)) return 30
  return 29
}

/*
    This function determines if the Jalaali (Persian) year is
    leap (366-day long) or is the common year (365 days)

    @param jy Jalaali calendar year (-61 to 3177)
    @returns number of years since the last leap year (0 to 4)
 */
function jalCalLeap (jy) {
  const bl = breaks.length;
  let
    jp = breaks[ 0 ],
    jm,
    jump,
    leap,
    n,
    i;

  if (jy < jp || jy >= breaks[ bl - 1 ]) { throw new Error('Invalid Jalaali year ' + jy) }

  for (i = 1; i < bl; i += 1) {
    jm = breaks[ i ];
    jump = jm - jp;
    if (jy < jm) { break }
    jp = jm;
  }
  n = jy - jp;

  if (jump - n < 6) { n = n - jump + div(jump + 4, 33) * 33; }
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }

  return leap
}

/*
  This function determines if the Jalaali (Persian) year is
  leap (366-day long) or is the common year (365 days), and
  finds the day in March (Gregorian calendar) of the first
  day of the Jalaali year (jy).

  @param jy Jalaali calendar year (-61 to 3177)
  @param withoutLeap when don't need leap (true or false) default is false
  @return
    leap: number of years since the last leap year (0 to 4)
    gy: Gregorian year of the beginning of Jalaali year
    march: the March day of Farvardin the 1st (1st day of jy)
  @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
  @see: http://www.fourmilab.ch/documents/calendar/
*/
function jalCal (jy, withoutLeap) {
  const
    bl = breaks.length,
    gy = jy + 621;
  let
    leapJ = -14,
    jp = breaks[ 0 ],
    jm,
    jump,
    leap,
    n,
    i;

  if (jy < jp || jy >= breaks[ bl - 1 ]) { throw new Error('Invalid Jalaali year ' + jy) }

  // Find the limiting years for the Jalaali year jy.
  for (i = 1; i < bl; i += 1) {
    jm = breaks[ i ];
    jump = jm - jp;
    if (jy < jm) { break }
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;

  // Find the number of leap years from AD 621 to the beginning
  // of the current Jalaali year in the Persian calendar.
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) { leapJ += 1; }

  // And the same in the Gregorian calendar (until the year gy).
  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;

  // Determine the Gregorian date of Farvardin the 1st.
  const march = 20 + leapJ - leapG;

  // Find how many years have passed since the last leap year.
  if (!withoutLeap) {
    if (jump - n < 6) { n = n - jump + div(jump + 4, 33) * 33; }
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
      leap = 4;
    }
  }

  return {
    leap,
    gy,
    march
  }
}

/*
  Converts a date of the Jalaali calendar to the Julian Day number.

  @param jy Jalaali year (1 to 3100)
  @param jm Jalaali month (1 to 12)
  @param jd Jalaali day (1 to 29/31)
  @return Julian Day number
*/
function j2d (jy, jm, jd) {
  const r = jalCal(jy, true);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1
}

/*
  Converts the Julian Day number to a date in the Jalaali calendar.

  @param jdn Julian Day number
  @return
    jy: Jalaali year (1 to 3100)
    jm: Jalaali month (1 to 12)
    jd: Jalaali day (1 to 29/31)
*/
function d2j (jdn) {
  const gy = d2g(jdn).gy; // Calculate Gregorian year (gy).
  let
    jy = gy - 621,
    jd,
    jm,
    k;
  const
    r = jalCal(jy, false),
    jdn1f = g2d(gy, 3, r.march);

  // Find number of days that passed since 1 Farvardin.
  k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {
      // The first 6 months.
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return {
        jy,
        jm,
        jd
      }
    }
    else {
      // The remaining months.
      k -= 186;
    }
  }
  else {
    // Previous Jalaali year.
    jy -= 1;
    k += 179;
    if (r.leap === 1) { k += 1; }
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return {
    jy,
    jm,
    jd
  }
}

/*
  Calculates the Julian Day number from Gregorian or Julian
  calendar dates. This integer number corresponds to the noon of
  the date (i.e. 12 hours of Universal Time).
  The procedure was tested to be good since 1 March, -100100 (of both
  calendars) up to a few million years into the future.

  @param gy Calendar year (years BC numbered 0, -1, -2, ...)
  @param gm Calendar month (1 to 12)
  @param gd Calendar day of the month (1 to 28/29/30/31)
  @return Julian Day number
*/
function g2d (gy, gm, gd) {
  let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
      + div(153 * mod(gm + 9, 12) + 2, 5)
      + gd - 34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d
}

/*
  Calculates Gregorian and Julian calendar dates from the Julian Day number
  (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
  calendars) to some millions years ahead of the present.

  @param jdn Julian Day number
  @return
    gy: Calendar year (years BC numbered 0, -1, -2, ...)
    gm: Calendar month (1 to 12)
    gd: Calendar day of the month M (1 to 28/29/30/31)
*/
function d2g (jdn) {
  let j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const
    i = div(mod(j, 1461), 4) * 5 + 308,
    gd = div(mod(i, 153), 5) + 1,
    gm = mod(div(i, 153), 12) + 1,
    gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return {
    gy,
    gm,
    gd
  }
}

/*
  Utility helper functions.
*/

function div (a, b) {
  return ~~(a / b)
}

function mod (a, b) {
  return a - ~~(a / b) * b
}

const calendars = [ 'gregorian', 'persian' ];

const useDatetimeProps = {
  // should define modelValue in the target component

  mask: {
    type: String
  },
  locale: Object,

  calendar: {
    type: String,
    validator: v => calendars.includes(v),
    default: 'gregorian'
  },

  landscape: Boolean,

  color: String,
  textColor: String,

  square: Boolean,
  flat: Boolean,
  bordered: Boolean,

  readonly: Boolean,
  disable: Boolean
};

const useDatetimeEmits = [ 'update:modelValue' ];

function getDayHash (date) {
  return date.year + '/' + pad(date.month) + '/' + pad(date.day)
}

function useDatetime (props, $q) {
  const editable = computed(() => {
    return props.disable !== true && props.readonly !== true
  });

  const tabindex = computed(() => {
    return editable.value === true ? 0 : -1
  });

  const headerClass = computed(() => {
    const cls = [];
    props.color !== void 0 && cls.push(`bg-${ props.color }`);
    props.textColor !== void 0 && cls.push(`text-${ props.textColor }`);
    return cls.join(' ')
  });

  function getLocale () {
    return props.locale !== void 0
      ? { ...$q.lang.date, ...props.locale }
      : $q.lang.date
  }

  function getCurrentDate (dateOnly) {
    const d = new Date();
    const timeFill = dateOnly === true ? null : 0;

    if (props.calendar === 'persian') {
      const jDate = toJalaali(d);
      return {
        year: jDate.jy,
        month: jDate.jm,
        day: jDate.jd
      }
    }

    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      hour: timeFill,
      minute: timeFill,
      second: timeFill,
      millisecond: timeFill
    }
  }

  return {
    editable,
    tabindex,
    headerClass,

    getLocale,
    getCurrentDate
  }
}

/* eslint no-fallthrough: 0 */


const
  MILLISECONDS_IN_DAY = 86400000,
  MILLISECONDS_IN_HOUR = 3600000,
  MILLISECONDS_IN_MINUTE = 60000,
  defaultMask = 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  token = /\[((?:[^\]\\]|\\]|\\)*)\]|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g,
  reverseToken = /(\[[^\]]*\])|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g,
  regexStore = {};

function getRegexData (mask, dateLocale) {
  const
    days = '(' + dateLocale.days.join('|') + ')',
    key = mask + days;

  if (regexStore[ key ] !== void 0) {
    return regexStore[ key ]
  }

  const
    daysShort = '(' + dateLocale.daysShort.join('|') + ')',
    months = '(' + dateLocale.months.join('|') + ')',
    monthsShort = '(' + dateLocale.monthsShort.join('|') + ')';

  const map = {};
  let index = 0;

  const regexText = mask.replace(reverseToken, match => {
    index++;
    switch (match) {
      case 'YY':
        map.YY = index;
        return '(-?\\d{1,2})'
      case 'YYYY':
        map.YYYY = index;
        return '(-?\\d{1,4})'
      case 'M':
        map.M = index;
        return '(\\d{1,2})'
      case 'Mo':
        map.M = index++; // bumping to M
        return '(\\d{1,2}(st|nd|rd|th))'
      case 'MM':
        map.M = index; // bumping to M
        return '(\\d{2})'
      case 'MMM':
        map.MMM = index;
        return monthsShort
      case 'MMMM':
        map.MMMM = index;
        return months
      case 'D':
        map.D = index;
        return '(\\d{1,2})'
      case 'Do':
        map.D = index++; // bumping to D
        return '(\\d{1,2}(st|nd|rd|th))'
      case 'DD':
        map.D = index; // bumping to D
        return '(\\d{2})'
      case 'H':
        map.H = index;
        return '(\\d{1,2})'
      case 'HH':
        map.H = index; // bumping to H
        return '(\\d{2})'
      case 'h':
        map.h = index;
        return '(\\d{1,2})'
      case 'hh':
        map.h = index; // bumping to h
        return '(\\d{2})'
      case 'm':
        map.m = index;
        return '(\\d{1,2})'
      case 'mm':
        map.m = index; // bumping to m
        return '(\\d{2})'
      case 's':
        map.s = index;
        return '(\\d{1,2})'
      case 'ss':
        map.s = index; // bumping to s
        return '(\\d{2})'
      case 'S':
        map.S = index;
        return '(\\d{1})'
      case 'SS':
        map.S = index; // bump to S
        return '(\\d{2})'
      case 'SSS':
        map.S = index; // bump to S
        return '(\\d{3})'
      case 'A':
        map.A = index;
        return '(AM|PM)'
      case 'a':
        map.a = index;
        return '(am|pm)'
      case 'aa':
        map.aa = index;
        return '(a\\.m\\.|p\\.m\\.)'

      case 'ddd':
        return daysShort
      case 'dddd':
        return days
      case 'Q':
      case 'd':
      case 'E':
        return '(\\d{1})'
      case 'do':
        index++;
        return '(\\d{1}(st|nd|rd|th))'
      case 'Qo':
        return '(1st|2nd|3rd|4th)'
      case 'DDD':
      case 'DDDD':
        return '(\\d{1,3})'
      case 'DDDo':
        index++;
        return '(\\d{1,3}(st|nd|rd|th))'
      case 'w':
        return '(\\d{1,2})'
      case 'wo':
        index++;
        return '(\\d{1,2}(st|nd|rd|th))'
      case 'ww':
        return '(\\d{2})'

      case 'Z': // to split: (?:(Z)()()|([+-])?(\\d{2}):?(\\d{2}))
        map.Z = index;
        return '(Z|[+-]\\d{2}:\\d{2})'
      case 'ZZ':
        map.ZZ = index;
        return '(Z|[+-]\\d{2}\\d{2})'

      case 'X':
        map.X = index;
        return '(-?\\d+)'
      case 'x':
        map.x = index;
        return '(-?\\d{4,})'

      default:
        index--;
        if (match[ 0 ] === '[') {
          match = match.substring(1, match.length - 1);
        }
        return match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }
  });

  const res = { map, regex: new RegExp('^' + regexText) };
  regexStore[ key ] = res;

  return res
}

function getDateLocale (paramDateLocale, langProps) {
  return paramDateLocale !== void 0
    ? paramDateLocale
    : (
        langProps !== void 0
          ? langProps.date
          : defaultLang.date
      )
}

function formatTimezone (offset, delimeter = '') {
  const
    sign = offset > 0 ? '-' : '+',
    absOffset = Math.abs(offset),
    hours = Math.floor(absOffset / 60),
    minutes = absOffset % 60;

  return sign + pad(hours) + delimeter + pad(minutes)
}

function __splitDate (str, mask, dateLocale, calendar, defaultModel) {
  const date = {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timezoneOffset: null,
    dateHash: null,
    timeHash: null
  };

  defaultModel !== void 0 && Object.assign(date, defaultModel);

  if (
    str === void 0
    || str === null
    || str === ''
    || typeof str !== 'string'
  ) {
    return date
  }

  if (mask === void 0) {
    mask = defaultMask;
  }

  const
    langOpts = getDateLocale(dateLocale, Plugin.props),
    months = langOpts.months,
    monthsShort = langOpts.monthsShort;

  const { regex, map } = getRegexData(mask, langOpts);

  const match = str.match(regex);

  if (match === null) {
    return date
  }

  let tzString = '';

  if (map.X !== void 0 || map.x !== void 0) {
    const stamp = parseInt(match[ map.X !== void 0 ? map.X : map.x ], 10);

    if (isNaN(stamp) === true || stamp < 0) {
      return date
    }

    const d = new Date(stamp * (map.X !== void 0 ? 1000 : 1));

    date.year = d.getFullYear();
    date.month = d.getMonth() + 1;
    date.day = d.getDate();
    date.hour = d.getHours();
    date.minute = d.getMinutes();
    date.second = d.getSeconds();
    date.millisecond = d.getMilliseconds();
  }
  else {
    if (map.YYYY !== void 0) {
      date.year = parseInt(match[ map.YYYY ], 10);
    }
    else if (map.YY !== void 0) {
      const y = parseInt(match[ map.YY ], 10);
      date.year = y < 0 ? y : 2000 + y;
    }

    if (map.M !== void 0) {
      date.month = parseInt(match[ map.M ], 10);
      if (date.month < 1 || date.month > 12) {
        return date
      }
    }
    else if (map.MMM !== void 0) {
      date.month = monthsShort.indexOf(match[ map.MMM ]) + 1;
    }
    else if (map.MMMM !== void 0) {
      date.month = months.indexOf(match[ map.MMMM ]) + 1;
    }

    if (map.D !== void 0) {
      date.day = parseInt(match[ map.D ], 10);

      if (date.year === null || date.month === null || date.day < 1) {
        return date
      }

      const maxDay = calendar !== 'persian'
        ? (new Date(date.year, date.month, 0)).getDate()
        : jalaaliMonthLength(date.year, date.month);

      if (date.day > maxDay) {
        return date
      }
    }

    if (map.H !== void 0) {
      date.hour = parseInt(match[ map.H ], 10) % 24;
    }
    else if (map.h !== void 0) {
      date.hour = parseInt(match[ map.h ], 10) % 12;
      if (
        (map.A && match[ map.A ] === 'PM')
        || (map.a && match[ map.a ] === 'pm')
        || (map.aa && match[ map.aa ] === 'p.m.')
      ) {
        date.hour += 12;
      }
      date.hour = date.hour % 24;
    }

    if (map.m !== void 0) {
      date.minute = parseInt(match[ map.m ], 10) % 60;
    }

    if (map.s !== void 0) {
      date.second = parseInt(match[ map.s ], 10) % 60;
    }

    if (map.S !== void 0) {
      date.millisecond = parseInt(match[ map.S ], 10) * 10 ** (3 - match[ map.S ].length);
    }

    if (map.Z !== void 0 || map.ZZ !== void 0) {
      tzString = (map.Z !== void 0 ? match[ map.Z ].replace(':', '') : match[ map.ZZ ]);
      date.timezoneOffset = (tzString[ 0 ] === '+' ? -1 : 1) * (60 * tzString.slice(1, 3) + 1 * tzString.slice(3, 5));
    }
  }

  date.dateHash = pad(date.year, 6) + '/' + pad(date.month) + '/' + pad(date.day);
  date.timeHash = pad(date.hour) + ':' + pad(date.minute) + ':' + pad(date.second) + tzString;

  return date
}

function getWeekOfYear (date) {
  // Remove time components of date
  const thursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Change date to Thursday same week
  thursday.setDate(thursday.getDate() - ((thursday.getDay() + 6) % 7) + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601)
  const firstThursday = new Date(thursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occurred and correct for it
  const ds = thursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  thursday.setHours(thursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  const weekDiff = (thursday - firstThursday) / (MILLISECONDS_IN_DAY * 7);
  return 1 + Math.floor(weekDiff)
}

function startOfDate (date, unit, utc) {
  const
    t = new Date(date),
    prefix = `set${ utc === true ? 'UTC' : '' }`;

  switch (unit) {
    case 'year':
    case 'years':
      t[ `${ prefix }Month` ](0);
    case 'month':
    case 'months':
      t[ `${ prefix }Date` ](1);
    case 'day':
    case 'days':
    case 'date':
      t[ `${ prefix }Hours` ](0);
    case 'hour':
    case 'hours':
      t[ `${ prefix }Minutes` ](0);
    case 'minute':
    case 'minutes':
      t[ `${ prefix }Seconds` ](0);
    case 'second':
    case 'seconds':
      t[ `${ prefix }Milliseconds` ](0);
  }
  return t
}

function getDiff (t, sub, interval) {
  return (
    (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)
    - (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)
  ) / interval
}

function getDateDiff (date, subtract, unit = 'days') {
  const
    t = new Date(date),
    sub = new Date(subtract);

  switch (unit) {
    case 'years':
    case 'year':
      return (t.getFullYear() - sub.getFullYear())

    case 'months':
    case 'month':
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth()

    case 'days':
    case 'day':
    case 'date':
      return getDiff(startOfDate(t, 'day'), startOfDate(sub, 'day'), MILLISECONDS_IN_DAY)

    case 'hours':
    case 'hour':
      return getDiff(startOfDate(t, 'hour'), startOfDate(sub, 'hour'), MILLISECONDS_IN_HOUR)

    case 'minutes':
    case 'minute':
      return getDiff(startOfDate(t, 'minute'), startOfDate(sub, 'minute'), MILLISECONDS_IN_MINUTE)

    case 'seconds':
    case 'second':
      return getDiff(startOfDate(t, 'second'), startOfDate(sub, 'second'), 1000)
  }
}

function getDayOfYear (date) {
  return getDateDiff(date, startOfDate(date, 'year'), 'days') + 1
}

function getOrdinal (n) {
  if (n >= 11 && n <= 13) {
    return `${ n }th`
  }
  switch (n % 10) {
    case 1: return `${ n }st`
    case 2: return `${ n }nd`
    case 3: return `${ n }rd`
  }
  return `${ n }th`
}

const formatter = {
  // Year: 00, 01, ..., 99
  YY (date, dateLocale, forcedYear) {
    // workaround for < 1900 with new Date()
    const y = this.YYYY(date, dateLocale, forcedYear) % 100;
    return y >= 0
      ? pad(y)
      : '-' + pad(Math.abs(y))
  },

  // Year: 1900, 1901, ..., 2099
  YYYY (date, _dateLocale, forcedYear) {
    // workaround for < 1900 with new Date()
    return forcedYear !== void 0 && forcedYear !== null
      ? forcedYear
      : date.getFullYear()
  },

  // Month: 1, 2, ..., 12
  M (date) {
    return date.getMonth() + 1
  },

  // Month: 1st, 2nd, ..., 12th
  Mo (date) {
    return getOrdinal(date.getMonth() + 1)
  },

  // Month: 01, 02, ..., 12
  MM (date) {
    return pad(date.getMonth() + 1)
  },

  // Month Short Name: Jan, Feb, ...
  MMM (date, dateLocale) {
    return dateLocale.monthsShort[ date.getMonth() ]
  },

  // Month Name: January, February, ...
  MMMM (date, dateLocale) {
    return dateLocale.months[ date.getMonth() ]
  },

  // Quarter: 1, 2, 3, 4
  Q (date) {
    return Math.ceil((date.getMonth() + 1) / 3)
  },

  // Quarter: 1st, 2nd, 3rd, 4th
  Qo (date) {
    return getOrdinal(this.Q(date))
  },

  // Day of month: 1, 2, ..., 31
  D (date) {
    return date.getDate()
  },

  // Day of month: 1st, 2nd, ..., 31st
  Do (date) {
    return getOrdinal(date.getDate())
  },

  // Day of month: 01, 02, ..., 31
  DD (date) {
    return pad(date.getDate())
  },

  // Day of year: 1, 2, ..., 366
  DDD (date) {
    return getDayOfYear(date)
  },

  // Day of year: 1st, 2nd, ..., 366th
  DDDo (date) {
    return getOrdinal(getDayOfYear(date))
  },

  // Day of year: 001, 002, ..., 366
  DDDD (date) {
    return pad(getDayOfYear(date), 3)
  },

  // Day of week: 0, 1, ..., 6
  d (date) {
    return date.getDay()
  },

  // Day of week: 0th, 1st, ..., 6th
  do (date) {
    return getOrdinal(date.getDay())
  },

  // Day of week: Su, Mo, ...
  dd (date, dateLocale) {
    return (dateLocale.days[ date.getDay() ]).slice(0, 2)
  },

  // Day of week: Sun, Mon, ...
  ddd (date, dateLocale) {
    return dateLocale.daysShort[ date.getDay() ]
  },

  // Day of week: Sunday, Monday, ...
  dddd (date, dateLocale) {
    return dateLocale.days[ date.getDay() ]
  },

  // Day of ISO week: 1, 2, ..., 7
  E (date) {
    return date.getDay() || 7
  },

  // Week of Year: 1 2 ... 52 53
  w (date) {
    return getWeekOfYear(date)
  },

  // Week of Year: 1st 2nd ... 52nd 53rd
  wo (date) {
    return getOrdinal(getWeekOfYear(date))
  },

  // Week of Year: 01 02 ... 52 53
  ww (date) {
    return pad(getWeekOfYear(date))
  },

  // Hour: 0, 1, ... 23
  H (date) {
    return date.getHours()
  },

  // Hour: 00, 01, ..., 23
  HH (date) {
    return pad(date.getHours())
  },

  // Hour: 1, 2, ..., 12
  h (date) {
    const hours = date.getHours();
    return hours === 0
      ? 12
      : (hours > 12 ? hours % 12 : hours)
  },

  // Hour: 01, 02, ..., 12
  hh (date) {
    return pad(this.h(date))
  },

  // Minute: 0, 1, ..., 59
  m (date) {
    return date.getMinutes()
  },

  // Minute: 00, 01, ..., 59
  mm (date) {
    return pad(date.getMinutes())
  },

  // Second: 0, 1, ..., 59
  s (date) {
    return date.getSeconds()
  },

  // Second: 00, 01, ..., 59
  ss (date) {
    return pad(date.getSeconds())
  },

  // 1/10 of second: 0, 1, ..., 9
  S (date) {
    return Math.floor(date.getMilliseconds() / 100)
  },

  // 1/100 of second: 00, 01, ..., 99
  SS (date) {
    return pad(Math.floor(date.getMilliseconds() / 10))
  },

  // Millisecond: 000, 001, ..., 999
  SSS (date) {
    return pad(date.getMilliseconds(), 3)
  },

  // Meridiem: AM, PM
  A (date) {
    return date.getHours() < 12 ? 'AM' : 'PM'
  },

  // Meridiem: am, pm
  a (date) {
    return date.getHours() < 12 ? 'am' : 'pm'
  },

  // Meridiem: a.m., p.m.
  aa (date) {
    return date.getHours() < 12 ? 'a.m.' : 'p.m.'
  },

  // Timezone: -01:00, +00:00, ... +12:00
  Z (date, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null
      ? date.getTimezoneOffset()
      : forcedTimezoneOffset;

    return formatTimezone(tzOffset, ':')
  },

  // Timezone: -0100, +0000, ... +1200
  ZZ (date, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null
      ? date.getTimezoneOffset()
      : forcedTimezoneOffset;

    return formatTimezone(tzOffset)
  },

  // Seconds timestamp: 512969520
  X (date) {
    return Math.floor(date.getTime() / 1000)
  },

  // Milliseconds timestamp: 512969520900
  x (date) {
    return date.getTime()
  }
};

function formatDate (val, mask, dateLocale, __forcedYear, __forcedTimezoneOffset) {
  if (
    (val !== 0 && !val)
    || val === Infinity
    || val === -Infinity
  ) return

  const date = new Date(val);

  if (isNaN(date)) return

  if (mask === void 0) {
    mask = defaultMask;
  }

  const locale = getDateLocale(dateLocale, Plugin.props);

  return mask.replace(
    token,
    (match, text) => (
      match in formatter
        ? formatter[ match ](date, locale, __forcedYear, __forcedTimezoneOffset)
        : (text === void 0 ? match : text.split('\\]').join(']'))
    )
  )
}

const yearsInterval = 20;
const views = [ 'Calendar', 'Years', 'Months' ];
const viewIsValid = v => views.includes(v);
const yearMonthValidator = v => /^-?[\d]+\/[0-1]\d$/.test(v);
const lineStr = ' \u2014 ';

function getMonthHash (date) {
  return date.year + '/' + pad(date.month)
}

const __nuxt_component_10 = createComponent({
  name: 'QDate',

  props: {
    ...useDatetimeProps,
    ...useFormProps,
    ...useDarkProps,

    modelValue: {
      required: true,
      validator: val => (typeof val === 'string' || Array.isArray(val) === true || Object(val) === val || val === null)
    },

    multiple: Boolean,
    range: Boolean,

    title: String,
    subtitle: String,

    mask: {
      ...useDatetimeProps.mask,
      // this mask is forced
      // when using persian calendar
      default: 'YYYY/MM/DD'
    },

    defaultYearMonth: {
      type: String,
      validator: yearMonthValidator
    },

    yearsInMonthView: Boolean,

    events: [ Array, Function ],
    eventColor: [ String, Function ],

    emitImmediately: Boolean,

    options: [ Array, Function ],

    navigationMinYearMonth: {
      type: String,
      validator: yearMonthValidator
    },

    navigationMaxYearMonth: {
      type: String,
      validator: yearMonthValidator
    },

    noUnset: Boolean,

    firstDayOfWeek: [ String, Number ],
    todayBtn: Boolean,
    minimal: Boolean,
    defaultView: {
      type: String,
      default: 'Calendar',
      validator: viewIsValid
    }
  },

  emits: [
    ...useDatetimeEmits,
    'rangeStart', 'rangeEnd', 'navigation'
  ],

  setup (props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;

    const isDark = useDark(props, $q);
    const { getCache } = useRenderCache();
    const { tabindex, headerClass, getLocale, getCurrentDate } = useDatetime(props, $q);

    let lastEmitValue;

    const formAttrs = useFormAttrs(props);
    const injectFormInput = useFormInject(formAttrs);

    const blurTargetRef = ref(null);
    const innerMask = ref(getMask());
    const innerLocale = ref(getLocale());

    const mask = computed(() => getMask());
    const locale = computed(() => getLocale());

    const today = computed(() => getCurrentDate());

    // model of current calendar view:
    const viewModel = ref(getViewModel(innerMask.value, innerLocale.value));

    const view = ref(props.defaultView);

    const direction = computed(() => ($q.lang.rtl === true ? 'right' : 'left'));
    const monthDirection = ref(direction.value);
    const yearDirection = ref(direction.value);

    const year = viewModel.value.year;
    const startYear = ref(year - (year % yearsInterval) - (year < 0 ? yearsInterval : 0));
    const editRange = ref(null);

    const classes = computed(() => {
      const type = props.landscape === true ? 'landscape' : 'portrait';
      return `q-date q-date--${ type } q-date--${ type }-${ props.minimal === true ? 'minimal' : 'standard' }`
        + (isDark.value === true ? ' q-date--dark q-dark' : '')
        + (props.bordered === true ? ' q-date--bordered' : '')
        + (props.square === true ? ' q-date--square no-border-radius' : '')
        + (props.flat === true ? ' q-date--flat no-shadow' : '')
        + (props.disable === true ? ' disabled' : (props.readonly === true ? ' q-date--readonly' : ''))
    });

    const computedColor = computed(() => {
      return props.color || 'primary'
    });

    const computedTextColor = computed(() => {
      return props.textColor || 'white'
    });

    const isImmediate = computed(() =>
      props.emitImmediately === true
      && props.multiple !== true
      && props.range !== true
    );

    const normalizedModel = computed(() => (
      Array.isArray(props.modelValue) === true
        ? props.modelValue
        : (props.modelValue !== null && props.modelValue !== void 0 ? [ props.modelValue ] : [])
    ));

    const daysModel = computed(() =>
      normalizedModel.value
        .filter(date => typeof date === 'string')
        .map(date => decodeString(date, innerMask.value, innerLocale.value))
        .filter(date =>
          date.dateHash !== null
          && date.day !== null
          && date.month !== null
          && date.year !== null
        )
    );

    const rangeModel = computed(() => {
      const fn = date => decodeString(date, innerMask.value, innerLocale.value);
      return normalizedModel.value
        .filter(date => isObject(date) === true && date.from !== void 0 && date.to !== void 0)
        .map(range => ({ from: fn(range.from), to: fn(range.to) }))
        .filter(range => range.from.dateHash !== null && range.to.dateHash !== null && range.from.dateHash < range.to.dateHash)
    });

    const getNativeDateFn = computed(() => (
      props.calendar !== 'persian'
        ? model => new Date(model.year, model.month - 1, model.day)
        : model => {
          const gDate = toGregorian(model.year, model.month, model.day);
          return new Date(gDate.gy, gDate.gm - 1, gDate.gd)
        }
    ));

    const encodeObjectFn = computed(() => (
      props.calendar === 'persian'
        ? getDayHash
        : (date, mask, locale) => formatDate(
            new Date(
              date.year,
              date.month - 1,
              date.day,
              date.hour,
              date.minute,
              date.second,
              date.millisecond
            ),
            mask === void 0 ? innerMask.value : mask,
            locale === void 0 ? innerLocale.value : locale,
            date.year,
            date.timezoneOffset
          )
    ));

    const daysInModel = computed(() =>
      daysModel.value.length + rangeModel.value.reduce(
        (acc, range) => acc + 1 + getDateDiff(
          getNativeDateFn.value(range.to),
          getNativeDateFn.value(range.from)
        ),
        0
      )
    );

    const headerTitle = computed(() => {
      if (props.title !== void 0 && props.title !== null && props.title.length !== 0) {
        return props.title
      }

      if (editRange.value !== null) {
        const model = editRange.value.init;
        const date = getNativeDateFn.value(model);

        return innerLocale.value.daysShort[ date.getDay() ] + ', '
          + innerLocale.value.monthsShort[ model.month - 1 ] + ' '
          + model.day + lineStr + '?'
      }

      if (daysInModel.value === 0) {
        return lineStr
      }

      if (daysInModel.value > 1) {
        return `${ daysInModel.value } ${ innerLocale.value.pluralDay }`
      }

      const model = daysModel.value[ 0 ];
      const date = getNativeDateFn.value(model);

      if (isNaN(date.valueOf()) === true) {
        return lineStr
      }

      if (innerLocale.value.headerTitle !== void 0) {
        return innerLocale.value.headerTitle(date, model)
      }

      return innerLocale.value.daysShort[ date.getDay() ] + ', '
        + innerLocale.value.monthsShort[ model.month - 1 ] + ' '
        + model.day
    });

    const minSelectedModel = computed(() => {
      const model = daysModel.value.concat(rangeModel.value.map(range => range.from))
        .sort((a, b) => a.year - b.year || a.month - b.month);

      return model[ 0 ]
    });

    const maxSelectedModel = computed(() => {
      const model = daysModel.value.concat(rangeModel.value.map(range => range.to))
        .sort((a, b) => b.year - a.year || b.month - a.month);

      return model[ 0 ]
    });

    const headerSubtitle = computed(() => {
      if (props.subtitle !== void 0 && props.subtitle !== null && props.subtitle.length !== 0) {
        return props.subtitle
      }

      if (daysInModel.value === 0) {
        return lineStr
      }

      if (daysInModel.value > 1) {
        const from = minSelectedModel.value;
        const to = maxSelectedModel.value;
        const month = innerLocale.value.monthsShort;

        return month[ from.month - 1 ] + (
          from.year !== to.year
            ? ' ' + from.year + lineStr + month[ to.month - 1 ] + ' '
            : (
                from.month !== to.month
                  ? lineStr + month[ to.month - 1 ]
                  : ''
              )
        ) + ' ' + to.year
      }

      return daysModel.value[ 0 ].year
    });

    const dateArrow = computed(() => {
      const val = [ $q.iconSet.datetime.arrowLeft, $q.iconSet.datetime.arrowRight ];
      return $q.lang.rtl === true ? val.reverse() : val
    });

    const computedFirstDayOfWeek = computed(() => (
      props.firstDayOfWeek !== void 0
        ? Number(props.firstDayOfWeek)
        : innerLocale.value.firstDayOfWeek
    ));

    const daysOfWeek = computed(() => {
      const
        days = innerLocale.value.daysShort,
        first = computedFirstDayOfWeek.value;

      return first > 0
        ? days.slice(first, 7).concat(days.slice(0, first))
        : days
    });

    const daysInMonth = computed(() => {
      const date = viewModel.value;
      return props.calendar !== 'persian'
        ? (new Date(date.year, date.month, 0)).getDate()
        : jalaaliMonthLength(date.year, date.month)
    });

    const evtColor = computed(() => (
      typeof props.eventColor === 'function'
        ? props.eventColor
        : () => props.eventColor
    ));

    const minNav = computed(() => {
      if (props.navigationMinYearMonth === void 0) {
        return null
      }

      const data = props.navigationMinYearMonth.split('/');
      return { year: parseInt(data[ 0 ], 10), month: parseInt(data[ 1 ], 10) }
    });

    const maxNav = computed(() => {
      if (props.navigationMaxYearMonth === void 0) {
        return null
      }

      const data = props.navigationMaxYearMonth.split('/');
      return { year: parseInt(data[ 0 ], 10), month: parseInt(data[ 1 ], 10) }
    });

    const navBoundaries = computed(() => {
      const data = {
        month: { prev: true, next: true },
        year: { prev: true, next: true }
      };

      if (minNav.value !== null && minNav.value.year >= viewModel.value.year) {
        data.year.prev = false;
        if (minNav.value.year === viewModel.value.year && minNav.value.month >= viewModel.value.month) {
          data.month.prev = false;
        }
      }

      if (maxNav.value !== null && maxNav.value.year <= viewModel.value.year) {
        data.year.next = false;
        if (maxNav.value.year === viewModel.value.year && maxNav.value.month <= viewModel.value.month) {
          data.month.next = false;
        }
      }

      return data
    });

    const daysMap = computed(() => {
      const map = {};

      daysModel.value.forEach(entry => {
        const hash = getMonthHash(entry);

        if (map[ hash ] === void 0) {
          map[ hash ] = [];
        }

        map[ hash ].push(entry.day);
      });

      return map
    });

    const rangeMap = computed(() => {
      const map = {};

      rangeModel.value.forEach(entry => {
        const hashFrom = getMonthHash(entry.from);
        const hashTo = getMonthHash(entry.to);

        if (map[ hashFrom ] === void 0) {
          map[ hashFrom ] = [];
        }

        map[ hashFrom ].push({
          from: entry.from.day,
          to: hashFrom === hashTo ? entry.to.day : void 0,
          range: entry
        });

        if (hashFrom < hashTo) {
          let hash;
          const { year, month } = entry.from;
          const cur = month < 12
            ? { year, month: month + 1 }
            : { year: year + 1, month: 1 };

          while ((hash = getMonthHash(cur)) <= hashTo) {
            if (map[ hash ] === void 0) {
              map[ hash ] = [];
            }

            map[ hash ].push({
              from: void 0,
              to: hash === hashTo ? entry.to.day : void 0,
              range: entry
            });

            cur.month++;
            if (cur.month > 12) {
              cur.year++;
              cur.month = 1;
            }
          }
        }
      });

      return map
    });

    const rangeView = computed(() => {
      if (editRange.value === null) return

      const { init, initHash, final, finalHash } = editRange.value;

      const [ from, to ] = initHash <= finalHash
        ? [ init, final ]
        : [ final, init ];

      const fromHash = getMonthHash(from);
      const toHash = getMonthHash(to);

      if (
        fromHash !== viewMonthHash.value
        && toHash !== viewMonthHash.value
      ) return

      const view = {};

      if (fromHash === viewMonthHash.value) {
        view.from = from.day;
        view.includeFrom = true;
      }
      else {
        view.from = 1;
      }

      if (toHash === viewMonthHash.value) {
        view.to = to.day;
        view.includeTo = true;
      }
      else {
        view.to = daysInMonth.value;
      }

      return view
    });

    const viewMonthHash = computed(() => getMonthHash(viewModel.value));

    const selectionDaysMap = computed(() => {
      const map = {};

      if (props.options === void 0) {
        for (let i = 1; i <= daysInMonth.value; i++) {
          map[ i ] = true;
        }

        return map
      }

      const fn = typeof props.options === 'function'
        ? props.options
        : date => props.options.includes(date);

      for (let i = 1; i <= daysInMonth.value; i++) {
        const dayHash = viewMonthHash.value + '/' + pad(i);
        map[ i ] = fn(dayHash);
      }

      return map
    });

    const eventDaysMap = computed(() => {
      const map = {};

      if (props.events === void 0) {
        for (let i = 1; i <= daysInMonth.value; i++) {
          map[ i ] = false;
        }
      }
      else {
        const fn = typeof props.events === 'function'
          ? props.events
          : date => props.events.includes(date);

        for (let i = 1; i <= daysInMonth.value; i++) {
          const dayHash = viewMonthHash.value + '/' + pad(i);
          map[ i ] = fn(dayHash) === true && evtColor.value(dayHash);
        }
      }

      return map
    });

    const viewDays = computed(() => {
      let date, endDay;
      const { year, month } = viewModel.value;

      if (props.calendar !== 'persian') {
        date = new Date(year, month - 1, 1);
        endDay = (new Date(year, month - 1, 0)).getDate();
      }
      else {
        const gDate = toGregorian(year, month, 1);
        date = new Date(gDate.gy, gDate.gm - 1, gDate.gd);
        let prevJM = month - 1;
        let prevJY = year;
        if (prevJM === 0) {
          prevJM = 12;
          prevJY--;
        }
        endDay = jalaaliMonthLength(prevJY, prevJM);
      }

      return {
        days: date.getDay() - computedFirstDayOfWeek.value - 1,
        endDay
      }
    });

    const days = computed(() => {
      const res = [];
      const { days, endDay } = viewDays.value;

      const len = days < 0 ? days + 7 : days;
      if (len < 6) {
        for (let i = endDay - len; i <= endDay; i++) {
          res.push({ i, fill: true });
        }
      }

      const index = res.length;

      for (let i = 1; i <= daysInMonth.value; i++) {
        const day = { i, event: eventDaysMap.value[ i ], classes: [] };

        if (selectionDaysMap.value[ i ] === true) {
          day.in = true;
          day.flat = true;
        }

        res.push(day);
      }

      // if current view has days in model
      if (daysMap.value[ viewMonthHash.value ] !== void 0) {
        daysMap.value[ viewMonthHash.value ].forEach(day => {
          const i = index + day - 1;
          Object.assign(res[ i ], {
            selected: true,
            unelevated: true,
            flat: false,
            color: computedColor.value,
            textColor: computedTextColor.value
          });
        });
      }

      // if current view has ranges in model
      if (rangeMap.value[ viewMonthHash.value ] !== void 0) {
        rangeMap.value[ viewMonthHash.value ].forEach(entry => {
          if (entry.from !== void 0) {
            const from = index + entry.from - 1;
            const to = index + (entry.to || daysInMonth.value) - 1;

            for (let day = from; day <= to; day++) {
              Object.assign(res[ day ], {
                range: entry.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }

            Object.assign(res[ from ], {
              rangeFrom: true,
              flat: false
            });

            entry.to !== void 0 && Object.assign(res[ to ], {
              rangeTo: true,
              flat: false
            });
          }
          else if (entry.to !== void 0) {
            const to = index + entry.to - 1;

            for (let day = index; day <= to; day++) {
              Object.assign(res[ day ], {
                range: entry.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }

            Object.assign(res[ to ], {
              flat: false,
              rangeTo: true
            });
          }
          else {
            const to = index + daysInMonth.value - 1;
            for (let day = index; day <= to; day++) {
              Object.assign(res[ day ], {
                range: entry.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }
          }
        });
      }

      if (rangeView.value !== void 0) {
        const from = index + rangeView.value.from - 1;
        const to = index + rangeView.value.to - 1;

        for (let day = from; day <= to; day++) {
          res[ day ].color = computedColor.value;
          res[ day ].editRange = true;
        }

        if (rangeView.value.includeFrom === true) {
          res[ from ].editRangeFrom = true;
        }
        if (rangeView.value.includeTo === true) {
          res[ to ].editRangeTo = true;
        }
      }

      if (viewModel.value.year === today.value.year && viewModel.value.month === today.value.month) {
        res[ index + today.value.day - 1 ].today = true;
      }

      const left = res.length % 7;
      if (left > 0) {
        const afterDays = 7 - left;
        for (let i = 1; i <= afterDays; i++) {
          res.push({ i, fill: true });
        }
      }

      res.forEach(day => {
        let cls = 'q-date__calendar-item ';

        if (day.fill === true) {
          cls += 'q-date__calendar-item--fill';
        }
        else {
          cls += `q-date__calendar-item--${ day.in === true ? 'in' : 'out' }`;

          if (day.range !== void 0) {
            cls += ` q-date__range${ day.rangeTo === true ? '-to' : (day.rangeFrom === true ? '-from' : '') }`;
          }

          if (day.editRange === true) {
            cls += ` q-date__edit-range${ day.editRangeFrom === true ? '-from' : '' }${ day.editRangeTo === true ? '-to' : '' }`;
          }

          if (day.range !== void 0 || day.editRange === true) {
            cls += ` text-${ day.color }`;
          }
        }

        day.classes = cls;
      });

      return res
    });

    const attributes = computed(() => (
      props.disable === true
        ? { 'aria-disabled': 'true' }
        : {}
    ));

    watch(() => props.modelValue, v => {
      if (lastEmitValue === JSON.stringify(v)) {
        lastEmitValue = 0;
      }
      else {
        const model = getViewModel(innerMask.value, innerLocale.value);
        updateViewModel(model.year, model.month, model);
      }
    });

    watch(view, () => {
      if (blurTargetRef.value !== null && proxy.$el.contains(document.activeElement) === true) {
        blurTargetRef.value.focus();
      }
    });

    watch(() => viewModel.value.year + '|' + viewModel.value.month, () => {
      emit('navigation', { year: viewModel.value.year, month: viewModel.value.month });
    });

    watch(mask, val => {
      updateValue(val, innerLocale.value, 'mask');
      innerMask.value = val;
    });

    watch(locale, val => {
      updateValue(innerMask.value, val, 'locale');
      innerLocale.value = val;
    });

    function setLastValue (v) {
      lastEmitValue = JSON.stringify(v);
    }

    function setToday () {
      const { year, month, day } = today.value;

      const date = {
        // contains more props than needed (hour, minute, second, millisecond)
        // but those aren't used in the processing of this "date" variable
        ...viewModel.value,

        // overwriting with today's date
        year,
        month,
        day
      };

      const monthMap = daysMap.value[ getMonthHash(date) ];

      if (monthMap === void 0 || monthMap.includes(date.day) === false) {
        addToModel(date);
      }

      setCalendarTo(date.year, date.month);
    }

    function setView (viewMode) {
      if (viewIsValid(viewMode) === true) {
        view.value = viewMode;
      }
    }

    function offsetCalendar (type, descending) {
      if ([ 'month', 'year' ].includes(type)) {
        const fn = type === 'month' ? goToMonth : goToYear;
        fn(descending === true ? -1 : 1);
      }
    }

    function setCalendarTo (year, month) {
      view.value = 'Calendar';
      updateViewModel(year, month);
    }

    function setEditingRange (from, to) {
      if (props.range === false || !from) {
        editRange.value = null;
        return
      }

      const init = Object.assign({ ...viewModel.value }, from);
      const final = to !== void 0
        ? Object.assign({ ...viewModel.value }, to)
        : init;

      editRange.value = {
        init,
        initHash: getDayHash(init),
        final,
        finalHash: getDayHash(final)
      };

      setCalendarTo(init.year, init.month);
    }

    function getMask () {
      return props.calendar === 'persian' ? 'YYYY/MM/DD' : props.mask
    }

    function decodeString (date, mask, locale) {
      return __splitDate(
        date,
        mask,
        locale,
        props.calendar,
        {
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        }
      )
    }

    function getViewModel (mask, locale) {
      const model = Array.isArray(props.modelValue) === true
        ? props.modelValue
        : (props.modelValue ? [ props.modelValue ] : []);

      if (model.length === 0) {
        return getDefaultViewModel()
      }

      const target = model[ model.length - 1 ];
      const decoded = decodeString(
        target.from !== void 0 ? target.from : target,
        mask,
        locale
      );

      return decoded.dateHash === null
        ? getDefaultViewModel()
        : decoded
    }

    function getDefaultViewModel () {
      let year, month;

      if (props.defaultYearMonth !== void 0) {
        const d = props.defaultYearMonth.split('/');
        year = parseInt(d[ 0 ], 10);
        month = parseInt(d[ 1 ], 10);
      }
      else {
        // may come from data() where computed
        // props are not yet available
        const d = today.value !== void 0
          ? today.value
          : getCurrentDate();

        year = d.year;
        month = d.month;
      }

      return {
        year,
        month,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        dateHash: year + '/' + pad(month) + '/01'
      }
    }

    function goToMonth (offset) {
      let year = viewModel.value.year;
      let month = Number(viewModel.value.month) + offset;

      if (month === 13) {
        month = 1;
        year++;
      }
      else if (month === 0) {
        month = 12;
        year--;
      }

      updateViewModel(year, month);
      isImmediate.value === true && emitImmediately('month');
    }

    function goToYear (offset) {
      const year = Number(viewModel.value.year) + offset;
      updateViewModel(year, viewModel.value.month);
      isImmediate.value === true && emitImmediately('year');
    }

    function setYear (year) {
      updateViewModel(year, viewModel.value.month);
      view.value = props.defaultView === 'Years' ? 'Months' : 'Calendar';
      isImmediate.value === true && emitImmediately('year');
    }

    function setMonth (month) {
      updateViewModel(viewModel.value.year, month);
      view.value = 'Calendar';
      isImmediate.value === true && emitImmediately('month');
    }

    function toggleDate (date, monthHash) {
      const month = daysMap.value[ monthHash ];
      const fn = month?.includes(date.day) === true
        ? removeFromModel
        : addToModel;

      fn(date);
    }

    function getShortDate (date) {
      return { year: date.year, month: date.month, day: date.day }
    }

    function updateViewModel (year, month, time) {
      if (minNav.value !== null && year <= minNav.value.year) {
        if (month < minNav.value.month || year < minNav.value.year) {
          month = minNav.value.month;
        }
        year = minNav.value.year;
      }

      if (maxNav.value !== null && year >= maxNav.value.year) {
        if (month > maxNav.value.month || year > maxNav.value.year) {
          month = maxNav.value.month;
        }
        year = maxNav.value.year;
      }

      if (time !== void 0) {
        const { hour, minute, second, millisecond, timezoneOffset, timeHash } = time;
        Object.assign(viewModel.value, { hour, minute, second, millisecond, timezoneOffset, timeHash });
      }

      const newHash = year + '/' + pad(month) + '/01';

      if (newHash !== viewModel.value.dateHash) {
        monthDirection.value = (viewModel.value.dateHash < newHash) === ($q.lang.rtl !== true) ? 'left' : 'right';
        if (year !== viewModel.value.year) {
          yearDirection.value = monthDirection.value;
        }

        nextTick(() => {
          startYear.value = year - year % yearsInterval - (year < 0 ? yearsInterval : 0);
          Object.assign(viewModel.value, {
            year,
            month,
            day: 1,
            dateHash: newHash
          });
        });
      }
    }

    function emitValue (val, action, date) {
      const value = val !== null && val.length === 1 && props.multiple === false
        ? val[ 0 ]
        : val;

      const { reason, details } = getEmitParams(action, date);

      setLastValue(value);
      emit('update:modelValue', value, reason, details);
    }

    function emitImmediately (reason) {
      const date = daysModel.value[ 0 ] !== void 0 && daysModel.value[ 0 ].dateHash !== null
        ? { ...daysModel.value[ 0 ] }
        : { ...viewModel.value }; // inherit day, hours, minutes, milliseconds...

      // nextTick required because of animation delay in viewModel
      nextTick(() => {
        date.year = viewModel.value.year;
        date.month = viewModel.value.month;

        const maxDay = props.calendar !== 'persian'
          ? (new Date(date.year, date.month, 0)).getDate()
          : jalaaliMonthLength(date.year, date.month);

        date.day = Math.min(Math.max(1, date.day), maxDay);

        const value = encodeEntry(date);
        const { details } = getEmitParams('', date);

        setLastValue(value);
        emit('update:modelValue', value, reason, details);
      });
    }

    function getEmitParams (action, date) {
      return date.from !== void 0
        ? {
            reason: `${ action }-range`,
            details: {
              ...getShortDate(date.target),
              from: getShortDate(date.from),
              to: getShortDate(date.to)
            }
          }
        : {
            reason: `${ action }-day`,
            details: getShortDate(date)
          }
    }

    function encodeEntry (date, mask, locale) {
      return date.from !== void 0
        ? { from: encodeObjectFn.value(date.from, mask, locale), to: encodeObjectFn.value(date.to, mask, locale) }
        : encodeObjectFn.value(date, mask, locale)
    }

    function addToModel (date) {
      let value;

      if (props.multiple === true) {
        if (date.from !== void 0) {
          // we also need to filter out intersections

          const fromHash = getDayHash(date.from);
          const toHash = getDayHash(date.to);

          const days = daysModel.value
            .filter(day => day.dateHash < fromHash || day.dateHash > toHash);

          const ranges = rangeModel.value
            .filter(({ from, to }) => to.dateHash < fromHash || from.dateHash > toHash);

          value = days.concat(ranges).concat(date).map(entry => encodeEntry(entry));
        }
        else {
          const model = normalizedModel.value.slice();
          model.push(encodeEntry(date));
          value = model;
        }
      }
      else {
        value = encodeEntry(date);
      }

      emitValue(value, 'add', date);
    }

    function removeFromModel (date) {
      if (props.noUnset === true) return

      let model = null;

      if (props.multiple === true && Array.isArray(props.modelValue) === true) {
        const val = encodeEntry(date);

        if (date.from !== void 0) {
          model = props.modelValue.filter(
            date => (
              date.from !== void 0
                ? (date.from !== val.from && date.to !== val.to)
                : true
            )
          );
        }
        else {
          model = props.modelValue.filter(date => date !== val);
        }

        if (model.length === 0) {
          model = null;
        }
      }

      emitValue(model, 'remove', date);
    }

    function updateValue (mask, locale, reason) {
      const model = daysModel.value
        .concat(rangeModel.value)
        .map(entry => encodeEntry(entry, mask, locale))
        .filter(entry => {
          return entry.from !== void 0
            ? entry.from.dateHash !== null && entry.to.dateHash !== null
            : entry.dateHash !== null
        });

      const value = (props.multiple === true ? model : model[ 0 ]) || null;

      setLastValue(value);
      emit('update:modelValue', value, reason);
    }

    function getHeader () {
      if (props.minimal === true) return

      return h('div', {
        class: 'q-date__header ' + headerClass.value
      }, [
        h('div', {
          class: 'relative-position'
        }, [
          h(Transition, {
            name: 'q-transition--fade'
          }, () => h('div', {
            key: 'h-yr-' + headerSubtitle.value,
            class: 'q-date__header-subtitle q-date__header-link '
              + (view.value === 'Years' ? 'q-date__header-link--active' : 'cursor-pointer'),
            tabindex: tabindex.value,
            ...getCache('vY', {
              onClick () { view.value = 'Years'; },
              onKeyup (e) { e.keyCode === 13 && (view.value = 'Years'); }
            })
          }, [ headerSubtitle.value ]))
        ]),

        h('div', {
          class: 'q-date__header-title relative-position flex no-wrap'
        }, [
          h('div', {
            class: 'relative-position col'
          }, [
            h(Transition, {
              name: 'q-transition--fade'
            }, () => h('div', {
              key: 'h-sub' + headerTitle.value,
              class: 'q-date__header-title-label q-date__header-link '
                + (view.value === 'Calendar' ? 'q-date__header-link--active' : 'cursor-pointer'),
              tabindex: tabindex.value,
              ...getCache('vC', {
                onClick () { view.value = 'Calendar'; },
                onKeyup (e) { e.keyCode === 13 && (view.value = 'Calendar'); }
              })
            }, [ headerTitle.value ]))
          ]),

          props.todayBtn === true ? h(__nuxt_component_3, {
            class: 'q-date__header-today self-start',
            icon: $q.iconSet.datetime.today,
            ariaLabel: $q.lang.date.today,
            flat: true,
            size: 'sm',
            round: true,
            tabindex: tabindex.value,
            onClick: setToday
          }) : null
        ])
      ])
    }

    function getNavigation ({ label, type, key, dir, goTo, boundaries, cls }) {
      return [
        h('div', {
          class: 'row items-center q-date__arrow'
        }, [
          h(__nuxt_component_3, {
            round: true,
            dense: true,
            size: 'sm',
            flat: true,
            icon: dateArrow.value[ 0 ],
            ariaLabel: type === 'Years' ? $q.lang.date.prevYear : $q.lang.date.prevMonth,
            tabindex: tabindex.value,
            disable: boundaries.prev === false,
            ...getCache('go-#' + type, { onClick () { goTo(-1); } })
          })
        ]),

        h('div', {
          class: 'relative-position overflow-hidden flex flex-center' + cls
        }, [
          h(Transition, {
            name: 'q-transition--jump-' + dir
          }, () => h('div', { key }, [
            h(__nuxt_component_3, {
              flat: true,
              dense: true,
              noCaps: true,
              label,
              tabindex: tabindex.value,
              ...getCache('view#' + type, { onClick: () => { view.value = type; } })
            })
          ]))
        ]),

        h('div', {
          class: 'row items-center q-date__arrow'
        }, [
          h(__nuxt_component_3, {
            round: true,
            dense: true,
            size: 'sm',
            flat: true,
            icon: dateArrow.value[ 1 ],
            ariaLabel: type === 'Years' ? $q.lang.date.nextYear : $q.lang.date.nextMonth,
            tabindex: tabindex.value,
            disable: boundaries.next === false,
            ...getCache('go+#' + type, { onClick () { goTo(1); } })
          })
        ])
      ]
    }

    const renderViews = {
      Calendar: () => ([
        h('div', {
          key: 'calendar-view',
          class: 'q-date__view q-date__calendar'
        }, [
          h('div', {
            class: 'q-date__navigation row items-center no-wrap'
          }, getNavigation({
            label: innerLocale.value.months[ viewModel.value.month - 1 ],
            type: 'Months',
            key: viewModel.value.month,
            dir: monthDirection.value,
            goTo: goToMonth,
            boundaries: navBoundaries.value.month,
            cls: ' col'
          }).concat(getNavigation({
            label: viewModel.value.year,
            type: 'Years',
            key: viewModel.value.year,
            dir: yearDirection.value,
            goTo: goToYear,
            boundaries: navBoundaries.value.year,
            cls: ''
          }))),

          h('div', {
            class: 'q-date__calendar-weekdays row items-center no-wrap'
          }, daysOfWeek.value.map(day => h('div', { class: 'q-date__calendar-item' }, [ h('div', day) ]))),

          h('div', {
            class: 'q-date__calendar-days-container relative-position overflow-hidden'
          }, [
            h(Transition, {
              name: 'q-transition--slide-' + monthDirection.value
            }, () => h('div', {
              key: viewMonthHash.value,
              class: 'q-date__calendar-days fit'
            }, days.value.map(day => h('div', { class: day.classes }, [
              day.in === true
                ? h(
                  __nuxt_component_3, {
                    class: day.today === true ? 'q-date__today' : '',
                    dense: true,
                    flat: day.flat,
                    unelevated: day.unelevated,
                    color: day.color,
                    textColor: day.textColor,
                    label: day.i,
                    tabindex: tabindex.value,
                    ...getCache('day#' + day.i, {
                      onClick: () => { onDayClick(day.i); },
                      onMouseover: () => { onDayMouseover(day.i); }
                    })
                  },
                  day.event !== false
                    ? () => h('div', { class: 'q-date__event bg-' + day.event })
                    : null
                )
                : h('div', '' + day.i)
            ]))))
          ])
        ])
      ]),

      Months () {
        const currentYear = viewModel.value.year === today.value.year;
        const isDisabled = month => {
          return (
            (minNav.value !== null && viewModel.value.year === minNav.value.year && minNav.value.month > month)
            || (maxNav.value !== null && viewModel.value.year === maxNav.value.year && maxNav.value.month < month)
          )
        };

        const content = innerLocale.value.monthsShort.map((month, i) => {
          const active = viewModel.value.month === i + 1;

          return h('div', {
            class: 'q-date__months-item flex flex-center'
          }, [
            h(__nuxt_component_3, {
              class: currentYear === true && today.value.month === i + 1 ? 'q-date__today' : null,
              flat: active !== true,
              label: month,
              unelevated: active,
              color: active === true ? computedColor.value : null,
              textColor: active === true ? computedTextColor.value : null,
              tabindex: tabindex.value,
              disable: isDisabled(i + 1),
              ...getCache('month#' + i, { onClick: () => { setMonth(i + 1); } })
            })
          ])
        });

        props.yearsInMonthView === true && content.unshift(
          h('div', { class: 'row no-wrap full-width' }, [
            getNavigation({
              label: viewModel.value.year,
              type: 'Years',
              key: viewModel.value.year,
              dir: yearDirection.value,
              goTo: goToYear,
              boundaries: navBoundaries.value.year,
              cls: ' col'
            })
          ])
        );

        return h('div', {
          key: 'months-view',
          class: 'q-date__view q-date__months flex flex-center'
        }, content)
      },

      Years () {
        const
          start = startYear.value,
          stop = start + yearsInterval,
          years = [];

        const isDisabled = year => {
          return (
            (minNav.value !== null && minNav.value.year > year)
            || (maxNav.value !== null && maxNav.value.year < year)
          )
        };

        for (let i = start; i <= stop; i++) {
          const active = viewModel.value.year === i;

          years.push(
            h('div', {
              class: 'q-date__years-item flex flex-center'
            }, [
              h(__nuxt_component_3, {
                key: 'yr' + i,
                class: today.value.year === i ? 'q-date__today' : null,
                flat: !active,
                label: i,
                dense: true,
                unelevated: active,
                color: active === true ? computedColor.value : null,
                textColor: active === true ? computedTextColor.value : null,
                tabindex: tabindex.value,
                disable: isDisabled(i),
                ...getCache('yr#' + i, { onClick: () => { setYear(i); } })
              })
            ])
          );
        }

        return h('div', {
          class: 'q-date__view q-date__years flex flex-center'
        }, [
          h('div', {
            class: 'col-auto'
          }, [
            h(__nuxt_component_3, {
              round: true,
              dense: true,
              flat: true,
              icon: dateArrow.value[ 0 ],
              ariaLabel: $q.lang.date.prevRangeYears(yearsInterval),
              tabindex: tabindex.value,
              disable: isDisabled(start),
              ...getCache('y-', { onClick: () => { startYear.value -= yearsInterval; } })
            })
          ]),

          h('div', {
            class: 'q-date__years-content col self-stretch row items-center'
          }, years),

          h('div', {
            class: 'col-auto'
          }, [
            h(__nuxt_component_3, {
              round: true,
              dense: true,
              flat: true,
              icon: dateArrow.value[ 1 ],
              ariaLabel: $q.lang.date.nextRangeYears(yearsInterval),
              tabindex: tabindex.value,
              disable: isDisabled(stop),
              ...getCache('y+', { onClick: () => { startYear.value += yearsInterval; } })
            })
          ])
        ])
      }
    };

    function onDayClick (dayIndex) {
      const day = { ...viewModel.value, day: dayIndex };

      if (props.range === false) {
        toggleDate(day, viewMonthHash.value);
        return
      }

      if (editRange.value === null) {
        const dayProps = days.value.find(day => day.fill !== true && day.i === dayIndex);

        if (props.noUnset !== true && dayProps.range !== void 0) {
          removeFromModel({ target: day, from: dayProps.range.from, to: dayProps.range.to });
          return
        }

        if (dayProps.selected === true) {
          removeFromModel(day);
          return
        }

        const initHash = getDayHash(day);

        editRange.value = {
          init: day,
          initHash,
          final: day,
          finalHash: initHash
        };

        emit('rangeStart', getShortDate(day));
      }
      else {
        const
          initHash = editRange.value.initHash,
          finalHash = getDayHash(day),
          payload = initHash <= finalHash
            ? { from: editRange.value.init, to: day }
            : { from: day, to: editRange.value.init };

        editRange.value = null;
        addToModel(initHash === finalHash ? day : { target: day, ...payload });

        emit('rangeEnd', {
          from: getShortDate(payload.from),
          to: getShortDate(payload.to)
        });
      }
    }

    function onDayMouseover (dayIndex) {
      if (editRange.value !== null) {
        const final = { ...viewModel.value, day: dayIndex };

        Object.assign(editRange.value, {
          final,
          finalHash: getDayHash(final)
        });
      }
    }

    // expose public methods
    Object.assign(proxy, {
      setToday, setView, offsetCalendar, setCalendarTo, setEditingRange
    });

    return () => {
      const content = [
        h('div', {
          class: 'q-date__content col relative-position'
        }, [
          h(Transition, {
            name: 'q-transition--fade'
          }, renderViews[ view.value ])
        ])
      ];

      const def = hSlot(slots.default);
      def !== void 0 && content.push(
        h('div', { class: 'q-date__actions' }, def)
      );

      if (props.name !== void 0 && props.disable !== true) {
        injectFormInput(content, 'push');
      }

      return h('div', {
        class: classes.value,
        ...attributes.value
      }, [
        getHeader(),

        h('div', {
          ref: blurTargetRef,
          class: 'q-date__main col column',
          tabindex: -1
        }, content)
      ])
    }
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "schedule",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("排程管理 - 護理服務平台", "查看並管理您的照護排程和預約");
    const $q = useQuasar();
    const apiService = useApiService();
    const authStore = useAuthStore();
    const bookings = ref([]);
    const isLoading = ref(false);
    const currentView = ref("week");
    const currentDate = ref((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    const statusFilter = ref("");
    const selectedBooking = ref(null);
    const showBookingDetailsDialog = ref(false);
    const showCreateBooking = ref(false);
    const showDatePicker = ref(false);
    const statusOptions = [
      { label: "全部", value: "" },
      { label: "待確認", value: "pending" },
      { label: "已確認", value: "confirmed" },
      { label: "進行中", value: "in_progress" },
      { label: "已完成", value: "completed" },
      { label: "已取消", value: "cancelled" }
    ];
    const dayNames = ["日", "一", "二", "三", "四", "五", "六"];
    const workingHours = Array.from({ length: 12 }, (_, i) => i + 8);
    const weekDays = computed(() => {
      const startOfWeek = getStartOfWeek(new Date(currentDate.value));
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(date.getDate() + i);
        return {
          name: dayNames[date.getDay()],
          date: date.toISOString().split("T")[0],
          day: date.getDate()
        };
      });
    });
    const monthWeeks = computed(() => {
      const year = new Date(currentDate.value).getFullYear();
      const month = new Date(currentDate.value).getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = getStartOfWeek(firstDay);
      const weeks = [];
      let currentWeekDate = new Date(startDate);
      while (currentWeekDate <= lastDay || weeks.length < 6) {
        const week = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(currentWeekDate);
          week.push({
            date: date.toISOString().split("T")[0],
            day: date.getDate(),
            isCurrentMonth: date.getMonth() === month,
            isToday: date.toISOString().split("T")[0] === (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
          });
          currentWeekDate.setDate(currentWeekDate.getDate() + 1);
        }
        weeks.push(week);
        if (weeks.length >= 6) break;
      }
      return weeks;
    });
    const currentPeriodLabel = computed(() => {
      const date = new Date(currentDate.value);
      if (currentView.value === "week") {
        const startOfWeek = getStartOfWeek(date);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        return `${startOfWeek.getMonth() + 1}/${startOfWeek.getDate()} - ${endOfWeek.getMonth() + 1}/${endOfWeek.getDate()}`;
      } else {
        return `${date.getFullYear()}年${date.getMonth() + 1}月`;
      }
    });
    const todayBookings = computed(() => {
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      return bookings.value.filter((b) => b.start_date.startsWith(today)).length;
    });
    const weekBookings = computed(() => {
      const startOfWeek = getStartOfWeek(/* @__PURE__ */ new Date());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      return bookings.value.filter((b) => {
        const bookingDate = new Date(b.start_date);
        return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
      }).length;
    });
    const monthBookings = computed(() => {
      const now = /* @__PURE__ */ new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return bookings.value.filter((b) => {
        const bookingDate = new Date(b.start_date);
        return bookingDate >= startOfMonth && bookingDate <= endOfMonth;
      }).length;
    });
    const pendingBookings = computed(() => {
      return bookings.value.filter((b) => b.status === "pending").length;
    });
    const filteredBookings = computed(() => {
      if (!statusFilter.value) return bookings.value;
      return bookings.value.filter((b) => b.status === statusFilter.value);
    });
    const getStartOfWeek = (date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day;
      return new Date(d.setDate(diff));
    };
    const loadBookings = async () => {
      if (!authStore.currentUser) {
        $q.notify({
          type: "warning",
          message: "請先登入才能查看排程",
          timeout: 3e3
        });
        return;
      }
      isLoading.value = true;
      try {
        bookings.value = await apiService.getBookingsByUser(authStore.currentUser.id);
      } catch (error) {
        console.error("載入預約失敗:", error);
        $q.notify({
          type: "negative",
          message: error.message || "載入預約失敗",
          timeout: 3e3
        });
      } finally {
        isLoading.value = false;
      }
    };
    const previousPeriod = () => {
      const date = new Date(currentDate.value);
      if (currentView.value === "week") {
        date.setDate(date.getDate() - 7);
      } else {
        date.setMonth(date.getMonth() - 1);
      }
      currentDate.value = date.toISOString().split("T")[0];
    };
    const nextPeriod = () => {
      const date = new Date(currentDate.value);
      if (currentView.value === "week") {
        date.setDate(date.getDate() + 7);
      } else {
        date.setMonth(date.getMonth() + 1);
      }
      currentDate.value = date.toISOString().split("T")[0];
    };
    const onDateChange = (newDate) => {
      currentDate.value = newDate;
      showDatePicker.value = false;
    };
    const selectDate = (date) => {
      currentDate.value = date;
      currentView.value = "week";
    };
    const getBookingsForSlot = (date, hour) => {
      return filteredBookings.value.filter((booking) => {
        const bookingDate = booking.start_date.split("T")[0];
        const bookingHour = parseInt(booking.start_time.split(":")[0]);
        return bookingDate === date && bookingHour <= hour && bookingHour + (booking.duration || 1) > hour;
      });
    };
    const getBookingsForDay = (date) => {
      return filteredBookings.value.filter((booking) => {
        return booking.start_date.startsWith(date);
      });
    };
    const getSlotClass = (date, hour) => {
      const bookings2 = getBookingsForSlot(date, hour);
      if (bookings2.length === 0) return "slot-empty";
      const hasConfirmed = bookings2.some((b) => b.status === "confirmed");
      const hasPending = bookings2.some((b) => b.status === "pending");
      if (hasConfirmed) return "slot-confirmed";
      if (hasPending) return "slot-pending";
      return "slot-occupied";
    };
    const handleSlotClick = (date, hour) => {
      const bookingsInSlot = getBookingsForSlot(date, hour);
      if (bookingsInSlot.length === 1) {
        showBookingDetails(bookingsInSlot[0]);
      } else if (bookingsInSlot.length > 1) {
        $q.notify({
          type: "info",
          message: `此時段有 ${bookingsInSlot.length} 個預約`,
          timeout: 2e3
        });
      }
    };
    const showBookingDetails = (booking) => {
      selectedBooking.value = booking;
      showBookingDetailsDialog.value = true;
    };
    const getBookingTitle = (booking) => {
      return booking.patient_name || `預約 #${booking.id.slice(-4)}`;
    };
    const formatBookingTime = (booking) => {
      const date = new Date(booking.start_date).toLocaleDateString("zh-TW");
      return `${date} ${booking.start_time} - ${booking.end_time}`;
    };
    const getStatusName = (status) => {
      const statusMap = {
        "pending": "待確認",
        "confirmed": "已確認",
        "in_progress": "進行中",
        "completed": "已完成",
        "cancelled": "已取消"
      };
      return statusMap[status] || status;
    };
    const getStatusColor = (status) => {
      const colorMap = {
        "pending": "warning",
        "confirmed": "positive",
        "in_progress": "info",
        "completed": "grey",
        "cancelled": "negative"
      };
      return colorMap[status] || "grey";
    };
    const confirmBooking = async (booking) => {
      if (!booking) return;
      try {
        await apiService.confirmBooking(booking.id);
        booking.status = "confirmed";
        $q.notify({
          type: "positive",
          message: "預約已確認",
          timeout: 2e3
        });
        showBookingDetailsDialog.value = false;
      } catch (error) {
        $q.notify({
          type: "negative",
          message: error.message || "確認預約失敗",
          timeout: 3e3
        });
      }
    };
    const cancelBooking = async (booking) => {
      if (!booking) return;
      $q.dialog({
        title: "確認取消",
        message: "您確定要取消這個預約嗎？",
        ok: {
          color: "negative",
          label: "確認取消"
        },
        cancel: {
          color: "grey",
          label: "不取消"
        }
      }).onOk(async () => {
        try {
          await apiService.cancelBooking(booking.id);
          booking.status = "cancelled";
          $q.notify({
            type: "positive",
            message: "預約已取消",
            timeout: 2e3
          });
          showBookingDetailsDialog.value = false;
        } catch (error) {
          $q.notify({
            type: "negative",
            message: error.message || "取消預約失敗",
            timeout: 3e3
          });
        }
      });
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
            name: "排程管理 - 護理服務平台",
            url: baseUrl + $route.fullPath,
            description: "查看並管理您的照護排程和預約",
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
      const _component_q_btn = __nuxt_component_3;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_btn_group = __nuxt_component_5;
      const _component_q_select = __nuxt_component_8;
      const _component_q_spinner_grid = __nuxt_component_1$2;
      const _component_q_tooltip = __nuxt_component_8$1;
      const _component_q_dialog = __nuxt_component_20;
      const _component_q_date = __nuxt_component_10;
      const _component_q_chip = __nuxt_component_9;
      const _component_q_card_actions = __nuxt_component_9$1;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row justify-center" data-v-9e71684c${_scopeId}><div class="col-12 col-lg-10" data-v-9e71684c${_scopeId}><div class="row items-center justify-between q-mb-lg" data-v-9e71684c${_scopeId}><div class="text-h5 text-primary" data-v-9e71684c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_icon, {
              name: "calendar_today",
              size: "md",
              class: "q-mr-sm"
            }, null, _parent2, _scopeId));
            _push2(` 排程管理 </div><div class="row q-gutter-sm" data-v-9e71684c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_btn, {
              flat: "",
              icon: "view_week",
              onClick: ($event) => currentView.value = "week",
              color: currentView.value === "week" ? "primary" : "grey"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 週視圖 `);
                } else {
                  return [
                    createTextVNode(" 週視圖 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_btn, {
              flat: "",
              icon: "view_module",
              onClick: ($event) => currentView.value = "month",
              color: currentView.value === "month" ? "primary" : "grey"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 月視圖 `);
                } else {
                  return [
                    createTextVNode(" 月視圖 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_btn, {
              color: "primary",
              icon: "add",
              onClick: ($event) => showCreateBooking.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 新增預約 `);
                } else {
                  return [
                    createTextVNode(" 新增預約 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: "",
              class: "q-mb-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, { class: "q-pa-md" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="row q-gutter-md items-center" data-v-9e71684c${_scopeId3}><div class="col-auto" data-v-9e71684c${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_btn_group, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_btn, {
                                icon: "chevron_left",
                                onClick: previousPeriod,
                                flat: ""
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_btn, {
                                label: currentPeriodLabel.value,
                                flat: "",
                                onClick: ($event) => showDatePicker.value = true
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_btn, {
                                icon: "chevron_right",
                                onClick: nextPeriod,
                                flat: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_btn, {
                                  icon: "chevron_left",
                                  onClick: previousPeriod,
                                  flat: ""
                                }),
                                createVNode(_component_q_btn, {
                                  label: currentPeriodLabel.value,
                                  flat: "",
                                  onClick: ($event) => showDatePicker.value = true
                                }, null, 8, ["label", "onClick"]),
                                createVNode(_component_q_btn, {
                                  icon: "chevron_right",
                                  onClick: nextPeriod,
                                  flat: ""
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="col" data-v-9e71684c${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_select, {
                          modelValue: statusFilter.value,
                          "onUpdate:modelValue": ($event) => statusFilter.value = $event,
                          options: statusOptions,
                          label: "狀態篩選",
                          outlined: "",
                          dense: "",
                          clearable: "",
                          "emit-value": "",
                          "map-options": "",
                          class: "q-ml-md",
                          style: { "max-width": "200px" }
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="col-auto" data-v-9e71684c${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_q_btn, {
                          flat: "",
                          icon: "refresh",
                          onClick: loadBookings,
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
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "row q-gutter-md items-center" }, [
                            createVNode("div", { class: "col-auto" }, [
                              createVNode(_component_q_btn_group, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_btn, {
                                    icon: "chevron_left",
                                    onClick: previousPeriod,
                                    flat: ""
                                  }),
                                  createVNode(_component_q_btn, {
                                    label: currentPeriodLabel.value,
                                    flat: "",
                                    onClick: ($event) => showDatePicker.value = true
                                  }, null, 8, ["label", "onClick"]),
                                  createVNode(_component_q_btn, {
                                    icon: "chevron_right",
                                    onClick: nextPeriod,
                                    flat: ""
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "col" }, [
                              createVNode(_component_q_select, {
                                modelValue: statusFilter.value,
                                "onUpdate:modelValue": ($event) => statusFilter.value = $event,
                                options: statusOptions,
                                label: "狀態篩選",
                                outlined: "",
                                dense: "",
                                clearable: "",
                                "emit-value": "",
                                "map-options": "",
                                class: "q-ml-md",
                                style: { "max-width": "200px" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "col-auto" }, [
                              createVNode(_component_q_btn, {
                                flat: "",
                                icon: "refresh",
                                onClick: loadBookings,
                                loading: isLoading.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 更新 ")
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
                    createVNode(_component_q_card_section, { class: "q-pa-md" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "row q-gutter-md items-center" }, [
                          createVNode("div", { class: "col-auto" }, [
                            createVNode(_component_q_btn_group, null, {
                              default: withCtx(() => [
                                createVNode(_component_q_btn, {
                                  icon: "chevron_left",
                                  onClick: previousPeriod,
                                  flat: ""
                                }),
                                createVNode(_component_q_btn, {
                                  label: currentPeriodLabel.value,
                                  flat: "",
                                  onClick: ($event) => showDatePicker.value = true
                                }, null, 8, ["label", "onClick"]),
                                createVNode(_component_q_btn, {
                                  icon: "chevron_right",
                                  onClick: nextPeriod,
                                  flat: ""
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "col" }, [
                            createVNode(_component_q_select, {
                              modelValue: statusFilter.value,
                              "onUpdate:modelValue": ($event) => statusFilter.value = $event,
                              options: statusOptions,
                              label: "狀態篩選",
                              outlined: "",
                              dense: "",
                              clearable: "",
                              "emit-value": "",
                              "map-options": "",
                              class: "q-ml-md",
                              style: { "max-width": "200px" }
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "col-auto" }, [
                            createVNode(_component_q_btn, {
                              flat: "",
                              icon: "refresh",
                              onClick: loadBookings,
                              loading: isLoading.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 更新 ")
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
            if (isLoading.value) {
              _push2(`<div class="text-center q-pa-lg" data-v-9e71684c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_spinner_grid, {
                size: "50px",
                color: "primary"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-body2 q-mt-md" data-v-9e71684c${_scopeId}>載入中...</div></div>`);
            } else {
              _push2(`<div data-v-9e71684c${_scopeId}>`);
              if (currentView.value === "week") {
                _push2(`<div data-v-9e71684c${_scopeId}>`);
                _push2(ssrRenderComponent(_component_q_card, {
                  flat: "",
                  bordered: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_q_card_section, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="text-h6 q-mb-md" data-v-9e71684c${_scopeId3}>週排程表</div><div class="row q-mb-md" data-v-9e71684c${_scopeId3}><div class="col-2 text-center text-weight-medium" data-v-9e71684c${_scopeId3}>時間</div><!--[-->`);
                            ssrRenderList(weekDays.value, (day) => {
                              _push4(`<div class="col text-center text-weight-medium" data-v-9e71684c${_scopeId3}><div data-v-9e71684c${_scopeId3}>${ssrInterpolate(day.name)}</div><div class="text-caption text-grey-6" data-v-9e71684c${_scopeId3}>${ssrInterpolate(day.date)}</div></div>`);
                            });
                            _push4(`<!--]--></div><div class="schedule-grid" data-v-9e71684c${_scopeId3}><!--[-->`);
                            ssrRenderList(unref(workingHours), (hour) => {
                              _push4(`<div class="row q-mb-xs" data-v-9e71684c${_scopeId3}><div class="col-2 text-center text-caption q-pa-xs" data-v-9e71684c${_scopeId3}>${ssrInterpolate(hour)}:00 </div><!--[-->`);
                              ssrRenderList(weekDays.value, (day) => {
                                _push4(`<div class="col q-pa-xs" data-v-9e71684c${_scopeId3}><div class="${ssrRenderClass([getSlotClass(day.date, hour), "schedule-slot"])}" data-v-9e71684c${_scopeId3}><!--[-->`);
                                ssrRenderList(getBookingsForSlot(day.date, hour), (booking) => {
                                  _push4(`<div class="${ssrRenderClass([`booking-${booking.status}`, "booking-item"])}" data-v-9e71684c${_scopeId3}><div class="text-caption text-weight-medium" data-v-9e71684c${_scopeId3}>${ssrInterpolate(getBookingTitle(booking))}</div><div class="text-caption" data-v-9e71684c${_scopeId3}>${ssrInterpolate(booking.start_time)} - ${ssrInterpolate(booking.end_time)}</div></div>`);
                                });
                                _push4(`<!--]--></div></div>`);
                              });
                              _push4(`<!--]--></div>`);
                            });
                            _push4(`<!--]--></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "text-h6 q-mb-md" }, "週排程表"),
                              createVNode("div", { class: "row q-mb-md" }, [
                                createVNode("div", { class: "col-2 text-center text-weight-medium" }, "時間"),
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDays.value, (day) => {
                                  return openBlock(), createBlock("div", {
                                    key: day.date,
                                    class: "col text-center text-weight-medium"
                                  }, [
                                    createVNode("div", null, toDisplayString(day.name), 1),
                                    createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(day.date), 1)
                                  ]);
                                }), 128))
                              ]),
                              createVNode("div", { class: "schedule-grid" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(workingHours), (hour) => {
                                  return openBlock(), createBlock("div", {
                                    key: hour,
                                    class: "row q-mb-xs"
                                  }, [
                                    createVNode("div", { class: "col-2 text-center text-caption q-pa-xs" }, toDisplayString(hour) + ":00 ", 1),
                                    (openBlock(true), createBlock(Fragment, null, renderList(weekDays.value, (day) => {
                                      return openBlock(), createBlock("div", {
                                        key: day.date + hour,
                                        class: "col q-pa-xs"
                                      }, [
                                        createVNode("div", {
                                          class: ["schedule-slot", getSlotClass(day.date, hour)],
                                          onClick: ($event) => handleSlotClick(day.date, hour)
                                        }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(getBookingsForSlot(day.date, hour), (booking) => {
                                            return openBlock(), createBlock("div", {
                                              key: booking.id,
                                              class: ["booking-item", `booking-${booking.status}`],
                                              onClick: withModifiers(($event) => showBookingDetails(booking), ["stop"])
                                            }, [
                                              createVNode("div", { class: "text-caption text-weight-medium" }, toDisplayString(getBookingTitle(booking)), 1),
                                              createVNode("div", { class: "text-caption" }, toDisplayString(booking.start_time) + " - " + toDisplayString(booking.end_time), 1)
                                            ], 10, ["onClick"]);
                                          }), 128))
                                        ], 10, ["onClick"])
                                      ]);
                                    }), 128))
                                  ]);
                                }), 128))
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
                            createVNode("div", { class: "text-h6 q-mb-md" }, "週排程表"),
                            createVNode("div", { class: "row q-mb-md" }, [
                              createVNode("div", { class: "col-2 text-center text-weight-medium" }, "時間"),
                              (openBlock(true), createBlock(Fragment, null, renderList(weekDays.value, (day) => {
                                return openBlock(), createBlock("div", {
                                  key: day.date,
                                  class: "col text-center text-weight-medium"
                                }, [
                                  createVNode("div", null, toDisplayString(day.name), 1),
                                  createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(day.date), 1)
                                ]);
                              }), 128))
                            ]),
                            createVNode("div", { class: "schedule-grid" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(workingHours), (hour) => {
                                return openBlock(), createBlock("div", {
                                  key: hour,
                                  class: "row q-mb-xs"
                                }, [
                                  createVNode("div", { class: "col-2 text-center text-caption q-pa-xs" }, toDisplayString(hour) + ":00 ", 1),
                                  (openBlock(true), createBlock(Fragment, null, renderList(weekDays.value, (day) => {
                                    return openBlock(), createBlock("div", {
                                      key: day.date + hour,
                                      class: "col q-pa-xs"
                                    }, [
                                      createVNode("div", {
                                        class: ["schedule-slot", getSlotClass(day.date, hour)],
                                        onClick: ($event) => handleSlotClick(day.date, hour)
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(getBookingsForSlot(day.date, hour), (booking) => {
                                          return openBlock(), createBlock("div", {
                                            key: booking.id,
                                            class: ["booking-item", `booking-${booking.status}`],
                                            onClick: withModifiers(($event) => showBookingDetails(booking), ["stop"])
                                          }, [
                                            createVNode("div", { class: "text-caption text-weight-medium" }, toDisplayString(getBookingTitle(booking)), 1),
                                            createVNode("div", { class: "text-caption" }, toDisplayString(booking.start_time) + " - " + toDisplayString(booking.end_time), 1)
                                          ], 10, ["onClick"]);
                                        }), 128))
                                      ], 10, ["onClick"])
                                    ]);
                                  }), 128))
                                ]);
                              }), 128))
                            ])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<div data-v-9e71684c${_scopeId}>`);
                _push2(ssrRenderComponent(_component_q_card, {
                  flat: "",
                  bordered: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_q_card_section, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="text-h6 q-mb-md" data-v-9e71684c${_scopeId3}>月排程表</div><div class="row q-mb-sm" data-v-9e71684c${_scopeId3}><!--[-->`);
                            ssrRenderList(dayNames, (dayName) => {
                              _push4(`<div class="col text-center text-weight-medium q-pa-xs" data-v-9e71684c${_scopeId3}>${ssrInterpolate(dayName)}</div>`);
                            });
                            _push4(`<!--]--></div><div class="calendar-grid" data-v-9e71684c${_scopeId3}><!--[-->`);
                            ssrRenderList(monthWeeks.value, (week) => {
                              _push4(`<div class="row" data-v-9e71684c${_scopeId3}><!--[-->`);
                              ssrRenderList(week, (day) => {
                                _push4(`<div class="${ssrRenderClass([{
                                  "other-month": !day.isCurrentMonth,
                                  "today": day.isToday
                                }, "col calendar-day"])}" data-v-9e71684c${_scopeId3}><div class="day-number" data-v-9e71684c${_scopeId3}>${ssrInterpolate(day.day)}</div><div class="day-bookings" data-v-9e71684c${_scopeId3}><!--[-->`);
                                ssrRenderList(getBookingsForDay(day.date), (booking) => {
                                  _push4(`<div class="${ssrRenderClass([`booking-${booking.status}`, "booking-dot"])}" data-v-9e71684c${_scopeId3}>`);
                                  _push4(ssrRenderComponent(_component_q_tooltip, null, {
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(`${ssrInterpolate(getBookingTitle(booking))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(getBookingTitle(booking)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                  _push4(`</div>`);
                                });
                                _push4(`<!--]--></div></div>`);
                              });
                              _push4(`<!--]--></div>`);
                            });
                            _push4(`<!--]--></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "text-h6 q-mb-md" }, "月排程表"),
                              createVNode("div", { class: "row q-mb-sm" }, [
                                (openBlock(), createBlock(Fragment, null, renderList(dayNames, (dayName) => {
                                  return createVNode("div", {
                                    key: dayName,
                                    class: "col text-center text-weight-medium q-pa-xs"
                                  }, toDisplayString(dayName), 1);
                                }), 64))
                              ]),
                              createVNode("div", { class: "calendar-grid" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(monthWeeks.value, (week) => {
                                  return openBlock(), createBlock("div", {
                                    key: week[0].date,
                                    class: "row"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(week, (day) => {
                                      return openBlock(), createBlock("div", {
                                        key: day.date,
                                        class: ["col calendar-day", {
                                          "other-month": !day.isCurrentMonth,
                                          "today": day.isToday
                                        }],
                                        onClick: ($event) => selectDate(day.date)
                                      }, [
                                        createVNode("div", { class: "day-number" }, toDisplayString(day.day), 1),
                                        createVNode("div", { class: "day-bookings" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(getBookingsForDay(day.date), (booking) => {
                                            return openBlock(), createBlock("div", {
                                              key: booking.id,
                                              class: ["booking-dot", `booking-${booking.status}`],
                                              onClick: withModifiers(($event) => showBookingDetails(booking), ["stop"])
                                            }, [
                                              createVNode(_component_q_tooltip, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(getBookingTitle(booking)), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ], 10, ["onClick"]);
                                          }), 128))
                                        ])
                                      ], 10, ["onClick"]);
                                    }), 128))
                                  ]);
                                }), 128))
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
                            createVNode("div", { class: "text-h6 q-mb-md" }, "月排程表"),
                            createVNode("div", { class: "row q-mb-sm" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(dayNames, (dayName) => {
                                return createVNode("div", {
                                  key: dayName,
                                  class: "col text-center text-weight-medium q-pa-xs"
                                }, toDisplayString(dayName), 1);
                              }), 64))
                            ]),
                            createVNode("div", { class: "calendar-grid" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(monthWeeks.value, (week) => {
                                return openBlock(), createBlock("div", {
                                  key: week[0].date,
                                  class: "row"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(week, (day) => {
                                    return openBlock(), createBlock("div", {
                                      key: day.date,
                                      class: ["col calendar-day", {
                                        "other-month": !day.isCurrentMonth,
                                        "today": day.isToday
                                      }],
                                      onClick: ($event) => selectDate(day.date)
                                    }, [
                                      createVNode("div", { class: "day-number" }, toDisplayString(day.day), 1),
                                      createVNode("div", { class: "day-bookings" }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(getBookingsForDay(day.date), (booking) => {
                                          return openBlock(), createBlock("div", {
                                            key: booking.id,
                                            class: ["booking-dot", `booking-${booking.status}`],
                                            onClick: withModifiers(($event) => showBookingDetails(booking), ["stop"])
                                          }, [
                                            createVNode(_component_q_tooltip, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(getBookingTitle(booking)), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ], 10, ["onClick"]);
                                        }), 128))
                                      ])
                                    ], 10, ["onClick"]);
                                  }), 128))
                                ]);
                              }), 128))
                            ])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`<div class="row q-gutter-md q-mt-lg" data-v-9e71684c${_scopeId}><div class="col" data-v-9e71684c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                class: "bg-blue-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h6 text-blue-8" data-v-9e71684c${_scopeId3}>${ssrInterpolate(todayBookings.value)}</div><div class="text-caption text-blue-6" data-v-9e71684c${_scopeId3}>今日預約</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 text-blue-8" }, toDisplayString(todayBookings.value), 1),
                            createVNode("div", { class: "text-caption text-blue-6" }, "今日預約")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 text-blue-8" }, toDisplayString(todayBookings.value), 1),
                          createVNode("div", { class: "text-caption text-blue-6" }, "今日預約")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="col" data-v-9e71684c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                class: "bg-green-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h6 text-green-8" data-v-9e71684c${_scopeId3}>${ssrInterpolate(weekBookings.value)}</div><div class="text-caption text-green-6" data-v-9e71684c${_scopeId3}>本週預約</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 text-green-8" }, toDisplayString(weekBookings.value), 1),
                            createVNode("div", { class: "text-caption text-green-6" }, "本週預約")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 text-green-8" }, toDisplayString(weekBookings.value), 1),
                          createVNode("div", { class: "text-caption text-green-6" }, "本週預約")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="col" data-v-9e71684c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                class: "bg-orange-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h6 text-orange-8" data-v-9e71684c${_scopeId3}>${ssrInterpolate(monthBookings.value)}</div><div class="text-caption text-orange-6" data-v-9e71684c${_scopeId3}>本月預約</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 text-orange-8" }, toDisplayString(monthBookings.value), 1),
                            createVNode("div", { class: "text-caption text-orange-6" }, "本月預約")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 text-orange-8" }, toDisplayString(monthBookings.value), 1),
                          createVNode("div", { class: "text-caption text-orange-6" }, "本月預約")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="col" data-v-9e71684c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                class: "bg-purple-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h6 text-purple-8" data-v-9e71684c${_scopeId3}>${ssrInterpolate(pendingBookings.value)}</div><div class="text-caption text-purple-6" data-v-9e71684c${_scopeId3}>待確認</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 text-purple-8" }, toDisplayString(pendingBookings.value), 1),
                            createVNode("div", { class: "text-caption text-purple-6" }, "待確認")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 text-purple-8" }, toDisplayString(pendingBookings.value), 1),
                          createVNode("div", { class: "text-caption text-purple-6" }, "待確認")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_q_dialog, {
              modelValue: showDatePicker.value,
              "onUpdate:modelValue": ($event) => showDatePicker.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_date, {
                    modelValue: currentDate.value,
                    "onUpdate:modelValue": [($event) => currentDate.value = $event, onDateChange],
                    mask: "YYYY-MM-DD"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_date, {
                      modelValue: currentDate.value,
                      "onUpdate:modelValue": [($event) => currentDate.value = $event, onDateChange],
                      mask: "YYYY-MM-DD"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_dialog, {
              modelValue: showBookingDetailsDialog.value,
              "onUpdate:modelValue": ($event) => showBookingDetailsDialog.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card, { style: { "min-width": "400px" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_card_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-h6" data-v-9e71684c${_scopeId4}>預約詳情</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-h6" }, "預約詳情")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (selectedBooking.value) {
                          _push4(ssrRenderComponent(_component_q_card_section, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="row q-gutter-md" data-v-9e71684c${_scopeId4}><div class="col-12" data-v-9e71684c${_scopeId4}><div class="text-subtitle2" data-v-9e71684c${_scopeId4}>服務對象</div><div data-v-9e71684c${_scopeId4}>${ssrInterpolate(selectedBooking.value.patient_name || "未提供")}</div></div><div class="col-12" data-v-9e71684c${_scopeId4}><div class="text-subtitle2" data-v-9e71684c${_scopeId4}>服務時間</div><div data-v-9e71684c${_scopeId4}>${ssrInterpolate(formatBookingTime(selectedBooking.value))}</div></div><div class="col-12" data-v-9e71684c${_scopeId4}><div class="text-subtitle2" data-v-9e71684c${_scopeId4}>服務類型</div><div data-v-9e71684c${_scopeId4}>${ssrInterpolate(selectedBooking.value.service_type || "一般照護")}</div></div><div class="col-12" data-v-9e71684c${_scopeId4}><div class="text-subtitle2" data-v-9e71684c${_scopeId4}>狀態</div>`);
                                _push5(ssrRenderComponent(_component_q_chip, {
                                  color: getStatusColor(selectedBooking.value.status),
                                  "text-color": "white",
                                  size: "sm"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(getStatusName(selectedBooking.value.status))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(getStatusName(selectedBooking.value.status)), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                                if (selectedBooking.value.notes) {
                                  _push5(`<div class="col-12" data-v-9e71684c${_scopeId4}><div class="text-subtitle2" data-v-9e71684c${_scopeId4}>備註</div><div data-v-9e71684c${_scopeId4}>${ssrInterpolate(selectedBooking.value.notes)}</div></div>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "row q-gutter-md" }, [
                                    createVNode("div", { class: "col-12" }, [
                                      createVNode("div", { class: "text-subtitle2" }, "服務對象"),
                                      createVNode("div", null, toDisplayString(selectedBooking.value.patient_name || "未提供"), 1)
                                    ]),
                                    createVNode("div", { class: "col-12" }, [
                                      createVNode("div", { class: "text-subtitle2" }, "服務時間"),
                                      createVNode("div", null, toDisplayString(formatBookingTime(selectedBooking.value)), 1)
                                    ]),
                                    createVNode("div", { class: "col-12" }, [
                                      createVNode("div", { class: "text-subtitle2" }, "服務類型"),
                                      createVNode("div", null, toDisplayString(selectedBooking.value.service_type || "一般照護"), 1)
                                    ]),
                                    createVNode("div", { class: "col-12" }, [
                                      createVNode("div", { class: "text-subtitle2" }, "狀態"),
                                      createVNode(_component_q_chip, {
                                        color: getStatusColor(selectedBooking.value.status),
                                        "text-color": "white",
                                        size: "sm"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(getStatusName(selectedBooking.value.status)), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["color"])
                                    ]),
                                    selectedBooking.value.notes ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "col-12"
                                    }, [
                                      createVNode("div", { class: "text-subtitle2" }, "備註"),
                                      createVNode("div", null, toDisplayString(selectedBooking.value.notes), 1)
                                    ])) : createCommentVNode("", true)
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_component_q_card_actions, { align: "right" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (selectedBooking.value?.status === "pending") {
                                _push5(ssrRenderComponent(_component_q_btn, {
                                  color: "positive",
                                  onClick: ($event) => confirmBooking(selectedBooking.value)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` 確認預約 `);
                                    } else {
                                      return [
                                        createTextVNode(" 確認預約 ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (["pending", "confirmed"].includes(selectedBooking.value?.status || "")) {
                                _push5(ssrRenderComponent(_component_q_btn, {
                                  color: "negative",
                                  onClick: ($event) => cancelBooking(selectedBooking.value)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` 取消預約 `);
                                    } else {
                                      return [
                                        createTextVNode(" 取消預約 ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(ssrRenderComponent(_component_q_btn, {
                                flat: "",
                                color: "grey",
                                onClick: ($event) => showBookingDetailsDialog.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 關閉 `);
                                  } else {
                                    return [
                                      createTextVNode(" 關閉 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                selectedBooking.value?.status === "pending" ? (openBlock(), createBlock(_component_q_btn, {
                                  key: 0,
                                  color: "positive",
                                  onClick: ($event) => confirmBooking(selectedBooking.value)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 確認預約 ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true),
                                ["pending", "confirmed"].includes(selectedBooking.value?.status || "") ? (openBlock(), createBlock(_component_q_btn, {
                                  key: 1,
                                  color: "negative",
                                  onClick: ($event) => cancelBooking(selectedBooking.value)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 取消預約 ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true),
                                createVNode(_component_q_btn, {
                                  flat: "",
                                  color: "grey",
                                  onClick: ($event) => showBookingDetailsDialog.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 關閉 ")
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
                              createVNode("div", { class: "text-h6" }, "預約詳情")
                            ]),
                            _: 1
                          }),
                          selectedBooking.value ? (openBlock(), createBlock(_component_q_card_section, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "row q-gutter-md" }, [
                                createVNode("div", { class: "col-12" }, [
                                  createVNode("div", { class: "text-subtitle2" }, "服務對象"),
                                  createVNode("div", null, toDisplayString(selectedBooking.value.patient_name || "未提供"), 1)
                                ]),
                                createVNode("div", { class: "col-12" }, [
                                  createVNode("div", { class: "text-subtitle2" }, "服務時間"),
                                  createVNode("div", null, toDisplayString(formatBookingTime(selectedBooking.value)), 1)
                                ]),
                                createVNode("div", { class: "col-12" }, [
                                  createVNode("div", { class: "text-subtitle2" }, "服務類型"),
                                  createVNode("div", null, toDisplayString(selectedBooking.value.service_type || "一般照護"), 1)
                                ]),
                                createVNode("div", { class: "col-12" }, [
                                  createVNode("div", { class: "text-subtitle2" }, "狀態"),
                                  createVNode(_component_q_chip, {
                                    color: getStatusColor(selectedBooking.value.status),
                                    "text-color": "white",
                                    size: "sm"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(getStatusName(selectedBooking.value.status)), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["color"])
                                ]),
                                selectedBooking.value.notes ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "col-12"
                                }, [
                                  createVNode("div", { class: "text-subtitle2" }, "備註"),
                                  createVNode("div", null, toDisplayString(selectedBooking.value.notes), 1)
                                ])) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(_component_q_card_actions, { align: "right" }, {
                            default: withCtx(() => [
                              selectedBooking.value?.status === "pending" ? (openBlock(), createBlock(_component_q_btn, {
                                key: 0,
                                color: "positive",
                                onClick: ($event) => confirmBooking(selectedBooking.value)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 確認預約 ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true),
                              ["pending", "confirmed"].includes(selectedBooking.value?.status || "") ? (openBlock(), createBlock(_component_q_btn, {
                                key: 1,
                                color: "negative",
                                onClick: ($event) => cancelBooking(selectedBooking.value)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 取消預約 ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true),
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "grey",
                                onClick: ($event) => showBookingDetailsDialog.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 關閉 ")
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
                    createVNode(_component_q_card, { style: { "min-width": "400px" } }, {
                      default: withCtx(() => [
                        createVNode(_component_q_card_section, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-h6" }, "預約詳情")
                          ]),
                          _: 1
                        }),
                        selectedBooking.value ? (openBlock(), createBlock(_component_q_card_section, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "row q-gutter-md" }, [
                              createVNode("div", { class: "col-12" }, [
                                createVNode("div", { class: "text-subtitle2" }, "服務對象"),
                                createVNode("div", null, toDisplayString(selectedBooking.value.patient_name || "未提供"), 1)
                              ]),
                              createVNode("div", { class: "col-12" }, [
                                createVNode("div", { class: "text-subtitle2" }, "服務時間"),
                                createVNode("div", null, toDisplayString(formatBookingTime(selectedBooking.value)), 1)
                              ]),
                              createVNode("div", { class: "col-12" }, [
                                createVNode("div", { class: "text-subtitle2" }, "服務類型"),
                                createVNode("div", null, toDisplayString(selectedBooking.value.service_type || "一般照護"), 1)
                              ]),
                              createVNode("div", { class: "col-12" }, [
                                createVNode("div", { class: "text-subtitle2" }, "狀態"),
                                createVNode(_component_q_chip, {
                                  color: getStatusColor(selectedBooking.value.status),
                                  "text-color": "white",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(getStatusName(selectedBooking.value.status)), 1)
                                  ]),
                                  _: 1
                                }, 8, ["color"])
                              ]),
                              selectedBooking.value.notes ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "col-12"
                              }, [
                                createVNode("div", { class: "text-subtitle2" }, "備註"),
                                createVNode("div", null, toDisplayString(selectedBooking.value.notes), 1)
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(_component_q_card_actions, { align: "right" }, {
                          default: withCtx(() => [
                            selectedBooking.value?.status === "pending" ? (openBlock(), createBlock(_component_q_btn, {
                              key: 0,
                              color: "positive",
                              onClick: ($event) => confirmBooking(selectedBooking.value)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 確認預約 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true),
                            ["pending", "confirmed"].includes(selectedBooking.value?.status || "") ? (openBlock(), createBlock(_component_q_btn, {
                              key: 1,
                              color: "negative",
                              onClick: ($event) => cancelBooking(selectedBooking.value)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 取消預約 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true),
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "grey",
                              onClick: ($event) => showBookingDetailsDialog.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 關閉 ")
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
              modelValue: showCreateBooking.value,
              "onUpdate:modelValue": ($event) => showCreateBooking.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card, { style: { "min-width": "500px" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_card_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-h6" data-v-9e71684c${_scopeId4}>新增預約</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-h6" }, "新增預約")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_card_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-body2 text-grey-6 q-mb-md" data-v-9e71684c${_scopeId4}> 請前往預約頁面建立新的預約 </div>`);
                              _push5(ssrRenderComponent(_component_q_btn, {
                                color: "primary",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/booking/create"),
                                class: "full-width"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 前往預約頁面 `);
                                  } else {
                                    return [
                                      createTextVNode(" 前往預約頁面 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "text-body2 text-grey-6 q-mb-md" }, " 請前往預約頁面建立新的預約 "),
                                createVNode(_component_q_btn, {
                                  color: "primary",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/booking/create"),
                                  class: "full-width"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 前往預約頁面 ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
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
                                color: "grey",
                                onClick: ($event) => showCreateBooking.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 取消 `);
                                  } else {
                                    return [
                                      createTextVNode(" 取消 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_btn, {
                                  flat: "",
                                  color: "grey",
                                  onClick: ($event) => showCreateBooking.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 取消 ")
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
                              createVNode("div", { class: "text-h6" }, "新增預約")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-body2 text-grey-6 q-mb-md" }, " 請前往預約頁面建立新的預約 "),
                              createVNode(_component_q_btn, {
                                color: "primary",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/booking/create"),
                                class: "full-width"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 前往預約頁面 ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_card_actions, { align: "right" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_btn, {
                                flat: "",
                                color: "grey",
                                onClick: ($event) => showCreateBooking.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 取消 ")
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
                    createVNode(_component_q_card, { style: { "min-width": "500px" } }, {
                      default: withCtx(() => [
                        createVNode(_component_q_card_section, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-h6" }, "新增預約")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_card_section, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-body2 text-grey-6 q-mb-md" }, " 請前往預約頁面建立新的預約 "),
                            createVNode(_component_q_btn, {
                              color: "primary",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/booking/create"),
                              class: "full-width"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 前往預約頁面 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_card_actions, { align: "right" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_btn, {
                              flat: "",
                              color: "grey",
                              onClick: ($event) => showCreateBooking.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 取消 ")
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
              createVNode("div", { class: "row justify-center" }, [
                createVNode("div", { class: "col-12 col-lg-10" }, [
                  createVNode("div", { class: "row items-center justify-between q-mb-lg" }, [
                    createVNode("div", { class: "text-h5 text-primary" }, [
                      createVNode(_component_q_icon, {
                        name: "calendar_today",
                        size: "md",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" 排程管理 ")
                    ]),
                    createVNode("div", { class: "row q-gutter-sm" }, [
                      createVNode(_component_q_btn, {
                        flat: "",
                        icon: "view_week",
                        onClick: ($event) => currentView.value = "week",
                        color: currentView.value === "week" ? "primary" : "grey"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 週視圖 ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "color"]),
                      createVNode(_component_q_btn, {
                        flat: "",
                        icon: "view_module",
                        onClick: ($event) => currentView.value = "month",
                        color: currentView.value === "month" ? "primary" : "grey"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 月視圖 ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "color"]),
                      createVNode(_component_q_btn, {
                        color: "primary",
                        icon: "add",
                        onClick: ($event) => showCreateBooking.value = true
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 新增預約 ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  createVNode(_component_q_card, {
                    flat: "",
                    bordered: "",
                    class: "q-mb-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, { class: "q-pa-md" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "row q-gutter-md items-center" }, [
                            createVNode("div", { class: "col-auto" }, [
                              createVNode(_component_q_btn_group, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_btn, {
                                    icon: "chevron_left",
                                    onClick: previousPeriod,
                                    flat: ""
                                  }),
                                  createVNode(_component_q_btn, {
                                    label: currentPeriodLabel.value,
                                    flat: "",
                                    onClick: ($event) => showDatePicker.value = true
                                  }, null, 8, ["label", "onClick"]),
                                  createVNode(_component_q_btn, {
                                    icon: "chevron_right",
                                    onClick: nextPeriod,
                                    flat: ""
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "col" }, [
                              createVNode(_component_q_select, {
                                modelValue: statusFilter.value,
                                "onUpdate:modelValue": ($event) => statusFilter.value = $event,
                                options: statusOptions,
                                label: "狀態篩選",
                                outlined: "",
                                dense: "",
                                clearable: "",
                                "emit-value": "",
                                "map-options": "",
                                class: "q-ml-md",
                                style: { "max-width": "200px" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "col-auto" }, [
                              createVNode(_component_q_btn, {
                                flat: "",
                                icon: "refresh",
                                onClick: loadBookings,
                                loading: isLoading.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 更新 ")
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
                  }),
                  isLoading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center q-pa-lg"
                  }, [
                    createVNode(_component_q_spinner_grid, {
                      size: "50px",
                      color: "primary"
                    }),
                    createVNode("div", { class: "text-body2 q-mt-md" }, "載入中...")
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    currentView.value === "week" ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(_component_q_card, {
                        flat: "",
                        bordered: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6 q-mb-md" }, "週排程表"),
                              createVNode("div", { class: "row q-mb-md" }, [
                                createVNode("div", { class: "col-2 text-center text-weight-medium" }, "時間"),
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDays.value, (day) => {
                                  return openBlock(), createBlock("div", {
                                    key: day.date,
                                    class: "col text-center text-weight-medium"
                                  }, [
                                    createVNode("div", null, toDisplayString(day.name), 1),
                                    createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(day.date), 1)
                                  ]);
                                }), 128))
                              ]),
                              createVNode("div", { class: "schedule-grid" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(workingHours), (hour) => {
                                  return openBlock(), createBlock("div", {
                                    key: hour,
                                    class: "row q-mb-xs"
                                  }, [
                                    createVNode("div", { class: "col-2 text-center text-caption q-pa-xs" }, toDisplayString(hour) + ":00 ", 1),
                                    (openBlock(true), createBlock(Fragment, null, renderList(weekDays.value, (day) => {
                                      return openBlock(), createBlock("div", {
                                        key: day.date + hour,
                                        class: "col q-pa-xs"
                                      }, [
                                        createVNode("div", {
                                          class: ["schedule-slot", getSlotClass(day.date, hour)],
                                          onClick: ($event) => handleSlotClick(day.date, hour)
                                        }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(getBookingsForSlot(day.date, hour), (booking) => {
                                            return openBlock(), createBlock("div", {
                                              key: booking.id,
                                              class: ["booking-item", `booking-${booking.status}`],
                                              onClick: withModifiers(($event) => showBookingDetails(booking), ["stop"])
                                            }, [
                                              createVNode("div", { class: "text-caption text-weight-medium" }, toDisplayString(getBookingTitle(booking)), 1),
                                              createVNode("div", { class: "text-caption" }, toDisplayString(booking.start_time) + " - " + toDisplayString(booking.end_time), 1)
                                            ], 10, ["onClick"]);
                                          }), 128))
                                        ], 10, ["onClick"])
                                      ]);
                                    }), 128))
                                  ]);
                                }), 128))
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode(_component_q_card, {
                        flat: "",
                        bordered: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_card_section, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-h6 q-mb-md" }, "月排程表"),
                              createVNode("div", { class: "row q-mb-sm" }, [
                                (openBlock(), createBlock(Fragment, null, renderList(dayNames, (dayName) => {
                                  return createVNode("div", {
                                    key: dayName,
                                    class: "col text-center text-weight-medium q-pa-xs"
                                  }, toDisplayString(dayName), 1);
                                }), 64))
                              ]),
                              createVNode("div", { class: "calendar-grid" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(monthWeeks.value, (week) => {
                                  return openBlock(), createBlock("div", {
                                    key: week[0].date,
                                    class: "row"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(week, (day) => {
                                      return openBlock(), createBlock("div", {
                                        key: day.date,
                                        class: ["col calendar-day", {
                                          "other-month": !day.isCurrentMonth,
                                          "today": day.isToday
                                        }],
                                        onClick: ($event) => selectDate(day.date)
                                      }, [
                                        createVNode("div", { class: "day-number" }, toDisplayString(day.day), 1),
                                        createVNode("div", { class: "day-bookings" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(getBookingsForDay(day.date), (booking) => {
                                            return openBlock(), createBlock("div", {
                                              key: booking.id,
                                              class: ["booking-dot", `booking-${booking.status}`],
                                              onClick: withModifiers(($event) => showBookingDetails(booking), ["stop"])
                                            }, [
                                              createVNode(_component_q_tooltip, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(getBookingTitle(booking)), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ], 10, ["onClick"]);
                                          }), 128))
                                        ])
                                      ], 10, ["onClick"]);
                                    }), 128))
                                  ]);
                                }), 128))
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])),
                    createVNode("div", { class: "row q-gutter-md q-mt-lg" }, [
                      createVNode("div", { class: "col" }, [
                        createVNode(_component_q_card, {
                          flat: "",
                          class: "bg-blue-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_card_section, { class: "text-center" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-h6 text-blue-8" }, toDisplayString(todayBookings.value), 1),
                                createVNode("div", { class: "text-caption text-blue-6" }, "今日預約")
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
                          class: "bg-green-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_card_section, { class: "text-center" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-h6 text-green-8" }, toDisplayString(weekBookings.value), 1),
                                createVNode("div", { class: "text-caption text-green-6" }, "本週預約")
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
                                createVNode("div", { class: "text-h6 text-orange-8" }, toDisplayString(monthBookings.value), 1),
                                createVNode("div", { class: "text-caption text-orange-6" }, "本月預約")
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
                          class: "bg-purple-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_card_section, { class: "text-center" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-h6 text-purple-8" }, toDisplayString(pendingBookings.value), 1),
                                createVNode("div", { class: "text-caption text-purple-6" }, "待確認")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]))
                ])
              ]),
              createVNode(_component_q_dialog, {
                modelValue: showDatePicker.value,
                "onUpdate:modelValue": ($event) => showDatePicker.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_date, {
                    modelValue: currentDate.value,
                    "onUpdate:modelValue": [($event) => currentDate.value = $event, onDateChange],
                    mask: "YYYY-MM-DD"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_q_dialog, {
                modelValue: showBookingDetailsDialog.value,
                "onUpdate:modelValue": ($event) => showBookingDetailsDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card, { style: { "min-width": "400px" } }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6" }, "預約詳情")
                        ]),
                        _: 1
                      }),
                      selectedBooking.value ? (openBlock(), createBlock(_component_q_card_section, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "row q-gutter-md" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "text-subtitle2" }, "服務對象"),
                              createVNode("div", null, toDisplayString(selectedBooking.value.patient_name || "未提供"), 1)
                            ]),
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "text-subtitle2" }, "服務時間"),
                              createVNode("div", null, toDisplayString(formatBookingTime(selectedBooking.value)), 1)
                            ]),
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "text-subtitle2" }, "服務類型"),
                              createVNode("div", null, toDisplayString(selectedBooking.value.service_type || "一般照護"), 1)
                            ]),
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "text-subtitle2" }, "狀態"),
                              createVNode(_component_q_chip, {
                                color: getStatusColor(selectedBooking.value.status),
                                "text-color": "white",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(getStatusName(selectedBooking.value.status)), 1)
                                ]),
                                _: 1
                              }, 8, ["color"])
                            ]),
                            selectedBooking.value.notes ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "col-12"
                            }, [
                              createVNode("div", { class: "text-subtitle2" }, "備註"),
                              createVNode("div", null, toDisplayString(selectedBooking.value.notes), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_q_card_actions, { align: "right" }, {
                        default: withCtx(() => [
                          selectedBooking.value?.status === "pending" ? (openBlock(), createBlock(_component_q_btn, {
                            key: 0,
                            color: "positive",
                            onClick: ($event) => confirmBooking(selectedBooking.value)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 確認預約 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true),
                          ["pending", "confirmed"].includes(selectedBooking.value?.status || "") ? (openBlock(), createBlock(_component_q_btn, {
                            key: 1,
                            color: "negative",
                            onClick: ($event) => cancelBooking(selectedBooking.value)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 取消預約 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true),
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "grey",
                            onClick: ($event) => showBookingDetailsDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 關閉 ")
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
                modelValue: showCreateBooking.value,
                "onUpdate:modelValue": ($event) => showCreateBooking.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card, { style: { "min-width": "500px" } }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6" }, "新增預約")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-body2 text-grey-6 q-mb-md" }, " 請前往預約頁面建立新的預約 "),
                          createVNode(_component_q_btn, {
                            color: "primary",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/booking/create"),
                            class: "full-width"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 前往預約頁面 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_card_actions, { align: "right" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_btn, {
                            flat: "",
                            color: "grey",
                            onClick: ($event) => showCreateBooking.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 取消 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/booking/schedule.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const schedule = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9e71684c"]]);

export { schedule as default };
//# sourceMappingURL=schedule-ByuWCJAi.mjs.map
