import { test, expect } from './fixtures'

// Sin sembrar estado: la app debe forzar el onboarding.
test.describe('Onboarding', () => {
  test('redirige a /onboarding cuando no se ha completado', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/onboarding$/)
    await expect(page.getByRole('button', { name: 'Empezar a aprender' })).toBeVisible()
  })

  test('el botón de empezar está deshabilitado sin nombre', async ({ page }) => {
    await page.goto('/onboarding')
    await expect(page.getByRole('button', { name: 'Empezar a aprender' })).toBeDisabled()
  })

  test('completa el onboarding con nombre y avatar', async ({ page }) => {
    await page.goto('/onboarding')

    // Interactuar con el avatar primero garantiza que Vue ya hidrató, de modo
    // que el v-model del nombre no se reinicie tras rellenarlo.
    await page.getByRole('button', { name: 'Avatar 3', exact: true }).click()

    const nameInput = page.getByPlaceholder('Tu nombre...')
    // Reintenta el llenado hasta que persista pese a la hidratación SSR.
    await expect(async () => {
      await nameInput.fill('Ada')
      await expect(nameInput).toHaveValue('Ada')
    }).toPass()

    const submit = page.getByRole('button', { name: 'Empezar a aprender' })
    await expect(submit).toBeEnabled()
    await submit.click()

    // Tras completar redirige a la home y saluda con el nombre.
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { name: 'Ada!' })).toBeVisible()
  })

  test('un usuario ya onboardeado no puede volver a /onboarding', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: 'Ya',
          avatar: { id: 'avatar1' },
          xp: 0,
          streak: 0,
          maxStreak: 0,
          lastActiveDate: '',
          onboardingDone: true,
          justLeveledUp: false,
          previousLevel: 1,
        }),
      )
    })

    await page.goto('/onboarding')
    await expect(page).toHaveURL('/')
  })
})
