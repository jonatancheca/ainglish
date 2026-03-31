<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
      <div class="max-w-lg lg:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
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

    <div class="lg:flex lg:max-w-6xl lg:mx-auto">
      <!-- Desktop sidebar -->
      <aside class="hidden lg:flex lg:flex-col lg:w-52 lg:shrink-0 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:border-r lg:border-slate-100 lg:bg-white lg:py-6 lg:px-3 lg:gap-1">
        <NavItem
          to="/"
          icon="🏠"
          label="Inicio"
          sidebar
        />
        <NavItem
          to="/aiworld"
          icon="🌈"
          label="AIworld"
          sidebar
        />
        <NavItem
          to="/learn"
          icon="📖"
          label="Aprender"
          sidebar
        />
        <NavItem
          to="/achievements"
          icon="🏆"
          label="Logros"
          sidebar
        />
        <NavItem
          to="/profile"
          icon="👤"
          label="Perfil"
          sidebar
        />
      </aside>

      <!-- Page content -->
      <main class="flex-1 w-full max-w-lg lg:max-w-3xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <slot></slot>
      </main>
    </div>

    <!-- Bottom nav (mobile only) -->
    <nav class="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-100 shadow-[0_-1px_8px_rgba(0,0,0,0.06)] lg:hidden">
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
