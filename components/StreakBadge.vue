<template>
  <div
    class="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-xl px-2.5 py-1"
    :class="{ 'animate-pop': justAnimated }"
  >
    <span class="text-base leading-none">🔥</span>
    <span class="font-black text-orange-500 text-sm">{{ streak }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ streak: number }>()

const justAnimated = ref(false)
watch(
  () => props.streak,
  () => {
    justAnimated.value = true
    setTimeout(() => (justAnimated.value = false), 300)
  },
)
</script>
