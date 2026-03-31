<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-black text-slate-800">
      Aprender
    </h1>
    <p class="text-slate-500 text-sm">
      Completa las lecciones en orden para desbloquear las siguientes.
    </p>

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

      <div class="space-y-3">
        <LessonCard
          v-for="(lesson, i) in a1Lessons"
          :key="lesson.id"
          :lesson="lesson"
          :locked="i > 0 && !progressStore.isCompleted(a1Lessons[i - 1].id)"
          :completed="progressStore.isCompleted(lesson.id)"
          :stars="progressStore.getStars(lesson.id)"
          @click="navigateTo(`/lesson/${lesson.id}`)"
        />
      </div>
    </div>

    <!-- Próximamente -->
    <div class="card border-2 border-dashed border-slate-200 text-center py-6">
      <div class="text-3xl mb-2">
        🚧
      </div>
      <p class="font-bold text-slate-400">
        Nivel A2 — próximamente
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LESSONS } from '~/data/lessons'

const progressStore = useProgressStore()
const a1Lessons = computed(() => LESSONS.filter((l) => l.level === 'A1').sort((a, b) => a.order - b.order))
const a1Total = computed(() => a1Lessons.value.length)
const a1Completed = computed(() => a1Lessons.value.filter((l) => progressStore.isCompleted(l.id)).length)
</script>
