import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import { persistor, store } from './store';

const history = createBrowserHistory();
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

