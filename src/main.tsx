import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Word } from './pages/Word.tsx';
import { Book } from './pages/Book.tsx';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Word />
  },
  {
    path:'/books',
    element: <Book />
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
