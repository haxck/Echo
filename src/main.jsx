import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
  HashRouter,createHashRouter
} from "react-router-dom";

import Root from './routers/root'
import Letter from './routers/letter'
import './index.css'
import ErrorPage from './routers/errorPage';

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "s/:letterId",
    element: <Letter />,
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} ></RouterProvider>
  </React.StrictMode>,
)
