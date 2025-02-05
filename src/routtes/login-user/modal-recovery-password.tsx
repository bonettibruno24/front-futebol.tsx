import { ArrowRight, X } from 'lucide-react'
import { Input } from '../../components/input'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface ModalRecoveryPasswordProps {
  setShowResetModal: (show: boolean) => void
  isLogin: boolean
  error: boolean
  email: string
  handleSubmit: (email: string) => void;
  setEmail: (email: string) => void;
  isResetMode: boolean
}

const createRecoveryPassword = z.object({
  email: z.string().email(
})

const createewPassword = z.object({
  newPassword: z.string().min(4),
})

type createRecoveryPassword = z.infer<typeof createRecoveryPassword>

export function ModalRecoveryPassword({
  setShowResetModal,
  error,
  email,
  handleSubmit,
  setEmail,
  isResetMode,
}: ModalRecoveryPasswordProps) {
  const queryCLient = useQueryClient()
  const schema = isResetMode ? createRecoveryPassword : createewPassword
  const { register, handleSubmitt, formState: { errors } } = useForm<createRecoveryPassword>({ resolver: zodResolver(schema)})


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
      <button
        onClick={() => setShowResetModal(false)}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="p-6 space-y-5">
        {isResetMode ? (
          <>
            <h3 className="text-xl font-semibold text-gray-900">
              Redefinir Senha
            </h3>
            <p className="text-sm">
              Insira sua nova senha e confirme abaixo.
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            <Input
              size="medium"
              type="password"
              variant="supergreen"
              placeholder="Nova senha"
            />
            <Input
              size="medium"
              type="password"
              variant="supergreen"
              placeholder="Confirme a nova senha"
            />
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="w-full flex justify-center items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Redefinir Senha
              <ArrowRight className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-900">
              Recuperar sua Senha
            </h3>
            <p className="text-sm">
              Insira o e-mail cadastrado, enviaremos um link no seu email para redefinir sua senha!
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            <Input
              size="medium"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="supergreen"
              placeholder="Insira o email cadastrado!"
            />
            <button
              type="submit"
              onClick={() => handleSubmit(email)}
              className="w-full flex justify-center items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enviar
              <ArrowRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  </div>
  )
}
