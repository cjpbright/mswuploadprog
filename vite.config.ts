import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  const config: UserConfig = {
    plugins: [react()],
    server: {
      port: 5173,
      strictPort: true
    }
  }
  return config;
})
