import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface LessonStat {
  correct: number
  total: number
  stars: number
  completedAt: string
}

export interface LessonSession {
  id: string
  lessonId: string
  houseId?: string
  title: string
  icon: string
  level: string
  isHouse: boolean
  correct: number
  total: number
  stars: number
  durationSec: number
  completedAt: string
}

export const useProgressStore = defineStore(
  'progress',
  () => {
    const completedLessons = ref<string[]>([])
    const lessonStats = ref<Record<string, LessonStat>>({})
    const houseStats = ref<Record<string, LessonStat>>({})
    const sessionLog = ref<LessonSession[]>([])

    const totalLessonsCompleted = computed(() => completedLessons.value.length)

    function isCompleted(lessonId: string): boolean {
      return completedLessons.value.includes(lessonId)
    }

    function getStats(lessonId: string): LessonStat | null {
      return lessonStats.value[lessonId] ?? null
    }

    function getStars(lessonId: string): number {
      return lessonStats.value[lessonId]?.stars ?? 0
    }

    function saveResult(lessonId: string, correct: number, total: number) {
      const pct = correct / total
      const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1

      // Solo guardar si mejora el resultado anterior
      const prev = lessonStats.value[lessonId]
      if (!prev || stars > prev.stars || (stars === prev.stars && correct > prev.correct)) {
        lessonStats.value[lessonId] = {
          correct,
          total,
          stars,
          completedAt: new Date().toISOString(),
        }
      }

      if (!completedLessons.value.includes(lessonId)) {
        completedLessons.value.push(lessonId)
      }

      return stars
    }

    function hasPerfectLesson(): boolean {
      return Object.values(lessonStats.value as Record<string, LessonStat>).some(
        (s) => s.correct === s.total,
      )
    }

    function saveHouseResult(houseId: string, correct: number, total: number): number {
      const pct = correct / total
      const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1

      const prev = houseStats.value[houseId]
      if (!prev || stars > prev.stars || (stars === prev.stars && correct > prev.correct)) {
        houseStats.value[houseId] = {
          correct,
          total,
          stars,
          completedAt: new Date().toISOString(),
        }
      }

      return stars
    }

    function isHouseCompleted(houseId: string): boolean {
      return houseId in houseStats.value
    }

    function areAllHousesCompleted(houseIds: string[]): boolean {
      return houseIds.length > 0 && houseIds.every((id) => isHouseCompleted(id))
    }

    function logSession(entry: LessonSession) {
      const idx = sessionLog.value.findIndex((s) => s.id === entry.id)
      if (idx >= 0) {
        sessionLog.value[idx] = entry
      } else {
        sessionLog.value.push(entry)
      }
    }

    function $reset() {
      completedLessons.value = []
      lessonStats.value = {}
      houseStats.value = {}
      sessionLog.value = []
    }

    return {
      completedLessons,
      lessonStats,
      houseStats,
      sessionLog,
      totalLessonsCompleted,
      isCompleted,
      getStats,
      getStars,
      saveResult,
      hasPerfectLesson,
      saveHouseResult,
      isHouseCompleted,
      areAllHousesCompleted,
      logSession,
      $reset,
    }
  },
  { persist: true },
)
