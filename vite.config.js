import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js alone is ~700 kB minified; it is only fetched on the game route.
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react-vendor', test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/, priority: 20 },
            { name: 'three', test: /node_modules[\\/]three[\\/]/, priority: 15 },
            { name: 'game-vendor', test: /node_modules[\\/]/, priority: 10 },
          ],
        },
      },
    },
  },
});
