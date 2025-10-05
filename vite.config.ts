import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',       // diretório de saída da build
    sourcemap: false,     // opcional: não gerar sourcemaps em produção
  },
  server: {
    port: 5173,
  },
})
