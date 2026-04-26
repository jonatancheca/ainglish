<template>
  <div class="grid grid-cols-2 gap-3">
    <button
      v-for="option in AVATAR_OPTIONS"
      :key="option.value"
      type="button"
      class="group relative flex min-h-72 flex-col items-center rounded-2xl border-2 bg-white p-3 text-center transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
      :class="modelValue === option.value ? 'border-sky-400 ring-4 ring-sky-100' : 'border-slate-200'"
      :aria-pressed="modelValue === option.value"
      :aria-label="option.description"
      @click="$emit('update:modelValue', option.value)"
    >
      <span
        v-if="modelValue === option.value"
        class="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-sm font-black text-white shadow-sm"
      >
        OK
      </span>

      <div class="flex h-48 w-full items-end justify-center rounded-xl bg-gradient-to-b from-sky-50 via-white to-rose-50 p-2">
        <img
          :src="option.image"
          :alt="option.alt"
          class="h-full w-full object-contain object-bottom drop-shadow-[0_8px_12px_rgba(15,23,42,0.16)]"
          draggable="false"
        />
      </div>

      <span class="mt-3 text-xs font-bold text-slate-500">
        {{ option.description }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { AVATAR_OPTIONS, type AvatarId } from '~/data/avatar-options'

defineProps<{
  modelValue: AvatarId
}>()

defineEmits<{
  'update:modelValue': [value: AvatarId]
}>()
</script>
