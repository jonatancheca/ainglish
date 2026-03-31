<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-2xl font-black text-slate-800">
        Logros
      </h1>
      <p class="text-slate-500 text-sm mt-1">
        {{ unlockedCount }}/{{ total }} desbloqueados
      </p>
    </div>

    <!-- Progress bar -->
    <div class="h-3 bg-slate-100 rounded-full overflow-hidden">
      <div
        class="h-full bg-amber-400 rounded-full transition-all duration-700"
        :style="{ width: `${(unlockedCount / total) * 100}%` }"
      ></div>
    </div>

    <!-- Grid de logros -->
    <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <div
        v-for="ach in achievements"
        :key="ach.id"
        class="rounded-2xl border-2 p-4 flex items-center gap-4 transition-all"
        :class="isUnlocked(ach.id)
          ? 'border-amber-200 bg-amber-50'
          : 'border-slate-200 bg-slate-50 opacity-60'"
      >
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
          :class="isUnlocked(ach.id) ? 'bg-white shadow-sm' : 'bg-slate-200'"
        >
          {{ isUnlocked(ach.id) ? ach.icon : '🔒' }}
        </div>
        <div>
          <p class="font-black text-slate-800">
            {{ ach.title }}
          </p>
          <p class="text-sm text-slate-500">
            {{ ach.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ACHIEVEMENTS } from '~/data/achievements'

const achievementsStore = useAchievementsStore()
const achievements = ACHIEVEMENTS
const total = achievements.length
const unlockedCount = computed(() => achievementsStore.unlockedCount)
const isUnlocked = (id: string) => achievementsStore.isUnlocked(id)
</script>
