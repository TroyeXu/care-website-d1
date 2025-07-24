import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CaregiverCard",
  __ssrInlineRender: true,
  props: {
    caregiver: {},
    compact: { type: Boolean }
  },
  emits: ["select", "book"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useRouter();
    const skillsArray = computed(() => {
      return props.caregiver.skills.split("、").filter((skill) => skill.trim());
    });
    const availabilityClass = computed(() => {
      const availability = props.caregiver.available.toLowerCase();
      if (availability.includes("全天") || availability.includes("24")) {
        return "available-full";
      } else if (availability.includes("週")) {
        return "available-partial";
      } else {
        return "available-limited";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "caregiver-card" }, _attrs))} data-v-1dd307ba><div class="card-header" data-v-1dd307ba><div class="avatar-section" data-v-1dd307ba><img${ssrRenderAttr("src", _ctx.caregiver.photo)}${ssrRenderAttr("alt", _ctx.caregiver.name)} class="avatar" data-v-1dd307ba><div class="${ssrRenderClass([availabilityClass.value, "availability-badge"])}" data-v-1dd307ba>${ssrInterpolate(_ctx.caregiver.available)}</div></div><div class="basic-info" data-v-1dd307ba><h3 class="name" data-v-1dd307ba>${ssrInterpolate(_ctx.caregiver.name)}</h3><div class="rating" data-v-1dd307ba><div class="stars" data-v-1dd307ba><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<span class="${ssrRenderClass([{ filled: i <= Math.floor(_ctx.caregiver.rating) }, "star"])}" data-v-1dd307ba> ★ </span>`);
      });
      _push(`<!--]--></div><span class="rating-number" data-v-1dd307ba>${ssrInterpolate(_ctx.caregiver.rating)}</span></div><p class="location" data-v-1dd307ba>📍 ${ssrInterpolate(_ctx.caregiver.location)}</p></div><div class="pricing" data-v-1dd307ba><div class="price-item" data-v-1dd307ba><span class="label" data-v-1dd307ba>時薪</span><span class="price" data-v-1dd307ba>NT$ ${ssrInterpolate(_ctx.caregiver.hourly_rate)}</span></div><div class="price-item" data-v-1dd307ba><span class="label" data-v-1dd307ba>班次</span><span class="price" data-v-1dd307ba>NT$ ${ssrInterpolate(_ctx.caregiver.shift_rate)}</span></div></div></div><div class="card-body" data-v-1dd307ba><div class="experience" data-v-1dd307ba><h4 data-v-1dd307ba>經驗背景</h4><p data-v-1dd307ba>${ssrInterpolate(_ctx.caregiver.experience)}</p></div><div class="skills" data-v-1dd307ba><h4 data-v-1dd307ba>專業技能</h4><div class="skills-tags" data-v-1dd307ba><!--[-->`);
      ssrRenderList(skillsArray.value, (skill) => {
        _push(`<span class="skill-tag" data-v-1dd307ba>${ssrInterpolate(skill)}</span>`);
      });
      _push(`<!--]--></div></div><div class="licenses" data-v-1dd307ba><h4 data-v-1dd307ba>專業證照</h4><div class="licenses-list" data-v-1dd307ba><!--[-->`);
      ssrRenderList(_ctx.caregiver.licenses, (license) => {
        _push(`<span class="license-badge" data-v-1dd307ba> 🏆 ${ssrInterpolate(license)}</span>`);
      });
      _push(`<!--]--></div></div>`);
      if (_ctx.caregiver.description) {
        _push(`<div class="description" data-v-1dd307ba><h4 data-v-1dd307ba>詳細介紹</h4><p data-v-1dd307ba>${ssrInterpolate(_ctx.caregiver.description)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="card-footer" data-v-1dd307ba><div class="actions" data-v-1dd307ba><button type="button" class="btn-secondary" data-v-1dd307ba> 查看詳情 </button><button type="button" class="btn-primary" data-v-1dd307ba> 立即預約 </button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CaregiverCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CaregiverCard = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-1dd307ba"]]), { __name: "CaregiverCard" });

export { CaregiverCard as C };
//# sourceMappingURL=CaregiverCard-QaBVwOTI.mjs.map
