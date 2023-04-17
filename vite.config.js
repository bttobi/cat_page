import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cat_page',
  plugins: [react()],
  fallback: '/404.html'
})
