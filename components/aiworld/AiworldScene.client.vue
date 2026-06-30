<template>
  <TresCanvas
    clear-color="#bae6fd"
    :alpha="false"
    :antialias="true"
    :tone-mapping="NoToneMapping"
    :power-preference="'high-performance'"
  >
    <TresPerspectiveCamera
      ref="cameraRef"
      :position="[startX, CAMERA_HEIGHT, CAMERA_DISTANCE]"
      :fov="48"
      :near="0.1"
      :far="200"
    />

    <TresAmbientLight :intensity="1.25" />
    <TresDirectionalLight
      :position="[12, 18, 10]"
      :intensity="1.6"
    />
    <TresHemisphereLight
      :args="['#e0f2fe', '#bbf7d0', 0.6]"
    />

    <TresFog
      attach="fog"
      :args="['#bae6fd', 45, 110]"
    />

    <!-- Césped -->
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[160, 70]" />
      <TresMeshStandardMaterial
        color="#86efac"
        :roughness="1"
      />
    </TresMesh>

    <!-- Calle -->
    <TresMesh
      :rotation="[-Math.PI / 2, 0, 0]"
      :position="[0, 0.02, ROAD_Z]"
    >
      <TresPlaneGeometry :args="[160, 5]" />
      <TresMeshStandardMaterial
        color="#475569"
        :roughness="0.95"
      />
    </TresMesh>

    <!-- Línea central -->
    <TresMesh
      :rotation="[-Math.PI / 2, 0, 0]"
      :position="[0, 0.03, ROAD_Z]"
    >
      <TresPlaneGeometry :args="[160, 0.2]" />
      <TresMeshStandardMaterial color="#fde68a" />
    </TresMesh>

    <!-- Casas -->
    <HouseModel
      v-for="house in props.houses"
      :key="house.id"
      :house="house"
      :x="toWorldX(house.position)"
      :completed="props.completedIds.includes(house.id)"
      :nearby="house.id === props.nearbyHouseId"
      @click="emit('select-house', house.id)"
    />

    <!-- Monstruo anfitrión -->
    <SpriteBillboard
      v-if="props.monsterImage"
      :src="props.monsterImage"
      :position="[toWorldX(6), 0, ROAD_Z - 0.6]"
      :height="2.3"
    />

    <!-- Avatar del jugador -->
    <TresGroup
      ref="avatarRef"
      :position="[startX, 0, ROAD_Z]"
    >
      <SpriteBillboard
        :src="props.avatarImage"
        :height="2.7"
        :render-order="4"
      />
    </TresGroup>

    <!-- Barrera final -->
    <TresGroup :position="[toWorldX(96), 0, ROAD_Z]">
      <TresMesh
        ref="barRef"
        :position="[0, 1.5, 0]"
      >
        <TresBoxGeometry :args="[0.4, 0.4, 4.4]" />
        <TresMeshStandardMaterial
          color="#b45309"
          :transparent="true"
        />
      </TresMesh>
      <TresMesh :position="[0, 0.85, 2.1]">
        <TresCylinderGeometry :args="[0.13, 0.13, 1.7, 12]" />
        <TresMeshStandardMaterial color="#78350f" />
      </TresMesh>
      <TresMesh :position="[0, 0.85, -2.1]">
        <TresCylinderGeometry :args="[0.13, 0.13, 1.7, 12]" />
        <TresMeshStandardMaterial color="#78350f" />
      </TresMesh>
      <LabelSprite
        :text="props.barrierOpen ? 'Paso libre' : 'Barrera'"
        :position="[0, 2.8, 0]"
        :variant="props.barrierOpen ? 'nearby' : 'default'"
      />
    </TresGroup>
  </TresCanvas>
</template>

<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { NoToneMapping } from 'three'
import type { Group, Mesh, MeshStandardMaterial, PerspectiveCamera } from 'three'
import type { StreetHouse } from '~/data/aiworld'
import HouseModel from './HouseModel.vue'
import LabelSprite from './LabelSprite.vue'
import SpriteBillboard from './SpriteBillboard.vue'

const props = withDefaults(
  defineProps<{
    houses: StreetHouse[]
    characterPosition: number
    nearbyHouseId?: string | null
    barrierOpen?: boolean
    completedIds?: string[]
    avatarImage: string
    monsterImage?: string
  }>(),
  {
    nearbyHouseId: null,
    barrierOpen: false,
    completedIds: () => [],
    monsterImage: '',
  },
)

const emit = defineEmits<{ 'select-house': [id: string] }>()

const SCALE = 0.6
const ROAD_Z = 4
const CAMERA_HEIGHT = 6.5
const CAMERA_DISTANCE = 14

function toWorldX(position: number): number {
  return (position - 50) * SCALE
}

const startX = toWorldX(props.characterPosition)

const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const avatarRef = shallowRef<Group | null>(null)
const barRef = shallowRef<Mesh | null>(null)

const smoothX = ref(startX)
const barrierLift = ref(props.barrierOpen ? 1 : 0)

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  const followStep = Math.min(1, delta * 6)
  const targetX = toWorldX(props.characterPosition)
  smoothX.value += (targetX - smoothX.value) * followStep

  const barrierTarget = props.barrierOpen ? 1 : 0
  barrierLift.value += (barrierTarget - barrierLift.value) * Math.min(1, delta * 4)
  if (Math.abs(barrierTarget - barrierLift.value) < 0.001) {
    barrierLift.value = barrierTarget
  }

  const camera = cameraRef.value
  if (camera) {
    camera.position.x = smoothX.value
    camera.lookAt(smoothX.value, 1.4, 1)
  }

  const avatar = avatarRef.value
  if (avatar) {
    avatar.position.x = smoothX.value
    avatar.position.y = Math.abs(Math.sin(elapsed * 3)) * 0.07
  }

  const bar = barRef.value
  if (bar) {
    bar.position.y = 1.5 + barrierLift.value * 2.4
    const material = bar.material as MeshStandardMaterial
    if (material) material.opacity = 1 - barrierLift.value * 0.95
  }
})
</script>
