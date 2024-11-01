import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import { persistor, store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <HashRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <App />
        </PersistGate>
      </Provider>

    </React.StrictMode>
  </HashRouter>

);
reportWebVitals();

