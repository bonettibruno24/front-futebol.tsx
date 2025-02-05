


export async function createAuthLogin(data: {
  email: string
  password: string
}) {
  console.log('createAuthLogin', data)
  const response = await fetch('http://localhost:3333/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  })
  if (!response.ok) {
    const errorData = await response.json()
    console.log("errorData ", errorData)
    throw new Error(errorData.error || 'Erro ao fazer login')
  }
  console.log("testesteste ",response.json)
  return response.json()
}
