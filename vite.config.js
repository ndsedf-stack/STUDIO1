import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Remplace le base par '/STUDIO1/' si ton repo s'appelle STUDIO1 et que
// tu déploies sur GitHub Pages (repo pages at /<repo>/)
export default defineConfig({
  plugins: [react()],
  base: '/STUDIO1/'
})
