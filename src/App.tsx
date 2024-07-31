import React, { Suspense } from 'react';
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom"
import './App.css';
import { AuthProvider } from './auth/authContext ';
import ProjectRoutes from './Routes';

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectRoutes />
      </Suspense>
    </AuthProvider>

  );
}

export default App;
