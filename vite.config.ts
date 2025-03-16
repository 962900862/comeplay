import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'swiper',
      'swiper/react',
      'swiper/modules',
      'lucide-react'
    ]
  },
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'swiper-vendor': ['swiper', 'swiper/react', 'swiper/modules'],
          'ui-vendor': ['lucide-react']
        }
      }
    }
  }
});
