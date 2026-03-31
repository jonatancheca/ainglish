import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { useProgressStore } from './progress'
import { ACHIEVEMENTS } from '~/data/achievements'

export const useAchievementsStore = defineStore(
  'achievements',
  () => {
    const unlocked = ref<string[]>([])
    const recentlyUnlocked = ref<string[]>([])

    const unlockedCount = computed(() => unlocked.value.length)

    function isUnlocked(id: string): boolean {
      return unlocked.value.includes(id)
    }

    function evaluate() {
      const userStore = useUserStore()
      const progressStore = useProgressStore()
      const newlyUnlocked: string[] = []

      for (const ach of ACHIEVEMENTS) {
        if (unlocked.value.includes(ach.id)) continue
        const met = ach.condition(userStore, progressStore)
        if (met) {
          unlocked.value.push(ach.id)
          newlyUnlocked.push(ach.id)
        }
      }

      recentlyUnlocked.value = newlyUnlocked
      return newlyUnlocked
    }

    function clearRecent() {
      recentlyUnlocked.value = []
    }

    return {
      unlocked,
      recentlyUnlocked,
      unlockedCount,
      isUnlocked,
      evaluate,
      clearRecent,
    }
  },
  { persist: true },
)
