// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { style } from './footer.style';

/**
 * @element lfx-footer
 * @summary A footer component for LFX applications with integrated cookie management
 * @description This component provides a consistent footer across LFX applications with optional cookie consent
 * management powered by Osano. When enabled, it automatically loads and manages cookie consent scripts
 * to ensure compliance with privacy regulations.
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <lfx-footer></lfx-footer>
 *
 * <!-- With cookie management enabled -->
 * <lfx-footer cookie-management-enabled="true"></lfx-footer>
 *
 * <!-- With custom cookie script -->
 * <lfx-footer
 *   cookie-management-enabled="true"
 *   custom-cookie-script-url="https://custom.domain.com/cookie-script.js">
 * </lfx-footer>
 * ```
 *
 * @csspart footer-container - The main container of the footer
 * @csspart footer-content - The content wrapper of the footer
 * @csspart footer-links - The container for footer links
 * @csspart copyright-container - The container for copyright information
 *
 * @cssproperty --lfx-footer-bg - Background color of the footer
 * @cssproperty --lfx-footer-text - Text color of the footer
 *
 * @attr {boolean} cookie-management-enabled - Enable/disable cookie management functionality. Defaults to false.
 * @attr {string} custom-cookie-script-url - Custom cookie script URL. When not provided, uses default Osano script.
 *
 * @fires cookie-script-loaded - Dispatched when cookie management script loads successfully
 * @fires cookie-script-error - Dispatched when cookie management script fails to load
 */
export class LFXFooter extends HTMLElement {
  private static readonly DEFAULT_OSANO_SCRIPT_URL = 'https://cmp.osano.com/16A0DbT9yDNIaQkvZ/d6ac078e-c71f-4b96-8c97-818cc1cc6632/osano.js?variant=two';
  private cookieScriptElement: HTMLScriptElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Observed attributes for the Web Component
   */
  static get observedAttributes(): string[] {
    return ['cookie-management-enabled', 'custom-cookie-script-url'];
  }

  /**
   * Gets the current cookie management enabled status.
   * @returns {boolean} True if cookie management is enabled, false otherwise
   */
  get cookieManagementEnabled(): boolean {
    return this.hasAttribute('cookie-management-enabled') && this.getAttribute('cookie-management-enabled') !== 'false';
  }

  /**
   * Sets the cookie management enabled status.
   * When enabled, the component will automatically load the cookie consent script.
   * @param {boolean} value - Whether to enable cookie management
   */
  set cookieManagementEnabled(value: boolean) {
    if (value) {
      this.setAttribute('cookie-management-enabled', 'true');
    } else {
      this.removeAttribute('cookie-management-enabled');
    }
  }

  /**
   * Gets the custom cookie script URL.
   * @returns {string | null} The custom script URL or null if using default
   */
  get customCookieScriptUrl(): string | null {
    return this.getAttribute('custom-cookie-script-url');
  }

  /**
   * Sets a custom cookie script URL.
   * If not provided, the component will use the default Osano script.
   * @param {string | null} value - The custom script URL or null to use default
   */
  set customCookieScriptUrl(value: string | null) {
    if (value) {
      this.setAttribute('custom-cookie-script-url', value);
    } else {
      this.removeAttribute('custom-cookie-script-url');
    }
  }

  /**
   * Loads the cookie management script dynamically.
   * This method handles the creation and injection of the cookie consent script
   * into the document head. It supports both the default Osano script and custom URLs.
   * @private
   */
  private loadCookieScript(): void {
    if (!this.cookieManagementEnabled) {
      return;
    }

    // Remove existing script if present
    this.removeCookieScript();

    try {
      const scriptUrl = this.customCookieScriptUrl || LFXFooter.DEFAULT_OSANO_SCRIPT_URL;
      const script = document.createElement('script');

      script.src = scriptUrl;
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-lfx-cookie-script', 'true');

      // Add success and error handling
      script.onload = () => {
        this.dispatchEvent(
          new CustomEvent('cookie-script-loaded', {
            detail: { scriptUrl },
            bubbles: true,
          })
        );
      };

      script.onerror = () => {
        const errorMessage = `Failed to load cookie management script from: ${scriptUrl}`;
        console.warn(errorMessage);
        this.dispatchEvent(
          new CustomEvent('cookie-script-error', {
            detail: { scriptUrl, error: errorMessage },
            bubbles: true,
          })
        );
      };

      // Add the script to document head
      document.head.appendChild(script);
      this.cookieScriptElement = script;
    } catch (error) {
      console.error('Error loading cookie management script:', error);
      this.dispatchEvent(
        new CustomEvent('cookie-script-error', {
          detail: { error: error instanceof Error ? error.message : String(error) },
          bubbles: true,
        })
      );
    }
  }

  /**
   * Removes the cookie management script from the document.
   * This method provides cleanup functionality to prevent memory leaks
   * and ensures proper script lifecycle management.
   * @private
   */
  private removeCookieScript(): void {
    if (this.cookieScriptElement && this.cookieScriptElement.parentNode) {
      this.cookieScriptElement.parentNode.removeChild(this.cookieScriptElement);
      this.cookieScriptElement = null;
    }
  }

  /**
   * Handles changes to observed attributes.
   * Automatically reloads the cookie script when relevant attributes change.
   * @param {string} name - The name of the changed attribute
   * @param {string | null} oldValue - The previous attribute value
   * @param {string | null} newValue - The new attribute value
   */
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'cookie-management-enabled' || name === 'custom-cookie-script-url') {
      // Reload script when attributes change
      if (this.isConnected) {
        this.loadCookieScript();
      }
    }
  }

  private getTemplate(): string {
    return `
      <style>${style}</style>

      <div class="footer-container">
        <div class="footer-content">
          <div class="copyright-container">
            <p class="copyright">Copyright &copy; ${new Date().getFullYear()} The Linux Foundation&reg;. All rights reserved.
            The Linux Foundation has registered trademarks and uses trademarks. For more information, including terms of use,
            <a href="https://www.linuxfoundation.org/legal/platform-use-agreement/" target="_blank" rel="noopener noreferrer">Platform Usage</a>,
            <a href="https://www.linuxfoundation.org/legal/privacy-policy?hsLang=en" target="_blank" rel="noopener noreferrer">Privacy Policy</a>,
            and <a href="https://www.linuxfoundation.org/legal/trademark-usage?hsLang=en" target="_blank" rel="noopener noreferrer">Trademark Usage</a>,
            please see our <a href="https://www.linuxfoundation.org/legal/policies" target="_blank" rel="noopener noreferrer">Policies</a> page.</p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Called when the element is inserted into the DOM.
   * Initializes the component template and cookie management functionality.
   */
  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = this.getTemplate();
    }

    // Initialize cookie management after component is connected
    this.loadCookieScript();
  }

  /**
   * Called when the element is removed from the DOM.
   * Performs cleanup to prevent memory leaks and remove any loaded scripts.
   */
  disconnectedCallback() {
    // Clean up cookie script when component is removed
    this.removeCookieScript();
  }
}

// Use IIFE to register the component immediately
(() => {
  if (typeof window !== 'undefined') {
    if (!customElements.get('lfx-footer')) {
      customElements.define('lfx-footer', LFXFooter);
    }
  }
})();
