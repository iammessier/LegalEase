'use client'

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as result`
    return NextResponse.json({ message: 'Database connection successful', result });
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { error: 'Database connection failed', details: error.message },
      { status: 500 }
    );
  }
}