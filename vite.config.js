import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cat_page',
  plugins: [react(), pluginRewriteAll()],
  fallback: '/404.html'
})