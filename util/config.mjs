/**
 * Project configuration (JavaScript)
 *
 * This file is shared between TypeScript and JavaScript environments.
 * It is imported by:
 * - util/settings.ts (TypeScript environment)
 * - vite.config.mjs (JavaScript environment)
 *
 * ★ Update these values when initializing a new project
 */

// ============================================
// Project Configuration (Change for each project)
// ============================================

/**
 * Site URL (for OGP images and absolute URLs)
 * Must start with http:// or https://
 * Example: 'https://example.com'
 */
export const SITE_URL = 'https://example.com'; // ★ CHANGE THIS

/**
 * Project name (used in URL path and container ID)
 * Example: 'my-project' → URL: /my-project/, Container: <div id="my-project">
 */
export const PROJECT_NAME = 'example'; // ★ CHANGE THIS

/**
 * Assets directory name
 */
export const ASSETS_DIR = 'assets';

/**
 * Project version (for cache busting)
 * Update this when deploying new versions
 */
export const VERSION = '1.0.0'; // ★ CHANGE THIS on updates

/**
 * Base path for all assets
 * Automatically generated from PROJECT_NAME
 */
export const BASE_PATH = `/${PROJECT_NAME}`;

// ============================================
// Asset Structure Configuration
// ============================================

/**
 * CSS directory name (relative to ASSETS_DIR)
 */
export const CSS_DIR = 'css';

/**
 * CSS file name
 */
export const CSS_FILENAME = 'style.css';

/**
 * JS directory name (relative to ASSETS_DIR)
 */
export const JS_DIR = 'js';

/**
 * JS file name
 */
export const JS_FILENAME = 'main.js';

/**
 * Images directory name (relative to ASSETS_DIR)
 */
export const IMAGES_DIR = 'images';

// ============================================
// Site Information
// ============================================

/**
 * Site name (used in OGP, manifest, default title)
 */
export const SITE_NAME = 'Template Name - Landing Page'; // ★ CHANGE THIS

/**
 * Site short name (used in PWA manifest)
 */
export const SITE_SHORT_NAME = 'Template'; // ★ CHANGE THIS

/**
 * Site description (default meta description)
 */
export const SITE_DESCRIPTION = 'Landing page description'; // ★ CHANGE THIS

/**
 * Theme color (meta theme-color, manifest)
 */
export const THEME_COLOR = '#ffffff'; // ★ CHANGE THIS

/**
 * OGP default image filename (in IMAGES_DIR)
 */
export const OGP_IMAGE = 'ogp.png'; // ★ CHANGE THIS
