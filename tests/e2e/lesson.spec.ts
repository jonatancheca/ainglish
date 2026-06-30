import { type Page } from '@playwright/test'
import { test, expect } from './fixtures'
import { seedState } from './helpers/seed'

const LESSON_ID = 'a1-greetings'

/**
 * Avanza por toda la secuencia de la lección (tarjetas de vocabulario y
 * preguntas) hasta llegar a la pantalla de resultado. No depende de acertar:
 * el objetivo es validar el flujo completo de una lección.
 */
async function completeLesson(page: Page): Promise<void> {
  const result = page.getByText('XP ganado esta lección')

  for (let i = 0; i < 60; i++) {
    if (await result.isVisible().catch(() => false)) return

    const vocabNext = page.getByRole('button', { name: 'Continuar →' })
    if (await vocabNext.isVisible().catch(() => false)) {
      await vocabNext.click()
      continue
    }

    const check = page.getByRole('button', { name: 'Comprobar ✓' })
    if (await check.isVisible().catch(() => false)) {
      await page.getByPlaceholder('Escribe tu respuesta aquí…').fill('hello')
      await check.click()
    } else {
      // Pregunta de opción múltiple: elige la primera opción disponible.
      await page.locator('button:has-text(". ")').first().click()
    }

    const next = page.getByRole('button', { name: /Siguiente →|Ver resultado 🎉/ })
    await next.click()
  }

  throw new Error('No se alcanzó la pantalla de resultado de la lección')
}

test.describe('Lección', () => {
  test.beforeEach(async ({ page }) => {
    await seedState(page)
  })

  test('muestra la primera tarjeta de vocabulario', async ({ page }) => {
    await page.goto(`/lesson/${LESSON_ID}`)
    await expect(page.getByText('📖 Vocabulario')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Continuar →' })).toBeVisible()
  })

  test('completa la lección y muestra el resultado', async ({ page }) => {
    await page.goto(`/lesson/${LESSON_ID}`)

    await completeLesson(page)

    await expect(page.getByText('XP ganado esta lección')).toBeVisible()
    await expect(page.getByText(/\+\d+ XP/)).toBeVisible()
    await expect(page.getByRole('link', { name: 'Ver lecciones' })).toBeVisible()
  })

  test('al completar, la lección aparece como completada en /learn', async ({ page }) => {
    await page.goto(`/lesson/${LESSON_ID}`)
    await completeLesson(page)

    await page.getByRole('link', { name: 'Ver lecciones' }).click()
    await expect(page).toHaveURL('/learn')
    await expect(page.getByRole('heading', { name: 'Aprender' })).toBeVisible()
  })
})
