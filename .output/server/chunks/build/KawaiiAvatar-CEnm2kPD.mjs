import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "KawaiiAvatar",
  __ssrInlineRender: true,
  props: {
    avatar: {},
    size: { default: "md" }
  },
  setup(__props) {
    const props = __props;
    const sizeClasses = {
      sm: { container: "h-44 w-28", body: "scale-75 origin-top", hair: "scale-75 origin-top" },
      md: { container: "h-52 w-36", body: "scale-90 origin-top", hair: "scale-90 origin-top" },
      lg: { container: "h-56 w-44", body: "scale-100 origin-top", hair: "scale-100 origin-top" }
    };
    const hairPalette = {
      amber: "bg-amber-700",
      orange: "bg-orange-700",
      stone: "bg-stone-800",
      rose: "bg-rose-700",
      teal: "bg-teal-600"
    };
    const eyePalette = {
      midnight: "bg-slate-900",
      hazel: "bg-amber-700",
      emerald: "bg-emerald-500",
      sky: "bg-sky-500",
      violet: "bg-violet-500"
    };
    const outfitPalette = {
      "tee-pants": "h-16 w-20 rounded-t-3xl rounded-b-2xl bg-sky-400",
      "long-dress": "h-24 w-20 rounded-t-3xl rounded-b-[2.75rem] bg-pink-400",
      "tee-skirt": "h-[4.5rem] w-20 rounded-t-3xl rounded-b-[2rem] bg-fuchsia-400",
      "tee-jeans": "h-16 w-20 rounded-t-3xl rounded-b-2xl bg-indigo-400",
      "hoodie-shorts": "h-16 w-20 rounded-[2rem] bg-emerald-400"
    };
    const shoePalette = {
      sneakers: "bg-white",
      boots: "bg-amber-800",
      sandals: "bg-orange-300",
      "mary-janes": "bg-rose-500",
      rollers: "bg-cyan-400"
    };
    const cheekColorPalette = {
      rose: "bg-rose-300",
      peach: "bg-orange-200",
      pink: "bg-pink-300",
      coral: "bg-red-300",
      berry: "bg-fuchsia-300"
    };
    const cheekShapePalette = {
      none: "",
      round: "rounded-full",
      oval: "rounded-[60%]",
      star: "rounded-sm rotate-45"
    };
    const containerClass = computed(() => sizeClasses[props.size].container);
    const bodyScaleClass = computed(() => sizeClasses[props.size].body);
    const hairScaleClass = computed(() => sizeClasses[props.size].hair);
    const showTwinTails = computed(() => props.avatar.hair === "twin-tails");
    const showLong = computed(() => props.avatar.hair === "long");
    const showBangs = computed(() => props.avatar.hair === "bangs");
    const twinTailClass = computed(() => {
      const map = {
        sm: "h-[5.33rem] w-[3.33rem]",
        md: "h-[4.44rem] w-[2.78rem]",
        lg: "h-16 w-10"
      };
      return map[props.size];
    });
    const hairColorClass = computed(() => hairPalette[props.avatar.hairColor]);
    const hairBackClass = computed(() => {
      if (props.avatar.hair === "bald") return "h-0 w-0";
      if (props.avatar.hair === "long") return `h-28 w-28 ${hairColorClass.value}`;
      return `h-24 w-28 ${hairColorClass.value}`;
    });
    const hairFrontClass = computed(() => hairColorClass.value);
    const hairAccessoryClass = computed(() => `${hairColorClass.value} border-4 border-slate-800`);
    const faceClass = computed(() => {
      const base = "h-28 w-28 overflow-hidden";
      const variants = {
        "soft-round": "rounded-[44%]",
        round: "rounded-full",
        oval: "rounded-[45%] rounded-b-[42%]",
        square: "rounded-[28%]",
        heart: "rounded-[42%] rounded-b-[35%]"
      };
      return `${base} ${variants[props.avatar.faceShape]}`;
    });
    const eyeShapeClass = computed(() => {
      if (props.avatar.eyeStyle === "happy" || props.avatar.eyeStyle === "sleepy") {
        return "h-1 w-5 rounded-full bg-transparent";
      }
      if (props.avatar.eyeStyle === "wink") {
        return "h-4 w-5 rounded-full";
      }
      return "h-4 w-4 rounded-full";
    });
    const eyeBaseClass = computed(() => `${eyeShapeClass.value} ${eyePalette[props.avatar.eyeColor]}`);
    const rightEyeClass = computed(() => {
      if (props.avatar.eyeStyle === "wink") return "h-1 w-5 rounded-full bg-slate-900";
      return `${eyeShapeClass.value} ${eyePalette[props.avatar.eyeColor]}`;
    });
    const outfitClass = computed(() => outfitPalette[props.avatar.outfit]);
    const shoeClass = computed(() => shoePalette[props.avatar.shoes]);
    const cheekColorClass = computed(() => {
      var _a;
      return cheekColorPalette[(_a = props.avatar.cheekColor) != null ? _a : "rose"];
    });
    const cheekShapeClass = computed(() => {
      var _a;
      return cheekShapePalette[(_a = props.avatar.cheeks) != null ? _a : "round"];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative select-none overflow-hidden", unref(containerClass)]
      }, _attrs))}><div class="${ssrRenderClass([unref(hairScaleClass), "absolute inset-0"])}"><div class="${ssrRenderClass([unref(hairBackClass), "absolute left-1/2 top-0 -translate-x-1/2 rounded-full"])}"></div>`);
      if (unref(showTwinTails)) {
        _push(`<div class="${ssrRenderClass([[unref(hairAccessoryClass), unref(twinTailClass), "left-1"], "absolute top-6 rounded-full"])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showTwinTails)) {
        _push(`<div class="${ssrRenderClass([[unref(hairAccessoryClass), unref(twinTailClass), "right-1"], "absolute top-6 rounded-full"])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showLong)) {
        _push(`<div class="${ssrRenderClass([unref(hairAccessoryClass), "absolute left-0 top-8 h-24 w-8 rounded-b-full"])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showLong)) {
        _push(`<div class="${ssrRenderClass([unref(hairAccessoryClass), "absolute right-0 top-8 h-24 w-8 rounded-b-full"])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([unref(bodyScaleClass), "absolute left-1/2 top-1 flex -translate-x-1/2 flex-col items-center"])}"><div class="${ssrRenderClass([unref(faceClass), "relative border-4 border-slate-800 bg-amber-50"])}">`);
      if (__props.avatar.hair !== "bald") {
        _push(`<div class="${ssrRenderClass([unref(hairFrontClass), "absolute left-1/2 top-0 z-10 h-8 w-24 -translate-x-1/2 rounded-t-[999px]"])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showBangs)) {
        _push(`<div class="${ssrRenderClass([unref(hairFrontClass), "absolute left-1/2 top-5 z-10 h-4 w-20 -translate-x-1/2 rounded-b-2xl"])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute left-1/2 top-8 flex -translate-x-1/2 gap-7"><div class="relative flex h-5 w-5 items-center justify-center"><span class="${ssrRenderClass(unref(eyeBaseClass))}"></span>`);
      if (__props.avatar.eyeStyle === "starry") {
        _push(`<span class="absolute text-[10px] text-white">\u2605</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.avatar.eyeStyle === "happy") {
        _push(`<span class="absolute -top-1 text-base font-black text-slate-800">\u25E0</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.avatar.eyeStyle === "sleepy") {
        _push(`<span class="absolute -top-0.5 text-sm font-black text-slate-800">\uFE41</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative flex h-5 w-5 items-center justify-center"><span class="${ssrRenderClass(unref(rightEyeClass))}"></span>`);
      if (__props.avatar.eyeStyle === "starry") {
        _push(`<span class="absolute text-[10px] text-white">\u2605</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.avatar.eyeStyle === "happy") {
        _push(`<span class="absolute -top-1 text-base font-black text-slate-800">\u25E0</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.avatar.eyeStyle === "wink") {
        _push(`<span class="absolute -top-0.5 text-sm font-black text-slate-800">\uFE42</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.avatar.eyeStyle === "sleepy") {
        _push(`<span class="absolute -top-0.5 text-sm font-black text-slate-800">\uFE41</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="absolute left-1/2 top-16 h-5 w-8 -translate-x-1/2 rounded-b-full border-b-4 border-slate-800"></div>`);
      if (__props.avatar.cheeks !== "none") {
        _push(`<div class="absolute left-1/2 top-[3.25rem] flex -translate-x-1/2 justify-between" style="${ssrRenderStyle({ width: "5.5rem" })}"><span class="${ssrRenderClass([[unref(cheekColorClass), unref(cheekShapeClass)], "h-3 w-4 opacity-60"])}"></span><span class="${ssrRenderClass([[unref(cheekColorClass), unref(cheekShapeClass)], "h-3 w-4 opacity-60"])}"></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative flex flex-col items-center"><div class="${ssrRenderClass([unref(outfitClass), "relative border-4 border-slate-800"])}"><div class="absolute -left-4 top-3 h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div><div class="absolute -right-4 top-3 h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div>`);
      if (__props.avatar.outfit === "tee-pants" || __props.avatar.outfit === "tee-jeans") {
        _push(`<div class="absolute left-1/2 bottom-0 h-8 w-12 -translate-x-1/2 rounded-b-xl border-t-4 border-slate-800 bg-slate-100 opacity-70"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.avatar.outfit === "long-dress") {
        _push(`<div class="absolute left-1/2 bottom-0 h-14 w-20 -translate-x-1/2 rounded-b-[2rem] bg-pink-200 opacity-70"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.avatar.outfit === "hoodie-shorts") {
        _push(`<div class="absolute left-1/2 top-1 h-4 w-10 -translate-x-1/2 rounded-full bg-white/40"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative -mt-1 flex gap-5"><div class="h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div><div class="h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div><div class="${ssrRenderClass([unref(shoeClass), "absolute bottom-0 left-[-4px] h-4 w-8 rounded-full border-4 border-slate-800"])}"></div><div class="${ssrRenderClass([unref(shoeClass), "absolute bottom-0 right-[-4px] h-4 w-8 rounded-full border-4 border-slate-800"])}"></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/KawaiiAvatar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=KawaiiAvatar-CEnm2kPD.mjs.map
