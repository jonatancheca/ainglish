<template>
  <div class="space-y-5">
    <h1 class="text-2xl font-black text-slate-800">
      Mi perfil
    </h1>

    <!-- Avatar + nombre -->
    <div class="card flex flex-col items-center py-8 gap-5">
      <div class="rounded-[2rem] bg-slate-50 p-3">
        <KawaiiAvatar
          :avatar="editing ? editDraft : userStore.avatar"
          size="md"
        />
      </div>
      <template v-if="!editing">
        <h2 class="text-xl font-black text-slate-800">
          {{ userStore.name || 'Sin nombre' }}
        </h2>
      </template>
      <template v-else>
        <input
          v-model="editName"
          type="text"
          maxlength="30"
          placeholder="Tu nombre"
          class="w-52 text-center rounded-2xl border-2 border-slate-200 px-4 py-2 text-lg font-black text-slate-800 outline-none focus:border-sky-400"
        />
      </template>
      <div class="flex items-center gap-2">
        <LevelBadge :level="userStore.level" />
        <span class="text-sm font-bold text-slate-500">Nivel {{ userStore.level }}</span>
      </div>
      <button
        v-if="!editing"
        class="text-sm font-bold text-sky-500 hover:text-sky-600 transition-colors"
        @click="startEditing"
      >
        ✏️ Editar personaje
      </button>
    </div>

    <!-- Edición del avatar -->
    <div
      v-if="editing"
      class="card space-y-4"
    >
      <p class="text-sm font-black uppercase tracking-[0.25em] text-sky-500">
        Editar look kawaii
      </p>

      <AvatarOptionGroup
        label="Forma de cara"
        :options="FACE_SHAPE_OPTIONS"
        :model-value="editDraft.faceShape"
        @update:model-value="editDraft.faceShape = $event"
      />
      <AvatarOptionGroup
        label="Color de ojos"
        :options="EYE_COLOR_OPTIONS"
        :model-value="editDraft.eyeColor"
        @update:model-value="editDraft.eyeColor = $event"
      />
      <AvatarOptionGroup
        label="Estilo de ojos"
        :options="EYE_STYLE_OPTIONS"
        :model-value="editDraft.eyeStyle"
        @update:model-value="editDraft.eyeStyle = $event"
      />
      <AvatarOptionGroup
        label="Gafas"
        :options="GLASSES_OPTIONS"
        :model-value="editDraft.glasses"
        @update:model-value="editDraft.glasses = $event"
      />
      <AvatarOptionGroup
        label="Mofletes"
        :options="CHEEK_STYLE_OPTIONS"
        :model-value="editDraft.cheeks"
        @update:model-value="editDraft.cheeks = $event"
      />
      <AvatarOptionGroup
        v-if="editDraft.cheeks !== 'none'"
        label="Color de mofletes"
        :options="CHEEK_COLOR_OPTIONS"
        :model-value="editDraft.cheekColor"
        @update:model-value="editDraft.cheekColor = $event"
      />
      <AvatarOptionGroup
        label="Pelo"
        :options="HAIR_OPTIONS"
        :model-value="editDraft.hair"
        @update:model-value="editDraft.hair = $event"
      />
      <AvatarOptionGroup
        label="Color de pelo"
        :options="HAIR_COLOR_OPTIONS"
        :model-value="editDraft.hairColor"
        @update:model-value="editDraft.hairColor = $event"
      />
      <AvatarOptionGroup
        label="Ropa"
        :options="OUTFIT_OPTIONS"
        :model-value="editDraft.outfit"
        @update:model-value="editDraft.outfit = $event"
      />
      <AvatarOptionGroup
        label="Zapatos"
        :options="SHOES_OPTIONS"
        :model-value="editDraft.shoes"
        @update:model-value="editDraft.shoes = $event"
      />

      <div class="flex gap-3 pt-2">
        <button
          class="w-1/3 rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm font-black text-slate-600 transition-colors hover:border-slate-300"
          @click="cancelEditing"
        >
          Cancelar
        </button>
        <button
          class="btn-primary w-2/3"
          :disabled="!editName.trim()"
          @click="saveEditing"
        >
          Guardar cambios ✨
        </button>
      </div>
    </div>

    <!-- Vista solo lectura del look -->
    <div
      v-else
      class="card"
    >
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
        <div class="rounded-2xl bg-slate-50 px-4 py-3">
          <p class="font-black text-slate-700">
            Mofletes
          </p>
          <p class="mt-1">
            {{ selectedCheeksLabel }}
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
  CHEEK_STYLE_OPTIONS,
  CHEEK_COLOR_OPTIONS,
  HAIR_OPTIONS,
  HAIR_COLOR_OPTIONS,
  OUTFIT_OPTIONS,
  SHOES_OPTIONS,
  type CharacterAvatar,
} from '~/data/avatar-options'

const userStore = useUserStore()
const progressStore = useProgressStore()
const achievementsStore = useAchievementsStore()
const router = useRouter()
const totalAchievements = ACHIEVEMENTS.length

const editing = ref(false)
const editName = ref('')
const editDraft = reactive<CharacterAvatar>({ ...userStore.avatar })

function startEditing() {
  editName.value = userStore.name
  Object.assign(editDraft, userStore.avatar)
  editing.value = true
}

function cancelEditing() {
  editing.value = false
}

function saveEditing() {
  if (!editName.value.trim()) return
  userStore.name = editName.value.trim()
  Object.assign(userStore.avatar, editDraft)
  editing.value = false
}

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
const selectedCheeksLabel = computed(() => getOptionLabel(CHEEK_STYLE_OPTIONS, userStore.avatar.cheeks ?? 'none'))

function confirmReset() {
  if (confirm('¿Seguro que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
    userStore.$reset()
    progressStore.$reset()
    achievementsStore.$reset()
    router.push('/onboarding')
  }
}
</script>
