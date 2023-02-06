import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './stylesheets/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddCustomCharacter from './components/AddCustomCharacter';
import CustomizeCharacter from './components/CustomizeCharacter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/custom',
    element: <AddCustomCharacter />,
  },
  {
    path: '/characters/:id',
    element: <CustomizeCharacter />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
