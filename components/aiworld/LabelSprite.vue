<template>
  <TresSprite
    v-if="texture"
    :scale="[width, props.worldHeight, 1]"
    :center="[0.5, 0.5]"
    :position="props.position"
    :render-order="6"
  >
    <TresSpriteMaterial
      :map="texture"
      :transparent="true"
      :depth-test="false"
      :depth-write="false"
    />
  </TresSprite>
</template>

<script setup lang="ts">
import { CanvasTexture, SRGBColorSpace, type Texture } from 'three'

const props = withDefaults(
  defineProps<{
    text: string
    position?: [number, number, number]
    variant?: 'default' | 'nearby' | 'completed'
    worldHeight?: number
  }>(),
  {
    position: () => [0, 0, 0],
    variant: 'default',
    worldHeight: 0.62,
  },
)

const PALETTES = {
  default: { bg: '#ffffff', border: '#1e293b', text: '#475569' },
  nearby: { bg: '#d1fae5', border: '#10b981', text: '#047857' },
  completed: { bg: '#f1f5f9', border: '#cbd5e1', text: '#64748b' },
} as const

const texture = shallowRef<Texture | null>(null)
const ratio = ref(3)
const width = computed(() => props.worldHeight * ratio.value)

let current: CanvasTexture | null = null

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

function draw() {
  if (typeof document === 'undefined') return

  const dpr = 2
  const fontSize = 40 * dpr
  const padX = 30 * dpr
  const padY = 20 * dpr
  const label = props.variant === 'completed' ? `\u2713 ${props.text}` : props.text

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const font = `900 ${fontSize}px Nunito, system-ui, sans-serif`
  ctx.font = font
  const textWidth = ctx.measureText(label).width
  const w = Math.ceil(textWidth + padX * 2)
  const h = Math.ceil(fontSize + padY * 2)
  canvas.width = w
  canvas.height = h

  // Resizing the canvas resets its context, so configure it again.
  ctx.font = font
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const colors = PALETTES[props.variant]
  const stroke = 6 * dpr
  ctx.fillStyle = colors.bg
  ctx.strokeStyle = colors.border
  ctx.lineWidth = stroke
  roundRect(ctx, stroke, stroke, w - stroke * 2, h - stroke * 2, h / 2)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = colors.text
  ctx.fillText(label, w / 2, h / 2 + 2 * dpr)

  ratio.value = w / h
  const tex = new CanvasTexture(canvas)
  tex.colorSpace = SRGBColorSpace
  current?.dispose()
  current = tex
  texture.value = tex
}

watch(() => [props.text, props.variant], draw, { immediate: true })
onBeforeUnmount(() => current?.dispose())
</script>
