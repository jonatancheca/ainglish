<template>
  <div
    ref="container"
    class="h-full w-full"
  ></div>
</template>

<script setup lang="ts">
import {
  AmbientLight,
  BoxGeometry,
  CanvasTexture,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  Fog,
  Group,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  NoToneMapping,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  SRGBColorSpace,
  Sprite,
  SpriteMaterial,
  type Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three'
import type { StreetHouse } from '~/data/aiworld'

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

type LabelVariant = 'default' | 'nearby' | 'completed'

interface HouseObject {
  id: string
  words: string[]
  palette: StreetHouse['palette']
  group: Group
  wallMat: MeshStandardMaterial
  roofMat: MeshStandardMaterial
  doorMat: MeshStandardMaterial
  windowMats: MeshStandardMaterial[]
  label: { sprite: Sprite, update: (text: string, variant: LabelVariant) => void }
  clickMeshes: Mesh[]
  labelVariant: LabelVariant
}

const LABEL_PALETTES: Record<LabelVariant, { bg: string, border: string, text: string }> = {
  default: { bg: '#ffffff', border: '#1e293b', text: '#475569' },
  nearby: { bg: '#d1fae5', border: '#10b981', text: '#047857' },
  completed: { bg: '#f1f5f9', border: '#cbd5e1', text: '#64748b' },
}

const MUTE_TARGET = { r: 0x94, g: 0xa3, b: 0xb8 } // slate-400

function muteHex(hex: string, amount: number): string {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  const mix = (channel: number, target: number) =>
    Math.round(channel + (target - channel) * amount)
  const out = [mix(r, MUTE_TARGET.r), mix(g, MUTE_TARGET.g), mix(b, MUTE_TARGET.b)]
  return `#${out.map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

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

function makeLabelTexture(text: string, variant: LabelVariant): { texture: CanvasTexture, ratio: number } {
  const palette = LABEL_PALETTES[variant]
  const dpr = 2
  const fontSize = 40 * dpr
  const padX = 30 * dpr
  const padY = 20 * dpr
  const label = variant === 'completed' ? `\u2713 ${text}` : text

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const font = `900 ${fontSize}px Nunito, system-ui, sans-serif`
  ctx.font = font
  const textWidth = ctx.measureText(label).width
  const w = Math.ceil(textWidth + padX * 2)
  const h = Math.ceil(fontSize + padY * 2)
  canvas.width = w
  canvas.height = h

  ctx.font = font
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const stroke = 6 * dpr
  ctx.fillStyle = palette.bg
  ctx.strokeStyle = palette.border
  ctx.lineWidth = stroke
  roundRect(ctx, stroke, stroke, w - stroke * 2, h - stroke * 2, h / 2)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = palette.text
  ctx.fillText(label, w / 2, h / 2 + 2 * dpr)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return { texture, ratio: w / h }
}

function makeLabel(text: string, variant: LabelVariant, worldHeight: number) {
  const { texture, ratio } = makeLabelTexture(text, variant)
  const material = new SpriteMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false })
  const sprite = new Sprite(material)
  sprite.center.set(0.5, 0.5)
  sprite.renderOrder = 6
  sprite.scale.set(worldHeight * ratio, worldHeight, 1)

  const update = (newText: string, newVariant: LabelVariant) => {
    const next = makeLabelTexture(newText, newVariant)
    material.map?.dispose()
    material.map = next.texture
    material.needsUpdate = true
    sprite.scale.set(worldHeight * next.ratio, worldHeight, 1)
  }

  return { sprite, update }
}

function makeImageSprite(height: number, renderOrder: number): Sprite {
  const material = new SpriteMaterial({ transparent: true, alphaTest: 0.1, depthWrite: false })
  const sprite = new Sprite(material)
  sprite.center.set(0.5, 0)
  sprite.renderOrder = renderOrder
  sprite.scale.set(height, height, 1)
  sprite.visible = false
  return sprite
}

function loadSpriteTexture(sprite: Sprite, src: string, height: number) {
  if (!src) {
    sprite.visible = false
    return
  }
  new TextureLoader().load(src, (tex: Texture) => {
    tex.colorSpace = SRGBColorSpace
    const img = tex.image as { width?: number, height?: number } | undefined
    const aspect = img?.width && img?.height ? img.width / img.height : 1
    sprite.material.map?.dispose()
    sprite.material.map = tex
    sprite.material.needsUpdate = true
    sprite.scale.set(height * aspect, height, 1)
    sprite.visible = true
  })
}

const container = ref<HTMLDivElement | null>(null)

let renderer: WebGLRenderer | null = null
let scene: Scene | null = null
let camera: PerspectiveCamera | null = null
let housesGroup: Group | null = null
let avatarGroup: Group | null = null
let avatarSprite: Sprite | null = null
let monsterSprite: Sprite | null = null
let barMesh: Mesh | null = null
let barMat: MeshStandardMaterial | null = null

let houseObjects: HouseObject[] = []
let smoothX = toWorldX(props.characterPosition)
let barrierLift = props.barrierOpen ? 1 : 0
let rafId = 0
let resizeObserver: ResizeObserver | null = null
let hovering = false

let startTime = 0
let lastTime = 0
const raycaster = new Raycaster()
const pointer = new Vector2()

function createHouse(house: StreetHouse): HouseObject {
  const group = new Group()
  group.position.x = toWorldX(house.position)

  const wallMat = new MeshStandardMaterial({ roughness: 0.9 })
  const wall = new Mesh(new BoxGeometry(2.2, 2, 2), wallMat)
  wall.position.y = 1
  wall.userData.houseId = house.id
  group.add(wall)

  const roofMat = new MeshStandardMaterial({ roughness: 0.85 })
  const roof = new Mesh(new ConeGeometry(1.85, 1.2, 4), roofMat)
  roof.position.y = 2.55
  roof.rotation.y = Math.PI / 4
  roof.userData.houseId = house.id
  group.add(roof)

  const doorMat = new MeshStandardMaterial()
  const door = new Mesh(new BoxGeometry(0.7, 1.1, 0.08), doorMat)
  door.position.set(0, 0.55, 1.02)
  group.add(door)

  const windowMats: MeshStandardMaterial[] = []
  for (const offset of [-0.55, 0.55]) {
    const winMat = new MeshStandardMaterial({ color: 0xe0f2fe, emissiveIntensity: 0.4 })
    const win = new Mesh(new BoxGeometry(0.45, 0.45, 0.06), winMat)
    win.position.set(offset, 1.4, 1.02)
    windowMats.push(winMat)
    group.add(win)
  }

  const label = makeLabel(house.words.join(' + '), 'default', 0.62)
  label.sprite.position.y = 3.75
  group.add(label.sprite)

  return {
    id: house.id,
    words: house.words,
    palette: house.palette,
    group,
    wallMat,
    roofMat,
    doorMat,
    windowMats,
    label,
    clickMeshes: [wall, roof],
    labelVariant: 'default',
  }
}

function applyHouseState(obj: HouseObject) {
  const completed = props.completedIds.includes(obj.id)
  const nearby = obj.id === props.nearbyHouseId

  obj.wallMat.color.set(completed ? muteHex(obj.palette.wallHex, 0.55) : obj.palette.wallHex)
  obj.roofMat.color.set(completed ? muteHex(obj.palette.roofHex, 0.55) : obj.palette.roofHex)
  obj.doorMat.color.set(completed ? muteHex(obj.palette.doorHex, 0.55) : obj.palette.doorHex)
  for (const mat of obj.windowMats) mat.emissive.set(completed ? 0x000000 : 0x7dd3fc)

  obj.group.scale.setScalar(nearby ? 1.07 : 1)

  const variant: LabelVariant = completed ? 'completed' : nearby ? 'nearby' : 'default'
  if (obj.labelVariant !== variant) {
    obj.label.update(obj.words.join(' + '), variant)
    obj.labelVariant = variant
  }
}

function disposeHouse(obj: HouseObject) {
  obj.group.traverse((child) => {
    if (child instanceof Mesh) child.geometry.dispose()
  })
  obj.wallMat.dispose()
  obj.roofMat.dispose()
  obj.doorMat.dispose()
  obj.windowMats.forEach((m) => m.dispose())
  obj.label.sprite.material.map?.dispose()
  obj.label.sprite.material.dispose()
}

function rebuildHouses() {
  if (!housesGroup) return
  for (const obj of houseObjects) {
    housesGroup.remove(obj.group)
    disposeHouse(obj)
  }
  houseObjects = props.houses.map(createHouse)
  for (const obj of houseObjects) {
    housesGroup.add(obj.group)
    applyHouseState(obj)
  }
}

function pickHouseId(event: PointerEvent): string | null {
  if (!renderer || !camera) return null
  const rect = renderer.domElement.getBoundingClientRect()
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(pointer, camera)
  const meshes = houseObjects.flatMap((o) => o.clickMeshes)
  const hits = raycaster.intersectObjects(meshes, false)
  return (hits[0]?.object.userData.houseId as string | undefined) ?? null
}

function onClick(event: PointerEvent) {
  const id = pickHouseId(event)
  if (id) emit('select-house', id)
}

function onPointerMove(event: PointerEvent) {
  const id = pickHouseId(event)
  const next = Boolean(id)
  if (next !== hovering && renderer) {
    hovering = next
    renderer.domElement.style.cursor = next ? 'pointer' : 'default'
  }
}

function resize() {
  if (!renderer || !camera || !container.value) return
  const w = container.value.clientWidth
  const h = container.value.clientHeight
  if (!w || !h) return
  renderer.setSize(w, h)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

function animate() {
  rafId = requestAnimationFrame(animate)
  if (!renderer || !scene || !camera) return

  const now = performance.now()
  const delta = (now - lastTime) / 1000
  const elapsed = (now - startTime) / 1000
  lastTime = now

  const targetX = toWorldX(props.characterPosition)
  smoothX += (targetX - smoothX) * Math.min(1, delta * 6)

  const barrierTarget = props.barrierOpen ? 1 : 0
  barrierLift += (barrierTarget - barrierLift) * Math.min(1, delta * 4)
  if (Math.abs(barrierTarget - barrierLift) < 0.001) barrierLift = barrierTarget

  camera.position.x = smoothX
  camera.lookAt(smoothX, 1.4, 1)

  if (avatarGroup) {
    avatarGroup.position.x = smoothX
    avatarGroup.position.y = Math.abs(Math.sin(elapsed * 3)) * 0.07
  }

  if (barMesh && barMat) {
    barMesh.position.y = 1.5 + barrierLift * 2.4
    barMat.opacity = 1 - barrierLift * 0.95
  }

  renderer.render(scene, camera)
}

onMounted(() => {
  const el = container.value
  if (!el) return

  const startX = toWorldX(props.characterPosition)

  renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(el.clientWidth || 1, el.clientHeight || 1)
  renderer.setClearColor(0xbae6fd, 1)
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = NoToneMapping
  el.appendChild(renderer.domElement)

  scene = new Scene()
  scene.background = new Color(0xbae6fd)
  scene.fog = new Fog(0xbae6fd, 45, 110)

  camera = new PerspectiveCamera(48, (el.clientWidth || 1) / (el.clientHeight || 1), 0.1, 200)
  camera.position.set(startX, CAMERA_HEIGHT, CAMERA_DISTANCE)

  scene.add(new AmbientLight(0xffffff, 1.25))
  const dir = new DirectionalLight(0xffffff, 1.6)
  dir.position.set(12, 18, 10)
  scene.add(dir)
  scene.add(new HemisphereLight(0xe0f2fe, 0xbbf7d0, 0.6))

  const ground = new Mesh(
    new PlaneGeometry(160, 70),
    new MeshStandardMaterial({ color: 0x86efac, roughness: 1 }),
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)

  const road = new Mesh(
    new PlaneGeometry(160, 5),
    new MeshStandardMaterial({ color: 0x475569, roughness: 0.95 }),
  )
  road.rotation.x = -Math.PI / 2
  road.position.set(0, 0.02, ROAD_Z)
  scene.add(road)

  const centerLine = new Mesh(
    new PlaneGeometry(160, 0.2),
    new MeshStandardMaterial({ color: 0xfde68a }),
  )
  centerLine.rotation.x = -Math.PI / 2
  centerLine.position.set(0, 0.03, ROAD_Z)
  scene.add(centerLine)

  housesGroup = new Group()
  scene.add(housesGroup)
  rebuildHouses()

  monsterSprite = makeImageSprite(2.3, 1)
  monsterSprite.position.set(toWorldX(24), 0, ROAD_Z - 0.6)
  scene.add(monsterSprite)
  loadSpriteTexture(monsterSprite, props.monsterImage, 2.3)

  avatarGroup = new Group()
  avatarGroup.position.set(startX, 0, ROAD_Z)
  avatarSprite = makeImageSprite(2.7, 4)
  avatarGroup.add(avatarSprite)
  scene.add(avatarGroup)
  loadSpriteTexture(avatarSprite, props.avatarImage, 2.7)

  const barrierGroup = new Group()
  barrierGroup.position.set(toWorldX(96), 0, ROAD_Z)

  barMat = new MeshStandardMaterial({ color: 0xb45309, transparent: true })
  barMesh = new Mesh(new BoxGeometry(0.4, 0.4, 4.4), barMat)
  barMesh.position.y = 1.5
  barrierGroup.add(barMesh)

  const postGeo = new CylinderGeometry(0.13, 0.13, 1.7, 12)
  const postMat = new MeshStandardMaterial({ color: 0x78350f })
  const post1 = new Mesh(postGeo, postMat)
  post1.position.set(0, 0.85, 2.1)
  const post2 = new Mesh(postGeo, postMat)
  post2.position.set(0, 0.85, -2.1)
  barrierGroup.add(post1, post2)

  const barrierLabel = makeLabel(props.barrierOpen ? 'Paso libre' : 'Barrera', props.barrierOpen ? 'nearby' : 'default', 0.62)
  barrierLabel.sprite.position.y = 2.8
  barrierGroup.add(barrierLabel.sprite)
  scene.add(barrierGroup)

  watch(
    () => props.barrierOpen,
    (open) => barrierLabel.update(open ? 'Paso libre' : 'Barrera', open ? 'nearby' : 'default'),
  )

  renderer.domElement.addEventListener('click', onClick)
  renderer.domElement.addEventListener('pointermove', onPointerMove)

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(el)

  startTime = performance.now()
  lastTime = startTime
  animate()
})

watch(
  () => props.houses,
  () => {
    rebuildHouses()
  },
)

watch(
  [() => props.nearbyHouseId, () => props.completedIds],
  () => {
    for (const obj of houseObjects) applyHouseState(obj)
  },
)

watch(
  () => props.avatarImage,
  (src) => {
    if (avatarSprite) loadSpriteTexture(avatarSprite, src, 2.7)
  },
)

watch(
  () => props.monsterImage,
  (src) => {
    if (monsterSprite) loadSpriteTexture(monsterSprite, src, 2.3)
  },
)

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  resizeObserver?.disconnect()

  if (renderer) {
    renderer.domElement.removeEventListener('click', onClick)
    renderer.domElement.removeEventListener('pointermove', onPointerMove)
  }

  for (const obj of houseObjects) disposeHouse(obj)
  houseObjects = []

  scene?.traverse((child) => {
    if (child instanceof Mesh) {
      child.geometry.dispose()
      const mat = child.material
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
      else mat.dispose()
    }
    if (child instanceof Sprite) {
      child.material.map?.dispose()
      child.material.dispose()
    }
  })

  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }

  renderer = null
  scene = null
  camera = null
})
</script>
