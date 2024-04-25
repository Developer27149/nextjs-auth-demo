'use server'

import { redirect } from "next/navigation"

export const getUserInfoAction = async (): Promise<{
    name?: string
}> => {
    return { name: undefined }
}

export const loginAction = () => { }

export const registerAction = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log('res:', res)
    const data = await res.json()
    if (data.ok) {
        redirect('/')
    }
}