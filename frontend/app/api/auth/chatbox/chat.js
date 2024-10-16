// pages/api/chat.js
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, message } = req.body;

    // Create a new chat message
    const newMessage = await prisma.chatMessage.create({
      data: {
        userId,
        message,
      },
    });
    return res.status(201).json(newMessage);
  }

  // Fetch chat messages
  if (req.method === 'GET') {
    const messages = await prisma.chatMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50, // limit to the latest 50 messages
    });
    return res.status(200).json(messages);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
