<template>
  <div class="space-y-5">
    <h1 class="text-2xl font-black text-slate-800">
      Mi perfil
    </h1>

    <!-- Avatar + nombre -->
    <div class="card flex flex-col items-center py-8 gap-3">
      <div class="rounded-[2rem] bg-slate-50 p-3">
        <KawaiiAvatar
          :avatar="userStore.avatar"
          size="md"
        />
      </div>
      <h2 class="text-xl font-black text-slate-800">
        {{ userStore.name }}
      </h2>
      <div class="flex items-center gap-2">
        <LevelBadge :level="userStore.level" />
        <span class="text-sm font-bold text-slate-500">Nivel {{ userStore.level }}</span>
      </div>
    </div>

    <div class="card">
      <p class="text-sm font-black uppercase tracking-[0.25em] text-sky-500">
        Look kawaii
      </p>
      <div class="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600 sm:grid-cols-3">
        <div class="rounded-2xl bg-slate-50 px-4 py-3">
          <p class="font-black text-slate-700">
            Cara
          </p>
          <p class="mt-1">
            {{ selectedFaceLabel }}
          </p>
        </div>
        <div class="rounded-2xl bg-slate-50 px-4 py-3">
          <p class="font-black text-slate-700">
            Ojos
          </p>
          <p class="mt-1">
            {{ selectedEyeColorLabel }} · {{ selectedEyeStyleLabel }}
          </p>
        </div>
        <div class="rounded-2xl bg-slate-50 px-4 py-3">
          <p class="font-black text-slate-700">
            Gafas
          </p>
          <p class="mt-1">
            {{ selectedGlassesLabel }}
          </p>
        </div>
        <div class="rounded-2xl bg-slate-50 px-4 py-3">
          <p class="font-black text-slate-700">
            Pelo
          </p>
          <p class="mt-1">
            {{ selectedHairLabel }}
          </p>
        </div>
        <div class="rounded-2xl bg-slate-50 px-4 py-3">
          <p class="font-black text-slate-700">
            Ropa
          </p>
          <p class="mt-1">
            {{ selectedOutfitLabel }}
          </p>
        </div>
        <div class="rounded-2xl bg-slate-50 px-4 py-3">
          <p class="font-black text-slate-700">
            Zapatos
          </p>
          <p class="mt-1">
            {{ selectedShoesLabel }}
          </p>
        </div>
      </div>
    </div>

    <!-- XP Bar -->
    <div class="card">
      <XpBar
        :level="userStore.level"
        :xp-in-level="userStore.xpInCurrentLevel"
        :xp-needed="userStore.xpNeededForNextLevel"
        :progress="userStore.levelProgress"
      />
    </div>

    <!-- Estadísticas -->
    <div class="grid grid-cols-2 gap-3">
      <div class="card text-center">
        <div class="text-2xl mb-1">
          🔥
        </div>
        <div class="text-2xl font-black text-orange-500">
          {{ userStore.streak }}
        </div>
        <div class="text-xs text-slate-500 font-semibold mt-0.5">
          Racha actual
        </div>
      </div>
      <div class="card text-center">
        <div class="text-2xl mb-1">
          📅
        </div>
        <div class="text-2xl font-black text-amber-500">
          {{ userStore.maxStreak }}
        </div>
        <div class="text-xs text-slate-500 font-semibold mt-0.5">
          Racha máxima
        </div>
      </div>
      <div class="card text-center">
        <div class="text-2xl mb-1">
          ⚡
        </div>
        <div class="text-2xl font-black text-sky-500">
          {{ userStore.xp }}
        </div>
        <div class="text-xs text-slate-500 font-semibold mt-0.5">
          XP total
        </div>
      </div>
      <div class="card text-center">
        <div class="text-2xl mb-1">
          📚
        </div>
        <div class="text-2xl font-black text-emerald-500">
          {{ progressStore.totalLessonsCompleted }}
        </div>
        <div class="text-xs text-slate-500 font-semibold mt-0.5">
          Lecciones
        </div>
      </div>
    </div>

    <!-- Logros recientes -->
    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <p class="font-black text-slate-700">
          Logros
        </p>
        <NuxtLink
          to="/achievements"
          class="text-xs text-sky-500 font-bold"
        >
          Ver todos →
        </NuxtLink>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-2xl font-black text-amber-500">{{ achievementsStore.unlockedCount }}</span>
        <span class="text-slate-400 text-sm">/{{ totalAchievements }} desbloqueados</span>
        <div class="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden ml-2">
          <div
            class="h-full bg-amber-400 rounded-full"
            :style="{ width: `${(achievementsStore.unlockedCount / totalAchievements) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Reset -->
    <button
      class="w-full text-slate-400 text-sm font-semibold py-2 hover:text-red-400 transition-colors"
      @click="confirmReset"
    >
      ⚠️ Reiniciar progreso
    </button>
  </div>
</template>

<script setup lang="ts">
import { ACHIEVEMENTS } from '~/data/achievements'
import {
  EYE_COLOR_OPTIONS,
  EYE_STYLE_OPTIONS,
  FACE_SHAPE_OPTIONS,
  GLASSES_OPTIONS,
  HAIR_OPTIONS,
  OUTFIT_OPTIONS,
  SHOES_OPTIONS,
} from '~/data/avatar-options'

const userStore = useUserStore()
const progressStore = useProgressStore()
const achievementsStore = useAchievementsStore()
const router = useRouter()
const totalAchievements = ACHIEVEMENTS.length

function getOptionLabel(options: { value: string, label: string }[], value: string) {
  return options.find(option => option.value === value)?.label ?? value
}

const selectedFaceLabel = computed(() => getOptionLabel(FACE_SHAPE_OPTIONS, userStore.avatar.faceShape))
const selectedEyeColorLabel = computed(() => getOptionLabel(EYE_COLOR_OPTIONS, userStore.avatar.eyeColor))
const selectedEyeStyleLabel = computed(() => getOptionLabel(EYE_STYLE_OPTIONS, userStore.avatar.eyeStyle))
const selectedGlassesLabel = computed(() => getOptionLabel(GLASSES_OPTIONS, userStore.avatar.glasses))
const selectedHairLabel = computed(() => getOptionLabel(HAIR_OPTIONS, userStore.avatar.hair))
const selectedOutfitLabel = computed(() => getOptionLabel(OUTFIT_OPTIONS, userStore.avatar.outfit))
const selectedShoesLabel = computed(() => getOptionLabel(SHOES_OPTIONS, userStore.avatar.shoes))

function confirmReset() {
  if (confirm('¿Seguro que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
    userStore.$reset()
    progressStore.$reset()
    achievementsStore.$reset()
    router.push('/onboarding')
  }
}
</script>
