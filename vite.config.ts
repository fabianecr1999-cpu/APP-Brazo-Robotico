import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      // Esto permite que el código encuentre los archivos sin importar la profundidad
      '@': path.resolve(__dirname, './public/src'),
    },
  },
  // Define la raíz del proyecto para Vite
  root: '.',
  publicDir: 'public',
});