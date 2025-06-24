// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

export const style = `
:host {
  display: block;
  background: var(--lfx-footer-bg, transparent);
  padding: var(--lfx-footer-padding, 3rem 2rem 0 2rem);
  color: var(--lfx-footer-text, #808b91);
  font-family: var(--lfx-footer-font-family, 'Open Sans', sans-serif);
  font-size: var(--lfx-footer-font-size, 0.75rem);
  line-height: var(--lfx-footer-line-height, 1.5);
}

:host * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.footer-container {
  margin: 0 auto;
  max-width: var(--lfx-footer-max-width, none);
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-content {
  text-align: var(--lfx-footer-text-align, center);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: var(--lfx-footer-gap, 1rem);
}

.copyright-container {
  display: flex;
  flex-direction: column;
}

.copyright {
  font-size: inherit;
  color: inherit;
  margin: var(--lfx-footer-copyright-margin, 0);
}

.copyright a {
  color: var(--lfx-footer-link-color, #5b6367);
  text-decoration: var(--lfx-footer-link-decoration, none);
  transition: var(--lfx-footer-link-transition, color 0.2s ease);
}

.copyright a:hover {
  color: var(--lfx-footer-link-hover-color, #5b6367);
  text-decoration: var(--lfx-footer-link-hover-decoration, underline);
}

.copyright a:focus {
  outline: var(--lfx-footer-link-focus-outline, 2px solid currentColor);
  outline-offset: var(--lfx-footer-link-focus-offset, 2px);
}

.cookie-preferences {
  margin-top: 0.5rem;
}

.cookie-preferences a {
  color: var(--lfx-footer-link-color, #5b6367);
  text-decoration: var(--lfx-footer-link-decoration, none);
  transition: var(--lfx-footer-link-transition, color 0.2s ease);
}

.cookie-preferences a:hover {
  color: var(--lfx-footer-link-hover-color, #5b6367);
  text-decoration: var(--lfx-footer-link-hover-decoration, underline);
}

.cookie-preferences a:focus {
  outline: var(--lfx-footer-link-focus-outline, 2px solid currentColor);
  outline-offset: var(--lfx-footer-link-focus-offset, 2px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  :host {
    padding: var(--lfx-footer-padding-mobile, 2rem 2rem 0 2rem);
    font-size: var(--lfx-footer-font-size-mobile, 0.7rem);
  }

  .footer-content {
    text-align: var(--lfx-footer-text-align-mobile, center);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :host {
    background: var(--lfx-footer-bg-high-contrast, Canvas);
    color: var(--lfx-footer-text-high-contrast, CanvasText);
  }

  .copyright a {
    color: var(--lfx-footer-link-color-high-contrast, LinkText);
  }

  .copyright a:hover {
    color: var(--lfx-footer-link-hover-color-high-contrast, LinkText);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .copyright a {
    transition: none;
  }
}
`;
