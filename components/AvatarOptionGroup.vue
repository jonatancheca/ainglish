<template>
  <div class="space-y-2">
    <label class="block text-sm font-black text-slate-700">{{ label }}</label>
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        :class="[
          'relative rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition-all border-2',
          modelValue === option.value
            ? 'border-sky-400 bg-sky-50 text-sky-600 shadow-sm'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
        ]"
        @click="$emit('update:modelValue', option.value)"
      >
        {{ option.label }}
        <span
          v-if="modelValue === option.value"
          class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sky-400 text-white text-xs"
        >
          ✓
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
}

defineProps<{
  label: string
  options: Option[]
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
