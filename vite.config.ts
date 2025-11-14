import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use root path for Vercel (default), or TokenMeter path for GitHub Pages if GITHUB_PAGES env var is set
  base: process.env.GITHUB_PAGES === 'true' ? '/TokenMeter/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    strictPort: false,
  },
  optimizeDeps: {
    include: ['gpt-tokenizer', 'js-yaml', 'xml-js', '@iarna/toml'],
  },
  define: {
    global: 'globalThis',
  },
})

