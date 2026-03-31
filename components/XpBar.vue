<template>
  <div class="w-full">
    <div class="flex justify-between text-xs font-bold text-slate-500 mb-1">
      <span>Nivel {{ level }}</span>
      <span>{{ xpInLevel }} / {{ xpNeeded }} XP</span>
    </div>
    <div class="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
      <div
        class="h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transition-all duration-700 ease-out"
        :style="{ width: `${progress * 100}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  level: number
  xpInLevel: number
  xpNeeded: number
  progress: number
}>()
</script>
