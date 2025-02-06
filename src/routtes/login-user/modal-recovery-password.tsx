import { ArrowRight, X } from 'lucide-react'
import { Input } from '../../components/input'
import { any, string, z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createInvitePasswordRecovery } from '../../http/create-reacovery-password'
import { toast } from 'sonner'
import { handleResetPassword } from '../../http/lib/axios'
import { redirect, useNavigate, useParams } from 'react-router-dom'

interface ModalRecoveryPasswordProps {
  setShowResetModal: (show: boolean) => void
  error: string
  isResetMode: boolean
}

const createRecoveryPassword = z.object({
  email: z.string().email()
})

const createNewPassword = z.object({
  newPassword: z.string().min(6)
})

type FormData = z.infer<typeof createRecoveryPassword> &
  z.infer<typeof createNewPassword>

export function ModalRecoveryPassword({
  setShowResetModal,
  error,
  isResetMode
}: ModalRecoveryPasswordProps) {
  const queryCLient = useQueryClient()
  const { token } = useParams()
  const navigate = useNavigate()
  const schema = isResetMode ? createNewPassword : createRecoveryPassword
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  async function handleRecoveryPassword(data: FormData) {
    console.log(data)
    console.log(handleRecoveryPassword)
    try {
      if (!isResetMode) {
        console.log(data.email)
        await createInvitePasswordRecovery(data.email)
        toast.success(
          'E-mail de recuperação enviado com sucesso, confira sua caixa de entrada!'
        )
        reset()
        setShowResetModal(false)
      } else {
        if (!token) {
          console.error('Token não encontrado na URL.')
          return
        }
        console.log('passowrd aqui: ', data.newPassword)
        await handleResetPassword(
          {
            password: data.newPassword
          },
          token
        )
        toast.success('Senha alterada com sucesso! Redirecionando ao login...')
        navigate('/')
        console.log(data.newPassword)
      }
    } catch (error) {
      toast.error(error.message || 'Erro ao enviar e-mail de recuperação')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        <form
          onSubmit={handleSubmit(handleRecoveryPassword)}
          className="p-6 space-y-5"
        >
          {isResetMode ? (
            <>
              <h3 className="text-xl font-semibold text-gray-900">
                Redefinir Senha
              </h3>
              <p className="text-sm">
                Cadastre uma nova senha para acessar sua conta.
              </p>

              <Input
                id="newPassword"
                size="medium"
                type="password"
                variant="supergreen"
                placeholder="Nova senha"
                {...register('newPassword')}
              />
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Redefinir Senha
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowResetModal(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-semibold text-gray-900">
                Recuperar sua Senha
              </h3>
              <p className="text-sm">
                Insira o <strong>e-mail</strong> cadastrado, enviaremos um link
                no seu email para redefinir sua senha!
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Input
                id="email"
                size="medium"
                type="email"
                autoFocus
                variant="supergreen"
                placeholder="Insira o email cadastrado!"
                {...register('email')}
              />
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
