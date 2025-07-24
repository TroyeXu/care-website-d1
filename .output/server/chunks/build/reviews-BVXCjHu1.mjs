import { t as createComponent, V as btnDesignOptions, v as useDarkProps, w as useDark, W as between, X as btnPadding, Y as getBtnDesign, Z as isKeyCode, q as __nuxt_component_4, c as __nuxt_component_3, u as usePageSeo, o as useQuasar, p as useAuthStore, O as useNuxtApp, l as useRuntimeConfig, k as useHead, g as __nuxt_component_1$1, a as __nuxt_component_1, b as __nuxt_component_2, i as __nuxt_component_5$2, d as __nuxt_component_3$2, e as __nuxt_component_5, f as __nuxt_component_6, h as __nuxt_component_8$3, $ as __nuxt_component_23, P as navigateTo } from './server.mjs';
import { getCurrentInstance, computed, ref, watch, h, defineComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, unref, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useApiService } from './useApiService-Bqe0bsFu.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { _ as __nuxt_component_8 } from '../_/QSelect.mjs';
import { _ as __nuxt_component_8$1 } from '../_/QRating.mjs';
import { _ as __nuxt_component_8$2 } from '../_/QLinearProgress.mjs';
import { _ as __nuxt_component_9 } from '../_/QSpinnerDots.mjs';
import { _ as __nuxt_component_9$1 } from '../_/QChip.mjs';
import { _ as __nuxt_component_17 } from '../_/QForm.mjs';
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
import './useApiConfig-D0iRs2xG.mjs';

function getBool (val, otherwise) {
  return [ true, false ].includes(val)
    ? val
    : otherwise
}

const __nuxt_component_16 = createComponent({
  name: 'QPagination',

  props: {
    ...useDarkProps,

    modelValue: {
      type: Number,
      required: true
    },
    min: {
      type: [ Number, String ],
      default: 1
    },
    max: {
      type: [ Number, String ],
      required: true
    },
    maxPages: {
      type: [ Number, String ],
      default: 0,
      validator: v => (
        (typeof v === 'string' ? parseInt(v, 10) : v) >= 0
      )
    },

    inputStyle: [ Array, String, Object ],
    inputClass: [ Array, String, Object ],

    size: String,

    disable: Boolean,

    input: Boolean,

    iconPrev: String,
    iconNext: String,
    iconFirst: String,
    iconLast: String,

    toFn: Function,

    boundaryLinks: {
      type: Boolean,
      default: null
    },
    boundaryNumbers: {
      type: Boolean,
      default: null
    },
    directionLinks: {
      type: Boolean,
      default: null
    },
    ellipses: {
      type: Boolean,
      default: null
    },

    ripple: {
      type: [ Boolean, Object ],
      default: null
    },

    round: Boolean,
    rounded: Boolean,

    flat: Boolean,
    outline: Boolean,
    unelevated: Boolean,
    push: Boolean,
    glossy: Boolean,

    color: {
      type: String,
      default: 'primary'
    },
    textColor: String,

    activeDesign: {
      type: String,
      default: '',
      values: v => v === '' || btnDesignOptions.includes(v)
    },
    activeColor: String,
    activeTextColor: String,

    gutter: String,
    padding: {
      type: String,
      default: '3px 2px'
    }
  },

  emits: [ 'update:modelValue' ],

  setup (props, { emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;

    const isDark = useDark(props, $q);

    const minProp = computed(() => parseInt(props.min, 10));
    const maxProp = computed(() => parseInt(props.max, 10));
    const maxPagesProp = computed(() => parseInt(props.maxPages, 10));

    const inputPlaceholder = computed(() => model.value + ' / ' + maxProp.value);
    const boundaryLinksProp = computed(() => getBool(props.boundaryLinks, props.input));
    const boundaryNumbersProp = computed(() => getBool(props.boundaryNumbers, !props.input));
    const directionLinksProp = computed(() => getBool(props.directionLinks, props.input));
    const ellipsesProp = computed(() => getBool(props.ellipses, !props.input));

    const newPage = ref(null);
    const model = computed({
      get: () => props.modelValue,
      set: val => {
        val = parseInt(val, 10);
        if (props.disable || isNaN(val)) return

        const value = between(val, minProp.value, maxProp.value);
        if (props.modelValue !== value) {
          emit('update:modelValue', value);
        }
      }
    });

    watch(() => `${ minProp.value }|${ maxProp.value }`, () => {
      model.value = props.modelValue;
    });

    const classes = computed(() =>
      'q-pagination row no-wrap items-center'
      + (props.disable === true ? ' disabled' : '')
    );

    const gutterProp = computed(() => (
      props.gutter in btnPadding
        ? `${ btnPadding[ props.gutter ] }px`
        : props.gutter || null
    ));
    const gutterStyle = computed(() => (
      gutterProp.value !== null
        ? `--q-pagination-gutter-parent:-${ gutterProp.value };--q-pagination-gutter-child:${ gutterProp.value }`
        : null
    ));

    const icons = computed(() => {
      const ico = [
        props.iconFirst || $q.iconSet.pagination.first,
        props.iconPrev || $q.iconSet.pagination.prev,
        props.iconNext || $q.iconSet.pagination.next,
        props.iconLast || $q.iconSet.pagination.last
      ];
      return $q.lang.rtl === true ? ico.reverse() : ico
    });

    const attrs = computed(() => ({
      'aria-disabled': props.disable === true ? 'true' : 'false',
      role: 'navigation'
    }));

    const btnDesignProp = computed(() => getBtnDesign(props, 'flat'));
    const btnProps = computed(() => ({
      [ btnDesignProp.value ]: true,

      round: props.round,
      rounded: props.rounded,

      padding: props.padding,

      color: props.color,
      textColor: props.textColor,

      size: props.size,
      ripple: props.ripple !== null
        ? props.ripple
        : true
    }));

    const btnActiveDesignProp = computed(() => {
      // we also reset non-active design
      const acc = { [ btnDesignProp.value ]: false };
      if (props.activeDesign !== '') {
        acc[ props.activeDesign ] = true;
      }
      return acc
    });
    const activeBtnProps = computed(() => ({
      ...btnActiveDesignProp.value,
      color: props.activeColor || props.color,
      textColor: props.activeTextColor || props.textColor
    }));

    const btnConfig = computed(() => {
      let maxPages = Math.max(
        maxPagesProp.value,
        1 + (ellipsesProp.value ? 2 : 0) + (boundaryNumbersProp.value ? 2 : 0)
      );

      const acc = {
        pgFrom: minProp.value,
        pgTo: maxProp.value,
        ellipsesStart: false,
        ellipsesEnd: false,
        boundaryStart: false,
        boundaryEnd: false,
        marginalStyle: {
          minWidth: `${ Math.max(2, String(maxProp.value).length) }em`
        }
      };

      if (maxPagesProp.value && maxPages < (maxProp.value - minProp.value + 1)) {
        maxPages = 1 + Math.floor(maxPages / 2) * 2;
        acc.pgFrom = Math.max(minProp.value, Math.min(maxProp.value - maxPages + 1, props.modelValue - Math.floor(maxPages / 2)));
        acc.pgTo = Math.min(maxProp.value, acc.pgFrom + maxPages - 1);

        if (boundaryNumbersProp.value) {
          acc.boundaryStart = true;
          acc.pgFrom++;
        }

        if (ellipsesProp.value && acc.pgFrom > (minProp.value + (boundaryNumbersProp.value ? 1 : 0))) {
          acc.ellipsesStart = true;
          acc.pgFrom++;
        }

        if (boundaryNumbersProp.value) {
          acc.boundaryEnd = true;
          acc.pgTo--;
        }

        if (ellipsesProp.value && acc.pgTo < (maxProp.value - (boundaryNumbersProp.value ? 1 : 0))) {
          acc.ellipsesEnd = true;
          acc.pgTo--;
        }
      }

      return acc
    });

    function set (value) {
      model.value = value;
    }

    function setByOffset (offset) {
      model.value = model.value + offset;
    }

    const inputEvents = computed(() => {
      function updateModel () {
        model.value = newPage.value;
        newPage.value = null;
      }

      return {
        'onUpdate:modelValue': val => { newPage.value = val; },
        onKeyup: e => { isKeyCode(e, 13) === true && updateModel(); },
        onBlur: updateModel
      }
    });

    function getBtn (cfg, page, active) {
      const data = {
        'aria-label': page,
        'aria-current': 'false',
        ...btnProps.value,
        ...cfg
      };

      if (active === true) {
        Object.assign(data, {
          'aria-current': 'true',
          ...activeBtnProps.value
        });
      }

      if (page !== void 0) {
        if (props.toFn !== void 0) {
          data.to = props.toFn(page);
        }
        else {
          data.onClick = () => { set(page); };
        }
      }

      return h(__nuxt_component_3, data)
    }

    // expose public methods
    Object.assign(proxy, { set, setByOffset });

    return () => {
      const contentStart = [];
      const contentEnd = [];
      let contentMiddle;

      if (boundaryLinksProp.value === true) {
        contentStart.push(
          getBtn({
            key: 'bls',
            disable: props.disable || props.modelValue <= minProp.value,
            icon: icons.value[ 0 ],
            'aria-label': $q.lang.pagination.first
          }, minProp.value)
        );

        contentEnd.unshift(
          getBtn({
            key: 'ble',
            disable: props.disable || props.modelValue >= maxProp.value,
            icon: icons.value[ 3 ],
            'aria-label': $q.lang.pagination.last
          }, maxProp.value)
        );
      }

      if (directionLinksProp.value === true) {
        contentStart.push(
          getBtn({
            key: 'bdp',
            disable: props.disable || props.modelValue <= minProp.value,
            icon: icons.value[ 1 ],
            'aria-label': $q.lang.pagination.prev
          }, props.modelValue - 1)
        );

        contentEnd.unshift(
          getBtn({
            key: 'bdn',
            disable: props.disable || props.modelValue >= maxProp.value,
            icon: icons.value[ 2 ],
            'aria-label': $q.lang.pagination.next
          }, props.modelValue + 1)
        );
      }

      if (props.input !== true) { // has buttons instead of inputbox
        contentMiddle = [];
        const { pgFrom, pgTo, marginalStyle: style } = btnConfig.value;

        if (btnConfig.value.boundaryStart === true) {
          const active = minProp.value === props.modelValue;
          contentStart.push(
            getBtn({
              key: 'bns',
              style,
              disable: props.disable,
              label: minProp.value
            }, minProp.value, active)
          );
        }

        if (btnConfig.value.boundaryEnd === true) {
          const active = maxProp.value === props.modelValue;
          contentEnd.unshift(
            getBtn({
              key: 'bne',
              style,
              disable: props.disable,
              label: maxProp.value
            }, maxProp.value, active)
          );
        }

        if (btnConfig.value.ellipsesStart === true) {
          contentStart.push(
            getBtn({
              key: 'bes',
              style,
              disable: props.disable,
              label: '…',
              ripple: false
            }, pgFrom - 1)
          );
        }

        if (btnConfig.value.ellipsesEnd === true) {
          contentEnd.unshift(
            getBtn({
              key: 'bee',
              style,
              disable: props.disable,
              label: '…',
              ripple: false
            }, pgTo + 1)
          );
        }

        for (let i = pgFrom; i <= pgTo; i++) {
          contentMiddle.push(
            getBtn({
              key: `bpg${ i }`,
              style,
              disable: props.disable,
              label: i
            }, i, i === props.modelValue)
          );
        }
      }

      return h('div', {
        class: classes.value,
        ...attrs.value
      }, [
        h('div', {
          class: 'q-pagination__content row no-wrap items-center',
          style: gutterStyle.value
        }, [
          ...contentStart,

          props.input === true
            ? h(__nuxt_component_4, {
              class: 'inline',
              style: { width: `${ inputPlaceholder.value.length / 1.5 }em` },
              type: 'number',
              dense: true,
              value: newPage.value,
              disable: props.disable,
              dark: isDark.value,
              borderless: true,
              inputClass: props.inputClass,
              inputStyle: props.inputStyle,
              placeholder: inputPlaceholder.value,
              min: minProp.value,
              max: maxProp.value,
              ...inputEvents.value
            })
            : h('div', {
              class: 'q-pagination__middle row justify-center'
            }, contentMiddle),

          ...contentEnd
        ])
      ])
    }
  }
});

const itemsPerPage = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "reviews",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("用戶評價 - 護理服務平台", "查看其他用戶對護理服務的評價與回饋");
    const route = useRoute();
    const $q = useQuasar();
    const apiService = useApiService();
    const authStore = useAuthStore();
    const reviews = ref([]);
    const caregivers = ref([]);
    const isLoading = ref(false);
    const isSubmitting = ref(false);
    const currentPage = ref(1);
    const selectedCaregiverId = ref(null);
    const reviewForm = ref({
      caregiver_id: null,
      rating: 0,
      comment: "",
      service_type: ""
    });
    const serviceTypeOptions = [
      "一般照護",
      "專業護理",
      "復健協助",
      "夜間照護",
      "失智症照護",
      "長期照護"
    ];
    const caregiverOptions = computed(() => {
      return [{ label: "全部看護師", value: null }, ...caregivers.value.map((c) => ({
        label: c.name,
        value: c.id
      }))];
    });
    const averageRating = computed(() => {
      if (reviews.value.length === 0) return 0;
      return reviews.value.reduce((sum, r) => sum + r.rating, 0) / reviews.value.length;
    });
    const totalPages = computed(() => {
      return Math.ceil(reviews.value.length / itemsPerPage);
    });
    const paginatedReviews = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return reviews.value.slice(start, end);
    });
    const loadReviews = async () => {
      isLoading.value = true;
      try {
        if (selectedCaregiverId.value) {
          reviews.value = await apiService.getReviewsByCaregiver(selectedCaregiverId.value);
        } else {
          const allReviews = [];
          for (const caregiver of caregivers.value.slice(0, 5)) {
            try {
              const caregiverReviews = await apiService.getReviewsByCaregiver(caregiver.id);
              allReviews.push(...caregiverReviews);
            } catch (error) {
              console.warn(`載入看護師 ${caregiver.id} 的評價失敗:`, error);
            }
          }
          reviews.value = allReviews.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      } catch (error) {
        console.error("載入評價失敗:", error);
        $q.notify({
          type: "negative",
          message: error.message || "載入評價失敗",
          timeout: 3e3
        });
      } finally {
        isLoading.value = false;
      }
    };
    const submitReview = async () => {
      if (!reviewForm.value.caregiver_id || !reviewForm.value.rating || !reviewForm.value.comment) {
        $q.notify({
          type: "warning",
          message: "請填寫完整的評價資訊",
          timeout: 3e3
        });
        return;
      }
      if (!authStore.currentUser) {
        $q.notify({
          type: "warning",
          message: "請先登入才能提交評價",
          timeout: 3e3
        });
        return;
      }
      isSubmitting.value = true;
      try {
        const reviewData = {
          caregiver_id: reviewForm.value.caregiver_id,
          user_id: authStore.currentUser.id,
          rating: reviewForm.value.rating,
          comment: reviewForm.value.comment,
          service_type: reviewForm.value.service_type
        };
        const newReview = await apiService.createReview(reviewData);
        reviews.value.unshift(newReview);
        $q.notify({
          type: "positive",
          message: "評價提交成功！",
          timeout: 3e3
        });
        resetForm();
      } catch (error) {
        console.error("提交評價失敗:", error);
        $q.notify({
          type: "negative",
          message: error.message || "提交評價失敗",
          timeout: 3e3
        });
      } finally {
        isSubmitting.value = false;
      }
    };
    const resetForm = () => {
      reviewForm.value = {
        caregiver_id: null,
        rating: 0,
        comment: "",
        service_type: ""
      };
    };
    const toggleLike = (review) => {
      if (!authStore.currentUser) {
        $q.notify({
          type: "warning",
          message: "請先登入才能按讚",
          timeout: 2e3
        });
        return;
      }
      review.liked = !review.liked;
      review.likes = (review.likes || 0) + (review.liked ? 1 : -1);
      $q.notify({
        type: "positive",
        message: review.liked ? "已按讚" : "已取消按讚",
        timeout: 1e3
      });
    };
    const getRatingCount = (rating) => {
      return reviews.value.filter((r) => Math.floor(r.rating) === rating).length;
    };
    const getRatingPercentage = (rating) => {
      if (reviews.value.length === 0) return 0;
      return getRatingCount(rating) / reviews.value.length;
    };
    const getRatingLabel = (rating) => {
      const labels = ["", "非常不滿意", "不滿意", "一般", "滿意", "非常滿意"];
      return labels[rating] || "";
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
    };
    const onPageChange = (page) => {
      currentPage.value = page;
      (void 0).scrollTo({ top: 0, behavior: "smooth" });
    };
    watch(() => route.query.caregiverId, (newId) => {
      if (newId) {
        selectedCaregiverId.value = parseInt(newId);
      }
    }, { immediate: true });
    const { $route } = useNuxtApp();
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseUrl || "";
    watch([reviews, averageRating], ([newReviews, newAverage]) => {
      if (newReviews.length > 0) {
        useHead({
          script: [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                name: "護理服務平台",
                url: baseUrl + $route.fullPath,
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: newAverage,
                  reviewCount: newReviews.length,
                  bestRating: 5,
                  worstRating: 1
                },
                review: newReviews.slice(0, 10).map((r) => ({
                  "@type": "Review",
                  reviewRating: { "@type": "Rating", ratingValue: r.rating },
                  author: { "@type": "Person", name: r.user_name || "匯名用戶" },
                  reviewBody: r.comment,
                  datePublished: r.created_at
                }))
              })
            }
          ]
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_icon = __nuxt_component_1$1;
      const _component_q_select = __nuxt_component_8;
      const _component_q_btn = __nuxt_component_3;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_rating = __nuxt_component_8$1;
      const _component_q_separator = __nuxt_component_5$2;
      const _component_q_linear_progress = __nuxt_component_8$2;
      const _component_q_spinner_dots = __nuxt_component_9;
      const _component_q_list = __nuxt_component_3$2;
      const _component_q_item = __nuxt_component_5;
      const _component_q_item_section = __nuxt_component_6;
      const _component_q_item_label = __nuxt_component_8$3;
      const _component_q_space = __nuxt_component_23;
      const _component_q_chip = __nuxt_component_9$1;
      const _component_q_pagination = __nuxt_component_16;
      const _component_q_form = __nuxt_component_17;
      const _component_q_input = __nuxt_component_4;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row justify-center"${_scopeId}><div class="col-12 col-lg-10"${_scopeId}><div class="row items-center justify-between q-mb-lg"${_scopeId}><div class="text-h5 text-primary"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_icon, {
              name: "rate_review",
              size: "md",
              class: "q-mr-sm"
            }, null, _parent2, _scopeId));
            _push2(` 用戶評價 </div><div class="row q-gutter-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_select, {
              modelValue: selectedCaregiverId.value,
              "onUpdate:modelValue": [($event) => selectedCaregiverId.value = $event, loadReviews],
              options: caregiverOptions.value,
              label: "選擇看護師",
              outlined: "",
              dense: "",
              clearable: "",
              "emit-value": "",
              "map-options": "",
              style: { "min-width": "200px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_btn, {
              flat: "",
              icon: "refresh",
              onClick: loadReviews,
              loading: isLoading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 更新 `);
                } else {
                  return [
                    createTextVNode(" 更新 ")
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
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="row items-center justify-center q-gutter-lg"${_scopeId3}><div class="text-center"${_scopeId3}><div class="text-h4 text-primary"${_scopeId3}>${ssrInterpolate(averageRating.value.toFixed(1))}</div>`);
                        _push4(ssrRenderComponent(_component_q_rating, {
                          "model-value": averageRating.value,
                          readonly: "",
                          color: "orange",
                          size: "2em",
                          class: "q-mt-xs"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="text-caption text-grey-6 q-mt-xs"${_scopeId3}> 平均評分 (基於 ${ssrInterpolate(reviews.value.length)} 則評價) </div></div>`);
                        _push4(ssrRenderComponent(_component_q_separator, { vertical: "" }, null, _parent4, _scopeId3));
                        _push4(`<div class="col"${_scopeId3}><div class="text-h6 q-mb-md"${_scopeId3}>評價分佈</div><!--[-->`);
                        ssrRenderList([5, 4, 3, 2, 1], (i) => {
                          _push4(`<div class="row items-center q-mb-xs"${_scopeId3}><div class="text-caption q-mr-sm"${_scopeId3}>${ssrInterpolate(i)} 星</div>`);
                          _push4(ssrRenderComponent(_component_q_linear_progress, {
                            value: getRatingPercentage(i),
                            color: "orange",
                            size: "md",
                            class: "col q-mr-sm"
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="text-caption" style="${ssrRenderStyle({ "min-width": "30px" })}"${_scopeId3}>${ssrInterpolate(getRatingCount(i))}</div></div>`);
                        });
                        _push4(`<!--]--></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "row items-center justify-center q-gutter-lg" }, [
                            createVNode("div", { class: "text-center" }, [
                              createVNode("div", { class: "text-h4 text-primary" }, toDisplayString(averageRating.value.toFixed(1)), 1),
                              createVNode(_component_q_rating, {
                                "model-value": averageRating.value,
                                readonly: "",
                                color: "orange",
                                size: "2em",
                                class: "q-mt-xs"
                              }, null, 8, ["model-value"]),
                              createVNode("div", { class: "text-caption text-grey-6 q-mt-xs" }, " 平均評分 (基於 " + toDisplayString(reviews.value.length) + " 則評價) ", 1)
                            ]),
                            createVNode(_component_q_separator, { vertical: "" }),
                            createVNode("div", { class: "col" }, [
                              createVNode("div", { class: "text-h6 q-mb-md" }, "評價分佈"),
                              (openBlock(), createBlock(Fragment, null, renderList([5, 4, 3, 2, 1], (i) => {
                                return createVNode("div", {
                                  key: i,
                                  class: "row items-center q-mb-xs"
                                }, [
                                  createVNode("div", { class: "text-caption q-mr-sm" }, toDisplayString(i) + " 星", 1),
                                  createVNode(_component_q_linear_progress, {
                                    value: getRatingPercentage(i),
                                    color: "orange",
                                    size: "md",
                                    class: "col q-mr-sm"
                                  }, null, 8, ["value"]),
                                  createVNode("div", {
                                    class: "text-caption",
                                    style: { "min-width": "30px" }
                                  }, toDisplayString(getRatingCount(i)), 1)
                                ]);
                              }), 64))
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
                        createVNode("div", { class: "row items-center justify-center q-gutter-lg" }, [
                          createVNode("div", { class: "text-center" }, [
                            createVNode("div", { class: "text-h4 text-primary" }, toDisplayString(averageRating.value.toFixed(1)), 1),
                            createVNode(_component_q_rating, {
                              "model-value": averageRating.value,
                              readonly: "",
                              color: "orange",
                              size: "2em",
                              class: "q-mt-xs"
                            }, null, 8, ["model-value"]),
                            createVNode("div", { class: "text-caption text-grey-6 q-mt-xs" }, " 平均評分 (基於 " + toDisplayString(reviews.value.length) + " 則評價) ", 1)
                          ]),
                          createVNode(_component_q_separator, { vertical: "" }),
                          createVNode("div", { class: "col" }, [
                            createVNode("div", { class: "text-h6 q-mb-md" }, "評價分佈"),
                            (openBlock(), createBlock(Fragment, null, renderList([5, 4, 3, 2, 1], (i) => {
                              return createVNode("div", {
                                key: i,
                                class: "row items-center q-mb-xs"
                              }, [
                                createVNode("div", { class: "text-caption q-mr-sm" }, toDisplayString(i) + " 星", 1),
                                createVNode(_component_q_linear_progress, {
                                  value: getRatingPercentage(i),
                                  color: "orange",
                                  size: "md",
                                  class: "col q-mr-sm"
                                }, null, 8, ["value"]),
                                createVNode("div", {
                                  class: "text-caption",
                                  style: { "min-width": "30px" }
                                }, toDisplayString(getRatingCount(i)), 1)
                              ]);
                            }), 64))
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
              _push2(`<div class="text-center q-pa-lg"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_spinner_dots, {
                size: "50px",
                color: "primary"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-body2 q-mt-md"${_scopeId}>載入中...</div></div>`);
            } else if (reviews.value.length > 0) {
              _push2(`<div${_scopeId}>`);
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
                          _push4(`<div class="text-h6 q-mb-md"${_scopeId3}>所有評價</div>`);
                          _push4(ssrRenderComponent(_component_q_list, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(paginatedReviews.value, (review) => {
                                  _push5(ssrRenderComponent(_component_q_item, {
                                    key: review.id,
                                    class: "q-pa-md"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_q_item_section, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_q_item_label, { class: "row items-center q-mb-sm" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_q_rating, {
                                                      "model-value": review.rating,
                                                      readonly: "",
                                                      color: "orange",
                                                      size: "1em",
                                                      class: "q-mr-sm"
                                                    }, null, _parent8, _scopeId7));
                                                    _push8(`<span class="text-caption text-grey-6"${_scopeId7}>${ssrInterpolate(formatDate(review.created_at))}</span>`);
                                                    _push8(ssrRenderComponent(_component_q_space, null, null, _parent8, _scopeId7));
                                                    if (review.verified) {
                                                      _push8(ssrRenderComponent(_component_q_chip, {
                                                        size: "sm",
                                                        color: "positive",
                                                        "text-color": "white",
                                                        icon: "verified"
                                                      }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(` 已驗證 `);
                                                          } else {
                                                            return [
                                                              createTextVNode(" 已驗證 ")
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    } else {
                                                      _push8(`<!---->`);
                                                    }
                                                  } else {
                                                    return [
                                                      createVNode(_component_q_rating, {
                                                        "model-value": review.rating,
                                                        readonly: "",
                                                        color: "orange",
                                                        size: "1em",
                                                        class: "q-mr-sm"
                                                      }, null, 8, ["model-value"]),
                                                      createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1),
                                                      createVNode(_component_q_space),
                                                      review.verified ? (openBlock(), createBlock(_component_q_chip, {
                                                        key: 0,
                                                        size: "sm",
                                                        color: "positive",
                                                        "text-color": "white",
                                                        icon: "verified"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(" 已驗證 ")
                                                        ]),
                                                        _: 1
                                                      })) : createCommentVNode("", true)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(_component_q_item_label, { class: "text-body1 q-mb-sm" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(review.comment)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(review.comment), 1)
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
                                                    _push8(` 由 ${ssrInterpolate(review.user_name || "匯名用戶")} 提供 `);
                                                    if (review.service_type) {
                                                      _push8(`<span${_scopeId7}> · ${ssrInterpolate(review.service_type)}</span>`);
                                                    } else {
                                                      _push8(`<!---->`);
                                                    }
                                                  } else {
                                                    return [
                                                      createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1),
                                                      review.service_type ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(review.service_type), 1)) : createCommentVNode("", true)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              if (review.reply) {
                                                _push7(`<div class="bg-grey-1 q-pa-md q-mt-sm rounded-borders"${_scopeId6}><div class="text-caption text-grey-7 q-mb-xs"${_scopeId6}>`);
                                                _push7(ssrRenderComponent(_component_q_icon, {
                                                  name: "reply",
                                                  size: "xs",
                                                  class: "q-mr-xs"
                                                }, null, _parent7, _scopeId6));
                                                _push7(` 看護師回覆： </div><div class="text-body2"${_scopeId6}>${ssrInterpolate(review.reply)}</div></div>`);
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                            } else {
                                              return [
                                                createVNode(_component_q_item_label, { class: "row items-center q-mb-sm" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_rating, {
                                                      "model-value": review.rating,
                                                      readonly: "",
                                                      color: "orange",
                                                      size: "1em",
                                                      class: "q-mr-sm"
                                                    }, null, 8, ["model-value"]),
                                                    createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1),
                                                    createVNode(_component_q_space),
                                                    review.verified ? (openBlock(), createBlock(_component_q_chip, {
                                                      key: 0,
                                                      size: "sm",
                                                      color: "positive",
                                                      "text-color": "white",
                                                      icon: "verified"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" 已驗證 ")
                                                      ]),
                                                      _: 1
                                                    })) : createCommentVNode("", true)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_q_item_label, { class: "text-body1 q-mb-sm" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(review.comment), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_q_item_label, {
                                                  caption: "",
                                                  class: "text-grey-6"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1),
                                                    review.service_type ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(review.service_type), 1)) : createCommentVNode("", true)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                review.reply ? (openBlock(), createBlock("div", {
                                                  key: 0,
                                                  class: "bg-grey-1 q-pa-md q-mt-sm rounded-borders"
                                                }, [
                                                  createVNode("div", { class: "text-caption text-grey-7 q-mb-xs" }, [
                                                    createVNode(_component_q_icon, {
                                                      name: "reply",
                                                      size: "xs",
                                                      class: "q-mr-xs"
                                                    }),
                                                    createTextVNode(" 看護師回覆： ")
                                                  ]),
                                                  createVNode("div", { class: "text-body2" }, toDisplayString(review.reply), 1)
                                                ])) : createCommentVNode("", true)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_q_item_section, {
                                          side: "",
                                          top: ""
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<div class="text-right"${_scopeId6}>`);
                                              _push7(ssrRenderComponent(_component_q_btn, {
                                                flat: "",
                                                dense: "",
                                                icon: "thumb_up",
                                                size: "sm",
                                                color: review.liked ? "primary" : "grey",
                                                onClick: ($event) => toggleLike(review)
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(review.likes || 0)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(review.likes || 0), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(`</div>`);
                                            } else {
                                              return [
                                                createVNode("div", { class: "text-right" }, [
                                                  createVNode(_component_q_btn, {
                                                    flat: "",
                                                    dense: "",
                                                    icon: "thumb_up",
                                                    size: "sm",
                                                    color: review.liked ? "primary" : "grey",
                                                    onClick: ($event) => toggleLike(review)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(review.likes || 0), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["color", "onClick"])
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_q_separator, {
                                          spaced: "",
                                          inset: "item"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "row items-center q-mb-sm" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_rating, {
                                                    "model-value": review.rating,
                                                    readonly: "",
                                                    color: "orange",
                                                    size: "1em",
                                                    class: "q-mr-sm"
                                                  }, null, 8, ["model-value"]),
                                                  createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1),
                                                  createVNode(_component_q_space),
                                                  review.verified ? (openBlock(), createBlock(_component_q_chip, {
                                                    key: 0,
                                                    size: "sm",
                                                    color: "positive",
                                                    "text-color": "white",
                                                    icon: "verified"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" 已驗證 ")
                                                    ]),
                                                    _: 1
                                                  })) : createCommentVNode("", true)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, { class: "text-body1 q-mb-sm" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(review.comment), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_q_item_label, {
                                                caption: "",
                                                class: "text-grey-6"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1),
                                                  review.service_type ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(review.service_type), 1)) : createCommentVNode("", true)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              review.reply ? (openBlock(), createBlock("div", {
                                                key: 0,
                                                class: "bg-grey-1 q-pa-md q-mt-sm rounded-borders"
                                              }, [
                                                createVNode("div", { class: "text-caption text-grey-7 q-mb-xs" }, [
                                                  createVNode(_component_q_icon, {
                                                    name: "reply",
                                                    size: "xs",
                                                    class: "q-mr-xs"
                                                  }),
                                                  createTextVNode(" 看護師回覆： ")
                                                ]),
                                                createVNode("div", { class: "text-body2" }, toDisplayString(review.reply), 1)
                                              ])) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_section, {
                                            side: "",
                                            top: ""
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "text-right" }, [
                                                createVNode(_component_q_btn, {
                                                  flat: "",
                                                  dense: "",
                                                  icon: "thumb_up",
                                                  size: "sm",
                                                  color: review.liked ? "primary" : "grey",
                                                  onClick: ($event) => toggleLike(review)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(review.likes || 0), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["color", "onClick"])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_separator, {
                                            spaced: "",
                                            inset: "item"
                                          })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(paginatedReviews.value, (review) => {
                                    return openBlock(), createBlock(_component_q_item, {
                                      key: review.id,
                                      class: "q-pa-md"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, { class: "row items-center q-mb-sm" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_rating, {
                                                  "model-value": review.rating,
                                                  readonly: "",
                                                  color: "orange",
                                                  size: "1em",
                                                  class: "q-mr-sm"
                                                }, null, 8, ["model-value"]),
                                                createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1),
                                                createVNode(_component_q_space),
                                                review.verified ? (openBlock(), createBlock(_component_q_chip, {
                                                  key: 0,
                                                  size: "sm",
                                                  color: "positive",
                                                  "text-color": "white",
                                                  icon: "verified"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" 已驗證 ")
                                                  ]),
                                                  _: 1
                                                })) : createCommentVNode("", true)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_q_item_label, { class: "text-body1 q-mb-sm" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(review.comment), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_q_item_label, {
                                              caption: "",
                                              class: "text-grey-6"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1),
                                                review.service_type ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(review.service_type), 1)) : createCommentVNode("", true)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            review.reply ? (openBlock(), createBlock("div", {
                                              key: 0,
                                              class: "bg-grey-1 q-pa-md q-mt-sm rounded-borders"
                                            }, [
                                              createVNode("div", { class: "text-caption text-grey-7 q-mb-xs" }, [
                                                createVNode(_component_q_icon, {
                                                  name: "reply",
                                                  size: "xs",
                                                  class: "q-mr-xs"
                                                }),
                                                createTextVNode(" 看護師回覆： ")
                                              ]),
                                              createVNode("div", { class: "text-body2" }, toDisplayString(review.reply), 1)
                                            ])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_section, {
                                          side: "",
                                          top: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "text-right" }, [
                                              createVNode(_component_q_btn, {
                                                flat: "",
                                                dense: "",
                                                icon: "thumb_up",
                                                size: "sm",
                                                color: review.liked ? "primary" : "grey",
                                                onClick: ($event) => toggleLike(review)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(review.likes || 0), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["color", "onClick"])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_separator, {
                                          spaced: "",
                                          inset: "item"
                                        })
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          if (totalPages.value > 1) {
                            _push4(`<div class="text-center q-mt-md"${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_q_pagination, {
                              modelValue: currentPage.value,
                              "onUpdate:modelValue": [($event) => currentPage.value = $event, onPageChange],
                              max: totalPages.value,
                              "direction-links": "",
                              "boundary-links": "",
                              "icon-first": "skip_previous",
                              "icon-last": "skip_next",
                              "icon-prev": "fast_rewind",
                              "icon-next": "fast_forward"
                            }, null, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 q-mb-md" }, "所有評價"),
                            createVNode(_component_q_list, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(paginatedReviews.value, (review) => {
                                  return openBlock(), createBlock(_component_q_item, {
                                    key: review.id,
                                    class: "q-pa-md"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, { class: "row items-center q-mb-sm" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_rating, {
                                                "model-value": review.rating,
                                                readonly: "",
                                                color: "orange",
                                                size: "1em",
                                                class: "q-mr-sm"
                                              }, null, 8, ["model-value"]),
                                              createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1),
                                              createVNode(_component_q_space),
                                              review.verified ? (openBlock(), createBlock(_component_q_chip, {
                                                key: 0,
                                                size: "sm",
                                                color: "positive",
                                                "text-color": "white",
                                                icon: "verified"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" 已驗證 ")
                                                ]),
                                                _: 1
                                              })) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_label, { class: "text-body1 q-mb-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(review.comment), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_label, {
                                            caption: "",
                                            class: "text-grey-6"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1),
                                              review.service_type ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(review.service_type), 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          review.reply ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "bg-grey-1 q-pa-md q-mt-sm rounded-borders"
                                          }, [
                                            createVNode("div", { class: "text-caption text-grey-7 q-mb-xs" }, [
                                              createVNode(_component_q_icon, {
                                                name: "reply",
                                                size: "xs",
                                                class: "q-mr-xs"
                                              }),
                                              createTextVNode(" 看護師回覆： ")
                                            ]),
                                            createVNode("div", { class: "text-body2" }, toDisplayString(review.reply), 1)
                                          ])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_section, {
                                        side: "",
                                        top: ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-right" }, [
                                            createVNode(_component_q_btn, {
                                              flat: "",
                                              dense: "",
                                              icon: "thumb_up",
                                              size: "sm",
                                              color: review.liked ? "primary" : "grey",
                                              onClick: ($event) => toggleLike(review)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(review.likes || 0), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["color", "onClick"])
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_separator, {
                                        spaced: "",
                                        inset: "item"
                                      })
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            }),
                            totalPages.value > 1 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center q-mt-md"
                            }, [
                              createVNode(_component_q_pagination, {
                                modelValue: currentPage.value,
                                "onUpdate:modelValue": [($event) => currentPage.value = $event, onPageChange],
                                max: totalPages.value,
                                "direction-links": "",
                                "boundary-links": "",
                                "icon-first": "skip_previous",
                                "icon-last": "skip_next",
                                "icon-prev": "fast_rewind",
                                "icon-next": "fast_forward"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
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
                          createVNode("div", { class: "text-h6 q-mb-md" }, "所有評價"),
                          createVNode(_component_q_list, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(paginatedReviews.value, (review) => {
                                return openBlock(), createBlock(_component_q_item, {
                                  key: review.id,
                                  class: "q-pa-md"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, { class: "row items-center q-mb-sm" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_rating, {
                                              "model-value": review.rating,
                                              readonly: "",
                                              color: "orange",
                                              size: "1em",
                                              class: "q-mr-sm"
                                            }, null, 8, ["model-value"]),
                                            createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1),
                                            createVNode(_component_q_space),
                                            review.verified ? (openBlock(), createBlock(_component_q_chip, {
                                              key: 0,
                                              size: "sm",
                                              color: "positive",
                                              "text-color": "white",
                                              icon: "verified"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" 已驗證 ")
                                              ]),
                                              _: 1
                                            })) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_label, { class: "text-body1 q-mb-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(review.comment), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_q_item_label, {
                                          caption: "",
                                          class: "text-grey-6"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1),
                                            review.service_type ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(review.service_type), 1)) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        review.reply ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "bg-grey-1 q-pa-md q-mt-sm rounded-borders"
                                        }, [
                                          createVNode("div", { class: "text-caption text-grey-7 q-mb-xs" }, [
                                            createVNode(_component_q_icon, {
                                              name: "reply",
                                              size: "xs",
                                              class: "q-mr-xs"
                                            }),
                                            createTextVNode(" 看護師回覆： ")
                                          ]),
                                          createVNode("div", { class: "text-body2" }, toDisplayString(review.reply), 1)
                                        ])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_item_section, {
                                      side: "",
                                      top: ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-right" }, [
                                          createVNode(_component_q_btn, {
                                            flat: "",
                                            dense: "",
                                            icon: "thumb_up",
                                            size: "sm",
                                            color: review.liked ? "primary" : "grey",
                                            onClick: ($event) => toggleLike(review)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(review.likes || 0), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["color", "onClick"])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_q_separator, {
                                      spaced: "",
                                      inset: "item"
                                    })
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 1
                          }),
                          totalPages.value > 1 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center q-mt-md"
                          }, [
                            createVNode(_component_q_pagination, {
                              modelValue: currentPage.value,
                              "onUpdate:modelValue": [($event) => currentPage.value = $event, onPageChange],
                              max: totalPages.value,
                              "direction-links": "",
                              "boundary-links": "",
                              "icon-first": "skip_previous",
                              "icon-last": "skip_next",
                              "icon-prev": "fast_rewind",
                              "icon-next": "fast_forward"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                          ])) : createCommentVNode("", true)
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
              _push2(`<div class="text-center q-pa-lg"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_icon, {
                name: "rate_review",
                size: "80px",
                color: "grey-5"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-h6 q-mt-md text-grey-7"${_scopeId}>尚無評價</div><div class="text-body2 text-grey-6"${_scopeId}>${ssrInterpolate(selectedCaregiverId.value ? "這位看護師還沒有收到評價" : "請選擇看護師查看評價")}</div></div>`);
            }
            if (unref(authStore).currentUser) {
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h6 q-mb-md"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_q_icon, {
                            name: "edit",
                            class: "q-mr-sm"
                          }, null, _parent4, _scopeId3));
                          _push4(` 撰寫評價 </div>`);
                          _push4(ssrRenderComponent(_component_q_form, {
                            onSubmit: submitReview,
                            class: "q-gutter-md"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="row q-gutter-md"${_scopeId4}><div class="col-12 col-sm-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_q_select, {
                                  modelValue: reviewForm.value.caregiver_id,
                                  "onUpdate:modelValue": ($event) => reviewForm.value.caregiver_id = $event,
                                  options: caregiverOptions.value,
                                  label: "選擇看護師 *",
                                  outlined: "",
                                  dense: "",
                                  "emit-value": "",
                                  "map-options": "",
                                  rules: [(val) => !!val || "請選擇看護師"]
                                }, null, _parent5, _scopeId4));
                                _push5(`</div><div class="col-12 col-sm-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_q_select, {
                                  modelValue: reviewForm.value.service_type,
                                  "onUpdate:modelValue": ($event) => reviewForm.value.service_type = $event,
                                  options: serviceTypeOptions,
                                  label: "服務類型",
                                  outlined: "",
                                  dense: ""
                                }, null, _parent5, _scopeId4));
                                _push5(`</div></div><div class="row items-center q-gutter-md"${_scopeId4}><div class="text-subtitle2"${_scopeId4}>評分 *</div>`);
                                _push5(ssrRenderComponent(_component_q_rating, {
                                  modelValue: reviewForm.value.rating,
                                  "onUpdate:modelValue": ($event) => reviewForm.value.rating = $event,
                                  max: 5,
                                  color: "orange",
                                  size: "2em"
                                }, null, _parent5, _scopeId4));
                                _push5(`<div class="text-caption text-grey-6"${_scopeId4}>${ssrInterpolate(getRatingLabel(reviewForm.value.rating))}</div></div>`);
                                _push5(ssrRenderComponent(_component_q_input, {
                                  modelValue: reviewForm.value.comment,
                                  "onUpdate:modelValue": ($event) => reviewForm.value.comment = $event,
                                  label: "評價內容 *",
                                  type: "textarea",
                                  outlined: "",
                                  rows: "4",
                                  placeholder: "請分享您的服務體驗...",
                                  rules: [(val) => !!val || "請填寫評價內容"]
                                }, null, _parent5, _scopeId4));
                                _push5(`<div class="row q-gutter-sm"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_q_btn, {
                                  type: "submit",
                                  color: "primary",
                                  loading: isSubmitting.value,
                                  disable: !reviewForm.value.caregiver_id || !reviewForm.value.rating || !reviewForm.value.comment
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(isSubmitting.value ? "提交中..." : "提交評價")}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(isSubmitting.value ? "提交中..." : "提交評價"), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_q_btn, {
                                  flat: "",
                                  color: "grey",
                                  onClick: resetForm,
                                  disable: isSubmitting.value
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` 清除 `);
                                    } else {
                                      return [
                                        createTextVNode(" 清除 ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "row q-gutter-md" }, [
                                    createVNode("div", { class: "col-12 col-sm-6" }, [
                                      createVNode(_component_q_select, {
                                        modelValue: reviewForm.value.caregiver_id,
                                        "onUpdate:modelValue": ($event) => reviewForm.value.caregiver_id = $event,
                                        options: caregiverOptions.value,
                                        label: "選擇看護師 *",
                                        outlined: "",
                                        dense: "",
                                        "emit-value": "",
                                        "map-options": "",
                                        rules: [(val) => !!val || "請選擇看護師"]
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                                    ]),
                                    createVNode("div", { class: "col-12 col-sm-6" }, [
                                      createVNode(_component_q_select, {
                                        modelValue: reviewForm.value.service_type,
                                        "onUpdate:modelValue": ($event) => reviewForm.value.service_type = $event,
                                        options: serviceTypeOptions,
                                        label: "服務類型",
                                        outlined: "",
                                        dense: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ])
                                  ]),
                                  createVNode("div", { class: "row items-center q-gutter-md" }, [
                                    createVNode("div", { class: "text-subtitle2" }, "評分 *"),
                                    createVNode(_component_q_rating, {
                                      modelValue: reviewForm.value.rating,
                                      "onUpdate:modelValue": ($event) => reviewForm.value.rating = $event,
                                      max: 5,
                                      color: "orange",
                                      size: "2em"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(getRatingLabel(reviewForm.value.rating)), 1)
                                  ]),
                                  createVNode(_component_q_input, {
                                    modelValue: reviewForm.value.comment,
                                    "onUpdate:modelValue": ($event) => reviewForm.value.comment = $event,
                                    label: "評價內容 *",
                                    type: "textarea",
                                    outlined: "",
                                    rows: "4",
                                    placeholder: "請分享您的服務體驗...",
                                    rules: [(val) => !!val || "請填寫評價內容"]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                  createVNode("div", { class: "row q-gutter-sm" }, [
                                    createVNode(_component_q_btn, {
                                      type: "submit",
                                      color: "primary",
                                      loading: isSubmitting.value,
                                      disable: !reviewForm.value.caregiver_id || !reviewForm.value.rating || !reviewForm.value.comment
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(isSubmitting.value ? "提交中..." : "提交評價"), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "disable"]),
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
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("div", { class: "text-h6 q-mb-md" }, [
                              createVNode(_component_q_icon, {
                                name: "edit",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" 撰寫評價 ")
                            ]),
                            createVNode(_component_q_form, {
                              onSubmit: withModifiers(submitReview, ["prevent"]),
                              class: "q-gutter-md"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "row q-gutter-md" }, [
                                  createVNode("div", { class: "col-12 col-sm-6" }, [
                                    createVNode(_component_q_select, {
                                      modelValue: reviewForm.value.caregiver_id,
                                      "onUpdate:modelValue": ($event) => reviewForm.value.caregiver_id = $event,
                                      options: caregiverOptions.value,
                                      label: "選擇看護師 *",
                                      outlined: "",
                                      dense: "",
                                      "emit-value": "",
                                      "map-options": "",
                                      rules: [(val) => !!val || "請選擇看護師"]
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                                  ]),
                                  createVNode("div", { class: "col-12 col-sm-6" }, [
                                    createVNode(_component_q_select, {
                                      modelValue: reviewForm.value.service_type,
                                      "onUpdate:modelValue": ($event) => reviewForm.value.service_type = $event,
                                      options: serviceTypeOptions,
                                      label: "服務類型",
                                      outlined: "",
                                      dense: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                createVNode("div", { class: "row items-center q-gutter-md" }, [
                                  createVNode("div", { class: "text-subtitle2" }, "評分 *"),
                                  createVNode(_component_q_rating, {
                                    modelValue: reviewForm.value.rating,
                                    "onUpdate:modelValue": ($event) => reviewForm.value.rating = $event,
                                    max: 5,
                                    color: "orange",
                                    size: "2em"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(getRatingLabel(reviewForm.value.rating)), 1)
                                ]),
                                createVNode(_component_q_input, {
                                  modelValue: reviewForm.value.comment,
                                  "onUpdate:modelValue": ($event) => reviewForm.value.comment = $event,
                                  label: "評價內容 *",
                                  type: "textarea",
                                  outlined: "",
                                  rows: "4",
                                  placeholder: "請分享您的服務體驗...",
                                  rules: [(val) => !!val || "請填寫評價內容"]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                createVNode("div", { class: "row q-gutter-sm" }, [
                                  createVNode(_component_q_btn, {
                                    type: "submit",
                                    color: "primary",
                                    loading: isSubmitting.value,
                                    disable: !reviewForm.value.caregiver_id || !reviewForm.value.rating || !reviewForm.value.comment
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(isSubmitting.value ? "提交中..." : "提交評價"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "disable"]),
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
                                ])
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
                          createVNode("div", { class: "text-h6 q-mb-md" }, [
                            createVNode(_component_q_icon, {
                              name: "edit",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 撰寫評價 ")
                          ]),
                          createVNode(_component_q_form, {
                            onSubmit: withModifiers(submitReview, ["prevent"]),
                            class: "q-gutter-md"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "row q-gutter-md" }, [
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(_component_q_select, {
                                    modelValue: reviewForm.value.caregiver_id,
                                    "onUpdate:modelValue": ($event) => reviewForm.value.caregiver_id = $event,
                                    options: caregiverOptions.value,
                                    label: "選擇看護師 *",
                                    outlined: "",
                                    dense: "",
                                    "emit-value": "",
                                    "map-options": "",
                                    rules: [(val) => !!val || "請選擇看護師"]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(_component_q_select, {
                                    modelValue: reviewForm.value.service_type,
                                    "onUpdate:modelValue": ($event) => reviewForm.value.service_type = $event,
                                    options: serviceTypeOptions,
                                    label: "服務類型",
                                    outlined: "",
                                    dense: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              createVNode("div", { class: "row items-center q-gutter-md" }, [
                                createVNode("div", { class: "text-subtitle2" }, "評分 *"),
                                createVNode(_component_q_rating, {
                                  modelValue: reviewForm.value.rating,
                                  "onUpdate:modelValue": ($event) => reviewForm.value.rating = $event,
                                  max: 5,
                                  color: "orange",
                                  size: "2em"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(getRatingLabel(reviewForm.value.rating)), 1)
                              ]),
                              createVNode(_component_q_input, {
                                modelValue: reviewForm.value.comment,
                                "onUpdate:modelValue": ($event) => reviewForm.value.comment = $event,
                                label: "評價內容 *",
                                type: "textarea",
                                outlined: "",
                                rows: "4",
                                placeholder: "請分享您的服務體驗...",
                                rules: [(val) => !!val || "請填寫評價內容"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                              createVNode("div", { class: "row q-gutter-sm" }, [
                                createVNode(_component_q_btn, {
                                  type: "submit",
                                  color: "primary",
                                  loading: isSubmitting.value,
                                  disable: !reviewForm.value.caregiver_id || !reviewForm.value.rating || !reviewForm.value.comment
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(isSubmitting.value ? "提交中..." : "提交評價"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["loading", "disable"]),
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
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_q_card, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_card_section, { class: "text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_q_icon, {
                            name: "login",
                            size: "50px",
                            color: "grey-5"
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="text-h6 q-mt-md text-grey-7"${_scopeId3}>登入後可撰寫評價</div><div class="text-body2 text-grey-6 q-mb-md"${_scopeId3}> 請先登入您的帳戶以撰寫和提交評價 </div>`);
                          _push4(ssrRenderComponent(_component_q_btn, {
                            color: "primary",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login")
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
                        } else {
                          return [
                            createVNode(_component_q_icon, {
                              name: "login",
                              size: "50px",
                              color: "grey-5"
                            }),
                            createVNode("div", { class: "text-h6 q-mt-md text-grey-7" }, "登入後可撰寫評價"),
                            createVNode("div", { class: "text-body2 text-grey-6 q-mb-md" }, " 請先登入您的帳戶以撰寫和提交評價 "),
                            createVNode(_component_q_btn, {
                              color: "primary",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 立即登入 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_card_section, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "login",
                            size: "50px",
                            color: "grey-5"
                          }),
                          createVNode("div", { class: "text-h6 q-mt-md text-grey-7" }, "登入後可撰寫評價"),
                          createVNode("div", { class: "text-body2 text-grey-6 q-mb-md" }, " 請先登入您的帳戶以撰寫和提交評價 "),
                          createVNode(_component_q_btn, {
                            color: "primary",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 立即登入 ")
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
              }, _parent2, _scopeId));
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "row justify-center" }, [
                createVNode("div", { class: "col-12 col-lg-10" }, [
                  createVNode("div", { class: "row items-center justify-between q-mb-lg" }, [
                    createVNode("div", { class: "text-h5 text-primary" }, [
                      createVNode(_component_q_icon, {
                        name: "rate_review",
                        size: "md",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" 用戶評價 ")
                    ]),
                    createVNode("div", { class: "row q-gutter-sm" }, [
                      createVNode(_component_q_select, {
                        modelValue: selectedCaregiverId.value,
                        "onUpdate:modelValue": [($event) => selectedCaregiverId.value = $event, loadReviews],
                        options: caregiverOptions.value,
                        label: "選擇看護師",
                        outlined: "",
                        dense: "",
                        clearable: "",
                        "emit-value": "",
                        "map-options": "",
                        style: { "min-width": "200px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                      createVNode(_component_q_btn, {
                        flat: "",
                        icon: "refresh",
                        onClick: loadReviews,
                        loading: isLoading.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 更新 ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
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
                          createVNode("div", { class: "row items-center justify-center q-gutter-lg" }, [
                            createVNode("div", { class: "text-center" }, [
                              createVNode("div", { class: "text-h4 text-primary" }, toDisplayString(averageRating.value.toFixed(1)), 1),
                              createVNode(_component_q_rating, {
                                "model-value": averageRating.value,
                                readonly: "",
                                color: "orange",
                                size: "2em",
                                class: "q-mt-xs"
                              }, null, 8, ["model-value"]),
                              createVNode("div", { class: "text-caption text-grey-6 q-mt-xs" }, " 平均評分 (基於 " + toDisplayString(reviews.value.length) + " 則評價) ", 1)
                            ]),
                            createVNode(_component_q_separator, { vertical: "" }),
                            createVNode("div", { class: "col" }, [
                              createVNode("div", { class: "text-h6 q-mb-md" }, "評價分佈"),
                              (openBlock(), createBlock(Fragment, null, renderList([5, 4, 3, 2, 1], (i) => {
                                return createVNode("div", {
                                  key: i,
                                  class: "row items-center q-mb-xs"
                                }, [
                                  createVNode("div", { class: "text-caption q-mr-sm" }, toDisplayString(i) + " 星", 1),
                                  createVNode(_component_q_linear_progress, {
                                    value: getRatingPercentage(i),
                                    color: "orange",
                                    size: "md",
                                    class: "col q-mr-sm"
                                  }, null, 8, ["value"]),
                                  createVNode("div", {
                                    class: "text-caption",
                                    style: { "min-width": "30px" }
                                  }, toDisplayString(getRatingCount(i)), 1)
                                ]);
                              }), 64))
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
                    createVNode(_component_q_spinner_dots, {
                      size: "50px",
                      color: "primary"
                    }),
                    createVNode("div", { class: "text-body2 q-mt-md" }, "載入中...")
                  ])) : reviews.value.length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode(_component_q_card, {
                      flat: "",
                      bordered: "",
                      class: "q-mb-lg"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_card_section, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-h6 q-mb-md" }, "所有評價"),
                            createVNode(_component_q_list, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(paginatedReviews.value, (review) => {
                                  return openBlock(), createBlock(_component_q_item, {
                                    key: review.id,
                                    class: "q-pa-md"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, { class: "row items-center q-mb-sm" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_rating, {
                                                "model-value": review.rating,
                                                readonly: "",
                                                color: "orange",
                                                size: "1em",
                                                class: "q-mr-sm"
                                              }, null, 8, ["model-value"]),
                                              createVNode("span", { class: "text-caption text-grey-6" }, toDisplayString(formatDate(review.created_at)), 1),
                                              createVNode(_component_q_space),
                                              review.verified ? (openBlock(), createBlock(_component_q_chip, {
                                                key: 0,
                                                size: "sm",
                                                color: "positive",
                                                "text-color": "white",
                                                icon: "verified"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" 已驗證 ")
                                                ]),
                                                _: 1
                                              })) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_label, { class: "text-body1 q-mb-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(review.comment), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_q_item_label, {
                                            caption: "",
                                            class: "text-grey-6"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" 由 " + toDisplayString(review.user_name || "匯名用戶") + " 提供 ", 1),
                                              review.service_type ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(review.service_type), 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          review.reply ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "bg-grey-1 q-pa-md q-mt-sm rounded-borders"
                                          }, [
                                            createVNode("div", { class: "text-caption text-grey-7 q-mb-xs" }, [
                                              createVNode(_component_q_icon, {
                                                name: "reply",
                                                size: "xs",
                                                class: "q-mr-xs"
                                              }),
                                              createTextVNode(" 看護師回覆： ")
                                            ]),
                                            createVNode("div", { class: "text-body2" }, toDisplayString(review.reply), 1)
                                          ])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_item_section, {
                                        side: "",
                                        top: ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-right" }, [
                                            createVNode(_component_q_btn, {
                                              flat: "",
                                              dense: "",
                                              icon: "thumb_up",
                                              size: "sm",
                                              color: review.liked ? "primary" : "grey",
                                              onClick: ($event) => toggleLike(review)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(review.likes || 0), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["color", "onClick"])
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_q_separator, {
                                        spaced: "",
                                        inset: "item"
                                      })
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            }),
                            totalPages.value > 1 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center q-mt-md"
                            }, [
                              createVNode(_component_q_pagination, {
                                modelValue: currentPage.value,
                                "onUpdate:modelValue": [($event) => currentPage.value = $event, onPageChange],
                                max: totalPages.value,
                                "direction-links": "",
                                "boundary-links": "",
                                "icon-first": "skip_previous",
                                "icon-last": "skip_next",
                                "icon-prev": "fast_rewind",
                                "icon-next": "fast_forward"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "text-center q-pa-lg"
                  }, [
                    createVNode(_component_q_icon, {
                      name: "rate_review",
                      size: "80px",
                      color: "grey-5"
                    }),
                    createVNode("div", { class: "text-h6 q-mt-md text-grey-7" }, "尚無評價"),
                    createVNode("div", { class: "text-body2 text-grey-6" }, toDisplayString(selectedCaregiverId.value ? "這位看護師還沒有收到評價" : "請選擇看護師查看評價"), 1)
                  ])),
                  unref(authStore).currentUser ? (openBlock(), createBlock(_component_q_card, {
                    key: 3,
                    flat: "",
                    bordered: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h6 q-mb-md" }, [
                            createVNode(_component_q_icon, {
                              name: "edit",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" 撰寫評價 ")
                          ]),
                          createVNode(_component_q_form, {
                            onSubmit: withModifiers(submitReview, ["prevent"]),
                            class: "q-gutter-md"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "row q-gutter-md" }, [
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(_component_q_select, {
                                    modelValue: reviewForm.value.caregiver_id,
                                    "onUpdate:modelValue": ($event) => reviewForm.value.caregiver_id = $event,
                                    options: caregiverOptions.value,
                                    label: "選擇看護師 *",
                                    outlined: "",
                                    dense: "",
                                    "emit-value": "",
                                    "map-options": "",
                                    rules: [(val) => !!val || "請選擇看護師"]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                                ]),
                                createVNode("div", { class: "col-12 col-sm-6" }, [
                                  createVNode(_component_q_select, {
                                    modelValue: reviewForm.value.service_type,
                                    "onUpdate:modelValue": ($event) => reviewForm.value.service_type = $event,
                                    options: serviceTypeOptions,
                                    label: "服務類型",
                                    outlined: "",
                                    dense: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              createVNode("div", { class: "row items-center q-gutter-md" }, [
                                createVNode("div", { class: "text-subtitle2" }, "評分 *"),
                                createVNode(_component_q_rating, {
                                  modelValue: reviewForm.value.rating,
                                  "onUpdate:modelValue": ($event) => reviewForm.value.rating = $event,
                                  max: 5,
                                  color: "orange",
                                  size: "2em"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "text-caption text-grey-6" }, toDisplayString(getRatingLabel(reviewForm.value.rating)), 1)
                              ]),
                              createVNode(_component_q_input, {
                                modelValue: reviewForm.value.comment,
                                "onUpdate:modelValue": ($event) => reviewForm.value.comment = $event,
                                label: "評價內容 *",
                                type: "textarea",
                                outlined: "",
                                rows: "4",
                                placeholder: "請分享您的服務體驗...",
                                rules: [(val) => !!val || "請填寫評價內容"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                              createVNode("div", { class: "row q-gutter-sm" }, [
                                createVNode(_component_q_btn, {
                                  type: "submit",
                                  color: "primary",
                                  loading: isSubmitting.value,
                                  disable: !reviewForm.value.caregiver_id || !reviewForm.value.rating || !reviewForm.value.comment
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(isSubmitting.value ? "提交中..." : "提交評價"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["loading", "disable"]),
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
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_q_card, {
                    key: 4,
                    flat: "",
                    bordered: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_q_card_section, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "login",
                            size: "50px",
                            color: "grey-5"
                          }),
                          createVNode("div", { class: "text-h6 q-mt-md text-grey-7" }, "登入後可撰寫評價"),
                          createVNode("div", { class: "text-body2 text-grey-6 q-mb-md" }, " 請先登入您的帳戶以撰寫和提交評價 "),
                          createVNode(_component_q_btn, {
                            color: "primary",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/auth/login")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 立即登入 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/support/reviews.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=reviews-BVXCjHu1.mjs.map
