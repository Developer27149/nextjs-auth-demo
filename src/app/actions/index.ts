'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export const getUserInfoAction = async (): Promise<{
    name?: string
}> => {
    return { name: undefined }
}

export const loginAction = () => { }

export const registerAction = async (prevState: {
    message: string;
}, formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await res.json()
    if (res.ok) {
        const cookie = cookies()
        cookie.set('token', json.token)
        redirect('/')
    } {
        return { message: json.message, success: false }
    }
}