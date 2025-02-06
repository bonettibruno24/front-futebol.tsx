import { createBrowserRouter, RouterProvider, useParams } from 'react-router'
import { LoginUser } from './routtes/login-user'
import { DashboardTornails } from './routtes/dashboard'
import { AppLayout } from './app-layout'
import { PrivateRoute } from './protected-routes'
import { ModalRecoveryPassword } from './routtes/login-user/modal-recovery-password'

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
      },
      {
        path: '/forgot-password',
        element: (
          <ModalRecoveryPassword
            setShowResetModal={() => {}}
            error={''}
            isResetMode={false}
          />
        )
      },
      {
        path: '/reset-password/:token',
        element: <PasswordRecoveryWithToken />
      }
    ]
  }
]);

function PasswordRecoveryWithToken() {
  const { token } = useParams(); // Captura o token da URL
  console.log("peguei o token",token)
  const isResetMode = Boolean(token); // Verifica se existe o token

  return (
    <>
    <LoginUser />
    <ModalRecoveryPassword
      setShowResetModal={() => {}}
      error={' '}
      isResetMode={isResetMode}
    />   
    </>
  );
}


export function App() {
  return <RouterProvider router={router} />
}
