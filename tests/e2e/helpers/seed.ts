import type { Page } from '@playwright/test'

/**
 * Estado del store `user` persistido en localStorage por pinia-plugin-persistedstate.
 * La clave de localStorage coincide con el id del store: `user`.
 */
export interface UserState {
  name: string
  avatar: { id: string }
  xp: number
  streak: number
  maxStreak: number
  lastActiveDate: string
  onboardingDone: boolean
  justLeveledUp: boolean
  previousLevel: number
}

export interface ProgressState {
  completedLessons: string[]
  lessonStats: Record<
    string,
    { correct: number; total: number; stars: number; completedAt: string }
  >
  houseStats: Record<string, unknown>
  sessionLog: unknown[]
}

const today = new Date().toISOString().slice(0, 10)

export function defaultUser(overrides: Partial<UserState> = {}): UserState {
  return {
    name: 'Test',
    avatar: { id: 'avatar1' },
    xp: 0,
    streak: 0,
    maxStreak: 0,
    lastActiveDate: '',
    onboardingDone: true,
    justLeveledUp: false,
    previousLevel: 1,
    ...overrides,
  }
}

export function defaultProgress(overrides: Partial<ProgressState> = {}): ProgressState {
  return {
    completedLessons: [],
    lessonStats: {},
    houseStats: {},
    sessionLog: [],
    ...overrides,
  }
}

/**
 * Siembra el localStorage ANTES de cargar cualquier página. Es imprescindible
 * usar addInitScript (no evaluate tras navegar) porque el middleware global de
 * onboarding se ejecuta en cliente durante la hidratación y necesita el estado
 * ya presente para no redirigir a /onboarding.
 */
export async function seedState(
  page: Page,
  state: { user?: UserState; progress?: ProgressState; achievements?: Record<string, unknown> } = {},
): Promise<void> {
  const user = state.user ?? defaultUser()
  const entries: Record<string, unknown> = { user }

  if (state.progress) entries.progress = state.progress
  if (state.achievements) entries.achievements = state.achievements

  await page.addInitScript((data) => {
    for (const [key, value] of Object.entries(data)) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }, entries)
}

export { today }
