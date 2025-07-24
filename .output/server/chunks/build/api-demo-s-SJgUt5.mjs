import { _ as __nuxt_component_4 } from './ApiModeToggle-CVxuyy-7.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from 'vue/server-renderer';
import { u as useApiService } from './useApiService-Bqe0bsFu.mjs';
import { _ as _export_sfc, u as usePageSeo } from './server.mjs';
import './useApiConfig-D0iRs2xG.mjs';
import '../_/QToggle.mjs';
import '../_/use-checkbox.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-demo",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("Mock API 演示 - DogFriend", "Mock API 功能測試和演示頁面");
    const apiService = useApiService({ useMockApi: true });
    const loginForm = ref({
      email: "zhiming.lin@email.com",
      password: "password123"
    });
    const bookingForm = ref({
      caregiver_id: "",
      service_type: "hourly",
      start_date: "",
      end_date: "",
      start_time: "09:00",
      end_time: "17:00",
      special_requests: ""
    });
    const paymentForm = ref({
      bookingId: "booking-001",
      amount: 2240,
      method: "credit_card",
      cardNumber: "1234567890123456",
      cvv: "123"
    });
    const loginResult = ref(null);
    const caregiverResults = ref([]);
    const bookingResult = ref(null);
    const paymentResult = ref(null);
    const dashboardStats = ref(null);
    const performanceResults = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ApiModeToggle = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "api-demo" }, _attrs))} data-v-d7b556c1><div class="container" data-v-d7b556c1><h1 data-v-d7b556c1>Mock API 演示頁面</h1>`);
      _push(ssrRenderComponent(_component_ApiModeToggle, null, null, _parent));
      if (unref(apiService).isLoading.value) {
        _push(`<div class="loading" data-v-d7b556c1><div class="spinner" data-v-d7b556c1></div><p data-v-d7b556c1>載入中...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(apiService).error.value) {
        _push(`<div class="error" data-v-d7b556c1><h3 data-v-d7b556c1>發生錯誤</h3><p data-v-d7b556c1>${ssrInterpolate(unref(apiService).error.value.message)}</p><button data-v-d7b556c1>清除錯誤</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="demo-section" data-v-d7b556c1><h2 data-v-d7b556c1>認證測試</h2><form class="test-form" data-v-d7b556c1><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>Email:</label><input${ssrRenderAttr("value", loginForm.value.email)} type="email" placeholder="zhiming.lin@email.com" data-v-d7b556c1></div><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>密碼:</label><input${ssrRenderAttr("value", loginForm.value.password)} type="password" placeholder="password123" data-v-d7b556c1></div><button type="submit"${ssrIncludeBooleanAttr(unref(apiService).isLoading.value) ? " disabled" : ""} data-v-d7b556c1> 測試登入 </button></form>`);
      if (loginResult.value) {
        _push(`<div class="result" data-v-d7b556c1><h3 data-v-d7b556c1>登入結果：</h3><pre data-v-d7b556c1>${ssrInterpolate(JSON.stringify(loginResult.value, null, 2))}</pre></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="demo-section" data-v-d7b556c1><h2 data-v-d7b556c1>看護師資料測試</h2><div class="test-actions" data-v-d7b556c1><button${ssrIncludeBooleanAttr(unref(apiService).isLoading.value) ? " disabled" : ""} data-v-d7b556c1> 載入看護師列表 </button><button${ssrIncludeBooleanAttr(unref(apiService).isLoading.value) ? " disabled" : ""} data-v-d7b556c1> 搜尋看護師 </button><button${ssrIncludeBooleanAttr(unref(apiService).isLoading.value) ? " disabled" : ""} data-v-d7b556c1> 篩選看護師 </button></div>`);
      if (caregiverResults.value) {
        _push(`<div class="result" data-v-d7b556c1><h3 data-v-d7b556c1>看護師資料：</h3><div class="caregiver-grid" data-v-d7b556c1><!--[-->`);
        ssrRenderList(caregiverResults.value, (caregiver) => {
          _push(`<div class="caregiver-card" data-v-d7b556c1><h4 data-v-d7b556c1>${ssrInterpolate(caregiver.name)}</h4><p data-v-d7b556c1>經驗：${ssrInterpolate(caregiver.experience)}</p><p data-v-d7b556c1>評分：${ssrInterpolate(caregiver.rating)}/5.0</p><p data-v-d7b556c1>時薪：NT$ ${ssrInterpolate(caregiver.hourly_rate)}</p><p data-v-d7b556c1>地點：${ssrInterpolate(caregiver.location)}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="demo-section" data-v-d7b556c1><h2 data-v-d7b556c1>預約測試</h2><form class="test-form" data-v-d7b556c1><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>看護師ID:</label><select data-v-d7b556c1><option value="" data-v-d7b556c1${ssrIncludeBooleanAttr(Array.isArray(bookingForm.value.caregiver_id) ? ssrLooseContain(bookingForm.value.caregiver_id, "") : ssrLooseEqual(bookingForm.value.caregiver_id, "")) ? " selected" : ""}>選擇看護師</option><!--[-->`);
      ssrRenderList(caregiverResults.value, (caregiver) => {
        _push(`<option${ssrRenderAttr("value", caregiver.id)} data-v-d7b556c1${ssrIncludeBooleanAttr(Array.isArray(bookingForm.value.caregiver_id) ? ssrLooseContain(bookingForm.value.caregiver_id, caregiver.id) : ssrLooseEqual(bookingForm.value.caregiver_id, caregiver.id)) ? " selected" : ""}>${ssrInterpolate(caregiver.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>服務類型:</label><select data-v-d7b556c1><option value="hourly" data-v-d7b556c1${ssrIncludeBooleanAttr(Array.isArray(bookingForm.value.service_type) ? ssrLooseContain(bookingForm.value.service_type, "hourly") : ssrLooseEqual(bookingForm.value.service_type, "hourly")) ? " selected" : ""}>按時計費</option><option value="shift" data-v-d7b556c1${ssrIncludeBooleanAttr(Array.isArray(bookingForm.value.service_type) ? ssrLooseContain(bookingForm.value.service_type, "shift") : ssrLooseEqual(bookingForm.value.service_type, "shift")) ? " selected" : ""}>包班制</option></select></div><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>開始日期:</label><input${ssrRenderAttr("value", bookingForm.value.start_date)} type="date" data-v-d7b556c1></div><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>開始時間:</label><input${ssrRenderAttr("value", bookingForm.value.start_time)} type="time" data-v-d7b556c1></div><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>結束時間:</label><input${ssrRenderAttr("value", bookingForm.value.end_time)} type="time" data-v-d7b556c1></div><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>特殊需求:</label><textarea placeholder="請描述特殊需求..." data-v-d7b556c1>${ssrInterpolate(bookingForm.value.special_requests)}</textarea></div><button type="submit"${ssrIncludeBooleanAttr(unref(apiService).isLoading.value) ? " disabled" : ""} data-v-d7b556c1> 建立預約 </button></form>`);
      if (bookingResult.value) {
        _push(`<div class="result" data-v-d7b556c1><h3 data-v-d7b556c1>預約結果：</h3><pre data-v-d7b556c1>${ssrInterpolate(JSON.stringify(bookingResult.value, null, 2))}</pre></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="demo-section" data-v-d7b556c1><h2 data-v-d7b556c1>支付測試</h2><form class="test-form" data-v-d7b556c1><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>預約ID:</label><input${ssrRenderAttr("value", paymentForm.value.bookingId)} placeholder="booking-001" data-v-d7b556c1></div><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>金額:</label><input${ssrRenderAttr("value", paymentForm.value.amount)} type="number" placeholder="2240" data-v-d7b556c1></div><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>支付方式:</label><select data-v-d7b556c1><option value="credit_card" data-v-d7b556c1${ssrIncludeBooleanAttr(Array.isArray(paymentForm.value.method) ? ssrLooseContain(paymentForm.value.method, "credit_card") : ssrLooseEqual(paymentForm.value.method, "credit_card")) ? " selected" : ""}>信用卡</option><option value="bank_transfer" data-v-d7b556c1${ssrIncludeBooleanAttr(Array.isArray(paymentForm.value.method) ? ssrLooseContain(paymentForm.value.method, "bank_transfer") : ssrLooseEqual(paymentForm.value.method, "bank_transfer")) ? " selected" : ""}>銀行轉帳</option><option value="cash" data-v-d7b556c1${ssrIncludeBooleanAttr(Array.isArray(paymentForm.value.method) ? ssrLooseContain(paymentForm.value.method, "cash") : ssrLooseEqual(paymentForm.value.method, "cash")) ? " selected" : ""}>現金</option></select></div>`);
      if (paymentForm.value.method === "credit_card") {
        _push(`<div class="card-details" data-v-d7b556c1><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>卡號:</label><input${ssrRenderAttr("value", paymentForm.value.cardNumber)} placeholder="1234567890123456" data-v-d7b556c1></div><div class="form-group" data-v-d7b556c1><label data-v-d7b556c1>CVV:</label><input${ssrRenderAttr("value", paymentForm.value.cvv)} placeholder="123" data-v-d7b556c1></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(apiService).isLoading.value) ? " disabled" : ""} data-v-d7b556c1> 處理支付 </button></form>`);
      if (paymentResult.value) {
        _push(`<div class="result" data-v-d7b556c1><h3 data-v-d7b556c1>支付結果：</h3><pre data-v-d7b556c1>${ssrInterpolate(JSON.stringify(paymentResult.value, null, 2))}</pre></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="demo-section" data-v-d7b556c1><h2 data-v-d7b556c1>儀表板統計測試</h2><button${ssrIncludeBooleanAttr(unref(apiService).isLoading.value) ? " disabled" : ""} data-v-d7b556c1> 載入儀表板統計 </button>`);
      if (dashboardStats.value) {
        _push(`<div class="result" data-v-d7b556c1><h3 data-v-d7b556c1>儀表板統計：</h3><div class="stats-grid" data-v-d7b556c1><div class="stat-card" data-v-d7b556c1><h4 data-v-d7b556c1>總預約數</h4><p class="stat-number" data-v-d7b556c1>${ssrInterpolate(dashboardStats.value.totalBookings)}</p></div><div class="stat-card" data-v-d7b556c1><h4 data-v-d7b556c1>已完成預約</h4><p class="stat-number" data-v-d7b556c1>${ssrInterpolate(dashboardStats.value.completedBookings)}</p></div><div class="stat-card" data-v-d7b556c1><h4 data-v-d7b556c1>待確認預約</h4><p class="stat-number" data-v-d7b556c1>${ssrInterpolate(dashboardStats.value.pendingBookings)}</p></div><div class="stat-card" data-v-d7b556c1><h4 data-v-d7b556c1>總花費</h4><p class="stat-number" data-v-d7b556c1>NT$ ${ssrInterpolate(dashboardStats.value.totalSpent.toLocaleString())}</p></div></div>`);
        if (dashboardStats.value.favoriteCaregiver) {
          _push(`<div class="favorite-caregiver" data-v-d7b556c1><h4 data-v-d7b556c1>最常預約的看護師：</h4><p data-v-d7b556c1>${ssrInterpolate(dashboardStats.value.favoriteCaregiver.name)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="demo-section" data-v-d7b556c1><h2 data-v-d7b556c1>API 響應時間測試</h2><button${ssrIncludeBooleanAttr(unref(apiService).isLoading.value) ? " disabled" : ""} data-v-d7b556c1> 測試 API 響應時間 </button>`);
      if (performanceResults.value.length > 0) {
        _push(`<div class="result" data-v-d7b556c1><h3 data-v-d7b556c1>響應時間結果：</h3><table class="performance-table" data-v-d7b556c1><thead data-v-d7b556c1><tr data-v-d7b556c1><th data-v-d7b556c1>API 名稱</th><th data-v-d7b556c1>響應時間 (ms)</th><th data-v-d7b556c1>狀態</th></tr></thead><tbody data-v-d7b556c1><!--[-->`);
        ssrRenderList(performanceResults.value, (result) => {
          _push(`<tr data-v-d7b556c1><td data-v-d7b556c1>${ssrInterpolate(result.name)}</td><td data-v-d7b556c1>${ssrInterpolate(result.duration)}</td><td class="${ssrRenderClass(result.success ? "success" : "error")}" data-v-d7b556c1>${ssrInterpolate(result.success ? "成功" : "失敗")}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/api-demo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiDemo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7b556c1"]]);

export { apiDemo as default };
//# sourceMappingURL=api-demo-s-SJgUt5.mjs.map
