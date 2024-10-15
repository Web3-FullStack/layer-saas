import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

if (process.env.NODE_ENV === 'development') {
  console.log('========== this is layer-saas-local ============')
}
export default defineNuxtConfig({
  css: [resolve('./tailwind.css')],
  extends: [process.env.WEB3_FULL_STACK_LAYER_PATH || '@web3-fullstack/layer'],
  imports: {
    dirs: [resolve('./stores/**')],
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  experimental: {
    viewTransition: true,
  },
  ui: {
    safelistColors: ['primary', 'red', 'orange', 'green'],
  },
  devtools: {
    enabled: true,
  },
  macros: {
    reactivityTransform: true,
  },
  vite: {
    optimizeDeps: {
      include: ['@supabase/supabase-js'],
    },
    build: {
      rollupOptions: {
        external: ['@supabase/supabase-js', 'vue', 'vue-router', 'lodash'],
      },
    },
  },
})
