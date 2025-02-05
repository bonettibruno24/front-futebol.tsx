import { Percent as Soccer, X } from 'lucide-react'
import { useState } from 'react'
import { LoginAcess } from './login-acess'
import { ModalRecoveryPassword } from './modal-recovery-password'
import { toast } from 'sonner'

export function LoginUser() {
  const [isLogin, setIsLogin] = useState(true)
  const [isResetMode, setIsresetMode] = useState(true)
  const [showResetModal, setShowResetModal] = useState(false)
  const [error, setError] = useState('')

  const [email, setEmail] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const handleSubmit = (email: string) => {
    const trimmedEmail = email.trim()
    console.log('E-mail inserido:', email)
    console.log('E-mail após trim:', trimmedEmail)

    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      setError('Por favor, insira um e-mail válido.')
      return
    }
    console.log('E-mail válido:', trimmedEmail)
    toast.success(
      `Email enviado com sucesso! Verifique a caixa de entrada em:  ${trimmedEmail}`
    )
    setShowResetModal(false)
  }

  const handleLogin = () => {
    setIsLogin((prev) => !prev)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900">
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Soccer className="w-8 h-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">
                FutbolElite
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-green-300 transition">
                Sobre
              </button>
              <button className="text-white hover:text-green-300 transition">
                Contato
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Navbar */}
      <div className="container mx-auto px-4 h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-md border border-white/20">
          <LoginAcess
            isLogin={isLogin}
            error={error}
            setError={setError}
            handleLogin={handleLogin}
            setShowResetModal={setShowResetModal}
          />
        </div>
        {showResetModal && (
          <ModalRecoveryPassword
            setShowResetModal={setShowResetModal}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            error={error}
            email={email}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
            isResetMode={isResetMode}
          />
        )}
      </div>
    </div>
  )
}
