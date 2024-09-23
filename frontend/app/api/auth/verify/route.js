export default async function handler(req, res) {
    const { email, code } = req.body
  
    // Retrieve the stored code from your database or in-memory store
    const storedCode = await getStoredVerificationCode(email)
  
    if (code === storedCode) {
      // Mark user as verified in the database
      res.status(200).json({ message: 'Email verified successfully' })
    } else {
      res.status(400).json({ error: 'Invalid verification code' })
    }
  }
  