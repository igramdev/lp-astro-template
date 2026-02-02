/**
 * Asset path helper utilities
 *
 * These functions generate absolute paths for assets in the project.
 * All configuration is centralized in util/settings.ts
 */

import {
  BASE_PATH,
  ASSETS_DIR,
  VERSION,
  SITE_URL,
  CSS_DIR,
  CSS_FILENAME,
  JS_DIR,
  JS_FILENAME,
  IMAGES_DIR,
} from './settings';

/**
 * Add version query parameter for cache busting
 * @param path - File path
 * @param addVersion - Whether to add version parameter (default: true)
 * @returns Path with version parameter
 */
const addVersionParam = (path: string, addVersion = true): string => {
  return addVersion ? `${path}?v=${VERSION}` : path;
};

/**
 * Generate image path
 * @param filename - Image filename (e.g., 'hero.png')
 * @param withBase - Include base path (default: true)
 * @param withVersion - Add version query parameter (default: false)
 * @returns Full path to image
 */
export const img = (
  filename: string,
  withBase = true,
  withVersion = false
): string => {
  const path = `/${ASSETS_DIR}/${IMAGES_DIR}/${filename}`;
  const fullPath = withBase ? `${BASE_PATH}${path}` : path;
  return addVersionParam(fullPath, withVersion);
};

/**
 * Generate CSS path
 * @param filename - CSS filename (defaults to CSS_FILENAME from settings)
 * @param withBase - Include base path (default: true)
 * @param withVersion - Add version query parameter (default: true)
 * @returns Full path to CSS file
 */
export const css = (
  filename: string = CSS_FILENAME,
  withBase = true,
  withVersion = true
): string => {
  const path = `/${ASSETS_DIR}/${CSS_DIR}/${filename}`;
  const fullPath = withBase ? `${BASE_PATH}${path}` : path;
  return addVersionParam(fullPath, withVersion);
};

/**
 * Generate JS path
 * @param filename - JS filename (defaults to JS_FILENAME from settings)
 * @param withBase - Include base path (default: true)
 * @param withVersion - Add version query parameter (default: true)
 * @returns Full path to JS file
 */
export const js = (
  filename: string = JS_FILENAME,
  withBase = true,
  withVersion = true
): string => {
  const path = `/${ASSETS_DIR}/${JS_DIR}/${filename}`;
  const fullPath = withBase ? `${BASE_PATH}${path}` : path;
  return addVersionParam(fullPath, withVersion);
};

/**
 * Generate generic asset path
 * @param relativePath - Relative path from assets directory
 * @param withBase - Include base path (default: true)
 * @param withVersion - Add version query parameter (default: false)
 * @returns Full path to asset
 */
export const asset = (
  relativePath: string,
  withBase = true,
  withVersion = false
): string => {
  const path = `/${ASSETS_DIR}/${relativePath}`;
  const fullPath = withBase ? `${BASE_PATH}${path}` : path;
  return addVersionParam(fullPath, withVersion);
};

/**
 * Generate OGP image URL (full absolute URL)
 * @param filename - Image filename (e.g., 'ogp.png')
 * @param withVersion - Add version query parameter (default: false)
 * @returns Full absolute URL for OGP image
 */
export const ogImage = (filename: string, withVersion = false): string => {
  const imagePath = img(filename, true, false);
  const fullUrl = `${SITE_URL}${imagePath}`;
  return addVersionParam(fullUrl, withVersion);
};
