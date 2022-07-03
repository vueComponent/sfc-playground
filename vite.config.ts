import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
  },
  optimizeDeps: {
    exclude: ['@vue/repl']
  }
})
