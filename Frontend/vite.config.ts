import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('lodash')) {
              return 'vendor-lodash';
            }
            return 'vendor'; // Default chunk for other dependencies
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase warning limit (optional)
  }
});
