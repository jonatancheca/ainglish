<template>
  <div class="space-y-6">
    <!-- Saludo -->
    <div class="card flex items-center gap-4">
      <div class="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center text-3xl">
        {{ timeEmoji }}
      </div>
      <div>
        <p class="text-slate-500 text-sm">
          {{ timeGreeting }}
        </p>
        <h1 class="text-xl font-black text-slate-800">
          {{ userStore.name }}!
        </h1>
      </div>
    </div>

    <!-- XP Bar -->
    <div class="card">
      <XpBar
        :level="userStore.level"
        :xp-in-level="userStore.xpInCurrentLevel"
        :xp-needed="userStore.xpNeededForNextLevel"
        :progress="userStore.levelProgress"
      />
    </div>

    <!-- Stats rápidos -->
    <div class="grid grid-cols-3 gap-3">
      <div class="card text-center">
        <div class="text-2xl mb-1">
          🔥
        </div>
        <div class="text-xl font-black text-orange-500">
          {{ userStore.streak }}
        </div>
        <div class="text-xs text-slate-500 font-semibold">
          Racha
        </div>
      </div>
      <div class="card text-center">
        <div class="text-2xl mb-1">
          ⚡
        </div>
        <div class="text-xl font-black text-sky-500">
          {{ userStore.xp }}
        </div>
        <div class="text-xs text-slate-500 font-semibold">
          XP total
        </div>
      </div>
      <div class="card text-center">
        <div class="text-2xl mb-1">
          📚
        </div>
        <div class="text-xl font-black text-emerald-500">
          {{ progressStore.totalLessonsCompleted }}
        </div>
        <div class="text-xs text-slate-500 font-semibold">
          Lecciones
        </div>
      </div>
    </div>

    <!-- CTA: siguiente lección -->
    <div
      v-if="nextLesson"
      class="card border-2 border-sky-200 bg-sky-50"
    >
      <p class="text-xs font-bold text-sky-500 mb-1 uppercase tracking-wide">
        Continúa aprendiendo
      </p>
      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">{{ nextLesson.icon }}</span>
        <div>
          <h2 class="font-black text-slate-800">
            {{ nextLesson.title }}
          </h2>
          <p class="text-sm text-slate-500">
            {{ nextLesson.description }}
          </p>
        </div>
      </div>
      <NuxtLink
        :to="`/lesson/${nextLesson.id}`"
        class="btn-primary w-full"
      >
        ¡Continuar! →
      </NuxtLink>
    </div>

    <div
      v-else
      class="card bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-center"
    >
      <div class="text-4xl mb-3">
        🎓
      </div>
      <h2 class="font-black text-xl mb-1">
        ¡Nivel A1 completado!
      </h2>
      <p class="text-sky-100 text-sm">
        Has terminado todas las lecciones disponibles.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getNextLesson } from '~/data/lessons'

const userStore = useUserStore()
const progressStore = useProgressStore()

const nextLesson = computed(() => getNextLesson(progressStore.completedLessons))

const hour = new Date().getHours()
const timeGreeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'
const timeEmoji = hour < 12 ? '🌅' : hour < 18 ? '☀️' : '🌙'
</script>
