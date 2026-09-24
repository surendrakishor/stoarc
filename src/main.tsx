import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { formatDocumentTitle } from '@/app/config/app.config';
import './styles/index.css';

// The document title comes from the application constant, not from index.html,
// so renaming the product stays a one-line change.
document.title = formatDocumentTitle();

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element #root is missing from index.html.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
