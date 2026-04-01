import { _ as __nuxt_component_0 } from './nuxt-link-BJP5ALcC.mjs';
import { defineComponent, computed, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { n as navigateTo } from './server.mjs';
import { L as LESSONS } from './lessons-AvHbDgNI.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LessonCard",
  __ssrInlineRender: true,
  props: {
    lesson: {},
    locked: { type: Boolean },
    completed: { type: Boolean },
    stars: {}
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const cardClass = computed(() => {
      if (props.locked) return "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed";
      if (props.completed) return "border-sky-200 bg-sky-50 hover:border-sky-400 cursor-pointer";
      return "border-slate-200 bg-white hover:border-sky-300 hover:shadow-md cursor-pointer";
    });
    const iconBg = computed(() => {
      if (props.locked) return "bg-slate-100";
      return "bg-sky-50";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["w-full text-left rounded-2xl border-2 p-4 flex items-center gap-4 transition-all", unref(cardClass)],
        disabled: __props.locked
      }, _attrs))}><div class="${ssrRenderClass([unref(iconBg), "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"])}">${ssrInterpolate(__props.lesson.icon)}</div><div class="flex-1 min-w-0"><div class="flex items-center gap-2"><span class="${ssrRenderClass([__props.locked ? "text-slate-400" : "text-slate-700", "font-black text-base"])}">${ssrInterpolate(__props.lesson.title)}</span>`);
      if (__props.completed) {
        _push(`<span class="text-xs bg-sky-100 text-sky-600 font-bold px-2 py-0.5 rounded-full"> \xA1Hecho! </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="${ssrRenderClass([__props.locked ? "text-slate-400" : "text-slate-500", "text-sm mt-0.5"])}">${ssrInterpolate(__props.lesson.description)}</p><div class="flex gap-0.5 mt-1.5"><!--[-->`);
      ssrRenderList(3, (i) => {
        var _a;
        _push(`<span class="${ssrRenderClass([i <= ((_a = __props.stars) != null ? _a : 0) ? "opacity-100" : "opacity-25", "text-base"])}">\u2B50</span>`);
      });
      _push(`<!--]--></div></div><div class="shrink-0 text-xl">${ssrInterpolate(__props.locked ? "\u{1F512}" : "\u2192")}</div></button>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LessonCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "learn",
  __ssrInlineRender: true,
  setup(__props) {
    const progressStore = useProgressStore();
    const a1Lessons = computed(() => LESSONS.filter((l) => l.level === "A1").sort((a, b) => a.order - b.order));
    const a1Total = computed(() => a1Lessons.value.length);
    const a1Completed = computed(() => a1Lessons.value.filter((l) => progressStore.isCompleted(l.id)).length);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_LessonCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><h1 class="text-2xl font-black text-slate-800"> Aprender </h1><p class="text-slate-500 text-sm"> Completa las lecciones en orden para desbloquear las siguientes. </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/aiworld",
        class: "block rounded-[2rem] border-4 border-slate-800 bg-gradient-to-r from-rose-100 via-white to-sky-100 p-5 shadow-[0_10px_0_0_theme(colors.rose.100)] transition-transform hover:-translate-y-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between gap-4"${_scopeId}><div${_scopeId}><p class="text-xs font-black uppercase tracking-[0.24em] text-rose-400"${_scopeId}> Nuevo modo </p><h2 class="mt-2 text-xl font-black text-slate-800"${_scopeId}> Explora AIworld </h2><p class="mt-1 text-sm text-slate-500"${_scopeId}> Recorre calles kawaii, entra en casas y avanza hasta la siguiente lecci\xF3n caminando. </p></div><div class="rounded-[1.5rem] border-4 border-slate-800 bg-white px-4 py-3 text-3xl shadow-[0_6px_0_0_theme(colors.slate.200)]"${_scopeId}> \u{1F308} </div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                createVNode("div", null, [
                  createVNode("p", { class: "text-xs font-black uppercase tracking-[0.24em] text-rose-400" }, " Nuevo modo "),
                  createVNode("h2", { class: "mt-2 text-xl font-black text-slate-800" }, " Explora AIworld "),
                  createVNode("p", { class: "mt-1 text-sm text-slate-500" }, " Recorre calles kawaii, entra en casas y avanza hasta la siguiente lecci\xF3n caminando. ")
                ]),
                createVNode("div", { class: "rounded-[1.5rem] border-4 border-slate-800 bg-white px-4 py-3 text-3xl shadow-[0_6px_0_0_theme(colors.slate.200)]" }, " \u{1F308} ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div><div class="flex items-center gap-2 mb-3"><span class="bg-sky-100 text-sky-600 font-black text-xs px-3 py-1 rounded-full">NIVEL A1</span><div class="flex-1 h-px bg-slate-200"></div><span class="text-xs text-slate-400 font-semibold">${ssrInterpolate(unref(a1Completed))}/${ssrInterpolate(unref(a1Total))} lecciones </span></div><div class="h-2 bg-slate-100 rounded-full mb-4 overflow-hidden"><div class="h-full bg-sky-400 rounded-full transition-all duration-700" style="${ssrRenderStyle({ width: `${unref(a1Completed) / unref(a1Total) * 100}%` })}"></div></div><div class="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0"><!--[-->`);
      ssrRenderList(unref(a1Lessons), (lesson, i) => {
        _push(ssrRenderComponent(_component_LessonCard, {
          key: lesson.id,
          lesson,
          locked: i > 0 && !unref(progressStore).isCompleted(unref(a1Lessons)[i - 1].id),
          completed: unref(progressStore).isCompleted(lesson.id),
          stars: unref(progressStore).getStars(lesson.id),
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/lesson/${lesson.id}`)
        }, null, _parent));
      });
      _push(`<!--]--></div></div><div class="card border-2 border-dashed border-slate-200 text-center py-6"><div class="text-3xl mb-2"> \u{1F6A7} </div><p class="font-bold text-slate-400"> Nivel A2 \u2014 pr\xF3ximamente </p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/learn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=learn-ByOAb7l_.mjs.map
