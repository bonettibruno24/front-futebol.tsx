export async function createRecoveryPassword(email: string) {
  const response = await fetch('http://localhost:3333/recovery-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  })
  if(!response.ok){
    const errorData = await response.json()
    throw new Error(errorData.error || 'Erro ao ao enviar email de recuperação de senha')
  }
  return response.json()
}
