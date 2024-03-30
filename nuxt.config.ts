// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.WEB3_FULL_STACK_LAYER_PATH || '@web3-fullstack/layer'],
  modules: [
  ],
  ui: {
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  devtools: {
    enabled: true
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/'],
      cookieRedirect: false,
    }
  }
})
