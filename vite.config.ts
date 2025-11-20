import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // CRUCIAL: Isso garante que os arquivos carreguem em qualquer subpasta do GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  define: {
    // Garante compatibilidade com env vars antigas se necessário
    'process.env': {} 
  }
});