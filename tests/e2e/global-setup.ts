import { chromium } from '@playwright/test'

const PORT = 3187
const BASE_URL = `http://localhost:${PORT}`

// Rutas que Nuxt dev compila de forma perezosa y que disparan la
// re-optimización de dependencias de Vite (que provoca una recarga completa la
// primera vez que se visitan en el navegador). Las recorremos una vez en serie
// con un navegador real para que esa optimización ocurra ANTES de las pruebas y
// no reinicie el estado a mitad de un test en paralelo.
const ROUTES = [
  '/onboarding',
  '/',
  '/learn',
  '/achievements',
  '/profile',
  '/progress',
  '/aiworld',
  '/lesson/a1-greetings',
]

export default async function globalSetup() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ baseURL: BASE_URL })

  for (const route of ROUTES) {
    try {
      await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 90_000 })
      // Da margen a que Vite re-optimice y recargue si es necesario.
      await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {})
    } catch {
      // El test correspondiente lo reportará; no abortamos el calentamiento.
    }
  }

  await browser.close()
}
