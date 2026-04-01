import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "XpBar",
  __ssrInlineRender: true,
  props: {
    level: {},
    xpInLevel: {},
    xpNeeded: {},
    progress: {}
  },
  setup(__props) {
    const props = __props;
    const displayProgress = ref(0);
    watch(
      () => props.progress,
      (val) => {
        displayProgress.value = val;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="flex justify-between text-xs font-bold text-slate-500 mb-1"><span>Nivel ${ssrInterpolate(__props.level)}</span><span>${ssrInterpolate(__props.xpInLevel)} / ${ssrInterpolate(__props.xpNeeded)} XP</span></div><div class="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200"><div class="h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transition-all duration-700 ease-out" style="${ssrRenderStyle({ width: `${unref(displayProgress) * 100}%` })}"></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/XpBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=XpBar-Bj2-DC-6.mjs.map
