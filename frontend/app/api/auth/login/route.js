'use client'

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    console.log('Login request received for:', email)

    // Validate input
    if (!email || !password) {
      console.log('Invalid input: email or password missing')
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.users.findUnique({ where: { email } })

    if (!user) {
      console.log('User not found:', email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('User found:', user.email)

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      console.log('Invalid password for user:', email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Password is valid for user:', email)

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    console.log('JWT token generated for user:', email)

    // Create the response
    const response = NextResponse.json(
      { success: true, user: { id: user.id, email: user.email, role: user.role } },
      { status: 200 }
    )

    // Set HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    })

    console.log('Login successful for user:', email)

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}