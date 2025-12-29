export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxt/ui'],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
})
