import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          'b1dx/types': path.resolve(__dirname, '../../packages/types/src'),
          'b1dx/ui': path.resolve(__dirname, '../../packages/ui/src')
        }
      }
    };
});
