/**
 * Common type definitions
 */

/**
 * Meta information for HTML pages
 */
export interface Meta {
  /**
   * Page title
   */
  title?: string;

  /**
   * Page description
   */
  description?: string;

  /**
   * OGP image URL (absolute URL)
   */
  ogImage?: string;

  /**
   * HTML lang attribute (default: 'ja')
   */
  lang?: string;

  /**
   * Site name (for og:site_name)
   */
  siteName?: string;

  /**
   * Site short name
   */
  siteShortName?: string;
}
