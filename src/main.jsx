import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from "react-router-dom";

import Root from './App'
import Letter, { clientLoader } from './routers/letter'
import './index.css'
import ErrorPage from './routers/errorPage';
import Post from './routers/post';

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "post",
    element: <Post />,
  },
  {
    path: "s/:letterId",
    loader: clientLoader,
    element: <Letter />,
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
