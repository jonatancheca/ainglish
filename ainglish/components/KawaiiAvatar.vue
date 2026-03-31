<template>
  <div
    class="relative select-none overflow-hidden"
    :class="containerClass"
  >
    <div
      class="absolute inset-0"
      :class="hairScaleClass"
    >
      <div
        class="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
        :class="hairBackClass"
      ></div>

      <div
        v-if="showTwinTails"
        class="absolute left-1 top-6 h-16 w-10 rounded-full"
        :class="hairAccessoryClass"
      ></div>
      <div
        v-if="showTwinTails"
        class="absolute right-1 top-6 h-16 w-10 rounded-full"
        :class="hairAccessoryClass"
      ></div>
      <div
        v-if="showBun"
        class="absolute left-1/2 -top-3 z-20 h-10 w-12 -translate-x-1/2 rounded-full"
        :class="hairAccessoryClass"
      ></div>
    </div>

    <div
      class="absolute left-1/2 top-1 flex -translate-x-1/2 flex-col items-center"
      :class="bodyScaleClass"
    >
      <div
        class="relative border-4 border-slate-800 bg-amber-50"
        :class="faceClass"
      >
        <div
          v-if="avatar.hair !== 'bald'"
          class="absolute left-1/2 top-0 z-10 h-8 w-24 -translate-x-1/2 rounded-t-[999px]"
          :class="hairFrontClass"
        ></div>
        <div
          v-if="showBangs"
          class="absolute left-1/2 top-5 z-10 h-4 w-20 -translate-x-1/2 rounded-b-2xl"
          :class="hairFrontClass"
        ></div>

        <div class="absolute left-1/2 top-8 flex -translate-x-1/2 gap-7">
          <div class="relative flex h-5 w-5 items-center justify-center">
            <span :class="eyeBaseClass"></span>
            <span
              v-if="avatar.eyeStyle === 'starry'"
              class="absolute text-[10px] text-white"
            >★</span>
            <span
              v-if="avatar.eyeStyle === 'happy'"
              class="absolute -top-1 text-base font-black text-slate-800"
            >◠</span>
            <span
              v-if="avatar.eyeStyle === 'sleepy'"
              class="absolute -top-0.5 text-sm font-black text-slate-800"
            >﹁</span>
          </div>
          <div class="relative flex h-5 w-5 items-center justify-center">
            <span :class="rightEyeClass"></span>
            <span
              v-if="avatar.eyeStyle === 'starry'"
              class="absolute text-[10px] text-white"
            >★</span>
            <span
              v-if="avatar.eyeStyle === 'happy'"
              class="absolute -top-1 text-base font-black text-slate-800"
            >◠</span>
            <span
              v-if="avatar.eyeStyle === 'wink'"
              class="absolute -top-0.5 text-sm font-black text-slate-800"
            >﹂</span>
            <span
              v-if="avatar.eyeStyle === 'sleepy'"
              class="absolute -top-0.5 text-sm font-black text-slate-800"
            >﹁</span>
          </div>
        </div>

        <div class="absolute left-1/2 top-16 h-5 w-8 -translate-x-1/2 rounded-b-full border-b-4 border-slate-800"></div>

        <!-- Mofletes -->
        <div
          v-if="avatar.cheeks !== 'none'"
          class="absolute left-1/2 top-[3.25rem] flex -translate-x-1/2 justify-between"
          :style="{ width: '5.5rem' }"
        >
          <span
            class="h-3 w-4 opacity-60"
            :class="[cheekColorClass, cheekShapeClass]"
          ></span>
          <span
            class="h-3 w-4 opacity-60"
            :class="[cheekColorClass, cheekShapeClass]"
          ></span>
        </div>

        <div
          v-if="avatar.glasses !== 'none'"
          class="absolute left-1/2 top-[1.75rem] flex -translate-x-1/2 items-center gap-1"
          :class="glassesColorClass"
        >
          <span class="h-6 w-6 rounded-full border-[3px]"></span>
          <span class="h-1 w-3 rounded-full bg-current"></span>
          <span class="h-6 w-6 rounded-full border-[3px]"></span>
        </div>
      </div>

      <div class="relative flex flex-col items-center">
        <div
          class="relative border-4 border-slate-800"
          :class="outfitClass"
        >
          <div class="absolute -left-4 top-3 h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div>
          <div class="absolute -right-4 top-3 h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div>
          <div
            v-if="avatar.outfit === 'tee-pants' || avatar.outfit === 'tee-jeans'"
            class="absolute left-1/2 bottom-0 h-8 w-12 -translate-x-1/2 rounded-b-xl border-t-4 border-slate-800 bg-slate-100 opacity-70"
          ></div>
          <div
            v-if="avatar.outfit === 'long-dress'"
            class="absolute left-1/2 bottom-0 h-14 w-20 -translate-x-1/2 rounded-b-[2rem] bg-pink-200 opacity-70"
          ></div>
          <div
            v-if="avatar.outfit === 'hoodie-shorts'"
            class="absolute left-1/2 top-1 h-4 w-10 -translate-x-1/2 rounded-full bg-white/40"
          ></div>
        </div>

        <div class="relative -mt-1 flex gap-5">
          <div class="h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div>
          <div class="h-10 w-4 rounded-full border-4 border-slate-800 bg-amber-50"></div>
          <div
            class="absolute bottom-0 left-[-4px] h-4 w-8 rounded-full border-4 border-slate-800"
            :class="shoeClass"
          ></div>
          <div
            class="absolute bottom-0 right-[-4px] h-4 w-8 rounded-full border-4 border-slate-800"
            :class="shoeClass"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CharacterAvatar } from '~/data/avatar-options'

const props = withDefaults(
  defineProps<{
    avatar: CharacterAvatar
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  },
)

const sizeClasses = {
  sm: { container: 'h-32 w-28', body: 'scale-75 origin-top', hair: 'scale-75 origin-top' },
  md: { container: 'h-44 w-36', body: 'scale-90 origin-top', hair: 'scale-90 origin-top' },
  lg: { container: 'h-56 w-44', body: 'scale-100 origin-top', hair: 'scale-100 origin-top' },
} as const

const hairPalette = {
  amber: 'bg-amber-700',
  orange: 'bg-orange-700',
  stone: 'bg-stone-800',
  rose: 'bg-rose-700',
  teal: 'bg-teal-600',
} as const

const eyePalette = {
  midnight: 'bg-slate-900',
  hazel: 'bg-amber-700',
  emerald: 'bg-emerald-500',
  sky: 'bg-sky-500',
  violet: 'bg-violet-500',
} as const

const outfitPalette = {
  'tee-pants': 'h-16 w-20 rounded-t-3xl rounded-b-2xl bg-sky-400',
  'long-dress': 'h-24 w-20 rounded-t-3xl rounded-b-[2.75rem] bg-pink-400',
  'tee-skirt': 'h-[4.5rem] w-20 rounded-t-3xl rounded-b-[2rem] bg-fuchsia-400',
  'tee-jeans': 'h-16 w-20 rounded-t-3xl rounded-b-2xl bg-indigo-400',
  'hoodie-shorts': 'h-16 w-20 rounded-[2rem] bg-emerald-400',
} as const

const shoePalette = {
  sneakers: 'bg-white',
  boots: 'bg-amber-800',
  sandals: 'bg-orange-300',
  'mary-janes': 'bg-rose-500',
  rollers: 'bg-cyan-400',
} as const

const cheekColorPalette = {
  rose: 'bg-rose-300',
  peach: 'bg-orange-200',
  pink: 'bg-pink-300',
  coral: 'bg-red-300',
  berry: 'bg-fuchsia-300',
} as const

const cheekShapePalette = {
  none: '',
  round: 'rounded-full',
  oval: 'rounded-[60%]',
  star: 'rounded-sm rotate-45',
} as const

const containerClass = computed(() => sizeClasses[props.size].container)
const bodyScaleClass = computed(() => sizeClasses[props.size].body)
const hairScaleClass = computed(() => sizeClasses[props.size].hair)
const showTwinTails = computed(() => props.avatar.hair === 'twin-tails')
const showBun = computed(() => props.avatar.hair === 'bun')
const showBangs = computed(() => props.avatar.hair === 'bangs')

const hairColorClass = computed(() => hairPalette[props.avatar.hairColor])
const hairBackClass = computed(() => {
  if (props.avatar.hair === 'bald') return 'h-0 w-0'
  return `h-24 w-28 ${hairColorClass.value}`
})
const hairFrontClass = computed(() => hairColorClass.value)
const hairAccessoryClass = computed(() => `${hairColorClass.value} border-4 border-slate-800`)

const faceClass = computed(() => {
  const base = 'h-28 w-28 overflow-hidden'
  const variants = {
    'soft-round': 'rounded-[44%]',
    round: 'rounded-full',
    oval: 'rounded-[45%] rounded-b-[42%]',
    square: 'rounded-[28%]',
    heart: 'rounded-[42%] rounded-b-[35%]',
  } as const

  return `${base} ${variants[props.avatar.faceShape]}`
})

const eyeShapeClass = computed(() => {
  if (props.avatar.eyeStyle === 'happy' || props.avatar.eyeStyle === 'sleepy') {
    return 'h-1 w-5 rounded-full bg-transparent'
  }
  if (props.avatar.eyeStyle === 'wink') {
    return 'h-4 w-5 rounded-full'
  }
  return 'h-4 w-4 rounded-full'
})

const eyeBaseClass = computed(() => `${eyeShapeClass.value} ${eyePalette[props.avatar.eyeColor]}`)
const rightEyeClass = computed(() => {
  if (props.avatar.eyeStyle === 'wink') return 'h-1 w-5 rounded-full bg-slate-900'
  return `${eyeShapeClass.value} ${eyePalette[props.avatar.eyeColor]}`
})

const glassesColorClass = computed(() => (props.avatar.glasses === 'red' ? 'text-rose-500' : 'text-sky-500'))
const outfitClass = computed(() => outfitPalette[props.avatar.outfit])
const shoeClass = computed(() => shoePalette[props.avatar.shoes])
const cheekColorClass = computed(() => cheekColorPalette[props.avatar.cheekColor ?? 'rose'])
const cheekShapeClass = computed(() => cheekShapePalette[props.avatar.cheeks ?? 'round'])
</script>