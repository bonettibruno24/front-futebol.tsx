import axios from 'axios'

export async function handleResetPassword(
  data: { password: string },
  token: string | undefined
) {
  try {
    console.log(token)
    const response = await axios.post(
      'http://localhost:3333/reset-password',
      {
        newPassword: data.password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log('Senha alterada com sucesso!', response.data)
  } catch (error) {
    console.error('Erro ao alterar senha:', error)
  }

  console.log('teste da função: ', handleResetPassword)
}
