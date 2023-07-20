import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ChatControllerContextProvider } from './contexts/ChatControllerContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <ChatControllerContextProvider>
      <App />
    </ChatControllerContextProvider>
  </React.StrictMode>
);
