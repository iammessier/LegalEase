'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GavelIcon, ArrowRightIcon, XIcon } from "lucide-react"
import Link from "next/link"

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempted with:', email, password)
  }

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true)
  }

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false)
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
            href="/features">
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="/about">
            About Us
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="/contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 w-full flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Sign in to your account
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-2 text-sm text-gray-600">
              Or{' '}
              <button
                onClick={openSignUpModal}
                className="font-medium text-purple-600 hover:text-purple-500 focus:outline-none">
                create a new account
              </button>
            </motion.p>
          </div>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  placeholder="••••••••" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-purple-600 hover:text-purple-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Sign in
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </main>
      <footer
        className="w-full flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6 border-t bg-white/50 backdrop-blur-sm">
        <p className="text-xs text-gray-600">© 2023 Legalease. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-purple-600 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-purple-600 transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
      <AnimatePresence>
        {isSignUpModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-lg p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Choose Sign Up Option</h3>
                <button onClick={closeSignUpModal} className="text-gray-400 hover:text-gray-500">
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <Link href="/signup/user" className="block w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Sign Up as User
                  </Button>
                </Link>
                <Link href="/signup/law-student" className="block w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Sign Up as Law Student
                  </Button>
                </Link>
                <Link href="/signup/legal-professional" className="block w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Sign Up as Legal Professional
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>)
  );
}

export default LoginPage;