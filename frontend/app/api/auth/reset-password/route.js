import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { email, token, newPassword } = await request.json();

        // Using raw SQL to find the reset token
        const passwordReset = await prisma.$queryRaw`
            SELECT "PasswordReset".*, "User".* FROM "PasswordReset"
            JOIN "User" ON "User".id = "PasswordReset"."userId"
            WHERE "PasswordReset".token = ${token}
            AND "User".email = ${email}
            AND "PasswordReset"."expiresAt" > NOW()
        `;

        if (!passwordReset || passwordReset.length === 0) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in User table
        await prisma.$executeRaw`
            UPDATE "User" SET password = ${hashedPassword} WHERE id = ${passwordReset[0].userId}
        `;

        // Optionally delete the token after use
        await prisma.$executeRaw`
            DELETE FROM "PasswordReset" WHERE id = ${passwordReset[0].id}
        `;

        return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
