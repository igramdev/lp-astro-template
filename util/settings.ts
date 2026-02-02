/**
 * Project configuration and environment detection utilities
 *
 * Configuration values are imported from util/config.mjs
 * to share settings between TypeScript and JavaScript environments.
 * ★ Update config.mjs when initializing a new project
 */

// ============================================
// Project Configuration (imported from config.mjs)
// ============================================

export {
  SITE_URL,
  PROJECT_NAME,
  ASSETS_DIR,
  VERSION,
  BASE_PATH,
  CSS_DIR,
  CSS_FILENAME,
  JS_DIR,
  JS_FILENAME,
  IMAGES_DIR,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_DESCRIPTION,
  THEME_COLOR,
  OGP_IMAGE,
} from './config.mjs';

// ============================================
// Environment Detection
// ============================================

/**
 * Check if running in development mode
 * Note: This file is meant for use in Node.js context (build scripts).
 * For Astro components, use import.meta.env.DEV directly.
 */
export const isDev = process.env.NODE_ENV === 'development';

/**
 * Check if running in production mode
 */
export const isProd = process.env.NODE_ENV === 'production';

/**
 * Get current environment name
 */
export const getEnv = (): string => {
  return process.env.NODE_ENV || 'development';
};
