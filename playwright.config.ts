import { defineConfig, devices } from '@playwright/test'

const PORT = 3187
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './tests/e2e',
  globalSetup: './tests/e2e/global-setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  // El servidor dev de Nuxt compila rutas de forma perezosa; limitar los workers
  // evita que la primera compilación en paralelo provoque recargas (ERR_ABORTED).
  workers: process.env.CI ? 1 : 4,
  // Margen amplio para la compilación en frío de rutas de Nuxt dev.
  timeout: 90_000,
  reporter: 'html',

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    // Nuxt dev compila cada ruta la primera vez que se solicita; damos margen
    // suficiente para que la compilación en frío termine al primer intento.
    navigationTimeout: 60_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: `pnpm dev --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { NUXT_IGNORE_LOCK: '1' },
  },
})
