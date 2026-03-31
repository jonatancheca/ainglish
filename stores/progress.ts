import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface LessonStat {
  correct: number
  total: number
  stars: number
  completedAt: string
}

export const useProgressStore = defineStore(
  'progress',
  () => {
    const completedLessons = ref<string[]>([])
    const lessonStats = ref<Record<string, LessonStat>>({})

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

    return {
      completedLessons,
      lessonStats,
      totalLessonsCompleted,
      isCompleted,
      getStats,
      getStars,
      saveResult,
      hasPerfectLesson,
    }
  },
  { persist: true },
)
