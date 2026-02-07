import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'esbuild', 
    esbuild: {
      drop: ['console', 'debugger'], 
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    modulePreload: {
      polyfill: false,
    },
    outDir: 'dist',
  },
})