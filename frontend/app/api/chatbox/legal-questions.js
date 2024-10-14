// pages/api/legal-questions.js
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question, name, email } = req.body;

    // Create a new legal question entry
    const newQuestion = await prisma.legalQuestion.create({
      data: {
        question,
        name,
        email,
      },
    });
    return res.status(201).json(newQuestion);
  }

  if (req.method === 'GET') {
    // Fetch recent legal questions
    const questions = await prisma.legalQuestion.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10, // limit to the latest 10 questions
    });
    return res.status(200).json(questions);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
