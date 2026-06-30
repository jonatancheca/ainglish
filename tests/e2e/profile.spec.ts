import { test, expect } from './fixtures'
import { seedState, defaultUser } from './helpers/seed'

test.describe('Perfil', () => {
  test('muestra el nombre y nivel del usuario', async ({ page }) => {
    await seedState(page, { user: defaultUser({ name: 'Grace', xp: 120 }) })
    await page.goto('/profile')

    await expect(page.getByRole('heading', { name: 'Mi perfil' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Grace' })).toBeVisible()
    // 120 XP supera el umbral del nivel 2.
    await expect(page.getByText('Nivel 2').first()).toBeVisible()
  })

  test('permite editar el nombre del personaje', async ({ page }) => {
    await seedState(page, { user: defaultUser({ name: 'Grace' }) })
    await page.goto('/profile')

    await page.getByRole('button', { name: 'Editar personaje' }).click()

    const nameInput = page.getByPlaceholder('Tu nombre')
    await nameInput.fill('Hopper')
    await page.getByRole('button', { name: 'Guardar cambios' }).click()

    await expect(page.getByRole('heading', { name: 'Hopper' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Editar personaje' })).toBeVisible()
  })

  test('cancelar la edición no cambia el nombre', async ({ page }) => {
    await seedState(page, { user: defaultUser({ name: 'Grace' }) })
    await page.goto('/profile')

    await page.getByRole('button', { name: 'Editar personaje' }).click()
    await page.getByPlaceholder('Tu nombre').fill('Otro')
    await page.getByRole('button', { name: 'Cancelar' }).click()

    await expect(page.getByRole('heading', { name: 'Grace' })).toBeVisible()
  })

  test('reiniciar progreso redirige al onboarding', async ({ page }) => {
    await seedState(page, { user: defaultUser({ name: 'Grace' }) })
    await page.goto('/profile')

    // El botón usa window.confirm: lo aceptamos automáticamente.
    page.on('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Reiniciar progreso' }).click()

    await expect(page).toHaveURL(/\/onboarding$/)
  })
})
