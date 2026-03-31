<template>
  <div
    class="relative rounded-[2rem] border-4 border-slate-800 bg-white px-5 py-4 shadow-[0_10px_0_0_theme(colors.slate.200)]"
    :class="alignmentClass"
  >
    <p
      v-if="label"
      class="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-sky-500"
    >
      {{ label }}
    </p>
    <p class="text-base font-bold leading-6 text-slate-700">
      <slot></slot>
    </p>
    <div
      class="absolute -bottom-4 h-6 w-6 rotate-45 border-b-4 border-r-4 border-slate-800 bg-white"
      :class="tailClass"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    side?: 'left' | 'right'
    label?: string
  }>(),
  {
    side: 'left',
    label: '',
  },
)

const alignmentClass = computed(() => (props.side === 'left' ? 'mr-6' : 'ml-6'))
const tailClass = computed(() => (props.side === 'left' ? 'left-8' : 'right-8'))
</script>