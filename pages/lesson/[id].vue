<template>
  <div>
    <!-- Pantalla de ejercicio -->
    <div
      v-if="phase === 'exercise'"
      class="space-y-5"
    >
      <!-- Header de la sesión -->
      <div class="flex items-center gap-3">
        <NuxtLink
          :to="backUrl"
          class="text-slate-400 hover:text-slate-600 text-xl font-bold leading-none"
        >
          ✕
        </NuxtLink>
        <div class="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-sky-400 rounded-full transition-all duration-500"
            :style="{ width: `${exerciseProgress}%` }"
          ></div>
        </div>
        <span class="text-xs font-bold text-slate-400">{{ currentStepIndex + 1 }}/{{ exerciseSequence.length }}</span>
      </div>

      <!-- Vocab card -->
      <template v-if="currentStep?.type === 'vocab'">
        <div
          :key="`vocab-${currentStepIndex}`"
          class="overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-gradient-to-br from-sky-100 via-cyan-50 to-amber-100 p-4 shadow-[0_10px_0_0_theme(colors.sky.100)] animate-fade-up"
        >
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
            📖 Vocabulario
          </p>
          <div class="mt-4 flex flex-col items-center gap-2">
            <span class="text-3xl font-black text-slate-800">{{ currentStep.word.en }}</span>
            <span class="text-lg text-slate-500">{{ currentStep.word.es }}</span>
            <p
              v-if="currentStep.word.example"
              class="text-sm text-slate-400 italic mt-1"
            >
              "{{ currentStep.word.example }}"
            </p>
          </div>
        </div>
        <button
          class="btn-primary w-full"
          @click="advanceStep"
        >
          Continuar →
        </button>
      </template>

      <!-- Question -->
      <template v-else-if="currentStep?.type === 'question'">
        <!-- Pregunta -->
        <div
          :key="`q-${currentStepIndex}`"
          class="overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-gradient-to-br from-white via-sky-50 to-amber-50 p-4 shadow-[0_10px_0_0_theme(colors.slate.200)] animate-fade-up"
        >
          <div class="flex items-center justify-between gap-3">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
              {{ questionLabel }}
            </p>
            <span class="rounded-full border-2 border-slate-800 bg-white px-3 py-1 text-xs font-black text-slate-500">
              {{ typeLabel }}
            </span>
          </div>

          <div class="mt-4 grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-end">
            <KawaiiMonster
              :monster="hostMonster"
              size="sm"
            />

            <ComicBubble :label="`${hostMonster.name} dice`">
              {{ questionPrompt }}
            </ComicBubble>

            <div class="hidden md:block">
              <AvatarIllustration
                :avatar="userStore.avatar"
                size="sm"
              />
            </div>
          </div>
        </div>

        <!-- Opciones (multiple choice) -->
        <div
          v-if="currentStep.question.type === 'multiple-choice'"
          :key="`opts-${currentStepIndex}`"
          class="space-y-3"
        >
          <button
            v-for="(option, i) in currentStep.question.options"
            :key="i"
            class="w-full text-left px-5 py-4 rounded-2xl border-2 font-bold text-base transition-all"
            :class="optionClass(i)"
            :disabled="answered"
            @click="selectAnswer(i)"
          >
            <span class="text-slate-400 font-black mr-2">{{ letters[i] }}.</span>
            {{ option }}
          </button>
        </div>

        <!-- Input escrito (written) -->
        <div
          v-else-if="currentStep.question.type === 'written'"
          :key="`write-${currentStepIndex}`"
          class="space-y-3"
        >
          <div
            class="rounded-2xl border-2 px-5 py-4 transition-all"
            :class="writtenInputClass"
          >
            <input
              ref="writtenInputRef"
              v-model="writtenAnswer"
              type="text"
              class="w-full bg-transparent text-lg font-bold text-slate-800 outline-none placeholder:text-slate-300"
              placeholder="Escribe tu respuesta aquí…"
              :disabled="answered"
              @keyup.enter="submitWrittenAnswer"
            />
          </div>
          <button
            v-if="!answered"
            class="btn-primary w-full"
            :disabled="!writtenAnswer.trim()"
            @click="submitWrittenAnswer"
          >
            Comprobar ✓
          </button>
        </div>

        <!-- Banco de palabras (word-bank) -->
        <div
          v-else-if="currentStep.question.type === 'word-bank'"
          :key="`wb-${currentStepIndex}`"
          class="space-y-3"
        >
          <!-- Respuesta que se construye -->
          <div
            class="min-h-[3.5rem] rounded-2xl border-2 px-4 py-3 flex flex-wrap items-center gap-2 transition-all"
            :class="wordBankInputClass"
          >
            <button
              v-for="i in wordBankPicked"
              :key="`picked-${i}`"
              class="rounded-xl border-2 border-slate-800 bg-white px-3 py-1.5 text-sm font-bold text-slate-700 shadow-[0_3px_0_0_theme(colors.slate.200)] disabled:opacity-100"
              :disabled="answered"
              @click="unpickTile(i)"
            >
              {{ wordBankTiles[i] }}
            </button>
            <span
              v-if="!wordBankPicked.length"
              class="text-sm font-semibold text-slate-300"
            >
              Toca las palabras en orden…
            </span>
          </div>

          <!-- Fichas disponibles -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tile in wordBankAvailable"
              :key="`tile-${tile.index}`"
              class="rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition-all hover:border-sky-400 hover:bg-sky-50"
              :disabled="answered"
              @click="pickTile(tile.index)"
            >
              {{ tile.value }}
            </button>
          </div>

          <button
            v-if="!answered"
            class="btn-primary w-full"
            :disabled="!wordBankPicked.length"
            @click="submitWordBank"
          >
            Comprobar ✓
          </button>
        </div>

        <!-- Emparejar palabras (matching) -->
        <div
          v-else-if="currentStep.question.type === 'matching'"
          :key="`match-${currentStepIndex}`"
          class="grid grid-cols-2 gap-3"
        >
          <div class="space-y-3">
            <button
              v-for="item in matchEnItems"
              :key="`en-${item.index}`"
              class="w-full px-4 py-3 rounded-2xl border-2 font-bold text-base transition-all"
              :class="matchEnClass(item.index)"
              :disabled="answered || matchResolved.includes(item.index)"
              @click="selectMatchEn(item.index)"
            >
              {{ item.text }}
            </button>
          </div>
          <div class="space-y-3">
            <button
              v-for="item in matchEsItems"
              :key="`es-${item.index}`"
              class="w-full px-4 py-3 rounded-2xl border-2 font-bold text-base transition-all"
              :class="matchEsClass(item.index)"
              :disabled="answered || matchResolved.includes(item.index)"
              @click="selectMatchEs(item.index)"
            >
              {{ item.text }}
            </button>
          </div>
        </div>

        <!-- Feedback -->
        <Transition name="slide-up">
          <ExerciseFeedback
            v-if="answered"
            :correct="isCorrect"
            :correct-answer="correctAnswerText"
            :xp="currentStep.question.xpReward"
          />
        </Transition>

        <!-- Continuar -->
        <button
          v-if="answered"
          class="btn-primary w-full animate-fade-up"
          @click="next"
        >
          {{ currentStepIndex < exerciseSequence.length - 1 ? 'Siguiente →' : 'Ver resultado 🎉' }}
        </button>
      </template>
    </div>

    <!-- Pantalla de resultado -->
    <div
      v-else-if="phase === 'result'"
      class="space-y-5 animate-bounce-in"
    >
      <div class="card text-center py-8">
        <div class="text-5xl mb-3">
          {{ resultEmoji }}
        </div>
        <h1 class="text-2xl font-black text-slate-800 mb-1">
          {{ resultTitle }}
        </h1>
        <div class="flex justify-center gap-1 mb-4">
          <span
            v-for="i in 3"
            :key="i"
            class="text-2xl"
            :class="i <= starsEarned ? 'opacity-100' : 'opacity-25'"
          >⭐</span>
        </div>
        <p class="text-slate-500 text-sm">
          Respondiste <strong class="text-slate-700">{{ correctAnswers }}/{{ totalQuestionCount }}</strong> correctamente
        </p>
      </div>

      <!-- XP ganado -->
      <div class="card bg-sky-50 border-sky-200 border-2 text-center">
        <p class="text-slate-500 text-sm mb-1">
          XP ganado esta lección
        </p>
        <div class="text-3xl font-black text-sky-600">
          +{{ xpEarned }} XP ⚡
        </div>
      </div>

      <div
        v-if="missedQuestionsCount || recoveredXp"
        class="card border-2 border-dashed border-amber-300 bg-amber-50"
      >
        <p class="text-xs font-black uppercase tracking-wide text-amber-600">
          Segunda oportunidad
        </p>
        <p class="mt-2 text-sm text-slate-600">
          {{ canRetryMistakes ? `Todavía puedes repetir ${missedQuestionsCount} ${missedQuestionsCount === 1 ? 'pregunta' : 'preguntas'} fallada${missedQuestionsCount === 1 ? '' : 's'} y recuperar hasta ${pendingXp} XP.` : `Has recuperado ${recoveredXp} XP en el repaso. ${pendingXp ? `Aún quedan ${pendingXp} XP sin ganar.` : 'Ya no quedan errores pendientes en esta lección.'}` }}
        </p>
      </div>

      <!-- Logros recientes -->
      <div
        v-if="newAchievements.length"
        class="card border-2 border-amber-200 bg-amber-50"
      >
        <p class="text-xs font-black text-amber-600 uppercase tracking-wide mb-3">
          🏆 ¡Logros desbloqueados!
        </p>
        <div
          v-for="ach in newAchievements"
          :key="ach.id"
          class="flex items-center gap-3 mb-2 last:mb-0"
        >
          <span class="text-2xl">{{ ach.icon }}</span>
          <div>
            <p class="font-black text-slate-800 text-sm">
              {{ ach.title }}
            </p>
            <p class="text-xs text-slate-500">
              {{ ach.description }}
            </p>
          </div>
        </div>
      </div>

      <button
        v-if="canRetryMistakes"
        class="btn-primary w-full"
        @click="startRetryLesson"
      >
        Repetir solo mis fallos 🎯
      </button>

      <div class="grid grid-cols-2 gap-3">
        <NuxtLink
          :to="backUrl"
          class="btn-secondary text-center"
        >
          Ver lecciones
        </NuxtLink>
        <NuxtLink
          v-if="houseId"
          to="/aiworld"
          class="btn-primary text-center"
        >
          Volver a la calle →
        </NuxtLink>
        <NuxtLink
          v-else-if="nextLessonId"
          :to="`/lesson/${nextLessonId}`"
          class="btn-primary text-center"
        >
          Siguiente →
        </NuxtLink>
        <NuxtLink
          v-else
          to="/"
          class="btn-primary text-center"
        >
          Inicio 🏠
        </NuxtLink>
      </div>
    </div>

    <!-- Loading / not found -->
    <div
      v-else
      class="text-center py-20 text-slate-400"
    >
      <p class="text-4xl mb-3">
        😕
      </p>
      <p class="font-bold">
        Lección no encontrada
      </p>
      <NuxtLink
        :to="backUrl"
        class="btn-secondary mt-4 inline-block"
      >
        Volver
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLessonById, getNextLesson, type Lesson, type Question, type VocabWord } from '~/data/lessons'
import { getMonsterForLesson } from '~/data/monsters'
import { getAchievementById, type Achievement } from '~/data/achievements'
import { getHouseById } from '~/data/aiworld'

type ExerciseStep =
  | { type: 'vocab'; word: VocabWord; index: number }
  | { type: 'question'; question: Question; questionIndex: number }

const route = useRoute()
const userStore = useUserStore()
const progressStore = useProgressStore()
const achievementsStore = useAchievementsStore()

const lessonId = computed(() => route.params.id as string)
const houseId = computed(() => route.query.house as string | undefined)
const lesson = computed<Lesson | undefined>(() => getLessonById(lessonId.value))
const house = computed(() => houseId.value ? getHouseById(lessonId.value, houseId.value) : null)
const backUrl = computed(() => houseId.value ? '/aiworld' : '/learn')
const questions = computed(() => {
  if (!lesson.value) return []
  if (house.value) {
    const ids = new Set(house.value.questionIds)
    return lesson.value.questions.filter((q) => ids.has(q.id))
  }
  return lesson.value.questions
})
const hostMonster = computed(() => getMonsterForLesson(lessonId.value))
const vocabularyWords = computed(() => {
  if (!lesson.value?.vocabulary) return []
  if (house.value) {
    return house.value.vocabIndices.map((i) => lesson.value!.vocabulary![i]).filter(Boolean)
  }
  return lesson.value.vocabulary
})

const letters = ['A', 'B', 'C', 'D']

// ── State ──────────────────────────────────────────────────────────────────
const phase = ref<'exercise' | 'result' | 'notfound'>('exercise')
const currentStepIndex = ref(0)
const selectedIndex = ref<number | null>(null)
const answered = ref(false)
const isRetryRound = ref(false)
const hasCompletedRetry = ref(false)
const retryQuestionIds = ref<string[]>([])
const failedQuestionIds = ref<string[]>([])
const retryMistakeIds = ref<string[]>([])
const correctAnswers = ref(0)
const xpEarned = ref(0)
const starsEarned = ref(0)
const pendingXp = ref(0)
const recoveredXp = ref(0)
const newAchievements = ref<Achievement[]>([])
const writtenAnswer = ref('')
const wordBankPicked = ref<number[]>([])
const matchSelectedEn = ref<number | null>(null)
const matchResolved = ref<number[]>([])
const matchWrongEn = ref<number | null>(null)
const matchWrongEs = ref<number | null>(null)

// ── Cronómetro de tiempo activo en la lección ───────────────────────────────
const sessionId = ref('')
const activeMs = ref(0)
const lastResumeTs = ref<number | null>(null)

function startTimer() {
  if (lastResumeTs.value === null) lastResumeTs.value = Date.now()
}

function pauseTimer() {
  if (lastResumeTs.value !== null) {
    activeMs.value += Date.now() - lastResumeTs.value
    lastResumeTs.value = null
  }
}

function elapsedSeconds(): number {
  const running = lastResumeTs.value !== null ? Date.now() - lastResumeTs.value : 0
  return Math.round((activeMs.value + running) / 1000)
}

function handleVisibility() {
  if (document.hidden) pauseTimer()
  else startTimer()
}
const writtenInputRef = ref<HTMLInputElement | null>(null)

// ── Computed ───────────────────────────────────────────────────────────────
const activeQuestions = computed(() => {
  if (!isRetryRound.value) return questions.value

  const retryIds = new Set(retryQuestionIds.value)
  return questions.value.filter((question) => retryIds.has(question.id))
})

const exerciseSequence = computed<ExerciseStep[]>(() => {
  const words = vocabularyWords.value
  const qs = activeQuestions.value

  if (isRetryRound.value || words.length === 0) {
    return qs.map((q, i) => ({ type: 'question' as const, question: q, questionIndex: i }))
  }

  const steps: ExerciseStep[] = []
  const ratio = words.length / Math.max(qs.length, 1)
  let vocabIdx = 0

  for (let qi = 0; qi < qs.length; qi++) {
    const targetVocab = Math.round((qi + 1) * ratio)
    while (vocabIdx < targetVocab && vocabIdx < words.length) {
      steps.push({ type: 'vocab', word: words[vocabIdx]!, index: vocabIdx })
      vocabIdx++
    }
    steps.push({ type: 'question', question: qs[qi]!, questionIndex: qi })
  }
  while (vocabIdx < words.length) {
    steps.push({ type: 'vocab', word: words[vocabIdx]!, index: vocabIdx })
    vocabIdx++
  }

  return steps
})

const currentStep = computed(() => exerciseSequence.value[currentStepIndex.value])

const currentQuestion = computed(() => {
  const step = currentStep.value
  if (step?.type === 'question') return step.question
  return null
})

const totalQuestionCount = computed(() => questions.value.length)

const questionLabel = computed(() => {
  const step = currentStep.value
  if (step?.type !== 'question') return ''
  const prefix = isRetryRound.value ? 'Reintento' : 'Pregunta'
  return `${prefix} ${step.questionIndex + 1} de ${activeQuestions.value.length}`
})

const questionPrompt = computed(() => {
  if (!currentQuestion.value) return ''

  const intro = isRetryRound.value ? 'Vamos a repetir justo lo que se resistió antes.' : `${hostMonster.value.name} pregunta:`
  return `${intro} ${currentQuestion.value.question}`
})

const canRetryMistakes = computed(
  () => failedQuestionIds.value.length > 0 && !hasCompletedRetry.value,
)

const missedQuestionsCount = computed(() => failedQuestionIds.value.length)

const exerciseProgress = computed(() => {
  if (!exerciseSequence.value.length) return 0
  return (currentStepIndex.value / exerciseSequence.value.length) * 100
})

const isCorrect = computed(() => {
  if (!currentQuestion.value) return false
  if (currentQuestion.value.type === 'written') {
    const accepted = currentQuestion.value.acceptedAnswers ?? [currentQuestion.value.correctAnswer]
    return accepted.some((a) => a.toLowerCase() === writtenAnswer.value.trim().toLowerCase())
  }
  if (currentQuestion.value.type === 'word-bank') {
    const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ')
    return normalize(wordBankSentence.value) === normalize(currentQuestion.value.correctAnswer)
  }
  if (currentQuestion.value.type === 'matching') {
    return matchResolved.value.length === currentQuestion.value.pairs.length
  }
  return selectedIndex.value === currentQuestion.value.correctIndex
})

const correctAnswerText = computed(() => {
  if (!currentQuestion.value) return ''
  if (currentQuestion.value.type === 'written') return currentQuestion.value.correctAnswer
  if (currentQuestion.value.type === 'word-bank') return currentQuestion.value.correctAnswer
  if (currentQuestion.value.type === 'matching') return ''
  return currentQuestion.value.options[currentQuestion.value.correctIndex]
})

const writtenInputClass = computed(() => {
  if (!answered.value) return 'border-slate-200 focus-within:border-sky-400'
  if (isCorrect.value) return 'border-emerald-400 bg-emerald-50'
  return 'border-red-400 bg-red-50'
})

const typeLabel = computed(() => {
  const type = currentQuestion.value?.type
  if (type === 'written') return 'Escribe la respuesta'
  if (type === 'word-bank') return 'Ordena las palabras'
  if (type === 'matching') return 'Empareja las palabras'
  return 'Elige la respuesta correcta'
})

const wordBankTiles = computed<string[]>(() => {
  const question = currentQuestion.value
  if (!question || question.type !== 'word-bank') return []
  const tokens = [...question.correctAnswer.split(' '), ...(question.distractors ?? [])]
  return seededShuffle(tokens, question.id)
})

const wordBankAvailable = computed(() =>
  wordBankTiles.value
    .map((value, index) => ({ value, index }))
    .filter((tile) => !wordBankPicked.value.includes(tile.index)),
)

const wordBankSentence = computed(() =>
  wordBankPicked.value.map((i) => wordBankTiles.value[i] ?? '').join(' '),
)

const wordBankInputClass = computed(() => {
  if (!answered.value) return 'border-slate-200'
  if (isCorrect.value) return 'border-emerald-400 bg-emerald-50'
  return 'border-red-400 bg-red-50'
})

const matchEnItems = computed(() => {
  const question = currentQuestion.value
  if (!question || question.type !== 'matching') return []
  return seededShuffle(question.pairs.map((pair, index) => ({ text: pair.en, index })), `${question.id}-en`)
})

const matchEsItems = computed(() => {
  const question = currentQuestion.value
  if (!question || question.type !== 'matching') return []
  return seededShuffle(question.pairs.map((pair, index) => ({ text: pair.es, index })), `${question.id}-es`)
})

const resultEmoji = computed(() => {
  if (starsEarned.value === 3) return '🎉'
  if (starsEarned.value === 2) return '😊'
  return '💪'
})

const resultTitle = computed(() => {
  if (starsEarned.value === 3) return '¡Perfecto!'
  if (starsEarned.value === 2) return '¡Bien hecho!'
  return '¡Sigue practicando!'
})

const nextLessonId = computed(() => {
  const next = getNextLesson(progressStore.completedLessons)
  return next?.id ?? null
})

// ── Methods ────────────────────────────────────────────────────────────────
function optionClass(i: number): string {
  if (!currentQuestion.value) return 'border-slate-200'
  if (!answered.value) {
    return 'border-slate-200 hover:border-sky-400 hover:bg-sky-50'
  }
  if (currentQuestion.value.type === 'multiple-choice' && i === currentQuestion.value.correctIndex) {
    return 'border-emerald-400 bg-emerald-50 text-emerald-700'
  }
  if (i === selectedIndex.value) {
    return 'border-red-400 bg-red-50 text-red-700 animate-shake'
  }
  return 'border-slate-200 opacity-60'
}

function mergeAchievements(unlockedIds: string[]) {
  const knownIds = new Set(newAchievements.value.map((achievement) => achievement.id))
  const mapped = unlockedIds
    .map((id) => getAchievementById(id))
    .filter(Boolean)
    .filter((achievement) => !knownIds.has((achievement as Achievement).id)) as Achievement[]

  newAchievements.value = [...newAchievements.value, ...mapped]
}

function advanceStep() {
  if (currentStepIndex.value < exerciseSequence.value.length - 1) {
    currentStepIndex.value += 1
  } else {
    finishLesson()
  }
}

function selectAnswer(i: number) {
  if (answered.value || !currentQuestion.value) return
  selectedIndex.value = i
  answered.value = true

  if (isCorrect.value) {
    correctAnswers.value += 1
    xpEarned.value += currentQuestion.value.xpReward
    if (isRetryRound.value) {
      recoveredXp.value += currentQuestion.value.xpReward
      pendingXp.value = Math.max(pendingXp.value - currentQuestion.value.xpReward, 0)
    }
    return
  }

  if (isRetryRound.value) {
    if (!retryMistakeIds.value.includes(currentQuestion.value.id)) {
      retryMistakeIds.value.push(currentQuestion.value.id)
    }
    return
  }

  if (!failedQuestionIds.value.includes(currentQuestion.value.id)) {
    failedQuestionIds.value.push(currentQuestion.value.id)
    pendingXp.value += currentQuestion.value.xpReward
  }
}

function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const rand = () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    const tmp = arr[i]!
    arr[i] = arr[j]!
    arr[j] = tmp
  }
  return arr
}

function pickTile(index: number) {
  if (answered.value) return
  if (!wordBankPicked.value.includes(index)) wordBankPicked.value.push(index)
}

function unpickTile(index: number) {
  if (answered.value) return
  wordBankPicked.value = wordBankPicked.value.filter((i) => i !== index)
}

function matchEnClass(index: number): string {
  if (matchResolved.value.includes(index)) return 'border-emerald-400 bg-emerald-50 text-emerald-700 opacity-70'
  if (matchWrongEn.value === index) return 'border-red-400 bg-red-50 text-red-700 animate-shake'
  if (matchSelectedEn.value === index) return 'border-sky-400 bg-sky-50 text-sky-700'
  return 'border-slate-200 hover:border-sky-400 hover:bg-sky-50'
}

function matchEsClass(index: number): string {
  if (matchResolved.value.includes(index)) return 'border-emerald-400 bg-emerald-50 text-emerald-700 opacity-70'
  if (matchWrongEs.value === index) return 'border-red-400 bg-red-50 text-red-700 animate-shake'
  return 'border-slate-200 hover:border-sky-400 hover:bg-sky-50'
}

function selectMatchEn(index: number) {
  if (answered.value || matchResolved.value.includes(index)) return
  matchSelectedEn.value = index
}

function selectMatchEs(index: number) {
  if (answered.value || matchResolved.value.includes(index)) return
  if (matchSelectedEn.value === null || !currentQuestion.value) return

  const enIndex = matchSelectedEn.value
  matchSelectedEn.value = null

  if (enIndex === index) {
    matchResolved.value.push(index)
    if (matchResolved.value.length === currentQuestion.value.pairs.length) {
      answered.value = true
      correctAnswers.value += 1
      xpEarned.value += currentQuestion.value.xpReward
      if (isRetryRound.value) {
        recoveredXp.value += currentQuestion.value.xpReward
        pendingXp.value = Math.max(pendingXp.value - currentQuestion.value.xpReward, 0)
      }
    }
    return
  }

  matchWrongEn.value = enIndex
  matchWrongEs.value = index
  setTimeout(() => {
    matchWrongEn.value = null
    matchWrongEs.value = null
  }, 500)
}

function submitWordBank() {
  if (answered.value || !wordBankPicked.value.length || !currentQuestion.value) return
  answered.value = true

  if (isCorrect.value) {
    correctAnswers.value += 1
    xpEarned.value += currentQuestion.value.xpReward
    if (isRetryRound.value) {
      recoveredXp.value += currentQuestion.value.xpReward
      pendingXp.value = Math.max(pendingXp.value - currentQuestion.value.xpReward, 0)
    }
    return
  }

  if (isRetryRound.value) {
    if (!retryMistakeIds.value.includes(currentQuestion.value.id)) {
      retryMistakeIds.value.push(currentQuestion.value.id)
    }
    return
  }

  if (!failedQuestionIds.value.includes(currentQuestion.value.id)) {
    failedQuestionIds.value.push(currentQuestion.value.id)
    pendingXp.value += currentQuestion.value.xpReward
  }
}

function submitWrittenAnswer() {
  if (answered.value || !writtenAnswer.value.trim() || !currentQuestion.value) return
  answered.value = true

  if (isCorrect.value) {
    correctAnswers.value += 1
    xpEarned.value += currentQuestion.value.xpReward
    if (isRetryRound.value) {
      recoveredXp.value += currentQuestion.value.xpReward
      pendingXp.value = Math.max(pendingXp.value - currentQuestion.value.xpReward, 0)
    }
    return
  }

  if (isRetryRound.value) {
    if (!retryMistakeIds.value.includes(currentQuestion.value.id)) {
      retryMistakeIds.value.push(currentQuestion.value.id)
    }
    return
  }

  if (!failedQuestionIds.value.includes(currentQuestion.value.id)) {
    failedQuestionIds.value.push(currentQuestion.value.id)
    pendingXp.value += currentQuestion.value.xpReward
  }
}

function next() {
  if (currentStepIndex.value < exerciseSequence.value.length - 1) {
    currentStepIndex.value += 1
    selectedIndex.value = null
    answered.value = false
    writtenAnswer.value = ''
    wordBankPicked.value = []
    matchSelectedEn.value = null
    matchResolved.value = []
    matchWrongEn.value = null
    matchWrongEs.value = null
  } else {
    finishLesson()
  }
}

function finishLesson() {
  if (!lesson.value) return

  const xpToAward = isRetryRound.value ? recoveredXp.value : xpEarned.value

  const stars = houseId.value
    ? progressStore.saveHouseResult(lessonId.value, houseId.value, correctAnswers.value, totalQuestionCount.value)
    : progressStore.saveResult(lessonId.value, correctAnswers.value, totalQuestionCount.value)
  starsEarned.value = stars

  progressStore.logSession({
    id: sessionId.value,
    lessonId: lessonId.value,
    houseId: houseId.value,
    title: lesson.value.title,
    icon: lesson.value.icon,
    level: lesson.value.level,
    isHouse: !!houseId.value,
    correct: correctAnswers.value,
    total: totalQuestionCount.value,
    stars,
    durationSec: elapsedSeconds(),
    completedAt: new Date().toISOString(),
  })

  userStore.recordActivity()
  userStore.addXp(xpToAward)

  const unlockedIds = achievementsStore.evaluate()
  mergeAchievements(unlockedIds)

  if (isRetryRound.value) {
    failedQuestionIds.value = [...retryMistakeIds.value]
    retryQuestionIds.value = []
    retryMistakeIds.value = []
    isRetryRound.value = false
    hasCompletedRetry.value = true
  }

  phase.value = 'result'
}

function startRetryLesson() {
  if (!failedQuestionIds.value.length) return

  retryQuestionIds.value = [...failedQuestionIds.value]
  retryMistakeIds.value = []
  recoveredXp.value = 0
  currentStepIndex.value = 0
  selectedIndex.value = null
  answered.value = false
  writtenAnswer.value = ''
  wordBankPicked.value = []
  matchSelectedEn.value = null
  matchResolved.value = []
  matchWrongEn.value = null
  matchWrongEs.value = null
  isRetryRound.value = true
  phase.value = 'exercise'
}

onMounted(() => {
  if (!lesson.value) {
    phase.value = 'notfound'
  } else {
    phase.value = 'exercise'
    sessionId.value =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    startTimer()
    document.addEventListener('visibilitychange', handleVisibility)
  }
})

onUnmounted(() => {
  pauseTimer()
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-up-leave-to {
  opacity: 0;
}
</style>
