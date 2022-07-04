import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'development' ? '/' : '/sfc-playground/',
  define: {
    __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
  },
  optimizeDeps: {
    exclude: ['@vue/repl']
  }
})
