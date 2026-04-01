import { _ as __nuxt_component_0 } from './nuxt-link-BJP5ALcC.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, unref, ref, watch, computed, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderClass, ssrRenderTeleport } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './LevelBadge-CSwq8xUc.mjs';
import { u as useUserStore, f as useRoute } from './server.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StreakBadge",
  __ssrInlineRender: true,
  props: {
    streak: {}
  },
  setup(__props) {
    const props = __props;
    const justAnimated = ref(false);
    watch(
      () => props.streak,
      () => {
        justAnimated.value = true;
        setTimeout(() => justAnimated.value = false, 300);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-xl px-2.5 py-1", { "animate-pop": unref(justAnimated) }]
      }, _attrs))}><span class="text-base leading-none">\u{1F525}</span><span class="font-black text-orange-500 text-sm">${ssrInterpolate(__props.streak)}</span></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StreakBadge.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NavItem",
  __ssrInlineRender: true,
  props: {
    to: {},
    icon: {},
    label: {},
    sidebar: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const isActive = computed(
      () => props.to === "/" ? route.path === "/" : route.path.startsWith(props.to)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: __props.to,
        class: ["font-bold transition-colors", [
          unref(isActive) ? "text-sky-500" : "text-slate-400 hover:text-slate-600",
          __props.sidebar ? "flex items-center gap-3 rounded-xl px-4 py-3 text-sm" + (unref(isActive) ? " bg-sky-50" : " hover:bg-slate-50") : "relative flex-1 flex flex-col items-center py-2 gap-0.5 text-xs"
        ]]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([__props.sidebar ? "text-2xl" : "text-xl", "leading-none"])}"${_scopeId}>${ssrInterpolate(__props.icon)}</span><span${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
            if (unref(isActive) && !__props.sidebar) {
              _push2(`<span class="absolute bottom-0 h-0.5 w-8 bg-sky-500 rounded-full"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("span", {
                class: ["leading-none", __props.sidebar ? "text-2xl" : "text-xl"]
              }, toDisplayString(__props.icon), 3),
              createVNode("span", null, toDisplayString(__props.label), 1),
              unref(isActive) && !__props.sidebar ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute bottom-0 h-0.5 w-8 bg-sky-500 rounded-full"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LevelUpModal",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props) {
    const userStore = useUserStore();
    const previousLevel = computed(() => userStore.previousLevel);
    const newLevel = computed(() => userStore.level);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"><div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center animate-bounce-in shadow-2xl"><div class="text-6xl mb-4"> \u{1F38A} </div><h2 class="text-2xl font-black text-slate-800 mb-1"> \xA1Subiste de nivel! </h2><p class="text-slate-500 mb-2"><span class="text-slate-400">Nivel ${ssrInterpolate(unref(previousLevel))}</span><span class="mx-2">\u2192</span><span class="text-sky-500 font-black text-xl">Nivel ${ssrInterpolate(unref(newLevel))}</span></p><p class="text-slate-400 text-sm mb-6"> \xA1Sigue aprendiendo, vas muy bien! </p><button class="btn-primary w-full"> \xA1Genial! </button></div></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LevelUpModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_StreakBadge = _sfc_main$3;
      const _component_LevelBadge = _sfc_main$4;
      const _component_NavItem = _sfc_main$2;
      const _component_LevelUpModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50" }, _attrs))}><header class="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm"><div class="max-w-lg lg:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center font-black text-sky-500 text-xl tracking-tight"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="bg-sky-500 text-white rounded-xl px-2 py-0.5 text-sm font-black"${_scopeId}>AI</span> nglish `);
          } else {
            return [
              createVNode("span", { class: "bg-sky-500 text-white rounded-xl px-2 py-0.5 text-sm font-black" }, "AI"),
              createTextVNode(" nglish ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_StreakBadge, {
        streak: unref(userStore).streak
      }, null, _parent));
      _push(ssrRenderComponent(_component_LevelBadge, {
        level: unref(userStore).level
      }, null, _parent));
      _push(`<div class="hidden sm:flex items-center gap-1.5 text-sm font-bold text-slate-600"><span class="text-sky-500">\u26A1</span> ${ssrInterpolate(unref(userStore).xp)} XP </div></div></div></header><div class="lg:flex lg:max-w-6xl lg:mx-auto"><aside class="hidden lg:flex lg:flex-col lg:w-52 lg:shrink-0 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:border-r lg:border-slate-100 lg:bg-white lg:py-6 lg:px-3 lg:gap-1">`);
      _push(ssrRenderComponent(_component_NavItem, {
        to: "/",
        icon: "\u{1F3E0}",
        label: "Inicio",
        sidebar: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavItem, {
        to: "/aiworld",
        icon: "\u{1F308}",
        label: "AIworld",
        sidebar: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavItem, {
        to: "/learn",
        icon: "\u{1F4D6}",
        label: "Aprender",
        sidebar: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavItem, {
        to: "/achievements",
        icon: "\u{1F3C6}",
        label: "Logros",
        sidebar: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavItem, {
        to: "/profile",
        icon: "\u{1F464}",
        label: "Perfil",
        sidebar: ""
      }, null, _parent));
      _push(`</aside><main class="flex-1 w-full max-w-lg lg:max-w-3xl mx-auto px-4 py-6 pb-24 lg:pb-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div><nav class="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-100 shadow-[0_-1px_8px_rgba(0,0,0,0.06)] lg:hidden"><div class="max-w-lg mx-auto flex">`);
      _push(ssrRenderComponent(_component_NavItem, {
        to: "/",
        icon: "\u{1F3E0}",
        label: "Inicio"
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavItem, {
        to: "/aiworld",
        icon: "\u{1F308}",
        label: "AIworld"
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavItem, {
        to: "/learn",
        icon: "\u{1F4D6}",
        label: "Aprender"
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavItem, {
        to: "/achievements",
        icon: "\u{1F3C6}",
        label: "Logros"
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavItem, {
        to: "/profile",
        icon: "\u{1F464}",
        label: "Perfil"
      }, null, _parent));
      _push(`</div></nav>`);
      if (unref(userStore).justLeveledUp) {
        _push(ssrRenderComponent(_component_LevelUpModal, {
          onClose: ($event) => unref(userStore).clearLevelUp()
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BhaDw4iz.mjs.map
