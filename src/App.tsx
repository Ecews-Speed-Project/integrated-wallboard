import React, { Suspense } from 'react';
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom"
import './App.css';
import './index.css';
import {  store } from './store';
import ProjectRoutes from './Routes';
import { Provider } from 'react-redux';

function App() {
  return (
  
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectRoutes />
      </Suspense>

  );
}

export default App;
