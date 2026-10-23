import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite provides fast local development and builds a static SPA for Vercel.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
  },
});
