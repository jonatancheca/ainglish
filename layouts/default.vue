<template>
  <div class="min-h-screen flex flex-col bg-slate-50 pb-20">
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
      <div class="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2 font-black text-sky-500 text-xl tracking-tight"
        >
          <span class="bg-sky-500 text-white rounded-xl px-2 py-0.5 text-sm font-black">AI</span>
          nglish
        </NuxtLink>

        <!-- Stats: streak + level + xp -->
        <div class="flex items-center gap-3">
          <StreakBadge :streak="userStore.streak" />
          <LevelBadge :level="userStore.level" />
          <div class="hidden sm:flex items-center gap-1.5 text-sm font-bold text-slate-600">
            <span class="text-sky-500">⚡</span>
            {{ userStore.xp }} XP
          </div>
        </div>
      </div>
    </header>

    <!-- Page content -->
    <main class="flex-1 max-w-lg mx-auto w-full px-4 py-6">
      <slot></slot>
    </main>

    <!-- Bottom nav -->
    <nav class="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-100 shadow-[0_-1px_8px_rgba(0,0,0,0.06)]">
      <div class="max-w-lg mx-auto flex">
        <NavItem
          to="/"
          icon="🏠"
          label="Inicio"
        />
        <NavItem
          to="/aiworld"
          icon="🌈"
          label="AIworld"
        />
        <NavItem
          to="/learn"
          icon="📖"
          label="Aprender"
        />
        <NavItem
          to="/achievements"
          icon="🏆"
          label="Logros"
        />
        <NavItem
          to="/profile"
          icon="👤"
          label="Perfil"
        />
      </div>
    </nav>

    <!-- Level-up modal -->
    <LevelUpModal
      v-if="userStore.justLeveledUp"
      @close="userStore.clearLevelUp()"
    />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
onMounted(() => {
  userStore.initStreak()
})
</script>
