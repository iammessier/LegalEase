'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GavelIcon, ArrowRightIcon, LockIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'

const ForgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState('request') // 'request' or 'reset'
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRequestReset = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Password reset email sent. Please check your inbox.')
        setStep('reset')
      } else {
        setError(data.error || 'An error occurred')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Password reset successful')
        setTimeout(() => router.push('/login'), 2000)
      } else {
        setError(data.error || 'An error occurred')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col">
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm bg-white/30 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <GavelIcon className="h-6 w-6 mr-2 text-purple-600" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Legalease</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/login">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 text-gray-800">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Forgot Your Password?
            </h1>
            <h2 className="text-2xl mb-4 text-gray-700">No worries, we've got you covered</h2>
            <p className="mb-6 text-gray-600">
              {step === 'request'
                ? "Enter your email address and we'll send you instructions to reset your password."
                : "Enter the token from your email and your new password to complete the reset process."}
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
              Learn More About Account Security
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2">
            <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                  <LockIcon className="mr-2 h-6 w-6 text-purple-600" />
                  Reset Your Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                {step === 'request' ? (
                  <form onSubmit={handleRequestReset} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/50 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                      Send Reset Instructions
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="token" className="text-sm font-medium text-gray-700">
                        Reset Token
                      </label>
                      <Input
                        id="token"
                        type="text"
                        placeholder="Enter token from email"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="bg-white/50 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-white/50 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                      Reset Password
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
                {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
                {success && <p className="mt-4 text-green-500 text-sm">{success}</p>}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <footer className="w-full flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6 border-t bg-white/50 backdrop-blur-sm">
        <p className="text-xs text-gray-600">© 2023 Legalease. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-purple-600 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-purple-600 transition-colors" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

export default ForgotPassword;