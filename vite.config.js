import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

// User site (nmaisheri.github.io) is served from the domain root, so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, 'index.html'),
        startupshell: resolve(projectRoot, 'startupshell/index.html'),
      },
    },
  },
})
