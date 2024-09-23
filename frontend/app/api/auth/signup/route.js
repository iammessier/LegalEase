// pages/api/auth/signup.js
import { sendVerificationEmail } from '@/utils/emailService'

export default async function handler(req, res) {
  const { fullName, email, password, username } = req.body

  // Validate the inputs (add more as necessary)
  if (!email || !password || !fullName || !username) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Logic to save the user to your database (MongoDB, PostgreSQL, etc.)
    
    // Send verification code via email
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    await sendVerificationEmail(email, verificationCode)
    
    // Save verification code to the database or in-memory store (like Redis)
    // You can link the code with the user's email in a table.

    res.status(200).json({ message: 'Verification email sent' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to send verification email' })
  }
}
