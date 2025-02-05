export interface CreateUserRequest {
  username: string
  email: string
  passwordHash: string
  isAdmin: boolean | undefined
  specialCode: string | undefined
}

export async function createUser({
  username,
  email,
  passwordHash,
  isAdmin,
  specialCode
}: CreateUserRequest): Promise<void> {
  const response = await fetch('http://localhost:3333/create-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      passwordHash,
      isAdmin,
      specialCode
    })
  })

  if(!response.ok) {
    throw new Error('Error while creating user')
  }
}
