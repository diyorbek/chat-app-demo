import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.tsx';
import { AuthTokenProvider } from './contexts/AuthContext.tsx';
import { ChatControllerContextProvider } from './contexts/ChatControllerContext.tsx';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <AuthTokenProvider>
        <ChatControllerContextProvider>
          <App />
        </ChatControllerContextProvider>
      </AuthTokenProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
