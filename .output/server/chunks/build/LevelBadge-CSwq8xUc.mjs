import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LevelBadge",
  __ssrInlineRender: true,
  props: {
    level: {}
  },
  setup(__props) {
    const props = __props;
    const levelColor = computed(() => {
      if (props.level <= 3) return "bg-sky-400";
      if (props.level <= 6) return "bg-violet-500";
      if (props.level <= 9) return "bg-amber-500";
      return "bg-rose-500";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-white select-none", unref(levelColor)]
      }, _attrs))}>${ssrInterpolate(__props.level)}</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LevelBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=LevelBadge-CSwq8xUc.mjs.map
