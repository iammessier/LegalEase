'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    (<div className="flex min-h-screen bg-[#0a0e27] text-white">
      <div className="flex flex-col justify-between w-full max-w-6xl p-8 mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
          <span className="text-2xl font-bold">LegalEase</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="max-w-md space-y-8">
            <h1 className="text-5xl font-bold">Login</h1>
            <p className="text-lg text-gray-400">Sign in to continue</p>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper mauris in magna venenatis suscipit.
            </p>
            <button
              className="px-6 py-3 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors">
              Learn More
            </button>
          </div>
          <div className="w-96 p-8 bg-white bg-opacity-10 rounded-3xl backdrop-blur-lg">
            <h2 className="mb-6 text-2xl font-semibold text-center">Sign in</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-white bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="legalease@legalease.com" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">
                  PASSWORD
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-white bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="••••••••" />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-end">
          <ChevronRight className="w-6 h-6 text-gray-500" />
          <ChevronRight className="w-6 h-6 text-gray-500" />
          <ChevronRight className="w-6 h-6 text-gray-500" />
        </div>
      </div>
    </div>)
  );
}

export default LoginPage;