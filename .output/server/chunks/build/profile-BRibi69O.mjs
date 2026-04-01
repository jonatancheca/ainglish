import { _ as _sfc_main$1 } from './KawaiiAvatar-CEnm2kPD.mjs';
import { _ as _sfc_main$2 } from './LevelBadge-CSwq8xUc.mjs';
import { _ as _sfc_main$3 } from './AvatarOptionGroup-BKfKDcj6.mjs';
import { _ as _sfc_main$4 } from './XpBar-Bj2-DC-6.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BJP5ALcC.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
import { u as useAchievementsStore, A as ACHIEVEMENTS } from './achievements-Bs1z8zfY.mjs';
import { u as useUserStore, a as useRouter, F as FACE_SHAPE_OPTIONS, E as EYE_COLOR_OPTIONS, b as EYE_STYLE_OPTIONS, H as HAIR_OPTIONS, O as OUTFIT_OPTIONS, S as SHOES_OPTIONS, C as CHEEK_STYLE_OPTIONS, c as CHEEK_COLOR_OPTIONS, d as HAIR_COLOR_OPTIONS } from './server.mjs';
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
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const progressStore = useProgressStore();
    const achievementsStore = useAchievementsStore();
    useRouter();
    const totalAchievements = ACHIEVEMENTS.length;
    const editing = ref(false);
    const editName = ref("");
    const editDraft = reactive({ ...userStore.avatar });
    function getOptionLabel(options, value) {
      var _a, _b;
      return (_b = (_a = options.find((option) => option.value === value)) == null ? void 0 : _a.label) != null ? _b : value;
    }
    computed(() => getOptionLabel(FACE_SHAPE_OPTIONS, userStore.avatar.faceShape));
    computed(() => getOptionLabel(EYE_COLOR_OPTIONS, userStore.avatar.eyeColor));
    computed(() => getOptionLabel(EYE_STYLE_OPTIONS, userStore.avatar.eyeStyle));
    computed(() => getOptionLabel(HAIR_OPTIONS, userStore.avatar.hair));
    computed(() => getOptionLabel(OUTFIT_OPTIONS, userStore.avatar.outfit));
    computed(() => getOptionLabel(SHOES_OPTIONS, userStore.avatar.shoes));
    computed(() => {
      var _a;
      return getOptionLabel(CHEEK_STYLE_OPTIONS, (_a = userStore.avatar.cheeks) != null ? _a : "none");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_KawaiiAvatar = _sfc_main$1;
      const _component_LevelBadge = _sfc_main$2;
      const _component_AvatarOptionGroup = _sfc_main$3;
      const _component_XpBar = _sfc_main$4;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-5" }, _attrs))}><h1 class="text-2xl font-black text-slate-800"> Mi perfil </h1><div class="${ssrRenderClass([unref(editing) ? "flex flex-col sm:flex-row sm:items-start" : "flex flex-col items-center", "card py-8 gap-5"])}"><div class="${ssrRenderClass([unref(editing) ? "shrink-0 self-center sm:self-start" : "", "rounded-[2rem] bg-gradient-to-b from-sky-100 via-white to-rose-50 p-4"])}">`);
      _push(ssrRenderComponent(_component_KawaiiAvatar, {
        avatar: unref(editing) ? unref(editDraft) : unref(userStore).avatar,
        size: "lg"
      }, null, _parent));
      _push(`</div><div class="${ssrRenderClass(unref(editing) ? "flex flex-1 flex-col items-center sm:items-start gap-3" : "flex flex-col items-center gap-3")}">`);
      if (!unref(editing)) {
        _push(`<h2 class="text-xl font-black text-slate-800">${ssrInterpolate(unref(userStore).name || "Sin nombre")}</h2>`);
      } else {
        _push(`<input${ssrRenderAttr("value", unref(editName))} type="text" maxlength="30" placeholder="Tu nombre" class="w-52 text-center rounded-2xl border-2 border-slate-200 px-4 py-2 text-lg font-black text-slate-800 outline-none focus:border-sky-400">`);
      }
      _push(`<div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_LevelBadge, {
        level: unref(userStore).level
      }, null, _parent));
      _push(`<span class="text-sm font-bold text-slate-500">Nivel ${ssrInterpolate(unref(userStore).level)}</span></div>`);
      if (!unref(editing)) {
        _push(`<button class="text-sm font-bold text-sky-500 hover:text-sky-600 transition-colors"> \u270F\uFE0F Editar personaje </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(editing)) {
        _push(`<div class="card space-y-4"><p class="text-sm font-black uppercase tracking-[0.25em] text-sky-500"> Editar look kawaii </p>`);
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Forma de cara",
          options: unref(FACE_SHAPE_OPTIONS),
          "model-value": unref(editDraft).faceShape,
          "onUpdate:modelValue": ($event) => unref(editDraft).faceShape = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Color de ojos",
          options: unref(EYE_COLOR_OPTIONS),
          "model-value": unref(editDraft).eyeColor,
          "onUpdate:modelValue": ($event) => unref(editDraft).eyeColor = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Estilo de ojos",
          options: unref(EYE_STYLE_OPTIONS),
          "model-value": unref(editDraft).eyeStyle,
          "onUpdate:modelValue": ($event) => unref(editDraft).eyeStyle = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Mofletes",
          options: unref(CHEEK_STYLE_OPTIONS),
          "model-value": unref(editDraft).cheeks,
          "onUpdate:modelValue": ($event) => unref(editDraft).cheeks = $event
        }, null, _parent));
        if (unref(editDraft).cheeks !== "none") {
          _push(ssrRenderComponent(_component_AvatarOptionGroup, {
            label: "Color de mofletes",
            options: unref(CHEEK_COLOR_OPTIONS),
            "model-value": unref(editDraft).cheekColor,
            "onUpdate:modelValue": ($event) => unref(editDraft).cheekColor = $event
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Pelo",
          options: unref(HAIR_OPTIONS),
          "model-value": unref(editDraft).hair,
          "onUpdate:modelValue": ($event) => unref(editDraft).hair = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Color de pelo",
          options: unref(HAIR_COLOR_OPTIONS),
          "model-value": unref(editDraft).hairColor,
          "onUpdate:modelValue": ($event) => unref(editDraft).hairColor = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Ropa",
          options: unref(OUTFIT_OPTIONS),
          "model-value": unref(editDraft).outfit,
          "onUpdate:modelValue": ($event) => unref(editDraft).outfit = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Zapatos",
          options: unref(SHOES_OPTIONS),
          "model-value": unref(editDraft).shoes,
          "onUpdate:modelValue": ($event) => unref(editDraft).shoes = $event
        }, null, _parent));
        _push(`<div class="flex gap-3 pt-2"><button class="w-1/3 rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm font-black text-slate-600 transition-colors hover:border-slate-300"> Cancelar </button><button class="btn-primary w-2/3"${ssrIncludeBooleanAttr(!unref(editName).trim()) ? " disabled" : ""}> Guardar cambios \u2728 </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card">`);
      _push(ssrRenderComponent(_component_XpBar, {
        level: unref(userStore).level,
        "xp-in-level": unref(userStore).xpInCurrentLevel,
        "xp-needed": unref(userStore).xpNeededForNextLevel,
        progress: unref(userStore).levelProgress
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-2 gap-3 lg:grid-cols-4"><div class="card text-center"><div class="text-2xl mb-1"> \u{1F525} </div><div class="text-2xl font-black text-orange-500">${ssrInterpolate(unref(userStore).streak)}</div><div class="text-xs text-slate-500 font-semibold mt-0.5"> Racha actual </div></div><div class="card text-center"><div class="text-2xl mb-1"> \u{1F4C5} </div><div class="text-2xl font-black text-amber-500">${ssrInterpolate(unref(userStore).maxStreak)}</div><div class="text-xs text-slate-500 font-semibold mt-0.5"> Racha m\xE1xima </div></div><div class="card text-center"><div class="text-2xl mb-1"> \u26A1 </div><div class="text-2xl font-black text-sky-500">${ssrInterpolate(unref(userStore).xp)}</div><div class="text-xs text-slate-500 font-semibold mt-0.5"> XP total </div></div><div class="card text-center"><div class="text-2xl mb-1"> \u{1F4DA} </div><div class="text-2xl font-black text-emerald-500">${ssrInterpolate(unref(progressStore).totalLessonsCompleted)}</div><div class="text-xs text-slate-500 font-semibold mt-0.5"> Lecciones </div></div></div><div class="card"><div class="flex items-center justify-between mb-3"><p class="font-black text-slate-700"> Logros </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/achievements",
        class: "text-xs text-sky-500 font-bold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ver todos \u2192 `);
          } else {
            return [
              createTextVNode(" Ver todos \u2192 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-2"><span class="text-2xl font-black text-amber-500">${ssrInterpolate(unref(achievementsStore).unlockedCount)}</span><span class="text-slate-400 text-sm">/${ssrInterpolate(unref(totalAchievements))} desbloqueados</span><div class="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden ml-2"><div class="h-full bg-amber-400 rounded-full" style="${ssrRenderStyle({ width: `${unref(achievementsStore).unlockedCount / unref(totalAchievements) * 100}%` })}"></div></div></div></div><button class="w-full text-slate-400 text-sm font-semibold py-2 hover:text-red-400 transition-colors"> \u26A0\uFE0F Reiniciar progreso </button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-BRibi69O.mjs.map
