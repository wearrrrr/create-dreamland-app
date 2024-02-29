import { defineConfig } from 'vite';

export default defineConfig({
  // Base URL for the application
  base: '/',
  
  root: './src',
  // Output directory for the production build
  build: {
    outDir: '../dist',
  },
  
  // Server configuration
  server: {
    port: 3000,
  },
});
