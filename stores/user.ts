import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// XP acumulado necesario para alcanzar cada nivel
const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000]

export function getLevelFromXp(xp: number): number {
  let level = 1
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1
    else break
  }
  return level
}

export function getXpFloorForLevel(level: number): number {
  return LEVEL_THRESHOLDS[Math.min(level - 1, LEVEL_THRESHOLDS.length - 1)] ?? 0
}

export function getXpCeilForLevel(level: number): number {
  return LEVEL_THRESHOLDS[Math.min(level, LEVEL_THRESHOLDS.length - 1)] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

function yesterdayStr(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

export const useUserStore = defineStore(
  'user',
  () => {
    const name = ref('')
    const xp = ref(0)
    const streak = ref(0)
    const maxStreak = ref(0)
    const lastActiveDate = ref('')
    const onboardingDone = ref(false)
    const justLeveledUp = ref(false)
    const previousLevel = ref(1)

    const level = computed(() => getLevelFromXp(xp.value))

    const xpInCurrentLevel = computed(() => xp.value - getXpFloorForLevel(level.value))

    const xpNeededForNextLevel = computed(
      () => getXpCeilForLevel(level.value) - getXpFloorForLevel(level.value),
    )

    const levelProgress = computed(() =>
      Math.min(xpInCurrentLevel.value / xpNeededForNextLevel.value, 1),
    )

    function initStreak() {
      const today = todayStr()
      const yesterday = yesterdayStr()
      if (!lastActiveDate.value) return
      if (lastActiveDate.value === today) return
      if (lastActiveDate.value === yesterday) return
      streak.value = 0
    }

    function addXp(amount: number) {
      const prevLevel = level.value
      xp.value += amount
      const newLevel = level.value
      if (newLevel > prevLevel) {
        justLeveledUp.value = true
        previousLevel.value = prevLevel
      }
    }

    function recordActivity() {
      const today = todayStr()
      const yesterday = yesterdayStr()
      if (lastActiveDate.value === today) return

      if (lastActiveDate.value === yesterday) {
        streak.value += 1
      } else if (!lastActiveDate.value) {
        streak.value = 1
      } else {
        streak.value = 1
      }

      if (streak.value > maxStreak.value) maxStreak.value = streak.value
      lastActiveDate.value = today
    }

    function clearLevelUp() {
      justLeveledUp.value = false
    }

    function setName(newName: string) {
      name.value = newName.trim()
    }

    function completeOnboarding() {
      onboardingDone.value = true
    }

    return {
      name,
      xp,
      streak,
      maxStreak,
      lastActiveDate,
      onboardingDone,
      justLeveledUp,
      previousLevel,
      level,
      xpInCurrentLevel,
      xpNeededForNextLevel,
      levelProgress,
      initStreak,
      addXp,
      recordActivity,
      clearLevelUp,
      setName,
      completeOnboarding,
    }
  },
  { persist: true },
)
