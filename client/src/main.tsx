import '@config/i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from '@routes/index.routes';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@global/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <AppRoutes></AppRoutes>
  </ThemeProvider>
);
