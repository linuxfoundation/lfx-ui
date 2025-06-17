// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

/**
 * Utility class for managing constructible stylesheets in web components
 * Provides fallback support for browsers that don't support adoptedStyleSheets
 */
export class StylesheetManager {
  private static _cache = new Map<string, CSSStyleSheet>();

  /**
   * Creates or retrieves a cached stylesheet from CSS text
   * @param css - CSS string content
   * @param cacheKey - Optional cache key, defaults to hash of CSS content
   * @returns CSSStyleSheet instance or null if not supported
   */
  static createStylesheet(css: string, cacheKey?: string): CSSStyleSheet | null {
    // Check if constructible stylesheets are supported
    if (!('CSSStyleSheet' in window)) {
      return null;
    }

    const key = cacheKey || this._hashString(css);

    // Return cached stylesheet if it exists
    if (this._cache.has(key)) {
      return this._cache.get(key)!;
    }

    // Create new stylesheet
    const stylesheet = new CSSStyleSheet();
    try {
      stylesheet.replaceSync(css);
      this._cache.set(key, stylesheet);
      return stylesheet;
    } catch (error) {
      console.warn('Failed to create stylesheet:', error);
      return null;
    }
  }

  /**
   * Applies stylesheet to a shadow root with fallback support
   * @param shadowRoot - The shadow root to apply styles to
   * @param css - CSS string content
   * @param cacheKey - Optional cache key for stylesheet caching
   */
  static applyStyles(shadowRoot: ShadowRoot, css: string, cacheKey?: string): void {
    const stylesheet = this.createStylesheet(css, cacheKey);

    if (stylesheet && 'adoptedStyleSheets' in shadowRoot) {
      // Use modern adoptedStyleSheets
      shadowRoot.adoptedStyleSheets = [stylesheet];
    } else {
      // Fallback: create style element
      const styleElement = document.createElement('style');
      styleElement.textContent = css;
      shadowRoot.appendChild(styleElement);
    }
  }

  /**
   * Adds additional stylesheets to existing adopted stylesheets
   * @param shadowRoot - The shadow root to update
   * @param css - CSS string content to add
   * @param cacheKey - Optional cache key
   */
  static addStyles(shadowRoot: ShadowRoot, css: string, cacheKey?: string): void {
    const stylesheet = this.createStylesheet(css, cacheKey);

    if (stylesheet && 'adoptedStyleSheets' in shadowRoot) {
      shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, stylesheet];
    } else {
      // Fallback: create additional style element
      const styleElement = document.createElement('style');
      styleElement.textContent = css;
      shadowRoot.appendChild(styleElement);
    }
  }

  /**
   * Clears the stylesheet cache (useful for development/testing)
   */
  static clearCache(): void {
    this._cache.clear();
  }

  /**
   * Simple hash function for caching CSS content
   * @param str - String to hash
   * @returns Hash string
   */
  private static _hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }
}

/**
 * Base class for components that use stylesheets
 * Provides common functionality for stylesheet management
 */
export abstract class StyledComponent extends HTMLElement {
  declare shadowRoot: ShadowRoot;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Apply styles to the component's shadow root
   * @param css - CSS string content
   * @param cacheKey - Optional cache key (defaults to component name)
   */
  protected applyStyles(css: string, cacheKey?: string): void {
    const key = cacheKey || this.constructor.name;
    StylesheetManager.applyStyles(this.shadowRoot, css, key);
  }

  /**
   * Add additional styles to the component
   * @param css - CSS string content
   * @param cacheKey - Optional cache key
   */
  protected addStyles(css: string, cacheKey?: string): void {
    StylesheetManager.addStyles(this.shadowRoot, css, cacheKey);
  }
}
