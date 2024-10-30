import React, { Suspense } from 'react';
import './App.css';
import './index.css';
import ProjectRoutes from './Routes';

function App() {
  return (

    <Suspense fallback={<div>Loading...</div>}>
      <ProjectRoutes />
    </Suspense>

  );
}

export default App;
