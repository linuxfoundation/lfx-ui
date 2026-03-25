// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { StylesheetManager } from '../../core/styles/stylesheet-utils';
import { fetchChangelogs } from './changelog.api';
import { renderEmpty, renderError, renderFooter, renderHeader, renderList, renderLoading } from './changelog.renderer';
import { style } from './changelog.style';

import type { ChangelogEntry } from './changelog.types';

const DEFAULT_BASE_URL = 'https://changelog.lfx.dev';
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 25;

/**
 * @element lfx-changelog
 * @summary An embeddable changelog widget for LFX products
 * @description Fetches and displays published changelog entries for a given LFX product.
 * Supports light/dark theming, CSS custom properties, and ::part() selectors for styling.
 * Renders markdown content with XSS protection via DOMPurify.
 *
 * @csspart container - Outer wrapper element
 * @csspart header - Header section
 * @csspart heading - The h2 heading text
 * @csspart list - Card list wrapper
 * @csspart card - Individual changelog card
 * @csspart meta - Version + date row within a card
 * @csspart version - Version badge
 * @csspart date - Date text
 * @csspart title - Card title
 * @csspart description - Markdown content area
 * @csspart footer - Footer section
 * @csspart link - "View all" link in footer
 * @csspart loading - Loading skeleton container
 * @csspart error - Error state container
 * @csspart retry - Retry button
 * @csspart empty - Empty state container
 *
 * @cssproperty --lfx-changelog-font-family - Font family
 * @cssproperty --lfx-changelog-font-size-base - Base font size
 * @cssproperty --lfx-changelog-text-primary - Primary text color
 * @cssproperty --lfx-changelog-text-secondary - Secondary text color
 * @cssproperty --lfx-changelog-text-muted - Muted text color
 * @cssproperty --lfx-changelog-text-link - Link color
 * @cssproperty --lfx-changelog-bg-surface - Background color
 * @cssproperty --lfx-changelog-bg-surface-alt - Alternate background color
 * @cssproperty --lfx-changelog-border-color - Border color
 * @cssproperty --lfx-changelog-accent - Accent color (version badge, buttons)
 * @cssproperty --lfx-changelog-accent-bg - Accent background color
 * @cssproperty --lfx-changelog-border-radius - Card border radius
 * @cssproperty --lfx-changelog-card-padding - Card padding
 * @cssproperty --lfx-changelog-card-gap - Gap between cards
 *
 * @attr {string} product - Product slug to filter changelogs (required)
 * @attr {string} theme - Color theme: "light" (default) or "dark"
 * @attr {number} limit - Max entries to display (1–25, default 10)
 * @attr {string} base-url - Override the API base URL (defaults to https://changelog.lfx.dev)
 *
 * @fires changelog-load-error - Fired when the API request fails
 */
export class LFXChangelog extends HTMLElement {
  private _rendered = false;
  private _abortController: AbortController | null = null;
  private _containerElement!: HTMLDivElement;

  static get observedAttributes(): string[] {
    return ['product', 'theme', 'limit', 'base-url'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // ── Attribute accessors ────────────────────────

  get product(): string {
    return this.getAttribute('product') || '';
  }

  get theme(): 'light' | 'dark' {
    return (this.getAttribute('theme') as 'light' | 'dark') || 'light';
  }

  get limit(): number {
    const val = parseInt(this.getAttribute('limit') || '', 10);
    if (isNaN(val) || val < 1) return DEFAULT_LIMIT;
    return Math.min(val, MAX_LIMIT);
  }

  get baseUrl(): string {
    return this.getAttribute('base-url') || DEFAULT_BASE_URL;
  }

  // ── Lifecycle ──────────────────────────────────

  connectedCallback(): void {
    if (!this._rendered) {
      // Apply styles using StylesheetManager (with caching)
      StylesheetManager.applyStyles(this.shadowRoot!, style, 'lfx-changelog');

      // Create container
      this._containerElement = document.createElement('div');
      this._containerElement.setAttribute('part', 'container');
      this._containerElement.classList.add('lfx-changelog-container');
      this.shadowRoot!.appendChild(this._containerElement);

      this._rendered = true;
    }

    if (!this.product) {
      this._showError('Missing required "product" attribute');
      return;
    }
    this._loadChangelogs();
  }

  disconnectedCallback(): void {
    this._abortController?.abort();
    this._abortController = null;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue) return;

    if (name === 'product' || name === 'limit' || name === 'base-url') {
      if (!this.isConnected || !this._rendered) return;
      if (!this.product) {
        this._abortController?.abort();
        this._showError('Missing required "product" attribute');
      } else {
        this._loadChangelogs();
      }
    }
    // Theme changes are handled via CSS :host([theme="dark"]) — no re-render needed
  }

  // ── Data loading ───────────────────────────────

  private async _loadChangelogs(): Promise<void> {
    this._abortController?.abort();
    this._abortController = new AbortController();

    this._showLoading();

    try {
      const response = await fetchChangelogs(this.product, this.limit, this.baseUrl, this._abortController.signal);

      if (response.data.length === 0) {
        this._showEmpty();
      } else {
        this._showEntries(response.data);
      }
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      const message = error instanceof Error ? error.message : 'Failed to load changelogs';

      this.dispatchEvent(
        new CustomEvent('changelog-load-error', {
          bubbles: true,
          detail: { message, error },
        })
      );

      this._showError(message);
    }
  }

  // ── Render states ──────────────────────────────

  private _clearContainer(): void {
    while (this._containerElement.firstChild) {
      this._containerElement.removeChild(this._containerElement.firstChild);
    }
  }

  private _showLoading(): void {
    this._clearContainer();
    this._containerElement.appendChild(renderHeader("What's New"));
    this._containerElement.appendChild(renderLoading());
  }

  private _showEntries(entries: ChangelogEntry[]): void {
    const productName = entries[0]?.product?.name;
    const heading = productName ? `What's New in ${productName}` : "What's New";

    this._clearContainer();
    this._containerElement.appendChild(renderHeader(heading));

    const listWrapper = document.createElement('div');
    listWrapper.setAttribute('part', 'list');
    listWrapper.classList.add('lfx-changelog-list');
    listWrapper.appendChild(renderList(entries, this.baseUrl));
    this._containerElement.appendChild(listWrapper);

    this._containerElement.appendChild(renderFooter(this.baseUrl));
  }

  private _showError(message: string): void {
    this._clearContainer();
    this._containerElement.appendChild(renderHeader("What's New"));

    const errorEl = renderError(message);
    this._containerElement.appendChild(errorEl);

    const retryBtn = errorEl.querySelector('.lfx-changelog-retry-btn');
    retryBtn?.addEventListener('click', () => this._loadChangelogs());
  }

  private _showEmpty(): void {
    this._clearContainer();
    this._containerElement.appendChild(renderHeader("What's New"));
    this._containerElement.appendChild(renderEmpty());
  }
}

// Register component
if (typeof window !== 'undefined' && !customElements.get('lfx-changelog')) {
  customElements.define('lfx-changelog', LFXChangelog);
}

// TypeScript declarations for framework integration
declare global {
  interface HTMLElementTagNameMap {
    'lfx-changelog': LFXChangelog;
  }
}
