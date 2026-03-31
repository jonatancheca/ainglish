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
          to="/learn"
          class="text-slate-400 hover:text-slate-600 text-xl font-bold leading-none"
        >
          ✕
        </NuxtLink>
        <div class="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-sky-400 rounded-full transition-all duration-500"
            :style="{ width: `${((currentIndex) / questions.length) * 100}%` }"
          ></div>
        </div>
        <span class="text-xs font-bold text-slate-400">{{ currentIndex + 1 }}/{{ questions.length }}</span>
      </div>

      <!-- Pregunta -->
      <div
        :key="currentIndex"
        class="card animate-fade-up"
      >
        <p class="text-xs font-bold text-sky-500 uppercase tracking-wide mb-3">
          Elige la respuesta correcta
        </p>
        <h2 class="text-xl font-black text-slate-800 leading-snug">
          {{ currentQuestion.question }}
        </h2>
      </div>

      <!-- Opciones -->
      <div
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

      <!-- Feedback -->
      <Transition name="slide-up">
        <ExerciseFeedback
          v-if="answered"
          :correct="isCorrect"
          :correct-answer="currentQuestion.options[currentQuestion.correctIndex]"
          :xp="currentQuestion.xpReward"
        />
      </Transition>

      <!-- Continuar -->
      <button
        v-if="answered"
        class="btn-primary w-full animate-fade-up"
        @click="next"
      >
        {{ currentIndex < questions.length - 1 ? 'Siguiente →' : 'Ver resultado 🎉' }}
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
          Respondiste <strong class="text-slate-700">{{ correctAnswers }}/{{ questions.length }}</strong> correctamente
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
import { getLessonById, getNextLesson, type Lesson } from '~/data/lessons'
import { getAchievementById, type Achievement } from '~/data/achievements'

const route = useRoute()
const userStore = useUserStore()
const progressStore = useProgressStore()
const achievementsStore = useAchievementsStore()

const lessonId = computed(() => route.params.id as string)
const lesson = computed<Lesson | undefined>(() => getLessonById(lessonId.value))
const questions = computed(() => lesson.value?.questions ?? [])

const letters = ['A', 'B', 'C', 'D']

// ── State ──────────────────────────────────────────────────────────────────
const phase = ref<'exercise' | 'result' | 'notfound'>('exercise')
const currentIndex = ref(0)
const selectedIndex = ref<number | null>(null)
const answered = ref(false)
const correctAnswers = ref(0)
const xpEarned = ref(0)
const starsEarned = ref(0)
const newAchievements = ref<Achievement[]>([])

// ── Computed ───────────────────────────────────────────────────────────────
const currentQuestion = computed(() => questions.value[currentIndex.value])

const isCorrect = computed(
  () => selectedIndex.value === currentQuestion.value?.correctIndex,
)

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

function selectAnswer(i: number) {
  if (answered.value) return
  selectedIndex.value = i
  answered.value = true
  if (isCorrect.value) {
    correctAnswers.value += 1
    xpEarned.value += currentQuestion.value.xpReward
  }
}

function next() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value += 1
    selectedIndex.value = null
    answered.value = false
  } else {
    finishLesson()
  }
}

function finishLesson() {
  if (!lesson.value) return

  // Calcular estrellas
  const stars = progressStore.saveResult(lessonId.value, correctAnswers.value, questions.value.length)
  starsEarned.value = stars

  // Registrar actividad y sumar XP
  userStore.recordActivity()
  userStore.addXp(xpEarned.value)

  // Evaluar logros
  const unlockedIds = achievementsStore.evaluate()
  newAchievements.value = unlockedIds.map((id) => getAchievementById(id)).filter(Boolean) as Achievement[]

  phase.value = 'result'
}

// Redirigir si la lección no existe
onMounted(() => {
  if (!lesson.value) phase.value = 'notfound'
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
