'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { GavelIcon, ArrowRightIcon, UploadIcon } from "lucide-react"
import Link from "next/link"

const LawStudentSignup = () =>  {
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
    resume: null,
    agreeTerms: false
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files[0] }))
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
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
        <div
          className="w-full max-w-2xl space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <h2
              className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Sign up as a Law Student
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join our platform to provide legal advice and gain experience
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Jay Nahata" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="legalease@legalease.com" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="+91 8888888888" />
              </div>
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                  School/Institution
                </label>
                <Input
                  id="school"
                  name="school"
                  type="text"
                  required
                  value={formData.school}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="SGSITS" />
              </div>
              <div>
                <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700">
                  Year of Study
                </label>
                <Select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  required
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  className="mt-1">
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5+">5+ Year</option>
                </Select>
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Choose a username" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="••••••••" />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="••••••••" />
              </div>
              <div>
                <label
                  htmlFor="legalSpecialization"
                  className="block text-sm font-medium text-gray-700">
                  Legal Specialization/Interests
                </label>
                <Textarea
                  id="legalSpecialization"
                  name="legalSpecialization"
                  required
                  value={formData.legalSpecialization}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="e.g., Criminal Law, Corporate Law, Intellectual Property" />
              </div>
              <div>
                <label
                  htmlFor="languagesSpoken"
                  className="block text-sm font-medium text-gray-700">
                  Languages Spoken
                </label>
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
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                  Resume Upload (Optional)
                </label>
                <div className="mt-1 flex items-center">
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx" />
                  <Button
                    type="button"
                    onClick={() => document.getElementById('resume')?.click()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    <UploadIcon className="h-5 w-5 mr-2" />
                    Upload Resume
                  </Button>
                  {formData.resume && (
                    <span className="ml-2 text-sm text-gray-600">{formData.resume.name}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleCheckboxChange}
                  className="mr-2" />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-purple-600 hover:text-purple-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                disabled={!formData.agreeTerms}>
                Sign Up
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
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
export default LawStudentSignup;