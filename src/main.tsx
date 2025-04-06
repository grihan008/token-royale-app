import WebApp from '@twa-dev/sdk';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App';

import './index.css';

WebApp.ready();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
