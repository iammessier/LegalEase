'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GavelIcon, ShieldCheckIcon, UsersIcon, BookOpenIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"

const LegaleaseLanding= () => {
  return (
    (<div
      className="flex flex-col min-h-screen w-full bg-gradient-to-br from-purple-100 to-blue-100">
      <header
        className="w-full px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm bg-white/30 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <GavelIcon className="h-6 w-6 mr-2 text-purple-600" />
          <span
            className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Legalease</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 items-center">
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#">
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#">
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#">
            About Us
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#">
            Contact
          </Link>
          <Button
            variant="outline"
            className="bg-white/50 hover:bg-white/80 transition-colors">
            Login
          </Button>
        </nav>
      </header>
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6 max-w-full">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                  Welcome to Legalease
                </h1>
                <p
                  className="mx-auto max-w-[800px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with law students who can help you with your legal needs. Get the answers you need and the peace of mind you deserve.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your email"
                    type="email" />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-gray-600">
                  Start your legal journey today. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-full">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Why Choose Legalease?</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div
                className="flex flex-col items-center space-y-3 text-center group hover:bg-purple-50 p-6 rounded-lg transition-all duration-300">
                <ShieldCheckIcon
                  className="w-12 h-12 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold">Accessible Legal Guidance</h3>
                <p className="text-gray-600">Get legal help regardless of your background or financial situation.</p>
              </div>
              <div
                className="flex flex-col items-center space-y-3 text-center group hover:bg-purple-50 p-6 rounded-lg transition-all duration-300">
                <UsersIcon
                  className="w-12 h-12 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold">Connect with Law Students</h3>
                <p className="text-gray-600">Benefit from the knowledge of aspiring legal professionals.</p>
              </div>
              <div
                className="flex flex-col items-center space-y-3 text-center group hover:bg-purple-50 p-6 rounded-lg transition-all duration-300">
                <BookOpenIcon
                  className="w-12 h-12 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold">Comprehensive Resources</h3>
                <p className="text-gray-600">Access a wide range of legal information and guidance.</p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-full">
            <div
              className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p
                  className="max-w-[800px] mx-auto text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sign up now and take the first step towards accessible legal guidance.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
                    placeholder="Enter your email"
                    type="email" />
                  <Button
                    type="submit"
                    className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300">
                    Get Started
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
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
    </div>)
  );
}

export default LegaleaseLanding;