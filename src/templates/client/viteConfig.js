// src/templates/client/viteConfig.js
export function getViteConfig({ useTypeScript }) {
  const ts = useTypeScript;
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
${ts ? `import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
` : ''}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests to the Express server during development
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
`;
}
