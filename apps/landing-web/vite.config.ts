import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    port: 3001,
    host: '0.0.0.0',
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'b1dx/ui': path.resolve(__dirname, '../../packages/ui/src'),
      'b1dx/utils': path.resolve(__dirname, '../../packages/utils/src')
    }
  }
});
