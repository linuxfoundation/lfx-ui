// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { StylesheetManager } from '../../core/styles/stylesheet-utils';
import { style } from './footer.style';

// TypeScript declarations for Osano global object
declare global {
  interface Window {
    Osano?: {
      cm?: {
        hideWidget?: () => void;
        showDrawer?: () => void;
      };
    };
  }
}

/**
 * @element lfx-footer
 * @summary A footer component for LFX applications
 * @description This component provides a consistent footer across LFX applications with optional cookie consent script integration. When cookie tracking is enabled, it includes a "Manage cookie preferences" link that opens the Osano consent management drawer.
 * @csspart footer - The main footer element
 * @csspart footer-container - The main container of the footer
 * @csspart footer-content - The content wrapper of the footer
 * @csspart copyright - The copyright paragraph
 * @csspart link - Individual footer links
 * @csspart cookie-preferences - The cookie preferences container
 * @csspart cookie-preferences-link - The cookie preferences link
 *
 * @cssproperty --lfx-footer-bg - Background color of the footer
 * @cssproperty --lfx-footer-text - Text color of the footer
 * @cssproperty --lfx-footer-link-color - Color of footer links
 * @cssproperty --lfx-footer-link-hover-color - Color of footer links on hover
 * @cssproperty --lfx-footer-padding - Padding of the footer
 * @cssproperty --lfx-footer-font-size - Font size of footer text
 * @cssproperty --lfx-footer-font-family - Font family of footer text
 *
 * @attr {boolean} cookie-tracking - When true, appends the Osano cookie consent script to the document and shows the "Manage cookie preferences" link
 *
 * @fires cookie-script-error - Fired when the cookie consent script fails to load
 */
export class LFXFooter extends HTMLElement {
  private _template!: HTMLTemplateElement;
  private _rendered = false;
  private static readonly OSANO_SCRIPT_SRC = 'https://cmp.osano.com/16A0DbT9yDNIaQkvZ/d6ac078e-c71f-4b96-8c97-818cc1cc6632/osano.js?variant=two';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._createTemplate();
  }

  static get observedAttributes(): string[] {
    return ['cookie-tracking'];
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'cookie-tracking' && this._rendered) {
      this._handleCookieTracking();
    }
  }

  private _createTemplate(): void {
    this._template = document.createElement('template');
    this._template.innerHTML = `
      <footer class="footer-container" part="footer" role="contentinfo">
        <div class="footer-content" part="footer-content">
          <div class="copyright-container" part="copyright-container">
            <p class="copyright" part="copyright">
              Copyright © ${new Date().getFullYear()} The Linux Foundation®. All rights reserved.
              The Linux Foundation has registered trademarks and uses trademarks. For more information, including terms of use,
              <a href="https://www.linuxfoundation.org/legal/platform-use-agreement/" target="_blank" rel="noopener noreferrer" part="link">Platform Usage</a>,
              <a href="https://www.linuxfoundation.org/legal/privacy-policy?hsLang=en" target="_blank" rel="noopener noreferrer" part="link">Privacy Policy</a>,
              and <a href="https://www.linuxfoundation.org/legal/trademark-usage?hsLang=en" target="_blank" rel="noopener noreferrer" part="link">Trademark Usage</a>,
              please see our <a href="https://www.linuxfoundation.org/legal/policies" target="_blank" rel="noopener noreferrer" part="link">Policies</a> page.
            </p>
            <div class="cookie-preferences" part="cookie-preferences" style="display: none;">
              <a href="#" class="cookie-preferences-link" part="cookie-preferences-link">Manage cookie preferences</a>.
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  connectedCallback(): void {
    if (!this._rendered) {
      // Apply styles using utility (with caching)
      StylesheetManager.applyStyles(this.shadowRoot!, style, 'lfx-footer');

      // Add template content
      const content = this._template.content.cloneNode(true);
      this.shadowRoot!.appendChild(content);
      this._rendered = true;
    }

    // Set up cookie preferences link
    this._setupCookiePreferencesLink();

    // Check if cookie tracking should be enabled
    this._handleCookieTracking();
  }

  private _setupCookiePreferencesLink(): void {
    const cookiePreferencesLink = this.shadowRoot?.querySelector('.cookie-preferences-link');
    if (cookiePreferencesLink) {
      cookiePreferencesLink.addEventListener('click', this._handleCookiePreferencesClick.bind(this));
    }
  }

  private _handleCookiePreferencesClick(event: Event): void {
    event.preventDefault();

    // Show the Osano drawer
    if (typeof window !== 'undefined' && window.Osano?.cm?.showDrawer) {
      window.Osano.cm.showDrawer();
    } else {
      console.warn('LFXFooter: Osano CMP not available for showing cookie preferences drawer');
    }
  }

  private _handleCookieTracking(): void {
    const cookieTrackingAttr = this.getAttribute('cookie-tracking');
    const shouldEnable = cookieTrackingAttr === 'true' || cookieTrackingAttr === '';

    if (shouldEnable) {
      this._appendOsanoScript();
      this._showCookiePreferencesLink();
    }
  }

  private _showCookiePreferencesLink(): void {
    const cookiePreferences = this.shadowRoot?.querySelector('.cookie-preferences') as HTMLElement;
    if (cookiePreferences) {
      cookiePreferences.style.display = 'inline';
    }
  }

  private _appendOsanoScript(): void {
    if (typeof document === 'undefined') {
      return;
    }

    // Check if the script already exists to prevent duplicates
    const existingScript = document.querySelector(`script[src="${LFXFooter.OSANO_SCRIPT_SRC}"]`);
    if (existingScript) {
      return;
    }

    // Add Osano initialization script first
    const initScript = document.createElement('script');
    initScript.textContent = `
(function (w, o, d) {
    w[o] =
        w[o] ||
        function () {
            w[o][d].push(arguments);
        };
    w[o][d] = w[o][d] || [];
})(window, 'Osano', 'data');

// Hide widget on initialization
window.Osano('onInitialized', function(consent) {
    // Add style to hide widget
    const style = document.createElement('style');
    style.textContent = '.osano-cm-widget {display: none !important;}';
    document.head.appendChild(style);
});
    `;

    // Create and append the main Osano script
    const script = document.createElement('script');
    script.src = LFXFooter.OSANO_SCRIPT_SRC;
    script.async = true;

    // Add error handling
    script.onerror = () => {
      console.error('LFXFooter: Failed to load Osano cookie consent script');
      // Dispatch custom event for error handling
      this.dispatchEvent(
        new CustomEvent('cookie-script-error', {
          bubbles: true,
          detail: {
            scriptSrc: LFXFooter.OSANO_SCRIPT_SRC,
            error: 'Script failed to load',
          },
        })
      );
    };

    // Append both scripts to the document
    if (document.head) {
      document.head.appendChild(initScript);
      document.head.appendChild(script);
    } else {
      document.body?.appendChild(initScript);
      document.body?.appendChild(script);
    }
  }
}

// Register component
if (typeof window !== 'undefined' && !customElements.get('lfx-footer')) {
  customElements.define('lfx-footer', LFXFooter);
}
