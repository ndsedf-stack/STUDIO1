import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/STUDIO1/', // nécessaire pour GitHub Pages
  server: {
    port: 5173
  },
  build: {
    sourcemap: true,   // <-- génère sourcemaps pour debug
    minify: false      // <-- désactive la minification pour obtenir du code lisible
  }
});
