import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { router } from './app/router.jsx';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/pages.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
