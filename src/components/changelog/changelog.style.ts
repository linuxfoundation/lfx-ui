// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

export const style = `
:host {
  display: block;

  /* Typography */
  --lfx-changelog-font-family: var(--lfx-font-family, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  --lfx-changelog-font-size-base: var(--lfx-font-size-base, 14px);
  --lfx-changelog-font-size-sm: 12px;
  --lfx-changelog-font-size-lg: 16px;
  --lfx-changelog-font-size-xl: 20px;
  --lfx-changelog-line-height: 1.6;

  /* Colors — light defaults */
  --lfx-changelog-text-primary: #1a1a2e;
  --lfx-changelog-text-secondary: #64748b;
  --lfx-changelog-text-muted: #94a3b8;
  --lfx-changelog-text-link: #3b82f6;
  --lfx-changelog-text-link-hover: #2563eb;
  --lfx-changelog-bg-surface: #ffffff;
  --lfx-changelog-bg-surface-alt: #f8fafc;
  --lfx-changelog-border-color: #e2e8f0;
  --lfx-changelog-border-color-strong: #cbd5e1;
  --lfx-changelog-accent: #3b82f6;
  --lfx-changelog-accent-bg: #eff6ff;
  --lfx-changelog-code-bg: #f1f5f9;

  /* Layout */
  --lfx-changelog-border-radius: 12px;
  --lfx-changelog-border-radius-sm: 6px;
  --lfx-changelog-card-padding: 20px;
  --lfx-changelog-card-gap: 16px;

  font-family: var(--lfx-changelog-font-family);
  font-size: var(--lfx-changelog-font-size-base);
  line-height: var(--lfx-changelog-line-height);
  color: var(--lfx-changelog-text-primary);
}

/* Dark theme */
:host([theme="dark"]) {
  --lfx-changelog-text-primary: #f1f5f9;
  --lfx-changelog-text-secondary: #94a3b8;
  --lfx-changelog-text-muted: #64748b;
  --lfx-changelog-text-link: #60a5fa;
  --lfx-changelog-text-link-hover: #93bbfd;
  --lfx-changelog-bg-surface: #1e293b;
  --lfx-changelog-bg-surface-alt: #0f172a;
  --lfx-changelog-border-color: #334155;
  --lfx-changelog-border-color-strong: #475569;
  --lfx-changelog-accent: #60a5fa;
  --lfx-changelog-accent-bg: #1e3a5f;
  --lfx-changelog-code-bg: #1e293b;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.lfx-changelog-container {
  background: var(--lfx-changelog-bg-surface);
  border-radius: var(--lfx-changelog-border-radius);
  border: 1px solid var(--lfx-changelog-border-color);
  overflow: hidden;
}

/* ── Header ───────────────────────────────────── */

.lfx-changelog-header {
  padding: var(--lfx-changelog-card-padding);
  border-bottom: 1px solid var(--lfx-changelog-border-color);
  background: var(--lfx-changelog-bg-surface-alt);
}

.lfx-changelog-heading {
  font-size: var(--lfx-changelog-font-size-xl);
  font-weight: 700;
  color: var(--lfx-changelog-text-primary);
  margin: 0;
}

/* ── Card list ────────────────────────────────── */

.lfx-changelog-list {
  display: flex;
  flex-direction: column;
}

.lfx-changelog-card {
  padding: var(--lfx-changelog-card-padding);
  border-bottom: 1px solid var(--lfx-changelog-border-color);
  transition: background-color 0.15s ease;
}

.lfx-changelog-card:last-child {
  border-bottom: none;
}

.lfx-changelog-card:hover {
  background: var(--lfx-changelog-bg-surface-alt);
}

.lfx-changelog-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.lfx-changelog-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.lfx-changelog-version {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: var(--lfx-changelog-font-size-sm);
  font-weight: 600;
  color: var(--lfx-changelog-accent);
  background: var(--lfx-changelog-accent-bg);
  border-radius: 9999px;
}

.lfx-changelog-date {
  font-size: var(--lfx-changelog-font-size-sm);
  color: var(--lfx-changelog-text-muted);
}

.lfx-changelog-title {
  font-size: var(--lfx-changelog-font-size-lg);
  font-weight: 600;
  color: var(--lfx-changelog-text-primary);
  margin-bottom: 8px;
}

.lfx-changelog-description {
  color: var(--lfx-changelog-text-secondary);
  font-size: var(--lfx-changelog-font-size-base);
  line-height: var(--lfx-changelog-line-height);
}

/* ── Markdown content styling ─────────────────── */

.lfx-changelog-description h1,
.lfx-changelog-description h2,
.lfx-changelog-description h3,
.lfx-changelog-description h4 {
  color: var(--lfx-changelog-text-primary);
  font-weight: 600;
  margin: 12px 0 8px;
}

.lfx-changelog-description h1 { font-size: 1.25em; }
.lfx-changelog-description h2 { font-size: 1.15em; }
.lfx-changelog-description h3 { font-size: 1.05em; }

.lfx-changelog-description p {
  margin: 8px 0;
}

.lfx-changelog-description ul,
.lfx-changelog-description ol {
  padding-left: 1.5em;
  margin: 8px 0;
}

.lfx-changelog-description li {
  margin: 4px 0;
}

.lfx-changelog-description code {
  background: var(--lfx-changelog-code-bg);
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 0.9em;
}

.lfx-changelog-description pre {
  background: var(--lfx-changelog-code-bg);
  padding: 12px;
  border-radius: var(--lfx-changelog-border-radius-sm);
  overflow-x: auto;
  margin: 8px 0;
}

.lfx-changelog-description pre code {
  background: none;
  padding: 0;
}

.lfx-changelog-description a {
  color: var(--lfx-changelog-text-link);
  text-decoration: none;
}

.lfx-changelog-description a:hover {
  color: var(--lfx-changelog-text-link-hover);
  text-decoration: underline;
}

.lfx-changelog-description blockquote {
  border-left: 3px solid var(--lfx-changelog-border-color-strong);
  padding-left: 12px;
  margin: 8px 0;
  color: var(--lfx-changelog-text-secondary);
}

.lfx-changelog-description img {
  max-width: 100%;
  height: auto;
  border-radius: var(--lfx-changelog-border-radius-sm);
  margin: 8px 0;
}

.lfx-changelog-description table {
  border-collapse: collapse;
  width: 100%;
  margin: 8px 0;
}

.lfx-changelog-description th,
.lfx-changelog-description td {
  border: 1px solid var(--lfx-changelog-border-color);
  padding: 6px 12px;
  text-align: left;
}

.lfx-changelog-description th {
  background: var(--lfx-changelog-bg-surface-alt);
  font-weight: 600;
}

.lfx-changelog-description hr {
  border: none;
  border-top: 1px solid var(--lfx-changelog-border-color);
  margin: 16px 0;
}

/* ── Footer ───────────────────────────────────── */

.lfx-changelog-footer {
  padding: var(--lfx-changelog-card-padding);
  border-top: 1px solid var(--lfx-changelog-border-color);
  background: var(--lfx-changelog-bg-surface-alt);
  text-align: center;
}

.lfx-changelog-footer-link {
  color: var(--lfx-changelog-text-link);
  text-decoration: none;
  font-size: var(--lfx-changelog-font-size-base);
  font-weight: 500;
  transition: color 0.15s ease;
}

.lfx-changelog-footer-link:hover {
  color: var(--lfx-changelog-text-link-hover);
  text-decoration: underline;
}

/* ── Loading skeleton ─────────────────────────── */

.lfx-changelog-loading {
  padding: var(--lfx-changelog-card-padding);
}

.lfx-changelog-skeleton {
  padding: var(--lfx-changelog-card-padding) 0;
  border-bottom: 1px solid var(--lfx-changelog-border-color);
}

.lfx-changelog-skeleton:last-child {
  border-bottom: none;
}

.lfx-changelog-skeleton-line {
  height: 12px;
  background: var(--lfx-changelog-bg-surface-alt);
  border-radius: 4px;
  margin-bottom: 10px;
  animation: lfx-changelog-shimmer 1.5s infinite;
}

.lfx-changelog-skeleton-line:nth-child(1) { width: 30%; height: 10px; }
.lfx-changelog-skeleton-line:nth-child(2) { width: 70%; height: 16px; }
.lfx-changelog-skeleton-line:nth-child(3) { width: 100%; }
.lfx-changelog-skeleton-line:nth-child(4) { width: 85%; }

@keyframes lfx-changelog-shimmer {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* ── Error state ──────────────────────────────── */

.lfx-changelog-error {
  padding: calc(var(--lfx-changelog-card-padding) * 2);
  text-align: center;
  color: var(--lfx-changelog-text-secondary);
}

.lfx-changelog-error-icon {
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.6;
}

.lfx-changelog-error-message {
  margin-bottom: 16px;
  font-size: var(--lfx-changelog-font-size-base);
}

.lfx-changelog-retry-btn {
  padding: 8px 20px;
  border: 1px solid var(--lfx-changelog-border-color-strong);
  border-radius: var(--lfx-changelog-border-radius-sm);
  background: var(--lfx-changelog-bg-surface);
  color: var(--lfx-changelog-text-primary);
  font-size: var(--lfx-changelog-font-size-base);
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
}

.lfx-changelog-retry-btn:hover {
  background: var(--lfx-changelog-bg-surface-alt);
  border-color: var(--lfx-changelog-accent);
  color: var(--lfx-changelog-accent);
}

/* ── Empty state ──────────────────────────────── */

.lfx-changelog-empty {
  padding: calc(var(--lfx-changelog-card-padding) * 2);
  text-align: center;
  color: var(--lfx-changelog-text-muted);
  font-size: var(--lfx-changelog-font-size-base);
}

/* ── Responsive ───────────────────────────────── */

@media (max-width: 768px) {
  :host {
    --lfx-changelog-card-padding: 16px;
    --lfx-changelog-font-size-xl: 18px;
  }
}

/* ── High contrast mode ───────────────────────── */

@media (prefers-contrast: high) {
  :host {
    --lfx-changelog-bg-surface: Canvas;
    --lfx-changelog-bg-surface-alt: Canvas;
    --lfx-changelog-text-primary: CanvasText;
    --lfx-changelog-text-secondary: CanvasText;
    --lfx-changelog-text-link: LinkText;
    --lfx-changelog-border-color: CanvasText;
  }
}

/* ── Reduced motion ───────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .lfx-changelog-card {
    transition: none;
  }

  .lfx-changelog-skeleton-line {
    animation: none;
    opacity: 0.6;
  }

  .lfx-changelog-retry-btn,
  .lfx-changelog-footer-link {
    transition: none;
  }
}
`;
