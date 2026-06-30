<template>
  <TresSprite
    v-if="texture"
    :scale="[width, height, 1]"
    :center="[0.5, 0]"
    :position="position"
    :render-order="renderOrder"
  >
    <TresSpriteMaterial
      :map="texture"
      :transparent="true"
      :alpha-test="0.1"
      :depth-write="false"
    />
  </TresSprite>
</template>

<script setup lang="ts">
import { SRGBColorSpace, type Texture, TextureLoader } from 'three'

const {
  src,
  position = [0, 0, 0],
  height = 2.4,
  renderOrder = 1,
} = defineProps<{
  src: string
  position?: [number, number, number]
  height?: number
  renderOrder?: number
}>()

const texture = shallowRef<Texture | null>(null)
const aspect = ref(1)
const width = computed(() => height * aspect.value)

let current: Texture | null = null

watch(
  () => src,
  (nextSrc) => {
    if (!nextSrc) return
    new TextureLoader().load(nextSrc, (tex) => {
      tex.colorSpace = SRGBColorSpace
      const img = tex.image as { width?: number, height?: number } | undefined
      if (img?.width && img?.height) {
        aspect.value = img.width / img.height
      }
      current?.dispose()
      current = tex
      texture.value = tex
    })
  },
  { immediate: true },
)

onBeforeUnmount(() => current?.dispose())
</script>
