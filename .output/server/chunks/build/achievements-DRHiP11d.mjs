import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useAchievementsStore, A as ACHIEVEMENTS } from './achievements-Bs1z8zfY.mjs';
import 'pinia';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import './progress-B0dhTRZl.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "achievements",
  __ssrInlineRender: true,
  setup(__props) {
    const achievementsStore = useAchievementsStore();
    const achievements = ACHIEVEMENTS;
    const total = achievements.length;
    const unlockedCount = computed(() => achievementsStore.unlockedCount);
    const isUnlocked = (id) => achievementsStore.isUnlocked(id);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-5" }, _attrs))}><div><h1 class="text-2xl font-black text-slate-800"> Logros </h1><p class="text-slate-500 text-sm mt-1">${ssrInterpolate(unref(unlockedCount))}/${ssrInterpolate(unref(total))} desbloqueados </p></div><div class="h-3 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-amber-400 rounded-full transition-all duration-700" style="${ssrRenderStyle({ width: `${unref(unlockedCount) / unref(total) * 100}%` })}"></div></div><div class="grid grid-cols-1 gap-3 lg:grid-cols-2"><!--[-->`);
      ssrRenderList(unref(achievements), (ach) => {
        _push(`<div class="${ssrRenderClass([isUnlocked(ach.id) ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-slate-50 opacity-60", "rounded-2xl border-2 p-4 flex items-center gap-4 transition-all"])}"><div class="${ssrRenderClass([isUnlocked(ach.id) ? "bg-white shadow-sm" : "bg-slate-200", "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"])}">${ssrInterpolate(isUnlocked(ach.id) ? ach.icon : "\u{1F512}")}</div><div><p class="font-black text-slate-800">${ssrInterpolate(ach.title)}</p><p class="text-sm text-slate-500">${ssrInterpolate(ach.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/achievements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=achievements-DRHiP11d.mjs.map
