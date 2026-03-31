<template>
  <button
    class="w-full text-left rounded-2xl border-2 p-4 flex items-center gap-4 transition-all"
    :class="cardClass"
    :disabled="locked"
    @click="!locked && $emit('click')"
  >
    <!-- Icon circle -->
    <div
      class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
      :class="iconBg"
    >
      {{ lesson.icon }}
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <span
          class="font-black text-base"
          :class="locked ? 'text-slate-400' : 'text-slate-700'"
        >
          {{ lesson.title }}
        </span>
        <span
          v-if="completed"
          class="text-xs bg-sky-100 text-sky-600 font-bold px-2 py-0.5 rounded-full"
        >
          ¡Hecho!
        </span>
      </div>
      <p
        class="text-sm mt-0.5"
        :class="locked ? 'text-slate-400' : 'text-slate-500'"
      >
        {{ lesson.description }}
      </p>
      <!-- Stars -->
      <div class="flex gap-0.5 mt-1.5">
        <span
          v-for="i in 3"
          :key="i"
          class="text-base"
          :class="i <= (stars ?? 0) ? 'opacity-100' : 'opacity-25'"
        >⭐</span>
      </div>
    </div>

    <!-- Right: lock or arrow -->
    <div class="shrink-0 text-xl">
      {{ locked ? '🔒' : '→' }}
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Lesson } from '~/data/lessons'

const props = defineProps<{
  lesson: Lesson
  locked?: boolean
  completed?: boolean
  stars?: number
}>()

defineEmits<{ click: [] }>()

const cardClass = computed(() => {
  if (props.locked) return 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
  if (props.completed) return 'border-sky-200 bg-sky-50 hover:border-sky-400 cursor-pointer'
  return 'border-slate-200 bg-white hover:border-sky-300 hover:shadow-md cursor-pointer'
})

const iconBg = computed(() => {
  if (props.locked) return 'bg-slate-100'
  return 'bg-sky-50'
})
</script>
