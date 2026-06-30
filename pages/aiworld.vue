<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <!-- Info Bar -->
    <div class="shrink-0 flex items-center justify-between border-b-4 border-slate-800 bg-white px-4 py-2">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.28em] text-rose-400">
          {{ activeLesson.title }}
        </p>
        <p class="text-sm font-black text-slate-600">
          Calle {{ activeStreetIndex + 1 }}/{{ streetLessons.length }}
        </p>
      </div>
      <!-- Guía monstruosa compacta -->
      <p class="max-w-[55%] text-right text-xs font-bold text-slate-500 line-clamp-2">
        {{ guideText }}
      </p>
    </div>

    <!-- Viewport del Juego -->
    <div class="relative flex-1 overflow-hidden">
      <!-- Progreso Flotante Top-Right -->
      <div class="absolute right-3 top-3 z-20 rounded-[1.5rem] border-4 border-slate-800 bg-white px-3 py-1.5 shadow-[0_4px_0_0_theme(colors.slate.200)]">
        <p class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
          Casas
        </p>
        <p class="text-lg font-black leading-none text-slate-800">
          {{ completedHousesCount }}/{{ streetHouses.length }}
        </p>
      </div>

      <!-- Escena 3D (Three.js / TresJS) -->
      <div class="absolute inset-0">
        <ClientOnly>
          <AiworldScene
            :houses="streetHouses"
            :character-position="characterPosition"
            :nearby-house-id="nearbyHouse?.id ?? null"
            :barrier-open="barrierOpen"
            :completed-ids="completedHouseIds"
            :avatar-image="avatarImage"
            :monster-image="hostMonster.image"
            @select-house="focusHouse"
          />
          <template #fallback>
            <div class="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom,_#bae6fd,_#bbf7d0)]">
              <p class="rounded-full border-2 border-slate-800 bg-white px-4 py-2 text-sm font-black text-slate-600">
                Cargando mundo 3D…
              </p>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>

    <!-- Controles Inferiores -->
    <div class="shrink-0 border-t-4 border-slate-800 bg-white px-4 py-3">
      <div class="flex items-center gap-3">
        <!-- Botón Izquierda -->
        <button
          class="btn-secondary h-14 w-14 shrink-0 rounded-[1.5rem] text-2xl"
          @click="moveCharacter(-6)"
        >
          ←
        </button>

        <!-- Centro: entrar o avanzar -->
        <div class="flex flex-1 flex-col gap-1.5">
          <button
            v-if="canAdvanceToNextStreet"
            class="btn-primary w-full"
            @click="advanceStreet"
          >
            {{ nextStreetExists ? 'Siguiente calle →' : '🌟 ¡Final!' }}
          </button>
          <button
            v-else-if="nearbyHouse"
            class="btn-primary w-full"
            @click="enterNearbyHouse"
          >
            Entrar ↑
          </button>
          <div
            v-else
            class="rounded-[1.5rem] border-2 border-slate-300 bg-slate-50 px-4 py-2.5 text-center text-xs font-black text-slate-500"
          >
            {{ streetAdvanceMessage }}
          </div>
        </div>

        <!-- Botón Derecha -->
        <button
          class="btn-secondary h-14 w-14 shrink-0 rounded-[1.5rem] text-2xl"
          @click="moveCharacter(6)"
        >
          →
        </button>
      </div>
    </div>

    <!-- Panel de Detalles de Casa (Fondo modal) -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selectedHouse && selectedHouseDetailsOpen"
          class="fixed inset-0 z-40 bg-black/40 flex items-end"
          @click="selectedHouseDetailsOpen = false"
        >
          <div
            class="w-full rounded-t-[2rem] border-t-4 border-slate-800 bg-white p-5 shadow-[0_-12px_0_0_theme(colors.slate.200)]"
            @click.stop
          >
            <div class="flex flex-col gap-4">
              <div class="space-y-3">
                <p class="text-xs font-black uppercase tracking-[0.2em] text-rose-400">
                  Casa vocabulario
                </p>
                <h2 class="text-2xl font-black text-slate-800">
                  {{ selectedHouse.words.join(' + ') }}
                </h2>
                <p class="text-sm text-slate-500">
                  {{ hostMonster.name }} te recibirá con una explicación y luego entrarás en la lección de {{ activeLesson.title.toLowerCase() }}.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="word in selectedHouse.words"
                    :key="word"
                    class="rounded-full border-2 border-slate-800 bg-sky-50 px-3 py-1 text-sm font-black text-sky-600"
                  >
                    {{ word }}
                  </span>
                </div>
              </div>

              <NuxtLink
                :to="`/lesson/${activeLesson.id}?house=${selectedHouse.id}`"
                class="btn-primary w-full"
              >
                Entrar en la casa
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { getMonsterForLesson } from '~/data/monsters'
import { getLessonStreetHouses, getStreetLessons } from '~/data/aiworld'
import { getAvatarOption } from '~/data/avatar-options'
import AiworldScene from '~/components/aiworld/AiworldScene.client.vue'

definePageMeta({ layout: 'game' })

const progressStore = useProgressStore()
const userStore = useUserStore()

const streetLessons = getStreetLessons()

function isStreetCompleted(lesson: ReturnType<typeof getStreetLessons>[number]): boolean {
  const houses = getLessonStreetHouses(lesson)
  return progressStore.areAllHousesCompleted(houses.map((h) => h.id))
}

const initialStreetIndex = Math.max(
  streetLessons.findIndex((lesson) => !isStreetCompleted(lesson)),
  0,
)

const activeStreetIndex = ref(initialStreetIndex)
const characterPosition = ref(19) // 0-100% del mundo
const selectedHouseId = ref<string | null>(null)
const selectedHouseDetailsOpen = ref(false)

const activeLesson = computed<ReturnType<typeof getStreetLessons>[number]>(
  () => streetLessons[activeStreetIndex.value] ?? streetLessons[streetLessons.length - 1]!,
)
const streetHouses = computed(() => getLessonStreetHouses(activeLesson.value))
const hostMonster = computed(() => getMonsterForLesson(activeLesson.value.id))
const completedLessons = computed(() => progressStore.completedLessons.length)
const barrierOpen = computed(() => progressStore.areAllHousesCompleted(streetHouses.value.map((h) => h.id)))
const nextStreetExists = computed(() => activeStreetIndex.value < streetLessons.length - 1)
// Umbral de cercanía: 6% del mundo (ajustado para casas bien separadas)
const nearbyHouse = computed(() => {
  return streetHouses.value.find((house) => Math.abs(house.position - characterPosition.value) <= 6) ?? null
})

const selectedHouse = computed(() => {
  const targetId = selectedHouseId.value ?? nearbyHouse.value?.id
  return streetHouses.value.find((house) => house.id === targetId) ?? null
})

const canAdvanceToNextStreet = computed(
  () => barrierOpen.value && nextStreetExists.value && characterPosition.value >= 90,
)

const completedHousesCount = computed(() => streetHouses.value.filter((h) => progressStore.isHouseCompleted(h.id)).length)
const completedHouseIds = computed(() => streetHouses.value.filter((h) => progressStore.isHouseCompleted(h.id)).map((h) => h.id))
const avatarImage = computed(() => getAvatarOption(userStore.avatar).image)

const guideText = computed(() => {
  if (barrierOpen.value) {
    return `${hostMonster.value.name} ha bajado la barrera. ¡Ve al final de la calle!`
  }
  if (completedHousesCount.value > 0) {
    return `${hostMonster.value.name} dice: llevas ${completedHousesCount.value} de ${streetHouses.value.length} casas. ¡Sigue!`
  }
  return `${hostMonster.value.name} te espera. ¡Entra en una casa para comenzar!`
})

const streetAdvanceMessage = computed(() => {
  if (!nextStreetExists.value) {
    return '🌟 ¡Has llegado al final! Todas las lecciones completadas.'
  }

  if (!barrierOpen.value) {
    return `Completa todas las casas (${completedHousesCount.value}/${streetHouses.value.length}) para abrir la barrera.`
  }

  if (characterPosition.value < 90) {
    return 'La barrera está abierta. ¡Avanza hacia el final de la calle!'
  }

  return '¡Listo para la siguiente calle!'
})

// Mover el personaje con límites
function clampPosition(nextPosition: number): number {
  let max = 94
  if (!barrierOpen.value) {
    max = 92 // Barrera está al 96%, permitir acercarse justo antes
  }
  return Math.min(max, Math.max(2, nextPosition))
}

function moveCharacter(delta: number) {
  characterPosition.value = clampPosition(characterPosition.value + delta)
  
  // Auto-seleccionar casa cercana al mover (sin abrir modal)
  if (nearbyHouse.value) {
    selectedHouseId.value = nearbyHouse.value.id
  } else {
    selectedHouseDetailsOpen.value = false
  }
}

function focusHouse(houseId: string) {
  const house = streetHouses.value.find((item) => item.id === houseId)
  if (!house) return

  characterPosition.value = house.position
  selectedHouseId.value = house.id
  selectedHouseDetailsOpen.value = true
}

function enterNearbyHouse() {
  if (!nearbyHouse.value) return

  selectedHouseId.value = nearbyHouse.value.id
  navigateTo(`/lesson/${activeLesson.value.id}?house=${nearbyHouse.value.id}`)
}

function advanceStreet() {
  if (!canAdvanceToNextStreet.value) return

  activeStreetIndex.value += 1
  characterPosition.value = 19 // Reiniciar cerca de la primera casa
  selectedHouseId.value = null
  selectedHouseDetailsOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') moveCharacter(-6)
  if (event.key === 'ArrowRight') moveCharacter(6)
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    enterNearbyHouse()
  }
}

watch(activeLesson, () => {
  const firstHouse = streetHouses.value[0]
  if (!selectedHouseId.value && firstHouse) {
    selectedHouseId.value = firstHouse.id
  }
})

onMounted(() => {
  const firstHouse = streetHouses.value[0]
  if (firstHouse) {
    selectedHouseId.value = firstHouse.id
  }
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
