import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { email, code } = await request.json();

        //to find user
        const user = await prisma.$queryRaw`SELECT * FROM "User" WHERE email = ${email}`;

        if (!user || user.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user[0].verificationCode !== code) {
            return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
        }

        //to mark user is verified
        await prisma.$executeRaw`
            UPDATE "User" SET "isVerified" = true, "verificationCode" = NULL WHERE id = ${user[0].id}
        `;

        return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
    } catch (error) {
        console.error('Verification error:', error);
        return NextResponse.json({ error: 'Failed to verify email' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
