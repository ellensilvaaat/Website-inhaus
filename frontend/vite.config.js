import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: process.env.NODE_ENV !== 'production', // ✅ Só gera .map em dev
    minify: 'esbuild', // já padrão, mas garante que o código será minificado
  },
})
