import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
import { L as LESSONS } from './lessons-AvHbDgNI.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ComicBubble",
  __ssrInlineRender: true,
  props: {
    side: { default: "left" },
    label: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const alignmentClass = computed(() => props.side === "left" ? "mr-6" : "ml-6");
    const tailClass = computed(() => props.side === "left" ? "left-8" : "right-8");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative rounded-[2rem] border-4 border-slate-800 bg-white px-5 py-4 shadow-[0_10px_0_0_theme(colors.slate.200)]", unref(alignmentClass)]
      }, _attrs))}>`);
      if (__props.label) {
        _push(`<p class="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-sky-500">${ssrInterpolate(__props.label)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-base font-bold leading-6 text-slate-700">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</p><div class="${ssrRenderClass([unref(tailClass), "absolute -bottom-4 h-6 w-6 rotate-45 border-b-4 border-r-4 border-slate-800 bg-white"])}"></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ComicBubble.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "KawaiiMonster",
  __ssrInlineRender: true,
  props: {
    monster: {},
    size: { default: "md" }
  },
  setup(__props) {
    const props = __props;
    const sizeClass = computed(() => props.size === "sm" ? "h-44 w-40" : "h-56 w-48");
    const eyeClassMap = {
      round: "h-4 w-4 rounded-full bg-slate-900",
      sleepy: "h-1 w-5 rounded-full bg-slate-900",
      sparkle: "relative h-4 w-4 rounded-full bg-slate-900 after:absolute after:left-1 after:top-0.5 after:h-1.5 after:w-1.5 after:rounded-full after:bg-white"
    };
    const leftEyeClass = computed(() => eyeClassMap[props.monster.eyeStyle]);
    const rightEyeClass = computed(() => eyeClassMap[props.monster.eyeStyle]);
    const mouthStyle = computed(() => {
      var _a;
      return (_a = props.monster.mouthStyle) != null ? _a : "open";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative select-none", unref(sizeClass)]
      }, _attrs))}>`);
      if (__props.monster.earStyle === "horns") {
        _push(`<div class="absolute left-1/2 top-2 flex w-24 -translate-x-1/2 justify-between"><span class="${ssrRenderClass([__props.monster.hornColor, "h-8 w-5 rounded-full border-4 border-slate-800"])}"></span><span class="${ssrRenderClass([__props.monster.hornColor, "h-8 w-5 rounded-full border-4 border-slate-800"])}"></span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.monster.earStyle === "wings") {
        _push(`<div class="absolute left-1/2 top-10 flex w-32 -translate-x-1/2 justify-between"><span class="h-12 w-8 rounded-full border-4 border-slate-800 bg-white"></span><span class="h-12 w-8 rounded-full border-4 border-slate-800 bg-white"></span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.monster.earStyle === "leaf") {
        _push(`<div class="absolute left-1/2 top-5 flex w-32 -translate-x-1/2 justify-between"><span class="h-10 w-6 rounded-full border-4 border-slate-800 bg-emerald-300"></span><span class="h-10 w-6 rounded-full border-4 border-slate-800 bg-emerald-300"></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute bottom-2 left-1/2 -translate-x-1/2"><div class="${ssrRenderClass([__props.monster.bodyColor, "relative h-40 w-36 rounded-[45%] border-4 border-slate-800"])}">`);
      if (__props.monster.pattern === "belly") {
        _push(`<div class="${ssrRenderClass([__props.monster.accentColor, "absolute bottom-6 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border-4 border-slate-800"])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.monster.pattern === "spots") {
        _push(`<div class="${ssrRenderClass([__props.monster.accentColor, "absolute left-6 top-8 h-5 w-5 rounded-full"])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.monster.pattern === "spots") {
        _push(`<div class="${ssrRenderClass([__props.monster.accentColor, "absolute right-7 top-16 h-4 w-4 rounded-full"])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.monster.pattern === "stripes") {
        _push(`<div class="${ssrRenderClass([__props.monster.accentColor, "absolute left-1/2 top-8 h-3 w-24 -translate-x-1/2 rounded-full border-2 border-slate-800"])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.monster.pattern === "stripes") {
        _push(`<div class="${ssrRenderClass([__props.monster.accentColor, "absolute left-1/2 top-16 h-3 w-20 -translate-x-1/2 rounded-full border-2 border-slate-800"])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.monster.pattern === "heart") {
        _push(`<div class="absolute left-1/2 top-12 flex -translate-x-1/2 gap-0.5"><span class="${ssrRenderClass([__props.monster.accentColor, "h-6 w-6 rounded-full"])}"></span><span class="${ssrRenderClass([__props.monster.accentColor, "h-6 w-6 rounded-full"])}"></span><span class="${ssrRenderClass([__props.monster.accentColor, "absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 rotate-45"])}"></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute left-1/2 top-14 flex -translate-x-1/2 gap-8"><span class="${ssrRenderClass(unref(leftEyeClass))}"></span><span class="${ssrRenderClass(unref(rightEyeClass))}"></span></div><div class="absolute left-1/2 top-[5.25rem] flex w-20 -translate-x-1/2 justify-between"><span class="${ssrRenderClass([__props.monster.cheekColor, "h-3 w-4 rounded-full opacity-80"])}"></span><span class="${ssrRenderClass([__props.monster.cheekColor, "h-3 w-4 rounded-full opacity-80"])}"></span></div><div class="absolute left-1/2 top-[6.4rem] h-2 w-3 -translate-x-1/2 rounded-full bg-slate-800"></div>`);
      if (unref(mouthStyle) === "smile") {
        _push(`<div class="absolute left-1/2 top-[6.8rem] h-4 w-8 -translate-x-1/2 rounded-b-full border-b-4 border-l-4 border-r-4 border-slate-800"></div>`);
      } else {
        _push(`<div class="absolute left-1/2 top-[7rem] h-5 w-12 -translate-x-1/2 rounded-b-full border-b-4 border-slate-800"></div>`);
      }
      _push(`<div class="absolute -bottom-4 left-5 h-8 w-5 rounded-full border-4 border-slate-800 bg-amber-50"></div><div class="absolute -bottom-4 right-5 h-8 w-5 rounded-full border-4 border-slate-800 bg-amber-50"></div><div class="absolute bottom-5 -left-3 h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div><div class="absolute bottom-5 -right-3 h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/KawaiiMonster.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const KAWAII_MONSTERS = [
  {
    id: "mimo",
    name: "Mimo",
    title: "el monstruo de los saludos",
    bodyColor: "bg-sky-300",
    accentColor: "bg-sky-100",
    cheekColor: "bg-rose-200",
    hornColor: "bg-sky-500",
    eyeStyle: "round",
    earStyle: "horns",
    pattern: "belly",
    catchphrase: "Primero escuchamos, luego respondemos con calma."
  },
  {
    id: "pofu",
    name: "Pofu",
    title: "la monstruilla contadora",
    bodyColor: "bg-emerald-300",
    accentColor: "bg-emerald-100",
    cheekColor: "bg-orange-200",
    hornColor: "bg-emerald-500",
    eyeStyle: "sleepy",
    earStyle: "leaf",
    pattern: "spots",
    catchphrase: "Contar en voz alta ayuda a recordarlo mejor."
  },
  {
    id: "lili",
    name: "Lili",
    title: "la guardiana de los colores",
    bodyColor: "bg-fuchsia-300",
    accentColor: "bg-fuchsia-100",
    cheekColor: "bg-pink-200",
    hornColor: "bg-fuchsia-500",
    eyeStyle: "sparkle",
    earStyle: "wings",
    pattern: "heart",
    catchphrase: "Asocia cada palabra con una imagen brillante."
  },
  {
    id: "bubu",
    name: "Bubu",
    title: "el vecino de las familias",
    bodyColor: "bg-amber-300",
    accentColor: "bg-amber-100",
    cheekColor: "bg-rose-200",
    hornColor: "bg-amber-500",
    eyeStyle: "round",
    earStyle: "leaf",
    pattern: "stripes",
    catchphrase: "Piensa en tu propia familia para memorizar."
  },
  {
    id: "noki",
    name: "Noki",
    title: "el chef monstruoso",
    bodyColor: "bg-rose-300",
    accentColor: "bg-rose-100",
    cheekColor: "bg-orange-200",
    hornColor: "bg-rose-500",
    eyeStyle: "sleepy",
    earStyle: "horns",
    pattern: "spots",
    catchphrase: "Si imaginas la escena, la palabra entra mejor."
  },
  {
    id: "tuki",
    name: "Tuki",
    title: "la exploradora del tiempo",
    bodyColor: "bg-cyan-300",
    accentColor: "bg-cyan-100",
    cheekColor: "bg-pink-200",
    hornColor: "bg-cyan-500",
    eyeStyle: "sparkle",
    earStyle: "horns",
    pattern: "stripes",
    catchphrase: "Repite la palabra tres veces y ya es tuya."
  },
  {
    id: "zuri",
    name: "Zuri",
    title: "la guardiana de los verbos",
    bodyColor: "bg-violet-300",
    accentColor: "bg-violet-100",
    cheekColor: "bg-rose-200",
    hornColor: "bg-violet-500",
    eyeStyle: "round",
    earStyle: "wings",
    pattern: "belly",
    catchphrase: "Cada verbo es una acci\xF3n: \xA1imag\xEDnala!"
  },
  {
    id: "kipo",
    name: "Kipo",
    title: "el monstruo viajero",
    bodyColor: "bg-teal-300",
    accentColor: "bg-teal-100",
    cheekColor: "bg-amber-200",
    hornColor: "bg-teal-500",
    eyeStyle: "sleepy",
    earStyle: "leaf",
    pattern: "heart",
    catchphrase: "Viaja con la mente y aprende con el coraz\xF3n."
  },
  {
    id: "miru",
    name: "Miru",
    title: "la inventora de palabras",
    bodyColor: "bg-indigo-300",
    accentColor: "bg-indigo-100",
    cheekColor: "bg-pink-200",
    hornColor: "bg-indigo-500",
    eyeStyle: "sparkle",
    earStyle: "leaf",
    pattern: "spots",
    catchphrase: "Inventa una frase con cada palabra nueva."
  },
  {
    id: "roko",
    name: "Roko",
    title: "el monstruo musical",
    bodyColor: "bg-orange-300",
    accentColor: "bg-orange-100",
    cheekColor: "bg-rose-200",
    hornColor: "bg-orange-500",
    eyeStyle: "round",
    earStyle: "horns",
    pattern: "belly",
    catchphrase: "Canta la palabra y nunca la olvidar\xE1s."
  },
  {
    id: "nala",
    name: "Nala",
    title: "la monstruilla so\xF1adora",
    bodyColor: "bg-pink-300",
    accentColor: "bg-pink-100",
    cheekColor: "bg-amber-200",
    hornColor: "bg-pink-500",
    eyeStyle: "sleepy",
    earStyle: "wings",
    pattern: "stripes",
    catchphrase: "Cierra los ojos y visualiza la palabra."
  },
  {
    id: "bobi",
    name: "Bobi",
    title: "el monstruo de las risas",
    bodyColor: "bg-lime-300",
    accentColor: "bg-lime-100",
    cheekColor: "bg-orange-200",
    hornColor: "bg-lime-500",
    eyeStyle: "sparkle",
    earStyle: "horns",
    pattern: "spots",
    mouthStyle: "smile",
    catchphrase: "Re\xEDrse ayuda a recordar. \xA1Ja, ja, ja!"
  },
  {
    id: "yumi",
    name: "Yumi",
    title: "la monstruilla de las estrellas",
    bodyColor: "bg-yellow-300",
    accentColor: "bg-yellow-100",
    cheekColor: "bg-pink-200",
    hornColor: "bg-yellow-500",
    eyeStyle: "round",
    earStyle: "wings",
    pattern: "heart",
    catchphrase: "Cada palabra aprendida es una estrella m\xE1s."
  },
  {
    id: "dino",
    name: "Dino",
    title: "el monstruo prehist\xF3rico",
    bodyColor: "bg-stone-300",
    accentColor: "bg-stone-100",
    cheekColor: "bg-rose-200",
    hornColor: "bg-stone-500",
    eyeStyle: "sleepy",
    earStyle: "leaf",
    pattern: "stripes",
    catchphrase: "Paso a paso, como los dinosaurios."
  }
];
function getMonsterForLesson(lessonId) {
  const numericSeed = lessonId.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return KAWAII_MONSTERS[numericSeed % KAWAII_MONSTERS.length];
}
const HOUSE_PALETTES = [
  { roof: "bg-rose-400", wall: "bg-rose-100", door: "bg-rose-600" },
  { roof: "bg-sky-400", wall: "bg-sky-100", door: "bg-sky-600" },
  { roof: "bg-emerald-400", wall: "bg-emerald-100", door: "bg-emerald-600" },
  { roof: "bg-amber-400", wall: "bg-amber-100", door: "bg-amber-600" }
];
function chunkWords(words, size) {
  const groups = [];
  for (let index = 0; index < words.length; index += size) {
    groups.push(words.slice(index, index + size));
  }
  return groups;
}
function getFallbackWords(lesson) {
  const uniqueOptions = /* @__PURE__ */ new Set();
  for (const question of lesson.questions) {
    if (question.type === "multiple-choice") {
      uniqueOptions.add(question.options[question.correctIndex]);
    } else {
      uniqueOptions.add(question.correctAnswer);
    }
  }
  return [...uniqueOptions].slice(0, 6);
}
function questionMatchesWords(question, enWords, esWords) {
  var _a, _b;
  const text = question.question.toLowerCase();
  const correctText = question.type === "written" ? question.correctAnswer.toLowerCase() : question.options[question.correctIndex].toLowerCase();
  for (let i = 0; i < enWords.length; i++) {
    const en = enWords[i].toLowerCase();
    const es = (_b = (_a = esWords[i]) == null ? void 0 : _a.toLowerCase()) != null ? _b : "";
    if (text.includes(en) || text.includes(es) || correctText.includes(en) || correctText.includes(es)) {
      return true;
    }
  }
  return false;
}
function matchQuestionsToHouses(lesson, houses) {
  var _a;
  if (!houses.length) return;
  const assigned = /* @__PURE__ */ new Set();
  if ((_a = lesson.vocabulary) == null ? void 0 : _a.length) {
    for (const question of lesson.questions) {
      for (const house of houses) {
        const enWords = house.words;
        const esWords = house.vocabIndices.map((i) => lesson.vocabulary[i].es);
        if (questionMatchesWords(question, enWords, esWords)) {
          house.questionIds.push(question.id);
          assigned.add(question.id);
          break;
        }
      }
    }
    let robin = 0;
    for (const question of lesson.questions) {
      if (!assigned.has(question.id)) {
        houses[robin % houses.length].questionIds.push(question.id);
        robin++;
      }
    }
  } else {
    let robin = 0;
    for (const question of lesson.questions) {
      houses[robin % houses.length].questionIds.push(question.id);
      robin++;
    }
  }
}
function getLessonStreetHouses(lesson) {
  var _a, _b, _c;
  const hasVocab = Boolean((_a = lesson.vocabulary) == null ? void 0 : _a.length);
  const lessonWords = (_c = (_b = lesson.vocabulary) == null ? void 0 : _b.map((word) => word.en)) != null ? _c : getFallbackWords(lesson);
  const groups = chunkWords(lessonWords, 2);
  const safeGroups = groups.length ? groups : [[lesson.title]];
  const houses = safeGroups.map((words, index) => {
    const startVocabIndex = index * 2;
    const vocabIndices = hasVocab ? words.map((_, offset) => startVocabIndex + offset).filter((i) => {
      var _a2, _b2;
      return i < ((_b2 = (_a2 = lesson.vocabulary) == null ? void 0 : _a2.length) != null ? _b2 : 0);
    }) : [];
    return {
      id: `${lesson.id}-house-${index + 1}`,
      words,
      vocabIndices,
      questionIds: [],
      position: 16 + index * (64 / Math.max(safeGroups.length - 1, 1)),
      palette: HOUSE_PALETTES[index % HOUSE_PALETTES.length]
    };
  });
  matchQuestionsToHouses(lesson, houses);
  return houses;
}
function getHouseById(lessonId, houseId) {
  const lesson = LESSONS.find((l) => l.id === lessonId);
  if (!lesson) return void 0;
  return getLessonStreetHouses(lesson).find((h) => h.id === houseId);
}
function getStreetLessons() {
  return [...LESSONS].sort((left, right) => left.order - right.order);
}

export { _sfc_main$1 as _, getLessonStreetHouses as a, getMonsterForLesson as b, _sfc_main as c, getHouseById as d, getStreetLessons as g };
//# sourceMappingURL=aiworld-B_nHJR51.mjs.map
