import { defineConfig } from 'vite';
import { resolve } from 'path';
import {
  PROJECT_NAME,
  ASSETS_DIR,
  CSS_DIR,
  CSS_FILENAME,
  JS_DIR,
  JS_FILENAME,
} from './util/config.mjs';

// Common Vite configuration for both Astro and standalone builds
export default defineConfig({
  publicDir: false,
  build: {
    outDir: `dist/${PROJECT_NAME}/${ASSETS_DIR}`,
    emptyOutDir: false,
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      input: resolve(__dirname, 'src/scripts/main.ts'),
      output: {
        format: 'iife',
        entryFileNames: `${JS_DIR}/${JS_FILENAME}`,
        chunkFileNames: `${JS_DIR}/chunk-[name].js`,
        assetFileNames: (info) => {
          const rep = (info.names?.[0] ?? '').toLowerCase();

          if (/\.(png|jpe?g|gif|webp|avif|svg|ico)$/.test(rep)) {
            return `${PROJECT_NAME}/${ASSETS_DIR}/[name][extname]`;
          }

          // CSS files
          if (rep.endsWith('.css')) {
            return `${CSS_DIR}/${CSS_FILENAME}`;
          }
          // Other assets use default pattern
          return `${PROJECT_NAME}/${ASSETS_DIR}/[name].[ext]`;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@layouts': resolve(__dirname, './src/layouts'),
      '@util': resolve(__dirname, './util'),
    },
  },
});
