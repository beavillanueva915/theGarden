import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: '/theGarden/',
  plugins: [react()],
  resolve: {
    alias: {
      '@game': resolve(__dirname, '../src/game'),
      '@theme': resolve(__dirname, '../src/theme.ts'),
    },
  },
});
