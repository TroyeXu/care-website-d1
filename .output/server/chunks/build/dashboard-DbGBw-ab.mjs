import { C as CaregiverCard } from './CaregiverCard-QaBVwOTI.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc, u as usePageSeo, p as useAuthStore, P as navigateTo } from './server.mjs';
import { u as useApiService } from './useApiService-Bqe0bsFu.mjs';
import 'vue-router';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("個人儀表板 - 護理服務平台", "快速查看推薦看護及即將到來的排程");
    const authStore = useAuthStore();
    useApiService();
    ref(null);
    const recommendedCaregivers = ref([]);
    const upcomingBookings = ref([]);
    const recentBookings = ref([]);
    const caregivers = ref([]);
    const userRoleText = computed(() => {
      switch (authStore.currentUser?.role) {
        case "patient":
          return "照護需求者";
        case "caregiver":
          return "看護人員";
        case "admin":
          return "管理員";
        default:
          return "用戶";
      }
    });
    const userBookings = computed(() => {
      return [...upcomingBookings.value, ...recentBookings.value];
    });
    const completedBookings = computed(() => {
      return userBookings.value.filter((booking) => booking.status === "completed");
    });
    const pendingBookings = computed(() => {
      return userBookings.value.filter((booking) => booking.status === "pending");
    });
    const getCaregiverName = (caregiverId) => {
      const caregiver = caregivers.value.find((c) => c.id === caregiverId);
      return caregiver?.name || "未知看護師";
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const serviceTypeText = (type) => {
      return type === "hourly" ? "按時計費" : "包班制";
    };
    const statusText = (status) => {
      const statusMap = {
        pending: "待確認",
        confirmed: "已確認",
        in_progress: "進行中",
        completed: "已完成",
        cancelled: "已取消"
      };
      return statusMap[status] || status;
    };
    const handleBookCaregiver = (caregiver) => {
      navigateTo(`/caregivers/${caregiver.id}?action=book`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CaregiverCard = CaregiverCard;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard" }, _attrs))} data-v-bd446c8a>`);
      if (unref(authStore).isAuthenticated) {
        _push(`<div class="dashboard-content" data-v-bd446c8a><div class="welcome-section" data-v-bd446c8a><div class="user-info" data-v-bd446c8a><img${ssrRenderAttr("src", unref(authStore).currentUser?.avatar || "/images/default-avatar.jpg")}${ssrRenderAttr("alt", unref(authStore).currentUser?.name)} class="user-avatar" data-v-bd446c8a><div class="user-details" data-v-bd446c8a><h1 data-v-bd446c8a>歡迎回來，${ssrInterpolate(unref(authStore).currentUser?.name)}</h1><p class="user-role" data-v-bd446c8a>${ssrInterpolate(userRoleText.value)} | ${ssrInterpolate(unref(authStore).currentUser?.email)}</p><div class="user-stats" data-v-bd446c8a><div class="stat-item" data-v-bd446c8a><span class="stat-number" data-v-bd446c8a>${ssrInterpolate(userBookings.value.length)}</span><span class="stat-label" data-v-bd446c8a>總預約數</span></div><div class="stat-item" data-v-bd446c8a><span class="stat-number" data-v-bd446c8a>${ssrInterpolate(completedBookings.value.length)}</span><span class="stat-label" data-v-bd446c8a>已完成</span></div><div class="stat-item" data-v-bd446c8a><span class="stat-number" data-v-bd446c8a>${ssrInterpolate(pendingBookings.value.length)}</span><span class="stat-label" data-v-bd446c8a>待確認</span></div></div></div></div></div><div class="quick-actions" data-v-bd446c8a><h2 data-v-bd446c8a>快速操作</h2><div class="action-grid" data-v-bd446c8a><button class="action-card" data-v-bd446c8a><div class="action-icon" data-v-bd446c8a>🔍</div><div class="action-text" data-v-bd446c8a><h3 data-v-bd446c8a>搜尋看護</h3><p data-v-bd446c8a>找到最適合的看護師</p></div></button><button class="action-card" data-v-bd446c8a><div class="action-icon" data-v-bd446c8a>💰</div><div class="action-text" data-v-bd446c8a><h3 data-v-bd446c8a>費用計算</h3><p data-v-bd446c8a>估算照護服務費用</p></div></button><button class="action-card" data-v-bd446c8a><div class="action-icon" data-v-bd446c8a>🎯</div><div class="action-text" data-v-bd446c8a><h3 data-v-bd446c8a>智能媒合</h3><p data-v-bd446c8a>AI 推薦最佳看護</p></div></button><button class="action-card" data-v-bd446c8a><div class="action-icon" data-v-bd446c8a>📅</div><div class="action-text" data-v-bd446c8a><h3 data-v-bd446c8a>排程管理</h3><p data-v-bd446c8a>查看預約時程</p></div></button></div></div><div class="recommendations-section" data-v-bd446c8a><h2 data-v-bd446c8a>為您推薦</h2>`);
        if (recommendedCaregivers.value.length > 0) {
          _push(`<div class="caregivers-grid" data-v-bd446c8a><!--[-->`);
          ssrRenderList(recommendedCaregivers.value, (caregiver) => {
            _push(ssrRenderComponent(_component_CaregiverCard, {
              key: caregiver.id,
              caregiver,
              onBook: handleBookCaregiver
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="empty-state" data-v-bd446c8a><p data-v-bd446c8a>暫無推薦看護師，請先完善您的個人資料和偏好設定</p><button class="btn-primary" data-v-bd446c8a> 完善資料 </button></div>`);
        }
        _push(`</div><div class="upcoming-section" data-v-bd446c8a><h2 data-v-bd446c8a>即將到來的預約</h2>`);
        if (upcomingBookings.value.length > 0) {
          _push(`<div class="bookings-list" data-v-bd446c8a><!--[-->`);
          ssrRenderList(upcomingBookings.value, (booking) => {
            _push(`<div class="booking-card" data-v-bd446c8a><div class="booking-info" data-v-bd446c8a><div class="booking-caregiver" data-v-bd446c8a><strong data-v-bd446c8a>${ssrInterpolate(getCaregiverName(booking.caregiver_id))}</strong></div><div class="booking-details" data-v-bd446c8a><span class="booking-date" data-v-bd446c8a>${ssrInterpolate(formatDate(booking.start_date))}</span><span class="booking-time" data-v-bd446c8a>${ssrInterpolate(booking.start_time)}</span><span class="booking-type" data-v-bd446c8a>${ssrInterpolate(serviceTypeText(booking.service_type))}</span></div><div class="${ssrRenderClass([`status-${booking.status}`, "booking-status"])}" data-v-bd446c8a>${ssrInterpolate(statusText(booking.status))}</div></div><div class="booking-actions" data-v-bd446c8a><button class="btn-secondary btn-sm" data-v-bd446c8a> 查看詳情 </button>`);
            if (booking.status === "pending") {
              _push(`<button class="btn-danger btn-sm" data-v-bd446c8a> 取消預約 </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="empty-state" data-v-bd446c8a><p data-v-bd446c8a>目前沒有即將到來的預約</p><button class="btn-primary" data-v-bd446c8a> 立即預約 </button></div>`);
        }
        _push(`</div><div class="history-section" data-v-bd446c8a><h2 data-v-bd446c8a>服務歷史</h2>`);
        if (recentBookings.value.length > 0) {
          _push(`<div class="history-list" data-v-bd446c8a><!--[-->`);
          ssrRenderList(recentBookings.value.slice(0, 5), (booking) => {
            _push(`<div class="history-item" data-v-bd446c8a><div class="history-info" data-v-bd446c8a><span class="history-caregiver" data-v-bd446c8a>${ssrInterpolate(getCaregiverName(booking.caregiver_id))}</span><span class="history-date" data-v-bd446c8a>${ssrInterpolate(formatDate(booking.start_date))}</span><span class="${ssrRenderClass([`status-${booking.status}`, "history-status"])}" data-v-bd446c8a>${ssrInterpolate(statusText(booking.status))}</span></div><div class="history-cost" data-v-bd446c8a> NT$ ${ssrInterpolate(booking.total_cost.toLocaleString())}</div></div>`);
          });
          _push(`<!--]--><button class="btn-link" data-v-bd446c8a> 查看完整歷史記錄 </button></div>`);
        } else {
          _push(`<div class="empty-state" data-v-bd446c8a><p data-v-bd446c8a>尚無服務歷史記錄</p></div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<div class="login-prompt" data-v-bd446c8a><div class="login-card" data-v-bd446c8a><h2 data-v-bd446c8a>請先登入</h2><p data-v-bd446c8a>登入後即可查看個人儀表板、預約記錄和推薦服務</p><div class="login-actions" data-v-bd446c8a><button class="btn-primary" data-v-bd446c8a> 立即登入 </button><button class="btn-secondary" data-v-bd446c8a> 註冊帳號 </button></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bd446c8a"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-DbGBw-ab.mjs.map
