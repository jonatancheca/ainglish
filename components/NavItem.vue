<template>
  <NuxtLink
    :to="to"
    class="font-bold transition-colors"
    :class="[
      isActive ? 'text-sky-500' : 'text-slate-400 hover:text-slate-600',
      sidebar
        ? 'flex items-center gap-3 rounded-xl px-4 py-3 text-sm' + (isActive ? ' bg-sky-50' : ' hover:bg-slate-50')
        : 'relative flex-1 flex flex-col items-center py-2 gap-0.5 text-xs',
    ]"
  >
    <span
      class="leading-none"
      :class="sidebar ? 'text-2xl' : 'text-xl'"
    >{{ icon }}</span>
    <span>{{ label }}</span>
    <span
      v-if="isActive && !sidebar"
      class="absolute bottom-0 h-0.5 w-8 bg-sky-500 rounded-full"
    ></span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ to: string; icon: string; label: string; sidebar?: boolean }>(), {
  sidebar: false,
})
const route = useRoute()
const isActive = computed(() =>
  props.to === '/' ? route.path === '/' : route.path.startsWith(props.to),
)
</script>
