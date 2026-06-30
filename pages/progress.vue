<template>
  <div
    v-if="isClient"
    class="space-y-5"
  >
    <div>
      <h1 class="text-2xl font-black text-slate-800">
        Progreso
      </h1>
      <p class="mt-1 text-sm font-semibold text-slate-500">
        Resumen del tiempo dedicado a las lecciones, dia a dia.
      </p>
    </div>

    <!-- Resumen total -->
    <div class="grid grid-cols-3 gap-3">
      <div class="card text-center">
        <div class="mb-1 text-2xl">
          ⏱️
        </div>
        <div class="text-xl font-black text-sky-500">
          {{ formatDuration(totalSeconds) }}
        </div>
        <div class="mt-0.5 text-xs font-semibold text-slate-500">
          Tiempo total
        </div>
      </div>
      <div class="card text-center">
        <div class="mb-1 text-2xl">
          📚
        </div>
        <div class="text-xl font-black text-emerald-500">
          {{ sessions.length }}
        </div>
        <div class="mt-0.5 text-xs font-semibold text-slate-500">
          Lecciones
        </div>
      </div>
      <div class="card text-center">
        <div class="mb-1 text-2xl">
          🗓️
        </div>
        <div class="text-xl font-black text-amber-500">
          {{ days.length }}
        </div>
        <div class="mt-0.5 text-xs font-semibold text-slate-500">
          Dias activos
        </div>
      </div>
    </div>

    <!-- Estado vacio -->
    <div
      v-if="!days.length"
      class="card flex flex-col items-center py-10 text-center"
    >
      <div class="mb-2 text-4xl">
        🌱
      </div>
      <p class="font-black text-slate-700">
        Aun no hay actividad
      </p>
      <p class="mt-1 text-sm font-semibold text-slate-500">
        Cuando se complete una leccion, aparecera aqui el tiempo dedicado.
      </p>
    </div>

    <!-- Timeline por dia -->
    <div
      v-for="day in days"
      :key="day.key"
      class="space-y-3"
    >
      <div class="flex items-center justify-between px-1">
        <h2 class="text-sm font-black uppercase tracking-[0.15em] text-slate-700">
          {{ day.label }}
        </h2>
        <span class="text-xs font-bold text-slate-400">
          {{ formatDuration(day.totalSeconds) }} · {{ day.sessions.length }}
          {{ day.sessions.length === 1 ? 'leccion' : 'lecciones' }}
        </span>
      </div>

      <div
        v-for="s in day.sessions"
        :key="s.id"
        class="card flex items-center gap-3 py-3"
      >
        <div class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-50 text-2xl">
          {{ s.icon || '📘' }}
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <p class="truncate font-black text-slate-800">
              {{ s.title }}
            </p>
            <span
              v-if="s.isHouse"
              class="shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-rose-500"
            >
              AIworld
            </span>
          </div>
          <div class="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs font-semibold text-slate-500">
            <span>{{ s.level }}</span>
            <span>{{ s.correct }}/{{ s.total }} correctas</span>
            <span>⏱️ {{ formatDuration(s.durationSec) }}</span>
            <span>{{ formatTime(s.completedAt) }}</span>
          </div>
        </div>

        <div class="shrink-0 text-right">
          <div class="text-sm font-black text-amber-500">
            {{ '⭐'.repeat(s.stars) }}
          </div>
          <div class="text-xs font-bold text-slate-400">
            {{ percent(s) }}%
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="space-y-5"
  >
    <h1 class="text-2xl font-black text-slate-800">
      Progreso
    </h1>
    <div class="card h-72 animate-pulse bg-white"></div>
  </div>
</template>

<script setup lang="ts">
import type { LessonSession } from '~/stores/progress'

const progressStore = useProgressStore()

const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})

const sessions = computed(() => progressStore.sessionLog)

const totalSeconds = computed(() =>
  sessions.value.reduce((sum, s) => sum + s.durationSec, 0),
)

interface DayGroup {
  key: string
  label: string
  totalSeconds: number
  sessions: LessonSession[]
}

const days = computed<DayGroup[]>(() => {
  const groups = new Map<string, LessonSession[]>()

  for (const s of sessions.value) {
    const key = dayKey(s.completedAt)
    const list = groups.get(key)
    if (list) list.push(s)
    else groups.set(key, [s])
  }

  return Array.from(groups.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([key, list]) => ({
      key,
      label: dayLabel(key),
      totalSeconds: list.reduce((sum, s) => sum + s.durationSec, 0),
      sessions: [...list].sort((a, b) =>
        a.completedAt < b.completedAt ? 1 : -1,
      ),
    }))
})

function percent(s: LessonSession): number {
  return s.total ? Math.round((s.correct / s.total) * 100) : 0
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

function dayKey(iso: string): string {
  const d = new Date(iso)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function dayLabel(key: string): string {
  const today = dayKey(new Date().toISOString())
  const yesterday = dayKey(new Date(Date.now() - 86400000).toISOString())
  if (key === today) return 'Hoy'
  if (key === yesterday) return 'Ayer'

  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(y!, (m ?? 1) - 1, d ?? 1)
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatDuration(totalSec: number): string {
  if (totalSec < 60) return `${totalSec}s`
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0) return `${h}h ${m}m`
  if (s === 0) return `${m}m`
  return `${m}m ${s}s`
}
</script>
