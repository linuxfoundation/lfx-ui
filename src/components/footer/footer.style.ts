export const style = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

:host {
  display: block;
  background: var(--lfx-footer-bg, transparent);
  padding: 3rem 2rem 0 2rem;
  color: var(--lfx-footer-text, #5b6367);
  font-family: 'Open Sans', sans-serif;
}

:host * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 0.75rem;
  color: #808b91;
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

.footer-links {
  display: flex;
  gap: 1rem;
  color: #808b91
  font-size: 0.75rem;
}

.footer-links a {
  color: #5b6367;
  text-decoration: none;
  font-size: 0.75rem;
}

.footer-links a:hover {
  text-decoration: underline;
  color: #5b6367;
}

.copyright-container {
  display: flex;
  flex-direction: column;
}

.copyright {
  font-size: 0.75rem;
}

.copyright a {
  color: #5b6367;
}

.copyright a:hover {
  text-decoration: underline;
  color: #5b6367;
}
`;
