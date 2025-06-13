import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // 导入 i18n 配置
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback="Loading...">
        <App />
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);
