import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { email } = await request.json();

        // Using raw SQL for user lookup
        const user = await prisma.$queryRaw`SELECT * FROM "User" WHERE email = ${email}`;

        if (!user || user.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const token = crypto.randomBytes(32).toString('hex');

        // Insert reset token into PasswordReset table
        await prisma.$executeRaw`
            INSERT INTO "PasswordReset" ("userId", token, "expiresAt")
            VALUES (${user[0].id}, ${token}, NOW() + INTERVAL '1 hour')
        `;

        // Send token via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Password Reset Token',
            text: `Your password reset token is ${token} It is valid for 1 hour.`
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Token sent to email' }, { status: 200 });

    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
