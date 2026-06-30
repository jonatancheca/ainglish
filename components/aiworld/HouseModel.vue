<template>
  <TresGroup
    :position="[x, 0, 0]"
    :scale="groupScale"
  >
    <!-- Pared -->
    <TresMesh
      :position="[0, 1, 0]"
      @click="onClick"
      @pointer-enter="onEnter"
      @pointer-leave="onLeave"
    >
      <TresBoxGeometry :args="[2.2, 2, 2]" />
      <TresMeshStandardMaterial
        :color="wallColor"
        :roughness="0.9"
      />
    </TresMesh>

    <!-- Techo (pirámide) -->
    <TresMesh
      :position="[0, 2.55, 0]"
      :rotation="[0, Math.PI / 4, 0]"
      @click="onClick"
    >
      <TresConeGeometry :args="[1.85, 1.2, 4]" />
      <TresMeshStandardMaterial
        :color="roofColor"
        :roughness="0.85"
      />
    </TresMesh>

    <!-- Puerta -->
    <TresMesh :position="[0, 0.55, 1.02]">
      <TresBoxGeometry :args="[0.7, 1.1, 0.08]" />
      <TresMeshStandardMaterial :color="doorColor" />
    </TresMesh>

    <!-- Ventanas -->
    <TresMesh
      v-for="offset in [-0.55, 0.55]"
      :key="offset"
      :position="[offset, 1.4, 1.02]"
    >
      <TresBoxGeometry :args="[0.45, 0.45, 0.06]" />
      <TresMeshStandardMaterial
        color="#e0f2fe"
        :emissive="windowEmissive"
        :emissive-intensity="0.4"
      />
    </TresMesh>

    <LabelSprite
      :text="house.words.join(' + ')"
      :position="[0, 3.75, 0]"
      :variant="labelVariant"
    />
  </TresGroup>
</template>

<script setup lang="ts">
import type { StreetHouse } from '~/data/aiworld'
import LabelSprite from './LabelSprite.vue'

const {
  house,
  x,
  completed = false,
  nearby = false,
} = defineProps<{
  house: StreetHouse
  x: number
  completed?: boolean
  nearby?: boolean
}>()

const emit = defineEmits<{ click: [] }>()

const MUTE_TARGET = { r: 0x94, g: 0xa3, b: 0xb8 } // slate-400

function muteHex(hex: string, amount: number): string {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  const mix = (channel: number, target: number) =>
    Math.round(channel + (target - channel) * amount)
  const out = [
    mix(r, MUTE_TARGET.r),
    mix(g, MUTE_TARGET.g),
    mix(b, MUTE_TARGET.b),
  ]
  return `#${out.map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

const wallColor = computed(() =>
  completed ? muteHex(house.palette.wallHex, 0.55) : house.palette.wallHex,
)
const roofColor = computed(() =>
  completed ? muteHex(house.palette.roofHex, 0.55) : house.palette.roofHex,
)
const doorColor = computed(() =>
  completed ? muteHex(house.palette.doorHex, 0.55) : house.palette.doorHex,
)
const windowEmissive = computed(() => (completed ? '#000000' : '#7dd3fc'))

const groupScale = computed<[number, number, number]>(() =>
  nearby ? [1.07, 1.07, 1.07] : [1, 1, 1],
)

const labelVariant = computed<'default' | 'nearby' | 'completed'>(() => {
  if (completed) return 'completed'
  if (nearby) return 'nearby'
  return 'default'
})

function onClick() {
  emit('click')
}

function onEnter() {
  if (typeof document !== 'undefined') document.body.style.cursor = 'pointer'
}

function onLeave() {
  if (typeof document !== 'undefined') document.body.style.cursor = 'auto'
}

onBeforeUnmount(onLeave)
</script>
