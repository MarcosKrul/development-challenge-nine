import '@config/i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from '@routes/index.routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppRoutes></AppRoutes>
);
