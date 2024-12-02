// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Handles SPA routing for client-side navigation
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html', // Specify the main entry point
      },
      outDir: 'dist'

    },
  },

});