// pages/api/signup.js

import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { email } = await request.json()

    // Validate email (basic validation for demonstration)
    if (!email || !email.includes('@')) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 })
    }

    // Simulate saving to a database
    // Replace this with your database code
    console.log(`Received sign-up request for email: ${email}`)

    return NextResponse.json({ message: 'Sign-up successful! Please check your email for confirmation.' }, { status: 200 })
  } catch (error) {
    console.error('Error handling sign-up:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
