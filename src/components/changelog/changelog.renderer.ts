// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import DOMPurify from 'dompurify';
import { Marked } from 'marked';

import type { ChangelogEntry } from './changelog.types';

const _marked = new Marked({
  async: false,
  gfm: true,
  breaks: true,
});

function _formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function _sanitizeMarkdown(md: string): string {
  const rawHtml = _marked.parse(md) as string;

  // Enforce rel="noopener noreferrer" on any link with target="_blank"
  // to prevent reverse-tabnabbing attacks from markdown content
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });

  const sanitized = DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ['target', 'rel'],
  });

  DOMPurify.removeHook('afterSanitizeAttributes');
  return sanitized;
}

/**
 * Safely sets DOMPurify-sanitized HTML content on an element.
 * Uses a template element to parse the sanitized HTML into DOM nodes,
 * then appends the cloned nodes — avoiding direct innerHTML assignment
 * on the target element.
 */
function _setSanitizedContent(element: HTMLElement, sanitizedHtml: string): void {
  const template = document.createElement('template');
  // Content is sanitized by DOMPurify in _sanitizeMarkdown() above
  template.innerHTML = sanitizedHtml; // nosec: DOMPurify-sanitized
  element.appendChild(template.content.cloneNode(true));
}

/**
 * Create an element with attributes and children
 */
function _el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs?: Record<string, string>, children?: (Node | string)[]): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      element.setAttribute(key, value);
    }
  }
  if (children) {
    for (const child of children) {
      element.append(typeof child === 'string' ? document.createTextNode(child) : child);
    }
  }
  return element;
}

/**
 * Render a single changelog card
 */
export function renderCard(entry: ChangelogEntry, baseUrl: string): HTMLElement {
  const entryUrl = `${baseUrl}/entry/${encodeURIComponent(entry.slug || entry.id)}`;
  const rawDate = entry.publishedAt ?? entry.createdAt;
  const dateStr = String(rawDate);
  const date = _formatDate(dateStr);

  const metaChildren: (Node | string)[] = [];
  if (entry.version) {
    metaChildren.push(_el('span', { part: 'version', class: 'lfx-changelog-version' }, [`v${entry.version}`]));
  }
  metaChildren.push(_el('time', { part: 'date', class: 'lfx-changelog-date', datetime: dateStr }, [date]));

  const link = _el(
    'a',
    {
      class: 'lfx-changelog-card-link',
      href: entryUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    [_el('div', { part: 'meta', class: 'lfx-changelog-meta' }, metaChildren), _el('h3', { part: 'title', class: 'lfx-changelog-title' }, [entry.title])]
  );

  const description = _el('div', { part: 'description', class: 'lfx-changelog-description' });
  _setSanitizedContent(description, _sanitizeMarkdown(entry.description));

  return _el('article', { part: 'card', class: 'lfx-changelog-card' }, [link, description]);
}

/**
 * Render a list of changelog cards into a DocumentFragment
 */
export function renderList(entries: ChangelogEntry[], baseUrl: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  for (const entry of entries) {
    fragment.appendChild(renderCard(entry, baseUrl));
  }
  return fragment;
}

/**
 * Render the loading skeleton
 */
export function renderLoading(): HTMLElement {
  const container = _el('div', { part: 'loading', class: 'lfx-changelog-loading' });
  for (let i = 0; i < 3; i++) {
    const skeleton = _el('div', { class: 'lfx-changelog-skeleton' });
    for (let j = 0; j < 4; j++) {
      skeleton.appendChild(_el('div', { class: 'lfx-changelog-skeleton-line' }));
    }
    container.appendChild(skeleton);
  }
  return container;
}

/**
 * Render the error state with retry button
 */
export function renderError(message: string): HTMLElement {
  const retryBtn = _el('button', { type: 'button', part: 'retry', class: 'lfx-changelog-retry-btn' }, ['Retry']);

  return _el('div', { part: 'error', class: 'lfx-changelog-error' }, [
    _el('div', { class: 'lfx-changelog-error-icon' }, ['\u26A0']),
    _el('div', { class: 'lfx-changelog-error-message' }, [message]),
    retryBtn,
  ]);
}

/**
 * Render the empty state
 */
export function renderEmpty(): HTMLElement {
  return _el('div', { part: 'empty', class: 'lfx-changelog-empty' }, ['No changelog entries found.']);
}

/**
 * Render the footer with "View all" link
 */
export function renderFooter(baseUrl: string): HTMLElement {
  return _el('div', { part: 'footer', class: 'lfx-changelog-footer' }, [
    _el(
      'a',
      {
        part: 'link',
        class: 'lfx-changelog-footer-link',
        href: baseUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      ['View all changelogs \u2192']
    ),
  ]);
}

/**
 * Render the header section
 */
export function renderHeader(text: string): HTMLElement {
  return _el('div', { part: 'header', class: 'lfx-changelog-header' }, [_el('h2', { part: 'heading', class: 'lfx-changelog-heading' }, [text])]);
}
