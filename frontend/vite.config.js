import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // ✅ Gera sourcemaps só em desenvolvimento
    sourcemap: process.env.NODE_ENV !== 'production',

    // ✅ Garante minificação com esbuild (padrão do Vite)
    minify: 'esbuild',

    // ✅ Garante que os arquivos de build vão pra pasta esperada pela Vercel
    outDir: 'dist'
  }
})
