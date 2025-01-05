import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
  // base: "/IQED/",
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    removeConsole({
      removeConsole: true, 
      removeDebug: true,   
      removeWarn: true,   
      removeError: true,   
    }),
  ],
  server: {
    port: 5173,
    historyApiFallback: true,
  },
});