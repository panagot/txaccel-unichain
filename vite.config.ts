import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Dedicated port so other Vite apps on 5173/5174 don’t shadow this project.
  server: {
    port: 5193,
    strictPort: true,
    host: true,
  },
})
