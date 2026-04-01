import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { u as useUserStore } from './server.mjs';
import { u as useProgressStore } from './progress-B0dhTRZl.mjs';

const ACHIEVEMENTS = [
  {
    id: "first-lesson",
    title: "\xA1Primera lecci\xF3n!",
    description: "Completa tu primera lecci\xF3n",
    icon: "\u{1F389}",
    condition: (_u, p) => p.totalLessonsCompleted >= 1
  },
  {
    id: "three-lessons",
    title: "En racha de aprendizaje",
    description: "Completa 3 lecciones",
    icon: "\u{1F4DA}",
    condition: (_u, p) => p.totalLessonsCompleted >= 3
  },
  {
    id: "all-a1",
    title: "Graduado A1",
    description: "Completa todas las lecciones del nivel A1",
    icon: "\u{1F393}",
    condition: (_u, p) => p.totalLessonsCompleted >= 8
  },
  {
    id: "perfect-lesson",
    title: "Perfecci\xF3n",
    description: "Responde todas las preguntas correctamente en una lecci\xF3n",
    icon: "\u{1F48E}",
    condition: (_u, p) => p.hasPerfectLesson()
  },
  {
    id: "streak-3",
    title: "Racha de 3 d\xEDas",
    description: "Juega 3 d\xEDas seguidos",
    icon: "\u{1F525}",
    condition: (u, _) => u.streak >= 3
  },
  {
    id: "streak-7",
    title: "Semana completa",
    description: "Mant\xE9n la racha 7 d\xEDas seguidos",
    icon: "\u{1F5D3}\uFE0F",
    condition: (u, _) => u.streak >= 7
  },
  {
    id: "streak-30",
    title: "Maestro constante",
    description: "Mant\xE9n la racha 30 d\xEDas seguidos",
    icon: "\u{1F3C6}",
    condition: (u, _) => u.streak >= 30
  },
  {
    id: "level-3",
    title: "En crecimiento",
    description: "Alcanza el nivel 3",
    icon: "\u2B06\uFE0F",
    condition: (u, _) => u.level >= 3
  },
  {
    id: "level-5",
    title: "Nivel experto",
    description: "Alcanza el nivel 5",
    icon: "\u{1F31F}",
    condition: (u, _) => u.level >= 5
  },
  {
    id: "level-10",
    title: "Maestro del ingl\xE9s",
    description: "Alcanza el nivel 10",
    icon: "\u{1F451}",
    condition: (u, _) => u.level >= 10
  },
  {
    id: "xp-500",
    title: "500 XP",
    description: "Acumula 500 puntos de experiencia",
    icon: "\u2728",
    condition: (u, _) => u.xp >= 500
  },
  {
    id: "xp-1000",
    title: "1000 XP",
    description: "Acumula 1000 puntos de experiencia",
    icon: "\u{1F4AB}",
    condition: (u, _) => u.xp >= 1e3
  }
];
const useAchievementsStore = defineStore(
  "achievements",
  () => {
    const unlocked = ref([]);
    const recentlyUnlocked = ref([]);
    const unlockedCount = computed(() => unlocked.value.length);
    function isUnlocked(id) {
      return unlocked.value.includes(id);
    }
    function evaluate() {
      const userStore = useUserStore();
      const progressStore = useProgressStore();
      const newlyUnlocked = [];
      for (const ach of ACHIEVEMENTS) {
        if (unlocked.value.includes(ach.id)) continue;
        const met = ach.condition(userStore, progressStore);
        if (met) {
          unlocked.value.push(ach.id);
          newlyUnlocked.push(ach.id);
        }
      }
      recentlyUnlocked.value = newlyUnlocked;
      return newlyUnlocked;
    }
    function clearRecent() {
      recentlyUnlocked.value = [];
    }
    return {
      unlocked,
      recentlyUnlocked,
      unlockedCount,
      isUnlocked,
      evaluate,
      clearRecent
    };
  },
  { persist: true }
);

export { ACHIEVEMENTS as A, useAchievementsStore as u };
//# sourceMappingURL=achievements-Bs1z8zfY.mjs.map
