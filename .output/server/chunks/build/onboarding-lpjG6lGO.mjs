import { _ as _sfc_main$1 } from './KawaiiAvatar-CEnm2kPD.mjs';
import { _ as _sfc_main$2 } from './AvatarOptionGroup-BKfKDcj6.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useUserStore, a as useRouter, e as createDefaultAvatar, F as FACE_SHAPE_OPTIONS, E as EYE_COLOR_OPTIONS, b as EYE_STYLE_OPTIONS, C as CHEEK_STYLE_OPTIONS, c as CHEEK_COLOR_OPTIONS, H as HAIR_OPTIONS, d as HAIR_COLOR_OPTIONS, O as OUTFIT_OPTIONS, S as SHOES_OPTIONS } from './server.mjs';
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
  __name: "onboarding",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    useRouter();
    const nameInput = ref("");
    const currentStep = ref(1);
    const avatarDraft = reactive(createDefaultAvatar());
    const stepTitle = computed(
      () => currentStep.value === 1 ? "Ponle nombre y carita" : "Viste a tu personaje"
    );
    const previewHeadline = computed(() => `${nameInput.value.trim() || "Tu avatar"} ya va tomando forma`);
    const previewDescription = computed(() => {
      if (currentStep.value === 1) {
        return "Elige la expresi\xF3n de la cara y remata el look en el siguiente paso.";
      }
      return "Revisa el resultado final y entra en la aventura con tu estilo kawaii.";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_KawaiiAvatar = _sfc_main$1;
      const _component_AvatarOptionGroup = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500 px-6 py-10" }, _attrs))}><div class="mx-auto flex min-h-full max-w-5xl flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch"><div class="flex w-full max-w-sm flex-col justify-center text-center lg:text-left"><div class="mb-8 text-center lg:text-left"><div class="text-white font-black text-4xl tracking-tight mb-2"><span class="bg-white/20 rounded-2xl px-3 py-1">AI</span>nglish </div><p class="text-sky-100 text-base"> Tu app para aprender ingl\xE9s </p></div><div class="hidden rounded-[2rem] bg-white/15 p-6 text-left text-white shadow-2xl backdrop-blur lg:block"><p class="text-xs font-black uppercase tracking-[0.3em] text-sky-100"> Avatar kawaii </p><h2 class="mt-3 text-3xl font-black leading-tight"> Dise\xF1a tu personaje antes de empezar. </h2><p class="mt-3 text-sm text-sky-50/90"> Elige la cara, el pelo, la ropa y los detalles que te van a acompa\xF1ar en tu aventura. </p></div></div><div class="w-full max-w-3xl rounded-[2rem] bg-white p-6 shadow-2xl animate-bounce-in lg:p-8"><div class="grid gap-8 lg:grid-cols-[1fr_1.15fr]"><div class="rounded-[2rem] bg-slate-50 p-5"><div class="flex items-center justify-between gap-3"><div><p class="text-xs font-black uppercase tracking-[0.3em] text-sky-500"> Paso ${ssrInterpolate(unref(currentStep))} de 2 </p><h1 class="mt-2 text-2xl font-black text-slate-800">${ssrInterpolate(unref(stepTitle))}</h1></div><span class="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 shadow-sm"> kawaii mode </span></div><div class="mt-6 flex justify-center rounded-[2rem] bg-gradient-to-b from-sky-100 via-white to-rose-50 p-4">`);
      _push(ssrRenderComponent(_component_KawaiiAvatar, {
        avatar: unref(avatarDraft),
        size: "lg"
      }, null, _parent));
      _push(`</div><div class="mt-4 rounded-2xl bg-white p-4 shadow-sm"><p class="text-sm font-black text-slate-700">${ssrInterpolate(unref(previewHeadline))}</p><p class="mt-1 text-sm text-slate-500">${ssrInterpolate(unref(previewDescription))}</p></div></div><div><form class="space-y-5">`);
      if (unref(currentStep) === 1) {
        _push(`<!--[--><div><label class="mb-2 block text-sm font-black text-slate-700">Tu nombre</label><input${ssrRenderAttr("value", unref(nameInput))} type="text" placeholder="Tu nombre..." maxlength="30" class="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-base font-bold text-slate-700 outline-none transition-colors focus:border-sky-400" autofocus></div>`);
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Forma de cara",
          options: unref(FACE_SHAPE_OPTIONS),
          "model-value": unref(avatarDraft).faceShape,
          "onUpdate:modelValue": ($event) => unref(avatarDraft).faceShape = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Color de ojos",
          options: unref(EYE_COLOR_OPTIONS),
          "model-value": unref(avatarDraft).eyeColor,
          "onUpdate:modelValue": ($event) => unref(avatarDraft).eyeColor = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Estilo de ojos",
          options: unref(EYE_STYLE_OPTIONS),
          "model-value": unref(avatarDraft).eyeStyle,
          "onUpdate:modelValue": ($event) => unref(avatarDraft).eyeStyle = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Mofletes",
          options: unref(CHEEK_STYLE_OPTIONS),
          "model-value": unref(avatarDraft).cheeks,
          "onUpdate:modelValue": ($event) => unref(avatarDraft).cheeks = $event
        }, null, _parent));
        if (unref(avatarDraft).cheeks !== "none") {
          _push(ssrRenderComponent(_component_AvatarOptionGroup, {
            label: "Color de mofletes",
            options: unref(CHEEK_COLOR_OPTIONS),
            "model-value": unref(avatarDraft).cheekColor,
            "onUpdate:modelValue": ($event) => unref(avatarDraft).cheekColor = $event
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit" class="btn-primary w-full"${ssrIncludeBooleanAttr(!unref(nameInput).trim()) ? " disabled" : ""}> Siguiente: estilo del cuerpo \u2192 </button><!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Pelo",
          options: unref(HAIR_OPTIONS),
          "model-value": unref(avatarDraft).hair,
          "onUpdate:modelValue": ($event) => unref(avatarDraft).hair = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Color de pelo",
          options: unref(HAIR_COLOR_OPTIONS),
          "model-value": unref(avatarDraft).hairColor,
          "onUpdate:modelValue": ($event) => unref(avatarDraft).hairColor = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Ropa",
          options: unref(OUTFIT_OPTIONS),
          "model-value": unref(avatarDraft).outfit,
          "onUpdate:modelValue": ($event) => unref(avatarDraft).outfit = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_AvatarOptionGroup, {
          label: "Zapatos",
          options: unref(SHOES_OPTIONS),
          "model-value": unref(avatarDraft).shoes,
          "onUpdate:modelValue": ($event) => unref(avatarDraft).shoes = $event
        }, null, _parent));
        _push(`<div class="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500"> Tu personaje se guardar\xE1 con tu perfil y aparecer\xE1 en inicio y en la ficha de usuario. </div><div class="flex gap-3"><button type="button" class="w-1/3 rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm font-black text-slate-600 transition-colors hover:border-slate-300"> \u2190 Atr\xE1s </button><button type="submit" class="btn-primary w-2/3"> \xA1Empezar a aprender! \u{1F680} </button></div><!--]-->`);
      }
      _push(`</form></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/onboarding.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=onboarding-lpjG6lGO.mjs.map
