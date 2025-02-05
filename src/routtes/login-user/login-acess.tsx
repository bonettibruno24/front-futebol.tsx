import { Trophy, User, Mail, Key, Lock } from 'lucide-react'
import { Input } from '../../components/input'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createUser } from '../../http/create-user'
import { toast } from 'sonner'
import { createAuthLogin } from '../../http/create-auth-login'
import { useNavigate } from 'react-router-dom'


interface LoginAcessProps {
  isLogin: boolean
  handleLogin: () => void
  error: string
  setError: (error: string) => void
  setShowResetModal: (show: boolean) => void
}

const createUserForm = z.object({
  username: z.string().min(5, 'Insira um nome de usuário diferente'),
  email: z.string().email({ message: 'Informe um email válido' }),
  passwordHash: z.string().min(6),
  specialCode: z.string().optional(),
  isAdmin: z.boolean().optional()
})

const loginSchema = z.object({
  email: z.string().email({ message: 'Informe um e-mail válido' }),
  passwordHash: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
})

type createUserForm = z.infer<typeof createUserForm>

export function LoginAcess({
  handleLogin,
  isLogin,
  error,
  setError,
  setShowResetModal
}: LoginAcessProps) {
  const queryCLient = useQueryClient()
  const schema = isLogin ? loginSchema : createUserForm
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<createUserForm>({ resolver: zodResolver(schema) })

  async function handleAuth(data: any) {
    try {
      if (isLogin) {
        const response = await createAuthLogin({
          email: data.email,
          password: data.passwordHash
        })
         localStorage.setItem('token', response.token)
         const local = navigate('/dashboard')
        console.log('Login bem-sucedido:', local)
        toast.success('Login realizado com sucesso!')
      } else {
        await createUser({
          username: data.username,
          email: data.email,
          passwordHash: data.passwordHash,
          specialCode: data.specialCode,
          isAdmin: isLogin
        })
        queryCLient.invalidateQueries({ queryKey: ['users'] })
        toast.success('Usuário criado com sucesso!')
        handleLogin()
      }
      reset()
    } catch (error: any) {
      setError('Verifique usuário e/ou senha informados')
      toast.error(error.message || 'Erro ao realizar ação, tente novamente!')
    }
  }

  return (
    <div>
      <div className="flex justify-center mb-6">
        <Trophy className="w-12 h-12 text-yellow-400" />
      </div>

      <h2 className="text-2xl font-bold text-center text-white mb-8">
        {isLogin ? 'Bem-vindo de volta!' : 'Criar nova conta'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-sm">
          {error}
        </div>
      )}

      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleAuth)}
      >
        {!isLogin && (
          <div>
            <div className="flex w-full relative items-center">
              <User className="absolute left-3  text-white/60 w-5 h-5" />
              <Input
                id="username"
                variant="green"
                autoFocus
                size="default"
                placeholder="Usuário"
                {...register('username')}
              />
            </div>
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
        )}

        <div className="">
          <div className="flex w-full relative items-center">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              id="email"
              variant="green"
              size="default"
              placeholder="Email"
              type="email"
              autoFocus
              {...register('email')}
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <div className="flex w-full relative items-center">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              id="passwordHash"
              variant="green"
              size="default"
              placeholder="Senha"
              type="password"
              {...register('passwordHash')}
            />
          </div>
          {errors.passwordHash && (
            <span className="text-red-500 text-sm">
              {errors.passwordHash.message}
            </span>
          )}
        </div>

        {!isLogin && (
          <div>
            <div className="flex w-full relative items-center">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <Input
                id="specialCode"
                variant="green"
                size="default"
                autoFocus
                placeholder="Código de Acesso"
                type="text"
                {...register('specialCode')}
              />
            </div>
            {errors.specialCode && (
              <span className="text-red-500 text-sm">
                {errors.specialCode.message}
              </span>
            )}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={handleLogin}
          className="text-white/80 hover:text-white transition"
        >
          {isLogin
            ? 'Não tem uma conta? Cadastre-se'
            : 'Já tem uma conta? Entre'}
        </button>
        <button
          onClick={() => setShowResetModal(true)}
          className="text-white/80 hover:text-white transition block w-full"
        >
          Esqueceu sua senha?
        </button>
      </div>
    </div>
  )
}
