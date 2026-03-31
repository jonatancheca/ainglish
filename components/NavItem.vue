<template>
  <NuxtLink
    :to="to"
    class="flex-1 flex flex-col items-center py-2 gap-0.5 text-xs font-bold transition-colors"
    :class="isActive ? 'text-sky-500' : 'text-slate-400'"
  >
    <span class="text-xl leading-none">{{ icon }}</span>
    <span>{{ label }}</span>
    <span
      v-if="isActive"
      class="absolute bottom-0 h-0.5 w-8 bg-sky-500 rounded-full"
    ></span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{ to: string; icon: string; label: string }>()
const route = useRoute()
const isActive = computed(() =>
  props.to === '/' ? route.path === '/' : route.path.startsWith(props.to),
)
</script>

<style scoped>
a { position: relative; }
</style>
