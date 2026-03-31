<template>
  <div
    class="relative select-none"
    :class="sizeClass"
  >
    <div
      v-if="monster.earStyle === 'horns'"
      class="absolute left-1/2 top-2 flex w-24 -translate-x-1/2 justify-between"
    >
      <span
        class="h-8 w-5 rounded-full border-4 border-slate-800"
        :class="monster.hornColor"
      ></span>
      <span
        class="h-8 w-5 rounded-full border-4 border-slate-800"
        :class="monster.hornColor"
      ></span>
    </div>

    <div
      v-if="monster.earStyle === 'wings'"
      class="absolute left-1/2 top-10 flex w-32 -translate-x-1/2 justify-between"
    >
      <span class="h-12 w-8 rounded-full border-4 border-slate-800 bg-white"></span>
      <span class="h-12 w-8 rounded-full border-4 border-slate-800 bg-white"></span>
    </div>

    <div
      v-if="monster.earStyle === 'leaf'"
      class="absolute left-1/2 top-5 flex w-32 -translate-x-1/2 justify-between"
    >
      <span class="h-10 w-6 rounded-full border-4 border-slate-800 bg-emerald-300"></span>
      <span class="h-10 w-6 rounded-full border-4 border-slate-800 bg-emerald-300"></span>
    </div>

    <div class="absolute bottom-2 left-1/2 -translate-x-1/2">
      <div
        class="relative h-40 w-36 rounded-[45%] border-4 border-slate-800"
        :class="monster.bodyColor"
      >
        <div
          v-if="monster.pattern === 'belly'"
          class="absolute bottom-6 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border-4 border-slate-800"
          :class="monster.accentColor"
        ></div>
        <div
          v-if="monster.pattern === 'spots'"
          class="absolute left-6 top-8 h-5 w-5 rounded-full"
          :class="monster.accentColor"
        ></div>
        <div
          v-if="monster.pattern === 'spots'"
          class="absolute right-7 top-16 h-4 w-4 rounded-full"
          :class="monster.accentColor"
        ></div>
        <div
          v-if="monster.pattern === 'stripes'"
          class="absolute left-1/2 top-8 h-3 w-24 -translate-x-1/2 rounded-full border-2 border-slate-800"
          :class="monster.accentColor"
        ></div>
        <div
          v-if="monster.pattern === 'stripes'"
          class="absolute left-1/2 top-16 h-3 w-20 -translate-x-1/2 rounded-full border-2 border-slate-800"
          :class="monster.accentColor"
        ></div>
        <div
          v-if="monster.pattern === 'heart'"
          class="absolute left-1/2 top-12 flex -translate-x-1/2 gap-0.5"
        >
          <span
            class="h-6 w-6 rounded-full"
            :class="monster.accentColor"
          ></span>
          <span
            class="h-6 w-6 rounded-full"
            :class="monster.accentColor"
          ></span>
          <span
            class="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 rotate-45"
            :class="monster.accentColor"
          ></span>
        </div>

        <div class="absolute left-1/2 top-14 flex -translate-x-1/2 gap-8">
          <span :class="leftEyeClass"></span>
          <span :class="rightEyeClass"></span>
        </div>

        <div class="absolute left-1/2 top-[5.25rem] flex w-20 -translate-x-1/2 justify-between">
          <span
            class="h-3 w-4 rounded-full opacity-80"
            :class="monster.cheekColor"
          ></span>
          <span
            class="h-3 w-4 rounded-full opacity-80"
            :class="monster.cheekColor"
          ></span>
        </div>

        <div class="absolute left-1/2 top-[6.4rem] h-2 w-3 -translate-x-1/2 rounded-full bg-slate-800"></div>
        <div class="absolute left-1/2 top-[7rem] h-5 w-12 -translate-x-1/2 rounded-b-full border-b-4 border-slate-800"></div>

        <div class="absolute -bottom-4 left-5 h-8 w-5 rounded-full border-4 border-slate-800 bg-amber-50"></div>
        <div class="absolute -bottom-4 right-5 h-8 w-5 rounded-full border-4 border-slate-800 bg-amber-50"></div>
        <div class="absolute bottom-5 -left-3 h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div>
        <div class="absolute bottom-5 -right-3 h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div>
      </div>
    </div>
  </div>
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

const sizeClass = computed(() => (props.size === 'sm' ? 'h-44 w-40' : 'h-56 w-48'))

const eyeClassMap = {
  round: 'h-4 w-4 rounded-full bg-slate-900',
  sleepy: 'h-1 w-5 rounded-full bg-slate-900',
  sparkle: 'relative h-4 w-4 rounded-full bg-slate-900 after:absolute after:left-1 after:top-0.5 after:h-1.5 after:w-1.5 after:rounded-full after:bg-white',
} as const

const leftEyeClass = computed(() => eyeClassMap[props.monster.eyeStyle])
const rightEyeClass = computed(() => eyeClassMap[props.monster.eyeStyle])
</script>