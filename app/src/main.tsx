import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { ToastContainer } from 'react-toastify';

import '@picocss/pico/css/pico.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main className="container mt-3">
      <RouterProvider router={router} />
      <ToastContainer />
    </main>
  </React.StrictMode>,
);
