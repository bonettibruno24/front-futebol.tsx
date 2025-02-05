import { Outlet } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'

export function AppLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
