// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { DEFAULT_MENU_DATA, MenuItem, MenuSection } from '../../core/icons/icon-service';
import { StylesheetManager } from '../../core/styles/stylesheet-utils';
import { style } from './tools.style';

/**
 * @element lfx-tools
 * @summary A tools menu component for LFX applications
 * @description This component provides a grid icon button that opens a tools menu
 * @csspart button - The menu trigger button
 * @csspart icon - The grid icon
 * @csspart menu - The dropdown menu container
 * @csspart menu-section - Individual menu sections
 * @csspart menu-item - Individual menu items
 * @csspart menu-link - Menu item links
 *
 * @attr {string} kit - Font Awesome Pro kit ID (optional, assumes FA already loaded if not provided)
 * @attr {string} product - Product identifier to set the corresponding menu item as active
 *
 * @cssproperty --lfx-tools-button-size - Size of the trigger button
 * @cssproperty --lfx-tools-button-bg - Background color of the button
 * @cssproperty --lfx-tools-button-hover-bg - Hover background color
 * @cssproperty --lfx-tools-icon-color - Color of the grid icon
 * @cssproperty --lfx-tools-menu-bg - Background color of the menu
 * @cssproperty --lfx-tools-menu-shadow - Box shadow for the menu
 * @cssproperty --lfx-tools-menu-width - Width of the dropdown menu
 * @cssproperty --lfx-tools-menu-active-bg - Background color of active menu items
 * @cssproperty --lfx-tools-menu-active-text - Text color of active menu items
 * @cssproperty --lfx-tools-menu-icon-active-color - Icon color of active menu items
 */
export class LFXTools extends HTMLElement {
  private _template!: HTMLTemplateElement;
  private _rendered = false;
  private _isOpen = false;
  private _button!: HTMLButtonElement;
  private _menu!: HTMLDivElement;
  private _kitId: string | null = null;
  private _productId: string | null = null;

  // Default menu structure from the specification
  private _menuData: MenuSection[] = DEFAULT_MENU_DATA;

  private _boundHandleButtonClick: EventListener;
  private _boundHandleMenuClick: EventListener;
  private _boundHandleOutsideClick: EventListener;

  static get observedAttributes() {
    return ['kit', 'product'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._createTemplate();
    this._boundHandleButtonClick = this._handleButtonClick.bind(this);
    this._boundHandleMenuClick = this._handleMenuClick.bind(this);
    this._boundHandleOutsideClick = this._handleOutsideClick.bind(this);
    this._loadOpenSansFont();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'kit') {
      this._kitId = newValue;
      this._loadFontAwesomeKit();

      // Re-render menu if already rendered to update icons
      if (this._rendered) {
        this._updateMenu();
      }
    } else if (name === 'product') {
      this._productId = newValue;

      // Re-render menu if already rendered to update active state
      if (this._rendered) {
        this._updateMenu();
      }
    }
  }

  /**
   * Load Open Sans font if not already loaded
   */
  private _loadOpenSansFont(): void {
    if (typeof document !== 'undefined' && !document.querySelector('link[href*="fonts.googleapis.com"][href*="Open+Sans"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap';
      document.head.appendChild(link);
    }
  }

  /**
   * Load Font Awesome kit if not already loaded
   */
  private _loadFontAwesomeKit(): void {
    const kitId = this.getAttribute('kit');
    if (!kitId) return;

    if (typeof document !== 'undefined' && !document.querySelector('link[href*="kit.fontawesome.com"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://kit.fontawesome.com/${kitId}.css`;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }

    if (this.shadowRoot && !this.shadowRoot.querySelector(`link[href*="${kitId}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://kit.fontawesome.com/${kitId}.css`;
      link.crossOrigin = 'anonymous';
      this.shadowRoot.appendChild(link);
    }
  }

  get menuData(): MenuSection[] {
    return this._menuData;
  }

  set menuData(data: MenuSection[]) {
    this._menuData = data;
    if (this._rendered) {
      this._updateMenu();
    }
  }

  get kit(): string | null {
    return this._kitId;
  }

  set kit(kitId: string | null) {
    if (kitId) {
      this.setAttribute('kit', kitId);
    } else {
      this.removeAttribute('kit');
    }
  }

  get product(): string | null {
    return this._productId;
  }

  set product(productId: string | null) {
    if (productId) {
      this.setAttribute('product', productId);
    } else {
      this.removeAttribute('product');
    }
  }

  private _createTemplate(): void {
    this._template = document.createElement('template');
    this._template.innerHTML = `
      <div class="tools-container">
        <button class="tools-button" part="button" aria-label="Open tools menu" aria-expanded="false">
          <div class="grid-icon" part="icon">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </button>

        <div class="tools-menu" part="menu" hidden>
          <div class="menu-content">
            <!-- Menu items will be populated here -->
          </div>
        </div>
      </div>
    `;
  }

  private _updateMenu(): void {
    const menuContent = this._menu?.querySelector('.menu-content');
    if (!menuContent) return;

    menuContent.innerHTML = '';

    this._menuData.forEach((section: MenuSection, index: number) => {
      // Create section header
      const sectionElement = document.createElement('div');
      sectionElement.className = 'menu-section';
      sectionElement.setAttribute('part', 'menu-section');

      const sectionHeader = document.createElement('div');
      sectionHeader.className = 'section-header';
      sectionHeader.textContent = section.section;
      sectionElement.appendChild(sectionHeader);

      // Create section items
      section.items.forEach((item: MenuItem) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.setAttribute('part', 'menu-item');

        // Add active class if specified
        if (item.styleClass) {
          itemElement.classList.add(item.styleClass);
        }

        const linkElement = document.createElement('a');
        linkElement.href = item.url;
        linkElement.className = 'menu-link';
        linkElement.setAttribute('part', 'menu-link');
        linkElement.target = item.target;

        if (item.target === '_blank') {
          linkElement.rel = 'noopener noreferrer';
        }

        // Check if this item should be active based on product attribute
        if (this._productId && item.product === this._productId) {
          linkElement.classList.add('active');
        }

        // Create icon element (no hover effect)
        const iconElement = document.createElement('i');
        iconElement.className = item.icon + ' fa-solid';

        // Create duotone icon element
        const duotoneIconElement = document.createElement('i');
        duotoneIconElement.className = item.icon + ' fa-duotone';

        // Wrap icons in a container
        const iconContainer = document.createElement('div');
        iconContainer.className = 'menu-icon-container';
        iconContainer.appendChild(iconElement);
        iconContainer.appendChild(duotoneIconElement);

        const labelElement = document.createElement('span');
        labelElement.className = 'menu-label';
        labelElement.textContent = item.label;

        linkElement.appendChild(iconContainer);
        linkElement.appendChild(labelElement);

        itemElement.appendChild(linkElement);
        sectionElement.appendChild(itemElement);
      });

      menuContent.appendChild(sectionElement);
    });
  }

  connectedCallback(): void {
    if (!this._rendered) {
      // Apply styles
      StylesheetManager.applyStyles(this.shadowRoot!, style, 'lfx-tools');

      // Add template content
      const content = this._template.content.cloneNode(true);
      this.shadowRoot!.appendChild(content);

      // Load Font Awesome kit in shadow DOM and Dom
      this._loadFontAwesomeKit();

      // Get references to elements
      this._button = this.shadowRoot!.querySelector('.tools-button') as HTMLButtonElement;
      this._menu = this.shadowRoot!.querySelector('.tools-menu') as HTMLDivElement;

      // Set up event listeners
      this._button.addEventListener('click', this._boundHandleButtonClick);

      // Populate menu
      this._updateMenu();

      this._rendered = true;
    }
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this._boundHandleOutsideClick);
    if (this._button) {
      this._button.removeEventListener('click', this._boundHandleButtonClick);
    }
    if (this._menu) {
      this._menu.removeEventListener('click', this._boundHandleMenuClick);
    }
  }

  private _handleButtonClick(event: Event): void {
    event.stopPropagation();
    this.toggleMenu();
  }

  private _handleOutsideClick(event: Event): void {
    if (!this.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  private _handleMenuClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.closest('.menu-link')) {
      // Close menu when a link is clicked
      this.closeMenu();
    }
  }

  public toggleMenu(): void {
    if (this._isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  public openMenu(): void {
    if (this._isOpen) return;

    this._isOpen = true;
    this._menu.hidden = false;
    this._button.setAttribute('aria-expanded', 'true');

    // Add click outside listener
    setTimeout(() => {
      document.addEventListener('click', this._boundHandleOutsideClick);
    }, 0);

    // Add menu click listener
    this._menu.addEventListener('click', this._boundHandleMenuClick);

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('menu-opened', {
        bubbles: true,
        detail: { isOpen: true },
      })
    );
  }

  public closeMenu(): void {
    if (!this._isOpen) return;

    this._isOpen = false;
    this._menu.hidden = true;
    this._button.setAttribute('aria-expanded', 'false');

    // Remove listeners
    document.removeEventListener('click', this._boundHandleOutsideClick);
    this._menu.removeEventListener('click', this._boundHandleMenuClick);

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('menu-closed', {
        bubbles: true,
        detail: { isOpen: false },
      })
    );
  }
}

// Register component
if (typeof window !== 'undefined' && !customElements.get('lfx-tools')) {
  customElements.define('lfx-tools', LFXTools);
}

// TypeScript declarations for framework integration
declare global {
  interface HTMLElementTagNameMap {
    'lfx-tools': LFXTools;
  }
}

// Make the element available for import/registration
export const defineTools = () => {
  if (typeof window !== 'undefined' && !customElements.get('lfx-tools')) {
    customElements.define('lfx-tools', LFXTools);
  }
};

// Auto-register when imported (for convenience)
defineTools();
