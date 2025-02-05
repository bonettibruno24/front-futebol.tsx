import { useAuth } from "../../contexts/auth-context"

export function DashboardTornails() {
    const { logout } = useAuth()
    return (
        <div>
      <h1>Bem-vindo ao Dashboard!</h1>
      <button onClick={logout} className="bg-red-500 text-white p-2 rounded-md">
        Sair
      </button>
    </div>
    )
}