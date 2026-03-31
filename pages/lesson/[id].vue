<template>
  <div>
    <!-- Pantalla de vocabulario -->
    <div
      v-if="phase === 'vocab'"
      class="space-y-5 animate-fade-up"
    >
      <!-- Header -->
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/learn"
          class="text-slate-400 hover:text-slate-600 text-xl font-bold leading-none"
        >
          ✕
        </NuxtLink>
        <div class="flex-1"></div>
        <span class="text-xs font-bold text-sky-500 uppercase tracking-wide">📖 Vocabulario</span>
      </div>

      <!-- Escena de introducción -->
      <div class="overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-gradient-to-br from-sky-100 via-cyan-50 to-amber-100 p-4 shadow-[0_10px_0_0_theme(colors.sky.100)]">
        <div class="mb-4 flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-black uppercase tracking-[0.3em] text-sky-500">
              Casa de {{ hostMonster.name }}
            </p>
            <h1 class="mt-2 text-2xl font-black text-slate-800">
              {{ lesson?.icon }} {{ lesson?.title }}
            </h1>
            <p class="mt-1 text-sm text-slate-500">
              Estudia estas palabras antes de empezar.
            </p>
          </div>
          <span class="rounded-full border-2 border-slate-800 bg-white px-3 py-1 text-xs font-black text-slate-600">
            Cómic
          </span>
        </div>

        <ComicBubble label="Introducción">
          {{ introLine }}
        </ComicBubble>

        <div class="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <KawaiiMonster :monster="hostMonster" />
          <div class="flex flex-col items-center gap-3 md:max-w-xs">
            <ComicBubble
              side="right"
              label="Consejo"
            >
              {{ vocabLine }}
            </ComicBubble>
            <KawaiiAvatar
              :avatar="userStore.avatar"
              size="sm"
            />
          </div>
        </div>
      </div>

      <!-- Lista de palabras -->
      <div class="space-y-2">
        <div
          v-for="(word, i) in lesson?.vocabulary"
          :key="i"
          class="card flex items-start gap-3 !py-3"
        >
          <span class="text-sky-500 font-black text-lg leading-none mt-0.5">{{ i + 1 }}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-baseline gap-2 flex-wrap">
              <span class="font-black text-slate-800">{{ word.en }}</span>
              <span class="text-slate-400">—</span>
              <span class="text-slate-600">{{ word.es }}</span>
            </div>
            <p
              v-if="word.example"
              class="text-xs text-slate-400 mt-1 italic"
            >
              "{{ word.example }}"
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="hasVocab"
        class="rounded-[2rem] border-4 border-slate-800 bg-white px-5 py-4 shadow-[0_8px_0_0_theme(colors.slate.200)]"
      >
        <div class="flex items-start gap-3">
          <span class="text-2xl">🎙️</span>
          <div>
            <p class="text-sm font-black text-slate-800">
              Práctica de pronunciación
            </p>
            <p class="mt-1 text-sm text-slate-500">
              {{ speechSupported ? 'Antes del test, di en voz alta las palabras nuevas y comprobaremos si se han entendido bien.' : 'Tu navegador no ofrece reconocimiento de voz aquí, así que saltaremos esta parte y seguiremos con la lección.' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Botón empezar -->
      <button
        class="btn-primary w-full text-lg"
        @click="startExercises"
      >
        {{ speechSupported ? 'Practicar pronunciación →' : '¡Empezar lección! 🚀' }}
      </button>
    </div>

    <!-- Pantalla de pronunciación -->
    <div
      v-else-if="phase === 'speak'"
      class="space-y-5 animate-fade-up"
    >
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="text-slate-400 hover:text-slate-600 text-xl font-bold leading-none"
          @click="phase = hasVocab ? 'vocab' : 'exercise'"
        >
          ✕
        </button>
        <div class="flex-1 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-full rounded-full bg-emerald-400 transition-all duration-500"
            :style="{ width: `${speechProgress}%` }"
          ></div>
        </div>
        <span class="text-xs font-bold text-slate-400">{{ currentSpeakIndex + 1 }}/{{ vocabularyWords.length }}</span>
      </div>

      <div class="overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-gradient-to-br from-emerald-100 via-white to-sky-100 p-4 shadow-[0_10px_0_0_theme(colors.emerald.100)]">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <KawaiiMonster
            :monster="hostMonster"
            size="sm"
          />

          <div class="flex-1 space-y-4">
            <ComicBubble label="Pronunciación">
              Di en voz alta {{ currentVocabWord?.en }}. Si lo reconozco bien, pasamos a la siguiente palabra.
            </ComicBubble>

            <div class="rounded-[1.75rem] border-4 border-slate-800 bg-white px-5 py-4 text-center shadow-[0_8px_0_0_theme(colors.slate.200)]">
              <p class="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
                Palabra objetivo
              </p>
              <p class="mt-2 text-3xl font-black text-slate-800">
                {{ currentVocabWord?.en }}
              </p>
              <p class="mt-1 text-sm text-slate-500">
                {{ currentVocabWord?.es }}
              </p>
              <p
                v-if="speechTranscript"
                class="mt-4 text-sm text-slate-500"
              >
                Te he entendido: <strong class="text-slate-700">{{ speechTranscript }}</strong>
              </p>
            </div>
          </div>

          <div class="hidden md:block">
            <KawaiiAvatar
              :avatar="userStore.avatar"
              size="sm"
            />
          </div>
        </div>
      </div>

      <div class="rounded-[2rem] border-4 border-slate-800 bg-white px-5 py-4 shadow-[0_8px_0_0_theme(colors.slate.200)]">
        <p class="text-sm font-black text-slate-800">
          {{ speechStatusMessage }}
        </p>
        <p
          v-if="speechError"
          class="mt-1 text-sm text-red-500"
        >
          {{ speechError }}
        </p>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <button
          class="btn-primary w-full"
          :disabled="isListening || !speechSupported"
          @click="listenForWord"
        >
          {{ isListening ? 'Escuchando…' : 'Hablar ahora 🎤' }}
        </button>
        <button
          class="btn-secondary w-full"
          @click="skipSpeechPractice"
        >
          {{ isLastVocabWord ? 'Ir al test' : 'Saltar esta palabra' }}
        </button>
      </div>
    </div>

    <!-- Pantalla de ejercicio -->
    <div
      v-else-if="phase === 'exercise'"
      class="space-y-5"
    >
      <!-- Header de la sesión -->
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/learn"
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
        <span class="text-xs font-bold text-slate-400">{{ currentIndex + 1 }}/{{ activeQuestions.length }}</span>
      </div>

      <!-- Pregunta -->
      <div
        :key="currentIndex"
        class="overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-gradient-to-br from-white via-sky-50 to-amber-50 p-4 shadow-[0_10px_0_0_theme(colors.slate.200)] animate-fade-up"
      >
        <div class="flex items-center justify-between gap-3">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
            {{ questionLabel }}
          </p>
          <span class="rounded-full border-2 border-slate-800 bg-white px-3 py-1 text-xs font-black text-slate-500">
            {{ currentQuestion.type === 'written' ? 'Escribe la respuesta' : 'Elige la respuesta correcta' }}
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
            <KawaiiAvatar
              :avatar="userStore.avatar"
              size="sm"
            />
          </div>
        </div>
      </div>

      <!-- Opciones (multiple choice) -->
      <div
        v-if="currentQuestion.type === 'multiple-choice'"
        :key="`opts-${currentIndex}`"
        class="space-y-3"
      >
        <button
          v-for="(option, i) in currentQuestion.options"
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
        v-else-if="currentQuestion.type === 'written'"
        :key="`write-${currentIndex}`"
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

      <!-- Feedback -->
      <Transition name="slide-up">
        <ExerciseFeedback
          v-if="answered"
          :correct="isCorrect"
          :correct-answer="correctAnswerText"
          :xp="currentQuestion.xpReward"
        />
      </Transition>

      <!-- Continuar -->
      <button
        v-if="answered"
        class="btn-primary w-full animate-fade-up"
        @click="next"
      >
        {{ currentIndex < activeQuestions.length - 1 ? 'Siguiente →' : 'Ver resultado 🎉' }}
      </button>
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
          to="/learn"
          class="btn-secondary text-center"
        >
          Ver lecciones
        </NuxtLink>
        <NuxtLink
          v-if="nextLessonId"
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
        to="/learn"
        class="btn-secondary mt-4 inline-block"
      >
        Volver
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLessonById, getNextLesson, type Lesson, type Question } from '~/data/lessons'
import { getMonsterForLesson } from '~/data/monsters'
import { getAchievementById, type Achievement } from '~/data/achievements'

const route = useRoute()
const userStore = useUserStore()
const progressStore = useProgressStore()
const achievementsStore = useAchievementsStore()

const lessonId = computed(() => route.params.id as string)
const lesson = computed<Lesson | undefined>(() => getLessonById(lessonId.value))
const questions = computed(() => lesson.value?.questions ?? [])
const hostMonster = computed(() => getMonsterForLesson(lessonId.value))
const vocabularyWords = computed(() => lesson.value?.vocabulary ?? [])

const letters = ['A', 'B', 'C', 'D']
let recognition: SpeechRecognition | null = null

// ── State ──────────────────────────────────────────────────────────────────
const hasVocab = computed(() => (lesson.value?.vocabulary?.length ?? 0) > 0)
const phase = ref<'vocab' | 'speak' | 'exercise' | 'result' | 'notfound'>('exercise')
const currentIndex = ref(0)
const currentSpeakIndex = ref(0)
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
const speechSupported = ref(false)
const isListening = ref(false)
const speechTranscript = ref('')
const speechError = ref('')
const speechState = ref<'idle' | 'success' | 'retry'>('idle')
const writtenAnswer = ref('')
const writtenInputRef = ref<HTMLInputElement | null>(null)

// ── Computed ───────────────────────────────────────────────────────────────
const activeQuestions = computed(() => {
  if (!isRetryRound.value) return questions.value

  const retryIds = new Set(retryQuestionIds.value)
  return questions.value.filter((question) => retryIds.has(question.id))
})

const totalQuestionCount = computed(() => questions.value.length)
const currentQuestion = computed(() => activeQuestions.value[currentIndex.value])
const currentVocabWord = computed(() => vocabularyWords.value[currentSpeakIndex.value])
const introLine = computed(() => {
  if (!lesson.value) return ''

  return `Soy ${hostMonster.value.name}, ${hostMonster.value.title}. Vamos a explorar ${lesson.value.title.toLowerCase()} con viñetas y pistas visuales.`
})

const vocabLine = computed(() => {
  if (!lesson.value) return ''

  return `${hostMonster.value.catchphrase} Repasa estas palabras antes de entrar en mi casa.`
})

const questionLabel = computed(() => {
  const prefix = isRetryRound.value ? 'Reintento' : 'Pregunta'
  return `${prefix} ${currentIndex.value + 1} de ${activeQuestions.value.length}`
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
  if (!activeQuestions.value.length) return 0
  return (currentIndex.value / activeQuestions.value.length) * 100
})

const speechProgress = computed(() => {
  if (!vocabularyWords.value.length) return 0
  return (currentSpeakIndex.value / vocabularyWords.value.length) * 100
})

const isLastVocabWord = computed(
  () => currentSpeakIndex.value >= Math.max(vocabularyWords.value.length - 1, 0),
)

const speechStatusMessage = computed(() => {
  if (!speechSupported.value) {
    return 'El reconocimiento de voz no está disponible en este navegador. Puedes saltar directamente al test.'
  }
  if (isListening.value) {
    return 'Escuchando tu pronunciación...'
  }
  if (speechState.value === 'success') {
    return 'Pronunciación aceptada. Puedes seguir con la siguiente palabra.'
  }
  if (speechState.value === 'retry') {
    return 'No ha coincidido del todo. Puedes intentarlo otra vez o saltar esta palabra.'
  }
  return 'Pulsa el micrófono y di la palabra en inglés con naturalidad.'
})

const isCorrect = computed(() => {
  if (!currentQuestion.value) return false
  if (currentQuestion.value.type === 'written') {
    const accepted = currentQuestion.value.acceptedAnswers ?? [currentQuestion.value.correctAnswer]
    return accepted.some((a) => a.toLowerCase() === writtenAnswer.value.trim().toLowerCase())
  }
  return selectedIndex.value === currentQuestion.value.correctIndex
})

const correctAnswerText = computed(() => {
  if (!currentQuestion.value) return ''
  if (currentQuestion.value.type === 'written') return currentQuestion.value.correctAnswer
  return currentQuestion.value.options[currentQuestion.value.correctIndex]
})

const writtenInputClass = computed(() => {
  if (!answered.value) return 'border-slate-200 focus-within:border-sky-400'
  if (isCorrect.value) return 'border-emerald-400 bg-emerald-50'
  return 'border-red-400 bg-red-50'
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
  if (!answered.value) {
    return 'border-slate-200 hover:border-sky-400 hover:bg-sky-50'
  }
  if (i === currentQuestion.value.correctIndex) {
    return 'border-emerald-400 bg-emerald-50 text-emerald-700'
  }
  if (i === selectedIndex.value) {
    return 'border-red-400 bg-red-50 text-red-700 animate-shake'
  }
  return 'border-slate-200 opacity-60'
}

function normalizeSpeechText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isPronunciationMatch(transcript: string, expected: string): boolean {
  const heard = normalizeSpeechText(transcript)
  const target = normalizeSpeechText(expected)

  if (!heard || !target) return false
  if (heard === target || heard.includes(target)) return true

  const targetTokens = target.split(' ')
  return targetTokens.every((token) => heard.includes(token))
}

function mergeAchievements(unlockedIds: string[]) {
  const knownIds = new Set(newAchievements.value.map((achievement) => achievement.id))
  const mapped = unlockedIds
    .map((id) => getAchievementById(id))
    .filter(Boolean)
    .filter((achievement) => !knownIds.has((achievement as Achievement).id)) as Achievement[]

  newAchievements.value = [...newAchievements.value, ...mapped]
}

function createRecognition(): SpeechRecognition | null {
  if (!import.meta.client) return null

  const RecognitionCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition
  if (!RecognitionCtor) return null

  const instance = new RecognitionCtor()
  instance.continuous = false
  instance.interimResults = false
  instance.lang = 'en-US'
  instance.maxAlternatives = 1
  return instance
}

function advanceSpeechPractice() {
  if (isLastVocabWord.value) {
    phase.value = 'exercise'
    return
  }

  currentSpeakIndex.value += 1
  speechTranscript.value = ''
  speechError.value = ''
  speechState.value = 'idle'
}

function skipSpeechPractice() {
  if (!speechSupported.value || isLastVocabWord.value) {
    phase.value = 'exercise'
    return
  }

  advanceSpeechPractice()
}

function listenForWord() {
  if (!speechSupported.value || !currentVocabWord.value || isListening.value) return

  recognition?.abort()
  recognition = createRecognition()
  if (!recognition) {
    speechSupported.value = false
    return
  }

  speechTranscript.value = ''
  speechError.value = ''
  speechState.value = 'idle'
  isListening.value = true

  recognition.onresult = (event) => {
    const transcript = event.results[0][0]?.transcript ?? ''
    speechTranscript.value = transcript

    if (isPronunciationMatch(transcript, currentVocabWord.value?.en ?? '')) {
      speechState.value = 'success'
      setTimeout(() => {
        advanceSpeechPractice()
      }, 650)
    } else {
      speechState.value = 'retry'
    }
  }

  recognition.onerror = (event) => {
    speechState.value = 'retry'
    speechError.value = event.error === 'not-allowed'
      ? 'No hay permiso para usar el micrófono en este navegador.'
      : 'No he podido reconocer esa palabra.'
  }

  recognition.onend = () => {
    isListening.value = false
  }

  recognition.start()
}

function selectAnswer(i: number) {
  if (answered.value) return
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

function submitWrittenAnswer() {
  if (answered.value || !writtenAnswer.value.trim()) return
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
  if (currentIndex.value < activeQuestions.value.length - 1) {
    currentIndex.value += 1
    selectedIndex.value = null
    answered.value = false
    writtenAnswer.value = ''
  } else {
    finishLesson()
  }
}

function finishLesson() {
  if (!lesson.value) return

  const xpToAward = isRetryRound.value ? recoveredXp.value : xpEarned.value

  // Calcular estrellas
  const stars = progressStore.saveResult(lessonId.value, correctAnswers.value, totalQuestionCount.value)
  starsEarned.value = stars

  // Registrar actividad y sumar XP
  userStore.recordActivity()
  userStore.addXp(xpToAward)

  // Evaluar logros
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
  currentIndex.value = 0
  selectedIndex.value = null
  answered.value = false
  isRetryRound.value = true
  phase.value = 'exercise'
}

function startExercises() {
  if (hasVocab.value && vocabularyWords.value.length && speechSupported.value) {
    currentSpeakIndex.value = 0
    speechTranscript.value = ''
    speechError.value = ''
    speechState.value = 'idle'
    phase.value = 'speak'
    return
  }

  phase.value = 'exercise'
}

// Redirigir si la lección no existe
onMounted(() => {
  recognition = createRecognition()
  speechSupported.value = Boolean(recognition)

  if (!lesson.value) {
    phase.value = 'notfound'
  } else if (hasVocab.value) {
    phase.value = 'vocab'
  }
})

onBeforeUnmount(() => {
  recognition?.abort()
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
