import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/STUDIO1/',
  build: {
    sourcemap: true,   // génère sourcemaps pour obtenir des stack traces mappées
    minify: false      // désactive la minification pour un JS lisible
  }
});
