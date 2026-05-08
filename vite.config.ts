import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          router: ['react-router', 'react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },

})
