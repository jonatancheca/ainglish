import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AvatarOptionGroup",
  __ssrInlineRender: true,
  props: {
    label: {},
    options: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><label class="block text-sm font-black text-slate-700">${ssrInterpolate(__props.label)}</label><div class="grid grid-cols-2 gap-2 sm:grid-cols-3"><!--[-->`);
      ssrRenderList(__props.options, (option) => {
        _push(`<button type="button" class="${ssrRenderClass([
          "relative rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition-all border-2",
          __props.modelValue === option.value ? "border-sky-400 bg-sky-50 text-sky-600 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
        ])}">${ssrInterpolate(option.label)} `);
        if (__props.modelValue === option.value) {
          _push(`<span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sky-400 text-white text-xs"> \u2713 </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AvatarOptionGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=AvatarOptionGroup-BKfKDcj6.mjs.map
