import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/routes';
import React from 'react';
import { ClassicColors, Box } from '@freenow/wave';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClassicColors />
    <QueryClientProvider client={queryClient}>
      <Box as="header" style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <img
          src="https://eu-images.contentstack.com/v3/assets/blt6e28a7086c72dd55/blt8b7f5df78b29002b/6735de9fe3bf03da522788b6/FREE_NOW_Logo_red.svg"
          alt="FREE NOW Logo"
          width="100" 
          height="20"
          style={{ padding: '0 20px' }}
        />
      </Box>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);