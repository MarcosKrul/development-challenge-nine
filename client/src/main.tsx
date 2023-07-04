import '@config/i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from '@routes/index.routes';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@global/theme';
import { I18nextProvider } from 'react-i18next';
import i18n from '@config/i18n';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@services/queryClient';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <I18nextProvider i18n={i18n}>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes></AppRoutes>
      </QueryClientProvider>
    </ThemeProvider>
  </I18nextProvider>
);
