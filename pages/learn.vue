<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-black text-slate-800">
      Aprender
    </h1>
    <p class="text-slate-500 text-sm">
      Completa las lecciones en orden para desbloquear las siguientes.
    </p>

    <button
      v-if="isLocal"
      type="button"
      class="rounded-full border-2 border-slate-800 px-4 py-2 text-xs font-black transition-colors"
      :class="unlockAll ? 'bg-emerald-400 text-slate-900' : 'bg-white text-slate-600 hover:bg-slate-100'"
      @click="unlockAll = !unlockAll"
    >
      {{ unlockAll ? '🔓 Dev: lecciones desbloqueadas' : '🔒 Dev: desbloquear todas' }}
    </button>

    <NuxtLink
      to="/aiworld"
      class="block rounded-[2rem] border-4 border-slate-800 bg-gradient-to-r from-rose-100 via-white to-sky-100 p-5 shadow-[0_10px_0_0_theme(colors.rose.100)] transition-transform hover:-translate-y-1"
    >
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-xs font-black uppercase tracking-[0.24em] text-rose-400">
            Nuevo modo
          </p>
          <h2 class="mt-2 text-xl font-black text-slate-800">
            Explora AIworld
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            Recorre calles kawaii, entra en casas y avanza hasta la siguiente lección caminando.
          </p>
        </div>
        <div class="rounded-[1.5rem] border-4 border-slate-800 bg-white px-4 py-3 text-3xl shadow-[0_6px_0_0_theme(colors.slate.200)]">
          🌈
        </div>
      </div>
    </NuxtLink>

    <!-- Nivel A1 -->
    <div>
      <div class="flex items-center gap-2 mb-3">
        <span class="bg-sky-100 text-sky-600 font-black text-xs px-3 py-1 rounded-full">NIVEL A1</span>
        <div class="flex-1 h-px bg-slate-200"></div>
        <span class="text-xs text-slate-400 font-semibold">
          {{ a1Completed }}/{{ a1Total }} lecciones
        </span>
      </div>

      <!-- Progress bar del nivel -->
      <div class="h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
        <div
          class="h-full bg-sky-400 rounded-full transition-all duration-700"
          :style="{ width: `${(a1Completed / a1Total) * 100}%` }"
        ></div>
      </div>

      <div class="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        <LessonCard
          v-for="(lesson, i) in a1Lessons"
          :key="lesson.id"
          :lesson="lesson"
          :locked="!unlockAll && i > 0 && !progressStore.isCompleted(a1Lessons[i - 1]?.id ?? '')"
          :completed="progressStore.isCompleted(lesson.id)"
          :stars="progressStore.getStars(lesson.id)"
          @click="navigateTo(`/lesson/${lesson.id}`)"
        />
      </div>
    </div>

    <!-- Nivel A2 -->
    <div>
      <div class="flex items-center gap-2 mb-3">
        <span class="bg-indigo-100 text-indigo-600 font-black text-xs px-3 py-1 rounded-full">NIVEL A2</span>
        <div class="flex-1 h-px bg-slate-200"></div>
        <span class="text-xs text-slate-400 font-semibold">
          {{ a2Completed }}/{{ a2Total }} lecciones
        </span>
      </div>

      <!-- Progress bar del nivel -->
      <div class="h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
        <div
          class="h-full bg-indigo-400 rounded-full transition-all duration-700"
          :style="{ width: `${(a2Completed / a2Total) * 100}%` }"
        ></div>
      </div>

      <div class="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        <LessonCard
          v-for="(lesson, i) in a2Lessons"
          :key="lesson.id"
          :lesson="lesson"
          :locked="!unlockAll && i > 0 && !progressStore.isCompleted(a2Lessons[i - 1]?.id ?? '')"
          :completed="progressStore.isCompleted(lesson.id)"
          :stars="progressStore.getStars(lesson.id)"
          @click="navigateTo(`/lesson/${lesson.id}`)"
        />
      </div>
    </div>

    <!-- Nivel A3 -->
    <div>
      <div class="flex items-center gap-2 mb-3">
        <span class="bg-emerald-100 text-emerald-600 font-black text-xs px-3 py-1 rounded-full">NIVEL A3</span>
        <div class="flex-1 h-px bg-slate-200"></div>
        <span class="text-xs text-slate-400 font-semibold">
          {{ a3Completed }}/{{ a3Total }} lecciones
        </span>
      </div>

      <!-- Progress bar del nivel -->
      <div class="h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
        <div
          class="h-full bg-emerald-400 rounded-full transition-all duration-700"
          :style="{ width: `${(a3Completed / a3Total) * 100}%` }"
        ></div>
      </div>

      <div class="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        <LessonCard
          v-for="(lesson, i) in a3Lessons"
          :key="lesson.id"
          :lesson="lesson"
          :locked="!unlockAll && i > 0 && !progressStore.isCompleted(a3Lessons[i - 1]?.id ?? '')"
          :completed="progressStore.isCompleted(lesson.id)"
          :stars="progressStore.getStars(lesson.id)"
          @click="navigateTo(`/lesson/${lesson.id}`)"
        />
      </div>
    </div>

    <!-- Nivel A4 -->
    <div>
      <div class="flex items-center gap-2 mb-3">
        <span class="bg-fuchsia-100 text-fuchsia-600 font-black text-xs px-3 py-1 rounded-full">NIVEL A4</span>
        <div class="flex-1 h-px bg-slate-200"></div>
        <span class="text-xs text-slate-400 font-semibold">
          {{ a4Completed }}/{{ a4Total }} lecciones
        </span>
      </div>

      <!-- Progress bar del nivel -->
      <div class="h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
        <div
          class="h-full bg-fuchsia-400 rounded-full transition-all duration-700"
          :style="{ width: `${(a4Completed / a4Total) * 100}%` }"
        ></div>
      </div>

      <div class="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        <LessonCard
          v-for="(lesson, i) in a4Lessons"
          :key="lesson.id"
          :lesson="lesson"
          :locked="!unlockAll && i > 0 && !progressStore.isCompleted(a4Lessons[i - 1]?.id ?? '')"
          :completed="progressStore.isCompleted(lesson.id)"
          :stars="progressStore.getStars(lesson.id)"
          @click="navigateTo(`/lesson/${lesson.id}`)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LESSONS } from '~/data/lessons'

const progressStore = useProgressStore()
const a1Lessons = computed(() => LESSONS.filter((l) => l.level === 'A1').sort((a, b) => a.order - b.order))
const a1Total = computed(() => a1Lessons.value.length)
const a1Completed = computed(() => a1Lessons.value.filter((l) => progressStore.isCompleted(l.id)).length)

const a2Lessons = computed(() => LESSONS.filter((l) => l.level === 'A2').sort((a, b) => a.order - b.order))
const a2Total = computed(() => a2Lessons.value.length)
const a2Completed = computed(() => a2Lessons.value.filter((l) => progressStore.isCompleted(l.id)).length)

const a3Lessons = computed(() => LESSONS.filter((l) => l.level === 'A3').sort((a, b) => a.order - b.order))
const a3Total = computed(() => a3Lessons.value.length)
const a3Completed = computed(() => a3Lessons.value.filter((l) => progressStore.isCompleted(l.id)).length)

const a4Lessons = computed(() => LESSONS.filter((l) => l.level === 'A4').sort((a, b) => a.order - b.order))
const a4Total = computed(() => a4Lessons.value.length)
const a4Completed = computed(() => a4Lessons.value.filter((l) => progressStore.isCompleted(l.id)).length)

const isLocal = ref(false)
const unlockAll = ref(false)

onMounted(() => {
  isLocal.value = ['localhost', '127.0.0.1'].includes(window.location.hostname)
})
</script>
