import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import React from 'react';

import Home from './pages/Home';
import Login from './pages/LoginForm.jsx';
import Signup from './pages/SignUp.jsx';
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />
      }, {
        path: '/home',
        element: <Home />
      }, {
        path: '/signup',
        element: <Signup />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)



