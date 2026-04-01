import { _ as __nuxt_component_0 } from './nuxt-link-BJP5ALcC.mjs';
import { d as getHouseById, b as getMonsterForLesson, c as _sfc_main$2, _ as _sfc_main$1$1 } from './aiworld-B_nHJR51.mjs';
import { _ as _sfc_main$3 } from './KawaiiAvatar-CEnm2kPD.mjs';
import { defineComponent, computed, ref, unref, withCtx, createTextVNode, toDisplayString, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { a as getLessonById, g as getNextLesson } from './lessons-AvHbDgNI.mjs';
import { _ as _export_sfc, f as useRoute, u as useUserStore } from './server.mjs';
import { u as useProgressStore } from './progress-B0dhTRZl.mjs';
import { u as useAchievementsStore } from './achievements-Bs1z8zfY.mjs';
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
  __name: "ExerciseFeedback",
  __ssrInlineRender: true,
  props: {
    correct: { type: Boolean },
    correctAnswer: {},
    xp: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["rounded-2xl p-4 text-center font-bold transition-all", __props.correct ? "bg-emerald-50 border-2 border-emerald-300 text-emerald-700" : "bg-red-50 border-2 border-red-300 text-red-700"]
      }, _attrs))}><div class="text-2xl mb-1">${ssrInterpolate(__props.correct ? "\u2705" : "\u274C")}</div><p class="text-base font-black">${ssrInterpolate(__props.correct ? "\xA1Correcto!" : "\xA1Incorrecto!")}</p>`);
      if (!__props.correct) {
        _push(`<p class="text-sm mt-1 text-slate-600"> La respuesta correcta era: <strong>${ssrInterpolate(__props.correctAnswer)}</strong></p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.correct) {
        _push(`<p class="text-sm mt-1 opacity-80"> +${ssrInterpolate(__props.xp)} XP </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ExerciseFeedback.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const userStore = useUserStore();
    const progressStore = useProgressStore();
    useAchievementsStore();
    const lessonId = computed(() => route.params.id);
    const houseId = computed(() => route.query.house);
    const lesson = computed(() => getLessonById(lessonId.value));
    const house = computed(() => houseId.value ? getHouseById(lessonId.value, houseId.value) : null);
    const backUrl = computed(() => houseId.value ? "/aiworld" : "/learn");
    const questions = computed(() => {
      if (!lesson.value) return [];
      if (house.value) {
        const ids = new Set(house.value.questionIds);
        return lesson.value.questions.filter((q) => ids.has(q.id));
      }
      return lesson.value.questions;
    });
    const hostMonster = computed(() => getMonsterForLesson(lessonId.value));
    const vocabularyWords = computed(() => {
      var _a;
      if (!((_a = lesson.value) == null ? void 0 : _a.vocabulary)) return [];
      if (house.value) {
        return house.value.vocabIndices.map((i) => lesson.value.vocabulary[i]).filter(Boolean);
      }
      return lesson.value.vocabulary;
    });
    const letters = ["A", "B", "C", "D"];
    const phase = ref("exercise");
    const currentStepIndex = ref(0);
    const selectedIndex = ref(null);
    const answered = ref(false);
    const isRetryRound = ref(false);
    const hasCompletedRetry = ref(false);
    const retryQuestionIds = ref([]);
    const failedQuestionIds = ref([]);
    ref([]);
    const correctAnswers = ref(0);
    const xpEarned = ref(0);
    const starsEarned = ref(0);
    const pendingXp = ref(0);
    const recoveredXp = ref(0);
    const newAchievements = ref([]);
    const writtenAnswer = ref("");
    ref(null);
    const activeQuestions = computed(() => {
      if (!isRetryRound.value) return questions.value;
      const retryIds = new Set(retryQuestionIds.value);
      return questions.value.filter((question) => retryIds.has(question.id));
    });
    const exerciseSequence = computed(() => {
      const words = vocabularyWords.value;
      const qs = activeQuestions.value;
      if (isRetryRound.value || words.length === 0) {
        return qs.map((q, i) => ({ type: "question", question: q, questionIndex: i }));
      }
      const steps = [];
      const ratio = words.length / Math.max(qs.length, 1);
      let vocabIdx = 0;
      for (let qi = 0; qi < qs.length; qi++) {
        const targetVocab = Math.round((qi + 1) * ratio);
        while (vocabIdx < targetVocab && vocabIdx < words.length) {
          steps.push({ type: "vocab", word: words[vocabIdx], index: vocabIdx });
          vocabIdx++;
        }
        steps.push({ type: "question", question: qs[qi], questionIndex: qi });
      }
      while (vocabIdx < words.length) {
        steps.push({ type: "vocab", word: words[vocabIdx], index: vocabIdx });
        vocabIdx++;
      }
      return steps;
    });
    const currentStep = computed(() => exerciseSequence.value[currentStepIndex.value]);
    const currentQuestion = computed(() => {
      const step = currentStep.value;
      if ((step == null ? void 0 : step.type) === "question") return step.question;
      return null;
    });
    const totalQuestionCount = computed(() => questions.value.length);
    const questionLabel = computed(() => {
      const step = currentStep.value;
      if ((step == null ? void 0 : step.type) !== "question") return "";
      const prefix = isRetryRound.value ? "Reintento" : "Pregunta";
      return `${prefix} ${step.questionIndex + 1} de ${activeQuestions.value.length}`;
    });
    const questionPrompt = computed(() => {
      if (!currentQuestion.value) return "";
      const intro = isRetryRound.value ? "Vamos a repetir justo lo que se resisti\xF3 antes." : `${hostMonster.value.name} pregunta:`;
      return `${intro} ${currentQuestion.value.question}`;
    });
    const canRetryMistakes = computed(
      () => failedQuestionIds.value.length > 0 && !hasCompletedRetry.value
    );
    const missedQuestionsCount = computed(() => failedQuestionIds.value.length);
    const exerciseProgress = computed(() => {
      if (!exerciseSequence.value.length) return 0;
      return currentStepIndex.value / exerciseSequence.value.length * 100;
    });
    const isCorrect = computed(() => {
      var _a;
      if (!currentQuestion.value) return false;
      if (currentQuestion.value.type === "written") {
        const accepted = (_a = currentQuestion.value.acceptedAnswers) != null ? _a : [currentQuestion.value.correctAnswer];
        return accepted.some((a) => a.toLowerCase() === writtenAnswer.value.trim().toLowerCase());
      }
      return selectedIndex.value === currentQuestion.value.correctIndex;
    });
    const correctAnswerText = computed(() => {
      if (!currentQuestion.value) return "";
      if (currentQuestion.value.type === "written") return currentQuestion.value.correctAnswer;
      return currentQuestion.value.options[currentQuestion.value.correctIndex];
    });
    const writtenInputClass = computed(() => {
      if (!answered.value) return "border-slate-200 focus-within:border-sky-400";
      if (isCorrect.value) return "border-emerald-400 bg-emerald-50";
      return "border-red-400 bg-red-50";
    });
    const resultEmoji = computed(() => {
      if (starsEarned.value === 3) return "\u{1F389}";
      if (starsEarned.value === 2) return "\u{1F60A}";
      return "\u{1F4AA}";
    });
    const resultTitle = computed(() => {
      if (starsEarned.value === 3) return "\xA1Perfecto!";
      if (starsEarned.value === 2) return "\xA1Bien hecho!";
      return "\xA1Sigue practicando!";
    });
    const nextLessonId = computed(() => {
      var _a;
      const next2 = getNextLesson(progressStore.completedLessons);
      return (_a = next2 == null ? void 0 : next2.id) != null ? _a : null;
    });
    function optionClass(i) {
      if (!currentQuestion.value) return "border-slate-200";
      if (!answered.value) {
        return "border-slate-200 hover:border-sky-400 hover:bg-sky-50";
      }
      if (i === currentQuestion.value.correctIndex) {
        return "border-emerald-400 bg-emerald-50 text-emerald-700";
      }
      if (i === selectedIndex.value) {
        return "border-red-400 bg-red-50 text-red-700 animate-shake";
      }
      return "border-slate-200 opacity-60";
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_KawaiiMonster = _sfc_main$2;
      const _component_ComicBubble = _sfc_main$1$1;
      const _component_KawaiiAvatar = _sfc_main$3;
      const _component_ExerciseFeedback = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-7a2da977>`);
      if (unref(phase) === "exercise") {
        _push(`<div class="space-y-5" data-v-7a2da977><div class="flex items-center gap-3" data-v-7a2da977>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(backUrl),
          class: "text-slate-400 hover:text-slate-600 text-xl font-bold leading-none"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u2715 `);
            } else {
              return [
                createTextVNode(" \u2715 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden" data-v-7a2da977><div class="h-full bg-sky-400 rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: `${unref(exerciseProgress)}%` })}" data-v-7a2da977></div></div><span class="text-xs font-bold text-slate-400" data-v-7a2da977>${ssrInterpolate(unref(currentStepIndex) + 1)}/${ssrInterpolate(unref(exerciseSequence).length)}</span></div>`);
        if (((_a = unref(currentStep)) == null ? void 0 : _a.type) === "vocab") {
          _push(`<!--[--><div class="overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-gradient-to-br from-sky-100 via-cyan-50 to-amber-100 p-4 shadow-[0_10px_0_0_theme(colors.sky.100)] animate-fade-up" data-v-7a2da977><p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-500" data-v-7a2da977> \u{1F4D6} Vocabulario </p><div class="mt-4 flex flex-col items-center gap-2" data-v-7a2da977><span class="text-3xl font-black text-slate-800" data-v-7a2da977>${ssrInterpolate(unref(currentStep).word.en)}</span><span class="text-lg text-slate-500" data-v-7a2da977>${ssrInterpolate(unref(currentStep).word.es)}</span>`);
          if (unref(currentStep).word.example) {
            _push(`<p class="text-sm text-slate-400 italic mt-1" data-v-7a2da977> &quot;${ssrInterpolate(unref(currentStep).word.example)}&quot; </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><button class="btn-primary w-full" data-v-7a2da977> Continuar \u2192 </button><!--]-->`);
        } else if (((_b = unref(currentStep)) == null ? void 0 : _b.type) === "question") {
          _push(`<!--[--><div class="overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-gradient-to-br from-white via-sky-50 to-amber-50 p-4 shadow-[0_10px_0_0_theme(colors.slate.200)] animate-fade-up" data-v-7a2da977><div class="flex items-center justify-between gap-3" data-v-7a2da977><p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-500" data-v-7a2da977>${ssrInterpolate(unref(questionLabel))}</p><span class="rounded-full border-2 border-slate-800 bg-white px-3 py-1 text-xs font-black text-slate-500" data-v-7a2da977>${ssrInterpolate(unref(currentStep).question.type === "written" ? "Escribe la respuesta" : "Elige la respuesta correcta")}</span></div><div class="mt-4 grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-end" data-v-7a2da977>`);
          _push(ssrRenderComponent(_component_KawaiiMonster, {
            monster: unref(hostMonster),
            size: "sm"
          }, null, _parent));
          _push(ssrRenderComponent(_component_ComicBubble, {
            label: `${unref(hostMonster).name} dice`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(questionPrompt))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(questionPrompt)), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div class="hidden md:block" data-v-7a2da977>`);
          _push(ssrRenderComponent(_component_KawaiiAvatar, {
            avatar: unref(userStore).avatar,
            size: "sm"
          }, null, _parent));
          _push(`</div></div></div>`);
          if (unref(currentStep).question.type === "multiple-choice") {
            _push(`<div class="space-y-3" data-v-7a2da977><!--[-->`);
            ssrRenderList(unref(currentStep).question.options, (option, i) => {
              _push(`<button class="${ssrRenderClass([optionClass(i), "w-full text-left px-5 py-4 rounded-2xl border-2 font-bold text-base transition-all"])}"${ssrIncludeBooleanAttr(unref(answered)) ? " disabled" : ""} data-v-7a2da977><span class="text-slate-400 font-black mr-2" data-v-7a2da977>${ssrInterpolate(letters[i])}.</span> ${ssrInterpolate(option)}</button>`);
            });
            _push(`<!--]--></div>`);
          } else if (unref(currentStep).question.type === "written") {
            _push(`<div class="space-y-3" data-v-7a2da977><div class="${ssrRenderClass([unref(writtenInputClass), "rounded-2xl border-2 px-5 py-4 transition-all"])}" data-v-7a2da977><input${ssrRenderAttr("value", unref(writtenAnswer))} type="text" class="w-full bg-transparent text-lg font-bold text-slate-800 outline-none placeholder:text-slate-300" placeholder="Escribe tu respuesta aqu\xED\u2026"${ssrIncludeBooleanAttr(unref(answered)) ? " disabled" : ""} data-v-7a2da977></div>`);
            if (!unref(answered)) {
              _push(`<button class="btn-primary w-full"${ssrIncludeBooleanAttr(!unref(writtenAnswer).trim()) ? " disabled" : ""} data-v-7a2da977> Comprobar \u2713 </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(answered)) {
            _push(ssrRenderComponent(_component_ExerciseFeedback, {
              correct: unref(isCorrect),
              "correct-answer": unref(correctAnswerText),
              xp: unref(currentStep).question.xpReward
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(answered)) {
            _push(`<button class="btn-primary w-full animate-fade-up" data-v-7a2da977>${ssrInterpolate(unref(currentStepIndex) < unref(exerciseSequence).length - 1 ? "Siguiente \u2192" : "Ver resultado \u{1F389}")}</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else if (unref(phase) === "result") {
        _push(`<div class="space-y-5 animate-bounce-in" data-v-7a2da977><div class="card text-center py-8" data-v-7a2da977><div class="text-5xl mb-3" data-v-7a2da977>${ssrInterpolate(unref(resultEmoji))}</div><h1 class="text-2xl font-black text-slate-800 mb-1" data-v-7a2da977>${ssrInterpolate(unref(resultTitle))}</h1><div class="flex justify-center gap-1 mb-4" data-v-7a2da977><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<span class="${ssrRenderClass([i <= unref(starsEarned) ? "opacity-100" : "opacity-25", "text-2xl"])}" data-v-7a2da977>\u2B50</span>`);
        });
        _push(`<!--]--></div><p class="text-slate-500 text-sm" data-v-7a2da977> Respondiste <strong class="text-slate-700" data-v-7a2da977>${ssrInterpolate(unref(correctAnswers))}/${ssrInterpolate(unref(totalQuestionCount))}</strong> correctamente </p></div><div class="card bg-sky-50 border-sky-200 border-2 text-center" data-v-7a2da977><p class="text-slate-500 text-sm mb-1" data-v-7a2da977> XP ganado esta lecci\xF3n </p><div class="text-3xl font-black text-sky-600" data-v-7a2da977> +${ssrInterpolate(unref(xpEarned))} XP \u26A1 </div></div>`);
        if (unref(missedQuestionsCount) || unref(recoveredXp)) {
          _push(`<div class="card border-2 border-dashed border-amber-300 bg-amber-50" data-v-7a2da977><p class="text-xs font-black uppercase tracking-wide text-amber-600" data-v-7a2da977> Segunda oportunidad </p><p class="mt-2 text-sm text-slate-600" data-v-7a2da977>${ssrInterpolate(unref(canRetryMistakes) ? `Todav\xEDa puedes repetir ${unref(missedQuestionsCount)} ${unref(missedQuestionsCount) === 1 ? "pregunta" : "preguntas"} fallada${unref(missedQuestionsCount) === 1 ? "" : "s"} y recuperar hasta ${unref(pendingXp)} XP.` : `Has recuperado ${unref(recoveredXp)} XP en el repaso. ${unref(pendingXp) ? `A\xFAn quedan ${unref(pendingXp)} XP sin ganar.` : "Ya no quedan errores pendientes en esta lecci\xF3n."}`)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(newAchievements).length) {
          _push(`<div class="card border-2 border-amber-200 bg-amber-50" data-v-7a2da977><p class="text-xs font-black text-amber-600 uppercase tracking-wide mb-3" data-v-7a2da977> \u{1F3C6} \xA1Logros desbloqueados! </p><!--[-->`);
          ssrRenderList(unref(newAchievements), (ach) => {
            _push(`<div class="flex items-center gap-3 mb-2 last:mb-0" data-v-7a2da977><span class="text-2xl" data-v-7a2da977>${ssrInterpolate(ach.icon)}</span><div data-v-7a2da977><p class="font-black text-slate-800 text-sm" data-v-7a2da977>${ssrInterpolate(ach.title)}</p><p class="text-xs text-slate-500" data-v-7a2da977>${ssrInterpolate(ach.description)}</p></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(canRetryMistakes)) {
          _push(`<button class="btn-primary w-full" data-v-7a2da977> Repetir solo mis fallos \u{1F3AF} </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-2 gap-3" data-v-7a2da977>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(backUrl),
          class: "btn-secondary text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Ver lecciones `);
            } else {
              return [
                createTextVNode(" Ver lecciones ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(houseId)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/aiworld",
            class: "btn-primary text-center"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Volver a la calle \u2192 `);
              } else {
                return [
                  createTextVNode(" Volver a la calle \u2192 ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else if (unref(nextLessonId)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/lesson/${unref(nextLessonId)}`,
            class: "btn-primary text-center"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Siguiente \u2192 `);
              } else {
                return [
                  createTextVNode(" Siguiente \u2192 ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/",
            class: "btn-primary text-center"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Inicio \u{1F3E0} `);
              } else {
                return [
                  createTextVNode(" Inicio \u{1F3E0} ")
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(`</div></div>`);
      } else {
        _push(`<div class="text-center py-20 text-slate-400" data-v-7a2da977><p class="text-4xl mb-3" data-v-7a2da977> \u{1F615} </p><p class="font-bold" data-v-7a2da977> Lecci\xF3n no encontrada </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(backUrl),
          class: "btn-secondary mt-4 inline-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Volver `);
            } else {
              return [
                createTextVNode(" Volver ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/lesson/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7a2da977"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-0hOrpTq7.mjs.map
