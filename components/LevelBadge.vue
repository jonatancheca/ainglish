<template>
  <div
    class="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-white select-none"
    :class="levelColor"
  >
    {{ level }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ level: number }>()

const levelColor = computed(() => {
  if (props.level <= 3) return 'bg-sky-400'
  if (props.level <= 6) return 'bg-violet-500'
  if (props.level <= 9) return 'bg-amber-500'
  return 'bg-rose-500'
})
</script>
