<template>
  <div
    v-if="isClient"
    class="space-y-5"
  >
    <h1 class="text-2xl font-black text-slate-800">
      Mi perfil
    </h1>

    <div
      class="card gap-5 py-7"
      :class="editing ? 'flex flex-col lg:flex-row lg:items-start' : 'flex flex-col items-center text-center'"
    >
      <div class="rounded-[2rem] bg-gradient-to-b from-sky-50 via-white to-rose-50 p-4">
        <AvatarIllustration
          :avatar="displayAvatar"
          size="lg"
        />
      </div>

      <div :class="editing ? 'flex flex-1 flex-col gap-4' : 'flex flex-col items-center gap-3'">
        <template v-if="!editing">
          <h2 class="text-xl font-black text-slate-800">
            {{ userStore.name || 'Sin nombre' }}
          </h2>
        </template>

        <template v-else>
          <div>
            <label class="mb-2 block text-sm font-black text-slate-700">Tu nombre</label>
            <input
              v-model="editName"
              type="text"
              maxlength="30"
              placeholder="Tu nombre"
              class="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-base font-black text-slate-800 outline-none focus:border-sky-400"
            />
          </div>
        </template>

        <div class="flex items-center gap-2">
          <LevelBadge :level="userStore.level" />
          <span class="text-sm font-bold text-slate-500">Nivel {{ userStore.level }}</span>
        </div>

        <button
          v-if="!editing"
          class="text-sm font-bold text-sky-500 transition-colors hover:text-sky-600"
          @click="startEditing"
        >
          Editar personaje
        </button>
      </div>
    </div>

    <div
      v-if="editing"
      class="card space-y-4"
    >
      <div>
        <p class="text-sm font-black uppercase tracking-[0.25em] text-sky-500">
          Escoge avatar
        </p>
        <p class="mt-2 text-sm font-semibold text-slate-500">
          Selecciona una ilustracion manga chibi de cuerpo completo.
        </p>
      </div>

      <AvatarSelector v-model="selectedAvatarId" />

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
          Guardar cambios
        </button>
      </div>
    </div>

    <div class="card">
      <XpBar
        :level="userStore.level"
        :xp-in-level="userStore.xpInCurrentLevel"
        :xp-needed="userStore.xpNeededForNextLevel"
        :progress="userStore.levelProgress"
      />
    </div>

    <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div class="card text-center">
        <div class="mb-1 text-2xl">
          🔥
        </div>
        <div class="text-2xl font-black text-orange-500">
          {{ userStore.streak }}
        </div>
        <div class="mt-0.5 text-xs font-semibold text-slate-500">
          Racha actual
        </div>
      </div>
      <div class="card text-center">
        <div class="mb-1 text-2xl">
          📅
        </div>
        <div class="text-2xl font-black text-amber-500">
          {{ userStore.maxStreak }}
        </div>
        <div class="mt-0.5 text-xs font-semibold text-slate-500">
          Racha maxima
        </div>
      </div>
      <div class="card text-center">
        <div class="mb-1 text-2xl">
          ⚡
        </div>
        <div class="text-2xl font-black text-sky-500">
          {{ userStore.xp }}
        </div>
        <div class="mt-0.5 text-xs font-semibold text-slate-500">
          XP total
        </div>
      </div>
      <div class="card text-center">
        <div class="mb-1 text-2xl">
          📚
        </div>
        <div class="text-2xl font-black text-emerald-500">
          {{ progressStore.totalLessonsCompleted }}
        </div>
        <div class="mt-0.5 text-xs font-semibold text-slate-500">
          Lecciones
        </div>
      </div>
    </div>

    <div class="card">
      <div class="mb-3 flex items-center justify-between">
        <p class="font-black text-slate-700">
          Logros
        </p>
        <NuxtLink
          to="/achievements"
          class="text-xs font-bold text-sky-500"
        >
          Ver todos →
        </NuxtLink>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-2xl font-black text-amber-500">{{ achievementsStore.unlockedCount }}</span>
        <span class="text-sm text-slate-400">/{{ totalAchievements }} desbloqueados</span>
        <div class="ml-2 h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-full rounded-full bg-amber-400"
            :style="{ width: `${(achievementsStore.unlockedCount / totalAchievements) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <button
      class="w-full py-2 text-sm font-semibold text-slate-400 transition-colors hover:text-red-400"
      @click="confirmReset"
    >
      Reiniciar progreso
    </button>
  </div>
  <div
    v-else
    class="space-y-5"
  >
    <h1 class="text-2xl font-black text-slate-800">
      Mi perfil
    </h1>
    <div class="card h-72 animate-pulse bg-white"></div>
  </div>
</template>

<script setup lang="ts">
import { ACHIEVEMENTS } from '~/data/achievements'
import {
  getAvatarOption,
  type AvatarId,
  type CharacterAvatar,
} from '~/data/avatar-options'

const userStore = useUserStore()
const progressStore = useProgressStore()
const achievementsStore = useAchievementsStore()
const router = useRouter()
const totalAchievements = ACHIEVEMENTS.length

const isClient = ref(false)
const editing = ref(false)
const editName = ref('')
const selectedAvatarId = ref<AvatarId>(getAvatarOption(userStore.avatar).value)

const displayAvatar = computed<CharacterAvatar>(() => (
  editing.value ? { id: selectedAvatarId.value } : { id: getAvatarOption(userStore.avatar).value }
))

function startEditing() {
  editName.value = userStore.name
  selectedAvatarId.value = getAvatarOption(userStore.avatar).value
  editing.value = true
}

function cancelEditing() {
  selectedAvatarId.value = getAvatarOption(userStore.avatar).value
  editing.value = false
}

function saveEditing() {
  if (!editName.value.trim()) return

  userStore.setName(editName.value)
  userStore.setAvatar({ id: selectedAvatarId.value })
  editing.value = false
}

function confirmReset() {
  if (confirm('Seguro que quieres reiniciar todo tu progreso? Esta accion no se puede deshacer.')) {
    userStore.$reset()
    progressStore.$reset()
    achievementsStore.$reset()
    router.push('/onboarding')
  }
}

onMounted(() => {
  isClient.value = true
  selectedAvatarId.value = getAvatarOption(userStore.avatar).value
})
</script>
