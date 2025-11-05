import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/STUDIO1/', // nécessaire pour GitHub Pages
  server: {
    port: 5173
  }
});
