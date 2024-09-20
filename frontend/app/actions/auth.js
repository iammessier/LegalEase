'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')
  const remember = formData.get('remember-me')

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    console.log('Response status:', response.status)
    const data = await response.json()
    console.log('Response data:', data)
    

    if (!response.ok) {
      return { error: data.error }
    }

    // If 'remember me' is checked, set a longer expiration for the cookie
    if (remember === 'on') {
      cookies().set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60, // 30 days 
        path: '/',
      })
    }

    redirect('/user-dashboard')
  } catch (error) {
    return { error: 'An unexpected error occurred' }
  }
}