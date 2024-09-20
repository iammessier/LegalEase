'use client'

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('testpassword', 10)

  const users = [
    {
      email: 'user@example.com',
      password: hashedPassword,
      name: 'Regular User',
      role: 'user',
    },
    {
      email: 'lawstudent@example.com',
      password: hashedPassword,
      name: 'Law Student',
      role: 'law_student',
    },
    {
      email: 'lawyer@example.com',
      password: hashedPassword,
      name: 'Professional Lawyer',
      role: 'legal_professional',
    },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    })
  }

  console.log('Database has been seeded with test users.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })