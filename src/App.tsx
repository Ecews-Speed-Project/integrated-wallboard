import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import './App.css';
import './index.css';
import ProjectRoutes from './Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectRoutes />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
