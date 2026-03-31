<template>
  <div class="space-y-5">
    <h1 class="text-2xl font-black text-slate-800">
      Mi perfil
    </h1>

    <!-- Avatar + nombre -->
    <div class="card flex flex-col items-center py-8 gap-3">
      <div class="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-4xl font-black text-white select-none">
        {{ initials }}
      </div>
      <h2 class="text-xl font-black text-slate-800">
        {{ userStore.name }}
      </h2>
      <div class="flex items-center gap-2">
        <LevelBadge :level="userStore.level" />
        <span class="text-sm font-bold text-slate-500">Nivel {{ userStore.level }}</span>
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

    <!-- Estadísticas -->
    <div class="grid grid-cols-2 gap-3">
      <div class="card text-center">
        <div class="text-2xl mb-1">
          🔥
        </div>
        <div class="text-2xl font-black text-orange-500">
          {{ userStore.streak }}
        </div>
        <div class="text-xs text-slate-500 font-semibold mt-0.5">
          Racha actual
        </div>
      </div>
      <div class="card text-center">
        <div class="text-2xl mb-1">
          📅
        </div>
        <div class="text-2xl font-black text-amber-500">
          {{ userStore.maxStreak }}
        </div>
        <div class="text-xs text-slate-500 font-semibold mt-0.5">
          Racha máxima
        </div>
      </div>
      <div class="card text-center">
        <div class="text-2xl mb-1">
          ⚡
        </div>
        <div class="text-2xl font-black text-sky-500">
          {{ userStore.xp }}
        </div>
        <div class="text-xs text-slate-500 font-semibold mt-0.5">
          XP total
        </div>
      </div>
      <div class="card text-center">
        <div class="text-2xl mb-1">
          📚
        </div>
        <div class="text-2xl font-black text-emerald-500">
          {{ progressStore.totalLessonsCompleted }}
        </div>
        <div class="text-xs text-slate-500 font-semibold mt-0.5">
          Lecciones
        </div>
      </div>
    </div>

    <!-- Logros recientes -->
    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <p class="font-black text-slate-700">
          Logros
        </p>
        <NuxtLink
          to="/achievements"
          class="text-xs text-sky-500 font-bold"
        >
          Ver todos →
        </NuxtLink>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-2xl font-black text-amber-500">{{ achievementsStore.unlockedCount }}</span>
        <span class="text-slate-400 text-sm">/{{ totalAchievements }} desbloqueados</span>
        <div class="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden ml-2">
          <div
            class="h-full bg-amber-400 rounded-full"
            :style="{ width: `${(achievementsStore.unlockedCount / totalAchievements) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Reset -->
    <button
      class="w-full text-slate-400 text-sm font-semibold py-2 hover:text-red-400 transition-colors"
      @click="confirmReset"
    >
      ⚠️ Reiniciar progreso
    </button>
  </div>
</template>

<script setup lang="ts">
import { ACHIEVEMENTS } from '~/data/achievements'

const userStore = useUserStore()
const progressStore = useProgressStore()
const achievementsStore = useAchievementsStore()
const router = useRouter()
const totalAchievements = ACHIEVEMENTS.length

const initials = computed(() =>
  userStore.name
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0]?.toUpperCase() ?? '')
    .join(''),
)

function confirmReset() {
  if (confirm('¿Seguro que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
    userStore.$reset()
    progressStore.$reset()
    achievementsStore.$reset()
    router.push('/onboarding')
  }
}
</script>
