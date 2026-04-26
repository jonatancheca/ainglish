<template>
  <figure
    class="flex select-none items-end justify-center"
    :class="containerClass"
    :aria-label="selectedAvatar.alt"
  >
    <img
      :src="selectedAvatar.image"
      :alt="selectedAvatar.alt"
      class="h-full w-full object-contain object-bottom drop-shadow-[0_12px_18px_rgba(15,23,42,0.18)]"
      draggable="false"
    />
  </figure>
</template>

<script setup lang="ts">
import { getAvatarOption, type CharacterAvatar } from '~/data/avatar-options'

const props = withDefaults(
  defineProps<{
    avatar?: Partial<CharacterAvatar> | null
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  {
    avatar: null,
    size: 'md',
  },
)

const sizeClasses = {
  sm: 'h-28 w-20',
  md: 'h-40 w-28',
  lg: 'h-64 w-44',
  xl: 'h-[21rem] w-56',
} as const

const selectedAvatar = computed(() => getAvatarOption(props.avatar))
const containerClass = computed(() => sizeClasses[props.size])
</script>
