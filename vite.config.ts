import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/comeplay/',
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
    },
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'swiper-vendor': ['swiper', 'swiper/react', 'swiper/modules'],
          'ui-vendor': ['lucide-react']
        }
      }
    }
  }
});
