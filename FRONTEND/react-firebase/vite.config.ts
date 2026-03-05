import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      // 1. We define the prefix '/api'
      '/api': {
        target: 'http://localhost:2000', // 2. Your backend URL
        changeOrigin: true,
        secure: false,
        // 3. This removes '/api' from the URL before it hits your server
        // Example: /api/nexasoft/users/login -> /nexasoft/users/login
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    // Keep this to allow ngrok to tunnel into your Vite server
    allowedHosts: ['subtarsal-kathyrn-untreated.ngrok-free.dev'],
  }
})