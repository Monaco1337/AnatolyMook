import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerenderPlugin from './vite-plugin-prerender.js';

export default defineConfig({
  plugins: [react(), prerenderPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'supabase': ['@supabase/supabase-js'],
          'icons': ['lucide-react'],
        },
      },
    },
    cssCodeSplit: true,
    minify: 'esbuild',
    target: 'es2015',
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600,
    assetsInlineLimit: 4096,
  },
});
