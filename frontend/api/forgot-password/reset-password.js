// /pages/api/reset-password.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const response = await fetch('https://http://localhost:3000/signup/forgot-password', {
    method: 'POST',
    body: requestData,
  });

export async function POST(req) {
  try {
    const { email, otp, newPassword } = await req.json();
    
    // Validate inputs
    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    
    // Verify OTP and fetch user
    const user = await prisma.user.findFirst({
      where: {
        email,
        otp,
        otpExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid OTP or expired' }, { status: 400 });
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the password in the database
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpiry: null,
      },
    });
    
    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
