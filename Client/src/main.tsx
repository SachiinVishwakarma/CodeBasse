import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoute from './Route.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoute />
  </StrictMode>
);
