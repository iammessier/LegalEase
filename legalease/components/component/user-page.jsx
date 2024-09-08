'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function UserPage() {
  return (
    (<div className="min-h-screen bg-[#0a0e27] text-white">
      {/* Header */}
      <header className="bg-[#1a1f3d] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span className="text-xl font-bold">LegalEase</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-white font-bold">Home</a></li>
              <li><a href="#" className="text-gray-300">Find a Lawyer</a></li>
              <li><a href="#" className="text-gray-300">About</a></li>
              <li><Button className="bg-[#4fd1c5] hover:bg-[#4fd1c5]/90 text-white">Document Review</Button></li>
            </ul>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">LegalEase</h1>
          <p className="text-xl mb-4">Connect one-on-one with a legal expert who will answer your question</p>
          <Button className="bg-white text-[#0a0e27] hover:bg-gray-200 text-lg px-6 py-3">Chat Now</Button>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="bg-[#4fd1c5] p-4 flex items-center space-x-4">
            <img
              src="/placeholder.svg?height=50&width=50"
              alt="Lawyer"
              className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="font-bold text-[#0a0e27]">Ask a Lawyer Now</h2>
              <p className="text-sm text-[#0a0e27]">Dimitry K., Esq., Attorney</p>
              <p className="text-sm text-[#0a0e27]">17183 Satisfied Customers</p>
            </div>
          </div>
          <div className="p-4 bg-gray-100">
            <div className="flex items-start mb-4">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Assistant"
                className="w-10 h-10 rounded-full mr-3" />
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="font-bold">Pearl Wilson, Lawyer's Assistant</p>
                <p>Welcome! How can I help with your legal question?</p>
              </div>
            </div>
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Type your message..."
                className="flex-grow mr-2 border-gray-300" />
              <Button className="bg-[#f6ad55] hover:bg-[#f6ad55]/90 text-white">Send</Button>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-[#1a1f3d] py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Free Legal Advice Online</h2>
          <p className="mb-4">The #1 resource to speak directly with an attorney 24/7 anytime. An attorney is always ready to immediately answer your legal question.</p>
          <p className="mb-8">Post your legal query online and a qualified attorney will respond right away....</p>
          <h3 className="text-2xl font-bold text-[#4fd1c5] mb-4">TOP LEGAL CATEGORIES</h3>
          {/* Add legal categories here */}
        </div>
      </footer>
    </div>)
  );
}