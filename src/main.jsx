import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RootLayout from '@/components/layout/RootLayout'
import Home      from '@/pages/Home'
import Work      from '@/pages/Work'
import About     from '@/pages/About'
import Contact   from '@/pages/Contact'
import NotFound  from '@/pages/NotFound'

import '@/styles/globals.css'
import '@/styles/utils.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,     element: <Home /> },
      { path: 'work',    element: <Work /> },
      { path: 'about',   element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*',       element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
