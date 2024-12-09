// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { css } from 'lit';

export const style = css`
  @font-face {
    font-family: 'Open Sans', sans-serif;
    src: url(https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  :host {
    display: block;
    background: var(--lfx-footer-bg, transparent);
    padding: 3rem 2rem 0 2rem;
    color: var(--lfx-footer-text, #808b91);
    font-family: 'Open Sans', sans-serif;
  }

  :host * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 0.75rem;
    color: var(--lfx-footer-text, #808b91);
    text-decoration: none;
  }

  .footer-container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer-content {
    text-align: center;
    font-size: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }

  .copyright-container {
    display: flex;
    flex-direction: column;
  }

  .copyright {
    font-size: 0.75rem;
  }

  .copyright a {
    color: var(--lfx-footer-text, #5b6367);
  }

  .copyright a:hover {
    text-decoration: underline;
    color: var(--lfx-footer-text, #5b6367);
  }
`;
