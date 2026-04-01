export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      Nunito: [400, 600, 700, 800, 900],
    },
    display: 'swap',
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.ts',
  },

  app: {
    head: {
      title: 'AInglish',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Aprende inglés estilo Kawaii' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  compatibilityDate: '2025-01-01',
})
