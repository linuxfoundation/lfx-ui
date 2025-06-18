// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

export const style = `
:host {
  display: inline-block;
  position: relative;
  font-family: var(--lfx-tools-font-family, 'Open Sans', sans-serif);
}

.tools-container {
  position: relative;
}

/* Grid Icon Button */
.tools-button {
  width: var(--lfx-tools-button-size, 32px);
  height: var(--lfx-tools-button-size, 32px);
  border: none;
  background: var(--lfx-tools-button-bg, transparent);
  border-radius: var(--lfx-tools-button-radius, 4px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;
  padding: 0;
  position: relative;
}

.tools-button:hover {
  background: var(--lfx-tools-button-hover-bg, #ECF4FF);
  border-radius: 8px;
}

.tools-button:active {
  background: var(--lfx-tools-button-active-bg, #DBEAFE);
  border-radius: 8px;
}

/* Grid Icon - 3x3 dots */
.grid-icon {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1.5px;
  width: 14px;
  height: 14px;
}

.grid-icon .dot {
  width: 3px;
  height: 3px;
  background-color: var(--lfx-tools-icon-color, #666666);
  border-radius: 50%;
  transition: background-color 0.15s ease;
}

.tools-button:hover .grid-icon .dot {
  background-color: var(--lfx-tools-icon-hover-color, #333);
}

/* Dropdown Menu */
.tools-menu {
  position: absolute;
  top: 0;
  left: 100%;
  z-index: var(--lfx-tools-menu-z-index, 1000);
  background: var(--lfx-tools-menu-bg, #ffffff);
  border: 1px solid var(--lfx-tools-menu-border, #e1e5e9);
  border-radius: var(--lfx-tools-menu-radius, 8px);
  box-shadow: var(--lfx-tools-menu-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
  width: var(--lfx-tools-menu-width, 240px);
  margin-left: 24px;
  overflow: hidden;
  transform-origin: top left;
  animation: menuSlideIn 0.15s ease-out;
}

@keyframes menuSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.menu-content {
  padding: 8px 0;
  max-height: 80vh;
  overflow-y: auto;
}

/* Menu Sections */
.menu-section {
  margin-bottom: 4px;
}

.menu-section:last-child {
  margin-bottom: 0;
}

.section-header {
  font-size: 14px;
  font-weight: 600;
  color: var(--lfx-tools-section-header-color, #111827);
  text-transform: none;
  letter-spacing: 0;
  padding: 4px 14px 8px 14px;
  margin-bottom: 0;
}

/* Menu Items */
.menu-item {
  margin: 0;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  text-decoration: none;
  color: var(--lfx-tools-menu-text, #111827);
  font-size: 14px;
  line-height: 20px;
  transition: all 0.1s ease;
  position: relative;
  font-weight: 400;
  border-radius: 8px;
  margin: 0 8px;
}

.menu-link:hover {
  background-color: var(--lfx-tools-menu-hover-bg, #ECF4FF);
  color: var(--lfx-tools-menu-hover-text, #111827);
  font-weight: 600;
}

.menu-link:focus {
  background-color: var(--lfx-tools-menu-focus-bg, #ECF4FF);
  outline: none;
  color: var(--lfx-tools-menu-focus-text, #111827);
  font-weight: 600;
}

.menu-link.active {
  background-color: var(--lfx-tools-menu-active-bg, #ECF4FF);
  color: var(--lfx-tools-menu-active-text, #111827);
  font-weight: 600;
}

.menu-icon, .menu-link i {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.menu-icon-container {
  position: relative;
  width: 20px;
  height: 16px;
}

/* Remove icon-container and dual icon hover logic. Restore to single icon approach. */
.menu-link i {
  color: var(--lfx-tools-menu-icon-color, #9CA3AF);
  transition: all 0.15s ease;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  font-size: 14px;
  position: absolute;
  left: 0;
}

.menu-link:hover i,
.menu-link:focus i {
  color: var(--lfx-tools-menu-icon-hover-color, #0061A3);
}

.menu-link.active i {
  color: var(--lfx-tools-menu-icon-active-color, #0061A3);
}

.menu-link i.fa-duotone {
  opacity: 0;
}

.menu-link:hover i.fa-duotone,
.menu-link:focus i.fa-duotone {
  opacity: 1;
}

.menu-link.active i.fa-duotone {
  opacity: 1;
}

.menu-link:hover i.fa-solid,
.menu-link:focus i.fa-solid {
  opacity: 0;
}

.menu-link.active i.fa-solid {
  opacity: 0;
}

.menu-label {
  flex: 1;
  font-weight: 400;
}

.menu-link:hover .menu-label,
.menu-link:focus .menu-label {
  font-weight: 600;
}

.menu-link.active .menu-label {
  font-weight: 600;
}

.external-icon {
  margin-left: 8px;
  font-size: 12px;
  color: var(--lfx-tools-external-icon-color, #9ca3af);
  opacity: 0.7;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tools-menu {
    width: var(--lfx-tools-menu-width-mobile, 320px);
    left: auto;
    right: 100%;
    margin-left: 0;
    margin-right: 8px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .tools-button {
    border: 1px solid var(--lfx-tools-button-border-high-contrast, #000);
  }

  .grid-icon .dot {
    background-color: var(--lfx-tools-icon-color-high-contrast, #000);
  }

  .tools-menu {
    border: 2px solid var(--lfx-tools-menu-border-high-contrast, #000);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .tools-menu {
    animation: none;
  }

  .tools-button,
  .menu-link,
  .grid-icon .dot {
    transition: none;
  }
}

/* Focus management for keyboard navigation */
.menu-link:focus-visible {
  background-color: var(--lfx-tools-menu-focus-bg, #ECF4FF);
  outline: 2px solid var(--lfx-tools-focus-color, #0066cc);
  outline-offset: -2px;
  font-weight: 600;
}

/* Dark theme support - only affects button, menu stays as specified */
@media (prefers-color-scheme: dark) {
  :host {
    --lfx-tools-button-hover-bg: #ECF4FF;
    --lfx-tools-button-active-bg: #DBEAFE;
    --lfx-tools-icon-color: #d1d5db;
    --lfx-tools-icon-hover-color: #333333;
    /* Menu colors stay as specified in light theme */
  }
}
`;
