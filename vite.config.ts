import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          agGrid: ['ag-grid-react', 'ag-grid-community'],
          utils: ['axios']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
