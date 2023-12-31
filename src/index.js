import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './dataLayer/StateProvider';
import reducer, { initialState } from './dataLayer/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <StateProvider initialState={initialState} reducer={reducer}>
      <App />
  </StateProvider>
  </BrowserRouter>
);

reportWebVitals();