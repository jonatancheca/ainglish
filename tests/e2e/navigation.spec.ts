import { test, expect } from './fixtures'
import { seedState } from './helpers/seed'

// Smoke de navegación con un usuario ya onboardeado.
test.describe('Navegación', () => {
  test.beforeEach(async ({ page }) => {
    await seedState(page)
  })

  test('la home carga con el saludo del usuario', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { name: 'Test!' })).toBeVisible()
  })

  const pages: { path: string; heading: string }[] = [
    { path: '/learn', heading: 'Aprender' },
    { path: '/achievements', heading: 'Logros' },
    { path: '/profile', heading: 'Mi perfil' },
    { path: '/progress', heading: 'Progreso' },
  ]

  for (const { path, heading } of pages) {
    test(`carga ${path} y muestra su encabezado`, async ({ page }) => {
      await page.goto(path)
      await expect(page).toHaveURL(path)
      await expect(page.getByRole('heading', { name: heading })).toBeVisible()
    })
  }

  test('navega entre páginas usando la barra de navegación', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: 'Aprender' }).first().click()
    await expect(page).toHaveURL('/learn')
    await expect(page.getByRole('heading', { name: 'Aprender' })).toBeVisible()

    await page.getByRole('link', { name: 'Perfil' }).first().click()
    await expect(page).toHaveURL('/profile')
    await expect(page.getByRole('heading', { name: 'Mi perfil' })).toBeVisible()
  })
})
