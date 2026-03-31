export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: (user: any, progress: any) => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-lesson',
    title: '¡Primera lección!',
    description: 'Completa tu primera lección',
    icon: '🎉',
    condition: (_u, p) => p.totalLessonsCompleted >= 1,
  },
  {
    id: 'three-lessons',
    title: 'En racha de aprendizaje',
    description: 'Completa 3 lecciones',
    icon: '📚',
    condition: (_u, p) => p.totalLessonsCompleted >= 3,
  },
  {
    id: 'all-a1',
    title: 'Graduado A1',
    description: 'Completa todas las lecciones del nivel A1',
    icon: '🎓',
    condition: (_u, p) => p.totalLessonsCompleted >= 8,
  },
  {
    id: 'perfect-lesson',
    title: 'Perfección',
    description: 'Responde todas las preguntas correctamente en una lección',
    icon: '💎',
    condition: (_u, p) => p.hasPerfectLesson(),
  },
  {
    id: 'streak-3',
    title: 'Racha de 3 días',
    description: 'Juega 3 días seguidos',
    icon: '🔥',
    condition: (u, _p) => u.streak >= 3,
  },
  {
    id: 'streak-7',
    title: 'Semana completa',
    description: 'Mantén la racha 7 días seguidos',
    icon: '🗓️',
    condition: (u, _p) => u.streak >= 7,
  },
  {
    id: 'streak-30',
    title: 'Maestro constante',
    description: 'Mantén la racha 30 días seguidos',
    icon: '🏆',
    condition: (u, _p) => u.streak >= 30,
  },
  {
    id: 'level-3',
    title: 'En crecimiento',
    description: 'Alcanza el nivel 3',
    icon: '⬆️',
    condition: (u, _p) => u.level >= 3,
  },
  {
    id: 'level-5',
    title: 'Nivel experto',
    description: 'Alcanza el nivel 5',
    icon: '🌟',
    condition: (u, _p) => u.level >= 5,
  },
  {
    id: 'level-10',
    title: 'Maestro del inglés',
    description: 'Alcanza el nivel 10',
    icon: '👑',
    condition: (u, _p) => u.level >= 10,
  },
  {
    id: 'xp-500',
    title: '500 XP',
    description: 'Acumula 500 puntos de experiencia',
    icon: '✨',
    condition: (u, _p) => u.xp >= 500,
  },
  {
    id: 'xp-1000',
    title: '1000 XP',
    description: 'Acumula 1000 puntos de experiencia',
    icon: '💫',
    condition: (u, _p) => u.xp >= 1000,
  },
]

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id)
}
