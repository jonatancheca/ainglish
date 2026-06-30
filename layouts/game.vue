<template>
  <div class="flex h-dvh flex-col overflow-hidden bg-slate-50">
    <!-- Header compacto del juego -->
    <header class="shrink-0 z-40 bg-white border-b border-slate-100 shadow-sm">
      <div class="mx-auto flex h-12 max-w-full items-center justify-between px-4">
        <NuxtLink
          to="/"
          class="flex items-center font-black text-sky-500 text-lg tracking-tight"
        >
          <span class="bg-sky-500 text-white rounded-xl px-2 py-0.5 text-xs font-black">AI</span>
          nglish
        </NuxtLink>
        <div class="flex items-center gap-3">
          <ClientOnly>
            <StreakBadge :streak="userStore.streak" />
            <LevelBadge :level="userStore.level" />
          </ClientOnly>
        </div>
      </div>
    </header>

    <!-- Game content — ocupa todo el espacio restante sin padding -->
    <div class="flex min-h-0 flex-1 flex-col overflow-hidden">
      <slot></slot>
    </div>

    <!-- Bottom nav (mobile only) -->
    <nav class="shrink-0 bg-white border-t border-slate-100 shadow-[0_-1px_8px_rgba(0,0,0,0.06)] lg:hidden">
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
        <NavItem
          to="/progress"
          icon="📊"
          label="Progreso"
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
