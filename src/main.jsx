import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

import Root from './routers/root'
import Letter from './routers/letter'
import './index.css'
import ErrorPage from './routers/errorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "letters/:letterId",
    element: <Letter />,
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} ></RouterProvider>
  </React.StrictMode>,
)
