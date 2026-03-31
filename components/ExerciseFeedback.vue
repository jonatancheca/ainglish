<template>
  <div
    class="rounded-2xl p-4 text-center font-bold transition-all"
    :class="correct ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-700' : 'bg-red-50 border-2 border-red-300 text-red-700'"
  >
    <div class="text-2xl mb-1">{{ correct ? '✅' : '❌' }}</div>
    <p class="text-base font-black">{{ correct ? '¡Correcto!' : '¡Incorrecto!' }}</p>
    <p v-if="!correct" class="text-sm mt-1 text-slate-600">
      La respuesta correcta era: <strong>{{ correctAnswer }}</strong>
    </p>
    <p v-if="correct" class="text-sm mt-1 opacity-80">+{{ xp }} XP</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  correct: boolean
  correctAnswer?: string
  xp?: number
}>()
</script>
