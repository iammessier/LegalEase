import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email, verificationCode) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify Your Email for Legalease',
    text: `Your verification code is: ${verificationCode}`,
    html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

export async function sendPasswordResetEmail(email, resetToken) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset Your Password for Legalease',
    text: `Please use the following link to reset your password: ${resetUrl}`,
    html: `<p>Please use the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}