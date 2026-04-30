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

      <!-- Escena Principal -->
      <div class="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_45%),linear-gradient(to_bottom,_#bae6fd,_#e0f2fe_55%,_#bbf7d0_55%,_#86efac_100%)]">
        <!-- Calle (Fondo) - fija, no se mueve -->
        <div class="absolute inset-x-0 bottom-0 h-[18%] bg-slate-700"></div>
        <div
          class="absolute inset-x-0 h-0.5 bg-yellow-200 opacity-70"
          style="bottom: 18%"
        ></div>

        <!-- Mundo que se mueve (300% ancho = 3× viewport) -->
        <!-- La cámara centra al personaje usando: translateX(calc(50vw - posición_personaje_en_mundo)) -->
        <!-- Mundo: 300vw. Personaje en left: characterPosition% → position vw = characterPosition * 3 vw -->
        <!-- Para centrarlo: translateX(calc(50vw - characterPosition * 3vw)) -->
        <div
          class="absolute inset-y-0 left-0 h-full transition-transform duration-300 ease-out"
          :style="{ width: '200vw', transform: `translateX(calc(50vw - ${characterPosition * 2}vw))` }"
        >
          <button
            v-for="house in streetHouses"
            :key="house.id"
            type="button"
            class="absolute flex -translate-x-1/2 flex-col items-center cursor-pointer transition-all duration-300"
            :class="isNearbyHouse(house.id) ? 'scale-105' : ''"
            :style="{ left: `${house.position}%`, bottom: '18%' }"
            @click="focusHouse(house.id)"
          >
            <div class="relative flex flex-col items-center">
              <!-- Marca de completada -->
              <div
                v-if="progressStore.isHouseCompleted(house.id)"
                class="absolute -right-2 -top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-800 bg-emerald-400 text-xs text-white font-black"
              >
                ✓
              </div>

              <!-- Techo -->
              <div
                class="h-6 w-20 rounded-t-[1.5rem] border-4 border-b-0 transition-all duration-300"
                :class="[
                  progressStore.isHouseCompleted(house.id)
                    ? 'border-slate-400 opacity-70'
                    : 'border-slate-800',
                  house.palette.roof,
                  progressStore.isHouseCompleted(house.id) ? 'saturate-50' : 'saturate-100'
                ]"
              ></div>

              <!-- Pared -->
              <div
                class="relative h-16 w-20 rounded-b-[1rem] border-4 transition-all duration-300"
                :class="[
                  progressStore.isHouseCompleted(house.id)
                    ? 'border-slate-400 opacity-70'
                    : 'border-slate-800',
                  house.palette.wall,
                  progressStore.isHouseCompleted(house.id) ? 'saturate-50' : 'saturate-100'
                ]"
              >
                <div class="absolute left-1/2 top-2 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-slate-800 bg-white"></div>
                <div
                  class="absolute bottom-0 left-1/2 h-9 w-7 -translate-x-1/2 rounded-t-lg border-4 border-b-0 transition-all duration-300"
                  :class="[
                    progressStore.isHouseCompleted(house.id) ? 'border-slate-400' : 'border-slate-800',
                    house.palette.door,
                    progressStore.isHouseCompleted(house.id) ? 'opacity-70' : 'opacity-100'
                  ]"
                ></div>
              </div>
            </div>

            <!-- Etiqueta de palabras -->
            <span
              class="mt-3 max-w-24 rounded-full border-2 px-3 py-1 text-center text-[11px] font-black transition-all duration-300"
              :class="
                progressStore.isHouseCompleted(house.id)
                  ? 'border-slate-300 bg-slate-100 text-slate-500'
                  : isNearbyHouse(house.id)
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-700 scale-110'
                    : 'border-slate-800 bg-white text-slate-600'
              "
            >
              {{ house.words.join(' + ') }}
            </span>
          </button>

          <!-- Avatar del Personaje — se mueve dentro del mundo -->
          <div
            class="absolute -translate-x-1/2 transition-all duration-300 ease-out"
            :style="{ left: `${characterPosition}%`, bottom: '18%' }"
          >
            <AvatarIllustration
              :avatar="userStore.avatar"
              size="sm"
            />
          </div>

          <!-- Barrera Final (al 96% del mundo) -->
          <div
            class="absolute flex flex-col items-center"
            style="left: 96%; bottom: 18%"
          >
            <div
              class="h-28 w-5 rounded-full border-4 border-slate-800 bg-amber-700 transition-all duration-500"
              :class="barrierOpen ? 'opacity-0 -translate-y-8' : 'opacity-100'"
            ></div>
            <div
              class="mt-2 rounded-full border-2 border-slate-800 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300"
              :class="barrierOpen ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-700'"
            >
              {{ barrierOpen ? 'Paso libre' : 'Barrera' }}
            </div>
          </div>
        </div>
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

const activeLesson = computed(() => streetLessons[activeStreetIndex.value] ?? streetLessons[streetLessons.length - 1])
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

// Función auxiliar para verificar si una casa está cerca
function isNearbyHouse(houseId: string): boolean {
  const house = streetHouses.value.find((h) => h.id === houseId)
  if (!house) return false
  return Math.abs(house.position - characterPosition.value) <= 6
}

// Mover el personaje con límites
function clampPosition(nextPosition: number): number {
  let max = 94
  if (!barrierOpen.value) {
    max = 85 // Barrera está al 96%, bloquear antes
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
  if (event.key === 'Enter') enterNearbyHouse()
}

watch(activeLesson, () => {
  if (!selectedHouseId.value && streetHouses.value.length) {
    selectedHouseId.value = streetHouses.value[0].id
  }
})

onMounted(() => {
  if (streetHouses.value.length) {
    selectedHouseId.value = streetHouses.value[0].id
  }
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
