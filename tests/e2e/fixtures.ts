import { test as base, expect } from '@playwright/test'

/**
 * Test base que navega con `waitUntil: 'commit'` por defecto. En el servidor dev
 * de Nuxt, esperar a `load`/`domcontentloaded` es frágil: la re-optimización de
 * dependencias de Vite provoca recargas completas que interrumpen la navegación
 * y causan timeouts. `commit` resuelve al confirmarse la navegación; las
 * aserciones `toBeVisible` (web-first, con reintentos) ya esperan al contenido
 * hidratado.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    const originalGoto = page.goto.bind(page)
    page.goto = (url: string, options = {}) =>
      originalGoto(url, { waitUntil: 'commit', ...options })
    await use(page)
  },
})

export { expect }
