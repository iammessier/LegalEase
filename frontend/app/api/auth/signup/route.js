import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/utils/emailService';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { name, email, password, role } = await request.json();

        // Validate the inputs
        if (!email || !password || !name || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Using raw SQL to check if user exists
        const existingUser = await prisma.$queryRaw`SELECT * FROM "User" WHERE email = ${email}`;

        if (existingUser && existingUser.length > 0) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification code (OTP)
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Insert new user into User table
        await prisma.$executeRaw`
            INSERT INTO "User" (name, email, password, role, "isVerified", "verificationCode")
            VALUES (${name}, ${email}, ${hashedPassword}, ${role}, false, ${verificationCode})
        `;

        // Send verification email
        await sendVerificationEmail(email, verificationCode);

        return NextResponse.json({ message: 'Verification email sent' }, { status: 200 });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
