<template>
  <div class="space-y-6">
    <!-- Saludo -->
    <div class="card flex items-center gap-4">
      <div class="flex items-center justify-center w-14 h-14 rounded-[1.5rem] bg-sky-100/80 text-4xl">
        {{ timeIcon }}
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

    <div class="card border border-rose-100 bg-gradient-to-r from-rose-50 via-white to-sky-50">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-xs font-black uppercase tracking-[0.25em] text-rose-400">
            Tu personaje
          </p>
          <h2 class="mt-1 text-lg font-black text-slate-800">
            {{ userStore.name }} está listo para aprender
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            Personalidad kawaii guardada en tu perfil.
          </p>
        </div>
        <div class="hidden sm:block rounded-[1.75rem] bg-white/90 p-2 shadow-sm">
          <KawaiiAvatar
            :avatar="userStore.avatar"
            size="sm"
          />
        </div>
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
const isNight = hour >= 20 || hour < 7
const timeGreeting = isNight ? 'Buenas noches' : 'Buenos días'
const timeIcon = isNight ? '🌙' : '☀️'
</script>
