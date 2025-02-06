

export async function createNewPassowrd(password:string){
    const response = await fetch(`http://localhost:3000/api/v1/auth/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            password
        })
    })
    if(response.ok){
        return response.json()
    }
}