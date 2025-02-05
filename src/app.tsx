import { createBrowserRouter, RouterProvider } from 'react-router'
import { LoginUser } from './routtes/login-user'
import { DashboardTornails } from './routtes/dashboard'
import { AuthProvider } from './contexts/auth-context'
import { AppLayout } from './app-layout'
import { PrivateRoute } from './protected-routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <LoginUser /> },
      {
        path: '/dashboard',
        element: <PrivateRoute />,
        children: [{ path: '/dashboard', element: <DashboardTornails /> }]
      }
    ]
  }
])

export function App() {
  return <RouterProvider router={router} />
}
