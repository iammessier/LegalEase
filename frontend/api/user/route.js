import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const response = await fetch('https://http://localhost:3000/signup/user', {
    method: 'POST',
    body: requestData,
  });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { fullName, email, phone, location, username, password, confirmPassword } = req.body;

  // Validate password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match" });
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists with this email' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  try {
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        location,
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
}
