import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const response = await fetch('https://http://localhost:3000/signup/lawstudent', {
    method: 'POST',
    body: requestData,
  });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { username, password } = req.body;

  // Find the law student by username
  const lawStudent = await prisma.lawStudent.findUnique({
    where: { username },
  });

  if (!lawStudent) {
    return res.status(404).json({ message: 'Law student not found' });
  }

  // Compare the password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, lawStudent.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // If everything is correct, return a success response
  res.status(200).json({
    message: 'Login successful',
    lawStudent: {
      id: lawStudent.id,
      fullName: lawStudent.fullName,
      email: lawStudent.email,
      expertise: lawStudent.expertise,
    },
  });
}
