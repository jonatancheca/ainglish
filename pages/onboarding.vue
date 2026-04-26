<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-400 via-cyan-400 to-rose-300 px-5 py-8">
    <div class="mx-auto flex min-h-full max-w-7xl flex-col gap-6 lg:flex-row lg:items-center xl:max-w-[92rem]">
      <section class="flex w-full flex-col text-center text-white lg:max-w-xs xl:max-w-sm lg:text-left">
        <div>
          <div class="mb-3 text-4xl font-black tracking-tight">
            <span class="rounded-2xl bg-white/20 px-3 py-1">AI</span>nglish
          </div>
          <p class="text-base font-bold text-white/85">
            Tu app para aprender ingles
          </p>
        </div>

        <div class="mt-8 hidden rounded-[2rem] bg-white/15 p-6 text-left shadow-2xl backdrop-blur lg:block">
          <p class="text-xs font-black uppercase tracking-[0.3em] text-white/70">
            Avatar chibi
          </p>
          <h1 class="mt-3 text-3xl font-black leading-tight">
            Elige quien eres antes de empezar.
          </h1>
          <p class="mt-3 text-sm font-semibold text-white/85">
            Tu personaje aparecera siempre de cuerpo completo en tu perfil, inicio y aventura.
          </p>
        </div>
      </section>

      <section class="w-full rounded-[2rem] bg-white p-5 shadow-2xl animate-bounce-in lg:p-7">
        <form
          class="grid gap-6 lg:grid-cols-[0.7fr_1.7fr] xl:grid-cols-[0.65fr_1.95fr]"
          @submit.prevent="finishOnboarding"
        >
          <div class="rounded-[2rem] bg-gradient-to-b from-sky-50 via-white to-rose-50 p-5">
            <p class="text-xs font-black uppercase tracking-[0.28em] text-sky-500">
              Tu personaje
            </p>

            <div class="mt-5 flex justify-center">
              <AvatarIllustration
                :avatar="avatarDraft"
                size="xl"
              />
            </div>

            <div class="mt-5 rounded-2xl bg-white p-4 shadow-sm">
              <p class="text-lg font-black text-slate-800">
                Tu avatar
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-5">
            <div>
              <p class="text-xs font-black uppercase tracking-[0.28em] text-rose-400">
                Primer paso
              </p>
              <h2 class="mt-2 text-2xl font-black text-slate-800">
                Nombre y avatar
              </h2>
            </div>

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

            <AvatarSelector v-model="selectedAvatarId" />

            <button
              type="submit"
              class="btn-primary w-full"
              :disabled="!nameInput.trim()"
            >
              Empezar a aprender
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  createDefaultAvatar,
  type AvatarId,
  type CharacterAvatar,
} from '~/data/avatar-options'

definePageMeta({ layout: false })

const userStore = useUserStore()
const router = useRouter()
const nameInput = ref('')
const selectedAvatarId = ref<AvatarId>(createDefaultAvatar().id)

const avatarDraft = computed<CharacterAvatar>(() => ({ id: selectedAvatarId.value }))

function finishOnboarding() {
  if (!nameInput.value.trim()) return

  userStore.setName(nameInput.value)
  userStore.setAvatar(avatarDraft.value)
  userStore.completeOnboarding()
  router.push('/')
}
</script>
