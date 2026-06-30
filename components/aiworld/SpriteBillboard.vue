<template>
  <TresSprite
    v-if="texture"
    :scale="[width, props.height, 1]"
    :center="[0.5, 0]"
    :position="props.position"
    :render-order="props.renderOrder"
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

const props = withDefaults(
  defineProps<{
    src: string
    position?: [number, number, number]
    height?: number
    renderOrder?: number
  }>(),
  {
    position: () => [0, 0, 0],
    height: 2.4,
    renderOrder: 1,
  },
)

const texture = shallowRef<Texture | null>(null)
const aspect = ref(1)
const width = computed(() => props.height * aspect.value)

let current: Texture | null = null

watch(
  () => props.src,
  (src) => {
    if (!src) return
    new TextureLoader().load(src, (tex) => {
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
