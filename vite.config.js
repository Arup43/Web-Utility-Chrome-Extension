import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(fileURLToPath(new URL('.', import.meta.url)), 'popup.html')
      },
      output: {
        entryFileNames: '[name].js',
      }
    }
  }
})
