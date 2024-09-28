import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { email, token, newPassword } = await request.json();

        // Find the reset token in the PasswordReset table
        const passwordReset = await prisma.passwordReset.findFirst({
            where: {
                token, // Checking the token field
                user: {
                    email
                },
                expiresAt: { gt: new Date() } // Check that the token is still valid
            },
            include: { user: true }
        });

        if (!passwordReset) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await prisma.user.update({
            where: { id: passwordReset.user.id },
            data: { password: hashedPassword }
        });

        // Optionally delete the token after use
        await prisma.passwordReset.delete({
            where: { id: passwordReset.id }
        });

        return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
