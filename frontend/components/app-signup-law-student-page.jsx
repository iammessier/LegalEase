'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  GavelIcon,
  ArrowRightIcon,
  LinkIcon,
  CheckCircleIcon,
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  BookIcon,
} from "lucide-react";
import Link from "next/link"
import { motion } from 'framer-motion'

const LawStudentSignup = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    school: '',
    yearOfStudy: '',
    username: '',
    password: '',
    confirmPassword: '',
    legalSpecialization: '',
    languagesSpoken: '',
    resumeLink: '',
    agreeTerms: false,
    role: 'law_student'
  })
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormData(prev => ({ ...prev, yearOfStudy: value }))
  }

  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({ ...prev, agreeTerms: checked }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await fetch('/api/auth/signup/law-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setVerificationSent(true)
      } else {
        setError(data.error || 'An error occurred during signup')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    }
  }

  const handleVerification = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, code: verificationCode })
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/login?verified=true')
      } else {
        setError(data.error || 'Invalid verification code')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    }
  }

  return (
    (<div
      className="flex flex-col min-h-screen w-full bg-gradient-to-br from-purple-100 to-blue-100">
      <header
        className="w-full px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm bg-white/30 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <GavelIcon className="h-6 w-6 mr-2 text-purple-600" />
          <span
            className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Legalease</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 items-center">
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="/">
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="/login">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 w-full flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl">
          <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center">
              <CardTitle
                className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                {verificationSent ? 'Verify Your Email' : 'Sign Up as a Law Student'}
              </CardTitle>
              <CardDescription>
                {verificationSent
                  ? 'Enter the verification code sent to your email'
                  : 'Join our platform to provide legal advice and gain experience'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!verificationSent ? (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <UserIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18} />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Jay Nahata" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <MailIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18} />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="legalease@legalease.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <PhoneIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18} />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="+91 8888888888" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school">School/Institution</Label>
                    <div className="relative">
                      <BookIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18} />
                      <Input
                        id="school"
                        name="school"
                        type="text"
                        required
                        value={formData.school}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="SGSITS" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Year of Study</Label>
                    <RadioGroup
                      value={formData.yearOfStudy}
                      onValueChange={handleRadioChange}
                      className="mt-2">
                      {['1st Year', '2nd Year', '3rd Year', '4th Year', '5+ Year'].map((year, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={year} id={`year-${index + 1}`} />
                          <Label htmlFor={`year-${index + 1}`}>{year}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <UserIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18} />
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Choose a username" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <LockIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18} />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="••••••••" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <LockIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18} />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="••••••••" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="legalSpecialization">Legal Specialization/Interests</Label>
                    <Textarea
                      id="legalSpecialization"
                      name="legalSpecialization"
                      required
                      value={formData.legalSpecialization}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="e.g., Criminal Law, Corporate Law, Intellectual Property" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="languagesSpoken">Languages Spoken</Label>
                    <Input
                      id="languagesSpoken"
                      name="languagesSpoken"
                      type="text"
                      required
                      value={formData.languagesSpoken}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="e.g., English, Hindi, Marathi" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resumeLink">Resume Link</Label>
                    <div className="relative">
                      <LinkIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18} />
                      <Input
                        id="resumeLink"
                        name="resumeLink"
                        type="url"
                        value={formData.resumeLink}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="https://example.com/your-resume" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={handleCheckboxChange}
                      className="mr-2" />
                    <Label htmlFor="agreeTerms" className="text-sm text-gray-700">
                      I agree to the{' '}
                      <Link href="/terms" className="text-purple-600 hover:text-purple-500">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                    disabled={!formData.agreeTerms}>
                    Sign Up
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={handleVerification}>
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode">Verification Code</Label>
                    <Input
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      required
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter 6-digit code" />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                    Verify Email
                    <CheckCircleIcon className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-purple-600 hover:underline">
                  Log in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
      <footer
        className="w-full flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6 border-t bg-white/50 backdrop-blur-sm">
        <p className="text-xs text-gray-600">© 2024 Legalease. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-purple-600 transition-colors" href="/terms">
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:text-purple-600 transition-colors"
            href="/privacy">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>)
  );
}

export default LawStudentSignup