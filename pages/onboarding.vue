<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500 px-6 py-10">
    <div class="mx-auto flex min-h-full max-w-5xl flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
      <div class="flex w-full max-w-sm flex-col justify-center text-center lg:text-left">
        <div class="mb-8 text-center lg:text-left">
          <div class="text-white font-black text-4xl tracking-tight mb-2">
            <span class="bg-white/20 rounded-2xl px-3 py-1">AI</span>nglish
          </div>
          <p class="text-sky-100 text-base">
            Tu app para aprender inglés
          </p>
        </div>

        <div class="hidden rounded-[2rem] bg-white/15 p-6 text-left text-white shadow-2xl backdrop-blur lg:block">
          <p class="text-xs font-black uppercase tracking-[0.3em] text-sky-100">
            Avatar kawaii
          </p>
          <h2 class="mt-3 text-3xl font-black leading-tight">
            Diseña tu personaje antes de empezar.
          </h2>
          <p class="mt-3 text-sm text-sky-50/90">
            Elige la cara, el pelo, la ropa y los detalles que te van a acompañar en tu aventura.
          </p>
        </div>
      </div>

      <div class="w-full max-w-3xl rounded-[2rem] bg-white p-6 shadow-2xl animate-bounce-in lg:p-8">
        <div class="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <div class="rounded-[2rem] bg-slate-50 p-5">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs font-black uppercase tracking-[0.3em] text-sky-500">
                  Paso {{ currentStep }} de 2
                </p>
                <h1 class="mt-2 text-2xl font-black text-slate-800">
                  {{ stepTitle }}
                </h1>
              </div>
              <span class="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 shadow-sm">
                kawaii mode
              </span>
            </div>

            <div class="mt-6 flex justify-center rounded-[2rem] bg-gradient-to-b from-sky-100 via-white to-rose-50 p-4">
              <KawaiiAvatar
                :avatar="avatarDraft"
                size="lg"
              />
            </div>

            <div class="mt-4 rounded-2xl bg-white p-4 shadow-sm">
              <p class="text-sm font-black text-slate-700">
                {{ previewHeadline }}
              </p>
              <p class="mt-1 text-sm text-slate-500">
                {{ previewDescription }}
              </p>
            </div>
          </div>

          <div>
            <form
              class="space-y-5"
              @submit.prevent="submitStep"
            >
              <template v-if="currentStep === 1">
                <div>
                  <label class="mb-2 block text-sm font-black text-slate-700">Tu nombre</label>
                  <input
                    v-model="nameInput"
                    type="text"
                    placeholder="Tu nombre..."
                    maxlength="30"
                    class="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-base font-bold text-slate-700 outline-none transition-colors focus:border-sky-400"
                    autofocus
                  />
                </div>

                <AvatarOptionGroup
                  label="Forma de cara"
                  :options="FACE_SHAPE_OPTIONS"
                  :model-value="avatarDraft.faceShape"
                  @update:model-value="avatarDraft.faceShape = $event"
                />

                <AvatarOptionGroup
                  label="Color de ojos"
                  :options="EYE_COLOR_OPTIONS"
                  :model-value="avatarDraft.eyeColor"
                  @update:model-value="avatarDraft.eyeColor = $event"
                />

                <AvatarOptionGroup
                  label="Estilo de ojos"
                  :options="EYE_STYLE_OPTIONS"
                  :model-value="avatarDraft.eyeStyle"
                  @update:model-value="avatarDraft.eyeStyle = $event"
                />

                <AvatarOptionGroup
                  label="Gafas"
                  :options="GLASSES_OPTIONS"
                  :model-value="avatarDraft.glasses"
                  @update:model-value="avatarDraft.glasses = $event"
                />

                <AvatarOptionGroup
                  label="Mofletes"
                  :options="CHEEK_STYLE_OPTIONS"
                  :model-value="avatarDraft.cheeks"
                  @update:model-value="avatarDraft.cheeks = $event"
                />

                <AvatarOptionGroup
                  v-if="avatarDraft.cheeks !== 'none'"
                  label="Color de mofletes"
                  :options="CHEEK_COLOR_OPTIONS"
                  :model-value="avatarDraft.cheekColor"
                  @update:model-value="avatarDraft.cheekColor = $event"
                />

                <button
                  type="submit"
                  class="btn-primary w-full"
                  :disabled="!nameInput.trim()"
                >
                  Siguiente: estilo del cuerpo →
                </button>
              </template>

              <template v-else>
                <AvatarOptionGroup
                  label="Pelo"
                  :options="HAIR_OPTIONS"
                  :model-value="avatarDraft.hair"
                  @update:model-value="avatarDraft.hair = $event"
                />

                <AvatarOptionGroup
                  label="Color de pelo"
                  :options="HAIR_COLOR_OPTIONS"
                  :model-value="avatarDraft.hairColor"
                  @update:model-value="avatarDraft.hairColor = $event"
                />

                <AvatarOptionGroup
                  label="Ropa"
                  :options="OUTFIT_OPTIONS"
                  :model-value="avatarDraft.outfit"
                  @update:model-value="avatarDraft.outfit = $event"
                />

                <AvatarOptionGroup
                  label="Zapatos"
                  :options="SHOES_OPTIONS"
                  :model-value="avatarDraft.shoes"
                  @update:model-value="avatarDraft.shoes = $event"
                />

                <div class="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  Tu personaje se guardará con tu perfil y aparecerá en inicio y en la ficha de usuario.
                </div>

                <div class="flex gap-3">
                  <button
                    type="button"
                    class="w-1/3 rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm font-black text-slate-600 transition-colors hover:border-slate-300"
                    @click="currentStep = 1"
                  >
                    ← Atrás
                  </button>
                  <button
                    type="submit"
                    class="btn-primary w-2/3"
                  >
                    ¡Empezar a aprender! 🚀
                  </button>
                </div>
              </template>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  createDefaultAvatar,
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

definePageMeta({ layout: false })

const userStore = useUserStore()
const router = useRouter()
const nameInput = ref('')
const currentStep = ref(1)
const avatarDraft = reactive<CharacterAvatar>(createDefaultAvatar())

const stepTitle = computed(() =>
  currentStep.value === 1 ? 'Ponle nombre y carita' : 'Viste a tu personaje',
)

const previewHeadline = computed(() => `${nameInput.value.trim() || 'Tu avatar'} ya va tomando forma`)
const previewDescription = computed(() => {
  if (currentStep.value === 1) {
    return 'Elige la expresión de la cara y remata el look en el siguiente paso.'
  }

  return 'Revisa el resultado final y entra en la aventura con tu estilo kawaii.'
})

function submitStep() {
  if (currentStep.value === 1) {
    if (!nameInput.value.trim()) return
    currentStep.value = 2
    return
  }

  userStore.setName(nameInput.value)
  userStore.setAvatar({ ...avatarDraft })
  userStore.completeOnboarding()
  router.push('/')
}
</script>

