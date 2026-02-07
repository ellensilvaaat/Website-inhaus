import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
  ],
  build: {
    sourcemap: false,
    minify: 'esbuild',
    assetsInlineLimit: 4096, 
    esbuild: {
      drop: ['console', 'debugger'],
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('swiper') || id.includes('framer-motion')) {
              return 'animations';
            }
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