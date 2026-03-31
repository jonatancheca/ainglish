<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500 flex flex-col items-center justify-center px-6 py-12">
    <!-- Logo -->
    <div class="mb-8 text-center">
      <div class="text-white font-black text-4xl tracking-tight mb-2">
        <span class="bg-white/20 rounded-2xl px-3 py-1">AI</span>nglish
      </div>
      <p class="text-sky-100 text-base">Tu app para aprender inglés</p>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-bounce-in">
      <div class="text-5xl text-center mb-4">👋</div>
      <h1 class="text-2xl font-black text-slate-800 text-center mb-1">¡Bienvenido/a!</h1>
      <p class="text-slate-500 text-center text-sm mb-6">¿Cómo te llamas?</p>

      <form @submit.prevent="start">
        <input
          v-model="nameInput"
          type="text"
          placeholder="Tu nombre..."
          maxlength="30"
          class="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 text-base font-bold text-slate-700 outline-none focus:border-sky-400 transition-colors mb-4"
          autofocus
        />
        <button
          type="submit"
          class="btn-primary w-full"
          :disabled="!nameInput.trim()"
        >
          ¡Empezar a aprender! 🚀
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const userStore = useUserStore()
const router = useRouter()
const nameInput = ref('')

function start() {
  if (!nameInput.value.trim()) return
  userStore.setName(nameInput.value)
  userStore.completeOnboarding()
  router.push('/')
}
</script>
