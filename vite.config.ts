import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/TokenMeter/' : '/',
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

