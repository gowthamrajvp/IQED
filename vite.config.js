import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/IQED_IQ_Test",
  plugins: [react()],

  server:{
    port:5173
  }
})
