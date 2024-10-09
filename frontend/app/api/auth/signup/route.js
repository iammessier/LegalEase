import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/utils/emailService';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { name, email, password, role } = await request.json();

        if (!email || !password || !name || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        //check user exist or not
        const existingUser = await prisma.$queryRaw`SELECT * FROM "User" WHERE email = ${email}`;

        if (existingUser && existingUser.length > 0) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        //insert new user
        await prisma.$executeRaw`
            INSERT INTO "User" (name, email, password, role, "isVerified", "verificationCode")
            VALUES (${name}, ${email}, ${hashedPassword}, ${role}, false, ${verificationCode})
        `;


        await sendVerificationEmail(email, verificationCode);

        return NextResponse.json({ message: 'Verification email sent' }, { status: 200 });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
