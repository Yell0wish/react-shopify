import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import {ServiceContextProvider} from './Contexts/ServiceContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ServiceContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ServiceContextProvider>
  </React.StrictMode>
);

