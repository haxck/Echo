import React from 'react'
import ReactDOM from 'react-dom/client'
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routers/root'
import Letter from './routers/letter'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "letter/:letterId",
    loader: async ({ params }) => {
      const data = await fetch(`http://192.168.103.36:3000/echo/${params.letterId}`)
        .then(res => res.json())

      return data
    },
    element: <Letter />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme appearance="light" accentColor="red" radius="full" scaling="110%">
      <RouterProvider router={router} ></RouterProvider>
    </Theme>
  </React.StrictMode>,
)
