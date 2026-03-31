<template>
  <div class="space-y-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.28em] text-rose-400">
          Modo aventura
        </p>
        <h1 class="mt-2 text-3xl font-black text-slate-800">
          AIworld
        </h1>
        <p class="mt-2 text-sm text-slate-500">
          Recorre una calle por lección, entra en casas kawaii y desbloquea la barrera para llegar a la siguiente.
        </p>
      </div>
      <div class="rounded-[1.75rem] border-4 border-slate-800 bg-white px-4 py-3 text-right shadow-[0_8px_0_0_theme(colors.slate.200)]">
        <p class="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
          Calle actual
        </p>
        <p class="mt-1 text-lg font-black text-slate-800">
          {{ activeLesson.title }}
        </p>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-3">
      <div class="rounded-[1.75rem] border-4 border-slate-800 bg-white px-4 py-3 shadow-[0_8px_0_0_theme(colors.slate.200)]">
        <p class="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
          Progreso callejero
        </p>
        <p class="mt-2 text-2xl font-black text-slate-800">
          {{ completedLessons }}/{{ streetLessons.length }}
        </p>
      </div>
      <div class="rounded-[1.75rem] border-4 border-slate-800 bg-white px-4 py-3 shadow-[0_8px_0_0_theme(colors.slate.200)]">
        <p class="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
          Casas en esta calle
        </p>
        <p class="mt-2 text-2xl font-black text-slate-800">
          {{ completedHousesCount }}/{{ streetHouses.length }}
        </p>
      </div>
      <div class="rounded-[1.75rem] border-4 border-slate-800 bg-white px-4 py-3 shadow-[0_8px_0_0_theme(colors.slate.200)]">
        <p class="text-xs font-black uppercase tracking-[0.2em] text-amber-500">
          Barrera
        </p>
        <p
          class="mt-2 text-base font-black"
          :class="barrierOpen ? 'text-emerald-600' : 'text-amber-600'"
        >
          {{ barrierOpen ? 'Abierta' : 'Cerrada' }}
        </p>
      </div>
    </div>

    <div class="overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-gradient-to-b from-sky-200 via-cyan-100 to-lime-100 p-4 shadow-[0_12px_0_0_theme(colors.sky.100)]">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <ComicBubble label="Guía monstruosa">
          {{ guideText }}
        </ComicBubble>
        <KawaiiMonster
          :monster="hostMonster"
          size="sm"
        />
      </div>

      <div class="relative h-[24rem] overflow-hidden rounded-[1.75rem] border-4 border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_45%),linear-gradient(to_bottom,_#bae6fd,_#e0f2fe_55%,_#bbf7d0_55%,_#86efac_100%)]">
        <div class="absolute inset-x-0 bottom-0 h-24 bg-slate-700"></div>
        <div class="absolute inset-x-0 bottom-16 h-2 bg-yellow-200 opacity-70"></div>
        <div class="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
          Calle {{ activeStreetIndex + 1 }}
        </div>

        <button
          v-for="house in streetHouses"
          :key="house.id"
          type="button"
          class="absolute bottom-24 flex -translate-x-1/2 flex-col items-center transition-transform hover:-translate-y-1"
          :style="{ left: `${house.position}%` }"
          @click="focusHouse(house.id)"
        >
          <div class="relative flex flex-col items-center">
            <div
              v-if="progressStore.isHouseCompleted(house.id)"
              class="absolute -right-2 -top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-800 bg-emerald-400 text-xs text-white"
            >
              ✓
            </div>
            <div
              class="h-8 w-24 rounded-t-[2rem] border-4 border-b-0"
              :class="[house.palette.roof, progressStore.isHouseCompleted(house.id) ? 'border-emerald-500' : 'border-slate-800']"
            ></div>
            <div
              class="relative h-20 w-24 rounded-b-[1.25rem] border-4"
              :class="[house.palette.wall, progressStore.isHouseCompleted(house.id) ? 'border-emerald-500' : 'border-slate-800']"
            >
              <div class="absolute left-1/2 top-2 h-7 w-7 -translate-x-1/2 rounded-full border-4 border-slate-800 bg-white"></div>
              <div
                class="absolute bottom-0 left-1/2 h-10 w-8 -translate-x-1/2 rounded-t-xl border-4 border-b-0 border-slate-800"
                :class="house.palette.door"
              ></div>
            </div>
          </div>
          <span class="mt-2 max-w-24 rounded-full border-2 px-3 py-1 text-center text-[11px] font-black"
            :class="progressStore.isHouseCompleted(house.id) ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-800 bg-white text-slate-600'"
          >
            {{ house.words.join(' + ') }}
          </span>
        </button>

        <div
          class="absolute bottom-24 transition-all duration-200"
          :style="{ left: `calc(${characterPosition}% - 2.25rem)` }"
        >
          <KawaiiAvatar
            :avatar="userStore.avatar"
            size="sm"
          />
        </div>

        <div class="absolute bottom-24 right-3 flex flex-col items-center">
          <div
            class="h-28 w-5 rounded-full border-4 border-slate-800 bg-amber-700"
            :class="barrierOpen ? 'opacity-60' : ''"
          ></div>
          <div
            class="mt-1 rounded-full border-2 border-slate-800 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em]"
            :class="barrierOpen ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-700'"
          >
            {{ barrierOpen ? 'Paso libre' : 'Barrera' }}
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-3">
      <button
        class="btn-secondary w-full"
        @click="moveCharacter(-10)"
      >
        ← Izquierda
      </button>
      <button
        class="btn-primary w-full"
        :disabled="!nearbyHouse"
        @click="enterNearbyHouse"
      >
        {{ nearbyHouse ? `Entrar en ${nearbyHouse.words.join(' + ')}` : 'Acércate a una casa' }}
      </button>
      <button
        class="btn-secondary w-full"
        @click="moveCharacter(10)"
      >
        Derecha →
      </button>
    </div>

    <div
      v-if="selectedHouse"
      class="rounded-[2rem] border-4 border-slate-800 bg-white p-5 shadow-[0_10px_0_0_theme(colors.slate.200)]"
    >
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
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

        <div class="w-full max-w-xs rounded-[1.75rem] border-4 border-slate-800 bg-gradient-to-br from-white to-rose-50 p-4 shadow-[0_8px_0_0_theme(colors.rose.100)]">
          <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            Estado de calle
          </p>
          <p class="mt-2 text-sm text-slate-600">
            {{ barrierOpen ? 'La barrera ya está bajada. Puedes cruzar a la siguiente calle cuando quieras.' : 'Completa la lección en esta calle para bajar la barrera del final.' }}
          </p>
          <NuxtLink
            :to="`/lesson/${activeLesson.id}?house=${selectedHouse.id}`"
            class="btn-primary mt-4 w-full"
          >
            Entrar en la casa
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="rounded-[2rem] border-4 border-slate-800 bg-white p-5 shadow-[0_10px_0_0_theme(colors.slate.200)]">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
            Final de la calle
          </p>
          <p class="mt-2 text-sm text-slate-500">
            {{ streetAdvanceMessage }}
          </p>
        </div>
        <button
          class="btn-primary"
          :disabled="!canAdvanceToNextStreet"
          @click="advanceStreet"
        >
          {{ nextStreetExists ? 'Caminar a la siguiente calle →' : 'Has llegado al final 🌟' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMonsterForLesson } from '~/data/monsters'
import { getLessonStreetHouses, getStreetLessons } from '~/data/aiworld'

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
const characterPosition = ref(8)
const selectedHouseId = ref<string | null>(null)

const activeLesson = computed(() => streetLessons[activeStreetIndex.value] ?? streetLessons[streetLessons.length - 1])
const streetHouses = computed(() => getLessonStreetHouses(activeLesson.value))
const hostMonster = computed(() => getMonsterForLesson(activeLesson.value.id))
const completedLessons = computed(() => progressStore.completedLessons.length)
const barrierOpen = computed(() => progressStore.areAllHousesCompleted(streetHouses.value.map((h) => h.id)))
const nextStreetExists = computed(() => activeStreetIndex.value < streetLessons.length - 1)
const nearbyHouse = computed(() => {
  return streetHouses.value.find((house) => Math.abs(house.position - characterPosition.value) <= 8) ?? null
})

const selectedHouse = computed(() => {
  const targetId = selectedHouseId.value ?? nearbyHouse.value?.id
  return streetHouses.value.find((house) => house.id === targetId) ?? null
})

const canAdvanceToNextStreet = computed(
  () => barrierOpen.value && nextStreetExists.value && characterPosition.value >= 88,
)

const completedHousesCount = computed(() => streetHouses.value.filter((h) => progressStore.isHouseCompleted(h.id)).length)

const guideText = computed(() => {
  if (barrierOpen.value) {
    return `${hostMonster.value.name} ha bajado la barrera. Recorre el final de la calle para avanzar.`
  }
  if (completedHousesCount.value > 0) {
    return `${hostMonster.value.name} dice: llevas ${completedHousesCount.value} de ${streetHouses.value.length} casas. ¡Sigue así!`
  }
  return `${hostMonster.value.name} te espera en una casa. Acércate y entra para completar esta calle.`
})

const streetAdvanceMessage = computed(() => {
  if (!nextStreetExists.value) {
    return 'Esta es la última calle disponible por ahora. Cuando completes todo, te quedarás con el barrio entero despejado.'
  }

  if (!barrierOpen.value) {
    return `La barrera seguirá levantada hasta que completes todas las casas (${completedHousesCount.value}/${streetHouses.value.length}).`
  }

  if (characterPosition.value < 88) {
    return 'La barrera ya está abajo. Camina hasta el extremo derecho para pasar a la siguiente calle.'
  }

  return 'Ya estás en el final de la calle. Puedes cruzar a la siguiente ahora mismo.'
})

function clampPosition(nextPosition: number): number {
  return Math.min(92, Math.max(8, nextPosition))
}

function moveCharacter(delta: number) {
  characterPosition.value = clampPosition(characterPosition.value + delta)
  if (nearbyHouse.value) {
    selectedHouseId.value = nearbyHouse.value.id
  }
}

function focusHouse(houseId: string) {
  const house = streetHouses.value.find((item) => item.id === houseId)
  if (!house) return

  characterPosition.value = house.position
  selectedHouseId.value = house.id
}

function enterNearbyHouse() {
  if (!nearbyHouse.value) return

  selectedHouseId.value = nearbyHouse.value.id
  navigateTo(`/lesson/${activeLesson.value.id}?house=${nearbyHouse.value.id}`)
}

function advanceStreet() {
  if (!canAdvanceToNextStreet.value) return

  activeStreetIndex.value += 1
  characterPosition.value = 8
  selectedHouseId.value = null
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