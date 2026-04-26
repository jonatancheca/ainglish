<template>
  <figure
    class="flex select-none items-end justify-center"
    :class="containerClass"
    :aria-label="monster.alt"
  >
    <img
      :src="monster.image"
      :alt="monster.alt"
      class="h-full w-full object-contain object-bottom drop-shadow-[0_14px_18px_rgba(15,23,42,0.2)]"
      draggable="false"
    />
  </figure>
</template>

<script setup lang="ts">
import type { KawaiiMonster } from '~/data/monsters'

const props = withDefaults(
  defineProps<{
    monster: KawaiiMonster
    size?: 'sm' | 'md'
  }>(),
  {
    size: 'md',
  },
)

const sizeClasses = {
  sm: 'h-44 w-40',
  md: 'h-56 w-48',
} as const

const containerClass = computed(() => sizeClasses[props.size])
</script>
