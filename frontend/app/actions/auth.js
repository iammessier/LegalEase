'use server'

import { cookies } from 'next/headers'

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

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || 'An error occurred during login' }
    }

    // Set the token in cookies based on the "remember me" checkbox
    const tokenOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: remember === 'on' ? 30 * 24 * 60 * 60 : 3600, // 30 days or 1 hour
    }

    cookies().set('token', data.token, tokenOptions)

    // Return success message without redirecting here
    return { success: true, user: data.user }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'An unexpected error occurred' }
  }
}
