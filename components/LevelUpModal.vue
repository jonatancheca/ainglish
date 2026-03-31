<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center animate-bounce-in shadow-2xl">
        <div class="text-6xl mb-4">🎊</div>
        <h2 class="text-2xl font-black text-slate-800 mb-1">¡Subiste de nivel!</h2>
        <p class="text-slate-500 mb-2">
          <span class="text-slate-400">Nivel {{ previousLevel }}</span>
          <span class="mx-2">→</span>
          <span class="text-sky-500 font-black text-xl">Nivel {{ newLevel }}</span>
        </p>
        <p class="text-slate-400 text-sm mb-6">¡Sigue aprendiendo, vas muy bien!</p>
        <button class="btn-primary w-full" @click="$emit('close')">¡Genial!</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineEmits<{ close: [] }>()
const userStore = useUserStore()
const previousLevel = computed(() => userStore.previousLevel)
const newLevel = computed(() => userStore.level)
</script>
