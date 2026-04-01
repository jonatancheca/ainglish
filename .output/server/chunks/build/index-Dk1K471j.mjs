import { _ as _sfc_main$1 } from './KawaiiAvatar-CEnm2kPD.mjs';
import { _ as _sfc_main$2 } from './XpBar-Bj2-DC-6.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BJP5ALcC.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { g as getNextLesson } from './lessons-AvHbDgNI.mjs';
import { u as useUserStore } from './server.mjs';
import { u as useProgressStore } from './progress-B0dhTRZl.mjs';
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
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const progressStore = useProgressStore();
    const nextLesson = computed(() => getNextLesson(progressStore.completedLessons));
    const hour = (/* @__PURE__ */ new Date()).getHours();
    const isNight = hour >= 20 || hour < 7;
    const timeGreeting = isNight ? "Buenas noches" : "Buenos d\xEDas";
    const timeIcon = isNight ? "\u{1F319}" : "\u2600\uFE0F";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_KawaiiAvatar = _sfc_main$1;
      const _component_XpBar = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="card flex items-center gap-4"><div class="flex items-center justify-center w-14 h-14 rounded-[1.5rem] bg-sky-100/80 text-4xl">${ssrInterpolate(unref(timeIcon))}</div><div><p class="text-slate-500 text-sm">${ssrInterpolate(unref(timeGreeting))}</p><h1 class="text-xl font-black text-slate-800">${ssrInterpolate(unref(userStore).name)}! </h1></div></div><div class="card border border-rose-100 bg-gradient-to-r from-rose-50 via-white to-sky-50"><div class="flex items-center justify-between gap-4"><div><p class="text-xs font-black uppercase tracking-[0.25em] text-rose-400"> Tu personaje </p><h2 class="mt-1 text-lg font-black text-slate-800">${ssrInterpolate(unref(userStore).name)} est\xE1 listo para aprender </h2><p class="mt-1 text-sm text-slate-500"> Personalidad kawaii guardada en tu perfil. </p></div><div class="hidden sm:block shrink-0">`);
      _push(ssrRenderComponent(_component_KawaiiAvatar, {
        avatar: unref(userStore).avatar,
        size: "md"
      }, null, _parent));
      _push(`</div></div></div><div class="card">`);
      _push(ssrRenderComponent(_component_XpBar, {
        level: unref(userStore).level,
        "xp-in-level": unref(userStore).xpInCurrentLevel,
        "xp-needed": unref(userStore).xpNeededForNextLevel,
        progress: unref(userStore).levelProgress
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-3 gap-3 lg:gap-4"><div class="card text-center"><div class="text-2xl mb-1"> \u{1F525} </div><div class="text-xl font-black text-orange-500">${ssrInterpolate(unref(userStore).streak)}</div><div class="text-xs text-slate-500 font-semibold"> Racha </div></div><div class="card text-center"><div class="text-2xl mb-1"> \u26A1 </div><div class="text-xl font-black text-sky-500">${ssrInterpolate(unref(userStore).xp)}</div><div class="text-xs text-slate-500 font-semibold"> XP total </div></div><div class="card text-center"><div class="text-2xl mb-1"> \u{1F4DA} </div><div class="text-xl font-black text-emerald-500">${ssrInterpolate(unref(progressStore).totalLessonsCompleted)}</div><div class="text-xs text-slate-500 font-semibold"> Lecciones </div></div></div>`);
      if (unref(nextLesson)) {
        _push(`<div class="card border-2 border-sky-200 bg-sky-50"><p class="text-xs font-bold text-sky-500 mb-1 uppercase tracking-wide"> Contin\xFAa aprendiendo </p><div class="flex items-center gap-3 mb-4"><span class="text-3xl">${ssrInterpolate(unref(nextLesson).icon)}</span><div><h2 class="font-black text-slate-800">${ssrInterpolate(unref(nextLesson).title)}</h2><p class="text-sm text-slate-500">${ssrInterpolate(unref(nextLesson).description)}</p></div></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/lesson/${unref(nextLesson).id}`,
          class: "btn-primary w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \xA1Continuar! \u2192 `);
            } else {
              return [
                createTextVNode(" \xA1Continuar! \u2192 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="card bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-center"><div class="text-4xl mb-3"> \u{1F393} </div><h2 class="font-black text-xl mb-1"> \xA1Nivel A1 completado! </h2><p class="text-sky-100 text-sm"> Has terminado todas las lecciones disponibles. </p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dk1K471j.mjs.map
