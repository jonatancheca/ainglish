import { g as getStreetLessons, a as getLessonStreetHouses, b as getMonsterForLesson, _ as _sfc_main$1, c as _sfc_main$2 } from './aiworld-B_nHJR51.mjs';
import { _ as _sfc_main$3 } from './KawaiiAvatar-CEnm2kPD.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BJP5ALcC.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useProgressStore } from './progress-B0dhTRZl.mjs';
import { u as useUserStore } from './server.mjs';
import './lessons-AvHbDgNI.mjs';
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
  __name: "aiworld",
  __ssrInlineRender: true,
  setup(__props) {
    const progressStore = useProgressStore();
    const userStore = useUserStore();
    const streetLessons = getStreetLessons();
    function isStreetCompleted(lesson) {
      const houses = getLessonStreetHouses(lesson);
      return progressStore.areAllHousesCompleted(houses.map((h) => h.id));
    }
    const initialStreetIndex = Math.max(
      streetLessons.findIndex((lesson) => !isStreetCompleted(lesson)),
      0
    );
    const activeStreetIndex = ref(initialStreetIndex);
    const characterPosition = ref(8);
    const selectedHouseId = ref(null);
    const activeLesson = computed(() => {
      var _a;
      return (_a = streetLessons[activeStreetIndex.value]) != null ? _a : streetLessons[streetLessons.length - 1];
    });
    const streetHouses = computed(() => getLessonStreetHouses(activeLesson.value));
    const hostMonster = computed(() => getMonsterForLesson(activeLesson.value.id));
    const completedLessons = computed(() => progressStore.completedLessons.length);
    const barrierOpen = computed(() => progressStore.areAllHousesCompleted(streetHouses.value.map((h) => h.id)));
    const nextStreetExists = computed(() => activeStreetIndex.value < streetLessons.length - 1);
    const nearbyHouse = computed(() => {
      var _a;
      return (_a = streetHouses.value.find((house) => Math.abs(house.position - characterPosition.value) <= 8)) != null ? _a : null;
    });
    const selectedHouse = computed(() => {
      var _a, _b, _c;
      const targetId = (_b = selectedHouseId.value) != null ? _b : (_a = nearbyHouse.value) == null ? void 0 : _a.id;
      return (_c = streetHouses.value.find((house) => house.id === targetId)) != null ? _c : null;
    });
    const canAdvanceToNextStreet = computed(
      () => barrierOpen.value && nextStreetExists.value && characterPosition.value >= 88
    );
    const completedHousesCount = computed(() => streetHouses.value.filter((h) => progressStore.isHouseCompleted(h.id)).length);
    const guideText = computed(() => {
      if (barrierOpen.value) {
        return `${hostMonster.value.name} ha bajado la barrera. Recorre el final de la calle para avanzar.`;
      }
      if (completedHousesCount.value > 0) {
        return `${hostMonster.value.name} dice: llevas ${completedHousesCount.value} de ${streetHouses.value.length} casas. \xA1Sigue as\xED!`;
      }
      return `${hostMonster.value.name} te espera en una casa. Ac\xE9rcate y entra para completar esta calle.`;
    });
    const streetAdvanceMessage = computed(() => {
      if (!nextStreetExists.value) {
        return "Esta es la \xFAltima calle disponible por ahora. Cuando completes todo, te quedar\xE1s con el barrio entero despejado.";
      }
      if (!barrierOpen.value) {
        return `La barrera seguir\xE1 levantada hasta que completes todas las casas (${completedHousesCount.value}/${streetHouses.value.length}).`;
      }
      if (characterPosition.value < 88) {
        return "La barrera ya est\xE1 abajo. Camina hasta el extremo derecho para pasar a la siguiente calle.";
      }
      return "Ya est\xE1s en el final de la calle. Puedes cruzar a la siguiente ahora mismo.";
    });
    watch(activeLesson, () => {
      if (!selectedHouseId.value && streetHouses.value.length) {
        selectedHouseId.value = streetHouses.value[0].id;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ComicBubble = _sfc_main$1;
      const _component_KawaiiMonster = _sfc_main$2;
      const _component_KawaiiAvatar = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-5" }, _attrs))}><div class="flex items-start justify-between gap-4"><div><p class="text-xs font-black uppercase tracking-[0.28em] text-rose-400"> Modo aventura </p><h1 class="mt-2 text-3xl font-black text-slate-800"> AIworld </h1><p class="mt-2 text-sm text-slate-500"> Recorre una calle por lecci\xF3n, entra en casas kawaii y desbloquea la barrera para llegar a la siguiente. </p></div><div class="rounded-[1.75rem] border-4 border-slate-800 bg-white px-4 py-3 text-right shadow-[0_8px_0_0_theme(colors.slate.200)]"><p class="text-xs font-black uppercase tracking-[0.2em] text-sky-500"> Calle actual </p><p class="mt-1 text-lg font-black text-slate-800">${ssrInterpolate(unref(activeLesson).title)}</p></div></div><div class="grid gap-3 md:grid-cols-3"><div class="rounded-[1.75rem] border-4 border-slate-800 bg-white px-4 py-3 shadow-[0_8px_0_0_theme(colors.slate.200)]"><p class="text-xs font-black uppercase tracking-[0.2em] text-sky-500"> Progreso callejero </p><p class="mt-2 text-2xl font-black text-slate-800">${ssrInterpolate(unref(completedLessons))}/${ssrInterpolate(unref(streetLessons).length)}</p></div><div class="rounded-[1.75rem] border-4 border-slate-800 bg-white px-4 py-3 shadow-[0_8px_0_0_theme(colors.slate.200)]"><p class="text-xs font-black uppercase tracking-[0.2em] text-emerald-500"> Casas en esta calle </p><p class="mt-2 text-2xl font-black text-slate-800">${ssrInterpolate(unref(completedHousesCount))}/${ssrInterpolate(unref(streetHouses).length)}</p></div><div class="rounded-[1.75rem] border-4 border-slate-800 bg-white px-4 py-3 shadow-[0_8px_0_0_theme(colors.slate.200)]"><p class="text-xs font-black uppercase tracking-[0.2em] text-amber-500"> Barrera </p><p class="${ssrRenderClass([unref(barrierOpen) ? "text-emerald-600" : "text-amber-600", "mt-2 text-base font-black"])}">${ssrInterpolate(unref(barrierOpen) ? "Abierta" : "Cerrada")}</p></div></div><div class="overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-gradient-to-b from-sky-200 via-cyan-100 to-lime-100 p-4 shadow-[0_12px_0_0_theme(colors.sky.100)]"><div class="mb-4 flex flex-wrap items-center justify-between gap-3">`);
      _push(ssrRenderComponent(_component_ComicBubble, { label: "Gu\xEDa monstruosa" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(guideText))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(guideText)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_KawaiiMonster, {
        monster: unref(hostMonster),
        size: "sm"
      }, null, _parent));
      _push(`</div><div class="relative h-[24rem] overflow-hidden rounded-[1.75rem] border-4 border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_45%),linear-gradient(to_bottom,_#bae6fd,_#e0f2fe_55%,_#bbf7d0_55%,_#86efac_100%)]"><div class="absolute inset-x-0 bottom-0 h-24 bg-slate-700"></div><div class="absolute inset-x-0 bottom-16 h-2 bg-yellow-200 opacity-70"></div><div class="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-500"> Calle ${ssrInterpolate(unref(activeStreetIndex) + 1)}</div><!--[-->`);
      ssrRenderList(unref(streetHouses), (house) => {
        _push(`<button type="button" class="absolute bottom-24 flex -translate-x-1/2 flex-col items-center transition-transform hover:-translate-y-1" style="${ssrRenderStyle({ left: `${house.position}%` })}"><div class="relative flex flex-col items-center">`);
        if (unref(progressStore).isHouseCompleted(house.id)) {
          _push(`<div class="absolute -right-2 -top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-800 bg-emerald-400 text-xs text-white"> \u2713 </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass([[house.palette.roof, unref(progressStore).isHouseCompleted(house.id) ? "border-emerald-500" : "border-slate-800"], "h-8 w-24 rounded-t-[2rem] border-4 border-b-0"])}"></div><div class="${ssrRenderClass([[house.palette.wall, unref(progressStore).isHouseCompleted(house.id) ? "border-emerald-500" : "border-slate-800"], "relative h-20 w-24 rounded-b-[1.25rem] border-4"])}"><div class="absolute left-1/2 top-2 h-7 w-7 -translate-x-1/2 rounded-full border-4 border-slate-800 bg-white"></div><div class="${ssrRenderClass([house.palette.door, "absolute bottom-0 left-1/2 h-10 w-8 -translate-x-1/2 rounded-t-xl border-4 border-b-0 border-slate-800"])}"></div></div></div><span class="${ssrRenderClass([unref(progressStore).isHouseCompleted(house.id) ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-800 bg-white text-slate-600", "mt-2 max-w-24 rounded-full border-2 px-3 py-1 text-center text-[11px] font-black"])}">${ssrInterpolate(house.words.join(" + "))}</span></button>`);
      });
      _push(`<!--]--><div class="absolute bottom-4 transition-all duration-200" style="${ssrRenderStyle({ left: `calc(${unref(characterPosition)}% - 2.25rem)` })}">`);
      _push(ssrRenderComponent(_component_KawaiiAvatar, {
        avatar: unref(userStore).avatar,
        size: "sm"
      }, null, _parent));
      _push(`</div><div class="absolute bottom-24 right-3 flex flex-col items-center"><div class="${ssrRenderClass([unref(barrierOpen) ? "opacity-60" : "", "h-28 w-5 rounded-full border-4 border-slate-800 bg-amber-700"])}"></div><div class="${ssrRenderClass([unref(barrierOpen) ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-700", "mt-1 rounded-full border-2 border-slate-800 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em]"])}">${ssrInterpolate(unref(barrierOpen) ? "Paso libre" : "Barrera")}</div></div></div></div><div class="grid gap-3 md:grid-cols-3"><button class="btn-secondary w-full"> \u2190 Izquierda </button><button class="btn-primary w-full"${ssrIncludeBooleanAttr(!unref(nearbyHouse)) ? " disabled" : ""}>${ssrInterpolate(unref(nearbyHouse) ? `Entrar en ${unref(nearbyHouse).words.join(" + ")}` : "Ac\xE9rcate a una casa")}</button><button class="btn-secondary w-full"> Derecha \u2192 </button></div>`);
      if (unref(selectedHouse)) {
        _push(`<div class="rounded-[2rem] border-4 border-slate-800 bg-white p-5 shadow-[0_10px_0_0_theme(colors.slate.200)]"><div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div class="space-y-3"><p class="text-xs font-black uppercase tracking-[0.2em] text-rose-400"> Casa vocabulario </p><h2 class="text-2xl font-black text-slate-800">${ssrInterpolate(unref(selectedHouse).words.join(" + "))}</h2><p class="text-sm text-slate-500">${ssrInterpolate(unref(hostMonster).name)} te recibir\xE1 con una explicaci\xF3n y luego entrar\xE1s en la lecci\xF3n de ${ssrInterpolate(unref(activeLesson).title.toLowerCase())}. </p><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(unref(selectedHouse).words, (word) => {
          _push(`<span class="rounded-full border-2 border-slate-800 bg-sky-50 px-3 py-1 text-sm font-black text-sky-600">${ssrInterpolate(word)}</span>`);
        });
        _push(`<!--]--></div></div><div class="w-full max-w-xs rounded-[1.75rem] border-4 border-slate-800 bg-gradient-to-br from-white to-rose-50 p-4 shadow-[0_8px_0_0_theme(colors.rose.100)]"><p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500"> Estado de calle </p><p class="mt-2 text-sm text-slate-600">${ssrInterpolate(unref(barrierOpen) ? "La barrera ya est\xE1 bajada. Puedes cruzar a la siguiente calle cuando quieras." : "Completa la lecci\xF3n en esta calle para bajar la barrera del final.")}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/lesson/${unref(activeLesson).id}?house=${unref(selectedHouse).id}`,
          class: "btn-primary mt-4 w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Entrar en la casa `);
            } else {
              return [
                createTextVNode(" Entrar en la casa ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="rounded-[2rem] border-4 border-slate-800 bg-white p-5 shadow-[0_10px_0_0_theme(colors.slate.200)]"><div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p class="text-xs font-black uppercase tracking-[0.2em] text-emerald-500"> Final de la calle </p><p class="mt-2 text-sm text-slate-500">${ssrInterpolate(unref(streetAdvanceMessage))}</p></div><button class="btn-primary"${ssrIncludeBooleanAttr(!unref(canAdvanceToNextStreet)) ? " disabled" : ""}>${ssrInterpolate(unref(nextStreetExists) ? "Caminar a la siguiente calle \u2192" : "Has llegado al final \u{1F31F}")}</button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/aiworld.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=aiworld-BQt560Ut.mjs.map
